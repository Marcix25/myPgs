import { PGS_scrollHorizontal } from "../functions/_scrollY"
const API = new WeakMap();

class PGS_Slides {
    //- CONSTRUCTOR
    constructor({ selector, viewRatio = 0.97, optionIntersectionObserver = {}, scrollOptions = {} } = {}) {
        this.selector = selector;
        this.viewRatio = viewRatio;

        this.optionIntersectionObserver = {
            threshold: Array.from({ length: 101 }, (_, i) => i / 100), // 0%,1%,2%...100%
            rootMargin: "0px",
            ...optionIntersectionObserver,
        };

        this.scrollOptions = {
            behavior: "smooth",
            inline: "center",
            block: "nearest",
            container: "nearest",
            ...scrollOptions,
        };

        this.container = this.selector ? pgs(this.selector).querySelector("slides-container") : null;
    }
    
    //+ CREATE BUTTON 
    #createButtonsAndDots() {
        const EL = this.selector

        //== PULSANTI
        if (!pgs(EL).querySelector('slides-prec') && !pgs(EL).querySelector('slides-next')) {
            EL.insertAdjacentHTML("afterbegin", `<button pgs="slides-prec buttonIcon" type="button" class="precButton" aria-label="slide precedente"> <span> <i class="fa-solid fa-arrow-left"></i></span></button>`);
            EL.insertAdjacentHTML("beforeend", `<button pgs="slides-next buttonIcon" type="button" class="nextButton" aria-label="prossima slide"> <span> <i class="fa-solid fa-arrow-right"></i></span></button>`);
        }

        //== DOTS
        if (!pgs(EL).querySelector('slides-dots')) {
            EL.insertAdjacentHTML("beforeend", `<div pgs="slides-dots" class="slides-dots"></div>`);

            Array.from(this.container.children).forEach(() => {
                pgs(EL).querySelector('slides-dots')
                    .insertAdjacentHTML("beforeend", `<button type="button" class="slide-dot" aria-label="vai alla prossima slide"></button>`);
            });
        }
    }

    //+ PREV 
    #previousSlide() {
        const currents = this.container.querySelectorAll('.view');
        let current;
        

        if (pgs(this.selector).option.contains('singleScroll')) current = currents[currents.length - 1];
        else current = currents[0];

        const prev = current?.previousElementSibling;

        prev?.scrollIntoView(this.scrollOptions);
        prev?.focus({ preventScroll: true });
    }

    //+ NEXT 
    #nextSlide() {
        const currents = this.container.querySelectorAll('.view');
        let current;

        
        
        if (pgs(this.selector).option.contains('singleScroll')) current = currents[0];
        else current = currents[currents.length - 1];
        
        const next = current?.nextElementSibling;
        console.log(current, next);

        next?.scrollIntoView(this.scrollOptions);
        next?.focus({ preventScroll: true });
    }

    //+ GO TO NUMBER SLIDE 
    #goToNumberSlide(index) {
        this.container.children[index].scrollIntoView(this.scrollOptions)
    }

    //+ CALLBACK
    #callback(allLi, container, precButton, nextButton, dots) {
        allLi.forEach(LI => {
            const visiblePercent = 0.9 + LI.intersectionRatio * 0.1;
            const isView = visiblePercent >= 0.98;

            //== SCROLL ANIMATION
            if (!pgs(LI.target).option.contains('notScrollAnimation') && LI.target.firstElementChild) {
                LI.target.firstElementChild.style.setProperty('--visible-percent', `${visiblePercent}`);
            };

            //== VIEW & NOT-VIEW 
            LI.target.classList.toggle("view", isView);
            LI.target.classList.toggle("notView", !isView);

            //== VIEW PREC e NEXT
            const all = LI.target.parentNode.children;
            const atStart = all[0].classList.contains("view");
            const atEnd = all[all.length - 1].classList.contains("view");
            nextButton.disabled = atEnd;
            precButton.disabled = atStart;
            nextButton.setAttribute('aria-disabled', String(atEnd));
            precButton.setAttribute('aria-disabled', String(atStart));

            //== ACTIVE DOT
            const viewElements = Array.from(container.children).filter(el => el.classList.contains('view'));
            dots.forEach((btn, i) => {
                const isActive = viewElements.some(el => Array.from(container.children).indexOf(el) === i);
                btn.classList.toggle('active', isActive);
                btn.setAttribute('aria-current', isActive ? 'true' : 'false');
            });
        })
    }

    //= EXECUTE
    execute() {
        const slides = this.selector;
        if (!this.container) return

        //== elements
        this.#createButtonsAndDots();
        const precButton = pgs(slides).querySelector('slides-prec');
        const nextButton = pgs(slides).querySelector('slides-next');
        const dots = Array.from(pgs(slides).querySelector('slides-dots').children);

        //== option
        const notScrollWithMouse = pgs(slides).option.contains('notScrollWithMouse');

        //== scroll
        if (!notScrollWithMouse) PGS_scrollHorizontal(this.container, 5);

        //==Listener: DOT, PREC, NEXT
        dots.forEach((dot, index) => dot.addEventListener("click", e => this.#goToNumberSlide(index)));
        precButton.addEventListener("click", e => this.#previousSlide(), { passive: true });
        nextButton.addEventListener("click", e => this.#nextSlide(), { passive: true });

        //== observer
        const observer = new IntersectionObserver(
            (allLi) => this.#callback(allLi, this.container, precButton, nextButton, dots),
            { root: this.container, ...this.optionIntersectionObserver }
        );
        Array.from(this.container.children).forEach(allLi => observer.observe(allLi));


        //- API
        API.set(this.selector, {
            element: this.selector,
            container: this.container,
            previous: () => this.#previousSlide(),
            next: () => this.#nextSlide(),
            goTo: (index) => this.#goToNumberSlide(index),
            getCurrentIndexes: () => Array.from(this.container.children).map((el, i) => el.classList.contains("view") ? i : -1).filter(i => i !== -1),
            getCurrentElements: () => Array.from(this.container.children).filter(el => el.classList.contains("view")),
            getTotal: () => this.container.children.length,
            isAtStart: () => this.container.children[0]?.classList.contains("view") || false,
            isAtEnd: () => {
                const children = this.container.children;
                const last = children[children.length - 1];
                return last?.classList.contains("view") || false;
            },
            refresh: () => {
                PGS_slides_init(this.selector.parentNode || document);
                return API.get(this.selector);
            },
        });
    }
}

//# INIT 
export function PGS_slides_init(root = document) {
    pgs(root).querySelectorAll("slides").forEach(el => {
        if (API.has(el)) return;

        const instance = new PGS_Slides({ selector: el });
        instance.execute();
    });
}

PGS_slides_init();

//# API 
export function PGS_slides_api(selector) {
    return API.get(selector);
}

export const PGS_slides = {
    init: PGS_slides_init,
    api: PGS_slides_api
};
