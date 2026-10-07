//# NAV SMART
//+ publishes the room the bar takes at the bottom of the screen, the way the header publishes its own:
//+ --heightOfNavSmart is the whole distance from the bottom edge of the screen to the top of the bar
//+ (the pills plus the gap the bar keeps from the edge, and the safe area on a phone), and
//+ --heightOfNavSmartScroll is the same distance while the bar is on screen and 0 while it is tucked
//+ away, which is marked by data-navsmart-scroll="true" on the bar. Both are 0 while a media query
//+ hides the bar. Padding the end of a page by either one keeps its last lines from sitting under it.

const INITIALIZED_NAVSMART = new WeakSet();

//+ a bar is only ready once it holds a navSmart-element, which is where the pills are
function getReadyNavSmart() {
    return Array.from(pgs(document).querySelectorAll("navSmart")).filter(bar => pgs(bar).querySelector("navSmart-element"));
}

//== only one bar can own the variables. The bar that is pinned to the screen does: a navSmart written
//== as an example inside a page flows with it, takes no room at the bottom, and so never owns them.
//== One that is on screen wins over one a media query has hidden; with none on screen the first
//== pinned one still owns them, and publishes 0. Ownership is checked at every measure, so a bar
//== added later takes over from a missing one
function getPrimaryNavSmart() {
    const pinned = getReadyNavSmart().filter(bar => window.getComputedStyle(bar).position === "fixed");
    return pinned.find(bar => bar.getClientRects().length) || pinned[0] || null;
}

//== a site added to the Home Screen of an iPhone reports navigator.standalone, but not the
//== display-mode media query that every other browser answers
function isInstalledApp() {
    return navigator.standalone === true || window.matchMedia("(display-mode: standalone)").matches;
}

function initNavSmart(bar) {
    if (INITIALIZED_NAVSMART.has(bar)) return;
    INITIALIZED_NAVSMART.add(bar);

    pgs(bar).state.toggle("installedApp", isInstalledApp());

    let rafId = 0;

    function measure() {
        if (getPrimaryNavSmart() !== bar) return;

        //== from the top of the bar to the bottom of the screen: whatever the bar sits on counts, whether
        //== it is its own offset from the edge or the safe area of a phone
        //== a bar a media query has hidden (display: none) has no box and takes no room
        const height = bar.getClientRects().length
            ? Math.max(0, Math.round(window.innerHeight - bar.getBoundingClientRect().top))
            : 0;
        const scrollHeight = bar.getAttribute("data-navsmart-scroll") === "true" ? 0 : height;

        document.documentElement.style.setProperty("--heightOfNavSmart", `${height}px`);
        document.documentElement.style.setProperty("--heightOfNavSmartScroll", `${scrollHeight}px`);
    }

    function schedule() {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
            rafId = 0;
            measure();
        });
    }

    const observer = new ResizeObserver(schedule);
    observer.observe(bar);
    pgs(bar).querySelectorAll("navSmart-element").forEach(element => observer.observe(element));

    new MutationObserver(schedule).observe(bar, { attributes: true, attributeFilter: ["data-navsmart-scroll", "class", "style"] });

    document.fonts?.ready?.then(schedule);
    window.addEventListener("resize", schedule);
    schedule();
}

function PGS_navSmart_init(root = document) {
    const candidates = [
        ...(root instanceof Element && pgs(root).contains("navSmart") ? [root] : []),
        ...pgs(root).querySelectorAll("navSmart")
    ];

    candidates.filter(bar => pgs(bar).querySelector("navSmart-element")).forEach(initNavSmart);
}

PGS_navSmart_init();

//== a bar can arrive later, and there may be several, so the watch stays on: a pass is cheap and
//== every bar is initialized only once
let navSmartScanRafId = 0;
new MutationObserver(() => {
    if (navSmartScanRafId) return;
    navSmartScanRafId = requestAnimationFrame(() => {
        navSmartScanRafId = 0;
        PGS_navSmart_init();
    });
}).observe(document.documentElement, { childList: true, subtree: true });

//# EXPORT
export const PGS_navSmart = {
    init: PGS_navSmart_init
};
