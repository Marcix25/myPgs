import { pgs_dropdown } from "./_dropdown";

//= DROP DOWN MENU
export function PGS_menu() {

    pgs(document).querySelectorAll('menu-horizontal').forEach(MENU => {

        MENU.querySelectorAll('nav > ul > li.menu-item-has-children').forEach(li => {
            if (li.querySelector("ul")) {
                const ul = li.querySelector("ul");

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
    });

    pgs(document).querySelectorAll('menu-vertical').forEach(MENU => {

        MENU.querySelectorAll('.menu-item-has-children').forEach((li, index) => {
            const ul = li.querySelector("ul");

            if (!ul) return

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
    pgs_dropdown()
}

//# INIT PGS_menu
PGS_menu()