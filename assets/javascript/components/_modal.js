import { PGS_onDocumentReady } from "../helper/_onDocumentReady.js";

//# MODAL
const EVENT_OPEN = "pgs:modal:open";
const EVENT_CLOSE = "pgs:modal:close";
const API = new WeakMap();

function getModals(root) {
    const modals = root instanceof Element && pgs(root).contains("modal") ? [root] : [];
    modals.push(...pgs(root).querySelectorAll("modal"));
    return modals;
}

function initializeModal(MODAL, existingDialog = null) {
    if (API.has(MODAL)) return;

    const BUTTON_OPEN = pgs(MODAL).querySelector("modal-button");
    const DIALOG = existingDialog || MODAL.querySelector("dialog");
    if (!DIALOG) return;
    const eventController = new AbortController();
    const { signal } = eventController;
    let historyObserver = null;
    let historyTimeout = null;

    //== SELECTOR
    //== a hand-written close button keeps the bare name; a generated one gets the underscore
    const DOMButtonClose = "<button pgs=\"button['btnIconOnly' 'btnMini'] _modal-close\" type=\"button\" tabindex=\"0\" aria-label=\"Close\"><i pgs=\"icon['icon-close']\"></i></button>";
    const modalContentHeader = pgs(DIALOG).querySelector("modal-dialog-content-header");

    //== FOCUS
    //== with no autofocus element inside, showModal() falls back to focusing the first
    //== focusable descendant (per the HTML dialog spec), which makes whatever happens to sit
    //== first — often a plain nav link — look pre-selected. Move focus to the header instead
    //== (its text is what a screen reader should announce on open), or the dialog itself when
    //== there's no header; tabindex="-1" keeps it out of the normal tab order.
    const focusTarget = modalContentHeader || DIALOG;
    if (!focusTarget.hasAttribute("tabindex")) focusTarget.setAttribute("tabindex", "-1");


    //== MERGE OPTIONS
    //== Modal configuration may be authored on either wrapper or dialog. Copy only modal
    //== options: other component brackets (for example flex on the wrapper) stay local.
    //== modal-dialog itself always stays bare, like every other generated child token — its own
    //== options land on _dialog instead, a second, pgs-generated-only token on the same <dialog>
    //== element that exists purely to carry them (see AGENTS-DEVELOPMENT.md).
    pgs(DIALOG).add("modal-dialog", "_dialog");
    for (const key of [
        "dialogHistory", "dialogTopLevel", "dialogZoom", "dialogDisableBackdropClose", "dialogMini",
        "dialogMedium", "dialogFull", "dialogCenter", "dialogLeft", "dialogRight", "dialogTop", "dialogBottom"
    ]) {
        const source = [MODAL, DIALOG].find(element => pgs(element).option.contains(key));
        if (!source) continue;
        pgs(MODAL).add(`modal['${key}']`);
        pgs(DIALOG).option.remove(key);
        pgs(DIALOG).add(`_dialog['${key}']`);
    }

    //== these two carry a value, so they still live in pgs-data — option never checks pgs-data,
    //== so presence is a getValueBrackets read instead of an option.contains() call
    for (const key of ["modalContainerID", "modalContainerPGS"]) {
        const source = [MODAL, DIALOG].find(element => pgs(element).data.getValueBrackets(key) !== undefined);
        if (!source) continue;
        const value = pgs(source).data.getValueBrackets(key);
        for (const target of [MODAL, DIALOG]) pgs(target).data.setValueBrackets(key, value);
    }

    //== OPTION ATTRIBUTES MODAL
    const dialogDisableBackdropClose = pgs(MODAL).option.contains("dialogDisableBackdropClose");
    const data_history = pgs(MODAL).option.contains("dialogHistory");
    const data_container = pgs(MODAL).data.getValueBrackets("modalContainerID");
    const data_modalContainerPGS = pgs(MODAL).data.getValueBrackets("modalContainerPGS");

    //== OPTION ATTRIBUTES DIALOG
    const dialogTopLevel = pgs(DIALOG).option.contains("dialogTopLevel");
    const dialogZoom = pgs(DIALOG).option.contains("dialogZoom");
    const CONTENT = pgs(DIALOG).querySelector("modal-dialog-content");
    let closing = false;


    //== BUTTON CLOSE
    if (!pgs(DIALOG).querySelector(["modal-close", "_modal-close"]) && !pgs(MODAL).querySelector(["modal-close", "_modal-close"])) {
        if (modalContentHeader) modalContentHeader.insertAdjacentHTML("beforeend", DOMButtonClose);
        else DIALOG.insertAdjacentHTML("beforeend", DOMButtonClose);
    }
    const BUTTON_CLOSE = pgs(DIALOG).querySelector(["modal-close", "_modal-close"]) || pgs(MODAL).querySelector(["modal-close", "_modal-close"]);


    //== SET
    pgs(DIALOG).add("modal-dialog");

    //== BUTTON OPEN
    //== the label is a fallback, not a correction: a control the author has already named keeps
    //== that name, which is the one the page is written around
    BUTTON_OPEN?.setAttribute("role", "button");
    if (BUTTON_OPEN && !BUTTON_OPEN.hasAttribute("aria-label")) BUTTON_OPEN.setAttribute("aria-label", "Open modal");


    //== POSITION
    if (dialogTopLevel && !MODAL.contains(DIALOG)) MODAL.append(DIALOG);
    else if (!dialogTopLevel) {
        if (data_container) document.querySelector("#" + data_container)?.append(DIALOG);
        else if (data_modalContainerPGS) pgs(document).querySelector(data_modalContainerPGS)?.append(DIALOG);
        else document.body.append(DIALOG);
    }


    //+ FN STATUS
    function statusModal(status = true) {
        BUTTON_OPEN?.setAttribute("aria-expanded", status);
        DIALOG?.setAttribute("aria-expanded", status);
    }

    //+ FN ZOOM
    //+ dialogZoom: the panel grows out of the button that opened it and shrinks back into it on
    //+ close, the way PhotoSwipe zooms a thumbnail. The JavaScript only measures: the panel is
    //+ already laid out in its final place, so the offset and the scale that lay it over the
    //+ button go to the stylesheet as --_modal-zoom-*, and the zoomIn/zoomOut state starts the
    //+ animation — keyframes, timing, backdrop fade and reduced motion all live in _modal.scss.
    //+ Returns a promise that settles when every animation the stylesheet started has finished,
    //+ or null when there is nothing to wait for: no button, a hidden one, no panel, or no
    //+ animation at all (prefers-reduced-motion, or a theme that turns it off).
    function stopZoom() {
        pgs(DIALOG).state.remove("zoomIn");
        pgs(DIALOG).state.remove("zoomOut");
    }

    function zoom(state) {
        stopZoom();
        if (!dialogZoom || !BUTTON_OPEN || !CONTENT) return null;

        //== measuring right after stopZoom() also flushes the removed state, so a zoomOut that
        //== follows a zoomIn restarts the same keyframes instead of carrying on the running ones
        const from = BUTTON_OPEN.getBoundingClientRect();
        const to = CONTENT.getBoundingClientRect();
        if (!from.width || !from.height || !to.width || !to.height) return null;

        CONTENT.style.setProperty("--_modal-zoom-x", `${from.left - to.left}px`);
        CONTENT.style.setProperty("--_modal-zoom-y", `${from.top - to.top}px`);
        CONTENT.style.setProperty("--_modal-zoom-scaleX", from.width / to.width);
        CONTENT.style.setProperty("--_modal-zoom-scaleY", from.height / to.height);
        pgs(DIALOG).state.add(state);

        const animations = DIALOG.getAnimations({ subtree: true }).filter(animation => animation.animationName?.startsWith("modalZoom"));
        if (!animations.length) {
            stopZoom();
            return null;
        }
        return Promise.all(animations.map(animation => animation.finished));
    }

    //+ FN OPEN
    function openModal(e) {
        e?.stopImmediatePropagation();
        if (DIALOG.open) {
            closeModal(e);
            return;
        }
        closing = false;

        if (!DIALOG.open) document.querySelectorAll("dialog[open]").forEach((dlg) => dlg.close());
        statusModal(true);
        dialogTopLevel ? DIALOG.showModal() : DIALOG.show();
        //== respect an explicit autofocus target inside the dialog when the author set one
        if (!DIALOG.querySelector("[autofocus]")) focusTarget.focus();
        zoom("zoomIn")?.then(stopZoom, () => { });
        //== dispatched on both, and neither bubbles: a listener sits on whichever of the two it
        //== already holds, and never receives the same opening twice
        MODAL.dispatchEvent(new CustomEvent(EVENT_OPEN));
        DIALOG.dispatchEvent(new CustomEvent(EVENT_OPEN));
    }

    //+ FN CLOSE
    function closeModal(e) {
        e?.stopImmediatePropagation()
        //== a second request while the zoom-out is still running changes nothing
        if (closing) return;
        statusModal(false);
        const zoomOut = DIALOG.open ? zoom("zoomOut") : null;
        if (!zoomOut) return finishClose();
        closing = true;
        //== a rejected promise means the animation was cancelled — by a native close removing
        //== the state — and whoever cancelled it already owns the dialog's state
        zoomOut.then(finishClose, () => { });
    }

    function finishClose() {
        closing = false;
        DIALOG.close();
        stopZoom();
        MODAL.dispatchEvent(new CustomEvent(EVENT_CLOSE));
        DIALOG.dispatchEvent(new CustomEvent(EVENT_CLOSE));
    }

    function forceOpen(e) {
        if (!DIALOG.open) openModal(e);
    }

    function forceClose(e) {
        if (DIALOG.open) closeModal(e);
    }

    //+ fn OPEN ON HISTORY
    function openModalOnHistory() {
        const params = new URLSearchParams(window.location.search);
        if (params.get('modal') !== BUTTON_OPEN?.id) return;
        document.getElementById(BUTTON_OPEN.id)?.scrollIntoView({ behavior: 'smooth' });
        openModal();
    }


    //= OPEN
    BUTTON_OPEN?.addEventListener("click", (e) => openModal(e), { signal });
    BUTTON_OPEN?.addEventListener("keypress", (e) => !DIALOG.open && (e.key === "Enter" || e.key === " ") && openModal(e), { signal });

    //= CLOSE
    DIALOG.addEventListener("close", () => {
        statusModal(false);
        closing = false;
        stopZoom();
    }, { signal });
    //== Escape on a showModal() dialog closes it natively, with no time left for the zoom-out:
    //== take the cancel over and close through closeModal instead
    if (dialogZoom) DIALOG.addEventListener("cancel", e => {
        e.preventDefault();
        closeModal(e);
    }, { signal });
    DIALOG.addEventListener("click", e => { if (e.target == DIALOG && !dialogDisableBackdropClose) closeModal(e) }, { signal });
    BUTTON_CLOSE?.addEventListener("click", e => closeModal(e), { signal });

    //= UPDATE HISTORY
    if (data_history && BUTTON_OPEN?.id) {
        historyTimeout = window.setTimeout(openModalOnHistory, 1);

        //== keeps the URL in step with the dialog's own "open" attribute
        historyObserver = new MutationObserver(() => {
            let isOpen = DIALOG.hasAttribute("open");
            try {
                const url = new URL(window.location.href);
                const params = new URLSearchParams(url.search);
                isOpen ? params.set('modal', BUTTON_OPEN.id) : params.delete('modal');
                url.search = params.toString() ? `?${params.toString()}` : "";
                window.history.pushState({ modal: BUTTON_OPEN.id, open: isOpen }, "", url);
            } catch (_) { }
        });
        historyObserver.observe(DIALOG, { attributes: true, attributeFilter: ["open"] });

        //== back and forward in the browser open and close the dialog to match
        window.addEventListener("popstate", () => {
            try {
                const params = new URLSearchParams(window.location.search);
                const shouldOpen = params.get('modal') === BUTTON_OPEN.id;
                if (shouldOpen && !DIALOG.open) DIALOG.showModal();
                if (!shouldOpen && DIALOG.open) closeModal()
            } catch (_) { }
        }, { signal });
    }

    function destroy() {
        eventController.abort();
        stopZoom();
        historyObserver?.disconnect();
        if (historyTimeout !== null) window.clearTimeout(historyTimeout);
        API.delete(MODAL);
    }

    API.set(MODAL, {
        element: MODAL,
        button: BUTTON_OPEN,
        dialog: DIALOG,
        closeButton: BUTTON_CLOSE,
        open: forceOpen,
        close: forceClose,
        toggle: openModal,
        refresh: () => {
            const nextDialog = MODAL.querySelector("dialog") || DIALOG;
            destroy();
            initializeModal(MODAL, nextDialog);
            return API.get(MODAL);
        },
        isOpen: () => DIALOG.open,
    });
}

function PGS_modal_init(root = document) {
    getModals(root).forEach(MODAL => initializeModal(MODAL));
}

//# INIT PGS_modal
PGS_onDocumentReady(PGS_modal_init);

//# API
function PGS_modal_api(element) {
    return API.get(element);
}

export const PGS_modal = {
    init: PGS_modal_init,
    api: PGS_modal_api
};
