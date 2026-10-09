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

        const id = config.id ?? pgs.helper.uniqueId("alert");
        const alert = document.createElement("div");
        // the severity is a flag in the component's own bracket, like any other option, not a pgs-state
        pgs(alert).add(config.component, `${config.component}['${typeDefaults.flag}']`);
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

        const buttonsRow = pgs(alert).querySelector("_alert-buttons");
        const btnDismiss = pgs(alert).querySelector("_alert-dismiss");

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
                pgs.helper.dispatch(alert, "pgs:alert:close", { id, type, title: config.title, description: config.description });
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

export { fn_alert };

export const PGS_alert = {
    error: (options = {}) => fn_alert.show("error", options),
    success: (options = {}) => fn_alert.show("success", options),
    info: (options = {}) => fn_alert.show("info", options),
    warning: (options = {}) => fn_alert.show("warning", options),
    neutral: (options = {}) => fn_alert.show("neutral", options)
};
