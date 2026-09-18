//+ shared helpers for the "key", "key['flag' ...]" and "key[payload]" bracket syntax — used by
//+ the pgs attribute itself and by every pgs-data accessor below, so a fix here fixes all of them
const BracketToken = {
    //+ the part before an opening "[", or the whole token when there is none
    key(value) {
        return String(value).trim().match(/^[^\s[\]]+/)?.[0] || "";
    },

    //+ every quoted 'flag' inside a token's own ['flag' ...] bracket
    flags(token) {
        const open = token.indexOf("[");
        return open === -1 ? [] : [...token.slice(open + 1).matchAll(/'([^']+)'/g)].map(match => match[1]);
    },

    //+ rebuilds "key['flag' ...]", or the bare key when there is nothing to carry
    component(key, flags) {
        return flags.length ? `${key}[${[...new Set(flags)].map(flag => `'${flag}'`).join(" ")}]` : key;
    },

    //+ index of the "]" matching the "[" at openIndex, counting nested brackets and ignoring any "[" / "]" inside a JSON string (respects \" escapes)
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

    //+ splits a pgs or pgs-data value into tokens, keeping "key[...]" whole even when the payload contains its own [...] (e.g. a JSON array)
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

//+ read/rebuild helper for one element's attribute, in bracket-token form: shared by the pgs
//+ attribute and by every pgs-data accessor, since each of them only ever reads/writes its own
//+ element this way — traversal code that needs an arbitrary element reads it directly instead
function createBracketAttribute(element, attribute) {
    return {
        read: () => BracketToken.split(element.getAttribute(attribute) || ""),
        write(values) {
            if (values.length) element.setAttribute(attribute, values.join(" "));
            else element.removeAttribute(attribute);
        },
    };
}

/**
 * @param {Element | Document} root
*/
export function pgs(root) {
    const ATTR = "pgs";
    if (!root) throw new TypeError("pgs(root): root is required");

    const canAttr = typeof root.getAttribute === "function" && typeof root.setAttribute === "function";
    const canQuery = typeof root.querySelector === "function" && typeof root.querySelectorAll === "function";

    if (!canQuery) {
        throw new TypeError("pgs(root): root must support querySelector/querySelectorAll");
    }

    //+
    function attrOnlyForElements(methodName) {
        throw new TypeError(`pgs(${root.nodeName || "root"}).${methodName}(): available on an Element only, not on a Document`);
    };

    //+
    function concactSelector(value, attribute = ATTR) {
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

    //= PGS
    function createPgs() {
        const store = createBracketAttribute(root, ATTR);

        function api() {
            return api;
        }

        api.querySelector = function (value) {
            return root.querySelector(concactSelector(value));
        };

        api.querySelectorAll = function (value) {
            return root.querySelectorAll(concactSelector(value));
        };

        api.closest = function (value) {
            if (!canAttr) return attrOnlyForElements("closest");
            return root.closest(concactSelector(value));
        };

        api.add = function (...values) {
            if (!canAttr) return attrOnlyForElements("add");
            const current = store.read();
            for (const token of values.flatMap(value => BracketToken.split(String(value)))) {
                const key = BracketToken.key(token);
                const index = current.findIndex(item => BracketToken.key(item) === key);
                if (index === -1) current.push(token);
                else current[index] = BracketToken.component(key, [...BracketToken.flags(current[index]), ...BracketToken.flags(token)]);
            }
            store.write(current);
            return api;
        };

        api.remove = function (...values) {
            if (!canAttr) return attrOnlyForElements("remove");
            const keys = values.flatMap(value => BracketToken.split(String(value))).map(BracketToken.key);
            store.write(store.read().filter(v => !keys.includes(BracketToken.key(v))));
            return api;
        };

        api.toggle = function (value, force) {
            if (!canAttr) return attrOnlyForElements("toggle");

            const exists = api.contains(value);

            if (force !== undefined) {
                if (force && !exists) api.add(value);
                if (!force && exists) api.remove(value);
                return !!force;
            }

            if (exists) {
                api.remove(value);
                return false;
            }

            api.add(value);
            return true;
        };

        api.contains = function (value) {
            if (!canAttr) return attrOnlyForElements("contains");
            return store.read().some(token => BracketToken.key(token) === BracketToken.key(value));
        };

        Object.defineProperty(api, "value", {
            get() {
                if (!canAttr) return undefined;
                return root.getAttribute(ATTR);
            },
            set(v) {
                if (!canAttr) return attrOnlyForElements("value");
                root.setAttribute(ATTR, v);
            }
        });

        return api;
    }

    //= STATE
    function createState(attribute) {
        if (!canAttr) return undefined;

        const read = (sep = " ") =>
            (root.getAttribute(attribute) || "").split(sep).filter(Boolean);

        const write = (vals, sep = " ") =>
            root.setAttribute(attribute, vals.join(sep));

        // funzione chiamabile: state("active") == add("active")
        function api(...values) {
            api.add(...values);
            return api;
        }

        api.add = function (...values) {
            const toAdd = values.flat().map(v => String(v).trim()).filter(Boolean);
            const current = read();
            for (const v of toAdd) if (!current.includes(v)) current.push(v);
            write(current);
            return api;
        };

        api.remove = function (...values) {
            const toRemove = values.flat().map(v => String(v).trim()).filter(Boolean);
            const current = read().filter(v => !toRemove.includes(v));
            write(current);
            return api;
        };

        api.toggle = function (value, force) {
            const v = String(value).trim();
            if (!v) return false;
            const current = read();
            const exists = current.includes(v);

            if (force !== undefined) {
                if (force && !exists) {
                    current.push(v);
                    write(current);
                }

                if (!force && exists) {
                    write(current.filter(x => x !== v));
                }

                return !!force;
            }

            if (exists) {
                write(current.filter(x => x !== v));
                return false;
            }
            
            current.push(v);
            write(current);
            return true;
        };

        api.contains = function (value) {
            const v = String(value).trim();
            if (!v) return false;
            return read().includes(v);
        };

        api.querySelector = function (value) {
            return root.querySelector(concactSelector(value, attribute));
        };

        api.querySelectorAll = function (value) {
            return root.querySelectorAll(concactSelector(value, attribute));
        };

        api.closest = function (value) {
            return root.closest(concactSelector(value, attribute));
        };

        Object.defineProperty(api, "value", {
            get() { return root.getAttribute(attribute); },
            set(v) { root.setAttribute(attribute, v); }
        });

        return api;
    }

    //= OPTION
    /// flags only, and only inside the pgs attribute — never pgs-data. add/toggle derive a
    /// flag's owning component from its own name (the lowercase run before the first uppercase
    /// letter or "-", the naming convention every component-owned flag already follows) and
    /// merge into that component's existing bracket; a flag with no matching owner on the
    /// element becomes its own bare pgs token instead, the same way "hover" already is one.
    function createOption() {
        if (!canAttr) return undefined;

        const store = createBracketAttribute(root, ATTR);
        const getValues = values => values
            .flat()
            .flatMap(value => BracketToken.split(String(value)))
            .filter(Boolean)
            .map(BracketToken.key);

        function ownerOf(key) {
            return key.match(/^[a-z]+/)?.[0] || "";
        }

        function api() {
            return api;
        }

        api.add = function (...values) {
            const current = store.read();
            getValues(values).forEach(key => {
                const owner = ownerOf(key);
                const index = owner ? current.findIndex(item => BracketToken.key(item) === owner) : -1;
                if (index === -1) {
                    if (!current.some(item => BracketToken.key(item) === key)) current.push(key);
                } else {
                    current[index] = BracketToken.component(owner, [...BracketToken.flags(current[index]), key]);
                }
            });
            store.write(current);
            return api;
        };

        api.remove = function (...values) {
            const keys = getValues(values);
            if (!keys.length) return api;

            store.write(store.read()
                .filter(token => !keys.includes(BracketToken.key(token)))
                .map(token => BracketToken.component(BracketToken.key(token),
                    BracketToken.flags(token).filter(flag => !keys.includes(flag)))));
            return api;
        };

        api.toggle = function (value, force) {
            const key = BracketToken.key(value);
            if (!key) return false;

            const exists = api.contains(key);

            if (force !== undefined) {
                if (force && !exists) api.add(value);
                if (!force && exists) api.remove(key);
                return !!force;
            }

            if (exists) {
                api.remove(key);
                return false;
            }

            api.add(value);
            return true;
        };

        api.contains = function (key) {
            const safeKey = String(key).trim();
            return store.read().some(token => BracketToken.key(token) === safeKey || BracketToken.flags(token).includes(safeKey));
        };

        const getKeys = value => (Array.isArray(value) ? value.join(",") : String(value))
            .split(",")
            .map(v => BracketToken.key(v))
            .filter(Boolean);

        const hasKeys = (element, keys) => BracketToken.split(element.getAttribute(ATTR) || "")
            .some(token => keys.includes(BracketToken.key(token)) || BracketToken.flags(token).some(flag => keys.includes(flag)));

        api.querySelector = function (value) {
            const keys = getKeys(value);
            if (!keys.length) return null;

            for (const element of root.querySelectorAll(`[${ATTR}]`)) {
                if (hasKeys(element, keys)) return element;
            }

            return null;
        };

        //== an Array, where every other querySelectorAll returns a NodeList: the match is computed
        //== here instead of by the engine, so there is no live list to hand back
        api.querySelectorAll = function (value) {
            const keys = getKeys(value);
            if (!keys.length) return [];
            return Array.from(root.querySelectorAll(`[${ATTR}]`)).filter(element => hasKeys(element, keys));
        };

        api.closest = function (value) {
            const keys = getKeys(value);
            if (!keys.length) return null;

            for (let element = root; element; element = element.parentElement) {
                if (hasKeys(element, keys)) return element;
            }

            return null;
        };

        return api;
    }

    //= DATA — key[payload] values only, always in this attribute; never touches the pgs bracket.
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

        //== a plain passthrough on this attribute, like state's and the base pgs's own value: a
        //== bracket flag is never read or written back through here, only this attribute ever is.
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

const PGS_IMPORTS = {};

function registerImportModule(name, module) {
    const key = String(name || "").trim().replace(/^pgs[_-\s]*/i, "").toLowerCase();

    if (!key) throw new TypeError("pgs.registerImport(...modules): every module needs a name or a PGS_name");

    PGS_IMPORTS[key] = {
        name,
        module
    };
}

pgs.registerImport = function (...modules) {
    modules.flat().forEach(item => {
        if (item && typeof item === "object" && !item.PGS_name && !item.name) {
            Object.entries(item).forEach(([name, module]) => registerImportModule(name, module));
            return;
        }

        registerImportModule(item?.PGS_name || item?.name, item);
    });

    return pgs;
};

pgs.registerModules = function (modules = {}) {
    Object.entries(modules).forEach(([name, module]) => {
        const key = String(name || "").trim();
        if (!key) return;

        const hasOwn = Object.prototype.hasOwnProperty.call(pgs, key);
        if (hasOwn && pgs[key] !== module) {
            throw new Error(`pgs.registerModules(): "${key}" is already defined on pgs`);
        }

        pgs[key] = module;
    });

    return pgs;
};

pgs.import = function (...names) {
    return names.flat().reduce((imports, name) => {
        const key = String(name || "").trim().replace(/^pgs[_-\s]*/i, "").toLowerCase();
        const item = PGS_IMPORTS[key];

        if (!item) throw new Error(`pgs.import(): module "${name}" is not registered`);

        imports[item.name] = item.module;
        return imports;
    }, {});
};

globalThis.pgs ??= pgs;

//== published under the package name too, distinct from the pgs() helper above, so a separate
//== webpack build can mark "mypgs" as external and resolve it to this at runtime instead of
//== bundling (and re-running) a whole second copy of the library
globalThis.mypgs ??= { pgs };
