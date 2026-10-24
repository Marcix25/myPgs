import { pgs } from "../_pgs.js";

const API = new WeakMap();

//# BUILD
// builds the instance of one wizard and returns its API, or null when its markup cannot be initialized
function PGS_stepTabs_build(tabsWizard) {
    //# SELECTOR
    const tabsContainer = pgs(tabsWizard).querySelector("stepTabs-container");
    if (!tabsContainer) {
        pgs.helper.warn("stepTabs.init", "the wizard has no stepTabs-container, so it was not initialized", tabsWizard);
        return null;
    }

    const allTab = pgs.helper.directChildren(tabsContainer, "stepTabs-container-tab");
    if (allTab.length === 0) {
        pgs.helper.warn("stepTabs.init", "stepTabs-container has no stepTabs-container-tab, so the wizard was not initialized", tabsWizard);
        return null;
    }

    const prev = pgs(tabsWizard).querySelector("stepTabs-prev");
    const next = pgs(tabsWizard).querySelector("stepTabs-next");
    const restart = pgs(tabsWizard).querySelector("stepTabs-restart");
    const dots = pgs(tabsWizard).querySelector("stepTabs-dots");

    //# SETTING
    const total = allTab.length;
    const defaultTabLocked = allTab.filter(tab => pgs(tab).state.contains("locked"));
    let current = 0;
    const eventController = new AbortController();
    const { signal } = eventController;

    //## CREATE DOTS
    const tabDots = [];
    if (dots) {
        dots.innerHTML = "";
        // the row is a group of controls: with an aria-label on the container (the reference
        // writes one) and no role of its own, it is announced as that group instead of as an
        // unnamed generic element
        if (dots.hasAttribute("aria-label") && !dots.hasAttribute("role")) dots.setAttribute("role", "group");

        allTab.forEach((tab, index) => {
            const authoredIcon = (pgs(tab).data.getValueBrackets("stepTabsIcon") || "").trim();
            const dot = document.createElement("button");
            dot.type = "button";
            // an icon-only button has no name of its own: the step's title when the step has one
            // (its aria-label, else its first heading), "Step N" otherwise
            const title = (tab.getAttribute("aria-label") || tab.querySelector("h1, h2, h3, h4, h5, h6")?.textContent || "").trim();
            dot.setAttribute("aria-label", title ? `Step ${index + 1}: ${title}` : `Step ${index + 1}`);
            pgs(dot).add("_stepTabs-dots-dot");
            pgs(dot).add("button['btnIconOnly' 'btnNotHover']");
            // stepTabsIcon takes three shapes, told apart by how the value opens. Markup, from a
            // "<", is instantiated as written: that is what puts every icon set in reach,
            // including the ones a class list cannot describe because they want their name as
            // text content or an attribute of their own. An "icon-" prefix is a built-in
            // glyph. Anything else is classes for whatever set the page loaded
            if (authoredIcon.startsWith("<")) {
                // a template rather than innerHTML on the dot: template content stays inert
                // while it parses, so nothing in the author's markup runs or loads until the
                // clone is in the document
                const authoredMarkup = document.createElement("template");
                authoredMarkup.innerHTML = authoredIcon;
                dot.replaceChildren(authoredMarkup.content.cloneNode(true));
            } else {
                const dotIcon = document.createElement("i");

                if (!authoredIcon || authoredIcon.startsWith("icon-")) {
                    pgs(dotIcon).add(`icon['${authoredIcon || "icon-circle"}']`);
                } else {
                    pgs(dotIcon).add("icon");
                    // a full list goes through untouched, whatever set it belongs to. A lone
                    // Font Awesome name is completed with its style class, because that set
                    // needs one and markup written before other sets were supported relies on it
                    dotIcon.className = /^fa-\S+$/.test(authoredIcon)
                        ? `fa-solid ${authoredIcon}`
                        : authoredIcon;
                }

                dot.replaceChildren(dotIcon);
            }

            dot.addEventListener("click", () => {
                if (pgs(dot).state.contains("completed")) {
                    goTo(index, true);
                }
            }, { signal });

            dots.appendChild(dot);
            tabDots.push(dot);
        });
    }

    //## DOTS
    function updateDots() {
        tabDots.forEach((dot, i) => {
            pgs(dot).state.toggle("active", i === current);
            pgs(dot).state.toggle("completed", i < current);
        });
    }

    //## CONTROLS
    function updateControls() {
        const tab = allTab[current];
        if (prev) prev.disabled = current === 0;
        if (next) next.disabled = current === total - 1 || pgs(tab).state.contains("locked");
    }

    //## Step
    function goTo(index, scroll = true) {
        current = Math.min(Math.max(index, 0), total - 1);
        const tab = allTab[current];

        allTab.forEach((item, i) => pgs(item).state.toggle("active", i === current));
        updateControls();
        updateDots();

        if (scroll && !tabsWizard.closest("dialog")) {
            tab.focus();
            tabsWizard.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        pgs.helper.dispatch(tabsWizard, "pgs:stepTabs:change", { current, total });
    }

    //## restart
    // the locks go back first, so the controls goTo redraws already see them
    // a lock taken off by the markup's own state or added with toggleLock on another step goes
    // back to exactly what the markup declared when the wizard was built
    function restartTab() {
        allTab.forEach(tab => pgs(tab).state.toggle("locked", defaultTabLocked.includes(tab)));
        goTo(0);
    }

    //# tab-locked
    // a lock taken off or put on by hand, outside toggleLock, still has to reach the next button
    const observer = new MutationObserver(() => updateControls());
    allTab.forEach(tabEl => observer.observe(tabEl, { attributes: true, attributeFilter: ["pgs-state"] }));

    // click on next/previous
    prev?.addEventListener("click", () => goTo(current - 1), { signal });
    next?.addEventListener("click", () => {
        updateControls();
        if (next.disabled) return;
        goTo(current + 1);
    }, { signal });
    restart?.addEventListener("click", () => restartTab(), { capture: true, signal });

    const destroy = () => {
        if (API.get(tabsWizard) !== api) return;
        eventController.abort();
        observer.disconnect();
        API.delete(tabsWizard);
    };

    //## API
    const api = {
        element: tabsWizard,
        container: tabsContainer,
        restart: restartTab,
        goTo: (index, scroll = true) => {
            if (!Number.isInteger(index) || index < 0 || index >= total) {
                throw pgs.helper.invalid("stepTabs.goTo", `index must be an integer from 0 to ${total - 1}, got ${index}`);
            }
            goTo(index, scroll);
        },
        // at either end there is nowhere to go: the index does not change, so nothing is dispatched
        next: () => { if (current < total - 1) goTo(current + 1); },
        prev: () => { if (current > 0) goTo(current - 1); },
        toggleLock: (step, lock = true) => {
            if (!Number.isInteger(step) || step < 0 || step >= total) {
                throw pgs.helper.invalid("stepTabs.toggleLock", `step must be an integer from 0 to ${total - 1}, got ${step}`);
            }
            pgs(allTab[step]).state.toggle("locked", lock);
            updateControls();
        },
        destroy,
        refresh: () => {
            const live = API.get(tabsWizard);
            if (live && live !== api) return live;
            destroy();
            return PGS_stepTabs_build(tabsWizard) ?? undefined;
        },
        getCurrent: () => current,
        getState: () => ({ current, total }),
    };
    API.set(tabsWizard, api);

    //# INIT
    // after the API is stored, so a pgs:stepTabs:change listener can already reach the instance
    goTo(0, false);

    return api;
}

function PGS_stepTabs_init(root = document) {
    pgs.helper.roots(root, "stepTabs").forEach(tabsWizard => {
        if (API.has(tabsWizard)) return;

        PGS_stepTabs_build(tabsWizard);
    });
}

pgs.helper.onDocumentReady(PGS_stepTabs_init);

function PGS_stepTabs_api(selector) {
    return API.get(selector);
}

export const PGS_stepTabs = {
    init: PGS_stepTabs_init,
    api: PGS_stepTabs_api
};
