//# SYNC ICONS
//+ reads the plain .svg files in assets/icons/ and writes their content into
//+ assets/scss/mixin/_icons.scss as the url("data:image/svg+xml,...") data URIs the icon
//+ component consumes. Run it after adding or editing a file in assets/icons/:
//+ node scripts/sync-icons.js
//+
//+ Naming convention read from assets/icons/:
//+ - "icon-name.svg" is a single-layer glyph -> $icon-name, added to $icons-builtin.
//+ - "iconDuo-name-before.svg" + "iconDuo-name-after.svg" (same base name, -before/-after
//+   suffix) are the two layers of a duo glyph -> $iconDuo-name-before/-after, paired as
//+   iconDuo-name in $icons-duo. -before draws on ::before, -after on ::after.
//+
//+ Existing entries are updated in place (their surrounding comments are left untouched); new
//+ ones are appended before the $icons-builtin / $icons-duo maps. Nothing is ever removed here,
//+ even if its .svg file disappears from assets/icons/, since another part of the library may
//+ still reference the option.
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const ICONS_DIR = path.join(ROOT, "assets/icons");
const ICONS_SCSS = path.join(ROOT, "assets/scss/mixin/_icons.scss");

function encodeSvg(raw) {
    return raw
        .replace(/<\?xml[^>]*\?>/g, "")
        .trim()
        .replace(/\r?\n\s*/g, " ")
        .replace(/"/g, "'")
        .replace(/</g, "%3C")
        .replace(/>/g, "%3E")
        .replace(/#/g, "%23")
        .replace(/\s+/g, " ")
        .trim();
}

function readIcons() {
    const files = fs.readdirSync(ICONS_DIR).filter(f => f.endsWith(".svg"));
    const before = new Map();
    const after = new Map();
    const singles = new Map();

    files.forEach(file => {
        const base = file.slice(0, -4);
        const raw = fs.readFileSync(path.join(ICONS_DIR, file), "utf8");
        if (base.endsWith("-before")) before.set(base.slice(0, -"-before".length), raw);
        else if (base.endsWith("-after")) after.set(base.slice(0, -"-after".length), raw);
        else singles.set(base, raw);
    });

    const duos = new Map();
    before.forEach((raw, name) => {
        if (!after.has(name)) {
            console.warn(`[sync-icons] "${name}-before.svg" has no matching "${name}-after.svg", skipped`);
            return;
        }
        duos.set(name, { before: raw, after: after.get(name) });
    });
    after.forEach((_, name) => {
        if (!before.has(name)) console.warn(`[sync-icons] "${name}-after.svg" has no matching "${name}-before.svg", skipped`);
    });

    return { singles, duos };
}

function upsertVariable(scss, varName, url) {
    const declaration = `$${varName}: url("data:image/svg+xml,${url}");`;
    const pattern = new RegExp(`\\$${varName}:\\s*url\\("data:image/svg\\+xml,[^"]*"\\);`);
    if (pattern.test(scss)) return { scss: scss.replace(pattern, declaration), added: false };
    return { scss, added: true, declaration };
}

function insertBeforeMarker(scss, marker, lines) {
    if (!lines.length) return scss;
    const index = scss.indexOf(marker);
    if (index === -1) throw new Error(`marker not found: ${marker}`);
    return scss.slice(0, index) + lines.join("\n") + "\n\n" + scss.slice(index);
}

function addToMap(scss, mapName, entryLines) {
    if (!entryLines.length) return scss;
    const pattern = new RegExp(`(\\$${mapName}:\\s*\\(\\n)([\\s\\S]*?)(\\n\\);)`);
    const match = scss.match(pattern);
    if (!match) throw new Error(`map not found: $${mapName}`);
    const body = match[2].replace(/\s+$/, "");
    const newBody = `${body}\n${entryLines.map(l => `    ${l}`).join("\n")}`;
    return scss.replace(pattern, `$1${newBody}$3`);
}

function main() {
    const { singles, duos } = readIcons();
    let scss = fs.readFileSync(ICONS_SCSS, "utf8");

    const newDeclarations = [];
    const newBuiltinEntries = [];
    const newDuoEntries = [];
    const updated = [];

    singles.forEach((raw, name) => {
        const url = encodeSvg(raw);
        const result = upsertVariable(scss, name, url);
        scss = result.scss;
        if (result.added) {
            newDeclarations.push(result.declaration);
            newBuiltinEntries.push(`${name}: $${name},`);
        } else {
            updated.push(name);
        }
    });

    duos.forEach(({ before, after }, name) => {
        const beforeVar = `${name}-before`;
        const afterVar = `${name}-after`;
        const beforeResult = upsertVariable(scss, beforeVar, encodeSvg(before));
        scss = beforeResult.scss;
        const afterResult = upsertVariable(scss, afterVar, encodeSvg(after));
        scss = afterResult.scss;

        if (beforeResult.added || afterResult.added) {
            if (beforeResult.added) newDeclarations.push(beforeResult.declaration);
            if (afterResult.added) newDeclarations.push(afterResult.declaration);
            newDuoEntries.push(`${name}: ($${beforeVar}, $${afterVar}),`);
        } else {
            updated.push(name);
        }
    });

    scss = insertBeforeMarker(scss, "//the drawable set", newDeclarations);
    scss = addToMap(scss, "icons-builtin", newBuiltinEntries);
    scss = addToMap(scss, "icons-duo", newDuoEntries);

    fs.writeFileSync(ICONS_SCSS, scss, "utf8");

    const added = [...newBuiltinEntries.map(l => l.split(":")[0].trim()), ...newDuoEntries.map(l => l.split(":")[0].trim())];
    console.log(`[sync-icons] ${updated.length} updated, ${added.length} added.`);
    if (updated.length) console.log("  updated:", updated.join(", "));
    if (added.length) console.log("  added:  ", added.join(", "));
    if (added.length) console.log("\nNew glyphs still need a line in reference/html/components/icon.html's @pgs-option and a demo, then `npm run docs:generate`.");
}

main();
