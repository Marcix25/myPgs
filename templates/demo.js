
if (localStorage.getItem("screenIsDarkMode") === "true") {
    document.body.classList.add("darkmode");
    document.querySelector(":root").setAttribute("data-darkmode", "true");
    document.body.setAttribute("data-darkmode", "true");
}


const templateFiles = [
    "layout/body.html",
    "layout/section.html",
    "layout/flex.html",
    "layout/grid.html",
    "layout/pageShell.html",
    "patterns/cookieConsent.html",
    "patterns/header.html",
    "patterns/footer.html",
    "components/menu.html",
    "components/tooltip.html",
    "components/modal.html",
    "components/stepTabs.html",
    "components/accordion.html",
    "components/breadcumbs.html",
    "components/button.html",
    "components/card.html",
    "components/dropdown.html",
    "components/tooltip.html",
    "components/form.html",
    "components/logo.html",
    "components/searchbar.html",
    "components/slides.html",
    "components/steps.html",
    "components/table.html",
    "components/notification.html",
];

function getTemplateTitle(path) {
    return path
        .replace(".html", "")
        .replace("/", " / ")
}

function renderSourceTemplate(section, html) {
    const pre = document.createElement("pre");
    const code = document.createElement("code");
    code.textContent = html.trim();
    pre.append(code);
    section.append(pre);
}

function renderTemplate(section, path, html) {
    const content = document.createElement("div");
    content.setAttribute("pgs", "container flexColumnElements");
    content.innerHTML = html;
    section.append(content);
}

function renderLayout(root, path, html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    root.append(template.content.cloneNode(true));
}

function renderTitle(section, path) {
    const title = document.createElement("p");
    title.classList.add("template-title");
    title.innerHTML = "<strong>" + getTemplateTitle(path) + "</strong>";
    section.append(title);
}

async function loadTemplate(path) {
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error(`${path}: ${response.status}`);
    }
    return response.text();
}

function loadPgsJavascript() {
    const script = document.createElement("script");
    script.src = "../dist/javascript/index.js";
    document.body.append(script);
}

async function bootDemo() {
    const BEEFORE = document.getElementById("templates-demo-before");
    const MAIN = document.getElementById("templates-demo-main");
    const AFTER = document.getElementById("templates-demo-after");

    for (const path of templateFiles) {
        const isHeader = path === "patterns/header.html";
        const isfooter = path === "patterns/footer.html";
        const isBody = path === "layout/body.html";

        if (isHeader || isfooter) {
            try {
                const html = await loadTemplate(path);
                renderLayout(isHeader ? BEEFORE : AFTER, path, html);
            } catch (error) {
                const message = document.createElement("p");
                message.textContent = `Template non caricato: ${error.message}`;
                layoutRoot.append(message);
            }

            continue;
        }

        const section = document.createElement("section");
        section.setAttribute("pgs", "section flexColumnElements");
        section.dataset.template = path;
        renderTitle(section, path);

        if (isBody) {
            const html = await loadTemplate(path);
            renderSourceTemplate(section, html);
            MAIN.append(section);

            continue
        }

        try {
            const html = await loadTemplate(path);
            renderTemplate(section, path, html);
        } catch (error) {
            const message = document.createElement("p");
            message.textContent = `Template non caricato: ${error.message}`;
            section.append(message);
        }

        MAIN.append(section);

        if (path == "layout/section.html" || path == "layout/pageShell.html") {
            section.style.display = "contents";

            Array.from(section.children).forEach(c => c.style.width = "100%");
        }
    }

    loadPgsJavascript();
}

bootDemo();
