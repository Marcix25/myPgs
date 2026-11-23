import { pgs } from "../_pgs.js";
import { PGS_listbox } from "./_listbox.js";

const API = new WeakMap();

// how long the letters typed one after the other still add up to one search
const TYPEAHEAD_RESET = 500;

//# BUILD
// a <select> written by the author, inside pgs="selectBox", gets a button and a list of its own that stand
// in for it on screen (the select-only combobox of the ARIA practices). A <select multiple> keeps the list
// open while its options are turned on and off, and the button lists the chosen ones. The select stays in
// the form and keeps the value: every choice is written on it and raises input and change, so the form,
// required, a reset and formValidate work as they do on any select. destroy() takes the generated
// button and list away and gives the select back
//
// Options, all off by default:
// - selectBoxSearch: a search field over the list filters the options (and the groups by their label)
// - selectBoxChips: on a multiple select, each chosen option is a chip with a button that takes it away
// - selectBoxCollapse: the optgroups open and close from their heading
// - selectBoxMax[n] (pgs-data): on a multiple select, at most n options can be chosen
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

    //## options
    const searchable = pgs(root).option.contains("selectBoxSearch");
    const collapsible = pgs(root).option.contains("selectBoxCollapse");
    const withChips = multiple && pgs(root).option.contains("selectBoxChips");
    const maxValue = Number.parseInt(pgs(root).data.getValueBrackets("selectBoxMax"), 10);
    const max = multiple && maxValue > 0 ? maxValue : 0;
    const searchPlaceholder = pgs(root).data.getValueBrackets("selectBoxSearchPlaceholder") || "Search";
    const noResultsText = pgs(root).data.getValueBrackets("selectBoxNoResults") || "No results";
    const chipRemoveText = pgs(root).data.getValueBrackets("selectBoxChipRemove") || "Remove";

    if (pgs(root).option.contains("selectBoxChips") && !multiple) {
        pgs.helper.warn("selectBox.init", "selectBoxChips needs a <select multiple>, so it was left out", root);
    }
    if (maxValue > 0 && !multiple) {
        pgs.helper.warn("selectBox.init", "selectBoxMax needs a <select multiple>, so it was left out", root);
    }

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
    pgs(list).add("_selectBox-panel-list");
    pgs(list).add("listbox-list");
    list.setAttribute("role", "listbox");
    list.tabIndex = -1;
    if (multiple) list.setAttribute("aria-multiselectable", "true");

    // the panel is the box under the button that opens, the listbox (background, border, radius, padding): it
    // holds the list, which is only the options and scrolls, and with a search the field over the list and
    // the message shown when nothing matches
    const panel = document.createElement("div");
    pgs(panel).add("_selectBox-panel");
    pgs(panel).add("listbox");

    let search = null;
    let searchField = null;
    let noResults = null;
    if (searchable) {
        // the field looks like the one of a search (pgs="search"): a pill with the magnifying glass before the input
        searchField = document.createElement("div");
        pgs(searchField).add("_selectBox-panel-search");

        search = document.createElement("input");
        search.type = "search";
        pgs(search).add("_selectBox-panel-search-input");
        searchField.append(search);
        search.placeholder = searchPlaceholder;
        search.setAttribute("aria-label", searchPlaceholder);
        search.setAttribute("aria-controls", listId);
        search.setAttribute("aria-autocomplete", "list");
        search.autocomplete = "off";
        search.spellcheck = false;

        noResults = document.createElement("p");
        pgs(noResults).add("_selectBox-panel-noResults");
        // drawn by listbox, as a message in place of the options
        pgs(noResults).add("listbox-message");
        noResults.setAttribute("role", "status");
        noResults.textContent = noResultsText;
        noResults.hidden = true;

    }
    panel.append(...[searchField, list, noResults].filter(Boolean));

    // the chosen options of a selectBoxChips, before the button, each with its own button to take it away
    let chips = null;
    if (withChips) {
        chips = document.createElement("ul");
        pgs(chips).add("_selectBox-chips");
        chips.setAttribute("aria-live", "polite");
    }

    // the select is still the one the form reads, but no longer the one the reader uses. The author's
    // own tabindex is kept, so destroy() can give it back
    const authorTabindex = select.getAttribute("tabindex");
    select.setAttribute("aria-hidden", "true");
    select.tabIndex = -1;
    select.after(...[chips, button, panel].filter(Boolean));

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
    let groups = [];
    // which groups are open, by their label, so a list written again keeps them as they were
    const groupOpen = new Map();
    let typed = "";
    let typedTimer = 0;

    const isOpen = () => pgs(root).state.contains("open");
    const entryOf = item => entries.find(entry => entry.item === item);
    const indexOf = item => entries.findIndex(entry => entry.item === item);
    const chosenOptions = () => Array.from(select.selectedOptions).filter(option => !(option.hidden && option.value === ""));
    const isFull = () => max > 0 && chosenOptions().length >= max;
    // an option the keys and the pointer can choose: not disabled, not cut by the limit, not filtered out.
    // An option of a closed group still is: reaching it opens its group
    const enabled = entry => Boolean(entry) && !entry.disabled && !entry.filtered && !(isFull() && !entry.option.selected);

    // the options of the select, optgroups included, written again as items of the list
    const render = () => {
        list.replaceChildren();
        entries = [];
        groups = [];

        const addOption = (option, group) => {
            if (option.hidden) return;

            const item = document.createElement("li");
            item.id = `${listId}-${entries.length}`;
            pgs(item).add("listbox-list-option");
            item.setAttribute("role", "option");
            item.replaceChildren(...contentOf(option));

            const disabled = option.disabled || Boolean(group?.disabled);
            const entry = { option, item, disabled, group, text: pgs.helper.normalizeText(labelOf(option)), filtered: false };
            entries.push(entry);
            group?.entries.push(entry);
            list.append(item);
        };

        Array.from(select.children).forEach(child => {
            if (child.tagName === "OPTGROUP") {
                const header = document.createElement("li");
                pgs(header).add("listbox-list-group");
                header.setAttribute("role", "presentation");
                header.textContent = child.label;
                list.append(header);

                const group = { header, label: child.label, text: pgs.helper.normalizeText(child.label), disabled: child.disabled, entries: [] };
                groups.push(group);
                Array.from(child.children).forEach(option => addOption(option, group));

                // a group opens the first time it is drawn when it holds a chosen option
                if (!groupOpen.has(group.label)) groupOpen.set(group.label, group.entries.some(entry => entry.option.selected));
            } else if (child.tagName === "OPTION") {
                addOption(child, null);
            }
        });

        filter();
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

    // what the search field holds hides the options that do not match, unless their group matches; a group
    // with nothing left hides its heading. Without a search, a closed group hides its options
    const filter = () => {
        const query = search ? pgs.helper.normalizeText(search.value) : "";

        entries.forEach(entry => {
            const groupMatches = query && entry.group && entry.group.text.includes(query);
            entry.filtered = Boolean(query) && !groupMatches && !entry.text.includes(query);
            const closed = collapsible && !query && entry.group && !groupOpen.get(entry.group.label);
            entry.item.hidden = entry.filtered || Boolean(closed);
        });

        groups.forEach(group => {
            group.header.hidden = !group.entries.some(entry => !entry.filtered);
            // listbox draws a heading with open or closed as one that opens and closes
            if (collapsible) {
                const open = Boolean(query) || Boolean(groupOpen.get(group.label));
                pgs(group.header).state.toggle("open", open);
                pgs(group.header).state.toggle("closed", !open);
            }
        });

        if (noResults) noResults.hidden = !query || entries.some(entry => !entry.filtered);
    };

    const toggleGroup = (group, open = !groupOpen.get(group.label)) => {
        groupOpen.set(group.label, open);
        filter();
    };

    // the button shows the option the select holds (the chosen ones, one after the other, on a multiple
    // select), and the list marks them. With nothing chosen, or a placeholder chosen, the button shows the
    // placeholder: the hidden option with an empty value. With chips, the chosen ones are the chips and the
    // button keeps the placeholder for when there are none
    const sync = () => {
        const chosen = chosenOptions();
        const placeholder = Array.from(select.options).find(option => option.hidden && option.value === "");
        const full = isFull();

        entries.forEach(entry => {
            entry.item.setAttribute("aria-selected", String(entry.option.selected));
            if (entry.disabled || (full && !entry.option.selected)) entry.item.setAttribute("aria-disabled", "true");
            else entry.item.removeAttribute("aria-disabled");
        });

        if (withChips) {
            value.textContent = chosen.length ? "" : (placeholder ? labelOf(placeholder) : "");
            chips.replaceChildren(...chosen.map(chipOf));
        } else if (multiple) {
            value.textContent = chosen.length ? chosen.map(labelOf).join(", ") : (placeholder ? labelOf(placeholder) : "");
        } else {
            value.replaceChildren(...(select.selectedOptions[0] ? contentOf(select.selectedOptions[0]) : []));
        }

        pgs(root).state.toggle("empty", !chosen.length || (!multiple && chosen[0].value === ""));
        pgs(root).state.toggle("full", full);
        button.disabled = select.disabled;
        if (search) search.disabled = select.disabled;
        if (select.disabled && isOpen()) close();
    };

    const chipOf = (option) => {
        const chip = document.createElement("li");
        pgs(chip).add("_selectBox-chips-item");

        const label = document.createElement("span");
        pgs(label).add("_selectBox-chips-item-label");
        label.replaceChildren(...contentOf(option));

        const remove = document.createElement("button");
        remove.type = "button";
        pgs(remove).add("_selectBox-chips-item-remove");
        remove.setAttribute("aria-label", `${chipRemoveText} ${labelOf(option).trim()}`);
        remove.dataset.optionIndex = String(option.index);
        remove.disabled = select.disabled;

        chip.append(label, remove);
        return chip;
    };

    const selectedIndex = () => entries.findIndex(entry => entry.option.selected);

    //## open & close
    // the list behaves as every list of options does (listbox): it opens and closes, it is placed (below the
    // button, or above it without room below), the keys and the pointer move the active option and choose,
    // a pointer or the focus outside the box closes it. Here only what is the select box's own
    const listbox = PGS_listbox.attach(list, {
        owner: root,
        floating: panel,
        controls: [button, search].filter(Boolean),
        // the options the keys and the pointer reach: those of a closed group too, which opens when reached
        isNavigable: item => enabled(entryOf(item)),
        onActive: (item) => {
            const entry = entryOf(item);
            if (collapsible && entry?.group && !groupOpen.get(entry.group.label)) toggleGroup(entry.group, true);
        },
        onChoose: item => choose(indexOf(item)),
        onClose: () => {
            // letters typed before closing do not carry over to the next search, nor does the search
            clearTimeout(typedTimer);
            typed = "";
            if (search) {
                const focusWasInside = document.activeElement === search;
                search.value = "";
                filter();
                // the field is hidden with the list: the focus it held goes back to the button
                if (focusWasInside) button.focus();
            }
        },
        onDismiss: (reason) => {
            if (reason === "escape") button.focus();
        },
    });

    const setActive = index => listbox.setActive(entries[index]?.item ?? null);
    const activeIndex = () => indexOf(listbox.active());
    const first = () => indexOf(listbox.first());
    const last = () => indexOf(listbox.last());

    const open = (index = selectedIndex()) => {
        if (select.disabled || isOpen()) return;

        listbox.open();
        setActive(enabled(entries[index]) ? index : first());
        // with a search the keys go to its field, which keeps the list working as the button did
        search?.focus({ preventScroll: true });
    };

    const close = () => listbox.close();

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
        const from = isOpen() ? activeIndex() : selectedIndex();
        const start = typed.length > 1 ? Math.max(0, from) : from + 1;
        const order = entries.map((entry, index) => (start + index) % entries.length);
        const found = order.find(index => enabled(entries[index]) && entries[index].item.textContent.trim().toLocaleLowerCase().startsWith(query));

        if (found === undefined) return;
        if (!isOpen()) open(found);
        else setActive(found);
    };

    // the keys of an open list: listbox takes those of every list (arrows, Page Up and Page Down, Home and
    // End, Enter, Escape); here those of a select: Alt+Up, the space, Tab and the letters
    const onOpenKeys = (event, inSearch) => {
        if (listbox.handleKey(event)) return;

        const { key, altKey } = event;
        const printable = key.length === 1 && !event.ctrlKey && !event.metaKey && !altKey;

        switch (key) {
            case "ArrowUp":
            case "ArrowDown":
                // Alt+Up closes the list, choosing the active option on a single select
                if (key === "ArrowUp" && altKey) {
                    event.preventDefault();
                    if (multiple) close();
                    else choose(activeIndex());
                }
                break;
            case " ":
                if (inSearch) break;
                event.preventDefault();
                // a space in the middle of a word being typed is part of it
                if (typed) typeahead(key);
                else choose(activeIndex());
                break;
            case "Tab":
                // the focus moves on with the active option chosen, as on a native select; a multiple
                // select only closes, its choices are the ones already turned on
                if (multiple) close();
                else choose(activeIndex());
                break;
            default:
                if (printable && !inSearch) typeahead(key);
        }
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

        if (isOpen()) {
            onOpenKeys(event, false);
            return;
        }

        if (["ArrowDown", "ArrowUp", "Enter", " "].includes(key)) {
            event.preventDefault();
            open();
        } else if (key === "Home") {
            event.preventDefault();
            open(first());
        } else if (key === "End") {
            event.preventDefault();
            open(last());
        } else if (printable && search) {
            // a letter typed on the closed button opens the list and starts the search with it
            event.preventDefault();
            open();
            search.value = key;
            filter();
            setActive(first());
        } else if (printable) {
            typeahead(key);
        }
    }, { signal });

    if (search) {
        search.addEventListener("keydown", event => onOpenKeys(event, true), { signal });
        search.addEventListener("input", () => {
            filter();
            setActive(first());
        }, { signal });
    }

    // the heading of a group that opens and closes (the options are listbox's: a click on one chooses it)
    list.addEventListener("click", (event) => {
        const group = groups.find(candidate => candidate.header === event.target.closest("li"));
        if (group && collapsible && !(search && search.value)) toggleGroup(group);
    }, { signal });

    // a chip takes its option away with its button; a click elsewhere on the chips opens the list
    chips?.addEventListener("click", (event) => {
        const remove = event.target.closest('[pgs~="_selectBox-chips-item-remove"]');
        if (!remove) {
            if (!isOpen()) open();
            return;
        }
        const option = select.options[Number(remove.dataset.optionIndex)];
        if (!option || select.disabled) return;
        option.selected = false;
        announce(option);
        sync();
        // the chip and its button are gone: the focus goes back to the field
        if (!isOpen()) button.focus();
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
        listbox.destroy();
        clearTimeout(typedTimer);
        pgs(root).state.remove("empty");
        pgs(root).state.remove("full");
        button.remove();
        panel.remove();
        chips?.remove();
        select.removeAttribute("aria-hidden");
        if (authorTabindex === null) select.removeAttribute("tabindex");
        else select.setAttribute("tabindex", authorTabindex);
        API.delete(root);
    };

    const api = {
        element: root,
        select,
        button,
        list,
        // the box the list lies in, which opens: the listbox
        panel,
        search,
        // the listbox controller of the list: open, close, the active option, the keys
        listbox,
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
