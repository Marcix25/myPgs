/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/javascript/_imports.js"
/*!***************************************!*\
  !*** ./assets/javascript/_imports.js ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pgs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_pgs.js */ "./assets/javascript/_pgs.js");
/* harmony import */ var _base_darkmode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base/_darkmode.js */ "./assets/javascript/base/_darkmode.js");
/* harmony import */ var _base_svg_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base/_svg.js */ "./assets/javascript/base/_svg.js");
/* harmony import */ var _components_accordion_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/_accordion.js */ "./assets/javascript/components/_accordion.js");
/* harmony import */ var _components_alerts_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/_alerts.js */ "./assets/javascript/components/_alerts.js");
/* harmony import */ var _components_dropdown_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/_dropdown.js */ "./assets/javascript/components/_dropdown.js");
/* harmony import */ var _components_menu_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/_menu.js */ "./assets/javascript/components/_menu.js");
/* harmony import */ var _components_modals_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/_modals.js */ "./assets/javascript/components/_modals.js");
/* harmony import */ var _components_notifications_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/_notifications.js */ "./assets/javascript/components/_notifications.js");
/* harmony import */ var _components_search_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/_search.js */ "./assets/javascript/components/_search.js");
/* harmony import */ var _components_slides_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/_slides.js */ "./assets/javascript/components/_slides.js");
/* harmony import */ var _components_stepTabs_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/_stepTabs.js */ "./assets/javascript/components/_stepTabs.js");
/* harmony import */ var _components_steps_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/_steps.js */ "./assets/javascript/components/_steps.js");
/* harmony import */ var _components_summary_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/_summary.js */ "./assets/javascript/components/_summary.js");
/* harmony import */ var _helper_formValidate_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./helper/_formValidate.js */ "./assets/javascript/helper/_formValidate.js");
/* harmony import */ var _helper_init_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./helper/_init.js */ "./assets/javascript/helper/_init.js");
/* harmony import */ var _helper_scrollY_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./helper/_scrollY.js */ "./assets/javascript/helper/_scrollY.js");
/* harmony import */ var _patterns_cookieConsent_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./patterns/_cookieConsent.js */ "./assets/javascript/patterns/_cookieConsent.js");




















_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs.registerModules({
    init: _helper_init_js__WEBPACK_IMPORTED_MODULE_15__.PGS_init,
    cookieConsent: _patterns_cookieConsent_js__WEBPACK_IMPORTED_MODULE_17__.PGS_cookieConsent,
    darkmode: _base_darkmode_js__WEBPACK_IMPORTED_MODULE_1__.PGS_darkmode,
    svg: _base_svg_js__WEBPACK_IMPORTED_MODULE_2__.PGS_svg,
    accordion: _components_accordion_js__WEBPACK_IMPORTED_MODULE_3__.PGS_accordion,
    alert: _components_alerts_js__WEBPACK_IMPORTED_MODULE_4__.PGS_alert,
    dropdown: _components_dropdown_js__WEBPACK_IMPORTED_MODULE_5__.PGS_dropdown,
    menu: _components_menu_js__WEBPACK_IMPORTED_MODULE_6__.PGS_menu,
    modal: _components_modals_js__WEBPACK_IMPORTED_MODULE_7__.PGS_modal,
    notification: _components_notifications_js__WEBPACK_IMPORTED_MODULE_8__.PGS_notification,
    search: _components_search_js__WEBPACK_IMPORTED_MODULE_9__.PGS_search,
    slides: _components_slides_js__WEBPACK_IMPORTED_MODULE_10__.PGS_slides,
    stepTabs: _components_stepTabs_js__WEBPACK_IMPORTED_MODULE_11__.PGS_stepTabs,
    steps: _components_steps_js__WEBPACK_IMPORTED_MODULE_12__.PGS_steps,
    summary: _components_summary_js__WEBPACK_IMPORTED_MODULE_13__.PGS_summary,
    formValidate: _helper_formValidate_js__WEBPACK_IMPORTED_MODULE_14__.PGS_formValidate,
    scrollHorizontal: _helper_scrollY_js__WEBPACK_IMPORTED_MODULE_16__.PGS_scrollHorizontal,
});


/***/ },

/***/ "./assets/javascript/_pgs.js"
/*!***********************************!*\
  !*** ./assets/javascript/_pgs.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pgs: () => (/* binding */ pgs)
/* harmony export */ });
/**
 * @param {Element | Document} root
*/
function pgs(root) {
    const ATTR = "pgs";
    if (!root) throw new TypeError("pgs(root): root richiesto");

    const canAttr = typeof root.getAttribute === "function" && typeof root.setAttribute === "function";
    const canQuery = typeof root.querySelector === "function" && typeof root.querySelectorAll === "function";

    if (!canQuery) {
        throw new TypeError("pgs(root): root deve supportare querySelector/querySelectorAll");
    }

    //+
    function attrOnlyForElements(methodName) {
        throw new TypeError(`pgs(${root.nodeName || "root"}).${methodName}(): disponibile solo su Element (non su Document)`);
    };

    //+
    function concactSelector(value) {
        if (Array.isArray(value)) value = value.join(",");
        return String(value)
            .split(",")
            .map(v => v.trim())
            .filter(Boolean)
            .map(v => `[${ATTR}~="${v}"]`)
            .join(",");
    }

    //+
    function getValues(el, separator = " ") {
        return (el.getAttribute(ATTR) || "")
            .split(separator)
            .filter(Boolean);
    }

    //+
    function setValues(el, values, separator = " ") {
        el.setAttribute(ATTR, values.join(separator));
    }

    //= BASE PGS 
    function createBasePgs() {
        function api() {
            return api;
        }

        api.querySelector = function (value) {
            return root.querySelector(concactSelector(value));
        };

        api.querySelectorAll = function (value) {
            return root.querySelectorAll(concactSelector(value));
        };

        api.add = function (...values) {
            if (!canAttr) return attrOnlyForElements("add");
            const current = getValues(root);
            for (const v of values) if (!current.includes(v)) current.push(v);
            setValues(root, current);
            return api;
        };

        api.remove = function (...values) {
            if (!canAttr) return attrOnlyForElements("remove");
            setValues(root, getValues(root).filter(v => !values.includes(v)));
            return api;
        };

        api.toggle = function (value, force) {
            if (!canAttr) return attrOnlyForElements("toggle");

            const exists = getValues(root).includes(value);

            if (force !== undefined) {
                if (force && !exists) api.add(value);
                if (!force && exists) api.remove(value);
                return !!force;
            }

            if (exists) {
                api.remove(value);
                return false;
            }

            api.add(value);
            return true;
        };

        api.contains = function (value) {
            if (!canAttr) return attrOnlyForElements("contains");
            return getValues(root).includes(value);
        };

        Object.defineProperty(api, "value", {
            get() {
                if (!canAttr) return undefined;
                return root.getAttribute(ATTR);
            },
            set(v) {
                if (!canAttr) return attrOnlyForElements("value");
                root.setAttribute(ATTR, v);
            }
        });

        return api;
    }

    //= STATE
    function createState(attribute) {
        if (!canAttr) return undefined;

        const read = (sep = " ") =>
            (root.getAttribute(attribute) || "").split(sep).filter(Boolean);

        const write = (vals, sep = " ") =>
            root.setAttribute(attribute, vals.join(sep));

        // funzione chiamabile: state("active") == add("active")
        function api(...values) {
            api.add(...values);
            return api;
        }

        api.add = function (...values) {
            const toAdd = values.flat().map(v => String(v).trim()).filter(Boolean);
            const current = read();
            for (const v of toAdd) if (!current.includes(v)) current.push(v);
            write(current);
            return api;
        };

        api.remove = function (...values) {
            const toRemove = values.flat().map(v => String(v).trim()).filter(Boolean);
            const current = read().filter(v => !toRemove.includes(v));
            write(current);
            return api;
        };

        api.toggle = function (value, force) {
            const v = String(value).trim();
            if (!v) return false;
            const current = read();
            const exists = current.includes(v);

            if (force !== undefined) {
                if (force && !exists) {
                    current.push(v);
                    write(current);
                }

                if (!force && exists) {
                    write(current.filter(x => x !== v));
                }

                return !!force;
            }

            if (exists) {
                write(current.filter(x => x !== v));
                return false;
            }
            
            current.push(v);
            write(current);
            return true;
        };

        api.contains = function (value) {
            const v = String(value).trim();
            if (!v) return false;
            return read().includes(v);
        };

        Object.defineProperty(api, "value", {
            get() { return root.getAttribute(attribute); },
            set(v) { root.setAttribute(attribute, v); }
        });

        return api;
    }

    //= OPTION
    function createOption(attribute) {
        if (!canAttr) return undefined;

        const read = () => (root.getAttribute(attribute) || "").match(/[^\s[\]]+(?:\[[^\]]*\])?/g) || [];
        const write = values => root.setAttribute(attribute, values.join(" "));
        const getKey = value => String(value).trim().match(/^[^\s[\]]+/)?.[0] || "";
        const getValues = values => values
            .flat()
            .flatMap(value => String(value).match(/[^\s[\]]+(?:\[[^\]]*\])?/g) || [])
            .filter(Boolean);

        function api() {
            return api;
        }

        api.add = function (...values) {
            const current = read();

            getValues(values).forEach(value => {
                if (!current.includes(value)) current.push(value);
            });

            write(current);
            return api;
        };

        api.remove = function (...values) {
            const keys = getValues(values).map(getKey).filter(Boolean);
            write(read().filter(value => !keys.includes(getKey(value))));
            return api;
        };

        api.toggle = function (value, force) {
            const key = getKey(value);
            if (!key) return false;

            const exists = api.contains(key);

            if (force !== undefined) {
                if (force && !exists) api.add(value);
                if (!force && exists) api.remove(key);
                return !!force;
            }

            if (exists) {
                api.remove(key);
                return false;
            }

            api.add(value);
            return true;
        };

        api.contains = function (key) {
            const source = root.getAttribute(attribute) || "";
            const safeKey = String(key).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

            return new RegExp(`(?:^|\\s)${safeKey}(?:\\[[^\\]]*\\])?(?=\\s|$)`)
                .test(source);
        };

        api.getValueBrackets = function (key) {
            const source = root.getAttribute(attribute) || "";
            const safeKey = String(key).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

            const match = source.match(
                new RegExp(`(?:^|\\s)${safeKey}\\[([^\\]]*)\\]`)
            );

            return match ? match[1] : undefined;
        };

        api.setValueBrackets = function (key, value = "") {
            const optionKey = getKey(key);
            if (!optionKey) return api;

            const option = `${optionKey}[${String(value).trim()}]`;
            const options = read().filter(item => getKey(item) !== optionKey);

            options.push(option);
            write(options);
            return api;
        };

        Object.defineProperty(api, "value", {
            get() { return root.getAttribute(attribute); },
            set(v) { root.setAttribute(attribute, v); }
        });

        return api;
    }

    //# RETURN 
    const api = createBasePgs();
    api.state = createState("pgs-state");
    api.option = createOption("pgs-option");
    return api;
}

const PGS_IMPORTS = {};

function registerImportModule(name, module) {
    const key = String(name || "").trim().replace(/^pgs[_-\s]*/i, "").toLowerCase();

    if (!key) throw new TypeError("pgs.registerImport(...modules): ogni modulo deve avere name o PGS_name");

    PGS_IMPORTS[key] = {
        name,
        module
    };
}

pgs.registerImport = function (...modules) {
    modules.flat().forEach(item => {
        if (item && typeof item === "object" && !item.PGS_name && !item.name) {
            Object.entries(item).forEach(([name, module]) => registerImportModule(name, module));
            return;
        }

        registerImportModule(item?.PGS_name || item?.name, item);
    });

    return pgs;
};

pgs.registerModules = function (modules = {}) {
    Object.entries(modules).forEach(([name, module]) => {
        const key = String(name || "").trim();
        if (!key) return;

        const hasOwn = Object.prototype.hasOwnProperty.call(pgs, key);
        if (hasOwn && pgs[key] !== module) {
            throw new Error(`pgs.registerModules(): "${key}" e' gia' definito su pgs`);
        }

        pgs[key] = module;
    });

    return pgs;
};

pgs.import = function (...names) {
    return names.flat().reduce((imports, name) => {
        const key = String(name || "").trim().replace(/^pgs[_-\s]*/i, "").toLowerCase();
        const item = PGS_IMPORTS[key];

        if (!item) throw new Error(`pgs.import(): modulo "${name}" non registrato`);

        imports[item.name] = item.module;
        return imports;
    }, {});
};

globalThis.pgs ??= pgs;


/***/ },

/***/ "./assets/javascript/base/_darkmode.js"
/*!*********************************************!*\
  !*** ./assets/javascript/base/_darkmode.js ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_darkmode: () => (/* binding */ PGS_darkmode)
/* harmony export */ });
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");


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

(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__.PGS_onDocumentReady)(initDarkmode);

const PGS_darkmode = {
    init: initDarkmode
};


/***/ },

/***/ "./assets/javascript/base/_object.js"
/*!*******************************************!*\
  !*** ./assets/javascript/base/_object.js ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");


(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__.PGS_onDocumentReady)(() => {
    const objects = document.querySelectorAll('object[type="image/svg+xml"]');

    objects.forEach(obj => {
        function applyAspectRatio(svgDoc) {
            if (!svgDoc) return;
            const svg = svgDoc.querySelector("svg");
            if (!svg) return;

            const computedStyle = window.getComputedStyle(obj);
            svg.setAttribute("preserveAspectRatio", computedStyle.objectFit === 'cover' ? "xMidYMid slice" : "xMidYMid meet");
        }

        function init() {
            const svgDoc = obj.contentDocument;
            if (!svgDoc) return;

            const svg = svgDoc.querySelector('svg');
            if (!svg) return;

            applyAspectRatio(svgDoc);
            if (obj.__objectResizeObserver) return;

            let rafId = 0;
            const resizeObserver = new ResizeObserver(() => {
                if (rafId) return;
                rafId = requestAnimationFrame(() => {
                    rafId = 0;
                    applyAspectRatio(svgDoc);
                });
            });

            resizeObserver.observe(obj);
            obj.__objectResizeObserver = resizeObserver;
        }

        if (obj.contentDocument && obj.contentDocument.querySelector('svg')) init();
        else obj.addEventListener('load', init, { once: true });
    });

    document.body.classList.add("object-loaded");
});


/***/ },

/***/ "./assets/javascript/base/_svg.js"
/*!****************************************!*\
  !*** ./assets/javascript/base/_svg.js ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_svg: () => (/* binding */ PGS_svg)
/* harmony export */ });
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");


//# SVG & LOTTIE COLORS

const svgColors = {
    eventChangeColor: "pgs:svg:changeColor",
    watchedObjects: new WeakSet(),
    watchedLotties: new WeakSet(),

    _normalizeColor: (color = "") => {
        return color.replace(/\s/g, "").toLocaleLowerCase();
    },

    _getCurrentDarkmode: () => {
        return pgs(document.documentElement).state.contains("darkmode");
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

        (0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__.PGS_onDocumentReady)(PGS_svg_init);
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
        const colorsLottie = svgColors.searchColor("svg");

        if (!pgs(document).querySelector("lottieChangeColor")) return;

        document.querySelectorAll("lottie-player").forEach(lottiePlayer => {
            if (!svgColors.watchedLotties.has(lottiePlayer)) {
                lottiePlayer.addEventListener("load", () => svgColors._changeColor(svgColors._getLottieSvg(lottiePlayer), svgColors._getCurrentDarkmode(), svgColors.searchColor("svg")));
                svgColors.watchedLotties.add(lottiePlayer);
            }

            if (lottiePlayer.shadowRoot) svgColors._changeColor(svgColors._getLottieSvg(lottiePlayer), isDarkMode, colorsLottie);
        });
    },
};

function PGS_svg_init() {
    svgColors.applyColorsSVG();
    svgColors.applyColorsLottie();
}

svgColors.init();

const PGS_svg = {
    init: PGS_svg_init,
    eventChangeColor: svgColors.eventChangeColor,
    applyColorsSVG: isDarkMode => svgColors.applyColorsSVG(isDarkMode),
    applyColorsLottie: isDarkMode => svgColors.applyColorsLottie(isDarkMode),
};


/***/ },

/***/ "./assets/javascript/components/_accordion.js"
/*!****************************************************!*\
  !*** ./assets/javascript/components/_accordion.js ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_accordion: () => (/* binding */ PGS_accordion)
/* harmony export */ });
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");


//= ACCORDION
const API = new WeakMap();
let accordionId = 0;

function nextAccordionId() {
    accordionId += 1;
    return accordionId;
}

function directPgsChild(element, token) {
    return Array.from(element.children).find(child => pgs(child).contains(token));
}

function PGS_accordion_init(root = document) {
    pgs(root).querySelectorAll("accordion").forEach((accordion) => {
        if (API.has(accordion)) return;

        const BUTTON = directPgsChild(accordion, "accordion-button");
        const CONTENT = directPgsChild(accordion, "accordion-content");
        if (!BUTTON || !CONTENT) return;

        //== ID univoci per aria-controls / aria-labelledby
        const ID = nextAccordionId();
        const btnId = `acc-btn-${ID}`;
        const panelId = `acc-panel-${ID}`;

        //== Stato iniziale
        const isOpenInit = pgs(accordion).state.contains("open");

        //== Accessibilità (setup una volta)
        BUTTON.setAttribute("role", "button");
        BUTTON.setAttribute("tabindex", "0");
        if (!BUTTON.id) BUTTON.setAttribute("id", btnId);

        if (!CONTENT.id) CONTENT.setAttribute("id", panelId);
        BUTTON.setAttribute("aria-controls", CONTENT.id);
        CONTENT.setAttribute("role", "region");
        CONTENT.setAttribute("aria-labelledby", BUTTON.id);

        //+ Accessibility (applica stato aperto/chiuso)
        function accordionAccessibility(isOpen, button, content) {
            const text = (button?.textContent || "").trim().replace(/\s+/g, " ");
            button.setAttribute("aria-label", `${isOpen ? "Chiudi" : "Apri"} ${text || "sezione"}`);
            button.setAttribute("aria-expanded", String(isOpen));
            content.hidden = !isOpen;
        }

        //+ Chiudi tutti gli altri
        function closeOltherAccordion() {
            for (const otherLi of pgs(document).querySelectorAll("accordion")) {
                if (otherLi === accordion) continue;

                const otherBtn = pgs(otherLi).querySelector("accordion-button");
                const otherContent = pgs(otherLi).querySelector("accordion-content");
                if (!otherBtn || !otherContent) continue;

                pgs(otherLi).state().remove("open");
                accordionAccessibility(false, otherBtn, otherContent);
            }
        }

        //+ FN ACCORDION
        function accordionFunction() {
            const isOpen = pgs(accordion).state.contains("open");
            const nowOpen = !isOpen;

            pgs(accordion).state.toggle("open", nowOpen);
            accordionAccessibility(nowOpen, BUTTON, CONTENT);

            closeOltherAccordion();

            //== scroll to view
            if (nowOpen) setTimeout(() => accordion.scrollIntoView({ block: "nearest", inline: "nearest" }), 100);
        }

        function open() {
            if (!pgs(accordion).state.contains("open")) accordionFunction();
        }

        function close() {
            if (pgs(accordion).state.contains("open")) accordionFunction();
        }

        // applica stato iniziale
        accordionAccessibility(isOpenInit, BUTTON, CONTENT);

        //- Eventi
        BUTTON.addEventListener("click", accordionFunction);

        //- Tastiera: Enter / Space
        BUTTON.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                accordionFunction();
            }
        });

        API.set(accordion, {
            element: accordion,
            button: BUTTON,
            content: CONTENT,
            open,
            close,
            toggle: accordionFunction,
            refresh: () => {
                PGS_accordion_init(accordion.parentNode || document);
                return API.get(accordion);
            },
            isOpen: () => pgs(accordion).state.contains("open"),
        });
    });
}

//# INIT
(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__.PGS_onDocumentReady)(PGS_accordion_init);

//# API
function PGS_accordion_api(selector) {
    return API.get(selector);
}

const PGS_accordion = {
    init: PGS_accordion_init,
    api: PGS_accordion_api
};


/***/ },

/***/ "./assets/javascript/components/_alerts.js"
/*!*************************************************!*\
  !*** ./assets/javascript/components/_alerts.js ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_alert: () => (/* binding */ PGS_alert)
/* harmony export */ });
//= PGS_alert
const fn_alert = {
    _defaults: {
        description: "",
        type: {
            error: {
                title: "Errore",
                icon: '<i class="fa-solid fa-circle-xmark"></i>'
            },
            success: {
                title: "Aggiornato",
                icon: '<i class="fa-solid fa-circle-check"></i>'
            },
            info: {
                title: "Aggiornamento",
                icon: '<i class="fa-solid fa-circle-info"></i>'
            },
            warning: {
                title: "Attenzione",
                icon: '<i class="fa-solid fa-triangle-exclamation"></i>'
            }
        }
    },

    _escapeHtml(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    },

    _getContainer(root = document, configuredContainer) {
        if (!(root instanceof Document) && !(root instanceof Element)) {
            throw new TypeError("PGS alert: root deve essere un Document o un Element");
        }

        let container = configuredContainer;
        if (typeof container === "string") container = root.querySelector(container);
        if (!container) container = pgs(root).querySelector("alertContainer");

        if (container && (!(container instanceof Element) || container === root || !root.contains(container))) {
            throw new TypeError("PGS alert: container deve essere un elemento contenuto in root");
        }

        if (!container) {
            container = document.createElement("div");
            const parent = root instanceof Document ? root.body : root;
            const submit = parent.querySelector('[type="submit"]');

            if (submit) submit.insertAdjacentElement("beforebegin", container);
            else parent.prepend(container);
        }

        pgs(container).add("alertContainer");
        return container;
    },

    create(type, options = {}) {
        const typeDefaults = this._defaults.type[type] || this._defaults.type.info;
        const definedOptions = Object.fromEntries(
            Object.entries(options).filter(([, value]) => value !== undefined)
        );
        const config = {
            description: this._defaults.description,
            ...typeDefaults,
            ...definedOptions
        };
        const alert = document.createElement("div");
        const title = this._escapeHtml(config.title);
        const description = this._escapeHtml(config.description);

        pgs(alert).add("alert");
        pgs(alert).state.add(type);
        alert.setAttribute("role", type === "error" || type === "warning" ? "alert" : "status");
        alert.innerHTML = `
            <div pgs="alert-icon" aria-hidden="true">${config.icon}</div>
            <div pgs="alert-content">
                <strong pgs="alert-content-title">${title}</strong>
                ${description ? `<p>${description}</p>` : ""}
            </div>
        `;

        return alert;
    },

    show(type, options = {}) {
        if (!options || typeof options !== "object" || Array.isArray(options)) {
            throw new TypeError("PGS alert: options deve essere un oggetto");
        }

        const { root, container, ...contentOptions } = options;
        const alert = this.create(type, contentOptions);

        if (root !== undefined || container !== undefined) {
            this._getContainer(root, container).replaceChildren(alert);
        }

        return alert;
    }
};

const PGS_alert = {
    error: (options = {}) => fn_alert.show("error", options),
    success: (options = {}) => fn_alert.show("success", options),
    info: (options = {}) => fn_alert.show("info", options),
    warning: (options = {}) => fn_alert.show("warning", options)
};


/***/ },

/***/ "./assets/javascript/components/_dropdown.js"
/*!***************************************************!*\
  !*** ./assets/javascript/components/_dropdown.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_dropdown: () => (/* binding */ PGS_dropdown)
/* harmony export */ });
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");


// + dropdown
const API = new WeakMap();
const OPEN_DROPDOWNS = new Set();
const VIEWPORT_GAP = 8;
let dropdownId = 0;

function nextDropdownId() {
    dropdownId += 1;
    return dropdownId;
}

function isDropdownContent(element) {
    return element instanceof Element && pgs(element).contains("dropdown-content");
}

function getDropdownTrigger(dropdown, content) {
    const children = Array.from(dropdown.children).filter(child => child !== content);
    const dropdownButton = children.find(child => pgs(child).contains("dropdown-button"));

    return dropdownButton || children.find(child => !isDropdownContent(child)) || dropdown;
}

function getDropdownContent(dropdown) {
    return Array.from(dropdown.children).find(isDropdownContent) || pgs(dropdown).querySelector("dropdown-content");
}

function getDropdowns(root) {
    const dropdowns = root instanceof Element && pgs(root).contains("dropdown") ? [root] : [];
    dropdowns.push(...pgs(root).querySelectorAll("dropdown"));
    return dropdowns;
}

function getposition(dropdown) {
    const option = pgs(dropdown).option;
    const optionValue = option.getValueBrackets("position");
    const raw = (optionValue || "bottom center").trim().toLowerCase();
    const parts = raw.split(/\s+/).filter(Boolean);
    const side = parts.find(part => ["top", "right", "bottom", "left"].includes(part)) || "bottom";
    const align = parts.find(part => ["top", "right", "bottom", "left", "center"].includes(part) && part !== side) || "center";

    return { side, align };
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function updateposition(dropdown) {
    const data = API.get(dropdown);
    if (!data || !data.isOpen()) return;

    const { trigger, content } = data;
    const { side, align } = getposition(dropdown);
    const triggerRect = trigger.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();
    const viewportWidth = document.documentElement.clientWidth;
    const maxLeft = Math.max(VIEWPORT_GAP, viewportWidth - contentRect.width - VIEWPORT_GAP);
    let left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
    let top = triggerRect.bottom + VIEWPORT_GAP;

    if (side === "top" || side === "bottom") {
        top = side === "top"
            ? triggerRect.top - contentRect.height - VIEWPORT_GAP
            : triggerRect.bottom + VIEWPORT_GAP;

        if (align === "left") left = triggerRect.left;
        if (align === "right") left = triggerRect.right - contentRect.width;
    }

    if (side === "left" || side === "right") {
        left = side === "left"
            ? triggerRect.left - contentRect.width - VIEWPORT_GAP
            : triggerRect.right + VIEWPORT_GAP;
        top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;

        if (align === "top") top = triggerRect.top;
        if (align === "bottom") top = triggerRect.bottom - contentRect.height;
    }

    if (side === "left" && left < VIEWPORT_GAP) {
        left = triggerRect.right + VIEWPORT_GAP;
    }

    if (side === "right" && left + contentRect.width > viewportWidth - VIEWPORT_GAP) {
        left = triggerRect.left - contentRect.width - VIEWPORT_GAP;
    }

    left = clamp(left, VIEWPORT_GAP, maxLeft);

    content.style.setProperty("--dropdown-left", `${Math.round(left)}px`);
    content.style.setProperty("--dropdown-top", `${Math.round(top)}px`);
}

function updateOpenDropdowns() {
    OPEN_DROPDOWNS.forEach(updateposition);
}

function closeDropdown(dropdown) {
    const data = API.get(dropdown);
    if (!data || !data.isOpen()) return;

    Array.from(OPEN_DROPDOWNS)
        .filter(item => item !== dropdown && dropdown.contains(item))
        .forEach(closeDropdown);

    pgs(dropdown).state.remove("open");
    data.trigger.setAttribute("aria-expanded", "false");
    OPEN_DROPDOWNS.delete(dropdown);
}

function openDropdown(dropdown) {
    const data = API.get(dropdown);
    if (!data || data.isOpen()) return;

    Array.from(OPEN_DROPDOWNS).forEach(item => {
        const isAncestor = item !== dropdown && item.contains(dropdown);
        if (item !== dropdown && !isAncestor) closeDropdown(item);
    });

    pgs(dropdown).state.add("open");
    data.trigger.setAttribute("aria-expanded", "true");
    OPEN_DROPDOWNS.add(dropdown);
    updateposition(dropdown);
}

function toggleDropdown(dropdown) {
    const data = API.get(dropdown);
    if (!data) return;

    if (data.isOpen()) closeDropdown(dropdown);
    else openDropdown(dropdown);
}

function isInsideAnyDropdown(target) {
    return Array.from(OPEN_DROPDOWNS).some(dropdown => dropdown.contains(target));
}

function PGS_dropdown_init(root = document) {
    getDropdowns(root).forEach((DROPDOWN) => {
        if (API.has(DROPDOWN)) return;

        const CONTENT = getDropdownContent(DROPDOWN);
        if (!CONTENT) return;

        const TRIGGER = getDropdownTrigger(DROPDOWN, CONTENT);
        const id = nextDropdownId();

        if (!TRIGGER.id) TRIGGER.id = `dropdown-btn-${id}`;
        if (!CONTENT.id) CONTENT.id = `dropdown-panel-${id}`;

        if (TRIGGER.matches("button") && !TRIGGER.hasAttribute("type")) {
            TRIGGER.setAttribute("type", "button");
        }

        TRIGGER.setAttribute("aria-haspopup", "true");
        TRIGGER.setAttribute("aria-controls", CONTENT.id);
        TRIGGER.setAttribute("aria-expanded", String(pgs(DROPDOWN).state.contains("open")));
        CONTENT.setAttribute("aria-labelledby", TRIGGER.id);

        const data = {
            element: DROPDOWN,
            trigger: TRIGGER,
            content: CONTENT,
            open: () => openDropdown(DROPDOWN),
            close: () => closeDropdown(DROPDOWN),
            toggle: () => toggleDropdown(DROPDOWN),
            refresh: () => {
                PGS_dropdown_init(DROPDOWN.parentNode || document);
                updateposition(DROPDOWN);
                return API.get(DROPDOWN);
            },
            isOpen: () => pgs(DROPDOWN).state.contains("open")
        };

        TRIGGER.addEventListener("click", (event) => {
            if (isDropdownContent(event.target)) return;
            event.preventDefault();
            event.stopPropagation();
            toggleDropdown(DROPDOWN);
        });

        CONTENT.addEventListener("click", event => event.stopPropagation());
        API.set(DROPDOWN, data);

        if (data.isOpen()) OPEN_DROPDOWNS.add(DROPDOWN);
        updateposition(DROPDOWN);
    });
}

document.addEventListener("click", (event) => {
    if (isInsideAnyDropdown(event.target)) return;
    OPEN_DROPDOWNS.forEach(closeDropdown);
});

document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    OPEN_DROPDOWNS.forEach(closeDropdown);
});

window.addEventListener("resize", updateOpenDropdowns);
window.addEventListener("scroll", updateOpenDropdowns, true);

// # INIT
(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__.PGS_onDocumentReady)(PGS_dropdown_init);

// # API
function PGS_dropdown_api(selector) {
    return API.get(selector);
}

const PGS_dropdown = {
    init: PGS_dropdown_init,
    api: PGS_dropdown_api
};


/***/ },

/***/ "./assets/javascript/components/_menu.js"
/*!***********************************************!*\
  !*** ./assets/javascript/components/_menu.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_menu: () => (/* binding */ PGS_menu)
/* harmony export */ });
/* harmony import */ var _dropdown__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_dropdown */ "./assets/javascript/components/_dropdown.js");
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");



const API = new WeakMap();

//= DROP DOWN MENU
function PGS_menu_init(root = document) {

    pgs(root).querySelectorAll('menu').forEach(MENU => {
        if (API.has(MENU)) return;

        MENU.querySelectorAll('li').forEach(li => {
            const ul = li.querySelector("ul");

            if (ul) {

                const button = document.createElement("button");
                button.type = "button";
                button.innerHTML = "<span>&#9207;</span>";
                pgs(button).add("menu-buttonIcon");
                li.querySelector("a").insertAdjacentElement("afterend", button);

                pgs(li).add("dropdown")
                pgs(li).option.setValueBrackets("position", "bottom right")
                pgs(button).add("dropdown-button")
                pgs(button).add("button")
                pgs(button).option.add("buttonNohover")
                pgs(ul).add("dropdown-content")

            }
        });

        API.set(MENU, {
            element: MENU,
            type: "horizontal",
            refresh: () => {
                PGS_menu_init(MENU.parentNode || document);
                return API.get(MENU);
            },
        });
        _dropdown__WEBPACK_IMPORTED_MODULE_0__.PGS_dropdown.init(MENU);
    });

}

(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_1__.PGS_onDocumentReady)(PGS_menu_init);

function PGS_menu_api(selector) {
    return API.get(selector);
}

//# EXPORT
const PGS_menu = {
    init: PGS_menu_init,
    api: PGS_menu_api
};


/***/ },

/***/ "./assets/javascript/components/_modals.js"
/*!*************************************************!*\
  !*** ./assets/javascript/components/_modals.js ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_modal: () => (/* binding */ PGS_modal)
/* harmony export */ });
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");


//# MODAL
const API = new WeakMap();

function getModals(root) {
    const modals = root instanceof Element && pgs(root).contains("modal") ? [root] : [];
    modals.push(...pgs(root).querySelectorAll("modal"));
    return modals;
}

function initializeModal(MODAL, existingDialog = null) {
    if (API.has(MODAL)) return;

    const BUTTON_OPEN = pgs(MODAL).querySelector("modal-button");
    const DIALOG = existingDialog || MODAL.querySelector("dialog");
    if (!BUTTON_OPEN || !DIALOG) return;
    const eventController = new AbortController();
    const { signal } = eventController;
    let historyObserver = null;
    let historyTimeout = null;

    //== SELECTOR
    const DOMButtonClose = '<button pgs="button modal-close" pgs-option="buttonClose" type="button" tabindex="0" aria-label="Chiudi"><i class="fa-solid fa-close"></i></button>';
    const modalContentHeader = pgs(DIALOG).querySelector("modal-dialog-content-header");


    //== OPTION ATTRIBUTES MODAL
    const disableBackdropClose = pgs(MODAL).option.contains("disableBackdropClose");
    const data_history = pgs(MODAL).option.contains("history");
    const data_container = pgs(MODAL).option.getValueBrackets("containerID");
    const data_containerPGS = pgs(MODAL).option.getValueBrackets("containerPGS");

    //== OPTION ATTRIBUTES DIALOG
    const topLevel = pgs(DIALOG).option.contains("topLevel");


    //== BUTTON CLOSE
    if (!pgs(DIALOG).querySelector("modal-close") && !pgs(MODAL).querySelector("modal-close")) {
        if (modalContentHeader) modalContentHeader.insertAdjacentHTML("beforeend", DOMButtonClose);
        else DIALOG.insertAdjacentHTML("beforeend", DOMButtonClose);
    }
    const BUTTON_CLOSE = pgs(DIALOG).querySelector("modal-close") || pgs(MODAL).querySelector("modal-close");


    //== SET
    pgs(DIALOG).add("dialog modal-dialog");

    //== BUTTON OPEN
    BUTTON_OPEN.setAttribute("role", "button");
    BUTTON_OPEN.setAttribute("aria-label", "apri modale");


    //== POSITION
    if (topLevel && !MODAL.contains(DIALOG)) MODAL.append(DIALOG);
    else if (!topLevel) {
        if (data_container) document.querySelector("#" + data_container)?.append(DIALOG);
        else if (data_containerPGS) pgs(document).querySelector(data_containerPGS)?.append(DIALOG);
        else document.body.append(DIALOG);
    }


    //+ FN STATUS
    function statusModal(status = true) {
        BUTTON_OPEN?.setAttribute("aria-expanded", status);
        DIALOG?.setAttribute("aria-expanded", status);
    }

    //+ FN OPEN
    function openModal(e) {
        e?.stopImmediatePropagation();
        if (DIALOG.open) {
            closeModal(e);
            return;
        }

        if (!DIALOG.open) document.querySelectorAll("dialog[open]").forEach((dlg) => dlg.close());
        statusModal(true);
        topLevel ? DIALOG.showModal() : DIALOG.show();
        // modalCustomEvents('modal:open', { event: e });
        MODAL.dispatchEvent(new CustomEvent('modal:open'));
        DIALOG.dispatchEvent(new CustomEvent('modal:open'));
    }

    //+ FN CLOSE
    function closeModal(e) {
        e?.stopImmediatePropagation()
        statusModal(false);
        DIALOG.close();
        // modalCustomEvents('modal:close', { event: e });
        MODAL.dispatchEvent(new CustomEvent('modal:close'));
        DIALOG.dispatchEvent(new CustomEvent('modal:close'));
    }

    function forceOpen(e) {
        if (!DIALOG.open) openModal(e);
    }

    function forceClose(e) {
        if (DIALOG.open) closeModal(e);
    }

    //+ fn OPEN ON HISTORY
    function openModalOnHistory() {
        const params = new URLSearchParams(window.location.search);
        if (params.get('modal') !== BUTTON_OPEN.id) return;
        document.getElementById(BUTTON_OPEN.id)?.scrollIntoView({ behavior: 'smooth' });
        openModal();
    }


    //= OPEN
    BUTTON_OPEN.addEventListener("click", (e) => openModal(e), { signal });
    BUTTON_OPEN.addEventListener("keypress", (e) => !DIALOG.open && (e.key === "Enter" || e.key === " ") && openModal(e), { signal });

    //= CLOSE
    DIALOG.addEventListener("close", () => statusModal(false), { signal });
    DIALOG.addEventListener("click", e => { if (e.target == DIALOG && !disableBackdropClose) closeModal(e) }, { signal });
    BUTTON_CLOSE?.addEventListener("click", e => closeModal(e), { signal });

    //= UPDATE HISTORY
    if (data_history && BUTTON_OPEN.id) {
        historyTimeout = window.setTimeout(openModalOnHistory, 1);

        //== Aggiorna URL quando cambia l'attributo "open" del dialog
        historyObserver = new MutationObserver(() => {
            let isOpen = DIALOG.hasAttribute("open");
            try {
                const url = new URL(window.location.href);
                const params = new URLSearchParams(url.search);
                isOpen ? params.set('modal', BUTTON_OPEN.id) : params.delete('modal');
                url.search = params.toString() ? `?${params.toString()}` : "";
                window.history.pushState({ modal: BUTTON_OPEN.id, open: isOpen }, "", url);
            } catch (_) { }
        });
        historyObserver.observe(DIALOG, { attributes: true, attributeFilter: ["open"] });

        //== Gestisce back/forward del browser per aprire/chiudere il dialog coerentemente
        window.addEventListener("popstate", () => {
            try {
                const params = new URLSearchParams(window.location.search);
                const shouldOpen = params.get('modal') === BUTTON_OPEN.id;
                if (shouldOpen && !DIALOG.open) DIALOG.showModal();
                if (!shouldOpen && DIALOG.open) closeModal()
            } catch (_) { }
        }, { signal });
    }

    function destroy() {
        eventController.abort();
        historyObserver?.disconnect();
        if (historyTimeout !== null) window.clearTimeout(historyTimeout);
        API.delete(MODAL);
    }

    API.set(MODAL, {
        element: MODAL,
        button: BUTTON_OPEN,
        dialog: DIALOG,
        closeButton: BUTTON_CLOSE,
        open: forceOpen,
        close: forceClose,
        toggle: openModal,
        refresh: () => {
            const nextDialog = MODAL.querySelector("dialog") || DIALOG;
            destroy();
            initializeModal(MODAL, nextDialog);
            return API.get(MODAL);
        },
        isOpen: () => DIALOG.open,
    });
}

function PGS_modal_init(root = document) {
    getModals(root).forEach(MODAL => initializeModal(MODAL));
}

//# INIT PGS_modal
(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__.PGS_onDocumentReady)(PGS_modal_init);

//# API
function PGS_modal_api(element) {
    return API.get(element);
}

const PGS_modal = {
    init: PGS_modal_init,
    api: PGS_modal_api
};


/***/ },

/***/ "./assets/javascript/components/_notifications.js"
/*!********************************************************!*\
  !*** ./assets/javascript/components/_notifications.js ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_notification: () => (/* binding */ PGS_notification)
/* harmony export */ });
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");


//= PGS_notification
const fn_notification = {
    _defaults: {
        element: "notification",
        link: null,
        timeout: 0,
        description: "",
        linkTitle: "Open",
        closeTitle: "Close",
        type: {
            error: {
                title: "Error",
                icon: '<i class="fa-solid fa-circle-xmark"></i>'
            },
            success: {
                title: "Success",
                icon: '<i class="fa-solid fa-circle-check"></i>'
            },
            info: {
                title: "Information",
                icon: '<i class="fa-solid fa-circle-info"></i>'
            },
            warning: {
                title: "Warning",
                icon: '<i class="fa-solid fa-triangle-exclamation"></i>'
            }
        }
    },

    _escapeHtml(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    },

    _formatText(value) {
        return this._escapeHtml(value)
            .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
            .replace(/\r?\n/g, "<br>");
    },

    _getDuration(notification) {
        const rawDuration = notification.duration;
        const duration = Number.parseInt(rawDuration, 10);
        return Number.isNaN(duration) ? undefined : duration;
    },

    _getApi(notification) {
        const element = String(notification.element || this._defaults.element).trim();

        return element === "toast" ? PGS_notification.toast : PGS_notification.alert;
    },

    _getType(notification, api) {
        const type = String(notification.type || "info").trim();

        return typeof api[type] === "function" ? type : "info";
    },

    _getData(root) {
        const rawNotification = pgs(root).option.getValueBrackets("notification") || "{}";

        try {
            const notifications = JSON.parse(`[${rawNotification}]`);

            if (notifications.some(notification => !notification || typeof notification !== "object" || Array.isArray(notification))) {
                throw new TypeError("Each notification must be a JSON object");
            }

            return notifications;
        } catch (error) {
            console.warn("PGS notification: Invalid JSON configuration", error);
            return [];
        }
    },

    _getContent(title, description) {
        const safeDescription = this._formatText(description);
        const safeTitle = this._formatText(title);

        if (!safeTitle) return `<span>${safeDescription}</span>`;
        if (!safeDescription) return `<strong>${safeTitle}</strong>`;

        return `
            <strong>${safeTitle}</strong>
            <span>${safeDescription}</span>
        `;
    },

    _getContainer(element) {
        return Array.from(pgs(document).querySelectorAll("notification")).find(container => {
            const isToast = pgs(container).option.contains("toast");
            return element === "toast" ? isToast : !isToast;
        });
    },

    show(type, options = {}, element = this._defaults.element) {
        if (typeof options === "string") options = { title: options };

        if (!options || typeof options !== "object" || Array.isArray(options)) {
            throw new TypeError("PGS notification: options must be an object or a string");
        }

        const { type: typeDefaults, ...defaults } = this._defaults;
        const definedOptions = Object.fromEntries(
            Object.entries(options).filter(([, value]) => value !== undefined)
        );
        const resolvedElement = definedOptions.element || element;
        const config = {
            ...defaults,
            ...typeDefaults[type],
            ...definedOptions,
            type,
            element: resolvedElement,
            timeout: definedOptions.timeout ?? (resolvedElement === "toast" ? 4000 : defaults.timeout)
        };

        return this.initNotification(config);
    },

    initNotification({
        type,
        element,
        title,
        icon,
        description,
        timeout,
        link,
        linkTitle,
        closeTitle
    }) {
        let containerNotification = this._getContainer(element);
        const methodDelete = element === "toast" ? "replace" : "stack";
        const text = this._getContent(title, description);

        //== Create Container
        if (!containerNotification) {
            const newContainer = document.createElement("div");
            pgs(newContainer).add("notification");
            if (element === "toast") pgs(newContainer).option.add("toast");
            newContainer.setAttribute("aria-live", "polite");
            newContainer.setAttribute("aria-relevant", "additions");
            document.body.appendChild(newContainer);
            containerNotification = newContainer;
        }

        //== Create Notification
        const notification = document.createElement("div");
        if (methodDelete == "replace") containerNotification.innerHTML = "";
        if (timeout > 0) notification.style.setProperty("--notification-timeout", timeout + "ms");
        pgs(notification).state.add(type);
        pgs(notification).add("notification-element");
        notification.setAttribute("role", type == "error" ? "alert" : "status");
        notification.innerHTML = `
            <div pgs="notification-element-content">
                <div pgs="notification-element-icon">${icon}</div>
                <p>${text}</p>
            </div>
            <div pgs="notification-element-buttons">
                <button type="button" pgs="button notification-element-buttons-delete">${closeTitle}</button>
            </div>
        `;

        const notificationButtons = pgs(notification).querySelector("notification-element-buttons");
        const btnDelete = pgs(notification).querySelector("notification-element-buttons-delete");
        btnDelete.ariaLabel = closeTitle === "Close" ? "Close notification" : closeTitle;

        if (link) {
            const notificationLink = document.createElement("a");
            notificationLink.href = link;
            notificationLink.textContent = linkTitle;
            pgs(notificationLink).add("button");
            notificationButtons.insertAdjacentElement("afterbegin", notificationLink);
        }

        containerNotification.appendChild(notification);


        //+ Animation delete 
        function deleteNotification() {
            methodDelete == "stack" ? notification.style.translate = "120%" : notification.style.opacity = "0";
            setTimeout(() => notification.remove(), 300);
        }

        //== Timeout delete
        if (timeout > 0) setTimeout(() => { deleteNotification() }, timeout);

        //== event
        btnDelete.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation()
            deleteNotification(e); // Esegue la tua funzione
        });
    },

    deleteAll(element = this._defaults.element) {
        let containerNotification = this._getContainer(element);
        if (containerNotification) containerNotification.innerHTML = "";
    },

    trigger(root = document) {
        pgs(root).querySelectorAll("notificationTrigger").forEach(element => {
            if (!element || element.dataset.initialize === "true") return;

            element.dataset.initialize = "true";

            this._getData(element).forEach(notification => {
                const title = String(notification.title || "").trim();
                const description = String(notification.message || "").trim();
                const linkTitle = String(notification["title-link"] || this._defaults.linkTitle).trim();
                const closeTitle = String(notification["title-close"] || this._defaults.closeTitle).trim();

                if (!title && !description) return;

                const link = notification.link || this._defaults.link;
                const icon = notification.icon || undefined;
                const duration = this._getDuration(notification);
                const api = this._getApi(notification);
                const type = this._getType(notification, api);

                api[type]({
                    title,
                    description,
                    timeout: duration,
                    icon,
                    link,
                    linkTitle,
                    closeTitle
                });
            });

            element.remove();
        });
    }
};

//# TRIGGER
function PGS_notificationTrigger_init(root = document) {
    return fn_notification.trigger(root);
}

const PGS_notification = {
    init: PGS_notificationTrigger_init,
    trigger: PGS_notificationTrigger_init,
    alert: {
        error: (options = {}) => fn_notification.show("error", options),
        success: (options = {}) => fn_notification.show("success", options),
        info: (options = {}) => fn_notification.show("info", options),
        warning: (options = {}) => fn_notification.show("warning", options),
        deleteAll: () => fn_notification.deleteAll()
    },
    toast: {
        error: (options = {}) => fn_notification.show("error", options, "toast"),
        success: (options = {}) => fn_notification.show("success", options, "toast"),
        info: (options = {}) => fn_notification.show("info", options, "toast"),
        warning: (options = {}) => fn_notification.show("warning", options, "toast"),
        deleteAll: () => fn_notification.deleteAll("toast")
    }
};


//= EXECUTE
(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__.PGS_onDocumentReady)(PGS_notificationTrigger_init);


/***/ },

/***/ "./assets/javascript/components/_search.js"
/*!*************************************************!*\
  !*** ./assets/javascript/components/_search.js ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_search: () => (/* binding */ PGS_search)
/* harmony export */ });
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");


const API = new WeakMap();
const OPEN_SEARCHES = new Set();
let searchId = 0;

const DEFAULT_OPTIONS = {
    minLength: 2,
    debounce: 200,
    limit: 6,
    submitOnSelect: false,
    searchOnFocus: true,
    source: null,
    onSelect: null,
};

function nextSearchId() {
    searchId += 1;
    return searchId;
}

function getSearches(root) {
    const searches = root instanceof Element && pgs(root).contains("search") ? [root] : [];
    searches.push(...pgs(root).querySelectorAll("search"));
    return searches;
}

function directPgsChild(element, token) {
    return Array.from(element.children).find(child => pgs(child).contains(token));
}

function normalizeItem(item) {
    if (typeof item === "string" || typeof item === "number") {
        const value = String(item).trim();
        return value ? { label: value, value, disabled: false, data: item } : null;
    }

    if (!item || typeof item !== "object") return null;

    const label = String(item.label ?? item.value ?? "").trim();
    if (!label) return null;

    return {
        label,
        value: String(item.value ?? label),
        disabled: Boolean(item.disabled),
        data: Object.prototype.hasOwnProperty.call(item, "data") ? item.data : item,
    };
}

function normalizeOptions(current, options = {}) {
    const next = { ...current, ...options };
    next.minLength = Math.max(0, Number.parseInt(next.minLength, 10) || 0);
    next.debounce = Math.max(0, Number.parseInt(next.debounce, 10) || 0);
    next.limit = Math.max(1, Number.parseInt(next.limit, 10) || DEFAULT_OPTIONS.limit);
    next.submitOnSelect = Boolean(next.submitOnSelect);
    next.searchOnFocus = Boolean(next.searchOnFocus);
    next.source = typeof next.source === "function" || Array.isArray(next.source) ? next.source : null;
    next.onSelect = typeof next.onSelect === "function" ? next.onSelect : null;
    return next;
}

function closeSearch(search) {
    const data = API.get(search);
    if (!data) return;

    pgs(search).state.remove("open");
    data.input.setAttribute("aria-expanded", "false");
    data.input.removeAttribute("aria-activedescendant");
    data.list.setAttribute("aria-hidden", "true");
    data.setActiveIndex(-1);
    OPEN_SEARCHES.delete(search);
}

function openSearch(search) {
    const data = API.get(search);
    if (!data || data.items().length === 0) return;

    pgs(search).state.add("open");
    data.input.setAttribute("aria-expanded", "true");
    data.list.setAttribute("aria-hidden", "false");
    OPEN_SEARCHES.add(search);
}

function PGS_search_init(root = document) {
    getSearches(root).forEach(search => {
        if (API.has(search)) return;

        const input = search.querySelector('input[type="search"]');
        const list = directPgsChild(search, "search-suggestions");
        if (!input || !list) return;

        const id = nextSearchId();
        if (!input.id) input.id = `search-input-${id}`;
        if (!list.id) list.id = `search-suggestions-${id}`;

        input.setAttribute("role", "combobox");
        input.setAttribute("aria-autocomplete", "list");
        input.setAttribute("aria-haspopup", "listbox");
        input.setAttribute("aria-controls", list.id);
        input.setAttribute("aria-expanded", "false");
        input.setAttribute("autocomplete", "off");
        list.setAttribute("role", "listbox");
        list.setAttribute("aria-labelledby", input.id);
        list.setAttribute("aria-hidden", "true");


        let options = { ...DEFAULT_OPTIONS };
        let items = [];
        let activeIndex = -1;
        let timer = null;
        let controller = null;
        let requestNumber = 0;

        function setLoading(loading) {
            pgs(search).state.toggle("loading", loading);
            input.setAttribute("aria-busy", String(loading));
        }

        function setActiveIndex(index) {
            activeIndex = index;
            const elements = Array.from(list.querySelectorAll('[pgs~="search-suggestions-item"]'));

            elements.forEach((element, itemIndex) => {
                const selected = itemIndex === activeIndex;
                element.setAttribute("aria-selected", String(selected));
                pgs(element).state.toggle("selected", selected);
            });

            const active = elements[activeIndex];
            if (active) {
                input.setAttribute("aria-activedescendant", active.id);
                active.scrollIntoView({ block: "nearest" });
            } else {
                input.removeAttribute("aria-activedescendant");
            }
        }

        function moveActive(step) {
            if (!items.length) return;

            let next = activeIndex;
            for (let checked = 0; checked < items.length; checked += 1) {
                next = (next + step + items.length) % items.length;
                if (!items[next].disabled) {
                    setActiveIndex(next);
                    return;
                }
            }
        }

        function clear() {
            items = [];
            activeIndex = -1;
            list.replaceChildren();
            closeSearch(search);
        }

        function cancel() {
            if (timer !== null) window.clearTimeout(timer);
            timer = null;
            if (controller) controller.abort();
            controller = null;
            requestNumber += 1;
            setLoading(false);
        }

        function render(nextItems) {
            items = Array.from(nextItems || [])
                .map(normalizeItem)
                .filter(Boolean)
                .slice(0, options.limit);

            const fragment = document.createDocumentFragment();
            items.forEach((item, index) => {
                const option = document.createElement("li");
                pgs(option).add("search-suggestions-item");
                pgs(option).add("flexRow");
                option.id = `${list.id}-option-${index}`;
                option.dataset.index = String(index);
                option.setAttribute("role", "option");
                option.setAttribute("aria-selected", "false");
                option.setAttribute("aria-disabled", String(item.disabled));
                option.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>' +  item.label;
                fragment.append(option);

            });

            activeIndex = -1;
            list.replaceChildren(fragment);
            pgs(search).state.remove("error");

            if (items.length) openSearch(search);
            else closeSearch(search);

            return items;
        }

        async function resolveSource(query, signal) {
            if (Array.isArray(options.source)) {
                const normalizedQuery = query.toLocaleLowerCase();
                return options.source.filter(item => {
                    const normalized = normalizeItem(item);
                    return normalized && normalized.label.toLocaleLowerCase().includes(normalizedQuery);
                });
            }

            if (typeof options.source !== "function") return [];
            return await options.source({
                query,
                signal,
                limit: options.limit,
                element: search,
                input,
            });
        }

        async function runSearch(query = input.value) {
            cancel();
            clear();

            const normalizedQuery = String(query ?? "").trim();
            if (normalizedQuery.length < options.minLength || !options.source) return [];

            const currentRequest = requestNumber;
            controller = new AbortController();
            const currentController = controller;
            setLoading(true);

            try {
                const result = await resolveSource(normalizedQuery, currentController.signal);
                if (currentRequest !== requestNumber || currentController.signal.aborted) return [];
                return render(result);
            } catch (error) {
                if (error?.name === "AbortError") return [];
                if (currentRequest !== requestNumber) return [];

                clear();
                pgs(search).state.add("error");
                search.dispatchEvent(new CustomEvent("pgs:search:error", {
                    bubbles: true,
                    detail: { error, query: normalizedQuery },
                }));
                return [];
            } finally {
                if (controller === currentController) controller = null;
                if (currentRequest === requestNumber) setLoading(false);
            }
        }

        function schedule() {
            cancel();
            clear();
            pgs(search).state.remove("error");

            if (input.value.trim().length < options.minLength || !options.source) return;
            timer = window.setTimeout(() => {
                timer = null;
                runSearch(input.value);
            }, options.debounce);
        }

        function select(index = activeIndex, submit = options.submitOnSelect) {
            const item = items[index];
            if (!item || item.disabled) return null;

            input.value = item.value;
            cancel();
            clear();

            const detail = { item, index, value: item.value, input, element: search };
            search.dispatchEvent(new CustomEvent("pgs:search:select", { bubbles: true, detail }));
            options.onSelect?.(detail);

            input.focus();
            if (submit && typeof search.requestSubmit === "function") search.requestSubmit();
            return item;
        }

        function configure(nextOptions = {}) {
            options = normalizeOptions(options, nextOptions);
            return api;
        }

        function onInput() {
            schedule();
        }

        function onFocus() {
            if (items.length) openSearch(search);
            else if (options.searchOnFocus) schedule();
        }

        function onKeydown(event) {
            if (event.key === "ArrowDown") {
                if (!pgs(search).state.contains("open")) schedule();
                if (items.length) {
                    event.preventDefault();
                    moveActive(1);
                }
                return;
            }

            if (event.key === "ArrowUp" && items.length) {
                event.preventDefault();
                moveActive(-1);
                return;
            }

            if (event.key === "Enter" && activeIndex >= 0) {
                event.preventDefault();
                select(activeIndex);
                return;
            }

            if (event.key === "Escape") {
                event.preventDefault();
                cancel();
                closeSearch(search);
                return;
            }

            if (event.key === "Tab") closeSearch(search);
        }

        function onListPointerDown(event) {
            const option = event.target.closest('[pgs~="search-suggestions-item"]');
            if (!option || !list.contains(option)) return;
            event.preventDefault();
            select(Number.parseInt(option.dataset.index, 10));
        }

        function onSubmit() {
            cancel();
            closeSearch(search);
        }

        function destroy() {
            cancel();
            clear();
            input.removeEventListener("input", onInput);
            input.removeEventListener("focus", onFocus);
            input.removeEventListener("keydown", onKeydown);
            list.removeEventListener("pointerdown", onListPointerDown);
            search.removeEventListener("submit", onSubmit);
            API.delete(search);
        }

        const api = {
            element: search,
            input,
            list,
            configure,
            setSource: source => configure({ source }),
            search: runSearch,
            open: () => openSearch(search),
            close: () => closeSearch(search),
            clear,
            cancel,
            select,
            refresh: () => runSearch(input.value),
            destroy,
            items: () => [...items],
            isOpen: () => pgs(search).state.contains("open"),
            isLoading: () => pgs(search).state.contains("loading"),
            setActiveIndex,
        };

        input.addEventListener("input", onInput);
        input.addEventListener("focus", onFocus);
        input.addEventListener("keydown", onKeydown);
        list.addEventListener("pointerdown", onListPointerDown);
        search.addEventListener("submit", onSubmit);
        API.set(search, api);
    });
}

document.addEventListener("pointerdown", event => {
    OPEN_SEARCHES.forEach(search => {
        if (!search.contains(event.target)) closeSearch(search);
    });
});

(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__.PGS_onDocumentReady)(PGS_search_init);

function PGS_search_api(selector) {
    return API.get(selector);
}

const PGS_search = {
    init: PGS_search_init,
    api: PGS_search_api,
};


/***/ },

/***/ "./assets/javascript/components/_slides.js"
/*!*************************************************!*\
  !*** ./assets/javascript/components/_slides.js ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_slides: () => (/* binding */ PGS_slides)
/* harmony export */ });
/* harmony import */ var _helper_scrollY_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/_scrollY.js */ "./assets/javascript/helper/_scrollY.js");
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");


const API = new WeakMap();

function getSlides(root) {
    const slides = root instanceof Element && pgs(root).contains("slides") ? [root] : [];
    slides.push(...pgs(root).querySelectorAll("slides"));
    return slides;
}

class PGS_Slides {
    //- CONSTRUCTOR
    constructor({ element, viewRatio = 0.97, optionIntersectionObserver = {}, scrollOptions = {} } = {}) {
        this.element = element;
        this.viewRatio = viewRatio;

        this.optionIntersectionObserver = {
            threshold: Array.from({ length: 101 }, (_, i) => i / 100), // 0%,1%,2%...100%
            rootMargin: "0px",
            ...optionIntersectionObserver,
        };

        this.scrollOptions = {
            behavior: "smooth",
            inline: "center",
            block: "nearest",
            container: "nearest",
            ...scrollOptions,
        };

        this.container = this.element ? pgs(this.element).querySelector("slides-container") : null;
    }
    
    //+ CREATE BUTTON 
    #createButtonsAndDots() {
        const EL = this.element;

        //== PULSANTI
        if (!pgs(EL).querySelector('slides-prec')) {
            EL.insertAdjacentHTML("afterbegin", `<button pgs="slides-prec button" pgs-option="buttonIcon" type="button" class="precButton" aria-label="slide precedente"> <span> <i class="fa-solid fa-arrow-left"></i></span></button>`);
        }
        if (!pgs(EL).querySelector('slides-next')) {
            EL.insertAdjacentHTML("beforeend", `<button pgs="slides-next button" pgs-option="buttonIcon" type="button" class="nextButton" aria-label="prossima slide"> <span> <i class="fa-solid fa-arrow-right"></i></span></button>`);
        }

        //== DOTS
        if (!pgs(EL).querySelector('slides-dots')) {
            EL.insertAdjacentHTML("beforeend", `<div pgs="slides-dots" class="slides-dots"></div>`);
        }

        const dotsContainer = pgs(EL).querySelector('slides-dots');
        while (dotsContainer.children.length < this.container.children.length) {
            dotsContainer.insertAdjacentHTML("beforeend", `<button type="button" class="slide-dot"></button>`);
        }
        while (dotsContainer.children.length > this.container.children.length) {
            dotsContainer.lastElementChild.remove();
        }
        Array.from(dotsContainer.children).forEach((dot, index) => {
            dot.setAttribute("aria-label", `vai alla slide ${index + 1}`);
        });
    }

    //+ PREV 
    #previousSlide() {
        const currents = this.container.querySelectorAll('.view');
        let current;
        

        if (pgs(this.element).option.contains('singleScroll')) current = currents[currents.length - 1];
        else current = currents[0];

        const prev = current?.previousElementSibling;

        prev?.scrollIntoView(this.scrollOptions);
        prev?.focus({ preventScroll: true });
    }

    //+ NEXT 
    #nextSlide() {
        const currents = this.container.querySelectorAll('.view');
        let current;

        
        
        if (pgs(this.element).option.contains('singleScroll')) current = currents[0];
        else current = currents[currents.length - 1];
        
        const next = current?.nextElementSibling;
        next?.scrollIntoView(this.scrollOptions);
        next?.focus({ preventScroll: true });
    }

    //+ GO TO NUMBER SLIDE 
    #goToNumberSlide(index) {
        this.container.children[index]?.scrollIntoView(this.scrollOptions);
    }

    //+ CALLBACK
    #callback(allLi, container, precButton, nextButton, dots) {
        allLi.forEach(LI => {
            const visiblePercent = 0.9 + LI.intersectionRatio * 0.1;
            const isView = visiblePercent >= 0.98;

            //== SCROLL ANIMATION
            if (!pgs(LI.target).option.contains('notScrollAnimation') && LI.target.firstElementChild) {
                LI.target.firstElementChild.style.setProperty('--visible-percent', `${visiblePercent}`);
            };

            //== VIEW & NOT-VIEW 
            LI.target.classList.toggle("view", isView);
            LI.target.classList.toggle("notView", !isView);

            //== VIEW PREC e NEXT
            const all = LI.target.parentNode.children;
            const atStart = all[0].classList.contains("view");
            const atEnd = all[all.length - 1].classList.contains("view");
            nextButton.disabled = atEnd;
            precButton.disabled = atStart;
            nextButton.setAttribute('aria-disabled', String(atEnd));
            precButton.setAttribute('aria-disabled', String(atStart));

            //== ACTIVE DOT
            const viewElements = Array.from(container.children).filter(el => el.classList.contains('view'));
            dots.forEach((btn, i) => {
                const isActive = viewElements.some(el => Array.from(container.children).indexOf(el) === i);
                btn.classList.toggle('active', isActive);
                btn.setAttribute('aria-current', isActive ? 'true' : 'false');
            });
        })
    }

    //= EXECUTE
    execute() {
        const slides = this.element;
        if (!this.container) return;
        const eventController = new AbortController();
        const { signal } = eventController;

        //== elements
        this.#createButtonsAndDots();
        const precButton = pgs(slides).querySelector('slides-prec');
        const nextButton = pgs(slides).querySelector('slides-next');
        const dots = Array.from(pgs(slides).querySelector('slides-dots').children);

        //== option
        const notScrollWithMouse = pgs(slides).option.contains('notScrollWithMouse');

        //== scroll
        const removeHorizontalScroll = notScrollWithMouse
            ? null
            : (0,_helper_scrollY_js__WEBPACK_IMPORTED_MODULE_0__.PGS_scrollHorizontal)(this.container, 5);

        //==Listener: DOT, PREC, NEXT
        dots.forEach((dot, index) => dot.addEventListener("click", () => this.#goToNumberSlide(index), { signal }));
        precButton.addEventListener("click", () => this.#previousSlide(), { passive: true, signal });
        nextButton.addEventListener("click", () => this.#nextSlide(), { passive: true, signal });

        //== observer
        const observer = new IntersectionObserver(
            (allLi) => this.#callback(allLi, this.container, precButton, nextButton, dots),
            { root: this.container, ...this.optionIntersectionObserver }
        );
        Array.from(this.container.children).forEach(allLi => observer.observe(allLi));


        let api;
        const destroy = () => {
            if (API.get(this.element) !== api) return;
            eventController.abort();
            observer.disconnect();
            removeHorizontalScroll?.();
            API.delete(this.element);
        };

        //- API
        api = {
            element: this.element,
            container: this.container,
            previous: () => this.#previousSlide(),
            next: () => this.#nextSlide(),
            goTo: (index) => this.#goToNumberSlide(index),
            getCurrentIndexes: () => Array.from(this.container.children).map((el, i) => el.classList.contains("view") ? i : -1).filter(i => i !== -1),
            getCurrentElements: () => Array.from(this.container.children).filter(el => el.classList.contains("view")),
            getTotal: () => this.container.children.length,
            isAtStart: () => this.container.children[0]?.classList.contains("view") || false,
            isAtEnd: () => {
                const children = this.container.children;
                const last = children[children.length - 1];
                return last?.classList.contains("view") || false;
            },
            refresh: () => {
                if (API.get(this.element) !== api) return API.get(this.element);
                destroy();
                const instance = new PGS_Slides({
                    element: this.element,
                    viewRatio: this.viewRatio,
                    optionIntersectionObserver: this.optionIntersectionObserver,
                    scrollOptions: this.scrollOptions,
                });
                instance.execute();
                return API.get(this.element);
            },
        };
        API.set(this.element, api);
    }
}

//# INIT 
function PGS_slides_init(root = document) {
    getSlides(root).forEach(element => {
        if (API.has(element)) return;

        const instance = new PGS_Slides({ element });
        instance.execute();
    });
}

(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_1__.PGS_onDocumentReady)(PGS_slides_init);

//# API 
function PGS_slides_api(element) {
    return API.get(element);
}

const PGS_slides = {
    init: PGS_slides_init,
    api: PGS_slides_api
};


/***/ },

/***/ "./assets/javascript/components/_stepTabs.js"
/*!***************************************************!*\
  !*** ./assets/javascript/components/_stepTabs.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_stepTabs: () => (/* binding */ PGS_stepTabs)
/* harmony export */ });
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");


const API = new WeakMap();

function PGS_stepTabs_init(root = document) {
    pgs(root).querySelectorAll("stepTabs").forEach(tabsWizard => {
        if (tabsWizard.dataset.stepTabsInitialized === "true") return;
        tabsWizard.dataset.stepTabsInitialized = "true";

        //= SELECTOR
        const prev = pgs(tabsWizard).querySelector("stepTabs-prev")
        const next = pgs(tabsWizard).querySelector("stepTabs-next")
        const restart = pgs(tabsWizard).querySelector("stepTabs-restart")
        const dots = pgs(tabsWizard).querySelector("stepTabs-dots")
        const tabsContainer = pgs(tabsWizard).querySelector("stepTabs-container");
        const allTab = pgs(tabsContainer).querySelectorAll("tab");

        //= SETTING
        const total = allTab.length;
        const defaultTabLocked = Array.from(allTab).filter(tab => pgs(tab).state.contains("is-locked"))        
        let current = 0;
        if (prev) prev.disabled = true;
        let isRendering = false;

        if (!tabsContainer || total === 0) return;

        //- CREAZIONE DOTS
        const tabDots = [];
        if (dots) {
            dots.innerHTML = "";

            allTab.forEach((tab, index) => {
                const iconClass = pgs(tab).option.getValueBrackets("tabIcon") || "fa-circle";
                const dot = document.createElement("button");
                dot.type = "button";
                pgs(dot).add("stepTabs-dots-dot");
                pgs(dot).option.setValueBrackets("step", index);
                dot.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;

                dot.addEventListener("click", () => {
                    if (pgs(dot).state.contains("is-completed")) {
                        goTo(index, true);
                    }
                });

                dots.appendChild(dot);
                tabDots.push(dot);
            });
        }

        //+ DOTS
        function updateDots() {
            tabDots.forEach((dot, i) => {
                setState(dot, "is-active", i === current);
                setState(dot, "is-completed", i < current);
            });
        }

        //+ STATE
        function setState(element, state, active) {
            if (!element) return;
            const hasState = pgs(element).state.contains(state);
            if (active === hasState) return;
            pgs(element).state.toggle(state, active);
        }

        //+ CONTROLS
        function updateControls() {
            const tab = allTab[current];
            if (prev) prev.disabled = current === 0;
            if (next) next.disabled = current === total - 1 || pgs(tab).state.contains("is-locked");
        }

        //+ Step
        function goTo(index, scroll = true) {
            current = Math.min(Math.max(index, 0), total - 1);
            const tab = allTab[current]

            isRendering = true;
            allTab.forEach((tab, i) => setState(tab, "is-active", i === current));
            updateControls();
            updateDots();
            isRendering = false;

            if (scroll && !tabsWizard.closest("dialog")) {
                tab?.focus();
                tabsWizard?.scrollIntoView({ behavior: "smooth", block: "start" });
            }

            tabsWizard.dispatchEvent(new CustomEvent('stepTabs:change', { detail: { current, total } }));
        }

        //+ restart
        function restartTab() {
            goTo(0);
            defaultTabLocked.forEach(tab => pgs(tab).state.add("is-locked"));
        }

        //= INIT
        goTo(0, false);

        //= tab-locked
        const observer = new MutationObserver(() => {
            if (isRendering) return;
            updateControls();
        });
        allTab?.forEach(tabEl => observer.observe(tabEl, { attributes: true, attributeFilter: ["pgs-state"], }));

        //= Click su Avanti/Indietro
        prev?.addEventListener("click", e => goTo(current - 1));
        next?.addEventListener("click", e => {
            updateControls();
            if (next.disabled) return;
            goTo(current + 1);
        });
        restart?.addEventListener("click", e => restartTab(), { capture: true });

        //-(API) 
        // tabsWizard.addEventListener("stepTabs:reset", () => restartTab());
        API.set(tabsWizard, {
            element: tabsWizard,
            container: tabsContainer,
            restart: restartTab,
            goTo,
            next: () => goTo(current + 1),
            prev: () => goTo(current - 1),
            toggleLock: (step, lock = true) => typeof step === "number" && allTab[step] && (pgs(allTab[step]).state.toggle("is-locked", lock), goTo(current)),
            refresh: () => {
                PGS_stepTabs_init(tabsWizard.parentNode || document);
                return API.get(tabsWizard);
            },
            getCurrent: () => current,
            getState: () => ({ current, total }),
        });
    });
}

(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__.PGS_onDocumentReady)(PGS_stepTabs_init);

function PGS_stepTabs_api(selector) {
    return API.get(selector);
}

const PGS_stepTabs = {
    init: PGS_stepTabs_init,
    api: PGS_stepTabs_api
};

/* 
    / EXAMPLE
    // vai allo step 2
    w.dispatchEvent(new CustomEvent("stepTabs:go", { detail: { step: 2 } }));
    
    // next
    w.dispatchEvent(new CustomEvent("stepTabs:next"));
    
    // prev
    w.dispatchEvent(new CustomEvent("stepTabs:prev"));
    
    // reset a 0 senza relock
    w.dispatchEvent(new CustomEvent("stepTabs:reset"));
    
    // lock step 3
    w.dispatchEvent(new CustomEvent("stepTabs:toggle-lock", { detail: { step: 3, lock: true } }));
    
    // unlock step 3
    w.dispatchEvent(new CustomEvent("stepTabs:toggle-lock", { detail: { step: 3, lock: false } }));
    
    // leggi stato
    w.dispatchEvent(new CustomEvent("stepTabs:get", { detail: { reply: (state) => console.log(state) } }));
*/


/***/ },

/***/ "./assets/javascript/components/_steps.js"
/*!************************************************!*\
  !*** ./assets/javascript/components/_steps.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_steps: () => (/* binding */ PGS_steps)
/* harmony export */ });
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");


const API = new WeakMap();

function PGS_steps_init(root = document) {
    pgs(root).querySelectorAll("steps").forEach(steps => {
        if (API.has(steps)) return;

        pgs(steps).querySelectorAll("steps-step").forEach((li, index) => {
            
            //= CIRCLE
            let circleLi;
            if (!pgs(li).querySelector("steps-step-circle")) {
                circleLi = document.createElement("span");
                pgs(circleLi).add("steps-step-circle")
                circleLi.textContent = index + 1;
                li.insertAdjacentElement("afterbegin", circleLi);
            } else{
                circleLi = pgs(li).querySelector("steps-step-circle");
            }
            
            //= line
            if (!pgs(li).querySelector("steps-step-line")) {
                const line = document.createElement("span");
                pgs(line).add("steps-step-line")
                li.insertAdjacentElement("afterbegin", line);
            }
        });

        API.set(steps, {
            element: steps,
            steps: () => Array.from(pgs(steps).querySelectorAll("steps-step")),
            getStep: (index) => pgs(steps).querySelectorAll("steps-step")[index],
            getTotal: () => pgs(steps).querySelectorAll("steps-step").length,
            refresh: () => {
                API.delete(steps);
                PGS_steps_init(steps.parentNode || document);
                return API.get(steps);
            },
        });
    });
}

//# INIT PGS_ol
(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__.PGS_onDocumentReady)(PGS_steps_init);

//# API
function PGS_steps_api(selector) {
    return API.get(selector);
}

const PGS_steps = {
    init: PGS_steps_init,
    api: PGS_steps_api
};


/***/ },

/***/ "./assets/javascript/components/_summary.js"
/*!**************************************************!*\
  !*** ./assets/javascript/components/_summary.js ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_summary: () => (/* binding */ PGS_summary)
/* harmony export */ });
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");


//= SUMMARY
const API = new WeakMap();
let summaryId = 0;
const MESSAGE_DEFAULTS = {
    showLess: "Show less",
    showMore: "Show more"
};

function nextSummaryId() {
    summaryId += 1;
    return summaryId;
}

function getLineHeight(element) {
    const style = window.getComputedStyle(element);
    const lineHeight = parseFloat(style.lineHeight);
    if (Number.isFinite(lineHeight)) return lineHeight;

    const fontSize = parseFloat(style.fontSize);
    return Number.isFinite(fontSize) ? fontSize * 1.2 : 0;
}

function directPgsChild(element, token) {
    return Array.from(element.children).find(child => pgs(child).contains(token));
}

function validateMessages(value) {
    if (value === undefined) return;
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        throw new TypeError("message must be an object");
    }

    Object.entries(value).forEach(([key, message]) => {
        if (!(key in MESSAGE_DEFAULTS)) {
            throw new TypeError(`Unknown summary message option: ${key}`);
        }
        if (message !== undefined && typeof message !== "string") {
            throw new TypeError(`Summary message option ${key} must be a string`);
        }
    });
}

function getInitialMessages(value = {}) {
    validateMessages(value);

    return {
        ...MESSAGE_DEFAULTS,
        ...Object.fromEntries(
            Object.entries(value).filter(([, message]) => message !== undefined)
        )
    };
}

function initializeMessages(summary, messages) {
    const summaryOptions = pgs(summary).option;
    Object.entries(messages).forEach(([key, message]) => {
        if (!summaryOptions.contains(key)) summaryOptions.setValueBrackets(key, message);
    });
}

function PGS_summary_init(root = document, options = {}) {
    if (!options || typeof options !== "object" || Array.isArray(options)) {
        throw new TypeError("options must be an object");
    }

    const initialMessages = getInitialMessages(options.message);

    pgs(root).querySelectorAll("summary").forEach((summary) => {
        if (API.has(summary)) return;

        const content = directPgsChild(summary, "summary-content");
        const button = directPgsChild(summary, "summary-button");
        if (!content || !button) return;

        initializeMessages(summary, initialMessages);

        const id = nextSummaryId();
        const contentId = content.id || `summary-content-${id}`;
        content.id = contentId;

        button.type ||= "button";
        button.setAttribute("aria-controls", content.id);

        function isOpen() {
            return pgs(summary).state.contains("open");
        }

        function getCollapsedHeight() {
            return getLineHeight(content) * 3;
        }

        function isOverflowing() {
            return content.scrollHeight > Math.ceil(getCollapsedHeight()) + 1;
        }

        function setExpanded(expanded) {
            const overflow = isOverflowing();

            pgs(summary).state.toggle("overflow", overflow);
            pgs(summary).state.toggle("open", expanded && overflow);

            button.hidden = !overflow;
            button.setAttribute("aria-hidden", String(!overflow));
            button.setAttribute("aria-expanded", String(expanded && overflow));
            button.textContent = pgs(summary).option.getValueBrackets(
                expanded && overflow ? "showLess" : "showMore"
            );

            const nextHeight = expanded && overflow ? content.scrollHeight : getCollapsedHeight();
            content.style.setProperty("--summary-content-max-height", `${nextHeight}px`);
        }

        function refresh() {
            const wasOpen = isOpen();
            content.style.setProperty("--summary-content-max-height", "none");
            setExpanded(wasOpen);
        }

        function toggle() {
            setExpanded(!isOpen());
        }

        button.addEventListener("click", toggle);
        window.addEventListener("resize", refresh, { passive: true });

        refresh();
        requestAnimationFrame(refresh);

        API.set(summary, {
            element: summary,
            content,
            button,
            open: () => setExpanded(true),
            close: () => setExpanded(false),
            toggle,
            refresh,
            isOpen,
        });
    });
}

//# INIT
(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__.PGS_onDocumentReady)(PGS_summary_init);

//# API
function PGS_summary_api(selector) {
    return API.get(selector);
}

const PGS_summary = {
    init: PGS_summary_init,
    api: PGS_summary_api
};


/***/ },

/***/ "./assets/javascript/helper/_formValidate.js"
/*!***************************************************!*\
  !*** ./assets/javascript/helper/_formValidate.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_formValidate: () => (/* binding */ PGS_formValidate)
/* harmony export */ });
/* harmony import */ var _pgs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_pgs.js */ "./assets/javascript/_pgs.js");
/* harmony import */ var _components_notifications_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/_notifications.js */ "./assets/javascript/components/_notifications.js");
/* harmony import */ var _components_alerts_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/_alerts.js */ "./assets/javascript/components/_alerts.js");





class PGS_formValidate {
    #messageDefaults = {
        fieldErrorTitle: "Error!",
        fieldError: "Please complete this field.",
        fieldsError: "Please complete all required fields.",
        successTitle: "Submitted",
        success: "Submitted successfully."
    };
    #temporaryFieldErrors = new Map();
    #insideValidatedCallback = false;

    constructor(form, options = {}) {
        if (!options || typeof options !== "object" || Array.isArray(options)) {
            throw new TypeError("options must be an object");
        }

        this.container = form;
        this._rules = [];
        this.typeNotice = options.typeNotice === "toast" ? "toast" : "alert";
        this.showSuccessOnValidate = options.showSuccessOnValidate !== false;
        this.alertContainer = options.alertContainer;

        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(this.container).add("formValidate");
        this.#initializeMessages(options.message);
        this.container?.setAttribute("novalidate", "");
    }

    #validateMessages(value) {
        if (value === undefined) return;
        if (!value || typeof value !== "object" || Array.isArray(value)) {
            throw new TypeError("message must be an object");
        }

        Object.entries(value).forEach(([key, message]) => {
            if (!(key in this.#messageDefaults)) {
                throw new TypeError(`Unknown form message option: ${key}`);
            }
            if (message !== undefined && typeof message !== "string") {
                throw new TypeError(`Form message option ${key} must be a string`);
            }
        });
    }

    #initializeMessages(value = {}) {
        this.#validateMessages(value);

        const formOptions = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(this.container).option;
        const initialMessages = {
            ...this.#messageDefaults,
            ...Object.fromEntries(
                Object.entries(value).filter(([, message]) => message !== undefined)
            )
        };

        Object.entries(initialMessages).forEach(([key, message]) => {
            if (!formOptions.contains(key)) formOptions.setValueBrackets(key, message);
        });
    }

    #getMessage(key) {
        return (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(this.container).option.getValueBrackets(key);
    }

    temporaryFieldError = {
        set: (field, options = {}) => {
            if (!field || typeof field.matches !== "function" || !this.container.contains(field)) {
                throw new TypeError("field must be an element contained in the form");
            }

            if (typeof options === "string") options = { message: options };
            if (!options || typeof options !== "object" || Array.isArray(options)) {
                throw new TypeError("temporaryFieldError options must be an object or a string");
            }

            this.#temporaryFieldErrors.set(field, {
                title: options.title || "",
                message: options.message || ""
            });
            this.validate();
            return this.temporaryFieldError;
        },

        remove: (field) => {
            this.#removeFieldError(field);
            return this.temporaryFieldError;
        },

        clear: () => {
            [...this.#temporaryFieldErrors.keys()].forEach(field => {
                this.#removeFieldError(field);
            });
            return this.temporaryFieldError;
        }
    };

    // - Helpers
    #help = {
        // supporta sia required nativo
        isRequired(field) {
            if (!field) return false;

            const required = field.required === true || field?.dataset?.required === "true" || field?.getAttribute('aria-required') == "true";
            return required && !field.hidden; // solo attributo/proprietà "hidden"
        },
        // input (non speciali), textarea
        isEmptyTextLike(field) { return !String(field?.value ?? "").trim(); },
        // select: vuoto se value == "" o null
        isEmptySelect(field) { return !String(field?.value ?? "").trim(); },
        // recupera name in modo sicuro
        getGroupName(field) { return field?.name || field?.getAttribute?.("name") || ""; }
    };


    // + --------------------------
    // + input + altri elementi.   
    // + --------------------------
    #inputValue(container) {

        //++ add rule
        const ruleInvalidFields = [];
        for (const rule of this._rules) {
            const res = rule(container);

            // la rule può tornare:
            // • null/undefined => ok
            // • un elemento => invalido
            // • un array di elementi => invalidi
            if (!res) continue;

            if (Array.isArray(res)) ruleInvalidFields.push(...res);
            else ruleInvalidFields.push(res);
        }

        //== INPUT 
        // "testuali" (esclude hidden/disabled/checkbox/radio/file come nel tuo snippet)
        const textInputs = Array.from(container.querySelectorAll("input")).filter((input) => {
            if (input.disabled) return false;
            if (input.type === "hidden") return false;
            if (input.type === "checkbox" || input.type === "radio" || input.type === "file") return false;

            // valida solo se required
            if (!this.#help.isRequired(input)) return false;

            return this.#help.isEmptyTextLike(input);
        });

        //== TEXTAREA 
        // required vuote
        const textareas = Array.from(container.querySelectorAll("textarea")).filter((ta) => {
            if (ta.disabled) return false;
            if (!this.#help.isRequired(ta)) return false;
            return this.#help.isEmptyTextLike(ta);
        });

        //== SELECT 
        // required vuoti
        const selects = Array.from(container.querySelectorAll("select")).filter((sel) => {
            if (sel.disabled) return false;
            if (!this.#help.isRequired(sel)) return false;
            return this.#help.isEmptySelect(sel);
        });

        //== RADIO 
        // required: se in un gruppo required non ce n'è uno checked => errore sul "primo" radio del gruppo
        const radios = Array.from(container.querySelectorAll('input[type="radio"]')).filter((r) => !r.disabled);
        const requiredRadioGroups = new Map(); // name -> [elements]
        for (const r of radios) {
            if (!this.#help.isRequired(r)) continue;
            const name = this.#help.getGroupName(r);
            if (!name) continue;
            if (!requiredRadioGroups.has(name)) {
                requiredRadioGroups.set(name, radios.filter(radio => this.#help.getGroupName(radio) === name));
            }
        }
        const radioGroupErrors = [];
        for (const [name, group] of requiredRadioGroups.entries()) {
            const anyChecked = group.some((r) => r.checked);
            if (!anyChecked) {
                radioGroupErrors.push(group[0].closest("fieldset") || group[0]);
            }
        }

        //== CHECKBOX 
        // required: può essere singola checkbox required (checked obbligatorio)
        // oppure gruppo di checkbox (stesso name) con almeno una selezionata
        const checkboxes = Array.from(container.querySelectorAll('input[type="checkbox"]')).filter((c) => !c.disabled);
        const requiredCheckboxSingles = [];
        const requiredCheckboxGroups = new Map(); // name -> [elements]
        for (const c of checkboxes) {
            if (!this.#help.isRequired(c)) continue;

            const name = this.#help.getGroupName(c);
            if (!name) {
                // checkbox senza name: trattala come singola required
                if (!c.checked) requiredCheckboxSingles.push(c);
                continue;
            }

            // se vuoi trattare come gruppo, raggruppa per name
            if (!requiredCheckboxGroups.has(name)) requiredCheckboxGroups.set(name, []);
            requiredCheckboxGroups.get(name).push(c);
        }
        const checkboxGroupErrors = [];
        for (const [name, group] of requiredCheckboxGroups.entries()) {
            // se è un gruppo (>=2) richiedi almeno una spuntata
            // se è 1 sola, si comporta come singola
            const anyChecked = group.some((c) => c.checked);
            if (!anyChecked) {
                const fieldset = group.length > 1 ? group[0].closest("fieldset") : null;
                checkboxGroupErrors.push(fieldset || group[0]);
            }
        }

        //== FILE 
        // required: se vuoi includerlo
        const fileInputs = Array.from(container.querySelectorAll('input[type="file"]')).filter((f) => {
            if (f.disabled) return false;
            if (!this.#help.isRequired(f)) return false;
            return !(f.files && f.files.length > 0);
        });

        //== risultato finale: tutti i campi da marcare come errore
        const invalidFields = [
            textInputs,
            textareas,
            selects,
            radioGroupErrors,
            requiredCheckboxSingles,
            checkboxGroupErrors,
            fileInputs,
            ruleInvalidFields,
            [...this.#temporaryFieldErrors.keys()]
        ];

        return [...new Set(invalidFields.flat())];
    }

    //+ ADD
    #addFieldError(field, i = 0, total = 1) {
        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(field).state.add("errorField");

        if (i === 0) field.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
        if (i !== 0) return;

        const messageSource = field.matches("fieldset")
            ? field.querySelector('[pgs-option*="message["], [pgs-option*="messageTitle["]')
            : field;
        const source = messageSource || field;
        const temporaryError = this.#temporaryFieldErrors.get(field);
        const fieldTitle = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(source).option.getValueBrackets("messageTitle");
        const fieldMessage = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(source).option.getValueBrackets("message");
        const title = temporaryError?.title || fieldTitle || this.#getMessage("fieldErrorTitle");
        const description = total > 1
            ? this.#getMessage("fieldsError")
            : temporaryError?.message || fieldMessage || this.#getMessage("fieldError");

        if (this.typeNotice == "alert") {
            _components_alerts_js__WEBPACK_IMPORTED_MODULE_2__.PGS_alert.error({
                title: title,
                description: description,
                root: this.container,
                container: this.alertContainer
            });
        } else {
            _components_notifications_js__WEBPACK_IMPORTED_MODULE_1__.PGS_notification.toast.error({
                title: title,
                description: description
            });
        }
    }

    //+ REMOVE
    #removeFieldError(field) {
        this.#temporaryFieldErrors.delete(field);
        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(field).state.remove("errorField");
    }

    // + SUCCESS
    success(description = this.#getMessage("success"), title = this.#getMessage("successTitle")) {
        if (this.#insideValidatedCallback || this.validate() === true) {

            if (this.typeNotice == "alert") {
                _components_alerts_js__WEBPACK_IMPORTED_MODULE_2__.PGS_alert.success({
                    title,
                    description,
                    root: this.container,
                    container: this.alertContainer
                });
            } else {
                _components_notifications_js__WEBPACK_IMPORTED_MODULE_1__.PGS_notification.toast.success({
                    title,
                    description
                });
            }
        }
    }


    // + VALIDATE
    validate() {
        const invalid = this.#inputValue(this.container);
        const allFields = this.container.querySelectorAll("input, textarea, select")

        //== pulizia/aggiornamento errori
        this.container.querySelectorAll('[pgs-state~="errorField"]').forEach(element => {
            if (!invalid.includes(element)) this.#removeFieldError(element);
        });

        //== aggiungo errori dove serve
        invalid.forEach((el, i) => this.#addFieldError(el, i, invalid.length))

        //== rimuove l'errore al click
        allFields.forEach(element => element.addEventListener("click", () => {
            const errorTarget = element.closest('fieldset[pgs-state~="errorField"]') || element;
            this.#removeFieldError(errorTarget);
        }));

        //== status form
        if (invalid.length) {
            (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(this.container).state.remove("success").add("errorForm");
            return false;
        } else {
            (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(this.container).state.remove("errorForm").add("success");
            return true;
        }
    }

    //= EVENT VALIDATOR
    validator(callback, eventName = "submit") {
        if (typeof callback !== "function") throw new TypeError("callback must be a function");
        if (typeof eventName !== "string" || !eventName.trim()) throw new TypeError("eventName must be a non-empty string");

        this.container.addEventListener(eventName, event => {
            event.preventDefault();
            this.temporaryFieldError.clear();
            if (!this.validate()) return;

            this.#insideValidatedCallback = true;

            try {
                if (this.showSuccessOnValidate) this.success();
                callback(event);
            } finally {
                this.#insideValidatedCallback = false;
            }
        });

        return this;
    }

    //= ADD RULE
    addNewRule(rule) {
        if (typeof rule !== "function") throw new Error("Rule must be a function");
        this._rules.push(rule);
        return this;
    }
}


/***/ },

/***/ "./assets/javascript/helper/_init.js"
/*!*******************************************!*\
  !*** ./assets/javascript/helper/_init.js ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_init: () => (/* binding */ PGS_init)
/* harmony export */ });
/* harmony import */ var _pgs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_pgs.js */ "./assets/javascript/_pgs.js");


function PGS_init(root = document) {
    if (!(root instanceof Document || root instanceof Element)) {
        throw new TypeError("pgs.init(): root deve essere un Document o un Element");
    }

    const initialized = new Set();

    Object.values(_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs).forEach(module => {
        const init = module?.init;
        if (typeof init !== "function" || initialized.has(init)) return;

        initialized.add(init);
        init(root);
    });

    return root;
}


/***/ },

/***/ "./assets/javascript/helper/_onDocumentReady.js"
/*!******************************************************!*\
  !*** ./assets/javascript/helper/_onDocumentReady.js ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_onDocumentReady: () => (/* binding */ PGS_onDocumentReady)
/* harmony export */ });
function PGS_onDocumentReady(callback) {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => callback(), { once: true });
        return;
    }

    callback();
}


/***/ },

/***/ "./assets/javascript/helper/_scrollY.js"
/*!**********************************************!*\
  !*** ./assets/javascript/helper/_scrollY.js ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_scrollHorizontal: () => (/* binding */ PGS_scrollHorizontal)
/* harmony export */ });
function PGS_scrollHorizontal(element, speed) {
    // Se hai più contenitori, selezionali tutti:
    // Semplice "singleton" per stimare se la sorgente è trackpad
    const TrackpadDetector = (() => {
        let lastTs = 0;
        let smallAndFast = 0;
        let samples = 0;
        let isTrackpad = false;

        function update(e) {
            const now = performance.now();
            const dt = now - lastTs;

            // Porta delta in px (0: px, 1: linee, 2: pagine)
            let dy = Math.abs(e.deltaY);
            if (e.deltaMode === 1) dy *= 16;
            else if (e.deltaMode === 2) dy *= e.currentTarget?.clientHeight || 800;

            // Heuristica: eventi piccoli e ravvicinati → prob. trackpad
            const small = dy < 30;          // soglia prudente
            const fast = dt < 35;          // alta frequenza
            if (small && fast) smallAndFast++;

            samples++;
            if (samples >= 6) {             // aggiorna il giudizio ogni N eventi
                isTrackpad = smallAndFast >= 3;
                smallAndFast = 0;
                samples = 0;
            }

            lastTs = now;
            return isTrackpad;
        }

        return {
            update,
            get value() { return isTrackpad; }
        };
    })();

    //= Scorrimento orizzontale con rotella (evita il trackpad)
    
    const onWheel = (e) => {
        //== lascia lo scroll naturale del trackpad
        if (TrackpadDetector.update(e)) return;

        //== Evita interferenze con zoom o scroll orizzontale nativo
        if (e.ctrlKey) return;
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

        //== Converti delta in px per lo shift orizzontale
        let delta = e.deltaY;
        if (e.deltaMode === 1) delta *= 16;
        else if (e.deltaMode === 2) delta *= element.clientHeight;

        //== Verifica se il contenitore può ancora scrollare orizzontalmente
        const atStart = element.scrollLeft <= 0;
        const atEnd = element.scrollLeft + element.clientWidth >= element.scrollWidth - 1;
        const scrollingRight = delta > 0;
        const scrollingLeft = delta < 0;
        const canScrollHoriz =
            (scrollingRight && !atEnd) ||
            (scrollingLeft && !atStart);

        // Se non può più scrollare in quella direzione, lascia che la pagina gestisca lo scroll verticale
        if (!canScrollHoriz) return;

        //== Previeni il default solo quando facciamo noi lo scroll orizzontale
        e.preventDefault();

        //== rotella giù => destra
        element.scrollLeft += delta * speed;
    };

    element.addEventListener('wheel', onWheel, { passive: false });
    return () => element.removeEventListener('wheel', onWheel);
}


/***/ },

/***/ "./assets/javascript/layout/_header.js"
/*!*********************************************!*\
  !*** ./assets/javascript/layout/_header.js ***!
  \*********************************************/
() {





//= HEADER
function initHeader_Resize(header) {

    if (!header) return;

    const headerElements = pgs(header).querySelectorAll("header-element");

    if (!headerElements.length) console.log('For the header to work correctly, insert "header-element" under "header"');
    if (!headerElements.length) return;

    const selectHeader = document

    headerElements.forEach(selectHeader => {

        //== ACTIVE MOBILE 
        let menuAttivate = false;
        let childsWidthSAVE;

        function mobileActive(headerElement) {

            //=== header
            let style = window.getComputedStyle(headerElement);
            let padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
            let gap = parseFloat(style.gap);
            let headerElementWidth = parseInt(headerElement.offsetWidth - padding);
            let childsWidth;

            if (menuAttivate) {
                childsWidth = childsWidthSAVE;
            } else {
                let childs = [];

                // Esclude l'area mobile dedicata e l'hamburger, poi misura i figli sempre visibili su desktop.
                Array.from(headerElement.children)
                    .filter(el => !pgs(el).contains("header-element-onlyMobile"))
                    .forEach(child => {
                        if (pgs(child).contains("header-element-hamburger")) return;
                        childs.push(...child.children);
                    });

                gap = Math.round(gap * (childs.length - 1));
                let childsReduce = childs.reduce((totalWidth, child) => totalWidth + child.offsetWidth, 0) - 2;

                childsWidth = childsReduce + gap;
            }

            //===set data
            if (window.innerWidth < 600) {
                pgs(header).state.add("mobileActive");
                pgs(selectHeader).state.add("mobileActive");
            } else if (headerElementWidth < childsWidth) {
                pgs(header).state.add("mobileActive");
                pgs(headerElement).state.add("mobileActive");
                menuAttivate = true;
                childsWidthSAVE = childsWidth;
            } else {
                pgs(header).state.remove("mobileActive");
                pgs(headerElement).state.remove("mobileActive");
            }
        }

        //== observer (throttled to avoid ResizeObserver loop warnings)
        let resizeRafId = 0;
        const scheduleMobileActive = () => {
            if (resizeRafId) return;
            resizeRafId = requestAnimationFrame(() => {
                resizeRafId = 0;
                mobileActive(selectHeader);
            });
        };

        let observer = new ResizeObserver(scheduleMobileActive);
        observer.observe(selectHeader);
        scheduleMobileActive();
    });

    // Ripristina la posizione dell'header quando si esce dalla modalità mobile
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) header.style.transform = "translateY(0)";
    });
}


//= HEADER HEIGHT
function initHeader_Height(header) {
    if (!header) return;

    let headerHeightRafId = 0;

    //+ GET HEADER HEIGHT ELEMENT
    function getHeaderHeightElement(header) {
        const isMobileBottom = window.getComputedStyle(header).getPropertyValue("--header-mobile-bottom-active").trim() === "1";
        return isMobileBottom ? pgs(header).querySelector("header-element") || header : header;
    }

    function headerHeight() {
        const wordPressBar = parseInt(window.getComputedStyle(document.documentElement).marginTop, 10) || 0;
        const height = getHeaderHeightElement(header).offsetHeight + wordPressBar;
        const scrollHeight = header.getAttribute("data-header-scroll") === "true" ? 0 : height;

        document.documentElement.style.setProperty("--heightOfHeader", `${height}px`);
        document.documentElement.style.setProperty("--heightOfHeaderScroll", `${scrollHeight}px`);
    }

    function scheduleHeaderHeight() {
        if (headerHeightRafId) return;
        headerHeightRafId = requestAnimationFrame(() => {
            headerHeightRafId = 0;
            headerHeight();
        });
    }

    const headerHeightObserver = new ResizeObserver(scheduleHeaderHeight);
    headerHeightObserver.observe(header);
    pgs(header).querySelectorAll("header-element").forEach(element => headerHeightObserver.observe(element));

    document.fonts?.ready?.then(scheduleHeaderHeight);

    scheduleHeaderHeight();
    window.addEventListener("resize", scheduleHeaderHeight);
    window.addEventListener("scroll", scheduleHeaderHeight, { passive: true });
}





//= SCROLL
// Nasconde l'header quando si scorre verso il basso e lo mostra quando si scorre verso l'alto su dispositivi con altezza fino a 900px.
function initHeader_Scroll(header) {
    let lastScrollY = window.scrollY;
    window.addEventListener("scroll", () => {
        if (!header) return;
        let currentScrollY = window.scrollY;

        if (window.innerHeight <= 900) {
            if (currentScrollY >= 80) {
                if (currentScrollY > lastScrollY) {
                    header.style.transform = "translateY(-100%)";
                    header.setAttribute("data-header-scroll", true)
                } else {
                    header.style.transform = "translateY(0px)";
                    header.setAttribute("data-header-scroll", false)
                }
            } else {
                header.style.transform = "translateY(0)"; // Mostra sempre l'header se il scroll è inferiore a 80px
                header.setAttribute("data-header-scroll", false)
            }
        }
        lastScrollY = currentScrollY;
    });
}


//# INIT
function initHeader(header) {
    initHeader_Resize(header);
    initHeader_Height(header);
    initHeader_Scroll(header);
}

function getReadyHeader() {
    const header = pgs(document).querySelector("header");
    return header && pgs(header).querySelector("header-element") ? header : null;
}

const readyHeader = getReadyHeader();

if (readyHeader) {
    initHeader(readyHeader);
} else {
    const headerObserver = new MutationObserver(() => {
        const header = getReadyHeader();
        if (!header) return;

        headerObserver.disconnect();
        initHeader(header);
    });

    headerObserver.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
}


/***/ },

/***/ "./assets/javascript/patterns/_cookieConsent.js"
/*!******************************************************!*\
  !*** ./assets/javascript/patterns/_cookieConsent.js ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_cookieConsent: () => (/* binding */ PGS_cookieConsent)
/* harmony export */ });
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");


const STORAGE_KEY = 'pgs_cookie_preferences_v1';
const focusableSelectors = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';
const INITIALIZED_COOKIE_CONSENTS = new WeakSet();

//+ 
function safeJsonParse(value) {
    try {
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.warn('PGS cookie consent: impossibile leggere le preferenze', error);
        return null;
    }
}

//+ 
function readPreferences() {
    try {
        return safeJsonParse(localStorage.getItem(STORAGE_KEY));
    } catch (error) {
        return null;
    }
}

//+ 
function savePreferences(prefs) {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ ...prefs, updatedAt: new Date().toISOString() })
        );
    } catch (error) {
        console.warn('PGS cookie consent: impossibile salvare le preferenze', error);
    }
}

//+ 
function bootstrapGtag() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() {
        window.dataLayer.push(arguments);
    };
}

//+ 
function loadGoogleAnalytics(measurementId) {
    if (!measurementId || window.__PGS_gaLoaded) return;
    window.__PGS_gaLoaded = true;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
        anonymize_ip: true,
        allow_google_signals: false,
    });
}

//+ 
function applyAnalyticsConsent({ allowAnalytics, measurementId }) {
    bootstrapGtag();
    if (allowAnalytics) {
        window.gtag('consent', 'update', { analytics_storage: 'granted' });
        loadGoogleAnalytics(measurementId);
    } else {
        window.gtag('consent', 'update', { analytics_storage: 'denied' });
    }
}

//+
function setPgsFlag(element, token, enabled) {
    if (!(element instanceof HTMLElement) || !token) return;
    const current = (element.getAttribute('pgs') || '').split(/\s+/).filter(Boolean);
    const next = enabled ? [...new Set([...current, token])] : current.filter((item) => item !== token);
    if (next.length > 0) {
        element.setAttribute('pgs', next.join(' '));
    } else {
        element.removeAttribute('pgs');
    }
}

//+
function assignCookieRuntimeAttributes({ root, analyticsToggle, acceptAllButton, rejectButton, openButtons }) {
    root.dataset.cookieComponent = 'consent';
    analyticsToggle?.setAttribute('data-cookie-toggle', 'analytics');
    acceptAllButton?.setAttribute('data-cookie-action', 'accept');
    rejectButton?.setAttribute('data-cookie-action', 'reject');

    root.querySelector('[pgs~="cookieConsent-featureEssential"]')?.setAttribute('data-cookie-feature', 'essential');
    root.querySelector('[pgs~="cookieConsent-featureAnalytics"]')?.setAttribute('data-cookie-feature', 'analytics');

    openButtons.forEach((button) => {
        button.setAttribute('data-cookie-action', 'open');
    });
}

//= CookieConsent
function initCookieConsent(selectRoot = document) {
    const root = selectRoot instanceof Element && pgs(selectRoot).contains('cookieConsent')
        ? selectRoot
        : pgs(selectRoot).querySelector('cookieConsent');
    if (!root || INITIALIZED_COOKIE_CONSENTS.has(root)) return;
    INITIALIZED_COOKIE_CONSENTS.add(root);

    const analyticsToggle = root.querySelector('[pgs~="cookieConsent-toggleAnalytics"]');
    const acceptAllButton = root.querySelector('[pgs~="cookieConsent-actionAccept"]');
    const rejectButton = root.querySelector('[pgs~="cookieConsent-actionReject"]');
    const openButtons = document.querySelectorAll('[pgs~="cookieConsent-actionOpen"]');
    const measurementId = (root.dataset.gaId || '').trim();
    const prefersGa = measurementId.length > 0;
    let lastFocusedElement = null;

    assignCookieRuntimeAttributes({ root, analyticsToggle, acceptAllButton, rejectButton, openButtons });

    if (analyticsToggle) {
        analyticsToggle.disabled = !prefersGa;
        if (!prefersGa) {
            analyticsToggle.checked = false;
            setPgsFlag(root, 'cookieConsent-gaUnavailable', true);
        } else {
            setPgsFlag(root, 'cookieConsent-gaUnavailable', false);
        }
    }

    bootstrapGtag();
    window.gtag('consent', 'default', { analytics_storage: 'denied' });

    function setBannerVisibility(show) {
        root.hidden = !show;
        root.setAttribute('aria-hidden', String(!show));
        document.body.classList.toggle('cookieConsent-open', show);
        if (show) {
            lastFocusedElement = document.activeElement;
            setTimeout(() => {
                root.focus();
            }, 0);
        } else if (lastFocusedElement instanceof HTMLElement) {
            lastFocusedElement.focus({ preventScroll: true });
        }
    }

    function closeBanner() {
        setBannerVisibility(false);
    }

    function openBanner() {
        setBannerVisibility(true);
    }

    function persistAndApply(allowAnalytics) {
        savePreferences({ analytics: allowAnalytics });
        setPgsFlag(root, 'cookieConsent-accepted', !!allowAnalytics);
        setPgsFlag(root, 'cookieConsent-declined', !allowAnalytics);
        applyAnalyticsConsent({ allowAnalytics: !!allowAnalytics, measurementId });
    }

    acceptAllButton?.addEventListener('click', () => {
        if (analyticsToggle && prefersGa) analyticsToggle.checked = true;
        persistAndApply(!!prefersGa);
        closeBanner();
    });

    rejectButton?.addEventListener('click', () => {
        const allowAnalytics = analyticsToggle ? analyticsToggle.checked && prefersGa : false;
        if (!allowAnalytics && analyticsToggle) analyticsToggle.checked = false;
        persistAndApply(allowAnalytics);
        closeBanner();
    });

    analyticsToggle?.addEventListener('change', (event) => {
        if (!prefersGa && event.target instanceof HTMLInputElement) {
            event.target.checked = false;
        }
    });

    root.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            event.preventDefault();
            closeBanner();
        } else if (event.key === 'Tab') {
            const focusables = root.querySelectorAll(focusableSelectors);
            if (focusables.length === 0) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            }
        }
    });

    openButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            openBanner();
        });
    });

    const savedPrefs = readPreferences();
    if (savedPrefs && typeof savedPrefs.analytics === 'boolean') {
        if (analyticsToggle) analyticsToggle.checked = !!savedPrefs.analytics && prefersGa;
        persistAndApply(savedPrefs.analytics && prefersGa);
        closeBanner();
    } else {
        setBannerVisibility(true);
    }
}

(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__.PGS_onDocumentReady)(initCookieConsent);

const PGS_cookieConsent = {
    init: initCookieConsent
};


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			const getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!************************************!*\
  !*** ./assets/javascript/index.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pgs: () => (/* reexport safe */ _pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)
/* harmony export */ });
/* harmony import */ var _pgs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_pgs.js */ "./assets/javascript/_pgs.js");
/* harmony import */ var _base_darkmode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base/_darkmode.js */ "./assets/javascript/base/_darkmode.js");
/* harmony import */ var _base_svg_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base/_svg.js */ "./assets/javascript/base/_svg.js");
/* harmony import */ var _base_object_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base/_object.js */ "./assets/javascript/base/_object.js");
/* harmony import */ var _layout_header_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./layout/_header.js */ "./assets/javascript/layout/_header.js");
/* harmony import */ var _layout_header_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_layout_header_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_accordion_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/_accordion.js */ "./assets/javascript/components/_accordion.js");
/* harmony import */ var _components_alerts_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/_alerts.js */ "./assets/javascript/components/_alerts.js");
/* harmony import */ var _components_dropdown_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/_dropdown.js */ "./assets/javascript/components/_dropdown.js");
/* harmony import */ var _components_menu_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/_menu.js */ "./assets/javascript/components/_menu.js");
/* harmony import */ var _components_modals_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/_modals.js */ "./assets/javascript/components/_modals.js");
/* harmony import */ var _components_search_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/_search.js */ "./assets/javascript/components/_search.js");
/* harmony import */ var _components_slides_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/_slides.js */ "./assets/javascript/components/_slides.js");
/* harmony import */ var _components_steps_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/_steps.js */ "./assets/javascript/components/_steps.js");
/* harmony import */ var _components_stepTabs_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/_stepTabs.js */ "./assets/javascript/components/_stepTabs.js");
/* harmony import */ var _components_summary_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/_summary.js */ "./assets/javascript/components/_summary.js");
/* harmony import */ var _components_notifications_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/_notifications.js */ "./assets/javascript/components/_notifications.js");
/* harmony import */ var _imports_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./_imports.js */ "./assets/javascript/_imports.js");
/* harmony import */ var _patterns_cookieConsent_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./patterns/_cookieConsent.js */ "./assets/javascript/patterns/_cookieConsent.js");
//= PGS



//= BASE




//= HEADER


//= COMPONENTS












//+ IMPORT REGISTRY


//= PATTERNS


})();

/******/ })()
;
//# sourceMappingURL=index.js.map