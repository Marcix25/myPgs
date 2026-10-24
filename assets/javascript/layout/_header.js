import { pgs } from "../_pgs.js";

//= HEADER
//# COMPACT BREAKPOINT
// Width at or below which the header switches to its compact layout even when the content
// still fits, so a wide header can be compact on purpose.
// headerCompactFrom[600] wins with its own pixel value, otherwise the named options
// (headerCompactTablet, headerCompactLaptop, ...) set --header-compact-breakpoint in the
// SCSS, so the breakpoint values stay defined in one place.
function getCompactBreakpoint(header) {
    const custom = parseFloat(pgs(header).data.getValueBrackets("headerCompactFrom"));
    if (Number.isFinite(custom)) return custom;

    const declared = parseFloat(window.getComputedStyle(header).getPropertyValue("--header-compact-breakpoint"));
    return Number.isFinite(declared) ? declared : 600;
}

//# OVERFLOW TOLERANCE
// scrollWidth and clientWidth are whole pixels while the layout underneath is fractional, so a
// header whose content almost exactly fills the row can report a pixel of overflow that is not
// there. Two pixels absorb that without letting real overflow through.
//
// It does not absorb anything larger, and that is on purpose. scrollWidth also counts whatever is
// positioned absolutely inside the header: a badge hung past the edge of a button adds its overhang
// to every measurement, the comparison is then true at any width, and the header stays compact for
// good. Raising this number would hide that instead of fixing it, so if the header ever gets stuck
// compact, look for what sticks out past the right edge of header-element rather than tuning here.
const OVERFLOW_TOLERANCE = 2;

//# RESIZE
// a header only reaches here once it holds a header-element (see getReadyHeaders). Every observer and
// throttle it starts is released by the function it returns
function initResize(header) {
    const headerElements = pgs(header).querySelectorAll("header-element");
    const releases = [];

    headerElements.forEach(selectHeader => {

        //## COMPACT LAYOUT
        // how much room the full layout needs, learned the first time it does not fit. It cannot be
        // measured while compact, because header-element-onlyFull is hidden and reports zero width.
        let requiredWidth = 0;

        function compact(headerElement) {
            const isCompact = pgs(headerElement).state.contains("compact");
            const overflows = headerElement.scrollWidth > headerElement.clientWidth + OVERFLOW_TOLERANCE;

            const setCompact = (value) => {
                pgs(header).state.toggle("compact", value);
                pgs(headerElement).state.toggle("compact", value);
            };

            // while the full layout is on screen its scrollWidth is what it needs, and this is the only
            // moment it can be learned: once compact, header-element-onlyFull is hidden and reports zero
            if (!isCompact && overflows) requiredWidth = headerElement.scrollWidth;

            // a breakpoint declared on the header wins over any measurement
            if (window.innerWidth <= getCompactBreakpoint(header)) return setCompact(true);

            // compact: stay only while the room that was missing is still missing. With nothing learned
            // the page loaded compact and the full layout fitted at that width, so let it back in
            if (isCompact) return setCompact(requiredWidth ? headerElement.clientWidth < requiredWidth : false);
            setCompact(overflows);
        }

        //## Resize
        // throttled to avoid ResizeObserver loop warnings
        const scheduleCompact = pgs.helper.rafThrottle(() => compact(selectHeader));

        const observer = new ResizeObserver(scheduleCompact);
        observer.observe(selectHeader);

        // MutationObserver, not ResizeObserver: won't loop back from compact()'s own show/hide toggles
        const childObserver = new MutationObserver(scheduleCompact);
        childObserver.observe(selectHeader, { childList: true, subtree: true });

        releases.push(() => {
            observer.disconnect();
            childObserver.disconnect();
            scheduleCompact.cancel();
        });

        //## initial check
        compact(selectHeader);
    });

    return () => releases.forEach(release => release());
}


//# HEADER HEIGHT
// returns the throttled measure, so the module can ask for another one when a sibling header goes
// away, and the function that releases the observer and the throttle
function initHeight(header, signal) {
    //## GET HEADER HEIGHT ELEMENT
    function getHeaderHeightElement(header) {
        const isCompactBottom = window.getComputedStyle(header).getPropertyValue("--header-compactBottom-active").trim() === "1";
        return isCompactBottom ? pgs(header).querySelector("header-element") || header : header;
    }

    // FOR --_header-height and --_header-heightScroll
    function getPrimaryHeader() {
        const headers = getReadyHeaders();
        return headers.find(header => pgs(header).option.contains("headerMain")) || headers[0] || null;
    }

    //## HEIGHT
    function headerHeight() {
        // --_header-height is what pushes the page down, so only one header can own it. Ownership
        // is checked here rather than at init, so a header declaring headerMain later still
        // takes over from the fallback
        if (getPrimaryHeader() !== header) return;

        const wordPressBar = parseInt(window.getComputedStyle(document.documentElement).marginTop, 10) || 0;
        const height = getHeaderHeightElement(header).offsetHeight + wordPressBar;
        const scrollHeight = pgs(header).state.contains("hiddenByScroll") ? 0 : height;

        document.documentElement.style.setProperty("--_header-height", `${height}px`);
        document.documentElement.style.setProperty("--_header-heightScroll", `${scrollHeight}px`);
    }

    const scheduleHeaderHeight = pgs.helper.rafThrottle(headerHeight);

    const headerHeightObserver = new ResizeObserver(scheduleHeaderHeight);
    headerHeightObserver.observe(header);
    pgs(header).querySelectorAll("header-element").forEach(element => headerHeightObserver.observe(element));

    document.fonts?.ready?.then(() => {
        if (!signal.aborted) scheduleHeaderHeight();
    });

    scheduleHeaderHeight();
    window.addEventListener("resize", scheduleHeaderHeight, { signal });
    window.addEventListener("scroll", scheduleHeaderHeight, { passive: true, signal });

    return {
        schedule: scheduleHeaderHeight,
        release() {
            headerHeightObserver.disconnect();
            scheduleHeaderHeight.cancel();
        }
    };
}





//# SCROLL
// hides the header while the reader scrolls down and brings it back on the way up, on screens
// up to 900px tall, where a pinned header costs too much of the page
function initScroll(header, signal) {
    if (!pgs(header).option.contains("headerScroll")) return;

    let lastScrollY = window.scrollY;
    const headerElements = pgs(header).querySelectorAll("header-element");

    function setHidden(hidden) {
        headerElements.forEach(element => element.style.transform = hidden ? "translateY(-100%)" : "translateY(0)");
        pgs(header).state.toggle("hiddenByScroll", hidden);
    }

    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;

        if (window.innerHeight <= 900) {
            setHidden(currentScrollY >= 80 && currentScrollY > lastScrollY);
        }

        lastScrollY = currentScrollY;
    }, { passive: true, signal });
}


//# PRELOAD
// --_header-height and --_header-heightScroll have a "dummy preload" default in the stylesheet, so a
// page that is still loading already leaves room for a header. A page that has no header would keep
// that room for good, under the footer, the toast and the modal: with no header in the document
// the properties are published as 0 instead, and a header that arrives later measures them again
function publishPreload() {
    if (typeof document === "undefined" || getReadyHeaders().length) return;

    document.documentElement.style.setProperty("--_header-height", "0px");
    document.documentElement.style.setProperty("--_header-heightScroll", "0px");
}


//# INSTANCES
const API = new WeakMap();
// the headers with a live instance, each with its throttled height measure and what releases it:
// walked to drop the ones that left the page, and to hand the height over to a header that is
// still there
const INSTANCES = new Map();
// the headers whose destroy() was asked for while they are still in the page: the watch that finds
// new headers must not build them again behind the author's back. init() and refresh() lift it
const STOPPED = new WeakSet();

// a header that left the page takes its instance with it. Not marked as stopped: the same node can
// come back, and the watch then builds it again
function pruneHeaders() {
    Array.from(INSTANCES.keys()).forEach(header => {
        if (!header.isConnected) teardown(header, false);
    });
}

function teardown(header, stop) {
    const entry = INSTANCES.get(header);
    if (!entry) return;

    entry.release();
    if (stop) STOPPED.add(header);
    INSTANCES.delete(header);
    API.delete(header);

    // what the header published is no longer anybody's: another header takes it over, and with
    // none left the preload goes to 0
    INSTANCES.forEach(item => item.schedule());
    publishPreload();
}

//# INIT
// builds the instance of one header and returns its API, or undefined when it is not ready (no
// header-element) or already has one
function initHeader(header) {
    if (API.has(header)) return;
    if (!pgs(header).querySelector("header-element")) return;

    const controller = new AbortController();
    const { signal } = controller;

    const releaseResize = initResize(header);
    const height = initHeight(header, signal);
    initScroll(header, signal);

    const api = {
        element: header,
        destroy() {
            // a stale instance (already replaced by a refresh) must not tear down the live one
            if (API.get(header) === api) teardown(header, true);
        },
        refresh() {
            const live = API.get(header);
            if (live && live !== api) return live;
            teardown(header, false);
            STOPPED.delete(header);
            return initHeader(header);
        },
    };

    API.set(header, api);
    INSTANCES.set(header, {
        schedule: height.schedule,
        release() {
            controller.abort();
            releaseResize();
            height.release();
        }
    });
    return api;
}

// a header is only ready once it holds a header-element, which is where every measurement happens
function getReadyHeaders() {
    return Array.from(pgs(document).querySelectorAll("header")).filter(header => pgs(header).querySelector("header-element"));
}

function PGS_header_init(root = document) {
    pgs.helper.roots(root, "header").forEach(header => {
        STOPPED.delete(header);
        initHeader(header);
    });
    publishPreload();
}

// headers can arrive later, and there may be more than one, so the watch stays on instead of
// stopping at the first: a pass is cheap and every header is initialized only once. The same pass
// lets go of the headers that left the page
pgs.helper.onDocumentReady(PGS_header_init);
pgs.helper.watchDocument(() => {
    pruneHeaders();
    pgs.helper.roots(document, "header").filter(header => !STOPPED.has(header)).forEach(initHeader);
    publishPreload();
});

//# API
function PGS_header_api(selector) {
    return API.get(selector);
}

//# EXPORT
export const PGS_header = {
    init: PGS_header_init,
    api: PGS_header_api
};
