//+ converts a wheel event into a horizontal scroll delta, honouring the container's own scroll
//+ boundaries and leaving native horizontal scrolling (and pinch-zoom) alone; shouldSkip lets a
//+ variant bail out of specific input before any of that runs
function createHorizontalWheelHandler(element, speed, shouldSkip) {
    const onWheel = (e) => {
        //== lets a variant opt out of specific input (e.g. the trackpad) before anything else runs
        if (shouldSkip?.(e)) return;

        //== avoid interfering with pinch-zoom or native horizontal scroll
        if (e.ctrlKey) return;
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

        //== convert the delta to px
        let delta = e.deltaY;
        if (e.deltaMode === 1) delta *= 16;
        else if (e.deltaMode === 2) delta *= element.clientHeight;

        //== only take over the event if the container can still scroll further in that direction
        const atStart = element.scrollLeft <= 0;
        const atEnd = element.scrollLeft + element.clientWidth >= element.scrollWidth - 1;
        const scrollingRight = delta > 0;
        const scrollingLeft = delta < 0;
        const canScrollHoriz =
            (scrollingRight && !atEnd) ||
            (scrollingLeft && !atStart);

        if (!canScrollHoriz) return;

        e.preventDefault();
        element.scrollLeft += delta * speed;
    };

    element.addEventListener('wheel', onWheel, { passive: false });
    return () => element.removeEventListener('wheel', onWheel);
}

//+ estimates whether the wheel source is a trackpad: small, high-frequency deltas are its signature,
//+ a physical mouse wheel fires larger, sparser steps
function createTrackpadDetector() {
    let lastTs = 0;
    let smallAndFast = 0;
    let samples = 0;
    let isTrackpad = false;

    return function update(e) {
        const now = performance.now();
        const dt = now - lastTs;

        let dy = Math.abs(e.deltaY);
        if (e.deltaMode === 1) dy *= 16;
        else if (e.deltaMode === 2) dy *= e.currentTarget?.clientHeight || 800;

        const small = dy < 30;
        const fast = dt < 35;
        if (small && fast) smallAndFast++;

        samples++;
        if (samples >= 6) {
            isTrackpad = smallAndFast >= 3;
            smallAndFast = 0;
            samples = 0;
        }

        lastTs = now;
        return isTrackpad;
    };
}

//= works with any wheel source (mouse, trackpad, Magic Mouse...): any vertical wheel motion over
//= the container scrolls it horizontally instead
export function PGS_scrollHorizontal(element, speed) {
    return createHorizontalWheelHandler(element, speed);
}

//= mouse only: a trackpad or Magic Mouse already scrolls horizontally on its own two-finger swipe,
//= so their vertical wheel motion is left alone instead of being forced sideways
export function PGS_scrollHorizontalWithMouse(element, speed) {
    const isTrackpad = createTrackpadDetector();
    return createHorizontalWheelHandler(element, speed, isTrackpad);
}
