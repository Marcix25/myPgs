import { pgs } from "../_pgs.js";
import { PGS_onDocumentReady } from "../helper/_onDocumentReady.js";
import { PGS_rafThrottle } from "../helper/_throttle.js";
import { PGS_invalid } from "../helper/_warn.js";

//# SVG & LOTTIE COLORS

const SVG_OBJECT = 'object[type="image/svg+xml"]';

//+ the <object> elements that hold an svg: the root itself when it is one, then everything under it
function svgObjects(root = document) {
    const objects = Array.from(root.querySelectorAll(SVG_OBJECT));
    if (root instanceof Element && root.matches(SVG_OBJECT)) objects.unshift(root);
    return objects;
}

const svgColors = {
    eventChangeColor: "pgs:svg:changeColor",
    watchedObjects: new WeakSet(),
    watchedLotties: new WeakSet(),

    _normalizeColor: (color = "") => {
        return color.replace(/\s/g, "").toLowerCase();
    },

    _getCurrentDarkmode: () => {
        return pgs(document.documentElement).state.contains("darkmode");
    },

    //+ the "old & new" pairs an author declares as --svg-color-1 … --svg-color-19
    searchColor() {
        const ROOT = getComputedStyle(document.documentElement);
        const colors = [];

        for (let I = 0; I < 20; I++) {
            const color = ROOT.getPropertyValue("--svg-color-" + I).toLowerCase().split("&").map(value => value.trim());
            if (color[0] && color[1]) colors.push([color[0], color[1]]);
        }

        return colors;
    },

    _changeColor(svgDoc, isDarkMode, colors) {
        if (!svgDoc) return;

        svgDoc.querySelectorAll("[fill], [stroke]").forEach(fillStroke => {
            for (const color of colors) {
                const OLD = svgColors._normalizeColor(color[0]);
                const NEW = svgColors._normalizeColor(color[1]);

                ["fill", "stroke"].forEach(attr => {
                    const current = svgColors._normalizeColor(fillStroke.getAttribute(attr) || "");
                    if (!current) return;

                    fillStroke.style.transition = "fill 0.5s ease, stroke 0.5s ease";

                    if (isDarkMode && current === OLD) fillStroke.setAttribute(attr, NEW);
                    if (!isDarkMode && current === NEW) fillStroke.setAttribute(attr, OLD);
                });
            }
        });
    },

    _getLottieSvg(lottiePlayer) {
        return lottiePlayer.shadowRoot?.querySelector("svg") || null;
    },

    init() {
        document.addEventListener(svgColors.eventChangeColor, event => {
            svgColors.applyColorsSVG(event.detail?.isDarkMode ?? svgColors._getCurrentDarkmode());
            svgColors.applyColorsLottie(event.detail?.isDarkMode ?? svgColors._getCurrentDarkmode());
        });

        PGS_onDocumentReady(PGS_svg_init);
    },

    applyColorsSVG(isDarkMode = svgColors._getCurrentDarkmode()) {
        if (!pgs(document).querySelector("svgChangeColor")) return;

        const colors = svgColors.searchColor();

        svgObjects().forEach(obj => {
            if (!svgColors.watchedObjects.has(obj)) {
                obj.addEventListener("load", () => svgColors._changeColor(obj.contentDocument, svgColors._getCurrentDarkmode(), svgColors.searchColor()));
                svgColors.watchedObjects.add(obj);
            }

            if (obj.contentDocument) svgColors._changeColor(obj.contentDocument, isDarkMode, colors);
        });
    },

    applyColorsLottie(isDarkMode = svgColors._getCurrentDarkmode()) {
        //== svgChangeColor gates both passes: Lottie recolors from the same --svg-color-N pairs,
        //== so there is no separate lottieChangeColor to opt into any more
        if (!pgs(document).querySelector("svgChangeColor")) return;

        const colors = svgColors.searchColor();

        document.querySelectorAll("lottie-player").forEach(lottiePlayer => {
            if (!svgColors.watchedLotties.has(lottiePlayer)) {
                lottiePlayer.addEventListener("load", () => svgColors._changeColor(svgColors._getLottieSvg(lottiePlayer), svgColors._getCurrentDarkmode(), svgColors.searchColor()));
                svgColors.watchedLotties.add(lottiePlayer);
            }

            if (lottiePlayer.shadowRoot) svgColors._changeColor(svgColors._getLottieSvg(lottiePlayer), isDarkMode, colors);
        });
    },
};

//= ASPECT RATIO
//== an <object> that holds an svg keeps the ratio its object-fit asks for: "cover" slices the
//== drawing, anything else fits it whole. The ratio is applied on every load of the object, so
//== swapping its data keeps working, and again whenever the object is resized
const ASPECT_OBSERVERS = new WeakMap();
const ASPECT_WATCHED = new WeakSet();

function applyAspectRatio(obj) {
    const svg = obj.contentDocument?.querySelector("svg");
    if (!svg) return;

    svg.setAttribute("preserveAspectRatio", getComputedStyle(obj).objectFit === "cover" ? "xMidYMid slice" : "xMidYMid meet");
}

function syncAspectRatio(obj) {
    ASPECT_OBSERVERS.get(obj)?.disconnect();
    ASPECT_OBSERVERS.delete(obj);

    if (!obj.contentDocument?.querySelector("svg")) return;

    applyAspectRatio(obj);

    const observer = new ResizeObserver(PGS_rafThrottle(() => applyAspectRatio(obj)));
    observer.observe(obj);
    ASPECT_OBSERVERS.set(obj, observer);
}

function initAspectRatio(root) {
    svgObjects(root).forEach(obj => {
        if (!ASPECT_WATCHED.has(obj)) {
            ASPECT_WATCHED.add(obj);
            obj.addEventListener("load", () => syncAspectRatio(obj));
        }

        syncAspectRatio(obj);
    });
}

//= INIT
function PGS_svg_init(root = document) {
    if (!(root instanceof Document || root instanceof Element)) {
        throw PGS_invalid("svg.init", "root must be a Document or an Element");
    }

    initAspectRatio(root);
    svgColors.applyColorsSVG();
    svgColors.applyColorsLottie();

    //== read by SCSS (body:not(.object-loaded)) to hold back <object>s until the first pass is done
    document.body?.classList.add("object-loaded");
}

svgColors.init();

export const PGS_svg = {
    init: PGS_svg_init,
    eventChangeColor: svgColors.eventChangeColor,
    applyColorsSVG: isDarkMode => svgColors.applyColorsSVG(isDarkMode),
    applyColorsLottie: isDarkMode => svgColors.applyColorsLottie(isDarkMode),
};
