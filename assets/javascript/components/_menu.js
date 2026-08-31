import { PGS_dropdown } from "./_dropdown";
import { PGS_onDocumentReady } from "../helper/_onDocumentReady.js";

const API = new WeakMap();
let submenuId = 0;

//+ the toggle looks and sits the same whichever behaviour it drives, so it is built once here
function createToggle(li) {
    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = "<span>&#9207;</span>";

    pgs(button).add("_menu-buttonIcon", "button");
    pgs(button).option.add("buttonNohover");
    li.querySelector("a").insertAdjacentElement("afterend", button);

    return button;
}

//+ opens the submenu in place instead of floating it: used everywhere a dropdown would either
//+ overflow the viewport or hide the branch the reader is already inside
function setupAccordion(li, button, ul) {
    pgs(li).add("_menu-accordion");

    if (!ul.id) ul.id = `menu-submenu-${++submenuId}`;
    button.setAttribute("aria-controls", ul.id);

    //== a submenu nested inside a first-level dropdown changes the size of the floating panel,
    //== whose position was computed for the size it had when it opened
    const dropdown = li.closest('[pgs~="dropdown"]');

    const setOpen = (open) => {
        pgs(li).state.toggle("open", open);
        button.setAttribute("aria-expanded", String(open));
        if (dropdown) globalThis.pgs?.dropdown?.api(dropdown)?.reposition?.();
    };

    setOpen(pgs(li).state.contains("open"));
    button.addEventListener("click", () => setOpen(!pgs(li).state.contains("open")));
}

function setupDropdown(li, button, ul) {
    pgs(li).add("dropdown");
    pgs(li).option.setValueBrackets("dropdownPosition", "bottom right");
    pgs(button).add("dropdown-button");
    pgs(ul).add("dropdown-content");
}

//= DROP DOWN MENU
function PGS_menu_init(root = document) {

    pgs(root).querySelectorAll('menu').forEach(MENU => {
        if (API.has(MENU)) return;

        const isHorizontal = pgs(MENU).option.contains("menuHorizontal");
        const topLevel = MENU.querySelector("ul");

        MENU.querySelectorAll('li').forEach(li => {
            const ul = li.querySelector("ul");
            if (!ul) return;

            const button = createToggle(li);

            //== only the first level of a horizontal menu floats its submenu: deeper levels would
            //== stack dropdown over dropdown, and a vertical menu has the room to expand in place
            const isFirstLevel = li.parentElement === topLevel;

            if (isHorizontal && isFirstLevel) setupDropdown(li, button, ul);
            else setupAccordion(li, button, ul);
        });

        API.set(MENU, {
            element: MENU,
            type: isHorizontal ? "horizontal" : "vertical",
            refresh: () => {
                PGS_menu_init(MENU.parentNode || document);
                return API.get(MENU);
            },
        });
        PGS_dropdown.init(MENU);
    });

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
