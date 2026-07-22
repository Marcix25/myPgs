<!-- Automatically generated from templates/html/components/formAddon.html. Edit templates/html/components/formAddon.html and run npm run docs:generate again. -->

# Form Add-ons

Additional form controls for selectable cards, two-state buttons, switches, and compact chip groups.

## PGS

- `checkboxBackground`: presents a checkbox as a selectable container with a highlighted checked state.
- `twoState`: presents checkbox or radio labels as buttons whose appearance changes when selected.
- `toggle`: presents a checkbox as a switch with a rail and movable thumb.
- `chips`: groups twoState controls into a compact segmented selector.

## Related elements

- `flexColumnElements`: vertically arranges the form add-on examples.
- `flexColumnTexts`: groups each example with its heading and control.

## Output

HTML examples of the checkboxBackground, twoState, toggle, and chips form controls using native checkbox and radio inputs.

## Example

```html
<div pgs="flexColumnElements">
    <section pgs="flexColumnTexts">
        <strong>Checkbox with background</strong>

        <label pgs="checkboxBackground">
            <input type="checkbox" name="notifications" value="enabled">
            <span>
                <strong>Enable notifications</strong><br>
                Receive important account updates.
            </span>
        </label>
    </section>

    <section pgs="flexColumnTexts">
        <strong>Two-state controls</strong>

        <label pgs="twoState">
            <input type="checkbox" name="favorite" value="yes">
            <i class="fa-solid fa-star" aria-hidden="true"></i>
            Add to favorites
        </label>
    </section>

    <section pgs="flexColumnTexts">
        <strong>Toggle</strong>

        <label pgs="toggle">
            <span>Enable dark mode</span>
            <input type="checkbox" name="darkMode" value="enabled">
        </label>
    </section>

    <section pgs="flexColumnTexts">
        <strong>Chips</strong>

        <div pgs="chips" role="group" aria-label="Select a plan">
            <label pgs="twoState">
                <input type="radio" name="plan" value="basic" checked>
                Basic
            </label>

            <label pgs="twoState">
                <input type="radio" name="plan" value="pro">
                Pro
            </label>

            <label pgs="twoState">
                <input type="radio" name="plan" value="enterprise">
                Enterprise
            </label>
        </div>
    </section>
</div>
```
