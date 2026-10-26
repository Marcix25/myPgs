import { pgs } from "../_pgs.js";

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
        // markup of the dismiss button, trusted like icon: what it draws is the author's, from any icon set
        dismissIcon: "<i pgs=\"icon['icon-close']\"></i>",
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
            // the plain one: no severity color, no glyph and no title of its own, so it stays on the box surface
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
            throw pgs.helper.invalid(scope, "root must be a Document or an Element");
        }

        let container = configuredContainer;
        if (typeof container === "string") container = root.querySelector(container);
        if (!container) container = pgs(root).querySelector("alertContainer");

        if (container && (!(container instanceof Element) || container === root || !root.contains(container))) {
            throw pgs.helper.invalid(scope, "container must be an element contained in root");
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

    // built to match the shared alert card's own content shape (see _alerts.scss): a title in
    // alert-content-title, a description in its own paragraph, either one optional
    _getContent(title, description) {
        const safeDescription = pgs.helper.formatText(description);
        const safeTitle = pgs.helper.formatText(title);
        const titleHtml = safeTitle ? `<strong pgs="_alert-content-title">${safeTitle}</strong>` : "";
        const descriptionHtml = safeDescription ? `<p>${safeDescription}</p>` : "";

        return `${titleHtml}${descriptionHtml}`;
    },

    // a button's link goes straight into href, so only a relative address, http(s):, mailto: and
    // tel: are accepted; any other scheme (javascript:, data:, ...) is reported and the button is
    // built as a plain button with no link. The characters a browser ignores inside a URL are
    // dropped before the scheme is read, so "java\tscript:" cannot slip through as a relative one
    _safeLink(link, scope) {
        if (link === null || link === undefined || link === "") return null;

        const text = String(link);
        const scheme = text.replace(/[\u0000-\u0020]/g, "").match(/^([a-z][a-z0-9+.-]*):/i)?.[1];
        if (scheme && !["http", "https", "mailto", "tel"].includes(scheme.toLowerCase())) {
            pgs.helper.warn(scope, `a button link can be relative, http(s):, mailto: or tel:, not ${scheme}:, so the link was ignored`, text);
            return null;
        }

        return text;
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
            throw pgs.helper.invalid(scope, "options must be an object or a string");
        }

        return Object.fromEntries(
            Object.entries(options).filter(([, value]) => value !== undefined && value !== null)
        );
    },

    // reads the pgs-data of one host element — notificationLoad carries pgs-data="notification[...]",
    // so name is "notification" — as a list of comma-separated JSON objects
    _getData(root, name) {
        const rawData = pgs(root).data.getValueBrackets(name) || "{}";
        let items;

        try {
            items = JSON.parse(`[${rawData}]`);
        } catch (error) {
            pgs.helper.warn(`${name}.init`, "invalid JSON in pgs-data", error);
            return [];
        }

        if (items.some(item => !item || typeof item !== "object" || Array.isArray(item))) {
            pgs.helper.warn(`${name}.init`, "every entry of pgs-data must be a JSON object", root);
            return [];
        }

        return items;
    },

    // the same data, already in the shape create() takes: the fields every host shares, with
    // their old aliases (message, title-close, duration). An entry with neither title nor
    // description is skipped: there would be nothing to show
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
                    dismissIcon: raw.dismissIcon || undefined,
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
            dismissIcon: this._defaults.dismissIcon,
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

        const id = config.id ?? pgs.helper.uniqueId("alert");
        const alert = document.createElement("div");
        // the severity is a flag in the component's own bracket, like any other option, not a pgs-state
        pgs(alert).add(config.component, `${config.component}['${typeDefaults.flag}']`);
        // error and warning are both urgent enough to interrupt a screen reader; the others only
        // announce once idle
        alert.setAttribute("role", type === "error" || type === "warning" ? "alert" : "status");

        // config.icon and config.dismissIcon are trusted markup, written into the card as given and not sanitized: they come
        // from the code that builds the alert (or from a notificationLoad / toastLoad the page's
        // own author wrote), never from text a visitor typed. title and description, which can be,
        // go through formatText and are escaped
        const iconHtml = config.icon ? `<div pgs="_alert-icon" aria-hidden="true">${config.icon}</div>` : "";
        const dismissHtml = config.dismissible ? `<button type="button" pgs="button['btnIconOnly'] _alert-dismiss">${config.dismissIcon}</button>` : "";

        // generated from scratch, so every child token here gets the underscore; the same
        // markup written by hand in the page instead keeps the bare names (see alerts.html)
        alert.innerHTML = `
            ${iconHtml}
            <div pgs="_alert-content">${this._getContent(config.title, config.description)}</div>
            ${dismissHtml}
            <div pgs="_alert-buttons"></div>
        `;

        const buttonsRow = pgs(alert).querySelector("_alert-buttons");
        const btnDismiss = pgs(alert).querySelector("_alert-dismiss");

        // every listener of this card goes with it once it is gone
        const controller = new AbortController();
        const { signal } = controller;
        let timeoutTimer = 0;
        let finishTimer = 0;
        let closed = false;

        // the card leaves: the event goes out while it is still in the document, so it reaches
        // every listener above it, and only then is it removed
        const finish = () => {
            clearTimeout(finishTimer);
            finishTimer = 0;
            pgs.helper.dispatch(alert, "pgs:alert:close", { id, type, title: config.title, description: config.description });
            alert.remove();
            controller.abort();
        };

        // closing twice (a dismiss while the timeout is still counting, or the timeout after a
        // button) changes nothing: the event is dispatched once. { immediate: true } skips the
        // fade and finishes now, for a host that is about to take the card out of the page itself
        // (a toast replacing another one), even when the fade is already running
        const close = ({ immediate = false } = {}) => {
            if (closed) {
                if (immediate && finishTimer) finish();
                return;
            }
            closed = true;
            clearTimeout(timeoutTimer);

            if (immediate) {
                finish();
                return;
            }

            alert.style.opacity = "0";
            finishTimer = setTimeout(finish, 300);
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
            const { id: buttonId = `${id}-button-${index + 1}`, title, link: rawLink, close: closeAfterClick, optionButton } =
                { ...this._defaults.button, ...button };

            const link = this._safeLink(rawLink, `alert.${type}`);
            const buttonElement = document.createElement(link ? "a" : "button");
            buttonElement.textContent = title;
            if (link) buttonElement.href = link;
            else buttonElement.type = "button";

            pgs(buttonElement).add("button['btnTransparent']");
            if (optionButton) pgs(buttonElement).add(`button['${optionButton}']`);

            buttonElement.addEventListener("click", (e) => {
                const event = pgs.helper.dispatch(buttonElement, "pgs:alert:buttonClick", {
                    id, buttonId, type, title: config.title, description: config.description, link
                }, { cancelable: true });

                if (link && event.defaultPrevented) e.preventDefault();
                if (closeAfterClick !== false) close();
            }, { signal });

            buttonsRow.appendChild(buttonElement);
        });

        // the row carries a padding and a tinted strip of its own, so an empty one is not
        // invisible: it has to be taken out of the layout. The default is [], never a falsy value
        if (!config.buttons?.length) pgs(buttonsRow).add("hidden");

        // the countdown bar is dormant by default (see _alerts.scss); setting its own duration is
        // what switches it on, wherever a timeout is actually used — not just inside Toast
        if (config.timeout > 0) {
            alert.style.setProperty("--_alert-timeout", config.timeout + "ms");
            timeoutTimer = setTimeout(() => close(), config.timeout);
        }

        return alert;
    },

    // puts the card in a host container in place of what it holds. A card that was there is closed
    // first and at once, while it is still attached: its close event reaches the listeners above it,
    // and its timer stops, instead of firing later on a node that is already out of the document
    replace(container, card) {
        Array.from(container.children).forEach(old => old.pgsAlertClose?.({ immediate: true }));
        container.replaceChildren(card);
    },

    show(type, options = {}) {
        const scope = `alert.${type}`;
        const { root, container, ...contentOptions } = this._toOptions(options, scope);
        // the placement is checked before the card is built, so a wrong root leaves nothing behind
        const target = root !== undefined || container !== undefined ? this._getContainer(root, container, scope) : null;
        const alert = this.create(type, contentOptions);

        if (target) this.replace(target, alert);
        return alert;
    }
};

export { fn_alert };

export const PGS_alert = {
    error: (options = {}) => fn_alert.show("error", options),
    success: (options = {}) => fn_alert.show("success", options),
    info: (options = {}) => fn_alert.show("info", options),
    warning: (options = {}) => fn_alert.show("warning", options),
    neutral: (options = {}) => fn_alert.show("neutral", options)
};
