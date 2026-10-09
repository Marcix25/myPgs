import { pgs } from "../_pgs.js";
import { PGS_toast } from "../components/_toast.js";
import { PGS_alert } from "../components/_alerts.js";
import { PGS_invalid } from "./_warn.js";

// formMessage/formMessageTitle live only in pgs-data, and .data has no querySelector — find
// the nearest descendant carrying either key's payload directly
function findDataDescendant(root, keys) {
    for (const element of root.querySelectorAll("[pgs-data]")) {
        if (keys.some(key => pgs(element).data.getValueBrackets(key) !== undefined)) return element;
    }
    return null;
}


export class PGS_formValidate {
    #messageDefaults = {
        formFieldErrorTitle: "Error!",
        formFieldError: "Please complete this field.",
        formFieldsError: "Please complete all required fields.",
        formSuccessTitle: "Submitted",
        formSuccess: "Submitted successfully."
    };
    #temporaryFieldErrors = new Map();
    #insideValidatedCallback = false;
    // one controller for every listener the instance adds to the form, so destroy() removes them all
    #controller = new AbortController();

    constructor(form, options = {}) {
        if (!(form instanceof Element)) {
            throw PGS_invalid("formValidate", "form must be an element");
        }
        if (!options || typeof options !== "object" || Array.isArray(options)) {
            throw PGS_invalid("formValidate", "options must be an object");
        }

        this.container = form;
        this._rules = [];
        this.typeNotice = options.typeNotice === "toast" ? "toast" : "alert";
        this.showSuccessOnValidate = options.showSuccessOnValidate !== false;
        this.alertContainer = options.alertContainer;

        pgs(this.container).add("formValidate");
        this.#initializeMessages(options.message);
        this.container.setAttribute("novalidate", "");

        // a click on a field clears its error. One listener on the form serves every field, the
        // ones added after this point too, so validate() has nothing to attach and can run any
        // number of times without stacking listeners
        this.container.addEventListener("click", event => this.#clearErrorOnClick(event), { signal: this.#controller.signal });
    }

    //# DESTROY
    // removes the listeners the instance added to the form: the click that clears an error and
    // every validator(). The state, the novalidate attribute and the messages stay as they are
    destroy() {
        this.#controller.abort();
    }

    #clearErrorOnClick(event) {
        const field = event.target.closest("input, textarea, select");
        if (!field) return;

        const errorTarget = pgs(field).state.closest("errorField");
        if (errorTarget) this.#removeFieldError(errorTarget);
    }

    #validateMessages(value) {
        if (value === undefined) return;
        if (!value || typeof value !== "object" || Array.isArray(value)) {
            throw PGS_invalid("formValidate", "message must be an object");
        }

        Object.entries(value).forEach(([key, message]) => {
            if (!(key in this.#messageDefaults)) {
                throw PGS_invalid("formValidate", `unknown form message option "${key}"`);
            }
            if (message !== undefined && typeof message !== "string") {
                throw PGS_invalid("formValidate", `form message option "${key}" must be a string`);
            }
        });
    }

    #initializeMessages(value = {}) {
        this.#validateMessages(value);

        const formData = pgs(this.container).data;
        const initialMessages = {
            ...this.#messageDefaults,
            ...Object.fromEntries(
                Object.entries(value).filter(([, message]) => message !== undefined)
            )
        };

        Object.entries(initialMessages).forEach(([key, message]) => {
            if (formData.getValueBrackets(key) === undefined) formData.setValueBrackets(key, message);
        });
    }

    #getMessage(key) {
        return pgs(this.container).data.getValueBrackets(key);
    }

    temporaryFieldError = {
        set: (field, options = {}) => {
            if (!field || typeof field.matches !== "function" || !this.container.contains(field)) {
                throw PGS_invalid("formValidate.temporaryFieldError.set", "field must be an element contained in the form");
            }

            if (typeof options === "string") options = { message: options };
            if (!options || typeof options !== "object" || Array.isArray(options)) {
                throw PGS_invalid("formValidate.temporaryFieldError.set", "options must be an object or a string");
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
        // supports the native required attribute, data-required and aria-required
        isRequired(field) {
            if (!field) return false;

            const required = field.required === true || field.dataset.required === "true" || field.getAttribute('aria-required') === "true";
            return required && !field.hidden; // only the "hidden" attribute/property counts
        },
        // input (not special ones), textarea and select: empty when the value is "" or only spaces
        isEmptyTextLike(field) { return !String(field?.value ?? "").trim(); },
        // reads the name safely
        getGroupName(field) { return field?.name || field?.getAttribute?.("name") || ""; }
    };


    // + --------------------------
    // + inputs and other elements.
    // + --------------------------
    #inputValue(container) {

        //## add rule
        const ruleInvalidFields = [];
        for (const rule of this._rules) {
            const res = rule(container);

            // a rule can return:
            // • null/undefined => ok
            // • an element => invalid
            // • an array of elements => invalid
            if (!res) continue;

            if (Array.isArray(res)) ruleInvalidFields.push(...res);
            else ruleInvalidFields.push(res);
        }

        //## INPUT 
        // text-like inputs (hidden, disabled, checkbox, radio and file ones are left out)
        const textInputs = Array.from(container.querySelectorAll("input")).filter((input) => {
            if (input.disabled) return false;
            if (input.type === "hidden") return false;
            if (input.type === "checkbox" || input.type === "radio" || input.type === "file") return false;

            // only validated when the field is required
            if (!this.#help.isRequired(input)) return false;

            return this.#help.isEmptyTextLike(input);
        });

        //## TEXTAREA 
        // required and empty
        const textareas = Array.from(container.querySelectorAll("textarea")).filter((ta) => {
            if (ta.disabled) return false;
            if (!this.#help.isRequired(ta)) return false;
            return this.#help.isEmptyTextLike(ta);
        });

        //## SELECT 
        // required and empty
        const selects = Array.from(container.querySelectorAll("select")).filter((sel) => {
            if (sel.disabled) return false;
            if (!this.#help.isRequired(sel)) return false;
            return this.#help.isEmptyTextLike(sel);
        });

        //## RADIO 
        // required: a radio group with nothing checked reports the error on the first radio of the group
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

        //## CHECKBOX 
        // required: it can be a single required checkbox (it has to be checked)
        // or a checkbox group (same name) with at least one box ticked
        const checkboxes = Array.from(container.querySelectorAll('input[type="checkbox"]')).filter((c) => !c.disabled);
        const requiredCheckboxSingles = [];
        const requiredCheckboxGroups = new Map(); // name -> [elements]
        for (const c of checkboxes) {
            if (!this.#help.isRequired(c)) continue;

            const name = this.#help.getGroupName(c);
            if (!name) {
                // a checkbox with no name is treated as a single required field
                if (!c.checked) requiredCheckboxSingles.push(c);
                continue;
            }

            // grouped by name, so a group answers as one field
            if (!requiredCheckboxGroups.has(name)) requiredCheckboxGroups.set(name, []);
            requiredCheckboxGroups.get(name).push(c);
        }
        const checkboxGroupErrors = [];
        for (const [name, group] of requiredCheckboxGroups.entries()) {
            // a real group (>= 2) needs at least one box ticked
            // a lone box behaves as a single required field
            const anyChecked = group.some((c) => c.checked);
            if (!anyChecked) {
                const fieldset = group.length > 1 ? group[0].closest("fieldset") : null;
                checkboxGroupErrors.push(fieldset || group[0]);
            }
        }

        //## FILE 
        // required: no file chosen
        const fileInputs = Array.from(container.querySelectorAll('input[type="file"]')).filter((f) => {
            if (f.disabled) return false;
            if (!this.#help.isRequired(f)) return false;
            return !(f.files && f.files.length > 0);
        });

        // the result: every field to be marked as failing
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

    //## ADD
    #addFieldError(field, i = 0, total = 1) {
        pgs(field).state.add("errorField");

        // the first invalid field is the one that scrolls into view and speaks for all of them
        if (i !== 0) return;
        field.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });

        const messageSource = field.matches("fieldset")
            ? findDataDescendant(field, ["formMessage", "formMessageTitle"])
            : field;
        const source = messageSource || field;
        const temporaryError = this.#temporaryFieldErrors.get(field);
        const fieldTitle = pgs(source).data.getValueBrackets("formMessageTitle");
        const fieldMessage = pgs(source).data.getValueBrackets("formMessage");
        const title = temporaryError?.title || fieldTitle || this.#getMessage("formFieldErrorTitle");
        const description = total > 1
            ? this.#getMessage("formFieldsError")
            : temporaryError?.message || fieldMessage || this.#getMessage("formFieldError");

        if (this.typeNotice === "alert") {
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

    //## REMOVE
    #removeFieldError(field) {
        this.#temporaryFieldErrors.delete(field);
        pgs(field).state.remove("errorField");
    }

    // + SUCCESS
    success(description = this.#getMessage("formSuccess"), title = this.#getMessage("formSuccessTitle")) {
        if (this.#insideValidatedCallback || this.validate() === true) {

            if (this.typeNotice === "alert") {
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

        // clean up the errors that no longer apply
        pgs(this.container).state.querySelectorAll("errorField").forEach(element => {
            if (!invalid.includes(element)) this.#removeFieldError(element);
        });

        // add the errors where needed
        invalid.forEach((el, i) => this.#addFieldError(el, i, invalid.length))

        //## status form
        if (invalid.length) {
            pgs(this.container).state.remove("success").add("errorForm");
            return false;
        } else {
            pgs(this.container).state.remove("errorForm").add("success");
            return true;
        }
    }

    //# EVENT VALIDATOR
    validator(callback, eventName = "submit") {
        if (typeof callback !== "function") throw PGS_invalid("formValidate.validator", "callback must be a function");
        if (typeof eventName !== "string" || !eventName.trim()) throw PGS_invalid("formValidate.validator", "eventName must be a non-empty string");

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
        }, { signal: this.#controller.signal });

        return this;
    }

    //# ADD RULE
    addNewRule(rule) {
        if (typeof rule !== "function") throw PGS_invalid("formValidate.addNewRule", "rule must be a function");
        this._rules.push(rule);
        return this;
    }
}
