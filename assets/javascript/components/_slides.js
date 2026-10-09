import { pgs } from "../_pgs.js";

const API = new WeakMap();

// a slide is in view from this share of it showing; the observer reports every percent so the
// same pass also feeds the scale animation
const VIEW_RATIO = 0.97;
const THRESHOLDS = Array.from({ length: 101 }, (_, i) => i / 100); // 0%,1%,2%...100%
const SCROLL_BEHAVIOR = "smooth";

class PGS_Slides {
    //## CONSTRUCTOR
    constructor({ element } = {}) {
        this.element = element;
        this.container = pgs(this.element).querySelector("slides-container");
    }
    
    //## CREATE BUTTON
    #createButtonsAndDots() {
        const EL = this.element;

        //## BUTTONS
        // a hand-written button keeps the bare name; a generated one gets the underscore, so
        // the check below has to look for either
        if (!pgs(EL).querySelector(['slides-prev', '_slides-prev'])) {
            EL.insertAdjacentHTML("afterbegin", `<button pgs="_slides-prev button['btnIconOnly' 'btnMini']" type="button" aria-label="Previous slide"> <i pgs="icon['icon-chevronDown'] rotate['rot90']"></i></button>`);
        }
        if (!pgs(EL).querySelector(['slides-next', '_slides-next'])) {
            EL.insertAdjacentHTML("beforeend", `<button pgs="_slides-next button['btnIconOnly' 'btnMini']" type="button" aria-label="Next slide"> <i pgs="icon['icon-chevronDown'] rotate['rot270']"></i></button>`);
        }

        //## DOTS
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
        // the token goes on every child, not only the ones built here: a dots container written
        // by hand is filled and labeled the same way, and the stylesheet has one thing to look for
        Array.from(dotsContainer.children).forEach((dot, index) => {
            pgs(dot).add("_slides-dots-dot");
            dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
        });
    }

    //## SLIDE THE ARROWS MOVE FROM
    // slidesSingleScroll starts from the middle one in view, the one the snap is resting on: from the
    // first, with three slides showing, the next sibling is already centered and nothing scrolls
    #currentSlide(towardsEnd) {
        // arrow function: a declared one would have its own this and throw here
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

        // the middle of an even number of slides falls between two of them, so each arrow takes
        // the one on its own side: rounded down going forward, up going back. Rounding down for
        // both, as this did, left the two arrows starting from the same slide, and going back
        // then covered a slide more than going forward did
        if (pgs(this.element).option.contains('slidesSingleScroll')) {
            const middle = (currents.length - 1) / 2;
            return currents[towardsEnd ? Math.floor(middle) : Math.ceil(middle)];
        }

        return towardsEnd ? currents[currents.length - 1] : currents[0];
    }

    //## GO TO A SLIDE
    // the two ends run the scroll out instead of centering, so the margin they carry is scrolled
    // through and the card lines up with the page content
    #goToSlide(slide) {
        if (!slide) return;

        const all = this.container.children;
        const behavior = SCROLL_BEHAVIOR;

        //## FIRST SLIDE
        if (slide === all[0]) this.container.scrollTo({ left: 0, behavior });
        //## LAST SLIDE
        else if (slide === all[all.length - 1]) this.container.scrollTo({ left: this.container.scrollWidth, behavior });
        //## SLIDE
        // the centering is measured and applied to the track alone. scrollIntoView would do the
        // same arithmetic, but by definition it walks up every scrollable ancestor and leaves
        // each one to the engine's reading of block: "nearest" — which is why Safari answers an
        // arrow by scrolling the page vertically as well. A horizontal carousel needs nothing
        // above the track to move, so nothing above the track is asked to
        else {
            const trackBox = this.container.getBoundingClientRect();
            const slideBox = slide.getBoundingClientRect();
            const distanceFromCenter = (slideBox.left + slideBox.width / 2) - (trackBox.left + trackBox.width / 2);
            this.container.scrollTo({ left: this.container.scrollLeft + distanceFromCenter, behavior });
        }

        slide.focus({ preventScroll: true });
    }

    //## LOOP
    #isLoop() {
        return pgs(this.element).option.contains('slidesLoop');
    }

    //## PREV
    // no slide left to move to, but the scroll has not run out: the edge slide is showing with
    // its margin still to come, so the arrow finishes the scroll instead of doing nothing.
    // slidesLoop replaces that fallback with the last slide instead of staying put
    #prevSlide() {
        const all = this.container.children;
        const previous = this.#currentSlide(false)?.previousElementSibling;
        this.#goToSlide(previous ?? (this.#isLoop() ? all[all.length - 1] : all[0]));
    }

    //## NEXT
    #nextSlide() {
        const all = this.container.children;
        const next = this.#currentSlide(true)?.nextElementSibling;
        this.#goToSlide(next ?? (this.#isLoop() ? all[0] : all[all.length - 1]));
    }

    //## GO TO NUMBER SLIDE
    #goToNumberSlide(index) {
        this.#goToSlide(this.container.children[index]);
    }

    //## CALLBACK
    #callback(allLi, container, prevButton, nextButton, dots) {
        allLi.forEach(LI => {
            // visiblePercent only feeds the scale animation; a slide is in view from VIEW_RATIO
            const visiblePercent = 0.9 + LI.intersectionRatio * 0.1;
            const isView = LI.intersectionRatio >= VIEW_RATIO;

            //## SCROLL ANIMATION
            if (LI.target.firstElementChild) {
                LI.target.firstElementChild.style.setProperty('--_slides-visiblePercent', `${visiblePercent}`);
            };

            //## VIEW
            pgs(LI.target).state.toggle("view", isView);

            //## ACTIVE DOT
            const viewElements = Array.from(container.children).filter(el => pgs(el).state.contains("view"));
            dots.forEach((btn, i) => {
                const isActive = viewElements.some(el => Array.from(container.children).indexOf(el) === i);
                pgs(btn).state.toggle("active", isActive);
                btn.setAttribute('aria-current', isActive ? 'true' : 'false');
            });
        })

        this.#updateArrows(prevButton, nextButton);
    }

    //## ARROWS STATE
    // an arrow goes off only at the end of the scroll, not as soon as the edge slide is in view:
    // that slide carries a margin, so it can be entirely on screen with a stretch still to run,
    // and the arrow is what runs it. slidesLoop wraps around instead, so neither arrow ever
    // goes off
    #updateArrows(prevButton, nextButton) {
        const loop = this.#isLoop();
        const atStart = !loop && this.container.scrollLeft <= 1;
        const atEnd = !loop && this.container.scrollLeft >= this.container.scrollWidth - this.container.clientWidth - 1;

        nextButton.disabled = atEnd;
        prevButton.disabled = atStart;
        nextButton.setAttribute('aria-disabled', String(atEnd));
        prevButton.setAttribute('aria-disabled', String(atStart));
    }

    //# EXECUTE
    // builds the instance of this element and returns its API, or null when the markup cannot be initialized
    execute() {
        const slides = this.element;
        if (!this.container) {
            pgs.helper.warn("slides.init", "the slides has no slides-container, so it was not initialized", slides);
            return null;
        }
        const eventController = new AbortController();
        const { signal } = eventController;

        //## elements
        this.#createButtonsAndDots();
        const prevButton = pgs(slides).querySelector(['slides-prev', '_slides-prev']);
        const nextButton = pgs(slides).querySelector(['slides-next', '_slides-next']);
        const dots = Array.from(pgs(slides).querySelector(['slides-dots', '_slides-dots']).children);

        //##Listener: DOT, PREV, NEXT
        dots.forEach((dot, index) => dot.addEventListener("click", () => this.#goToNumberSlide(index), { signal }));
        prevButton.addEventListener("click", () => this.#prevSlide(), { passive: true, signal });
        nextButton.addEventListener("click", () => this.#nextSlide(), { passive: true, signal });

        // the observer answers what is visible, not where the scroll is: the last stretch can
        // settle with no threshold left to cross, so the arrows are refreshed on scroll too
        const updateArrowsOnScroll = pgs.helper.rafThrottle(() => this.#updateArrows(prevButton, nextButton));
        this.container.addEventListener("scroll", updateArrowsOnScroll, { passive: true, signal });
        this.#updateArrows(prevButton, nextButton);

        //## observer
        const observer = new IntersectionObserver(
            (allLi) => this.#callback(allLi, this.container, prevButton, nextButton, dots),
            { root: this.container, threshold: THRESHOLDS, rootMargin: "0px" }
        );
        Array.from(this.container.children).forEach(allLi => observer.observe(allLi));

        //## HEIGHT
        // the track's height published on the root as --_slides-height, so the CSS can place
        // something against the slides themselves rather than against the whole component: the
        // arrows sit at half of it, and stay centered on the slides whatever else the root holds.
        // Measured rather than computed because the height comes from the tallest slide, which
        // only the layout knows — through a rAF, like the header does, so a write never lands
        // inside the callback that observed it
        const publishHeight = pgs.helper.rafThrottle(() => {
            this.element.style.setProperty("--_slides-height", `${this.container.offsetHeight}px`);
        });
        const heightObserver = new ResizeObserver(publishHeight);
        heightObserver.observe(this.container);

        const destroy = () => {
            if (API.get(this.element) !== api) return;
            eventController.abort();
            observer.disconnect();
            heightObserver.disconnect();
            updateArrowsOnScroll.cancel();
            publishHeight.cancel();
            API.delete(this.element);
        };

        //## API
        const api = {
            element: this.element,
            container: this.container,
            prev: () => this.#prevSlide(),
            next: () => this.#nextSlide(),
            goTo: (index) => {
                const total = this.container.children.length;
                if (!Number.isInteger(index) || index < 0 || index >= total) {
                    throw pgs.helper.invalid("slides.goTo", `index must be an integer from 0 to ${total - 1}, got ${index}`);
                }
                this.#goToNumberSlide(index);
            },
            getCurrentIndexes: () => Array.from(this.container.children).map((el, i) => pgs(el).state.contains("view") ? i : -1).filter(i => i !== -1),
            getCurrentElements: () => Array.from(this.container.children).filter(el => pgs(el).state.contains("view")),
            getTotal: () => this.container.children.length,
            // same reading as the arrows: the end of the scroll, not the edge slide being in view
            isAtStart: () => this.container.scrollLeft <= 1,
            isAtEnd: () => this.container.scrollLeft >= this.container.scrollWidth - this.container.clientWidth - 1,
            destroy,
            refresh: () => {
                const live = API.get(this.element);
                if (live && live !== api) return live;
                destroy();
                return new PGS_Slides({ element: this.element }).execute();
            },
        };
        API.set(this.element, api);
        return api;
    }
}

//# INIT
function PGS_slides_init(root = document) {
    pgs.helper.roots(root, "slides").forEach(element => {
        if (API.has(element)) return;

        new PGS_Slides({ element }).execute();
    });
}

pgs.helper.onDocumentReady(PGS_slides_init);

//# API
function PGS_slides_api(element) {
    return API.get(element);
}

export const PGS_slides = {
    init: PGS_slides_init,
    api: PGS_slides_api
};
