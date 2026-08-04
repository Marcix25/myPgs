//# DEMO PAGE

//= Reference Renderer HTML
const demoRenderer = {
    referenceFiles: [
        "layout/header.html",
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
        "components/tooltip.html",
        "components/logo.html",
        "components/steps.html",
        "components/table.html",
        "components/notification.html",
        "patterns/cookieConsent.html",
        "layout/body.html",
        "layout/responsive.html",
        "layout/spacing.html",
        "layout/section.html",
        "layout/pageShell.html",
        "layout/footer.html",
    ],

    getReferenceTitle(path) {
        return path.replace(".html", "").replace("/", " / ");
    },

    stripReferenceDocumentation(html) {
        return html.replace(/^\uFEFF?<!--[\t\r\n ]*\/\*\*[\s\S]*?\*\/[\t\r\n ]*-->[\t\r\n ]*/, "");
    },

    renderSourceReference(section, html) {
        const pre = document.createElement("pre");
        const code = document.createElement("code");
        code.textContent = html.trim();
        pre.append(code);
        section.append(pre);
    },

    renderReference(section, path, html) {
        const content = document.createElement("div");
        content.setAttribute("pgs", "container flexColumn gapElements");
        content.innerHTML = html;
        section.append(content);
    },

    renderLayout(root, path, html) {
        const template = document.createElement("template");
        template.innerHTML = html.trim();
        root.append(template.content.cloneNode(true));
    },

    renderTitle(section, path) {
        const title = document.createElement("p");
        title.classList.add("reference-title");
        title.innerHTML = "<strong>" + this.getReferenceTitle(path) + "</strong>";
        section.append(title);
    },

    async loadReference(path) {
        const response = await fetch(`../reference/html/${path}`);
        if (!response.ok) throw new Error(`${path}: ${response.status}`);
        return this.stripReferenceDocumentation(await response.text());
    },

    initPgsJavascript() {
        const pgsApi = globalThis.pgs;
        if (!pgsApi) throw new Error("Bundle PGS non caricato");

        [
            "accordion",
            "dropdown",
            "menu",
            "modal",
            "search",
            "slides",
            "stepTabs",
            "steps",
            "summary"
        ].forEach(module => pgsApi[module]?.init?.(document));

        pgsApi.notification?.trigger?.(document);
        pgsApi.svg?.applyColorsSVG?.();
        pgsApi.svg?.applyColorsLottie?.();
    },

    async boot() {
        const BEEFORE = document.getElementById("reference-demo-before");
        const MAIN = document.getElementById("reference-demo-main");
        const AFTER = document.getElementById("reference-demo-after");

        for (const path of this.referenceFiles) {
            const isHeader = path === "layout/header.html";
            const isfooter = path === "layout/footer.html";
            const isBody = path === "layout/body.html";

            if (isHeader || isfooter) {
                try {
                    const html = await this.loadReference(path);
                    this.renderLayout(isHeader ? BEEFORE : AFTER, path, html);
                } catch (error) {
                    const message = document.createElement("p");
                    message.textContent = `Riferimento non caricato: ${error.message}`;
                    (isHeader ? BEEFORE : AFTER).append(message);
                }
                continue;
            }

            let section;
            const isSection = path !== "layout/section.html" && path !== "layout/pageShell.html"
            isSection ? section = document.createElement("section") : section = document.createElement("div");

            if (isSection) section.setAttribute("pgs", "section flexColumn gapElements");

            section.dataset.reference = path;
            this.renderTitle(section, path);

            if (isBody) {
                const html = await this.loadReference(path);
                this.renderSourceReference(section, html);
                MAIN.append(section);
                continue;
            }

            try {
                const html = await this.loadReference(path);
                this.renderReference(section, path, html);
            } catch (error) {
                const message = document.createElement("p");
                message.textContent = `Riferimento non caricato: ${error.message}`;
                section.append(message);
            }

            MAIN.append(section);
            if (!isSection) {
                section.style.display = "contents";
                Array.from(section.children).forEach(child => child.style.width = "100%");
            }
        }

        try {
            //# CORE
            this.initPgsJavascript();
            configureSearchDemo();
            configureFormDemo();
            document.body.classList.remove('is-loading');
            //# end CORE
        } catch (error) {
            console.error("Demo PGS non inizializzata.", error);
        }
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

demoRenderer.boot();
