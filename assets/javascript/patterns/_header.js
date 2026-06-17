//# HEADER
const header = pgs(document).querySelector("header");
const headerElements = pgs(header).querySelectorAll("header-element");
headerElements.forEach(element => PGS_header(element));

//= HEADER
export function PGS_header(selectHeader) {

    //= INIT
    if (selectHeader.getAttribute("data-initialize") == "true") return;
    selectHeader.setAttribute("data-initialize", "true");

    //= ACTIVE MOBILE 
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
            header.setAttribute("data-header-mobileActive", "true");
            selectHeader.setAttribute("data-header-mobileActive", "true");
        } else if (headerElementWidth < childsWidth) {
            header.setAttribute("data-header-mobileActive", "true");
            headerElement.setAttribute("data-header-mobileActive", "true");
            menuAttivate = true;
            childsWidthSAVE = childsWidth;
        } else {
            header.setAttribute("data-header-mobileActive", "false");
            headerElement.setAttribute("data-header-mobileActive", "false");
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

}




//= HEADER HEIGHT
const body = document.querySelector("body");
function headerHeight() {
    const headerElements = document.querySelectorAll("header > [data-initialize=true]");
    const wordPressBar = window.getComputedStyle(document.documentElement).marginTop ?? 0;

    const totalHeight = Array.from(headerElements)
        .map(el => el.offsetHeight)
        .reduce((sum, h) => sum + h);

    const height = totalHeight + parseInt(wordPressBar);

    body.style.setProperty('--heightOfHeader', `${height}px`);
    const scrollHeight = document.querySelector("header").getAttribute("data-header-scroll") === "true" ? 0 : height;
    body.style.setProperty('--heightOfHeaderScroll', `${scrollHeight}px`);

}
headerHeight()
window.addEventListener("resize", headerHeight);
window.addEventListener("scroll", headerHeight);


//= SCROLL
// Nasconde l'header quando si scorre verso il basso e lo mostra quando si scorre verso l'alto su dispositivi con larghezza fino a 900px.
let lastScrollY = window.scrollY;
window.addEventListener("scroll", () => {
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

// Ripristina la posizione dell'header quando si esce dalla modalità mobile
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) header.style.transform = "translateY(0)";
});

// MOBILE ACTIVE
if (window.innerWidth < 600) {
    document.querySelector("header").setAttribute("data-header-mobileActive", "true");
    document.querySelector("[pgs~=header-element]").setAttribute("data-header-mobileActive", "true");
}