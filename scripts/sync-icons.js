//= SYNC ICONS
// reads the glyphs the library draws by itself from the myIcons pack (../myIcons/svg/) and writes their
// content into assets/scss/mixin/_mx-icons.scss as the url("data:image/svg+xml,...") data URIs the
// icon component consumes. mypgs holds no .svg of its own: myIcons is the only place the originals
// live. Run it after editing one of them in myIcons, or after changing CORE_ICONS:
// npm run icons:sync
//
// Which glyphs mypgs carries is the CORE_ICONS list below, nothing else is read from myIcons. Add a
// name there only when a component of the library draws that glyph on its own (a button, an alert,
// the dark-mode toggle...), since each one costs bytes in every project's stylesheet. Every other
// glyph is in the myIcons stylesheet, which is loaded next to mypgs and writes the same icon option.
//
// The pack folder is ../myIcons/svg by default, or the MYICONS_DIR environment variable.
//
// Naming convention read from the pack (the same one myIcons's scripts/build-icons.js reads):
// - "icon-name.svg" is a single-layer glyph -> $icon-name, added to $icons-builtin under the bare
//   key "name", which _icon.scss turns into the icon bracket flag icon-name and the --icon-glyph-name
//   custom property.
// - "icon-name-before.svg" + "icon-name-after.svg" (same base name, -before/-after suffix) are the
//   two layers of a duo glyph -> $icon-name-before/-after, paired as name in $icons-duo. -before
//   draws on ::before, -after on ::after. A name in CORE_ICONS_DUO takes both from the pack.
//
// The generated part of _mx-icons.scss, from the first $icon- variable to the end of the file, is
// rewritten whole on every run: a glyph that leaves CORE_ICONS leaves the stylesheet too, and
// leaves it as a breaking change for whoever writes that option without the pack loaded.
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const ICONS_DIR = process.env.MYICONS_DIR ? path.resolve(process.env.MYICONS_DIR) : path.resolve(ROOT, "../myIcons/svg");
const ICONS_SCSS = path.join(ROOT, "assets/scss/mixin/_mx-icons.scss");

// the glyphs a component of the library draws by itself
const CORE_ICONS = [
    "chevronDown", // accordion, menu, slides
    "check", // checkbox and radio
    "close", // modal, alerts, toast
    "magnifyingGlass", // search
    "circle", // stepTabs, form addon
    "circleXmark", // alerts, form addon
    "circleCheck", // alerts
    "circleInfo", // alerts
    "triangleExclamation", // alerts
    "moon", // darkmode
    "sun", // darkmode
    "hamburger", // header, navSmart
    "hamburgerTwo", // header, navSmart
];

// the core glyphs that also have a two-layer version in the pack
const CORE_ICONS_DUO = ["hamburgerTwo"];

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

function readSvg(name) {
    const file = path.join(ICONS_DIR, `icon-${name}.svg`);
    if (!fs.existsSync(file)) throw new Error(`${file} not found (listed in CORE_ICONS of scripts/sync-icons.js)`);
    return fs.readFileSync(file, "utf8");
}

function declaration(varName, raw) {
    return `$${varName}: url("data:image/svg+xml,${encodeSvg(raw)}");`;
}

function main() {
    if (!fs.existsSync(ICONS_DIR)) throw new Error(`the icon pack was not found at ${ICONS_DIR}; clone myIcons next to mypgs or set MYICONS_DIR`);

    const declarations = [];
    CORE_ICONS.forEach(name => declarations.push(declaration(`icon-${name}`, readSvg(name))));
    CORE_ICONS_DUO.forEach(name => {
        declarations.push(declaration(`icon-${name}-before`, readSvg(`${name}-before`)));
        declarations.push(declaration(`icon-${name}-after`, readSvg(`${name}-after`)));
    });

    const generated = [
        ...declarations,
        "//the drawable set. The key is the bare glyph name: the two prefixes are written where they are",
        "//used, icon- for the public option (pgs \"icon['icon-star']\") and --icon-glyph- for the custom",
        "//property that carries the drawing, so the glyphs never mix with the icon's own configuration.",
        "//This is only the set the library draws by itself; the rest of the glyphs are in the myIcons pack, which",
        "//writes the same option. Removing or renaming a key is a breaking change, since the keys are public",
        "//through that option.",
        "$icons-builtin: (",
        ...CORE_ICONS.map(name => `    ${name}: $icon-${name},`),
        ");",
        "//Two-layer glyphs. Unlike the single-path set above, their paths are drawn on ::before and ::after",
        "//so a component can color or animate each layer independently.",
        "$icons-duo: (",
        ...CORE_ICONS_DUO.map(name => `    ${name}: ($icon-${name}-before, $icon-${name}-after),`),
        ");",
        "",
    ].join("\n");

    const scss = fs.readFileSync(ICONS_SCSS, "utf8");
    const start = scss.search(/^\$icon-/m);
    if (start === -1) throw new Error("no $icon- variable found in _mx-icons.scss, the generated part has no anchor");
    const next = scss.slice(0, start) + generated;

    const changed = next !== scss;
    if (changed) fs.writeFileSync(ICONS_SCSS, next, "utf8");

    console.log(`[sync-icons] ${CORE_ICONS.length} glyphs (${CORE_ICONS_DUO.length} duo) read from ${path.relative(ROOT, ICONS_DIR)}, _mx-icons.scss ${changed ? "rewritten" : "already up to date"}.`);
}

if (require.main === module) main();

module.exports = { CORE_ICONS, CORE_ICONS_DUO };
