const API = new WeakMap();
PGS_tabs()

export function PGS_tabs() {
    pgs(document).querySelectorAll("tabs").forEach(tabsWizard => {

        //= INIT
        // if (tabsWizard.getAttribute("data-initialize") == "true") return;
        // tabsWizard.setAttribute("data-initialize", "true");

        //= SELECTOR
        const prev = pgs(tabsWizard).querySelector("tabs-prev")
        const next = pgs(tabsWizard).querySelector("tabs-next")
        const restart = pgs(tabsWizard).querySelector("tabs-restart")
        const dots = pgs(tabsWizard).querySelector("tabs-dots")
        const tabsContainer = pgs(tabsWizard).querySelector("tabs-container");
        const allTab = pgs(tabsContainer).querySelectorAll("tab");

        //= SETTING
        const total = allTab.length;
        const defaultTabLocked = Array.from(allTab).filter(tab => tab.getAttribute("data-tab-locked") === "true")
        let current = 0;
        prev.disabled = true;

        //- CREAZIONE DOTS
        const tabDots = [];
        if (dots) {
            dots.innerHTML = "";

            allTab.forEach((tab, index) => {

                const iconClass = tab.getAttribute("data-tab-icon") || "fa-circle";

                const dot = document.createElement("button");
                dot.type = "button";
                dot.className = "tab-dot";
                dot.setAttribute("data-step", index);
                dot.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;

                dot.addEventListener("click", () => {
                    if (dot.classList.contains("is-completed")) {
                        goTo(index, true);
                    }
                });

                dots.appendChild(dot);
                tabDots.push(dot);
            });
        }

        //+ DOTS
        function updateDots() {
            tabDots.forEach((dot, i) => {
                dot.classList.toggle("is-active", i === current);
                dot.classList.toggle("is-completed", i < current);
            });
        }

        //+ Step
        function goTo(index) {
            current = Math.min(Math.max(index, 0), total - 1);
            const tab = allTab[current]

            prev.disabled = (current === 0);
            next.disabled = (current === total - 1 || tab.getAttribute("data-tab-locked") === "true");

            allTab.forEach((tab, i) => tab.classList.toggle("is-active", i === current));
            tab?.focus();
            tabsWizard?.scrollIntoView({ behavior: "smooth", block: "start" });
            updateDots();
            tabsWizard.dispatchEvent(new CustomEvent('tabs:change', { detail: { current, total } }));
        }

        //+ restart
        function restartTab() {
            goTo(0);
            defaultTabLocked.forEach(tab => tab.setAttribute("data-tab-locked", "true"));
        }

        //= INIT
        goTo(0);

        //= data-tab-locked
        const observer = new MutationObserver(() => goTo(current));
        allTab?.forEach(tabEl => observer.observe(tabEl, { attributes: true, attributeFilter: ["data-tab-locked"], }));


        //= Click su Avanti/Indietro
        prev?.addEventListener("click", e => goTo(current - 1));
        next?.addEventListener("click", e => goTo(current + 1));
        restart?.addEventListener("click", e => restartTab(), { capture: true });

        //-(API) 
        // tabsWizard.addEventListener("tabs:reset", () => restartTab());
        API.set(tabsWizard, {
            restart: restartTab,
            goTo,
            next: () => goTo(current + 1),
            prev: () => goTo(current - 1),
            toggleLock: (step, lock = true) => typeof step === "number" && allTab[step] && (allTab[step].setAttribute("data-tab-locked", lock.toString()), goTo(current)),
            getCurrent: () => current,
            getState: () => ({ current, total }),
        });
    });
}

export function PGS_tabs_api(selector) {
    return API.get(selector);
}


/* 
    / EXAMPLE
    // vai allo step 2
    w.dispatchEvent(new CustomEvent("tabs:go", { detail: { step: 2 } }));
    
    // next
    w.dispatchEvent(new CustomEvent("tabs:next"));
    
    // prev
    w.dispatchEvent(new CustomEvent("tabs:prev"));
    
    // reset a 0 senza relock
    w.dispatchEvent(new CustomEvent("tabs:reset"));
    
    // lock step 3
    w.dispatchEvent(new CustomEvent("tabs:toggle-lock", { detail: { step: 3, lock: true } }));
    
    // unlock step 3
    w.dispatchEvent(new CustomEvent("tabs:toggle-lock", { detail: { step: 3, lock: false } }));
    
    // leggi stato
    w.dispatchEvent(new CustomEvent("tabs:get", { detail: { reply: (state) => console.log(state) } }));
*/
