//= ACCORDION
const API = new WeakMap();

export function PGS_accordion_init(root = document) {
    pgs(root).querySelectorAll("accordion").forEach((accordion, index) => {
        if (API.has(accordion)) return;

        const BUTTON = pgs(accordion).querySelector("accordion-button");
        const CONTENT = pgs(accordion).querySelector("accordion-content");
        if (!BUTTON || !CONTENT) return;

        //== ID univoci per aria-controls / aria-labelledby
        const ID = index + 1;
        const btnId = `acc-btn-${ID}`;
        const panelId = `acc-panel-${ID}`;

        //== Stato iniziale
        const isOpenInit = pgs(accordion).state.contains("open");

        //== Accessibilità (setup una volta)
        BUTTON.setAttribute("role", "button");
        BUTTON.setAttribute("tabindex", "0");
        BUTTON.setAttribute("id", btnId);
        BUTTON.setAttribute("aria-controls", panelId);

        CONTENT.setAttribute("id", panelId);
        CONTENT.setAttribute("role", "region");
        CONTENT.setAttribute("aria-labelledby", btnId);

        //+ Accessibility (applica stato aperto/chiuso)
        function accordionAccessibility(isOpen, button, content) {
            const text = (button?.textContent || "").trim().replace(/\s+/g, " ");
            button.setAttribute("aria-label", `${isOpen ? "Chiudi" : "Apri"} ${text || "sezione"}`);
            button.setAttribute("aria-expanded", String(isOpen));
            content.hidden = !isOpen;
        }

        //+ Chiudi tutti gli altri
        function closeOltherAccordion() {
            for (const otherLi of pgs(document).querySelectorAll("accordion")) {
                if (otherLi === accordion) continue;

                const otherBtn = pgs(otherLi).querySelector("accordion-button");
                const otherContent = pgs(otherLi).querySelector("accordion-content");
                if (!otherBtn || !otherContent) continue;

                pgs(otherLi).state().remove("open");
                accordionAccessibility(false, otherBtn, otherContent);
            }
        }

        //+ FN ACCORDION
        function accordionFunction() {
            const isOpen = pgs(accordion).state.contains("open");
            const nowOpen = !isOpen;

            pgs(accordion).state.toggle("open", nowOpen);
            accordionAccessibility(nowOpen, BUTTON, CONTENT);

            closeOltherAccordion();

            //== scroll to view
            if (nowOpen) setTimeout(() => accordion.scrollIntoView({ block: "nearest", inline: "nearest" }), 100);
        }

        function open() {
            if (!pgs(accordion).state.contains("open")) accordionFunction();
        }

        function close() {
            if (pgs(accordion).state.contains("open")) accordionFunction();
        }

        // applica stato iniziale
        accordionAccessibility(isOpenInit, BUTTON, CONTENT);

        //- Eventi
        BUTTON.addEventListener("click", accordionFunction);

        //- Tastiera: Enter / Space
        BUTTON.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                accordionFunction();
            }
        });

        API.set(accordion, {
            element: accordion,
            button: BUTTON,
            content: CONTENT,
            open,
            close,
            toggle: accordionFunction,
            refresh: () => {
                PGS_accordion_init(accordion.parentNode || document);
                return API.get(accordion);
            },
            isOpen: () => pgs(accordion).state.contains("open"),
        });
    });
}

//# INIT
PGS_accordion_init();

//# API
export function PGS_accordion_api(selector) {
    return API.get(selector);
}

export const PGS_accordion = {
    PGS_name: "PGS_accordion",
    init: PGS_accordion_init,
    api: PGS_accordion_api
};
