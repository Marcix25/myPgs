//= DEMO (browser-only runtime, shared by every generated site/*.html page)
// Every page built by scripts/build-site-static.js loads this file — nothing here fetches or
// parses a reference file, whatever it runs against. It wires up the parts that must run in a
// real browser: the actual pgs component library (notification, modal, accordion, ...), and the
// "copy to clipboard" buttons. Nav click / hash navigation between reference panels is pgs.pageNav's
// own job now (pgs="pageNav" on <body>, see site/index.html + page/demo.html), not this
// file's. Most of what is left here only matters on the page that actually carries the reference
// panels — site/build/demo.html, built in memory from page/demo.html and the reference panels —
// and no-ops harmlessly on any other. The configure*Demo functions only ever look for
// [data-reference="..."] in the page, so a new interactive example is wired up here and nowhere else.

// the pre-navigator.clipboard way of copying: put the text in a field, select it, let the browser
// copy the selection. setSelectionRange as well as select(), because iOS Safari ignores the latter
// on its own; off-screen rather than hidden, since a display:none field cannot be selected at all
function copyBySelection(text) {
    const field = document.createElement("textarea");
    field.value = text;
    field.style.position = "fixed";
    field.style.top = "-1000px";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    field.setSelectionRange(0, field.value.length);

    let copied = false;
    try {
        copied = document.execCommand("copy");
    } catch (error) {
        copied = false;
    }

    field.remove();
    return copied;
}

// navigator.clipboard only exists in a secure context: opening the demo over plain http from
// another device (npm run serve:lan, a phone on the same network) or straight from file:// leaves
// it undefined, which is why the fallback above is still here
async function copyText(text) {
    if (navigator.clipboard?.writeText) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (error) {
            // a denied permission is not the end of it: the selection path may still go through
        }
    }

    return copyBySelection(text);
}

// COPY BUTTONS (delegated: works for every .exampleSource-copy button in the page, no per-button
// closure needed since the markup was written out as static HTML, not built via document.createElement)
function setupCopyButtons() {
    document.addEventListener("click", async event => {
        const button = event.target.closest(".exampleSource-copy");
        if (!button) return;

        const code = button.closest(".exampleSource")?.querySelector("code");
        if (!code) return;

        const icon = button.querySelector("i");
        const copied = await copyText(code.textContent);
        if (!copied) console.error("Copying to the clipboard failed.");

        // the button says how it went either way: a silent failure looks like a dead button
        if (icon) icon.className = copied ? "fa-solid fa-check" : "fa-solid fa-xmark";
        button.setAttribute("aria-label", copied ? "Copied" : "Copy failed");
        setTimeout(() => {
            if (icon) icon.className = "fa-solid fa-copy";
            button.setAttribute("aria-label", "Copy the HTML code");
        }, 1500);
    });
}

// the demo renders page-level layouts (header.html) inside the main area, so their modals would
// resolve modalContainerPGS[header] against the *real* page header and move their dialog in
// there, hijacking the header's own hamburger: keep those dialogs local instead.
function isolateDemoModals(root) {
    pgs(root).querySelectorAll("modal").forEach(modal => {
        pgs(modal).option.remove("modalContainerPGS");
    });
}

//# Search Demo
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
    note.append("Demo suggestions provided by ");
    const link = document.createElement("a");
    link.href = "https://www.mediawiki.org/wiki/API:Opensearch";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Wikipedia OpenSearch";
    note.append(link, " (Italian Wikipedia). Try typing \"prodotti di\" or \"come fare\".");
    section.append(note);
}

// Nav Search (sidebar + mobile "Browse docs" search over the reference pages listed below it)
function configureNavSearchDemo() {
    const pgsApi = globalThis.pgs;
    if (!pgsApi?.search) return;

    const navLinks = Array.from(document.querySelectorAll(".reference-demo-nav a[href]"));
    if (!navLinks.length) return;

    const seen = new Set();
    const source = [];
    navLinks.forEach(link => {
        const value = link.getAttribute("href");
        if (seen.has(value)) return;
        seen.add(value);
        source.push({ label: link.textContent.trim(), value });
    });

    document.querySelectorAll(".reference-demo-nav-search").forEach(form => {
        // the component's own submit handler never calls preventDefault, so Enter with no suggestion highlighted would otherwise reload the page
        form.addEventListener("submit", event => {
            event.preventDefault();
            const instance = pgsApi.search.api(form);
            // with matches, pick the first one; with none, select() never runs so the empty-state dropdown has to be closed by hand
            if (instance?.items().length) instance.select(0);
            else instance?.close();
        });

        const instance = pgsApi.search.api(form)?.configure({
            minLength: 1,
            debounce: 100,
            limit: 8,
            source,
            onSelect: ({ value, input }) => {
                // click the real anchor instead of just setting location.hash, so pgs.pageNav (which switches panels on click, not on hashchange) runs as usual
                navLinks.find(link => link.getAttribute("href") === value)?.click();
                pgsApi.modal.api(pgsApi(form).closest("modal"))?.close();
                input.value = "";
                // deferred past select()'s own input.focus(): that refocus would otherwise reschedule a search for the now-empty field and reopen the placeholder
                setTimeout(() => {
                    instance.cancel();
                    instance.close();
                    input.blur();
                }, 0);
            },
        });
    });
}

//# Form Demo
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
            pgsApi(confirmPassword).data.setValueBrackets("formMessage", "The passwords do not match");
            return [confirmPassword, password];
        }
    });

    formValidate.validator(event => {
        const values = Object.fromEntries(new FormData(form));
        //// Replace this log with sending the data to your backend.
        console.log(values);
    }, "submit");
}

//# Notification Demo
function configureNotificationDemo() {
    const pgsApi = globalThis.pgs;
    const section = document.querySelector('[data-reference="components/notification.html"]');
    if (!pgsApi?.notification || !section) return;

    document.addEventListener("pgs:alert:buttonClick", (event) => {
        console.log("pgs:alert:buttonClick", event.detail);

        if (event.detail.buttonId === "yes" || event.detail.buttonId === "no") {
            console.log("Sending the poll answer to the server:", event.detail.buttonId);
        }

        setTimeout(() => console.log("Async work finished for", event.detail.buttonId), 1000);
    });
}

//# Toast Demo
function configureToastDemo() {
    const pgsApi = globalThis.pgs;
    const section = document.querySelector('[data-reference="components/toast.html"]');
    if (!pgsApi?.toast || !section) return;

    const options = {
        click: { title: "Saved", description: "Your changes were saved.", timeout: 7000 },
        left: { title: "On the left", description: "Against the left edge.", timeout: 7000, position: ["toastLeft"] },
        right: { title: "On the right", description: "Against the right edge.", timeout: 7000, position: ["toastRight"] },
        center: { title: "In the middle", description: "Centered on the screen.", timeout: 7000, position: ["toastCenter"] },
        bottom: { title: "At the bottom", description: "Against the bottom edge.", timeout: 7000, position: ["toastBottom"] }
    };

    section.querySelectorAll("[data-toast-demo]").forEach(demo => {
        demo.querySelector("[data-toast-trigger]")?.addEventListener("click", () => {
            pgsApi.toast.info(options[demo.dataset.toastDemo]);
        });
    });
}

//# Init Demo
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

//# Form Validate Helper Demo
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

        pgsApi(username).data.setValueBrackets("formMessage", "That username is taken");
        return username;
    });

    formValidate.validator(event => {
        console.log(Object.fromEntries(new FormData(form)));
    });
}

// the shell's own bar, not the navSmart written as an example inside a reference page: it is
// the direct child of body. The link whose file is the one on screen is the page you are on
function markCurrentPage() {
    const current = location.pathname.split("/").pop() || "home.html";

    document.querySelectorAll('body > [pgs~="navSmart"] a').forEach(link => {
        if (link.getAttribute("href") === current) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
    });
}

function boot() {
    setupCopyButtons();
    markCurrentPage();

    try {
        isolateDemoModals(document.getElementById("reference-demo-main") || document);
        const pgsApi = globalThis.pgs;
        if (!pgsApi) throw new Error("PGS bundle not loaded");
        pgsApi.init(document);

        configureSearchDemo();
        configureNavSearchDemo();
        configureFormDemo();
        configureNotificationDemo();
        configureToastDemo();
        configureInitDemo();
        configureFormValidateHelperDemo();

        document.querySelectorAll("pre code").forEach(code => window.Prism?.highlightElement(code));
    } catch (error) {
        console.error("PGS demo not initialized.", error);
    }

    const target = document.getElementById(location.hash.slice(1));
    if (target) target.scrollIntoView({ block: "start" });
}

boot();
