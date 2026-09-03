import { PGS_onDocumentReady } from "../helper/_onDocumentReady.js";
import { PGS_formatText } from "../helper/_text.js";

//= PGS_notification
const fn_notification = {
    _uid: 0,
    _defaults: {
        id: null,
        buttons: [],
        description: "",
        closeTitle: "Close",
        emptyMessage: "No notifications",
        type: {
            error: {
                title: "Error",
                icon: '<i pgs="icon" pgs-option="icon-circleXmark"></i>'
            },
            success: {
                title: "Success",
                icon: '<i pgs="icon" pgs-option="icon-circleCheck"></i>'
            },
            info: {
                title: "Information",
                icon: '<i pgs="icon" pgs-option="icon-circleInfo"></i>'
            },
            warning: {
                title: "Warning",
                icon: '<i pgs="icon" pgs-option="icon-triangleExclamation"></i>'
            }
        }
    },

    _getType(notification) {
        const type = String(notification.type || "info").trim();
        return typeof PGS_notification[type] === "function" ? type : "info";
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
        const safeDescription = PGS_formatText(description);
        const safeTitle = PGS_formatText(title);

        if (!safeTitle) return `<span>${safeDescription}</span>`;
        if (!safeDescription) return `<strong>${safeTitle}</strong>`;

        return `
            <strong>${safeTitle}</strong>
            <span>${safeDescription}</span>
        `;
    },

    _getContainer() {
        return pgs(document).querySelector("notifications");
    },

    _getOrCreateContainer() {
        let containerNotification = this._getContainer();

        if (!containerNotification) {
            containerNotification = document.createElement("div");
            pgs(containerNotification).add("notifications");
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
        const definedOptions = Object.fromEntries(
            Object.entries(options).filter(([, value]) => value !== undefined)
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
        notification.innerHTML = `
            <div pgs="_notifications-element-content">
                <div pgs="_notifications-element-icon">${icon}</div>
                <p>${text}</p>
            </div>
            <div pgs="_notifications-element-buttons">
                <button type="button" pgs="button _notifications-element-buttons-delete">${closeTitle}</button>
            </div>
        `;

        const notificationButtons = pgs(notification).querySelector("_notifications-element-buttons");
        const btnDelete = pgs(notification).querySelector("_notifications-element-buttons-delete");
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
            pgs(buttonElement).add("button");
            if (button.optionButton) pgs(buttonElement).option.add(button.optionButton);

            buttonElement.addEventListener("click", (e) => {
                const proceed = buttonElement.dispatchEvent(new CustomEvent("pgs:notification:buttonClick", {
                    bubbles: true,
                    cancelable: true,
                    detail: { id: notificationId, buttonId, type, title, description, link: button.link }
                }));

                if (button.link && !proceed) e.preventDefault();
                if (button.close !== false) deleteNotification();
            });

            notificationButtons.insertBefore(buttonElement, btnDelete);
        });

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
            const ids = Array.from(pgs(containerNotification).querySelectorAll("_notifications-element"))
                .map(element => element.dataset.notificationId);

            containerNotification.innerHTML = "";
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

    //+ generates <dialog pgs-option="modalRight"><div pgs="modal-dialog-content"><div pgs="notifications"></div></div></dialog>
    //+ inside the modal wrapping notificationBell, then asks pgs.modal to (re)initialize it.
    _ensureDialog(root = document) {
        let created = false;

        pgs(root).querySelectorAll("notificationBell").forEach(bell => {
            const modalWrapper = bell.closest("[pgs~='modal']");
            if (!modalWrapper || modalWrapper.querySelector("dialog")) return;

            //== modalContainerID/modalContainerPGS move the dialog out of the wrapper, so on a later
            //== pgs.init() the wrapper looks empty again: without this marker every re-init
            //== would mint another empty panel and the bell would end up opening one of those.
            if (modalWrapper.dataset.notificationDialog === "true") return;
            modalWrapper.dataset.notificationDialog = "true";

            const dialog = document.createElement("dialog");
            pgs(dialog).option.add("modalRight modalMini modalTop");

            const content = document.createElement("div");
            pgs(content).add("modal-dialog-content");

            const list = document.createElement("div");
            pgs(list).add("notifications");

            content.appendChild(list);
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

export const PGS_notification = {
    init: PGS_notificationLoad_init,
    trigger: PGS_notificationLoad_init,
    error: (options = {}) => fn_notification.show("error", options),
    success: (options = {}) => fn_notification.show("success", options),
    info: (options = {}) => fn_notification.show("info", options),
    warning: (options = {}) => fn_notification.show("warning", options),
    deleteAll: () => fn_notification.deleteAll()
};


//= EXECUTE
PGS_onDocumentReady(PGS_notificationLoad_init);
