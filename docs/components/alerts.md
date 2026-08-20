<!-- Automatically generated from reference/html/components/alerts.html. Edit reference/html/components/alerts.html and run npm run docs:generate again. -->

# Alerts

Inline feedback messages for contextual information, successful operations, warnings, and errors, written in markup or created through JavaScript.

## PGS

- `alertContainer`: identifies a target that can receive alerts created through JavaScript.
- `alert`: identifies the inline alert container.
- `alert-icon`: identifies the decorative status icon.
- `alert-content`: groups the title and descriptive message.
- `alert-content-title`: identifies the alert heading.

## PGS States

- `info`: presents neutral informational feedback.
- `success`: presents confirmation of a successful operation.
- `warning`: presents a condition that requires attention.
- `error`: presents a failure or blocking problem.

## JavaScript API

- `pgs.alert.error(options)`: creates an error alert and renders it in a managed container when root or container is provided.
- `pgs.alert.success(options)`: creates a success alert and renders it in a managed container when root or container is provided.
- `pgs.alert.info(options)`: creates an informational alert and renders it in a managed container when root or container is provided.
- `pgs.alert.warning(options)`: creates a warning alert and renders it in a managed container when root or container is provided.

## Related elements

### PGS

- `flexColumn`: arranges the static alert examples vertically.

### Other

- `notification`: provides dynamic floating alerts and toast messages.

## Output

Accessible HTML examples of the four inline alert states; JavaScript methods return an HTMLElement that can be appended where needed.

## Example

```html
<div pgs="alertContainer flexColumn">
    <div pgs="alert" pgs-state="info" role="status">
        <i pgs="alert-icon" class="fa-solid fa-circle-info" aria-hidden="true"></i>
        <div pgs="alert-content">
            <strong pgs="alert-content-title">Information</strong>
            <p>Your profile information can be updated at any time.</p>
        </div>
    </div>

    <div pgs="alert" pgs-state="success" role="status">
        <i pgs="alert-icon" class="fa-solid fa-circle-check" aria-hidden="true"></i>
        <div pgs="alert-content">
            <strong pgs="alert-content-title">Changes saved</strong>
            <p>Your preferences were updated successfully.</p>
        </div>
    </div>

    <div pgs="alert" pgs-state="warning" role="alert">
        <i pgs="alert-icon" class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
        <div pgs="alert-content">
            <strong pgs="alert-content-title">Check your information</strong>
            <p>Some fields may require your attention before continuing.</p>
        </div>
    </div>

    <div pgs="alert" pgs-state="error" role="alert">
        <i pgs="alert-icon" class="fa-solid fa-circle-xmark" aria-hidden="true"></i>
        <div pgs="alert-content">
            <strong pgs="alert-content-title">Unable to save</strong>
            <p>Correct the reported errors and try again.</p>
        </div>
    </div>
</div>
```
