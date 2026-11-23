import { pgs } from "../_pgs.js";

const API = new WeakMap();

// how many options PageUp and PageDown skip
const PAGE_STEP = 10;

//# LISTBOX
// the behavior every list of options opened by a field has in common, the way listbox already is the look
// they have in common: search and selectBox attach one to their list, and so can a component of a project.
// It opens and closes the list, places it (below the field, or above it when there is no room below), keeps
// the active option (the one the keys are on) and scrolls the list to it, moves it with the keys, chooses
// an option on a click and closes the list when the pointer or the focus leaves the owner. What is chosen,
// and what a choice does, stays with the component, through its callbacks
//
// list is the listbox-list (role listbox), the element of the options; the box around it is the listbox
// pgs.listbox.attach(list, {
//     owner,        // the element that takes the states open and openUp, the one a click outside of closes the
//                   // list (default: the parent of the box)
//     controls,     // the controls the keys work on (aria-expanded, aria-activedescendant): an element or an array
//     floating,     // the element that opens: the box, the listbox the list lies in (default: the listbox
//                   // that holds the list, or the list when there is none)
//     isNavigable,  // (option) => bool: the options the keys and the pointer can reach (default: not hidden,
//                   // not aria-disabled)
//     onActive,     // (option) => void: an option became active, before the list scrolls to it
//     onChoose,     // (option, event) => void: an option was chosen (a click, Enter)
//     onOpen,       // () => void: the list opened
//     onClose,      // () => void: the list closed, for any reason
//     onDismiss,    // (reason) => void: the reader closed it: "escape", "outside" (a pointer down outside the
//                   // owner) or "focusout" (the focus left the owner)
// })
function PGS_listbox_attach(list, settings = {}) {
    if (!(list instanceof Element)) throw pgs.helper.invalid("listbox.attach", "the first argument must be the element of the list");

    // one controller per list: attaching again replaces the one before
    API.get(list)?.destroy();

    const floating = settings.floating instanceof Element
        ? settings.floating
        : list.parentElement?.closest('[pgs~="listbox"]') ?? list;
    const owner = settings.owner instanceof Element ? settings.owner : floating.parentElement;
    const controls = [].concat(settings.controls || []).filter(control => control instanceof Element);
    // aria-expanded belongs to a combobox (the button of a select box, the field of a search): a plain search
    // field inside the list takes aria-activedescendant only
    const expanders = controls.filter(control => control.getAttribute("role") === "combobox");
    const callbacks = settings;

    const controller = new AbortController();
    const { signal } = controller;
    let active = null;

    floating.setAttribute("aria-hidden", "true");
    expanders.forEach(control => control.setAttribute("aria-expanded", "false"));

    //## options
    const options = () => Array.from(list.querySelectorAll('[pgs~="listbox-list-option"]'));
    const navigable = option => Boolean(option) && list.contains(option) && (typeof callbacks.isNavigable === "function"
        ? Boolean(callbacks.isNavigable(option))
        : !option.hidden && option.getAttribute("aria-disabled") !== "true");
    const activeOption = () => (active && list.contains(active) ? active : null);

    const toOption = (target) => {
        if (target instanceof Element) return target;
        if (Number.isInteger(target)) return options()[target] ?? null;
        return null;
    };

    // the option the keys are on: the state active, which listbox draws, and aria-activedescendant on the
    // controls. The list scrolls to it, inside itself, without moving the page
    const setActive = (target) => {
        const option = toOption(target);
        if (active) pgs(active).state.remove("active");
        active = option && navigable(option) ? option : null;

        if (!active) {
            controls.forEach(control => control.removeAttribute("aria-activedescendant"));
            return null;
        }

        if (!active.id) active.id = pgs.helper.uniqueId("listbox-list-option");
        callbacks.onActive?.(active);
        pgs(active).state.add("active");
        controls.forEach(control => control.setAttribute("aria-activedescendant", active.id));

        const listRect = list.getBoundingClientRect();
        const optionRect = active.getBoundingClientRect();
        const top = optionRect.top - listRect.top + list.scrollTop;
        const bottom = top + optionRect.height;
        if (top < list.scrollTop) list.scrollTop = top;
        else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
        return active;
    };

    // the next option that can be reached from index, in the direction of step; null when there is none
    const findFrom = (all, index, step) => {
        for (let current = index; current >= 0 && current < all.length; current += step) {
            if (navigable(all[current])) return all[current];
        }
        return null;
    };

    const first = () => findFrom(options(), 0, 1);
    const last = () => {
        const all = options();
        return findFrom(all, all.length - 1, -1);
    };

    // moves the active option by step (1, -1, a page): it stops at the first and at the last option, as a
    // native select does; with no active option, down starts from the first and up from the last
    const move = (step) => {
        const all = options();
        const current = all.indexOf(activeOption());
        const direction = step > 0 ? 1 : -1;

        let target;
        if (current < 0) target = direction > 0 ? findFrom(all, 0, 1) : findFrom(all, all.length - 1, -1);
        else {
            const index = Math.min(all.length - 1, Math.max(0, current + step));
            target = findFrom(all, index, direction) ?? findFrom(all, index, -direction);
        }
        return target ? setActive(target) : activeOption();
    };

    //## open & close
    const isOpen = () => pgs(owner).state.contains("open");

    // below the owner, or above it when there is no room below and more above; the floating element takes
    // below or above (listbox squares its corners on that side) only while it floats against the owner
    const position = () => {
        if (!isOpen()) return;

        pgs(owner).state.remove("openUp");
        const rect = floating.getBoundingClientRect();
        const ownerRect = owner.getBoundingClientRect();
        const up = rect.bottom > window.innerHeight && ownerRect.top > window.innerHeight - ownerRect.bottom;
        if (up) pgs(owner).state.add("openUp");

        const attached = getComputedStyle(floating).position === "absolute";
        pgs(floating).state.toggle("below", attached && !up);
        pgs(floating).state.toggle("above", attached && up);
    };

    // opening an open list only places it again (its options may have changed)
    const open = () => {
        if (!isOpen()) {
            pgs(owner).state.add("open");
            floating.setAttribute("aria-hidden", "false");
            expanders.forEach(control => control.setAttribute("aria-expanded", "true"));
            position();
            pgs.helper.dispatch(list, "pgs:listbox:open", { owner });
            callbacks.onOpen?.();
            return;
        }
        position();
    };

    const close = () => {
        if (!isOpen()) return;

        pgs(owner).state.remove("open");
        pgs(owner).state.remove("openUp");
        pgs(floating).state.remove("below");
        pgs(floating).state.remove("above");
        floating.setAttribute("aria-hidden", "true");
        expanders.forEach(control => control.setAttribute("aria-expanded", "false"));
        setActive(null);
        pgs.helper.dispatch(list, "pgs:listbox:close", { owner });
        callbacks.onClose?.();
    };

    const dismiss = (reason) => {
        close();
        callbacks.onDismiss?.(reason);
    };

    const choose = (target, event) => {
        const option = toOption(target);
        if (!navigable(option)) return;
        setActive(option);
        callbacks.onChoose?.(option, event);
    };

    //## keys
    // the keys of an open list, the same wherever one is: the arrows, Page Up and Page Down move, Home and End go
    // to the ends (in a text field they stay with the text), Enter chooses the active option, Escape closes.
    // Returns true when it handled the key, so the component handles the others (Tab, a space, letters)
    const handleKey = (event) => {
        if (!isOpen()) return false;
        const inText = event.target instanceof Element && event.target.matches("input, textarea");

        switch (event.key) {
            case "ArrowDown":
                if (event.altKey) return false;
                event.preventDefault();
                move(1);
                return true;
            case "ArrowUp":
                if (event.altKey) return false;
                event.preventDefault();
                move(-1);
                return true;
            case "PageDown":
                event.preventDefault();
                move(PAGE_STEP);
                return true;
            case "PageUp":
                event.preventDefault();
                move(-PAGE_STEP);
                return true;
            case "Home":
            case "End":
                if (inText) return false;
                event.preventDefault();
                setActive(event.key === "Home" ? first() : last());
                return true;
            case "Enter":
                if (!activeOption()) return false;
                event.preventDefault();
                choose(activeOption(), event);
                return true;
            case "Escape":
                event.preventDefault();
                dismiss("escape");
                return true;
            default:
                return false;
        }
    };

    //## pointer
    // the focus stays on the control while the pointer works the list (a field inside the floating element,
    // the search of a select box, still takes it); a click chooses the option it is on
    floating.addEventListener("mousedown", (event) => {
        if (!(event.target instanceof Element && event.target.closest("input, textarea"))) event.preventDefault();
    }, { signal });

    list.addEventListener("click", (event) => {
        const option = event.target instanceof Element ? event.target.closest('[pgs~="listbox-list-option"]') : null;
        if (option && list.contains(option)) choose(option, event);
    }, { signal });

    // a pointer down outside the owner, or the focus leaving it for another element of the page, closes the list
    document.addEventListener("pointerdown", (event) => {
        if (isOpen() && !owner.contains(event.target)) dismiss("outside");
    }, { signal });

    // the focus that leaves the page (the developer tools, another window, the bar of the browser) leaves the
    // list open: it is still where the reader left it when the page has the focus again. The focus has no
    // target yet while it moves, so the check waits for it to land
    owner.addEventListener("focusout", (event) => {
        if (!isOpen() || owner.contains(event.relatedTarget)) return;
        if (event.relatedTarget) {
            dismiss("focusout");
            return;
        }
        setTimeout(() => {
            if (isOpen() && document.hasFocus() && !owner.contains(document.activeElement)) dismiss("focusout");
        }, 0);
    }, { signal });

    //## API
    const destroy = () => {
        if (API.get(list) !== api) return;

        controller.abort();
        if (active) pgs(active).state.remove("active");
        pgs(owner).state.remove("open");
        pgs(owner).state.remove("openUp");
        pgs(floating).state.remove("below");
        pgs(floating).state.remove("above");
        controls.forEach(control => control.removeAttribute("aria-activedescendant"));
        // the states this controller wrote: a list with no controller is neither hidden nor expanded
        floating.removeAttribute("aria-hidden");
        expanders.forEach(control => control.removeAttribute("aria-expanded"));
        API.delete(list);
    };

    const api = {
        element: list,
        owner,
        floating,
        open,
        close,
        toggle: () => (isOpen() ? close() : open()),
        isOpen,
        position,
        options,
        isNavigable: navigable,
        active: activeOption,
        setActive,
        move,
        first,
        last,
        choose,
        handleKey,
        destroy,
        // the controller built again on the same list with the same settings
        refresh: () => PGS_listbox_attach(list, settings),
    };
    API.set(list, api);
    return api;
}

function PGS_listbox_api(list) {
    return API.get(list);
}

export const PGS_listbox = {
    attach: PGS_listbox_attach,
    api: PGS_listbox_api,
};
