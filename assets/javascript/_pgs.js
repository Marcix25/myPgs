//+ index of the "]" matching the "[" at openIndex, counting nested brackets and ignoring any "[" / "]" inside a JSON string (respects \" escapes)
function findMatchingBracket(source, openIndex) {
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
}

//+ splits a pgs-option value into tokens, keeping "key[...]" whole even when the payload contains its own [...] (e.g. a JSON array)
function tokenizeOptionValue(source) {
    const tokens = [];
    let i = 0;

    while (i < source.length) {
        while (i < source.length && /\s/.test(source[i])) i++;
        if (i >= source.length) break;

        const start = i;
        while (i < source.length && !/\s/.test(source[i]) && source[i] !== "[") i++;

        if (i < source.length && source[i] === "[") {
            const close = findMatchingBracket(source, i);
            i = close === -1 ? source.length : close + 1;
        }

        if (i > start) tokens.push(source.slice(start, i));
    }

    return tokens;
}

/**
 * @param {Element | Document} root
*/
export function pgs(root) {
    const ATTR = "pgs";
    if (!root) throw new TypeError("pgs(root): root richiesto");

    const canAttr = typeof root.getAttribute === "function" && typeof root.setAttribute === "function";
    const canQuery = typeof root.querySelector === "function" && typeof root.querySelectorAll === "function";

    if (!canQuery) {
        throw new TypeError("pgs(root): root deve supportare querySelector/querySelectorAll");
    }

    //+
    function attrOnlyForElements(methodName) {
        throw new TypeError(`pgs(${root.nodeName || "root"}).${methodName}(): disponibile solo su Element (non su Document)`);
    };

    //+
    function concactSelector(value) {
        if (Array.isArray(value)) value = value.join(",");
        return String(value)
            .split(",")
            .map(v => v.trim())
            .filter(Boolean)
            .map(v => `[${ATTR}~="${v}"]`)
            .join(",");
    }

    //+
    function getValues(el, separator = " ") {
        return (el.getAttribute(ATTR) || "")
            .split(separator)
            .filter(Boolean);
    }

    //+
    function setValues(el, values, separator = " ") {
        el.setAttribute(ATTR, values.join(separator));
    }

    //= BASE PGS 
    function createBasePgs() {
        function api() {
            return api;
        }

        api.querySelector = function (value) {
            return root.querySelector(concactSelector(value));
        };

        api.querySelectorAll = function (value) {
            return root.querySelectorAll(concactSelector(value));
        };

        api.add = function (...values) {
            if (!canAttr) return attrOnlyForElements("add");
            const current = getValues(root);
            for (const v of values) if (!current.includes(v)) current.push(v);
            setValues(root, current);
            return api;
        };

        api.remove = function (...values) {
            if (!canAttr) return attrOnlyForElements("remove");
            setValues(root, getValues(root).filter(v => !values.includes(v)));
            return api;
        };

        api.toggle = function (value, force) {
            if (!canAttr) return attrOnlyForElements("toggle");

            const exists = getValues(root).includes(value);

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
            return getValues(root).includes(value);
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

        Object.defineProperty(api, "value", {
            get() { return root.getAttribute(attribute); },
            set(v) { root.setAttribute(attribute, v); }
        });

        return api;
    }

    //= OPTION
    function createOption(attribute) {
        if (!canAttr) return undefined;

        const read = () => tokenizeOptionValue(root.getAttribute(attribute) || "");
        const write = values => root.setAttribute(attribute, values.join(" "));
        const getKey = value => String(value).trim().match(/^[^\s[\]]+/)?.[0] || "";
        const getValues = values => values
            .flat()
            .flatMap(value => tokenizeOptionValue(String(value)))
            .filter(Boolean);

        function api() {
            return api;
        }

        api.add = function (...values) {
            const current = read();

            getValues(values).forEach(value => {
                if (!current.includes(value)) current.push(value);
            });

            write(current);
            return api;
        };

        api.remove = function (...values) {
            const keys = getValues(values).map(getKey).filter(Boolean);
            write(read().filter(value => !keys.includes(getKey(value))));
            return api;
        };

        api.toggle = function (value, force) {
            const key = getKey(value);
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
            return read().some(token => getKey(token) === safeKey);
        };

        api.getValueBrackets = function (key) {
            const safeKey = String(key).trim();
            const token = read().find(item => getKey(item) === safeKey);
            if (!token) return undefined;

            const openIndex = token.indexOf("[");
            const closeIndex = openIndex === -1 ? -1 : findMatchingBracket(token, openIndex);
            if (closeIndex === -1) return undefined;

            return token.slice(openIndex + 1, closeIndex);
        };

        api.setValueBrackets = function (key, value = "") {
            const optionKey = getKey(key);
            if (!optionKey) return api;

            const option = `${optionKey}[${String(value).trim()}]`;
            const options = read().filter(item => getKey(item) !== optionKey);

            options.push(option);
            write(options);
            return api;
        };

        Object.defineProperty(api, "value", {
            get() { return root.getAttribute(attribute); },
            set(v) { root.setAttribute(attribute, v); }
        });

        return api;
    }

    //# RETURN 
    const api = createBasePgs();
    api.state = createState("pgs-state");
    api.option = createOption("pgs-option");
    return api;
}

const PGS_IMPORTS = {};

function registerImportModule(name, module) {
    const key = String(name || "").trim().replace(/^pgs[_-\s]*/i, "").toLowerCase();

    if (!key) throw new TypeError("pgs.registerImport(...modules): ogni modulo deve avere name o PGS_name");

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
            throw new Error(`pgs.registerModules(): "${key}" e' gia' definito su pgs`);
        }

        pgs[key] = module;
    });

    return pgs;
};

pgs.import = function (...names) {
    return names.flat().reduce((imports, name) => {
        const key = String(name || "").trim().replace(/^pgs[_-\s]*/i, "").toLowerCase();
        const item = PGS_IMPORTS[key];

        if (!item) throw new Error(`pgs.import(): modulo "${name}" non registrato`);

        imports[item.name] = item.module;
        return imports;
    }, {});
};

globalThis.pgs ??= pgs;
