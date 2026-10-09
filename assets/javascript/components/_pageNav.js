import { pgs } from "../_pgs.js";
import { PGS_onDocumentReady } from "../helper/_onDocumentReady.js";
import { PGS_roots, PGS_dispatch } from "../helper/_dom.js";
import { PGS_warn, PGS_invalid } from "../helper/_warn.js";

const API = new WeakMap();

// the browser retries "scroll to #fragment" for a while after load if the target wasn't ready
// yet on the first pass (still true once a panel becomes visible and images further down
// shift the layout) — by the time it retries, the reader may already have scrolled elsewhere
// themselves, and the retry yanks them back. Captured once here, as early as this module
// runs, so the panel it names can still be selected below after the URL is stripped of it.
// Every root takes it once, on its own first init (loadHashTaken): a refresh() reads the URL as
// it is by then, so it can never force the hash the page was opened with back onto the reader
const loadHash = typeof window === "undefined" ? "" : window.location.hash;
const loadHashTaken = new WeakSet();

const pageNavUtil = {
    stripHash() {
        history.replaceState(history.state, "", window.location.pathname + window.location.search);
    },

    // replaceState never triggers a scroll on its own (only real navigation does), so removing
    // the fragment now leaves the browser nothing to retry-scroll to. Putting it straight back
    // is not as inert as it looks: while the page is still loading, a fragment that is in the URL
    // again is a fragment the browser has yet to scroll to, and it does so when the load ends,
    // yanking back a reader who had already started scrolling. So it goes back only once the page
    // has loaded, and only if nothing else has changed the URL or the panel in the meantime — a
    // reload or a bookmark still lands on the same panel, only the automatic scroll is skipped
    restoreHash(id, isCurrent, signal) {
        const put = () => {
            if (window.location.hash || !isCurrent()) return;
            history.replaceState(history.state, "", window.location.pathname + window.location.search + "#" + id);
        };

        if (document.readyState === "complete") put();
        else window.addEventListener("load", put, { once: true, signal });
    },
};

//+ BUILD
//== builds the instance of one pageNav root and returns its API, or null when its markup cannot be initialized
function PGS_pageNav_build(pageNav) {
    const panelsRoot = pgs(pageNav).querySelector("pageNav-panels");
    // every pageNav-list is its own <nav>: the desktop sidebar and the one inside the
    // mobile dialog both hold the same links, kept in sync together, so items are read
    // across every list at once instead of assuming there is only one
    const items = Array.from(pgs(pageNav).querySelectorAll("pageNav-list-item"));
    const panelItems = panelsRoot ? Array.from(pgs(panelsRoot).querySelectorAll("pageNav-panels-content")) : [];

    if (!panelItems.length) {
        PGS_warn("pageNav.init", "the pageNav has no pageNav-panels-content inside a pageNav-panels, so it was not initialized", pageNav);
        return null;
    }
    if (!items.length) {
        PGS_warn("pageNav.init", "the pageNav has no pageNav-list-item, so it was not initialized", pageNav);
        return null;
    }

    const eventController = new AbortController();
    const { signal } = eventController;

    const nav = {
        panelsRoot,
        items,
        panelItems,
        // active is the mark of the one panel to show, matching the same convention tabs uses:
        // a panel already marked active in the markup is where a hashless load lands
        current: panelItems.find(panel => pgs(panel).state.contains("active")) || panelItems[0],
        // the hash the panels on screen were selected for. A navigation reaches select() once,
        // by whichever way arrives first: instance.select() applies the panel right away and
        // records the hash it just set, so the hashchange that hash raises finds it applied
        appliedHash: window.location.hash,

        // a panel is addressed by its own id, matched against an item's href fragment: the
        // same mechanism the browser already uses to jump to it, so no extra bookkeeping is
        // needed to keep several lists and one panel set in agreement
        panelIdFor(item) {
            const href = item.getAttribute("href") || "";
            return href.startsWith("#") ? href.slice(1) : null;
        },

        itemsFor(panelId) {
            return this.items.filter(item => this.panelIdFor(item) === panelId);
        },

        select(panelId, { resetScroll = true } = {}) {
            const panel = this.panelItems.find(item => item.id === panelId);
            this.current = panel;
            this.appliedHash = window.location.hash;

            this.panelItems.forEach(item => pgs(item).state.toggle("active", item === panel));
            this.items.forEach(item => {
                if (this.panelIdFor(item) === panel.id) item.setAttribute("aria-current", "page");
                else item.removeAttribute("aria-current");
            });

            // closes whichever nav the reader just used when it lives inside a dialog (the
            // mobile "Browse docs" panel), the same way any other navigation should tidy up
            // after itself
            this.itemsFor(panel.id).forEach(item => item.closest("dialog[open]")?.close());

            if (resetScroll) window.scrollTo({ top: 0, behavior: "instant" });

            PGS_dispatch(pageNav, "pgs:pageNav:change", { panel, items: this.itemsFor(panel.id) });
        },

        idFromHash(hash) {
            const id = hash.slice(1);
            return id && this.panelItems.some(panel => panel.id === id) ? id : null;
        },

        fromHash() {
            return this.idFromHash(window.location.hash);
        },
    };

    window.addEventListener("hashchange", () => {
        const id = nav.fromHash();
        if (id && window.location.hash !== nav.appliedHash) nav.select(id);
    }, { signal });

    const destroy = () => {
        if (API.get(pageNav) !== api) return;
        eventController.abort();
        API.delete(pageNav);
    };

    const api = {
        element: pageNav,
        panels: nav.panelsRoot,
        select: (panelId) => {
            if (!panelId || !nav.panelItems.some(panel => panel.id === panelId)) {
                throw PGS_invalid("pageNav.select", `no pageNav-panels-content has the id "${panelId}"`);
            }
            window.location.hash = panelId;
            nav.select(panelId);
        },
        getCurrent: () => nav.panelItems.indexOf(nav.current),
        getCurrentPanel: () => nav.current,
        destroy,
        refresh: () => {
            const live = API.get(pageNav);
            if (live && live !== api) return live;
            destroy();
            return PGS_pageNav_build(pageNav);
        },
    };
    API.set(pageNav, api);

    // the URL wins over whatever the markup already shows: a reload lands on the panel the
    // reader left, and the first pass never resets the scroll position it starts at. On the
    // first init of this root it reads the hash captured once at the top of this module, not
    // the live window.location.hash, which another pageNav root's own init pass may have
    // already stripped or restored by the time this one runs. Any later init of the same root
    // (a refresh) reads the live one, and leaves the URL as it is
    const firstInit = !loadHashTaken.has(pageNav);
    loadHashTaken.add(pageNav);
    const initialPanelId = nav.idFromHash(firstInit ? loadHash : window.location.hash);

    if (initialPanelId && firstInit) pageNavUtil.stripHash();
    nav.select(initialPanelId || nav.current.id, { resetScroll: false });
    if (initialPanelId && firstInit) pageNavUtil.restoreHash(initialPanelId, () => nav.current.id === initialPanelId, signal);

    return api;
}

function PGS_pageNav_init(root = document) {
    PGS_roots(root, "pageNav").forEach((pageNav) => {
        if (API.has(pageNav)) return;

        PGS_pageNav_build(pageNav);
    });
}

PGS_onDocumentReady(PGS_pageNav_init);

function PGS_pageNav_api(selector) {
    return API.get(selector);
}

export const PGS_pageNav = {
    init: PGS_pageNav_init,
    api: PGS_pageNav_api,
};
