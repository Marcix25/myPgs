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
            throw new TypeError("PGS notification: options deve essere un oggetto o una stringa");
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

export const PGS_notification = {
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
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => PGS_notificationTrigger_init());
else PGS_notificationTrigger_init();
