import { PGS_onDocumentReady } from "../helper/_onDocumentReady.js";

//# DARKMODE

const EVENT_SVG_CHANGE_COLOR = "pgs:svg:changeColor";

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

function initDarkmode() {
    const toggleDarkmode = pgs(document).querySelectorAll("toggleDarkmode");
    setDarkmodeStatus(false, toggleDarkmode);

    //== BUTTON DARKMODE
    toggleDarkmode.forEach(button => {
        button.addEventListener("click", () => setDarkmodeStatus(true, toggleDarkmode));
    });
}

PGS_onDocumentReady(initDarkmode);
