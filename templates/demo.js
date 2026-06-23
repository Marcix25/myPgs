
if (localStorage.getItem("screenIsDarkMode") === "true") {
    document.body.classList.add("darkmode");
    document.querySelector(":root").setAttribute("data-darkmode", "true");
    document.body.setAttribute("data-darkmode", "true");
}


const templateFiles = [
    "components/md-stepTabs.html",
    "layout/md-header.html",
    "components/md-accordion.html",
    "components/md-breadcumbs.html",
    "components/md-button.html",
    "components/md-card.html",
    "components/md-dropdown.html",
    "components/md-form.html",
    "components/md-logo.html",
    "components/md-menu.html",
    "components/md-modal.html",
    "components/md-searchbar.html",
    "components/md-slides.html",
    "components/md-steps.html",
    "components/md-table.html",
    "components/md-tooltip.html",
    "layout/md-body.html",
    "layout/md-cookieConsent.html",
    "layout/md-section.html",
    "layout/md-pageShell.html",
    "layout/md-footer.html",
    "components/md-notification.html",
];

function getTemplateTitle(path) {
    return path
        .replace(".html", "")
        .replace("/", " / ")
        .replace("md-", "");
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
    if (path === "layout/md-body.html") {
        const section = document.createElement("section");
        section.setAttribute("pgs", "section flexColumnElements");
        section.dataset.template = path;

        const title = document.createElement("h2");
        title.textContent = getTemplateTitle(path);
        section.append(title);
        renderSourceTemplate(section, html);
        root.append(section);
        return;
    }

    const template = document.createElement("template");
    template.innerHTML = html.trim();
    root.append(template.content.cloneNode(true));
}

function getLayoutRoot(path, beforeRoot, afterRoot) {
    if (path === "layout/md-header.html") return beforeRoot;
    return afterRoot;
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
    const componentsRoot = document.getElementById("templates-demo-components");
    const layoutsBeforeRoot = document.getElementById("templates-demo-layouts-before");
    const layoutsRoot = document.getElementById("templates-demo-layouts");

    for (const path of templateFiles) {
        const isLayout = path.startsWith("layout/");

        if (isLayout) {
            const layoutRoot = getLayoutRoot(path, layoutsBeforeRoot, layoutsRoot);

            try {
                const html = await loadTemplate(path);
                renderLayout(layoutRoot, path, html);
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

        const title = document.createElement("p");
        title.classList.add("template-title");
        title.innerHTML = "<strong>" + getTemplateTitle(path) + "</strong>";
        section.append(title);

        try {
            const html = await loadTemplate(path);
            renderTemplate(section, path, html);
        } catch (error) {
            const message = document.createElement("p");
            message.textContent = `Template non caricato: ${error.message}`;
            section.append(message);
        }

        componentsRoot.append(section);
    }

    loadPgsJavascript();
}

bootDemo();
