#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const TEMPLATE_ROOT = path.join(PROJECT_ROOT, "templates", "html");
const DOCS_ROOT = path.join(PROJECT_ROOT, "docs", "components");
const SOURCE_ROOTS = [
    path.join(PROJECT_ROOT, "assets", "javascript"),
    path.join(PROJECT_ROOT, "assets", "scss"),
];

const TAG_ORDER = ["title", "description", "pgs", "pgs-option", "pgs-state", "related", "return"];
const LIST_TAGS = new Set(["pgs", "pgs-option", "pgs-state", "related"]);
const REQUIRED_TAGS = ["title", "description", "pgs"];
const GENERATED_MARKER = /^<!-- File generato automaticamente da (templates\/html\/.+\.html)\. Modificare \1 e rieseguire npm run docs:generate\. -->$/;

function toPosix(value) {
    return value.split(path.sep).join("/");
}

function relativeToProject(value) {
    return toPosix(path.relative(PROJECT_ROOT, value));
}

function normalizeEol(value) {
    return value.replace(/\r\n?/g, "\n");
}

function walkFiles(root, predicate) {
    if (!fs.existsSync(root)) return [];

    const files = [];
    const visit = directory => {
        fs.readdirSync(directory, { withFileTypes: true })
            .sort((a, b) => a.name.localeCompare(b.name, "en"))
            .forEach(entry => {
                const absolute = path.join(directory, entry.name);
                if (entry.isDirectory()) visit(absolute);
                else if (entry.isFile() && predicate(absolute)) files.push(absolute);
            });
    };

    visit(root);
    return files.sort((a, b) => toPosix(a).localeCompare(toPosix(b), "en"));
}

function createError(file, message, suggestion, section, value) {
    return { file, message, suggestion, section, value };
}

function parseDocumentationBlock(file, source) {
    const errors = [];
    const relativeFile = relativeToProject(file);
    const hasBom = source.charCodeAt(0) === 0xFEFF;
    const content = hasBom ? source.slice(1) : source;
    const blockPattern = /\/\*\*[\s\S]*?\*\//g;
    const taggedBlocks = [...content.matchAll(blockPattern)]
        .filter(match => /@(title|description|pgs(?:-option|-state)?|related|return)\b/.test(match[0]));

    if (taggedBlocks.length === 0) {
        errors.push(createError(relativeFile, "Commento strutturato iniziale mancante.", "Aggiungi un blocco /** ... */ come primo contenuto del file."));
        return { errors };
    }

    if (taggedBlocks.length > 1) {
        errors.push(createError(relativeFile, `Trovati ${taggedBlocks.length} commenti strutturati.`, "Mantieni un solo blocco di documentazione iniziale."));
    }

    const first = taggedBlocks[0];
    if (first.index !== 0) {
        errors.push(createError(relativeFile, "Il commento strutturato non è posizionato all'inizio del file.", "Sposta il blocco prima di qualsiasi markup o spazio vuoto."));
    }

    const lines = normalizeEol(first[0]).split("\n");
    if (lines[0].trim() !== "/**" || lines.at(-1).trim() !== "*/") {
        errors.push(createError(relativeFile, "Delimitatori del commento strutturato non validi.", "Usa /** su una riga e */ su una riga separata."));
        return { errors };
    }

    const bodyLines = [];
    for (let index = 1; index < lines.length - 1; index += 1) {
        const match = lines[index].match(/^\s*\*(?: ?(.*))?$/);
        if (!match) {
            errors.push(createError(relativeFile, `Riga ${index + 1} del commento non valida.`, "Prefissa ogni riga interna con *.", "commento"));
            continue;
        }
        bodyLines.push(match[1] || "");
    }

    const data = {
        title: "",
        description: "",
        pgs: [],
        "pgs-option": [],
        "pgs-state": [],
        related: [],
        return: "",
    };
    const seenTags = new Set();
    let activeTag = null;
    let previousOrder = -1;

    bodyLines.forEach((rawLine, lineIndex) => {
        const line = rawLine.trim();
        if (!line) return;

        const tagMatch = line.match(/^@([a-z-]+)(?:\s+(.*))?$/);
        if (tagMatch) {
            const tag = tagMatch[1];
            const value = (tagMatch[2] || "").trim();
            const order = TAG_ORDER.indexOf(tag);

            if (order === -1) {
                errors.push(createError(relativeFile, `Tag sconosciuto @${tag}.`, "Usa solamente i tag previsti dal formato.", `@${tag}`));
                activeTag = null;
                return;
            }
            if (seenTags.has(tag)) {
                errors.push(createError(relativeFile, `Sezione @${tag} duplicata.`, "Mantieni una sola sezione per tag.", `@${tag}`));
            }
            if (order < previousOrder) {
                errors.push(createError(relativeFile, `La sezione @${tag} non rispetta l'ordine canonico.`, `Usa l'ordine: ${TAG_ORDER.map(item => `@${item}`).join(", ")}.`, `@${tag}`));
            }

            seenTags.add(tag);
            previousOrder = Math.max(previousOrder, order);
            activeTag = tag;

            if (LIST_TAGS.has(tag)) {
                if (value) errors.push(createError(relativeFile, `La sezione @${tag} deve iniziare su una riga senza contenuto.`, "Sposta le voci nelle righe successive con il formato - valore: descrizione.", `@${tag}`));
            } else {
                if (!value) errors.push(createError(relativeFile, `Il tag @${tag} è vuoto.`, "Aggiungi il testo sulla stessa riga del tag.", `@${tag}`));
                data[tag] = value;
                activeTag = null;
            }
            return;
        }

        if (!activeTag || !LIST_TAGS.has(activeTag)) {
            errors.push(createError(relativeFile, `Contenuto non associato a un tag alla riga ${lineIndex + 2}.`, "Inserisci il contenuto in una sezione riconosciuta."));
            return;
        }

        const itemMatch = line.match(/^-\s+([^:]+):\s+(.+)$/);
        if (!itemMatch) {
            errors.push(createError(relativeFile, `Voce non valida nella sezione @${activeTag}: "${line}".`, "Usa il formato - valore: descrizione.", `@${activeTag}`));
            return;
        }

        const key = itemMatch[1].trim();
        const description = itemMatch[2].trim();
        if (!key || !description) {
            errors.push(createError(relativeFile, `Voce incompleta nella sezione @${activeTag}.`, "Specifica sia il valore sia la descrizione.", `@${activeTag}`, key));
            return;
        }
        if (data[activeTag].some(item => item.key === key)) {
            errors.push(createError(relativeFile, `Valore duplicato "${key}" nella sezione @${activeTag}.`, "Rimuovi la voce duplicata.", `@${activeTag}`, key));
            return;
        }
        if (activeTag === "pgs-option" && /[\s[\]]/.test(key)) {
            errors.push(createError(relativeFile, `La voce @pgs-option "${key}" non è una chiave valida.`, "Documenta la chiave senza payload, per esempio position invece di position[top left].", "@pgs-option", key));
            return;
        }
        data[activeTag].push({ key, description });
    });

    REQUIRED_TAGS.forEach(tag => {
        const value = data[tag];
        if (!seenTags.has(tag) || (Array.isArray(value) ? value.length === 0 : !value)) {
            errors.push(createError(relativeFile, `Sezione obbligatoria @${tag} mancante o vuota.`, `Aggiungi una sezione @${tag} valida.`, `@${tag}`));
        }
    });

    LIST_TAGS.forEach(tag => {
        if (seenTags.has(tag) && data[tag].length === 0) {
            errors.push(createError(relativeFile, `Sezione @${tag} dichiarata ma vuota.`, `Aggiungi almeno una voce oppure rimuovi la sezione @${tag}.`, `@${tag}`));
        }
    });

    const markupStart = first.index + first[0].length;
    const markup = normalizeEol(content.slice(markupStart)).trim();
    if (!markup) {
        errors.push(createError(relativeFile, "Contenuto HTML mancante sotto il commento.", "Mantieni l'esempio HTML ufficiale dopo il blocco di documentazione."));
    }

    return { errors, data, markup, block: first[0], hasBom };
}

function tokenizeOptions(value) {
    return value.match(/[^\s[\]]+(?:\[[^\]]*\])?/g) || [];
}

function splitOption(value) {
    const match = value.match(/^([^\s[\]]+)(?:\[([^\]]*)\])?$/);
    return match ? { key: match[1], payload: match[2] } : { key: "", payload: undefined };
}

function extractAttributes(markup) {
    const activeMarkup = markup.replace(/<!--[\s\S]*?-->/g, "");
    const result = { pgs: [], options: [], states: [] };
    const pattern = /\b(pgs(?:-option|-state)?)\s*=\s*(["'])([\s\S]*?)\2/g;

    for (const match of activeMarkup.matchAll(pattern)) {
        const attribute = match[1];
        const value = match[3];
        if (attribute === "pgs-option") result.options.push(...tokenizeOptions(value));
        else if (attribute === "pgs-state") result.states.push(...value.trim().split(/\s+/).filter(Boolean));
        else result.pgs.push(...value.trim().split(/\s+/).filter(Boolean));
    }

    Object.keys(result).forEach(key => {
        result[key] = [...new Set(result[key])];
    });
    return result;
}

function stripSourceComments(value) {
    return value
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/.*$/gm, "$1");
}

function normalizeName(value) {
    return value.replace(/^_/, "").replace(/[^a-z0-9]/gi, "").toLowerCase();
}

function singularName(value) {
    return value.endsWith("s") ? value.slice(0, -1) : value;
}

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function containsExactToken(source, token) {
    const escaped = escapeRegExp(token);
    return new RegExp(`(^|[^A-Za-z0-9_-])${escaped}(?=$|[^A-Za-z0-9_-])`).test(source);
}

function containsPgsReference(source, token) {
    const escaped = escapeRegExp(token);
    const patterns = [
        new RegExp(`\\[pgs[^\\]]*(?:["']${escaped}["']|[~=]${escaped})(?=[\\]\\s])`),
        new RegExp(`\\.(?:querySelector|querySelectorAll|contains|add|remove|toggle)\\(\\s*["']${escaped}["']`),
        new RegExp(`pgs\\s*=\\s*["'][^"']*(?:^|\\s)${escaped}(?=\\s|["'])`),
    ];
    return patterns.some(pattern => pattern.test(source));
}

function loadSources() {
    return SOURCE_ROOTS.flatMap(root => walkFiles(root, file => /\.(?:js|scss)$/.test(file)))
        .map(file => ({
            file,
            relative: relativeToProject(file),
            name: normalizeName(path.basename(file, path.extname(file))),
            content: stripSourceComments(normalizeEol(fs.readFileSync(file, "utf8"))),
        }));
}

function associateSources(template, documentation, sources) {
    const basename = normalizeName(path.basename(template, ".html"));
    const singularBasename = singularName(basename);
    const primaryTokens = documentation.pgs.map(item => item.key);

    const nameMatches = sources.filter(source => {
        const singularSource = singularName(source.name);
        return source.name === basename
            || singularSource === singularBasename
            || source.name.startsWith(basename)
            || basename.startsWith(source.name);
    });

    if (nameMatches.length > 0) return nameMatches;
    return sources.filter(source => primaryTokens.some(token => containsPgsReference(source.content, token)));
}

function extractSourceFacts(sources) {
    const facts = { options: new Set(), states: new Set() };

    sources.forEach(source => {
        const content = source.content;
        const optionPatterns = [
            /\.option\.(?:contains|getValueBrackets|setValueBrackets)\(\s*["']([^"']+)["']/g,
            /pgs-option\s*[~*^$|]?=\s*["']([^"'\[\]\s]+)(?:\[[^\]]*\])?["']/g,
        ];
        const statePatterns = [
            /\.state\.(?:add|remove|toggle|contains)\(\s*["']([^"']+)["']/g,
            /pgs-state\s*[~*^$|]?=\s*["']([^"'\s]+)["']/g,
        ];

        optionPatterns.forEach(pattern => {
            for (const match of content.matchAll(pattern)) facts.options.add(splitOption(match[1]).key);
        });
        statePatterns.forEach(pattern => {
            for (const match of content.matchAll(pattern)) facts.states.add(match[1]);
        });
    });

    facts.options.delete("");
    facts.states.delete("");
    return facts;
}

function validatePosition(file, option, errors) {
    if (option.payload === undefined) return;
    const parts = option.payload.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const side = parts[0];
    const align = parts[1];
    const allowed = {
        top: new Set(["left", "center", "right"]),
        bottom: new Set(["left", "center", "right"]),
        left: new Set(["top", "center", "bottom"]),
        right: new Set(["top", "center", "bottom"]),
    };

    if (parts.length !== 2 || !allowed[side]?.has(align)) {
        errors.push(createError(file, `Payload non valido per pgs-option position: "${option.payload}".`, "Usa una coppia lato/allineamento compatibile, per esempio position[bottom center].", "@pgs-option", "position"));
    }
}

function validateTemplate(template, parsed, sources, allSourceContent) {
    const errors = [...parsed.errors];
    if (!parsed.data || !parsed.markup) return errors;

    const file = relativeToProject(template);
    const documentation = parsed.data;
    const attributes = extractAttributes(parsed.markup);
    const documentedPgs = new Set(documentation.pgs.map(item => item.key));
    const documentedRelated = new Set(documentation.related.map(item => item.key));
    const documentedOptions = new Set(documentation["pgs-option"].map(item => item.key));
    const documentedStates = new Set(documentation["pgs-state"].map(item => item.key));
    const associatedSources = associateSources(template, documentation, sources);
    const associatedFacts = extractSourceFacts(associatedSources);

    attributes.pgs.forEach(token => {
        if (!documentedPgs.has(token) && !documentedRelated.has(token)) {
            errors.push(createError(file, `Valore pgs non documentato: "${token}".`, "Aggiungilo a @pgs oppure a @related.", "@pgs", token));
        }
    });

    documentedPgs.forEach(token => {
        if (documentedRelated.has(token)) {
            errors.push(createError(file, `Il valore "${token}" compare sia in @pgs sia in @related.`, "Documentalo in una sola sezione.", "@pgs", token));
        }
    });

    [...documentedPgs, ...documentedRelated].forEach(token => {
        if (!attributes.pgs.includes(token) && !containsExactToken(allSourceContent, token)) {
            errors.push(createError(file, `Valore documentato non trovato nel template, JavaScript o SCSS: "${token}".`, "Correggi il nome oppure rimuovi la voce non implementata.", documentedPgs.has(token) ? "@pgs" : "@related", token));
        }
    });

    attributes.options.forEach(rawOption => {
        const option = splitOption(rawOption);
        if (!option.key) {
            errors.push(createError(file, `Valore pgs-option non valido: "${rawOption}".`, "Correggi la sintassi dell'attributo pgs-option.", "@pgs-option", rawOption));
            return;
        }
        if (!documentedOptions.has(option.key)) {
            errors.push(createError(file, `Valore pgs-option non documentato: "${option.key}".`, "Aggiungi la chiave alla sezione @pgs-option.", "@pgs-option", option.key));
        }
        if (["containerID", "containerPGS", "tabIcon"].includes(option.key) && (!option.payload || !option.payload.trim())) {
            errors.push(createError(file, `Payload mancante per pgs-option "${option.key}".`, `Usa ${option.key}[valore] con un valore non vuoto.`, "@pgs-option", option.key));
        }
        if (option.key === "tabIcon" && /\s/.test(option.payload || "")) {
            errors.push(createError(file, `Il payload tabIcon deve contenere una sola classe: "${option.payload}".`, "Usa una singola classe icona, per esempio tabIcon[fa-user].", "@pgs-option", option.key));
        }
        if (option.key === "position") validatePosition(file, option, errors);
    });

    documentation["pgs-option"].forEach(item => {
        const inTemplate = attributes.options.some(value => splitOption(value).key === item.key);
        if (!inTemplate && !associatedFacts.options.has(item.key) && !containsExactToken(allSourceContent, item.key)) {
            errors.push(createError(file, `Il valore @pgs-option "${item.key}" non è stato trovato nei sorgenti collegati.`, "Correggi il nome o rimuovi l'opzione non implementata.", "@pgs-option", item.key));
        }
    });

    associatedFacts.options.forEach(option => {
        if (!documentedOptions.has(option)) {
            errors.push(createError(file, `Opzione supportata ma non documentata: "${option}".`, "Aggiungila alla sezione @pgs-option.", "@pgs-option", option));
        }
    });

    attributes.states.forEach(state => {
        if (!documentedStates.has(state)) {
            errors.push(createError(file, `Valore pgs-state non documentato: "${state}".`, "Aggiungilo alla sezione @pgs-state.", "@pgs-state", state));
        }
    });

    documentation["pgs-state"].forEach(item => {
        if (!attributes.states.includes(item.key) && !associatedFacts.states.has(item.key) && !containsExactToken(allSourceContent, item.key)) {
            errors.push(createError(file, `Il valore @pgs-state "${item.key}" non è stato trovato nel template, JavaScript o SCSS collegato.`, "Correggi il nome o rimuovi lo stato non implementato.", "@pgs-state", item.key));
        }
    });

    associatedFacts.states.forEach(state => {
        if (!documentedStates.has(state)) {
            errors.push(createError(file, `Stato supportato ma non documentato: "${state}".`, "Aggiungilo alla sezione @pgs-state.", "@pgs-state", state));
        }
    });

    return errors;
}

function renderList(items) {
    return items.map(item => `- \`${item.key}\`: ${item.description}`).join("\n");
}

function renderMarkdown(template, documentation, markup) {
    const relativeTemplate = relativeToProject(template);
    const marker = `<!-- File generato automaticamente da ${relativeTemplate}. Modificare ${relativeTemplate} e rieseguire npm run docs:generate. -->`;
    const sections = [marker, "", `# ${documentation.title}`, "", documentation.description];
    const sectionMap = [
        ["PGS", documentation.pgs],
        ["PGS Options", documentation["pgs-option"]],
        ["PGS States", documentation["pgs-state"]],
        ["Elementi correlati", documentation.related],
    ];

    sectionMap.forEach(([title, items]) => {
        if (items.length === 0) return;
        sections.push("", `## ${title}`, "", renderList(items));
    });

    if (documentation.return) sections.push("", "## Output", "", documentation.return);

    const runs = [...markup.matchAll(/`+/g)].map(match => match[0].length);
    const fence = "`".repeat(Math.max(3, (runs.length ? Math.max(...runs) : 0) + 1));
    sections.push("", "## Esempio", "", `${fence}html`, markup, fence, "");
    return sections.join("\n");
}

function printErrors(errors) {
    errors.forEach(error => {
        console.error(`[ERRORE] ${error.file}`);
        console.error(error.message);
        if (error.section) console.error(`Sezione: ${error.section}`);
        if (error.value) console.error(`Valore: ${error.value}`);
        console.error(`Suggerimento: ${error.suggestion}`);
        console.error("");
    });
    console.error(`Generazione annullata: ${errors.length} errori bloccanti.`);
}

function main() {
    const templates = walkFiles(TEMPLATE_ROOT, file => path.extname(file).toLowerCase() === ".html");
    const errors = [];
    const basenames = new Map();

    templates.forEach(template => {
        const basename = path.basename(template, ".html");
        if (!basenames.has(basename)) basenames.set(basename, []);
        basenames.get(basename).push(template);
    });
    basenames.forEach((files, basename) => {
        if (files.length < 2) return;
        errors.push(createError(relativeToProject(files[0]), `Collisione del basename "${basename}" tra: ${files.map(relativeToProject).join(", ")}.`, "Rinomina uno dei template: docs/components usa una struttura piatta."));
    });

    const sources = loadSources();
    const allSourceContent = sources.map(source => source.content).join("\n");
    const parsedTemplates = templates.map(template => {
        const source = fs.readFileSync(template, "utf8");
        const parsed = parseDocumentationBlock(template, source);
        errors.push(...validateTemplate(template, parsed, sources, allSourceContent));
        return { template, parsed };
    });

    if (errors.length > 0) {
        printErrors(errors);
        process.exitCode = 1;
        return;
    }

    fs.mkdirSync(DOCS_ROOT, { recursive: true });
    const expected = new Set();
    const counts = { created: 0, updated: 0, unchanged: 0, removed: 0 };

    parsedTemplates.forEach(({ template, parsed }) => {
        const output = path.join(DOCS_ROOT, `${path.basename(template, ".html")}.md`);
        const content = renderMarkdown(template, parsed.data, parsed.markup);
        expected.add(path.resolve(output));

        if (!fs.existsSync(output)) {
            fs.writeFileSync(output, content, "utf8");
            counts.created += 1;
            console.log(`[CREATO] ${relativeToProject(output)}`);
            return;
        }

        const existing = normalizeEol(fs.readFileSync(output, "utf8"));
        if (existing === content) {
            counts.unchanged += 1;
            console.log(`[INVARIATO] ${relativeToProject(output)}`);
            return;
        }

        fs.writeFileSync(output, content, "utf8");
        counts.updated += 1;
        console.log(`[AGGIORNATO] ${relativeToProject(output)}`);
    });

    walkFiles(DOCS_ROOT, file => path.extname(file).toLowerCase() === ".md").forEach(file => {
        if (expected.has(path.resolve(file))) return;
        const firstLine = normalizeEol(fs.readFileSync(file, "utf8")).split("\n", 1)[0];
        if (!GENERATED_MARKER.test(firstLine)) return;
        fs.unlinkSync(file);
        counts.removed += 1;
        console.log(`[RIMOSSO] ${relativeToProject(file)}`);
    });

    console.log("");
    console.log(`Riepilogo: ${templates.length} template validati; ${counts.created} creati; ${counts.updated} aggiornati; ${counts.unchanged} invariati; ${counts.removed} obsoleti rimossi.`);
}

try {
    main();
} catch (error) {
    console.error(`[ERRORE] ${error.message}`);
    process.exitCode = 1;
}
