import { PGS_dropdown_init, PGS_dropdown_api } from "./_dropdown";

const API = new WeakMap();

//= DROP DOWN MENU
export function PGS_menu_init(root = document) {

    pgs(root).querySelectorAll('menu-horizontal').forEach(MENU => {
        if (API.has(MENU)) return;

        MENU.querySelectorAll('nav > ul > li.menu-item-has-children').forEach(li => {
            if (li.querySelector("ul")) {
                const ul = li.querySelector("ul");
                if (pgs(li).querySelector("dropdown-button")) return;

                const button = document.createElement("button");
                button.className = "icon-down";
                button.type = "button";
                button.innerHTML = "<span>&#9207;</span>";
                li.querySelector("a").insertAdjacentElement("afterend", button);

                pgs(li).add("dropdown")
                pgs(button).add("dropdown-button")
                pgs(button).add("buttonNohover")
                pgs(ul).add("dropdown-content")
                pgs(ul).add("menu-vertical")
            }
        });

        API.set(MENU, {
            element: MENU,
            type: "horizontal",
            items: () => Array.from(MENU.querySelectorAll('nav > ul > li')),
            submenus: () => Array.from(MENU.querySelectorAll('.menu-item-has-children > ul')),
            dropdowns: () => Array.from(MENU.querySelectorAll('.menu-item-has-children')).map(PGS_dropdown_api).filter(Boolean),
            refresh: () => {
                PGS_menu_init(MENU.parentNode || document);
                return API.get(MENU);
            },
        });
    });

    pgs(root).querySelectorAll('menu-vertical').forEach(MENU => {
        if (API.has(MENU)) return;

        MENU.querySelectorAll('.menu-item-has-children').forEach((li, index) => {
            const ul = li.querySelector("ul");

            if (!ul) return
            if (li.querySelector(":scope > button")) return;

            const button = document.createElement("button");
            button.className = "icon-down buttonIcon";
            button.type = "button";

            // ID unico per aria-controls
            const submenuId = `vertical-submenu-${index}`;
            ul.id = submenuId;

            // Stato iniziale
            pgs(button).add("buttonIcon")
            button.setAttribute("aria-expanded", "false");
            button.setAttribute("aria-controls", submenuId);
            button.setAttribute("aria-label", "Apri sottomenu");
            button.innerHTML = "<span aria-hidden='true'>&#9207;</span>";
            li.querySelector("a").insertAdjacentElement("afterend", button);

            function toggleMenu() {
                // const isOpena = ul.classList.toggle("open");
                const isOpen = pgs(ul).state.toggle("open");
                button.setAttribute("aria-expanded", isOpen);
                button.setAttribute("aria-label", isOpen ? "Chiudi sottomenu" : "Apri sottomenu");
            };

            // Click
            button.addEventListener("click", toggleMenu);
            button.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleMenu();
                }
            });
        });

        function submenu(index) {
            return MENU.querySelectorAll('.menu-item-has-children > ul')[index];
        }

        function setSubmenu(index, open) {
            const ul = submenu(index);
            const button = ul?.parentElement?.querySelector(":scope > button");
            if (!ul || !button) return;

            pgs(ul).state.toggle("open", open);
            button.setAttribute("aria-expanded", String(open));
            button.setAttribute("aria-label", open ? "Chiudi sottomenu" : "Apri sottomenu");
        }

        API.set(MENU, {
            element: MENU,
            type: "vertical",
            items: () => Array.from(MENU.querySelectorAll(':scope > li')),
            submenus: () => Array.from(MENU.querySelectorAll('.menu-item-has-children > ul')),
            openSubmenu: (index) => setSubmenu(index, true),
            closeSubmenu: (index) => setSubmenu(index, false),
            toggleSubmenu: (index) => {
                const ul = submenu(index);
                if (!ul) return;
                setSubmenu(index, !pgs(ul).state.contains("open"));
            },
            isSubmenuOpen: (index) => {
                const ul = submenu(index);
                return ul ? pgs(ul).state.contains("open") : false;
            },
            refresh: () => {
                PGS_menu_init(MENU.parentNode || document);
                return API.get(MENU);
            },
        });

        // pgs(document).querySelectorAll('menu-vertical').forEach(MENU => {

        //     MENU.querySelectorAll('.menu-item-has-children').forEach(li => {
        //         if (li.querySelector("ul")) {
        //             const ul = li.querySelector("ul");

        //             const button = document.createElement("button");
        //             button.className = "icon-down";
        //             button.type = "button";
        //             button.innerHTML = "<span>&#9207;</span>";
        //             li.querySelector("a").insertAdjacentElement("afterend", button);


        //             pgs(button).add("buttonIcon")
        //             button.addEventListener("click", () => {
        //                 ul.classList.toggle("open")
        //             })
        //         }
        //     });
        // });
    });
    PGS_dropdown_init()
}

//# INIT PGS_menu
PGS_menu_init()

//# API
export function PGS_menu_api(selector) {
    return API.get(selector);
}
