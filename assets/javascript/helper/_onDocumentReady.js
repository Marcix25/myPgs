// runs the callback once the DOM is parsed. Without a document (server-side rendering, a test
// runner) there is nothing to wait for or to run against, so it does nothing
export function PGS_onDocumentReady(callback) {
    if (typeof document === "undefined") return;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => callback(), { once: true });
        return;
    }

    callback();
}
