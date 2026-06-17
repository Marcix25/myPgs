//# DARKMODE


//= CHANGE COLOR SVG & LOTTIE
//+ SEARCH COLOR 
function searchColor(type = "svg") {
    const ROOT = getComputedStyle(document.documentElement);
    const colors = []
    for (let I = 0; I < 20; I++) {
        const color = ROOT.getPropertyValue('--' + type + '-color-' + I).toLocaleLowerCase().split("&");
        if (!color[0] == "" && !color[1] == "") {
            let lightDark = [color[0], color[1]]
            colors.push(lightDark)
        }
    }
    return colors;
}
const colors_svg_lottie = [searchColor("svg"), searchColor("lottie")];


//+ change COLORS
function darkmodeColorSVG() {
    function changecolor(svgDoc, type = "svg") {
        let isDarkMode = (document.documentElement.getAttribute("data-darkmode") === "true") ? false : true;

        svgDoc.querySelectorAll('[fill], [stroke]').forEach(fillStroke => {

            for (const colors of colors_svg_lottie) {
                for (const color of colors) {
                    let OLD = (color[0] || '').replace(/\s/g, '');
                    let NEW = (color[1] || '').replace(/\s/g, '');

                    ["fill", "stroke"].forEach(attr => {
                        const current = fillStroke.getAttribute(attr);

                        fillStroke.style.transition = "fill 0.5s ease, stroke 0.5s ease";

                        if (!isDarkMode) {
                            if (current == OLD) fillStroke.setAttribute(attr, NEW)
                        } else {
                            if (current == NEW) fillStroke.setAttribute(attr, OLD)
                        }
                    });
                }
            }
        });
    }

    //== OBJECTS
    const objects = document.querySelectorAll('object[type="image/svg+xml"]');
    objects.forEach(obj => {

        //=== ALL FILL / STROKE
        obj.addEventListener("load", () => {
            const svgDoc = obj.contentDocument;
            if (svgDoc) changecolor(svgDoc, "svg")
        });

        //=== In caso l'object sia già caricato
        if (obj.contentDocument) {
            const event = new Event("load");
            obj.dispatchEvent(event);
        }
    });

    //== LOTTIE
    const lottiePlayers = document.querySelectorAll('lottie-player');
    lottiePlayers.forEach(lottiePlayer => {

        //=== ALL FILL / STROKE
        lottiePlayer.addEventListener("load", () => {
            const svg = lottiePlayer.shadowRoot.querySelector('svg');
            if (svg) changecolor(svg, "lottie")
        });

        //=== In caso lottie sia già caricato
        if (lottiePlayer.shadowRoot) {
            const event = new Event("load");
            lottiePlayer.dispatchEvent(event);
        }
    });
}



//= BUTTON DARKMODE 
//+ CHANGE ICON AND SVG 
let toggleDarkmode = pgs(document).querySelectorAll("toggleDarkmode");
if (localStorage.getItem("screenIsDarkMode") === "true") {
    document.body.classList.add("darkmode");
    document.querySelector(":root").setAttribute("data-darkmode", "true");
    document.body.setAttribute("data-darkmode", "true");
}

function change(selector, isDarkMode) {
    selector.forEach(button => {
        const ICON = button.querySelector("i");
        if (!ICON) return;
        ICON.classList.toggle("fa-moon", !isDarkMode);
        ICON.classList.toggle("fa-sun", isDarkMode);
    });
    darkmodeColorSVG();
}

toggleDarkmode.forEach(button => {

    //== EXECUTE IMMEDIATELY
    let isDarkMode = document.documentElement.getAttribute("data-darkmode") === "true";
    change(toggleDarkmode, isDarkMode);

    //== CLICK BUTTON 
    button.addEventListener("click", () => {
        let isDarkMode = (document.documentElement.getAttribute("data-darkmode") === "true") ? false : true;
        localStorage.setItem("screenIsDarkMode", isDarkMode);

        document.body.classList.toggle("darkmode", isDarkMode);
        document.body.setAttribute("data-darkmode", isDarkMode);
        document.querySelector(":root").setAttribute("data-darkmode", isDarkMode);
        change(toggleDarkmode, isDarkMode);
    });
});
