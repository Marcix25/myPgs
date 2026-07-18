const API = new WeakMap();
const OPEN_SEARCHES = new Set();
let searchId = 0;

const DEFAULT_OPTIONS = {
    minLength: 2,
    debounce: 200,
    limit: 6,
    submitOnSelect: false,
    searchOnFocus: true,
    source: null,
    onSelect: null,
};

function nextSearchId() {
    searchId += 1;
    return searchId;
}

function getSearches(root) {
    const searches = root instanceof Element && pgs(root).contains("search") ? [root] : [];
    searches.push(...pgs(root).querySelectorAll("search"));
    return searches;
}

function directPgsChild(element, token) {
    return Array.from(element.children).find(child => pgs(child).contains(token));
}

function normalizeItem(item) {
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
}

function normalizeOptions(current, options = {}) {
    const next = { ...current, ...options };
    next.minLength = Math.max(0, Number.parseInt(next.minLength, 10) || 0);
    next.debounce = Math.max(0, Number.parseInt(next.debounce, 10) || 0);
    next.limit = Math.max(1, Number.parseInt(next.limit, 10) || DEFAULT_OPTIONS.limit);
    next.submitOnSelect = Boolean(next.submitOnSelect);
    next.searchOnFocus = Boolean(next.searchOnFocus);
    next.source = typeof next.source === "function" || Array.isArray(next.source) ? next.source : null;
    next.onSelect = typeof next.onSelect === "function" ? next.onSelect : null;
    return next;
}

function closeSearch(search) {
    const data = API.get(search);
    if (!data) return;

    pgs(search).state.remove("open");
    data.input.setAttribute("aria-expanded", "false");
    data.input.removeAttribute("aria-activedescendant");
    data.list.setAttribute("aria-hidden", "true");
    data.setActiveIndex(-1);
    OPEN_SEARCHES.delete(search);
}

function openSearch(search) {
    const data = API.get(search);
    if (!data || data.items().length === 0) return;

    pgs(search).state.add("open");
    data.input.setAttribute("aria-expanded", "true");
    data.list.setAttribute("aria-hidden", "false");
    OPEN_SEARCHES.add(search);
}

function PGS_search_init(root = document) {
    getSearches(root).forEach(search => {
        if (API.has(search)) return;

        const input = search.querySelector('input[type="search"]');
        const list = directPgsChild(search, "search-suggestions");
        if (!input || !list) return;

        const id = nextSearchId();
        if (!input.id) input.id = `search-input-${id}`;
        if (!list.id) list.id = `search-suggestions-${id}`;

        input.setAttribute("role", "combobox");
        input.setAttribute("aria-autocomplete", "list");
        input.setAttribute("aria-haspopup", "listbox");
        input.setAttribute("aria-controls", list.id);
        input.setAttribute("aria-expanded", "false");
        input.setAttribute("autocomplete", "off");
        list.setAttribute("role", "listbox");
        list.setAttribute("aria-labelledby", input.id);
        list.setAttribute("aria-hidden", "true");


        let options = { ...DEFAULT_OPTIONS };
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
            const elements = Array.from(list.querySelectorAll('[pgs~="search-suggestions-item"]'));

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
            closeSearch(search);
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
                .map(normalizeItem)
                .filter(Boolean)
                .slice(0, options.limit);

            const fragment = document.createDocumentFragment();
            items.forEach((item, index) => {
                const option = document.createElement("li");
                pgs(option).add("search-suggestions-item");
                pgs(option).add("flexRow");
                option.id = `${list.id}-option-${index}`;
                option.dataset.index = String(index);
                option.setAttribute("role", "option");
                option.setAttribute("aria-selected", "false");
                option.setAttribute("aria-disabled", String(item.disabled));
                option.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>' +  item.label;
                fragment.append(option);

            });

            activeIndex = -1;
            list.replaceChildren(fragment);
            pgs(search).state.remove("error");

            if (items.length) openSearch(search);
            else closeSearch(search);

            return items;
        }

        async function resolveSource(query, signal) {
            if (Array.isArray(options.source)) {
                const normalizedQuery = query.toLocaleLowerCase();
                return options.source.filter(item => {
                    const normalized = normalizeItem(item);
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

            try {
                const result = await resolveSource(normalizedQuery, currentController.signal);
                if (currentRequest !== requestNumber || currentController.signal.aborted) return [];
                return render(result);
            } catch (error) {
                if (error?.name === "AbortError") return [];
                if (currentRequest !== requestNumber) return [];

                clear();
                pgs(search).state.add("error");
                search.dispatchEvent(new CustomEvent("pgs:search:error", {
                    bubbles: true,
                    detail: { error, query: normalizedQuery },
                }));
                return [];
            } finally {
                if (controller === currentController) controller = null;
                if (currentRequest === requestNumber) setLoading(false);
            }
        }

        function schedule() {
            cancel();
            clear();
            pgs(search).state.remove("error");

            if (input.value.trim().length < options.minLength || !options.source) return;
            timer = window.setTimeout(() => {
                timer = null;
                runSearch(input.value);
            }, options.debounce);
        }

        function select(index = activeIndex, submit = options.submitOnSelect) {
            const item = items[index];
            if (!item || item.disabled) return null;

            input.value = item.value;
            cancel();
            clear();

            const detail = { item, index, value: item.value, input, element: search };
            search.dispatchEvent(new CustomEvent("pgs:search:select", { bubbles: true, detail }));
            options.onSelect?.(detail);

            input.focus();
            if (submit && typeof search.requestSubmit === "function") search.requestSubmit();
            return item;
        }

        function configure(nextOptions = {}) {
            options = normalizeOptions(options, nextOptions);
            return api;
        }

        function onInput() {
            schedule();
        }

        function onFocus() {
            if (items.length) openSearch(search);
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
                closeSearch(search);
                return;
            }

            if (event.key === "Tab") closeSearch(search);
        }

        function onListPointerDown(event) {
            const option = event.target.closest('[pgs~="search-suggestions-item"]');
            if (!option || !list.contains(option)) return;
            event.preventDefault();
            select(Number.parseInt(option.dataset.index, 10));
        }

        function onSubmit() {
            cancel();
            closeSearch(search);
        }

        function destroy() {
            cancel();
            clear();
            input.removeEventListener("input", onInput);
            input.removeEventListener("focus", onFocus);
            input.removeEventListener("keydown", onKeydown);
            list.removeEventListener("pointerdown", onListPointerDown);
            search.removeEventListener("submit", onSubmit);
            API.delete(search);
        }

        const api = {
            element: search,
            input,
            list,
            configure,
            setSource: source => configure({ source }),
            search: runSearch,
            open: () => openSearch(search),
            close: () => closeSearch(search),
            clear,
            cancel,
            select,
            refresh: () => runSearch(input.value),
            destroy,
            items: () => [...items],
            isOpen: () => pgs(search).state.contains("open"),
            isLoading: () => pgs(search).state.contains("loading"),
            setActiveIndex,
        };

        input.addEventListener("input", onInput);
        input.addEventListener("focus", onFocus);
        input.addEventListener("keydown", onKeydown);
        list.addEventListener("pointerdown", onListPointerDown);
        search.addEventListener("submit", onSubmit);
        API.set(search, api);
    });
}

document.addEventListener("pointerdown", event => {
    OPEN_SEARCHES.forEach(search => {
        if (!search.contains(event.target)) closeSearch(search);
    });
});

PGS_search_init();

export function PGS_search_api(selector) {
    return API.get(selector);
}

export const PGS_search = {
    init: PGS_search_init,
    api: PGS_search_api,
};
