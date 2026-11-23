// runs the callback at most once per frame, however many times the returned function is called.
// The arguments of the last call in the frame are the ones it receives. `.cancel()` drops a call
// that has not run yet, for the destroy() of a module
export function PGS_rafThrottle(callback) {
    let frame = 0;
    let lastArgs = [];

    function throttled(...args) {
        lastArgs = args;
        if (frame) return;

        frame = requestAnimationFrame(() => {
            frame = 0;
            callback(...lastArgs);
        });
    }

    throttled.cancel = () => {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
    };

    return throttled;
}

// watches the whole document for nodes that arrive later and calls back once per frame, for the
// modules that have to find their own markup after the page is ready (header, navSmart). Returns
// the observer so a caller can disconnect it, or null when there is no document to watch
export function PGS_watchDocument(callback, options = { childList: true, subtree: true }) {
    if (typeof document === "undefined" || typeof MutationObserver === "undefined") return null;

    const throttled = PGS_rafThrottle(() => callback());
    const observer = new MutationObserver(throttled);
    observer.observe(document.documentElement, options);

    // a change seen just before disconnect() would still call back on the next frame: disconnecting
    // drops that pending call too
    const disconnect = observer.disconnect.bind(observer);
    observer.disconnect = () => {
        throttled.cancel();
        disconnect();
    };

    return observer;
}
