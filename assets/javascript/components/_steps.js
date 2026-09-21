import { PGS_onDocumentReady } from "../helper/_onDocumentReady.js";

const API = new WeakMap();

function PGS_steps_init(root = document) {
    pgs(root).querySelectorAll("steps").forEach(steps => {
        if (API.has(steps)) return;

        pgs(steps).querySelectorAll("steps-step").forEach((li, index) => {
            
            //= CIRCLE
            //== a hand-written circle keeps the bare name; a generated one gets the underscore,
            //== so the check below has to look for either
            let circleLi;
            if (!pgs(li).querySelector(["steps-step-circle", "_steps-step-circle"])) {
                circleLi = document.createElement("span");
                pgs(circleLi).add("_steps-step-circle")
                circleLi.textContent = index + 1;
                li.insertAdjacentElement("afterbegin", circleLi);
            } else{
                circleLi = pgs(li).querySelector(["steps-step-circle", "_steps-step-circle"]);
            }

            //= line
            //== same dual form as the circle above
            if (!pgs(li).querySelector(["steps-step-line", "_steps-step-line"])) {
                const line = document.createElement("span");
                pgs(line).add("_steps-step-line")
                li.insertAdjacentElement("afterbegin", line);
            }
        });

        API.set(steps, {
            element: steps,
            steps: () => Array.from(pgs(steps).querySelectorAll("steps-step")),
            getStep: (index) => pgs(steps).querySelectorAll("steps-step")[index],
            getTotal: () => pgs(steps).querySelectorAll("steps-step").length,
            refresh: () => {
                API.delete(steps);
                PGS_steps_init(steps.parentNode || document);
                return API.get(steps);
            },
        });
    });
}

//# INIT PGS_ol
PGS_onDocumentReady(PGS_steps_init);

//# API
function PGS_steps_api(selector) {
    return API.get(selector);
}

export const PGS_steps = {
    init: PGS_steps_init,
    api: PGS_steps_api
};
