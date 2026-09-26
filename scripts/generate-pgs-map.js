//# PGS MAP
//+ builds reference/pgs-map.json: every pgs root with the pgs children and its CSS flags / pgs-data keys
//+ it accepts. Run it after adding or renaming a token: node scripts/generate-pgs-map.js
const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const { extractAttributes } = require("./pgs-attributes.js");

const ROOT = path.resolve(__dirname, "..");
const SCSS_DIR = path.join(ROOT, "assets/scss");
const JS_DIR = path.join(ROOT, "assets/javascript");
const REFERENCE_DIR = path.join(ROOT, "reference/html");
const COMPILED_CSS = path.join(ROOT, "dist/css/index.css");
const OUTPUT = path.join(ROOT, "reference/pgs-map.json");

function walk(dir, extension) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) return walk(full, extension);
        return entry.name.endsWith(extension) ? [full] : [];
    });
}

//== the token before the first dash names the component a child belongs to, which is the
//== convention the whole library follows: slides-container, card-content, pageShell-aside
function rootOf(token, allTokens) {
    //== a leading underscore marks a token the library builds and you never write: it is not
    //== part of the name, so the parent lookup has to see through it
    const bare = token.replace(/^_/, "");
    const dash = bare.indexOf("-");
    if (dash === -1) return token;

    const prefix = bare.slice(0, dash);
    return allTokens.has(prefix) ? prefix : token;
}

//== the JavaScript never writes attribute selectors: it names tokens through the pgs() helper,
//== so a few of them exist nowhere else and would be missing from the map
function pgsTokensInJs(text) {
    const found = new Set();
    const pattern = /pgs\([^)]*\)\s*\.\s*(?:querySelectorAll|querySelector|add|remove|contains|toggle)\(\s*["']([A-Za-z_][\w-]*)["']/g;
    for (const match of text.matchAll(pattern)) found.add(match[1]);

    //== Includes component brackets inside generated HTML string literals.
    extractAttributes(text.replace(/\\"/g, '"')).pgs.forEach(token => {
        if (/^[A-Za-z_][\w-]*$/.test(token)) found.add(token);
    });

    return found;
}

function optionTokensInJs(text) {
    const found = new Set();
    const pattern = /\.option\s*\.\s*(?:contains|add|remove|toggle|getValueBrackets|setValueBrackets)\(\s*["']([A-Za-z_][\w-]*)["']/g;
    for (const match of text.matchAll(pattern)) found.add(match[1]);
    return found;
}

function tokensIn(text, attribute) {
    const found = new Set();
    const pattern = new RegExp(`\\[${attribute}~?=["']?([A-Za-z_][\\w-]*)`, "g");

    for (const match of text.matchAll(pattern)) {
        //== a token cut short by an interpolation is a prefix the loop completes, not an option of
        //== its own: [pgs*="'icon-#{$name}'"] in the SCSS would otherwise register "icon-"
        if (text[match.index + match[0].length] === "#") continue;
        found.add(match[1]);
    }

    return found;
}

//== a component that only ever appears with its bracket (background, textColor, position, img,
//== ...) has no [pgs~="X"] form at all: its only selector is [pgs*="X\5B"] in the source,
//== [pgs*="X["] once compiled. Counted as a pgs token too, so it gets its own root and owns its flags
function componentsIn(text) {
    const found = tokensIn(text, "pgs");
    for (const match of text.matchAll(/\[pgs\*="([A-Za-z_][\w-]*)(?:\[|\\5B)/g)) found.add(match[1]);
    return found;
}

//== :not(...) and :has(...) are conditions on something else (an ancestor, a sibling), never the
//== element's own component, so their contents are dropped before looking for the owner
function stripConditions(text) {
    let out = "";
    for (let i = 0; i < text.length;) {
        const match = text.slice(i).match(/^:(?:not|has)\(/);
        if (!match) { out += text[i]; i++; continue; }

        let depth = 0;
        let quote = null;
        let j = i + match[0].length - 1;
        for (; j < text.length; j++) {
            const char = text[j];
            if (quote) { if (char === quote) quote = null; continue; }
            if (char === '"' || char === "'") { quote = char; continue; }
            if (char === "(") depth++;
            else if (char === ")" && --depth === 0) break;
        }
        i = j + 1;
    }
    return out;
}

//== every component the flag is checked against: the ones in the last compound selector before it,
//== inside the innermost group it sits in, so :is([pgs~="grid"], [pgs~="flex"])[pgs*="'gapTexts'"]
//== belongs to both grid and flex. Quote-aware, since [pgs*="grid["] carries a bracket of its own
function ownersBefore(selector) {
    let quote = null;
    const parens = [];
    for (let i = 0; i < selector.length; i++) {
        const char = selector[i];
        if (quote) { if (char === quote) quote = null; continue; }
        if (char === '"' || char === "'") { quote = char; continue; }
        if (char === "(") parens.push(i);
        else if (char === ")") parens.pop();
    }

    const scope = selector.slice(parens.length ? parens.at(-1) + 1 : 0);
    let square = 0;
    let depth = 0;
    let start = 0;
    quote = null;
    for (let i = 0; i < scope.length; i++) {
        const char = scope[i];
        if (quote) { if (char === quote) quote = null; continue; }
        if (char === '"' || char === "'") { quote = char; continue; }
        if (char === "[") square++;
        else if (char === "]") square--;
        else if (char === "(") depth++;
        else if (char === ")") depth--;
        else if (!square && !depth && /[\s>+~,]/.test(char)) start = i + 1;
    }

    const last = [...componentsIn(stripConditions(scope.slice(start)))];
    if (last.length) return last;
    const all = [...componentsIn(selector)];
    return all.length ? [all.at(-1)] : [];
}

//== options are attached to the component whose selector they appear in, so the compiled CSS
//== is the honest source: mixins are already expanded and every real pairing is visible
function optionsFromCompiledCss() {
    const css = fs.existsSync(COMPILED_CSS) ? fs.readFileSync(COMPILED_CSS, "utf8") : "";
    const pairs = [];

    postcss.parse(css).walkRules(rule => {
        for (const selector of rule.selectors) {
            //== a flag check is usually bare ([pgs*="'X'"]), but a selector that anchors the flag to
            //== its own component's bracket, for a component that only ever takes one value at a
            //== time (see e.g. layout/_utilities.scss's position/select/rotate), writes it as
            //== [pgs*="position['X'"] instead — the optional prefix here skips past that anchor
            //== without changing which flag gets captured
            for (const option of selector.matchAll(/\[pgs\*="(?:[A-Za-z_][\w-]*\[)?'([^'"]+)'/g)) {
                const owners = ownersBefore(selector.slice(0, option.index));
                if (option[1] === "hoverNot") pairs.push(["hover", option[1], "pgs-options"]);
                else if (owners.length) for (const owner of owners) pairs.push([owner, option[1], "pgs-options"]);
                else for (const owner of ["flex", "grid"]) pairs.push([owner, option[1], "pgs-options"]);
            }
        }
    });

    return pairs;
}

//== empty placeholder rules never reach the compiled CSS, so the options that exist only for
//== the JavaScript are recovered from the source by tracking the enclosing selectors: a
//== pgs-data key, and a bracket flag written as an empty &[pgs*="'X'"] {} placeholder (accordion's
//== accAutoOpen, accordionContainer's accMultiOpen), each attached to the component whose block
//== it sits in rather than to whichever file happens to read it
function optionsFromScss(files) {
    const pairs = [];

    for (const file of files) {
        const stack = [];
        let pending = "";

        for (const chunk of fs.readFileSync(file, "utf8").split(/([{}])/)) {
            if (chunk === "{") { stack.push(pending); pending = ""; continue; }
            if (chunk === "}") { stack.pop(); pending = ""; continue; }
            pending = chunk.split(";").pop();

            const selector = pending;
            const dataKeys = tokensIn(selector, "pgs-data");
            const flags = [...selector.matchAll(/\[pgs\*="'([A-Za-z_][\w-]*)'"\]/g)];
            if (!dataKeys.size && !flags.length) continue;

            //== the owner is the last component named before the flag, never one written after it
            //== (&[pgs*="'btnReverse'"] :where([pgs~="icon"]) is a button flag styling an icon)
            const ownerOf = cut => [...stack, cut]
                .flatMap(level => [...componentsIn(level)])
                .pop();
            const dataOwner = ownerOf(selector);
            if (dataOwner) for (const key of dataKeys) pairs.push([dataOwner, key, "pgs-data"]);
            for (const flag of flags) {
                //== hoverNot has no single owner: it opts out on whatever carries it
                const flagOwner = flag[1] === "hoverNot" ? "hover" : ownerOf(selector.slice(0, flag.index));
                if (flagOwner) pairs.push([flagOwner, flag[1], "pgs-options"]);
            }
        }
    }

    return pairs;
}

//== which tokens the library builds itself is declared under @pgs-generated in the references,
//== and docs:generate keeps that declaration honest against the JavaScript
function generatedTokens() {
    const tokens = new Set();

    for (const file of walk(REFERENCE_DIR, ".html")) {
        const block = fs.readFileSync(file, "utf8").match(/\/\*\*([\s\S]*?)\*\//);
        if (!block) continue;

        let active = null;
        for (const line of block[1].split("\n")) {
            const tag = line.match(/^\s*\*\s*@([\w-]+)/);
            if (tag) { active = tag[1]; continue; }

            const item = line.match(/^\s*\*\s*-\s*([\w-]+)\s*:/);
            if (item && active === "pgs-generated") tokens.add(item[1]);
        }
    }

    return tokens;
}

const scssFiles = walk(SCSS_DIR, ".scss");
const allText = scssFiles.map(file => fs.readFileSync(file, "utf8")).join("\n")
    + (fs.existsSync(COMPILED_CSS) ? fs.readFileSync(COMPILED_CSS, "utf8") : "");

const jsFiles = walk(JS_DIR, ".js");
const jsText = jsFiles.map(file => fs.readFileSync(file, "utf8")).join("\n");

const allTokens = new Set([...componentsIn(allText), ...pgsTokensInJs(jsText)]);
const generated = generatedTokens();
const map = new Map();

for (const token of allTokens) {
    const root = rootOf(token, allTokens);
    if (!map.has(root)) map.set(root, { pgs: new Set(), "pgs-generated": new Set(), "pgs-options": new Set(), "pgs-data": new Set() });
    if (root === token) continue;

    map.get(root)[generated.has(token) ? "pgs-generated" : "pgs"].add(token);
}

const cssPairs = optionsFromCompiledCss();
const cssOptions = new Set(cssPairs.map(([, option]) => option));

const scssPairs = optionsFromScss(scssFiles);
const knownOptions = new Set([...cssPairs, ...scssPairs].map(([, option]) => option));

//== a last resort, for a flag only the JavaScript reads: the file name is a guess at the owner
//== (_accordion.js also reads accordionContainer's accMultiOpen), so it never overrides a
//== pairing the stylesheet already made. .option only ever touches the pgs attribute, so what it
//== reads is a bracket flag, not a pgs-data key
function optionsFromJs(files) {
    return files.flatMap(file => {
        const owner = path.basename(file, ".js").replace(/^_/, "");
        const text = fs.readFileSync(file, "utf8");
        return [...optionTokensInJs(text)]
            .filter(option => !knownOptions.has(option))
            .map(option => [owner, option, "pgs-options"]);
    });
}

for (const [owner, option, kind] of [...cssPairs, ...scssPairs, ...optionsFromJs(jsFiles)]) {
    const root = rootOf(owner, allTokens);
    if (map.has(root)) map.get(root)[kind].add(option);
}

const assignedOptions = new Set([...map.values()].flatMap(entry => [...entry["pgs-options"], ...entry["pgs-data"]]));

for (const file of walk(REFERENCE_DIR, ".html")) {
    const source = fs.readFileSync(file, "utf8");
    const block = source.match(/\/\*\*([\s\S]*?)\*\//)?.[1] || "";
    const roots = [];
    let active;
    const entries = [];
    for (const line of block.split("\n")) {
        const tag = line.match(/^\s*\*\s*@([\w-]+)/);
        if (tag) { active = tag[1]; continue; }
        const item = line.match(/^\s*\*\s*-\s*([\w-]+)\s*:/);
        if (!item) continue;
        if (active === "pgs" && map.has(item[1])) roots.push(item[1]);
        if (["pgs-options", "pgs-data"].includes(active)) entries.push([active, item[1]]);
    }
    for (const [kind, key] of entries) {
        //== the reference only fills in what the sources could not place: its fallback is the
        //== first root the page documents, which for a page with two roots is a guess
        //== flags only: a pgs-data key is meant to sit on several roots at once (formMessage on both
        //== form and formValidate), so the reference keeps adding those
        if (kind === "pgs-options" && assignedOptions.has(key)) continue;
        const owners = roots.filter(name => key.startsWith(name));
        for (const owner of owners.length ? owners : roots.slice(0, 1)) map.get(owner)[kind].add(key);
    }
}

const sortTokens = (a, b) => a.localeCompare(b, "en");
const output = {};
for (const root of [...map.keys()].sort(sortTokens)) {
    output[root] = {
        pgs: [...map.get(root).pgs].sort(sortTokens),
        "pgs-generated": [...map.get(root)["pgs-generated"]].sort(sortTokens),
        "pgs-options": [...map.get(root)["pgs-options"]].sort(sortTokens),
        "pgs-data": [...map.get(root)["pgs-data"]].sort(sortTokens),
    };
}

fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 4) + "\n");

const children = Object.values(output).reduce((total, entry) => total + entry.pgs.length, 0);
const built = Object.values(output).reduce((total, entry) => total + entry["pgs-generated"].length, 0);
const options = new Set(Object.values(output).flatMap(entry => entry["pgs-options"]));
console.log(`${path.relative(ROOT, OUTPUT)}: ${Object.keys(output).length} radici, ${children} figli pgs, ${built} generati dal JS, ${options.size} opzioni CSS distinte`);
