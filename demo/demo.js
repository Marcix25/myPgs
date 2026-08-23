//# DEMO PAGE

//= Documentation parsing (browser-side port of scripts/generate-component-docs.js)
const TAG_ORDER = ["title", "description", "pgs", "pgs-option", "pgs-state", "api", "related", "return"];
const LIST_TAGS = new Set(["pgs", "pgs-option", "pgs-state", "api", "related"]);
const LIST_TAG_LABELS = {
    pgs: "PGS",
    "pgs-option": "PGS Options",
    "pgs-state": "PGS States",
    api: "API",
    related: "Related elements",
};
const CATEGORY_LABELS = {
    components: "Componenti",
    layout: "Layout",
    patterns: "Pattern",
};
const ENTRY_ICONS = {
    "base/general.html": "fa-sliders",
    "base/heading.html": "fa-heading",
    "base/color.html": "fa-palette",
    "base/darkmode.html": "fa-moon",
    "base/svg.html": "fa-bezier-curve",
    "components/notification.html": "fa-bell",
    "components/card.html": "fa-id-card",
    "components/slides.html": "fa-images",
    "components/button.html": "fa-hand-pointer",
    "components/formAddon.html": "fa-puzzle-piece",
    "components/form.html": "fa-pen-to-square",
    "components/search.html": "fa-magnifying-glass",
    "components/summary.html": "fa-list",
    "components/menu.html": "fa-bars",
    "components/tooltip.html": "fa-comment",
    "components/modal.html": "fa-window-restore",
    "components/stepTabs.html": "fa-shoe-prints",
    "components/accordion.html": "fa-layer-group",
    "components/alerts.html": "fa-triangle-exclamation",
    "components/badges.html": "fa-tag",
    "components/breadcumbs.html": "fa-route",
    "components/dropdown.html": "fa-caret-down",
    "components/logo.html": "fa-star",
    "components/steps.html": "fa-shoe-prints",
    "components/table.html": "fa-table",
    "components/toast.html": "fa-bread-slice",
    "patterns/cookieConsent.html": "fa-cookie-bite",
    "base/body.html": "fa-file-code",
    "layout/responsive.html": "fa-mobile-screen",
    "layout/breakpoints.html": "fa-mobile-screen",
    "layout/spacing.html": "fa-ruler",
    "layout/utilities.html": "fa-wrench",
    "layout/section.html": "fa-table-cells",
    "layout/pageShell.html": "fa-table-columns",
};
const DEFAULT_ENTRY_ICON = "fa-square";

//= Reference Renderer HTML
const demoRenderer = {
    referenceFiles: [
        "base/body.html",
        "base/general.html",
        "base/heading.html",
        "base/color.html",
        "base/darkmode.html",
        "base/svg.html",
        "components/notification.html",
        "components/card.html",
        "components/slides.html",
        "components/button.html",
        "components/formAddon.html",
        "components/form.html",
        "components/search.html",
        "components/summary.html",
        "components/menu.html",
        "components/tooltip.html",
        "components/modal.html",
        "components/stepTabs.html",
        "components/accordion.html",
        "components/alerts.html",
        "components/badges.html",
        "components/breadcumbs.html",
        "components/dropdown.html",
        "components/logo.html",
        "components/steps.html",
        "components/table.html",
        "components/toast.html",
        "patterns/cookieConsent.html",
        "layout/header.html",
        "layout/responsive.html",
        "layout/breakpoints.html",
        "layout/spacing.html",
        "layout/utilities.html",
        "layout/section.html",
        "layout/pageShell.html",
        "layout/footer.html",
    ],

    getReferenceTitle(path) {
        return path.replace(".html", "").replace("/", " / ");
    },

    getSlug(path) {
        return path.replace(/\.html$/, "").replace(/\//g, "-");
    },

    getCategory(path) {
        const prefix = path.split("/")[0];
        return CATEGORY_LABELS[prefix] || prefix;
    },

    getEntryLabel(path) {
        return path.split("/").pop().replace(/\.html$/, "");
    },

    //= dedents a block by the smallest leading whitespace found among its non-empty lines
    //= (browser-side port of scripts/generate-component-docs.js)
    dedent(text) {
        const lines = text.replace(/^\n/, "").replace(/\s+$/, "").split("\n");
        const indents = lines.filter(line => line.trim().length > 0).map(line => line.match(/^\s*/)[0].length);
        const minIndent = indents.length ? Math.min(...indents) : 0;
        return lines.map(line => line.slice(minIndent)).join("\n");
    },

    //= pulls a <script type="..."> reference block out of the markup so it can render as its own
    //= titled section, exactly like the generated markdown does
    extractScriptBlock(markup, typeValue) {
        const safeType = typeValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const pattern = new RegExp(`<script\\b[^>]*\\btype\\s*=\\s*["']${safeType}["'][^>]*>([\\s\\S]*?)<\\/script>`, "i");
        const match = markup.match(pattern);
        if (!match) return { content: null, markup };

        const cleanedMarkup = (markup.slice(0, match.index) + markup.slice(match.index + match[0].length))
            .replace(/\n{3,}/g, "\n\n")
            .trim();

        return { content: this.dedent(match[1]), markup: cleanedMarkup };
    },

    //= a whole page skeleton cannot survive innerHTML: the parser drops <!DOCTYPE>, <html> and
    //= <head> and hoists their content into the wrapper. Those files are shown as source only,
    //= printed verbatim, so the markup the reader copies is the one actually written in the file.
    isDocumentMarkup(markup) {
        return /<!DOCTYPE\s|<html[\s>]/i.test(markup);
    },

    //= removes every demo="disabled" element (whole subtree) from a markup string — used only to build
    //= the "Example HTML" code text; the live preview always renders the untouched original markup
    stripDisabled(markup) {
        const template = document.createElement("template");
        template.innerHTML = markup;
        template.content.querySelectorAll('[demo="disabled"]').forEach(el => el.remove());
        const wrapper = document.createElement("div");
        wrapper.append(template.content);
        return wrapper.innerHTML.trim();
    },

    parseDocumentation(html) {
        //== not anchored to the very start: some local dev servers (live-reload, etc.) inject a
        //== script/comment before the fetched fragment, which would otherwise break a ^-anchored match
        const match = html.match(/<!--[\t\r\n ]*(\/\*\*[\s\S]*?\*\/)[\t\r\n ]*-->[\t\r\n ]*/);
        if (!match) return { data: null, markup: html.trim() };

        const lines = match[1].replace(/\r\n?/g, "\n").split("\n");
        const data = { title: "", description: "", pgs: [], "pgs-option": [], "pgs-state": [], api: [], related: [], return: "" };
        let activeTag = null;

        for (let index = 1; index < lines.length - 1; index += 1) {
            const bodyMatch = lines[index].match(/^\s*\*(?: ?(.*))?$/);
            const line = (bodyMatch ? bodyMatch[1] || "" : "").trim();
            if (!line) continue;

            const tagMatch = line.match(/^@([a-z-]+)(?:\s+(.*))?$/);
            if (tagMatch) {
                const tag = tagMatch[1];
                if (!TAG_ORDER.includes(tag)) {
                    activeTag = null;
                    continue;
                }
                activeTag = tag;
                if (!LIST_TAGS.has(tag)) data[tag] = (tagMatch[2] || "").trim();
                continue;
            }

            if (!activeTag || !LIST_TAGS.has(activeTag)) continue;
            const itemMatch = line.match(/^-\s+([^:]+):\s+(.+)$/);
            if (!itemMatch) continue;
            data[activeTag].push({ key: itemMatch[1].trim(), description: itemMatch[2].trim() });
        }

        return { data, markup: html.slice(match.index + match[0].length).trim() };
    },

    renderExampleSource(section, markup, title = "Example HTML") {
        const wrapper = document.createElement("div");
        wrapper.className = "exampleSource";

        const heading = document.createElement("strong");
        heading.className = "exampleSource-title";
        heading.textContent = title;

        const copyButton = document.createElement("button");
        copyButton.type = "button";
        copyButton.className = "exampleSource-copy";
        copyButton.setAttribute("aria-label", "Copia il codice HTML");

        const icon = document.createElement("i");
        icon.className = "fa-solid fa-copy";
        icon.setAttribute("aria-hidden", "true");
        copyButton.append(icon);

        copyButton.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(markup);
                icon.className = "fa-solid fa-check";
                copyButton.setAttribute("aria-label", "Copiato");
                setTimeout(() => {
                    icon.className = "fa-solid fa-copy";
                    copyButton.setAttribute("aria-label", "Copia il codice HTML");
                }, 1500);
            } catch (error) {
                console.error("Copia negli appunti non riuscita.", error);
            }
        });

        const pre = document.createElement("pre");
        const code = document.createElement("code");
        code.textContent = markup;
        pre.append(code);

        wrapper.append(heading, copyButton, pre);
        section.append(wrapper);
    },

    renderReference(section, path, html) {
        const content = document.createElement("div");
        content.setAttribute("pgs", "container flexColumn gapElements");
        content.innerHTML = html;
        section.append(content);
    },

    stripDemoAttributes(node) {
        ["demo", "demo-title", "demo-description"].forEach(attribute => {
            node.removeAttribute(attribute);
            node.querySelectorAll(`[${attribute}]`).forEach(el => el.removeAttribute(attribute));
        });
        return node;
    },

    renderDemoHeading(section, title, description, level) {
        if (!title && !description) return;
        const heading = document.createElement("div");
        heading.setAttribute("pgs", "flexColumn gapTexts");

        if (title) {
            const el = document.createElement(level);
            el.textContent = title;
            heading.append(el);
        }
        if (description) {
            const p = document.createElement("p");
            p.textContent = description;
            heading.append(p);
        }
        section.append(heading);
    },

    renderDemoItem(section, node) {
        const group = document.createElement("div");
        group.setAttribute("pgs", "flexColumn gapElements");

        this.renderDemoHeading(group, node.getAttribute("demo-title"), node.getAttribute("demo-description"), "h2");

        //== the live preview always renders the full item, untouched by demo="disabled"
        const preview = document.createElement("div");
        preview.setAttribute("pgs", "container flexColumn gapElements");
        preview.append(this.stripDemoAttributes(node.cloneNode(true)));
        group.append(preview);

        //== "Example HTML" is the only thing demo="disabled" affects: skip it entirely when the
        //== item's own root is disabled, otherwise strip just the disabled descendants from the code
        if (node.getAttribute("demo") !== "disabled") {
            const codeClone = node.cloneNode(true);
            codeClone.querySelectorAll('[demo="disabled"]').forEach(el => el.remove());
            this.stripDemoAttributes(codeClone);
            this.renderExampleSource(group, codeClone.outerHTML.trim());
        }

        section.append(group);
    },

    //= Splits markup tagged with demo="component"/demo="item" into one live-preview + code pair per item,
    //= falling back to a single whole-markup pair for reference files that don't use those tags yet.
    renderExamplePairs(section, path, markup) {
        if (!markup.trim()) return;

        const template = document.createElement("template");
        template.innerHTML = markup;

        const components = Array.from(template.content.querySelectorAll('[demo="component"]'));
        if (!components.length) {
            //== the live preview always renders the full original markup; demo="disabled" only
            //== affects the "Example HTML" code block below it, never what actually runs in the demo
            this.renderReference(section, path, markup);

            const codeMarkup = this.stripDisabled(markup);
            if (codeMarkup) this.renderExampleSource(section, codeMarkup);
            return;
        }

        components.forEach(component => {
            const items = Array.from(component.querySelectorAll('[demo="item"]'));

            //== with no items the component is its own item, and renderDemoItem already prints
            //== that node's title and description: printing them here too would duplicate them
            if (items.length) {
                this.renderDemoHeading(section, component.getAttribute("demo-title"), component.getAttribute("demo-description"), "h3");
            }

            (items.length ? items : [component]).forEach(node => this.renderDemoItem(section, node));
        });
    },

    renderHeader(section, title, description) {
        const header = document.createElement("div");
        header.setAttribute("pgs", "flexColumn gapTexts");

        const heading = document.createElement("h1");
        heading.textContent = title;
        header.append(heading);

        if (description) {
            const p = document.createElement("p");
            p.textContent = description;
            header.append(p);
        }

        section.append(header);
    },

    //= not anchored to the very start on purpose: mirrors extractAttributes in scripts/generate-component-docs.js,
    //= scanning the whole markup for pgs/pgs-option/pgs-state attribute usage
    extractAttributeUsage(markup) {
        const activeMarkup = markup.replace(/<!--[\s\S]*?-->/g, "");
        const usage = { pgs: new Set(), "pgs-option": new Set(), "pgs-state": new Set() };
        const pattern = /\b(pgs(?:-option|-state)?)\s*=\s*("([^"]*)"|'([^']*)')/g;
        let match;
        while ((match = pattern.exec(activeMarkup))) {
            const attribute = match[1];
            const value = match[3] ?? match[4] ?? "";
            value.trim().split(/\s+/).filter(Boolean).forEach(token => usage[attribute].add(token.split("[")[0]));
        }
        return usage;
    },

    renderDocList(container, items) {
        const list = document.createElement("ul");
        list.setAttribute("pgs", "flexColumn gapTexts");
        items.forEach(item => {
            const li = document.createElement("li");
            const code = document.createElement("code");
            code.textContent = item.key;
            li.append(code, document.createTextNode(`: ${item.description}`));
            list.append(li);
        });
        container.append(list);
    },

    renderDocGroup(container, label, items, level) {
        if (!items.length) return;
        const group = document.createElement("div");
        group.setAttribute("pgs", "flexColumn gapTexts");

        const heading = document.createElement(level);
        heading.className = level === "h4" ? "docBlock-heading" : "docBlock-subheading";
        heading.textContent = label;
        group.append(heading);

        this.renderDocList(group, items);
        container.append(group);
    },

    //= related elements can be borrowed from any of the three attribute kinds (pgs/pgs-option/pgs-state);
    //= split them into labeled subgroups by how they're actually used in this file's markup, mirroring
    //= renderRelatedSection in scripts/generate-component-docs.js so demo and generated docs stay in sync
    renderRelatedGroup(doc, items, markup) {
        if (!items.length) return;
        const usage = this.extractAttributeUsage(markup);
        const isPgs = key => usage.pgs.has(key);
        const isOption = key => usage["pgs-option"].has(key);
        const isState = key => usage["pgs-state"].has(key);

        const buckets = [
            ["PGS", items.filter(item => isPgs(item.key))],
            ["PGS Options", items.filter(item => !isPgs(item.key) && isOption(item.key))],
            ["PGS States", items.filter(item => !isPgs(item.key) && !isOption(item.key) && isState(item.key))],
        ];
        const grouped = new Set(buckets.flatMap(([, groupItems]) => groupItems));
        buckets.push(["Other", items.filter(item => !grouped.has(item))]);

        const wrapper = document.createElement("div");
        wrapper.setAttribute("pgs", "flexColumn gapTexts");

        const heading = document.createElement("h4");
        heading.className = "docBlock-heading";
        heading.textContent = "Related elements";
        wrapper.append(heading);

        buckets.forEach(([label, groupItems]) => this.renderDocGroup(wrapper, label, groupItems, "h5"));
        doc.append(wrapper);
    },

    renderDocumentation(section, data, markup) {
        if (!data) return;
        const doc = document.createElement("div");
        doc.className = "docBlock";
        doc.setAttribute("pgs", "box flexColumn gapElements");

        this.renderDocGroup(doc, LIST_TAG_LABELS.pgs, data.pgs || [], "h4");
        this.renderDocGroup(doc, LIST_TAG_LABELS["pgs-option"], data["pgs-option"] || [], "h4");
        this.renderDocGroup(doc, LIST_TAG_LABELS["pgs-state"], data["pgs-state"] || [], "h4");
        this.renderDocGroup(doc, LIST_TAG_LABELS.api, data.api || [], "h4");
        this.renderRelatedGroup(doc, data.related || [], markup);

        if (doc.children.length) section.append(doc);
    },


    //== the demo renders page-level layouts (header.html) inside the main area, so their modals
    //== would resolve containerPGS[header] against the *real* page header and move their dialog
    //== in there, hijacking the header's own bell and hamburger: keep those dialogs local instead.
    isolateDemoModals(root) {
        root.querySelectorAll('[pgs~="modal"]').forEach(modal => {
            const option = modal.getAttribute("pgs-option");
            if (!option || !option.includes("containerPGS")) return;

            const cleaned = option.replace(/containerPGS\[[^\]]*\]/g, "").replace(/\s+/g, " ").trim();
            if (cleaned) modal.setAttribute("pgs-option", cleaned);
            else modal.removeAttribute("pgs-option");
        });

        //== a second notificationBell would build a second panel competing for the single shared
        //== "notifications" container, so strip its modal role: the real header bell answers for it.
        root.querySelectorAll('[pgs~="notificationBell"]').forEach(bell => {
            this.removeToken(bell.closest('[pgs~="modal"]'), "pgs", "modal");
            this.removeToken(bell, "pgs", "modal-button");
            this.removeToken(bell, "pgs", "modal-close");
        });
    },

    removeToken(element, attribute, token) {
        if (!element) return;

        const value = (element.getAttribute(attribute) || "").split(/\s+/).filter(item => item && item !== token).join(" ");
        if (value) element.setAttribute(attribute, value);
        else element.removeAttribute(attribute);
    },

    renderNav(nav, entries) {
        const groups = new Map();
        entries.forEach(entry => {
            const prefix = entry.path.split("/")[0];
            if (!groups.has(prefix)) groups.set(prefix, []);
            groups.get(prefix).push(entry);
        });

        groups.forEach((items, prefix) => {
            const category = CATEGORY_LABELS[prefix] || prefix;

            const heading = document.createElement("p");
            heading.id = prefix;
            heading.innerHTML = `<strong>${category}</strong>`;
            nav.append(heading);

            const menu = document.createElement("nav");
            menu.setAttribute("pgs", "menu");
            menu.setAttribute("pgs-option", "vertical menuHeader");
            menu.setAttribute("aria-label", `Menu ${category}`);

            const list = document.createElement("ul");
            items.forEach(({ path }) => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.href = `#${this.getSlug(path)}`;
                a.dataset.panelLink = path;

                const icon = document.createElement("i");
                icon.className = `fa-solid ${ENTRY_ICONS[path] || DEFAULT_ENTRY_ICON}`;
                icon.setAttribute("aria-hidden", "true");

                const span = document.createElement("span");
                span.textContent = this.getEntryLabel(path);

                a.append(icon, span);
                li.append(a);
                list.append(li);
            });
            menu.append(list);
            nav.append(menu);
        });
    },

    setupNavigation(entries) {
        const NAV = document.getElementById("reference-demo-nav");
        const MAIN = document.getElementById("reference-demo-main");

        const activate = (path, resetScroll = true) => {
            const panel = MAIN.querySelector(`[data-panel="${CSS.escape(path)}"]`);
            if (!panel) return;

            MAIN.querySelectorAll("[data-panel]").forEach(el => { el.hidden = el !== panel; });
            NAV.querySelectorAll("a[data-panel-link]").forEach(link => {
                if (link.dataset.panelLink === path) link.setAttribute("aria-current", "page");
                else link.removeAttribute("aria-current");
            });

            //== only the window scrolls (the aside owns its own overflow via shellAsideScroll), and
            //== switching panel is a page change, not a jump inside one: start it from the top, the
            //== way a real navigation would, instead of inheriting the previous panel's offset.
            if (resetScroll) window.scrollTo({ top: 0, behavior: "instant" });
        };

        window.addEventListener("hashchange", () => {
            const entry = entries.find(item => this.getSlug(item.path) === location.hash.slice(1));
            if (entry) activate(entry.path);
        });

        //== the deep link on load is honoured by boot(), which scrolls to the requested heading once
        //== every panel is mounted: resetting here would undo it.
        const initialEntry = entries.find(item => this.getSlug(item.path) === location.hash.slice(1)) || entries[0];
        if (initialEntry) activate(initialEntry.path, false);
    },

    async loadReference(path) {
        const response = await fetch(`../reference/html/${path}`);
        if (!response.ok) throw new Error(`${path}: ${response.status}`);

        //== dev servers with live reload inject their own script into every file they serve
        //== (VS Code Live Preview does), which would then show up inside the examples
        return (await response.text())
            .replace(/[\t ]*<script\b[^>]*(?:___vscode_livepreview_injected_script|livereload|browser-sync)[^>]*>\s*<\/script>\n?/gi, "");
    },

    initPgsJavascript() {
        const pgsApi = globalThis.pgs;
        if (!pgsApi) throw new Error("Bundle PGS non caricato");
        pgsApi.init(document);
    },

    async boot() {
        const MAIN = document.getElementById("reference-demo-main");
        const NAV = document.getElementById("reference-demo-nav");
        const menuEntries = [];

        //== header and footer are written straight into demo.html, so here they are just
        //== two more reference panels: they show up in the nav like every other layout
        for (const path of this.referenceFiles) {

            const panel = document.createElement("div");
            panel.dataset.panel = path;
            panel.hidden = true;
            panel.setAttribute("pgs", "flexColumn gapElements");

            let section;
            const isSection = path !== "layout/section.html" && path !== "layout/pageShell.html"
            isSection ? section = document.createElement("section") : section = document.createElement("div");

            if (isSection) section.setAttribute("pgs", "flexColumn gapElements");

            section.dataset.reference = path;
            let title = this.getReferenceTitle(path);

            try {
                const html = await this.loadReference(path);
                const { data, markup } = this.parseDocumentation(html);
                if (data?.title) title = data.title;
                this.renderHeader(section, title, data?.description);
                this.renderDocumentation(section, data, markup);

                //== the reference script blocks get their own titled section and leave the markup,
                //== in the same order the generated markdown uses: schema, usage, then the example
                const { content: jsonSchema, markup: afterJson } = this.extractScriptBlock(markup, "application/json");
                const { content: jsUsage, markup: exampleMarkup } = this.extractScriptBlock(afterJson, "text/x-example-js");

                if (jsonSchema) this.renderExampleSource(section, jsonSchema, "JSON Schema");
                if (jsUsage) this.renderExampleSource(section, jsUsage, "JavaScript Usage");

                if (this.isDocumentMarkup(exampleMarkup)) {
                    this.renderExampleSource(section, exampleMarkup.trim());
                } else {
                    this.renderExamplePairs(section, path, exampleMarkup);
                }
            } catch (error) {
                this.renderHeader(section, title);
                const message = document.createElement("p");
                message.textContent = `Riferimento non caricato: ${error.message}`;
                section.append(message);
            }

            panel.append(section);
            if (!isSection) {
                section.style.display = "contents";
                Array.from(section.children).forEach(child => child.style.width = "100%");
            }

            MAIN.append(panel);
            menuEntries.push({ path, title });
        }

        this.renderNav(NAV, menuEntries);
        this.setupNavigation(menuEntries);

        try {
            //# CORE
            this.isolateDemoModals(MAIN);
            this.initPgsJavascript();
            configureSearchDemo();
            configureFormDemo();
            configureNotificationDemo();
            document.body.classList.remove('is-loading');
            //# end CORE
        } catch (error) {
            console.error("Demo PGS non inizializzata.", error);
        }

        //== category nav headings (e.g. #layout) are appended asynchronously after these fetches,
        //== so the browser's own scroll-to-fragment-on-load already ran and found nothing; redo it here.
        const target = document.getElementById(location.hash.slice(1));
        if (target) target.scrollIntoView({ block: "start" });
    },
};

//= Search Demo
function configureSearchDemo() {
    const pgsApi = globalThis.pgs;
    const section = document.querySelector('[data-reference="components/search.html"]');
    if (!pgsApi?.search || !section) return;

    pgsApi(document).querySelectorAll("search").forEach(search => {
        pgsApi.search.api(search)?.configure({
            minLength: 2,
            debounce: 250,
            source: async ({ query, signal, limit }) => {
                const url = new URL("https://it.wikipedia.org/w/api.php");
                url.search = new URLSearchParams({
                    action: "opensearch",
                    search: query,
                    limit: String(limit),
                    namespace: "0",
                    format: "json",
                    origin: "*",
                });

                const response = await fetch(url, { signal });
                if (!response.ok) throw new Error(`Wikipedia HTTP ${response.status}`);

                const payload = await response.json();
                const suggestions = Array.isArray(payload?.[1]) ? payload[1] : [];
                const descriptions = Array.isArray(payload?.[2]) ? payload[2] : [];
                const links = Array.isArray(payload?.[3]) ? payload[3] : [];

                return suggestions.map((suggestion, index) => ({
                    label: suggestion,
                    value: suggestion,
                    data: {
                        description: descriptions[index] ?? "",
                        url: links[index] ?? "",
                    },
                }));
            },
        });
    });

    const note = document.createElement("small");
    note.append("Suggerimenti dimostrativi forniti da ");
    const link = document.createElement("a");
    link.href = "https://www.mediawiki.org/wiki/API:Opensearch/it";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Wikipedia OpenSearch";
    note.append(link, ". Prova a scrivere prodotti di o come fare.");
    section.append(note);
}

//= Form Demo
function configureFormDemo() {
    const pgsApi = globalThis.pgs;
    const section = document.querySelector('[data-reference="components/form.html"]');
    const form = section?.querySelector('[pgs~="form"]');
    if (!form) return;

    const formValidate = new pgsApi.formValidate(form, {
        message: {
            fieldError: "Please complete this field",
            fieldsError: "Please complete all required fields",
            success: "Sent successfully"
        }
    });

    //== new roules
    formValidate.addNewRule(() => {
        const password = form.querySelector('input[name="password"]');
        const confirmPassword = form.querySelector('input[name="confirmPassword"]');
        if (!password || !confirmPassword) return;
        if (password.value && confirmPassword.value && password.value !== confirmPassword.value) {
            pgsApi(confirmPassword).option.setValueBrackets("message", "Le password non coincidono");
            return [confirmPassword, password];
        }
    });

    //== validate
    formValidate.validator(event => {
        const values = Object.fromEntries(new FormData(form));

        //// Sostituisci questo log con l'invio dei dati al tuo backend.
        console.log(values);
    }, "submit");
}

//= Notification Demo
function configureNotificationDemo() {
    const pgsApi = globalThis.pgs;
    const section = document.querySelector('[data-reference="components/notification.html"]');
    if (!pgsApi?.notification || !section) return;

    //== isolateDemoModals stripped the modal role off every bell rendered in the main area, because
    //== two panels would fight over the single shared "notifications" container: the real header bell
    //== owns the only panel, so clicking a demo bell clicks that one.
    const headerBell = Array.from(document.querySelectorAll('[pgs~="notificationBell"]'))
        .find(bell => !bell.closest("#reference-demo-main"));
    document.querySelectorAll('#reference-demo-main [pgs~="notificationBell"]').forEach(bell => {
        bell.addEventListener("click", () => headerBell?.click());
    });

    //== catch every button click regardless of how the notification was created (JS call or markup)
    document.addEventListener("pgs:notification:buttonClick", (event) => {
        console.log("pgs:notification:buttonClick", event.detail);

        //// Solo per testare: risposta al sondaggio "Si"/"No".
        //// Sostituisci con la vera chiamata al server (fetch/ajax).
        if (event.detail.buttonId === "yes" || event.detail.buttonId === "no") {
            console.log("Invio risposta sondaggio al server:", event.detail.buttonId);
        }

        //// Sostituisci questo setTimeout con la tua logica reale (es. tracking, salvataggio).
        //// Serve per capire se il codice asincrono fa in tempo a finire prima che la pagina cambi.
        setTimeout(() => console.log("Async work finished for", event.detail.buttonId), 1000);
    });

    // const welcomeButton = document.createElement("button");
    // welcomeButton.type = "button";
    // welcomeButton.setAttribute("pgs", "button");
    // welcomeButton.textContent = "Demo: notifica con link";
    // welcomeButton.addEventListener("click", () => {
    //     pgsApi.notification.info({
    //         title: "Benvenuto",
    //         description: "Completa il caricamento del tuo profilo.",
    //         buttons: [{ title: "Vai al profilo", link: "#" }]
    //     });
    // });
    // section.append(welcomeButton);

    // const surveyButton = document.createElement("button");
    // surveyButton.type = "button";
    // surveyButton.setAttribute("pgs", "button");
    // surveyButton.textContent = "Demo: sondaggio con più bottoni";
    // surveyButton.addEventListener("click", () => {
    //     pgsApi.notification.info({
    //         title: "Ti sta piacendo il portale?",
    //         description: "La tua opinione ci aiuta a migliorare.",
    //         buttons: [
    //             { id: "yes", title: "Si", close: true },
    //             { id: "no", title: "No", close: true },
    //         ]
    //     });
    // });
    // section.append(surveyButton);
}

demoRenderer.boot();
