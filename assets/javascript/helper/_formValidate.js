import { pgs } from "../_pgs.js";
import { PGS_toast } from "../components/_toast.js";
import { PGS_alert } from "../components/_alerts.js";


export class PGS_formValidate {
    #messageDefaults = {
        fieldErrorTitle: "Error!",
        fieldError: "Please complete this field.",
        fieldsError: "Please complete all required fields.",
        successTitle: "Submitted",
        success: "Submitted successfully."
    };
    #temporaryFieldErrors = new Map();
    #insideValidatedCallback = false;

    constructor(form, options = {}) {
        if (!options || typeof options !== "object" || Array.isArray(options)) {
            throw new TypeError("options must be an object");
        }

        this.container = form;
        this._rules = [];
        this.typeNotice = options.typeNotice === "toast" ? "toast" : "alert";
        this.showSuccessOnValidate = options.showSuccessOnValidate !== false;
        this.alertContainer = options.alertContainer;

        pgs(this.container).add("formValidate");
        this.#initializeMessages(options.message);
        this.container?.setAttribute("novalidate", "");
    }

    #validateMessages(value) {
        if (value === undefined) return;
        if (!value || typeof value !== "object" || Array.isArray(value)) {
            throw new TypeError("message must be an object");
        }

        Object.entries(value).forEach(([key, message]) => {
            if (!(key in this.#messageDefaults)) {
                throw new TypeError(`Unknown form message option: ${key}`);
            }
            if (message !== undefined && typeof message !== "string") {
                throw new TypeError(`Form message option ${key} must be a string`);
            }
        });
    }

    #initializeMessages(value = {}) {
        this.#validateMessages(value);

        const formOptions = pgs(this.container).option;
        const initialMessages = {
            ...this.#messageDefaults,
            ...Object.fromEntries(
                Object.entries(value).filter(([, message]) => message !== undefined)
            )
        };

        Object.entries(initialMessages).forEach(([key, message]) => {
            if (!formOptions.contains(key)) formOptions.setValueBrackets(key, message);
        });
    }

    #getMessage(key) {
        return pgs(this.container).option.getValueBrackets(key);
    }

    temporaryFieldError = {
        set: (field, options = {}) => {
            if (!field || typeof field.matches !== "function" || !this.container.contains(field)) {
                throw new TypeError("field must be an element contained in the form");
            }

            if (typeof options === "string") options = { message: options };
            if (!options || typeof options !== "object" || Array.isArray(options)) {
                throw new TypeError("temporaryFieldError options must be an object or a string");
            }

            this.#temporaryFieldErrors.set(field, {
                title: options.title || "",
                message: options.message || ""
            });
            this.validate();
            return this.temporaryFieldError;
        },

        remove: (field) => {
            this.#removeFieldError(field);
            return this.temporaryFieldError;
        },

        clear: () => {
            [...this.#temporaryFieldErrors.keys()].forEach(field => {
                this.#removeFieldError(field);
            });
            return this.temporaryFieldError;
        }
    };

    // - Helpers
    #help = {
        // supporta sia required nativo
        isRequired(field) {
            if (!field) return false;

            const required = field.required === true || field?.dataset?.required === "true" || field?.getAttribute('aria-required') == "true";
            return required && !field.hidden; // solo attributo/proprietà "hidden"
        },
        // input (non speciali), textarea
        isEmptyTextLike(field) { return !String(field?.value ?? "").trim(); },
        // select: vuoto se value == "" o null
        isEmptySelect(field) { return !String(field?.value ?? "").trim(); },
        // recupera name in modo sicuro
        getGroupName(field) { return field?.name || field?.getAttribute?.("name") || ""; }
    };


    // + --------------------------
    // + input + altri elementi.   
    // + --------------------------
    #inputValue(container) {

        //++ add rule
        const ruleInvalidFields = [];
        for (const rule of this._rules) {
            const res = rule(container);

            // la rule può tornare:
            // • null/undefined => ok
            // • un elemento => invalido
            // • un array di elementi => invalidi
            if (!res) continue;

            if (Array.isArray(res)) ruleInvalidFields.push(...res);
            else ruleInvalidFields.push(res);
        }

        //== INPUT 
        // "testuali" (esclude hidden/disabled/checkbox/radio/file come nel tuo snippet)
        const textInputs = Array.from(container.querySelectorAll("input")).filter((input) => {
            if (input.disabled) return false;
            if (input.type === "hidden") return false;
            if (input.type === "checkbox" || input.type === "radio" || input.type === "file") return false;

            // valida solo se required
            if (!this.#help.isRequired(input)) return false;

            return this.#help.isEmptyTextLike(input);
        });

        //== TEXTAREA 
        // required vuote
        const textareas = Array.from(container.querySelectorAll("textarea")).filter((ta) => {
            if (ta.disabled) return false;
            if (!this.#help.isRequired(ta)) return false;
            return this.#help.isEmptyTextLike(ta);
        });

        //== SELECT 
        // required vuoti
        const selects = Array.from(container.querySelectorAll("select")).filter((sel) => {
            if (sel.disabled) return false;
            if (!this.#help.isRequired(sel)) return false;
            return this.#help.isEmptySelect(sel);
        });

        //== RADIO 
        // required: se in un gruppo required non ce n'è uno checked => errore sul "primo" radio del gruppo
        const radios = Array.from(container.querySelectorAll('input[type="radio"]')).filter((r) => !r.disabled);
        const requiredRadioGroups = new Map(); // name -> [elements]
        for (const r of radios) {
            if (!this.#help.isRequired(r)) continue;
            const name = this.#help.getGroupName(r);
            if (!name) continue;
            if (!requiredRadioGroups.has(name)) {
                requiredRadioGroups.set(name, radios.filter(radio => this.#help.getGroupName(radio) === name));
            }
        }
        const radioGroupErrors = [];
        for (const [name, group] of requiredRadioGroups.entries()) {
            const anyChecked = group.some((r) => r.checked);
            if (!anyChecked) {
                radioGroupErrors.push(group[0].closest("fieldset") || group[0]);
            }
        }

        //== CHECKBOX 
        // required: può essere singola checkbox required (checked obbligatorio)
        // oppure gruppo di checkbox (stesso name) con almeno una selezionata
        const checkboxes = Array.from(container.querySelectorAll('input[type="checkbox"]')).filter((c) => !c.disabled);
        const requiredCheckboxSingles = [];
        const requiredCheckboxGroups = new Map(); // name -> [elements]
        for (const c of checkboxes) {
            if (!this.#help.isRequired(c)) continue;

            const name = this.#help.getGroupName(c);
            if (!name) {
                // checkbox senza name: trattala come singola required
                if (!c.checked) requiredCheckboxSingles.push(c);
                continue;
            }

            // se vuoi trattare come gruppo, raggruppa per name
            if (!requiredCheckboxGroups.has(name)) requiredCheckboxGroups.set(name, []);
            requiredCheckboxGroups.get(name).push(c);
        }
        const checkboxGroupErrors = [];
        for (const [name, group] of requiredCheckboxGroups.entries()) {
            // se è un gruppo (>=2) richiedi almeno una spuntata
            // se è 1 sola, si comporta come singola
            const anyChecked = group.some((c) => c.checked);
            if (!anyChecked) {
                const fieldset = group.length > 1 ? group[0].closest("fieldset") : null;
                checkboxGroupErrors.push(fieldset || group[0]);
            }
        }

        //== FILE 
        // required: se vuoi includerlo
        const fileInputs = Array.from(container.querySelectorAll('input[type="file"]')).filter((f) => {
            if (f.disabled) return false;
            if (!this.#help.isRequired(f)) return false;
            return !(f.files && f.files.length > 0);
        });

        //== risultato finale: tutti i campi da marcare come errore
        const invalidFields = [
            textInputs,
            textareas,
            selects,
            radioGroupErrors,
            requiredCheckboxSingles,
            checkboxGroupErrors,
            fileInputs,
            ruleInvalidFields,
            [...this.#temporaryFieldErrors.keys()]
        ];

        return [...new Set(invalidFields.flat())];
    }

    //+ ADD
    #addFieldError(field, i = 0, total = 1) {
        pgs(field).state.add("errorField");

        if (i === 0) field.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
        if (i !== 0) return;

        const messageSource = field.matches("fieldset")
            ? field.querySelector('[pgs-option*="message["], [pgs-option*="messageTitle["]')
            : field;
        const source = messageSource || field;
        const temporaryError = this.#temporaryFieldErrors.get(field);
        const fieldTitle = pgs(source).option.getValueBrackets("messageTitle");
        const fieldMessage = pgs(source).option.getValueBrackets("message");
        const title = temporaryError?.title || fieldTitle || this.#getMessage("fieldErrorTitle");
        const description = total > 1
            ? this.#getMessage("fieldsError")
            : temporaryError?.message || fieldMessage || this.#getMessage("fieldError");

        if (this.typeNotice == "alert") {
            PGS_alert.error({
                title: title,
                description: description,
                root: this.container,
                container: this.alertContainer
            });
        } else {
            PGS_toast.error({
                title: title,
                description: description
            });
        }
    }

    //+ REMOVE
    #removeFieldError(field) {
        this.#temporaryFieldErrors.delete(field);
        pgs(field).state.remove("errorField");
    }

    // + SUCCESS
    success(description = this.#getMessage("success"), title = this.#getMessage("successTitle")) {
        if (this.#insideValidatedCallback || this.validate() === true) {

            if (this.typeNotice == "alert") {
                PGS_alert.success({
                    title,
                    description,
                    root: this.container,
                    container: this.alertContainer
                });
            } else {
                PGS_toast.success({
                    title,
                    description
                });
            }
        }
    }


    // + VALIDATE
    validate() {
        const invalid = this.#inputValue(this.container);
        const allFields = this.container.querySelectorAll("input, textarea, select")

        //== pulizia/aggiornamento errori
        this.container.querySelectorAll('[pgs-state~="errorField"]').forEach(element => {
            if (!invalid.includes(element)) this.#removeFieldError(element);
        });

        //== aggiungo errori dove serve
        invalid.forEach((el, i) => this.#addFieldError(el, i, invalid.length))

        //== rimuove l'errore al click
        allFields.forEach(element => element.addEventListener("click", () => {
            const errorTarget = element.closest('fieldset[pgs-state~="errorField"]') || element;
            this.#removeFieldError(errorTarget);
        }));

        //== status form
        if (invalid.length) {
            pgs(this.container).state.remove("success").add("errorForm");
            return false;
        } else {
            pgs(this.container).state.remove("errorForm").add("success");
            return true;
        }
    }

    //= EVENT VALIDATOR
    validator(callback, eventName = "submit") {
        if (typeof callback !== "function") throw new TypeError("callback must be a function");
        if (typeof eventName !== "string" || !eventName.trim()) throw new TypeError("eventName must be a non-empty string");

        this.container.addEventListener(eventName, event => {
            event.preventDefault();
            this.temporaryFieldError.clear();
            if (!this.validate()) return;

            this.#insideValidatedCallback = true;

            try {
                if (this.showSuccessOnValidate) this.success();
                callback(event);
            } finally {
                this.#insideValidatedCallback = false;
            }
        });

        return this;
    }

    //= ADD RULE
    addNewRule(rule) {
        if (typeof rule !== "function") throw new Error("Rule must be a function");
        this._rules.push(rule);
        return this;
    }
}
