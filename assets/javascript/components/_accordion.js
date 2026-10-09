import { pgs } from "../_pgs.js";
import { PGS_onDocumentReady } from "../helper/_onDocumentReady.js";
import { PGS_directChild, PGS_roots, PGS_uniqueId } from "../helper/_dom.js";
import { PGS_warn } from "../helper/_warn.js";

//# ACCORDION
const API = new WeakMap();

// the buttons whose aria-label the module composed itself: an aria-label on a button that is not in
// here is the author's own and is never overwritten. It has to be remembered outside the DOM, or a
// refresh would take the label the module wrote for the author's
const COMPOSED_LABELS = new WeakSet();

// how long the open/close transition runs, read from the same --accordion-timing the CSS uses
function accordionTiming(accordion) {
    const raw = window.getComputedStyle(accordion).getPropertyValue("--accordion-timing").trim();
    const value = parseFloat(raw);
    if (!Number.isFinite(value)) return 300;
    return raw.endsWith("ms") ? value : value * 1000;
}

// keeps an element where it is on screen while the layout above it moves: closing a tall sibling
// pulls everything below it up, so the panel the reader just clicked would slide away under the
// pointer and leave them far down the page. Follows it for as long as the transition runs.
// behavior "instant", so a page with scroll-behavior: smooth does not turn each correction into
// an animation of its own. Stops as soon as the signal of the accordion that asked is aborted
function keepInPlace(element, duration, signal) {
    const startTop = element.getBoundingClientRect().top;
    const end = performance.now() + duration + 50;

    function step(now) {
        if (signal.aborted) return;

        const delta = element.getBoundingClientRect().top - startTop;
        if (Math.abs(delta) >= 1) window.scrollBy({ top: delta, behavior: "instant" });
        if (now < end) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

//## Accessibility (writes the open/closed state)
// the composed label says what the click does, and is only written when the author has
// not named the control themselves: a hand-written aria-label is the page's own wording
// and survives every toggle
function accordionAccessibility(isOpen, button, content) {
    if (!button.hasAttribute("aria-label") || COMPOSED_LABELS.has(button)) {
        const text = (button.textContent || "").trim().replace(/\s+/g, " ");
        button.setAttribute("aria-label", `${isOpen ? "Close" : "Open"} ${text || "section"}`);
        COMPOSED_LABELS.add(button);
    }
    button.setAttribute("aria-expanded", String(isOpen));
    content.hidden = !isOpen;
}

function initializeAccordion(accordion) {
    if (API.has(accordion)) return;

    const BUTTON = PGS_directChild(accordion, "accordion-button");
    const CONTENT = PGS_directChild(accordion, "accordion-content");
    if (!BUTTON || !CONTENT) {
        PGS_warn("accordion.init", "an accordion needs a direct accordion-button and a direct accordion-content child, skipped", accordion);
        return;
    }

    const controller = new AbortController();
    const { signal } = controller;
    let scrollTimer = 0;

    // initial state: accAutoOpen is the authored form, because pgs-state belongs to
    // the runtime; a pgs-state="open" already written by hand is honored all the same
    const isOpenInit = pgs(accordion).option.contains("accAutoOpen") || pgs(accordion).state.contains("open");

    // an accordion closes the others only inside a group, and the group is the nearest
    // accordionContainer above it: on its own an accordion answers for itself alone, so a
    // single panel dropped anywhere on the page no longer collapses somebody else's
    const CONTAINER = pgs(accordion).closest("accordionContainer");
    const isMultiOpen = !CONTAINER || pgs(CONTAINER).option.contains("accMultiOpen");

    // accessibility, written once, with ids of its own for aria-controls / aria-labelledby
    BUTTON.setAttribute("role", "button");
    BUTTON.setAttribute("tabindex", "0");
    if (!BUTTON.id) BUTTON.id = PGS_uniqueId("acc-btn");
    if (!CONTENT.id) CONTENT.id = PGS_uniqueId("acc-panel");

    BUTTON.setAttribute("aria-controls", CONTENT.id);
    CONTENT.setAttribute("role", "region");
    CONTENT.setAttribute("aria-labelledby", BUTTON.id);

    //## Close the others of the group
    // only the accordions of this same group: an accordionContainer nested in another one
    // keeps its own panels to itself, which is why the nearest container is compared rather
    // than trusting the descendant search. accAutoOpen is left alone on purpose — it
    // is the authored "this one stays open", so a sibling opening does not take it down,
    // and only until the reader works that panel themselves, which drops the token
    function closeOtherAccordion() {
        for (const otherLi of pgs(CONTAINER).querySelectorAll("accordion")) {
            if (otherLi === accordion) continue;
            if (pgs(otherLi).closest("accordionContainer") !== CONTAINER) continue;
            if (pgs(otherLi).option.contains("accAutoOpen")) continue;

            const otherBtn = PGS_directChild(otherLi, "accordion-button");
            const otherContent = PGS_directChild(otherLi, "accordion-content");
            if (!otherBtn || !otherContent) continue;

            pgs(otherLi).state.remove("open");
            accordionAccessibility(false, otherBtn, otherContent);
        }
    }

    //## FN ACCORDION
    function accordionFunction() {
        const isOpen = pgs(accordion).state.contains("open");
        const nowOpen = !isOpen;
        const timing = accordionTiming(accordion);

        // measured before anything changes: this button's position is the one to hold
        keepInPlace(BUTTON, timing, signal);

        pgs(accordion).state.toggle("open", nowOpen);
        accordionAccessibility(nowOpen, BUTTON, CONTENT);

        // the moment the reader works this panel, accAutoOpen stops being the authored
        // "this one stays open": from here on it is an ordinary panel of the group, so a
        // sibling opening can close it. Guarded, because remove() would otherwise write an
        // empty pgs-option on every accordion that never had one
        if (pgs(accordion).option.contains("accAutoOpen")) pgs(accordion).option.remove("accAutoOpen");
        if (!isMultiOpen) closeOtherAccordion();

        // once the layout has settled, only scroll if the button ended up out of view (an
        // open() called from code, say): the reader's own click is already held in place
        window.clearTimeout(scrollTimer);
        if (nowOpen) scrollTimer = window.setTimeout(() => {
            const rect = BUTTON.getBoundingClientRect();
            if (rect.top < 0 || rect.bottom > window.innerHeight) BUTTON.scrollIntoView({ block: "nearest", inline: "nearest" });
        }, timing + 60);
    }

    function open() {
        if (!pgs(accordion).state.contains("open")) accordionFunction();
    }

    function close() {
        if (pgs(accordion).state.contains("open")) accordionFunction();
    }

    // writes that initial state, rather than only reading it: with accAutoOpen the
    // pgs-state is not there yet, and it is what the CSS reads to turn the arrow
    pgs(accordion).state.toggle("open", isOpenInit);
    accordionAccessibility(isOpenInit, BUTTON, CONTENT);

    //## Events
    BUTTON.addEventListener("click", accordionFunction, { signal });

    //## Keyboard: Enter / Space
    BUTTON.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            accordionFunction();
        }
    }, { signal });

    function destroy() {
        controller.abort();
        window.clearTimeout(scrollTimer);
        API.delete(accordion);
    }

    API.set(accordion, {
        element: accordion,
        button: BUTTON,
        content: CONTENT,
        open,
        close,
        toggle: accordionFunction,
        destroy,
        refresh: () => {
            destroy();
            initializeAccordion(accordion);
            return API.get(accordion);
        },
        isOpen: () => pgs(accordion).state.contains("open"),
    });
}

function PGS_accordion_init(root = document) {
    PGS_roots(root, "accordion").forEach(accordion => initializeAccordion(accordion));
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
