import { pgs } from "../_pgs.js";
import { PGS_onDocumentReady } from "../helper/_onDocumentReady.js";
import { PGS_roots } from "../helper/_dom.js";
import { PGS_rafThrottle, PGS_watchDocument } from "../helper/_throttle.js";

//= NAV SMART
//+ publishes the room the bar takes at the bottom of the screen, the way the header publishes its own:
//+ --_navSmart-height is the whole distance from the bottom edge of the screen to the top of the bar
//+ (the pills plus the gap the bar keeps from the edge, and the safe area on a phone), and
//+ --_navSmart-heightScroll is kept equal to it, the same name the header gives its own pair. Both
//+ are 0 while a media query hides the bar. Padding the end of a page by either one keeps its last
//+ lines from sitting under it.

const INITIALIZED_NAVSMART = new WeakSet();

//+ a bar is only ready once it holds a navSmart-element, which is where the pills are
function getReadyNavSmart() {
    return Array.from(pgs(document).querySelectorAll("navSmart")).filter(bar => pgs(bar).querySelector("navSmart-element"));
}

// only one bar can own the variables. The bar that is pinned to the screen does: a navSmart written
// as an example inside a page flows with it, takes no room at the bottom, and so never owns them.
// One that is on screen wins over one a media query has hidden; with none on screen the first
// pinned one still owns them, and publishes 0. Ownership is checked at every measure, so a bar
// added later takes over from a missing one
function getPrimaryNavSmart() {
    const pinned = getReadyNavSmart().filter(bar => window.getComputedStyle(bar).position === "fixed");
    return pinned.find(bar => bar.getClientRects().length) || pinned[0] || null;
}

// a site added to the Home Screen of an iPhone reports navigator.standalone, but not the
// display-mode media query that every other browser answers
function isInstalledApp() {
    return navigator.standalone === true || window.matchMedia("(display-mode: standalone)").matches;
}

function initNavSmart(bar) {
    if (INITIALIZED_NAVSMART.has(bar)) return;
    INITIALIZED_NAVSMART.add(bar);

    pgs(bar).state.toggle("installedApp", isInstalledApp());

    function measure() {
        if (getPrimaryNavSmart() !== bar) return;

        // from the top of the bar to the bottom of the screen: whatever the bar sits on counts, whether
        // it is its own offset from the edge or the safe area of a phone
        // a bar a media query has hidden (display: none) has no box and takes no room
        const height = bar.getClientRects().length
            ? Math.max(0, Math.round(window.innerHeight - bar.getBoundingClientRect().top))
            : 0;

        document.documentElement.style.setProperty("--_navSmart-height", `${height}px`);
        document.documentElement.style.setProperty("--_navSmart-heightScroll", `${height}px`);
    }

    const schedule = PGS_rafThrottle(measure);

    const observer = new ResizeObserver(schedule);
    observer.observe(bar);
    pgs(bar).querySelectorAll("navSmart-element").forEach(element => observer.observe(element));

    new MutationObserver(schedule).observe(bar, { attributes: true, attributeFilter: ["class", "style"] });

    document.fonts?.ready?.then(schedule);
    window.addEventListener("resize", schedule);
    schedule();
}

function PGS_navSmart_init(root = document) {
    PGS_roots(root, "navSmart").filter(bar => pgs(bar).querySelector("navSmart-element")).forEach(initNavSmart);
}

// a bar can arrive later, and there may be several, so the watch stays on: a pass is cheap and
// every bar is initialized only once
PGS_onDocumentReady(PGS_navSmart_init);
PGS_watchDocument(() => PGS_navSmart_init());

//= EXPORT
export const PGS_navSmart = {
    init: PGS_navSmart_init
};
