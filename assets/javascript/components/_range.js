import { pgs } from "../_pgs.js";

const API = new WeakMap();

const SELECTOR = 'input[type="range"]';

//# BUILD
// keeps --_range-progress, the place of the value between min and max from 0 to 1, up to date on one
// slider: the pgs="range" track (see _formControls.scss) paints the part the thumb has passed from it, in every browser
function PGS_range_build(input) {
    const controller = new AbortController();
    const { signal } = controller;

    const update = () => {
        const min = parseFloat(input.min) || 0;
        const max = input.max === "" ? 100 : parseFloat(input.max);
        const span = max - min;
        const ratio = span > 0 ? (parseFloat(input.value) - min) / span : 0;

        input.style.setProperty("--_range-progress", String(Math.min(1, Math.max(0, ratio || 0))));
    };

    input.addEventListener("input", update, { signal });
    input.addEventListener("change", update, { signal });
    // a reset puts the value back after the event, so the slider is read once it has settled
    input.form?.addEventListener("reset", () => setTimeout(update), { signal });
    update();

    const destroy = () => {
        if (API.get(input) !== api) return;
        controller.abort();
        input.style.removeProperty("--_range-progress");
        API.delete(input);
    };

    const api = {
        element: input,
        // for a value written by a script (input.value = ...), which raises no event
        update,
        destroy,
        refresh: () => {
            const live = API.get(input);
            if (live && live !== api) return live;
            destroy();
            return PGS_range_build(input);
        },
    };
    API.set(input, api);

    return api;
}

//# INIT
function PGS_range_init(root = document) {
    if (!(root instanceof Document || root instanceof Element)) {
        throw pgs.helper.invalid("range.init", "root must be a Document or an Element");
    }

    const inputs = Array.from(root.querySelectorAll(SELECTOR));
    if (root instanceof Element && root.matches(SELECTOR)) inputs.unshift(root);

    inputs.forEach(input => {
        if (API.has(input)) return;

        PGS_range_build(input);
    });
}

pgs.helper.onDocumentReady(PGS_range_init);

//# API
function PGS_range_api(selector) {
    return API.get(selector);
}

export const PGS_range = {
    init: PGS_range_init,
    api: PGS_range_api
};
