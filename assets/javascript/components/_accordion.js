import { PGS_onDocumentReady } from "../helper/_onDocumentReady.js";

//= ACCORDION
const API = new WeakMap();
let accordionId = 0;

function nextAccordionId() {
    accordionId += 1;
    return accordionId;
}

function directPgsChild(element, token) {
    return Array.from(element.children).find(child => pgs(child).contains(token));
}

function PGS_accordion_init(root = document) {
    pgs(root).querySelectorAll("accordion").forEach((accordion) => {
        if (API.has(accordion)) return;

        const BUTTON = directPgsChild(accordion, "accordion-button");
        const CONTENT = directPgsChild(accordion, "accordion-content");
        if (!BUTTON || !CONTENT) return;

        //== ids of its own for aria-controls / aria-labelledby
        const ID = nextAccordionId();
        const btnId = `acc-btn-${ID}`;
        const panelId = `acc-panel-${ID}`;

        //== initial state: autoOpen is the authored form, because pgs-state belongs to
        //== the runtime; a pgs-state="open" already written by hand is honoured all the same
        const isOpenInit = pgs(accordion).option.contains("autoOpen") || pgs(accordion).state.contains("open");

        //== an accordion closes the others only inside a group, and the group is the nearest
        //== accordionContainer above it: on its own an accordion answers for itself alone, so a
        //== single panel dropped anywhere on the page no longer collapses somebody else's
        const CONTAINER = pgs(accordion).closest("accordionContainer");
        const isMultiOpen = !CONTAINER || pgs(CONTAINER).option.contains("multiOpen");

        //== accessibility, written once
        BUTTON.setAttribute("role", "button");
        BUTTON.setAttribute("tabindex", "0");
        if (!BUTTON.id) BUTTON.setAttribute("id", btnId);

        if (!CONTENT.id) CONTENT.setAttribute("id", panelId);
        BUTTON.setAttribute("aria-controls", CONTENT.id);
        CONTENT.setAttribute("role", "region");
        CONTENT.setAttribute("aria-labelledby", BUTTON.id);

        //+ Accessibility (writes the open/closed state)
        //== the composed label says what the click does, and is only written when the author has
        //== not named the control themselves: a hand-written aria-label is the page's own wording
        //== and survives every toggle
        const hasAuthorLabel = BUTTON.hasAttribute("aria-label");

        function accordionAccessibility(isOpen, button, content) {
            if (!hasAuthorLabel) {
                const text = (button?.textContent || "").trim().replace(/\s+/g, " ");
                button.setAttribute("aria-label", `${isOpen ? "Close" : "Open"} ${text || "section"}`);
            }
            button.setAttribute("aria-expanded", String(isOpen));
            content.hidden = !isOpen;
        }

        //+ Close the others of the group
        //== only the accordions of this same group: an accordionContainer nested in another one
        //== keeps its own panels to itself, which is why the nearest container is compared rather
        //== than trusting the descendant search. autoOpen is left alone on purpose — it
        //== is the authored "this one stays open", so a sibling opening does not take it down,
        //== and only until the reader works that panel themselves, which drops the token
        function closeOtherAccordion() {
            for (const otherLi of pgs(CONTAINER).querySelectorAll("accordion")) {
                if (otherLi === accordion) continue;
                if (pgs(otherLi).closest("accordionContainer") !== CONTAINER) continue;
                if (pgs(otherLi).option.contains("autoOpen")) continue;

                const otherBtn = pgs(otherLi).querySelector("accordion-button");
                const otherContent = pgs(otherLi).querySelector("accordion-content");
                if (!otherBtn || !otherContent) continue;

                pgs(otherLi).state.remove("open");
                accordionAccessibility(false, otherBtn, otherContent);
            }
        }

        //+ FN ACCORDION
        function accordionFunction() {
            const isOpen = pgs(accordion).state.contains("open");
            const nowOpen = !isOpen;

            pgs(accordion).state.toggle("open", nowOpen);
            accordionAccessibility(nowOpen, BUTTON, CONTENT);

            //== the moment the reader works this panel, autoOpen stops being the authored
            //== "this one stays open": from here on it is an ordinary panel of the group, so a
            //== sibling opening can close it. Guarded, because remove() would otherwise write an
            //== empty pgs-option on every accordion that never had one
            if (pgs(accordion).option.contains("autoOpen")) pgs(accordion).option.remove("autoOpen");
            if (!isMultiOpen) closeOtherAccordion();

            //== scroll to view
            if (nowOpen) setTimeout(() => accordion.scrollIntoView({ block: "nearest", inline: "nearest" }), 100);
        }

        function open() {
            if (!pgs(accordion).state.contains("open")) accordionFunction();
        }

        function close() {
            if (pgs(accordion).state.contains("open")) accordionFunction();
        }

        //== writes that initial state, rather than only reading it: with autoOpen the
        //== pgs-state is not there yet, and it is what the CSS reads to turn the arrow
        pgs(accordion).state.toggle("open", isOpenInit);
        accordionAccessibility(isOpenInit, BUTTON, CONTENT);

        //- Events
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
PGS_onDocumentReady(PGS_accordion_init);

//# API
function PGS_accordion_api(selector) {
    return API.get(selector);
}

export const PGS_accordion = {
    init: PGS_accordion_init,
    api: PGS_accordion_api
};
