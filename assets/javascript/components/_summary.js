//= SUMMARY
const API = new WeakMap();
let summaryId = 0;

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

function PGS_summary_init(root = document) {
    pgs(root).querySelectorAll("summary").forEach((summary) => {
        if (API.has(summary)) return;

        const content = directPgsChild(summary, "summary-content");
        const button = directPgsChild(summary, "summary-button");
        if (!content || !button) return;

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
            button.textContent = expanded && overflow ? "Mostra meno" : "Mostra di più";

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
PGS_summary_init();

//# API
function PGS_summary_api(selector) {
    return API.get(selector);
}

export const PGS_summary = {
    init: PGS_summary_init,
    api: PGS_summary_api
};
