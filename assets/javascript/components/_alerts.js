//= PGS_alert
const fn_alert = {
    _defaults: {
        description: "",
        type: {
            error: {
                title: "Errore",
                icon: '<i class="fa-solid fa-circle-xmark"></i>'
            },
            success: {
                title: "Aggiornato",
                icon: '<i class="fa-solid fa-circle-check"></i>'
            },
            info: {
                title: "Aggiornamento",
                icon: '<i class="fa-solid fa-circle-info"></i>'
            },
            warning: {
                title: "Attenzione",
                icon: '<i class="fa-solid fa-triangle-exclamation"></i>'
            }
        }
    },

    _escapeHtml(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    },

    _getContainer(root = document, configuredContainer) {
        if (!(root instanceof Document) && !(root instanceof Element)) {
            throw new TypeError("PGS alert: root deve essere un Document o un Element");
        }

        let container = configuredContainer;
        if (typeof container === "string") container = root.querySelector(container);
        if (!container) container = pgs(root).querySelector("alertContainer");

        if (container && (!(container instanceof Element) || container === root || !root.contains(container))) {
            throw new TypeError("PGS alert: container deve essere un elemento contenuto in root");
        }

        if (!container) {
            container = document.createElement("div");
            const parent = root instanceof Document ? root.body : root;
            const submit = parent.querySelector('[type="submit"]');

            if (submit) submit.insertAdjacentElement("beforebegin", container);
            else parent.prepend(container);
        }

        pgs(container).add("alertContainer");
        return container;
    },

    create(type, options = {}) {
        const typeDefaults = this._defaults.type[type] || this._defaults.type.info;
        const definedOptions = Object.fromEntries(
            Object.entries(options).filter(([, value]) => value !== undefined)
        );
        const config = {
            description: this._defaults.description,
            ...typeDefaults,
            ...definedOptions
        };
        const alert = document.createElement("div");
        const title = this._escapeHtml(config.title);
        const description = this._escapeHtml(config.description);

        pgs(alert).add("alert");
        pgs(alert).state.add(type);
        alert.setAttribute("role", type === "error" || type === "warning" ? "alert" : "status");
        alert.innerHTML = `
            <div pgs="alert-icon" aria-hidden="true">${config.icon}</div>
            <div pgs="alert-content">
                <strong pgs="alert-content-title">${title}</strong>
                ${description ? `<p>${description}</p>` : ""}
            </div>
        `;

        return alert;
    },

    show(type, options = {}) {
        if (!options || typeof options !== "object" || Array.isArray(options)) {
            throw new TypeError("PGS alert: options deve essere un oggetto");
        }

        const { root, container, ...contentOptions } = options;
        const alert = this.create(type, contentOptions);

        if (root !== undefined || container !== undefined) {
            this._getContainer(root, container).replaceChildren(alert);
        }

        return alert;
    }
};

export const PGS_alert = {
    error: (options = {}) => fn_alert.show("error", options),
    success: (options = {}) => fn_alert.show("success", options),
    info: (options = {}) => fn_alert.show("info", options),
    warning: (options = {}) => fn_alert.show("warning", options)
};
