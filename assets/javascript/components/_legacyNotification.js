import { PGS_onDocumentReady } from "../helper/_onDocumentReady.js";
import { PGS_notification } from "./_notification.js";
import { PGS_toast } from "./_toast.js";

//= PGS_notificationLegacy
//+ the only place that still understands the pre-split markup: <div pgs="hidden notificationTrigger" pgs-option='notification[{"element":"toast",...}]'>
//+ generated for example by PGS_md_notification() (PGS_theme/modules/md-notification.php), routes each entry to PGS_notification or PGS_toast by its "element" field.
const fn_legacy = {
    _defaults: {
        link: null,
        linkTitle: "Open",
        closeTitle: "Close"
    },

    _getApi(notification) {
        return String(notification.element || "").trim() === "toast" ? PGS_toast : PGS_notification;
    },

    _getType(notification, api) {
        const type = String(notification.type || "info").trim();
        return typeof api[type] === "function" ? type : "info";
    },

    _getDuration(notification) {
        const rawDuration = notification.timeout ?? notification.duration;
        const duration = Number.parseInt(rawDuration, 10);
        return Number.isNaN(duration) ? undefined : duration;
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
            console.warn("PGS notification (legacy notificationTrigger): Invalid JSON configuration", error);
            return [];
        }
    },

    trigger(root = document) {
        pgs(root).querySelectorAll("notificationTrigger").forEach(element => {
            if (!element || element.dataset.initialize === "true") return;

            element.dataset.initialize = "true";

            this._getData(element).forEach(notification => {
                const title = String(notification.title || "").trim();
                const description = String(notification.description ?? notification.message ?? "").trim();
                const linkTitle = String(notification.linkTitle || notification["title-link"] || this._defaults.linkTitle).trim();
                const closeTitle = String(notification.closeTitle || notification["title-close"] || this._defaults.closeTitle).trim();

                if (!title && !description) return;

                const link = notification.link || this._defaults.link;
                const icon = notification.icon || undefined;
                const duration = this._getDuration(notification);
                const api = this._getApi(notification);
                const type = this._getType(notification, api);
                const isToast = api === PGS_toast;

                api[type]({
                    title,
                    description,
                    icon,
                    closeTitle,
                    //+ PGS_toast still understands link/linkTitle/timeout directly; PGS_notification only understands buttons.
                    ...(isToast
                        ? { timeout: duration, link, linkTitle }
                        : { buttons: link ? [{ title: linkTitle, link }] : [] })
                });
            });

            element.remove();
        });
    }
};

//# TRIGGER
function PGS_notificationLegacy_init(root = document) {
    fn_legacy.trigger(root);
}

export const PGS_notificationLegacy = {
    init: PGS_notificationLegacy_init,
    trigger: PGS_notificationLegacy_init
};

//+ pre-split API shape: pgs.notification.alert.*/pgs.notification.toast.* — grafted onto the live PGS_notification
//+ object from the outside, so _notification.js itself never has to know this shape existed.
PGS_notification.alert = {
    error: PGS_notification.error,
    success: PGS_notification.success,
    info: PGS_notification.info,
    warning: PGS_notification.warning,
    deleteAll: PGS_notification.deleteAll
};

PGS_notification.toast = {
    error: PGS_toast.error,
    success: PGS_toast.success,
    info: PGS_toast.info,
    warning: PGS_toast.warning,
    deleteAll: PGS_toast.deleteAll
};


//= EXECUTE
PGS_onDocumentReady(PGS_notificationLegacy_init);
