/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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

        function api() {
            return api;
        }

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
    api.modules = createOption("pgs-modules");
    return api;
}

globalThis.pgs ??= pgs;




/***/ },

/***/ "./assets/javascript/base/_darkmode.js"
/*!*********************************************!*\
  !*** ./assets/javascript/base/_darkmode.js ***!
  \*********************************************/
() {

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


/***/ },

/***/ "./assets/javascript/base/_object.js"
/*!*******************************************!*\
  !*** ./assets/javascript/base/_object.js ***!
  \*******************************************/
() {

document.addEventListener('DOMContentLoaded', () => {
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

/***/ "./assets/javascript/components/_accordion.js"
/*!****************************************************!*\
  !*** ./assets/javascript/components/_accordion.js ***!
  \****************************************************/
() {

//= ACCORDION 
const allAccordion = pgs(document).querySelectorAll("accordion")

allAccordion.forEach((accordion, index) => {

    const BUTTON = pgs(accordion).querySelector("accordion-button");
    const CONTENT = pgs(accordion).querySelector("accordion-content");

    //== ID univoci per aria-controls / aria-labelledby
    const ID = index + 1;
    const btnId = `acc-btn-${ID}`;
    const panelId = `acc-panel-${ID}`;

    //== Stato iniziale
    const isOpenInit = pgs(accordion).state.contains("open");

    //== Accessibilità (setup una volta)
    BUTTON.setAttribute("role", "button");
    BUTTON.setAttribute("tabindex", "0");
    BUTTON.setAttribute("id", btnId);
    BUTTON.setAttribute("aria-controls", panelId);

    CONTENT.setAttribute("id", panelId);
    CONTENT.setAttribute("role", "region");
    CONTENT.setAttribute("aria-labelledby", btnId);

    //+ Accessibility (applica stato aperto/chiuso)
    function accordionAccessibility(isOpen, button, content) {
        const text = (button?.textContent || "").trim().replace(/\s+/g, " ");
        button.setAttribute("aria-label", `${isOpen ? "Chiudi" : "Apri"} ${text || "sezione"}`);
        button.setAttribute("aria-expanded", String(isOpen));
        content.hidden = !isOpen;
    }

    //+ Chiudi tutti gli altri
    function closeOltherAccordion() {
        for (const otherLi of allAccordion) {
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

});


/***/ },

/***/ "./assets/javascript/components/_dropdown.js"
/*!***************************************************!*\
  !*** ./assets/javascript/components/_dropdown.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pgs_dropdown: () => (/* binding */ pgs_dropdown)
/* harmony export */ });
// + dropdown (Popover API)
function pgs_dropdown() {
    pgs(document).querySelectorAll("dropdown").forEach((DROPDOWN, index) => {
        const BUTTON = pgs(DROPDOWN).querySelector("dropdown-button");
        const CONTENT = pgs(DROPDOWN).querySelector("dropdown-content");

        if (!BUTTON || !CONTENT) return;

        // = INIT
        if (DROPDOWN.getAttribute("data-initialize") === "true") return;
        DROPDOWN.setAttribute("data-initialize", "true");

        // == CSS dropdown-anchor
        const ANCHOR_NAME = `--dropdown-anchor-${index}`;
        DROPDOWN.style.setProperty("--dropdown-anchor", ANCHOR_NAME);

        // == IDs + ACCESSIBILITY
        if (!BUTTON.id) BUTTON.id = `dropdown-btn-${index}`;
        if (!CONTENT.id) CONTENT.id = `dropdown-panel-${index}`;
        BUTTON.setAttribute("type", "button");
        BUTTON.setAttribute("aria-haspopup", "true");
        BUTTON.setAttribute("aria-controls", CONTENT.id);
        BUTTON.setAttribute("aria-expanded", "false");
        CONTENT.setAttribute("aria-labelledby", BUTTON.id);

        // == POPVER SETUP 
        if (!CONTENT.hasAttribute("popover")) CONTENT.setAttribute("popover", "auto");
        BUTTON.setAttribute("popovertarget", CONTENT.id);
        BUTTON.setAttribute("popovertargetaction", "toggle");

        //-( Safari / legacy fallback: popover is in the top layer, so fixed coords are viewport-based.
        const HAS_ANCHOR_POSITIONING =
            CSS.supports("anchor-name: --dropdown-anchor") &&
            CSS.supports("position-anchor: --dropdown-anchor") &&
            CSS.supports("position-area: bottom") &&
            CSS.supports("top: anchor(bottom)");
        const USE_FALLBACK_POSITIONING = pgs(DROPDOWN).contains("tooltip") || !HAS_ANCHOR_POSITIONING;

        const updatePopoverPosition = () => {
            if (!USE_FALLBACK_POSITIONING) return;

            const buttonRect = BUTTON.getBoundingClientRect();
            const style = getComputedStyle(DROPDOWN);
            const offset = parseFloat(style.getPropertyValue("--dropdown-offset")) || 10;
            const padding = parseFloat(style.getPropertyValue("--dropdown-padding")) || 0;
            const arrowSize = parseFloat(style.getPropertyValue("--dropdown-arrow-size")) || 12;
            const viewportGap = 8;
            const viewportWidth = window.innerWidth;
            const maxWidth = viewportWidth - viewportGap * 2;
            const contentStyle = getComputedStyle(CONTENT);
            const cssMaxWidth = parseFloat(contentStyle.maxWidth);
            const dropdownMaxWidth = Number.isFinite(cssMaxWidth) ? Math.min(cssMaxWidth, maxWidth) : maxWidth;
            const contentWidth = Math.min(
                Math.max(CONTENT.scrollWidth + padding * 2, buttonRect.width),
                dropdownMaxWidth
            );
            const top = buttonRect.bottom + offset;
            const centeredLeft = buttonRect.left + buttonRect.width / 2 - contentWidth / 2;
            const left = Math.min(
                Math.max(centeredLeft, viewportGap),
                viewportWidth - contentWidth - viewportGap
            );
            const buttonCenter = buttonRect.left + buttonRect.width / 2;
            const arrowLeft = Math.min(
                Math.max(buttonCenter - left, padding + arrowSize),
                contentWidth - padding - arrowSize
            );

            DROPDOWN.style.setProperty("--dropdown-fallback-top", `${top}px`);
            DROPDOWN.style.setProperty("--dropdown-fallback-left", `${left}px`);
            DROPDOWN.style.setProperty("--dropdown-arrow-left", `${arrowLeft}px`);
        };

        BUTTON.addEventListener("click", e => {
            if (!USE_FALLBACK_POSITIONING) return;

            e.preventDefault();
            if (CONTENT.matches(":popover-open")) {
                CONTENT.hidePopover();
                return;
            }

            updatePopoverPosition();
            CONTENT.showPopover();
        });

        // == sync ARIA + data-open quando apre/chiude
        CONTENT.addEventListener("toggle", e => {
            const open = CONTENT.matches(":popover-open");
            BUTTON.setAttribute("aria-expanded", open ? "true" : "false");
            pgs(DROPDOWN).state.toggle("open", open);
            if (open) {
                updatePopoverPosition();
                CONTENT.querySelector('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')?.focus();
            }
        });

        window.addEventListener("resize", () => {
            if (CONTENT.matches(":popover-open")) updatePopoverPosition();
        });
        window.addEventListener("scroll", () => {
            if (CONTENT.matches(":popover-open")) updatePopoverPosition();
        }, true);
    });
}

// # INIT
pgs_dropdown();


/***/ },

/***/ "./assets/javascript/components/_exeNotifications.js"
/*!***********************************************************!*\
  !*** ./assets/javascript/components/_exeNotifications.js ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_md_notification: () => (/* binding */ PGS_md_notification)
/* harmony export */ });
/* harmony import */ var _functions_notifications_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../functions/_notifications.js */ "./assets/javascript/functions/_notifications.js");


function escapeHtml(value) {
    return String(value ?? "");
}

function getDuration(notification) {
    const rawDuration = notification.duration;
    const duration = Number.parseInt(rawDuration, 10);

    return Number.isNaN(duration) ? 5000 : duration;
}

function getNotificationApi(notification) {
    const element = String(notification.element || "notification").trim();

    return element === "toast" ? _functions_notifications_js__WEBPACK_IMPORTED_MODULE_0__.PGS_toast : _functions_notifications_js__WEBPACK_IMPORTED_MODULE_0__.PGS_notification;
}

function getNotificationType(notification, api) {
    const type = String(notification.type || "info").trim();

    return typeof api[type] === "function" ? type : "info";
}

function getNotificationData(root) {
    try {
        return JSON.parse(root.dataset.notification || "{}");
    } catch (error) {
        console.warn("PGS notification: dati non validi", error);
        return {};
    }
}

function getNotificationContent(title, content) {
    const safeContent = escapeHtml(content);
    const safeTitle = escapeHtml(title);

    if (!safeTitle) return safeContent;
    if (!safeContent) return `<span pgs="notification-element-title">${safeTitle}</span>`;

    return `
        <span pgs="notification-element-title">${safeTitle}</span>
        <br>
        <span pgs="notification-element-content">${safeContent}</span>
    `;
}

function PGS_md_notification(root) {
    if (!root || root.dataset.initialize === "true") return;
    root.dataset.initialize = "true";

    const notification = getNotificationData(root);
    const title = String(notification.title || "").trim();
    const content = String(notification.message || "").trim();
    if (!title && !content) {
        root.remove();
        return;
    }

    const link = notification.link || null;
    const icon = notification.icon || undefined;
    const duration = getDuration(notification);
    const api = getNotificationApi(notification);
    const type = getNotificationType(notification, api);
    const formattedContent = getNotificationContent(title, content);

    if (api === _functions_notifications_js__WEBPACK_IMPORTED_MODULE_0__.PGS_toast) {
        api[type](formattedContent, duration, icon);
    } else {
        api[type](formattedContent, link, duration, icon);
    }

    root.remove();
}

function initMdNotifications() {
    pgs(document).querySelectorAll("notificationTrigger").forEach(PGS_md_notification);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMdNotifications);
} else {
    initMdNotifications();
}


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


//= DROP DOWN MENU
function PGS_menu() {

    pgs(document).querySelectorAll('menu-horizontal').forEach(MENU => {

        MENU.querySelectorAll('nav > ul > li.menu-item-has-children').forEach(li => {
            if (li.querySelector("ul")) {
                const ul = li.querySelector("ul");

                const button = document.createElement("button");
                button.className = "icon-down";
                button.type = "button";
                button.innerHTML = "<span>&#9207;</span>";
                li.querySelector("a").insertAdjacentElement("afterend", button);

                pgs(li).add("dropdown")
                pgs(button).add("dropdown-button")
                pgs(button).add("buttonNohover")
                pgs(ul).add("dropdown-content")
                pgs(ul).add("menu-vertical")
            }
        });
    });

    pgs(document).querySelectorAll('menu-vertical').forEach(MENU => {

        MENU.querySelectorAll('.menu-item-has-children').forEach((li, index) => {
            const ul = li.querySelector("ul");

            if (!ul) return

            const button = document.createElement("button");
            button.className = "icon-down buttonIcon";
            button.type = "button";

            // ID unico per aria-controls
            const submenuId = `vertical-submenu-${index}`;
            ul.id = submenuId;

            // Stato iniziale
            pgs(button).add("buttonIcon")
            button.setAttribute("aria-expanded", "false");
            button.setAttribute("aria-controls", submenuId);
            button.setAttribute("aria-label", "Apri sottomenu");
            button.innerHTML = "<span aria-hidden='true'>&#9207;</span>";
            li.querySelector("a").insertAdjacentElement("afterend", button);

            function toggleMenu() {
                // const isOpena = ul.classList.toggle("open");
                const isOpen = pgs(ul).state.toggle("open");
                button.setAttribute("aria-expanded", isOpen);
                button.setAttribute("aria-label", isOpen ? "Chiudi sottomenu" : "Apri sottomenu");
            };

            // Click
            button.addEventListener("click", toggleMenu);
            button.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleMenu();
                }
            });
        });

        // pgs(document).querySelectorAll('menu-vertical').forEach(MENU => {

        //     MENU.querySelectorAll('.menu-item-has-children').forEach(li => {
        //         if (li.querySelector("ul")) {
        //             const ul = li.querySelector("ul");

        //             const button = document.createElement("button");
        //             button.className = "icon-down";
        //             button.type = "button";
        //             button.innerHTML = "<span>&#9207;</span>";
        //             li.querySelector("a").insertAdjacentElement("afterend", button);


        //             pgs(button).add("buttonIcon")
        //             button.addEventListener("click", () => {
        //                 ul.classList.toggle("open")
        //             })
        //         }
        //     });
        // });
    });
    (0,_dropdown__WEBPACK_IMPORTED_MODULE_0__.pgs_dropdown)()
}

//# INIT PGS_menu
PGS_menu()

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
//# MODAL
PGS_modal()
function PGS_modal(selector = "modal") {
    pgs(document).querySelectorAll(selector).forEach(MODAL => {

        const BUTTON_OPEN = pgs(MODAL).querySelector("modal-button");        
        const DIALOG = MODAL.querySelector("dialog");
        if (!BUTTON_OPEN || !DIALOG) return;

        //== SELECTOR
        const DOMButtonClose = '<button pgs="buttonClose modal-close" type="button" tabindex="0" aria-label="Chiudi"><i class="fa-solid fa-close"></i></button>';
        const modalContentHeader = pgs(MODAL)?.querySelector("modal-dialog-content-header")
        
        
        //== OPTION ATTRIBUTES MODAL
        const disableBackdropClose = pgs(MODAL).option.contains("disableBackdropClose")
        const data_history = pgs(MODAL).option.contains("history");
        const data_container = pgs(MODAL).option.getValueBrackets("containerID");
        const data_containerPGS = pgs(MODAL).option.getValueBrackets("containerPGS");
        
        //== OPTION ATTRIBUTES DIALOG
        const topLevel = pgs(DIALOG).option.contains("topLevel")

        
        //== BUTTON CLOSE
        if (pgs(MODAL).querySelector("modal-close")) null
        else if (modalContentHeader) modalContentHeader.insertAdjacentHTML("beforeend", DOMButtonClose)
        else DIALOG.insertAdjacentHTML("beforeend", DOMButtonClose)
        const BUTTON_CLOSE = pgs(MODAL).querySelector("modal-close")


        //== SET
        pgs(DIALOG).add("dialog modal-dialog");

        //== BUTTON OPEN
        BUTTON_OPEN.setAttribute("role", "button");
        BUTTON_OPEN.setAttribute("aria-label", "apri modale");


        //== POSITION
        if(!topLevel){           
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
            if (!DIALOG.open) document.querySelectorAll("dialog[open]").forEach((dlg) => dlg.close());
            statusModal(true);
            DIALOG.open ? closeModal(e) : topLevel ? DIALOG.showModal() : DIALOG.show();
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

        //+ fn OPEN ON HISTORY
        function openModalOnHistory() {
            const params = new URLSearchParams(window.location.search);
            if (params.get('modal') !== BUTTON_OPEN.id) return;
            document.getElementById(BUTTON_OPEN.id)?.scrollIntoView({ behavior: 'smooth' });
            openModal();
        }


        //= OPEN 
        BUTTON_OPEN.addEventListener("click", (e) => openModal(e));
        BUTTON_OPEN.addEventListener("keypress", (e) => !DIALOG.open && (e.key === "Enter" || e.key === " ") && openModal(e));
        
        //= CLOSE 
        DIALOG.addEventListener("close", () => statusModal(false));
        DIALOG.addEventListener("click", e => { if (e.target == DIALOG && !disableBackdropClose) closeModal(e) });
        BUTTON_CLOSE?.addEventListener("click", e => closeModal(e));
        
        //= UPDATE HISTORY
        if (data_history && BUTTON_OPEN.id) {
            setTimeout(openModalOnHistory, 1);

            //== Aggiorna URL quando cambia l'attributo "open" del dialog
            const obs = new MutationObserver(() => {
                let isOpen = DIALOG.hasAttribute("open");
                try {
                    const url = new URL(window.location.href);
                    const params = new URLSearchParams(url.search);
                    isOpen ? params.set('modal', BUTTON_OPEN.id) : params.delete('modal');
                    url.search = params.toString() ? `?${params.toString()}` : "";
                    window.history.pushState({ modal: BUTTON_OPEN.id, open: isOpen }, "", url);
                } catch (_) { }
            });
            obs.observe(DIALOG, { attributes: true, attributeFilter: ["open"] });

            //== Gestisce back/forward del browser per aprire/chiudere il dialog coerentemente
            window.addEventListener("popstate", () => {
                try {
                    const params = new URLSearchParams(window.location.search);
                    const shouldOpen = params.get('modal') === BUTTON_OPEN.id;
                    if (shouldOpen && !DIALOG.open) DIALOG.showModal();
                    if (!shouldOpen && DIALOG.open) closeModal()
                } catch (_) { }
            });
        }
    });
}

//# INIT PGS_modal


/***/ },

/***/ "./assets/javascript/components/_slides.js"
/*!*************************************************!*\
  !*** ./assets/javascript/components/_slides.js ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_slides_api: () => (/* binding */ PGS_slides_api),
/* harmony export */   PGS_slides_init: () => (/* binding */ PGS_slides_init)
/* harmony export */ });
/* harmony import */ var _functions_scrollY__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../functions/_scrollY */ "./assets/javascript/functions/_scrollY.js");

const API = new WeakMap();

class PGS_Slides {
    //- CONSTRUCTOR
    constructor({ selector, viewRatio = 0.97, optionIntersectionObserver = {}, scrollOptions = {} } = {}) {
        this.selector = selector;
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

        this.container = this.selector ? pgs(this.selector).querySelector("slides-container") : null;
    }
    
    //+ CREATE BUTTON 
    #createButtonsAndDots() {
        const EL = this.selector

        //== PULSANTI
        if (!pgs(EL).querySelector('slides-prec') && !pgs(EL).querySelector('slides-next')) {
            EL.insertAdjacentHTML("afterbegin", `<button pgs="slides-prec buttonIcon" type="button" class="precButton" aria-label="slide precedente"> <span> <i class="fa-solid fa-arrow-left"></i></span></button>`);
            EL.insertAdjacentHTML("beforeend", `<button pgs="slides-next buttonIcon" type="button" class="nextButton" aria-label="prossima slide"> <span> <i class="fa-solid fa-arrow-right"></i></span></button>`);
        }

        //== DOTS
        if (!pgs(EL).querySelector('slides-dots')) {
            EL.insertAdjacentHTML("beforeend", `<div pgs="slides-dots" class="slides-dots"></div>`);

            Array.from(this.container.children).forEach(() => {
                pgs(EL).querySelector('slides-dots')
                    .insertAdjacentHTML("beforeend", `<button type="button" class="slide-dot" aria-label="vai alla prossima slide"></button>`);
            });
        }
    }

    //+ PREV 
    #previousSlide() {
        const currents = this.container.querySelectorAll('.view');
        let current;
        

        if (pgs(this.selector).option.contains('singleScroll')) current = currents[currents.length - 1];
        else current = currents[0];

        const prev = current?.previousElementSibling;

        prev?.scrollIntoView(this.scrollOptions);
        prev?.focus({ preventScroll: true });
    }

    //+ NEXT 
    #nextSlide() {
        const currents = this.container.querySelectorAll('.view');
        let current;

        
        
        if (pgs(this.selector).option.contains('singleScroll')) current = currents[0];
        else current = currents[currents.length - 1];
        
        const next = current?.nextElementSibling;
        console.log(current, next);

        next?.scrollIntoView(this.scrollOptions);
        next?.focus({ preventScroll: true });
    }

    //+ GO TO NUMBER SLIDE 
    #goToNumberSlide(index) {
        this.container.children[index].scrollIntoView(this.scrollOptions)
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
        const slides = this.selector;
        if (!this.container) return

        //== elements
        this.#createButtonsAndDots();
        const precButton = pgs(slides).querySelector('slides-prec');
        const nextButton = pgs(slides).querySelector('slides-next');
        const dots = Array.from(pgs(slides).querySelector('slides-dots').children);

        //== option
        const notScrollWithMouse = pgs(slides).option.contains('notScrollWithMouse');

        //== scroll
        if (!notScrollWithMouse) (0,_functions_scrollY__WEBPACK_IMPORTED_MODULE_0__.PGS_scrollHorizontal)(this.container, 5);

        //==Listener: DOT, PREC, NEXT
        dots.forEach((dot, index) => dot.addEventListener("click", e => this.#goToNumberSlide(index)));
        precButton.addEventListener("click", e => this.#previousSlide(), { passive: true });
        nextButton.addEventListener("click", e => this.#nextSlide(), { passive: true });

        //== observer
        const observer = new IntersectionObserver(
            (allLi) => this.#callback(allLi, this.container, precButton, nextButton, dots),
            { root: this.container, ...this.optionIntersectionObserver }
        );
        Array.from(this.container.children).forEach(allLi => observer.observe(allLi));


        //- API
        API.set(this.selector, {
            element: this.selector,
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
        });
    }
}
PGS_slides_init();

//# INIT 
function PGS_slides_init(root = document) {
    pgs(root).querySelectorAll("slides").forEach(el => {
        if (API.has(el)) return;

        const instance = new PGS_Slides({ selector: el });
        instance.execute();
    });
}

//# API 
function PGS_slides_api(selector) {
    return API.get(selector);
}


/***/ },

/***/ "./assets/javascript/components/_stepTabs.js"
/*!***************************************************!*\
  !*** ./assets/javascript/components/_stepTabs.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_stepTabs: () => (/* binding */ PGS_stepTabs),
/* harmony export */   PGS_tabs_api: () => (/* binding */ PGS_tabs_api)
/* harmony export */ });
const API = new WeakMap();
PGS_stepTabs()

function PGS_stepTabs() {
    pgs(document).querySelectorAll("stepTabs").forEach(tabsWizard => {
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
                dot.setAttribute("data-step", index);
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

        //= data-tab-locked
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
            restart: restartTab,
            goTo,
            next: () => goTo(current + 1),
            prev: () => goTo(current - 1),
            toggleLock: (step, lock = true) => typeof step === "number" && allTab[step] && (pgs(allTab[step]).state.toggle("is-locked", lock), goTo(current)),
            getCurrent: () => current,
            getState: () => ({ current, total }),
        });
    });
}

function PGS_tabs_api(selector) {
    return API.get(selector);
}

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
/* harmony export */   PGS_ol: () => (/* binding */ PGS_ol)
/* harmony export */ });

function PGS_ol() {
    pgs(document).querySelectorAll("steps").forEach(steps => {

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
            const line = document.createElement("span");
            pgs(line).add("steps-step-line")
            li.insertAdjacentElement("afterbegin", line);
        });
    });
}

//# INIT PGS_ol
PGS_ol()

/***/ },

/***/ "./assets/javascript/functions/_notifications.js"
/*!*******************************************************!*\
  !*** ./assets/javascript/functions/_notifications.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_notification: () => (/* binding */ PGS_notification),
/* harmony export */   PGS_toast: () => (/* binding */ PGS_toast)
/* harmony export */ });
//# PGS_notification
function initNotification(type, containerToken, icon, text, timeout, methodDelete = "replace", link = null) {
    let containerNotification = pgs(document).querySelector(containerToken);

    //== Create Container
    if (!containerNotification) {
        const newContainer = document.createElement("div");
        pgs(newContainer).add(containerToken);
        newContainer.setAttribute("aria-live", "polite");
        newContainer.setAttribute("aria-relevant", "additions");
        document.body.appendChild(newContainer);
        containerNotification = newContainer;
    }

    //== Create Notification
    const notification = document.createElement(link ? "a" : "div");
    if (methodDelete == "replace") containerNotification.innerHTML = "";
    if (link) notification.href = link;
    if (timeout > 0) notification.style.setProperty("--notification-timeout", timeout + "ms");
    pgs(notification).state.add(type);
    pgs(notification).add("notification-element");
    notification.setAttribute("role", type == "error" ? "alert" : "status")
    notification.innerHTML = `${icon} <p>${text}</p>`;
    containerNotification.appendChild(notification);


    //+ Animation delete 
    function deleteNotification() {
        methodDelete == "stack" ? notification.style.translate = "120%" : notification.style.opacity = "0";
        setTimeout(() => notification.remove(), 300);
    }

    //== Timeout delete
    if (timeout > 0) setTimeout(() => { deleteNotification() }, timeout);

    //== button delete
    const btnDelete = document.createElement("button");
    btnDelete.type = "button";
    btnDelete.ariaLabel = "Rimuovi notifica";
    btnDelete.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    btnDelete.setAttribute("pgs", "buttonClose");
    notification.insertAdjacentElement("afterbegin", btnDelete);

    //== event
    btnDelete.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation()
        deleteNotification(e); // Esegue la tua funzione
    });
}

function deleteALl(containerToken) {
    let containerNotification = pgs(document).querySelector(containerToken);
    if (containerNotification) containerNotification.innerHTML = "";
}



let PGS_notification = {
    error: (text = "Errore", link = null, timeout = 0, icon = '<i class="fa-solid fa-octagon-xmark"></i>') => initNotification("error", "notification", icon, text, timeout, "stack", link),
    success: (text = "Aggiornato", link = null, timeout = 0, icon = '<i class="fa-solid fa-check"></i>') => initNotification("success", "notification", icon, text, timeout, "stack", link),
    info: (text = "Aggiornamento", link = null, timeout = 0, icon = '<i class="fa-solid fa-circle-info"></i>',) => initNotification("info", "notification", icon, text, timeout, "stack", link),
    warning: (text = "Attenzione", link = null, timeout = 0, icon = '<i class="fa-solid fa-triangle-exclamation"></i>') => initNotification("warning", "notification", icon, text, timeout, "stack", link),
    deleteAllNotification: () => deleteALl("notification")
}

let PGS_toast = {
    error: (text = "Errore", timeout = 4000, icon = '<i class="fa-solid fa-octagon-xmark"></i>',) => initNotification("error", "toast", icon, text, timeout),
    success: (text = "Aggiornato", timeout = 4000, icon = '<i class="fa-solid fa-check"></i>',) => initNotification("success", "toast", icon, text, timeout),
    info: (text = "Aggiornamento", timeout = 0, icon = '<i class="fa-solid fa-circle-info"></i>',) => initNotification("info", "toast", icon, text, timeout),
    warning: (text = "Attenzione", timeout = 4000, icon = '<i class="fa-solid fa-triangle-exclamation"></i>',) => initNotification("warning", "toast", icon, text, timeout),
    deleteTost: () => deleteALl("toast")
}

/***/ },

/***/ "./assets/javascript/functions/_scrollY.js"
/*!*************************************************!*\
  !*** ./assets/javascript/functions/_scrollY.js ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_scrollHorizontal: () => (/* binding */ PGS_scrollHorizontal)
/* harmony export */ });
function PGS_scrollHorizontal(querySelector, dataSpeed) {
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
    
    let el = querySelector
    el.addEventListener('wheel', (e) => {
        const speed = dataSpeed;

        //== lascia lo scroll naturale del trackpad
        if (TrackpadDetector.update(e)) return;

        //== Evita interferenze con zoom o scroll orizzontale nativo
        if (e.ctrlKey) return;
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

        //== Converti delta in px per lo shift orizzontale
        let delta = e.deltaY;
        if (e.deltaMode === 1) delta *= 16;
        else if (e.deltaMode === 2) delta *= el.clientHeight;

        //== Verifica se il contenitore può ancora scrollare orizzontalmente
        const atStart = el.scrollLeft <= 0;
        const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
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
        el.scrollLeft += delta * speed;
    }, { passive: false });
}


/***/ },

/***/ "./assets/javascript/patterns/_cookieConsent.js"
/*!******************************************************!*\
  !*** ./assets/javascript/patterns/_cookieConsent.js ***!
  \******************************************************/
() {

const STORAGE_KEY = 'pgs_cookie_preferences_v1';
const focusableSelectors = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

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
document.addEventListener('DOMContentLoaded', function () {
    const root = pgs(document).querySelector('cookieConsent');
    if (!root) return;

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
});


/***/ },

/***/ "./assets/javascript/patterns/_header.js"
/*!***********************************************!*\
  !*** ./assets/javascript/patterns/_header.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PGS_header: () => (/* binding */ PGS_header)
/* harmony export */ });
//# HEADER
const header = pgs(document).querySelector("header");
const headerElements = pgs(header).querySelectorAll("header-element");
headerElements.forEach(element => PGS_header(element));

//= HEADER
function PGS_header(selectHeader) {

    //= INIT
    if (selectHeader.getAttribute("data-initialize") == "true") return;
    selectHeader.setAttribute("data-initialize", "true");

    //= ACTIVE MOBILE 
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
            header.setAttribute("data-header-mobileActive", "true");
            selectHeader.setAttribute("data-header-mobileActive", "true");
        } else if (headerElementWidth < childsWidth) {
            header.setAttribute("data-header-mobileActive", "true");
            headerElement.setAttribute("data-header-mobileActive", "true");
            menuAttivate = true;
            childsWidthSAVE = childsWidth;
        } else {
            header.setAttribute("data-header-mobileActive", "false");
            headerElement.setAttribute("data-header-mobileActive", "false");
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

}




//= HEADER HEIGHT
const body = document.querySelector("body");
function headerHeight() {
    const headerElements = document.querySelectorAll("header > [data-initialize=true]");
    const wordPressBar = window.getComputedStyle(document.documentElement).marginTop ?? 0;

    const totalHeight = Array.from(headerElements)
        .map(el => el.offsetHeight)
        .reduce((sum, h) => sum + h);

    const height = totalHeight + parseInt(wordPressBar);

    body.style.setProperty('--heightOfHeader', `${height}px`);
    const scrollHeight = document.querySelector("header").getAttribute("data-header-scroll") === "true" ? 0 : height;
    body.style.setProperty('--heightOfHeaderScroll', `${scrollHeight}px`);

}
headerHeight()
window.addEventListener("resize", headerHeight);
window.addEventListener("scroll", headerHeight);


//= SCROLL
// Nasconde l'header quando si scorre verso il basso e lo mostra quando si scorre verso l'alto su dispositivi con larghezza fino a 900px.
let lastScrollY = window.scrollY;
window.addEventListener("scroll", () => {
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

// Ripristina la posizione dell'header quando si esce dalla modalità mobile
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) header.style.transform = "translateY(0)";
});

// MOBILE ACTIVE
if (window.innerWidth < 600) {
    document.querySelector("header").setAttribute("data-header-mobileActive", "true");
    document.querySelector("[pgs~=header-element]").setAttribute("data-header-mobileActive", "true");
}

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
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
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
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
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!************************************!*\
  !*** ./assets/javascript/index.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pgs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_pgs.js */ "./assets/javascript/_pgs.js");
/* harmony import */ var _base_darkmode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base/_darkmode.js */ "./assets/javascript/base/_darkmode.js");
/* harmony import */ var _base_darkmode_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_base_darkmode_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _base_object_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base/_object.js */ "./assets/javascript/base/_object.js");
/* harmony import */ var _base_object_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_base_object_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_accordion_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/_accordion.js */ "./assets/javascript/components/_accordion.js");
/* harmony import */ var _components_accordion_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_components_accordion_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_dropdown_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/_dropdown.js */ "./assets/javascript/components/_dropdown.js");
/* harmony import */ var _components_exeNotifications_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/_exeNotifications.js */ "./assets/javascript/components/_exeNotifications.js");
/* harmony import */ var _components_menu_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/_menu.js */ "./assets/javascript/components/_menu.js");
/* harmony import */ var _components_modals_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/_modals.js */ "./assets/javascript/components/_modals.js");
/* harmony import */ var _components_slides_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/_slides.js */ "./assets/javascript/components/_slides.js");
/* harmony import */ var _components_steps_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/_steps.js */ "./assets/javascript/components/_steps.js");
/* harmony import */ var _components_stepTabs_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/_stepTabs.js */ "./assets/javascript/components/_stepTabs.js");
/* harmony import */ var _patterns_header_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./patterns/_header.js */ "./assets/javascript/patterns/_header.js");
/* harmony import */ var _patterns_cookieConsent_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./patterns/_cookieConsent.js */ "./assets/javascript/patterns/_cookieConsent.js");
/* harmony import */ var _patterns_cookieConsent_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_patterns_cookieConsent_js__WEBPACK_IMPORTED_MODULE_12__);
//= PGS


//= BASE



//= CN 









//= patterns 



})();

/******/ })()
;
//# sourceMappingURL=index.js.map