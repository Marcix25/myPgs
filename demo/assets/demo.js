//# DEMO (browser-only runtime for the pre-baked demo.html)
//+ demo/demo.html (generated — see scripts/build-demo-static.js) already has every panel's markup
//+ written out by scripts/build-demo-static.js (via demo-render.js) — nothing here fetches or
//+ parses a reference file. This file only wires up the parts that must run in a real browser: the
//+ actual pgs component library (notification, modal, accordion, ...), nav click / hash
//+ navigation, and the "copy to clipboard" buttons. Keep the configure*Demo functions here
//+ identical to their counterparts in demo-fetch.js (demo-fetch.html's own script) — they only ever
//+ look for [data-reference="..."] in the page, so the same functions work whether that markup was
//+ fetched live or baked in ahead of time.

//= NAVIGATION (built from the [data-panel] / [data-panel-link] elements already in the page,
//= instead of from an in-memory list of fetched entries like demo-fetch.js's setupNavigation)
function setupStaticNavigation() {
    const NAVS = Array.from(document.querySelectorAll(".reference-demo-nav"));
    const MAIN = document.getElementById("reference-demo-main");
    if (!MAIN) return;

    const paths = Array.from(MAIN.querySelectorAll("[data-panel]")).map(panel => panel.dataset.panel);

    const activate = (path, resetScroll = true) => {
        const panel = MAIN.querySelector(`[data-panel="${CSS.escape(path)}"]`);
        if (!panel) return;

        MAIN.querySelectorAll("[data-panel]").forEach(el => { el.hidden = el !== panel; });
        NAVS.forEach(nav => nav.querySelectorAll("a[data-panel-link]").forEach(link => {
            if (link.dataset.panelLink === path) link.setAttribute("aria-current", "page");
            else link.removeAttribute("aria-current");
        }));

        NAVS.forEach(nav => nav.closest("dialog[open]")?.close());

        if (resetScroll) window.scrollTo({ top: 0, behavior: "instant" });
    };

    const getSlug = path => path.replace(/\.html$/, "").replace(/\//g, "-");

    window.addEventListener("hashchange", () => {
        const path = paths.find(item => getSlug(item) === location.hash.slice(1));
        if (path) activate(path);
    });

    const initialPath = paths.find(item => getSlug(item) === location.hash.slice(1)) || paths[0];
    if (initialPath) activate(initialPath, false);
}

//= COPY BUTTONS (delegated: works for every .exampleSource-copy button in the page, no per-button
//= closure needed since the markup was written out as static HTML, not built via document.createElement)
function setupCopyButtons() {
    document.addEventListener("click", async event => {
        const button = event.target.closest(".exampleSource-copy");
        if (!button) return;

        const code = button.closest(".exampleSource")?.querySelector("code");
        if (!code) return;

        const icon = button.querySelector("i");
        try {
            await navigator.clipboard.writeText(code.textContent);
            if (icon) icon.className = "fa-solid fa-check";
            button.setAttribute("aria-label", "Copiato");
            setTimeout(() => {
                if (icon) icon.className = "fa-solid fa-copy";
                button.setAttribute("aria-label", "Copia il codice HTML");
            }, 1500);
        } catch (error) {
            console.error("Copia negli appunti non riuscita.", error);
        }
    });
}

//== the demo renders page-level layouts (header.html) inside the main area, so their modals would
//== resolve modalContainerPGS[header] against the *real* page header and move their dialog in
//== there, hijacking the header's own bell and hamburger: keep those dialogs local instead.
function removeToken(element, attribute, token) {
    if (!element) return;
    const value = (element.getAttribute(attribute) || "").split(/\s+/).filter(item => item && item !== token).join(" ");
    if (value) element.setAttribute(attribute, value);
    else element.removeAttribute(attribute);
}

function isolateDemoModals(root) {
    root.querySelectorAll('[pgs~="modal"]').forEach(modal => {
        const option = modal.getAttribute("pgs-option");
        if (!option || !option.includes("modalContainerPGS")) return;

        const cleaned = option.replace(/modalContainerPGS\[[^\]]*\]/g, "").replace(/\s+/g, " ").trim();
        if (cleaned) modal.setAttribute("pgs-option", cleaned);
        else modal.removeAttribute("pgs-option");
    });

    //== every notificationBell shares one "_notifications" container/panel: with several bells
    //== rendered at once (the header pattern demo, the notification component's own demo) only
    //== one can own it. See configureNotificationDemo.
    root.querySelectorAll('[pgs~="notificationBell"]').forEach(bell => {
        if (bell.closest('[data-reference="components/notification.html"]')) return;
        removeToken(bell.closest('[pgs~="modal"]'), "pgs", "modal");
        removeToken(bell, "pgs", "modal-button");
        removeToken(bell, "pgs", "modal-close");
    });
}

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
            formFieldError: "Please complete this field",
            formFieldsError: "Please complete all required fields",
            formSuccess: "Sent successfully"
        }
    });

    formValidate.addNewRule(() => {
        const password = form.querySelector('input[name="password"]');
        const confirmPassword = form.querySelector('input[name="confirmPassword"]');
        if (!password || !confirmPassword) return;
        if (password.value && confirmPassword.value && password.value !== confirmPassword.value) {
            pgsApi(confirmPassword).option.setValueBrackets("formMessage", "Le password non coincidono");
            return [confirmPassword, password];
        }
    });

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

    const realBell = section.querySelector('[pgs~="notificationBell"]');
    document.querySelectorAll('[pgs~="notificationBell"]').forEach(bell => {
        if (bell === realBell) return;
        bell.addEventListener("click", () => realBell?.click());
    });

    document.addEventListener("pgs:notification:buttonClick", (event) => {
        console.log("pgs:notification:buttonClick", event.detail);

        if (event.detail.buttonId === "yes" || event.detail.buttonId === "no") {
            console.log("Invio risposta sondaggio al server:", event.detail.buttonId);
        }

        setTimeout(() => console.log("Async work finished for", event.detail.buttonId), 1000);
    });
}

//= Init Demo
function configureInitDemo() {
    const pgsApi = globalThis.pgs;
    const section = document.querySelector('[data-reference="helper/init.html"]');
    const button = section?.querySelector('#pgsInit-add');
    const target = section?.querySelector('#pgsInit-target');
    if (!button || !target) return;

    button.addEventListener('click', () => {
        target.innerHTML = `
            <span pgs="dropdown">
                <button pgs="dropdown-button button" type="button">Added dynamically</button>
                <div pgs="dropdown-content">This dropdown did not exist when the page loaded.</div>
            </span>
        `;
        pgsApi.init(target);
    });
}

//= Scroll Horizontal Demo
function configureScrollHorizontalDemo() {
    const pgsApi = globalThis.pgs;
    const section = document.querySelector('[data-reference="helper/scrollHorizontal.html"]');
    const container = section?.querySelector('#pgsScrollDemo');
    if (!container) return;

    pgsApi.scrollHorizontal(container, 5);
}

//= Scroll Horizontal With Mouse Demo
function configureScrollHorizontalWithMouseDemo() {
    const pgsApi = globalThis.pgs;
    const section = document.querySelector('[data-reference="helper/scrollHorizontal.html"]');
    const container = section?.querySelector('#pgsScrollWithMouseDemo');
    if (!container) return;

    pgsApi.scrollHorizontalWithMouse(container, 5);
}

//= Form Validate Helper Demo
function configureFormValidateHelperDemo() {
    const pgsApi = globalThis.pgs;
    const section = document.querySelector('[data-reference="helper/formValidate.html"]');
    const form = section?.querySelector('[pgs~="form"]');
    const username = form?.querySelector('input[name="username"]');
    if (!form || !username) return;

    const formValidate = new pgsApi.formValidate(form, {
        typeNotice: "alert"
    });

    formValidate.addNewRule(() => {
        if (username.value.toLowerCase() !== "admin") return null;

        pgsApi(username).option.setValueBrackets("formMessage", "That username is taken");
        return username;
    });

    formValidate.validator(event => {
        console.log(Object.fromEntries(new FormData(form)));
    });
}

function boot() {
    setupStaticNavigation();
    setupCopyButtons();

    try {
        isolateDemoModals(document.getElementById("reference-demo-main") || document);
        const pgsApi = globalThis.pgs;
        if (!pgsApi) throw new Error("Bundle PGS non caricato");
        pgsApi.init(document);

        configureSearchDemo();
        configureFormDemo();
        configureNotificationDemo();
        configureInitDemo();
        configureScrollHorizontalDemo();
        configureScrollHorizontalWithMouseDemo();
        configureFormValidateHelperDemo();

        document.querySelectorAll("pre code").forEach(code => window.Prism?.highlightElement(code));
        document.body.classList.remove("is-loading");
    } catch (error) {
        console.error("Demo PGS non inizializzata.", error);
    }

    const target = document.getElementById(location.hash.slice(1));
    if (target) target.scrollIntoView({ block: "start" });
}

boot();
