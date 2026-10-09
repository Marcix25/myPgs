import { pgs } from "../_pgs.js";
import { PGS_directChild, PGS_dispatch, PGS_roots, PGS_uniqueId } from "../helper/_dom.js";
import { PGS_onDocumentReady } from "../helper/_onDocumentReady.js";
import { PGS_escapeHtml } from "../helper/_text.js";
import { PGS_warn } from "../helper/_warn.js";

const API = new WeakMap();
//## the searches that are open, or have a debounce or a request still pending: what a pointerdown
//## outside them has to close and cancel (kept until that pointerdown, so it stays short)
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
            return value ? { label: value, value, disabled: false, data: item } : null;
        }

        if (!item || typeof item !== "object") return null;

        const label = String(item.label ?? item.value ?? "").trim();
        if (!label) return null;

        return {
            label,
            value: String(item.value ?? label),
            disabled: Boolean(item.disabled),
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

    closeSearch(search) {
        const data = API.get(search);
        if (!data) return;

        pgs(search).state.remove("open");
        data.input.setAttribute("aria-expanded", "false");
        data.input.removeAttribute("aria-activedescendant");
        data.list.setAttribute("aria-hidden", "true");
        data.setActiveIndex(-1);
        ACTIVE_SEARCHES.delete(search);
    },

    openSearch(search, force = false) {
        const data = API.get(search);
        if (!data || (!force && data.items().length === 0)) return;

        pgs(search).state.add("open");
        data.input.setAttribute("aria-expanded", "true");
        data.list.setAttribute("aria-hidden", "false");
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

//## initialOptions is what a refresh() hands over: the options are not markup, so rebuilding the
//## instance does not read them again
function initializeSearch(search, initialOptions = DEFAULT_OPTIONS) {
    if (API.has(search)) return API.get(search);

    const input = search.querySelector('input[type="search"]');
    const list = PGS_directChild(search, "search-suggestions");
    if (!input || !list) {
        PGS_warn("search.init", "a search needs an input[type=\"search\"] and a search-suggestions list as its direct child", search);
        return;
    }

    const eventController = new AbortController();
    const { signal } = eventController;

    if (!input.id) input.id = PGS_uniqueId("search-input");
    if (!list.id) list.id = PGS_uniqueId("search-suggestions");

    input.setAttribute("role", "combobox");
    input.setAttribute("aria-autocomplete", "list");
    input.setAttribute("aria-haspopup", "listbox");
    input.setAttribute("aria-controls", list.id);
    input.setAttribute("aria-expanded", "false");
    input.setAttribute("autocomplete", "off");
    list.setAttribute("role", "listbox");
    list.setAttribute("aria-labelledby", input.id);
    list.setAttribute("aria-hidden", "true");


    let options = { ...initialOptions };
    let items = [];
    let activeIndex = -1;
    let timer = null;
    let controller = null;
    let requestNumber = 0;

    function setLoading(loading) {
        pgs(search).state.toggle("loading", loading);
        input.setAttribute("aria-busy", String(loading));
    }

    function setActiveIndex(index) {
        activeIndex = index;
        const elements = Array.from(pgs(list).querySelectorAll("_search-suggestions-item"));

        elements.forEach((element, itemIndex) => {
            const selected = itemIndex === activeIndex;
            element.setAttribute("aria-selected", String(selected));
            pgs(element).state.toggle("selected", selected);
        });

        const active = elements[activeIndex];
        if (active) {
            input.setAttribute("aria-activedescendant", active.id);
            active.scrollIntoView({ block: "nearest" });
        } else {
            input.removeAttribute("aria-activedescendant");
        }
    }

    function moveActive(step) {
        if (!items.length) return;

        let next = activeIndex;
        for (let checked = 0; checked < items.length; checked += 1) {
            next = (next + step + items.length) % items.length;
            if (!items[next].disabled) {
                setActiveIndex(next);
                return;
            }
        }
    }

    function clear() {
        items = [];
        activeIndex = -1;
        list.replaceChildren();
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
        items.forEach((item, index) => {
            const option = document.createElement("li");
            pgs(option).add("_search-suggestions-item");
            option.id = `${list.id}-option-${index}`;
            option.dataset.index = String(index);
            option.setAttribute("role", "option");
            option.setAttribute("aria-selected", "false");
            option.setAttribute("aria-disabled", String(item.disabled));
            //## the icon is markup the author wrote; the label comes from the source, which can be remote
            option.innerHTML = Search.suggestionIcon(search) + PGS_escapeHtml(item.label);
            fragment.append(option);

        });

        activeIndex = -1;
        list.replaceChildren(fragment);
        Search.openSearch(search);

        return items;
    }

    async function resolveSource(query, signal) {
        if (Array.isArray(options.source)) {
            const normalizedQuery = query.toLocaleLowerCase();
            return options.source.filter(item => {
                const normalized = Search.normalizeItem(item);
                return normalized && normalized.label.toLocaleLowerCase().includes(normalizedQuery);
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
            PGS_dispatch(search, "pgs:search:error", { error, query: normalizedQuery });
            return [];
        } finally {
            if (controller === currentController) controller = null;
            if (currentRequest === requestNumber) setLoading(false);
        }
    }

    function showMessage(option) {
        items = [];
        activeIndex = -1;

        option.setAttribute("aria-disabled", "true");
        list.replaceChildren(option);

        Search.openSearch(search, true);
    }

    function showPlaceholder() {
        const option = document.createElement("li");
        pgs(option).add("_search-suggestions-placeholder");
        option.textContent = Search.placeholderText(search, options);
        showMessage(option);
    }

    function showNoResults() {
        const option = document.createElement("li");
        pgs(option).add("_search-suggestions-empty");
        option.textContent = Search.noResultsText(search);
        showMessage(option);
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

    function select(index = activeIndex, submit = options.submitOnSelect) {
        const item = items[index];
        if (!item || item.disabled) return null;

        input.value = item.value;
        cancel();
        clear();

        const { detail } = PGS_dispatch(search, "pgs:search:select", { item, index, value: item.value, input });
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

    function onKeydown(event) {
        if (event.key === "ArrowDown") {
            if (!pgs(search).state.contains("open")) schedule();
            if (items.length) {
                event.preventDefault();
                moveActive(1);
            }
            return;
        }

        if (event.key === "ArrowUp" && items.length) {
            event.preventDefault();
            moveActive(-1);
            return;
        }

        if (event.key === "Enter" && activeIndex >= 0) {
            event.preventDefault();
            select(activeIndex);
            return;
        }

        if (event.key === "Escape") {
            event.preventDefault();
            cancel();
            Search.closeSearch(search);
            return;
        }

        //## leaving the field: what is still pending must not open the list again behind the focus
        if (event.key === "Tab") {
            cancel();
            Search.closeSearch(search);
        }
    }

    function onListPointerDown(event) {
        const option = pgs(event.target).closest("_search-suggestions-item");
        if (!option || !list.contains(option)) return;
        event.preventDefault();
        select(Number.parseInt(option.dataset.index, 10));
    }

    function onSubmit() {
        cancel();
        Search.closeSearch(search);
    }

    function destroy() {
        cancel();
        clear();
        eventController.abort();
        ACTIVE_SEARCHES.delete(search);
        API.delete(search);
    }

    const api = {
        element: search,
        input,
        list,
        configure,
        setSource: source => configure({ source }),
        search: runSearch,
        open: () => Search.openSearch(search),
        close: () => Search.closeSearch(search),
        clear,
        cancel,
        select,
        //## the options are the one thing a rebuild keeps: they were given by the code, not the markup
        refresh: () => {
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
    list.addEventListener("pointerdown", onListPointerDown, { signal });
    search.addEventListener("submit", onSubmit, { signal });
    API.set(search, api);
    return api;
}

//## a pointerdown outside an open search closes it, and cancels what it was still waiting for: a
//## debounce or a request that finishes after the click would open the list again behind it
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
    PGS_roots(root, "search").forEach(search => initializeSearch(search));
}

PGS_onDocumentReady(PGS_search_init);

function PGS_search_api(element) {
    return API.get(element);
}

export const PGS_search = {
    init: PGS_search_init,
    api: PGS_search_api,
};
