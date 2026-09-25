import { PGS_onDocumentReady } from "../helper/_onDocumentReady.js";
import { PGS_formatText } from "../helper/_text.js";

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
        const safeDescription = PGS_formatText(description);
        const safeTitle = PGS_formatText(title);

        if (!safeTitle) return `<span>${safeDescription}</span>`;
        if (!safeDescription) return `<strong>${safeTitle}</strong>`;

        return `
            <strong>${safeTitle}</strong>
            <span>${safeDescription}</span>
        `;
    },

    //== a hand-written container keeps the bare name; a generated one gets the underscore, so
    //== this needs both
    _getContainer() {
        return pgs(document).querySelector(["toast", "_toast"]);
    },

    _getOrCreateContainer() {
        let containerToast = this._getContainer();

        if (!containerToast) {
            containerToast = document.createElement("div");
            pgs(containerToast).add("_toast");
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
        if (timeout > 0) toast.style.setProperty("--_toast-timeout", timeout + "ms");
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
                <button type="button" pgs="button['btnIconOnly'] _toast-element-content-delete"><i pgs="icon['icon-close']"></i></button>
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

export const PGS_toast = {
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
PGS_onDocumentReady(PGS_toastLoad_init);
