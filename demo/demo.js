//# DEMO PAGE

//= demo Renderer HTML
const demoRenderer = {
    templateFiles: [
        "components/form.html",
        "components/formAddon.html",
        "components/search.html",
        "components/summary.html",
        "components/menu.html",
        "components/tooltip.html",
        "components/modal.html",
        "components/stepTabs.html",
        "components/accordion.html",
        "components/badges.html",
        "components/breadcumbs.html",
        "components/button.html",
        "components/card.html",
        "components/dropdown.html",
        "components/tooltip.html",
        "components/logo.html",
        "components/slides.html",
        "components/steps.html",
        "components/table.html",
        "components/notification.html",
        "patterns/cookieConsent.html",
        "layout/body.html",
        "layout/flex.html",
        "layout/grid.html",
        "layout/footer.html",
        "layout/header.html",
        "layout/section.html",
        "layout/pageShell.html",
    ],

    getTemplateTitle(path) {
        return path.replace(".html", "").replace("/", " / ");
    },

    stripTemplateDocumentation(html) {
        return html.replace(/^\uFEFF?<!--[\t\r\n ]*\/\*\*[\s\S]*?\*\/[\t\r\n ]*-->[\t\r\n ]*/, "");
    },

    renderSourceTemplate(section, html) {
        const pre = document.createElement("pre");
        const code = document.createElement("code");
        code.textContent = html.trim();
        pre.append(code);
        section.append(pre);
    },

    renderTemplate(section, path, html) {
        const content = document.createElement("div");
        content.setAttribute("pgs", "container flexColumnElements");
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
        title.classList.add("template-title");
        title.innerHTML = "<strong>" + this.getTemplateTitle(path) + "</strong>";
        section.append(title);
    },

    async loadTemplate(path) {
        const response = await fetch(`../templates/html/${path}`);
        if (!response.ok) throw new Error(`${path}: ${response.status}`);
        return this.stripTemplateDocumentation(await response.text());
    },

    loadPgsJavascript() {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "../dist/javascript/index.js";
            script.addEventListener("load", resolve, { once: true });
            script.addEventListener("error", () => reject(new Error("Bundle PGS non caricato")), { once: true });
            document.body.append(script);
        });
    },

    async boot() {
        const BEEFORE = document.getElementById("templates-demo-before");
        const MAIN = document.getElementById("templates-demo-main");
        const AFTER = document.getElementById("templates-demo-after");

        for (const path of this.templateFiles) {
            const isHeader = path === "layout/header.html";
            const isfooter = path === "layout/footer.html";
            const isBody = path === "layout/body.html";

            if (isHeader || isfooter) {
                try {
                    const html = await this.loadTemplate(path);
                    this.renderLayout(isHeader ? BEEFORE : AFTER, path, html);
                } catch (error) {
                    const message = document.createElement("p");
                    message.textContent = `Template non caricato: ${error.message}`;
                    (isHeader ? BEEFORE : AFTER).append(message);
                }
                continue;
            }

            let section;
            const isSection = path !== "layout/section.html" && path !== "layout/pageShell.html"
            isSection ? section = document.createElement("section") : section = document.createElement("div");

            if (isSection) section.setAttribute("pgs", "section flexColumnElements");

            section.dataset.template = path;
            this.renderTitle(section, path);

            if (isBody) {
                const html = await this.loadTemplate(path);
                this.renderSourceTemplate(section, html);
                MAIN.append(section);
                continue;
            }

            try {
                const html = await this.loadTemplate(path);
                this.renderTemplate(section, path, html);
            } catch (error) {
                const message = document.createElement("p");
                message.textContent = `Template non caricato: ${error.message}`;
                section.append(message);
            }

            MAIN.append(section);
            if (!isSection) {
                section.style.display = "contents";
                Array.from(section.children).forEach(child => child.style.width = "100%");
            }
        }

        try {
            //+ ADD FUNCTION
            await this.loadPgsJavascript();
            configureSearchDemo();
            configureFormDemo();
        } catch (error) {
            console.error("Demo PGS non inizializzata.", error);
        }
    },
};

//= Search Demo
function configureSearchDemo() {
    const pgsApi = globalThis.pgs;
    const section = document.querySelector('[data-template="components/search.html"]');
    if (!pgsApi?.search || !section) return;

    pgsApi(section).querySelectorAll("search").forEach(search => {
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
    const section = document.querySelector('[data-template="components/form.html"]');
    const form = section?.querySelector('[pgs~="form"]');
    if (!form) return;

    const password = form.querySelector('input[name="password"]');
    const confirmPassword = form.querySelector('input[name="confirmPassword"]');
    if (!password || !confirmPassword) return;

    const formValidate = new pgsApi.formValidate(form, {
        message: {
            fieldError: "Please complete this field",
            fieldsError: "Please complete all required fields",
            success: "Sent successfully"
        }
    });

    //== new roules
    formValidate.addNewRule(() => {
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
