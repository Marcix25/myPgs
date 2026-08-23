import { PGS_onDocumentReady } from "../helper/_onDocumentReady.js";

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

    _getDuration(toast) {
        const rawDuration = toast.duration;
        const duration = Number.parseInt(rawDuration, 10);
        return Number.isNaN(duration) ? undefined : duration;
    },

    _getType(toast) {
        const type = String(toast.type || "info").trim();
        return typeof PGS_toast[type] === "function" ? type : "info";
    },

    _getData(root) {
        const rawToast = pgs(root).option.getValueBrackets("toast") || "{}";

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
        const safeDescription = this._formatText(description);
        const safeTitle = this._formatText(title);

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
        const definedOptions = Object.fromEntries(
            Object.entries(options).filter(([, value]) => value !== undefined)
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
        if (timeout > 0) toast.style.setProperty("--notification-timeout", timeout + "ms");
        pgs(toast).state.add(type);
        pgs(toast).add("_toast-element");
        toast.setAttribute("role", type == "error" ? "alert" : "status");
        toast.innerHTML = `
            <div pgs="_toast-element-content">
                <div pgs="_toast-element-icon">${icon}</div>
                <p>${text}</p>
            </div>
            <div pgs="_toast-element-buttons">
                <button type="button" pgs="button _toast-element-buttons-delete">${closeTitle}</button>
            </div>
        `;

        const toastButtons = pgs(toast).querySelector("_toast-element-buttons");
        const btnDelete = pgs(toast).querySelector("_toast-element-buttons-delete");
        btnDelete.ariaLabel = closeTitle === "Close" ? "Close notification" : closeTitle;

        if (link) {
            const toastLink = document.createElement("a");
            toastLink.href = link;
            toastLink.textContent = linkTitle;
            pgs(toastLink).add("button");
            toastButtons.insertAdjacentElement("afterbegin", toastLink);
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
            e.stopImmediatePropagation()
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
            const description = String(toast.message || "").trim();
            const linkTitle = String(toast["title-link"] || this._defaults.linkTitle).trim();
            const closeTitle = String(toast["title-close"] || this._defaults.closeTitle).trim();

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
    deleteAll: () => fn_toast.deleteAll()
};


//= EXECUTE
PGS_onDocumentReady(PGS_toastLoad_init);
