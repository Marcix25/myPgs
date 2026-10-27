import { pgs } from "../_pgs.js";
import { PGS_dropdown } from "./_dropdown.js";

const API = new WeakMap();

// the toggle looks and sits the same whichever behavior it drives, so it is built once here. It is the
// fallback: an item that holds its own menu-submenuButton never gets one
function createToggle(link) {
    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = `<i pgs="icon['icon-chevronDown']"></i>`;

    pgs(button).add("_menu-submenuButton", "button['btnMini' 'btnIconOnly']");
    link.insertAdjacentElement("afterend", button);

    return button;
}

// opens the submenu in place instead of floating it: used everywhere a dropdown would either
// overflow the viewport or hide the branch the reader is already inside
function setupAccordion(li, button, ul, signal) {
    pgs(li).add("_menu-accordion");

    if (!ul.id) ul.id = pgs.helper.uniqueId("menu-submenu");
    button.setAttribute("aria-controls", ul.id);

    // a submenu nested inside a first-level dropdown changes the size of the floating panel,
    // whose position was computed for the size it had when it opened
    const dropdown = pgs(li).closest("dropdown");

    const setOpen = (open) => {
        pgs(li).state.toggle("open", open);
        button.setAttribute("aria-expanded", String(open));
        if (dropdown) PGS_dropdown.api(dropdown)?.reposition();
    };

    setOpen(pgs(li).state.contains("open"));
    button.addEventListener("click", () => setOpen(!pgs(li).state.contains("open")), { signal });
}

function setupDropdown(li, button, ul) {
    pgs(li).add("dropdown");
    pgs(li).data.setValueBrackets("dropdownPosition", "bottom center");
    pgs(button).add("dropdown-button");
    pgs(ul).add("dropdown-content");
}

//# DROP DOWN MENU
function initializeMenu(MENU) {
    if (API.has(MENU)) return;

    const topLevel = MENU.querySelector("ul");
    if (!topLevel) {
        pgs.helper.warn("menu.init", "a menu needs a ul list, skipped", MENU);
        return;
    }

    const controller = new AbortController();
    const { signal } = controller;
    const isHorizontal = pgs(MENU).option.contains("menuHorizontal");
    const floating = [];

    MENU.querySelectorAll("li").forEach(li => {
        const ul = li.querySelector("ul");
        if (!ul) return;

        // the toggle goes after the item's own link, never after one of a nested submenu
        const link = li.querySelector(":scope > a");
        if (!link) {
            pgs.helper.warn("menu.init", "a menu item with a submenu needs a direct link of its own, skipped", li);
            return;
        }

        // a toggle written by hand keeps the bare name and is used as it is, with the icon of the author's
        // choice; a refresh finds the one the first pass generated and reuses it. Only when there is
        // neither is one built
        const button = pgs.helper.directChild(li, ["menu-submenuButton", "_menu-submenuButton"]) || createToggle(link);

        // only the first level of a horizontal menu floats its submenu: deeper levels would
        // stack dropdown over dropdown, and a vertical menu has the room to expand in place
        const isFirstLevel = li.parentElement === topLevel;

        if (isHorizontal && isFirstLevel) {
            setupDropdown(li, button, ul);
            floating.push(li);
        } else setupAccordion(li, button, ul, signal);
    });

    function destroy() {
        // a stale instance (already replaced by a refresh) must not tear down the live one
        if (API.get(MENU) !== api) return;

        controller.abort();
        floating.forEach(li => PGS_dropdown.api(li)?.destroy());
        API.delete(MENU);
    }

    const api = {
        element: MENU,
        type: isHorizontal ? "horizontal" : "vertical",
        destroy,
        refresh: () => {
            const live = API.get(MENU);
            if (live && live !== api) return live;
            destroy();
            initializeMenu(MENU);
            return API.get(MENU);
        },
    };
    API.set(MENU, api);
    PGS_dropdown.init(MENU);
}

function PGS_menu_init(root = document) {
    pgs.helper.roots(root, "menu").forEach(menu => initializeMenu(menu));
}

pgs.helper.onDocumentReady(PGS_menu_init);

function PGS_menu_api(selector) {
    return API.get(selector);
}

//# EXPORT
export const PGS_menu = {
    init: PGS_menu_init,
    api: PGS_menu_api
};
