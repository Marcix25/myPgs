//= PGS_notification
const fn_notification = {
    _escapeHtml(value) {
        return String(value ?? "");
    },

    _getDuration(notification) {
        const rawDuration = notification.duration;
        const duration = Number.parseInt(rawDuration, 10);

        return Number.isNaN(duration) ? 5000 : duration;
    },

    _getApi(notification) {
        const element = String(notification.element || "notification").trim();

        return element === "toast" ? PGS_notification.toast : PGS_notification.alert;
    },

    _getType(notification, api) {
        const type = String(notification.type || "info").trim();

        return typeof api[type] === "function" ? type : "info";
    },

    _getData(root) {
        try {
            return JSON.parse(root.dataset.notification || "{}");
        } catch (error) {
            console.warn("PGS notification: dati non validi", error);
            return {};
        }
    },

    _getContent(title, content) {
        const safeContent = this._escapeHtml(content);
        const safeTitle = this._escapeHtml(title);

        if (!safeTitle) return safeContent;
        if (!safeContent) return `<span pgs="notification-element-title">${safeTitle}</span>`;

        return `
            <span pgs="notification-element-title">${safeTitle}</span>
            <br>
            <span pgs="notification-element-content">${safeContent}</span>
        `;
    },

    initNotification(type, containerToken, icon, text, timeout, methodDelete = "replace", link = null) {
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
    },

    deleteAll(containerToken) {
        let containerNotification = pgs(document).querySelector(containerToken);
        if (containerNotification) containerNotification.innerHTML = "";
    },

    trigger(root = document) {
        pgs(root).querySelectorAll("notificationTrigger").forEach(element => {
            if (!element || element.dataset.initialize === "true") return;

            element.dataset.initialize = "true";

            const notification = this._getData(element);
            const title = String(notification.title || "").trim();
            const content = String(notification.message || "").trim();

            if (!title && !content) {
                element.remove();
                return;
            }

            const link = notification.link || null;
            const icon = notification.icon || undefined;
            const duration = this._getDuration(notification);
            const api = this._getApi(notification);
            const type = this._getType(notification, api);
            const formattedContent = this._getContent(title, content);

            if (api === PGS_notification.toast) api[type](formattedContent, duration, icon);
            else api[type](formattedContent, link, duration, icon);

            element.remove();
        });
    }
};

//# EXPORT 
export function PGS_notificationTrigger_init(root = document) {
    return fn_notification.trigger(root);
}

export const PGS_notification = {
    PGS_name: "PGS_notification",
    trigger: PGS_notificationTrigger_init,
    alert: {
        error: (text = "Errore", link = null, timeout = 0, icon = '<i class="fa-solid fa-octagon-xmark"></i>') => fn_notification.initNotification("error", "notification", icon, text, timeout, "stack", link),
        success: (text = "Aggiornato", link = null, timeout = 0, icon = '<i class="fa-solid fa-check"></i>') => fn_notification.initNotification("success", "notification", icon, text, timeout, "stack", link),
        info: (text = "Aggiornamento", link = null, timeout = 0, icon = '<i class="fa-solid fa-circle-info"></i>',) => fn_notification.initNotification("info", "notification", icon, text, timeout, "stack", link),
        warning: (text = "Attenzione", link = null, timeout = 0, icon = '<i class="fa-solid fa-triangle-exclamation"></i>') => fn_notification.initNotification("warning", "notification", icon, text, timeout, "stack", link),
        deleteAll: () => fn_notification.deleteAll("notification")
    },
    toast: {
        error: (text = "Errore", timeout = 4000, icon = '<i class="fa-solid fa-octagon-xmark"></i>',) => fn_notification.initNotification("error", "toast", icon, text, timeout),
        success: (text = "Aggiornato", timeout = 4000, icon = '<i class="fa-solid fa-check"></i>',) => fn_notification.initNotification("success", "toast", icon, text, timeout),
        info: (text = "Aggiornamento", timeout = 0, icon = '<i class="fa-solid fa-circle-info"></i>',) => fn_notification.initNotification("info", "toast", icon, text, timeout),
        warning: (text = "Attenzione", timeout = 4000, icon = '<i class="fa-solid fa-triangle-exclamation"></i>',) => fn_notification.initNotification("warning", "toast", icon, text, timeout),
        deleteAll: () => fn_notification.deleteAll("toast")
    }
};


//= EXECUTE 
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => PGS_notificationTrigger_init());
else PGS_notificationTrigger_init();
