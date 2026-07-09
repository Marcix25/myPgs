//# SVG & LOTTIE COLORS

const svgColors = {
    eventChangeColor: "pgs:svg:changeColor",
    watchedObjects: new WeakSet(),
    watchedLotties: new WeakSet(),

    _normalizeColor: (color = "") => {
        return color.replace(/\s/g, "").toLocaleLowerCase();
    },

    _getCurrentDarkmode: () => {
        return document.documentElement.getAttribute("data-darkmode") === "true";
    },

    searchColor(type = "svg") {
        const ROOT = getComputedStyle(document.documentElement);
        const colors = [];

        for (let I = 0; I < 20; I++) {
            const color = ROOT.getPropertyValue("--" + type + "-color-" + I).toLocaleLowerCase().split("&").map(value => value.trim());
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

        document.addEventListener("DOMContentLoaded", () => {
            svgColors.applyColorsSVG();
            svgColors.applyColorsLottie();
        });
    },

    applyColorsSVG(isDarkMode = svgColors._getCurrentDarkmode()) {
        const colorsSvg = svgColors.searchColor("svg");

        if (!pgs(document).querySelector("svgChangeColor")) return;

        document.querySelectorAll('object[type="image/svg+xml"]').forEach(obj => {
            if (!svgColors.watchedObjects.has(obj)) {
                obj.addEventListener("load", () => svgColors._changeColor(obj.contentDocument, svgColors._getCurrentDarkmode(), svgColors.searchColor("svg")));
                svgColors.watchedObjects.add(obj);
            }

            if (obj.contentDocument) svgColors._changeColor(obj.contentDocument, isDarkMode, colorsSvg);
        });

    },

    applyColorsLottie(isDarkMode = svgColors._getCurrentDarkmode()) {
        const colorsLottie = svgColors.searchColor("lottie");

        if (!pgs(document).querySelector("lottieChangeColor")) return;

        document.querySelectorAll("lottie-player").forEach(lottiePlayer => {
            if (!svgColors.watchedLotties.has(lottiePlayer)) {
                lottiePlayer.addEventListener("load", () => svgColors._changeColor(svgColors._getLottieSvg(lottiePlayer), svgColors._getCurrentDarkmode(), svgColors.searchColor("lottie")));
                svgColors.watchedLotties.add(lottiePlayer);
            }

            if (lottiePlayer.shadowRoot) svgColors._changeColor(svgColors._getLottieSvg(lottiePlayer), isDarkMode, colorsLottie);
        });
    },
};

svgColors.init();

export const PGS_svg = {
    eventChangeColor: svgColors.eventChangeColor,
    applyColorsSVG: isDarkMode => svgColors.applyColorsSVG(isDarkMode),
    applyColorsLottie: isDarkMode => svgColors.applyColorsLottie(isDarkMode),
};
