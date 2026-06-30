import { PGS_dropdown } from "./_dropdown";

const API = new WeakMap();

//= DROP DOWN MENU
function PGS_menu_init(root = document) {

    pgs(root).querySelectorAll('menu').forEach(MENU => {
        if (API.has(MENU)) return;

        MENU.querySelectorAll('li').forEach(li => {
            const ul = li.querySelector("ul");

            if (ul) {

                const button = document.createElement("button");
                button.type = "button";
                button.innerHTML = "<span>&#9207;</span>";
                pgs(button).add("menu-buttonIcon");
                li.querySelector("a").insertAdjacentElement("afterend", button);

                pgs(li).add("dropdown")
                pgs(button).add("dropdown-button")
                pgs(button).add("buttonNohover")
                pgs(ul).add("dropdown-content")

            }
        });

        API.set(MENU, {
            element: MENU,
            type: "horizontal",
            // items: () => Array.from(MENU.querySelectorAll('nav > ul > li')),
            // submenus: () => Array.from(MENU.querySelectorAll('.menu-item-has-children > ul')),
            // dropdowns: () => Array.from(MENU.querySelectorAll('.menu-item-has-children')).map(PGS_dropdown_api).filter(Boolean),
            refresh: () => {
                PGS_menu_init(MENU.parentNode || document);
                return API.get(MENU);
            },
        });
        PGS_dropdown.init(MENU);
    });

}

PGS_menu_init()

function PGS_menu_api(selector) {
    return API.get(selector);
}

//# EXPORT
export const PGS_menu = {
    init: PGS_menu_init,
    api: PGS_menu_api
};
