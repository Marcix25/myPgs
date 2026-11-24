import { PGS_directChild, PGS_directChildren, PGS_dispatch, PGS_roots, PGS_uniqueId } from "./helper/_dom.js";
import { PGS_onDocumentReady } from "./helper/_onDocumentReady.js";
import { PGS_escapeHtml, PGS_formatText, PGS_normalizeText } from "./helper/_text.js";
import { PGS_rafThrottle, PGS_watchDocument } from "./helper/_throttle.js";
import { PGS_invalid, PGS_warn } from "./helper/_warn.js";

// shared helpers for the "key", "key['flag' ...]" and "key[payload]" bracket syntax — used by
// the pgs attribute itself and by every pgs-data accessor below, so a fix here fixes all of them
const BracketToken = {
    // the part before an opening "[", or the whole token when there is none
    key(value) {
        return String(value).trim().match(/^[^\s[\]]+/)?.[0] || "";
    },

    // every quoted 'flag' inside a token's own ['flag' ...] bracket
    flags(token) {
        const open = token.indexOf("[");
        return open === -1 ? [] : [...token.slice(open + 1).matchAll(/'([^']+)'/g)].map(match => match[1]);
    },

    // rebuilds "key['flag' ...]", or the bare key when there is nothing to carry
    component(key, flags) {
        return flags.length ? `${key}[${[...new Set(flags)].map(flag => `'${flag}'`).join(" ")}]` : key;
    },

    // index of the "]" matching the "[" at openIndex, counting nested brackets and ignoring any "[" / "]" inside a JSON string (respects \" escapes)
    findClose(source, openIndex) {
        let depth = 0;
        let inString = false;
        let escaped = false;

        for (let i = openIndex; i < source.length; i++) {
            const char = source[i];

            if (escaped) {
                escaped = false;
                continue;
            }

            if (inString) {
                if (char === "\\") escaped = true;
                else if (char === "\"") inString = false;
                continue;
            }

            if (char === "\"") inString = true;
            else if (char === "[") depth++;
            else if (char === "]") {
                depth--;
                if (depth === 0) return i;
            }
        }

        return -1;
    },

    // splits a pgs or pgs-data value into tokens, keeping "key[...]" whole even when the payload contains its own [...] (e.g. a JSON array)
    split(source) {
        const tokens = [];
        let i = 0;

        while (i < source.length) {
            while (i < source.length && /\s/.test(source[i])) i++;
            if (i >= source.length) break;

            const start = i;
            while (i < source.length && !/\s/.test(source[i]) && source[i] !== "[") i++;

            if (i < source.length && source[i] === "[") {
                const close = this.findClose(source, i);
                i = close === -1 ? source.length : close + 1;
            }

            if (i > start) tokens.push(source.slice(start, i));
        }

        return tokens;
    },
};

// read/rebuild helper for one element's attribute, in bracket-token form: shared by the pgs
// attribute and by every pgs-data accessor, since each of them only ever reads/writes its own
// element this way — traversal code that needs an arbitrary element reads it directly instead
function createBracketAttribute(element, attribute) {
    return {
        read: () => BracketToken.split(element.getAttribute(attribute) || ""),
        // nothing is written when the value stays the same, so a call that changes nothing (removing an
        // option that is not there) fires no attribute mutation for an observer to react to
        write(values) {
            const value = values.length ? values.join(" ") : null;
            if (value === element.getAttribute(attribute)) return;
            if (value === null) element.removeAttribute(attribute);
            else element.setAttribute(attribute, value);
        },
    };
}

/**
 * @param {Element | Document} root
 */
export function pgs(root) {
    const ATTR = "pgs";
    if (!root) throw PGS_invalid("pgs", "root is required");

    const canAttr = typeof root.getAttribute === "function" && typeof root.setAttribute === "function";
    const canQuery = typeof root.querySelector === "function" && typeof root.querySelectorAll === "function";

    if (!canQuery) {
        throw PGS_invalid("pgs", "root must support querySelector/querySelectorAll");
    }

    function attrOnlyForElements(methodName) {
        throw PGS_invalid("pgs", `${methodName}() is available on an Element only, not on ${root.nodeName || "a Document"}`);
    }

    function concatSelector(value, attribute = ATTR) {
        if (Array.isArray(value)) value = value.join(",");
        return String(value)
            .split(",")
            .map(v => v.trim())
            .filter(Boolean)
            .map(v => {
                const escaped = v.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
                return attribute === ATTR
                    ? `:is([pgs~="${escaped}"], [pgs*="${escaped}\\5B"])`
                    : `[${attribute}~="${escaped}"]`;
            })
            .join(",");
    }

    // one name per argument: a component, a state or an option is a single word. An array, a list in
    // one string or a bracket would be read as something else, so each one is refused with the form to
    // write instead of landing in the attribute where the CSS never matches it
    function word(scope, value, what, hint) {
        if (Array.isArray(value)) throw PGS_invalid(scope, `pass each ${what} as its own argument, not an array`);
        if (typeof value !== "string") throw PGS_invalid(scope, `${what} must be a string`);
        const name = value.trim();
        if (!name) throw PGS_invalid(scope, `${what} must not be empty`);
        if (/\s/.test(name)) throw PGS_invalid(scope, `"${name}" holds a space: pass each ${what} as its own argument`);
        if (/[[\]'"]/.test(name)) throw PGS_invalid(scope, `"${name}" holds a bracket or a quote: ${hint}`);
        return name;
    }

    //# PGS
    // components only: a component is added, removed and checked by its name, and its options go
    // through option("component")
    function createPgs() {
        const store = createBracketAttribute(root, ATTR);
        const HINT = 'a component is added alone and its options through option(): pgs(el).add("button").option("button").add("btnMini")';
        const component = (method, value) => word(method, value, "component", HINT);

        function api() {
            return api;
        }

        api.querySelector = function (value) {
            return root.querySelector(concatSelector(value));
        };

        api.querySelectorAll = function (value) {
            return root.querySelectorAll(concatSelector(value));
        };

        api.closest = function (value) {
            if (!canAttr) return attrOnlyForElements("closest");
            return root.closest(concatSelector(value));
        };

        // a component already there keeps its bracket as it is
        api.add = function (...names) {
            if (!canAttr) return attrOnlyForElements("add");
            const keys = names.map(name => component("add", name));
            const current = store.read();
            keys.forEach(key => {
                if (!current.some(token => BracketToken.key(token) === key)) current.push(key);
            });
            store.write(current);
            return api;
        };

        // the component goes with its bracket
        api.remove = function (...names) {
            if (!canAttr) return attrOnlyForElements("remove");
            const keys = names.map(name => component("remove", name));
            store.write(store.read().filter(token => !keys.includes(BracketToken.key(token))));
            return api;
        };

        api.toggle = function (name, force) {
            if (!canAttr) return attrOnlyForElements("toggle");
            const key = component("toggle", name);
            const on = force === undefined ? !api.contains(key) : !!force;
            if (on) api.add(key);
            else api.remove(key);
            return on;
        };

        // true for the component bare or with its bracket: contains("button") on button['btnMini']
        api.contains = function (name) {
            if (!canAttr) return attrOnlyForElements("contains");
            const key = component("contains", name);
            return store.read().some(token => BracketToken.key(token) === key);
        };

        Object.defineProperty(api, "value", {
            get() {
                if (!canAttr) return undefined;
                return root.getAttribute(ATTR);
            },
            // null removes the attribute, like data's value, instead of writing the string "null"
            set(v) {
                if (!canAttr) return attrOnlyForElements("value");
                if (v == null) root.removeAttribute(ATTR);
                else root.setAttribute(ATTR, v);
            }
        });

        return api;
    }

    //# STATE
    function createState(attribute) {
        if (!canAttr) return undefined;

        const HINT = "a state is a single word";
        const state = (method, value) => word(`state.${method}`, value, "state", HINT);

        const read = () => (root.getAttribute(attribute) || "").split(" ").filter(Boolean);

        // an empty list removes the attribute, so a state taken off leaves no pgs-state=""; an unchanged
        // value is not written again
        const write = vals => {
            const value = vals.length ? vals.join(" ") : null;
            if (value === root.getAttribute(attribute)) return;
            if (value === null) root.removeAttribute(attribute);
            else root.setAttribute(attribute, value);
        };

        const api = {};

        api.add = function (...values) {
            const toAdd = values.map(value => state("add", value));
            const current = read();
            for (const v of toAdd) if (!current.includes(v)) current.push(v);
            write(current);
            return api;
        };

        api.remove = function (...values) {
            const toRemove = values.map(value => state("remove", value));
            write(read().filter(v => !toRemove.includes(v)));
            return api;
        };

        api.toggle = function (value, force) {
            const v = state("toggle", value);
            const on = force === undefined ? !read().includes(v) : !!force;
            if (on) api.add(v);
            else api.remove(v);
            return on;
        };

        api.contains = function (value) {
            return read().includes(state("contains", value));
        };

        api.querySelector = function (value) {
            return root.querySelector(concatSelector(value, attribute));
        };

        api.querySelectorAll = function (value) {
            return root.querySelectorAll(concatSelector(value, attribute));
        };

        api.closest = function (value) {
            return root.closest(concatSelector(value, attribute));
        };

        Object.defineProperty(api, "value", {
            get() { return root.getAttribute(attribute); },
            // null removes the attribute, like data's value, instead of writing the string "null"
            set(v) {
                if (v == null) root.removeAttribute(attribute);
                else root.setAttribute(attribute, v);
            }
        });

        return api;
    }

    //# OPTION
    // the options of one component, always named: option("button") reads and writes only the bracket of
    // button, never pgs-data. Nothing guesses the owner of an option from its name, so btnMini goes where
    // it is told, and an element without the component gets an error instead of a stray token
    function createOption() {
        if (!canAttr) return undefined;

        const store = createBracketAttribute(root, ATTR);

        return function option(name) {
            const key = word("option", name, "component", 'name the component alone: option("button")');
            const scope = method => `option("${key}").${method}`;
            const flag = (method, value) => word(scope(method), value, "option", 'an option is a single word: option("button").add("btnMini")');
            const find = tokens => tokens.findIndex(token => BracketToken.key(token) === key);

            const api = {};

            // an option goes into the bracket of a component the element has: the component itself is
            // added by pgs(el).add(), so a misspelled name is an error and not a component nobody styles
            api.add = function (...values) {
                const flags = values.map(value => flag("add", value));
                if (!flags.length) return api;

                const current = store.read();
                const index = find(current);
                if (index === -1) {
                    throw PGS_invalid(scope("add"), `the element has no ${key}: add it first with pgs(el).add("${key}")`);
                }

                current[index] = BracketToken.component(key, [...BracketToken.flags(current[index]), ...flags]);
                store.write(current);
                return api;
            };

            // the component stays, bare when its last option goes; nothing to remove is not an error
            api.remove = function (...values) {
                const flags = values.map(value => flag("remove", value));
                const current = store.read();
                const index = find(current);
                if (index === -1) return api;

                current[index] = BracketToken.component(key, BracketToken.flags(current[index]).filter(item => !flags.includes(item)));
                store.write(current);
                return api;
            };

            api.toggle = function (value, force) {
                const item = flag("toggle", value);
                const on = force === undefined ? !api.contains(item) : !!force;
                if (on) api.add(item);
                else api.remove(item);
                return on;
            };

            api.contains = function (value) {
                const item = flag("contains", value);
                const token = store.read().find(entry => BracketToken.key(entry) === key);
                return Boolean(token) && BracketToken.flags(token).includes(item);
            };

            // the options written in the bracket now, as a copy: an empty array for a bare component or
            // an element without it (pgs(el).contains() tells the two apart)
            api.list = function () {
                const token = store.read().find(entry => BracketToken.key(entry) === key);
                return token ? BracketToken.flags(token) : [];
            };

            return api;
        };
    }

    //# DATA
    // key[payload] values only, always in this attribute; never touches the pgs bracket.
    function createData(attribute) {
        if (!canAttr) return undefined;

        const store = createBracketAttribute(root, attribute);

        function api() {
            return api;
        }

        api.getValueBrackets = function (key) {
            const safeKey = String(key).trim();
            const token = store.read().find(item => BracketToken.key(item) === safeKey);
            if (!token) return undefined;

            const openIndex = token.indexOf("[");
            const closeIndex = openIndex === -1 ? -1 : BracketToken.findClose(token, openIndex);
            if (closeIndex === -1) return undefined;

            return token.slice(openIndex + 1, closeIndex);
        };

        api.setValueBrackets = function (key, value = "") {
            const dataKey = BracketToken.key(key);
            if (!dataKey) return api;

            const entry = `${dataKey}[${String(value).trim()}]`;
            const entries = store.read().filter(item => BracketToken.key(item) !== dataKey);

            entries.push(entry);
            store.write(entries);
            return api;
        };

        // a plain passthrough on this attribute, like state's and the base pgs's own value: a
        // bracket flag is never read or written back through here, only this attribute ever is.
        Object.defineProperty(api, "value", {
            get() { return root.getAttribute(attribute); },
            set(value) {
                if (value == null) root.removeAttribute(attribute);
                else root.setAttribute(attribute, value);
            }
        });

        return api;
    }

    //# RETURN
    const api = createPgs();
    api.state = createState("pgs-state");
    api.option = createOption();
    api.data = createData("pgs-data");
    return api;
}

// every helper a module or a theme can call, as pgs.helper.<name>. It is filled here, before any
// module runs, so it is there even for the code that executes while the modules are being imported;
// init and formValidate join it in _imports.js, since they depend on the registered modules
pgs.helper = {
    roots: PGS_roots,
    directChild: PGS_directChild,
    directChildren: PGS_directChildren,
    uniqueId: PGS_uniqueId,
    dispatch: PGS_dispatch,
    rafThrottle: PGS_rafThrottle,
    watchDocument: PGS_watchDocument,
    onDocumentReady: PGS_onDocumentReady,
    escapeHtml: PGS_escapeHtml,
    formatText: PGS_formatText,
    normalizeText: PGS_normalizeText,
    warn: PGS_warn,
    invalid: PGS_invalid,
};

pgs.registerModules = function (modules = {}) {
    Object.entries(modules).forEach(([name, module]) => {
        const key = String(name || "").trim();
        if (!key) return;

        const hasOwn = Object.prototype.hasOwnProperty.call(pgs, key);
        if (hasOwn && pgs[key] !== module) {
            throw PGS_invalid("registerModules", `"${key}" is already defined on pgs`);
        }

        pgs[key] = module;
    });

    return pgs;
};

globalThis.pgs ??= pgs;

// published under the package name too, distinct from the pgs() helper above, so a separate
// webpack build can mark "mypgs" as external and resolve it to this at runtime instead of
// bundling (and re-running) a whole second copy of the library
globalThis.mypgs ??= { pgs };
