import { pgs } from "../_pgs.js";

const API = new WeakMap();

//# BUILD
// completes every step of one list and returns its API
function PGS_steps_build(steps) {
    pgs.helper.directChildren(steps, "steps-step").forEach((li, index) => {

        //# CIRCLE
        // a hand-written circle keeps the bare name; a generated one gets the underscore,
        // so the check below has to look for either
        if (!pgs.helper.directChild(li, ["steps-step-circle", "_steps-step-circle"])) {
            const circle = document.createElement("span");
            pgs(circle).add("_steps-step-circle")
            circle.textContent = index + 1;
            li.insertAdjacentElement("afterbegin", circle);
        }

        //# line
        // same dual form as the circle above
        if (!pgs.helper.directChild(li, ["steps-step-line", "_steps-step-line"])) {
            const line = document.createElement("span");
            pgs(line).add("_steps-step-line")
            li.insertAdjacentElement("afterbegin", line);
        }
    });

    // nothing here holds a listener or an observer, so destroy only forgets the instance
    const destroy = () => {
        if (API.get(steps) !== api) return;
        API.delete(steps);
    };

    const api = {
        element: steps,
        steps: () => pgs.helper.directChildren(steps, "steps-step"),
        getStep: (index) => pgs.helper.directChildren(steps, "steps-step")[index],
        getTotal: () => pgs.helper.directChildren(steps, "steps-step").length,
        destroy,
        refresh: () => {
            const live = API.get(steps);
            if (live && live !== api) return live;
            destroy();
            return PGS_steps_build(steps);
        },
    };
    API.set(steps, api);

    return api;
}

function PGS_steps_init(root = document) {
    pgs.helper.roots(root, "steps").forEach(steps => {
        if (API.has(steps)) return;

        PGS_steps_build(steps);
    });
}

pgs.helper.onDocumentReady(PGS_steps_init);

//# API
function PGS_steps_api(selector) {
    return API.get(selector);
}

export const PGS_steps = {
    init: PGS_steps_init,
    api: PGS_steps_api
};
