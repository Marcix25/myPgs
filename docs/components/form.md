<!-- Automatically generated from reference/html/components/form.html. Edit reference/html/components/form.html and run npm run docs:generate again. -->

# Form

Form structure with fields, labels, a textarea, a checkbox, and a radio group compatible with HTML constraints and custom PGS_formValidate rules. The form lays its children out in a column. A text-like input and its label are a field; every other control takes its own token (the range, file, color and select ones are in Form Controls).

## PGS

- `form`: identifies the form container: a column, spaced by --form-gap (the text gap by default). It styles no control of its own: each label, input, select, textarea, checkbox, radio, legend and fieldset takes its token, and field reshapes some of them. It also draws the asterisk on the label or legend of a required control.
- `field`: a modifier for a text-like input, a textarea, a select or a group, with its label: it adds no look of its own to the controls, it reshapes the tokens inside it. It draws the box (border, background and radius) and the controls lose theirs. The label, written first, floats over the control without taking room; the input and the select (and a textarea or a file that also carry the token input) have no border, no background and the padding of --field-padding, and leave room above for the label. The label is in the middle of the field while the input is empty and out of focus, and small at the top of it with focus or once the input holds text: it needs the input right after it and a placeholder attribute, a single space is enough, it is what tells an empty input from one that holds text. A date, time, datetime-local, month or week input always shows text of its own, so its label always stays at the top, and so does the label of a select. A field around a control that is not a text input (a checkbox, a group of radios or checkboxes with its legend as label, a range, a color input, a toggle) takes the option noInput. The look reads --field-background, --field-border, --field-padding, --field-borderRadius and --field-gap (the space between the label and the text).
- `noInput`: inside field's own bracket, `field['noInput']`, for a field whose control is not a text input (a checkbox, a radio group, a range, a color input, a toggle, chips): no input carries the room for the label, so the field keeps it as its own padding, all around and with more room above.
- `label`: the label of a control. Outside a field it is a white box with a border and rounded corners on every side, laid over the top edge of the control by one border width (--label-borderRadius, --label-paddingInline, --label-paddingBlock, --label-color, --label-background, --label-border, --label-borderWidth), on the label itself or on a span inside the label that wraps the control. It is styled only when it sits right before its control, or wraps it: a label with a for that names a control further away is left plain. A label right after a checkbox or a radio is the text of that control instead, and it stays on its line. In a field it is the floating label: no box, one line, partly transparent, over the control. It also dims when its control is disabled, is hidden together with a hidden control and gets the asterisk when the control after it is required.
- `labelTab`: inside label's own bracket, `label['labelTab']`: a tab instead of a pill, rounded on the top corners only and with no border at the bottom, so that it opens into the control it sits on.
- `input`: applies shared styling to an input. A password input uses the browser's own font; a search, number, date, time, datetime-local, month or week input is a row with the picker icon first. The look reads --input-padding, --input-border, --input-borderRadius and --input-background. In a field the input has no border and no background of its own, the padding of the field and room above for the label, and the label floats when it is empty.
- `textarea`: applies shared styling to a <textarea>. In a field it also takes the token input, so that the label floats over it.
- `radio`: styles a group of native radio inputs while preserving their shared name and selection behavior. The box has --radio-background and --radio-borderColor, the dot of a checked radio is --radio-color, each with a -hover and a -checked one; a disabled radio is dimmed. --radio-gap is the space between the box and the text (half the text gap). The label is a flex row: write its text in a <span>, and any link or <strong> inside that span, so the spaces around them are kept.
- `checkbox`: styles a group of native checkbox inputs, sharing the presentation of the radio group. The box has --checkbox-background and --checkbox-borderColor and the check mark is --checkbox-color, each with a -hover and a -checked one; a disabled checkbox is dimmed. --checkbox-gap is the space between the box and the text (half the text gap). The label is a flex row: write its text in a <span>, and any link or <strong> inside that span, so the spaces around them are kept.
- `legend`: applies the group heading styling to the legend of a fieldset.
- `fieldset`: takes the browser's border off a fieldset and lays its options out in a column, spaced by --form-gap (the text gap by default). It is for a group of radios or checkboxes that has no frame of its own, with the legend as its heading.
- `form-requiredHere`: written inside a required label or legend, it puts the asterisk where the element sits instead of at the end of the label. Without it the asterisk is drawn on the label itself, which is what a label with plain text wants; a label ending in a link or a long sentence usually wants to say where the mark goes.

## PGS Data

- `formMessage`: defines a field-specific message with the syntax formMessage[Message text].
- `formMessageTitle`: defines a field-specific alert title with the syntax formMessageTitle[Title text].
- `formFieldErrorTitle`: defines the fallback title for validation errors on the form.
- `formFieldError`: defines the fallback description for one invalid field.
- `formFieldsError`: defines the summary shown when multiple fields are invalid.
- `formSuccessTitle`: defines the validation success title.
- `formSuccess`: defines the validation success description.

## PGS States

- `errorForm`: is applied at runtime to a form that fails validation.
- `errorField`: is applied at runtime to each field that fails validation.
- `errorFieldset`: is applied at runtime to a fieldset that fails validation (a group of radios or checkboxes), in place of errorField: neither the controls it groups, nor their labels, nor its legend are marked.
- `errorLabel`: is applied at runtime to the labels of each field that fails validation: the label that names the control with a for, the one that wraps it, a label written right before it. A fieldset that fails has none: it is marked errorFieldset and nothing inside it is.
- `success`: is applied at runtime to the form after successful validation.

## JavaScript API

- `new pgs.helper.formValidate(form, options)`: the JavaScript side of this component, which validates the form and drives the pgs-state and the pgs-data messages above. Its constructor and instance methods are documented in Form validate, not repeated here.

## Related elements

### PGS

- `select`: the select of the example field, which keeps its own token; see Form Controls.
- `button`: provides the base styling for the primary submit action.

### PGS Options (component brackets)

- `btnStrong`: presents form submission as the primary action.

### Other

- `formValidate`: belongs to Form validate, which lists it as generated: the PGS_formValidate constructor adds it to the form, and it enables the validation-state styles.
- `flex`: provides the flex layout; direction and spacing are flags in its bracket.
- `alertContainer`: is found or created automatically by the alert API when form validation uses inline alerts.
- `column`: spaces text elements in the radio group.

## CSS Variables

- `--form-gap`

## Output

Complete HTML form with required fields and an example script for a custom rule, validation, and a success message.

## JavaScript Usage

```js
import { pgs } from "mypgs";

const form = pgs(document).querySelector("form");

const password = form.querySelector('input[name="password"]');
const confirmPassword = form.querySelector('input[name="confirmPassword"]');
if (!password || !confirmPassword) return;

const formValidate = new pgs.helper.formValidate(form, {
    typeNotice: "alert"
});

//== new rules
formValidate.addNewRule(() => {
    if (password.value && confirmPassword.value && password.value !== confirmPassword.value) {
        pgs(confirmPassword).data.setValueBrackets("formMessage", "Passwords do not match");
        return [confirmPassword, password];
    }
});

//== validate
formValidate.validator(event => {
    const values = Object.fromEntries(new FormData(form));

    // Replace this log with a request to your backend.
    console.log(values);
}, "submit");
```


## Example

```html
<form pgs="form" pgs-data="formFieldErrorTitle[Check the form] formFieldError[Complete this field] formFieldsError[Complete all required fields] formSuccessTitle[Submitted] formSuccess[Submitted successfully]" action="#" method="post">

    <div pgs="field">
        <label pgs="label" for="formName">Name</label>
        <input pgs="input" id="formName" pgs-data="formMessageTitle[Name required] formMessage[Enter your name]" type="text" name="name" placeholder=" " required>
    </div>

    <div pgs="field">
        <label pgs="label" for="formEmail">Email</label>
        <input pgs="input" id="formEmail" pgs-data="formMessage[Enter a valid email address]" type="email" name="email" placeholder=" " required>
    </div>

    <div pgs="field">
        <label pgs="label" for="formPassword">Password</label>
        <input pgs="input" id="formPassword" pgs-data="formMessage[Enter a password]" type="password" name="password" autocomplete="new-password" placeholder=" " required>
    </div>

    <div pgs="field">
        <label pgs="label" for="formConfirmPassword">Confirm password</label>
        <input pgs="input" id="formConfirmPassword" pgs-data="formMessage[Confirm your password]" type="password" name="confirmPassword" autocomplete="new-password" placeholder=" " required>
    </div>

    <div pgs="field">
        <label pgs="label" for="formAge">Age</label>
        <input pgs="input" id="formAge" type="number" name="age" placeholder=" ">
    </div>

    <div pgs="field">
        <label pgs="label" for="formDisabled">Disabled</label>
        <input pgs="input" id="formDisabled" disabled type="text" name="Disabled" placeholder=" ">
    </div>

    <div pgs="field">
        <label pgs="label" for="formMessage">Message</label>
        <textarea pgs="textarea input" id="formMessage" name="message" rows="5" placeholder=" " required></textarea>
    </div>

    <div pgs="field">
        <label pgs="label" for="formCountry">Country</label>
        <select pgs="select" id="formCountry" name="country" required>
            <option value="" selected disabled>Choose a country</option>
            <option value="it">Italy</option>
            <option value="fr">France</option>
        </select>
    </div>

    <br>
    <fieldset pgs="fieldset radio" pgs-data="formMessage[Choose a contact method]">
        <legend pgs="legend">Preferred contact method</legend>

        <label>
            <input type="radio" name="contactMethod" value="email" required>
            <span>Email</span>
        </label>

        <label>
            <input type="radio" name="contactMethod" value="phone">
            <span>Phone</span>
        </label>

        <label>
            <input type="radio" name="contactMethod" value="message">
            <span>Direct message</span>
        </label>
    </fieldset>
    <br>

    <fieldset pgs="fieldset checkbox" pgs-data="formMessage[Choose at least one topic]">
        <legend pgs="legend">Topics</legend>

        <label>
            <input type="checkbox" name="topics" value="news">
            <span>News</span>
        </label>

        <label>
            <input type="checkbox" name="topics" value="offers">
            <span>Offers</span>
        </label>
    </fieldset>
    <br>

    <label pgs="checkbox">
        <input type="checkbox" name="privacy" required>
        <span>I accept the privacy policy</span>
    </label>
    <br>

    <button pgs="button['btnStrong']" type="submit">
        Submit
    </button>

</form>
```
