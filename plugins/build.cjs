// mypgs/build: puts in a project's bundle only the parts of mypgs it uses, listed in a mypgs.config.json
// next to its build config:
//
//     { "include": ["button", "icon", "form", "modal"] }
//
// The names are those of assets/modules.json. What a listed part needs (the button of a modal, the alerts
// of a toast) is added, with a message; every other part is left out, so a component added to the library
// later stays out of the project until it is listed. pgsModules() returns what the build needs:
//   - sass: the line to prepend to the SCSS entry (sass-loader additionalData), which sets $pgs-exclude
//   - alias: the resolve.alias of webpack, which turns the JavaScript of each part left out into an empty module
//   - vite(): the same for Vite, as a plugin
// Without a mypgs.config.json, or without "include" in it, every part is in.
// The base, the patterns and the layout utilities are not parts: they are always in.

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const { modules: MODULES } = require("../assets/modules.json");
const PREFIX = "[mypgs]";

// the listed parts, or null for all of them
function readConfig(file) {
    if (!fs.existsSync(file)) return { include: null };

    let config;
    try {
        config = JSON.parse(fs.readFileSync(file, "utf8"));
    } catch (error) {
        throw new Error(`${PREFIX} ${file} is not valid JSON: ${error.message}`);
    }

    if ("exclude" in config) {
        throw new Error(`${PREFIX} ${file}: "exclude" is not read, list what the project uses in "include"`);
    }

    const include = config.include ?? null;
    if (include !== null && (!Array.isArray(include) || include.some(name => typeof name !== "string"))) {
        throw new Error(`${PREFIX} ${file}: "include" must be a list of names`);
    }

    return { include };
}

// the parts in the bundle: the listed ones and what they require (directly or through another one)
function resolveInclude(requested, { warn = true } = {}) {
    const unknown = requested.filter(name => !MODULES[name]);
    if (unknown.length) {
        throw new Error(`${PREFIX} unknown in include: ${unknown.join(", ")}. The names are: ${Object.keys(MODULES).join(", ")}`);
    }

    const included = new Set(requested);
    const addedBy = new Map();
    const add = name => {
        for (const needed of MODULES[name].requires ?? []) {
            if (included.has(needed)) continue;
            included.add(needed);
            addedBy.set(needed, name);
            add(needed);
        }
    };
    requested.forEach(add);

    if (warn) addedBy.forEach((by, name) => console.warn(`${PREFIX} "${name}" is included: "${by}" requires it`));

    return Object.keys(MODULES).filter(name => included.has(name));
}

function pgsModules({ config = path.resolve(process.cwd(), "mypgs.config.json"), include, warn = true } = {}) {
    const requested = include !== undefined ? include : readConfig(config).include;
    const included = requested === null ? Object.keys(MODULES) : resolveInclude(requested, { warn });
    const excluded = Object.keys(MODULES).filter(name => !included.includes(name));

    // the real paths: a project that links mypgs (npm link, file:) resolves it there, past node_modules
    const realRoot = fs.realpathSync(ROOT);
    const jsFiles = excluded
        .filter(name => MODULES[name].js)
        .map(name => path.join(realRoot, "assets/javascript/modules", `${MODULES[name].js}.js`));

    const alias = Object.fromEntries(jsFiles.map(file => [file, false]));
    const sass = `$pgs-exclude: (${excluded.join(", ")}${excluded.length === 1 ? "," : ""});\n`;

    const EMPTY = "\0mypgs-excluded";
    const vite = () => ({
        name: "vite-plugin-pgs-modules",
        enforce: "pre",
        async resolveId(source, importer, options) {
            if (!importer || !source.startsWith(".") || !source.includes("modules/")) return null;
            const resolved = await this.resolve(source, importer, { ...options, skipSelf: true });
            if (!resolved) return null;
            const file = fs.realpathSync(resolved.id.split("?")[0]);
            return jsFiles.includes(file) ? EMPTY : null;
        },
        load(id) {
            return id === EMPTY ? "export {};" : null;
        },
    });

    return { include: included, exclude: excluded, sass, alias, vite };
}

module.exports = { pgsModules, modules: MODULES };
