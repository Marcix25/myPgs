export function PGS_onDocumentReady(callback) {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => callback(), { once: true });
        return;
    }

    callback();
}
