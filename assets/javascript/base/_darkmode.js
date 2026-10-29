import { pgs } from "../_pgs.js";
import { PGS_svg } from "./_svg.js";

//= DARKMODE

const INITIALIZED_BUTTONS = new WeakSet();

//# STORED CHOICE
// localStorage throws when the browser blocks site data, and answers null in some private windows:
// either way the choice lives in memory for the rest of the page, so the switch still works
const STORAGE_KEY = "screenIsDarkMode";
let memoryChoice = false;

function readStoredChoice() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored !== null) return stored === "true";
    } catch (_) { }
    return memoryChoice;
}

function writeStoredChoice(isDarkMode) {
    memoryChoice = isDarkMode;
    try { localStorage.setItem(STORAGE_KEY, isDarkMode); } catch (_) { }
}

//# SET STATUS
function setDarkmodeStatus(toggle = false) {
    let isDarkMode = readStoredChoice();

    if (toggle) {
        isDarkMode = !isDarkMode;
        writeStoredChoice(isDarkMode);
    }

    // SET
    pgs(document.documentElement).state.toggle("darkmode", isDarkMode);
    if (document.body) pgs(document.body).state.toggle("darkmode", isDarkMode);
    // END SET

    // on the root element, like every pgs:* event: it bubbles up to the document, and detail.element is
    // the element it was dispatched on
    pgs.helper.dispatch(document.documentElement, PGS_svg.eventChangeColor, { isDarkMode });
}



//# INIT
// applies the stored theme to the root as soon as the bundle is parsed in the head, so a
// reload never paints the wrong one first
if (typeof document !== "undefined") setDarkmodeStatus();

// binds the switches in root that are not bound yet. Switches already bound are left untouched, so
// pgs.helper.init(el) on a page that is already running changes nothing else: it does not re-apply the
// theme or fire the color event again. The icon of a switch is not drawn here: the author writes a
// toggleDarkmode-light and a toggleDarkmode-dark in it, and the stylesheet shows the one of the theme
function PGS_darkmode_init(root = document) {
    const buttons = pgs.helper.roots(root, "toggleDarkmode").filter(button => !INITIALIZED_BUTTONS.has(button));

    buttons.forEach(button => {
        INITIALIZED_BUTTONS.add(button);
        button.addEventListener("click", () => setDarkmodeStatus(true));
    });
}

// the first pass once the page is ready: the body exists now, so it takes the theme too
pgs.helper.onDocumentReady(() => {
    setDarkmodeStatus(false);
    PGS_darkmode_init();
});

export const PGS_darkmode = {
    init: PGS_darkmode_init
};
