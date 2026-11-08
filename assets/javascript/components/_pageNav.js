import { pgs } from "../_pgs.js";

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
    // the name a panel is addressed by in the URL hash: its pageNavHash[...], or its own id when it has none.
    // With pageNavHash the hash names no element (the panel's id, if any, is another one), so the browser
    // has nothing to scroll to and none of the hash juggling below is needed; it is kept for a panel
    // addressed by its id, which the browser would otherwise scroll to while the page loads
    keyOf(panel) {
        return pgs(panel).data.getValueBrackets("pageNavHash") || panel.id;
    },

    // the browser scrolls to the element whose id is in the hash: true when one exists
    hashNamesElement(key) {
        return Boolean(key && document.getElementById(key));
    },

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

//# BUILD
// builds the instance of one pageNav root and returns its API, or null when its markup cannot be initialized
function PGS_pageNav_build(pageNav) {
    const panelsRoot = pgs(pageNav).querySelector("pageNav-panels");
    // every pageNav-list is its own <nav>: the desktop sidebar and the one inside the
    // mobile dialog both hold the same links, kept in sync together, so items are read
    // across every list at once instead of assuming there is only one
    const items = Array.from(pgs(pageNav).querySelectorAll("pageNav-list-item"));
    const panelItems = panelsRoot ? Array.from(pgs(panelsRoot).querySelectorAll("pageNav-panels-content")) : [];
    const keyOf = pageNavUtil.keyOf;

    if (!panelItems.length) {
        pgs.helper.warn("pageNav.init", "the pageNav has no pageNav-panels-content inside a pageNav-panels, so it was not initialized", pageNav);
        return null;
    }
    if (!items.length) {
        pgs.helper.warn("pageNav.init", "the pageNav has no pageNav-list-item, so it was not initialized", pageNav);
        return null;
    }

    // a pageNavHash that is also the id of an element brings the scroll back: the browser jumps to that element
    panelItems.forEach(panel => {
        const hash = pgs(panel).data.getValueBrackets("pageNavHash");
        if (hash && pageNavUtil.hashNamesElement(hash)) {
            pgs.helper.warn("pageNav.init", `pageNavHash[${hash}] is also the id of an element, so the browser scrolls to it when the page opens on that panel: give one of the two another name`, panel);
        }
    });

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

        // a panel is addressed by its pageNavHash (or its own id), matched against an item's href
        // fragment, so no extra bookkeeping is needed to keep several lists and one panel set in agreement
        panelIdFor(item) {
            const href = item.getAttribute("href") || "";
            return href.startsWith("#") ? href.slice(1) : null;
        },

        // the links of the current panel are the current page, unless the panels are out of sight: on the
        // first screen of pageNavDrillDown the list is alone, and no link stands for a page on screen. The
        // CSS decides when the panels hide, so this reads it rather than repeating the breakpoint
        markItems() {
            const listAlone = pgs(pageNav).state.contains("home") && this.panelsRoot.getClientRects().length === 0;
            this.items.forEach(item => {
                if (!listAlone && this.panelIdFor(item) === keyOf(this.current)) item.setAttribute("aria-current", "page");
                else item.removeAttribute("aria-current");
            });
        },

        itemsFor(panelId) {
            return this.items.filter(item => this.panelIdFor(item) === panelId);
        },

        // home: the URL names no panel. The current panel is still shown (a wide layout keeps it beside the
        // list), and the root carries the state home, which pageNavDrillDown reads on a narrow screen to show
        // the list on its own, as the first screen
        select(panelId, { resetScroll = true, home = false } = {}) {
            const panel = this.panelItems.find(item => keyOf(item) === panelId);
            const wasHome = pgs(pageNav).state.contains("home");
            this.current = panel;
            this.appliedHash = window.location.hash;

            // leaving the list for a panel: where the list was scrolled to is kept for the way back, and the
            // history entry of the panel is marked, so the back button knows the list is the entry before it
            if (wasHome && !home) {
                this.homeScroll = window.scrollY;
                if (window.location.hash) history.replaceState({ ...history.state, pgsPageNavFromHome: true }, "");
            }
            pgs(pageNav).state.toggle("home", home);
            this.markItems();

            this.panelItems.forEach(item => pgs(item).state.toggle("active", item === panel));

            // closes whichever nav the reader just used when it lives inside a dialog (the
            // mobile "Browse docs" panel), the same way any other navigation should tidy up
            // after itself
            this.itemsFor(keyOf(panel)).forEach(item => item.closest("dialog[open]")?.close());

            if (resetScroll) window.scrollTo({ top: 0, behavior: "instant" });

            pgs.helper.dispatch(pageNav, "pgs:pageNav:change", { panel, items: this.itemsFor(keyOf(panel)), home });
        },

        // back to the list: the URL no longer names a panel (the back button, or a back move of the browser
        // onto the entry with no hash), and the page is scrolled where the list was left
        home() {
            if (pgs(pageNav).state.contains("home")) return;
            this.select(keyOf(this.current), { resetScroll: false, home: true });
            window.scrollTo({ top: this.homeScroll || 0, behavior: "instant" });
        },

        // the back button: the browser's own back when the list is the entry before this one, so the history
        // keeps one entry per screen; a panel opened from a link elsewhere (a bookmark, a shared link) has no
        // list before it, so the entry is turned into the list in place, and a further back leaves the page
        back() {
            if (history.state?.pgsPageNavFromHome) {
                history.back();
                return;
            }
            history.replaceState(history.state, "", window.location.pathname + window.location.search);
            this.home();
        },

        idFromHash(hash) {
            const id = hash.slice(1);
            return id && this.panelItems.some(panel => keyOf(panel) === id) ? id : null;
        },

        fromHash() {
            return this.idFromHash(window.location.hash);
        },
    };

    window.addEventListener("hashchange", () => {
        const id = nav.fromHash();
        if (id && window.location.hash !== nav.appliedHash) nav.select(id);
        else if (!window.location.hash) nav.home();
    }, { signal });

    // a screen that turns wide or narrow shows or hides the panels beside the list: the marks follow. An
    // observer of the page rather than the resize event, so it reads the layout once it has settled
    const resizeObserver = new ResizeObserver(() => nav.markItems());
    resizeObserver.observe(document.documentElement);
    signal.addEventListener("abort", () => resizeObserver.disconnect());

    // every pageNav-back, the ones written later included
    pageNav.addEventListener("click", (event) => {
        if (!pgs(event.target).closest("pageNav-back")) return;
        event.preventDefault();
        nav.back();
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
            if (!panelId || !nav.panelItems.some(panel => keyOf(panel) === panelId)) {
                throw pgs.helper.invalid("pageNav.select", `no pageNav-panels-content has the id "${panelId}"`);
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
            return PGS_pageNav_build(pageNav) ?? undefined;
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

    // only a hash that is also the id of an element makes the browser scroll: with pageNavHash the URL is left alone
    const juggleHash = initialPanelId && firstInit && pageNavUtil.hashNamesElement(initialPanelId);

    if (juggleHash) pageNavUtil.stripHash();
    nav.select(initialPanelId || keyOf(nav.current), { resetScroll: false, home: !initialPanelId });
    if (juggleHash) pageNavUtil.restoreHash(initialPanelId, () => keyOf(nav.current) === initialPanelId, signal);

    return api;
}

function PGS_pageNav_init(root = document) {
    pgs.helper.roots(root, "pageNav").forEach((pageNav) => {
        if (API.has(pageNav)) return;

        PGS_pageNav_build(pageNav);
    });
}

pgs.helper.onDocumentReady(PGS_pageNav_init);

function PGS_pageNav_api(selector) {
    return API.get(selector);
}

export const PGS_pageNav = {
    init: PGS_pageNav_init,
    api: PGS_pageNav_api,
};
