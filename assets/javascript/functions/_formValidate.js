import { PGS_toast } from "../components/_cn-notifications.js";


export class PGS_formValidate {
    constructor({ form } = {}) {
        this.container = form;
        this._rules = [];
        // pgs(this.container).add("formError"); 
    }

    //+ ADD
    addError(field, i) {
        field.setAttribute("data-form-field-status", "error");
        if (i == 0) field.scrollIntoView();

        let message = field.getAttribute("data-form-field-message");

        if (i == 0 && message) PGS_toast.error(message);
        else if (i == 0) PGS_toast.error("Compila tutti i campi!");
    }

    //+ REMOVE
    removeError(field) {
        field.setAttribute("data-form-field-status", "");
    }

    #removeErrorOnClick(allFields) {
        allFields.forEach(element => {
            element.addEventListener("click", e => this.removeError(element))
        });
    }

    // + --------------------------
    // + Helpers                   
    // + --------------------------
    help = {
        // supporta sia required nativo, sia data-required="true"
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

            // valida solo se required (o data-required="true")
            if (!this.help.isRequired(input)) return false;

            return this.help.isEmptyTextLike(input);
        });

        //== TEXTAREA 
        // required vuote
        const textareas = Array.from(container.querySelectorAll("textarea")).filter((ta) => {
            if (ta.disabled) return false;
            if (!this.help.isRequired(ta)) return false;
            return this.help.isEmptyTextLike(ta);
        });

        //== SELECT 
        // required vuoti
        const selects = Array.from(container.querySelectorAll("select")).filter((sel) => {
            if (sel.disabled) return false;
            if (!this.help.isRequired(sel)) return false;
            return this.help.isEmptySelect(sel);
        });

        //== RADIO 
        // required: se in un gruppo required non ce n'è uno checked => errore sul "primo" radio del gruppo
        const radios = Array.from(container.querySelectorAll('input[type="radio"]')).filter((r) => !r.disabled);
        const requiredRadioGroups = new Map(); // name -> [elements]
        for (const r of radios) {
            if (!this.help.isRequired(r)) continue;
            const name = this.help.getGroupName(r);
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
            if (!this.help.isRequired(c)) continue;

            const name = this.help.getGroupName(c);
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
            if (!this.help.isRequired(f)) return false;
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

        return invalidFields.flat();
    }

    // + -------------------------
    // + VALIDATE                 
    // + -------------------------
    validate() {
        const invalid = this.#inputValue(this.container);
        const allFields = this.container.querySelectorAll("input, textarea, select")

        //== pulizia/aggiornamento errori: 
        // prima rimuovo errori dai campi "non più invalidi"
        Array.from(allFields).filter((el) => !el.disabled);

        //== per radio/checkbox in gruppo: 
        // rimuovi l'errore solo sull'elemento che lo ospita (qui: se presente)
        for (const el of allFields) { if (!invalid.includes(el)) this.removeError(el); }

        //== aggiungo errori dove serve
        invalid.forEach((el, i) => this.addError(el, i))

        //== rimuove l'errore al click
        this.#removeErrorOnClick(allFields)

        //== status form
        if (invalid.length) {
            this.container.setAttribute("data-form-status", "error");
            return false;
        } else {
            this.container.setAttribute("data-form-status", "success");
            return true;
        }
    }

    ifSuccess(text = "Inviato con successo") {
        if (this.validate() == true) PGS_toast.success(text)
    }

    // + -------------------------
    // + ADD RULE                 
    // + -------------------------
    addNewRule(container) {
        if (typeof container !== "function") throw new Error("Rule must be a function");
        this._rules.push(container);
        return this;
    }
}

