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
/* harmony import */ var _components_notification_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/_notification.js */ "./assets/javascript/components/_notification.js");
/* harmony import */ var _components_toast_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/_toast.js */ "./assets/javascript/components/_toast.js");
/* harmony import */ var _components_search_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/_search.js */ "./assets/javascript/components/_search.js");
/* harmony import */ var _components_slides_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/_slides.js */ "./assets/javascript/components/_slides.js");
/* harmony import */ var _components_stepTabs_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/_stepTabs.js */ "./assets/javascript/components/_stepTabs.js");
/* harmony import */ var _components_steps_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/_steps.js */ "./assets/javascript/components/_steps.js");
/* harmony import */ var _components_summary_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/_summary.js */ "./assets/javascript/components/_summary.js");
/* harmony import */ var _components_tabs_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/_tabs.js */ "./assets/javascript/components/_tabs.js");
/* harmony import */ var _layout_header_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./layout/_header.js */ "./assets/javascript/layout/_header.js");
/* harmony import */ var _helper_formValidate_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./helper/_formValidate.js */ "./assets/javascript/helper/_formValidate.js");
/* harmony import */ var _helper_init_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./helper/_init.js */ "./assets/javascript/helper/_init.js");
/* harmony import */ var _helper_scrollHorizontal_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./helper/_scrollHorizontal.js */ "./assets/javascript/helper/_scrollHorizontal.js");
/* harmony import */ var _patterns_cookieConsent_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./patterns/_cookieConsent.js */ "./assets/javascript/patterns/_cookieConsent.js");
























_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs.registerModules({
    init: _helper_init_js__WEBPACK_IMPORTED_MODULE_19__.PGS_init,
    darkmode: _base_darkmode_js__WEBPACK_IMPORTED_MODULE_1__.PGS_darkmode,
    svg: _base_svg_js__WEBPACK_IMPORTED_MODULE_3__.PGS_svg,
    hover: _base_hover_js__WEBPACK_IMPORTED_MODULE_2__.PGS_hover,
    accordion: _components_accordion_js__WEBPACK_IMPORTED_MODULE_4__.PGS_accordion,
    alert: _components_alerts_js__WEBPACK_IMPORTED_MODULE_5__.PGS_alert,
    dropdown: _components_dropdown_js__WEBPACK_IMPORTED_MODULE_6__.PGS_dropdown,
    menu: _components_menu_js__WEBPACK_IMPORTED_MODULE_7__.PGS_menu,
    modal: _components_modal_js__WEBPACK_IMPORTED_MODULE_8__.PGS_modal,
    header: _layout_header_js__WEBPACK_IMPORTED_MODULE_17__.PGS_header,
    cookieConsent: _patterns_cookieConsent_js__WEBPACK_IMPORTED_MODULE_21__.PGS_cookieConsent,
    notification: _components_notification_js__WEBPACK_IMPORTED_MODULE_9__.PGS_notification,
    toast: _components_toast_js__WEBPACK_IMPORTED_MODULE_10__.PGS_toast,
    search: _components_search_js__WEBPACK_IMPORTED_MODULE_11__.PGS_search,
    slides: _components_slides_js__WEBPACK_IMPORTED_MODULE_12__.PGS_slides,
    stepTabs: _components_stepTabs_js__WEBPACK_IMPORTED_MODULE_13__.PGS_stepTabs,
    steps: _components_steps_js__WEBPACK_IMPORTED_MODULE_14__.PGS_steps,
    summary: _components_summary_js__WEBPACK_IMPORTED_MODULE_15__.PGS_summary,
    tabs: _components_tabs_js__WEBPACK_IMPORTED_MODULE_16__.PGS_tabs,
    formValidate: _helper_formValidate_js__WEBPACK_IMPORTED_MODULE_18__.PGS_formValidate,
    scrollHorizontal: _helper_scrollHorizontal_js__WEBPACK_IMPORTED_MODULE_20__.PGS_scrollHorizontal,
    scrollHorizontalWithMouse: _helper_scrollHorizontal_js__WEBPACK_IMPORTED_MODULE_20__.PGS_scrollHorizontalWithMouse,
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
    function concactSelector(value, attribute = ATTR) {
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

    //= PGS
    function createPgs() {
        const store = createBracketAttribute(root, ATTR);

        function api() {
            return api;
        }

        api.querySelector = function (value) {
            return root.querySelector(concactSelector(value));
        };

        api.querySelectorAll = function (value) {
            return root.querySelectorAll(concactSelector(value));
        };

        api.closest = function (value) {
            if (!canAttr) return attrOnlyForElements("closest");
            return root.closest(concactSelector(value));
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

        api.querySelector = function (value) {
            return root.querySelector(concactSelector(value, attribute));
        };

        api.querySelectorAll = function (value) {
            return root.querySelectorAll(concactSelector(value, attribute));
        };

        api.closest = function (value) {
            return root.closest(concactSelector(value, attribute));
        };

        Object.defineProperty(api, "value", {
            get() { return root.getAttribute(attribute); },
            set(v) { root.setAttribute(attribute, v); }
        });

        return api;
    }

    //= OPTION
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

        //== an Array, where every other querySelectorAll returns a NodeList: the match is computed
        //== here instead of by the engine, so there is no live list to hand back
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

    //= DATA — key[payload] values only, always in this attribute; never touches the pgs bracket.
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

        //== a plain passthrough on this attribute, like state's and the base pgs's own value: a
        //== bracket flag is never read or written back through here, only this attribute ever is.
        Object.defineProperty(api, "value", {
            get() { return root.getAttribute(attribute); },
            set(value) {
                if (value == null) root.removeAttribute(attribute);
                else root.setAttribute(attribute, value);
            }
        });

        return api;
    }

    //# RETURN
    const api = createPgs();
    api.state = createState("pgs-state");
    api.option = createOption();
    api.data = createData("pgs-data");
    return api;
}

const PGS_IMPORTS = {};

function registerImportModule(name, module) {
    const key = String(name || "").trim().replace(/^pgs[_-\s]*/i, "").toLowerCase();

    if (!key) throw new TypeError("pgs.registerImport(...modules): every module needs a name or a PGS_name");

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
            throw new Error(`pgs.registerModules(): "${key}" is already defined on pgs`);
        }

        pgs[key] = module;
    });

    return pgs;
};

pgs.import = function (...names) {
    return names.flat().reduce((imports, name) => {
        const key = String(name || "").trim().replace(/^pgs[_-\s]*/i, "").toLowerCase();
        const item = PGS_IMPORTS[key];

        if (!item) throw new Error(`pgs.import(): module "${name}" is not registered`);

        imports[item.name] = item.module;
        return imports;
    }, {});
};

globalThis.pgs ??= pgs;

//== published under the package name too, distinct from the pgs() helper above, so a separate
//== webpack build can mark "mypgs" as external and resolve it to this at runtime instead of
//== bundling (and re-running) a whole second copy of the library
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
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");


//# DARKMODE

const EVENT_SVG_CHANGE_COLOR = "pgs:svg:changeColor";
const INITIALIZED_BUTTONS = new WeakSet();

//+ CHANGE ICON
//== the glyph is not the author's choice here: the library owns it, because it has to say which way
//== the switch is pointing. It draws it from the built-in set so the control is never blank, and
//== looks for a marked element as well as an <i>, so an icon set that renders anything else still
//== gets found. The fa- classes stay on for the pages that style them
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
//== applies the stored theme to the root as soon as the bundle is parsed in the head, so a
//== reload never paints the wrong one first
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



//# HOVER
//== every clickable surface of the library shares the same hover treatment, and it is written once
//== in SCSS under [pgs~=hover]. The component selectors no longer repeat it: this module marks the
//== surfaces that are clickable by definition, so the author keeps writing only the component token
//== while the element still carries a real pgs value that SCSS, JavaScript and the inspector read.

//+ tokens that get the hover treatment, with the extra condition each one has to satisfy
const HOVER_TARGETS = {
    //== a button is clickable whatever its tag
    button: () => true,
    //== a card or a box is only a clickable surface when it is a link
    card: element => element.tagName === "A",
    box: element => element.tagName === "A"
};

const TOKENS = Object.keys(HOVER_TARGETS);

//== only what this module added is ever taken back: a "hover" written by hand belongs to the author
//== and stays, whatever the element turns into later
const MARKED = new WeakSet();

//+ SYNC HOVER
function syncHover(element) {
    if (!(element instanceof Element)) return;

    //== hoverNot is the one opt-out, written on the element whatever the component: a surface that
    //== must not answer the pointer is never marked, and SCSS guards a "hover" written by hand
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

//= INIT
//== bodyHoverAuto gates every caller here, not only the automatic pass below: pgs.init(root) walks
//== every registered module and calls its init(root) whether or not the caller meant to touch
//== hover specifically, so the check has to live in the one function every path funnels through,
//== not in the block that only covers this module's own unprompted call
function initHover(root = document) {
    if (!(root instanceof Document || root instanceof Element)) {
        throw new TypeError("pgs.hover.init(): root must be a Document or an Element");
    }

    if (!(0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(document.body).contains("bodyHoverAuto")) return root;

    if (root instanceof Element) syncHover(root);
    (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(root).querySelectorAll(TOKENS).forEach(syncHover);

    return root;
}

//= WATCH
//== the surfaces to mark do not all exist when the page is ready: the library injects its own
//== markup (a toast, a notification row, the cookie banner) and an author can add or remove a token
//== at runtime. The watch stays on, batched per frame, and re-marking is idempotent so the pass our
//== own attribute write triggers back settles at once
const PENDING = new Set();
let hoverScanRafId = 0;

function scheduleSync(nodes) {
    nodes.forEach(node => PENDING.add(node));
    if (hoverScanRafId) return;

    hoverScanRafId = requestAnimationFrame(() => {
        hoverScanRafId = 0;
        const roots = [...PENDING];
        PENDING.clear();
        roots.forEach(root => root.isConnected && initHover(root));
    });
}

const hoverObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.type === "attributes") {
            scheduleSync([mutation.target]);
            return;
        }

        scheduleSync([...mutation.addedNodes].filter(node => node instanceof Element));
    });
});

//= AUTO-MARK
//== bodyHoverAuto is the author's own switch, written on <body> next to bodyBase/bodyImg/bodyText/
//== bodyHeading: without it nothing is marked on load, and — separately from the check inside
//== initHover — the observer below never even starts, so a page that only ever writes
//== pgs="hover" by hand never pays for it running for its whole lifetime
(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_1__.PGS_onDocumentReady)(() => {
    if (!(0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(document.body).contains("bodyHoverAuto")) return;

    initHover(document);
    hoverObserver.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["pgs"]
    });
});

//# EXPORT
const PGS_hover = {
    init: initHover
};


/***/ },

/***/ "./assets/javascript/base/_object.js"
/*!*******************************************!*\
  !*** ./assets/javascript/base/_object.js ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

        //== ids of its own for aria-controls / aria-labelledby
        const ID = nextAccordionId();
        const btnId = `acc-btn-${ID}`;
        const panelId = `acc-panel-${ID}`;

        //== initial state: autoOpen is the authored form, because pgs-state belongs to
        //== the runtime; a pgs-state="open" already written by hand is honoured all the same
        const isOpenInit = pgs(accordion).option.contains("autoOpen") || pgs(accordion).state.contains("open");

        //== an accordion closes the others only inside a group, and the group is the nearest
        //== accordionContainer above it: on its own an accordion answers for itself alone, so a
        //== single panel dropped anywhere on the page no longer collapses somebody else's
        const CONTAINER = pgs(accordion).closest("accordionContainer");
        const isMultiOpen = !CONTAINER || pgs(CONTAINER).option.contains("multiOpen");

        //== accessibility, written once
        BUTTON.setAttribute("role", "button");
        BUTTON.setAttribute("tabindex", "0");
        if (!BUTTON.id) BUTTON.setAttribute("id", btnId);

        if (!CONTENT.id) CONTENT.setAttribute("id", panelId);
        BUTTON.setAttribute("aria-controls", CONTENT.id);
        CONTENT.setAttribute("role", "region");
        CONTENT.setAttribute("aria-labelledby", BUTTON.id);

        //+ Accessibility (writes the open/closed state)
        //== the composed label says what the click does, and is only written when the author has
        //== not named the control themselves: a hand-written aria-label is the page's own wording
        //== and survives every toggle
        const hasAuthorLabel = BUTTON.hasAttribute("aria-label");

        function accordionAccessibility(isOpen, button, content) {
            if (!hasAuthorLabel) {
                const text = (button?.textContent || "").trim().replace(/\s+/g, " ");
                button.setAttribute("aria-label", `${isOpen ? "Close" : "Open"} ${text || "section"}`);
            }
            button.setAttribute("aria-expanded", String(isOpen));
            content.hidden = !isOpen;
        }

        //+ Close the others of the group
        //== only the accordions of this same group: an accordionContainer nested in another one
        //== keeps its own panels to itself, which is why the nearest container is compared rather
        //== than trusting the descendant search. autoOpen is left alone on purpose — it
        //== is the authored "this one stays open", so a sibling opening does not take it down,
        //== and only until the reader works that panel themselves, which drops the token
        function closeOtherAccordion() {
            for (const otherLi of pgs(CONTAINER).querySelectorAll("accordion")) {
                if (otherLi === accordion) continue;
                if (pgs(otherLi).closest("accordionContainer") !== CONTAINER) continue;
                if (pgs(otherLi).option.contains("autoOpen")) continue;

                const otherBtn = pgs(otherLi).querySelector("accordion-button");
                const otherContent = pgs(otherLi).querySelector("accordion-content");
                if (!otherBtn || !otherContent) continue;

                pgs(otherLi).state.remove("open");
                accordionAccessibility(false, otherBtn, otherContent);
            }
        }

        //+ FN ACCORDION
        function accordionFunction() {
            const isOpen = pgs(accordion).state.contains("open");
            const nowOpen = !isOpen;

            pgs(accordion).state.toggle("open", nowOpen);
            accordionAccessibility(nowOpen, BUTTON, CONTENT);

            //== the moment the reader works this panel, autoOpen stops being the authored
            //== "this one stays open": from here on it is an ordinary panel of the group, so a
            //== sibling opening can close it. Guarded, because remove() would otherwise write an
            //== empty pgs-option on every accordion that never had one
            if (pgs(accordion).option.contains("autoOpen")) pgs(accordion).option.remove("autoOpen");
            if (!isMultiOpen) closeOtherAccordion();

            //== scroll to view
            if (nowOpen) setTimeout(() => accordion.scrollIntoView({ block: "nearest", inline: "nearest" }), 100);
        }

        function open() {
            if (!pgs(accordion).state.contains("open")) accordionFunction();
        }

        function close() {
            if (pgs(accordion).state.contains("open")) accordionFunction();
        }

        //== writes that initial state, rather than only reading it: with autoOpen the
        //== pgs-state is not there yet, and it is what the CSS reads to turn the arrow
        pgs(accordion).state.toggle("open", isOpenInit);
        accordionAccessibility(isOpenInit, BUTTON, CONTENT);

        //- Events
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_alert: () => (/* binding */ PGS_alert)
/* harmony export */ });
/* harmony import */ var _helper_text_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/_text.js */ "./assets/javascript/helper/_text.js");


//= PGS_alert
const fn_alert = {
    _defaults: {
        description: "",
        type: {
            error: {
                title: "Error",
                icon: "<i pgs=\"icon['icon-circleXmark']\"></i>"
            },
            success: {
                title: "Success",
                icon: "<i pgs=\"icon['icon-circleCheck']\"></i>"
            },
            info: {
                title: "Information",
                icon: "<i pgs=\"icon['icon-circleInfo']\"></i>"
            },
            warning: {
                title: "Warning",
                icon: "<i pgs=\"icon['icon-triangleExclamation']\"></i>"
            }
        }
    },

    _getContainer(root = document, configuredContainer) {
        if (!(root instanceof Document) && !(root instanceof Element)) {
            throw new TypeError("PGS alert: root must be a Document or an Element");
        }

        let container = configuredContainer;
        if (typeof container === "string") container = root.querySelector(container);
        if (!container) container = pgs(root).querySelector("alertContainer");

        if (container && (!(container instanceof Element) || container === root || !root.contains(container))) {
            throw new TypeError("PGS alert: container must be an element contained in root");
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
        const title = (0,_helper_text_js__WEBPACK_IMPORTED_MODULE_0__.PGS_formatText)(config.title);
        const description = (0,_helper_text_js__WEBPACK_IMPORTED_MODULE_0__.PGS_formatText)(config.description);

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
            throw new TypeError("PGS alert: options must be an object");
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
    const optionValue = pgs(dropdown).data.getValueBrackets("dropdownPosition");
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

    //== exposes the resolved side so a component built on dropdown (e.g. Tooltip) can point an
    //== arrow at the trigger purely in CSS, without recomputing the layout itself
    content.dataset.dropdownSide = side;

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
            //+ recompute where the panel sits, for when its content changed size without reopening
            reposition: () => updateposition(DROPDOWN),
            refresh: () => {
                PGS_dropdown_init(DROPDOWN.parentNode || document);
                updateposition(DROPDOWN);
                return API.get(DROPDOWN);
            },
            isOpen: () => pgs(DROPDOWN).state.contains("open")
        };

        //== click behavior
        TRIGGER.addEventListener("click", (event) => {
            if (isDropdownContent(event.target)) return;
            event.preventDefault();
            event.stopPropagation();
            toggleDropdown(DROPDOWN);
        });

        //== Hover behavior
        if (pgs(DROPDOWN).option.contains("hover")) {
            let hoverCloseTimeout;
            const clearHoverCloseTimeout = () => {
                window.clearTimeout(hoverCloseTimeout);
            };

            TRIGGER.addEventListener("mouseenter", () => {
                clearHoverCloseTimeout();
                if (!API.get(DROPDOWN)?.isOpen()) openDropdown(DROPDOWN);
            });

            CONTENT.addEventListener("mouseenter", clearHoverCloseTimeout);
            DROPDOWN.addEventListener("mouseleave", () => {
                hoverCloseTimeout = window.setTimeout(() => closeDropdown(DROPDOWN), 120);
            });
        }

        CONTENT.addEventListener("click", event => event.stopPropagation());
        API.set(DROPDOWN, data);

        if (data.isOpen()) OPEN_DROPDOWNS.add(DROPDOWN);
        updateposition(DROPDOWN);
    });
    
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_menu: () => (/* binding */ PGS_menu)
/* harmony export */ });
/* harmony import */ var _dropdown__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_dropdown */ "./assets/javascript/components/_dropdown.js");
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");



const API = new WeakMap();
let submenuId = 0;

//+ the toggle looks and sits the same whichever behaviour it drives, so it is built once here
function createToggle(li) {
    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = "<span>&#9207;</span>";

    pgs(button).add("_menu-iconOnly", "button['hoverNot']");
    li.querySelector("a").insertAdjacentElement("afterend", button);

    return button;
}

//+ opens the submenu in place instead of floating it: used everywhere a dropdown would either
//+ overflow the viewport or hide the branch the reader is already inside
function setupAccordion(li, button, ul) {
    pgs(li).add("_menu-accordion");

    if (!ul.id) ul.id = `menu-submenu-${++submenuId}`;
    button.setAttribute("aria-controls", ul.id);

    //== a submenu nested inside a first-level dropdown changes the size of the floating panel,
    //== whose position was computed for the size it had when it opened
    const dropdown = pgs(li).closest("dropdown");

    const setOpen = (open) => {
        pgs(li).state.toggle("open", open);
        button.setAttribute("aria-expanded", String(open));
        if (dropdown) globalThis.pgs?.dropdown?.api(dropdown)?.reposition?.();
    };

    setOpen(pgs(li).state.contains("open"));
    button.addEventListener("click", () => setOpen(!pgs(li).state.contains("open")));
}

function setupDropdown(li, button, ul) {
    pgs(li).add("dropdown");
    pgs(li).data.setValueBrackets("dropdownPosition", "bottom right");
    pgs(button).add("dropdown-button");
    pgs(ul).add("dropdown-content");
}

//= DROP DOWN MENU
function PGS_menu_init(root = document) {

    pgs(root).querySelectorAll('menu').forEach(MENU => {
        if (API.has(MENU)) return;

        const isHorizontal = pgs(MENU).option.contains("horizontal");
        const topLevel = MENU.querySelector("ul");

        MENU.querySelectorAll('li').forEach(li => {
            const ul = li.querySelector("ul");
            if (!ul) return;

            const button = createToggle(li);

            //== only the first level of a horizontal menu floats its submenu: deeper levels would
            //== stack dropdown over dropdown, and a vertical menu has the room to expand in place
            const isFirstLevel = li.parentElement === topLevel;

            if (isHorizontal && isFirstLevel) setupDropdown(li, button, ul);
            else setupAccordion(li, button, ul);
        });

        API.set(MENU, {
            element: MENU,
            type: isHorizontal ? "horizontal" : "vertical",
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

/***/ "./assets/javascript/components/_modal.js"
/*!************************************************!*\
  !*** ./assets/javascript/components/_modal.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_modal: () => (/* binding */ PGS_modal)
/* harmony export */ });
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");


//# MODAL
const EVENT_OPEN = "pgs:modal:open";
const EVENT_CLOSE = "pgs:modal:close";
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
    if (!DIALOG) return;
    const eventController = new AbortController();
    const { signal } = eventController;
    let historyObserver = null;
    let historyTimeout = null;

    //== SELECTOR
    const DOMButtonClose = "<button pgs=\"button['iconOnly' 'mini'] modal-close\" type=\"button\" tabindex=\"0\" aria-label=\"Close\"><i pgs=\"icon['icon-close']\"></i></button>";
    const modalContentHeader = pgs(DIALOG).querySelector("modal-dialog-content-header");

    //== FOCUS
    //== with no autofocus element inside, showModal() falls back to focusing the first
    //== focusable descendant (per the HTML dialog spec), which makes whatever happens to sit
    //== first — often a plain nav link — look pre-selected. Move focus to the header instead
    //== (its text is what a screen reader should announce on open), or the dialog itself when
    //== there's no header; tabindex="-1" keeps it out of the normal tab order.
    const focusTarget = modalContentHeader || DIALOG;
    if (!focusTarget.hasAttribute("tabindex")) focusTarget.setAttribute("tabindex", "-1");


    //== MERGE OPTIONS
    //== Modal configuration may be authored on either wrapper or dialog. Copy only modal
    //== options: other component brackets (for example flex on the wrapper) stay local.
    //== modal-dialog itself always stays bare, like every other generated child token — its own
    //== options land on _dialog instead, a second, pgs-generated-only token on the same <dialog>
    //== element that exists purely to carry them (see AGENTS-DEVELOPMENT.md).
    pgs(DIALOG).add("modal-dialog", "_dialog");
    for (const key of [
        "dialogHistory", "dialogTopLevel", "dialogDisableBackdropClose", "dialogMini",
        "dialogMedium", "dialogFull", "dialogCenter", "dialogLeft", "dialogRight", "dialogTop", "dialogBottom"
    ]) {
        const source = [MODAL, DIALOG].find(element => pgs(element).option.contains(key));
        if (!source) continue;
        pgs(MODAL).add(`modal['${key}']`);
        pgs(DIALOG).option.remove(key);
        pgs(DIALOG).add(`_dialog['${key}']`);
    }

    //== these two carry a value, so they still live in pgs-data — option never checks pgs-data,
    //== so presence is a getValueBrackets read instead of an option.contains() call
    for (const key of ["modalContainerID", "modalContainerPGS"]) {
        const source = [MODAL, DIALOG].find(element => pgs(element).data.getValueBrackets(key) !== undefined);
        if (!source) continue;
        const value = pgs(source).data.getValueBrackets(key);
        for (const target of [MODAL, DIALOG]) pgs(target).data.setValueBrackets(key, value);
    }

    //== OPTION ATTRIBUTES MODAL
    const dialogDisableBackdropClose = pgs(MODAL).option.contains("dialogDisableBackdropClose");
    const data_history = pgs(MODAL).option.contains("dialogHistory");
    const data_container = pgs(MODAL).data.getValueBrackets("modalContainerID");
    const data_modalContainerPGS = pgs(MODAL).data.getValueBrackets("modalContainerPGS");

    //== OPTION ATTRIBUTES DIALOG
    const dialogTopLevel = pgs(DIALOG).option.contains("dialogTopLevel");


    //== BUTTON CLOSE
    if (!pgs(DIALOG).querySelector("modal-close") && !pgs(MODAL).querySelector("modal-close")) {
        if (modalContentHeader) modalContentHeader.insertAdjacentHTML("beforeend", DOMButtonClose);
        else DIALOG.insertAdjacentHTML("beforeend", DOMButtonClose);
    }
    const BUTTON_CLOSE = pgs(DIALOG).querySelector("modal-close") || pgs(MODAL).querySelector("modal-close");


    //== SET
    pgs(DIALOG).add("modal-dialog");

    //== BUTTON OPEN
    //== the label is a fallback, not a correction: a control the author has already named keeps
    //== that name, which is the one the page is written around
    BUTTON_OPEN?.setAttribute("role", "button");
    if (BUTTON_OPEN && !BUTTON_OPEN.hasAttribute("aria-label")) BUTTON_OPEN.setAttribute("aria-label", "Open modal");


    //== POSITION
    if (dialogTopLevel && !MODAL.contains(DIALOG)) MODAL.append(DIALOG);
    else if (!dialogTopLevel) {
        if (data_container) document.querySelector("#" + data_container)?.append(DIALOG);
        else if (data_modalContainerPGS) pgs(document).querySelector(data_modalContainerPGS)?.append(DIALOG);
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
        dialogTopLevel ? DIALOG.showModal() : DIALOG.show();
        //== respect an explicit autofocus target inside the dialog when the author set one
        if (!DIALOG.querySelector("[autofocus]")) focusTarget.focus();
        //== dispatched on both, and neither bubbles: a listener sits on whichever of the two it
        //== already holds, and never receives the same opening twice
        MODAL.dispatchEvent(new CustomEvent(EVENT_OPEN));
        DIALOG.dispatchEvent(new CustomEvent(EVENT_OPEN));
    }

    //+ FN CLOSE
    function closeModal(e) {
        e?.stopImmediatePropagation()
        statusModal(false);
        DIALOG.close();
        MODAL.dispatchEvent(new CustomEvent(EVENT_CLOSE));
        DIALOG.dispatchEvent(new CustomEvent(EVENT_CLOSE));
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
        document.getElementById(BUTTON_OPEN.id)?.scrollIntoView({ behavior: 'smooth' });
        openModal();
    }


    //= OPEN
    BUTTON_OPEN?.addEventListener("click", (e) => openModal(e), { signal });
    BUTTON_OPEN?.addEventListener("keypress", (e) => !DIALOG.open && (e.key === "Enter" || e.key === " ") && openModal(e), { signal });

    //= CLOSE
    DIALOG.addEventListener("close", () => statusModal(false), { signal });
    DIALOG.addEventListener("click", e => { if (e.target == DIALOG && !dialogDisableBackdropClose) closeModal(e) }, { signal });
    BUTTON_CLOSE?.addEventListener("click", e => closeModal(e), { signal });

    //= UPDATE HISTORY
    if (data_history && BUTTON_OPEN?.id) {
        historyTimeout = window.setTimeout(openModalOnHistory, 1);

        //== keeps the URL in step with the dialog's own "open" attribute
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

        //== back and forward in the browser open and close the dialog to match
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

/***/ "./assets/javascript/components/_notification.js"
/*!*******************************************************!*\
  !*** ./assets/javascript/components/_notification.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_notification: () => (/* binding */ PGS_notification)
/* harmony export */ });
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");
/* harmony import */ var _helper_text_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/_text.js */ "./assets/javascript/helper/_text.js");



//= PGS_notification
const fn_notification = {
    _uid: 0,
    _defaults: {
        id: null,
        buttons: [],
        description: "",
        closeTitle: "Close",
        emptyMessage: "No notifications",
        panelCloseTitle: "Close",
        type: {
            //== the plain one: no severity colour, no glyph, no title of its own — just the
            //== message on the box surface the panel already defaults to
            neutral: {
                title: "",
                icon: ""
            },
            error: {
                title: "Error",
                icon: "<i pgs=\"icon['icon-circleXmark']\"></i>"
            },
            success: {
                title: "Success",
                icon: "<i pgs=\"icon['icon-circleCheck']\"></i>"
            },
            info: {
                title: "Information",
                icon: "<i pgs=\"icon['icon-circleInfo']\"></i>"
            },
            warning: {
                title: "Warning",
                icon: "<i pgs=\"icon['icon-triangleExclamation']\"></i>"
            }
        }
    },

    _getType(notification) {
        const type = String(notification.type || "info").trim();
        return typeof PGS_notification[type] === "function" ? type : "info";
    },

    _getData(root) {
        const rawNotification = pgs(root).data.getValueBrackets("notification") || "{}";

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
        const safeDescription = (0,_helper_text_js__WEBPACK_IMPORTED_MODULE_1__.PGS_formatText)(description);
        const safeTitle = (0,_helper_text_js__WEBPACK_IMPORTED_MODULE_1__.PGS_formatText)(title);

        if (!safeTitle) return `<span>${safeDescription}</span>`;
        if (!safeDescription) return `<strong>${safeTitle}</strong>`;

        return `
            <strong>${safeTitle}</strong>
            <span>${safeDescription}</span>
        `;
    },

    _getContainer() {
        return pgs(document).querySelector("_notifications");
    },

    _getOrCreateContainer() {
        let containerNotification = this._getContainer();

        if (!containerNotification) {
            containerNotification = document.createElement("div");
            pgs(containerNotification).add("_notifications");
            containerNotification.setAttribute("aria-live", "polite");
            containerNotification.setAttribute("aria-relevant", "additions");
            document.body.appendChild(containerNotification);
        }

        return containerNotification;
    },

    show(type, options = {}) {
        if (typeof options === "string") options = { title: options };

        if (!options || typeof options !== "object" || Array.isArray(options)) {
            throw new TypeError("PGS notification: options must be an object or a string");
        }

        const { type: typeDefaults, ...defaults } = this._defaults;
        //== null is not a value here, it is "leave it to the type": the JSON path already reads it
        //== that way (notification.icon || undefined), so the JS API answers the same
        const definedOptions = Object.fromEntries(
            Object.entries(options).filter(([, value]) => value !== undefined && value !== null)
        );
        const config = {
            ...defaults,
            ...typeDefaults[type],
            ...definedOptions,
            type
        };

        return this.initNotification(config);
    },

    initNotification({
        type,
        id,
        title,
        icon,
        description,
        buttons,
        closeTitle
    }) {
        const containerNotification = this._getOrCreateContainer();
        const text = this._getContent(title, description);
        const notificationId = id ?? `notification-${++this._uid}`;

        //== Create Notification
        const notification = document.createElement("div");
        notification.dataset.notificationId = notificationId;
        pgs(notification).state.add(type);
        pgs(notification).add("_notifications-element");
        notification.setAttribute("role", type == "error" ? "alert" : "status");
        //== a type without a glyph (neutral, or an explicit icon: "") must not leave an empty box
        //== behind: the row is a grid with a gap, so the empty div would still push the text over
        const iconHtml = icon ? `<div pgs="_notifications-element-content-icon">${icon}</div>` : "";

        notification.innerHTML = `
            <div pgs="_notifications-element-content">
                ${iconHtml}
                <p>${text}</p>
                <button type="button" pgs="button['iconOnly'] _notifications-element-content-delete"><i pgs="icon['icon-close']"></i></button>
            </div>
            <div pgs="_notifications-element-buttons">
            </div>
        `;

        const notificationButtons = pgs(notification).querySelector("_notifications-element-buttons");
        const btnDelete = pgs(notification).querySelector("_notifications-element-content-delete");
        //== the dismiss button draws a cross, so closeTitle is its accessible name and nothing else.
        //== Set as a property rather than written into the template above: no escaping to get wrong
        btnDelete.ariaLabel = closeTitle === "Close" ? "Close notification" : closeTitle;

        //+ Animation delete
        function deleteNotification() {
            notification.style.translate = "120%";
            setTimeout(() => {
                notification.dispatchEvent(new CustomEvent("pgs:notification:close", {
                    bubbles: true,
                    detail: { id: notificationId, type, title, description }
                }));
                notification.remove();
                fn_notification._updateBellCounter();
            }, 300);
        }

        (buttons || []).forEach((button, index) => {
            const buttonId = button.id ?? `${notificationId}-button-${index + 1}`;
            const buttonElement = button.link ? document.createElement("a") : document.createElement("button");
            if (button.link) buttonElement.href = button.link;
            else buttonElement.type = "button";
            buttonElement.textContent = button.title;
            pgs(buttonElement).add("button['transparent']");
            if (button.optionButton) pgs(buttonElement).add(`button['${button.optionButton}']`);

            buttonElement.addEventListener("click", (e) => {
                const proceed = buttonElement.dispatchEvent(new CustomEvent("pgs:notification:buttonClick", {
                    bubbles: true,
                    cancelable: true,
                    detail: { id: notificationId, buttonId, type, title, description, link: button.link }
                }));

                if (button.link && !proceed) e.preventDefault();
                if (button.close !== false) deleteNotification();
            });

            notificationButtons.appendChild(buttonElement);
        });

        //== the row carries a padding and a tinted strip of its own, so an empty one is not
        //== invisible: it has to be taken out of the layout. The default is [], never a falsy value
        if (!buttons?.length) pgs(notificationButtons).add("hidden");

        containerNotification.appendChild(notification);
        this._updateBellCounter();

        //== event
        btnDelete.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation()
            deleteNotification();
        });
    },

    deleteAll() {
        const containerNotification = this._getContainer();

        if (containerNotification) {
            //== only the notifications go: the panel also holds its own close button, and emptying
            //== the whole container would take that with them
            const elements = Array.from(pgs(containerNotification).querySelectorAll("_notifications-element"));
            const ids = elements.map(element => element.dataset.notificationId);

            elements.forEach(element => element.remove());
            containerNotification.dispatchEvent(new CustomEvent("pgs:notification:deleteAll", {
                bubbles: true,
                detail: { ids }
            }));
        }

        this._updateBellCounter();
    },

    _updateBellCounter() {
        const container = this._getContainer();
        const count = container ? pgs(container).querySelectorAll("_notifications-element").length : 0;

        pgs(document).querySelectorAll("notificationBell-counter").forEach(counter => {
            counter.textContent = count > 0 ? count : "";
        });

        if (!container) return;

        let emptyMessage = pgs(container).querySelector("_notifications-empty");

        if (count === 0) {
            if (!emptyMessage) {
                emptyMessage = document.createElement("p");
                pgs(emptyMessage).add("_notifications-empty");
                container.appendChild(emptyMessage);
            }
            emptyMessage.textContent = this._defaults.emptyMessage;
        } else {
            emptyMessage?.remove();
        }
    },

    _dispatch(element) {
        this._getData(element).forEach(notification => {
            const title = String(notification.title || "").trim();
            const description = String(notification.description ?? notification.message ?? "").trim();
            const closeTitle = String(notification.closeTitle || notification["title-close"] || this._defaults.closeTitle).trim();

            if (!title && !description) return;

            const icon = notification.icon || undefined;
            const id = notification.id || this._defaults.id;
            const buttons = Array.isArray(notification.buttons) ? notification.buttons : this._defaults.buttons;
            const type = this._getType(notification);

            PGS_notification[type]({
                title,
                description,
                icon,
                buttons,
                closeTitle,
                id
            });
        });
    },

    load(root = document) {
        pgs(root).querySelectorAll("notificationLoad").forEach(element => {
            if (!element || element.dataset.initialize === "true") return;

            element.dataset.initialize = "true";
            this._dispatch(element);
            element.remove();
        });
    },

    //+ generates <dialog pgs="modal-dialog _dialog['dialogRight' 'dialogMini' 'dialogTop']"><div pgs="modal-dialog-content"><div pgs="_notifications"></div></div></dialog>
    //+ inside the modal wrapping notificationBell, then asks pgs.modal to (re)initialize it.
    _ensureDialog(root = document) {
        let created = false;

        pgs(root).querySelectorAll("notificationBell").forEach(bell => {
            const modalWrapper = pgs(bell).closest("modal");
            if (!modalWrapper || modalWrapper.querySelector("dialog")) return;

            //== modalContainerID/modalContainerPGS move the dialog out of the wrapper, so on a later
            //== pgs.init() the wrapper looks empty again: without this marker every re-init
            //== would mint another empty panel and the bell would end up opening one of those.
            if (modalWrapper.dataset.notificationDialog === "true") return;
            modalWrapper.dataset.notificationDialog = "true";

            const dialog = document.createElement("dialog");
            pgs(dialog).add("modal-dialog");
            pgs(dialog).add("_notificationsDialog");
            pgs(modalWrapper).add("modal['dialogRight' 'dialogMini' 'dialogTop']");

            const content = document.createElement("div");
            pgs(content).add("modal-dialog-content");
            pgs(content).add("_notifications");

            //== the panel had no closer of its own: the bell was the only one, so the modal wired
            //== its close to that. Written first, it sits above the first notification, and being
            //== inside the dialog it is the one pgs.modal picks up (the bell keeps toggling on its
            //== own modal-button, since openModal already closes an open dialog)
            const closeButton = document.createElement("button");
            closeButton.type = "button";
            closeButton.textContent = this._defaults.panelCloseTitle;
            pgs(closeButton).add("button['mini']", "modal-close", "_notifications-close");
            content.appendChild(closeButton);

            dialog.appendChild(content);
            modalWrapper.appendChild(dialog);
            created = true;
        });

        if (created) globalThis.pgs?.modal?.init(document);
    }
};

//# TRIGGER
//+ opening/closing the panel is handled entirely by the modal wrapping notificationBell + the dialog; see reference markup.
function PGS_notificationLoad_init(root = document) {
    fn_notification._ensureDialog(root);
    fn_notification.load(root);
    fn_notification._updateBellCounter();
}

const PGS_notification = {
    init: PGS_notificationLoad_init,
    trigger: PGS_notificationLoad_init,
    error: (options = {}) => fn_notification.show("error", options),
    success: (options = {}) => fn_notification.show("success", options),
    info: (options = {}) => fn_notification.show("info", options),
    warning: (options = {}) => fn_notification.show("warning", options),
    neutral: (options = {}) => fn_notification.show("neutral", options),
    deleteAll: () => fn_notification.deleteAll()
};


//= EXECUTE
(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__.PGS_onDocumentReady)(PGS_notificationLoad_init);


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

const Search = {
    nextSearchId() {
        searchId += 1;
        return searchId;
    },

    getSearches(root) {
        const searches = root instanceof Element && pgs(root).contains("search") ? [root] : [];
        searches.push(...pgs(root).querySelectorAll("search"));
        return searches;
    },

    directPgsChild(element, token) {
        return Array.from(element.children).find(child => pgs(child).contains(token));
    },

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

        pgs(search).state.remove("open");
        data.input.setAttribute("aria-expanded", "false");
        data.input.removeAttribute("aria-activedescendant");
        data.list.setAttribute("aria-hidden", "true");
        data.setActiveIndex(-1);
        OPEN_SEARCHES.delete(search);
    },

    openSearch(search, force = false) {
        const data = API.get(search);
        if (!data || (!force && data.items().length === 0)) return;

        pgs(search).state.add("open");
        data.input.setAttribute("aria-expanded", "true");
        data.list.setAttribute("aria-hidden", "false");
        OPEN_SEARCHES.add(search);
    },

    placeholderText(search, options) {
        const template = pgs(search).data.getValueBrackets("searchPlaceholder") || "Type at least {minLength} characters";
        return template.replace("{minLength}", options.minLength);
    },

    noResultsText(search) {
        return pgs(search).data.getValueBrackets("searchNoResults") || "No results found";
    },
};

function PGS_search_init(root = document) {
    Search["getSearches"](root).forEach(search => {
        if (API.has(search)) return;

        const input = search.querySelector('input[type="search"]');
        const list = Search["directPgsChild"](search, "search-suggestions");
        if (!input || !list) return;

        const id = Search["nextSearchId"]();
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
            const elements = Array.from(pgs(list).querySelectorAll("_search-suggestions-item"));

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
            Search["closeSearch"](search);
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
                .map(Search["normalizeItem"])
                .filter(Boolean)
                .slice(0, options.limit);

            pgs(search).state.remove("error");

            if (!items.length) {
                showNoResults();
                return items;
            }

            const fragment = document.createDocumentFragment();
            items.forEach((item, index) => {
                const option = document.createElement("li");
                pgs(option).add("_search-suggestions-item");
                pgs(option).add("flex['row']");
                option.id = `${list.id}-option-${index}`;
                option.dataset.index = String(index);
                option.setAttribute("role", "option");
                option.setAttribute("aria-selected", "false");
                option.setAttribute("aria-disabled", String(item.disabled));
                option.innerHTML = "<i pgs=\"icon['icon-magnifyingGlass']\"></i>" +  item.label;
                fragment.append(option);

            });

            activeIndex = -1;
            list.replaceChildren(fragment);
            Search["openSearch"](search);

            return items;
        }

        async function resolveSource(query, signal) {
            if (Array.isArray(options.source)) {
                const normalizedQuery = query.toLocaleLowerCase();
                return options.source.filter(item => {
                    const normalized = Search["normalizeItem"](item);
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

        function showMessage(option) {
            items = [];
            activeIndex = -1;

            option.setAttribute("aria-disabled", "true");
            list.replaceChildren(option);

            Search["openSearch"](search, true);
        }

        function showPlaceholder() {
            const option = document.createElement("li");
            pgs(option).add("_search-suggestions-placeholder");
            option.textContent = Search["placeholderText"](search, options);
            showMessage(option);
        }

        function showNoResults() {
            const option = document.createElement("li");
            pgs(option).add("_search-suggestions-empty");
            option.textContent = Search["noResultsText"](search);
            showMessage(option);
        }

        function schedule() {
            cancel();
            clear();
            pgs(search).state.remove("error");

            if (!options.source) return;

            if (input.value.trim().length < options.minLength) {
                showPlaceholder();
                return;
            }

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
            options = Search["normalizeOptions"](options, nextOptions);
            return api;
        }

        function onInput() {
            schedule();
        }

        function onFocus() {
            if (items.length) Search["openSearch"](search);
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
                Search["closeSearch"](search);
                return;
            }

            if (event.key === "Tab") Search["closeSearch"](search);
        }

        function onListPointerDown(event) {
            const option = pgs(event.target).closest("_search-suggestions-item");
            if (!option || !list.contains(option)) return;
            event.preventDefault();
            select(Number.parseInt(option.dataset.index, 10));
        }

        function onSubmit() {
            cancel();
            Search["closeSearch"](search);
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
            open: () => Search["openSearch"](search),
            close: () => Search["closeSearch"](search),
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
        if (!search.contains(event.target)) Search["closeSearch"](search);
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_slides: () => (/* binding */ PGS_slides)
/* harmony export */ });
/* harmony import */ var _helper_scrollHorizontal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/_scrollHorizontal.js */ "./assets/javascript/helper/_scrollHorizontal.js");
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
            EL.insertAdjacentHTML("afterbegin", `<button pgs="slides-prec button['iconOnly' 'mini']" type="button" class="precButton" aria-label="Previous slide"> <i pgs="icon['icon-chevronDown'] rotate['90']"></i></button>`);
        }
        if (!pgs(EL).querySelector('slides-next')) {
            EL.insertAdjacentHTML("beforeend", `<button pgs="slides-next button['iconOnly' 'mini']" type="button" class="nextButton" aria-label="Next slide"> <i pgs="icon['icon-chevronDown'] rotate['270']"></i></button>`);
        }

        //== DOTS
        if (!pgs(EL).querySelector('slides-dots')) {
            EL.insertAdjacentHTML("beforeend", `<div pgs="slides-dots"></div>`);
        }

        const dotsContainer = pgs(EL).querySelector('slides-dots');
        while (dotsContainer.children.length < this.container.children.length) {
            dotsContainer.insertAdjacentHTML("beforeend", `<button pgs="_slides-dots-dot" type="button"></button>`);
        }
        while (dotsContainer.children.length > this.container.children.length) {
            dotsContainer.lastElementChild.remove();
        }
        //== the token goes on every child, not only the ones built here: a dots container written
        //== by hand is filled and labelled the same way, and the stylesheet has one thing to look for
        Array.from(dotsContainer.children).forEach((dot, index) => {
            pgs(dot).add("_slides-dots-dot");
            dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
        });
    }

    //+ SLIDE THE ARROWS MOVE FROM
    //== singleScroll starts from the middle one in view, the one the snap is resting on: from the
    //== first, with three slides showing, the next sibling is already centred and nothing scrolls
    #currentSlide(towardsEnd) {
        //== arrow function: a declared one would have its own this and throw here
        const nearestSlide = () => {
            const box = this.container.getBoundingClientRect();
            const middle = (box.left + box.right) / 2;

            return Array.from(this.container.children).reduce((nearest, slide) => {
                const slideBox = slide.getBoundingClientRect();
                const distance = Math.abs((slideBox.left + slideBox.right) / 2 - middle);
                return !nearest || distance < nearest.distance ? { slide, distance } : nearest;
            }, null)?.slide;
        };

        const currents = pgs(this.container).state.querySelectorAll("view");
        if (!currents.length) return nearestSlide();

        //== the middle of an even number of slides falls between two of them, so each arrow takes
        //== the one on its own side: rounded down going forward, up going back. Rounding down for
        //== both, as this did, left the two arrows starting from the same slide, and going back
        //== then covered a slide more than going forward did
        if (pgs(this.element).option.contains('singleScroll')) {
            const middle = (currents.length - 1) / 2;
            return currents[towardsEnd ? Math.floor(middle) : Math.ceil(middle)];
        }

        return towardsEnd ? currents[currents.length - 1] : currents[0];
    }

    //+ GO TO A SLIDE
    //== the two ends run the scroll out instead of centring, so the margin they carry is scrolled
    //== through and the card lines up with the page content
    #goToSlide(slide) {
        if (!slide) return;

        const all = this.container.children;
        const behavior = this.scrollOptions.behavior;

        //== FIRST SLIDE
        if (slide === all[0]) this.container.scrollTo({ left: 0, behavior });
        //== LAST SLIDE
        else if (slide === all[all.length - 1]) this.container.scrollTo({ left: this.container.scrollWidth, behavior });
        //== SLIDE
        //== the centring is measured and applied to the track alone. scrollIntoView would do the
        //== same arithmetic, but by definition it walks up every scrollable ancestor and leaves
        //== each one to the engine's reading of block: "nearest" — which is why Safari answers an
        //== arrow by scrolling the page vertically as well. A horizontal carousel needs nothing
        //== above the track to move, so nothing above the track is asked to
        else {
            const trackBox = this.container.getBoundingClientRect();
            const slideBox = slide.getBoundingClientRect();
            const distanceFromCentre = (slideBox.left + slideBox.width / 2) - (trackBox.left + trackBox.width / 2);
            this.container.scrollTo({ left: this.container.scrollLeft + distanceFromCentre, behavior });
        }

        slide.focus({ preventScroll: true });
    }

    //+ PREV
    //== no slide left to move to, but the scroll has not run out: the edge slide is showing with
    //== its margin still to come, so the arrow finishes the scroll instead of doing nothing
    #previousSlide() {
        const all = this.container.children;
        this.#goToSlide(this.#currentSlide(false)?.previousElementSibling ?? all[0]);
    }

    //+ NEXT
    #nextSlide() {
        const all = this.container.children;
        this.#goToSlide(this.#currentSlide(true)?.nextElementSibling ?? all[all.length - 1]);
    }

    //+ GO TO NUMBER SLIDE
    #goToNumberSlide(index) {
        this.#goToSlide(this.container.children[index]);
    }

    //+ CALLBACK
    #callback(allLi, container, precButton, nextButton, dots) {
        allLi.forEach(LI => {
            //== visiblePercent only feeds the scale animation; the threshold is viewRatio, which
            //== used to be a stored and never read parameter, with 0.8 hardcoded here instead
            const visiblePercent = 0.9 + LI.intersectionRatio * 0.1;
            const isView = LI.intersectionRatio >= this.viewRatio;

            //== SCROLL ANIMATION
            if (LI.target.firstElementChild) {
                LI.target.firstElementChild.style.setProperty('--slides-visiblePercent', `${visiblePercent}`);
            };

            //== VIEW & NOT-VIEW
            //== both are written: notView says the observer has run and put this slide outside the
            //== view, which :not([pgs-state~="view"]) cannot tell apart from the state before the
            //== first pass, when no slide carries either
            pgs(LI.target).state.toggle("view", isView);
            pgs(LI.target).state.toggle("notView", !isView);

            //== ACTIVE DOT
            const viewElements = Array.from(container.children).filter(el => pgs(el).state.contains("view"));
            dots.forEach((btn, i) => {
                const isActive = viewElements.some(el => Array.from(container.children).indexOf(el) === i);
                pgs(btn).state.toggle("active", isActive);
                btn.setAttribute('aria-current', isActive ? 'true' : 'false');
            });
        })

        this.#updateArrows(precButton, nextButton);
    }

    //+ ARROWS STATE
    //== an arrow goes off only at the end of the scroll, not as soon as the edge slide is in view:
    //== that slide carries a margin, so it can be entirely on screen with a stretch still to run,
    //== and the arrow is what runs it
    #updateArrows(precButton, nextButton) {
        const atStart = this.container.scrollLeft <= 1;
        const atEnd = this.container.scrollLeft >= this.container.scrollWidth - this.container.clientWidth - 1;

        nextButton.disabled = atEnd;
        precButton.disabled = atStart;
        nextButton.setAttribute('aria-disabled', String(atEnd));
        precButton.setAttribute('aria-disabled', String(atStart));
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
        const scrollMouse = pgs(slides).option.contains('scrollMouse');

        //== scroll
        const removeHorizontalScroll = scrollMouse
            ? (0,_helper_scrollHorizontal_js__WEBPACK_IMPORTED_MODULE_0__.PGS_scrollHorizontalWithMouse)(this.container, 5)
            : null;

        //==Listener: DOT, PREC, NEXT
        dots.forEach((dot, index) => dot.addEventListener("click", () => this.#goToNumberSlide(index), { signal }));
        precButton.addEventListener("click", () => this.#previousSlide(), { passive: true, signal });
        nextButton.addEventListener("click", () => this.#nextSlide(), { passive: true, signal });

        //== the observer answers what is visible, not where the scroll is: the last stretch can
        //== settle with no threshold left to cross, so the arrows are refreshed on scroll too
        let arrowsFrame = 0;
        this.container.addEventListener("scroll", () => {
            if (arrowsFrame) return;
            arrowsFrame = requestAnimationFrame(() => {
                arrowsFrame = 0;
                this.#updateArrows(precButton, nextButton);
            });
        }, { passive: true, signal });
        this.#updateArrows(precButton, nextButton);

        //== observer
        const observer = new IntersectionObserver(
            (allLi) => this.#callback(allLi, this.container, precButton, nextButton, dots),
            { root: this.container, ...this.optionIntersectionObserver }
        );
        Array.from(this.container.children).forEach(allLi => observer.observe(allLi));

        //== HEIGHT
        //== the track's height published on the root as --slides-height, so the CSS can place
        //== something against the slides themselves rather than against the whole component: the
        //== arrows sit at half of it, and stay centred on the slides whatever else the root holds.
        //== Measured rather than computed because the height comes from the tallest slide, which
        //== only the layout knows — through a rAF, like the header does, so a write never lands
        //== inside the callback that observed it
        let heightFrame = 0;
        const heightObserver = new ResizeObserver(() => {
            if (heightFrame) return;
            heightFrame = requestAnimationFrame(() => {
                heightFrame = 0;
                this.element.style.setProperty("--slides-height", `${this.container.offsetHeight}px`);
            });
        });
        heightObserver.observe(this.container);


        let api;
        const destroy = () => {
            if (API.get(this.element) !== api) return;
            eventController.abort();
            observer.disconnect();
            heightObserver.disconnect();
            if (heightFrame) cancelAnimationFrame(heightFrame);
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
            getCurrentIndexes: () => Array.from(this.container.children).map((el, i) => pgs(el).state.contains("view") ? i : -1).filter(i => i !== -1),
            getCurrentElements: () => Array.from(this.container.children).filter(el => pgs(el).state.contains("view")),
            getTotal: () => this.container.children.length,
            //== same reading as the arrows: the end of the scroll, not the edge slide being in view
            isAtStart: () => this.container.scrollLeft <= 1,
            isAtEnd: () => this.container.scrollLeft >= this.container.scrollWidth - this.container.clientWidth - 1,
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
        const allTab = pgs(tabsContainer).querySelectorAll("stepTabs-container-tab");

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
                const authoredIcon = (pgs(tab).data.getValueBrackets("stepTabsIcon") || "").trim();
                const dot = document.createElement("button");
                dot.type = "button";
                pgs(dot).add("_stepTabs-dots-dot");
                pgs(dot).add("button['iconOnly' 'hoverNot']");
                //== stepTabsIcon takes three shapes, told apart by how the value opens. Markup, from a
                //== "<", is instantiated as written: that is what puts every icon set in reach,
                //== including the ones a class list cannot describe because they want their name as
                //== text content or an attribute of their own. An "icon-" prefix is a built-in
                //== glyph. Anything else is classes for whatever set the page loaded
                if (authoredIcon.startsWith("<")) {
                    //== a template rather than innerHTML on the dot: template content stays inert
                    //== while it parses, so nothing in the author's markup runs or loads until the
                    //== clone is in the document
                    const authoredMarkup = document.createElement("template");
                    authoredMarkup.innerHTML = authoredIcon;
                    dot.replaceChildren(authoredMarkup.content.cloneNode(true));
                } else {
                    const dotIcon = document.createElement("i");

                    if (!authoredIcon || authoredIcon.startsWith("icon-")) {
                        pgs(dotIcon).add(`icon['${authoredIcon || "icon-circle"}']`);
                    } else {
                        pgs(dotIcon).add("icon");
                        //== a full list goes through untouched, whatever set it belongs to. A lone
                        //== Font Awesome name is completed with its style class, because that set
                        //== needs one and markup written before other sets were supported relies on it
                        dotIcon.className = /^fa-\S+$/.test(authoredIcon)
                            ? `fa-solid ${authoredIcon}`
                            : authoredIcon;
                    }

                    dot.replaceChildren(dotIcon);
                }

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

            tabsWizard.dispatchEvent(new CustomEvent('pgs:stepTabs:change', { detail: { current, total } }));
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
    const summaryData = pgs(summary).data;
    Object.entries(messages).forEach(([key, message]) => {
        if (summaryData.getValueBrackets(key) === undefined) summaryData.setValueBrackets(key, message);
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
            button.textContent = pgs(summary).data.getValueBrackets(
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

/***/ "./assets/javascript/components/_tabs.js"
/*!***********************************************!*\
  !*** ./assets/javascript/components/_tabs.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_tabs: () => (/* binding */ PGS_tabs)
/* harmony export */ });
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");


const API = new WeakMap();
let tabsId = 0;

function nextTabsId() {
    tabsId += 1;
    return tabsId;
}

function directPgsChildren(element, token) {
    return Array.from(element.children).filter(child => pgs(child).contains(token));
}

function tabRoots(root) {
    const roots = [];
    if (root instanceof Element && pgs(root).contains("tabs")) roots.push(root);
    roots.push(...pgs(root).querySelectorAll("tabs"));
    return roots;
}

function PGS_tabs_init(root = document) {
    tabRoots(root).forEach((tabs) => {
        if (API.has(tabs)) return;

        const list = directPgsChildren(tabs, "tabs-list")[0];
        const panels = directPgsChildren(tabs, "tabs-panels")[0];
        if (!list || !panels) return;

        const buttons = directPgsChildren(list, "tabs-list-tab");
        const panelItems = directPgsChildren(panels, "tabs-panels-content");
        if (!buttons.length || buttons.length !== panelItems.length) return;

        const id = nextTabsId();
        list.setAttribute("role", "tablist");

        //== HISTORY
        //== the parameter is named by the option, so two history-backed sets on one page do not
        //== write over each other. A tab is addressed by its own id when the author gave it one,
        //== and by its 1-based position otherwise, which is what keeps a shared link readable
        //== without asking for ids that the markup does not need
        //== tabsHistory lives only in pgs-data and .data has no contains(), so presence (with or
        //== without its own payload) is checked directly against the raw attribute value
        const rawData = (pgs(tabs).data.value || "").split(/\s+/).filter(Boolean);
        const hasHistory = rawData.some(token => token === "tabsHistory" || token.startsWith("tabsHistory["));
        const historyKey = hasHistory
            ? (pgs(tabs).data.getValueBrackets("tabsHistory") || "tab")
            : null;

        //== read before the loop below fills in the generated ids, so what reaches the URL is the
        //== author's own name for the tab or nothing at all — never tabs-list-tab-1-2
        const authoredIds = buttons.map(button => button.id || "");

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
            panelItems.findIndex(panel => pgs(panel).state.contains("active")),
            buttons.findIndex(button => pgs(button).state.contains("active")),
            0,
        );

        function setState(element, active) {
            pgs(element).state.toggle("active", active);
        }

        function select(index, focus = false, history = true) {
            if (!Number.isInteger(index) || index < 0 || index >= buttons.length) return;
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
            tabs.dispatchEvent(new CustomEvent("pgs:tabs:change", {
                detail: { current, tab: buttons[current], panel: panelItems[current] },
            }));
        }

        buttons.forEach((button, index) => {
            const buttonId = button.id || `tabs-list-tab-${id}-${index + 1}`;
            const panelId = panelItems[index].id || `tabs-panels-content-${id}-${index + 1}`;

            button.id = buttonId;
            button.type = "button";
            button.setAttribute("role", "tab");
            button.setAttribute("aria-controls", panelId);

            panelItems[index].id = panelId;
            panelItems[index].setAttribute("role", "tabpanel");
            panelItems[index].setAttribute("aria-labelledby", buttonId);

            button.addEventListener("click", () => select(index));
            button.addEventListener("keydown", (event) => {
                let next = null;
                if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (current + 1) % buttons.length;
                if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (current - 1 + buttons.length) % buttons.length;
                if (event.key === "Home") next = 0;
                if (event.key === "End") next = buttons.length - 1;
                if (next === null) return;

                event.preventDefault();
                select(next, true);
            });
        });

        //== the URL wins over the state written in the markup: a reload lands on the tab the reader
        //== left, and the first pass only reads it — it never pushes an entry of its own
        const restored = indexFromHistory();
        select(restored === -1 ? current : restored, false, false);

        if (historyKey) {
            window.addEventListener("popstate", () => {
                const index = indexFromHistory();
                select(index === -1 ? 0 : index, false, false);
            });
        }

        API.set(tabs, {
            element: tabs,
            list,
            panels,
            select: (index) => select(index),
            getCurrent: () => current,
            refresh: () => {
                PGS_tabs_init(tabs.parentNode || document);
                return API.get(tabs);
            },
        });
    });
}

(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__.PGS_onDocumentReady)(PGS_tabs_init);

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
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");
/* harmony import */ var _helper_text_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/_text.js */ "./assets/javascript/helper/_text.js");



//= PGS_toast
const fn_toast = {
    _defaults: {
        element: "toast",
        link: null,
        timeout: 4000,
        description: "",
        linkTitle: "Open",
        closeTitle: "Close",
        type: {
            //== the plain one: no severity colour, no glyph, no title of its own — just the
            //== message on the box surface the container already defaults to
            neutral: {
                title: "",
                icon: ""
            },
            error: {
                title: "Error",
                icon: "<i pgs=\"icon['icon-circleXmark']\"></i>"
            },
            success: {
                title: "Success",
                icon: "<i pgs=\"icon['icon-circleCheck']\"></i>"
            },
            info: {
                title: "Information",
                icon: "<i pgs=\"icon['icon-circleInfo']\"></i>"
            },
            warning: {
                title: "Warning",
                icon: "<i pgs=\"icon['icon-triangleExclamation']\"></i>"
            }
        }
    },

    _getDuration(toast) {
        const rawDuration = toast.timeout ?? toast.duration;
        const duration = Number.parseInt(rawDuration, 10);
        return Number.isNaN(duration) ? undefined : duration;
    },

    _getType(toast) {
        const type = String(toast.type || "info").trim();
        return typeof PGS_toast[type] === "function" ? type : "info";
    },

    _getData(root) {
        const rawToast = pgs(root).data.getValueBrackets("toast") || "{}";

        try {
            const toasts = JSON.parse(`[${rawToast}]`);

            if (toasts.some(toast => !toast || typeof toast !== "object" || Array.isArray(toast))) {
                throw new TypeError("Each toast must be a JSON object");
            }

            return toasts;
        } catch (error) {
            console.warn("PGS toast: Invalid JSON configuration", error);
            return [];
        }
    },

    _getContent(title, description) {
        const safeDescription = (0,_helper_text_js__WEBPACK_IMPORTED_MODULE_1__.PGS_formatText)(description);
        const safeTitle = (0,_helper_text_js__WEBPACK_IMPORTED_MODULE_1__.PGS_formatText)(title);

        if (!safeTitle) return `<span>${safeDescription}</span>`;
        if (!safeDescription) return `<strong>${safeTitle}</strong>`;

        return `
            <strong>${safeTitle}</strong>
            <span>${safeDescription}</span>
        `;
    },

    _getContainer() {
        return pgs(document).querySelector("toast");
    },

    _getOrCreateContainer() {
        let containerToast = this._getContainer();

        if (!containerToast) {
            containerToast = document.createElement("div");
            pgs(containerToast).add("toast");
            containerToast.setAttribute("aria-live", "polite");
            containerToast.setAttribute("aria-relevant", "additions");
            document.body.appendChild(containerToast);
        }

        return containerToast;
    },

    show(type, options = {}) {
        if (typeof options === "string") options = { title: options };

        if (!options || typeof options !== "object" || Array.isArray(options)) {
            throw new TypeError("PGS toast: options must be an object or a string");
        }

        const { type: typeDefaults, ...defaults } = this._defaults;
        //== null is not a value here, it is "leave it to the type": the JSON path already reads it
        //== that way (toast.icon || undefined), so the JS API answers the same
        const definedOptions = Object.fromEntries(
            Object.entries(options).filter(([, value]) => value !== undefined && value !== null)
        );
        const config = {
            ...defaults,
            ...typeDefaults[type],
            ...definedOptions,
            type,
            timeout: definedOptions.timeout ?? defaults.timeout
        };

        return this.initToast(config);
    },

    initToast({
        type,
        title,
        icon,
        description,
        timeout,
        link,
        linkTitle,
        closeTitle
    }) {
        const containerToast = this._getOrCreateContainer();
        const text = this._getContent(title, description);

        //== Create Toast
        containerToast.innerHTML = "";
        const toast = document.createElement("div");
        if (timeout > 0) toast.style.setProperty("--toast-timeout", timeout + "ms");
        pgs(toast).state.add(type);
        pgs(toast).add("_toast-element");
        toast.setAttribute("role", type == "error" ? "alert" : "status");
        //== a type without a glyph (neutral, or an explicit icon: "") must not leave an empty box
        //== behind: the row is a flex with a gap, so the empty div would still push the text over
        const iconHtml = icon ? `<div pgs="_toast-element-content-icon">${icon}</div>` : "";

        toast.innerHTML = `
            <div pgs="_toast-element-content">
                ${iconHtml}
                <p>${text}</p>
                <button type="button" pgs="button['iconOnly'] _toast-element-content-delete"><i pgs="icon['icon-close']"></i></button>
            </div>
            <div pgs="_toast-element-buttons">
            </div>
        `;

        const toastButtons = pgs(toast).querySelector("_toast-element-buttons");
        const btnDelete = pgs(toast).querySelector("_toast-element-content-delete");
        //== the dismiss button draws a cross, so closeTitle is its accessible name and nothing else.
        //== Set as a property rather than written into the template above: no escaping to get wrong
        btnDelete.ariaLabel = closeTitle === "Close" ? "Close toast" : closeTitle;

        if (link) {
            const toastLink = document.createElement("a");
            toastLink.href = link;
            toastLink.textContent = linkTitle;
            pgs(toastLink).add("button");
            toastButtons.appendChild(toastLink);
        } else{
            pgs(toastButtons).add("hidden");
        }

        containerToast.appendChild(toast);

        //+ Animation delete
        function deleteToast() {
            toast.style.opacity = "0";
            setTimeout(() => toast.remove(), 300);
        }

        //== Timeout delete
        if (timeout > 0) setTimeout(() => { deleteToast() }, timeout);

        //== event
        btnDelete.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            deleteToast(e);
        });
    },

    deleteAll() {
        const containerToast = this._getContainer();
        if (containerToast) containerToast.innerHTML = "";
    },

    _dispatch(element) {
        this._getData(element).forEach(toast => {
            const title = String(toast.title || "").trim();
            const description = String(toast.description ?? toast.message ?? "").trim();
            const linkTitle = String(toast.linkTitle || toast["title-link"] || this._defaults.linkTitle).trim();
            const closeTitle = String(toast.closeTitle || toast["title-close"] || this._defaults.closeTitle).trim();

            if (!title && !description) return;

            const link = toast.link || this._defaults.link;
            const icon = toast.icon || undefined;
            const duration = this._getDuration(toast);
            const type = this._getType(toast);

            PGS_toast[type]({
                title,
                description,
                timeout: duration,
                icon,
                link,
                linkTitle,
                closeTitle
            });
        });
    },

    trigger(root = document) {
        pgs(root).querySelectorAll("toastLoad").forEach(element => {
            if (!element || element.dataset.initialize === "true") return;

            element.dataset.initialize = "true";
            this._dispatch(element);
            element.remove();
        });
    },

    execute(root = document) {
        pgs(root).querySelectorAll("toastExe").forEach(element => {
            if (!element || element.dataset.initialize === "true") return;

            element.dataset.initialize = "true";
            element.addEventListener("click", () => this._dispatch(element));
        });
    }
};

//# TRIGGER
function PGS_toastLoad_init(root = document) {
    fn_toast.trigger(root);
    fn_toast.execute(root);
}

const PGS_toast = {
    init: PGS_toastLoad_init,
    trigger: PGS_toastLoad_init,
    error: (options = {}) => fn_toast.show("error", options),
    success: (options = {}) => fn_toast.show("success", options),
    info: (options = {}) => fn_toast.show("info", options),
    warning: (options = {}) => fn_toast.show("warning", options),
    neutral: (options = {}) => fn_toast.show("neutral", options),
    deleteAll: () => fn_toast.deleteAll()
};


//= EXECUTE
(0,_helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__.PGS_onDocumentReady)(PGS_toastLoad_init);


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

            // a rule can return:
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

            // only validated when the field is required
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

        //== CHECKBOX 
        // required: può essere singola checkbox required (checked obbligatorio)
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

        //== the result: every field to be marked as failing
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

        if (this.typeNotice == "alert") {
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

            if (this.typeNotice == "alert") {
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
        const allFields = this.container.querySelectorAll("input, textarea, select")

        //== pulizia/aggiornamento errori
        ;(0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(this.container).state.querySelectorAll("errorField").forEach(element => {
            if (!invalid.includes(element)) this.#removeFieldError(element);
        });

        //== aggiungo errori dove serve
        invalid.forEach((el, i) => this.#addFieldError(el, i, invalid.length))

        //== a click clears the error
        allFields.forEach(element => element.addEventListener("click", () => {
            const errorTarget = (0,_pgs_js__WEBPACK_IMPORTED_MODULE_0__.pgs)(element).state.closest("errorField") || element;
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_init: () => (/* binding */ PGS_init)
/* harmony export */ });
/* harmony import */ var _pgs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_pgs.js */ "./assets/javascript/_pgs.js");


function PGS_init(root = document) {
    if (!(root instanceof Document || root instanceof Element)) {
        throw new TypeError("pgs.init(): root must be a Document or an Element");
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
function PGS_onDocumentReady(callback) {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => callback(), { once: true });
        return;
    }

    callback();
}


/***/ },

/***/ "./assets/javascript/helper/_scrollHorizontal.js"
/*!*******************************************************!*\
  !*** ./assets/javascript/helper/_scrollHorizontal.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_scrollHorizontal: () => (/* binding */ PGS_scrollHorizontal),
/* harmony export */   PGS_scrollHorizontalWithMouse: () => (/* binding */ PGS_scrollHorizontalWithMouse)
/* harmony export */ });
//+ converts a wheel event into a horizontal scroll delta, honouring the container's own scroll
//+ boundaries and leaving native horizontal scrolling (and pinch-zoom) alone; shouldSkip lets a
//+ variant bail out of specific input before any of that runs
function createHorizontalWheelHandler(element, speed, shouldSkip) {
    const onWheel = (e) => {
        //== lets a variant opt out of specific input (e.g. the trackpad) before anything else runs
        if (shouldSkip?.(e)) return;

        //== avoid interfering with pinch-zoom or native horizontal scroll
        if (e.ctrlKey) return;
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

        //== convert the delta to px
        let delta = e.deltaY;
        if (e.deltaMode === 1) delta *= 16;
        else if (e.deltaMode === 2) delta *= element.clientHeight;

        //== only take over the event if the container can still scroll further in that direction
        const atStart = element.scrollLeft <= 0;
        const atEnd = element.scrollLeft + element.clientWidth >= element.scrollWidth - 1;
        const scrollingRight = delta > 0;
        const scrollingLeft = delta < 0;
        const canScrollHoriz =
            (scrollingRight && !atEnd) ||
            (scrollingLeft && !atStart);

        if (!canScrollHoriz) return;

        e.preventDefault();
        element.scrollLeft += delta * speed;
    };

    element.addEventListener('wheel', onWheel, { passive: false });
    return () => element.removeEventListener('wheel', onWheel);
}

//+ estimates whether the wheel source is a trackpad: small, high-frequency deltas are its signature,
//+ a physical mouse wheel fires larger, sparser steps
function createTrackpadDetector() {
    let lastTs = 0;
    let smallAndFast = 0;
    let samples = 0;
    let isTrackpad = false;

    return function update(e) {
        const now = performance.now();
        const dt = now - lastTs;

        let dy = Math.abs(e.deltaY);
        if (e.deltaMode === 1) dy *= 16;
        else if (e.deltaMode === 2) dy *= e.currentTarget?.clientHeight || 800;

        const small = dy < 30;
        const fast = dt < 35;
        if (small && fast) smallAndFast++;

        samples++;
        if (samples >= 6) {
            isTrackpad = smallAndFast >= 3;
            smallAndFast = 0;
            samples = 0;
        }

        lastTs = now;
        return isTrackpad;
    };
}

//= works with any wheel source (mouse, trackpad, Magic Mouse...): any vertical wheel motion over
//= the container scrolls it horizontally instead
function PGS_scrollHorizontal(element, speed) {
    return createHorizontalWheelHandler(element, speed);
}

//= mouse only: a trackpad or Magic Mouse already scrolls horizontally on its own two-finger swipe,
//= so their vertical wheel motion is left alone instead of being forced sideways
function PGS_scrollHorizontalWithMouse(element, speed) {
    const isTrackpad = createTrackpadDetector();
    return createHorizontalWheelHandler(element, speed, isTrackpad);
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
//+ escapes text that gets interpolated into innerHTML, shared by every component that builds its
//+ own markup from author-supplied strings (alert/notification/toast titles and descriptions,
//+ cookieConsent copy)
function PGS_escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

//+ the shared bit of markdown every one of those components accepts: **bold** and line breaks,
//+ applied after escaping so the source text can contain < > & unescaped
function PGS_formatText(value) {
    return PGS_escapeHtml(value)
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\r?\n/g, "<br>");
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




//# HEADER
//+ COMPACT BREAKPOINT
// Width at or below which the header switches to its compact layout even when the content
// still fits, so a wide header can be compact on purpose.
// headerCompactFrom[600] wins with its own pixel value, otherwise the named options
// (compactTablet, compactLaptop, ...) set --header-compact-breakpoint in the
// SCSS, so the breakpoint values stay defined in one place.
function getHeader_CompactBreakpoint(header) {
    const custom = parseFloat(pgs(header).data.getValueBrackets("headerCompactFrom"));
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

//= RESIZE
function initHeader_Resize(header) {

    if (!header) return;

    const headerElements = pgs(header).querySelectorAll("header-element");

    if (!headerElements.length) {
        console.warn('pgs.header: a header needs at least one "header-element" under it, or it draws nothing.');
        return;
    }

    headerElements.forEach(selectHeader => {

        //== COMPACT LAYOUT
        //== how much room the full layout needs, learned the first time it does not fit. It cannot be
        //== measured while compact, because header-element-onlyFull is hidden and reports zero width.
        let requiredWidth = 0;

        function compact(headerElement) {
            const isCompact = pgs(headerElement).state.contains("compact");
            const overflows = headerElement.scrollWidth > headerElement.clientWidth + OVERFLOW_TOLERANCE;

            const setCompact = (value) => {
                pgs(header).state.toggle("compact", value);
                pgs(headerElement).state.toggle("compact", value);
            };

            //=== while the full layout is on screen its scrollWidth is what it needs, and this is the only
            //=== moment it can be learned: once compact, header-element-onlyFull is hidden and reports zero
            if (!isCompact && overflows) requiredWidth = headerElement.scrollWidth;

            //=== a breakpoint declared on the header wins over any measurement
            if (window.innerWidth <= getHeader_CompactBreakpoint(header)) return setCompact(true);

            //=== compact: stay only while the room that was missing is still missing. With nothing learned
            //=== the page loaded compact and the full layout fitted at that width, so let it back in
            if (isCompact) return setCompact(requiredWidth ? headerElement.clientWidth < requiredWidth : false);
            setCompact(overflows);
        }

        //= Schedule Compact
        //== throttled to avoid ResizeObserver loop warnings; state is an object (not a plain
        //== number) because scheduleCompact needs to write the pending id back to the caller's
        //== own counter, and a number argument would only update a local copy
        const scheduleCompact = (state) => {
            if (state.id) return;
            state.id = requestAnimationFrame(() => {
                state.id = 0;
                compact(selectHeader);
            });
        };

        //== Resize 
        const resizeState = { id: 0 };
        let observer = new ResizeObserver(() => scheduleCompact(resizeState));
        observer.observe(selectHeader);

        //== MutationObserver, not ResizeObserver: won't loop back from compact()'s own show/hide toggles
        const childState = { id: 0 };
        const childObserver = new MutationObserver(() => scheduleCompact(childState));
        childObserver.observe(selectHeader, { childList: true, subtree: true });

        //== initial check
        compact(selectHeader);
    });
}


//= HEADER HEIGHT
function initHeader_Height(header) {
    if (!header) return;

    let headerHeightRafId = 0;

    //+ GET HEADER HEIGHT ELEMENT
    function getHeaderHeightElement(header) {
        const isCompactBottom = window.getComputedStyle(header).getPropertyValue("--header-compactBottom-active").trim() === "1";
        return isCompactBottom ? pgs(header).querySelector("header-element") || header : header;
    }

    //+ FOR --heightOfHeader e --heightOfHeaderScroll
    function getPrimaryHeader() {
        const headers = getReadyHeaders();
        return headers.find(header => pgs(header).option.contains("main")) || headers[0] || null;
    }

    //+ HEIGHT
    function headerHeight() {
        //== --heightOfHeader is what pushes the page down, so only one header can own it. Ownership
        //== is checked here rather than at init, so a header declaring main later still
        //== takes over from the fallback
        if (getPrimaryHeader() !== header) return;

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
//== hides the header while the reader scrolls down and brings it back on the way up, on screens
//== up to 900px tall, where a pinned header costs too much of the page
function initHeader_Scroll(header) {
    let lastScrollY = window.scrollY;
    if (!header || !pgs(header).option.contains("scroll")) return;
    const headerElements = pgs(header).querySelectorAll("header-element");

    window.addEventListener("scroll", () => {
        if (!header) return;
        let currentScrollY = window.scrollY;

        if (window.innerHeight <= 900) {
            if (currentScrollY >= 80) {
                if (currentScrollY > lastScrollY) {
                    headerElements.forEach(element => element.style.transform = "translateY(-100%)");
                    header.setAttribute("data-header-scroll", true)
                } else {
                    headerElements.forEach(element => element.style.transform = "translateY(0px)");
                    header.setAttribute("data-header-scroll", false)
                }
            } else {
                headerElements.forEach(element => element.style.transform = "translateY(0)");
                header.setAttribute("data-header-scroll", false)
            }
        }
        lastScrollY = currentScrollY;
    });
}


//# INIT
const INITIALIZED_HEADERS = new WeakSet();

function initHeader(header) {
    if (INITIALIZED_HEADERS.has(header)) return;
    INITIALIZED_HEADERS.add(header);

    initHeader_Resize(header);
    initHeader_Height(header);
    initHeader_Scroll(header);
}

//+ a header is only ready once it holds a header-element, which is where every measurement happens
function getReadyHeaders() {
    return Array.from(pgs(document).querySelectorAll("header")).filter(header => pgs(header).querySelector("header-element"));
}

function PGS_header_init(root = document) {
    const candidates = [
        ...(root instanceof Element && pgs(root).contains("header") ? [root] : []),
        ...pgs(root).querySelectorAll("header"),
    ];

    candidates.filter(header => pgs(header).querySelector("header-element")).forEach(header => initHeader(header));
}

PGS_header_init();

//== headers can arrive later, and there may be more than one, so the watch stays on instead of
//== stopping at the first: a pass is cheap and every header is initialized only once
let headerScanRafId = 0;
const headerObserver = new MutationObserver(() => {
    if (headerScanRafId) return;
    headerScanRafId = requestAnimationFrame(() => {
        headerScanRafId = 0;
        PGS_header_init();
    });
});

headerObserver.observe(document.documentElement, {
    childList: true,
    subtree: true
});

//# EXPORT
const PGS_header = {
    init: PGS_header_init
};


/***/ },

/***/ "./assets/javascript/patterns/_cookieConsent.js"
/*!******************************************************!*\
  !*** ./assets/javascript/patterns/_cookieConsent.js ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_cookieConsent: () => (/* binding */ PGS_cookieConsent)
/* harmony export */ });
/* harmony import */ var _helper_onDocumentReady_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/_onDocumentReady.js */ "./assets/javascript/helper/_onDocumentReady.js");
/* harmony import */ var _helper_text_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/_text.js */ "./assets/javascript/helper/_text.js");



const STORAGE_KEY = 'pgs_cookie_preferences_v1';
const INITIALIZED_COOKIE_CONSENTS = new WeakSet();

const DEFAULTS = {
    titleIntro: "Cookies and privacy",
    titleHeading: "Your privacy comes first",
    description: "We use essential cookies to provide the service and, with your consent, analytics cookies from **Google Analytics** to measure traffic anonymously and improve our content.\nYou can change your choice at any time.",
    privacyPolicyUrl: "/privacy-policy/",
    cookiePolicyUrl: "/cookie-policy/",
    panelAriaLabel: "Cookie preferences",
    essentialTitle: "Essential cookies",
    essentialDescription: "Always active to ensure the website works correctly.",
    essentialBadge: "Active",
    analyticsTitle: "Analytics",
    analyticsDescription: "Browsing data collected in aggregate form for anonymous statistics.",
    analyticsAriaLabel: "Enable Google Analytics",
    titleReject: "Selected only",
    titleAccept: "Accept all",
    gaId: ""
};

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
    pgs(element).toggle(token, enabled);
    if (!pgs(element).value) element.removeAttribute('pgs');
}

//+ reads the JSON config off the marker element and builds the whole modal + dialog + content from it,
//+ so the consuming site never has to hand-author the banner markup — see @pgs-data "cookieConsent".
function buildCookieConsent(marker) {
    const config = { ...DEFAULTS, ...(safeJsonParse(pgs(marker).data.getValueBrackets('cookieConsent') || '{}') || {}) };

    const root = document.createElement('div');
    pgs(root).add("modal['dialogTopLevel' 'dialogBottom' 'dialogRight' 'dialogMedium']", 'cookieConsent');

    root.innerHTML = `
        <dialog>
            <div pgs="modal-dialog-content">
                <div pgs="_cookieConsent-header flex['column']">
                    <p pgs="flex['row' 'itemCenter']"><i pgs="icon['icon-cookie']"></i> ${(0,_helper_text_js__WEBPACK_IMPORTED_MODULE_1__.PGS_formatText)(config.titleIntro)}</p>
                    <h2>${(0,_helper_text_js__WEBPACK_IMPORTED_MODULE_1__.PGS_formatText)(config.titleHeading)}</h2>
                    <p>${(0,_helper_text_js__WEBPACK_IMPORTED_MODULE_1__.PGS_formatText)(config.description)}</p>
                    <p>
                        <a href="${(0,_helper_text_js__WEBPACK_IMPORTED_MODULE_1__.PGS_escapeHtml)(config.privacyPolicyUrl)}" target="_blank" rel="noopener">Privacy Policy</a> -
                        <a href="${(0,_helper_text_js__WEBPACK_IMPORTED_MODULE_1__.PGS_escapeHtml)(config.cookiePolicyUrl)}" target="_blank" rel="noopener">Cookie Policy</a>
                    </p>
                </div>

                <div pgs="_cookieConsent-panel flex['column']" role="group" aria-label="${(0,_helper_text_js__WEBPACK_IMPORTED_MODULE_1__.PGS_escapeHtml)(config.panelAriaLabel)}">
                    <div pgs="flex['row' 'nowrap'] _cookieConsent-panel-featureEssential">
                        <div>
                            <p>
                                <strong>${(0,_helper_text_js__WEBPACK_IMPORTED_MODULE_1__.PGS_formatText)(config.essentialTitle)}</strong>
                                <br>
                                <small>${(0,_helper_text_js__WEBPACK_IMPORTED_MODULE_1__.PGS_formatText)(config.essentialDescription)}</small>
                            </p>
                        </div>

                        <span pgs="_cookieConsent-panel-badge badge['success']">${(0,_helper_text_js__WEBPACK_IMPORTED_MODULE_1__.PGS_formatText)(config.essentialBadge)}</span>
                    </div>

                    <div pgs="flex['row'] _cookieConsent-panel-featureAnalytics">
                        <label pgs="toggle">
                            <p>
                                <strong>${(0,_helper_text_js__WEBPACK_IMPORTED_MODULE_1__.PGS_formatText)(config.analyticsTitle)}</strong>
                                <br>
                                <small>${(0,_helper_text_js__WEBPACK_IMPORTED_MODULE_1__.PGS_formatText)(config.analyticsDescription)}</small>
                            </p>

                            <input type="checkbox" pgs="_cookieConsent-panel-toggleAnalytics" aria-label="${(0,_helper_text_js__WEBPACK_IMPORTED_MODULE_1__.PGS_escapeHtml)(config.analyticsAriaLabel)}">
                        </label>
                    </div>
                    <div pgs="flex['row']">
                        <button type="button" pgs="button _cookieConsent-actionReject">
                            ${(0,_helper_text_js__WEBPACK_IMPORTED_MODULE_1__.PGS_formatText)(config.titleReject)}
                        </button>
    
                        <button type="button" pgs="button['strong'] _cookieConsent-actionAccept">
                            <i pgs="icon['icon-check']"></i> ${(0,_helper_text_js__WEBPACK_IMPORTED_MODULE_1__.PGS_formatText)(config.titleAccept)}
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    `;

    root.id = marker.id || 'cookieConsent';
    root.dataset.gaId = config.gaId;
    document.body.appendChild(root);
    marker.remove();

    return root;
}

//+
function assignCookieRuntimeAttributes({ root, analyticsToggle, acceptAllButton, rejectButton, openButtons }) {
    root.dataset.cookieComponent = 'consent';
    analyticsToggle?.setAttribute('data-cookie-toggle', 'analytics');
    acceptAllButton?.setAttribute('data-cookie-action', 'accept');
    rejectButton?.setAttribute('data-cookie-action', 'reject');

    pgs(root).querySelector('_cookieConsent-panel-featureEssential')?.setAttribute('data-cookie-feature', 'essential');
    pgs(root).querySelector('_cookieConsent-panel-featureAnalytics')?.setAttribute('data-cookie-feature', 'analytics');

    openButtons.forEach((button) => {
        button.setAttribute('data-cookie-action', 'open');
    });
}

//= CookieConsent
//+ open/close, backdrop, focus trap, ESC-to-close, and focus restore are all handled by the native <dialog>
//+ through pgs.modal; this pattern only owns the JSON-driven markup generation and the consent business logic.
function initCookieConsent(selectRoot = document) {
    const marker = selectRoot instanceof Element && pgs(selectRoot).contains('cookieConsent')
        ? selectRoot
        : pgs(selectRoot).querySelector('cookieConsent');
    if (!marker || INITIALIZED_COOKIE_CONSENTS.has(marker)) return;
    INITIALIZED_COOKIE_CONSENTS.add(marker);

    const root = buildCookieConsent(marker);

    //+ initializes the modal here too (idempotent) so this doesn't depend on pgs.registerModules() order.
    globalThis.pgs?.modal?.init(root);
    const modal = globalThis.pgs?.modal?.api(root);
    if (!modal) return;

    const analyticsToggle = pgs(root).querySelector('_cookieConsent-panel-toggleAnalytics');
    const acceptAllButton = pgs(root).querySelector('_cookieConsent-actionAccept');
    const rejectButton = pgs(root).querySelector('_cookieConsent-actionReject');
    const openButtons = pgs(document).querySelectorAll('cookieConsent-actionOpen');
    const measurementId = (root.dataset.gaId || '').trim();
    const prefersGa = measurementId.length > 0;

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

    function persistAndApply(allowAnalytics) {
        savePreferences({ analytics: allowAnalytics });
        setPgsFlag(root, 'cookieConsent-accepted', !!allowAnalytics);
        setPgsFlag(root, 'cookieConsent-declined', !allowAnalytics);
        applyAnalyticsConsent({ allowAnalytics: !!allowAnalytics, measurementId });
    }

    acceptAllButton?.addEventListener('click', () => {
        if (analyticsToggle && prefersGa) analyticsToggle.checked = true;
        persistAndApply(!!prefersGa);
        modal.close();
    });

    rejectButton?.addEventListener('click', () => {
        const allowAnalytics = analyticsToggle ? analyticsToggle.checked && prefersGa : false;
        if (!allowAnalytics && analyticsToggle) analyticsToggle.checked = false;
        persistAndApply(allowAnalytics);
        modal.close();
    });

    analyticsToggle?.addEventListener('change', (event) => {
        if (!prefersGa && event.target instanceof HTMLInputElement) {
            event.target.checked = false;
        }
    });

    openButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            modal.open();
        });
    });

    const savedPrefs = readPreferences();
    if (savedPrefs && typeof savedPrefs.analytics === 'boolean') {
        if (analyticsToggle) analyticsToggle.checked = !!savedPrefs.analytics && prefersGa;
        persistAndApply(savedPrefs.analytics && prefersGa);
    } else {
        modal.open();
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
/* harmony import */ var _base_darkmode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base/_darkmode.js */ "./assets/javascript/base/_darkmode.js");
/* harmony import */ var _base_svg_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base/_svg.js */ "./assets/javascript/base/_svg.js");
/* harmony import */ var _base_hover_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base/_hover.js */ "./assets/javascript/base/_hover.js");
/* harmony import */ var _base_object_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./base/_object.js */ "./assets/javascript/base/_object.js");
/* harmony import */ var _layout_header_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./layout/_header.js */ "./assets/javascript/layout/_header.js");
/* harmony import */ var _components_accordion_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/_accordion.js */ "./assets/javascript/components/_accordion.js");
/* harmony import */ var _components_alerts_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/_alerts.js */ "./assets/javascript/components/_alerts.js");
/* harmony import */ var _components_dropdown_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/_dropdown.js */ "./assets/javascript/components/_dropdown.js");
/* harmony import */ var _components_menu_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/_menu.js */ "./assets/javascript/components/_menu.js");
/* harmony import */ var _components_modal_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/_modal.js */ "./assets/javascript/components/_modal.js");
/* harmony import */ var _components_search_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/_search.js */ "./assets/javascript/components/_search.js");
/* harmony import */ var _components_slides_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/_slides.js */ "./assets/javascript/components/_slides.js");
/* harmony import */ var _components_steps_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/_steps.js */ "./assets/javascript/components/_steps.js");
/* harmony import */ var _components_stepTabs_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/_stepTabs.js */ "./assets/javascript/components/_stepTabs.js");
/* harmony import */ var _components_summary_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/_summary.js */ "./assets/javascript/components/_summary.js");
/* harmony import */ var _components_tabs_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/_tabs.js */ "./assets/javascript/components/_tabs.js");
/* harmony import */ var _components_toast_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/_toast.js */ "./assets/javascript/components/_toast.js");
/* harmony import */ var _components_notification_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/_notification.js */ "./assets/javascript/components/_notification.js");
/* harmony import */ var _imports_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./_imports.js */ "./assets/javascript/_imports.js");
/* harmony import */ var _patterns_cookieConsent_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./patterns/_cookieConsent.js */ "./assets/javascript/patterns/_cookieConsent.js");
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