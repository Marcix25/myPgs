#!/usr/bin/env node

"use strict";

//= Standalone generator for reference/html/guides/*.html -> docs/guides/*.md.
//= Deliberately separate from scripts/generate-component-docs.js: a guide is prose, not a
//= component demo, so it needs neither that script's @pgs/@pgs-option/@api validation nor its
//= "wrap the whole example in one fenced code block" rendering. A guide's body is converted to
//= real Markdown prose instead, via the small, fixed tag vocabulary documented below.
//= generate-component-docs.js has one matching line of its own that skips this same guides/
//= folder when it walks reference/html/, so the two scripts never validate the same file twice.

const fs = require("fs");
const path = require("path");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const REFERENCE_ROOT = path.join(PROJECT_ROOT, "reference", "html", "guides");
const DOCS_ROOT = path.join(PROJECT_ROOT, "docs", "guides");

function toPosix(value) {
    return value.split(path.sep).join("/");
}

function relativeToProject(value) {
    return toPosix(path.relative(PROJECT_ROOT, value));
}

function normalizeEol(value) {
    return value.replace(/\r\n?/g, "\n");
}

//== welcome.html lives here too (so every hand-authored demo/reference page sits under
//== reference/), but it's the demo's landing panel: a richer layout (coloured cards, pgs-option
//== boxes) than the small prose vocabulary below can convert, and it isn't meant to produce a
//== docs/guides/welcome.md anyway. demo.js fetches it directly instead.
const EXCLUDED_FILES = new Set(["welcome.html"]);

function listGuideFiles() {
    if (!fs.existsSync(REFERENCE_ROOT)) return [];

    return fs.readdirSync(REFERENCE_ROOT, { withFileTypes: true })
        .filter(entry => entry.isFile() && entry.name.toLowerCase().endsWith(".html") && !EXCLUDED_FILES.has(entry.name))
        .map(entry => path.join(REFERENCE_ROOT, entry.name))
        .sort((a, b) => toPosix(a).localeCompare(toPosix(b), "en"));
}

//+ a guide only ever needs @title and @description, both single-line: it has no pgs tokens, no
//+ options, no API of its own to list, so there is nothing else to require or validate
function parseGuide(file, source) {
    const errors = [];
    const relativeFile = relativeToProject(file);
    const content = normalizeEol(source.charCodeAt(0) === 0xFEFF ? source.slice(1) : source);

    const commentMatch = content.match(/^<!--[\t\r\n ]*(\/\*\*[\s\S]*?\*\/)[\t\r\n ]*-->[\t\r\n ]*/);
    if (!commentMatch) {
        errors.push({ file: relativeFile, message: "Missing the initial <!-- /** ... */ --> doc comment." });
        return { errors };
    }

    const lines = commentMatch[1].split("\n");
    if (lines[0].trim() !== "/**" || lines.at(-1).trim() !== "*/") {
        errors.push({ file: relativeFile, message: "Doc comment delimiters must be /** and */ on their own lines." });
        return { errors };
    }

    let title = "";
    let description = "";
    for (let i = 1; i < lines.length - 1; i++) {
        const match = lines[i].match(/^\s*\*(?: ?(.*))?$/);
        const line = (match ? match[1] || "" : "").trim();
        if (!line) continue;

        const titleMatch = line.match(/^@title\s+(.+)$/);
        if (titleMatch) { title = titleMatch[1].trim(); continue; }

        const descriptionMatch = line.match(/^@description\s+(.+)$/);
        if (descriptionMatch) { description = descriptionMatch[1].trim(); continue; }

        errors.push({ file: relativeFile, message: `Unexpected line in doc comment (only @title and @description are used here): "${line}"` });
    }

    if (!title) errors.push({ file: relativeFile, message: "Missing @title." });
    if (!description) errors.push({ file: relativeFile, message: "Missing @description." });

    const body = content.slice(commentMatch[0].length).trim();
    if (!body) errors.push({ file: relativeFile, message: "No body content found below the doc comment." });

    return { errors, title, description, body };
}

function unescapeHtml(value) {
    return value
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, "\"")
        .replace(/&#0?39;/g, "'")
        .replace(/&amp;/g, "&");
}

//+ inline formatting inside a paragraph or list item: code/strong/em/a, then flatten any
//+ line-wrapping from the source into single spaces, matching how a browser would collapse it
function convertInline(html) {
    return unescapeHtml(
        html
            .replace(/<code>([\s\S]*?)<\/code>/g, "`$1`")
            .replace(/<strong>([\s\S]*?)<\/strong>/g, "**$1**")
            .replace(/<em>([\s\S]*?)<\/em>/g, "*$1*")
            .replace(/<a\s+href="([^"]*)">([\s\S]*?)<\/a>/g, "[$2]($1)")
    ).replace(/\s+/g, " ").trim();
}

//+ the whole supported vocabulary: h2-h4, p, ul/ol > li, and pre>code (fenced, left verbatim
//+ aside from unescaping). Anything else in a guide's body is a mistake, not a silent pass-through.
const BLOCK_PATTERN = /<h([234])>([\s\S]*?)<\/h\1>|<p>([\s\S]*?)<\/p>|<(ul|ol)>([\s\S]*?)<\/\4>|<pre><code(?:\s+class="language-([\w-]+)")?>([\s\S]*?)<\/code><\/pre>/g;
const LIST_ITEM_PATTERN = /<li>([\s\S]*?)<\/li>/g;

function convertBodyToMarkdown(file, body) {
    const errors = [];
    const blocks = [];
    let lastIndex = 0;
    let match;

    BLOCK_PATTERN.lastIndex = 0;
    while ((match = BLOCK_PATTERN.exec(body))) {
        const between = body.slice(lastIndex, match.index).trim();
        if (between) {
            errors.push({ file: relativeToProject(file), message: `Unrecognized markup outside the supported h2-h4/p/ul/ol/pre>code tags: "${between.slice(0, 80)}"` });
        }
        lastIndex = match.index + match[0].length;

        const [, level, heading, paragraph, listTag, listBody, codeLang, codeBody] = match;

        if (level) {
            blocks.push(`${"#".repeat(Number(level))} ${convertInline(heading)}`);
        } else if (paragraph !== undefined) {
            blocks.push(convertInline(paragraph));
        } else if (listTag) {
            const items = [];
            let itemMatch;
            LIST_ITEM_PATTERN.lastIndex = 0;
            while ((itemMatch = LIST_ITEM_PATTERN.exec(listBody))) {
                items.push(itemMatch[1]);
            }
            const rendered = items.map((item, index) => {
                const marker = listTag === "ol" ? `${index + 1}.` : "-";
                return `${marker} ${convertInline(item)}`;
            });
            blocks.push(rendered.join("\n"));
        } else {
            const fence = "```";
            blocks.push(`${fence}${codeLang || ""}\n${unescapeHtml(codeBody)}\n${fence}`);
        }
    }

    const tail = body.slice(lastIndex).trim();
    if (tail) {
        errors.push({ file: relativeToProject(file), message: `Unrecognized markup outside the supported h2-h4/p/ul/ol/pre>code tags: "${tail.slice(0, 80)}"` });
    }

    return { errors, markdown: blocks.join("\n\n") };
}

function main() {
    const files = listGuideFiles();
    const errors = [];
    const parsed = [];

    files.forEach(file => {
        const source = fs.readFileSync(file, "utf8");
        const guide = parseGuide(file, source);
        errors.push(...guide.errors);
        if (guide.errors.length) return;

        const converted = convertBodyToMarkdown(file, guide.body);
        errors.push(...converted.errors);
        if (converted.errors.length) return;

        parsed.push({ file, title: guide.title, description: guide.description, markdown: converted.markdown });
    });

    if (errors.length) {
        errors.forEach(error => {
            console.error(`[ERRORE] ${error.file}`);
            console.error(error.message);
            console.error("");
        });
        console.error(`Generazione guide annullata: ${errors.length} errori bloccanti.`);
        process.exitCode = 1;
        return;
    }

    fs.mkdirSync(DOCS_ROOT, { recursive: true });
    const expected = new Set();
    const counts = { created: 0, updated: 0, unchanged: 0, removed: 0 };

    parsed.forEach(({ file, title, description, markdown }) => {
        const relativeSource = relativeToProject(file);
        const outputPath = path.join(DOCS_ROOT, `${path.basename(file, ".html")}.md`);
        expected.add(path.resolve(outputPath));

        const marker = `<!-- Automatically generated from ${relativeSource}. Edit ${relativeSource} and run npm run docs:generate:guides again. -->`;
        const content = [marker, "", `# ${title}`, "", description, "", markdown, ""].join("\n");

        if (!fs.existsSync(outputPath)) {
            fs.writeFileSync(outputPath, content, "utf8");
            counts.created += 1;
            console.log(`[CREATO] ${relativeToProject(outputPath)}`);
            return;
        }

        const existing = normalizeEol(fs.readFileSync(outputPath, "utf8"));
        if (existing === content) {
            counts.unchanged += 1;
            console.log(`[INVARIATO] ${relativeToProject(outputPath)}`);
            return;
        }

        fs.writeFileSync(outputPath, content, "utf8");
        counts.updated += 1;
        console.log(`[AGGIORNATO] ${relativeToProject(outputPath)}`);
    });

    //== stale generated guide left behind by a renamed/removed .html source
    if (fs.existsSync(DOCS_ROOT)) {
        fs.readdirSync(DOCS_ROOT)
            .filter(name => name.toLowerCase().endsWith(".md"))
            .map(name => path.join(DOCS_ROOT, name))
            .filter(file => !expected.has(path.resolve(file)))
            .forEach(file => {
                const firstLine = normalizeEol(fs.readFileSync(file, "utf8")).split("\n", 1)[0];
                if (!/^<!-- Automatically generated from reference\/html\/guides\//.test(firstLine)) return;
                fs.unlinkSync(file);
                counts.removed += 1;
                console.log(`[RIMOSSO] ${relativeToProject(file)}`);
            });
    }

    console.log("");
    console.log(`Riepilogo guide: ${parsed.length} riferimenti validati; ${counts.created} creati; ${counts.updated} aggiornati; ${counts.unchanged} invariati; ${counts.removed} obsoleti rimossi.`);
}

try {
    main();
} catch (error) {
    console.error(`[ERRORE] ${error.message}`);
    process.exitCode = 1;
}
