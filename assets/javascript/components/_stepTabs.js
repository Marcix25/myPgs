const API = new WeakMap();

export function PGS_stepTabs_init(root = document) {
    pgs(root).querySelectorAll("stepTabs").forEach(tabsWizard => {
        if (tabsWizard.dataset.stepTabsInitialized === "true") return;
        tabsWizard.dataset.stepTabsInitialized = "true";

        //= SELECTOR
        const prev = pgs(tabsWizard).querySelector("stepTabs-prev")
        const next = pgs(tabsWizard).querySelector("stepTabs-next")
        const restart = pgs(tabsWizard).querySelector("stepTabs-restart")
        const dots = pgs(tabsWizard).querySelector("stepTabs-dots")
        const tabsContainer = pgs(tabsWizard).querySelector("stepTabs-container");
        const allTab = pgs(tabsContainer).querySelectorAll("tab");

        //= SETTING
        const total = allTab.length;
        const defaultTabLocked = Array.from(allTab).filter(tab => pgs(tab).state.contains("is-locked"))        
        let current = 0;
        if (prev) prev.disabled = true;
        let isRendering = false;

        if (!tabsContainer || total === 0) return;

        //- CREAZIONE DOTS
        const tabDots = [];
        if (dots) {
            dots.innerHTML = "";

            allTab.forEach((tab, index) => {
                const iconClass = pgs(tab).option.getValueBrackets("tabIcon") || "fa-circle";
                const dot = document.createElement("button");
                dot.type = "button";
                pgs(dot).add("stepTabs-dots-dot");
                dot.setAttribute("data-step", index);
                dot.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;

                dot.addEventListener("click", () => {
                    if (pgs(dot).state.contains("is-completed")) {
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
                setState(dot, "is-active", i === current);
                setState(dot, "is-completed", i < current);
            });
        }

        //+ STATE
        function setState(element, state, active) {
            if (!element) return;
            const hasState = pgs(element).state.contains(state);
            if (active === hasState) return;
            pgs(element).state.toggle(state, active);
        }

        //+ CONTROLS
        function updateControls() {
            const tab = allTab[current];
            if (prev) prev.disabled = current === 0;
            if (next) next.disabled = current === total - 1 || pgs(tab).state.contains("is-locked");
        }

        //+ Step
        function goTo(index, scroll = true) {
            current = Math.min(Math.max(index, 0), total - 1);
            const tab = allTab[current]

            isRendering = true;
            allTab.forEach((tab, i) => setState(tab, "is-active", i === current));
            updateControls();
            updateDots();
            isRendering = false;

            if (scroll && !tabsWizard.closest("dialog")) {
                tab?.focus();
                tabsWizard?.scrollIntoView({ behavior: "smooth", block: "start" });
            }

            tabsWizard.dispatchEvent(new CustomEvent('stepTabs:change', { detail: { current, total } }));
        }

        //+ restart
        function restartTab() {
            goTo(0);
            defaultTabLocked.forEach(tab => pgs(tab).state.add("is-locked"));
        }

        //= INIT
        goTo(0, false);

        //= data-tab-locked
        const observer = new MutationObserver(() => {
            if (isRendering) return;
            updateControls();
        });
        allTab?.forEach(tabEl => observer.observe(tabEl, { attributes: true, attributeFilter: ["pgs-state"], }));

        //= Click su Avanti/Indietro
        prev?.addEventListener("click", e => goTo(current - 1));
        next?.addEventListener("click", e => {
            updateControls();
            if (next.disabled) return;
            goTo(current + 1);
        });
        restart?.addEventListener("click", e => restartTab(), { capture: true });

        //-(API) 
        // tabsWizard.addEventListener("stepTabs:reset", () => restartTab());
        API.set(tabsWizard, {
            element: tabsWizard,
            container: tabsContainer,
            restart: restartTab,
            goTo,
            next: () => goTo(current + 1),
            prev: () => goTo(current - 1),
            toggleLock: (step, lock = true) => typeof step === "number" && allTab[step] && (pgs(allTab[step]).state.toggle("is-locked", lock), goTo(current)),
            refresh: () => {
                PGS_stepTabs_init(tabsWizard.parentNode || document);
                return API.get(tabsWizard);
            },
            getCurrent: () => current,
            getState: () => ({ current, total }),
        });
    });
}

PGS_stepTabs_init()

export function PGS_stepTabs_api(selector) {
    return API.get(selector);
}

/* 
    / EXAMPLE
    // vai allo step 2
    w.dispatchEvent(new CustomEvent("stepTabs:go", { detail: { step: 2 } }));
    
    // next
    w.dispatchEvent(new CustomEvent("stepTabs:next"));
    
    // prev
    w.dispatchEvent(new CustomEvent("stepTabs:prev"));
    
    // reset a 0 senza relock
    w.dispatchEvent(new CustomEvent("stepTabs:reset"));
    
    // lock step 3
    w.dispatchEvent(new CustomEvent("stepTabs:toggle-lock", { detail: { step: 3, lock: true } }));
    
    // unlock step 3
    w.dispatchEvent(new CustomEvent("stepTabs:toggle-lock", { detail: { step: 3, lock: false } }));
    
    // leggi stato
    w.dispatchEvent(new CustomEvent("stepTabs:get", { detail: { reply: (state) => console.log(state) } }));
*/
