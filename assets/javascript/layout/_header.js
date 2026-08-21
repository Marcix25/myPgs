



//= HEADER
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

function initHeader_Resize(header) {

    if (!header) return;

    const headerElements = pgs(header).querySelectorAll("header-element");

    if (!headerElements.length) console.log('For the header to work correctly, insert "header-element" under "header"');
    if (!headerElements.length) return;

    const selectHeader = document

    headerElements.forEach(selectHeader => {

        //== COMPACT LAYOUT
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

                // Esclude l'area compatta dedicata e l'hamburger, poi misura i figli sempre visibili nel layout completo.
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

    function headerHeight() {
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
function initHeader(header) {
    initHeader_Resize(header);
    initHeader_Height(header);
    initHeader_Scroll(header);
}

function getReadyHeader() {
    const header = pgs(document).querySelector("header");
    return header && pgs(header).querySelector("header-element") ? header : null;
}

const readyHeader = getReadyHeader();

if (readyHeader) {
    initHeader(readyHeader);
} else {
    const headerObserver = new MutationObserver(() => {
        const header = getReadyHeader();
        if (!header) return;

        headerObserver.disconnect();
        initHeader(header);
    });

    headerObserver.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
}
