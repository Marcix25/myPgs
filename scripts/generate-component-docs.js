#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const REFERENCE_ROOT = path.join(PROJECT_ROOT, "reference", "html");
const DOCS_ROOT = path.join(PROJECT_ROOT, "docs");
const MANAGED_DOC_DIRECTORIES = ["base", "components", "layout", "patterns", "helper"]
    .map(directory => path.join(DOCS_ROOT, directory));
const SOURCE_ROOTS = [
    path.join(PROJECT_ROOT, "assets", "javascript"),
    path.join(PROJECT_ROOT, "assets", "scss"),
];

const TAG_ORDER = ["title", "description", "pgs", "pgs-generated", "pgs-option", "pgs-state", "api", "related", "return"];
const LIST_TAGS = new Set(["pgs", "pgs-generated", "pgs-option", "pgs-state", "api", "related"]);
const REQUIRED_TAGS = ["title", "description", "pgs"];
//== a helper (reference/html/helper/*.html) documents a JavaScript utility, not markup a component
//== owns: it may touch no pgs token of its own at all, so @api carries the weight @pgs carries
//== everywhere else, and @pgs is optional there instead of required
const HELPER_REQUIRED_TAGS = ["title", "description", "api"];
const GENERATED_MARKER = /^<!-- (?:Automatically generated from ((?:reference|templates)\/html\/.+\.html)\. Edit \1 and run npm run docs:generate again\.|File generato automaticamente da ((?:reference|templates)\/html\/.+\.html)\. Modificare \2 e rieseguire npm run docs:generate\.) -->$/;

function toPosix(value) {
    return value.split(path.sep).join("/");
}

function relativeToProject(value) {
    return toPosix(path.relative(PROJECT_ROOT, value));
}

function getOutputPath(template) {
    const relativeTemplate = path.relative(REFERENCE_ROOT, template);
    return path.join(DOCS_ROOT, relativeTemplate.replace(/\.html$/i, ".md"));
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
        .filter(match => /@(title|description|pgs(?:-option|-state)?|api|related|return)\b/.test(match[0]));
    const initialHtmlComment = content.match(/^<!--[\t\r\n ]*(\/\*\*[\s\S]*?\*\/)[\t\r\n ]*-->/);

    if (taggedBlocks.length === 0) {
        errors.push(createError(relativeFile, "Commento strutturato iniziale mancante.", "Aggiungi un blocco <!-- /** ... */ --> come primo contenuto del file."));
        return { errors };
    }

    if (taggedBlocks.length > 1) {
        errors.push(createError(relativeFile, `Trovati ${taggedBlocks.length} commenti strutturati.`, "Mantieni un solo blocco di documentazione iniziale."));
    }

    const first = taggedBlocks[0];
    const hasValidHtmlWrapper = initialHtmlComment && initialHtmlComment[1] === first[0];
    if (!hasValidHtmlWrapper) {
        errors.push(createError(
            relativeFile,
            "Il commento strutturato non è un commento HTML iniziale valido.",
            "Posizionalo all'inizio e racchiudi il blocco /** ... */ tra <!-- e -->, così il browser non lo mostra nella pagina.",
        ));
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
        "pgs-generated": [],
        "pgs-option": [],
        "pgs-state": [],
        api: [],
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

    const isHelper = toPosix(path.relative(REFERENCE_ROOT, file)).startsWith("helper/");
    const requiredTags = isHelper ? HELPER_REQUIRED_TAGS : REQUIRED_TAGS;
    requiredTags.forEach(tag => {
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

    const documentationContainer = hasValidHtmlWrapper ? initialHtmlComment[0] : first[0];
    const markupStart = hasValidHtmlWrapper ? documentationContainer.length : first.index + documentationContainer.length;
    const markup = normalizeEol(content.slice(markupStart)).trim();
    if (!markup) {
        errors.push(createError(relativeFile, "Contenuto HTML mancante sotto il commento.", "Mantieni l'esempio HTML ufficiale dopo il blocco di documentazione."));
    }

    return { errors, data, markup, block: documentationContainer, hasBom };
}

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

//+ mirrors assets/javascript/_pgs.js tokenizeOptionValue: keeps "key[...]" whole even when the payload has its own [...]
function tokenizeOptions(value) {
    const tokens = [];
    let i = 0;

    while (i < value.length) {
        while (i < value.length && /\s/.test(value[i])) i++;
        if (i >= value.length) break;

        const start = i;
        while (i < value.length && !/\s/.test(value[i]) && value[i] !== "[") i++;

        if (i < value.length && value[i] === "[") {
            const close = findMatchingBracket(value, i);
            i = close === -1 ? value.length : close + 1;
        }

        if (i > start) tokens.push(value.slice(start, i));
    }

    return tokens;
}

function splitOption(value) {
    const openIndex = value.indexOf("[");
    if (openIndex === -1) return /^[^\s[\]]+$/.test(value) ? { key: value, payload: undefined } : { key: "", payload: undefined };

    const key = value.slice(0, openIndex);
    const closeIndex = findMatchingBracket(value, openIndex);
    if (!key || closeIndex !== value.length - 1) return { key: "", payload: undefined };

    return { key, payload: value.slice(openIndex + 1, closeIndex) };
}

//+ a demo="component"/demo="container" wrapper is grouping-only (and never rendered in the docs
//+ Example section, see extractDemoItems) ONLY when it actually contains demo="item" children — in
//+ that case its own pgs/pgs-option/pgs-state attributes are incidental layout and shouldn't force a
//+ doc requirement. demo="container" says so upfront (a plain layout element that exists only to
//+ arrange the demo, never meant to be authored); demo="component" also gets this treatment, but
//+ only once items are found, since without them the element itself is the rendered example and its
//+ attributes are the real subject.
function stripComponentWrapperAttributes(markup) {
    const openTagPattern = /<([a-zA-Z][a-zA-Z0-9-]*)\b[^>]*\bdemo\s*=\s*["'](?:component|container)["'][^>]*>/g;
    let result = "";
    let lastIndex = 0;
    let match;

    while ((match = openTagPattern.exec(markup))) {
        const tagName = match[1];
        const openTag = match[0];
        const openTagEnd = match.index + openTag.length;
        const end = findMatchingCloseTag(markup, tagName, openTagEnd);
        const innerContent = end === -1 ? "" : markup.slice(openTagEnd, end);
        const hasItems = /\bdemo\s*=\s*["']item["']/.test(innerContent);

        result += markup.slice(lastIndex, match.index);
        result += hasItems ? openTag.replace(/\s+pgs(?:-option|-state)?\s*=\s*("[^"]*"|'[^']*')/g, "") : openTag;

        lastIndex = openTagEnd;
        openTagPattern.lastIndex = openTagEnd;
    }

    result += markup.slice(lastIndex);
    return result;
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

    //== an exact (or singular) name match is the reference's own source, so prefix matches are
    //== only a fallback: without this, form.scss counts as a source of formAddon.html merely
    //== because "formaddon" starts with "form", and every option added to one is demanded of both
    const exactMatches = sources.filter(source =>
        source.name === basename || singularName(source.name) === singularBasename);

    if (exactMatches.length > 0) return exactMatches;

    const nameMatches = sources.filter(source =>
        source.name.startsWith(basename) || basename.startsWith(source.name));

    if (nameMatches.length > 0) return nameMatches;
    return sources.filter(source => primaryTokens.some(token => containsPgsReference(source.content, token)));
}

//== a token the JavaScript writes onto an element it builds: pgs().add(), markup assembled as a
//== string, or a direct setAttribute. Reading a token (querySelector) is deliberately not counted,
//== because that is how the library finds markup the author wrote.
function extractEmittedPgs(source) {
    if (!source.file.endsWith(".js")) return [];

    const emitted = new Set();
    const patterns = [
        /pgs\([^)]*\)\s*\.\s*add\(([^)]*)\)/g,
        /setAttribute\(\s*["']pgs["']\s*,\s*(["'][^"']+["'])/g,
    ];

    patterns.forEach(pattern => {
        for (const match of source.content.matchAll(pattern)) {
            for (const token of match[1].matchAll(/["']([A-Za-z_][\w-]*(?:\s+[A-Za-z_][\w-]*)*)["']/g)) {
                token[1].split(/\s+/).forEach(value => emitted.add(value));
            }
        }
    });

    for (const match of source.content.matchAll(/\bpgs\s*=\s*\\?["']([^"'\\`$]+)/g)) {
        match[1].split(/\s+/).forEach(value => {
            if (/^[A-Za-z_][\w-]*$/.test(value)) emitted.add(value);
        });
    }

    return [...emitted];
}

function extractSourceFacts(sources) {
    const facts = { options: new Set(), states: new Set(), emitted: new Set() };

    sources.forEach(source => {
        const content = source.content;
        const optionPatterns = [
            /\.option\.(?:contains|getValueBrackets|setValueBrackets)\(\s*["']([^"']+)["']\s*(?=[,)])/g,
            /pgs-option\s*[~*^$|]?=\s*["']([^"'\[\]\s]+)(?:\[[^\]]*\])?["']/g,
        ];
        const statePatterns = [
            /\.state\.(?:add|remove|toggle|contains)\(\s*["']([^"']+)["']\s*(?=[,)])/g,
            /pgs-state\s*[~*^$|]?=\s*["']([^"'\s]+)["']/g,
        ];

        optionPatterns.forEach(pattern => {
            for (const match of content.matchAll(pattern)) facts.options.add(splitOption(match[1]).key);
        });
        statePatterns.forEach(pattern => {
            for (const match of content.matchAll(pattern)) facts.states.add(match[1]);
        });
        extractEmittedPgs(source).forEach(token => facts.emitted.add(token));
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
        errors.push(createError(file, `Payload non valido per pgs-option dropdownPosition: "${option.payload}".`, "Usa una coppia lato/allineamento compatibile, per esempio dropdownPosition[bottom center].", "@pgs-option", "dropdownPosition"));
    }
}

function validateTemplate(template, parsed, sources, allSourceContent) {
    const errors = [...parsed.errors];
    if (!parsed.data || !parsed.markup) return errors;

    const file = relativeToProject(template);
    const documentation = parsed.data;
    const attributes = extractAttributes(stripComponentWrapperAttributes(parsed.markup));
    //== the wrapper's own pgs is stripped from the rendered example, but the author still wrote it,
    //== so the "is this authored?" question has to be asked of the template as written
    const authoredPgs = new Set(extractAttributes(parsed.markup).pgs);
    const documentedPgs = new Set(documentation.pgs.map(item => item.key));
    const documentedGenerated = new Set(documentation["pgs-generated"].map(item => item.key));
    const documentedRelated = new Set(documentation.related.map(item => item.key));
    const documentedOptions = new Set(documentation["pgs-option"].map(item => item.key));
    const documentedStates = new Set(documentation["pgs-state"].map(item => item.key));
    const associatedSources = associateSources(template, documentation, sources);
    const associatedFacts = extractSourceFacts(associatedSources);

    attributes.pgs.forEach(token => {
        if (!documentedPgs.has(token) && !documentedGenerated.has(token) && !documentedRelated.has(token)) {
            errors.push(createError(file, `Valore pgs non documentato: "${token}".`, "Aggiungilo a @pgs oppure a @related.", "@pgs", token));
        }
    });

    //== the underscore is the visible half of the convention: it may only mark markup the library
    //== builds, and it has to agree with the declaration
    [...documentedPgs, ...documentedRelated].forEach(token => {
        if (!token.startsWith("_")) return;

        errors.push(createError(file, `Il valore "${token}" inizia con "_" ma non è in @pgs-generated.`, "L'underscore marca solo il markup costruito dalla libreria: spostalo in @pgs-generated oppure togli il prefisso.", documentedPgs.has(token) ? "@pgs" : "@related", token));
    });

    //== the declaration has to keep matching the JavaScript, otherwise the tag rots into a comment
    documentedGenerated.forEach(token => {
        if (!associatedFacts.emitted.has(token)) {
            errors.push(createError(file, `Il valore @pgs-generated "${token}" non è generato dal JavaScript.`, "Spostalo in @pgs se ora si scrive a mano, oppure correggi il nome.", "@pgs-generated", token));
        }
    });

    //== a token the JavaScript builds and no example writes by hand is not authorable markup:
    //== either it belongs in @pgs-generated, or the example should show how to write it
    associatedFacts.emitted.forEach(token => {
        if (!documentedPgs.has(token) || authoredPgs.has(token)) return;

        errors.push(createError(file, `Il valore @pgs "${token}" è generato dal JavaScript e non compare nell'esempio.`, "Spostalo in @pgs-generated, oppure scrivilo nell'esempio se si può comporre a mano.", "@pgs", token));
    });

    documentedPgs.forEach(token => {
        if (documentedGenerated.has(token)) {
            errors.push(createError(file, `Il valore "${token}" compare sia in @pgs sia in @pgs-generated.`, "Documentalo in una sola sezione.", "@pgs", token));
        }

        if (documentedRelated.has(token)) {
            errors.push(createError(file, `Il valore "${token}" compare sia in @pgs sia in @related.`, "Documentalo in una sola sezione.", "@pgs", token));
        }
    });

    [...documentedPgs, ...documentedGenerated, ...documentedRelated].forEach(token => {
        const usedAsOption = attributes.options.some(value => splitOption(value).key === token);
        if (!attributes.pgs.includes(token) && !usedAsOption && !containsExactToken(allSourceContent, token)) {
            errors.push(createError(file, `Valore documentato non trovato nel template, JavaScript o SCSS: "${token}".`, "Correggi il nome oppure rimuovi la voce non implementata.", documentedPgs.has(token) ? "@pgs" : "@related", token));
        }
    });

    attributes.options.forEach(rawOption => {
        const option = splitOption(rawOption);
        if (!option.key) {
            errors.push(createError(file, `Valore pgs-option non valido: "${rawOption}".`, "Correggi la sintassi dell'attributo pgs-option.", "@pgs-option", rawOption));
            return;
        }
        if (!documentedOptions.has(option.key) && !documentedRelated.has(option.key)) {
            errors.push(createError(file, `Valore pgs-option non documentato: "${option.key}".`, "Aggiungi la chiave alla sezione @pgs-option oppure a @related.", "@pgs-option", option.key));
        }
        if (["modalContainerID", "modalContainerPGS", "stepTabsIcon"].includes(option.key) && (!option.payload || !option.payload.trim())) {
            errors.push(createError(file, `Payload mancante per pgs-option "${option.key}".`, `Usa ${option.key}[valore] con un valore non vuoto.`, "@pgs-option", option.key));
        }
        //== stepTabsIcon accetta tre forme: markup completo (da "<"), il nome di un glifo interno, o una
        //== lista di classi. Solo la seconda deve restare una parola sola, perche' e' una chiave:
        //== le classi possono essere piu' di una e il markup contiene spazi per costruzione
        if (option.key === "stepTabsIcon") {
            const payload = (option.payload || "").trim();
            if (payload.startsWith("icon-") && /\s/.test(payload)) {
                errors.push(createError(file, `Il nome di un glifo in stepTabsIcon deve essere una parola sola: "${option.payload}".`, "Usa il markup completo, il nome di un glifo, oppure una lista di classi: stepTabsIcon[<i pgs='icon' pgs-option='icon-check'></i>], stepTabsIcon[icon-check], stepTabsIcon[fa-regular fa-star].", "@pgs-option", option.key));
            }
            if (payload.startsWith("<") && !/<[a-zA-Z][^>]*>/.test(payload)) {
                errors.push(createError(file, `Il markup di stepTabsIcon non e' un tag valido: "${option.payload}".`, "Scrivi un elemento completo, con gli attributi interni fra apici singoli.", "@pgs-option", option.key));
            }
        }
        if (option.key === "dropdownPosition") validatePosition(file, option, errors);
    });

    documentation["pgs-option"].forEach(item => {
        const inTemplate = attributes.options.some(value => splitOption(value).key === item.key);
        if (!inTemplate && !associatedFacts.options.has(item.key) && !containsExactToken(allSourceContent, item.key)) {
            errors.push(createError(file, `Il valore @pgs-option "${item.key}" non è stato trovato nei sorgenti collegati.`, "Correggi il nome o rimuovi l'opzione non implementata.", "@pgs-option", item.key));
        }
    });

    //== @related counts here as it does for the options written in the example: a component whose
    //== markup carries an option owned by another component documents it as a reference, not as one
    //== of its own. Demanding @pgs-option would put a foreign key in this component's table, which
    //== reads as an offer to configure something this component does not own
    associatedFacts.options.forEach(option => {
        if (!documentedOptions.has(option) && !documentedRelated.has(option)) {
            errors.push(createError(file, `Opzione supportata ma non documentata: "${option}".`, "Aggiungila alla sezione @pgs-option, oppure a @related se appartiene a un altro componente.", "@pgs-option", option));
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

    documentation.api.forEach(item => {
        const signature = item.key.match(/^(?:new\s+)?((?:pgs|instance)(?:\.[A-Za-z_$][\w$]*)+)\([^)]*\)$/);
        if (!signature) {
            errors.push(createError(file, `Firma API non valida: "${item.key}".`, "Usa una firma chiamabile, per esempio pgs.modal.api(element) oppure instance.open().", "@api", item.key));
            return;
        }

        const identifiers = signature[1].split(".");
        const implementationName = identifiers.at(-1);
        if (!containsExactToken(allSourceContent, implementationName)) {
            errors.push(createError(file, `API documentata non trovata nei sorgenti: "${item.key}".`, "Correggi la firma oppure rimuovi il metodo non esposto.", "@api", item.key));
        }
    });

    return errors;
}

function renderList(items) {
    return items.map(item => `- \`${item.key}\`: ${item.description}`).join("\n");
}

//+ dedents a block by the smallest leading whitespace found among its non-empty lines
function dedent(text) {
    const lines = text.replace(/^\n/, "").replace(/\s+$/, "").split("\n");
    const indents = lines.filter(line => line.trim().length > 0).map(line => line.match(/^\s*/)[0].length);
    const minIndent = indents.length ? Math.min(...indents) : 0;
    return lines.map(line => line.slice(minIndent)).join("\n");
}

//+ pulls a <script type="..."> reference block out of the markup so it can render as its own titled section
function extractScriptBlock(markup, typeValue) {
    const safeType = escapeRegExp(typeValue);
    const pattern = new RegExp(`<script\\b[^>]*\\btype\\s*=\\s*["']${safeType}["'][^>]*>([\\s\\S]*?)<\\/script>`, "i");
    const match = markup.match(pattern);
    if (!match) return { content: null, markup };

    const cleanedMarkup = (markup.slice(0, match.index) + markup.slice(match.index + match[0].length))
        .replace(/\n{3,}/g, "\n\n")
        .trim();

    return { content: dedent(match[1]), markup: cleanedMarkup };
}

function stripDemoAttributesFromMarkup(html) {
    return html.replace(/\s+demo(?:-title|-description|-preview|-code)?\s*=\s*("[^"]*"|'[^']*')/g, "");
}

//+ an element that only groups the example for the demo is not part of the example: demo-code="children"
//+ keeps it in the live preview but prints what is inside it instead of itself. Unlike the outermost
//+ wrapper this also has to handle several marked elements side by side (see Border's rows of spans),
//+ not just a single nested chain, so it scans the whole string for a match rather than assuming the
//+ next one is always at the very start.
function unwrapScaffold(markup) {
    let current = markup.trim();
    const openTagPattern = /<([a-zA-Z][a-zA-Z0-9-]*)\b[^>]*>/g;

    while (true) {
        openTagPattern.lastIndex = 0;
        let match;
        let target = null;

        while ((match = openTagPattern.exec(current))) {
            if (/\bdemo-code\s*=\s*(["'])children\1/.test(match[0])) {
                target = match;
                break;
            }
        }

        if (!target) return current;

        const openEnd = target.index + target[0].length;
        const end = findMatchingCloseTag(current, target[1], openEnd);
        if (end === -1) return current;

        const closing = current.lastIndexOf("<", end - 1);
        const inner = dedent(current.slice(openEnd, closing));

        current = current.slice(0, target.index) + inner + current.slice(end);
    }
}

//+ finds the index right after the closing tag matching an opening tag of tagName starting at fromIndex,
//+ counting nested occurrences of that same tag name (ignores every other tag, including void elements like <img>)
function findMatchingCloseTag(markup, tagName, fromIndex) {
    const tagPattern = new RegExp(`<(\\/?)${tagName}\\b[^>]*>`, "gi");
    tagPattern.lastIndex = fromIndex;
    let depth = 1;
    let match;

    while ((match = tagPattern.exec(markup))) {
        if (match[1]) {
            depth--;
            if (depth === 0) return match.index + match[0].length;
        } else if (!match[0].endsWith("/>")) {
            depth++;
        }
        tagPattern.lastIndex = match.index + match[0].length;
    }

    return -1;
}

//+ removes every demo="disabled" element (whole subtree) from the rendered "## Example" output — test-only
//+ markup that shouldn't appear in the generated docs, even though it stays in the file and still counts
//+ for @pgs/@pgs-option/@related validation (which runs on the untouched markup, not this output)
function stripDisabledElements(markup) {
    const openTagPattern = /<([a-zA-Z][a-zA-Z0-9-]*)\b[^>]*\bdemo\s*=\s*["']disabled["'][^>]*>/g;
    let result = "";
    let lastIndex = 0;
    let match;

    while ((match = openTagPattern.exec(markup))) {
        const tagName = match[1];
        const openTagEnd = match.index + match[0].length;
        const end = findMatchingCloseTag(markup, tagName, openTagEnd);
        const removeEnd = end === -1 ? openTagEnd : end;

        result += markup.slice(lastIndex, match.index);
        lastIndex = removeEnd;
        openTagPattern.lastIndex = removeEnd;
    }

    result += markup.slice(lastIndex);
    return result.replace(/\n{3,}/g, "\n\n").trim();
}

//+ pulls out every demo="item" element with its demo-title/demo-description, stripping those attributes from the returned markup
function extractDemoItems(markup) {
    const openTagPattern = /<([a-zA-Z][a-zA-Z0-9-]*)\b[^>]*\bdemo\s*=\s*["']item["'][^>]*>/g;
    const items = [];
    let match;

    while ((match = openTagPattern.exec(markup))) {
        const tagName = match[1];
        const openTagEnd = match.index + match[0].length;
        const end = findMatchingCloseTag(markup, tagName, openTagEnd);
        if (end === -1) {
            openTagPattern.lastIndex = openTagEnd;
            continue;
        }

        //== demo-code="none" says there's nothing worth copying for this item (see demo.js);
        //== an Example section with no code to show is simply left out
        if (/\bdemo-code\s*=\s*["']none["']/.test(match[0])) {
            openTagPattern.lastIndex = end;
            continue;
        }

        const titleMatch = match[0].match(/\bdemo-title\s*=\s*(["'])((?:(?!\1).)*)\1/);
        const descriptionMatch = match[0].match(/\bdemo-description\s*=\s*(["'])((?:(?!\1).)*)\1/);

        const lineStart = markup.lastIndexOf("\n", match.index) + 1;
        const baseIndent = markup.slice(lineStart, match.index).match(/^[ \t]*$/) ? markup.slice(lineStart, match.index) : "";
        const outer = markup.slice(match.index, end);
        const dedented = baseIndent ? outer.replace(new RegExp(`^${escapeRegExp(baseIndent)}`, "gm"), "") : outer;

        items.push({
            title: titleMatch ? titleMatch[2] : "",
            description: descriptionMatch ? descriptionMatch[2] : "",
            markup: stripDemoAttributesFromMarkup(unwrapScaffold(dedented)).trim(),
        });

        openTagPattern.lastIndex = end;
    }

    return items;
}

function fenceFor(text) {
    const runs = [...text.matchAll(/`+/g)].map(run => run[0].length);
    return "`".repeat(Math.max(3, (runs.length ? Math.max(...runs) : 0) + 1));
}

//+ related elements can be borrowed from any of the three attribute kinds (pgs/pgs-option/pgs-state);
//+ split them into labeled subgroups by how they're actually used in this template's markup, so a
//+ reader can tell which attribute to put each one in without re-checking the source
function renderRelatedSection(items, markup) {
    const attributes = extractAttributes(markup);
    const isOption = key => attributes.options.some(value => splitOption(value).key === key);
    const isState = key => attributes.states.includes(key);
    const isPgs = key => attributes.pgs.includes(key);

    const groups = [
        ["PGS", items.filter(item => isPgs(item.key))],
        ["PGS Options", items.filter(item => !isPgs(item.key) && isOption(item.key))],
        ["PGS States", items.filter(item => !isPgs(item.key) && !isOption(item.key) && isState(item.key))],
    ];
    const grouped = new Set(groups.flatMap(([, groupItems]) => groupItems));
    const ungrouped = items.filter(item => !grouped.has(item));

    const lines = ["", "## Related elements"];
    groups.forEach(([label, groupItems]) => {
        if (!groupItems.length) return;
        lines.push("", `### ${label}`, "", renderList(groupItems));
    });
    if (ungrouped.length) lines.push("", "### Other", "", renderList(ungrouped));
    return lines;
}

function renderMarkdown(template, documentation, markup) {
    const relativeTemplate = relativeToProject(template);
    const marker = `<!-- Automatically generated from ${relativeTemplate}. Edit ${relativeTemplate} and run npm run docs:generate again. -->`;
    const sections = [marker, "", `# ${documentation.title}`, "", documentation.description];
    const sectionMap = [
        ["PGS", documentation.pgs],
        ["PGS generated by JavaScript", documentation["pgs-generated"]],
        ["PGS Options", documentation["pgs-option"]],
        ["PGS States", documentation["pgs-state"]],
        ["JavaScript API", documentation.api],
    ];

    sectionMap.forEach(([title, items]) => {
        if (items.length === 0) return;
        sections.push("", `## ${title}`, "", renderList(items));
    });

    if (documentation.related.length) sections.push(...renderRelatedSection(documentation.related, markup));

    if (documentation.return) sections.push("", "## Output", "", documentation.return);

    const { content: jsonSchema, markup: markupAfterJson } = extractScriptBlock(markup, "application/json");
    const { content: jsUsage, markup: cleanedMarkup } = extractScriptBlock(markupAfterJson, "text/x-example-js");

    //== the payload is the value of a pgs-option attribute, so print it as one
    if (jsonSchema) sections.push("", "## PGS Option fields", "", "```html", `pgs-option='${jsonSchema}'`, "```", "");
    if (jsUsage) sections.push("", "## JavaScript Usage", "", "```js", jsUsage, "```", "");

    const exampleMarkup = stripDisabledElements(cleanedMarkup);
    const demoItems = extractDemoItems(exampleMarkup);

    if (demoItems.length > 0 || exampleMarkup) sections.push("", "## Example", "");

    if (demoItems.length > 0) {
        demoItems.forEach((item, index) => {
            if (index > 0) sections.push("");
            if (item.title) sections.push(`### ${item.title}`, "");
            if (item.description) sections.push(item.description, "");
            const itemFence = fenceFor(item.markup);
            sections.push(`${itemFence}html`, item.markup, itemFence);
        });
        sections.push("");
    } else if (exampleMarkup) {
        const fence = fenceFor(exampleMarkup);
        sections.push(`${fence}html`, exampleMarkup, fence, "");
    }

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
    const references = walkFiles(REFERENCE_ROOT, file => path.extname(file).toLowerCase() === ".html");
    const errors = [];
    const outputPaths = new Map();

    references.forEach(template => {
        const output = toPosix(path.relative(DOCS_ROOT, getOutputPath(template))).toLowerCase();
        if (!outputPaths.has(output)) outputPaths.set(output, []);
        outputPaths.get(output).push(template);
    });
    outputPaths.forEach((files, output) => {
        if (files.length < 2) return;
        errors.push(createError(relativeToProject(files[0]), `Collisione del percorso di output "docs/${output}" tra: ${files.map(relativeToProject).join(", ")}.`, "Rinomina uno dei template per ottenere percorsi Markdown distinti."));
    });

    const sources = loadSources();
    const allSourceContent = sources.map(source => source.content).join("\n");
    const parsedReferences = references.map(template => {
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

    const expected = new Set();
    const counts = { created: 0, updated: 0, unchanged: 0, removed: 0 };

    parsedReferences.forEach(({ template, parsed }) => {
        const output = getOutputPath(template);
        const content = renderMarkdown(template, parsed.data, parsed.markup);
        expected.add(path.resolve(output));
        fs.mkdirSync(path.dirname(output), { recursive: true });

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

    MANAGED_DOC_DIRECTORIES
        .flatMap(directory => walkFiles(directory, file => path.extname(file).toLowerCase() === ".md"))
        .forEach(file => {
        if (expected.has(path.resolve(file))) return;
        const firstLine = normalizeEol(fs.readFileSync(file, "utf8")).split("\n", 1)[0];
        if (!GENERATED_MARKER.test(firstLine)) return;
        fs.unlinkSync(file);
        counts.removed += 1;
        console.log(`[RIMOSSO] ${relativeToProject(file)}`);
        });

    console.log("");
    console.log(`Riepilogo: ${references.length} riferimenti HTML validati; ${counts.created} creati; ${counts.updated} aggiornati; ${counts.unchanged} invariati; ${counts.removed} obsoleti rimossi.`);
}

try {
    main();
} catch (error) {
    console.error(`[ERRORE] ${error.message}`);
    process.exitCode = 1;
}
