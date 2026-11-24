import { pgs } from "../_pgs.js";
import { PGS_invalid } from "./_warn.js";

// the elements a module's init(root) has to look at: the root itself when it carries the token,
// then everything under it. Every module resolves its roots through here, so pgs.helper.init(el) on a
// node that was just inserted behaves the same whichever component the node is. `token` takes the
// same string or array that pgs().querySelectorAll does, a comma-separated string included, which is
// split here too so the check on the root itself sees each token. `scope` names the call in the
// error, so a module can pass its own ("menu.init")
export function PGS_roots(root, token, scope = "helper.roots") {
    if (!(root instanceof Document || root instanceof Element)) {
        throw PGS_invalid(scope, "root must be a Document or an Element");
    }

    const tokens = [].concat(token).flatMap(item => String(item).split(",")).map(item => item.trim()).filter(Boolean);
    const roots = Array.from(pgs(root).querySelectorAll(tokens));

    if (root instanceof Element && tokens.some(item => pgs(root).contains(item))) roots.unshift(root);
    return roots;
}

// the children of `parent` (not the descendants) that carry the token, or any of them; the token
// takes the same forms as in PGS_roots
export function PGS_directChildren(parent, token) {
    const tokens = [].concat(token).flatMap(item => String(item).split(",")).map(item => item.trim()).filter(Boolean);
    return Array.from(parent.children).filter(child => tokens.some(item => pgs(child).contains(item)));
}

// the first of them, or null
export function PGS_directChild(parent, token) {
    return PGS_directChildren(parent, token)[0] || null;
}

// "prefix-1", "prefix-2", ... one counter per prefix, for the ids a module generates
const ID_COUNTERS = new Map();

export function PGS_uniqueId(prefix) {
    const next = (ID_COUNTERS.get(prefix) || 0) + 1;
    ID_COUNTERS.set(prefix, next);
    return `${prefix}-${next}`;
}

// every pgs:* event goes through here: it bubbles, and its detail always carries the element it
// was dispatched on, next to whatever the module adds. Pass { cancelable: true } only for an
// event whose default action the author can stop (pgs:alert:buttonClick)
export function PGS_dispatch(target, name, detail = {}, { cancelable = false } = {}) {
    const event = new CustomEvent(name, { bubbles: true, cancelable, detail: { element: target, ...detail } });
    target.dispatchEvent(event);
    return event;
}
