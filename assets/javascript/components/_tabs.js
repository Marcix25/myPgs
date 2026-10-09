import { pgs } from "../_pgs.js";
import { PGS_onDocumentReady } from "../helper/_onDocumentReady.js";
import { PGS_directChild, PGS_directChildren, PGS_dispatch, PGS_roots, PGS_uniqueId } from "../helper/_dom.js";
import { PGS_invalid, PGS_warn } from "../helper/_warn.js";

const API = new WeakMap();

//+ the tab buttons whose id the module generated: an id the author wrote is what reaches the URL, and
//+ a refresh has to keep telling the two apart
const GENERATED_IDS = new WeakSet();

function initializeTabs(tabs) {
    if (API.has(tabs)) return;

    const list = PGS_directChild(tabs, "tabs-list");
    const panels = PGS_directChild(tabs, "tabs-panels");
    if (!list || !panels) {
        PGS_warn("tabs.init", "tabs needs a direct tabs-list and a direct tabs-panels child, skipped", tabs);
        return;
    }

    const buttons = PGS_directChildren(list, "tabs-list-tab");
    const panelItems = PGS_directChildren(panels, "tabs-panels-content");
    if (!buttons.length || buttons.length !== panelItems.length) {
        PGS_warn("tabs.init", `tabs needs as many tabs-panels-content as tabs-list-tab, and at least one (found ${buttons.length} tabs and ${panelItems.length} panels), skipped`, tabs);
        return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    //== ids generated as tabs-list-tab-N-M and tabs-panels-content-N-M: N counts the tabs sets, M the tab
    const buttonIdBase = PGS_uniqueId("tabs-list-tab");
    const panelIdBase = PGS_uniqueId("tabs-panels-content");
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
    const authoredIds = buttons.map(button => (button.id && !GENERATED_IDS.has(button) ? button.id : ""));

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

    //+ writes the selection to the DOM and announces it
    function show(index, { focus = false, history = true } = {}) {
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
        PGS_dispatch(tabs, "pgs:tabs:change", { current, tab: buttons[current], panel: panelItems[current] });
    }

    //== the tab that is already selected changes nothing: no second history entry, no second event
    function select(index, options = {}) {
        if (index === current) {
            if (options.focus) buttons[current].focus();
            return;
        }
        show(index, options);
    }

    buttons.forEach((button, index) => {
        const buttonId = button.id || `${buttonIdBase}-${index + 1}`;
        const panelId = panelItems[index].id || `${panelIdBase}-${index + 1}`;

        if (!button.id) GENERATED_IDS.add(button);
        button.id = buttonId;
        button.type = "button";
        button.setAttribute("role", "tab");
        button.setAttribute("aria-controls", panelId);

        panelItems[index].id = panelId;
        panelItems[index].setAttribute("role", "tabpanel");
        panelItems[index].setAttribute("aria-labelledby", buttonId);

        button.addEventListener("click", () => select(index), { signal });
        button.addEventListener("keydown", (event) => {
            let next = null;
            if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (current + 1) % buttons.length;
            if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (current - 1 + buttons.length) % buttons.length;
            if (event.key === "Home") next = 0;
            if (event.key === "End") next = buttons.length - 1;
            if (next === null) return;

            event.preventDefault();
            select(next, { focus: true });
        }, { signal });
    });

    //== the URL wins over the state written in the markup: a reload lands on the tab the reader
    //== left, and the first pass only reads it — it never pushes an entry of its own
    const restored = indexFromHistory();
    show(restored === -1 ? current : restored, { history: false });

    if (historyKey) {
        window.addEventListener("popstate", () => {
            const index = indexFromHistory();
            select(index === -1 ? 0 : index, { history: false });
        }, { signal });
    }

    function destroy() {
        controller.abort();
        API.delete(tabs);
    }

    API.set(tabs, {
        element: tabs,
        list,
        panels,
        goTo: (index) => {
            if (!Number.isInteger(index) || index < 0 || index >= buttons.length) {
                throw PGS_invalid("tabs.goTo", `index must be an integer from 0 to ${buttons.length - 1}`);
            }
            select(index);
        },
        getCurrent: () => current,
        destroy,
        refresh: () => {
            destroy();
            initializeTabs(tabs);
            return API.get(tabs);
        },
    });
}

function PGS_tabs_init(root = document) {
    PGS_roots(root, "tabs").forEach(tabs => initializeTabs(tabs));
}

PGS_onDocumentReady(PGS_tabs_init);

function PGS_tabs_api(selector) {
    return API.get(selector);
}

export const PGS_tabs = {
    init: PGS_tabs_init,
    api: PGS_tabs_api,
};
