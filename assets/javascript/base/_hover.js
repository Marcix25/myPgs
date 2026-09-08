import { pgs } from "../_pgs.js";
import { PGS_onDocumentReady } from "../helper/_onDocumentReady.js";

//# HOVER
//== every clickable surface of the library shares the same hover treatment, and it is written once
//== in SCSS under [pgs~=hover]. The component selectors no longer repeat it: this module marks the
//== surfaces that are clickable by definition, so the author keeps writing only the component token
//== while the element still carries a real pgs value that SCSS, JavaScript and the inspector read.

//+ tokens that get the hover treatment, with the extra condition each one has to satisfy
const HOVER_TARGETS = {
    //== a button is clickable whatever its tag
    button: () => true,
    //== a card or a box is only a clickable surface when it is a link
    card: element => element.tagName === "A",
    box: element => element.tagName === "A"
};

const TOKENS = Object.keys(HOVER_TARGETS);

//== only what this module added is ever taken back: a "hover" written by hand belongs to the author
//== and stays, whatever the element turns into later
const MARKED = new WeakSet();

//+ SYNC HOVER
function syncHover(element) {
    if (!(element instanceof Element)) return;

    //== hoverNot is the one opt-out, written on the element whatever the component: a surface that
    //== must not answer the pointer is never marked, and SCSS guards a "hover" written by hand
    const clickable = !pgs(element).option.contains("hoverNot")
        && TOKENS.some(token => pgs(element).contains(token) && HOVER_TARGETS[token](element));

    if (clickable) {
        if (pgs(element).contains("hover")) return;
        pgs(element).add("hover");
        MARKED.add(element);
        return;
    }

    if (!MARKED.has(element)) return;
    MARKED.delete(element);
    pgs(element).remove("hover");
}

//= INIT
function initHover(root = document) {
    if (!(root instanceof Document || root instanceof Element)) {
        throw new TypeError("pgs.hover.init(): root deve essere un Document o un Element");
    }

    if (root instanceof Element) syncHover(root);
    pgs(root).querySelectorAll(TOKENS).forEach(syncHover);

    return root;
}

PGS_onDocumentReady(initHover);

//= WATCH
//== the surfaces to mark do not all exist when the page is ready: the library injects its own
//== markup (a toast, a notification row, the cookie banner) and an author can add or remove a token
//== at runtime. The watch stays on, batched per frame, and re-marking is idempotent so the pass our
//== own attribute write triggers back settles at once
const PENDING = new Set();
let hoverScanRafId = 0;

function scheduleSync(nodes) {
    nodes.forEach(node => PENDING.add(node));
    if (hoverScanRafId) return;

    hoverScanRafId = requestAnimationFrame(() => {
        hoverScanRafId = 0;
        const roots = [...PENDING];
        PENDING.clear();
        roots.forEach(root => root.isConnected && initHover(root));
    });
}

const hoverObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.type === "attributes") {
            scheduleSync([mutation.target]);
            return;
        }

        scheduleSync([...mutation.addedNodes].filter(node => node instanceof Element));
    });
});

hoverObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["pgs", "pgs-option"]
});

//# EXPORT
export const PGS_hover = {
    init: initHover
};
