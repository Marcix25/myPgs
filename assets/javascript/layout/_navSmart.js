import { pgs } from "../_pgs.js";

//= NAV SMART
// publishes the room the bar takes at the bottom of the screen, the way the header publishes its own:
// --_navSmart-height is the whole distance from the bottom edge of the screen to the top of the bar
// (the pills plus the gap the bar keeps from the edge, and the safe area on a phone), and
// --_navSmart-heightScroll is kept equal to it, the same name the header gives its own pair. Both
// are 0 while a media query hides the bar. Padding the end of a page by either one keeps its last
// lines from sitting under it.

const API = new WeakMap();
// the bars with a live instance, each with its throttled measure and what releases it: walked to
// drop the ones that left the page, and to hand the variables to a bar that is still there
const INSTANCES = new Map();
// the bars whose destroy() was asked for while they are still in the page: the watch that finds new
// bars must not build them again behind the author's back. init() and refresh() lift it
const STOPPED = new WeakSet();

// a bar is only ready once it holds a navSmart-element, which is where the pills are
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

//# PRELOAD
// --_navSmart-height and --_navSmart-heightScroll have a "dummy preload" default in the stylesheet,
// so a page that is still loading already leaves room for the bar. A page with no pinned bar would
// keep that room for good, under the footer, the toast and the modal: with no pinned navSmart in the
// document the properties are published as 0 instead, and a bar that arrives later measures them
function publishPreload() {
    if (typeof document === "undefined" || getPrimaryNavSmart()) return;

    document.documentElement.style.setProperty("--_navSmart-height", "0px");
    document.documentElement.style.setProperty("--_navSmart-heightScroll", "0px");
}

// a bar that left the page takes its instance with it. Not marked as stopped: the same node can come
// back, and the watch then builds it again
function pruneNavSmart() {
    Array.from(INSTANCES.keys()).forEach(bar => {
        if (!bar.isConnected) teardown(bar, false);
    });
}

function teardown(bar, stop) {
    const entry = INSTANCES.get(bar);
    if (!entry) return;

    entry.release();
    if (stop) STOPPED.add(bar);
    INSTANCES.delete(bar);
    API.delete(bar);

    // what the bar published is no longer anybody's: another bar takes it over, and with none
    // pinned the preload goes to 0
    INSTANCES.forEach(item => item.schedule());
    publishPreload();
}

//# INIT
// builds the instance of one bar and returns its API, or undefined when it is not ready (no
// navSmart-element) or already has one
function initNavSmart(bar) {
    if (API.has(bar)) return;
    if (!pgs(bar).querySelector("navSmart-element")) return;

    const controller = new AbortController();
    const { signal } = controller;

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

    const schedule = pgs.helper.rafThrottle(measure);

    const observer = new ResizeObserver(schedule);
    observer.observe(bar);
    pgs(bar).querySelectorAll("navSmart-element").forEach(element => observer.observe(element));

    const attributeObserver = new MutationObserver(schedule);
    attributeObserver.observe(bar, { attributes: true, attributeFilter: ["class", "style"] });

    document.fonts?.ready?.then(() => {
        if (!signal.aborted) schedule();
    });
    window.addEventListener("resize", schedule, { signal });
    schedule();

    const api = {
        element: bar,
        destroy() {
            // a stale instance (already replaced by a refresh) must not tear down the live one
            if (API.get(bar) === api) teardown(bar, true);
        },
        refresh() {
            const live = API.get(bar);
            if (live && live !== api) return live;
            teardown(bar, false);
            STOPPED.delete(bar);
            return initNavSmart(bar);
        },
    };

    API.set(bar, api);
    INSTANCES.set(bar, {
        schedule,
        release() {
            controller.abort();
            observer.disconnect();
            attributeObserver.disconnect();
            schedule.cancel();
        }
    });
    return api;
}

function PGS_navSmart_init(root = document) {
    pgs.helper.roots(root, "navSmart").forEach(bar => {
        STOPPED.delete(bar);
        initNavSmart(bar);
    });
    publishPreload();
}

// a bar can arrive later, and there may be several, so the watch stays on: a pass is cheap and
// every bar is initialized only once. The same pass lets go of the bars that left the page
pgs.helper.onDocumentReady(PGS_navSmart_init);
pgs.helper.watchDocument(() => {
    pruneNavSmart();
    pgs.helper.roots(document, "navSmart").filter(bar => !STOPPED.has(bar)).forEach(initNavSmart);
    publishPreload();
});

//# API
function PGS_navSmart_api(selector) {
    return API.get(selector);
}

//# EXPORT
export const PGS_navSmart = {
    init: PGS_navSmart_init,
    api: PGS_navSmart_api
};
