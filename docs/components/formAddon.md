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

### PGS

- `form`: applies the base form styles to the complete add-on example.
- `flexColumn`: vertically arranges each example with its heading and control.
- `flexRow`: horizontally arranges standalone chip controls.
- `gapElements`: applies element spacing between the form add-on examples.

## Output

HTML examples of the checkboxBackground, twoState, toggle, and chips form controls using native checkbox and radio inputs.

## Example

### Checkbox with background

A single checkbox presented as a selectable container, with the checked state highlighted.

```html
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
```

### Radio group with background

Radio inputs sharing the same name and presented as selectable containers, so only one can be checked.

```html
<section pgs="flexColumn">
    <strong>Radio group with background</strong>

    <fieldset pgs="flexRow">
        <label pgs="checkboxBackground">
            <input type="radio" name="plan" value="basic" checked>
            Basic
        </label>

        <label pgs="checkboxBackground">
            <input type="radio" name="plan" value="pro">
            Pro
        </label>

        <label pgs="checkboxBackground">
            <input type="radio" name="plan" value="enterprise">
            Enterprise
        </label>
    </fieldset>
</section>
```

### Two-state control

Checkbox label styled as a button whose appearance changes when selected.

```html
<section pgs="flexColumn">
    <strong>Two-state controls</strong>

    <label pgs="twoState">
        <input type="checkbox" name="favorite" value="yes">
        <i class="fa-solid fa-star" aria-hidden="true"></i>
        Add to favorites
    </label>
</section>
```

### Toggle

Checkbox presented as a switch with a rail and movable thumb.

```html
<section pgs="flexColumn">
    <strong>Toggle</strong>

    <label pgs="toggle">
        <span>Enable Wi-Fi</span>
        <input type="checkbox" name="darkMode" value="enabled">
    </label>
</section>
```

### Chips checkbox

Individual checkbox options presented as compact selectable chip buttons.

```html
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
```

### Chips group (checkbox)

Multiple checkbox chips grouped into a compact segmented selector.

```html
<fieldset pgs="chips">
    <legend>Chip checkbox</legend>
    <label>
        <input type="checkbox" name="plan" value="red" checked>
        Red
    </label>

    <label>
        <input type="checkbox" name="plan" value="blue">
        Blue
    </label>

    <label>
        <input type="checkbox" name="plan" value="green">
        Green
    </label>
</fieldset>
```

### Chips group (radio)

Multiple radio chips grouped into a compact segmented selector, each paired with an icon.

```html
<fieldset pgs="chips">
    <legend>Chips radio</legend>
    <label>
        <input type="radio" name="characters" value="Crow" checked>
        <i class="fa-solid fa-crow"></i>
        Crow
    </label>

    <label>
        <input type="radio" name="characters" value="Dove">
        <i class="fa-solid fa-dove"></i>
        Dove
    </label>

    <label>
        <input type="radio" name="characters" value="dragon">
        <i class="fa-solid fa-dragon"></i>
        dragon
    </label>
</fieldset>
```
