import { PGS_onDocumentReady } from "../helper/_onDocumentReady.js";

const API = new WeakMap();

function PGS_stepTabs_init(root = document) {
    pgs(root).querySelectorAll("stepTabs").forEach(tabsWizard => {
        if (tabsWizard.dataset.stepTabsInitialized === "true") return;
        tabsWizard.dataset.stepTabsInitialized = "true";

        //= SELECTOR
        const prev = pgs(tabsWizard).querySelector("stepTabs-prev")
        const next = pgs(tabsWizard).querySelector("stepTabs-next")
        const restart = pgs(tabsWizard).querySelector("stepTabs-restart")
        const dots = pgs(tabsWizard).querySelector("stepTabs-dots")
        const tabsContainer = pgs(tabsWizard).querySelector("stepTabs-container");
        const allTab = pgs(tabsContainer).querySelectorAll("stepTabs-container-tab");

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
                const authoredIcon = (pgs(tab).option.getValueBrackets("tabIcon") || "").trim();
                const dot = document.createElement("button");
                dot.type = "button";
                pgs(dot).add("_stepTabs-dots-dot");
                pgs(dot).add("button");
                pgs(dot).option.add("buttonIcon buttonNohover");
                //== tabIcon takes three shapes, told apart by how the value opens. Markup, from a
                //== "<", is instantiated as written: that is what puts every icon set in reach,
                //== including the ones a class list cannot describe because they want their name as
                //== text content or an attribute of their own. An "icon-" prefix is a built-in
                //== glyph. Anything else is classes for whatever set the page loaded
                if (authoredIcon.startsWith("<")) {
                    //== a template rather than innerHTML on the dot: template content stays inert
                    //== while it parses, so nothing in the author's markup runs or loads until the
                    //== clone is in the document
                    const authoredMarkup = document.createElement("template");
                    authoredMarkup.innerHTML = authoredIcon;
                    dot.replaceChildren(authoredMarkup.content.cloneNode(true));
                } else {
                    const dotIcon = document.createElement("i");
                    pgs(dotIcon).add("icon");

                    if (!authoredIcon || authoredIcon.startsWith("icon-")) {
                        pgs(dotIcon).option.add(authoredIcon || "icon-circle");
                    } else {
                        //== a full list goes through untouched, whatever set it belongs to. A lone
                        //== Font Awesome name is completed with its style class, because that set
                        //== needs one and markup written before other sets were supported relies on it
                        dotIcon.className = /^fa-\S+$/.test(authoredIcon)
                            ? `fa-solid ${authoredIcon}`
                            : authoredIcon;
                    }

                    dot.replaceChildren(dotIcon);
                }

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

        //= tab-locked
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

PGS_onDocumentReady(PGS_stepTabs_init);

function PGS_stepTabs_api(selector) {
    return API.get(selector);
}

export const PGS_stepTabs = {
    init: PGS_stepTabs_init,
    api: PGS_stepTabs_api
};

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
