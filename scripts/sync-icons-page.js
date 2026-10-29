//= SYNC ICONS PAGE
// writes the grid of every glyph of the myIcons pack into site/page/icons.html, and the counts the page
// quotes (All, Core, Pack only, the totals in the text). The page is hand-authored, so only what is
// between the two icons:grid comments is written here; everything around it stays as it is. Run it after
// adding or removing a file in myIcons's svg/ (npm run icons:sync does it together with the core glyphs):
// npm run icons:page
//
// A glyph is every "icon-name.svg" of the pack; the -before/-after layers of a duo glyph are not glyphs of
// their own. The glyphs of CORE_ICONS in scripts/sync-icons.js, the ones mypgs carries by itself, are
// marked core. The pack folder is ../myIcons/svg by default, or the MYICONS_DIR environment variable.
const fs = require("fs");
const path = require("path");
const { CORE_ICONS } = require("./sync-icons.js");

const ROOT = path.resolve(__dirname, "..");
const ICONS_DIR = process.env.MYICONS_DIR ? path.resolve(process.env.MYICONS_DIR) : path.resolve(ROOT, "../myIcons/svg");
const PAGE = path.join(ROOT, "site/page/icons.html");

const START = "<!-- icons:grid:start";
const END = "<!-- icons:grid:end -->";

function readNames() {
    if (!fs.existsSync(ICONS_DIR)) throw new Error(`the icon pack was not found at ${ICONS_DIR}; clone myIcons next to mypgs or set MYICONS_DIR`);
    return fs.readdirSync(ICONS_DIR)
        .filter(file => /^icon-.+\.svg$/.test(file) && !/-(before|after)\.svg$/.test(file))
        .map(file => file.slice("icon-".length, -".svg".length))
        .sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }));
}

function card(name, core) {
    const badge = core ? `\n                <span class="icons-item-badge" pgs="badge['badgeSoft']">core</span>` : "";
    return `            <button class="icons-item" pgs="button['btnVertical']" type="button" data-icon="${name}" data-core="${core}" title="Show the code of icon-${name}">
                <i pgs="icon['iconLarge' 'icon-${name}']" aria-hidden="true"></i>
                <span class="icons-item-name">icon-${name}</span>${badge}
            </button>`;
}

function main() {
    const names = readNames();
    const core = new Set(CORE_ICONS);
    const missing = CORE_ICONS.filter(name => !names.includes(name));
    if (missing.length) console.warn(`[sync-icons-page] CORE_ICONS lists glyphs that are not in the pack: ${missing.join(", ")}`);

    let html = fs.readFileSync(PAGE, "utf8");
    const start = html.indexOf(START);
    const end = html.indexOf(END);
    if (start === -1 || end === -1 || end < start) throw new Error(`${path.relative(ROOT, PAGE)} has no "${START}" ... "${END}" pair around the grid`);
    const startLineEnd = html.indexOf("\n", start) + 1;
    const grid = names.map(name => card(name, core.has(name))).join("\n");
    html = html.slice(0, startLineEnd) + grid + "\n            " + html.slice(end);

    const coreCount = names.filter(name => core.has(name)).length;
    html = html
        .replace(/All \(\d+\)/, `All (${names.length})`)
        .replace(/Core \(\d+\)/, `Core (${coreCount})`)
        .replace(/Pack only \(\d+\)/, `Pack only (${names.length - coreCount})`)
        .replace(/The full set of \d+ glyphs/, `The full set of ${names.length} glyphs`)
        .replace(/Only the \d+ glyphs/, `Only the ${coreCount} glyphs`);

    fs.writeFileSync(PAGE, html, "utf8");
    console.log(`[sync-icons-page] ${names.length} glyphs (${coreCount} core) written to ${path.relative(ROOT, PAGE)}.`);
}

main();
