import { PGS_onDocumentReady } from "../helper/_onDocumentReady.js";

const API = new WeakMap();

function pageNavRoots(root) {
    const roots = [];
    if (root instanceof Element && pgs(root).contains("pageNav")) roots.push(root);
    roots.push(...pgs(root).querySelectorAll("pageNav"));
    return roots;
}

function PGS_pageNav_init(root = document) {
    pageNavRoots(root).forEach((pageNav) => {
        if (API.has(pageNav)) return;

        const panelsRoot = pgs(pageNav).querySelector("pageNav-panels");
        const panelItems = panelsRoot ? Array.from(pgs(panelsRoot).querySelectorAll("pageNav-panels-content")) : [];
        //== every pageNav-list is its own <nav>: the desktop sidebar and the one inside the mobile
        //== dialog both hold the same links, kept in sync together, so items are read across every
        //== list at once instead of assuming there is only one
        const items = Array.from(pgs(pageNav).querySelectorAll("pageNav-list-item"));
        if (!panelItems.length || !items.length) return;

        //== a panel is addressed by its own id, matched against an item's href fragment: the same
        //== mechanism the browser already uses to jump to it, so no extra bookkeeping is needed to
        //== keep several lists and one panel set in agreement
        function panelIdFor(item) {
            const href = item.getAttribute("href") || "";
            return href.startsWith("#") ? href.slice(1) : null;
        }

        function itemsFor(panelId) {
            return items.filter(item => panelIdFor(item) === panelId);
        }

        let current = panelItems.find(panel => !panel.hidden) || panelItems[0];

        function select(panelId, { resetScroll = true } = {}) {
            const panel = panelItems.find(item => item.id === panelId);
            if (!panel) return;
            current = panel;

            panelItems.forEach(item => { item.hidden = item !== panel; });
            items.forEach(item => {
                if (panelIdFor(item) === panel.id) item.setAttribute("aria-current", "page");
                else item.removeAttribute("aria-current");
            });

            //== closes whichever nav the reader just used when it lives inside a dialog (the
            //== mobile "Browse docs" panel), the same way any other navigation should tidy up
            //== after itself
            itemsFor(panel.id).forEach(item => item.closest("dialog[open]")?.close());

            if (resetScroll) window.scrollTo({ top: 0, behavior: "instant" });

            pageNav.dispatchEvent(new CustomEvent("pgs:pageNav:change", {
                detail: { panel, items: itemsFor(panel.id) },
            }));
        }

        function fromHash() {
            const id = window.location.hash.slice(1);
            return id && panelItems.some(panel => panel.id === id) ? id : null;
        }

        window.addEventListener("hashchange", () => {
            const id = fromHash();
            if (id) select(id);
        });

        //== the URL wins over whatever the markup already shows: a reload lands on the panel the
        //== reader left, and the first pass never resets the scroll position it starts at
        select(fromHash() || current.id, { resetScroll: false });

        API.set(pageNav, {
            element: pageNav,
            panels: panelsRoot,
            select: (panelId) => {
                window.location.hash = panelId;
                select(panelId);
            },
            getCurrent: () => current,
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
