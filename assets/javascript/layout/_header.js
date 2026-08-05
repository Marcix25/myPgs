



//= HEADER
function initHeader_Resize(header) {

    if (!header) return;

    const headerElements = pgs(header).querySelectorAll("header-element");

    if (!headerElements.length) console.log('For the header to work correctly, insert "header-element" under "header"');
    if (!headerElements.length) return;

    const selectHeader = document

    headerElements.forEach(selectHeader => {

        //== ACTIVE MOBILE 
        let menuAttivate = false;
        let childsWidthSAVE;

        function mobileActive(headerElement) {

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

                // Esclude l'area mobile dedicata e l'hamburger, poi misura i figli sempre visibili su desktop.
                Array.from(headerElement.children)
                    .filter(el => !pgs(el).contains("header-element-onlyMobile"))
                    .forEach(child => {
                        if (pgs(child).contains("header-element-hamburger")) return;
                        childs.push(...child.children);
                    });

                gap = Math.round(gap * (childs.length - 1));
                let childsReduce = childs.reduce((totalWidth, child) => totalWidth + child.offsetWidth, 0) - 2;

                childsWidth = childsReduce + gap;
            }

            //===set data
            if (window.innerWidth < 600) {
                pgs(header).state.add("mobileActive");
                pgs(selectHeader).state.add("mobileActive");
            } else if (headerElementWidth < childsWidth) {
                pgs(header).state.add("mobileActive");
                pgs(headerElement).state.add("mobileActive");
                menuAttivate = true;
                childsWidthSAVE = childsWidth;
            } else {
                pgs(header).state.remove("mobileActive");
                pgs(headerElement).state.remove("mobileActive");
            }
        }

        //== observer (throttled to avoid ResizeObserver loop warnings)
        let resizeRafId = 0;
        const scheduleMobileActive = () => {
            if (resizeRafId) return;
            resizeRafId = requestAnimationFrame(() => {
                resizeRafId = 0;
                mobileActive(selectHeader);
            });
        };

        let observer = new ResizeObserver(scheduleMobileActive);
        observer.observe(selectHeader);
        scheduleMobileActive();
    });

    // Ripristina la posizione dell'header quando si esce dalla modalità mobile
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
        const isMobileBottom = window.getComputedStyle(header).getPropertyValue("--header-mobile-bottom-active").trim() === "1";
        return isMobileBottom ? pgs(header).querySelector("header-element") || header : header;
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
    window.addEventListener("scroll", () => {
        if (!header) return;
        let currentScrollY = window.scrollY;

        if (window.innerHeight <= 900) {
            if (currentScrollY >= 80) {
                if (currentScrollY > lastScrollY) {
                    header.style.transform = "translateY(-100%)";
                    header.setAttribute("data-header-scroll", true)
                } else {
                    header.style.transform = "translateY(0px)";
                    header.setAttribute("data-header-scroll", false)
                }
            } else {
                header.style.transform = "translateY(0)"; // Mostra sempre l'header se il scroll è inferiore a 80px
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
