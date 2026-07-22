<!-- Automatically generated from templates/html/components/form.html. Edit templates/html/components/form.html and run npm run docs:generate again. -->

# Form

Form structure with labels, text fields, a textarea, a checkbox, and a radio group compatible with HTML constraints and custom PGS_formValidate rules.

## PGS

- `form`: identifies the form container and applies the field layout.
- `formValidate`: enables styles associated with validation states managed by the JavaScript utility.
- `label`: identifies labels associated with controls.
- `input`: applies shared styling to text inputs.
- `textarea`: applies shared styling to the text area.
- `radio`: styles a group of native radio inputs while preserving their shared name and selection behavior.

## PGS Options

- `message`: defines a field-specific message with the syntax message[Message text].
- `error`: is applied at runtime to the form and fields that fail validation.
- `success`: is applied at runtime to the form after successful validation.

## JavaScript API

- `new pgs.formValidate(form, options)`: creates a utility associated directly with the form, automatically adds novalidate, and accepts fieldError, fieldsError, and success in options.message; messages remain editable through instance.message.
- `instance.validator(callback, eventName)`: intercepts the specified event, prevents its default behavior, validates the form, shows the success message, and invokes callback only when valid; eventName defaults to submit.
- `instance.validate()`: validates required fields, updates state attributes, and returns true or false.
- `instance.success(text)`: validates the form and shows a success toast when there are no errors.
- `instance.addNewRule(rule)`: adds a function that returns one or more invalid fields; validate automatically applies addFieldError to each field.
- `instance.addFieldError(field, index, total)`: marks a field as invalid; shows the specific message for one error or a summary message for multiple errors.
- `instance.removeFieldError(field)`: removes the error state from the specified field.

## Related elements

- `buttonStrong`: presents form submission as the primary action.
- `flexColumnTexts`: spaces text elements in the radio group.

## Output

Complete HTML form with required fields and an example script for a custom rule, validation, and a success message.

## Example

```html
<form pgs="form formValidate" action="#" method="post">
    <label pgs="label" for="form-name">
        Name
    </label>
    <input id="form-name" pgs="input" pgs-option="message[Enter your name]" type="text" name="name" placeholder="John Smith" required>

    <label pgs="label" for="form-email">
        Email
    </label>
    <input id="form-email" pgs="input" pgs-option="message[Enter a valid email address]" type="email" name="email" placeholder="name@example.com" required>

    <label pgs="label" for="form-password">
        Password
    </label>
    <input id="form-password" pgs="input" pgs-option="message[Enter a password]" type="password" name="password" autocomplete="new-password" required>

    <label pgs="label" for="form-confirm-password">
        Confirm password
    </label>
    <input id="form-confirm-password" pgs="input" pgs-option="message[Confirm your password]" type="password" name="confirmPassword" autocomplete="new-password" required>

    <label pgs="label" for="form-message">
        Message
    </label>
    <textarea id="form-message" pgs="textarea" name="message" rows="5" placeholder="Write your message" required></textarea>

    <br>
    <fieldset pgs="radio flexColumnTexts">
        <legend>Preferred contact method</legend>

        <label>
            <input type="radio" name="contactMethod" value="email" pgs-option="message[Choose a contact method]" required>
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

    <label>
        <input type="checkbox" name="privacy" required>
        <span>I accept the privacy policy</span>
    </label>
    <br>

    <button pgs="buttonStrong" type="submit">
        <i class="fa-solid fa-paper-plane" aria-hidden="true"></i>
        Submit
    </button>
</form>

<script type="module">
    import { pgs } from "mypgs";

    const form = pgs(document).querySelector("form");

    const password = form.querySelector('input[name="password"]');
    const confirmPassword = form.querySelector('input[name="confirmPassword"]');
    if (!password || !confirmPassword) return;

    const formValidate = new pgs.formValidate(form, {
        message: {
            fieldError: "Please complete this field",
            fieldsError: "Please complete all required fields",
            success: "Submitted successfully"
        }
    });

    //== new roules
    formValidate.addNewRule(() => {
        if (password.value && confirmPassword.value && password.value !== confirmPassword.value) {
            pgs(confirmPassword).option.setValueBrackets("message", "Passwords do not match");
            return [confirmPassword, password];
        }
    });

    //== validate
    formValidate.validator(event => {
        const values = Object.fromEntries(new FormData(form));

        // Replace this log with a request to your backend.
        console.log(values);
    }, "submit");
</script>
```
