import { pgs } from "../_pgs.js";
import { PGS_dropdown } from "./_dropdown.js";
import { PGS_onDocumentReady } from "../helper/_onDocumentReady.js";
import { PGS_directChild, PGS_roots, PGS_uniqueId } from "../helper/_dom.js";
import { PGS_warn } from "../helper/_warn.js";

const API = new WeakMap();

//+ the toggle looks and sits the same whichever behavior it drives, so it is built once here
function createToggle(link) {
    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = `<i pgs="icon['icon-chevronDown']"></i>`;

    pgs(button).add("_menu-submenuButton", "hover", "button['btnMini' 'btnIconOnly']");
    link.insertAdjacentElement("afterend", button);

    return button;
}

//+ opens the submenu in place instead of floating it: used everywhere a dropdown would either
//+ overflow the viewport or hide the branch the reader is already inside
function setupAccordion(li, button, ul, signal) {
    pgs(li).add("_menu-accordion");

    if (!ul.id) ul.id = PGS_uniqueId("menu-submenu");
    button.setAttribute("aria-controls", ul.id);

    //== a submenu nested inside a first-level dropdown changes the size of the floating panel,
    //== whose position was computed for the size it had when it opened
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

//= DROP DOWN MENU
function initializeMenu(MENU) {
    if (API.has(MENU)) return;

    const topLevel = MENU.querySelector("ul");
    if (!topLevel) {
        PGS_warn("menu.init", "a menu needs a ul list, skipped", MENU);
        return;
    }

    const controller = new AbortController();
    const { signal } = controller;
    const isHorizontal = pgs(MENU).option.contains("menuHorizontal");
    const floating = [];

    MENU.querySelectorAll("li").forEach(li => {
        const ul = li.querySelector("ul");
        if (!ul) return;

        //== the toggle goes after the item's own link, never after one of a nested submenu
        const link = li.querySelector(":scope > a");
        if (!link) {
            PGS_warn("menu.init", "a menu item with a submenu needs a direct link of its own, skipped", li);
            return;
        }

        //== a refresh finds the toggle the first pass generated and reuses it
        const button = PGS_directChild(li, "_menu-submenuButton") || createToggle(link);

        //== only the first level of a horizontal menu floats its submenu: deeper levels would
        //== stack dropdown over dropdown, and a vertical menu has the room to expand in place
        const isFirstLevel = li.parentElement === topLevel;

        if (isHorizontal && isFirstLevel) {
            setupDropdown(li, button, ul);
            floating.push(li);
        } else setupAccordion(li, button, ul, signal);
    });

    function destroy() {
        controller.abort();
        floating.forEach(li => PGS_dropdown.api(li)?.destroy());
        API.delete(MENU);
    }

    API.set(MENU, {
        element: MENU,
        type: isHorizontal ? "horizontal" : "vertical",
        destroy,
        refresh: () => {
            destroy();
            initializeMenu(MENU);
            return API.get(MENU);
        },
    });
    PGS_dropdown.init(MENU);
}

function PGS_menu_init(root = document) {
    PGS_roots(root, "menu").forEach(menu => initializeMenu(menu));
}

PGS_onDocumentReady(PGS_menu_init);

function PGS_menu_api(selector) {
    return API.get(selector);
}

//# EXPORT
export const PGS_menu = {
    init: PGS_menu_init,
    api: PGS_menu_api
};
