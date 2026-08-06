import { PGS_onDocumentReady } from "../helper/_onDocumentReady.js";

//# DARKMODE

const EVENT_SVG_CHANGE_COLOR = "pgs:svg:changeColor";
const INITIALIZED_BUTTONS = new WeakSet();

//+ CHANGE ICON
function changeIcon(selector, isDarkMode) {
    selector.forEach(button => {
        const ICON = button.querySelector("i");
        if (!ICON) return;

        ICON.classList.toggle("fa-moon", !isDarkMode);
        ICON.classList.toggle("fa-sun", isDarkMode);
    });
}

//+ SET STATUS
function setDarkmodeStatus(toggle = false, button = []) {
    let isDarkMode = localStorage.getItem("screenIsDarkMode") === "true";

    if (toggle) {
        isDarkMode = !isDarkMode;
        localStorage.setItem("screenIsDarkMode", isDarkMode);
    }

    // SET
    pgs(document.documentElement).state.toggle("darkmode", isDarkMode);
    if (document.body) pgs(document.body).state.toggle("darkmode", isDarkMode);
    // END SET

    changeIcon(button, isDarkMode);
    document.dispatchEvent(new CustomEvent(EVENT_SVG_CHANGE_COLOR, { detail: { isDarkMode } }));
}



//= INIT
// Applica subito il tema alla radice quando il bundle viene caricato nel head.
setDarkmodeStatus();

function initDarkmode(root = document) {
    const toggleDarkmode = [
        ...(root instanceof Element && pgs(root).contains("toggleDarkmode") ? [root] : []),
        ...pgs(root).querySelectorAll("toggleDarkmode")
    ];
    setDarkmodeStatus(false, pgs(document).querySelectorAll("toggleDarkmode"));

    //== BUTTON DARKMODE
    toggleDarkmode.forEach(button => {
        if (INITIALIZED_BUTTONS.has(button)) return;
        INITIALIZED_BUTTONS.add(button);
        button.addEventListener("click", () => {
            setDarkmodeStatus(true, pgs(document).querySelectorAll("toggleDarkmode"));
        });
    });
}

PGS_onDocumentReady(initDarkmode);

export const PGS_darkmode = {
    init: initDarkmode
};
