import { pgs } from "../_pgs.js";

//= MODAL
const EVENT_OPEN = "pgs:modal:open";
const EVENT_CLOSE = "pgs:modal:close";
const API = new WeakMap();
// the dialog of every wrapper, because the dialog leaves its wrapper on init: a destroy() and a new init
// of the same wrapper, or a refresh(), still find it
const DIALOGS = new WeakMap();
// the wrapper each dialog belongs to, to tell which modals are written inside another one's dialog
const OWNERS = new WeakMap();
// the dialogs that are open, the last one opened on top: Escape closes that one only
const STACK = [];
const ANIMATIONS = ["dialogAnimationZoom", "dialogAnimationLeft", "dialogAnimationRight", "dialogAnimationTop", "dialogAnimationBottom"];

function initializeModal(MODAL) {
    if (API.has(MODAL)) return API.get(MODAL);

    const BUTTON_OPEN = pgs(MODAL).querySelector("modal-button");
    const DIALOG = MODAL.querySelector("dialog") || DIALOGS.get(MODAL);
    if (!DIALOG) {
        pgs.helper.warn("modal.init", "a modal needs a <dialog> inside its wrapper", MODAL);
        return;
    }
    DIALOGS.set(MODAL, DIALOG);
    OWNERS.set(DIALOG, MODAL);
    const eventController = new AbortController();
    const { signal } = eventController;
    let historyObserver = null;
    let historyTimeout = null;

    //## SELECTOR
    // a hand-written close button keeps the bare name; a generated one gets the underscore
    const DOMButtonClose = "<button pgs=\"button['btnIconOnly' 'btnMini'] background['bgBackground'] _modal-close\" type=\"button\" aria-label=\"Close\"><i pgs=\"icon['icon-close']\"></i></button>";
    const modalContentHeader = pgs(DIALOG).querySelector("modal-dialog-content-header");

    //## FOCUS
    // with no autofocus element inside, showModal() falls back to focusing the first
    // focusable descendant (per the HTML dialog spec), which makes whatever happens to sit
    // first — often a plain nav link — look pre-selected. Move focus to the header instead
    // (its text is what a screen reader should announce on open), or the dialog itself when
    // there's no header; tabindex="-1" keeps it out of the normal tab order.
    // a tabindex the author wrote stays as it is (and keeps its focus ring); the one added here is taken
    // back by teardown
    const focusTarget = modalContentHeader || DIALOG;
    const addedTabindex = !focusTarget.hasAttribute("tabindex");
    if (addedTabindex) focusTarget.setAttribute("tabindex", "-1");


    //## MERGE OPTIONS
    // Modal configuration may be authored on either wrapper or dialog. Copy only modal
    // options: other component brackets (for example flex on the wrapper) stay local.
    // modal-dialog itself always stays bare, like every other generated child token — its own
    // options land on _dialog instead, a second, pgs-generated-only token on the same <dialog>
    // element that exists purely to carry them (see AGENTS-DEVELOPMENT.md).
    pgs(DIALOG).add("modal-dialog", "_dialog");
    // modalSheet is a bottom sheet: at the bottom, entering from the bottom and pulled down to close, the width
    // of dialogSmall (centered; the whole screen where the screen is narrower), modal (showModal(): a backdrop,
    // the top layer, no clipping by a scroller around the button). It writes those options itself, so each one
    // is merged below like an authored one. What the author already chose is kept: a size (dialogSmall,
    // dialogMedium or dialogFull) instead of dialogSmall, an animation instead of dialogAnimationBottom, and a
    // container (modalContainerID, modalContainerPGS) instead of dialogTopLevel, since a dialog in the top
    // layer stays where it is
    if ([MODAL, DIALOG].some(element => pgs(element).option.contains("modalSheet"))) {
        const authored = keys => [MODAL, DIALOG].some(element => keys.some(key => pgs(element).option.contains(key)));
        const container = [MODAL, DIALOG].some(element => ["modalContainerID", "modalContainerPGS"].some(key => pgs(element).data.getValueBrackets(key) !== undefined));
        const sheet = ["dialogBottom", "dialogDragClose"];
        if (!authored(["dialogSmall", "dialogMedium", "dialogFull"])) sheet.push("dialogSmall");
        if (!authored(ANIMATIONS)) sheet.push("dialogAnimationBottom");
        if (!container) sheet.push("dialogTopLevel");
        for (const key of sheet) pgs(MODAL).add(`modal['${key}']`);
    }
    for (const key of [
        "modalSheet", "dialogHistory", "dialogTopLevel", "dialogDisableBackdropClose", "dialogDragClose", "dialogSmall", "dialogMedium",
        ...ANIMATIONS, "dialogFull", "dialogCenter", "dialogLeft", "dialogRight", "dialogTop", "dialogBottom"
    ]) {
        const source = [MODAL, DIALOG].find(element => pgs(element).option.contains(key));
        if (!source) continue;
        pgs(MODAL).add(`modal['${key}']`);
        pgs(DIALOG).option.remove(key);
        pgs(DIALOG).add(`_dialog['${key}']`);
    }

    // these two carry a value, so they still live in pgs-data — option never checks pgs-data,
    // so presence is a getValueBrackets read instead of an option.contains() call
    for (const key of ["modalContainerID", "modalContainerPGS"]) {
        const source = [MODAL, DIALOG].find(element => pgs(element).data.getValueBrackets(key) !== undefined);
        if (!source) continue;
        const value = pgs(source).data.getValueBrackets(key);
        for (const target of [MODAL, DIALOG]) pgs(target).data.setValueBrackets(key, value);
    }

    //## OPTION ATTRIBUTES MODAL
    const dialogDisableBackdropClose = pgs(MODAL).option.contains("dialogDisableBackdropClose");
    const dialogHistory = pgs(MODAL).option.contains("dialogHistory");
    const modalContainerID = pgs(MODAL).data.getValueBrackets("modalContainerID");
    const modalContainerPGS = pgs(MODAL).data.getValueBrackets("modalContainerPGS");

    //## OPTION ATTRIBUTES DIALOG
    const dialogTopLevel = pgs(DIALOG).option.contains("dialogTopLevel");
    const dialogAnimationZoom = pgs(DIALOG).option.contains("dialogAnimationZoom");
    const dialogAnimation = ANIMATIONS.some(key => pgs(DIALOG).option.contains(key));
    const dialogDragClose = pgs(DIALOG).option.contains("dialogDragClose");
    const CONTENT = pgs(DIALOG).querySelector("modal-dialog-content");
    let closing = false;


    //## BUTTON CLOSE
    // a close button of this modal, not of a modal written inside its dialog
    const isOwnClose = button => {
        const wrapper = button.closest("[pgs~='modal'], [pgs*='modal[']");
        return !wrapper || wrapper === MODAL || !DIALOG.contains(wrapper);
    };
    const closesOf = root => [...pgs(root).querySelectorAll(["modal-close", "_modal-close"])].filter(isOwnClose);
    // a close in the footer (a Cancel next to the confirm) is an action of the panel: the cross is still
    // generated, unless the author wrote a close of their own anywhere else
    const inFooter = button => button.closest("[pgs~='modal-dialog-content-footer']") !== null;
    if (![...closesOf(DIALOG), ...closesOf(MODAL)].some(button => !inFooter(button))) {
        if (modalContentHeader) modalContentHeader.insertAdjacentHTML("beforeend", DOMButtonClose);
        else DIALOG.insertAdjacentHTML("beforeend", DOMButtonClose);
    }
    // the one the API names: the cross, or the first close written outside the footer
    const BUTTON_CLOSE = closesOf(DIALOG).find(button => !inFooter(button)) || closesOf(MODAL)[0] || closesOf(DIALOG)[0];


    //## BUTTON OPEN
    // the label is a fallback, not a correction: a control the author has already named keeps
    // that name, which is the one the page is written around
    // and a label is only needed by a control with no name at all: visible text, a title, an
    // aria-labelledby or an image with an alt already name it, and an aria-label written over
    // visible text would make the spoken name differ from the one on screen (WCAG 2.5.3)
    if (BUTTON_OPEN) {
        // a native button already is one; anything else (a link, a div) is told what it does
        if (!BUTTON_OPEN.matches("button, input[type='button'], input[type='submit'], [role]")) BUTTON_OPEN.setAttribute("role", "button");

        const hasName = BUTTON_OPEN.hasAttribute("aria-label")
            || BUTTON_OPEN.hasAttribute("aria-labelledby")
            || BUTTON_OPEN.hasAttribute("title")
            || (BUTTON_OPEN.textContent || "").trim() !== ""
            || BUTTON_OPEN.querySelector("img[alt]:not([alt=''])") !== null;
        if (!hasName) BUTTON_OPEN.setAttribute("aria-label", "Open modal");
    }


    //## POSITION
    if (dialogTopLevel && !MODAL.contains(DIALOG)) MODAL.append(DIALOG);
    else if (!dialogTopLevel) {
        if (modalContainerID) {
            const container = document.getElementById(modalContainerID);
            if (container) container.append(DIALOG);
            else pgs.helper.warn("modal.init", `no element has the id "${modalContainerID}" named by modalContainerID, so the dialog stays where it is`, MODAL);
        } else if (modalContainerPGS) {
            const container = pgs(document).querySelector(modalContainerPGS);
            if (container) container.append(DIALOG);
            else pgs.helper.warn("modal.init", `no element carries the pgs token "${modalContainerPGS}" named by modalContainerPGS, so the dialog stays where it is`, MODAL);
        } else document.body.append(DIALOG);
    }


    //## FN STATUS
    function statusModal(status = true) {
        // aria-expanded belongs to the control that opens the panel; it is not a <dialog> attribute
        BUTTON_OPEN?.setAttribute("aria-expanded", status);
    }

    //## FN EVENT
    // pgs:modal:open and pgs:modal:close reach every listener once, wherever it sits. The event goes
    // out on the dialog and bubbles up from there: with dialogTopLevel the dialog is still inside its
    // wrapper, so that already passes through the wrapper. A dialog moved elsewhere is not under the
    // wrapper, so the wrapper gets an event of its own, and that one would reach the ancestors the two
    // share a second time: it is stopped at the wrapper's ancestor just below the first one that
    // holds the dialog, so the shared ancestors and everything above only hear the dialog's
    function dispatchModal(name) {
        const detail = { modal: MODAL, dialog: DIALOG };
        pgs.helper.dispatch(DIALOG, name, detail);
        if (MODAL.contains(DIALOG)) return;

        let last = MODAL;
        while (last.parentNode && !last.parentNode.contains(DIALOG)) last = last.parentNode;
        const stop = event => event.stopPropagation();
        last.addEventListener(name, stop);
        pgs.helper.dispatch(MODAL, name, detail);
        last.removeEventListener(name, stop);
    }

    //## FN ANIMATION
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
            // measuring right after stopAnimation() also flushes the removed state, so an
            // animationOut that follows an animationIn restarts the same keyframes instead of
            // carrying on the running ones
            const from = BUTTON_OPEN.getBoundingClientRect();
            const to = CONTENT.getBoundingClientRect();
            if (!from.width || !from.height || !to.width || !to.height) return null;

            CONTENT.style.setProperty("--_modal-zoom-x", `${from.left - to.left}px`);
            CONTENT.style.setProperty("--_modal-zoom-y", `${from.top - to.top}px`);
            CONTENT.style.setProperty("--_modal-zoom-scaleX", from.width / to.width);
            CONTENT.style.setProperty("--_modal-zoom-scaleY", from.height / to.height);
        } else {
            // the same restart, with no measurement to flush it
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

    //## FN DRAG CLOSE
    // dialogDragClose: on a touch screen, dragging the panel down follows the finger and fades
    // the backdrop, the way PhotoSwipe lets a photo be pulled away. Let go far or fast enough and
    // the panel carries on down and the dialog closes; otherwise it springs back. The JavaScript
    // only tracks the finger — the distance goes to --_modal-drag-y and the fade to
    // --_modal-drag-progress on the dialog — and the dragging/dragClose states hand following,
    // springing back and leaving to _modal.scss.
    const dragClose = {
        START: 10, // px of vertical travel before a touch counts as a drag
        CLOSE: 0.15, // share of the viewport height that closes on release
        VELOCITY: 0.5, // px/ms that closes on release, whatever the distance
        touch: null,

        stop() {
            this.touch = null;
            pgs(DIALOG).state.remove("dragging");
            pgs(DIALOG).state.remove("dragClose");
            DIALOG.style.removeProperty("--_modal-drag-y");
            DIALOG.style.removeProperty("--_modal-drag-progress");
        },

        // a drag only starts where nothing would scroll instead: not in a form field, and every
        // box between the finger and the dialog (the dialog included) already at its top
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
            // a touch inside a modal written within this one is that modal's
            if (closing || e.touches.length !== 1 || e.target.closest("dialog") !== DIALOG || !this.canStart(e.target)) return;
            const touch = e.touches[0];
            this.touch = { x: touch.clientX, y: touch.clientY, distance: 0, active: false, samples: [] };
        },

        move(e) {
            const drag = this.touch;
            if (!drag) return;
            // a second finger means a pinch, which is the browser's
            if (e.touches.length !== 1) return this.end(e, false);
            const touch = e.touches[0];

            if (!drag.active) {
                const dx = touch.clientX - drag.x;
                const dy = touch.clientY - drag.y;
                if (Math.abs(dx) < this.START && Math.abs(dy) < this.START) return;
                // sideways or upwards stays the page's: a horizontal scroller, the panel's own scroll
                if (dy <= 0 || Math.abs(dx) > dy) {
                    this.touch = null;
                    return;
                }
                // counted from here, so the panel does not jump by the threshold
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
            // speed over the last 100ms of movement; a finger that stopped before lifting has none
            const [firstTime, firstDistance] = drag.samples[0] || [e.timeStamp, drag.distance];
            const [lastTime, lastDistance] = drag.samples.at(-1) || [e.timeStamp, drag.distance];
            const velocity = e.timeStamp - lastTime > 100 ? 0 : (lastDistance - firstDistance) / Math.max(lastTime - firstTime, 1);
            const shouldClose = release && (drag.distance > window.innerHeight * this.CLOSE || (velocity > this.VELOCITY && drag.distance > this.START));
            // back where it was: removing the state lets the stylesheet's transition take it there
            if (!shouldClose) return this.stop();

            this.touch = null;
            closing = true;
            statusModal(false);
            pgs(DIALOG).state.remove("dragging");
            pgs(DIALOG).state.add("dragClose");
            // the panel leaves from where the finger let it go, through the transitions this state
            // starts; none (reduced motion, or a theme that turns them off) closes at once
            const transitions = DIALOG.getAnimations({ subtree: true }).filter(animation => animation instanceof CSSTransition && [DIALOG, CONTENT].includes(animation.effect?.target));
            if (!transitions.length) return finishClose();
            Promise.all(transitions.map(animation => animation.finished)).then(finishClose, abandonClose);
        },
    };

    //## FN OPEN
    function openModal(e) {
        if (DIALOG.open) {
            closeModal(e);
            return;
        }
        closing = false;

        // only the other modals of the library give way: a dialog that is not one of them (a cookie notice, a
        // panel of the page) is not this modal's to close, and neither is the one this modal is written
        // inside of, which stays open under it
        document.querySelectorAll("dialog[pgs~='modal-dialog'][open]").forEach((dlg) => { if (dlg !== DIALOG && !dlg.contains(MODAL)) dlg.close(); });
        // the native close puts the focus back where it was when the dialog opened. A browser that gives a
        // click to the closest focusable ancestor of the button (Safari, and Firefox on macOS: a <li tabindex="-1">
        // in a slide) would put it back on that ancestor, with its focus ring; focused first, the button is what
        // comes back
        const active = document.activeElement;
        if (BUTTON_OPEN && active !== BUTTON_OPEN && active?.contains(BUTTON_OPEN)) BUTTON_OPEN.focus({ preventScroll: true });
        statusModal(true);
        dialogTopLevel ? DIALOG.showModal() : DIALOG.show();
        STACK.splice(0, STACK.length, ...STACK.filter(dialog => dialog !== DIALOG), DIALOG);
        // respect an explicit autofocus target inside the dialog when the author set one
        // preventScroll: the dialog is focused before the opening animation moves the panel off
        // screen, and Safari would scroll the dialog to follow it there
        if (!DIALOG.querySelector("[autofocus]")) focusTarget.focus({ preventScroll: true });
        animate("animationIn")?.then(stopAnimation, () => { });
        dispatchModal(EVENT_OPEN);
    }

    //## FN CLOSE
    function closeModal(e) {
        // a second request while the closing animation is still running changes nothing
        if (closing) return;
        statusModal(false);
        const animationOut = DIALOG.open ? animate("animationOut") : null;
        if (!animationOut) return finishClose();
        closing = true;
        // a rejected promise means the animation was cancelled. A native close that removed the state
        // already owns the dialog's state; anything else (the dialog hidden halfway, say) leaves it open
        // and the request unanswered, so the close the visitor asked for is finished here
        animationOut.then(finishClose, abandonClose);
    }

    function finishClose() {
        closing = false;
        DIALOG.close();
        stopAnimation();
        dragClose.stop();
    }

    // the animation of a close was cancelled by something other than the dialog's own close
    function abandonClose() {
        if (closing && DIALOG.open) finishClose();
    }

    function forceOpen(e) {
        if (!DIALOG.open) openModal(e);
    }

    function forceClose(e) {
        if (DIALOG.open) closeModal(e);
    }

    //## fn OPEN ON HISTORY
    function openModalOnHistory() {
        const params = new URLSearchParams(window.location.search);
        if (params.get('modal') !== BUTTON_OPEN?.id) return;
        BUTTON_OPEN.scrollIntoView({ behavior: 'smooth' });
        openModal();
    }


    //# OPEN
    // a link that opens a modal does not also go where its href points
    BUTTON_OPEN?.addEventListener("click", (e) => {
        if (BUTTON_OPEN.matches("a[href]")) e.preventDefault();
        openModal(e);
    }, { signal });
    // preventDefault suppresses the native click a real <button>/<a> already fires for Enter/Space
    // on its own — without it, that native click ran right after this one and, finding the dialog
    // already open, toggled it straight back closed
    BUTTON_OPEN?.addEventListener("keydown", (e) => {
        if (DIALOG.open || (e.key !== "Enter" && e.key !== " ")) return;
        e.preventDefault();
        openModal(e);
    }, { signal });

    //# CLOSE
    // every way the dialog closes ends in this native event — the close button, the backdrop, Escape, a
    // drag, the browser's back button, or a plain dialog.close() — so pgs:modal:close goes out from here
    // a modal written inside this dialog goes with it: its button is no longer on screen
    function closeNested() {
        const at = STACK.indexOf(DIALOG);
        if (at !== -1) STACK.splice(at, 1);
        document.querySelectorAll("dialog[pgs~='modal-dialog'][open]").forEach(dlg => { if (dlg !== DIALOG && DIALOG.contains(OWNERS.get(dlg))) dlg.close(); });
    }

    DIALOG.addEventListener("close", () => {
        statusModal(false);
        closing = false;
        stopAnimation();
        dragClose.stop();
        closeNested();
        dispatchModal(EVENT_CLOSE);
    }, { signal });
    // Escape on a showModal() dialog closes it natively, with no time left for the closing
    // animation: take the cancel over and close through closeModal instead
    if (dialogAnimation) DIALOG.addEventListener("cancel", e => {
        e.preventDefault();
        closeModal(e);
    }, { signal });
    // a click lands on the closest ancestor of where the press and the release happened: a press inside the
    // panel (selecting text) released on the backdrop would be a click on the dialog. Only a press that
    // also started on the backdrop closes it; a click with no press before it (a script, the keyboard) does
    let pressTarget = null;
    DIALOG.addEventListener("pointerdown", e => { pressTarget = e.target; }, { signal, capture: true });
    // a dialog opened with show() does not get Escape from the browser (only showModal() does): the key is
    // read here, wherever the focus is, unless something already used it
    if (!dialogTopLevel) document.addEventListener("keydown", e => {
        if (e.key !== "Escape" || e.defaultPrevented || !DIALOG.open || STACK.at(-1) !== DIALOG) return;
        e.preventDefault();
        closeModal(e);
    }, { signal });
    DIALOG.addEventListener("click", e => {
        const pressedOnBackdrop = pressTarget === null || pressTarget === DIALOG;
        pressTarget = null;
        if (e.target == DIALOG && pressedOnBackdrop && !dialogDisableBackdropClose) closeModal(e);
    }, { signal });
    // every close of this modal inside its dialog closes it, the cross and a Cancel in the footer alike: one
    // listener on the dialog, so a close added later by a script works too
    DIALOG.addEventListener("click", e => {
        const button = e.target.closest?.("[pgs~='modal-close'], [pgs~='_modal-close']");
        if (button && DIALOG.contains(button) && isOwnClose(button) && button !== BUTTON_OPEN) closeModal(e);
    }, { signal });
    // a close written on the wrapper, outside the dialog. A modal-button that is also the modal-close is a
    // toggle: its open handler already closes an open dialog, and a second listener on it would close the
    // dialog it has just opened
    for (const button of closesOf(MODAL)) {
        if (button !== BUTTON_OPEN && !DIALOG.contains(button)) button.addEventListener("click", e => closeModal(e), { signal });
    }

    //# DRAG CLOSE
    // touchmove is not passive: once a drag has started it has to stop the page from scrolling
    if (dialogDragClose && CONTENT) {
        DIALOG.addEventListener("touchstart", e => dragClose.start(e), { signal, passive: true });
        DIALOG.addEventListener("touchmove", e => dragClose.move(e), { signal, passive: false });
        DIALOG.addEventListener("touchend", e => dragClose.end(e), { signal });
        DIALOG.addEventListener("touchcancel", e => dragClose.end(e, false), { signal });
    }

    //# UPDATE HISTORY
    if (dialogHistory && BUTTON_OPEN?.id) {
        historyTimeout = window.setTimeout(openModalOnHistory, 1);

        // keeps the URL in step with the dialog's own "open" attribute
        historyObserver = new MutationObserver(() => {
            let isOpen = DIALOG.hasAttribute("open");
            try {
                const url = new URL(window.location.href);
                const params = new URLSearchParams(url.search);
                // the address says which modal is open: one that closes while it names another (this one
                // closing because that one is opening) leaves it alone
                if (!isOpen && params.get('modal') !== BUTTON_OPEN.id) return;
                isOpen ? params.set('modal', BUTTON_OPEN.id) : params.delete('modal');
                url.search = params.toString() ? `?${params.toString()}` : "";
                // the address already says so when the change came from the history itself (back,
                // forward, or a page loaded with ?modal=): a second entry would wipe the forward stack
                if (url.href === window.location.href) return;
                // opening adds an entry, so Back closes the modal; closing takes the address of that entry
                // back instead of adding another, so Back after a close leaves the page instead of opening
                // the modal again
                window.history[isOpen ? "pushState" : "replaceState"]({ modal: BUTTON_OPEN.id, open: isOpen }, "", url);
            } catch (_) { }
        });
        historyObserver.observe(DIALOG, { attributes: true, attributeFilter: ["open"] });

        // back and forward in the browser open and close the dialog to match
        window.addEventListener("popstate", () => {
            try {
                const params = new URLSearchParams(window.location.search);
                const shouldOpen = params.get('modal') === BUTTON_OPEN.id;
                if (shouldOpen && !DIALOG.open) openModal();
                if (!shouldOpen && DIALOG.open) closeModal()
            } catch (_) { }
        }, { signal });
    }

    // closeDialog is true for the public destroy(): the dialog is closed when it is open, and one
    // that was moved out of its wrapper is removed together with a wrapper that is gone from the
    // page, so it does not stay orphaned in the body. refresh() tears down without either, because
    // it rebuilds on the same wrapper and dialog
    function teardown(closeDialog) {
        // a stale instance (already replaced by a refresh) must not tear down the live one
        if (API.get(MODAL) !== api) return;

        const wasOpen = closeDialog && DIALOG.open;
        eventController.abort();
        stopAnimation();
        dragClose.stop();
        historyObserver?.disconnect();
        if (historyTimeout !== null) window.clearTimeout(historyTimeout);
        API.delete(MODAL);
        if (addedTabindex) focusTarget.removeAttribute("tabindex");

        // the listeners are gone, so the close the dialog fires natively is announced here
        if (wasOpen) {
            closing = false;
            statusModal(false);
            DIALOG.close();
            closeNested();
            dispatchModal(EVENT_CLOSE);
        }

        if (closeDialog && !MODAL.isConnected && !MODAL.contains(DIALOG)) {
            DIALOG.remove();
            DIALOGS.delete(MODAL);
        }
    }

    const api = {
        element: MODAL,
        button: BUTTON_OPEN,
        dialog: DIALOG,
        closeButton: BUTTON_CLOSE,
        open: forceOpen,
        close: forceClose,
        toggle: openModal,
        refresh: () => {
            const live = API.get(MODAL);
            if (live && live !== api) return live;
            teardown(false);
            return initializeModal(MODAL);
        },
        destroy: () => teardown(true),
        isOpen: () => DIALOG.open,
    };

    API.set(MODAL, api);
    return api;
}

function PGS_modal_init(root = document) {
    pgs.helper.roots(root, "modal").forEach(MODAL => initializeModal(MODAL));
}

//# INIT PGS_modal
pgs.helper.onDocumentReady(PGS_modal_init);

//# API
function PGS_modal_api(element) {
    return API.get(element);
}

export const PGS_modal = {
    init: PGS_modal_init,
    api: PGS_modal_api
};
