# Form validation helper

`pgs.formValidate` validates the required fields, applies the `errorForm`, `errorField` and `success` states, shows an alert or a toast, and lets you add custom rules.

## Initialization

```js
const form = pgs(document).querySelector("form");

const formValidate = new pgs.formValidate(form, {
    typeNotice: "alert",
    showSuccessOnValidate: true,
    alertContainer: undefined,
    message: {
        fieldErrorTitle: "Check the form",
        fieldError: "Complete this field",
        fieldsError: "Complete all required fields",
        successTitle: "Submitted",
        success: "Submitted successfully"
    }
});
```

The constructor adds `formValidate` to the `pgs` token, sets `novalidate`, and fills in the message options the form is missing.

## Configuring the messages

The form is the actual source of the messages:

```html
<form
    pgs="form"
    pgs-option="
        fieldErrorTitle[Check the form]
        fieldError[Complete this field]
        fieldsError[Complete all required fields]
        successTitle[Submitted]
        success[Submitted successfully]
    "
>
</form>
```

Initialization applies them in this order:

1. the options already declared in the form's `pgs-option`;
2. the missing values received through `options.message`;
3. the values still missing, taken from the library defaults.

So `options.message` and the defaults only ever fill the form in. Alerts, toasts and success messages are read from the `pgs-option`.

To change a message after initialization, write to that single actual source:

```js
pgs(form).option.setValueBrackets(
    "fieldsError",
    "Check the fields highlighted"
);
```

## Field-specific messages

`messageTitle` and `message` belong to the individual field:

```html
<input
    pgs="input"
    pgs-option="
        messageTitle[Invalid password]
        message[The password must be at least 8 characters long]
    "
    required
>
```

When there is a single error, these values take priority over the form's `fieldErrorTitle` and `fieldError` fallbacks. When several fields are invalid, `fieldsError` is used instead.

## Validating and submitting

```js
formValidate.validator(event => {
    const values = Object.fromEntries(new FormData(form));
    console.log(values);
});
```

Every new event handled by `validator()` first clears the temporary errors registered with `temporaryFieldError.set()`. There is no need for a separate `submit` listener that calls `temporaryFieldError.clear()`.

To validate without registering a listener:

```js
if (formValidate.validate()) {
    formValidate.success();
}
```

To show a success the backend decides:

```js
const formValidate = new pgs.formValidate(form, {
    showSuccessOnValidate: false
});

formValidate.validator(async () => {
    await saveForm();
    formValidate.success("Your data has been saved", "Updated");
});
```

## Custom rules

A rule returns `null` when it passes, the element when it fails, or an array of the failing elements:

```js
formValidate.addNewRule(() => {
    if (password.value === confirmPassword.value) return null;

    pgs(confirmPassword).option
        .setValueBrackets("messageTitle", "The passwords do not match")
        .setValueBrackets("message", "Enter the confirmation again");

    return confirmPassword;
});
```

## Temporary errors

Temporary errors, for example the ones coming from the server, leave the field's permanent messages untouched:

```js
formValidate.temporaryFieldError.set(password, {
    title: "Sign-in failed",
    message: "The credentials entered are not valid"
});
```

Managing them:

```js
formValidate.temporaryFieldError.remove(password);
formValidate.temporaryFieldError.clear();
```

Temporary errors are kept in a private `Map` and take priority over the field's declarative messages.
