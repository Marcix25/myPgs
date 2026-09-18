import { PGS_onDocumentReady } from "../helper/_onDocumentReady.js";

const API = new WeakMap();
let tabsId = 0;

function nextTabsId() {
    tabsId += 1;
    return tabsId;
}

function directPgsChildren(element, token) {
    return Array.from(element.children).filter(child => pgs(child).contains(token));
}

function tabRoots(root) {
    const roots = [];
    if (root instanceof Element && pgs(root).contains("tabs")) roots.push(root);
    roots.push(...pgs(root).querySelectorAll("tabs"));
    return roots;
}

function PGS_tabs_init(root = document) {
    tabRoots(root).forEach((tabs) => {
        if (API.has(tabs)) return;

        const list = directPgsChildren(tabs, "tabs-list")[0];
        const panels = directPgsChildren(tabs, "tabs-panels")[0];
        if (!list || !panels) return;

        const buttons = directPgsChildren(list, "tabs-list-tab");
        const panelItems = directPgsChildren(panels, "tabs-panels-content");
        if (!buttons.length || buttons.length !== panelItems.length) return;

        const id = nextTabsId();
        list.setAttribute("role", "tablist");

        //== HISTORY
        //== the parameter is named by the option, so two history-backed sets on one page do not
        //== write over each other. A tab is addressed by its own id when the author gave it one,
        //== and by its 1-based position otherwise, which is what keeps a shared link readable
        //== without asking for ids that the markup does not need
        //== tabsHistory lives only in pgs-data and .data has no contains(), so presence (with or
        //== without its own payload) is checked directly against the raw attribute value
        const rawData = (pgs(tabs).data.value || "").split(/\s+/).filter(Boolean);
        const hasHistory = rawData.some(token => token === "tabsHistory" || token.startsWith("tabsHistory["));
        const historyKey = hasHistory
            ? (pgs(tabs).data.getValueBrackets("tabsHistory") || "tab")
            : null;

        //== read before the loop below fills in the generated ids, so what reaches the URL is the
        //== author's own name for the tab or nothing at all — never tabs-list-tab-1-2
        const authoredIds = buttons.map(button => button.id || "");

        function indexFromHistory() {
            if (!historyKey) return -1;
            const value = new URLSearchParams(window.location.search).get(historyKey);
            if (!value) return -1;

            const byId = authoredIds.indexOf(value);
            if (byId !== -1) return byId;

            const position = Number(value);
            return Number.isInteger(position) && position >= 1 && position <= buttons.length ? position - 1 : -1;
        }

        function writeHistory() {
            if (!historyKey) return;
            const value = authoredIds[current] || String(current + 1);
            try {
                const url = new URL(window.location.href);
                url.searchParams.set(historyKey, value);
                window.history.pushState({ [historyKey]: value }, "", url);
            } catch (_) { }
        }

        let current = Math.max(
            panelItems.findIndex(panel => pgs(panel).state.contains("active")),
            buttons.findIndex(button => pgs(button).state.contains("active")),
            0,
        );

        function setState(element, active) {
            pgs(element).state.toggle("active", active);
        }

        function select(index, focus = false, history = true) {
            if (!Number.isInteger(index) || index < 0 || index >= buttons.length) return;
            current = index;
            if (history) writeHistory();

            buttons.forEach((button, buttonIndex) => {
                const active = buttonIndex === current;
                setState(button, active);
                button.setAttribute("aria-selected", String(active));
                button.tabIndex = active ? 0 : -1;
            });

            panelItems.forEach((panel, panelIndex) => {
                const active = panelIndex === current;
                setState(panel, active);
                panel.hidden = !active;
            });

            if (focus) buttons[current].focus();
            tabs.dispatchEvent(new CustomEvent("pgs:tabs:change", {
                detail: { current, tab: buttons[current], panel: panelItems[current] },
            }));
        }

        buttons.forEach((button, index) => {
            const buttonId = button.id || `tabs-list-tab-${id}-${index + 1}`;
            const panelId = panelItems[index].id || `tabs-panels-content-${id}-${index + 1}`;

            button.id = buttonId;
            button.type = "button";
            button.setAttribute("role", "tab");
            button.setAttribute("aria-controls", panelId);

            panelItems[index].id = panelId;
            panelItems[index].setAttribute("role", "tabpanel");
            panelItems[index].setAttribute("aria-labelledby", buttonId);

            button.addEventListener("click", () => select(index));
            button.addEventListener("keydown", (event) => {
                let next = null;
                if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (current + 1) % buttons.length;
                if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (current - 1 + buttons.length) % buttons.length;
                if (event.key === "Home") next = 0;
                if (event.key === "End") next = buttons.length - 1;
                if (next === null) return;

                event.preventDefault();
                select(next, true);
            });
        });

        //== the URL wins over the state written in the markup: a reload lands on the tab the reader
        //== left, and the first pass only reads it — it never pushes an entry of its own
        const restored = indexFromHistory();
        select(restored === -1 ? current : restored, false, false);

        if (historyKey) {
            window.addEventListener("popstate", () => {
                const index = indexFromHistory();
                select(index === -1 ? 0 : index, false, false);
            });
        }

        API.set(tabs, {
            element: tabs,
            list,
            panels,
            select: (index) => select(index),
            getCurrent: () => current,
            refresh: () => {
                PGS_tabs_init(tabs.parentNode || document);
                return API.get(tabs);
            },
        });
    });
}

PGS_onDocumentReady(PGS_tabs_init);

function PGS_tabs_api(selector) {
    return API.get(selector);
}

export const PGS_tabs = {
    init: PGS_tabs_init,
    api: PGS_tabs_api,
};
