import { PGS_onDocumentReady } from "../helper/_onDocumentReady.js";
import { fn_alert } from "./_alerts.js";

//= PGS_toast
//+ the single floating stack: one message at a time, fixed on screen. It only owns the container
//+ and reads its data (pgs-data="toast[...]"), then hands everything to the shared alert engine
//+ (see _alerts.js) — dismiss, timeout, countdown bar and events are the alert's own.
const fn_toast = {
    _defaults: {
        timeout: 4000
    },
    _options: ["toastLeft", "toastRight", "toastCenter", "toastBottom"],

    //== a hand-written container keeps the bare name; a generated one gets the underscore, so this needs both
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

    //== position flags land on the container, the way Modal copies the ones on its wrapper to _dialog:
    //== _toast is the pgs-generated-only token that carries them, rebuilt at every toast so one toast's
    //== position never leaks into the next. They come from the position of the toast: the field of its
    //== pgs-data (toastLoad, toastExe) or the position option of a pgs.toast call. A container written
    //== by hand keeps its own as the baseline
    _applyOptions(container, position = []) {
        const wanted = [Array.isArray(position) ? position : String(position).split(/\s+/)].flat().filter(Boolean);
        const unknown = wanted.filter(key => !this._options.includes(key));

        if (unknown.length) console.error(`PGS toast: unknown position ${unknown.join(", ")}; use ${this._options.join(", ")}.`);

        const keys = this._options.filter(key => wanted.includes(key));

        pgs(container).remove("_toast");
        pgs(container).add("_toast", ...keys.map(key => `_toast['${key}']`));
    },

    _add(type, options) {
        const { timeout = this._defaults.timeout, position, ...config } = fn_alert._toOptions(options, "toast");

        const toast = fn_alert.create(type, {
            ...config,
            component: "_alert",
            dismissible: true,
            timeout,
            //== the dismiss button draws a cross, so closeTitle is its accessible name and nothing else
            closeTitle: config.closeTitle ?? "Close toast"
        });

        //== only one toast is shown at a time: a new one simply replaces whatever was there
        const container = this._getOrCreateContainer();
        this._applyOptions(container, position);
        container.replaceChildren(toast);
    },

    _dispatch(element) {
        fn_alert.fromData(element, "toast").forEach(({ type, options }) => this._add(type, options));
    },

    //== DELETE
    deleteAll() {
        const containerToast = this._getContainer();
        if (!containerToast) return;

        pgs(containerToast).querySelectorAll("_alert").forEach(element => element.pgsAlertClose());
    },


    //== TRIGGER
    trigger(root = document) {
        pgs(root).querySelectorAll("toastLoad").forEach(element => {
            if (!element || element.dataset.initialize === "true") return;

            element.dataset.initialize = "true";
            this._dispatch(element);
            element.remove();
        });
    },

    //== EXECUTE
    execute(root = document) {
        pgs(root).querySelectorAll("toastExe").forEach(element => {
            if (!element || element.dataset.initialize === "true") return;

            element.dataset.initialize = "true";
            element.addEventListener("click", () => this._dispatch(element));
        });
    }
};

function PGS_toastLoad_init(root = document) {
    fn_toast.trigger(root);
    fn_toast.execute(root);
}

export const PGS_toast = {
    init: PGS_toastLoad_init,
    trigger: PGS_toastLoad_init,
    error: (options = {}) => fn_toast._add("error", options),
    success: (options = {}) => fn_toast._add("success", options),
    info: (options = {}) => fn_toast._add("info", options),
    warning: (options = {}) => fn_toast._add("warning", options),
    neutral: (options = {}) => fn_toast._add("neutral", options),
    deleteAll: () => fn_toast.deleteAll()
};


//= EXECUTE
PGS_onDocumentReady(PGS_toastLoad_init);
