import { pgs } from "../_pgs.js";
import { PGS_onDocumentReady } from "../helper/_onDocumentReady.js";
import { PGS_roots } from "../helper/_dom.js";
import { PGS_svg } from "./_svg.js";

//= DARKMODE

const INITIALIZED_BUTTONS = new WeakSet();

//+ CHANGE ICON
//## the glyph is not the author's choice here: the library owns it, because it has to say which way
//## the switch is pointing. It draws it from the built-in set so the control is never blank, and
//## looks for a marked element as well as an <i>, so an icon set that renders anything else still
//## gets found. The fa- classes stay on for the pages that style them
function changeIcon(selector, isDarkMode) {
    selector.forEach(button => {
        const ICON = pgs(button).querySelector("icon") || button.querySelector("i");
        if (!ICON) return;

        pgs(ICON).add("icon");
        pgs(ICON).option.toggle("icon-moon", !isDarkMode);
        pgs(ICON).option.toggle("icon-sun", isDarkMode);
        ICON.classList.toggle("fa-moon", !isDarkMode);
        ICON.classList.toggle("fa-sun", isDarkMode);
    });
}

//+ STORED CHOICE
//## localStorage throws when the browser blocks site data, and answers null in some private windows:
//## either way the choice lives in memory for the rest of the page, so the switch still works
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

//+ SET STATUS
function setDarkmodeStatus(toggle = false, button = []) {
    let isDarkMode = readStoredChoice();

    if (toggle) {
        isDarkMode = !isDarkMode;
        writeStoredChoice(isDarkMode);
    }

    // SET
    pgs(document.documentElement).state.toggle("darkmode", isDarkMode);
    if (document.body) pgs(document.body).state.toggle("darkmode", isDarkMode);
    // END SET

    changeIcon(button, isDarkMode);
    document.dispatchEvent(new CustomEvent(PGS_svg.eventChangeColor, { detail: { isDarkMode } }));
}



//# INIT
//## applies the stored theme to the root as soon as the bundle is parsed in the head, so a
//## reload never paints the wrong one first
if (typeof document !== "undefined") setDarkmodeStatus();

//## binds the switches in root that are not bound yet and draws their glyph. Switches already
//## bound are left untouched, so pgs.init(el) on a page that is already running changes nothing
//## else: it does not re-apply the theme or fire the color event again
function PGS_darkmode_init(root = document) {
    const isDarkMode = pgs(document.documentElement).state.contains("darkmode");
    const buttons = PGS_roots(root, "toggleDarkmode").filter(button => !INITIALIZED_BUTTONS.has(button));

    changeIcon(buttons, isDarkMode);

    buttons.forEach(button => {
        INITIALIZED_BUTTONS.add(button);
        button.addEventListener("click", () => {
            setDarkmodeStatus(true, pgs(document).querySelectorAll("toggleDarkmode"));
        });
    });
}

//## the first pass once the page is ready: the body exists now, so it takes the theme too
PGS_onDocumentReady(() => {
    setDarkmodeStatus(false, pgs(document).querySelectorAll("toggleDarkmode"));
    PGS_darkmode_init();
});

export const PGS_darkmode = {
    init: PGS_darkmode_init
};
