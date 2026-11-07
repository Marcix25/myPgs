import { pgs } from "../_pgs.js";

const API = new WeakMap();

// how long the letters typed one after the other still add up to one search
const TYPEAHEAD_RESET = 500;
// how many options PageUp and PageDown skip
const PAGE_STEP = 10;

//# BUILD
// a <select> written by the author, inside pgs="selectBox", gets a button and a list of its own that stand
// in for it on screen (the select-only combobox of the ARIA practices). A <select multiple> keeps the list
// open while its options are turned on and off, and the button lists the chosen ones. The select stays in
// the form and keeps the value: every choice is written on it and raises input and change, so the form,
// required, a reset and formValidate work as they do on any select. destroy() takes the generated
// button and list away and gives the select back
function PGS_selectBox_build(root) {
    const select = Array.from(root.children).find(child => child.tagName === "SELECT");

    if (!select) {
        pgs.helper.warn("selectBox.init", "the selectBox has no <select> as a direct child, so it was not initialized", root);
        return null;
    }
    const multiple = select.multiple;
    const controller = new AbortController();
    const { signal } = controller;
    const listId = pgs.helper.uniqueId("selectBox-list");

    //## generated markup
    const button = document.createElement("button");
    button.type = "button";
    button.id = pgs.helper.uniqueId("selectBox-button");
    pgs(button).add("_selectBox-button");
    button.setAttribute("role", "combobox");
    button.setAttribute("aria-haspopup", "listbox");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", listId);

    const value = document.createElement("span");
    pgs(value).add("_selectBox-button-value");
    button.append(value);

    const list = document.createElement("ul");
    list.id = listId;
    pgs(list).add("_selectBox-list");
    pgs(list).add("listbox");
    list.setAttribute("role", "listbox");
    list.tabIndex = -1;
    if (multiple) list.setAttribute("aria-multiselectable", "true");

    // the select is still the one the form reads, but no longer the one the reader uses
    select.setAttribute("aria-hidden", "true");
    select.tabIndex = -1;
    select.after(button, list);

    // the button and the list are named by the labels of the select, given an id when they have none
    const labelIds = Array.from(select.labels || []).map(label => {
        if (!label.id) label.id = pgs.helper.uniqueId("selectBox-label");
        return label.id;
    });
    if (labelIds.length) {
        button.setAttribute("aria-labelledby", labelIds.join(" "));
        list.setAttribute("aria-labelledby", labelIds.join(" "));
    } else if (select.getAttribute("aria-label")) {
        button.setAttribute("aria-label", select.getAttribute("aria-label"));
        list.setAttribute("aria-label", select.getAttribute("aria-label"));
    }

    //## state
    let entries = [];
    let activeIndex = -1;
    let typed = "";
    let typedTimer = 0;

    const isOpen = () => pgs(root).state.contains("open");
    const enabled = entry => entry && !entry.disabled;

    // the options of the select, optgroups included, written again as items of the list
    const render = () => {
        list.replaceChildren();
        entries = [];

        const addOption = (option, groupDisabled) => {
            if (option.hidden) return;

            const item = document.createElement("li");
            item.id = `${listId}-${entries.length}`;
            pgs(item).add("listbox-option");
            item.setAttribute("role", "option");
            item.replaceChildren(...contentOf(option));

            const disabled = option.disabled || groupDisabled;
            if (disabled) item.setAttribute("aria-disabled", "true");

            entries.push({ option, item, disabled });
            list.append(item);
        };

        Array.from(select.children).forEach(child => {
            if (child.tagName === "OPTGROUP") {
                const group = document.createElement("li");
                pgs(group).add("listbox-group");
                group.setAttribute("role", "presentation");
                group.textContent = child.label;
                list.append(group);
                Array.from(child.children).forEach(option => addOption(option, child.disabled));
            } else if (child.tagName === "OPTION") {
                addOption(child, false);
            }
        });

        sync();
    };

    const labelOf = option => option.label || option.textContent;

    // an <option> holds text only: the parser drops any element written in it, but a <template> is kept, out
    // of the text of the option. What it holds (an icon of any pack, an svg, a badge) is drawn before the text,
    // in the item of the list and in the button, while the native select still shows the text alone
    const contentOf = (option) => {
        const text = document.createTextNode(labelOf(option).trim());
        const template = Array.from(option.children).find(child => child.tagName === "TEMPLATE");
        return template ? [template.content.cloneNode(true), text] : [text];
    };

    // the button shows the option the select holds (the chosen ones, one after the other, on a multiple
    // select), and the list marks them. With nothing chosen, or a placeholder chosen, the button shows the
    // placeholder: the hidden option with an empty value
    const sync = () => {
        const chosen = Array.from(select.selectedOptions).filter(option => !(option.hidden && option.value === ""));
        const placeholder = Array.from(select.options).find(option => option.hidden && option.value === "");

        entries.forEach(entry => entry.item.setAttribute("aria-selected", String(entry.option.selected)));
        if (multiple) value.textContent = chosen.length ? chosen.map(labelOf).join(", ") : (placeholder ? labelOf(placeholder) : "");
        else value.replaceChildren(...(select.selectedOptions[0] ? contentOf(select.selectedOptions[0]) : []));
        pgs(root).state.toggle("empty", !chosen.length || (!multiple && chosen[0].value === ""));
        button.disabled = select.disabled;
        if (select.disabled && isOpen()) close();
    };

    const selectedIndex = () => entries.findIndex(entry => entry.option.selected);

    const setActive = (index) => {
        entries[activeIndex] && pgs(entries[activeIndex].item).state.remove("active");
        activeIndex = index;

        const entry = entries[activeIndex];
        if (!entry) {
            button.removeAttribute("aria-activedescendant");
            return;
        }

        pgs(entry.item).state.add("active");
        button.setAttribute("aria-activedescendant", entry.item.id);

        // keeps the item inside the list, without moving the page
        const top = entry.item.offsetTop;
        const bottom = top + entry.item.offsetHeight;
        if (top < list.scrollTop) list.scrollTop = top;
        else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
    };

    // the next option that can be chosen from `from` in the direction of `step`, or `from` at the end
    const findEnabled = (from, step) => {
        for (let index = from; index >= 0 && index < entries.length; index += step) {
            if (enabled(entries[index])) return index;
        }
        return -1;
    };

    const move = (step) => {
        const start = activeIndex < 0 ? (step > 0 ? 0 : entries.length - 1) : activeIndex + step;
        const clamped = Math.min(entries.length - 1, Math.max(0, start));
        const index = findEnabled(clamped, step > 0 ? 1 : -1);
        if (index >= 0) setActive(index);
    };

    const first = () => findEnabled(0, 1);
    const last = () => findEnabled(entries.length - 1, -1);

    //## open & close
    const open = (index = selectedIndex()) => {
        if (select.disabled || isOpen()) return;

        pgs(root).state.add("open");
        button.setAttribute("aria-expanded", "true");
        setActive(enabled(entries[index]) ? index : first());

        // the list opens upward when there is no room for it below and more above
        pgs(root).state.remove("openUp");
        const rect = list.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();
        if (rect.bottom > window.innerHeight && buttonRect.top > window.innerHeight - buttonRect.bottom) {
            pgs(root).state.add("openUp");
        }
    };

    const close = () => {
        if (!isOpen()) return;

        pgs(root).state.remove("open");
        pgs(root).state.remove("openUp");
        button.setAttribute("aria-expanded", "false");
        setActive(-1);
        // letters typed before closing do not carry over to the next search
        clearTimeout(typedTimer);
        typed = "";
    };

    const announce = (option) => {
        select.dispatchEvent(new Event("input", { bubbles: true }));
        select.dispatchEvent(new Event("change", { bubbles: true }));
        pgs.helper.dispatch(root, "pgs:selectBox:change", {
            select,
            option,
            selected: option.selected,
            value: select.value,
            values: Array.from(select.selectedOptions).map(item => item.value),
        });
    };

    // writes the choice on the select, which raises input and change like a choice made on it. A single
    // select takes the option and closes; a multiple one turns the option on or off and stays open
    const choose = (index) => {
        const entry = entries[index];
        if (!enabled(entry)) return;

        if (multiple) {
            entry.option.selected = !entry.option.selected;
            announce(entry.option);
            sync();
            setActive(index);
            return;
        }

        if (select.selectedOptions[0] !== entry.option) {
            entry.option.selected = true;
            announce(entry.option);
        }

        sync();
        close();
        button.focus();
    };

    // letters typed in a row look for the option that starts with them; the same letter again goes to the
    // next option starting with it
    const typeahead = (char) => {
        clearTimeout(typedTimer);
        typedTimer = setTimeout(() => { typed = ""; }, TYPEAHEAD_RESET);

        typed = typed === char ? char : typed + char;
        const query = typed.toLocaleLowerCase();
        // a word being typed may still match the option it is on; a new letter looks past it
        const from = isOpen() ? activeIndex : selectedIndex();
        const start = typed.length > 1 ? Math.max(0, from) : from + 1;
        const order = entries.map((entry, index) => (start + index) % entries.length);
        const found = order.find(index => enabled(entries[index]) && entries[index].item.textContent.trim().toLocaleLowerCase().startsWith(query));

        if (found === undefined) return;
        if (!isOpen()) open(found);
        else setActive(found);
    };

    //## events
    button.addEventListener("click", (event) => {
        // a click raised by Enter or Space is already handled by the keydown below
        if (event.detail === 0) return;
        isOpen() ? close() : open();
    }, { signal });

    button.addEventListener("keydown", (event) => {
        const { key, altKey } = event;
        const printable = key.length === 1 && !event.ctrlKey && !event.metaKey && !altKey;

        if (!isOpen()) {
            if (["ArrowDown", "ArrowUp", "Enter", " "].includes(key)) {
                event.preventDefault();
                open();
            } else if (key === "Home") {
                event.preventDefault();
                open(first());
            } else if (key === "End") {
                event.preventDefault();
                open(last());
            } else if (printable) {
                typeahead(key);
            }
            return;
        }

        switch (key) {
            case "ArrowDown":
                event.preventDefault();
                move(1);
                break;
            case "ArrowUp":
                event.preventDefault();
                if (altKey && multiple) close();
                else if (altKey) choose(activeIndex);
                else move(-1);
                break;
            case "Home":
                event.preventDefault();
                setActive(first());
                break;
            case "End":
                event.preventDefault();
                setActive(last());
                break;
            case "PageDown":
                event.preventDefault();
                move(PAGE_STEP);
                break;
            case "PageUp":
                event.preventDefault();
                move(-PAGE_STEP);
                break;
            case "Enter":
                event.preventDefault();
                choose(activeIndex);
                break;
            case " ":
                event.preventDefault();
                // a space in the middle of a word being typed is part of it
                if (typed) typeahead(key);
                else choose(activeIndex);
                break;
            case "Escape":
                event.preventDefault();
                close();
                break;
            case "Tab":
                // the focus moves on with the active option chosen, as on a native select; a multiple
                // select only closes, its choices are the ones already turned on
                if (multiple) close();
                else choose(activeIndex);
                break;
            default:
                if (printable) typeahead(key);
        }
    }, { signal });

    // the focus stays on the button while the pointer works the list
    list.addEventListener("mousedown", event => event.preventDefault(), { signal });
    list.addEventListener("click", (event) => {
        const index = entries.findIndex(entry => entry.item === event.target.closest("li"));
        if (index >= 0) choose(index);
    }, { signal });

    // a click outside, or the focus leaving the box, closes the list
    document.addEventListener("pointerdown", (event) => {
        if (isOpen() && !root.contains(event.target)) close();
    }, { signal });
    root.addEventListener("focusout", (event) => {
        if (!root.contains(event.relatedTarget)) close();
    }, { signal });

    // a click on a label of the select, or the focus a script gives it (formValidate on an invalid field),
    // reaches the button instead
    Array.from(select.labels || []).forEach(label => label.addEventListener("click", (event) => {
        if (root.contains(event.target)) return;
        event.preventDefault();
        button.focus();
    }, { signal }));
    select.addEventListener("focus", () => button.focus(), { signal });

    // a value written on the select by a script raises change only when the script raises it; a reset puts
    // the value back after its own event, so the select is read once it has settled
    select.addEventListener("change", sync, { signal });
    select.form?.addEventListener("reset", () => setTimeout(sync), { signal });

    // options added, removed or changed later (a list filled by a script) are written again
    const observer = new MutationObserver(render);
    observer.observe(select, { childList: true, subtree: true, attributes: true, characterData: true });

    render();

    //## API
    const destroy = () => {
        if (API.get(root) !== api) return;

        controller.abort();
        observer.disconnect();
        clearTimeout(typedTimer);
        pgs(root).state.remove("open");
        pgs(root).state.remove("openUp");
        pgs(root).state.remove("empty");
        button.remove();
        list.remove();
        select.removeAttribute("aria-hidden");
        select.removeAttribute("tabindex");
        API.delete(root);
    };

    const api = {
        element: root,
        select,
        button,
        list,
        open: () => open(),
        close,
        toggle: () => (isOpen() ? close() : open()),
        isOpen,
        // for a value or options a script wrote without raising change
        update: render,
        destroy,
        refresh: () => {
            const live = API.get(root);
            if (live && live !== api) return live;
            destroy();
            return PGS_selectBox_build(root) ?? undefined;
        },
    };
    API.set(root, api);

    return api;
}

//# INIT
function PGS_selectBox_init(root = document) {
    pgs.helper.roots(root, "selectBox").forEach((selectBox) => {
        if (API.has(selectBox)) return;

        PGS_selectBox_build(selectBox);
    });
}

pgs.helper.onDocumentReady(PGS_selectBox_init);

//# API
function PGS_selectBox_api(selector) {
    return API.get(selector);
}

export const PGS_selectBox = {
    init: PGS_selectBox_init,
    api: PGS_selectBox_api,
};
