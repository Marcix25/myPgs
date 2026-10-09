/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/javascript/_imports.js"
/*!***************************************!*\
  !*** ./assets/javascript/_imports.js ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pgs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_pgs.js */ "./assets/javascript/_pgs.js");
/* harmony import */ var _base_darkmode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base/_darkmode.js */ "./assets/javascript/base/_darkmode.js");
/* harmony import */ var _base_hover_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base/_hover.js */ "./assets/javascript/base/_hover.js");
/* harmony import */ var _base_svg_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base/_svg.js */ "./assets/javascript/base/_svg.js");
/* harmony import */ var _components_accordion_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/_accordion.js */ "./assets/javascript/components/_accordion.js");
/* harmony import */ var _components_alerts_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/_alerts.js */ "./assets/javascript/components/_alerts.js");
/* harmony import */ var _components_dropdown_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/_dropdown.js */ "./assets/javascript/components/_dropdown.js");
/* harmony import */ var _components_menu_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/_menu.js */ "./assets/javascript/components/_menu.js");
/* harmony import */ var _components_modal_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/_modal.js */ "./assets/javascript/components/_modal.js");
/* harmony import */ var _components_pageNav_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/_pageNav.js */ "./assets/javascript/components/_pageNav.js");
/* harmony import */ var _components_notification_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/_notification.js */ "./assets/javascript/components/_notification.js");
/* harmony import */ var _components_toast_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/_toast.js */ "./assets/javascript/components/_toast.js");
/* harmony import */ var _components_search_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/_search.js */ "./assets/javascript/components/_search.js");
/* harmony import */ var _components_slides_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/_slides.js */ "./assets/javascript/components/_slides.js");
/* harmony import */ var _components_stepTabs_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/_stepTabs.js */ "./assets/javascript/components/_stepTabs.js");
/* harmony import */ var _components_steps_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/_steps.js */ "./assets/javascript/components/_steps.js");
/* harmony import */ var _components_summary_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/_summary.js */ "./assets/javascript/components/_summary.js");
/* harmony import */ var _components_tabs_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/_tabs.js */ "./assets/javascript/components/_tabs.js");
/* harmony import */ var _layout_header_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./layout/_header.js */ "./assets/javascript/layout/_header.js");
/* harmony import */ var _layout_navSmart_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./layout/_navSmart.js */ "./assets/javascript/layout/_navSmart.js");
/* harmony import */ var _helper_formValidate_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./helper/_formValidate.js */ "./assets/javascript/helper/_formValidate.js");
/* harmony import */ var _helper_init_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./helper/_init.js */ "./assets/javascript/helper/_init.js");
























_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs.registerModules({
    init: _helper_init_js__WEBPACK_IMPORTED_MODULE_21__.PGS_init,
    darkmode: _base_darkmode_js__WEBPACK_IMPORTED_MODULE_1__.PGS_darkmode,
    svg: _base_svg_js__WEBPACK_IMPORTED_MODULE_3__.PGS_svg,
    hover: _base_hover_js__WEBPACK_IMPORTED_MODULE_2__.PGS_hover,
    accordion: _components_accordion_js__WEBPACK_IMPORTED_MODULE_4__.PGS_accordion,
    alert: _components_alerts_js__WEBPACK_IMPORTED_MODULE_5__.PGS_alert,
    dropdown: _components_dropdown_js__WEBPACK_IMPORTED_MODULE_6__.PGS_dropdown,
    menu: _components_menu_js__WEBPACK_IMPORTED_MODULE_7__.PGS_menu,
    modal: _components_modal_js__WEBPACK_IMPORTED_MODULE_8__.PGS_modal,
    pageNav: _components_pageNav_js__WEBPACK_IMPORTED_MODULE_9__.PGS_pageNav,
    header: _layout_header_js__WEBPACK_IMPORTED_MODULE_18__.PGS_header,
    navSmart: _layout_navSmart_js__WEBPACK_IMPORTED_MODULE_19__.PGS_navSmart,
    notification: _components_notification_js__WEBPACK_IMPORTED_MODULE_10__.PGS_notification,
    toast: _components_toast_js__WEBPACK_IMPORTED_MODULE_11__.PGS_toast,
    search: _components_search_js__WEBPACK_IMPORTED_MODULE_12__.PGS_search,
    slides: _components_slides_js__WEBPACK_IMPORTED_MODULE_13__.PGS_slides,
    stepTabs: _components_stepTabs_js__WEBPACK_IMPORTED_MODULE_14__.PGS_stepTabs,
    steps: _components_steps_js__WEBPACK_IMPORTED_MODULE_15__.PGS_steps,
    summary: _components_summary_js__WEBPACK_IMPORTED_MODULE_16__.PGS_summary,
    tabs: _components_tabs_js__WEBPACK_IMPORTED_MODULE_17__.PGS_tabs,
    formValidate: _helper_formValidate_js__WEBPACK_IMPORTED_MODULE_20__.PGS_formValidate,
});


/***/ },

/***/ "./assets/javascript/_pgs.js"
/*!***********************************!*\
  !*** ./assets/javascript/_pgs.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pgs: () => (/* binding */ pgs)
/* harmony export */ });
//+ shared helpers for the "key", "key['flag' ...]" and "key[payload]" bracket syntax — used by
//+ the pgs attribute itself and by every pgs-data accessor below, so a fix here fixes all of them
const BracketToken = {
    //+ the part before an opening "[", or the whole token when there is none
    key(value) {
        return String(value).trim().match(/^[^\s[\]]+/)?.[0] || "";
    },

    //+ every quoted 'flag' inside a token's own ['flag' ...] bracket
    flags(token) {
        const open = token.indexOf("[");
        return open === -1 ? [] : [...token.slice(open + 1).matchAll(/'([^']+)'/g)].map(match => match[1]);
    },

    //+ rebuilds "key['flag' ...]", or the bare key when there is nothing to carry
    component(key, flags) {
        return flags.length ? `${key}[${[...new Set(flags)].map(flag => `'${flag}'`).join(" ")}]` : key;
    },

    //+ index of the "]" matching the "[" at openIndex, counting nested brackets and ignoring any "[" / "]" inside a JSON string (respects \" escapes)
    findClose(source, openIndex) {
        let depth = 0;
        let inString = false;
        let escaped = false;

        for (let i = openIndex; i < source.length; i++) {
            const char = source[i];

            if (escaped) {
                escaped = false;
                continue;
            }

            if (inString) {
                if (char === "\\") escaped = true;
                else if (char === "\"") inString = false;
                continue;
            }

            if (char === "\"") inString = true;
            else if (char === "[") depth++;
            else if (char === "]") {
                depth--;
                if (depth === 0) return i;
            }
        }

        return -1;
    },

    //+ splits a pgs or pgs-data value into tokens, keeping "key[...]" whole even when the payload contains its own [...] (e.g. a JSON array)
    split(source) {
        const tokens = [];
        let i = 0;

        while (i < source.length) {
            while (i < source.length && /\s/.test(source[i])) i++;
            if (i >= source.length) break;

            const start = i;
            while (i < source.length && !/\s/.test(source[i]) && source[i] !== "[") i++;

            if (i < source.length && source[i] === "[") {
                const close = this.findClose(source, i);
                i = close === -1 ? source.length : close + 1;
            }

            if (i > start) tokens.push(source.slice(start, i));
        }

        return tokens;
    },
};

//+ read/rebuild helper for one element's attribute, in bracket-token form: shared by the pgs
//+ attribute and by every pgs-data accessor, since each of them only ever reads/writes its own
//+ element this way — traversal code that needs an arbitrary element reads it directly instead
function createBracketAttribute(element, attribute) {
    return {
        read: () => BracketToken.split(element.getAttribute(attribute) || ""),
        write(values) {
            if (values.length) element.setAttribute(attribute, values.join(" "));
            else element.removeAttribute(attribute);
        },
    };
}

/**
 * @param {Element | Document} root
*/
function pgs(root) {
    const ATTR = "pgs";
    if (!root) throw new TypeError("pgs(root): root is required");

    const canAttr = typeof root.getAttribute === "function" && typeof root.setAttribute === "function";
    const canQuery = typeof root.querySelector === "function" && typeof root.querySelectorAll === "function";

    if (!canQuery) {
        throw new TypeError("pgs(root): root must support querySelector/querySelectorAll");
    }

    //+
    function attrOnlyForElements(methodName) {
        throw new TypeError(`pgs(${root.nodeName || "root"}).${methodName}(): available on an Element only, not on a Document`);
    };

    //+
    function concatSelector(value, attribute = ATTR) {
        if (Array.isArray(value)) value = value.join(",");
        return String(value)
            .split(",")
            .map(v => v.trim())
            .filter(Boolean)
            .map(v => {
                const escaped = v.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
                return attribute === ATTR
                    ? `:is([pgs~="${escaped}"], [pgs*="${escaped}\\5B"])`
                    : `[${attribute}~="${escaped}"]`;
            })
            .join(",");
    }

    //# PGS
    function createPgs() {
        const store = createBracketAttribute(root, ATTR);

        function api() {
            return api;
        }

        api.querySelector = function (value) {
            return root.querySelector(concatSelector(value));
        };

        api.querySelectorAll = function (value) {
            return root.querySelectorAll(concatSelector(value));
        };

        api.closest = function (value) {
            if (!canAttr) return attrOnlyForElements("closest");
            return root.closest(concatSelector(value));
        };

        api.add = function (...values) {
            if (!canAttr) return attrOnlyForElements("add");
            const current = store.read();
            for (const token of values.flatMap(value => BracketToken.split(String(value)))) {
                const key = BracketToken.key(token);
                const index = current.findIndex(item => BracketToken.key(item) === key);
                if (index === -1) current.push(token);
                else current[index] = BracketToken.component(key, [...BracketToken.flags(current[index]), ...BracketToken.flags(token)]);
            }
            store.write(current);
            return api;
        };

        api.remove = function (...values) {
            if (!canAttr) return attrOnlyForElements("remove");
            const keys = values.flatMap(value => BracketToken.split(String(value))).map(BracketToken.key);
            store.write(store.read().filter(v => !keys.includes(BracketToken.key(v))));
            return api;
        };

        api.toggle = function (value, force) {
            if (!canAttr) return attrOnlyForElements("toggle");

            const exists = api.contains(value);

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
            return store.read().some(token => BracketToken.key(token) === BracketToken.key(value));
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

    //# STATE
    function createState(attribute) {
        if (!canAttr) return undefined;

        const read = (sep = " ") =>
            (root.getAttribute(attribute) || "").split(sep).filter(Boolean);

        const write = (vals, sep = " ") =>
            root.setAttribute(attribute, vals.join(sep));

        // callable form: state("active") is the same as state.add("active")
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

        api.querySelector = function (value) {
            return root.querySelector(concatSelector(value, attribute));
        };

        api.querySelectorAll = function (value) {
            return root.querySelectorAll(concatSelector(value, attribute));
        };

        api.closest = function (value) {
            return root.closest(concatSelector(value, attribute));
        };

        Object.defineProperty(api, "value", {
            get() { return root.getAttribute(attribute); },
            set(v) { root.setAttribute(attribute, v); }
        });

        return api;
    }

    //# OPTION
    /// flags only, and only inside the pgs attribute — never pgs-data. add/toggle derive a
    /// flag's owning component from its own name (the lowercase run before the first uppercase
    /// letter or "-", the naming convention every component-owned flag already follows) and
    /// merge into that component's existing bracket; a flag with no matching owner on the
    /// element becomes its own bare pgs token instead, the same way "hover" already is one.
    function createOption() {
        if (!canAttr) return undefined;

        const store = createBracketAttribute(root, ATTR);
        const getValues = values => values
            .flat()
            .flatMap(value => BracketToken.split(String(value)))
            .filter(Boolean)
            .map(BracketToken.key);

        function ownerOf(key) {
            return key.match(/^[a-z]+/)?.[0] || "";
        }

        function api() {
            return api;
        }

        api.add = function (...values) {
            const current = store.read();
            getValues(values).forEach(key => {
                const owner = ownerOf(key);
                const index = owner ? current.findIndex(item => BracketToken.key(item) === owner) : -1;
                if (index === -1) {
                    if (!current.some(item => BracketToken.key(item) === key)) current.push(key);
                } else {
                    current[index] = BracketToken.component(owner, [...BracketToken.flags(current[index]), key]);
                }
            });
            store.write(current);
            return api;
        };

        api.remove = function (...values) {
            const keys = getValues(values);
            if (!keys.length) return api;

            store.write(store.read()
                .filter(token => !keys.includes(BracketToken.key(token)))
                .map(token => BracketToken.component(BracketToken.key(token),
                    BracketToken.flags(token).filter(flag => !keys.includes(flag)))));
            return api;
        };

        api.toggle = function (value, force) {
            const key = BracketToken.key(value);
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
            const safeKey = String(key).trim();
            return store.read().some(token => BracketToken.key(token) === safeKey || BracketToken.flags(token).includes(safeKey));
        };

        const getKeys = value => (Array.isArray(value) ? value.join(",") : String(value))
            .split(",")
            .map(v => BracketToken.key(v))
            .filter(Boolean);

        const hasKeys = (element, keys) => BracketToken.split(element.getAttribute(ATTR) || "")
            .some(token => keys.includes(BracketToken.key(token)) || BracketToken.flags(token).some(flag => keys.includes(flag)));

        api.querySelector = function (value) {
            const keys = getKeys(value);
            if (!keys.length) return null;

            for (const element of root.querySelectorAll(`[${ATTR}]`)) {
                if (hasKeys(element, keys)) return element;
            }

            return null;
        };

        // an Array, where every other querySelectorAll returns a NodeList: the match is computed
        // here instead of by the engine, so there is no live list to hand back
        api.querySelectorAll = function (value) {
            const keys = getKeys(value);
            if (!keys.length) return [];
            return Array.from(root.querySelectorAll(`[${ATTR}]`)).filter(element => hasKeys(element, keys));
        };

        api.closest = function (value) {
            const keys = getKeys(value);
            if (!keys.length) return null;

            for (let element = root; element; element = element.parentElement) {
                if (hasKeys(element, keys)) return element;
            }

            return null;
        };

        return api;
    }

    // DATA — key[payload] values only, always in this attribute; never touches the pgs bracket.
    function createData(attribute) {
        if (!canAttr) return undefined;

        const store = createBracketAttribute(root, attribute);

        function api() {
            return api;
        }

        api.getValueBrackets = function (key) {
            const safeKey = String(key).trim();
            const token = store.read().find(item => BracketToken.key(item) === safeKey);
            if (!token) return undefined;

            const openIndex = token.indexOf("[");
            const closeIndex = openIndex === -1 ? -1 : BracketToken.findClose(token, openIndex);
            if (closeIndex === -1) return undefined;

            return token.slice(openIndex + 1, closeIndex);
        };

        api.setValueBrackets = function (key, value = "") {
            const dataKey = BracketToken.key(key);
            if (!dataKey) return api;

            const entry = `${dataKey}[${String(value).trim()}]`;
            const entries = store.read().filter(item => BracketToken.key(item) !== dataKey);

            entries.push(entry);
            store.write(entries);
            return api;
        };

        // a plain passthrough on this attribute, like state's and the base pgs's own value: a
        // bracket flag is never read or written back through here, only this attribute ever is.
        Object.defineProperty(api, "value", {
            get() { return root.getAttribute(attribute); },
            set(value) {
                if (value == null) root.removeAttribute(attribute);
                else root.setAttribute(attribute, value);
            }
        });

        return api;
    }

    //= RETURN
    const api = createPgs();
    api.state = createState("pgs-state");
    api.option = createOption();
    api.data = createData("pgs-data");
    return api;
}

pgs.registerModules = function (modules = {}) {
    Object.entries(modules).forEach(([name, module]) => {
        const key = String(name || "").trim();
        if (!key) return;

        const hasOwn = Object.prototype.hasOwnProperty.call(pgs, key);
        if (hasOwn && pgs[key] !== module) {
            throw new Error(`pgs.registerModules(): "${key}" is already defined on pgs`);
        }

        pgs[key] = module;
    });

    return pgs;
};

globalThis.pgs ??= pgs;

// published under the package name too, distinct from the pgs() helper above, so a separate
// webpack build can mark "mypgs" as external and resolve it to this at runtime instead of
// bundling (and re-running) a whole second copy of the library
globalThis.mypgs ??= { pgs };


/***/ },

/***/ "./assets/javascript/base/_darkmode.js"
/*!*********************************************!*\
  !*** ./assets/javascript/base/_darkmode.js ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_darkmode: () => (/* binding */ PGS_darkmode)
/* harmony export */ });
/* harmony import */ var _pgs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_pgs.js */ "./assets/javascript/_pgs.js");
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");
/* harmony import */ var _helper_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper/_dom.js */ "./assets/javascript/helper/_dom.js");
/* harmony import */ var _svg_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_svg.js */ "./assets/javascript/base/_svg.js");





//= DARKMODE

const INITIALIZED_BUTTONS = new WeakSet();

//+ CHANGE ICON
// the glyph is not the author's choice here: the library owns it, because it has to say which way
// the switch is pointing. It draws it from the built-in set so the control is never blank, and
// looks for a marked element as well as an <i>, so an icon set that renders anything else still
// gets found. The fa- classes stay on for the pages that style them
function changeIcon(selector, isDarkMode) {
    selector.forEach(button => {
        const ICON = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(button).querySelector("icon") || button.querySelector("i");
        if (!ICON) return;

        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(ICON).add("icon");
        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(ICON).option.toggle("icon-moon", !isDarkMode);
        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(ICON).option.toggle("icon-sun", isDarkMode);
        ICON.classList.toggle("fa-moon", !isDarkMode);
        ICON.classList.toggle("fa-sun", isDarkMode);
    });
}

//+ STORED CHOICE
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

//+ SET STATUS
function setDarkmodeStatus(toggle = false, button = []) {
    let isDarkMode = readStoredChoice();

    if (toggle) {
        isDarkMode = !isDarkMode;
        writeStoredChoice(isDarkMode);
    }

    // SET
    ;(0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(document.documentElement).state.toggle("darkmode", isDarkMode);
    if (document.body) (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(document.body).state.toggle("darkmode", isDarkMode);
    // END SET

    changeIcon(button, isDarkMode);
    document.dispatchEvent(new CustomEvent(_svg_js__WEBPACK_IMPORTED_MODULE_3__.PGS_svg.eventChangeColor, { detail: { isDarkMode } }));
}



//# INIT
// applies the stored theme to the root as soon as the bundle is parsed in the head, so a
// reload never paints the wrong one first
if (typeof document !== "undefined") setDarkmodeStatus();

// binds the switches in root that are not bound yet and draws their glyph. Switches already
// bound are left untouched, so pgs.init(el) on a page that is already running changes nothing
// else: it does not re-apply the theme or fire the color event again
function PGS_darkmode_init(root = document) {
    const isDarkMode = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(document.documentElement).state.contains("darkmode");
    const buttons = (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_roots)(root, "toggleDarkmode").filter(button => !INITIALIZED_BUTTONS.has(button));

    changeIcon(buttons, isDarkMode);

    buttons.forEach(button => {
        INITIALIZED_BUTTONS.add(button);
        button.addEventListener("click", () => {
            setDarkmodeStatus(true, (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(document).querySelectorAll("toggleDarkmode"));
        });
    });
}

// the first pass once the page is ready: the body exists now, so it takes the theme too
;(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_1__.PGS_onDocumentReady)(() => {
    setDarkmodeStatus(false, (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(document).querySelectorAll("toggleDarkmode"));
    PGS_darkmode_init();
});

const PGS_darkmode = {
    init: PGS_darkmode_init
};


/***/ },

/***/ "./assets/javascript/base/_hover.js"
/*!******************************************!*\
  !*** ./assets/javascript/base/_hover.js ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_hover: () => (/* binding */ PGS_hover)
/* harmony export */ });
/* harmony import */ var _pgs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_pgs.js */ "./assets/javascript/_pgs.js");
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");
/* harmony import */ var _helper_throttle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper/_throttle.js */ "./assets/javascript/helper/_throttle.js");
/* harmony import */ var _helper_warn_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helper/_warn.js */ "./assets/javascript/helper/_warn.js");





//= HOVER
// every clickable surface of the library shares the same hover treatment, and it is written once
// in SCSS under [pgs~=hover]. The component selectors no longer repeat it: this module marks the
// surfaces that are clickable by definition, so the author keeps writing only the component token
// while the element still carries a real pgs value that SCSS, JavaScript and the inspector read.

//+ tokens that get the hover treatment, with the extra condition each one has to satisfy
const HOVER_TARGETS = {
    // a button is clickable whatever its tag
    button: () => true,
    // a card or a box is only a clickable surface when it is a link
    card: element => element.tagName === "A",
    box: element => element.tagName === "A"
};

const TOKENS = Object.keys(HOVER_TARGETS);

// only what this module added is ever taken back: a "hover" written by hand belongs to the author
// and stays, whatever the element turns into later
const MARKED = new WeakSet();

//+ SYNC HOVER
function syncHover(element) {
    if (!(element instanceof Element)) return;

    // hoverNot is the one opt-out, written on the element whatever the component: a surface that
    // must not answer the pointer is never marked, and SCSS guards a "hover" written by hand
    const clickable = !(0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(element).option.contains("hoverNot")
        && TOKENS.some(token => (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(element).contains(token) && HOVER_TARGETS[token](element));

    if (clickable) {
        if ((0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(element).contains("hover")) return;
        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(element).add("hover");
        MARKED.add(element);
        return;
    }

    if (!MARKED.has(element)) return;
    MARKED.delete(element);
    (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(element).remove("hover");
}

//# INIT
// bodyHoverAuto gates every caller here, not only the automatic pass below: pgs.init(root) walks
// every registered module and calls its init(root) whether or not the caller meant to touch
// hover specifically, so the check has to live in the one function every path funnels through,
// not in the block that only covers this module's own unprompted call
function PGS_hover_init(root = document) {
    if (!(root instanceof Document || root instanceof Element)) {
        throw (0,_helper_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_invalid)("hover.init", "root must be a Document or an Element");
    }

    if (!(0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(document.body).option.contains("bodyHoverAuto")) return root;

    if (root instanceof Element) syncHover(root);
    (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(root).querySelectorAll(TOKENS).forEach(syncHover);

    return root;
}

//# WATCH
// the surfaces to mark do not all exist when the page is ready: the library injects its own
// markup (a toast, a notification row) and an author can add or remove a token
// at runtime. The watch stays on, batched per frame, and re-marking is idempotent so the pass our
// own attribute write triggers back settles at once
const PENDING = new Set();

const flushPending = (0,_helper_throttle_js__WEBPACK_IMPORTED_MODULE_2__.PGS_rafThrottle)(() => {
    const roots = [...PENDING];
    PENDING.clear();
    roots.forEach(root => root.isConnected && PGS_hover_init(root));
});

function scheduleSync(nodes) {
    nodes.forEach(node => PENDING.add(node));
    flushPending();
}

function handleMutations(mutations) {
    mutations.forEach(mutation => {
        if (mutation.type === "attributes") {
            scheduleSync([mutation.target]);
            return;
        }

        scheduleSync([...mutation.addedNodes].filter(node => node instanceof Element));
    });
}

//# AUTO-MARK
// bodyHoverAuto is the author's own switch, one of the flags in <body>'s own body[...] bracket
// alongside bodyBase/bodyImg/bodyText/bodyHeading: without it nothing is marked on load, and —
// separately from the check inside PGS_hover_init — the observer below never even starts, so a page
// that only ever writes pgs="hover" by hand never pays for it running for its whole lifetime
;(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_1__.PGS_onDocumentReady)(() => {
    if (!(0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(document.body).option.contains("bodyHoverAuto")) return;

    PGS_hover_init(document);
    new MutationObserver(handleMutations).observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["pgs"]
    });
});

//= EXPORT
const PGS_hover = {
    init: PGS_hover_init
};


/***/ },

/***/ "./assets/javascript/base/_svg.js"
/*!****************************************!*\
  !*** ./assets/javascript/base/_svg.js ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_svg: () => (/* binding */ PGS_svg)
/* harmony export */ });
/* harmony import */ var _pgs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_pgs.js */ "./assets/javascript/_pgs.js");
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");
/* harmony import */ var _helper_throttle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper/_throttle.js */ "./assets/javascript/helper/_throttle.js");
/* harmony import */ var _helper_warn_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helper/_warn.js */ "./assets/javascript/helper/_warn.js");





//= SVG & LOTTIE COLORS

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
        return (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(document.documentElement).state.contains("darkmode");
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
        if (typeof document === "undefined") return;

        document.addEventListener(svgColors.eventChangeColor, event => {
            svgColors.applyColorsSVG(event.detail?.isDarkMode ?? svgColors._getCurrentDarkmode());
            svgColors.applyColorsLottie(event.detail?.isDarkMode ?? svgColors._getCurrentDarkmode());
        });

        (0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_1__.PGS_onDocumentReady)(PGS_svg_init);
    },

    applyColorsSVG(isDarkMode = svgColors._getCurrentDarkmode()) {
        if (!(0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(document).querySelector("svgChangeColor")) return;

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
        // svgChangeColor gates both passes: Lottie recolors from the same --svg-color-N pairs,
        // so there is no separate lottieChangeColor to opt into any more
        if (!(0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(document).querySelector("svgChangeColor")) return;

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

//# ASPECT RATIO
// an <object> that holds an svg keeps the ratio its object-fit asks for: "cover" slices the
// drawing, anything else fits it whole. The ratio is applied on every load of the object, so
// swapping its data keeps working, and again whenever the object is resized
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

    const observer = new ResizeObserver((0,_helper_throttle_js__WEBPACK_IMPORTED_MODULE_2__.PGS_rafThrottle)(() => applyAspectRatio(obj)));
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

//# INIT
function PGS_svg_init(root = document) {
    if (!(root instanceof Document || root instanceof Element)) {
        throw (0,_helper_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_invalid)("svg.init", "root must be a Document or an Element");
    }

    initAspectRatio(root);
    svgColors.applyColorsSVG();
    svgColors.applyColorsLottie();

    // read by SCSS (body:not(.object-loaded)) to hold back <object>s until the first pass is done
    document.body?.classList.add("object-loaded");
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_accordion: () => (/* binding */ PGS_accordion)
/* harmony export */ });
/* harmony import */ var _pgs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_pgs.js */ "./assets/javascript/_pgs.js");
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");
/* harmony import */ var _helper_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper/_dom.js */ "./assets/javascript/helper/_dom.js");
/* harmony import */ var _helper_warn_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helper/_warn.js */ "./assets/javascript/helper/_warn.js");





//# ACCORDION
const API = new WeakMap();

//+ the buttons whose aria-label the module composed itself: an aria-label on a button that is not in
//+ here is the author's own and is never overwritten. It has to be remembered outside the DOM, or a
//+ refresh would take the label the module wrote for the author's
const COMPOSED_LABELS = new WeakSet();

//+ how long the open/close transition runs, read from the same --accordion-timing the CSS uses
function accordionTiming(accordion) {
    const raw = window.getComputedStyle(accordion).getPropertyValue("--accordion-timing").trim();
    const value = parseFloat(raw);
    if (!Number.isFinite(value)) return 300;
    return raw.endsWith("ms") ? value : value * 1000;
}

//+ keeps an element where it is on screen while the layout above it moves: closing a tall sibling
//+ pulls everything below it up, so the panel the reader just clicked would slide away under the
//+ pointer and leave them far down the page. Follows it for as long as the transition runs.
//+ behavior "instant", so a page with scroll-behavior: smooth does not turn each correction into
//+ an animation of its own. Stops as soon as the signal of the accordion that asked is aborted
function keepInPlace(element, duration, signal) {
    const startTop = element.getBoundingClientRect().top;
    const end = performance.now() + duration + 50;

    function step(now) {
        if (signal.aborted) return;

        const delta = element.getBoundingClientRect().top - startTop;
        if (Math.abs(delta) >= 1) window.scrollBy({ top: delta, behavior: "instant" });
        if (now < end) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

//+ Accessibility (writes the open/closed state)
// the composed label says what the click does, and is only written when the author has
// not named the control themselves: a hand-written aria-label is the page's own wording
// and survives every toggle
function accordionAccessibility(isOpen, button, content) {
    if (!button.hasAttribute("aria-label") || COMPOSED_LABELS.has(button)) {
        const text = (button.textContent || "").trim().replace(/\s+/g, " ");
        button.setAttribute("aria-label", `${isOpen ? "Close" : "Open"} ${text || "section"}`);
        COMPOSED_LABELS.add(button);
    }
    button.setAttribute("aria-expanded", String(isOpen));
    content.hidden = !isOpen;
}

function initializeAccordion(accordion) {
    if (API.has(accordion)) return;

    const BUTTON = (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_directChild)(accordion, "accordion-button");
    const CONTENT = (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_directChild)(accordion, "accordion-content");
    if (!BUTTON || !CONTENT) {
        (0,_helper_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_warn)("accordion.init", "an accordion needs a direct accordion-button and a direct accordion-content child, skipped", accordion);
        return;
    }

    const controller = new AbortController();
    const { signal } = controller;
    let scrollTimer = 0;

    // initial state: accAutoOpen is the authored form, because pgs-state belongs to
    // the runtime; a pgs-state="open" already written by hand is honored all the same
    const isOpenInit = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(accordion).option.contains("accAutoOpen") || (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(accordion).state.contains("open");

    // an accordion closes the others only inside a group, and the group is the nearest
    // accordionContainer above it: on its own an accordion answers for itself alone, so a
    // single panel dropped anywhere on the page no longer collapses somebody else's
    const CONTAINER = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(accordion).closest("accordionContainer");
    const isMultiOpen = !CONTAINER || (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(CONTAINER).option.contains("accMultiOpen");

    // accessibility, written once, with ids of its own for aria-controls / aria-labelledby
    BUTTON.setAttribute("role", "button");
    BUTTON.setAttribute("tabindex", "0");
    if (!BUTTON.id) BUTTON.id = (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_uniqueId)("acc-btn");
    if (!CONTENT.id) CONTENT.id = (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_uniqueId)("acc-panel");

    BUTTON.setAttribute("aria-controls", CONTENT.id);
    CONTENT.setAttribute("role", "region");
    CONTENT.setAttribute("aria-labelledby", BUTTON.id);

    //+ Close the others of the group
    // only the accordions of this same group: an accordionContainer nested in another one
    // keeps its own panels to itself, which is why the nearest container is compared rather
    // than trusting the descendant search. accAutoOpen is left alone on purpose — it
    // is the authored "this one stays open", so a sibling opening does not take it down,
    // and only until the reader works that panel themselves, which drops the token
    function closeOtherAccordion() {
        for (const otherLi of (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(CONTAINER).querySelectorAll("accordion")) {
            if (otherLi === accordion) continue;
            if ((0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(otherLi).closest("accordionContainer") !== CONTAINER) continue;
            if ((0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(otherLi).option.contains("accAutoOpen")) continue;

            const otherBtn = (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_directChild)(otherLi, "accordion-button");
            const otherContent = (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_directChild)(otherLi, "accordion-content");
            if (!otherBtn || !otherContent) continue;

            (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(otherLi).state.remove("open");
            accordionAccessibility(false, otherBtn, otherContent);
        }
    }

    //+ FN ACCORDION
    function accordionFunction() {
        const isOpen = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(accordion).state.contains("open");
        const nowOpen = !isOpen;
        const timing = accordionTiming(accordion);

        // measured before anything changes: this button's position is the one to hold
        keepInPlace(BUTTON, timing, signal);

        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(accordion).state.toggle("open", nowOpen);
        accordionAccessibility(nowOpen, BUTTON, CONTENT);

        // the moment the reader works this panel, accAutoOpen stops being the authored
        // "this one stays open": from here on it is an ordinary panel of the group, so a
        // sibling opening can close it. Guarded, because remove() would otherwise write an
        // empty pgs-option on every accordion that never had one
        if ((0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(accordion).option.contains("accAutoOpen")) (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(accordion).option.remove("accAutoOpen");
        if (!isMultiOpen) closeOtherAccordion();

        // once the layout has settled, only scroll if the button ended up out of view (an
        // open() called from code, say): the reader's own click is already held in place
        window.clearTimeout(scrollTimer);
        if (nowOpen) scrollTimer = window.setTimeout(() => {
            const rect = BUTTON.getBoundingClientRect();
            if (rect.top < 0 || rect.bottom > window.innerHeight) BUTTON.scrollIntoView({ block: "nearest", inline: "nearest" });
        }, timing + 60);
    }

    function open() {
        if (!(0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(accordion).state.contains("open")) accordionFunction();
    }

    function close() {
        if ((0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(accordion).state.contains("open")) accordionFunction();
    }

    // writes that initial state, rather than only reading it: with accAutoOpen the
    // pgs-state is not there yet, and it is what the CSS reads to turn the arrow
    ;(0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(accordion).state.toggle("open", isOpenInit);
    accordionAccessibility(isOpenInit, BUTTON, CONTENT);

    //- Events
    BUTTON.addEventListener("click", accordionFunction, { signal });

    //- Keyboard: Enter / Space
    BUTTON.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            accordionFunction();
        }
    }, { signal });

    function destroy() {
        controller.abort();
        window.clearTimeout(scrollTimer);
        API.delete(accordion);
    }

    API.set(accordion, {
        element: accordion,
        button: BUTTON,
        content: CONTENT,
        open,
        close,
        toggle: accordionFunction,
        destroy,
        refresh: () => {
            destroy();
            initializeAccordion(accordion);
            return API.get(accordion);
        },
        isOpen: () => (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(accordion).state.contains("open"),
    });
}

function PGS_accordion_init(root = document) {
    ;(0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_roots)(root, "accordion").forEach(accordion => initializeAccordion(accordion));
}

//= INIT
;(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_1__.PGS_onDocumentReady)(PGS_accordion_init);

//= API
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_alert: () => (/* binding */ PGS_alert),
/* harmony export */   fn_alert: () => (/* binding */ fn_alert)
/* harmony export */ });
/* harmony import */ var _pgs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_pgs.js */ "./assets/javascript/_pgs.js");
/* harmony import */ var _helper_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/_dom.js */ "./assets/javascript/helper/_dom.js");
/* harmony import */ var _helper_text_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper/_text.js */ "./assets/javascript/helper/_text.js");
/* harmony import */ var _helper_warn_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helper/_warn.js */ "./assets/javascript/helper/_warn.js");





//# PGS_alert
// the shared engine behind Alerts, Notification and Toast: builds the card (icon, title,
// description), and optionally a dismiss button, a row of action buttons, and an auto-dismiss
// timeout — all off by default, since a bare alert is a static message. Notification turns on
// dismissible + buttons and appends every card into its own managed panel; Toast turns on
// dismissible + buttons + timeout and replaces its own single floating card. Either way, the
// card itself, its close animation and its pgs:alert:* events live here, once.
const fn_alert = {
    _defaults: {
        description: "",
        closeTitle: "Close",
        dismissible: false,
        timeout: undefined,
        buttons: [],
        button: {
            id: undefined,
            title: "",
            link: null,
            close: true,
            optionButton: null
        },
        // the type names are the values of the JSON "type" field and the name of each method; flag
        // is what the card carries in its bracket for that severity (see _alerts.scss)
        type: {
            // the plain one: no severity colour, no glyph and no title of its own, so it stays on the box surface
            neutral: {
                flag: "alertNeutral",
                title: "",
                icon: ""
            },
            error: {
                flag: "alertError",
                title: "Error",
                icon: "<i pgs=\"icon['icon-circleXmark']\"></i>"
            },
            success: {
                flag: "alertSuccess",
                title: "Success",
                icon: "<i pgs=\"icon['icon-circleCheck']\"></i>"
            },
            info: {
                flag: "alertInfo",
                title: "Information",
                icon: "<i pgs=\"icon['icon-circleInfo']\"></i>"
            },
            warning: {
                flag: "alertWarning",
                title: "Warning",
                icon: "<i pgs=\"icon['icon-triangleExclamation']\"></i>"
            }
        }
    },

    _getContainer(root = document, configuredContainer, scope = "alert.show") {
        if (!(root instanceof Document) && !(root instanceof Element)) {
            throw (0,_helper_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_invalid)(scope, "root must be a Document or an Element");
        }

        let container = configuredContainer;
        if (typeof container === "string") container = root.querySelector(container);
        if (!container) container = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(root).querySelector("alertContainer");

        if (container && (!(container instanceof Element) || container === root || !root.contains(container))) {
            throw (0,_helper_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_invalid)(scope, "container must be an element contained in root");
        }

        if (!container) {
            container = document.createElement("div");
            const parent = root instanceof Document ? root.body : root;
            const submit = parent.querySelector('[type="submit"]');

            if (submit) submit.insertAdjacentElement("beforebegin", container);
            else parent.prepend(container);
        }

        ;(0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(container).add("alertContainer");
        return container;
    },

    // built to match the shared alert card's own content shape (see _alerts.scss): a title in
    // alert-content-title, a description in its own paragraph, either one optional
    _getContent(title, description) {
        const safeDescription = (0,_helper_text_js__WEBPACK_IMPORTED_MODULE_2__.PGS_formatText)(description);
        const safeTitle = (0,_helper_text_js__WEBPACK_IMPORTED_MODULE_2__.PGS_formatText)(title);
        const titleHtml = safeTitle ? `<strong pgs="_alert-content-title">${safeTitle}</strong>` : "";
        const descriptionHtml = safeDescription ? `<p>${safeDescription}</p>` : "";

        return `${titleHtml}${descriptionHtml}`;
    },

    _getType(type) {
        const name = String(type || "info").trim();
        return name in this._defaults.type ? name : "info";
    },

    // what a host component (Notification, Toast) hands over: a title string, or an options
    // object. null is not a value here, it is "leave it to the type" (icon: null keeps the icon
    // of the type), so it is dropped together with undefined
    _toOptions(options, scope = "alert.show") {
        if (typeof options === "string") options = { title: options };

        if (!options || typeof options !== "object" || Array.isArray(options)) {
            throw (0,_helper_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_invalid)(scope, "options must be an object or a string");
        }

        return Object.fromEntries(
            Object.entries(options).filter(([, value]) => value !== undefined && value !== null)
        );
    },

    // reads the pgs-data of one host element — notificationLoad carries pgs-data="notification[...]",
    // so name is "notification" — as a list of comma-separated JSON objects
    _getData(root, name) {
        const rawData = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(root).data.getValueBrackets(name) || "{}";
        let items;

        try {
            items = JSON.parse(`[${rawData}]`);
        } catch (error) {
            ;(0,_helper_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_warn)(`${name}.init`, "invalid JSON in pgs-data", error);
            return [];
        }

        if (items.some(item => !item || typeof item !== "object" || Array.isArray(item))) {
            (0,_helper_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_warn)(`${name}.init`, "every entry of pgs-data must be a JSON object", root);
            return [];
        }

        return items;
    },

    // the same data, already in the shape create() takes: the fields every host shares, with
    // their old aliases (message, title-close, duration). raw rides along for a host that
    // reads fields of its own (Toast's link). An entry with neither title nor description is
    // skipped: there would be nothing to show
    fromData(root, name) {
        return this._getData(root, name).flatMap(raw => {
            const title = String(raw.title || "").trim();
            const description = String(raw.description ?? raw.message ?? "").trim();
            if (!title && !description) return [];

            const duration = Number.parseInt(raw.timeout ?? raw.duration, 10);

            return [{
                type: this._getType(raw.type),
                raw,
                options: {
                    title,
                    description,
                    icon: raw.icon || undefined,
                    id: raw.id || undefined,
                    closeTitle: String(raw.closeTitle || raw["title-close"] || "").trim() || undefined,
                    buttons: Array.isArray(raw.buttons) ? raw.buttons : undefined,
                    timeout: Number.isNaN(duration) ? undefined : duration,
                    // read by the hosts that place their alert (Toast); the others never look at it
                    position: raw.position || undefined
                }
            }];
        });
    },

    // builds the card and wires its own behavior (dismiss, buttons, timeout); does not attach it
    // anywhere. The returned element carries a .pgsAlertClose() so a host container (e.g.
    // notification's deleteAll) can trigger the same close animation and event from the outside
    create(type, options = {}) {
        const typeDefaults = this._defaults.type[type] || this._defaults.type.info;
        const definedOptions = Object.fromEntries(
            Object.entries(options).filter(([, value]) => value !== undefined && value !== null)
        );
        const config = {
            description: this._defaults.description,
            closeTitle: this._defaults.closeTitle,
            dismissible: this._defaults.dismissible,
            timeout: this._defaults.timeout,
            buttons: this._defaults.buttons,
            // a hand-written alert keeps the bare name even when the JS API builds it (see
            // alerts.html); notification/toast are never hand-authored this way, so they pass
            // "_alert" instead — every child token below always gets the underscore regardless
            component: "alert",
            ...typeDefaults,
            ...definedOptions
        };

        const id = config.id ?? (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_1__.PGS_uniqueId)("alert");
        const alert = document.createElement("div");
        // the severity is a flag in the component's own bracket, like any other option, not a pgs-state
        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(alert).add(config.component, `${config.component}['${typeDefaults.flag}']`);
        // error and warning are both urgent enough to interrupt a screen reader; the others only
        // announce once idle
        alert.setAttribute("role", type === "error" || type === "warning" ? "alert" : "status");

        const iconHtml = config.icon ? `<div pgs="_alert-icon" aria-hidden="true">${config.icon}</div>` : "";
        const dismissHtml = config.dismissible ? `<button type="button" pgs="button['btnIconOnly'] _alert-dismiss"><i pgs="icon['icon-close']"></i></button>` : "";

        // generated from scratch, so every child token here gets the underscore; the same
        // markup written by hand in the page instead keeps the bare names (see alerts.html)
        alert.innerHTML = `
            ${iconHtml}
            <div pgs="_alert-content">${this._getContent(config.title, config.description)}</div>
            ${dismissHtml}
            <div pgs="_alert-buttons"></div>
        `;

        const buttonsRow = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(alert).querySelector("_alert-buttons");
        const btnDismiss = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(alert).querySelector("_alert-dismiss");

        // every listener of this card goes with it once it is gone
        const controller = new AbortController();
        const { signal } = controller;
        let timeoutTimer = 0;
        let closed = false;

        // closing twice (a dismiss while the timeout is still counting, or the timeout after a
        // button) changes nothing: the event is dispatched once
        const close = () => {
            if (closed) return;
            closed = true;
            clearTimeout(timeoutTimer);
            alert.style.opacity = "0";
            setTimeout(() => {
                (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_1__.PGS_dispatch)(alert, "pgs:alert:close", { id, type, title: config.title, description: config.description });
                alert.remove();
                controller.abort();
            }, 300);
        };

        alert.pgsAlertClose = close;

        if (btnDismiss) {
            // the dismiss button draws a cross, so closeTitle is its accessible name and nothing else
            btnDismiss.ariaLabel = config.closeTitle;
            btnDismiss.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                close();
            }, { signal });
        }

        (config.buttons || []).forEach((button, index) => {
            const { id: buttonId = `${id}-button-${index + 1}`, title, link, close: closeAfterClick, optionButton } =
                { ...this._defaults.button, ...button };

            const buttonElement = document.createElement(link ? "a" : "button");
            buttonElement.textContent = title;
            if (link) buttonElement.href = link;
            else buttonElement.type = "button";

            (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(buttonElement).add("button['btnTransparent']");
            if (optionButton) (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(buttonElement).add(`button['${optionButton}']`);

            buttonElement.addEventListener("click", (e) => {
                const event = (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_1__.PGS_dispatch)(buttonElement, "pgs:alert:buttonClick", {
                    id, buttonId, type, title: config.title, description: config.description, link
                }, { cancelable: true });

                if (link && event.defaultPrevented) e.preventDefault();
                if (closeAfterClick !== false) close();
            }, { signal });

            buttonsRow.appendChild(buttonElement);
        });

        // the row carries a padding and a tinted strip of its own, so an empty one is not
        // invisible: it has to be taken out of the layout. The default is [], never a falsy value
        if (!config.buttons?.length) (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(buttonsRow).add("hidden");

        // the countdown bar is dormant by default (see _alerts.scss); setting its own duration is
        // what switches it on, wherever a timeout is actually used — not just inside Toast
        if (config.timeout > 0) {
            alert.style.setProperty("--_alert-timeout", config.timeout + "ms");
            timeoutTimer = setTimeout(close, config.timeout);
        }

        return alert;
    },

    show(type, options = {}) {
        const scope = `alert.${type}`;
        const { root, container, ...contentOptions } = this._toOptions(options, scope);
        // the placement is checked before the card is built, so a wrong root leaves nothing behind
        const target = root !== undefined || container !== undefined ? this._getContainer(root, container, scope) : null;
        const alert = this.create(type, contentOptions);

        target?.replaceChildren(alert);
        return alert;
    }
};



const PGS_alert = {
    error: (options = {}) => fn_alert.show("error", options),
    success: (options = {}) => fn_alert.show("success", options),
    info: (options = {}) => fn_alert.show("info", options),
    warning: (options = {}) => fn_alert.show("warning", options),
    neutral: (options = {}) => fn_alert.show("neutral", options)
};


/***/ },

/***/ "./assets/javascript/components/_dropdown.js"
/*!***************************************************!*\
  !*** ./assets/javascript/components/_dropdown.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_dropdown: () => (/* binding */ PGS_dropdown)
/* harmony export */ });
/* harmony import */ var _pgs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_pgs.js */ "./assets/javascript/_pgs.js");
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");
/* harmony import */ var _helper_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper/_dom.js */ "./assets/javascript/helper/_dom.js");
/* harmony import */ var _helper_warn_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helper/_warn.js */ "./assets/javascript/helper/_warn.js");





// + dropdown
const API = new WeakMap();
const OPEN_DROPDOWNS = new Set();
const VIEWPORT_GAP = 8;
const SIDE_STATES = { top: "sideTop", right: "sideRight", bottom: "sideBottom", left: "sideLeft" };

function isDropdownContent(element) {
    return element instanceof Element && (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(element).contains("dropdown-content");
}

function getDropdownTrigger(dropdown, content) {
    const children = Array.from(dropdown.children).filter(child => child !== content);
    const dropdownButton = (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_directChild)(dropdown, "dropdown-button");

    return dropdownButton || children.find(child => !isDropdownContent(child)) || dropdown;
}

function getDropdownContent(dropdown) {
    return (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_directChild)(dropdown, "dropdown-content") || (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(dropdown).querySelector("dropdown-content");
}

function getPosition(dropdown) {
    const optionValue = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(dropdown).data.getValueBrackets("dropdownPosition");
    const raw = (optionValue || "bottom center").trim().toLowerCase();
    const parts = raw.split(/\s+/).filter(Boolean);
    const side = parts.find(part => ["top", "right", "bottom", "left"].includes(part)) || "bottom";
    const align = parts.find(part => ["top", "right", "bottom", "left", "center"].includes(part) && part !== side) || "center";

    return { side, align };
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function updatePosition(dropdown) {
    const data = API.get(dropdown);
    if (!data || !data.isOpen()) return;

    const { trigger, content } = data;
    const { side, align } = getPosition(dropdown);
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

    // exposes the resolved side, as a pgs-state token on the content, so the arrow (or a
    // component built on dropdown) can point at the trigger purely in CSS, without recomputing
    // the layout itself
    const sideState = SIDE_STATES[side];
    if (!(0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(content).state.contains(sideState)) {
        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(content).state.remove(...Object.values(SIDE_STATES));
        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(content).state.add(sideState);
    }

    content.style.setProperty("--_dropdown-left", `${Math.round(left)}px`);
    content.style.setProperty("--_dropdown-top", `${Math.round(top)}px`);

    // where the trigger's center falls inside the panel, after the viewport clamp above may
    // have shifted it: an arrow placed at 50% would stop pointing at the trigger
    content.style.setProperty("--_dropdown-arrowLeft", `${Math.round(triggerRect.left + triggerRect.width / 2 - left)}px`);
    content.style.setProperty("--_dropdown-arrowTop", `${Math.round(triggerRect.top + triggerRect.height / 2 - top)}px`);
}

function updateOpenDropdowns() {
    OPEN_DROPDOWNS.forEach(updatePosition);
}

function closeDropdown(dropdown) {
    const data = API.get(dropdown);
    if (!data || !data.isOpen()) return;

    Array.from(OPEN_DROPDOWNS)
        .filter(item => item !== dropdown && dropdown.contains(item))
        .forEach(closeDropdown);

    (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(dropdown).state.remove("open");
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

    (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(dropdown).state.add("open");
    data.trigger.setAttribute("aria-expanded", "true");
    OPEN_DROPDOWNS.add(dropdown);
    updatePosition(dropdown);
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

// the listeners that serve every dropdown on the page: registered once, when the module loads,
// so a later init() or refresh() cannot stack another copy of them
if (typeof document !== "undefined") {
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
}

function initializeDropdown(DROPDOWN) {
    if (API.has(DROPDOWN)) return;

    const CONTENT = getDropdownContent(DROPDOWN);
    if (!CONTENT) {
        (0,_helper_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_warn)("dropdown.init", "a dropdown needs a dropdown-content child, skipped", DROPDOWN);
        return;
    }

    const TRIGGER = getDropdownTrigger(DROPDOWN, CONTENT);
    const controller = new AbortController();
    const { signal } = controller;
    let hoverCloseTimeout = 0;

    if (!TRIGGER.id) TRIGGER.id = (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_uniqueId)("dropdown-btn");
    if (!CONTENT.id) CONTENT.id = (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_uniqueId)("dropdown-panel");

    if (TRIGGER.matches("button") && !TRIGGER.hasAttribute("type")) {
        TRIGGER.setAttribute("type", "button");
    }

    TRIGGER.setAttribute("aria-haspopup", "true");
    TRIGGER.setAttribute("aria-controls", CONTENT.id);
    TRIGGER.setAttribute("aria-expanded", String((0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(DROPDOWN).state.contains("open")));
    CONTENT.setAttribute("aria-labelledby", TRIGGER.id);

    function destroy() {
        controller.abort();
        window.clearTimeout(hoverCloseTimeout);
        OPEN_DROPDOWNS.delete(DROPDOWN);
        API.delete(DROPDOWN);
    }

    const data = {
        element: DROPDOWN,
        trigger: TRIGGER,
        content: CONTENT,
        open: () => openDropdown(DROPDOWN),
        close: () => closeDropdown(DROPDOWN),
        toggle: () => toggleDropdown(DROPDOWN),
        //+ recompute where the panel sits, for when its content changed size without reopening
        reposition: () => updatePosition(DROPDOWN),
        destroy,
        refresh: () => {
            destroy();
            initializeDropdown(DROPDOWN);
            return API.get(DROPDOWN);
        },
        isOpen: () => (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(DROPDOWN).state.contains("open")
    };

    //## click behavior
    TRIGGER.addEventListener("click", (event) => {
        if (isDropdownContent(event.target)) return;
        event.preventDefault();
        event.stopPropagation();
        toggleDropdown(DROPDOWN);
    }, { signal });

    //## Hover behavior
    if ((0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(DROPDOWN).option.contains("drpHover")) {
        const clearHoverCloseTimeout = () => {
            window.clearTimeout(hoverCloseTimeout);
        };

        TRIGGER.addEventListener("mouseenter", () => {
            clearHoverCloseTimeout();
            if (!API.get(DROPDOWN)?.isOpen()) openDropdown(DROPDOWN);
        }, { signal });

        CONTENT.addEventListener("mouseenter", clearHoverCloseTimeout, { signal });
        DROPDOWN.addEventListener("mouseleave", () => {
            hoverCloseTimeout = window.setTimeout(() => closeDropdown(DROPDOWN), 120);
        }, { signal });
    }

    CONTENT.addEventListener("click", event => event.stopPropagation(), { signal });
    API.set(DROPDOWN, data);

    if (data.isOpen()) OPEN_DROPDOWNS.add(DROPDOWN);
    updatePosition(DROPDOWN);
}

function PGS_dropdown_init(root = document) {
    ;(0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_roots)(root, "dropdown").forEach(dropdown => initializeDropdown(dropdown));
}

// # INIT
;(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_1__.PGS_onDocumentReady)(PGS_dropdown_init);

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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_menu: () => (/* binding */ PGS_menu)
/* harmony export */ });
/* harmony import */ var _pgs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_pgs.js */ "./assets/javascript/_pgs.js");
/* harmony import */ var _dropdown_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_dropdown.js */ "./assets/javascript/components/_dropdown.js");
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");
/* harmony import */ var _helper_dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helper/_dom.js */ "./assets/javascript/helper/_dom.js");
/* harmony import */ var _helper_warn_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helper/_warn.js */ "./assets/javascript/helper/_warn.js");






const API = new WeakMap();

//+ the toggle looks and sits the same whichever behavior it drives, so it is built once here
function createToggle(link) {
    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = `<i pgs="icon['icon-chevronDown']"></i>`;

    (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(button).add("_menu-submenuButton", "hover", "button['btnMini' 'btnIconOnly']");
    link.insertAdjacentElement("afterend", button);

    return button;
}

//+ opens the submenu in place instead of floating it: used everywhere a dropdown would either
//+ overflow the viewport or hide the branch the reader is already inside
function setupAccordion(li, button, ul, signal) {
    ;(0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(li).add("_menu-accordion");

    if (!ul.id) ul.id = (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_3__.PGS_uniqueId)("menu-submenu");
    button.setAttribute("aria-controls", ul.id);

    // a submenu nested inside a first-level dropdown changes the size of the floating panel,
    // whose position was computed for the size it had when it opened
    const dropdown = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(li).closest("dropdown");

    const setOpen = (open) => {
        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(li).state.toggle("open", open);
        button.setAttribute("aria-expanded", String(open));
        if (dropdown) _dropdown_js__WEBPACK_IMPORTED_MODULE_1__.PGS_dropdown.api(dropdown)?.reposition();
    };

    setOpen((0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(li).state.contains("open"));
    button.addEventListener("click", () => setOpen(!(0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(li).state.contains("open")), { signal });
}

function setupDropdown(li, button, ul) {
    ;(0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(li).add("dropdown");
    (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(li).data.setValueBrackets("dropdownPosition", "bottom center");
    (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(button).add("dropdown-button");
    (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(ul).add("dropdown-content");
}

//# DROP DOWN MENU
function initializeMenu(MENU) {
    if (API.has(MENU)) return;

    const topLevel = MENU.querySelector("ul");
    if (!topLevel) {
        (0,_helper_warn_js__WEBPACK_IMPORTED_MODULE_4__.PGS_warn)("menu.init", "a menu needs a ul list, skipped", MENU);
        return;
    }

    const controller = new AbortController();
    const { signal } = controller;
    const isHorizontal = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(MENU).option.contains("menuHorizontal");
    const floating = [];

    MENU.querySelectorAll("li").forEach(li => {
        const ul = li.querySelector("ul");
        if (!ul) return;

        // the toggle goes after the item's own link, never after one of a nested submenu
        const link = li.querySelector(":scope > a");
        if (!link) {
            (0,_helper_warn_js__WEBPACK_IMPORTED_MODULE_4__.PGS_warn)("menu.init", "a menu item with a submenu needs a direct link of its own, skipped", li);
            return;
        }

        // a refresh finds the toggle the first pass generated and reuses it
        const button = (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_3__.PGS_directChild)(li, "_menu-submenuButton") || createToggle(link);

        // only the first level of a horizontal menu floats its submenu: deeper levels would
        // stack dropdown over dropdown, and a vertical menu has the room to expand in place
        const isFirstLevel = li.parentElement === topLevel;

        if (isHorizontal && isFirstLevel) {
            setupDropdown(li, button, ul);
            floating.push(li);
        } else setupAccordion(li, button, ul, signal);
    });

    function destroy() {
        controller.abort();
        floating.forEach(li => _dropdown_js__WEBPACK_IMPORTED_MODULE_1__.PGS_dropdown.api(li)?.destroy());
        API.delete(MENU);
    }

    API.set(MENU, {
        element: MENU,
        type: isHorizontal ? "horizontal" : "vertical",
        destroy,
        refresh: () => {
            destroy();
            initializeMenu(MENU);
            return API.get(MENU);
        },
    });
    _dropdown_js__WEBPACK_IMPORTED_MODULE_1__.PGS_dropdown.init(MENU);
}

function PGS_menu_init(root = document) {
    ;(0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_3__.PGS_roots)(root, "menu").forEach(menu => initializeMenu(menu));
}

;(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_2__.PGS_onDocumentReady)(PGS_menu_init);

function PGS_menu_api(selector) {
    return API.get(selector);
}

//= EXPORT
const PGS_menu = {
    init: PGS_menu_init,
    api: PGS_menu_api
};


/***/ },

/***/ "./assets/javascript/components/_modal.js"
/*!************************************************!*\
  !*** ./assets/javascript/components/_modal.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_modal: () => (/* binding */ PGS_modal)
/* harmony export */ });
/* harmony import */ var _pgs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_pgs.js */ "./assets/javascript/_pgs.js");
/* harmony import */ var _helper_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/_dom.js */ "./assets/javascript/helper/_dom.js");
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");
/* harmony import */ var _helper_warn_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helper/_warn.js */ "./assets/javascript/helper/_warn.js");





//= MODAL
const EVENT_OPEN = "pgs:modal:open";
const EVENT_CLOSE = "pgs:modal:close";
const API = new WeakMap();
// the dialog of every wrapper, because the dialog leaves its wrapper on init: a destroy() and a new init
// of the same wrapper, or a refresh(), still find it
const DIALOGS = new WeakMap();
const ANIMATIONS = ["dialogAnimationZoom", "dialogAnimationLeft", "dialogAnimationRight", "dialogAnimationTop", "dialogAnimationBottom"];

function initializeModal(MODAL) {
    if (API.has(MODAL)) return API.get(MODAL);

    const BUTTON_OPEN = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(MODAL).querySelector("modal-button");
    const DIALOG = MODAL.querySelector("dialog") || DIALOGS.get(MODAL);
    if (!DIALOG) {
        (0,_helper_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_warn)("modal.init", "a modal needs a <dialog> inside its wrapper", MODAL);
        return;
    }
    DIALOGS.set(MODAL, DIALOG);
    const eventController = new AbortController();
    const { signal } = eventController;
    let historyObserver = null;
    let historyTimeout = null;

    //## SELECTOR
    // a hand-written close button keeps the bare name; a generated one gets the underscore
    const DOMButtonClose = "<button pgs=\"button['btnIconOnly' 'btnMini'] _modal-close\" type=\"button\" aria-label=\"Close\"><i pgs=\"icon['icon-close']\"></i></button>";
    const modalContentHeader = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(DIALOG).querySelector("modal-dialog-content-header");

    //## FOCUS
    // with no autofocus element inside, showModal() falls back to focusing the first
    // focusable descendant (per the HTML dialog spec), which makes whatever happens to sit
    // first — often a plain nav link — look pre-selected. Move focus to the header instead
    // (its text is what a screen reader should announce on open), or the dialog itself when
    // there's no header; tabindex="-1" keeps it out of the normal tab order.
    const focusTarget = modalContentHeader || DIALOG;
    if (!focusTarget.hasAttribute("tabindex")) focusTarget.setAttribute("tabindex", "-1");


    //## MERGE OPTIONS
    // Modal configuration may be authored on either wrapper or dialog. Copy only modal
    // options: other component brackets (for example flex on the wrapper) stay local.
    // modal-dialog itself always stays bare, like every other generated child token — its own
    // options land on _dialog instead, a second, pgs-generated-only token on the same <dialog>
    // element that exists purely to carry them (see AGENTS-DEVELOPMENT.md).
    (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(DIALOG).add("modal-dialog", "_dialog");
    for (const key of [
        "dialogHistory", "dialogTopLevel", "dialogDisableBackdropClose", "dialogDragClose", "dialogSmall", "dialogMedium",
        ...ANIMATIONS, "dialogFull", "dialogCenter", "dialogLeft", "dialogRight", "dialogTop", "dialogBottom"
    ]) {
        const source = [MODAL, DIALOG].find(element => (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(element).option.contains(key));
        if (!source) continue;
        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(MODAL).add(`modal['${key}']`);
        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(DIALOG).option.remove(key);
        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(DIALOG).add(`_dialog['${key}']`);
    }

    // these two carry a value, so they still live in pgs-data — option never checks pgs-data,
    // so presence is a getValueBrackets read instead of an option.contains() call
    for (const key of ["modalContainerID", "modalContainerPGS"]) {
        const source = [MODAL, DIALOG].find(element => (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(element).data.getValueBrackets(key) !== undefined);
        if (!source) continue;
        const value = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(source).data.getValueBrackets(key);
        for (const target of [MODAL, DIALOG]) (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(target).data.setValueBrackets(key, value);
    }

    //## OPTION ATTRIBUTES MODAL
    const dialogDisableBackdropClose = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(MODAL).option.contains("dialogDisableBackdropClose");
    const dialogHistory = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(MODAL).option.contains("dialogHistory");
    const modalContainerID = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(MODAL).data.getValueBrackets("modalContainerID");
    const modalContainerPGS = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(MODAL).data.getValueBrackets("modalContainerPGS");

    //## OPTION ATTRIBUTES DIALOG
    const dialogTopLevel = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(DIALOG).option.contains("dialogTopLevel");
    const dialogAnimationZoom = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(DIALOG).option.contains("dialogAnimationZoom");
    const dialogAnimation = ANIMATIONS.some(key => (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(DIALOG).option.contains(key));
    const dialogDragClose = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(DIALOG).option.contains("dialogDragClose");
    const CONTENT = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(DIALOG).querySelector("modal-dialog-content");
    let closing = false;


    //## BUTTON CLOSE
    if (!(0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(DIALOG).querySelector(["modal-close", "_modal-close"]) && !(0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(MODAL).querySelector(["modal-close", "_modal-close"])) {
        if (modalContentHeader) modalContentHeader.insertAdjacentHTML("beforeend", DOMButtonClose);
        else DIALOG.insertAdjacentHTML("beforeend", DOMButtonClose);
    }
    const BUTTON_CLOSE = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(DIALOG).querySelector(["modal-close", "_modal-close"]) || (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(MODAL).querySelector(["modal-close", "_modal-close"]);


    //## BUTTON OPEN
    // the label is a fallback, not a correction: a control the author has already named keeps
    // that name, which is the one the page is written around
    BUTTON_OPEN?.setAttribute("role", "button");
    if (BUTTON_OPEN && !BUTTON_OPEN.hasAttribute("aria-label")) BUTTON_OPEN.setAttribute("aria-label", "Open modal");


    //## POSITION
    if (dialogTopLevel && !MODAL.contains(DIALOG)) MODAL.append(DIALOG);
    else if (!dialogTopLevel) {
        if (modalContainerID) document.querySelector("#" + modalContainerID)?.append(DIALOG);
        else if (modalContainerPGS) (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(document).querySelector(modalContainerPGS)?.append(DIALOG);
        else document.body.append(DIALOG);
    }


    //+ FN STATUS
    function statusModal(status = true) {
        BUTTON_OPEN?.setAttribute("aria-expanded", status);
        DIALOG.setAttribute("aria-expanded", status);
    }

    //+ FN EVENT
    //+ pgs:modal:open and pgs:modal:close reach every listener once, wherever it sits. The event goes
    //+ out on the dialog and bubbles up from there: with dialogTopLevel the dialog is still inside its
    //+ wrapper, so that already passes through the wrapper. A dialog moved elsewhere is not under the
    //+ wrapper, so the wrapper gets an event of its own, and that one would reach the ancestors the two
    //+ share a second time: it is stopped at the wrapper's ancestor just below the first one that
    //+ holds the dialog, so the shared ancestors and everything above only hear the dialog's
    function dispatchModal(name) {
        const detail = { modal: MODAL, dialog: DIALOG };
        (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_1__.PGS_dispatch)(DIALOG, name, detail);
        if (MODAL.contains(DIALOG)) return;

        let last = MODAL;
        while (last.parentNode && !last.parentNode.contains(DIALOG)) last = last.parentNode;
        const stop = event => event.stopPropagation();
        last.addEventListener(name, stop);
        (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_1__.PGS_dispatch)(MODAL, name, detail);
        last.removeEventListener(name, stop);
    }

    //+ FN ANIMATION
    // dialogAnimation*: the panel comes in on open and goes back on close — dialogAnimationZoom
    // grows it out of the button that opened it, the way PhotoSwipe zooms a thumbnail, and
    // dialogAnimationLeft/Right/Top/Bottom slide it in from that edge of the screen. The
    // animationIn/animationOut state starts the animation — keyframes, timing, backdrop fade
    // and reduced motion all live in _modal.scss. The JavaScript only measures, for the zoom:
    // the panel is already laid out in its final place, so the offset and the scale that lay it
    // over the button go to the stylesheet as --_modal-zoom-*.
    // Returns a promise that settles when every animation the stylesheet started has finished,
    // or null when there is nothing to wait for: no panel, a zoom with no visible button to grow
    // from, or no animation at all (prefers-reduced-motion, or a theme that turns it off).
    function stopAnimation() {
        ;(0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(DIALOG).state.remove("animationIn");
        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(DIALOG).state.remove("animationOut");
    }

    function animate(state) {
        stopAnimation();
        if (!dialogAnimation || !CONTENT) return null;

        if (dialogAnimationZoom) {
            if (!BUTTON_OPEN) return null;
            // measuring right after stopAnimation() also flushes the removed state, so an
            // animationOut that follows an animationIn restarts the same keyframes instead of
            // carrying on the running ones
            const from = BUTTON_OPEN.getBoundingClientRect();
            const to = CONTENT.getBoundingClientRect();
            if (!from.width || !from.height || !to.width || !to.height) return null;

            CONTENT.style.setProperty("--_modal-zoom-x", `${from.left - to.left}px`);
            CONTENT.style.setProperty("--_modal-zoom-y", `${from.top - to.top}px`);
            CONTENT.style.setProperty("--_modal-zoom-scaleX", from.width / to.width);
            CONTENT.style.setProperty("--_modal-zoom-scaleY", from.height / to.height);
        } else {
            // the same restart, with no measurement to flush it
            void CONTENT.offsetWidth;
        }
        ;(0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(DIALOG).state.add(state);

        const animations = DIALOG.getAnimations({ subtree: true }).filter(animation => animation.animationName?.startsWith("modalAnimation"));
        if (!animations.length) {
            stopAnimation();
            return null;
        }
        return Promise.all(animations.map(animation => animation.finished));
    }

    //+ FN DRAG CLOSE
    //+ dialogDragClose: on a touch screen, dragging the panel down follows the finger and fades
    //+ the backdrop, the way PhotoSwipe lets a photo be pulled away. Let go far or fast enough and
    //+ the panel carries on down and the dialog closes; otherwise it springs back. The JavaScript
    //+ only tracks the finger — the distance goes to --_modal-drag-y and the fade to
    //+ --_modal-drag-progress on the dialog — and the dragging/dragClose states hand following,
    //+ springing back and leaving to _modal.scss.
    const dragClose = {
        START: 10, // px of vertical travel before a touch counts as a drag
        CLOSE: 0.15, // share of the viewport height that closes on release
        VELOCITY: 0.5, // px/ms that closes on release, whatever the distance
        touch: null,

        stop() {
            this.touch = null;
            (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(DIALOG).state.remove("dragging");
            (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(DIALOG).state.remove("dragClose");
            DIALOG.style.removeProperty("--_modal-drag-y");
            DIALOG.style.removeProperty("--_modal-drag-progress");
        },

        // a drag only starts where nothing would scroll instead: not in a form field, and every
        // box between the finger and the dialog (the dialog included) already at its top
        canStart(target) {
            if (target.closest("input, textarea, select, [contenteditable]")) return false;
            for (let element = target; element; element = element.parentElement) {
                if (element.scrollTop > 0) return false;
                if (element === DIALOG) break;
            }
            return true;
        },

        start(e) {
            this.touch = null;
            if (closing || e.touches.length !== 1 || !this.canStart(e.target)) return;
            const touch = e.touches[0];
            this.touch = { x: touch.clientX, y: touch.clientY, distance: 0, active: false, samples: [] };
        },

        move(e) {
            const drag = this.touch;
            if (!drag) return;
            // a second finger means a pinch, which is the browser's
            if (e.touches.length !== 1) return this.end(e, false);
            const touch = e.touches[0];

            if (!drag.active) {
                const dx = touch.clientX - drag.x;
                const dy = touch.clientY - drag.y;
                if (Math.abs(dx) < this.START && Math.abs(dy) < this.START) return;
                // sideways or upwards stays the page's: a horizontal scroller, the panel's own scroll
                if (dy <= 0 || Math.abs(dx) > dy) {
                    this.touch = null;
                    return;
                }
                // counted from here, so the panel does not jump by the threshold
                drag.active = true;
                drag.y = touch.clientY;
                stopAnimation();
                (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(DIALOG).state.add("dragging");
            }

            e.preventDefault();
            drag.distance = Math.max(0, touch.clientY - drag.y);
            drag.samples = [...drag.samples.filter(([time]) => e.timeStamp - time < 100), [e.timeStamp, drag.distance]];
            DIALOG.style.setProperty("--_modal-drag-y", `${drag.distance}px`);
            DIALOG.style.setProperty("--_modal-drag-progress", Math.min(drag.distance / (window.innerHeight / 2), 1));
        },

        end(e, release = true) {
            const drag = this.touch;
            if (!drag?.active) {
                this.touch = null;
                return;
            }
            // speed over the last 100ms of movement; a finger that stopped before lifting has none
            const [firstTime, firstDistance] = drag.samples[0] || [e.timeStamp, drag.distance];
            const [lastTime, lastDistance] = drag.samples.at(-1) || [e.timeStamp, drag.distance];
            const velocity = e.timeStamp - lastTime > 100 ? 0 : (lastDistance - firstDistance) / Math.max(lastTime - firstTime, 1);
            const shouldClose = release && (drag.distance > window.innerHeight * this.CLOSE || (velocity > this.VELOCITY && drag.distance > this.START));
            // back where it was: removing the state lets the stylesheet's transition take it there
            if (!shouldClose) return this.stop();

            this.touch = null;
            closing = true;
            statusModal(false);
            (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(DIALOG).state.remove("dragging");
            (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(DIALOG).state.add("dragClose");
            // the panel leaves from where the finger let it go, through the transitions this state
            // starts; none (reduced motion, or a theme that turns them off) closes at once
            const transitions = DIALOG.getAnimations({ subtree: true }).filter(animation => animation instanceof CSSTransition && [DIALOG, CONTENT].includes(animation.effect?.target));
            if (!transitions.length) return finishClose();
            Promise.all(transitions.map(animation => animation.finished)).then(finishClose, () => { });
        },
    };

    //+ FN OPEN
    function openModal(e) {
        e?.stopImmediatePropagation();
        if (DIALOG.open) {
            closeModal(e);
            return;
        }
        closing = false;

        document.querySelectorAll("dialog[open]").forEach((dlg) => dlg.close());
        statusModal(true);
        dialogTopLevel ? DIALOG.showModal() : DIALOG.show();
        // respect an explicit autofocus target inside the dialog when the author set one
        // preventScroll: the dialog is focused before the opening animation moves the panel off
        // screen, and Safari would scroll the dialog to follow it there
        if (!DIALOG.querySelector("[autofocus]")) focusTarget.focus({ preventScroll: true });
        animate("animationIn")?.then(stopAnimation, () => { });
        dispatchModal(EVENT_OPEN);
    }

    //+ FN CLOSE
    function closeModal(e) {
        e?.stopImmediatePropagation()
        // a second request while the closing animation is still running changes nothing
        if (closing) return;
        statusModal(false);
        const animationOut = DIALOG.open ? animate("animationOut") : null;
        if (!animationOut) return finishClose();
        closing = true;
        // a rejected promise means the animation was cancelled — by a native close removing
        // the state — and whoever cancelled it already owns the dialog's state
        animationOut.then(finishClose, () => { });
    }

    function finishClose() {
        closing = false;
        DIALOG.close();
        stopAnimation();
        dragClose.stop();
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
        if (params.get('modal') !== BUTTON_OPEN?.id) return;
        BUTTON_OPEN.scrollIntoView({ behavior: 'smooth' });
        openModal();
    }


    //# OPEN
    BUTTON_OPEN?.addEventListener("click", (e) => openModal(e), { signal });
    // preventDefault suppresses the native click a real <button>/<a> already fires for Enter/Space
    // on its own — without it, that native click ran right after this one and, finding the dialog
    // already open, toggled it straight back closed
    BUTTON_OPEN?.addEventListener("keydown", (e) => {
        if (DIALOG.open || (e.key !== "Enter" && e.key !== " ")) return;
        e.preventDefault();
        openModal(e);
    }, { signal });

    //# CLOSE
    // every way the dialog closes ends in this native event — the close button, the backdrop, Escape, a
    // drag, the browser's back button, or a plain dialog.close() — so pgs:modal:close goes out from here
    DIALOG.addEventListener("close", () => {
        statusModal(false);
        closing = false;
        stopAnimation();
        dragClose.stop();
        dispatchModal(EVENT_CLOSE);
    }, { signal });
    // Escape on a showModal() dialog closes it natively, with no time left for the closing
    // animation: take the cancel over and close through closeModal instead
    if (dialogAnimation) DIALOG.addEventListener("cancel", e => {
        e.preventDefault();
        closeModal(e);
    }, { signal });
    DIALOG.addEventListener("click", e => { if (e.target == DIALOG && !dialogDisableBackdropClose) closeModal(e) }, { signal });
    BUTTON_CLOSE?.addEventListener("click", e => closeModal(e), { signal });

    //# DRAG CLOSE
    // touchmove is not passive: once a drag has started it has to stop the page from scrolling
    if (dialogDragClose && CONTENT) {
        DIALOG.addEventListener("touchstart", e => dragClose.start(e), { signal, passive: true });
        DIALOG.addEventListener("touchmove", e => dragClose.move(e), { signal, passive: false });
        DIALOG.addEventListener("touchend", e => dragClose.end(e), { signal });
        DIALOG.addEventListener("touchcancel", e => dragClose.end(e, false), { signal });
    }

    //# UPDATE HISTORY
    if (dialogHistory && BUTTON_OPEN?.id) {
        historyTimeout = window.setTimeout(openModalOnHistory, 1);

        // keeps the URL in step with the dialog's own "open" attribute
        historyObserver = new MutationObserver(() => {
            let isOpen = DIALOG.hasAttribute("open");
            try {
                const url = new URL(window.location.href);
                const params = new URLSearchParams(url.search);
                isOpen ? params.set('modal', BUTTON_OPEN.id) : params.delete('modal');
                url.search = params.toString() ? `?${params.toString()}` : "";
                // the address already says so when the change came from the history itself (back,
                // forward, or a page loaded with ?modal=): a second entry would wipe the forward stack
                if (url.href === window.location.href) return;
                window.history.pushState({ modal: BUTTON_OPEN.id, open: isOpen }, "", url);
            } catch (_) { }
        });
        historyObserver.observe(DIALOG, { attributes: true, attributeFilter: ["open"] });

        // back and forward in the browser open and close the dialog to match
        window.addEventListener("popstate", () => {
            try {
                const params = new URLSearchParams(window.location.search);
                const shouldOpen = params.get('modal') === BUTTON_OPEN.id;
                if (shouldOpen && !DIALOG.open) openModal();
                if (!shouldOpen && DIALOG.open) closeModal()
            } catch (_) { }
        }, { signal });
    }

    function destroy() {
        eventController.abort();
        stopAnimation();
        dragClose.stop();
        historyObserver?.disconnect();
        if (historyTimeout !== null) window.clearTimeout(historyTimeout);
        API.delete(MODAL);
    }

    const api = {
        element: MODAL,
        button: BUTTON_OPEN,
        dialog: DIALOG,
        closeButton: BUTTON_CLOSE,
        open: forceOpen,
        close: forceClose,
        toggle: openModal,
        refresh: () => {
            destroy();
            return initializeModal(MODAL);
        },
        destroy,
        isOpen: () => DIALOG.open,
    };

    API.set(MODAL, api);
    return api;
}

function PGS_modal_init(root = document) {
    ;(0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_1__.PGS_roots)(root, "modal").forEach(MODAL => initializeModal(MODAL));
}

//= INIT PGS_modal
;(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_2__.PGS_onDocumentReady)(PGS_modal_init);

//= API
function PGS_modal_api(element) {
    return API.get(element);
}

const PGS_modal = {
    init: PGS_modal_init,
    api: PGS_modal_api
};


/***/ },

/***/ "./assets/javascript/components/_notification.js"
/*!*******************************************************!*\
  !*** ./assets/javascript/components/_notification.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_notification: () => (/* binding */ PGS_notification)
/* harmony export */ });
/* harmony import */ var _pgs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_pgs.js */ "./assets/javascript/_pgs.js");
/* harmony import */ var _helper_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/_dom.js */ "./assets/javascript/helper/_dom.js");
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");
/* harmony import */ var _helper_warn_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helper/_warn.js */ "./assets/javascript/helper/_warn.js");
/* harmony import */ var _alerts_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_alerts.js */ "./assets/javascript/components/_alerts.js");
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_modal.js */ "./assets/javascript/components/_modal.js");







// the controller of each bell's click listener, and the notificationLoad elements already read
const BELLS = new WeakMap();
const LOADED = new WeakSet();

//# PGS_notification
//+ the group manager: one modal that holds the scrollable panel, every notificationBell that opens
//+ it, and the counter and empty state. It only reads its data and hands it to the shared alert
//+ engine (see _alerts.js): every message inside the panel is that alert card, built dismissible,
//+ with its buttons, never timed by default.
const fn_notification = {
    _defaults: {
        emptyMessage: "No notifications",
        panelCloseTitle: "Close"
    },
    // a bell can say where the panel opens: a side (dialogLeft, dialogRight), a height (dialogTop,
    // dialogBottom), or dialogCenter for the middle. Each axis it leaves out keeps the default,
    // and the size is never a bell's business
    _positions: ["dialogLeft", "dialogRight", "dialogTop", "dialogBottom", "dialogCenter"],
    _animations: ["dialogAnimationLeft", "dialogAnimationRight"],
    _modal: null,
    _panelController: null,
    _missingBellReported: false,

    _getContainer() {
        return (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(document).querySelector("_notification");
    },

    // the count only ever changes through a card's own close animation (dismiss click, a button
    // that closes, or deleteAll below), so this one listener covers every case.
    // Deferred a tick: the event fires before the card is actually removed from the DOM
    _bindContainer(container, signal) {
        container.addEventListener("pgs:alert:close", () => {
            setTimeout(() => fn_notification._updateBellCounter(), 0);
        }, { signal });
    },

    // the one modal every bell opens, built the first time anything needs it: the first
    // notification, or the first click on a bell. It is not authored anywhere on the page
    _ensureModal() {
        if (this._modal?.isConnected) return this._modal;

        // a panel that left the page takes its listeners with it
        this._panelController?.abort();
        this._panelController = new AbortController();
        const { signal } = this._panelController;

        const modal = document.createElement("div");
        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(modal).add("modal['dialogRight' 'dialogTop' 'dialogSmall' 'dialogAnimationRight']");

        const dialog = document.createElement("dialog");
        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(dialog).add("modal-dialog", "_notification-dialog");

        const content = document.createElement("div");
        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(content).add("modal-dialog-content", "_notification");
        content.setAttribute("aria-live", "polite");
        content.setAttribute("aria-relevant", "additions");
        this._bindContainer(content, signal);

        // the panel closes from its own button, the one pgs.modal picks up inside the dialog. Written
        // first, it sits above the first notification
        const closeButton = document.createElement("button");
        closeButton.type = "button";
        closeButton.textContent = this._defaults.panelCloseTitle;
        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(closeButton).add("button['btnMini']", "_modal-close", "_notification-close");
        content.appendChild(closeButton);

        dialog.appendChild(content);
        modal.appendChild(dialog);
        document.body.appendChild(modal);
        _modal_js__WEBPACK_IMPORTED_MODULE_5__.PGS_modal.init(modal);

        // the bells say whether the panel is open, whichever way it got opened or closed
        modal.addEventListener("pgs:modal:open", () => this._setBellsExpanded(true), { signal });
        modal.addEventListener("pgs:modal:close", () => this._setBellsExpanded(false), { signal });

        this._modal = modal;
        this._updateBellCounter();
        return modal;
    },

    _getBells(root = document) {
        return (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_1__.PGS_roots)(root, "notificationBell");
    },

    _setBellsExpanded(expanded) {
        this._getBells().forEach(bell => bell.setAttribute("aria-expanded", String(expanded)));
    },

    // puts the position this bell asks for on the one modal. Only ever called while the panel is
    // closed: moving an open panel would make it jump. The slide comes in from the side it ends up on
    _applyPosition(bell) {
        const wanted = this._positions.filter(key => (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(bell).option.contains(key));
        const side = wanted.find(key => key === "dialogLeft" || key === "dialogRight") ?? "dialogRight";
        const height = wanted.find(key => key === "dialogTop" || key === "dialogBottom") ?? "dialogTop";
        const flags = wanted.includes("dialogCenter")
            ? ["dialogCenter"]
            : [side, height, side === "dialogLeft" ? "dialogAnimationLeft" : "dialogAnimationRight"];

        // pgs.modal moves the dialog out of its wrapper, so it is asked for rather than searched for
        const dialog = _modal_js__WEBPACK_IMPORTED_MODULE_5__.PGS_modal.api(this._modal).dialog;
        [[this._modal, "modal"], [dialog, "_dialog"]].forEach(([element, token]) => {
            (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(element).option.remove(...this._positions, ...this._animations);
            (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(element).add(`${token}[${flags.map(flag => `'${flag}'`).join(" ")}]`);
        });
    },

    // a bell is a plain button: it only asks the one modal to toggle
    _bindBells(root = document) {
        this._getBells(root).forEach(bell => {
            if (BELLS.has(bell)) return;

            const controller = new AbortController();
            BELLS.set(bell, controller);
            this._missingBellReported = false;

            // a hand-written counter keeps the bare name; a generated one gets the underscore,
            // so this is the one place that has to check for either
            if (!(0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(bell).querySelector(["notificationBell-counter", "_notificationBell-counter"])) {
                const counter = document.createElement("span");
                (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(counter).add("_notificationBell-counter");
                bell.appendChild(counter);
            }

            bell.setAttribute("aria-haspopup", "dialog");
            bell.setAttribute("aria-expanded", String(Boolean(this._modal?.isConnected && _modal_js__WEBPACK_IMPORTED_MODULE_5__.PGS_modal.api(this._modal)?.isOpen())));
            bell.addEventListener("click", () => {
                const modal = this._ensureModal();
                const api = _modal_js__WEBPACK_IMPORTED_MODULE_5__.PGS_modal.api(modal);

                // open already: this click closes it, and nothing moves
                if (!api.isOpen()) this._applyPosition(bell);
                api.toggle();
            }, { signal: controller.signal });
        });
    },

    _add(type, options) {
        const scope = `notification.${type}`;
        const config = _alerts_js__WEBPACK_IMPORTED_MODULE_4__.fn_alert._toOptions(options, scope);
        const notification = _alerts_js__WEBPACK_IMPORTED_MODULE_4__.fn_alert.create(type, {
            ...config,
            component: "_alert",
            dismissible: true,
            // the dismiss button draws a cross, so closeTitle is its accessible name and nothing else
            closeTitle: config.closeTitle ?? "Close notification"
        });

        // the notification is kept either way, so a bell added later still shows it; but with no
        // bell there is nothing to open the panel from, and that is worth saying out loud
        if (!this._getBells().length && !this._missingBellReported) {
            this._missingBellReported = true;
            (0,_helper_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_warn)(scope, "no notificationBell on the page, so nothing can open the panel that holds this notification");
        }

        this._ensureModal();
        this._getContainer().appendChild(notification);
        this._updateBellCounter();
    },

    // only loops and asks each card to close itself the same way its own dismiss button would;
    // the close animation and the pgs:alert:close event are the engine's job, not this one's
    deleteAll() {
        const containerNotification = this._getContainer();
        if (!containerNotification) return;

        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(containerNotification).querySelectorAll("_alert").forEach(element => element.pgsAlertClose());
    },

    _updateBellCounter() {
        const container = this._getContainer();
        const count = container ? (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(container).querySelectorAll("_alert").length : 0;

        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(document).querySelectorAll(["notificationBell-counter", "_notificationBell-counter"]).forEach(counter => {
            counter.textContent = count > 0 ? count : "";
        });

        if (!container) return;

        let emptyMessage = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(container).querySelector("_notification-empty");

        if (count === 0) {
            if (!emptyMessage) {
                emptyMessage = document.createElement("p");
                (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(emptyMessage).add("_notification-empty");
                container.appendChild(emptyMessage);
            }
            emptyMessage.textContent = this._defaults.emptyMessage;
        } else {
            emptyMessage?.remove();
        }
    },

    load(root = document) {
        (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_1__.PGS_roots)(root, "notificationLoad").forEach(element => {
            if (LOADED.has(element)) return;

            LOADED.add(element);
            _alerts_js__WEBPACK_IMPORTED_MODULE_4__.fn_alert.fromData(element, "notification").forEach(({ type, options }) => this._add(type, options));
            element.remove();
        });
    }
};

//= TRIGGER
//+ opening/closing the panel is the one modal's job; every notificationBell just asks it to toggle
function PGS_notificationLoad_init(root = document) {
    fn_notification._bindBells(root);
    fn_notification.load(root);
    fn_notification._updateBellCounter();
}

const PGS_notification = {
    init: PGS_notificationLoad_init,
    trigger: PGS_notificationLoad_init,
    error: (options = {}) => fn_notification._add("error", options),
    success: (options = {}) => fn_notification._add("success", options),
    info: (options = {}) => fn_notification._add("info", options),
    warning: (options = {}) => fn_notification._add("warning", options),
    neutral: (options = {}) => fn_notification._add("neutral", options),
    deleteAll: () => fn_notification.deleteAll()
};


//# EXECUTE
(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_2__.PGS_onDocumentReady)(PGS_notificationLoad_init);


/***/ },

/***/ "./assets/javascript/components/_pageNav.js"
/*!**************************************************!*\
  !*** ./assets/javascript/components/_pageNav.js ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_pageNav: () => (/* binding */ PGS_pageNav)
/* harmony export */ });
/* harmony import */ var _pgs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_pgs.js */ "./assets/javascript/_pgs.js");
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");
/* harmony import */ var _helper_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper/_dom.js */ "./assets/javascript/helper/_dom.js");
/* harmony import */ var _helper_warn_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helper/_warn.js */ "./assets/javascript/helper/_warn.js");





const API = new WeakMap();

// the browser retries "scroll to #fragment" for a while after load if the target wasn't ready
// yet on the first pass (still true once a panel becomes visible and images further down
// shift the layout) — by the time it retries, the reader may already have scrolled elsewhere
// themselves, and the retry yanks them back. Captured once here, as early as this module
// runs, so the panel it names can still be selected below after the URL is stripped of it.
// Every root takes it once, on its own first init (loadHashTaken): a refresh() reads the URL as
// it is by then, so it can never force the hash the page was opened with back onto the reader
const loadHash = typeof window === "undefined" ? "" : window.location.hash;
const loadHashTaken = new WeakSet();

const pageNavUtil = {
    stripHash() {
        history.replaceState(history.state, "", window.location.pathname + window.location.search);
    },

    // replaceState never triggers a scroll on its own (only real navigation does), so removing
    // the fragment now leaves the browser nothing to retry-scroll to. Putting it straight back
    // is not as inert as it looks: while the page is still loading, a fragment that is in the URL
    // again is a fragment the browser has yet to scroll to, and it does so when the load ends,
    // yanking back a reader who had already started scrolling. So it goes back only once the page
    // has loaded, and only if nothing else has changed the URL or the panel in the meantime — a
    // reload or a bookmark still lands on the same panel, only the automatic scroll is skipped
    restoreHash(id, isCurrent, signal) {
        const put = () => {
            if (window.location.hash || !isCurrent()) return;
            history.replaceState(history.state, "", window.location.pathname + window.location.search + "#" + id);
        };

        if (document.readyState === "complete") put();
        else window.addEventListener("load", put, { once: true, signal });
    },
};

//+ BUILD
// builds the instance of one pageNav root and returns its API, or null when its markup cannot be initialized
function PGS_pageNav_build(pageNav) {
    const panelsRoot = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(pageNav).querySelector("pageNav-panels");
    // every pageNav-list is its own <nav>: the desktop sidebar and the one inside the
    // mobile dialog both hold the same links, kept in sync together, so items are read
    // across every list at once instead of assuming there is only one
    const items = Array.from((0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(pageNav).querySelectorAll("pageNav-list-item"));
    const panelItems = panelsRoot ? Array.from((0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(panelsRoot).querySelectorAll("pageNav-panels-content")) : [];

    if (!panelItems.length) {
        (0,_helper_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_warn)("pageNav.init", "the pageNav has no pageNav-panels-content inside a pageNav-panels, so it was not initialized", pageNav);
        return null;
    }
    if (!items.length) {
        (0,_helper_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_warn)("pageNav.init", "the pageNav has no pageNav-list-item, so it was not initialized", pageNav);
        return null;
    }

    const eventController = new AbortController();
    const { signal } = eventController;

    const nav = {
        panelsRoot,
        items,
        panelItems,
        // active is the mark of the one panel to show, matching the same convention tabs uses:
        // a panel already marked active in the markup is where a hashless load lands
        current: panelItems.find(panel => (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(panel).state.contains("active")) || panelItems[0],
        // the hash the panels on screen were selected for. A navigation reaches select() once,
        // by whichever way arrives first: instance.select() applies the panel right away and
        // records the hash it just set, so the hashchange that hash raises finds it applied
        appliedHash: window.location.hash,

        // a panel is addressed by its own id, matched against an item's href fragment: the
        // same mechanism the browser already uses to jump to it, so no extra bookkeeping is
        // needed to keep several lists and one panel set in agreement
        panelIdFor(item) {
            const href = item.getAttribute("href") || "";
            return href.startsWith("#") ? href.slice(1) : null;
        },

        itemsFor(panelId) {
            return this.items.filter(item => this.panelIdFor(item) === panelId);
        },

        select(panelId, { resetScroll = true } = {}) {
            const panel = this.panelItems.find(item => item.id === panelId);
            this.current = panel;
            this.appliedHash = window.location.hash;

            this.panelItems.forEach(item => (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(item).state.toggle("active", item === panel));
            this.items.forEach(item => {
                if (this.panelIdFor(item) === panel.id) item.setAttribute("aria-current", "page");
                else item.removeAttribute("aria-current");
            });

            // closes whichever nav the reader just used when it lives inside a dialog (the
            // mobile "Browse docs" panel), the same way any other navigation should tidy up
            // after itself
            this.itemsFor(panel.id).forEach(item => item.closest("dialog[open]")?.close());

            if (resetScroll) window.scrollTo({ top: 0, behavior: "instant" });

            (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_dispatch)(pageNav, "pgs:pageNav:change", { panel, items: this.itemsFor(panel.id) });
        },

        idFromHash(hash) {
            const id = hash.slice(1);
            return id && this.panelItems.some(panel => panel.id === id) ? id : null;
        },

        fromHash() {
            return this.idFromHash(window.location.hash);
        },
    };

    window.addEventListener("hashchange", () => {
        const id = nav.fromHash();
        if (id && window.location.hash !== nav.appliedHash) nav.select(id);
    }, { signal });

    const destroy = () => {
        if (API.get(pageNav) !== api) return;
        eventController.abort();
        API.delete(pageNav);
    };

    const api = {
        element: pageNav,
        panels: nav.panelsRoot,
        select: (panelId) => {
            if (!panelId || !nav.panelItems.some(panel => panel.id === panelId)) {
                throw (0,_helper_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_invalid)("pageNav.select", `no pageNav-panels-content has the id "${panelId}"`);
            }
            window.location.hash = panelId;
            nav.select(panelId);
        },
        getCurrent: () => nav.panelItems.indexOf(nav.current),
        getCurrentPanel: () => nav.current,
        destroy,
        refresh: () => {
            const live = API.get(pageNav);
            if (live && live !== api) return live;
            destroy();
            return PGS_pageNav_build(pageNav);
        },
    };
    API.set(pageNav, api);

    // the URL wins over whatever the markup already shows: a reload lands on the panel the
    // reader left, and the first pass never resets the scroll position it starts at. On the
    // first init of this root it reads the hash captured once at the top of this module, not
    // the live window.location.hash, which another pageNav root's own init pass may have
    // already stripped or restored by the time this one runs. Any later init of the same root
    // (a refresh) reads the live one, and leaves the URL as it is
    const firstInit = !loadHashTaken.has(pageNav);
    loadHashTaken.add(pageNav);
    const initialPanelId = nav.idFromHash(firstInit ? loadHash : window.location.hash);

    if (initialPanelId && firstInit) pageNavUtil.stripHash();
    nav.select(initialPanelId || nav.current.id, { resetScroll: false });
    if (initialPanelId && firstInit) pageNavUtil.restoreHash(initialPanelId, () => nav.current.id === initialPanelId, signal);

    return api;
}

function PGS_pageNav_init(root = document) {
    ;(0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_roots)(root, "pageNav").forEach((pageNav) => {
        if (API.has(pageNav)) return;

        PGS_pageNav_build(pageNav);
    });
}

;(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_1__.PGS_onDocumentReady)(PGS_pageNav_init);

function PGS_pageNav_api(selector) {
    return API.get(selector);
}

const PGS_pageNav = {
    init: PGS_pageNav_init,
    api: PGS_pageNav_api,
};


/***/ },

/***/ "./assets/javascript/components/_search.js"
/*!*************************************************!*\
  !*** ./assets/javascript/components/_search.js ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_search: () => (/* binding */ PGS_search)
/* harmony export */ });
/* harmony import */ var _pgs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_pgs.js */ "./assets/javascript/_pgs.js");
/* harmony import */ var _helper_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/_dom.js */ "./assets/javascript/helper/_dom.js");
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");
/* harmony import */ var _helper_text_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helper/_text.js */ "./assets/javascript/helper/_text.js");
/* harmony import */ var _helper_warn_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helper/_warn.js */ "./assets/javascript/helper/_warn.js");






const API = new WeakMap();
// the searches that are open, or have a debounce or a request still pending: what a pointerdown
// outside them has to close and cancel (kept until that pointerdown, so it stays short)
const ACTIVE_SEARCHES = new Set();

const DEFAULT_OPTIONS = {
    minLength: 2,
    debounce: 200,
    limit: 6,
    submitOnSelect: false,
    searchOnFocus: true,
    source: null,
    onSelect: null,
};

const Search = {
    normalizeItem(item) {
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
    },

    normalizeOptions(current, options = {}) {
        const next = { ...current, ...options };
        next.minLength = Math.max(0, Number.parseInt(next.minLength, 10) || 0);
        next.debounce = Math.max(0, Number.parseInt(next.debounce, 10) || 0);
        next.limit = Math.max(1, Number.parseInt(next.limit, 10) || DEFAULT_OPTIONS.limit);
        next.submitOnSelect = Boolean(next.submitOnSelect);
        next.searchOnFocus = Boolean(next.searchOnFocus);
        next.source = typeof next.source === "function" || Array.isArray(next.source) ? next.source : null;
        next.onSelect = typeof next.onSelect === "function" ? next.onSelect : null;
        return next;
    },

    closeSearch(search) {
        const data = API.get(search);
        if (!data) return;

        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(search).state.remove("open");
        data.input.setAttribute("aria-expanded", "false");
        data.input.removeAttribute("aria-activedescendant");
        data.list.setAttribute("aria-hidden", "true");
        data.setActiveIndex(-1);
        ACTIVE_SEARCHES.delete(search);
    },

    openSearch(search, force = false) {
        const data = API.get(search);
        if (!data || (!force && data.items().length === 0)) return;

        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(search).state.add("open");
        data.input.setAttribute("aria-expanded", "true");
        data.list.setAttribute("aria-hidden", "false");
        ACTIVE_SEARCHES.add(search);
    },

    placeholderText(search, options) {
        const template = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(search).data.getValueBrackets("searchPlaceholder") || "Type at least {minLength} characters";
        return template.replace("{minLength}", options.minLength);
    },

    suggestionIcon(search) {
        return (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(search).data.getValueBrackets("searchIconSuggestion") || "<i pgs=\"icon['icon-magnifyingGlass']\"></i>";
    },

    noResultsText(search) {
        return (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(search).data.getValueBrackets("searchNoResults") || "No results found";
    },
};

// initialOptions is what a refresh() hands over: the options are not markup, so rebuilding the
// instance does not read them again
function initializeSearch(search, initialOptions = DEFAULT_OPTIONS) {
    if (API.has(search)) return API.get(search);

    const input = search.querySelector('input[type="search"]');
    const list = (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_1__.PGS_directChild)(search, "search-suggestions");
    if (!input || !list) {
        (0,_helper_warn_js__WEBPACK_IMPORTED_MODULE_4__.PGS_warn)("search.init", "a search needs an input[type=\"search\"] and a search-suggestions list as its direct child", search);
        return;
    }

    const eventController = new AbortController();
    const { signal } = eventController;

    if (!input.id) input.id = (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_1__.PGS_uniqueId)("search-input");
    if (!list.id) list.id = (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_1__.PGS_uniqueId)("search-suggestions");

    input.setAttribute("role", "combobox");
    input.setAttribute("aria-autocomplete", "list");
    input.setAttribute("aria-haspopup", "listbox");
    input.setAttribute("aria-controls", list.id);
    input.setAttribute("aria-expanded", "false");
    input.setAttribute("autocomplete", "off");
    list.setAttribute("role", "listbox");
    list.setAttribute("aria-labelledby", input.id);
    list.setAttribute("aria-hidden", "true");


    let options = { ...initialOptions };
    let items = [];
    let activeIndex = -1;
    let timer = null;
    let controller = null;
    let requestNumber = 0;

    function setLoading(loading) {
        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(search).state.toggle("loading", loading);
        input.setAttribute("aria-busy", String(loading));
    }

    function setActiveIndex(index) {
        activeIndex = index;
        const elements = Array.from((0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(list).querySelectorAll("_search-suggestions-item"));

        elements.forEach((element, itemIndex) => {
            const selected = itemIndex === activeIndex;
            element.setAttribute("aria-selected", String(selected));
            (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(element).state.toggle("selected", selected);
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
        Search.closeSearch(search);
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
            .map(Search.normalizeItem)
            .filter(Boolean)
            .slice(0, options.limit);

        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(search).state.remove("error");

        if (!items.length) {
            showNoResults();
            return items;
        }

        const fragment = document.createDocumentFragment();
        items.forEach((item, index) => {
            const option = document.createElement("li");
            (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(option).add("_search-suggestions-item");
            option.id = `${list.id}-option-${index}`;
            option.dataset.index = String(index);
            option.setAttribute("role", "option");
            option.setAttribute("aria-selected", "false");
            option.setAttribute("aria-disabled", String(item.disabled));
            // the icon is markup the author wrote; the label comes from the source, which can be remote
            option.innerHTML = Search.suggestionIcon(search) + (0,_helper_text_js__WEBPACK_IMPORTED_MODULE_3__.PGS_escapeHtml)(item.label);
            fragment.append(option);

        });

        activeIndex = -1;
        list.replaceChildren(fragment);
        Search.openSearch(search);

        return items;
    }

    async function resolveSource(query, signal) {
        if (Array.isArray(options.source)) {
            const normalizedQuery = query.toLocaleLowerCase();
            return options.source.filter(item => {
                const normalized = Search.normalizeItem(item);
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
        ACTIVE_SEARCHES.add(search);

        try {
            const result = await resolveSource(normalizedQuery, currentController.signal);
            if (currentRequest !== requestNumber || currentController.signal.aborted) return [];
            return render(result);
        } catch (error) {
            if (error?.name === "AbortError") return [];
            if (currentRequest !== requestNumber) return [];

            clear();
            (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(search).state.add("error");
            (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_1__.PGS_dispatch)(search, "pgs:search:error", { error, query: normalizedQuery });
            return [];
        } finally {
            if (controller === currentController) controller = null;
            if (currentRequest === requestNumber) setLoading(false);
        }
    }

    function showMessage(option) {
        items = [];
        activeIndex = -1;

        option.setAttribute("aria-disabled", "true");
        list.replaceChildren(option);

        Search.openSearch(search, true);
    }

    function showPlaceholder() {
        const option = document.createElement("li");
        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(option).add("_search-suggestions-placeholder");
        option.textContent = Search.placeholderText(search, options);
        showMessage(option);
    }

    function showNoResults() {
        const option = document.createElement("li");
        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(option).add("_search-suggestions-empty");
        option.textContent = Search.noResultsText(search);
        showMessage(option);
    }

    function schedule() {
        cancel();
        clear();
        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(search).state.remove("error");

        if (!options.source) return;

        if (input.value.trim().length < options.minLength) {
            showPlaceholder();
            return;
        }

        timer = window.setTimeout(() => {
            timer = null;
            runSearch(input.value);
        }, options.debounce);
        ACTIVE_SEARCHES.add(search);
    }

    function select(index = activeIndex, submit = options.submitOnSelect) {
        const item = items[index];
        if (!item || item.disabled) return null;

        input.value = item.value;
        cancel();
        clear();

        const { detail } = (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_1__.PGS_dispatch)(search, "pgs:search:select", { item, index, value: item.value, input });
        options.onSelect?.(detail);

        input.focus();
        if (submit && typeof search.requestSubmit === "function") search.requestSubmit();
        return item;
    }

    function configure(nextOptions = {}) {
        options = Search.normalizeOptions(options, nextOptions);
        return api;
    }

    function onInput() {
        schedule();
    }

    function onFocus() {
        if (items.length) Search.openSearch(search);
        else if (options.searchOnFocus) schedule();
    }

    function onKeydown(event) {
        if (event.key === "ArrowDown") {
            if (!(0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(search).state.contains("open")) schedule();
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
            Search.closeSearch(search);
            return;
        }

        // leaving the field: what is still pending must not open the list again behind the focus
        if (event.key === "Tab") {
            cancel();
            Search.closeSearch(search);
        }
    }

    function onListPointerDown(event) {
        const option = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(event.target).closest("_search-suggestions-item");
        if (!option || !list.contains(option)) return;
        event.preventDefault();
        select(Number.parseInt(option.dataset.index, 10));
    }

    function onSubmit() {
        cancel();
        Search.closeSearch(search);
    }

    function destroy() {
        cancel();
        clear();
        eventController.abort();
        ACTIVE_SEARCHES.delete(search);
        API.delete(search);
    }

    const api = {
        element: search,
        input,
        list,
        configure,
        setSource: source => configure({ source }),
        search: runSearch,
        open: () => Search.openSearch(search),
        close: () => Search.closeSearch(search),
        clear,
        cancel,
        select,
        // the options are the one thing a rebuild keeps: they were given by the code, not the markup
        refresh: () => {
            const kept = options;
            destroy();
            return initializeSearch(search, kept);
        },
        destroy,
        items: () => [...items],
        isOpen: () => (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(search).state.contains("open"),
        isLoading: () => (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(search).state.contains("loading"),
        setActiveIndex,
    };

    input.addEventListener("input", onInput, { signal });
    input.addEventListener("focus", onFocus, { signal });
    input.addEventListener("keydown", onKeydown, { signal });
    list.addEventListener("pointerdown", onListPointerDown, { signal });
    search.addEventListener("submit", onSubmit, { signal });
    API.set(search, api);
    return api;
}

// a pointerdown outside an open search closes it, and cancels what it was still waiting for: a
// debounce or a request that finishes after the click would open the list again behind it
if (typeof document !== "undefined") {
    document.addEventListener("pointerdown", event => {
        ACTIVE_SEARCHES.forEach(search => {
            if (search.contains(event.target)) return;

            const instance = API.get(search);
            instance?.cancel();
            instance?.close();
            ACTIVE_SEARCHES.delete(search);
        });
    });
}

function PGS_search_init(root = document) {
    ;(0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_1__.PGS_roots)(root, "search").forEach(search => initializeSearch(search));
}

;(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_2__.PGS_onDocumentReady)(PGS_search_init);

function PGS_search_api(element) {
    return API.get(element);
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_slides: () => (/* binding */ PGS_slides)
/* harmony export */ });
/* harmony import */ var _pgs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_pgs.js */ "./assets/javascript/_pgs.js");
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");
/* harmony import */ var _helper_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper/_dom.js */ "./assets/javascript/helper/_dom.js");
/* harmony import */ var _helper_throttle_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helper/_throttle.js */ "./assets/javascript/helper/_throttle.js");
/* harmony import */ var _helper_warn_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helper/_warn.js */ "./assets/javascript/helper/_warn.js");






const API = new WeakMap();

// a slide is in view from this share of it showing; the observer reports every percent so the
// same pass also feeds the scale animation
const VIEW_RATIO = 0.97;
const THRESHOLDS = Array.from({ length: 101 }, (_, i) => i / 100); // 0%,1%,2%...100%
const SCROLL_BEHAVIOR = "smooth";

class PGS_Slides {
    //- CONSTRUCTOR
    constructor({ element } = {}) {
        this.element = element;
        this.container = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(this.element).querySelector("slides-container");
    }
    
    //+ CREATE BUTTON 
    #createButtonsAndDots() {
        const EL = this.element;

        //## BUTTONS
        // a hand-written button keeps the bare name; a generated one gets the underscore, so
        // the check below has to look for either
        if (!(0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(EL).querySelector(['slides-prev', '_slides-prev'])) {
            EL.insertAdjacentHTML("afterbegin", `<button pgs="_slides-prev button['btnIconOnly' 'btnMini']" type="button" aria-label="Previous slide"> <i pgs="icon['icon-chevronDown'] rotate['rot90']"></i></button>`);
        }
        if (!(0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(EL).querySelector(['slides-next', '_slides-next'])) {
            EL.insertAdjacentHTML("beforeend", `<button pgs="_slides-next button['btnIconOnly' 'btnMini']" type="button" aria-label="Next slide"> <i pgs="icon['icon-chevronDown'] rotate['rot270']"></i></button>`);
        }

        //## DOTS
        if (!(0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(EL).querySelector(['slides-dots', '_slides-dots'])) {
            EL.insertAdjacentHTML("beforeend", `<div pgs="_slides-dots"></div>`);
        }

        const dotsContainer = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(EL).querySelector(['slides-dots', '_slides-dots']);
        while (dotsContainer.children.length < this.container.children.length) {
            dotsContainer.insertAdjacentHTML("beforeend", `<button pgs="_slides-dots-dot" type="button"></button>`);
        }
        while (dotsContainer.children.length > this.container.children.length) {
            dotsContainer.lastElementChild.remove();
        }
        // the token goes on every child, not only the ones built here: a dots container written
        // by hand is filled and labeled the same way, and the stylesheet has one thing to look for
        Array.from(dotsContainer.children).forEach((dot, index) => {
            ;(0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(dot).add("_slides-dots-dot");
            dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
        });
    }

    //+ SLIDE THE ARROWS MOVE FROM
    // slidesSingleScroll starts from the middle one in view, the one the snap is resting on: from the
    // first, with three slides showing, the next sibling is already centered and nothing scrolls
    #currentSlide(towardsEnd) {
        // arrow function: a declared one would have its own this and throw here
        const nearestSlide = () => {
            const box = this.container.getBoundingClientRect();
            const middle = (box.left + box.right) / 2;

            return Array.from(this.container.children).reduce((nearest, slide) => {
                const slideBox = slide.getBoundingClientRect();
                const distance = Math.abs((slideBox.left + slideBox.right) / 2 - middle);
                return !nearest || distance < nearest.distance ? { slide, distance } : nearest;
            }, null)?.slide;
        };

        const currents = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(this.container).state.querySelectorAll("view");
        if (!currents.length) return nearestSlide();

        // the middle of an even number of slides falls between two of them, so each arrow takes
        // the one on its own side: rounded down going forward, up going back. Rounding down for
        // both, as this did, left the two arrows starting from the same slide, and going back
        // then covered a slide more than going forward did
        if ((0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(this.element).option.contains('slidesSingleScroll')) {
            const middle = (currents.length - 1) / 2;
            return currents[towardsEnd ? Math.floor(middle) : Math.ceil(middle)];
        }

        return towardsEnd ? currents[currents.length - 1] : currents[0];
    }

    //+ GO TO A SLIDE
    // the two ends run the scroll out instead of centering, so the margin they carry is scrolled
    // through and the card lines up with the page content
    #goToSlide(slide) {
        if (!slide) return;

        const all = this.container.children;
        const behavior = SCROLL_BEHAVIOR;

        //## FIRST SLIDE
        if (slide === all[0]) this.container.scrollTo({ left: 0, behavior });
        //## LAST SLIDE
        else if (slide === all[all.length - 1]) this.container.scrollTo({ left: this.container.scrollWidth, behavior });
        //## SLIDE
        // the centering is measured and applied to the track alone. scrollIntoView would do the
        // same arithmetic, but by definition it walks up every scrollable ancestor and leaves
        // each one to the engine's reading of block: "nearest" — which is why Safari answers an
        // arrow by scrolling the page vertically as well. A horizontal carousel needs nothing
        // above the track to move, so nothing above the track is asked to
        else {
            const trackBox = this.container.getBoundingClientRect();
            const slideBox = slide.getBoundingClientRect();
            const distanceFromCenter = (slideBox.left + slideBox.width / 2) - (trackBox.left + trackBox.width / 2);
            this.container.scrollTo({ left: this.container.scrollLeft + distanceFromCenter, behavior });
        }

        slide.focus({ preventScroll: true });
    }

    //+ LOOP
    #isLoop() {
        return (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(this.element).option.contains('slidesLoop');
    }

    //+ PREV
    // no slide left to move to, but the scroll has not run out: the edge slide is showing with
    // its margin still to come, so the arrow finishes the scroll instead of doing nothing.
    // slidesLoop replaces that fallback with the last slide instead of staying put
    #prevSlide() {
        const all = this.container.children;
        const previous = this.#currentSlide(false)?.previousElementSibling;
        this.#goToSlide(previous ?? (this.#isLoop() ? all[all.length - 1] : all[0]));
    }

    //+ NEXT
    #nextSlide() {
        const all = this.container.children;
        const next = this.#currentSlide(true)?.nextElementSibling;
        this.#goToSlide(next ?? (this.#isLoop() ? all[0] : all[all.length - 1]));
    }

    //+ GO TO NUMBER SLIDE
    #goToNumberSlide(index) {
        this.#goToSlide(this.container.children[index]);
    }

    //+ CALLBACK
    #callback(allLi, container, prevButton, nextButton, dots) {
        allLi.forEach(LI => {
            // visiblePercent only feeds the scale animation; a slide is in view from VIEW_RATIO
            const visiblePercent = 0.9 + LI.intersectionRatio * 0.1;
            const isView = LI.intersectionRatio >= VIEW_RATIO;

            //## SCROLL ANIMATION
            if (LI.target.firstElementChild) {
                LI.target.firstElementChild.style.setProperty('--_slides-visiblePercent', `${visiblePercent}`);
            };

            //## VIEW
            (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(LI.target).state.toggle("view", isView);

            //## ACTIVE DOT
            const viewElements = Array.from(container.children).filter(el => (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(el).state.contains("view"));
            dots.forEach((btn, i) => {
                const isActive = viewElements.some(el => Array.from(container.children).indexOf(el) === i);
                (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(btn).state.toggle("active", isActive);
                btn.setAttribute('aria-current', isActive ? 'true' : 'false');
            });
        })

        this.#updateArrows(prevButton, nextButton);
    }

    //+ ARROWS STATE
    // an arrow goes off only at the end of the scroll, not as soon as the edge slide is in view:
    // that slide carries a margin, so it can be entirely on screen with a stretch still to run,
    // and the arrow is what runs it. slidesLoop wraps around instead, so neither arrow ever
    // goes off
    #updateArrows(prevButton, nextButton) {
        const loop = this.#isLoop();
        const atStart = !loop && this.container.scrollLeft <= 1;
        const atEnd = !loop && this.container.scrollLeft >= this.container.scrollWidth - this.container.clientWidth - 1;

        nextButton.disabled = atEnd;
        prevButton.disabled = atStart;
        nextButton.setAttribute('aria-disabled', String(atEnd));
        prevButton.setAttribute('aria-disabled', String(atStart));
    }

    //# EXECUTE
    // builds the instance of this element and returns its API, or null when the markup cannot be initialized
    execute() {
        const slides = this.element;
        if (!this.container) {
            (0,_helper_warn_js__WEBPACK_IMPORTED_MODULE_4__.PGS_warn)("slides.init", "the slides has no slides-container, so it was not initialized", slides);
            return null;
        }
        const eventController = new AbortController();
        const { signal } = eventController;

        //## elements
        this.#createButtonsAndDots();
        const prevButton = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(slides).querySelector(['slides-prev', '_slides-prev']);
        const nextButton = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(slides).querySelector(['slides-next', '_slides-next']);
        const dots = Array.from((0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(slides).querySelector(['slides-dots', '_slides-dots']).children);

        //##Listener: DOT, PREV, NEXT
        dots.forEach((dot, index) => dot.addEventListener("click", () => this.#goToNumberSlide(index), { signal }));
        prevButton.addEventListener("click", () => this.#prevSlide(), { passive: true, signal });
        nextButton.addEventListener("click", () => this.#nextSlide(), { passive: true, signal });

        // the observer answers what is visible, not where the scroll is: the last stretch can
        // settle with no threshold left to cross, so the arrows are refreshed on scroll too
        const updateArrowsOnScroll = (0,_helper_throttle_js__WEBPACK_IMPORTED_MODULE_3__.PGS_rafThrottle)(() => this.#updateArrows(prevButton, nextButton));
        this.container.addEventListener("scroll", updateArrowsOnScroll, { passive: true, signal });
        this.#updateArrows(prevButton, nextButton);

        //## observer
        const observer = new IntersectionObserver(
            (allLi) => this.#callback(allLi, this.container, prevButton, nextButton, dots),
            { root: this.container, threshold: THRESHOLDS, rootMargin: "0px" }
        );
        Array.from(this.container.children).forEach(allLi => observer.observe(allLi));

        //## HEIGHT
        // the track's height published on the root as --_slides-height, so the CSS can place
        // something against the slides themselves rather than against the whole component: the
        // arrows sit at half of it, and stay centered on the slides whatever else the root holds.
        // Measured rather than computed because the height comes from the tallest slide, which
        // only the layout knows — through a rAF, like the header does, so a write never lands
        // inside the callback that observed it
        const publishHeight = (0,_helper_throttle_js__WEBPACK_IMPORTED_MODULE_3__.PGS_rafThrottle)(() => {
            this.element.style.setProperty("--_slides-height", `${this.container.offsetHeight}px`);
        });
        const heightObserver = new ResizeObserver(publishHeight);
        heightObserver.observe(this.container);

        const destroy = () => {
            if (API.get(this.element) !== api) return;
            eventController.abort();
            observer.disconnect();
            heightObserver.disconnect();
            updateArrowsOnScroll.cancel();
            publishHeight.cancel();
            API.delete(this.element);
        };

        //- API
        const api = {
            element: this.element,
            container: this.container,
            prev: () => this.#prevSlide(),
            next: () => this.#nextSlide(),
            goTo: (index) => {
                const total = this.container.children.length;
                if (!Number.isInteger(index) || index < 0 || index >= total) {
                    throw (0,_helper_warn_js__WEBPACK_IMPORTED_MODULE_4__.PGS_invalid)("slides.goTo", `index must be an integer from 0 to ${total - 1}, got ${index}`);
                }
                this.#goToNumberSlide(index);
            },
            getCurrentIndexes: () => Array.from(this.container.children).map((el, i) => (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(el).state.contains("view") ? i : -1).filter(i => i !== -1),
            getCurrentElements: () => Array.from(this.container.children).filter(el => (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(el).state.contains("view")),
            getTotal: () => this.container.children.length,
            // same reading as the arrows: the end of the scroll, not the edge slide being in view
            isAtStart: () => this.container.scrollLeft <= 1,
            isAtEnd: () => this.container.scrollLeft >= this.container.scrollWidth - this.container.clientWidth - 1,
            destroy,
            refresh: () => {
                const live = API.get(this.element);
                if (live && live !== api) return live;
                destroy();
                return new PGS_Slides({ element: this.element }).execute();
            },
        };
        API.set(this.element, api);
        return api;
    }
}

//= INIT 
function PGS_slides_init(root = document) {
    ;(0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_roots)(root, "slides").forEach(element => {
        if (API.has(element)) return;

        new PGS_Slides({ element }).execute();
    });
}

;(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_1__.PGS_onDocumentReady)(PGS_slides_init);

//= API 
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_stepTabs: () => (/* binding */ PGS_stepTabs)
/* harmony export */ });
/* harmony import */ var _pgs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_pgs.js */ "./assets/javascript/_pgs.js");
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");
/* harmony import */ var _helper_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper/_dom.js */ "./assets/javascript/helper/_dom.js");
/* harmony import */ var _helper_warn_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helper/_warn.js */ "./assets/javascript/helper/_warn.js");





const API = new WeakMap();

//+ BUILD
// builds the instance of one wizard and returns its API, or null when its markup cannot be initialized
function PGS_stepTabs_build(tabsWizard) {
    //# SELECTOR
    const tabsContainer = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(tabsWizard).querySelector("stepTabs-container");
    if (!tabsContainer) {
        (0,_helper_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_warn)("stepTabs.init", "the wizard has no stepTabs-container, so it was not initialized", tabsWizard);
        return null;
    }

    const allTab = (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_directChildren)(tabsContainer, "stepTabs-container-tab");
    if (allTab.length === 0) {
        (0,_helper_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_warn)("stepTabs.init", "stepTabs-container has no stepTabs-container-tab, so the wizard was not initialized", tabsWizard);
        return null;
    }

    const prev = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(tabsWizard).querySelector("stepTabs-prev");
    const next = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(tabsWizard).querySelector("stepTabs-next");
    const restart = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(tabsWizard).querySelector("stepTabs-restart");
    const dots = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(tabsWizard).querySelector("stepTabs-dots");

    //# SETTING
    const total = allTab.length;
    const defaultTabLocked = allTab.filter(tab => (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(tab).state.contains("locked"));
    let current = 0;
    const eventController = new AbortController();
    const { signal } = eventController;

    //- CREATE DOTS
    const tabDots = [];
    if (dots) {
        dots.innerHTML = "";

        allTab.forEach((tab, index) => {
            const authoredIcon = ((0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(tab).data.getValueBrackets("stepTabsIcon") || "").trim();
            const dot = document.createElement("button");
            dot.type = "button";
            (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(dot).add("_stepTabs-dots-dot");
            (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(dot).add("button['btnIconOnly' 'hoverNot']");
            // stepTabsIcon takes three shapes, told apart by how the value opens. Markup, from a
            // "<", is instantiated as written: that is what puts every icon set in reach,
            // including the ones a class list cannot describe because they want their name as
            // text content or an attribute of their own. An "icon-" prefix is a built-in
            // glyph. Anything else is classes for whatever set the page loaded
            if (authoredIcon.startsWith("<")) {
                // a template rather than innerHTML on the dot: template content stays inert
                // while it parses, so nothing in the author's markup runs or loads until the
                // clone is in the document
                const authoredMarkup = document.createElement("template");
                authoredMarkup.innerHTML = authoredIcon;
                dot.replaceChildren(authoredMarkup.content.cloneNode(true));
            } else {
                const dotIcon = document.createElement("i");

                if (!authoredIcon || authoredIcon.startsWith("icon-")) {
                    (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(dotIcon).add(`icon['${authoredIcon || "icon-circle"}']`);
                } else {
                    (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(dotIcon).add("icon");
                    // a full list goes through untouched, whatever set it belongs to. A lone
                    // Font Awesome name is completed with its style class, because that set
                    // needs one and markup written before other sets were supported relies on it
                    dotIcon.className = /^fa-\S+$/.test(authoredIcon)
                        ? `fa-solid ${authoredIcon}`
                        : authoredIcon;
                }

                dot.replaceChildren(dotIcon);
            }

            dot.addEventListener("click", () => {
                if ((0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(dot).state.contains("completed")) {
                    goTo(index, true);
                }
            }, { signal });

            dots.appendChild(dot);
            tabDots.push(dot);
        });
    }

    //+ DOTS
    function updateDots() {
        tabDots.forEach((dot, i) => {
            ;(0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(dot).state.toggle("active", i === current);
            (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(dot).state.toggle("completed", i < current);
        });
    }

    //+ CONTROLS
    function updateControls() {
        const tab = allTab[current];
        if (prev) prev.disabled = current === 0;
        if (next) next.disabled = current === total - 1 || (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(tab).state.contains("locked");
    }

    //+ Step
    function goTo(index, scroll = true) {
        current = Math.min(Math.max(index, 0), total - 1);
        const tab = allTab[current];

        allTab.forEach((item, i) => (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(item).state.toggle("active", i === current));
        updateControls();
        updateDots();

        if (scroll && !tabsWizard.closest("dialog")) {
            tab.focus();
            tabsWizard.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        ;(0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_dispatch)(tabsWizard, "pgs:stepTabs:change", { current, total });
    }

    //+ restart
    // the locks go back first, so the controls goTo redraws already see them
    function restartTab() {
        defaultTabLocked.forEach(tab => (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(tab).state.add("locked"));
        goTo(0);
    }

    //# tab-locked
    // a lock taken off or put on by hand, outside toggleLock, still has to reach the next button
    const observer = new MutationObserver(() => updateControls());
    allTab.forEach(tabEl => observer.observe(tabEl, { attributes: true, attributeFilter: ["pgs-state"] }));

    // click on next/previous
    prev?.addEventListener("click", () => goTo(current - 1), { signal });
    next?.addEventListener("click", () => {
        updateControls();
        if (next.disabled) return;
        goTo(current + 1);
    }, { signal });
    restart?.addEventListener("click", () => restartTab(), { capture: true, signal });

    const destroy = () => {
        if (API.get(tabsWizard) !== api) return;
        eventController.abort();
        observer.disconnect();
        API.delete(tabsWizard);
    };

    //-(API)
    const api = {
        element: tabsWizard,
        container: tabsContainer,
        restart: restartTab,
        goTo: (index, scroll = true) => {
            if (!Number.isInteger(index) || index < 0 || index >= total) {
                throw (0,_helper_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_invalid)("stepTabs.goTo", `index must be an integer from 0 to ${total - 1}, got ${index}`);
            }
            goTo(index, scroll);
        },
        next: () => goTo(current + 1),
        prev: () => goTo(current - 1),
        toggleLock: (step, lock = true) => {
            if (!Number.isInteger(step) || step < 0 || step >= total) {
                throw (0,_helper_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_invalid)("stepTabs.toggleLock", `step must be an integer from 0 to ${total - 1}, got ${step}`);
            }
            ;(0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(allTab[step]).state.toggle("locked", lock);
            updateControls();
        },
        destroy,
        refresh: () => {
            const live = API.get(tabsWizard);
            if (live && live !== api) return live;
            destroy();
            return PGS_stepTabs_build(tabsWizard);
        },
        getCurrent: () => current,
        getState: () => ({ current, total }),
    };
    API.set(tabsWizard, api);

    //# INIT
    // after the API is stored, so a pgs:stepTabs:change listener can already reach the instance
    goTo(0, false);

    return api;
}

function PGS_stepTabs_init(root = document) {
    ;(0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_roots)(root, "stepTabs").forEach(tabsWizard => {
        if (API.has(tabsWizard)) return;

        PGS_stepTabs_build(tabsWizard);
    });
}

;(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_1__.PGS_onDocumentReady)(PGS_stepTabs_init);

function PGS_stepTabs_api(selector) {
    return API.get(selector);
}

const PGS_stepTabs = {
    init: PGS_stepTabs_init,
    api: PGS_stepTabs_api
};


/***/ },

/***/ "./assets/javascript/components/_steps.js"
/*!************************************************!*\
  !*** ./assets/javascript/components/_steps.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_steps: () => (/* binding */ PGS_steps)
/* harmony export */ });
/* harmony import */ var _pgs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_pgs.js */ "./assets/javascript/_pgs.js");
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");
/* harmony import */ var _helper_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper/_dom.js */ "./assets/javascript/helper/_dom.js");




const API = new WeakMap();

//+ BUILD
// completes every step of one list and returns its API
function PGS_steps_build(steps) {
    (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_directChildren)(steps, "steps-step").forEach((li, index) => {

        //# CIRCLE
        // a hand-written circle keeps the bare name; a generated one gets the underscore,
        // so the check below has to look for either
        if (!(0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_directChild)(li, ["steps-step-circle", "_steps-step-circle"])) {
            const circle = document.createElement("span");
            (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(circle).add("_steps-step-circle")
            circle.textContent = index + 1;
            li.insertAdjacentElement("afterbegin", circle);
        }

        //# line
        // same dual form as the circle above
        if (!(0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_directChild)(li, ["steps-step-line", "_steps-step-line"])) {
            const line = document.createElement("span");
            (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(line).add("_steps-step-line")
            li.insertAdjacentElement("afterbegin", line);
        }
    });

    // nothing here holds a listener or an observer, so destroy only forgets the instance
    const destroy = () => {
        if (API.get(steps) !== api) return;
        API.delete(steps);
    };

    const api = {
        element: steps,
        steps: () => (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_directChildren)(steps, "steps-step"),
        getStep: (index) => (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_directChildren)(steps, "steps-step")[index],
        getTotal: () => (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_directChildren)(steps, "steps-step").length,
        destroy,
        refresh: () => {
            const live = API.get(steps);
            if (live && live !== api) return live;
            destroy();
            return PGS_steps_build(steps);
        },
    };
    API.set(steps, api);

    return api;
}

function PGS_steps_init(root = document) {
    ;(0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_roots)(root, "steps").forEach(steps => {
        if (API.has(steps)) return;

        PGS_steps_build(steps);
    });
}

;(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_1__.PGS_onDocumentReady)(PGS_steps_init);

//= API
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_summary: () => (/* binding */ PGS_summary)
/* harmony export */ });
/* harmony import */ var _pgs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_pgs.js */ "./assets/javascript/_pgs.js");
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");
/* harmony import */ var _helper_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper/_dom.js */ "./assets/javascript/helper/_dom.js");
/* harmony import */ var _helper_warn_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helper/_warn.js */ "./assets/javascript/helper/_warn.js");





//# SUMMARY
const API = new WeakMap();
const MESSAGE_DEFAULTS = {
    showLess: "Show less",
    showMore: "Show more"
};

// the keys of the message option passed to init(), and the pgs-data key each one is written under
const MESSAGE_DATA_KEYS = {
    showLess: "summaryShowLess",
    showMore: "summaryShowMore"
};

function getLineHeight(element) {
    const style = window.getComputedStyle(element);
    const lineHeight = parseFloat(style.lineHeight);
    if (Number.isFinite(lineHeight)) return lineHeight;

    const fontSize = parseFloat(style.fontSize);
    return Number.isFinite(fontSize) ? fontSize * 1.2 : 0;
}

function validateMessages(value) {
    if (value === undefined) return;
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        throw (0,_helper_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_invalid)("summary.init", "message must be an object");
    }

    Object.entries(value).forEach(([key, message]) => {
        if (!(key in MESSAGE_DEFAULTS)) {
            throw (0,_helper_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_invalid)("summary.init", `unknown message option: ${key}`);
        }
        if (message !== undefined && typeof message !== "string") {
            throw (0,_helper_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_invalid)("summary.init", `message option ${key} must be a string`);
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
    const summaryData = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(summary).data;
    Object.entries(messages).forEach(([key, message]) => {
        const dataKey = MESSAGE_DATA_KEYS[key];
        if (summaryData.getValueBrackets(dataKey) === undefined) summaryData.setValueBrackets(dataKey, message);
    });
}

function initializeSummary(summary, initialMessages) {
    if (API.has(summary)) return;

    const content = (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_directChild)(summary, "summary-content");
    const button = (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_directChild)(summary, "summary-button");
    if (!content || !button) {
        (0,_helper_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_warn)("summary.init", "a summary needs a direct summary-content and a direct summary-button child, skipped", summary);
        return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    initializeMessages(summary, initialMessages);

    if (!content.id) content.id = (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_uniqueId)("summary-content");

    button.type ||= "button";
    button.setAttribute("aria-controls", content.id);

    function isOpen() {
        return (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(summary).state.contains("open");
    }

    // --summary-lines is the author's setting, read here and never written
    function getCollapsedHeight() {
        const lines = parseFloat(window.getComputedStyle(content).getPropertyValue("--summary-lines"));
        return getLineHeight(content) * (Number.isFinite(lines) && lines > 0 ? lines : 3);
    }

    function isOverflowing() {
        return content.scrollHeight > Math.ceil(getCollapsedHeight()) + 1;
    }

    function setExpanded(expanded) {
        const overflow = isOverflowing();

        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(summary).state.toggle("overflow", overflow);
        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(summary).state.toggle("open", expanded && overflow);

        button.hidden = !overflow;
        button.setAttribute("aria-hidden", String(!overflow));
        button.setAttribute("aria-expanded", String(expanded && overflow));
        button.textContent = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(summary).data.getValueBrackets(
            expanded && overflow ? "summaryShowLess" : "summaryShowMore"
        );

        const nextHeight = expanded && overflow ? content.scrollHeight : getCollapsedHeight();
        content.style.setProperty("--_summary-content-height", `${nextHeight}px`);
    }

    //+ measures the content again, keeping it open or closed as it was
    function measure() {
        const wasOpen = isOpen();
        content.style.setProperty("--_summary-content-height", "none");
        setExpanded(wasOpen);
    }

    function toggle() {
        setExpanded(!isOpen());
    }

    button.addEventListener("click", toggle, { signal });

    // a window resize is not the only way content's real size changes: a summary
    // initialized while its own tab/panel is hidden measures a scrollHeight of 0, so it
    // has to redo that measurement once the element actually gets a layout box. A
    // ResizeObserver catches both, throttled to a single pending frame so measure()'s own
    // max-height write doesn't feed back into itself
    let rafId = 0;
    let firstFrameId = 0;
    const resizeObserver = new ResizeObserver(() => {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
            rafId = 0;
            measure();
        });
    });
    resizeObserver.observe(content);

    measure();
    firstFrameId = requestAnimationFrame(measure);

    function destroy() {
        controller.abort();
        resizeObserver.disconnect();
        cancelAnimationFrame(rafId);
        cancelAnimationFrame(firstFrameId);
        API.delete(summary);
    }

    API.set(summary, {
        element: summary,
        content,
        button,
        open: () => setExpanded(true),
        close: () => setExpanded(false),
        toggle,
        destroy,
        refresh: () => {
            destroy();
            initializeSummary(summary, getInitialMessages());
            return API.get(summary);
        },
        isOpen,
    });
}

function PGS_summary_init(root = document, options = {}) {
    if (!options || typeof options !== "object" || Array.isArray(options)) {
        throw (0,_helper_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_invalid)("summary.init", "options must be an object");
    }

    const initialMessages = getInitialMessages(options.message);

    (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_roots)(root, "summary").forEach(summary => initializeSummary(summary, initialMessages));
}

//= INIT
;(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_1__.PGS_onDocumentReady)(PGS_summary_init);

//= API
function PGS_summary_api(selector) {
    return API.get(selector);
}

const PGS_summary = {
    init: PGS_summary_init,
    api: PGS_summary_api
};


/***/ },

/***/ "./assets/javascript/components/_tabs.js"
/*!***********************************************!*\
  !*** ./assets/javascript/components/_tabs.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_tabs: () => (/* binding */ PGS_tabs)
/* harmony export */ });
/* harmony import */ var _pgs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_pgs.js */ "./assets/javascript/_pgs.js");
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");
/* harmony import */ var _helper_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper/_dom.js */ "./assets/javascript/helper/_dom.js");
/* harmony import */ var _helper_warn_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helper/_warn.js */ "./assets/javascript/helper/_warn.js");





const API = new WeakMap();

//+ the tab buttons whose id the module generated: an id the author wrote is what reaches the URL, and
//+ a refresh has to keep telling the two apart
const GENERATED_IDS = new WeakSet();

function initializeTabs(tabs) {
    if (API.has(tabs)) return;

    const list = (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_directChild)(tabs, "tabs-list");
    const panels = (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_directChild)(tabs, "tabs-panels");
    if (!list || !panels) {
        (0,_helper_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_warn)("tabs.init", "tabs needs a direct tabs-list and a direct tabs-panels child, skipped", tabs);
        return;
    }

    const buttons = (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_directChildren)(list, "tabs-list-tab");
    const panelItems = (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_directChildren)(panels, "tabs-panels-content");
    if (!buttons.length || buttons.length !== panelItems.length) {
        (0,_helper_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_warn)("tabs.init", `tabs needs as many tabs-panels-content as tabs-list-tab, and at least one (found ${buttons.length} tabs and ${panelItems.length} panels), skipped`, tabs);
        return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    // ids generated as tabs-list-tab-N-M and tabs-panels-content-N-M: N counts the tabs sets, M the tab
    const buttonIdBase = (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_uniqueId)("tabs-list-tab");
    const panelIdBase = (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_uniqueId)("tabs-panels-content");
    list.setAttribute("role", "tablist");

    //## HISTORY
    // the parameter is named by the option, so two history-backed sets on one page do not
    // write over each other. A tab is addressed by its own id when the author gave it one,
    // and by its 1-based position otherwise, which is what keeps a shared link readable
    // without asking for ids that the markup does not need
    // tabsHistory lives only in pgs-data and .data has no contains(), so presence (with or
    // without its own payload) is checked directly against the raw attribute value
    const rawData = ((0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(tabs).data.value || "").split(/\s+/).filter(Boolean);
    const hasHistory = rawData.some(token => token === "tabsHistory" || token.startsWith("tabsHistory["));
    const historyKey = hasHistory
        ? ((0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(tabs).data.getValueBrackets("tabsHistory") || "tab")
        : null;

    // read before the loop below fills in the generated ids, so what reaches the URL is the
    // author's own name for the tab or nothing at all — never tabs-list-tab-1-2
    const authoredIds = buttons.map(button => (button.id && !GENERATED_IDS.has(button) ? button.id : ""));

    function indexFromHistory() {
        if (!historyKey) return -1;
        const value = new URLSearchParams(window.location.search).get(historyKey);
        if (!value) return -1;

        const byId = authoredIds.indexOf(value);
        if (byId !== -1) return byId;

        const position = Number(value);
        return Number.isInteger(position) && position >= 1 && position <= buttons.length ? position - 1 : -1;
    }

    function writeHistory() {
        if (!historyKey) return;
        const value = authoredIds[current] || String(current + 1);
        try {
            const url = new URL(window.location.href);
            url.searchParams.set(historyKey, value);
            window.history.pushState({ [historyKey]: value }, "", url);
        } catch (_) { }
    }

    let current = Math.max(
        panelItems.findIndex(panel => (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(panel).state.contains("active")),
        buttons.findIndex(button => (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(button).state.contains("active")),
        0,
    );

    function setState(element, active) {
        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(element).state.toggle("active", active);
    }

    //+ writes the selection to the DOM and announces it
    function show(index, { focus = false, history = true } = {}) {
        current = index;
        if (history) writeHistory();

        buttons.forEach((button, buttonIndex) => {
            const active = buttonIndex === current;
            setState(button, active);
            button.setAttribute("aria-selected", String(active));
            button.tabIndex = active ? 0 : -1;
        });

        panelItems.forEach((panel, panelIndex) => {
            const active = panelIndex === current;
            setState(panel, active);
            panel.hidden = !active;
        });

        if (focus) buttons[current].focus();
        (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_dispatch)(tabs, "pgs:tabs:change", { current, tab: buttons[current], panel: panelItems[current] });
    }

    // the tab that is already selected changes nothing: no second history entry, no second event
    function select(index, options = {}) {
        if (index === current) {
            if (options.focus) buttons[current].focus();
            return;
        }
        show(index, options);
    }

    buttons.forEach((button, index) => {
        const buttonId = button.id || `${buttonIdBase}-${index + 1}`;
        const panelId = panelItems[index].id || `${panelIdBase}-${index + 1}`;

        if (!button.id) GENERATED_IDS.add(button);
        button.id = buttonId;
        button.type = "button";
        button.setAttribute("role", "tab");
        button.setAttribute("aria-controls", panelId);

        panelItems[index].id = panelId;
        panelItems[index].setAttribute("role", "tabpanel");
        panelItems[index].setAttribute("aria-labelledby", buttonId);

        button.addEventListener("click", () => select(index), { signal });
        button.addEventListener("keydown", (event) => {
            let next = null;
            if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (current + 1) % buttons.length;
            if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (current - 1 + buttons.length) % buttons.length;
            if (event.key === "Home") next = 0;
            if (event.key === "End") next = buttons.length - 1;
            if (next === null) return;

            event.preventDefault();
            select(next, { focus: true });
        }, { signal });
    });

    // the URL wins over the state written in the markup: a reload lands on the tab the reader
    // left, and the first pass only reads it — it never pushes an entry of its own
    const restored = indexFromHistory();
    show(restored === -1 ? current : restored, { history: false });

    if (historyKey) {
        window.addEventListener("popstate", () => {
            const index = indexFromHistory();
            select(index === -1 ? 0 : index, { history: false });
        }, { signal });
    }

    function destroy() {
        controller.abort();
        API.delete(tabs);
    }

    API.set(tabs, {
        element: tabs,
        list,
        panels,
        goTo: (index) => {
            if (!Number.isInteger(index) || index < 0 || index >= buttons.length) {
                throw (0,_helper_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_invalid)("tabs.goTo", `index must be an integer from 0 to ${buttons.length - 1}`);
            }
            select(index);
        },
        getCurrent: () => current,
        destroy,
        refresh: () => {
            destroy();
            initializeTabs(tabs);
            return API.get(tabs);
        },
    });
}

function PGS_tabs_init(root = document) {
    ;(0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_roots)(root, "tabs").forEach(tabs => initializeTabs(tabs));
}

;(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_1__.PGS_onDocumentReady)(PGS_tabs_init);

function PGS_tabs_api(selector) {
    return API.get(selector);
}

const PGS_tabs = {
    init: PGS_tabs_init,
    api: PGS_tabs_api,
};


/***/ },

/***/ "./assets/javascript/components/_toast.js"
/*!************************************************!*\
  !*** ./assets/javascript/components/_toast.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_toast: () => (/* binding */ PGS_toast)
/* harmony export */ });
/* harmony import */ var _pgs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_pgs.js */ "./assets/javascript/_pgs.js");
/* harmony import */ var _helper_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/_dom.js */ "./assets/javascript/helper/_dom.js");
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");
/* harmony import */ var _helper_warn_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helper/_warn.js */ "./assets/javascript/helper/_warn.js");
/* harmony import */ var _alerts_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_alerts.js */ "./assets/javascript/components/_alerts.js");






// the toastLoad elements already read
const LOADED = new WeakSet();

//# PGS_toast
//+ the single floating stack: one message at a time, fixed on screen. It only owns the container
//+ and reads its data (pgs-data="toast[...]"), then hands everything to the shared alert engine
//+ (see _alerts.js) — dismiss, timeout, countdown bar and events are the alert's own.
const fn_toast = {
    _defaults: {
        timeout: 4000
    },
    _options: ["toastLeft", "toastRight", "toastCenter", "toastBottom"],

    // a hand-written container keeps the bare name; a generated one gets the underscore, so this needs both
    _getContainer() {
        return (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(document).querySelector(["toast", "_toast"]);
    },

    _getOrCreateContainer() {
        let containerToast = this._getContainer();

        if (!containerToast) {
            containerToast = document.createElement("div");
            (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(containerToast).add("_toast");
            containerToast.setAttribute("aria-live", "polite");
            containerToast.setAttribute("aria-relevant", "additions");
            document.body.appendChild(containerToast);
        }

        return containerToast;
    },

    // position flags land on the container, the way Modal copies the ones on its wrapper to _dialog:
    // _toast is the pgs-generated-only token that carries them, rebuilt at every toast so one toast's
    // position never leaks into the next. They come from the position of the toast: the field of its
    // pgs-data of a toastLoad or the position option of a pgs.toast call. A container written
    // by hand keeps its own as the baseline
    _applyOptions(container, position = [], scope) {
        const wanted = [Array.isArray(position) ? position : String(position).split(/\s+/)].flat().filter(Boolean);
        const unknown = wanted.filter(key => !this._options.includes(key));

        if (unknown.length) (0,_helper_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_warn)(scope, `unknown position ${unknown.join(", ")}; use ${this._options.join(", ")}`);

        const keys = this._options.filter(key => wanted.includes(key));

        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(container).remove("_toast");
        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(container).add("_toast", ...keys.map(key => `_toast['${key}']`));
    },

    _add(type, options) {
        const scope = `toast.${type}`;
        const { timeout = this._defaults.timeout, position, ...config } = _alerts_js__WEBPACK_IMPORTED_MODULE_4__.fn_alert._toOptions(options, scope);

        const toast = _alerts_js__WEBPACK_IMPORTED_MODULE_4__.fn_alert.create(type, {
            ...config,
            component: "_alert",
            dismissible: true,
            timeout,
            // the dismiss button draws a cross, so closeTitle is its accessible name and nothing else
            closeTitle: config.closeTitle ?? "Close toast"
        });

        // only one toast is shown at a time: a new one simply replaces whatever was there
        const container = this._getOrCreateContainer();
        this._applyOptions(container, position, scope);
        container.replaceChildren(toast);
    },

    _dispatch(element) {
        _alerts_js__WEBPACK_IMPORTED_MODULE_4__.fn_alert.fromData(element, "toast").forEach(({ type, options }) => this._add(type, options));
    },

    //## DELETE
    deleteAll() {
        const containerToast = this._getContainer();
        if (!containerToast) return;

        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(containerToast).querySelectorAll("_alert").forEach(element => element.pgsAlertClose());
    },


    //## TRIGGER
    trigger(root = document) {
        (0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_1__.PGS_roots)(root, "toastLoad").forEach(element => {
            if (LOADED.has(element)) return;

            LOADED.add(element);
            this._dispatch(element);
            element.remove();
        });
    }
};

function PGS_toastLoad_init(root = document) {
    fn_toast.trigger(root);
}

const PGS_toast = {
    init: PGS_toastLoad_init,
    trigger: PGS_toastLoad_init,
    error: (options = {}) => fn_toast._add("error", options),
    success: (options = {}) => fn_toast._add("success", options),
    info: (options = {}) => fn_toast._add("info", options),
    warning: (options = {}) => fn_toast._add("warning", options),
    neutral: (options = {}) => fn_toast._add("neutral", options),
    deleteAll: () => fn_toast.deleteAll()
};


//# EXECUTE
(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_2__.PGS_onDocumentReady)(PGS_toastLoad_init);


/***/ },

/***/ "./assets/javascript/helper/_dom.js"
/*!******************************************!*\
  !*** ./assets/javascript/helper/_dom.js ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_directChild: () => (/* binding */ PGS_directChild),
/* harmony export */   PGS_directChildren: () => (/* binding */ PGS_directChildren),
/* harmony export */   PGS_dispatch: () => (/* binding */ PGS_dispatch),
/* harmony export */   PGS_roots: () => (/* binding */ PGS_roots),
/* harmony export */   PGS_uniqueId: () => (/* binding */ PGS_uniqueId)
/* harmony export */ });
/* harmony import */ var _pgs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_pgs.js */ "./assets/javascript/_pgs.js");
/* harmony import */ var _warn_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_warn.js */ "./assets/javascript/helper/_warn.js");



//+ the elements a module's init(root) has to look at: the root itself when it carries the token,
//+ then everything under it. Every module resolves its roots through here, so pgs.init(el) on a
//+ node that was just inserted behaves the same whichever component the node is. `token` takes the
//+ same string or array that pgs().querySelectorAll does
function PGS_roots(root, token) {
    if (!(root instanceof Document || root instanceof Element)) {
        throw (0,_warn_js__WEBPACK_IMPORTED_MODULE_1__.PGS_invalid)("init", "root must be a Document or an Element");
    }

    const tokens = [].concat(token);
    const roots = Array.from((0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(root).querySelectorAll(tokens));

    if (root instanceof Element && tokens.some(item => (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(root).contains(item))) roots.unshift(root);
    return roots;
}

//+ the children of `parent` (not the descendants) that carry the token, or any of them
function PGS_directChildren(parent, token) {
    const tokens = [].concat(token);
    return Array.from(parent.children).filter(child => tokens.some(item => (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(child).contains(item)));
}

//+ the first of them, or null
function PGS_directChild(parent, token) {
    return PGS_directChildren(parent, token)[0] || null;
}

//+ "prefix-1", "prefix-2", ... one counter per prefix, for the ids a module generates
const ID_COUNTERS = new Map();

function PGS_uniqueId(prefix) {
    const next = (ID_COUNTERS.get(prefix) || 0) + 1;
    ID_COUNTERS.set(prefix, next);
    return `${prefix}-${next}`;
}

//+ every pgs:* event goes through here: it bubbles, and its detail always carries the element it
//+ was dispatched on, next to whatever the module adds. Pass { cancelable: true } only for an
//+ event whose default action the author can stop (pgs:alert:buttonClick)
function PGS_dispatch(target, name, detail = {}, { cancelable = false } = {}) {
    const event = new CustomEvent(name, { bubbles: true, cancelable, detail: { element: target, ...detail } });
    target.dispatchEvent(event);
    return event;
}


/***/ },

/***/ "./assets/javascript/helper/_formValidate.js"
/*!***************************************************!*\
  !*** ./assets/javascript/helper/_formValidate.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_formValidate: () => (/* binding */ PGS_formValidate)
/* harmony export */ });
/* harmony import */ var _pgs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_pgs.js */ "./assets/javascript/_pgs.js");
/* harmony import */ var _components_toast_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/_toast.js */ "./assets/javascript/components/_toast.js");
/* harmony import */ var _components_alerts_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/_alerts.js */ "./assets/javascript/components/_alerts.js");
/* harmony import */ var _warn_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_warn.js */ "./assets/javascript/helper/_warn.js");





//+ formMessage/formMessageTitle live only in pgs-data, and .data has no querySelector — find
//+ the nearest descendant carrying either key's payload directly
function findDataDescendant(root, keys) {
    for (const element of root.querySelectorAll("[pgs-data]")) {
        if (keys.some(key => (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(element).data.getValueBrackets(key) !== undefined)) return element;
    }
    return null;
}


class PGS_formValidate {
    #messageDefaults = {
        formFieldErrorTitle: "Error!",
        formFieldError: "Please complete this field.",
        formFieldsError: "Please complete all required fields.",
        formSuccessTitle: "Submitted",
        formSuccess: "Submitted successfully."
    };
    #temporaryFieldErrors = new Map();
    #insideValidatedCallback = false;
    // one controller for every listener the instance adds to the form, so destroy() removes them all
    #controller = new AbortController();

    constructor(form, options = {}) {
        if (!(form instanceof Element)) {
            throw (0,_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_invalid)("formValidate", "form must be an element");
        }
        if (!options || typeof options !== "object" || Array.isArray(options)) {
            throw (0,_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_invalid)("formValidate", "options must be an object");
        }

        this.container = form;
        this._rules = [];
        this.typeNotice = options.typeNotice === "toast" ? "toast" : "alert";
        this.showSuccessOnValidate = options.showSuccessOnValidate !== false;
        this.alertContainer = options.alertContainer;

        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(this.container).add("formValidate");
        this.#initializeMessages(options.message);
        this.container.setAttribute("novalidate", "");

        // a click on a field clears its error. One listener on the form serves every field, the
        // ones added after this point too, so validate() has nothing to attach and can run any
        // number of times without stacking listeners
        this.container.addEventListener("click", event => this.#clearErrorOnClick(event), { signal: this.#controller.signal });
    }

    //# DESTROY
    // removes the listeners the instance added to the form: the click that clears an error and
    // every validator(). The state, the novalidate attribute and the messages stay as they are
    destroy() {
        this.#controller.abort();
    }

    #clearErrorOnClick(event) {
        const field = event.target.closest("input, textarea, select");
        if (!field) return;

        const errorTarget = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(field).state.closest("errorField");
        if (errorTarget) this.#removeFieldError(errorTarget);
    }

    #validateMessages(value) {
        if (value === undefined) return;
        if (!value || typeof value !== "object" || Array.isArray(value)) {
            throw (0,_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_invalid)("formValidate", "message must be an object");
        }

        Object.entries(value).forEach(([key, message]) => {
            if (!(key in this.#messageDefaults)) {
                throw (0,_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_invalid)("formValidate", `unknown form message option "${key}"`);
            }
            if (message !== undefined && typeof message !== "string") {
                throw (0,_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_invalid)("formValidate", `form message option "${key}" must be a string`);
            }
        });
    }

    #initializeMessages(value = {}) {
        this.#validateMessages(value);

        const formData = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(this.container).data;
        const initialMessages = {
            ...this.#messageDefaults,
            ...Object.fromEntries(
                Object.entries(value).filter(([, message]) => message !== undefined)
            )
        };

        Object.entries(initialMessages).forEach(([key, message]) => {
            if (formData.getValueBrackets(key) === undefined) formData.setValueBrackets(key, message);
        });
    }

    #getMessage(key) {
        return (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(this.container).data.getValueBrackets(key);
    }

    temporaryFieldError = {
        set: (field, options = {}) => {
            if (!field || typeof field.matches !== "function" || !this.container.contains(field)) {
                throw (0,_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_invalid)("formValidate.temporaryFieldError.set", "field must be an element contained in the form");
            }

            if (typeof options === "string") options = { message: options };
            if (!options || typeof options !== "object" || Array.isArray(options)) {
                throw (0,_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_invalid)("formValidate.temporaryFieldError.set", "options must be an object or a string");
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
        // supports the native required attribute, data-required and aria-required
        isRequired(field) {
            if (!field) return false;

            const required = field.required === true || field.dataset.required === "true" || field.getAttribute('aria-required') === "true";
            return required && !field.hidden; // only the "hidden" attribute/property counts
        },
        // input (not special ones), textarea and select: empty when the value is "" or only spaces
        isEmptyTextLike(field) { return !String(field?.value ?? "").trim(); },
        // reads the name safely
        getGroupName(field) { return field?.name || field?.getAttribute?.("name") || ""; }
    };


    // + --------------------------
    // + inputs and other elements.
    // + --------------------------
    #inputValue(container) {

        //++ add rule
        const ruleInvalidFields = [];
        for (const rule of this._rules) {
            const res = rule(container);

            // a rule can return:
            // • null/undefined => ok
            // • an element => invalid
            // • an array of elements => invalid
            if (!res) continue;

            if (Array.isArray(res)) ruleInvalidFields.push(...res);
            else ruleInvalidFields.push(res);
        }

        //## INPUT 
        // text-like inputs (hidden, disabled, checkbox, radio and file ones are left out)
        const textInputs = Array.from(container.querySelectorAll("input")).filter((input) => {
            if (input.disabled) return false;
            if (input.type === "hidden") return false;
            if (input.type === "checkbox" || input.type === "radio" || input.type === "file") return false;

            // only validated when the field is required
            if (!this.#help.isRequired(input)) return false;

            return this.#help.isEmptyTextLike(input);
        });

        //## TEXTAREA 
        // required and empty
        const textareas = Array.from(container.querySelectorAll("textarea")).filter((ta) => {
            if (ta.disabled) return false;
            if (!this.#help.isRequired(ta)) return false;
            return this.#help.isEmptyTextLike(ta);
        });

        //## SELECT 
        // required and empty
        const selects = Array.from(container.querySelectorAll("select")).filter((sel) => {
            if (sel.disabled) return false;
            if (!this.#help.isRequired(sel)) return false;
            return this.#help.isEmptyTextLike(sel);
        });

        //## RADIO 
        // required: a radio group with nothing checked reports the error on the first radio of the group
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

        //## CHECKBOX 
        // required: it can be a single required checkbox (it has to be checked)
        // or a checkbox group (same name) with at least one box ticked
        const checkboxes = Array.from(container.querySelectorAll('input[type="checkbox"]')).filter((c) => !c.disabled);
        const requiredCheckboxSingles = [];
        const requiredCheckboxGroups = new Map(); // name -> [elements]
        for (const c of checkboxes) {
            if (!this.#help.isRequired(c)) continue;

            const name = this.#help.getGroupName(c);
            if (!name) {
                // a checkbox with no name is treated as a single required field
                if (!c.checked) requiredCheckboxSingles.push(c);
                continue;
            }

            // grouped by name, so a group answers as one field
            if (!requiredCheckboxGroups.has(name)) requiredCheckboxGroups.set(name, []);
            requiredCheckboxGroups.get(name).push(c);
        }
        const checkboxGroupErrors = [];
        for (const [name, group] of requiredCheckboxGroups.entries()) {
            // a real group (>= 2) needs at least one box ticked
            // a lone box behaves as a single required field
            const anyChecked = group.some((c) => c.checked);
            if (!anyChecked) {
                const fieldset = group.length > 1 ? group[0].closest("fieldset") : null;
                checkboxGroupErrors.push(fieldset || group[0]);
            }
        }

        //## FILE 
        // required: no file chosen
        const fileInputs = Array.from(container.querySelectorAll('input[type="file"]')).filter((f) => {
            if (f.disabled) return false;
            if (!this.#help.isRequired(f)) return false;
            return !(f.files && f.files.length > 0);
        });

        // the result: every field to be marked as failing
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
        ;(0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(field).state.add("errorField");

        // the first invalid field is the one that scrolls into view and speaks for all of them
        if (i !== 0) return;
        field.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });

        const messageSource = field.matches("fieldset")
            ? findDataDescendant(field, ["formMessage", "formMessageTitle"])
            : field;
        const source = messageSource || field;
        const temporaryError = this.#temporaryFieldErrors.get(field);
        const fieldTitle = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(source).data.getValueBrackets("formMessageTitle");
        const fieldMessage = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(source).data.getValueBrackets("formMessage");
        const title = temporaryError?.title || fieldTitle || this.#getMessage("formFieldErrorTitle");
        const description = total > 1
            ? this.#getMessage("formFieldsError")
            : temporaryError?.message || fieldMessage || this.#getMessage("formFieldError");

        if (this.typeNotice === "alert") {
            _components_alerts_js__WEBPACK_IMPORTED_MODULE_2__.PGS_alert.error({
                title: title,
                description: description,
                root: this.container,
                container: this.alertContainer
            });
        } else {
            _components_toast_js__WEBPACK_IMPORTED_MODULE_1__.PGS_toast.error({
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
    success(description = this.#getMessage("formSuccess"), title = this.#getMessage("formSuccessTitle")) {
        if (this.#insideValidatedCallback || this.validate() === true) {

            if (this.typeNotice === "alert") {
                _components_alerts_js__WEBPACK_IMPORTED_MODULE_2__.PGS_alert.success({
                    title,
                    description,
                    root: this.container,
                    container: this.alertContainer
                });
            } else {
                _components_toast_js__WEBPACK_IMPORTED_MODULE_1__.PGS_toast.success({
                    title,
                    description
                });
            }
        }
    }


    // + VALIDATE
    validate() {
        const invalid = this.#inputValue(this.container);

        // clean up the errors that no longer apply
        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(this.container).state.querySelectorAll("errorField").forEach(element => {
            if (!invalid.includes(element)) this.#removeFieldError(element);
        });

        // add the errors where needed
        invalid.forEach((el, i) => this.#addFieldError(el, i, invalid.length))

        //## status form
        if (invalid.length) {
            (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(this.container).state.remove("success").add("errorForm");
            return false;
        } else {
            (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(this.container).state.remove("errorForm").add("success");
            return true;
        }
    }

    //# EVENT VALIDATOR
    validator(callback, eventName = "submit") {
        if (typeof callback !== "function") throw (0,_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_invalid)("formValidate.validator", "callback must be a function");
        if (typeof eventName !== "string" || !eventName.trim()) throw (0,_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_invalid)("formValidate.validator", "eventName must be a non-empty string");

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
        }, { signal: this.#controller.signal });

        return this;
    }

    //# ADD RULE
    addNewRule(rule) {
        if (typeof rule !== "function") throw (0,_warn_js__WEBPACK_IMPORTED_MODULE_3__.PGS_invalid)("formValidate.addNewRule", "rule must be a function");
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_init: () => (/* binding */ PGS_init)
/* harmony export */ });
/* harmony import */ var _pgs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_pgs.js */ "./assets/javascript/_pgs.js");
/* harmony import */ var _warn_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_warn.js */ "./assets/javascript/helper/_warn.js");



function PGS_init(root = document) {
    if (!(root instanceof Document || root instanceof Element)) {
        throw (0,_warn_js__WEBPACK_IMPORTED_MODULE_1__.PGS_invalid)("init", "root must be a Document or an Element");
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_onDocumentReady: () => (/* binding */ PGS_onDocumentReady)
/* harmony export */ });
//+ runs the callback once the DOM is parsed. Without a document (server-side rendering, a test
//+ runner) there is nothing to wait for or to run against, so it does nothing
function PGS_onDocumentReady(callback) {
    if (typeof document === "undefined") return;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => callback(), { once: true });
        return;
    }

    callback();
}


/***/ },

/***/ "./assets/javascript/helper/_text.js"
/*!*******************************************!*\
  !*** ./assets/javascript/helper/_text.js ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_escapeHtml: () => (/* binding */ PGS_escapeHtml),
/* harmony export */   PGS_formatText: () => (/* binding */ PGS_formatText)
/* harmony export */ });
//+ escapes text that gets interpolated into innerHTML, shared by the components that build their own
//+ markup from supplied strings: the alert card (the titles and descriptions of alerts, and of
//+ the notifications and toasts built on it) and the search suggestions (their labels)
function PGS_escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

//+ the shared bit of markdown the alert card accepts in its title and description: **bold** and line
//+ breaks, applied after escaping so the source text can contain < > & unescaped
function PGS_formatText(value) {
    return PGS_escapeHtml(value)
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\r?\n/g, "<br>");
}


/***/ },

/***/ "./assets/javascript/helper/_throttle.js"
/*!***********************************************!*\
  !*** ./assets/javascript/helper/_throttle.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_rafThrottle: () => (/* binding */ PGS_rafThrottle),
/* harmony export */   PGS_watchDocument: () => (/* binding */ PGS_watchDocument)
/* harmony export */ });
//+ runs the callback at most once per frame, however many times the returned function is called.
//+ The arguments of the last call in the frame are the ones it receives. `.cancel()` drops a call
//+ that has not run yet, for the destroy() of a module
function PGS_rafThrottle(callback) {
    let frame = 0;
    let lastArgs = [];

    function throttled(...args) {
        lastArgs = args;
        if (frame) return;

        frame = requestAnimationFrame(() => {
            frame = 0;
            callback(...lastArgs);
        });
    }

    throttled.cancel = () => {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
    };

    return throttled;
}

//+ watches the whole document for nodes that arrive later and calls back once per frame, for the
//+ modules that have to find their own markup after the page is ready (header, navSmart). Returns
//+ the observer so a caller can disconnect it, or null when there is no document to watch
function PGS_watchDocument(callback, options = { childList: true, subtree: true }) {
    if (typeof document === "undefined" || typeof MutationObserver === "undefined") return null;

    const observer = new MutationObserver(PGS_rafThrottle(() => callback()));
    observer.observe(document.documentElement, options);
    return observer;
}


/***/ },

/***/ "./assets/javascript/helper/_warn.js"
/*!*******************************************!*\
  !*** ./assets/javascript/helper/_warn.js ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_invalid: () => (/* binding */ PGS_invalid),
/* harmony export */   PGS_warn: () => (/* binding */ PGS_warn)
/* harmony export */ });
//+ one voice for every message the library prints or throws: "pgs.<module>.<method>(): <what>".
//+ The scope is the call the author made ("tabs.init", "modal.open", "header.init"), so a line in
//+ the console says which module spoke without anybody having to search for the text

//+ invalid markup or a request that can be skipped: the page keeps working, the author is told
function PGS_warn(scope, message, ...details) {
    console.warn(`pgs.${scope}(): ${message}`, ...details);
}

//+ invalid input to a public method: `throw PGS_invalid("summary.init", "message must be an object")`
function PGS_invalid(scope, message) {
    return new TypeError(`pgs.${scope}(): ${message}`);
}


/***/ },

/***/ "./assets/javascript/layout/_header.js"
/*!*********************************************!*\
  !*** ./assets/javascript/layout/_header.js ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_header: () => (/* binding */ PGS_header)
/* harmony export */ });
/* harmony import */ var _pgs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_pgs.js */ "./assets/javascript/_pgs.js");
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");
/* harmony import */ var _helper_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper/_dom.js */ "./assets/javascript/helper/_dom.js");
/* harmony import */ var _helper_throttle_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helper/_throttle.js */ "./assets/javascript/helper/_throttle.js");





//= HEADER
//+ COMPACT BREAKPOINT
// Width at or below which the header switches to its compact layout even when the content
// still fits, so a wide header can be compact on purpose.
// headerCompactFrom[600] wins with its own pixel value, otherwise the named options
// (headerCompactTablet, headerCompactLaptop, ...) set --header-compact-breakpoint in the
// SCSS, so the breakpoint values stay defined in one place.
function getCompactBreakpoint(header) {
    const custom = parseFloat((0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(header).data.getValueBrackets("headerCompactFrom"));
    if (Number.isFinite(custom)) return custom;

    const declared = parseFloat(window.getComputedStyle(header).getPropertyValue("--header-compact-breakpoint"));
    return Number.isFinite(declared) ? declared : 600;
}

//+ OVERFLOW TOLERANCE
// scrollWidth and clientWidth are whole pixels while the layout underneath is fractional, so a
// header whose content almost exactly fills the row can report a pixel of overflow that is not
// there. Two pixels absorb that without letting real overflow through.
//
// It does not absorb anything larger, and that is on purpose. scrollWidth also counts whatever is
// positioned absolutely inside the header: a badge hung past the edge of a button adds its overhang
// to every measurement, the comparison is then true at any width, and the header stays compact for
// good. Raising this number would hide that instead of fixing it, so if the header ever gets stuck
// compact, look for what sticks out past the right edge of header-element rather than tuning here.
const OVERFLOW_TOLERANCE = 2;

//# RESIZE
// a header only reaches here once it holds a header-element (see getReadyHeaders)
function initResize(header) {
    const headerElements = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(header).querySelectorAll("header-element");

    headerElements.forEach(selectHeader => {

        //## COMPACT LAYOUT
        // how much room the full layout needs, learned the first time it does not fit. It cannot be
        // measured while compact, because header-element-onlyFull is hidden and reports zero width.
        let requiredWidth = 0;

        function compact(headerElement) {
            const isCompact = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(headerElement).state.contains("compact");
            const overflows = headerElement.scrollWidth > headerElement.clientWidth + OVERFLOW_TOLERANCE;

            const setCompact = (value) => {
                (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(header).state.toggle("compact", value);
                (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(headerElement).state.toggle("compact", value);
            };

            // while the full layout is on screen its scrollWidth is what it needs, and this is the only
            // moment it can be learned: once compact, header-element-onlyFull is hidden and reports zero
            if (!isCompact && overflows) requiredWidth = headerElement.scrollWidth;

            // a breakpoint declared on the header wins over any measurement
            if (window.innerWidth <= getCompactBreakpoint(header)) return setCompact(true);

            // compact: stay only while the room that was missing is still missing. With nothing learned
            // the page loaded compact and the full layout fitted at that width, so let it back in
            if (isCompact) return setCompact(requiredWidth ? headerElement.clientWidth < requiredWidth : false);
            setCompact(overflows);
        }

        //## Resize
        // throttled to avoid ResizeObserver loop warnings
        const scheduleCompact = (0,_helper_throttle_js__WEBPACK_IMPORTED_MODULE_3__.PGS_rafThrottle)(() => compact(selectHeader));

        const observer = new ResizeObserver(scheduleCompact);
        observer.observe(selectHeader);

        // MutationObserver, not ResizeObserver: won't loop back from compact()'s own show/hide toggles
        const childObserver = new MutationObserver(scheduleCompact);
        childObserver.observe(selectHeader, { childList: true, subtree: true });

        //## initial check
        compact(selectHeader);
    });
}


//# HEADER HEIGHT
function initHeight(header) {
    //+ GET HEADER HEIGHT ELEMENT
    function getHeaderHeightElement(header) {
        const isCompactBottom = window.getComputedStyle(header).getPropertyValue("--header-compactBottom-active").trim() === "1";
        return isCompactBottom ? (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(header).querySelector("header-element") || header : header;
    }

    //+ FOR --_header-height and --_header-heightScroll
    function getPrimaryHeader() {
        const headers = getReadyHeaders();
        return headers.find(header => (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(header).option.contains("headerMain")) || headers[0] || null;
    }

    //+ HEIGHT
    function headerHeight() {
        // --_header-height is what pushes the page down, so only one header can own it. Ownership
        // is checked here rather than at init, so a header declaring main later still
        // takes over from the fallback
        if (getPrimaryHeader() !== header) return;

        const wordPressBar = parseInt(window.getComputedStyle(document.documentElement).marginTop, 10) || 0;
        const height = getHeaderHeightElement(header).offsetHeight + wordPressBar;
        const scrollHeight = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(header).state.contains("hiddenByScroll") ? 0 : height;

        document.documentElement.style.setProperty("--_header-height", `${height}px`);
        document.documentElement.style.setProperty("--_header-heightScroll", `${scrollHeight}px`);
    }

    const scheduleHeaderHeight = (0,_helper_throttle_js__WEBPACK_IMPORTED_MODULE_3__.PGS_rafThrottle)(headerHeight);

    const headerHeightObserver = new ResizeObserver(scheduleHeaderHeight);
    headerHeightObserver.observe(header);
    (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(header).querySelectorAll("header-element").forEach(element => headerHeightObserver.observe(element));

    document.fonts?.ready?.then(scheduleHeaderHeight);

    scheduleHeaderHeight();
    window.addEventListener("resize", scheduleHeaderHeight);
    window.addEventListener("scroll", scheduleHeaderHeight, { passive: true });
}





//# SCROLL
// hides the header while the reader scrolls down and brings it back on the way up, on screens
// up to 900px tall, where a pinned header costs too much of the page
function initScroll(header) {
    if (!(0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(header).option.contains("headerScroll")) return;

    let lastScrollY = window.scrollY;
    const headerElements = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(header).querySelectorAll("header-element");

    function setHidden(hidden) {
        headerElements.forEach(element => element.style.transform = hidden ? "translateY(-100%)" : "translateY(0)");
        (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(header).state.toggle("hiddenByScroll", hidden);
    }

    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;

        if (window.innerHeight <= 900) {
            setHidden(currentScrollY >= 80 && currentScrollY > lastScrollY);
        }

        lastScrollY = currentScrollY;
    }, { passive: true });
}


//= INIT
const INITIALIZED_HEADERS = new WeakSet();

function initHeader(header) {
    if (INITIALIZED_HEADERS.has(header)) return;
    INITIALIZED_HEADERS.add(header);

    initResize(header);
    initHeight(header);
    initScroll(header);
}

//+ a header is only ready once it holds a header-element, which is where every measurement happens
function getReadyHeaders() {
    return Array.from((0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(document).querySelectorAll("header")).filter(header => (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(header).querySelector("header-element"));
}

function PGS_header_init(root = document) {
    ;(0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_roots)(root, "header").filter(header => (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(header).querySelector("header-element")).forEach(initHeader);
}

// headers can arrive later, and there may be more than one, so the watch stays on instead of
// stopping at the first: a pass is cheap and every header is initialized only once
;(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_1__.PGS_onDocumentReady)(PGS_header_init);
(0,_helper_throttle_js__WEBPACK_IMPORTED_MODULE_3__.PGS_watchDocument)(() => PGS_header_init());

//= EXPORT
const PGS_header = {
    init: PGS_header_init
};


/***/ },

/***/ "./assets/javascript/layout/_navSmart.js"
/*!***********************************************!*\
  !*** ./assets/javascript/layout/_navSmart.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_navSmart: () => (/* binding */ PGS_navSmart)
/* harmony export */ });
/* harmony import */ var _pgs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_pgs.js */ "./assets/javascript/_pgs.js");
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");
/* harmony import */ var _helper_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper/_dom.js */ "./assets/javascript/helper/_dom.js");
/* harmony import */ var _helper_throttle_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helper/_throttle.js */ "./assets/javascript/helper/_throttle.js");





//= NAV SMART
//+ publishes the room the bar takes at the bottom of the screen, the way the header publishes its own:
//+ --_navSmart-height is the whole distance from the bottom edge of the screen to the top of the bar
//+ (the pills plus the gap the bar keeps from the edge, and the safe area on a phone), and
//+ --_navSmart-heightScroll is kept equal to it, the same name the header gives its own pair. Both
//+ are 0 while a media query hides the bar. Padding the end of a page by either one keeps its last
//+ lines from sitting under it.

const INITIALIZED_NAVSMART = new WeakSet();

//+ a bar is only ready once it holds a navSmart-element, which is where the pills are
function getReadyNavSmart() {
    return Array.from((0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(document).querySelectorAll("navSmart")).filter(bar => (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(bar).querySelector("navSmart-element"));
}

// only one bar can own the variables. The bar that is pinned to the screen does: a navSmart written
// as an example inside a page flows with it, takes no room at the bottom, and so never owns them.
// One that is on screen wins over one a media query has hidden; with none on screen the first
// pinned one still owns them, and publishes 0. Ownership is checked at every measure, so a bar
// added later takes over from a missing one
function getPrimaryNavSmart() {
    const pinned = getReadyNavSmart().filter(bar => window.getComputedStyle(bar).position === "fixed");
    return pinned.find(bar => bar.getClientRects().length) || pinned[0] || null;
}

// a site added to the Home Screen of an iPhone reports navigator.standalone, but not the
// display-mode media query that every other browser answers
function isInstalledApp() {
    return navigator.standalone === true || window.matchMedia("(display-mode: standalone)").matches;
}

function initNavSmart(bar) {
    if (INITIALIZED_NAVSMART.has(bar)) return;
    INITIALIZED_NAVSMART.add(bar);

    (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(bar).state.toggle("installedApp", isInstalledApp());

    function measure() {
        if (getPrimaryNavSmart() !== bar) return;

        // from the top of the bar to the bottom of the screen: whatever the bar sits on counts, whether
        // it is its own offset from the edge or the safe area of a phone
        // a bar a media query has hidden (display: none) has no box and takes no room
        const height = bar.getClientRects().length
            ? Math.max(0, Math.round(window.innerHeight - bar.getBoundingClientRect().top))
            : 0;

        document.documentElement.style.setProperty("--_navSmart-height", `${height}px`);
        document.documentElement.style.setProperty("--_navSmart-heightScroll", `${height}px`);
    }

    const schedule = (0,_helper_throttle_js__WEBPACK_IMPORTED_MODULE_3__.PGS_rafThrottle)(measure);

    const observer = new ResizeObserver(schedule);
    observer.observe(bar);
    (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(bar).querySelectorAll("navSmart-element").forEach(element => observer.observe(element));

    new MutationObserver(schedule).observe(bar, { attributes: true, attributeFilter: ["class", "style"] });

    document.fonts?.ready?.then(schedule);
    window.addEventListener("resize", schedule);
    schedule();
}

function PGS_navSmart_init(root = document) {
    ;(0,_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.PGS_roots)(root, "navSmart").filter(bar => (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(bar).querySelector("navSmart-element")).forEach(initNavSmart);
}

// a bar can arrive later, and there may be several, so the watch stays on: a pass is cheap and
// every bar is initialized only once
;(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_1__.PGS_onDocumentReady)(PGS_navSmart_init);
(0,_helper_throttle_js__WEBPACK_IMPORTED_MODULE_3__.PGS_watchDocument)(() => PGS_navSmart_init());

//= EXPORT
const PGS_navSmart = {
    init: PGS_navSmart_init
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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************************!*\
  !*** ./assets/javascript/index.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pgs: () => (/* reexport safe */ _pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)
/* harmony export */ });
/* harmony import */ var _pgs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_pgs.js */ "./assets/javascript/_pgs.js");
/* harmony import */ var _imports_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_imports.js */ "./assets/javascript/_imports.js");
//# PGS


//# MODULES
// _imports.js imports every module, each one starts itself on import, and publishes them on pgs


})();

/******/ })()
;
//# sourceMappingURL=index.js.map