<!-- Automatically generated from reference/html/components/form.html. Edit reference/html/components/form.html and run npm run docs:generate again. -->

# Form

Form structure with fields, labels, a textarea, a checkbox, and a radio group compatible with HTML constraints and custom PGS_formValidate rules. The form lays its children out in a column. A text-like input and its label are a field; every other control takes its own token (the range, file, color and select ones are in Form Controls).

## PGS

- `form`: identifies the form container: a column, spaced by --form-gap (the text gap by default). It styles no control of its own: each field, label, select, textarea, checkbox, radio, legend and fieldset takes its token. It also draws the asterisk on the label or legend of a required control.
- `field`: the box of a text-like input (text, email, tel, url, password, number, search, date and the like) or a textarea, with its label: it draws the border, the background and the radius, and the control inside it, marked field-input, has none of its own. The label (field-label) floats: it lies in the middle of the field while the control is empty and out of focus, and it is small at the top of it with focus or once the control holds text. The control needs a placeholder attribute, a single space is enough: it is what tells an empty one from one that holds text. A date, time, datetime-local, month or week input always shows text of its own, so its label always stays small at the top. A field can also hold a group of checkboxes or radios (a fieldset, with its legend as field-label): the labels that hold a checkbox or a radio are left as they are. The look reads --field-label-color, --field-label-opacity, --field-background, --field-border, --field-padding, --field-borderRadius, --field-gap (the space between the label and the text) and --field-label-top (the distance from the top of the field to the label while the field is empty, which is the middle of a control of one line).
- `field-input`: the control of a field, written on the input, the select or the textarea (and on a range, a file or a color input that sits in a field): it lifts the control to the box of the field, with room above for the label and no border of its own. Nothing in the field takes it by itself: a control without it is left as the browser draws it. It reads --field-padding, --field-gap and --field-background.
- `field-label`: the label of a field, written inside it and nothing else is taken for one: a <label> with a for that names the control, a span inside a <label> that wraps the field, or the <legend> of a group. It is one line, cut with an ellipsis when it is longer than the field, and it floats over the control without taking room.
- `label`: the label of a control that is not in a field (a range, a file or a color input, a select or a textarea that stays out of one): a tab sitting on top of the control: a white box with a border and rounded corners on every side, laid over the top edge of the control by one border width (--label-borderRadius, --label-paddingInline, --label-paddingBlock, --label-color, --label-background, --label-border, --label-borderWidth), on the label itself or on a span inside the label that wraps the control. It is styled only when it sits right before its control, or wraps it: a label with a for that names a control further away is left plain. A label right after a checkbox or a radio is the text of that control instead, and it stays on its line. It also dims when its control is disabled, and is hidden together with a hidden control.
- `labelTab`: inside label's own bracket, `label['labelTab']`: a tab instead of a pill, rounded on the top corners only and with no border at the bottom, so that it opens into the control it sits on.
- `input`: applies shared styling to an input that is not in a field (inside a field the field is the box and the input has no border or background of its own). A password input uses the browser's own font; a search, number, date, time, datetime-local, month or week input is a row with the picker icon first. The look reads --input-padding, --input-border, --input-borderRadius and --input-background.
- `textarea`: applies shared styling to a <textarea> that is not in a field.
- `radio`: styles a group of native radio inputs while preserving their shared name and selection behavior. The box has --radio-background and --radio-borderColor, the dot of a checked radio is --radio-color, each with a -hover and a -checked one; the hover is per label. --radio-gap is the space between the box and the text (half the text gap). The label is a flex row: write its text in a <span>, and any link or <strong> inside that span, so the spaces around them are kept.
- `checkbox`: styles a group of native checkbox inputs, sharing the presentation of the radio group. The box has --checkbox-background and --checkbox-borderColor and the check mark is --checkbox-color, each with a -hover and a -checked one. --checkbox-gap is the space between the box and the text (half the text gap). The label is a flex row: write its text in a <span>, and any link or <strong> inside that span, so the spaces around them are kept.
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
- `success`: is applied at runtime to the form after successful validation.

## JavaScript API

- `new pgs.helper.formValidate(form, options)`: the JavaScript side of this component, which validates the form and drives the pgs-state and the pgs-data messages above. Its constructor and instance methods are documented in Form validate, not repeated here.

## Related elements

### PGS

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
        <label pgs="field-label" for="formName">Name</label>
        <input pgs="field-input" id="formName" pgs-data="formMessageTitle[Name required] formMessage[Enter your name]" type="text" name="name" placeholder=" " required>
    </div>

    <div pgs="field">
        <label pgs="field-label" for="formEmail">Email</label>
        <input pgs="field-input" id="formEmail" pgs-data="formMessage[Enter a valid email address]" type="email" name="email" placeholder=" " required>
    </div>

    <div pgs="field">
        <label pgs="field-label" for="formPassword">Password</label>
        <input pgs="field-input" id="formPassword" pgs-data="formMessage[Enter a password]" type="password" name="password" autocomplete="new-password" placeholder=" " required>
    </div>

    <div pgs="field">
        <label pgs="field-label" for="formConfirmPassword">Confirm password</label>
        <input pgs="field-input" id="formConfirmPassword" pgs-data="formMessage[Confirm your password]" type="password" name="confirmPassword" autocomplete="new-password" placeholder=" " required>
    </div>

    <div pgs="field">
        <label pgs="field-label" for="formAge">Age</label>
        <input pgs="field-input" id="formAge" type="number" name="age" placeholder=" ">
    </div>

    <div pgs="field">
        <label pgs="field-label" for="formDisabled">Disabled</label>
        <input pgs="field-input" id="formDisabled" disabled type="text" name="Disabled" placeholder=" ">
    </div>

    <div pgs="field">
        <label pgs="field-label" for="formMessage">Message</label>
        <textarea pgs="field-input" id="formMessage" name="message" rows="5" placeholder=" " required></textarea>
    </div>

    <div pgs="field">
        <label pgs="field-label" for="formCountry">Country</label>
        <select pgs="field-input" id="formCountry" name="country" required>
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
