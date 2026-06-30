// + dropdown
const API = new WeakMap();
const OPEN_DROPDOWNS = new Set();
const VIEWPORT_GAP = 8;
let dropdownId = 0;

function nextDropdownId() {
    dropdownId += 1;
    return dropdownId;
}

function isDropdownContent(element) {
    return element instanceof Element && pgs(element).contains("dropdown-content");
}

function getDropdownTrigger(dropdown, content) {
    const children = Array.from(dropdown.children).filter(child => child !== content);
    const dropdownButton = children.find(child => pgs(child).contains("dropdown-button"));

    return dropdownButton || children.find(child => !isDropdownContent(child)) || dropdown;
}

function getDropdownContent(dropdown) {
    return Array.from(dropdown.children).find(isDropdownContent) || pgs(dropdown).querySelector("dropdown-content");
}

function getDropdowns(root) {
    const dropdowns = root instanceof Element && pgs(root).contains("dropdown") ? [root] : [];
    dropdowns.push(...pgs(root).querySelectorAll("dropdown"));
    return dropdowns;
}

function getDropdownPosition(dropdown) {
    const raw = getComputedStyle(dropdown).getPropertyValue("--dropdown-position").trim().toLowerCase();
    const parts = raw.split(/\s+/).filter(Boolean);
    const side = parts.find(part => ["top", "right", "bottom", "left"].includes(part)) || "bottom";
    const align = parts.find(part => ["top", "right", "bottom", "left", "center"].includes(part) && part !== side) || "center";

    return { side, align };
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function updateDropdownPosition(dropdown) {
    const data = API.get(dropdown);
    if (!data || !data.isOpen()) return;

    const { trigger, content } = data;
    const { side, align } = getDropdownPosition(dropdown);
    const triggerRect = trigger.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();
    const viewportWidth = document.documentElement.clientWidth;
    const maxLeft = Math.max(VIEWPORT_GAP, viewportWidth - contentRect.width - VIEWPORT_GAP);
    let left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
    let top = triggerRect.bottom + VIEWPORT_GAP;

    if (side === "top" || side === "bottom") {
        top = side === "top"
            ? triggerRect.top - contentRect.height - VIEWPORT_GAP
            : triggerRect.bottom + VIEWPORT_GAP;

        if (align === "left") left = triggerRect.left;
        if (align === "right") left = triggerRect.right - contentRect.width;
    }

    if (side === "left" || side === "right") {
        left = side === "left"
            ? triggerRect.left - contentRect.width - VIEWPORT_GAP
            : triggerRect.right + VIEWPORT_GAP;
        top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;

        if (align === "top") top = triggerRect.top;
        if (align === "bottom") top = triggerRect.bottom - contentRect.height;
    }

    if (side === "left" && left < VIEWPORT_GAP) {
        left = triggerRect.right + VIEWPORT_GAP;
    }

    if (side === "right" && left + contentRect.width > viewportWidth - VIEWPORT_GAP) {
        left = triggerRect.left - contentRect.width - VIEWPORT_GAP;
    }

    left = clamp(left, VIEWPORT_GAP, maxLeft);

    content.style.setProperty("--dropdown-left", `${Math.round(left)}px`);
    content.style.setProperty("--dropdown-top", `${Math.round(top)}px`);
}

function updateOpenDropdowns() {
    OPEN_DROPDOWNS.forEach(updateDropdownPosition);
}

function closeDropdown(dropdown) {
    const data = API.get(dropdown);
    if (!data || !data.isOpen()) return;

    pgs(dropdown).state.remove("open");
    data.trigger.setAttribute("aria-expanded", "false");
    OPEN_DROPDOWNS.delete(dropdown);
}

function openDropdown(dropdown) {
    const data = API.get(dropdown);
    if (!data || data.isOpen()) return;

    OPEN_DROPDOWNS.forEach(item => {
        if (item !== dropdown) closeDropdown(item);
    });

    pgs(dropdown).state.add("open");
    data.trigger.setAttribute("aria-expanded", "true");
    OPEN_DROPDOWNS.add(dropdown);
    updateDropdownPosition(dropdown);
}

function toggleDropdown(dropdown) {
    const data = API.get(dropdown);
    if (!data) return;

    if (data.isOpen()) closeDropdown(dropdown);
    else openDropdown(dropdown);
}

function isInsideAnyDropdown(target) {
    return Array.from(OPEN_DROPDOWNS).some(dropdown => dropdown.contains(target));
}

function PGS_dropdown_init(root = document) {
    getDropdowns(root).forEach((DROPDOWN) => {
        if (API.has(DROPDOWN)) return;

        const CONTENT = getDropdownContent(DROPDOWN);
        if (!CONTENT) return;

        const TRIGGER = getDropdownTrigger(DROPDOWN, CONTENT);
        const id = nextDropdownId();

        if (!TRIGGER.id) TRIGGER.id = `dropdown-btn-${id}`;
        if (!CONTENT.id) CONTENT.id = `dropdown-panel-${id}`;

        if (TRIGGER.matches("button") && !TRIGGER.hasAttribute("type")) {
            TRIGGER.setAttribute("type", "button");
        }

        TRIGGER.setAttribute("aria-haspopup", "true");
        TRIGGER.setAttribute("aria-controls", CONTENT.id);
        TRIGGER.setAttribute("aria-expanded", String(pgs(DROPDOWN).state.contains("open")));
        CONTENT.setAttribute("aria-labelledby", TRIGGER.id);

        const data = {
            element: DROPDOWN,
            trigger: TRIGGER,
            content: CONTENT,
            open: () => openDropdown(DROPDOWN),
            close: () => closeDropdown(DROPDOWN),
            toggle: () => toggleDropdown(DROPDOWN),
            refresh: () => {
                PGS_dropdown_init(DROPDOWN.parentNode || document);
                updateDropdownPosition(DROPDOWN);
                return API.get(DROPDOWN);
            },
            isOpen: () => pgs(DROPDOWN).state.contains("open")
        };

        TRIGGER.addEventListener("click", (event) => {
            if (isDropdownContent(event.target)) return;
            event.preventDefault();
            event.stopPropagation();
            toggleDropdown(DROPDOWN);
        });

        CONTENT.addEventListener("click", event => event.stopPropagation());
        API.set(DROPDOWN, data);

        if (data.isOpen()) OPEN_DROPDOWNS.add(DROPDOWN);
        updateDropdownPosition(DROPDOWN);
    });
}

document.addEventListener("click", (event) => {
    if (isInsideAnyDropdown(event.target)) return;
    OPEN_DROPDOWNS.forEach(closeDropdown);
});

document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    OPEN_DROPDOWNS.forEach(closeDropdown);
});

window.addEventListener("resize", updateOpenDropdowns);
window.addEventListener("scroll", updateOpenDropdowns, true);

// # INIT
PGS_dropdown_init();

// # API
function PGS_dropdown_api(selector) {
    return API.get(selector);
}

export const PGS_dropdown = {
    init: PGS_dropdown_init,
    api: PGS_dropdown_api
};
