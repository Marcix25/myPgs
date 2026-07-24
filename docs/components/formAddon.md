<!-- Automatically generated from reference/html/components/formAddon.html. Edit reference/html/components/formAddon.html and run npm run docs:generate again. -->

# Form Add-ons

Additional form controls for selectable cards, two-state buttons, switches, and compact chip groups.

## PGS

- `checkboxBackground`: presents a checkbox as a selectable container with a highlighted checked state.
- `twoState`: presents checkbox or radio labels as buttons whose appearance changes when selected.
- `toggle`: presents a checkbox as a switch with a rail and movable thumb.
- `chip`: presents an individual checkbox or radio option as a compact selectable button.
- `chips`: groups twoState controls into a compact segmented selector.

## Related elements

- `form`: applies the base form styles to the complete add-on example.
- `flexColumn`: vertically arranges each example with its heading and control.
- `flexRow`: horizontally arranges standalone chip controls.
- `gapElements`: applies element spacing between the form add-on examples.

## Output

HTML examples of the checkboxBackground, twoState, toggle, and chips form controls using native checkbox and radio inputs.

## Example

```html
<form pgs="form flexColumn gapElements">
    <section pgs="flexColumn">
        <strong>Checkbox with background</strong>

        <label pgs="checkboxBackground">
            <input type="checkbox" name="notifications" value="enabled">
            <span>
                <strong>Enable notifications</strong><br>
                Receive important account updates.
            </span>
        </label>
    </section>

    <section pgs="flexColumn">
        <strong>Two-state controls</strong>

        <label pgs="twoState">
            <input type="checkbox" name="favorite" value="yes">
            <i class="fa-solid fa-star" aria-hidden="true"></i>
            Add to favorites
        </label>
    </section>

    <section pgs="flexColumn">
        <strong>Toggle</strong>

        <label pgs="toggle">
            <span>Enable Wi-Fi</span>
            <input type="checkbox" name="darkMode" value="enabled">
        </label>
    </section>

    <section pgs="flexColumn">
        <strong>Chips checkbox</strong>
        <div pgs="flexRow" role="group" aria-label="Chip actions">
            <label pgs="chip">
                <input type="checkbox" name="like" value="basic">
                <i class="fa-solid fa-heart"></i>
                Like
            </label>
            <label pgs="chip">
                <input type="checkbox" name="share" value="basic">
                <i class="fa-solid fa-share"></i>
                Share
            </label>
        </div>
    </section>

    <section pgs="flexColumn gapElements">
        <fieldset pgs="chips">
            <legend>Chip checkbox</legend>
            <label>
                <input type="checkbox" name="plan" value="basic" checked>
                Basic
            </label>

            <label>
                <input type="checkbox" name="plan" value="pro">
                Pro
            </label>

            <label>
                <input type="checkbox" name="plan" value="enterprise">
                Enterprise
            </label>
        </fieldset>

        <fieldset pgs="chips">
            <legend>Chips radio</legend>
            <label>
                <input type="radio" name="characters" value="basic" checked>
                <i class="fa-solid fa-crow"></i>
                Crow
            </label>

            <label>
                <i class="fa-solid fa-dove"></i> <input type="radio" name="characters" value="pro">
                Dove
            </label>

            <label>
                <i class="fa-solid fa-dragon"></i> <input type="radio" name="characters" value="enterprise">
                dragon
            </label>
        </fieldset>
    </section>
</form>
```
