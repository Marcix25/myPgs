import { pgs } from "../_pgs.js";
import { PGS_roots } from "../helper/_dom.js";
import { PGS_onDocumentReady } from "../helper/_onDocumentReady.js";
import { PGS_warn } from "../helper/_warn.js";
import { fn_alert } from "./_alerts.js";
import { PGS_modal } from "./_modal.js";

//== the controller of each bell's click listener, and the notificationLoad elements already read
const BELLS = new WeakMap();
const LOADED = new WeakSet();

//= PGS_notification
//+ the group manager: one modal that holds the scrollable panel, every notificationBell that opens
//+ it, and the counter and empty state. It only reads its data and hands it to the shared alert
//+ engine (see _alerts.js): every message inside the panel is that alert card, built dismissible,
//+ with its buttons, never timed by default.
const fn_notification = {
    _defaults: {
        emptyMessage: "No notifications",
        panelCloseTitle: "Close"
    },
    //== a bell can say where the panel opens: a side (dialogLeft, dialogRight), a height (dialogTop,
    //== dialogBottom), or dialogCenter for the middle. Each axis it leaves out keeps the default,
    //== and the size is never a bell's business
    _positions: ["dialogLeft", "dialogRight", "dialogTop", "dialogBottom", "dialogCenter"],
    _animations: ["dialogAnimationLeft", "dialogAnimationRight"],
    _modal: null,
    _panelController: null,
    _missingBellReported: false,

    _getContainer() {
        return pgs(document).querySelector("_notification");
    },

    //== the count only ever changes through a card's own close animation (dismiss click, a button
    //== that closes, or deleteAll below), so this one listener covers every case.
    //== Deferred a tick: the event fires before the card is actually removed from the DOM
    _bindContainer(container, signal) {
        container.addEventListener("pgs:alert:close", () => {
            setTimeout(() => fn_notification._updateBellCounter(), 0);
        }, { signal });
    },

    //== the one modal every bell opens, built the first time anything needs it: the first
    //== notification, or the first click on a bell. It is not authored anywhere on the page
    _ensureModal() {
        if (this._modal?.isConnected) return this._modal;

        //== a panel that left the page takes its listeners with it
        this._panelController?.abort();
        this._panelController = new AbortController();
        const { signal } = this._panelController;

        const modal = document.createElement("div");
        pgs(modal).add("modal['dialogRight' 'dialogTop' 'dialogSmall' 'dialogAnimationRight']");

        const dialog = document.createElement("dialog");
        pgs(dialog).add("modal-dialog", "_notification-dialog");

        const content = document.createElement("div");
        pgs(content).add("modal-dialog-content", "_notification");
        content.setAttribute("aria-live", "polite");
        content.setAttribute("aria-relevant", "additions");
        this._bindContainer(content, signal);

        //== the panel closes from its own button, the one pgs.modal picks up inside the dialog. Written
        //== first, it sits above the first notification
        const closeButton = document.createElement("button");
        closeButton.type = "button";
        closeButton.textContent = this._defaults.panelCloseTitle;
        pgs(closeButton).add("button['btnMini']", "_modal-close", "_notification-close");
        content.appendChild(closeButton);

        dialog.appendChild(content);
        modal.appendChild(dialog);
        document.body.appendChild(modal);
        PGS_modal.init(modal);

        //== the bells say whether the panel is open, whichever way it got opened or closed
        modal.addEventListener("pgs:modal:open", () => this._setBellsExpanded(true), { signal });
        modal.addEventListener("pgs:modal:close", () => this._setBellsExpanded(false), { signal });

        this._modal = modal;
        this._updateBellCounter();
        return modal;
    },

    _getBells(root = document) {
        return PGS_roots(root, "notificationBell");
    },

    _setBellsExpanded(expanded) {
        this._getBells().forEach(bell => bell.setAttribute("aria-expanded", String(expanded)));
    },

    //== puts the position this bell asks for on the one modal. Only ever called while the panel is
    //== closed: moving an open panel would make it jump. The slide comes in from the side it ends up on
    _applyPosition(bell) {
        const wanted = this._positions.filter(key => pgs(bell).option.contains(key));
        const side = wanted.find(key => key === "dialogLeft" || key === "dialogRight") ?? "dialogRight";
        const height = wanted.find(key => key === "dialogTop" || key === "dialogBottom") ?? "dialogTop";
        const flags = wanted.includes("dialogCenter")
            ? ["dialogCenter"]
            : [side, height, side === "dialogLeft" ? "dialogAnimationLeft" : "dialogAnimationRight"];

        //== pgs.modal moves the dialog out of its wrapper, so it is asked for rather than searched for
        const dialog = PGS_modal.api(this._modal).dialog;
        [[this._modal, "modal"], [dialog, "_dialog"]].forEach(([element, token]) => {
            pgs(element).option.remove(...this._positions, ...this._animations);
            pgs(element).add(`${token}[${flags.map(flag => `'${flag}'`).join(" ")}]`);
        });
    },

    //== a bell is a plain button: it only asks the one modal to toggle
    _bindBells(root = document) {
        this._getBells(root).forEach(bell => {
            if (BELLS.has(bell)) return;

            const controller = new AbortController();
            BELLS.set(bell, controller);
            this._missingBellReported = false;

            //== a hand-written counter keeps the bare name; a generated one gets the underscore,
            //== so this is the one place that has to check for either
            if (!pgs(bell).querySelector(["notificationBell-counter", "_notificationBell-counter"])) {
                const counter = document.createElement("span");
                pgs(counter).add("_notificationBell-counter");
                bell.appendChild(counter);
            }

            bell.setAttribute("aria-haspopup", "dialog");
            bell.setAttribute("aria-expanded", String(Boolean(this._modal?.isConnected && PGS_modal.api(this._modal)?.isOpen())));
            bell.addEventListener("click", () => {
                const modal = this._ensureModal();
                const api = PGS_modal.api(modal);

                //== open already: this click closes it, and nothing moves
                if (!api.isOpen()) this._applyPosition(bell);
                api.toggle();
            }, { signal: controller.signal });
        });
    },

    _add(type, options) {
        const scope = `notification.${type}`;
        const config = fn_alert._toOptions(options, scope);
        const notification = fn_alert.create(type, {
            ...config,
            component: "_alert",
            dismissible: true,
            //== the dismiss button draws a cross, so closeTitle is its accessible name and nothing else
            closeTitle: config.closeTitle ?? "Close notification"
        });

        //== the notification is kept either way, so a bell added later still shows it; but with no
        //== bell there is nothing to open the panel from, and that is worth saying out loud
        if (!this._getBells().length && !this._missingBellReported) {
            this._missingBellReported = true;
            PGS_warn(scope, "no notificationBell on the page, so nothing can open the panel that holds this notification");
        }

        this._ensureModal();
        this._getContainer().appendChild(notification);
        this._updateBellCounter();
    },

    //== only loops and asks each card to close itself the same way its own dismiss button would;
    //== the close animation and the pgs:alert:close event are the engine's job, not this one's
    deleteAll() {
        const containerNotification = this._getContainer();
        if (!containerNotification) return;

        pgs(containerNotification).querySelectorAll("_alert").forEach(element => element.pgsAlertClose());
    },

    _updateBellCounter() {
        const container = this._getContainer();
        const count = container ? pgs(container).querySelectorAll("_alert").length : 0;

        pgs(document).querySelectorAll(["notificationBell-counter", "_notificationBell-counter"]).forEach(counter => {
            counter.textContent = count > 0 ? count : "";
        });

        if (!container) return;

        let emptyMessage = pgs(container).querySelector("_notification-empty");

        if (count === 0) {
            if (!emptyMessage) {
                emptyMessage = document.createElement("p");
                pgs(emptyMessage).add("_notification-empty");
                container.appendChild(emptyMessage);
            }
            emptyMessage.textContent = this._defaults.emptyMessage;
        } else {
            emptyMessage?.remove();
        }
    },

    load(root = document) {
        PGS_roots(root, "notificationLoad").forEach(element => {
            if (LOADED.has(element)) return;

            LOADED.add(element);
            fn_alert.fromData(element, "notification").forEach(({ type, options }) => this._add(type, options));
            element.remove();
        });
    }
};

//# TRIGGER
//+ opening/closing the panel is the one modal's job; every notificationBell just asks it to toggle
function PGS_notificationLoad_init(root = document) {
    fn_notification._bindBells(root);
    fn_notification.load(root);
    fn_notification._updateBellCounter();
}

export const PGS_notification = {
    init: PGS_notificationLoad_init,
    trigger: PGS_notificationLoad_init,
    error: (options = {}) => fn_notification._add("error", options),
    success: (options = {}) => fn_notification._add("success", options),
    info: (options = {}) => fn_notification._add("info", options),
    warning: (options = {}) => fn_notification._add("warning", options),
    neutral: (options = {}) => fn_notification._add("neutral", options),
    deleteAll: () => fn_notification.deleteAll()
};


//= EXECUTE
PGS_onDocumentReady(PGS_notificationLoad_init);
