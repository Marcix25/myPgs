"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
class PgsMapIndex {
    constructor() {
        this.map = {};
        //+ every generated child (modal-dialog, _toast-element, ...) points back at the root that
        //+ documents pgs-data written on it directly — used for pgs-data scoping only, never for
        //+ bracket completion (see resolveOwnBracket): no generated child carries its own bracket
        this.generatedToRoot = new Map();
    }
    async init(context) {
        await this.load();
        this.setupWatcher(context);
    }
    getConfig() {
        return vscode.workspace.getConfiguration("pgsHtmlSuggestions");
    }
    getMapPath() {
        return this.getConfig().get("mapPath", "reference/pgs-map.json");
    }
    async load() {
        const map = {};
        const folders = vscode.workspace.workspaceFolders ?? [];
        const mapPath = this.getMapPath();
        for (const folder of folders) {
            const uri = vscode.Uri.joinPath(folder.uri, mapPath);
            try {
                const bytes = await vscode.workspace.fs.readFile(uri);
                const parsed = JSON.parse(Buffer.from(bytes).toString("utf8"));
                Object.assign(map, parsed);
            }
            catch {
                //== not every workspace folder carries the map (e.g. a consumer project without
                //== its own copy) — silently skip, the extension just has less to suggest
            }
        }
        this.map = map;
        this.generatedToRoot.clear();
        for (const [root, entry] of Object.entries(map)) {
            for (const generated of entry["pgs-generated"] ?? []) {
                this.generatedToRoot.set(generated, root);
            }
        }
        void vscode.commands.executeCommand("setContext", "pgsHtmlSuggestions.hasValues", Object.keys(this.map).length > 0);
    }
    //+ resolves a written token (root or a generated child, e.g. slides-next) to the RootInfo
    //+ that documents its data — undefined when the token is unknown. Used to scope pgs-data
    //+ completions, since pgs-data can legitimately be written on a generated child too.
    resolveRoot(token) {
        const direct = this.map[token];
        if (direct)
            return { name: token, options: direct["pgs-options"] ?? [], data: direct["pgs-data"] ?? [] };
        const viaGenerated = this.generatedToRoot.get(token);
        if (viaGenerated) {
            const entry = this.map[viaGenerated];
            if (entry)
                return { name: viaGenerated, options: entry["pgs-options"] ?? [], data: entry["pgs-data"] ?? [] };
        }
        return undefined;
    }
    //+ resolves a written token to the RootInfo that documents ITS OWN bracket, direct matches
    //+ only — no generated child carries one (modal-dialog no longer does either: see _dialog in
    //+ myPgs's _modal.js), so offering options through the generated-child fallback would suggest
    //+ a bracket on a token that can never actually use it
    resolveOwnBracket(token) {
        const direct = this.map[token];
        return direct ? { name: token, options: direct["pgs-options"] ?? [], data: direct["pgs-data"] ?? [] } : undefined;
    }
    //+ every bare word that is valid on its own inside pgs="...": a root, one of its declared
    //+ children, or one of its generated tokens (modal-dialog is legitimately hand-written, per
    //+ reference/html/components/modal.html; an underscore-prefixed one never is, but is still
    //+ offered — with a note — since it is occasionally matched from SCSS/JS, not only authored)
    allBareTokens() {
        const seen = new Set();
        const out = [];
        const push = (token, kind) => {
            if (seen.has(token))
                return;
            seen.add(token);
            out.push({ token, kind });
        };
        for (const [root, entry] of Object.entries(this.map)) {
            push(root, "root");
            for (const child of entry.pgs ?? [])
                push(child, "child");
            for (const generated of entry["pgs-generated"] ?? [])
                push(generated, "generated");
        }
        return out;
    }
    //+ union of every root's pgs-data keys, used as the fallback when a pgs-data completion
    //+ cannot be scoped to a sibling pgs="..." attribute on the same tag
    allDataKeys() {
        const keys = new Set();
        for (const entry of Object.values(this.map)) {
            for (const key of entry["pgs-data"] ?? [])
                keys.add(key);
        }
        return [...keys].sort((a, b) => a.localeCompare(b));
    }
    //+ union of every root's flags, used as the JS-side fallback for .option.*(key) calls, which
    //+ have no element to read a sibling attribute from
    allOptionFlags() {
        const keys = new Set();
        for (const entry of Object.values(this.map)) {
            for (const key of entry["pgs-options"] ?? [])
                keys.add(key);
        }
        return [...keys].sort((a, b) => a.localeCompare(b));
    }
    setupWatcher(context) {
        this.watcher?.dispose();
        const folders = vscode.workspace.workspaceFolders;
        if (!folders?.length)
            return;
        const mapPath = this.getMapPath();
        //== a single glob covering every workspace folder's copy of the map, since
        //== RelativePattern only takes one folder at a time
        for (const folder of folders) {
            const watcher = vscode.workspace.createFileSystemWatcher(new vscode.RelativePattern(folder, mapPath));
            const refresh = () => void this.load();
            watcher.onDidCreate(refresh, null, context.subscriptions);
            watcher.onDidChange(refresh, null, context.subscriptions);
            watcher.onDidDelete(refresh, null, context.subscriptions);
            context.subscriptions.push(watcher);
        }
        context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(async (event) => {
            if (event.affectsConfiguration("pgsHtmlSuggestions")) {
                this.setupWatcher(context);
                await this.load();
            }
        }));
    }
}
//+ every pgs-data key in this codebase carries a [payload], except a handful — like tabsHistory
//+ — that are also valid bare. There is no flag for this in pgs-map.json, so it is judged from
//+ the key's own shape: nothing to lose by offering the bracket form for all of them and letting
//+ the rare bare key be typed by hand
function dataKeyInsertText(key) {
    return new vscode.SnippetString(`${key}[$1]`);
}
//+ text of the current line up to the cursor — every context check below only ever looks
//+ backwards from the cursor, on the current line, matching how these attributes are actually
//+ written in this codebase (one line per element, or at least per attribute)
function linePrefix(document, position) {
    return document.lineAt(position.line).text.slice(0, position.character);
}
//+ true only right after an unescaped pgs="... — the project always double-quotes pgs itself and
//+ single-quotes the flags inside a bracket, so anchoring on " is enough to never misfire on a
//+ flag's own quotes
const PGS_ATTRIBUTE_OPEN = /\bpgs\s*=\s*"([^"]*)$/;
const PGS_DATA_ATTRIBUTE_OPEN = /\bpgs-data\s*=\s*"([^"]*)$/;
//+ matches when the cursor sits inside an UNCLOSED component['...' — the bracket owner is
//+ whatever identifier sits right before the "[", and nothing after it is a "]" yet
const OPEN_BRACKET = /([A-Za-z][\w-]*)\[([^\]]*)$/;
function getPgsAttributeState(document, position) {
    const match = PGS_ATTRIBUTE_OPEN.exec(linePrefix(document, position));
    if (!match)
        return undefined;
    const valueSoFar = match[1];
    const bracket = OPEN_BRACKET.exec(valueSoFar);
    if (!bracket)
        return { valueSoFar };
    return { valueSoFar, bracketOwner: bracket[1], bracketPartial: bracket[2] };
}
//+ every root/child name already written in this pgs="..." value so far — split on the same
//+ rule the runtime parser uses (whitespace outside a bracket), keeping "key[...]" whole
function tokenizeBracketAware(source) {
    const tokens = [];
    let i = 0;
    while (i < source.length) {
        while (i < source.length && /\s/.test(source[i]))
            i++;
        if (i >= source.length)
            break;
        const start = i;
        while (i < source.length && !/\s/.test(source[i]) && source[i] !== "[")
            i++;
        if (i < source.length && source[i] === "[") {
            let depth = 1;
            i++;
            while (i < source.length && depth > 0) {
                if (source[i] === "[")
                    depth++;
                else if (source[i] === "]")
                    depth--;
                i++;
            }
        }
        if (i > start)
            tokens.push(source.slice(start, i));
    }
    return tokens;
}
//+ the flags already chosen inside one specific bracket, e.g. "flexColumn" and "wrap" out of
//+ flex['flexColumn' 'wrap' — used only to rank an already-picked flag lower, never to hide it
function flagsAlreadyInBracket(bracketPartial) {
    return new Set([...bracketPartial.matchAll(/'([^']+)'/g)].map((m) => m[1]));
}
//+ scans backward from the cursor for the start of the current tag ("<"), capped at a handful of
//+ lines so a stray unmatched "<" earlier in the file can never make this scan the whole document
function currentTagTextBeforeCursor(document, position) {
    const maxLinesBack = 5;
    const firstLine = Math.max(0, position.line - maxLinesBack);
    let text = "";
    for (let line = firstLine; line <= position.line; line++) {
        const lineText = line === position.line
            ? document.lineAt(line).text.slice(0, position.character)
            : document.lineAt(line).text;
        const openIndex = lineText.lastIndexOf("<");
        //== a "<" on an earlier line only counts if no tag closed since (no ">" after it on that
        //== same line); once found, every earlier accumulated line is irrelevant
        if (openIndex !== -1 && (line === position.line || lineText.indexOf(">", openIndex) === -1)) {
            text = lineText.slice(openIndex);
        }
        else {
            text += lineText;
        }
    }
    return text;
}
//+ the pgs="..." value written earlier on the SAME tag as the pgs-data the cursor is currently
//+ in, so a pgs-data completion can be scoped to the components actually on this element
function getSiblingPgsValue(document, position) {
    const tagText = currentTagTextBeforeCursor(document, position);
    const match = /\bpgs\s*=\s*"([^"]*)"/.exec(tagText);
    return match?.[1];
}
function rootNamesFromPgsValue(index, pgsValue) {
    const infos = [];
    const seen = new Set();
    for (const token of tokenizeBracketAware(pgsValue)) {
        const bareKey = token.split("[")[0];
        const info = index.resolveRoot(bareKey);
        if (info && !seen.has(info.name)) {
            seen.add(info.name);
            infos.push(info);
        }
    }
    return infos;
}
const JS_CALL_OPEN = /\.\s*(option|data)\s*\.\s*(?:contains|add|remove|toggle|getValueBrackets|setValueBrackets)\s*\(\s*(["'`])[^"'`]*$/;
function getJsCallKind(document, position) {
    const match = JS_CALL_OPEN.exec(linePrefix(document, position));
    return match ? match[1] : undefined;
}
function makeFlagCompletion(flag, detail, alreadyPicked) {
    const item = new vscode.CompletionItem(`'${flag}'`, vscode.CompletionItemKind.EnumMember);
    item.insertText = `'${flag}'`;
    item.filterText = flag;
    item.detail = detail;
    item.sortText = alreadyPicked ? `z_${flag}` : `a_${flag}`;
    item.preselect = !alreadyPicked;
    return item;
}
function makeDataCompletion(key, detail) {
    const item = new vscode.CompletionItem(key, vscode.CompletionItemKind.EnumMember);
    item.insertText = dataKeyInsertText(key);
    item.filterText = key;
    item.detail = detail;
    return item;
}
function makeBareTokenCompletion(token, kind, alreadyUsed) {
    const item = new vscode.CompletionItem(token, vscode.CompletionItemKind.Value);
    item.insertText = token;
    item.detail = alreadyUsed
        ? "già presente"
        : kind === "root"
            ? "componente"
            : kind === "child"
                ? "token figlio"
                : token.startsWith("_")
                    ? "generato dalla libreria — non scriverlo a mano"
                    : "generato dalla libreria, ma può essere scritto a mano (vedi il suo reference)";
    item.sortText = alreadyUsed ? `z_${token}` : kind === "root" ? `a_${token}` : `b_${token}`;
    item.preselect = !alreadyUsed && kind === "root";
    return item;
}
function activate(context) {
    const index = new PgsMapIndex();
    void index.init(context);
    context.subscriptions.push(vscode.commands.registerCommand("pgsHtmlSuggestions.rescan", async () => {
        await index.load();
        vscode.window.showInformationMessage("PGS: pgs-map.json ricaricato.");
    }));
    const markupProvider = {
        provideCompletionItems(document, position) {
            const dataState = PGS_DATA_ATTRIBUTE_OPEN.exec(linePrefix(document, position));
            if (dataState) {
                const siblingPgs = getSiblingPgsValue(document, position);
                const roots = siblingPgs ? rootNamesFromPgsValue(index, siblingPgs) : [];
                const keys = roots.length
                    ? [...new Set(roots.flatMap((r) => r.data))].sort((a, b) => a.localeCompare(b))
                    : index.allDataKeys();
                const scopeLabel = roots.length ? roots.map((r) => r.name).join(", ") : "tutti i componenti";
                return keys.map((key) => makeDataCompletion(key, `pgs-data di ${scopeLabel}`));
            }
            const pgsState = getPgsAttributeState(document, position);
            if (!pgsState)
                return [];
            if (pgsState.bracketOwner) {
                const root = index.resolveOwnBracket(pgsState.bracketOwner);
                if (!root)
                    return [];
                const already = flagsAlreadyInBracket(pgsState.bracketPartial ?? "");
                return root.options.map((flag) => makeFlagCompletion(flag, `opzione di ${root.name}`, already.has(flag)));
            }
            //== bare word: offer every root/child/generated token, ranking whatever is already
            //== on this pgs value lower rather than hiding it, in case the author wants to see it
            const alreadyUsed = new Set(tokenizeBracketAware(pgsState.valueSoFar).map((t) => t.split("[")[0]));
            return index.allBareTokens().map(({ token, kind }) => makeBareTokenCompletion(token, kind, alreadyUsed.has(token)));
        }
    };
    const jsProvider = {
        provideCompletionItems(document, position) {
            const kind = getJsCallKind(document, position);
            if (!kind)
                return [];
            if (kind === "data") {
                return index.allDataKeys().map((key) => {
                    const item = new vscode.CompletionItem(key, vscode.CompletionItemKind.EnumMember);
                    item.insertText = key;
                    item.detail = "chiave pgs-data (di un componente qualsiasi — nessun elemento da cui dedurlo qui)";
                    return item;
                });
            }
            return index.allOptionFlags().map((flag) => {
                const item = new vscode.CompletionItem(flag, vscode.CompletionItemKind.EnumMember);
                item.insertText = flag;
                item.detail = "flag (di un componente qualsiasi — nessun elemento da cui dedurlo qui)";
                return item;
            });
        }
    };
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider([
        { language: "html", scheme: "file" },
        { language: "php", scheme: "file" },
        { language: "twig", scheme: "file" },
        { language: "vue", scheme: "file" }
    ], markupProvider, '"', "'", "[", " ", "-"));
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider([
        { language: "javascript", scheme: "file" },
        { language: "javascriptreact", scheme: "file" },
        { language: "typescript", scheme: "file" },
        { language: "typescriptreact", scheme: "file" }
    ], jsProvider, '"', "'", "`"));
}
function deactivate() {
    // subscriptions are disposed by VS Code.
}
//# sourceMappingURL=extension.js.map