import { pgs } from "../_pgs.js";
import { PGS_listbox } from "./_listbox.js";

const API = new WeakMap();
// the searches that are open, or have a debounce or a request still pending: what a pointerdown
// outside them has to close and cancel (kept until that pointerdown, so it stays short)
const ACTIVE_SEARCHES = new Set();

const DEFAULT_OPTIONS = {
    minLength: 2,
    debounce: 200,
    limit: 6,
    submitOnSelect: false,
    searchOnFocus: true,
    source: null,
    onSelect: null,
};

const Search = {
    normalizeItem(item) {
        if (typeof item === "string" || typeof item === "number") {
            const value = String(item).trim();
            return value ? { label: value, value, disabled: false, icon: "", group: "", data: item } : null;
        }

        if (!item || typeof item !== "object") return null;

        const label = String(item.label ?? item.value ?? "").trim();
        if (!label) return null;

        return {
            label,
            value: String(item.value ?? label),
            disabled: Boolean(item.disabled),
            // markup of the item's own icon, written by the author's source: it replaces searchIconSuggestion for this item
            icon: typeof item.icon === "string" ? item.icon.trim() : "",
            // the group the item belongs to: the items that follow each other with the same group get one heading
            group: typeof item.group === "string" ? item.group.trim() : "",
            data: Object.prototype.hasOwnProperty.call(item, "data") ? item.data : item,
        };
    },

    normalizeOptions(current, options = {}) {
        const next = { ...current, ...options };
        next.minLength = Math.max(0, Number.parseInt(next.minLength, 10) || 0);
        next.debounce = Math.max(0, Number.parseInt(next.debounce, 10) || 0);
        next.limit = Math.max(1, Number.parseInt(next.limit, 10) || DEFAULT_OPTIONS.limit);
        next.submitOnSelect = Boolean(next.submitOnSelect);
        next.searchOnFocus = Boolean(next.searchOnFocus);
        next.source = typeof next.source === "function" || Array.isArray(next.source) ? next.source : null;
        next.onSelect = typeof next.onSelect === "function" ? next.onSelect : null;
        return next;
    },

    // opening, closing and placing the list (below the form, or above it without room below) is the work of
    // the listbox controller attached to it, the same as for the list of a select box
    closeSearch(search) {
        const data = API.get(search);
        if (!data) return;

        data.listbox.close();
        ACTIVE_SEARCHES.delete(search);
    },

    openSearch(search, force = false) {
        const data = API.get(search);
        if (!data || (!force && data.items().length === 0)) return;

        data.listbox.open();
        ACTIVE_SEARCHES.add(search);
    },

    placeholderText(search, options) {
        const template = pgs(search).data.getValueBrackets("searchPlaceholder") || "Type at least {minLength} characters";
        return template.replace("{minLength}", options.minLength);
    },

    suggestionIcon(search) {
        return pgs(search).data.getValueBrackets("searchIconSuggestion") || "<i pgs=\"icon['icon-magnifyingGlass']\"></i>";
    },

    noResultsText(search) {
        return pgs(search).data.getValueBrackets("searchNoResults") || "No results found";
    },
};

// initialOptions is what a refresh() hands over: the options are not markup, so rebuilding the
// instance does not read them again
function initializeSearch(search, initialOptions = DEFAULT_OPTIONS) {
    if (API.has(search)) return API.get(search);

    const input = search.querySelector('input[type="search"]');
    // the box of the suggestions, written empty as a direct child of the form: an element that can hold the list
    // (a <div>), not a list itself
    const panel = pgs.helper.directChild(search, "search-suggestions");
    if (!input || !panel) {
        pgs.helper.warn("search.init", "a search needs an input[type=\"search\"] and a search-suggestions box as its direct child", search);
        return;
    }
    if (panel.matches("ul, ol")) {
        pgs.helper.warn("search.init", "search-suggestions is the box of the suggestions, which holds their list: write it as a <div>, not a <ul>", search);
        return;
    }

    const eventController = new AbortController();
    const { signal } = eventController;

    if (!input.id) input.id = pgs.helper.uniqueId("search-input");

    // the box is the listbox (box, list, message: see Listbox) and the element that opens. The JavaScript builds
    // in it the list of the suggestions (the listbox-list) and, under it, the message (type more, nothing found)
    pgs(panel).add("listbox");

    const list = document.createElement("ul");
    pgs(list).add("_search-suggestions-list");
    pgs(list).add("listbox-list");
    list.id = panel.id ? `${panel.id}-list` : pgs.helper.uniqueId("search-suggestions-list");
    list.setAttribute("role", "listbox");
    list.setAttribute("aria-labelledby", input.id);

    const message = document.createElement("p");
    pgs(message).add("_search-suggestions-message");
    pgs(message).add("listbox-message");
    message.setAttribute("role", "status");
    message.hidden = true;
    panel.replaceChildren(list, message);

    input.setAttribute("role", "combobox");
    input.setAttribute("aria-autocomplete", "list");
    input.setAttribute("aria-haspopup", "listbox");
    input.setAttribute("aria-controls", list.id);
    input.setAttribute("aria-expanded", "false");
    input.setAttribute("autocomplete", "off");

    let options = { ...initialOptions };
    let items = [];
    let timer = null;
    let controller = null;
    let requestNumber = 0;

    function setLoading(loading) {
        pgs(search).state.toggle("loading", loading);
        input.setAttribute("aria-busy", String(loading));
    }

    // the list behaves as every list of options does (listbox): it opens and closes, it is placed, the keys
    // and the pointer move the active option and choose. A choice selects the suggestion; the reader closing
    // the list (Escape, a pointer or the focus outside) also cancels what was still pending
    const listbox = PGS_listbox.attach(list, {
        owner: search,
        floating: panel,
        controls: input,
        onChoose: option => select(Number.parseInt(option.dataset.index, 10)),
        onDismiss: () => {
            cancel();
            ACTIVE_SEARCHES.delete(search);
        },
    });

    // the index of the suggestion the keys are on, -1 without one
    function activeIndex() {
        const option = listbox.active();
        return option ? Number.parseInt(option.dataset.index, 10) : -1;
    }

    function setActiveIndex(index) {
        listbox.setActive(Number.isInteger(index) && index >= 0 ? index : null);
    }

    function clear() {
        items = [];
        list.replaceChildren();
        message.hidden = true;
        message.textContent = "";
        Search.closeSearch(search);
    }

    function cancel() {
        if (timer !== null) window.clearTimeout(timer);
        timer = null;
        if (controller) controller.abort();
        controller = null;
        requestNumber += 1;
        setLoading(false);
    }

    function render(nextItems) {
        items = Array.from(nextItems || [])
            .map(Search.normalizeItem)
            .filter(Boolean)
            .slice(0, options.limit);

        pgs(search).state.remove("error");

        if (!items.length) {
            showNoResults();
            return items;
        }

        const fragment = document.createDocumentFragment();
        let group = "";
        items.forEach((item, index) => {
            // a heading over the items of a group, whenever the group changes; the keys and the pointer skip it
            if (item.group && item.group !== group) {
                const heading = document.createElement("li");
                pgs(heading).add("_search-suggestions-list-group");
                pgs(heading).add("listbox-list-group");
                heading.setAttribute("role", "presentation");
                heading.textContent = item.group;
                fragment.append(heading);
            }
            group = item.group;

            const option = document.createElement("li");
            pgs(option).add("_search-suggestions-list-item");
            pgs(option).add("listbox-list-option");
            option.id = `${list.id}-option-${index}`;
            option.dataset.index = String(index);
            option.setAttribute("role", "option");
            option.setAttribute("aria-selected", "false");
            option.setAttribute("aria-disabled", String(item.disabled));
            // the icon is markup the author wrote (the item's own, or the one of the search); the label comes
            // from the source, which can be remote
            option.innerHTML = (item.icon || Search.suggestionIcon(search)) + pgs.helper.escapeHtml(item.label);
            fragment.append(option);

        });

        list.replaceChildren(fragment);
        message.hidden = true;
        Search.openSearch(search);

        return items;
    }

    async function resolveSource(query, signal) {
        if (Array.isArray(options.source)) {
            // capitals and accents do not count: "citta" finds "Città"
            const normalizedQuery = pgs.helper.normalizeText(query);
            return options.source.filter(item => {
                const normalized = Search.normalizeItem(item);
                return normalized && pgs.helper.normalizeText(normalized.label).includes(normalizedQuery);
            });
        }

        if (typeof options.source !== "function") return [];
        return await options.source({
            query,
            signal,
            limit: options.limit,
            element: search,
            input,
        });
    }

    async function runSearch(query = input.value) {
        cancel();
        clear();

        const normalizedQuery = String(query ?? "").trim();
        if (normalizedQuery.length < options.minLength || !options.source) return [];

        const currentRequest = requestNumber;
        controller = new AbortController();
        const currentController = controller;
        setLoading(true);
        ACTIVE_SEARCHES.add(search);

        try {
            const result = await resolveSource(normalizedQuery, currentController.signal);
            if (currentRequest !== requestNumber || currentController.signal.aborted) return [];
            return render(result);
        } catch (error) {
            if (error?.name === "AbortError") return [];
            if (currentRequest !== requestNumber) return [];

            clear();
            pgs(search).state.add("error");
            pgs.helper.dispatch(search, "pgs:search:error", { error, query: normalizedQuery });
            return [];
        } finally {
            if (controller === currentController) controller = null;
            if (currentRequest === requestNumber) setLoading(false);
        }
    }

    // a message in place of the suggestions, under the empty list: how many letters to type, nothing found
    function showMessage(text) {
        items = [];
        list.replaceChildren();
        message.textContent = text;
        message.hidden = false;
        Search.openSearch(search, true);
    }

    function showPlaceholder() {
        showMessage(Search.placeholderText(search, options));
    }

    function showNoResults() {
        showMessage(Search.noResultsText(search));
    }

    function schedule() {
        cancel();
        clear();
        pgs(search).state.remove("error");

        if (!options.source) return;

        if (input.value.trim().length < options.minLength) {
            showPlaceholder();
            return;
        }

        timer = window.setTimeout(() => {
            timer = null;
            runSearch(input.value);
        }, options.debounce);
        ACTIVE_SEARCHES.add(search);
    }

    function select(index = activeIndex(), submit = options.submitOnSelect) {
        const item = items[index];
        if (!item || item.disabled) return null;

        input.value = item.value;
        cancel();
        clear();

        const { detail } = pgs.helper.dispatch(search, "pgs:search:select", { item, index, value: item.value, input });
        options.onSelect?.(detail);

        input.focus();
        if (submit && typeof search.requestSubmit === "function") search.requestSubmit();
        return item;
    }

    function configure(nextOptions = {}) {
        options = Search.normalizeOptions(options, nextOptions);
        return api;
    }

    function onInput() {
        schedule();
    }

    function onFocus() {
        if (items.length) Search.openSearch(search);
        else if (options.searchOnFocus) schedule();
    }

    // the keys of the open list are those of every listbox (arrows, Page Up and Page Down, Enter, Escape;
    // Home and End stay with the text of the field). Here only what is the search's own
    function onKeydown(event) {
        // the list closed: the arrow down looks again for what the field holds
        if (event.key === "ArrowDown" && !listbox.isOpen()) {
            schedule();
            return;
        }

        if (listbox.handleKey(event)) return;

        // Escape with the list closed still cancels a search on its way
        if (event.key === "Escape") {
            cancel();
            return;
        }

        // leaving the field: what is still pending must not open the list again behind the focus
        if (event.key === "Tab") {
            cancel();
            Search.closeSearch(search);
        }
    }

    function onSubmit() {
        cancel();
        Search.closeSearch(search);
    }

    function destroy() {
        // a stale instance (already replaced by a refresh) must not tear down the live one
        if (API.get(search) !== api) return;

        cancel();
        clear();
        listbox.destroy();
        // the box goes back as it was written, empty, so a new instance builds it again
        panel.replaceChildren();
        pgs(panel).remove("listbox");
        eventController.abort();
        ACTIVE_SEARCHES.delete(search);
        API.delete(search);
    }

    const api = {
        element: search,
        input,
        // the list of the suggestions the JavaScript builds in the box (the listbox-list)
        list,
        // the search-suggestions box, which opens: the listbox
        panel,
        // the listbox controller of the list: open, close, the active option, the keys
        listbox,
        configure,
        setSource: source => configure({ source }),
        search: runSearch,
        open: () => Search.openSearch(search),
        close: () => Search.closeSearch(search),
        clear,
        cancel,
        select,
        // the options are the one thing a rebuild keeps: they were given by the code, not the markup
        refresh: () => {
            const live = API.get(search);
            if (live && live !== api) return live;

            const kept = options;
            destroy();
            return initializeSearch(search, kept);
        },
        destroy,
        items: () => [...items],
        isOpen: () => pgs(search).state.contains("open"),
        isLoading: () => pgs(search).state.contains("loading"),
        setActiveIndex,
    };

    input.addEventListener("input", onInput, { signal });
    input.addEventListener("focus", onFocus, { signal });
    input.addEventListener("keydown", onKeydown, { signal });
    search.addEventListener("submit", onSubmit, { signal });
    API.set(search, api);
    return api;
}

// a pointerdown outside an open search closes it, and cancels what it was still waiting for: a
// debounce or a request that finishes after the click would open the list again behind it
if (typeof document !== "undefined") {
    document.addEventListener("pointerdown", event => {
        ACTIVE_SEARCHES.forEach(search => {
            if (search.contains(event.target)) return;

            const instance = API.get(search);
            instance?.cancel();
            instance?.close();
            ACTIVE_SEARCHES.delete(search);
        });
    });
}

function PGS_search_init(root = document) {
    pgs.helper.roots(root, "search").forEach(search => initializeSearch(search));
}

pgs.helper.onDocumentReady(PGS_search_init);

function PGS_search_api(element) {
    return API.get(element);
}

export const PGS_search = {
    init: PGS_search_init,
    api: PGS_search_api,
};
