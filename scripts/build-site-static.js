#!/usr/bin/env node
//= BUILD STATIC SITE
//+ Hand-authored shells and fragments, none of them a page on its own, combined with each page's own
//+ content into every site/build/<name>.html:
//+ - site/index.html — the page around every page: head, and the <!-- include: page <path> --> comment
//+   each page's own content is spliced into. Edit this
//+   for the surrounding page — everything that would still be there without a single reference
//+   panel, shared by every generated page.
//+ - site/parts/header.html (the header and navSmart) and site/parts/footer.html
//+   — one fragment per component of that surrounding page. site/index.html names each one
//+   with an <!-- include: <file name> --> comment on a line of its own, and this script splices the
//+   file in before anything else happens. Edit a fragment to change one component on every page.
//+   <!-- include: page site/page/<name>.html --> is the one include that is not a file of parts/: its path,
//+   relative to the repo root, says where the pages live, and <name> stands for each page's name.
//+
//+ Nothing in site/page/ is generated: it holds only hand-authored content, one page's own content
//+ per file with no shell around it (home.html, test.html, demo.html, and any future page, following
//+ the same one-file-per-page convention). demo.html is the one that is not used as written: it is the
//+ pageShell that hosts the reference nav and panels, with the nav and the main empty until this
//+ script fills them in from reference/html. Everything this script writes lives in site/build/:
//+ - site/build/*.html — one output per page: site/index.html with that page's own content
//+   spliced into its placeholder, plus demo.js. Every page in site/page/ gets one; for demo.html
//+   the content is first merged with the nav and panels rendered from reference/html, in memory, and
//+   never written back to page/. Every page opens instantly,
//+   no fetch, no per-file parsing. Components built entirely by JS at runtime (notification, toast,
//+   modal, accordion, ...) are untouched: their source markup is baked in like everything else,
//+   and pgs.init() still builds them for real when the page loads.
//+
//+ The index.html at the repo root, the GitHub Pages entry point, redirects to build/home.html: it is
//+ the one place that names the current home page.
//+
//+ Adding a brand-new page needs no change here: drop its own content in site/page/<name>.html and
//+ this script produces site/build/<name>.html from it, sharing the same site/index.html as
//+ every other page. demo.html is the one name this script treats differently, as above, and it has to exist.
//+
//+ Run with: npm run sitebuild

"use strict";

const fs = require("fs");
const path = require("path");
const DemoRender = require("./demo-render.js");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const REFERENCE_ROOT = path.join(PROJECT_ROOT, "reference", "html");
const SITE_ROOT = path.join(PROJECT_ROOT, "site");
const SITE_STRUCTURE_HTML = path.join(SITE_ROOT, "index.html");
const BUILD_DIR = path.join(SITE_ROOT, "build");
const DEMO_PAGE = "demo.html";
// <!-- include: page site/page/<name>.html --> is the one include that is not a file of parts/: it says
// where each page's own content is read from, <name> standing for the page's name
const PAGE_INCLUDE_PATTERN = /<!--\s*include:\s*page\s+(\S+?)\s*-->/;
const COMPILED_CSS = path.join(PROJECT_ROOT, "dist", "css", "index.css");
const WELCOME_FILE = path.join(REFERENCE_ROOT, "guides", "welcome.html");

//+ every <!-- include: name.html --> comment in the shell is replaced by that file from site/parts/,
//+ so a component lives in a file of its own. A missing file stops the build instead of leaving the
//+ comment behind, which would be stripped later and take the component with it without a trace.
function resolveIncludes(html) {
    return html.replace(/<!--\s*include:\s*([\w.-]+)\s*-->/g, (match, name) => {
        const file = path.join(SITE_ROOT, "parts", name);
        if (!fs.existsSync(file)) throw new Error(`parts/${name} not found (required by an include in index.html)`);
        return fs.readFileSync(file, "utf8").trim();
    });
}

function readIfExists(file) {
    return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function buildNavAndPanels() {
    const cssText = readIfExists(COMPILED_CSS);
    const menuEntries = [];
    let panelsHtml = "";

    const welcomeSource = readIfExists(WELCOME_FILE);
    if (welcomeSource) {
        panelsHtml += `<div id="${DemoRender.getSlug(DemoRender.WELCOME_ENTRY.path)}" pgs="pageNav-panels-content">${welcomeSource}</div>`;
        menuEntries.push(DemoRender.WELCOME_ENTRY);
    } else {
        console.warn(`[build-site-static] welcome.html not found in ${path.relative(PROJECT_ROOT, WELCOME_FILE)}`);
    }

    DemoRender.referenceFiles.forEach(relativePath => {
        const file = path.join(REFERENCE_ROOT, relativePath);
        if (!fs.existsSync(file)) {
            console.warn(`[build-site-static] reference missing, skipped: ${relativePath}`);
            return;
        }

        const rawFileText = fs.readFileSync(file, "utf8");
        const { title, panelHtml } = DemoRender.renderReferencePanelHtml(relativePath, rawFileText, cssText);
        panelsHtml += panelHtml;
        menuEntries.push({ path: relativePath, title });
    });

    const navHtml = DemoRender.renderNavHtml(menuEntries, true);
    return { navHtml, panelsHtml, count: menuEntries.length };
}

function insertBeforeBodyClose(html, scriptsBlock) {
    if (!/<\/body>/.test(html)) throw new Error("no </body> found in index.html");
    return html.replace(/<\/body>/, `    ${scriptsBlock}\n</body>`);
}

//+ Strips comments and collapses whitespace runs to a single space in the final generated pages —
//+ demo.html bakes in ~45 reference panels verbatim, indentation and all, so this trims real weight
//+ off the file. <script>/<pre>/<textarea> blocks are left untouched: example code and JSON payloads
//+ (both copied verbatim into "Example HTML"/"PGS Option fields" panels) depend on their exact
//+ whitespace. Collapsing to one space rather than removing it entirely avoids merging adjacent
//+ inline elements that relied on that space to stay visually separated.
function minifyHtml(html) {
    const protectedBlocks = [];
    let output = html.replace(/<(script|pre|textarea)\b[^>]*>[\s\S]*?<\/\1>/gi, match => {
        protectedBlocks.push(match);
        return `\x00${protectedBlocks.length - 1}\x00`;
    });

    output = output.replace(/<!--[\s\S]*?-->/g, "");
    output = output.replace(/\s+/g, " ").trim();

    return output.replace(/\x00(\d+)\x00/g, (match, index) => protectedBlocks[Number(index)]);
}

//+ page/demo.html with the rendered nav and panels spliced into its empty containers — the demo
//+ page's own content, still no <html>/<head> of its own. The result goes straight to the page loop
//+ and is never written back to page/.
function buildDemoPageContent(structureHtml, navHtml, panelsHtml) {
    let output = structureHtml;

    // both the desktop aside and the mobile dialog copy share the same empty
    // `class="reference-demo-nav"` wrapper, and demo.js drives them together, so both get filled
    const navWrapperPattern = /(<div\b[^>]*class="reference-demo-nav"[^>]*>)(\s*)(<\/div>)/g;
    let navMatches = 0;
    output = output.replace(navWrapperPattern, (match, openTag, _whitespace, closeTag) => {
        navMatches++;
        return `${openTag}${navHtml}${closeTag}`;
    });
    if (navMatches === 0) throw new Error('no element with class="reference-demo-nav" found in page/demo.html');

    const mainPattern = /(<main\b[^>]*id="reference-demo-main"[^>]*>)(\s*)(<\/main>)/;
    if (!mainPattern.test(output)) throw new Error('no <main id="reference-demo-main"> found in page/demo.html');
    output = output.replace(mainPattern, (match, openTag, _whitespace, closeTag) => `${openTag}${panelsHtml}${closeTag}`);

    const header = "<!-- Automatically generated by scripts/build-site-static.js from page/demo.html + " +
        "reference/html/**/*.html. Do not edit — run npm run sitebuild again after changing either. -->\n";
    return header + output;
}

//+ menu's own SCSS (_menu.scss) already styles [aria-current=page] — it just expects the attribute
//+ to be there on the right link, which a hand-authored shell shared by every page can't do by
//+ itself. Every nav link's href is the plain page filename (e.g. "home.html"), so the one matching
//+ this page's own filename is the current one, in both the desktop nav and its mobile dialog copy.
function markCurrentNavLink(html, pageFileName) {
    const escapedFileName = pageFileName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`(<a\\b[^>]*\\bhref="${escapedFileName}"[^>]*)(>)`, "g");
    return html.replace(pattern, (match, tagWithoutClose, close) =>
        /\baria-current=/.test(tagWithoutClose) ? match : `${tagWithoutClose} aria-current="page"${close}`
    );
}

//+ site/index.html with one page's own content (read from page/<name>.html) spliced into its
//+ <!-- include: page <path> --> comment, plus demo.js. demo-render.js is a build-time-only dependency (used by this script,
//+ in Node) — nothing in the browser reads it, so it has no reason to be on the page.
function buildFinalHtml(siteHtml, pageContent, pageFileName, source) {
    let output = markCurrentNavLink(siteHtml, pageFileName);

    if (!PAGE_INCLUDE_PATTERN.test(output)) throw new Error("no <!-- include: page <path> --> found in index.html");
    output = output.replace(PAGE_INCLUDE_PATTERN, () => pageContent);

    output = insertBeforeBodyClose(output, `<script src="../assets/js/demo.js"></script>`);

    return `<!-- Automatically generated by scripts/build-site-static.js from index.html + ${source}. Do not edit — run npm run sitebuild again after changing either. -->\n${minifyHtml(output)}`;
}

//+ where a page's own content is read from: the path written in the page include of index.html, relative
//+ to the repo root, with <name> replaced by the page's name
function getPageTemplate(siteHtml) {
    const match = siteHtml.match(PAGE_INCLUDE_PATTERN);
    if (!match) throw new Error("no <!-- include: page <path> --> found in index.html");
    if (!match[1].includes("<name>")) throw new Error(`the path "${match[1]}" of the page include in index.html must contain <name>`);
    return match[1];
}

function getPageFile(template, name) {
    return path.join(PROJECT_ROOT, template.replace("<name>", name));
}

function main() {
    fs.mkdirSync(BUILD_DIR, { recursive: true });

    const siteHtml = resolveIncludes(fs.readFileSync(SITE_STRUCTURE_HTML, "utf8"));
    const pageTemplate = getPageTemplate(siteHtml);
    const pageDir = path.dirname(getPageFile(pageTemplate, "x"));
    fs.mkdirSync(pageDir, { recursive: true });

    // every page is a hand-authored file at the path of the page include. demo.html is the one whose
    // content is not used as written: it is merged in memory with the nav and panels rendered from
    // reference/html first, and nothing generated is written back there
    const demoName = path.basename(DEMO_PAGE, ".html");
    if (!fs.existsSync(getPageFile(pageTemplate, demoName))) throw new Error(`${path.relative(PROJECT_ROOT, getPageFile(pageTemplate, demoName))} not found: it is the container of the demo page, with an empty nav and main.`);
    const { navHtml, panelsHtml, count } = buildNavAndPanels();

    console.log(`[build-site-static] ${count} panels rendered.`);

    const pages = fs.readdirSync(pageDir).filter(name => name.endsWith(".html")).map(fileName => {
        const raw = fs.readFileSync(path.join(pageDir, fileName), "utf8");
        const source = path.relative(SITE_ROOT, path.join(pageDir, fileName));
        return fileName === DEMO_PAGE
            ? { fileName, content: buildDemoPageContent(raw, navHtml, panelsHtml), source: `${source} + reference/html` }
            : { fileName, content: raw, source };
    });

    // every page becomes site/build/<same name> through the one shared shell
    pages.forEach(({ fileName, content, source }) => {
        const outputPath = path.join(BUILD_DIR, fileName);
        fs.writeFileSync(outputPath, buildFinalHtml(siteHtml, content, fileName, source));
        console.log(`[build-site-static] ${path.relative(PROJECT_ROOT, outputPath)} written (index.html + ${source}).`);
    });
}

main();
