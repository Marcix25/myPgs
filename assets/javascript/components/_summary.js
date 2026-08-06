import { PGS_onDocumentReady } from "../helper/_onDocumentReady.js";

//= SUMMARY
const API = new WeakMap();
let summaryId = 0;
const MESSAGE_DEFAULTS = {
    showLess: "Show less",
    showMore: "Show more"
};

function nextSummaryId() {
    summaryId += 1;
    return summaryId;
}

function getLineHeight(element) {
    const style = window.getComputedStyle(element);
    const lineHeight = parseFloat(style.lineHeight);
    if (Number.isFinite(lineHeight)) return lineHeight;

    const fontSize = parseFloat(style.fontSize);
    return Number.isFinite(fontSize) ? fontSize * 1.2 : 0;
}

function directPgsChild(element, token) {
    return Array.from(element.children).find(child => pgs(child).contains(token));
}

function validateMessages(value) {
    if (value === undefined) return;
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        throw new TypeError("message must be an object");
    }

    Object.entries(value).forEach(([key, message]) => {
        if (!(key in MESSAGE_DEFAULTS)) {
            throw new TypeError(`Unknown summary message option: ${key}`);
        }
        if (message !== undefined && typeof message !== "string") {
            throw new TypeError(`Summary message option ${key} must be a string`);
        }
    });
}

function getInitialMessages(value = {}) {
    validateMessages(value);

    return {
        ...MESSAGE_DEFAULTS,
        ...Object.fromEntries(
            Object.entries(value).filter(([, message]) => message !== undefined)
        )
    };
}

function initializeMessages(summary, messages) {
    const summaryOptions = pgs(summary).option;
    Object.entries(messages).forEach(([key, message]) => {
        if (!summaryOptions.contains(key)) summaryOptions.setValueBrackets(key, message);
    });
}

function PGS_summary_init(root = document, options = {}) {
    if (!options || typeof options !== "object" || Array.isArray(options)) {
        throw new TypeError("options must be an object");
    }

    const initialMessages = getInitialMessages(options.message);

    pgs(root).querySelectorAll("summary").forEach((summary) => {
        if (API.has(summary)) return;

        const content = directPgsChild(summary, "summary-content");
        const button = directPgsChild(summary, "summary-button");
        if (!content || !button) return;

        initializeMessages(summary, initialMessages);

        const id = nextSummaryId();
        const contentId = content.id || `summary-content-${id}`;
        content.id = contentId;

        button.type ||= "button";
        button.setAttribute("aria-controls", content.id);

        function isOpen() {
            return pgs(summary).state.contains("open");
        }

        function getCollapsedHeight() {
            return getLineHeight(content) * 3;
        }

        function isOverflowing() {
            return content.scrollHeight > Math.ceil(getCollapsedHeight()) + 1;
        }

        function setExpanded(expanded) {
            const overflow = isOverflowing();

            pgs(summary).state.toggle("overflow", overflow);
            pgs(summary).state.toggle("open", expanded && overflow);

            button.hidden = !overflow;
            button.setAttribute("aria-hidden", String(!overflow));
            button.setAttribute("aria-expanded", String(expanded && overflow));
            button.textContent = pgs(summary).option.getValueBrackets(
                expanded && overflow ? "showLess" : "showMore"
            );

            const nextHeight = expanded && overflow ? content.scrollHeight : getCollapsedHeight();
            content.style.setProperty("--summary-content-max-height", `${nextHeight}px`);
        }

        function refresh() {
            const wasOpen = isOpen();
            content.style.setProperty("--summary-content-max-height", "none");
            setExpanded(wasOpen);
        }

        function toggle() {
            setExpanded(!isOpen());
        }

        button.addEventListener("click", toggle);
        window.addEventListener("resize", refresh, { passive: true });

        refresh();
        requestAnimationFrame(refresh);

        API.set(summary, {
            element: summary,
            content,
            button,
            open: () => setExpanded(true),
            close: () => setExpanded(false),
            toggle,
            refresh,
            isOpen,
        });
    });
}

//# INIT
PGS_onDocumentReady(PGS_summary_init);

//# API
function PGS_summary_api(selector) {
    return API.get(selector);
}

export const PGS_summary = {
    init: PGS_summary_init,
    api: PGS_summary_api
};
