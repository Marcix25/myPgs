
export function PGS_ol() {
    pgs(document).querySelectorAll("steps").forEach(steps => {

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
            const line = document.createElement("span");
            pgs(line).add("steps-step-line")
            li.insertAdjacentElement("afterbegin", line);
        });
    });
}

//# INIT PGS_ol
PGS_ol()