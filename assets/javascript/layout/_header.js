



//# HEADER
//+ COMPACT BREAKPOINT
// Width at or below which the header switches to its compact layout even when the content
// still fits, so a wide header can be compact on purpose.
// headerCompact[600] wins with its own pixel value, otherwise the named options
// (headerCompactTablet, headerCompactLaptop, ...) set --header-compact-breakpoint in the
// SCSS, so the breakpoint values stay defined in one place.
function getHeader_CompactBreakpoint(header) {
    const custom = parseFloat(pgs(header).option.getValueBrackets("headerCompact"));
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
function initHeader_Resize(header) {

    if (!header) return;

    const headerElements = pgs(header).querySelectorAll("header-element");

    if (!headerElements.length) console.log('For the header to work correctly, insert "header-element" under "header"');
    if (!headerElements.length) return;

    headerElements.forEach(selectHeader => {

        /*         //==x COMPACT LAYOUT OLD
                let menuAttivate = false;
                let childsWidthSAVE;
        
                function compact(headerElement) {
        
                    //=== header
                    let style = window.getComputedStyle(headerElement);
                    let padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
                    let gap = parseFloat(style.gap);
                    let headerElementWidth = parseInt(headerElement.offsetWidth - padding);
                    let childsWidth;
        
                    if (menuAttivate) {
                        childsWidth = childsWidthSAVE;
                    } else {
                        let childs = [];
        
                        Array.from(headerElement.children)
                            .filter(el => !pgs(el).contains("header-element-onlyCompact"))
                            .forEach(child => {
                                if (pgs(child).contains("header-element-hamburger")) return;
                                childs.push(...child.children);
                            });
        
                        gap = Math.round(gap * (childs.length - 1));
                        let childsReduce = childs.reduce((totalWidth, child) => totalWidth + child.offsetWidth, 0) - 2;
        
                        childsWidth = childsReduce + gap;
                    }
        
                    //===set data
                    if (window.innerWidth <= getHeader_CompactBreakpoint(header)) {
                        pgs(header).state.add("compact");
                        pgs(selectHeader).state.add("compact");
                    } else if (headerElementWidth < childsWidth) {
                        pgs(header).state.add("compact");
                        pgs(headerElement).state.add("compact");
                        menuAttivate = true;
                        childsWidthSAVE = childsWidth;
                    } else {
                        pgs(header).state.remove("compact");
                        pgs(headerElement).state.remove("compact");
                    }
                } */

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
            if (window.innerWidth <= getHeader_CompactBreakpoint(header)) return setCompact(true);

            //=== compact: stay only while the room that was missing is still missing. With nothing learned
            //=== the page loaded compact and the full layout fitted at that width, so let it back in
            if (isCompact) return setCompact(requiredWidth ? headerElement.clientWidth < requiredWidth : false);

            setCompact(overflows);
        }


        //== observer (throttled to avoid ResizeObserver loop warnings)
        let resizeRafId = 0;
        const scheduleCompact = () => {
            if (resizeRafId) return;
            resizeRafId = requestAnimationFrame(() => {
                resizeRafId = 0;
                compact(selectHeader);
            });
        };

        let observer = new ResizeObserver(scheduleCompact);
        observer.observe(selectHeader);
        scheduleCompact();
    });

    // Ripristina la posizione dell'header quando si esce dal layout compatto
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) header.style.transform = "translateY(0)";
    });
}


//= HEADER HEIGHT
function initHeader_Height(header) {
    if (!header) return;

    let headerHeightRafId = 0;

    //+ GET HEADER HEIGHT ELEMENT
    function getHeaderHeightElement(header) {
        const isCompactBottom = window.getComputedStyle(header).getPropertyValue("--header-compactBottom-active").trim() === "1";
        return isCompactBottom ? pgs(header).querySelector("header-element") || header : header;
    }

    //+ FOR --heightOfHeader e --heightOfHeaderScroll
    function getPrimaryHeader() {
        const headers = getReadyHeaders();
        return headers.find(header => pgs(header).option.contains("headerPrimary")) || headers[0] || null;
    }

    //+ HEIGHT
    function headerHeight() {
        //== --heightOfHeader is what pushes the page down, so only one header can own it. Ownership
        //== is checked here rather than at init, so a header declaring headerPrimary later still
        //== takes over from the fallback
        if (getPrimaryHeader() !== header) return;

        const wordPressBar = parseInt(window.getComputedStyle(document.documentElement).marginTop, 10) || 0;
        const height = getHeaderHeightElement(header).offsetHeight + wordPressBar;
        const scrollHeight = header.getAttribute("data-header-scroll") === "true" ? 0 : height;

        document.documentElement.style.setProperty("--heightOfHeader", `${height}px`);
        document.documentElement.style.setProperty("--heightOfHeaderScroll", `${scrollHeight}px`);
    }

    function scheduleHeaderHeight() {
        if (headerHeightRafId) return;
        headerHeightRafId = requestAnimationFrame(() => {
            headerHeightRafId = 0;
            headerHeight();
        });
    }

    const headerHeightObserver = new ResizeObserver(scheduleHeaderHeight);
    headerHeightObserver.observe(header);
    pgs(header).querySelectorAll("header-element").forEach(element => headerHeightObserver.observe(element));

    document.fonts?.ready?.then(scheduleHeaderHeight);

    scheduleHeaderHeight();
    window.addEventListener("resize", scheduleHeaderHeight);
    window.addEventListener("scroll", scheduleHeaderHeight, { passive: true });
}





//= SCROLL
// Nasconde l'header quando si scorre verso il basso e lo mostra quando si scorre verso l'alto su dispositivi con altezza fino a 900px.
function initHeader_Scroll(header) {
    let lastScrollY = window.scrollY;
    if (!header || !pgs(header).option.contains("headerScroll")) return;
    const headerElements = pgs(header).querySelectorAll("header-element");

    window.addEventListener("scroll", () => {
        if (!header) return;
        let currentScrollY = window.scrollY;

        if (window.innerHeight <= 900) {
            if (currentScrollY >= 80) {
                if (currentScrollY > lastScrollY) {
                    headerElements.forEach(element => element.style.transform = "translateY(-100%)");
                    header.setAttribute("data-header-scroll", true)
                } else {
                    headerElements.forEach(element => element.style.transform = "translateY(0px)");
                    header.setAttribute("data-header-scroll", false)
                }
            } else {
                headerElements.forEach(element => element.style.transform = "translateY(0)");
                header.setAttribute("data-header-scroll", false)
            }
        }
        lastScrollY = currentScrollY;
    });
}


//# INIT
const INITIALIZED_HEADERS = new WeakSet();

function initHeader(header) {
    if (INITIALIZED_HEADERS.has(header)) return;
    INITIALIZED_HEADERS.add(header);

    initHeader_Resize(header);
    initHeader_Height(header);
    initHeader_Scroll(header);
}

//+ a header is only ready once it holds a header-element, which is where every measurement happens
function getReadyHeaders() {
    return Array.from(pgs(document).querySelectorAll("header")).filter(header => pgs(header).querySelector("header-element"));
}

function PGS_header_init(root = document) {
    const candidates = [
        ...(root instanceof Element && pgs(root).contains("header") ? [root] : []),
        ...pgs(root).querySelectorAll("header"),
    ];

    candidates.filter(header => pgs(header).querySelector("header-element")).forEach(header => initHeader(header));
}

PGS_header_init();

//== headers can arrive later, and there may be more than one, so the watch stays on instead of
//== stopping at the first: a pass is cheap and every header is initialized only once
let headerScanRafId = 0;
const headerObserver = new MutationObserver(() => {
    if (headerScanRafId) return;
    headerScanRafId = requestAnimationFrame(() => {
        headerScanRafId = 0;
        PGS_header_init();
    });
});

headerObserver.observe(document.documentElement, {
    childList: true,
    subtree: true
});

//# EXPORT
export const PGS_header = {
    init: PGS_header_init
};
