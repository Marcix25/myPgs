const API = new WeakMap();

export function PGS_steps_init(root = document) {
    pgs(root).querySelectorAll("steps").forEach(steps => {
        if (API.has(steps)) return;

        pgs(steps).querySelectorAll("steps-step").forEach((li, index) => {
            
            //= CIRCLE
            let circleLi;
            if (!pgs(li).querySelector("steps-step-circle")) {
                circleLi = document.createElement("span");
                pgs(circleLi).add("steps-step-circle")
                circleLi.textContent = index + 1;
                li.insertAdjacentElement("afterbegin", circleLi);
            } else{
                circleLi = pgs(li).querySelector("steps-step-circle");
            }
            
            //= line
            if (!pgs(li).querySelector("steps-step-line")) {
                const line = document.createElement("span");
                pgs(line).add("steps-step-line")
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
                PGS_ol(steps.parentNode || document);
                return API.get(steps);
            },
        });
    });
}

//# INIT PGS_ol
PGS_steps_init()

//# API
export function PGS_steps_api(selector) {
    return API.get(selector);
}
