import { PGS_onDocumentReady } from "../helper/_onDocumentReady.js";

//# MODAL
const EVENT_OPEN = "pgs:modal:open";
const EVENT_CLOSE = "pgs:modal:close";
const API = new WeakMap();
const ANIMATIONS = ["dialogAnimationZoom", "dialogAnimationLeft", "dialogAnimationRight", "dialogAnimationTop", "dialogAnimationBottom"];

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
        "dialogHistory", "dialogTopLevel", "dialogDisableBackdropClose", "dialogDragClose", "dialogSmall", "dialogMedium",
        ...ANIMATIONS, "dialogFull", "dialogCenter", "dialogLeft", "dialogRight", "dialogTop", "dialogBottom"
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
    const dialogAnimationZoom = pgs(DIALOG).option.contains("dialogAnimationZoom");
    const dialogAnimation = ANIMATIONS.some(key => pgs(DIALOG).option.contains(key));
    const dialogDragClose = pgs(DIALOG).option.contains("dialogDragClose");
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

    //+ FN ANIMATION
    // dialogAnimation*: the panel comes in on open and goes back on close — dialogAnimationZoom
    // grows it out of the button that opened it, the way PhotoSwipe zooms a thumbnail, and
    // dialogAnimationLeft/Right/Top/Bottom slide it in from that edge of the screen. The
    // animationIn/animationOut state starts the animation — keyframes, timing, backdrop fade
    // and reduced motion all live in _modal.scss. The JavaScript only measures, for the zoom:
    // the panel is already laid out in its final place, so the offset and the scale that lay it
    // over the button go to the stylesheet as --_modal-zoom-*.
    // Returns a promise that settles when every animation the stylesheet started has finished,
    // or null when there is nothing to wait for: no panel, a zoom with no visible button to grow
    // from, or no animation at all (prefers-reduced-motion, or a theme that turns it off).
    function stopAnimation() {
        pgs(DIALOG).state.remove("animationIn");
        pgs(DIALOG).state.remove("animationOut");
    }

    function animate(state) {
        stopAnimation();
        if (!dialogAnimation || !CONTENT) return null;

        if (dialogAnimationZoom) {
            if (!BUTTON_OPEN) return null;
            //== measuring right after stopAnimation() also flushes the removed state, so an
            //== animationOut that follows an animationIn restarts the same keyframes instead of
            //== carrying on the running ones
            const from = BUTTON_OPEN.getBoundingClientRect();
            const to = CONTENT.getBoundingClientRect();
            if (!from.width || !from.height || !to.width || !to.height) return null;

            CONTENT.style.setProperty("--_modal-zoom-x", `${from.left - to.left}px`);
            CONTENT.style.setProperty("--_modal-zoom-y", `${from.top - to.top}px`);
            CONTENT.style.setProperty("--_modal-zoom-scaleX", from.width / to.width);
            CONTENT.style.setProperty("--_modal-zoom-scaleY", from.height / to.height);
        } else {
            //== the same restart, with no measurement to flush it
            void CONTENT.offsetWidth;
        }
        pgs(DIALOG).state.add(state);

        const animations = DIALOG.getAnimations({ subtree: true }).filter(animation => animation.animationName?.startsWith("modalAnimation"));
        if (!animations.length) {
            stopAnimation();
            return null;
        }
        return Promise.all(animations.map(animation => animation.finished));
    }

    //+ FN DRAG CLOSE
    //+ dialogDragClose: on a touch screen, dragging the panel down follows the finger and fades
    //+ the backdrop, the way PhotoSwipe lets a photo be pulled away. Let go far or fast enough and
    //+ the panel carries on down and the dialog closes; otherwise it springs back. The JavaScript
    //+ only tracks the finger — the distance goes to --_modal-drag-y and the fade to
    //+ --_modal-drag-progress on the dialog — and the dragging/dragClose states hand following,
    //+ springing back and leaving to _modal.scss.
    const dragClose = {
        START: 10, //== px of vertical travel before a touch counts as a drag
        CLOSE: 0.15, //== share of the viewport height that closes on release
        VELOCITY: 0.5, //== px/ms that closes on release, whatever the distance
        touch: null,

        stop() {
            this.touch = null;
            pgs(DIALOG).state.remove("dragging");
            pgs(DIALOG).state.remove("dragClose");
            DIALOG.style.removeProperty("--_modal-drag-y");
            DIALOG.style.removeProperty("--_modal-drag-progress");
        },

        //== a drag only starts where nothing would scroll instead: not in a form field, and every
        //== box between the finger and the dialog (the dialog included) already at its top
        canStart(target) {
            if (target.closest("input, textarea, select, [contenteditable]")) return false;
            for (let element = target; element; element = element.parentElement) {
                if (element.scrollTop > 0) return false;
                if (element === DIALOG) break;
            }
            return true;
        },

        start(e) {
            this.touch = null;
            if (closing || e.touches.length !== 1 || !this.canStart(e.target)) return;
            const touch = e.touches[0];
            this.touch = { x: touch.clientX, y: touch.clientY, distance: 0, active: false, samples: [] };
        },

        move(e) {
            const drag = this.touch;
            if (!drag) return;
            //== a second finger means a pinch, which is the browser's
            if (e.touches.length !== 1) return this.end(e, false);
            const touch = e.touches[0];

            if (!drag.active) {
                const dx = touch.clientX - drag.x;
                const dy = touch.clientY - drag.y;
                if (Math.abs(dx) < this.START && Math.abs(dy) < this.START) return;
                //== sideways or upwards stays the page's: a horizontal scroller, the panel's own scroll
                if (dy <= 0 || Math.abs(dx) > dy) {
                    this.touch = null;
                    return;
                }
                //== counted from here, so the panel does not jump by the threshold
                drag.active = true;
                drag.y = touch.clientY;
                stopAnimation();
                pgs(DIALOG).state.add("dragging");
            }

            e.preventDefault();
            drag.distance = Math.max(0, touch.clientY - drag.y);
            drag.samples = [...drag.samples.filter(([time]) => e.timeStamp - time < 100), [e.timeStamp, drag.distance]];
            DIALOG.style.setProperty("--_modal-drag-y", `${drag.distance}px`);
            DIALOG.style.setProperty("--_modal-drag-progress", Math.min(drag.distance / (window.innerHeight / 2), 1));
        },

        end(e, release = true) {
            const drag = this.touch;
            if (!drag?.active) {
                this.touch = null;
                return;
            }
            //== speed over the last 100ms of movement; a finger that stopped before lifting has none
            const [firstTime, firstDistance] = drag.samples[0] || [e.timeStamp, drag.distance];
            const [lastTime, lastDistance] = drag.samples.at(-1) || [e.timeStamp, drag.distance];
            const velocity = e.timeStamp - lastTime > 100 ? 0 : (lastDistance - firstDistance) / Math.max(lastTime - firstTime, 1);
            const shouldClose = release && (drag.distance > window.innerHeight * this.CLOSE || (velocity > this.VELOCITY && drag.distance > this.START));
            //== back where it was: removing the state lets the stylesheet's transition take it there
            if (!shouldClose) return this.stop();

            this.touch = null;
            closing = true;
            statusModal(false);
            pgs(DIALOG).state.remove("dragging");
            pgs(DIALOG).state.add("dragClose");
            //== the panel leaves from where the finger let it go, through the transitions this state
            //== starts; none (reduced motion, or a theme that turns them off) closes at once
            const transitions = DIALOG.getAnimations({ subtree: true }).filter(animation => animation instanceof CSSTransition && [DIALOG, CONTENT].includes(animation.effect?.target));
            if (!transitions.length) return finishClose();
            Promise.all(transitions.map(animation => animation.finished)).then(finishClose, () => { });
        },
    };

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
        //== preventScroll: the dialog is focused before the opening animation moves the panel off
        //== screen, and Safari would scroll the dialog to follow it there
        if (!DIALOG.querySelector("[autofocus]")) focusTarget.focus({ preventScroll: true });
        animate("animationIn")?.then(stopAnimation, () => { });
        //== dispatched on both, and neither bubbles: a listener sits on whichever of the two it
        //== already holds, and never receives the same opening twice
        MODAL.dispatchEvent(new CustomEvent(EVENT_OPEN));
        DIALOG.dispatchEvent(new CustomEvent(EVENT_OPEN));
    }

    //+ FN CLOSE
    function closeModal(e) {
        e?.stopImmediatePropagation()
        //== a second request while the closing animation is still running changes nothing
        if (closing) return;
        statusModal(false);
        const animationOut = DIALOG.open ? animate("animationOut") : null;
        if (!animationOut) return finishClose();
        closing = true;
        //== a rejected promise means the animation was cancelled — by a native close removing
        //== the state — and whoever cancelled it already owns the dialog's state
        animationOut.then(finishClose, () => { });
    }

    function finishClose() {
        closing = false;
        DIALOG.close();
        stopAnimation();
        dragClose.stop();
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
    //== preventDefault suppresses the native click a real <button>/<a> already fires for Enter/Space
    //== on its own — without it, that native click ran right after this one and, finding the dialog
    //== already open, toggled it straight back closed
    BUTTON_OPEN?.addEventListener("keydown", (e) => {
        if (DIALOG.open || (e.key !== "Enter" && e.key !== " ")) return;
        e.preventDefault();
        openModal(e);
    }, { signal });

    //= CLOSE
    DIALOG.addEventListener("close", () => {
        statusModal(false);
        closing = false;
        stopAnimation();
        dragClose.stop();
    }, { signal });
    //== Escape on a showModal() dialog closes it natively, with no time left for the closing
    //== animation: take the cancel over and close through closeModal instead
    if (dialogAnimation) DIALOG.addEventListener("cancel", e => {
        e.preventDefault();
        closeModal(e);
    }, { signal });
    DIALOG.addEventListener("click", e => { if (e.target == DIALOG && !dialogDisableBackdropClose) closeModal(e) }, { signal });
    BUTTON_CLOSE?.addEventListener("click", e => closeModal(e), { signal });

    //= DRAG CLOSE
    //== touchmove is not passive: once a drag has started it has to stop the page from scrolling
    if (dialogDragClose && CONTENT) {
        DIALOG.addEventListener("touchstart", e => dragClose.start(e), { signal, passive: true });
        DIALOG.addEventListener("touchmove", e => dragClose.move(e), { signal, passive: false });
        DIALOG.addEventListener("touchend", e => dragClose.end(e), { signal });
        DIALOG.addEventListener("touchcancel", e => dragClose.end(e, false), { signal });
    }

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
        stopAnimation();
        dragClose.stop();
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
