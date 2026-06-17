// + dropdown (Popover API)
export function pgs_dropdown() {
    pgs(document).querySelectorAll("dropdown").forEach((DROPDOWN, index) => {
        const BUTTON = pgs(DROPDOWN).querySelector("dropdown-button");
        const CONTENT = pgs(DROPDOWN).querySelector("dropdown-content");

        if (!BUTTON || !CONTENT) return;

        // = INIT
        if (DROPDOWN.getAttribute("data-initialize") === "true") return;
        DROPDOWN.setAttribute("data-initialize", "true");

        // == CSS dropdown-anchor
        const ANCHOR_NAME = `--dropdown-anchor-${index}`;
        DROPDOWN.style.setProperty("--dropdown-anchor", ANCHOR_NAME);

        // == IDs + ACCESSIBILITY
        if (!BUTTON.id) BUTTON.id = `dropdown-btn-${index}`;
        if (!CONTENT.id) CONTENT.id = `dropdown-panel-${index}`;
        BUTTON.setAttribute("type", "button");
        BUTTON.setAttribute("aria-haspopup", "true");
        BUTTON.setAttribute("aria-controls", CONTENT.id);
        BUTTON.setAttribute("aria-expanded", "false");
        CONTENT.setAttribute("aria-labelledby", BUTTON.id);

        // == POPVER SETUP 
        if (!CONTENT.hasAttribute("popover")) CONTENT.setAttribute("popover", "auto");
        BUTTON.setAttribute("popovertarget", CONTENT.id);
        BUTTON.setAttribute("popovertargetaction", "toggle");

        //-( Safari / legacy fallback: popover is in the top layer, so fixed coords are viewport-based.
        const HAS_ANCHOR_POSITIONING =
            CSS.supports("anchor-name: --dropdown-anchor") &&
            CSS.supports("position-anchor: --dropdown-anchor") &&
            CSS.supports("position-area: bottom") &&
            CSS.supports("top: anchor(bottom)");

        const updatePopoverPosition = () => {
            if (HAS_ANCHOR_POSITIONING) return;

            const buttonRect = BUTTON.getBoundingClientRect();
            const style = getComputedStyle(DROPDOWN);
            const offset = parseFloat(style.getPropertyValue("--dropdown-offset")) || 10;
            const padding = parseFloat(style.getPropertyValue("--dropdown-padding")) || 0;
            const arrowSize = parseFloat(style.getPropertyValue("--dropdown-arrow-size")) || 12;
            const viewportGap = 8;
            const viewportWidth = window.innerWidth;
            const maxWidth = viewportWidth - viewportGap * 2;
            const contentStyle = getComputedStyle(CONTENT);
            const cssMaxWidth = parseFloat(contentStyle.maxWidth);
            const dropdownMaxWidth = Number.isFinite(cssMaxWidth) ? Math.min(cssMaxWidth, maxWidth) : maxWidth;
            const contentWidth = Math.min(
                Math.max(CONTENT.scrollWidth + padding * 2, buttonRect.width),
                dropdownMaxWidth
            );
            const top = buttonRect.bottom + offset;
            const centeredLeft = buttonRect.left + buttonRect.width / 2 - contentWidth / 2;
            const left = Math.min(
                Math.max(centeredLeft, viewportGap),
                viewportWidth - contentWidth - viewportGap
            );
            const buttonCenter = buttonRect.left + buttonRect.width / 2;
            const arrowLeft = Math.min(
                Math.max(buttonCenter - left, padding + arrowSize),
                contentWidth - padding - arrowSize
            );

            DROPDOWN.style.setProperty("--dropdown-fallback-top", `${top}px`);
            DROPDOWN.style.setProperty("--dropdown-fallback-left", `${left}px`);
            DROPDOWN.style.setProperty("--dropdown-arrow-left", `${arrowLeft}px`);
        };

        BUTTON.addEventListener("click", e => {
            if (HAS_ANCHOR_POSITIONING) return;

            e.preventDefault();
            if (CONTENT.matches(":popover-open")) {
                CONTENT.hidePopover();
                return;
            }

            updatePopoverPosition();
            CONTENT.showPopover();
        });

        // == sync ARIA + data-open quando apre/chiude
        CONTENT.addEventListener("toggle", e => {
            const open = CONTENT.matches(":popover-open");
            BUTTON.setAttribute("aria-expanded", open ? "true" : "false");
            pgs(DROPDOWN).state.toggle("open", open);
            if (open) {
                updatePopoverPosition();
                CONTENT.querySelector('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')?.focus();
            }
        });

        window.addEventListener("resize", () => {
            if (CONTENT.matches(":popover-open")) updatePopoverPosition();
        });
        window.addEventListener("scroll", () => {
            if (CONTENT.matches(":popover-open")) updatePopoverPosition();
        }, true);
    });
}

// # INIT
pgs_dropdown();
