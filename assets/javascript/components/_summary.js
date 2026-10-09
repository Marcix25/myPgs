import { pgs } from "../_pgs.js";
import { PGS_onDocumentReady } from "../helper/_onDocumentReady.js";
import { PGS_directChild, PGS_roots, PGS_uniqueId } from "../helper/_dom.js";
import { PGS_invalid, PGS_warn } from "../helper/_warn.js";

//# SUMMARY
const API = new WeakMap();
const MESSAGE_DEFAULTS = {
    showLess: "Show less",
    showMore: "Show more"
};

// the keys of the message option passed to init(), and the pgs-data key each one is written under
const MESSAGE_DATA_KEYS = {
    showLess: "summaryShowLess",
    showMore: "summaryShowMore"
};

function getLineHeight(element) {
    const style = window.getComputedStyle(element);
    const lineHeight = parseFloat(style.lineHeight);
    if (Number.isFinite(lineHeight)) return lineHeight;

    const fontSize = parseFloat(style.fontSize);
    return Number.isFinite(fontSize) ? fontSize * 1.2 : 0;
}

function validateMessages(value) {
    if (value === undefined) return;
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        throw PGS_invalid("summary.init", "message must be an object");
    }

    Object.entries(value).forEach(([key, message]) => {
        if (!(key in MESSAGE_DEFAULTS)) {
            throw PGS_invalid("summary.init", `unknown message option: ${key}`);
        }
        if (message !== undefined && typeof message !== "string") {
            throw PGS_invalid("summary.init", `message option ${key} must be a string`);
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
    const summaryData = pgs(summary).data;
    Object.entries(messages).forEach(([key, message]) => {
        const dataKey = MESSAGE_DATA_KEYS[key];
        if (summaryData.getValueBrackets(dataKey) === undefined) summaryData.setValueBrackets(dataKey, message);
    });
}

function initializeSummary(summary, initialMessages) {
    if (API.has(summary)) return;

    const content = PGS_directChild(summary, "summary-content");
    const button = PGS_directChild(summary, "summary-button");
    if (!content || !button) {
        PGS_warn("summary.init", "a summary needs a direct summary-content and a direct summary-button child, skipped", summary);
        return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    initializeMessages(summary, initialMessages);

    if (!content.id) content.id = PGS_uniqueId("summary-content");

    button.type ||= "button";
    button.setAttribute("aria-controls", content.id);

    function isOpen() {
        return pgs(summary).state.contains("open");
    }

    // --summary-lines is the author's setting, read here and never written
    function getCollapsedHeight() {
        const lines = parseFloat(window.getComputedStyle(content).getPropertyValue("--summary-lines"));
        return getLineHeight(content) * (Number.isFinite(lines) && lines > 0 ? lines : 3);
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
        button.textContent = pgs(summary).data.getValueBrackets(
            expanded && overflow ? "summaryShowLess" : "summaryShowMore"
        );

        const nextHeight = expanded && overflow ? content.scrollHeight : getCollapsedHeight();
        content.style.setProperty("--_summary-content-height", `${nextHeight}px`);
    }

    //+ measures the content again, keeping it open or closed as it was
    function measure() {
        const wasOpen = isOpen();
        content.style.setProperty("--_summary-content-height", "none");
        setExpanded(wasOpen);
    }

    function toggle() {
        setExpanded(!isOpen());
    }

    button.addEventListener("click", toggle, { signal });

    // a window resize is not the only way content's real size changes: a summary
    // initialized while its own tab/panel is hidden measures a scrollHeight of 0, so it
    // has to redo that measurement once the element actually gets a layout box. A
    // ResizeObserver catches both, throttled to a single pending frame so measure()'s own
    // max-height write doesn't feed back into itself
    let rafId = 0;
    let firstFrameId = 0;
    const resizeObserver = new ResizeObserver(() => {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
            rafId = 0;
            measure();
        });
    });
    resizeObserver.observe(content);

    measure();
    firstFrameId = requestAnimationFrame(measure);

    function destroy() {
        controller.abort();
        resizeObserver.disconnect();
        cancelAnimationFrame(rafId);
        cancelAnimationFrame(firstFrameId);
        API.delete(summary);
    }

    API.set(summary, {
        element: summary,
        content,
        button,
        open: () => setExpanded(true),
        close: () => setExpanded(false),
        toggle,
        destroy,
        refresh: () => {
            destroy();
            initializeSummary(summary, getInitialMessages());
            return API.get(summary);
        },
        isOpen,
    });
}

function PGS_summary_init(root = document, options = {}) {
    if (!options || typeof options !== "object" || Array.isArray(options)) {
        throw PGS_invalid("summary.init", "options must be an object");
    }

    const initialMessages = getInitialMessages(options.message);

    PGS_roots(root, "summary").forEach(summary => initializeSummary(summary, initialMessages));
}

//= INIT
PGS_onDocumentReady(PGS_summary_init);

//= API
function PGS_summary_api(selector) {
    return API.get(selector);
}

export const PGS_summary = {
    init: PGS_summary_init,
    api: PGS_summary_api
};
