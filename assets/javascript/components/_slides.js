import { PGS_scrollHorizontalWithMouse } from "../helper/_scrollHorizontal.js";
import { PGS_onDocumentReady } from "../helper/_onDocumentReady.js";
const API = new WeakMap();

function getSlides(root) {
    const slides = root instanceof Element && pgs(root).contains("slides") ? [root] : [];
    slides.push(...pgs(root).querySelectorAll("slides"));
    return slides;
}

class PGS_Slides {
    //- CONSTRUCTOR
    constructor({ element, viewRatio = 0.97, optionIntersectionObserver = {}, scrollOptions = {} } = {}) {
        this.element = element;
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

        this.container = this.element ? pgs(this.element).querySelector("slides-container") : null;
    }
    
    //+ CREATE BUTTON 
    #createButtonsAndDots() {
        const EL = this.element;

        //== PULSANTI
        //== a hand-written button keeps the bare name; a generated one gets the underscore, so
        //== the check below has to look for either
        if (!pgs(EL).querySelector(['slides-prec', '_slides-prec'])) {
            EL.insertAdjacentHTML("afterbegin", `<button pgs="_slides-prec button['iconOnly' 'btnMini']" type="button" class="precButton" aria-label="Previous slide"> <i pgs="icon['icon-chevronDown'] rotate['rot90']"></i></button>`);
        }
        if (!pgs(EL).querySelector(['slides-next', '_slides-next'])) {
            EL.insertAdjacentHTML("beforeend", `<button pgs="_slides-next button['iconOnly' 'btnMini']" type="button" class="nextButton" aria-label="Next slide"> <i pgs="icon['icon-chevronDown'] rotate['rot270']"></i></button>`);
        }

        //== DOTS
        if (!pgs(EL).querySelector(['slides-dots', '_slides-dots'])) {
            EL.insertAdjacentHTML("beforeend", `<div pgs="_slides-dots"></div>`);
        }

        const dotsContainer = pgs(EL).querySelector(['slides-dots', '_slides-dots']);
        while (dotsContainer.children.length < this.container.children.length) {
            dotsContainer.insertAdjacentHTML("beforeend", `<button pgs="_slides-dots-dot" type="button"></button>`);
        }
        while (dotsContainer.children.length > this.container.children.length) {
            dotsContainer.lastElementChild.remove();
        }
        //== the token goes on every child, not only the ones built here: a dots container written
        //== by hand is filled and labelled the same way, and the stylesheet has one thing to look for
        Array.from(dotsContainer.children).forEach((dot, index) => {
            pgs(dot).add("_slides-dots-dot");
            dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
        });
    }

    //+ SLIDE THE ARROWS MOVE FROM
    //== singleScroll starts from the middle one in view, the one the snap is resting on: from the
    //== first, with three slides showing, the next sibling is already centred and nothing scrolls
    #currentSlide(towardsEnd) {
        //== arrow function: a declared one would have its own this and throw here
        const nearestSlide = () => {
            const box = this.container.getBoundingClientRect();
            const middle = (box.left + box.right) / 2;

            return Array.from(this.container.children).reduce((nearest, slide) => {
                const slideBox = slide.getBoundingClientRect();
                const distance = Math.abs((slideBox.left + slideBox.right) / 2 - middle);
                return !nearest || distance < nearest.distance ? { slide, distance } : nearest;
            }, null)?.slide;
        };

        const currents = pgs(this.container).state.querySelectorAll("view");
        if (!currents.length) return nearestSlide();

        //== the middle of an even number of slides falls between two of them, so each arrow takes
        //== the one on its own side: rounded down going forward, up going back. Rounding down for
        //== both, as this did, left the two arrows starting from the same slide, and going back
        //== then covered a slide more than going forward did
        if (pgs(this.element).option.contains('singleScroll')) {
            const middle = (currents.length - 1) / 2;
            return currents[towardsEnd ? Math.floor(middle) : Math.ceil(middle)];
        }

        return towardsEnd ? currents[currents.length - 1] : currents[0];
    }

    //+ GO TO A SLIDE
    //== the two ends run the scroll out instead of centring, so the margin they carry is scrolled
    //== through and the card lines up with the page content
    #goToSlide(slide) {
        if (!slide) return;

        const all = this.container.children;
        const behavior = this.scrollOptions.behavior;

        //== FIRST SLIDE
        if (slide === all[0]) this.container.scrollTo({ left: 0, behavior });
        //== LAST SLIDE
        else if (slide === all[all.length - 1]) this.container.scrollTo({ left: this.container.scrollWidth, behavior });
        //== SLIDE
        //== the centring is measured and applied to the track alone. scrollIntoView would do the
        //== same arithmetic, but by definition it walks up every scrollable ancestor and leaves
        //== each one to the engine's reading of block: "nearest" — which is why Safari answers an
        //== arrow by scrolling the page vertically as well. A horizontal carousel needs nothing
        //== above the track to move, so nothing above the track is asked to
        else {
            const trackBox = this.container.getBoundingClientRect();
            const slideBox = slide.getBoundingClientRect();
            const distanceFromCentre = (slideBox.left + slideBox.width / 2) - (trackBox.left + trackBox.width / 2);
            this.container.scrollTo({ left: this.container.scrollLeft + distanceFromCentre, behavior });
        }

        slide.focus({ preventScroll: true });
    }

    //+ PREV
    //== no slide left to move to, but the scroll has not run out: the edge slide is showing with
    //== its margin still to come, so the arrow finishes the scroll instead of doing nothing
    #previousSlide() {
        const all = this.container.children;
        this.#goToSlide(this.#currentSlide(false)?.previousElementSibling ?? all[0]);
    }

    //+ NEXT
    #nextSlide() {
        const all = this.container.children;
        this.#goToSlide(this.#currentSlide(true)?.nextElementSibling ?? all[all.length - 1]);
    }

    //+ GO TO NUMBER SLIDE
    #goToNumberSlide(index) {
        this.#goToSlide(this.container.children[index]);
    }

    //+ CALLBACK
    #callback(allLi, container, precButton, nextButton, dots) {
        allLi.forEach(LI => {
            //== visiblePercent only feeds the scale animation; the threshold is viewRatio, which
            //== used to be a stored and never read parameter, with 0.8 hardcoded here instead
            const visiblePercent = 0.9 + LI.intersectionRatio * 0.1;
            const isView = LI.intersectionRatio >= this.viewRatio;

            //== SCROLL ANIMATION
            if (LI.target.firstElementChild) {
                LI.target.firstElementChild.style.setProperty('--slides-visiblePercent', `${visiblePercent}`);
            };

            //== VIEW & NOT-VIEW
            //== both are written: notView says the observer has run and put this slide outside the
            //== view, which :not([pgs-state~="view"]) cannot tell apart from the state before the
            //== first pass, when no slide carries either
            pgs(LI.target).state.toggle("view", isView);
            pgs(LI.target).state.toggle("notView", !isView);

            //== ACTIVE DOT
            const viewElements = Array.from(container.children).filter(el => pgs(el).state.contains("view"));
            dots.forEach((btn, i) => {
                const isActive = viewElements.some(el => Array.from(container.children).indexOf(el) === i);
                pgs(btn).state.toggle("active", isActive);
                btn.setAttribute('aria-current', isActive ? 'true' : 'false');
            });
        })

        this.#updateArrows(precButton, nextButton);
    }

    //+ ARROWS STATE
    //== an arrow goes off only at the end of the scroll, not as soon as the edge slide is in view:
    //== that slide carries a margin, so it can be entirely on screen with a stretch still to run,
    //== and the arrow is what runs it
    #updateArrows(precButton, nextButton) {
        const atStart = this.container.scrollLeft <= 1;
        const atEnd = this.container.scrollLeft >= this.container.scrollWidth - this.container.clientWidth - 1;

        nextButton.disabled = atEnd;
        precButton.disabled = atStart;
        nextButton.setAttribute('aria-disabled', String(atEnd));
        precButton.setAttribute('aria-disabled', String(atStart));
    }

    //= EXECUTE
    execute() {
        const slides = this.element;
        if (!this.container) return;
        const eventController = new AbortController();
        const { signal } = eventController;

        //== elements
        this.#createButtonsAndDots();
        const precButton = pgs(slides).querySelector(['slides-prec', '_slides-prec']);
        const nextButton = pgs(slides).querySelector(['slides-next', '_slides-next']);
        const dots = Array.from(pgs(slides).querySelector(['slides-dots', '_slides-dots']).children);

        //== option
        const scrollMouse = pgs(slides).option.contains('scrollMouse');

        //== scroll
        const removeHorizontalScroll = scrollMouse
            ? PGS_scrollHorizontalWithMouse(this.container, 5)
            : null;

        //==Listener: DOT, PREC, NEXT
        dots.forEach((dot, index) => dot.addEventListener("click", () => this.#goToNumberSlide(index), { signal }));
        precButton.addEventListener("click", () => this.#previousSlide(), { passive: true, signal });
        nextButton.addEventListener("click", () => this.#nextSlide(), { passive: true, signal });

        //== the observer answers what is visible, not where the scroll is: the last stretch can
        //== settle with no threshold left to cross, so the arrows are refreshed on scroll too
        let arrowsFrame = 0;
        this.container.addEventListener("scroll", () => {
            if (arrowsFrame) return;
            arrowsFrame = requestAnimationFrame(() => {
                arrowsFrame = 0;
                this.#updateArrows(precButton, nextButton);
            });
        }, { passive: true, signal });
        this.#updateArrows(precButton, nextButton);

        //== observer
        const observer = new IntersectionObserver(
            (allLi) => this.#callback(allLi, this.container, precButton, nextButton, dots),
            { root: this.container, ...this.optionIntersectionObserver }
        );
        Array.from(this.container.children).forEach(allLi => observer.observe(allLi));

        //== HEIGHT
        //== the track's height published on the root as --slides-height, so the CSS can place
        //== something against the slides themselves rather than against the whole component: the
        //== arrows sit at half of it, and stay centred on the slides whatever else the root holds.
        //== Measured rather than computed because the height comes from the tallest slide, which
        //== only the layout knows — through a rAF, like the header does, so a write never lands
        //== inside the callback that observed it
        let heightFrame = 0;
        const heightObserver = new ResizeObserver(() => {
            if (heightFrame) return;
            heightFrame = requestAnimationFrame(() => {
                heightFrame = 0;
                this.element.style.setProperty("--slides-height", `${this.container.offsetHeight}px`);
            });
        });
        heightObserver.observe(this.container);


        let api;
        const destroy = () => {
            if (API.get(this.element) !== api) return;
            eventController.abort();
            observer.disconnect();
            heightObserver.disconnect();
            if (heightFrame) cancelAnimationFrame(heightFrame);
            removeHorizontalScroll?.();
            API.delete(this.element);
        };

        //- API
        api = {
            element: this.element,
            container: this.container,
            previous: () => this.#previousSlide(),
            next: () => this.#nextSlide(),
            goTo: (index) => this.#goToNumberSlide(index),
            getCurrentIndexes: () => Array.from(this.container.children).map((el, i) => pgs(el).state.contains("view") ? i : -1).filter(i => i !== -1),
            getCurrentElements: () => Array.from(this.container.children).filter(el => pgs(el).state.contains("view")),
            getTotal: () => this.container.children.length,
            //== same reading as the arrows: the end of the scroll, not the edge slide being in view
            isAtStart: () => this.container.scrollLeft <= 1,
            isAtEnd: () => this.container.scrollLeft >= this.container.scrollWidth - this.container.clientWidth - 1,
            refresh: () => {
                if (API.get(this.element) !== api) return API.get(this.element);
                destroy();
                const instance = new PGS_Slides({
                    element: this.element,
                    viewRatio: this.viewRatio,
                    optionIntersectionObserver: this.optionIntersectionObserver,
                    scrollOptions: this.scrollOptions,
                });
                instance.execute();
                return API.get(this.element);
            },
        };
        API.set(this.element, api);
    }
}

//# INIT 
function PGS_slides_init(root = document) {
    getSlides(root).forEach(element => {
        if (API.has(element)) return;

        const instance = new PGS_Slides({ element });
        instance.execute();
    });
}

PGS_onDocumentReady(PGS_slides_init);

//# API 
function PGS_slides_api(element) {
    return API.get(element);
}

export const PGS_slides = {
    init: PGS_slides_init,
    api: PGS_slides_api
};
