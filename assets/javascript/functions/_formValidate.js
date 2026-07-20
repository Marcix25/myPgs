import { pgs } from "../_pgs.js";
import { PGS_notification } from "../components/_notifications.js";


export class PGS_formValidate {
    #message = {};
    #insideValidatedCallback = false;

    constructor(form, options = {}) {
        if (!options || typeof options !== "object" || Array.isArray(options)) {
            throw new TypeError("options must be an object");
        }

        this.container = form;
        this._rules = [];
        this.message = {
            fieldError: "Please complete this field.",
            fieldsError: "Please complete all required fields.",
            success: "Submitted successfully."
        };

        if (options.message !== undefined) this.message = options.message;
        this.container?.setAttribute("novalidate", "");
    }

    get message() {
        return { ...this.#message };
    }

    set message(value) {
        if (!value || typeof value !== "object" || Array.isArray(value)) {
            throw new TypeError("message must be an object");
        }

        this.#message = { ...this.#message, ...value };
    }

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
            if (!requiredRadioGroups.has(name)) requiredRadioGroups.set(name, []);
            requiredRadioGroups.get(name).push(r);
        }
        const radioGroupErrors = [];
        for (const [name, group] of requiredRadioGroups.entries()) {
            const anyChecked = group.some((r) => r.checked);
            if (!anyChecked) {
                // scegli dove mettere l'errore: tipicamente sul primo radio del gruppo
                radioGroupErrors.push(group[0]);
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
            if (!anyChecked) checkboxGroupErrors.push(group[0]);
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
            ruleInvalidFields
        ];

        return [...new Set(invalidFields.flat())];
    }

    //+ ADD
    addFieldError(field, i = 0, total = 1) {
        pgs(field).option.add("error");
        if (i === 0) field.scrollIntoView();

        if (i !== 0) return;

        if (total > 1) {
            PGS_notification.toast.error(this.message.fieldsError);
            return;
        }

        const message = pgs(field).option.getValueBrackets("message");
        PGS_notification.toast.error(message || this.message.fieldError);
    }

    //+ REMOVE
    removeFieldError(field) {
        pgs(field).option.remove("error");
    }

    // + SUCCESS
    success(text = this.message.success) {
        if (this.#insideValidatedCallback || this.validate() === true) PGS_notification.toast.success(text)
    }


    // + VALIDATE
    validate() {
        const invalid = this.#inputValue(this.container);
        const allFields = this.container.querySelectorAll("input, textarea, select")

        //== pulizia/aggiornamento errori: 
        // prima rimuovo errori dai campi "non più invalidi"
        Array.from(allFields).filter((el) => !el.disabled);

        //== per radio/checkbox in gruppo: 
        // rimuovi l'errore solo sull'elemento che lo ospita (qui: se presente)
        for (const el of allFields) { if (!invalid.includes(el)) this.removeFieldError(el); }

        //== aggiungo errori dove serve
        invalid.forEach((el, i) => this.addFieldError(el, i, invalid.length))

        //== rimuove l'errore al click
        allFields.forEach(element => element.addEventListener("click", e => this.removeFieldError(element)));

        //== status form
        if (invalid.length) {
            pgs(this.container).option.remove("success").add("error");
            return false;
        } else {
            pgs(this.container).option.remove("error").add("success");
            return true;
        }
    }

    // + EVENT VALIDATOR
    validator(callback, eventName = "submit") {
        if (typeof callback !== "function") throw new TypeError("callback must be a function");
        if (typeof eventName !== "string" || !eventName.trim()) throw new TypeError("eventName must be a non-empty string");

        this.container.addEventListener(eventName, event => {
            event.preventDefault();
            if (!this.validate()) return;

            this.#insideValidatedCallback = true;

            try {
                this.success();
                callback(event);
            } finally {
                this.#insideValidatedCallback = false;
            }
        });

        return this;
    }

    // + ADD RULE
    addNewRule(rule) {
        if (typeof rule !== "function") throw new Error("Rule must be a function");
        this._rules.push(rule);
        return this;
    }
}
