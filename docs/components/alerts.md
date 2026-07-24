<!-- Automatically generated from reference/html/components/alerts.html. Edit reference/html/components/alerts.html and run npm run docs:generate again. -->

# Alerts

Static inline feedback messages for contextual information, successful operations, warnings, and errors. Use the notification API for dynamic floating alerts and toasts.

## PGS

- `alert`: identifies the inline alert container.
- `alert-icon`: identifies the decorative status icon.
- `alert-content`: groups the title and descriptive message.
- `alert-title`: identifies the alert heading.

## PGS States

- `info`: presents neutral informational feedback.
- `success`: presents confirmation of a successful operation.
- `warning`: presents a condition that requires attention.
- `error`: presents a failure or blocking problem.

## Related elements

- `flexColumn`: vertically arranges the alert examples.
- `gapElements`: applies element spacing between the examples.
- `notification`: provides dynamic floating alerts and toast messages.

## Output

Accessible HTML examples of the four inline alert states.

## Example

```html
<div pgs="flexColumn gapElements">
    <div pgs="alert" pgs-state="info" role="status">
        <i pgs="alert-icon" class="fa-solid fa-circle-info" aria-hidden="true"></i>
        <div pgs="alert-content">
            <strong pgs="alert-title">Information</strong>
            <p>Your profile information can be updated at any time.</p>
        </div>
    </div>

    <div pgs="alert" pgs-state="success" role="status">
        <i pgs="alert-icon" class="fa-solid fa-circle-check" aria-hidden="true"></i>
        <div pgs="alert-content">
            <strong pgs="alert-title">Changes saved</strong>
            <p>Your preferences were updated successfully.</p>
        </div>
    </div>

    <div pgs="alert" pgs-state="warning" role="alert">
        <i pgs="alert-icon" class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
        <div pgs="alert-content">
            <strong pgs="alert-title">Check your information</strong>
            <p>Some fields may require your attention before continuing.</p>
        </div>
    </div>

    <div pgs="alert" pgs-state="error" role="alert">
        <i pgs="alert-icon" class="fa-solid fa-circle-xmark" aria-hidden="true"></i>
        <div pgs="alert-content">
            <strong pgs="alert-title">Unable to save</strong>
            <p>Correct the reported errors and try again.</p>
        </div>
    </div>
</div>
```
