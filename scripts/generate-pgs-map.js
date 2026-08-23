//# PGS MAP
//+ builds reference/pgs-map.json: every pgs root with the pgs children and the pgs-option
//+ it accepts. Run it after adding or renaming a token: node scripts/generate-pgs-map.js
const fs = require("fs");
const path = require("path");

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

    //== whole components are assembled as template literals, so their tokens appear nowhere else
    for (const match of text.matchAll(/\bpgs\s*=\s*\\?["']([^"'\\`$]+)/g)) {
        match[1].split(/\s+/).forEach(value => {
            if (/^[A-Za-z_][\w-]*$/.test(value)) found.add(value);
        });
    }

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
    for (const match of text.matchAll(pattern)) found.add(match[1]);
    return found;
}

//== options are attached to the component whose selector they appear in, so the compiled CSS
//== is the honest source: mixins are already expanded and every real pairing is visible
function optionsFromCompiledCss() {
    const css = fs.existsSync(COMPILED_CSS) ? fs.readFileSync(COMPILED_CSS, "utf8") : "";
    const pairs = [];

    for (const rule of css.split("}")) {
        const selectorText = rule.slice(rule.lastIndexOf("{") === -1 ? 0 : 0, rule.indexOf("{"));
        if (!selectorText) continue;

        for (const selector of selectorText.split(",")) {
            const owner = selector.match(/\[pgs~=["']?([A-Za-z_][\w-]*)/);
            if (!owner) continue;

            for (const option of tokensIn(selector, "pgs-option")) pairs.push([owner[1], option]);
        }
    }

    return pairs;
}

//== empty placeholder rules never reach the compiled CSS, so the options that exist only for
//== the JavaScript are recovered from the source by tracking the enclosing selectors
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
            const options = tokensIn(selector, "pgs-option");
            if (!options.size) continue;

            const owner = [...stack, selector]
                .flatMap(level => [...tokensIn(level, "pgs")])
                .pop();
            if (owner) for (const option of options) pairs.push([owner, option]);
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

const allTokens = new Set([...tokensIn(allText, "pgs"), ...pgsTokensInJs(jsText)]);
const generated = generatedTokens();
const map = new Map();

for (const token of allTokens) {
    const root = rootOf(token, allTokens);
    if (!map.has(root)) map.set(root, { pgs: new Set(), "pgs-generated": new Set(), "pgs-option": new Set() });
    if (root === token) continue;

    map.get(root)[generated.has(token) ? "pgs-generated" : "pgs"].add(token);
}

function optionsFromJs(files) {
    return files.flatMap(file => {
        const owner = path.basename(file, ".js").replace(/^_/, "");
        const text = fs.readFileSync(file, "utf8");
        return [...optionTokensInJs(text)].map(option => [owner, option]);
    });
}

for (const [owner, option] of [...optionsFromCompiledCss(), ...optionsFromScss(scssFiles), ...optionsFromJs(jsFiles)]) {
    const root = rootOf(owner, allTokens);
    if (map.has(root)) map.get(root)["pgs-option"].add(option);
}

const sortTokens = (a, b) => a.localeCompare(b, "en");
const output = {};
for (const root of [...map.keys()].sort(sortTokens)) {
    output[root] = {
        pgs: [...map.get(root).pgs].sort(sortTokens),
        "pgs-generated": [...map.get(root)["pgs-generated"]].sort(sortTokens),
        "pgs-option": [...map.get(root)["pgs-option"]].sort(sortTokens),
    };
}

fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 4) + "\n");

const children = Object.values(output).reduce((total, entry) => total + entry.pgs.length, 0);
const built = Object.values(output).reduce((total, entry) => total + entry["pgs-generated"].length, 0);
const options = new Set(Object.values(output).flatMap(entry => entry["pgs-option"]));
console.log(`${path.relative(ROOT, OUTPUT)}: ${Object.keys(output).length} radici, ${children} figli pgs, ${built} generati dal JS, ${options.size} pgs-option distinte`);
