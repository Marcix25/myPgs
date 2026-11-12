import { pgs } from "../_pgs.js";
import { PGS_svg } from "./_svg.js";

//= DARKMODE

const INITIALIZED_BUTTONS = new WeakSet();

//# STORED CHOICE
// "true" (dark), "false" (light) or "system" (the theme of the operating system). localStorage throws when
// the browser blocks site data, and answers null in some private windows: either way the choice lives in
// memory for the rest of the page, so the switch still works
const STORAGE_KEY = "screenIsDarkMode";
const SYSTEM = "system";
let memoryChoice = null;

function readStoredChoice() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored !== null) return stored;
    } catch (_) { }
    return memoryChoice;
}

function writeStoredChoice(choice) {
    memoryChoice = String(choice);
    try { localStorage.setItem(STORAGE_KEY, memoryChoice); } catch (_) { }
}

//# SYSTEM THEME
// the theme of the operating system, read live: a page that follows it changes with it
const SYSTEM_QUERY = typeof matchMedia === "function" ? matchMedia("(prefers-color-scheme: dark)") : null;

// with nothing stored, a page whose html carries htmlDarkmodeFollowSystem follows the system, any other starts light
function followsSystem() {
    const stored = readStoredChoice();
    if (stored === SYSTEM) return true;
    if (stored === "true" || stored === "false") return false;
    return pgs(document.documentElement).contains("htmlDarkmodeFollowSystem");
}

function isDarkMode() {
    return followsSystem() ? Boolean(SYSTEM_QUERY?.matches) : readStoredChoice() === "true";
}

//# SET STATUS
function setDarkmodeStatus(toggle = false) {
    let dark = isDarkMode();

    // a click on a switch fixes the theme it leads to, which leaves the system behind
    if (toggle) {
        dark = !dark;
        writeStoredChoice(dark);
    }

    const system = followsSystem();

    // SET
    pgs(document.documentElement).state.toggle("darkmode", dark);
    pgs(document.documentElement).state.toggle("darkmodeSystem", system);
    if (document.body) pgs(document.body).state.toggle("darkmode", dark);
    // END SET

    // the separate buttons say which of the three is the current one
    markButtons(document, currentMode());

    // on the root element, like every pgs:* event: it bubbles up to the document, and detail.element is
    // the element it was dispatched on
    pgs.helper.dispatch(document.documentElement, PGS_svg.eventChangeColor, { isDarkMode: dark });
}

//# THREE STATES
// a darkmodeToggle['tglFollowSystem'] has three states and goes round them: light, dark, the system, light again
function hasThreeStates(button) {
    return pgs(button).option.contains("tglFollowSystem");
}

function nextOfThree() {
    if (followsSystem()) writeStoredChoice(false);
    else writeStoredChoice(isDarkMode() ? SYSTEM : true);
    setDarkmodeStatus(false);
}

//# SEPARATE BUTTONS
// a darkmodeButtons holds one button per state, darkmodeButtons-light, darkmodeButtons-dark and
// darkmodeButtons-system: a click picks that state, and the one of the current state is marked pressed
const BUTTON_MODES = { "darkmodeButtons-light": "false", "darkmodeButtons-dark": "true", "darkmodeButtons-system": SYSTEM };

function currentMode() {
    if (followsSystem()) return SYSTEM;
    return isDarkMode() ? "true" : "false";
}

function modeOf(button) {
    return Object.entries(BUTTON_MODES).find(([token]) => pgs(button).contains(token))?.[1];
}

function markButtons(root, mode) {
    pgs(root).querySelectorAll(Object.keys(BUTTON_MODES)).forEach(button => {
        const pressed = modeOf(button) === mode;
        pgs(button).state.toggle("active", pressed);
        button.setAttribute("aria-pressed", String(pressed));
    });
}

function pickMode(mode) {
    writeStoredChoice(mode);
    setDarkmodeStatus(false);
}

// the system changed its theme: only a page that follows it changes too
SYSTEM_QUERY?.addEventListener?.("change", () => {
    if (followsSystem()) setDarkmodeStatus(false);
});



//# INIT
// applies the stored theme to the root as soon as the bundle is parsed in the head, so a
// reload never paints the wrong one first
if (typeof document !== "undefined") setDarkmodeStatus();

// binds the switches in root that are not bound yet. Switches already bound are left untouched, so
// pgs.helper.init(el) on a page that is already running changes nothing else: it does not re-apply the
// theme or fire the color event again. The icon of a switch is not drawn here: the author writes a
// darkmodeToggle-light and a darkmodeToggle-dark in it (and a darkmodeToggle-system in one with three states),
// and the stylesheet shows the one of the current state
function PGS_darkmode_init(root = document) {
    const buttons = pgs.helper.roots(root, "darkmodeToggle").filter(button => !INITIALIZED_BUTTONS.has(button));

    buttons.forEach(button => {
        INITIALIZED_BUTTONS.add(button);

        button.addEventListener("click", () => hasThreeStates(button) ? nextOfThree() : setDarkmodeStatus(true));
    });

    pgs.helper.roots(root, "darkmodeButtons").forEach(group => {
        const buttons = Array.from(pgs(group).querySelectorAll(Object.keys(BUTTON_MODES))).filter(button => !INITIALIZED_BUTTONS.has(button));

        buttons.forEach(button => {
            INITIALIZED_BUTTONS.add(button);
            button.addEventListener("click", () => pickMode(modeOf(button)));
        });

        markButtons(group, currentMode());
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
