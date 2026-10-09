import { pgs } from "../_pgs.js";
import { PGS_onDocumentReady } from "../helper/_onDocumentReady.js";
import { PGS_roots } from "../helper/_dom.js";
import { PGS_rafThrottle, PGS_watchDocument } from "../helper/_throttle.js";

//# HEADER
//+ COMPACT BREAKPOINT
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

//+ OVERFLOW TOLERANCE
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

//= RESIZE
//== a header only reaches here once it holds a header-element (see getReadyHeaders)
function initResize(header) {
    const headerElements = pgs(header).querySelectorAll("header-element");

    headerElements.forEach(selectHeader => {

        //== COMPACT LAYOUT
        //== how much room the full layout needs, learned the first time it does not fit. It cannot be
        //== measured while compact, because header-element-onlyFull is hidden and reports zero width.
        let requiredWidth = 0;

        function compact(headerElement) {
            const isCompact = pgs(headerElement).state.contains("compact");
            const overflows = headerElement.scrollWidth > headerElement.clientWidth + OVERFLOW_TOLERANCE;

            const setCompact = (value) => {
                pgs(header).state.toggle("compact", value);
                pgs(headerElement).state.toggle("compact", value);
            };

            //=== while the full layout is on screen its scrollWidth is what it needs, and this is the only
            //=== moment it can be learned: once compact, header-element-onlyFull is hidden and reports zero
            if (!isCompact && overflows) requiredWidth = headerElement.scrollWidth;

            //=== a breakpoint declared on the header wins over any measurement
            if (window.innerWidth <= getCompactBreakpoint(header)) return setCompact(true);

            //=== compact: stay only while the room that was missing is still missing. With nothing learned
            //=== the page loaded compact and the full layout fitted at that width, so let it back in
            if (isCompact) return setCompact(requiredWidth ? headerElement.clientWidth < requiredWidth : false);
            setCompact(overflows);
        }

        //== Resize
        //== throttled to avoid ResizeObserver loop warnings
        const scheduleCompact = PGS_rafThrottle(() => compact(selectHeader));

        const observer = new ResizeObserver(scheduleCompact);
        observer.observe(selectHeader);

        //== MutationObserver, not ResizeObserver: won't loop back from compact()'s own show/hide toggles
        const childObserver = new MutationObserver(scheduleCompact);
        childObserver.observe(selectHeader, { childList: true, subtree: true });

        //== initial check
        compact(selectHeader);
    });
}


//= HEADER HEIGHT
function initHeight(header) {
    //+ GET HEADER HEIGHT ELEMENT
    function getHeaderHeightElement(header) {
        const isCompactBottom = window.getComputedStyle(header).getPropertyValue("--header-compactBottom-active").trim() === "1";
        return isCompactBottom ? pgs(header).querySelector("header-element") || header : header;
    }

    //+ FOR --_header-height and --_header-heightScroll
    function getPrimaryHeader() {
        const headers = getReadyHeaders();
        return headers.find(header => pgs(header).option.contains("headerMain")) || headers[0] || null;
    }

    //+ HEIGHT
    function headerHeight() {
        //== --_header-height is what pushes the page down, so only one header can own it. Ownership
        //== is checked here rather than at init, so a header declaring main later still
        //== takes over from the fallback
        if (getPrimaryHeader() !== header) return;

        const wordPressBar = parseInt(window.getComputedStyle(document.documentElement).marginTop, 10) || 0;
        const height = getHeaderHeightElement(header).offsetHeight + wordPressBar;
        const scrollHeight = pgs(header).state.contains("hiddenByScroll") ? 0 : height;

        document.documentElement.style.setProperty("--_header-height", `${height}px`);
        document.documentElement.style.setProperty("--_header-heightScroll", `${scrollHeight}px`);
    }

    const scheduleHeaderHeight = PGS_rafThrottle(headerHeight);

    const headerHeightObserver = new ResizeObserver(scheduleHeaderHeight);
    headerHeightObserver.observe(header);
    pgs(header).querySelectorAll("header-element").forEach(element => headerHeightObserver.observe(element));

    document.fonts?.ready?.then(scheduleHeaderHeight);

    scheduleHeaderHeight();
    window.addEventListener("resize", scheduleHeaderHeight);
    window.addEventListener("scroll", scheduleHeaderHeight, { passive: true });
}





//= SCROLL
//== hides the header while the reader scrolls down and brings it back on the way up, on screens
//== up to 900px tall, where a pinned header costs too much of the page
function initScroll(header) {
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
    }, { passive: true });
}


//# INIT
const INITIALIZED_HEADERS = new WeakSet();

function initHeader(header) {
    if (INITIALIZED_HEADERS.has(header)) return;
    INITIALIZED_HEADERS.add(header);

    initResize(header);
    initHeight(header);
    initScroll(header);
}

//+ a header is only ready once it holds a header-element, which is where every measurement happens
function getReadyHeaders() {
    return Array.from(pgs(document).querySelectorAll("header")).filter(header => pgs(header).querySelector("header-element"));
}

function PGS_header_init(root = document) {
    PGS_roots(root, "header").filter(header => pgs(header).querySelector("header-element")).forEach(initHeader);
}

//== headers can arrive later, and there may be more than one, so the watch stays on instead of
//== stopping at the first: a pass is cheap and every header is initialized only once
PGS_onDocumentReady(PGS_header_init);
PGS_watchDocument(() => PGS_header_init());

//# EXPORT
export const PGS_header = {
    init: PGS_header_init
};
