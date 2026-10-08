import { PGS_onDocumentReady } from "../helper/_onDocumentReady.js";

const API = new WeakMap();

const pageNavUtil = {
    // the browser retries "scroll to #fragment" for a while after load if the target wasn't ready
    // yet on the first pass (still true once a panel becomes visible and images further down
    // shift the layout) — by the time it retries, the reader may already have scrolled elsewhere
    // themselves, and the retry yanks them back. Captured once here, as early as this module
    // runs, so the panel it names can still be selected below after the URL is stripped of it.
    initialHash: window.location.hash,

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
    restoreHash(id, isCurrent) {
        const put = () => {
            if (window.location.hash || !isCurrent()) return;
            history.replaceState(history.state, "", window.location.pathname + window.location.search + "#" + id);
        };

        if (document.readyState === "complete") put();
        else window.addEventListener("load", put, { once: true });
    },

    roots(root) {
        const roots = [];
        if (root instanceof Element && pgs(root).contains("pageNav")) roots.push(root);
        roots.push(...pgs(root).querySelectorAll("pageNav"));
        return roots;
    },
};

function PGS_pageNav_init(root = document) {
    pageNavUtil.roots(root).forEach((pageNav) => {
        if (API.has(pageNav)) return;

        const nav = {
            panelsRoot: pgs(pageNav).querySelector("pageNav-panels"),
            // every pageNav-list is its own <nav>: the desktop sidebar and the one inside the
            // mobile dialog both hold the same links, kept in sync together, so items are read
            // across every list at once instead of assuming there is only one
            items: Array.from(pgs(pageNav).querySelectorAll("pageNav-list-item")),
            panelItems: [],
            current: null,

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
                if (!panel) return;
                this.current = panel;

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

                pageNav.dispatchEvent(new CustomEvent("pgs:pageNav:change", {
                    detail: { panel, items: this.itemsFor(panel.id) },
                }));
            },

            idFromHash(hash) {
                const id = hash.slice(1);
                return id && this.panelItems.some(panel => panel.id === id) ? id : null;
            },

            fromHash() {
                return this.idFromHash(window.location.hash);
            },
        };

        nav.panelItems = nav.panelsRoot ? Array.from(pgs(nav.panelsRoot).querySelectorAll("pageNav-panels-content")) : [];
        if (!nav.panelItems.length || !nav.items.length) return;

        // active is the mark of the one panel to show, matching the same convention tabs uses:
        // a panel already marked active in the markup is where a hashless load lands
        nav.current = nav.panelItems.find(panel => pgs(panel).state.contains("active")) || nav.panelItems[0];

        window.addEventListener("hashchange", () => {
            const id = nav.fromHash();
            if (id) nav.select(id);
        });

        // the URL wins over whatever the markup already shows: a reload lands on the panel the
        // reader left, and the first pass never resets the scroll position it starts at. Reads
        // the hash captured once at the top of this module, not the live window.location.hash,
        // which another pageNav root's own init pass may have already stripped or restored by
        // the time this one runs.
        const initialPanelId = nav.idFromHash(pageNavUtil.initialHash);

        if (initialPanelId) pageNavUtil.stripHash();
        nav.select(initialPanelId || nav.current.id, { resetScroll: false });
        if (initialPanelId) pageNavUtil.restoreHash(initialPanelId, () => nav.current.id === initialPanelId);

        API.set(pageNav, {
            element: pageNav,
            panels: nav.panelsRoot,
            select: (panelId) => {
                window.location.hash = panelId;
                nav.select(panelId);
            },
            getCurrent: () => nav.current,
            refresh: () => {
                API.delete(pageNav);
                PGS_pageNav_init(pageNav.parentNode || document);
                return API.get(pageNav);
            },
        });
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
