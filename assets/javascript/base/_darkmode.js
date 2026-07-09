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
function setDarkmodeStatus(toggle = false, button) {
    let isDarkMode = localStorage.getItem("screenIsDarkMode") === "true";

    if (toggle) {
        isDarkMode = !isDarkMode;
        localStorage.setItem("screenIsDarkMode", isDarkMode);
    }

    document.documentElement.setAttribute("data-darkmode", isDarkMode);

    changeIcon(button, isDarkMode);
    document.dispatchEvent(new CustomEvent(EVENT_SVG_CHANGE_COLOR, { detail: { isDarkMode } }));
}



//= INIT
const toggleDarkmode = pgs(document).querySelectorAll("toggleDarkmode");
setDarkmodeStatus(false, toggleDarkmode);

//= BUTTON DARKMODE
toggleDarkmode.forEach(button => {
    button.addEventListener("click", () => setDarkmodeStatus(true, toggleDarkmode));
});
