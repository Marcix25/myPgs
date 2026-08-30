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

        let current = Math.max(
            panelItems.findIndex(panel => pgs(panel).state.contains("active")),
            buttons.findIndex(button => pgs(button).state.contains("active")),
            0,
        );

        function setState(element, active) {
            pgs(element).state.toggle("active", active);
        }

        function select(index, focus = false) {
            if (!Number.isInteger(index) || index < 0 || index >= buttons.length) return;
            current = index;

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
            tabs.dispatchEvent(new CustomEvent("tabs:change", {
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

        select(current);

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
