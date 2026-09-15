<!-- Automatically generated from reference/html/components/formAddon.html. Edit reference/html/components/formAddon.html and run npm run docs:generate again. -->

# Form Add-ons

Additional form controls for selectable cards, switches, and compact chip groups.

## PGS

- `checkboxBackground`: presents a checkbox as a selectable container with a highlighted checked state.
- `toggle`: presents a checkbox as a switch with a rail and movable thumb.
- `chip`: presents an individual checkbox or radio option as a compact selectable button. It shapes the control and leaves the button look to `button`, so write both on the label; inside a `chips` group the token comes from the group and only `button` is written.
- `chips`: groups chip controls into a compact segmented selector.

## Related elements

### PGS

- `form`: applies the base form styles to the complete add-on example.
- `flexColumn`: vertically arranges each example with its heading and control.
- `flexRow`: horizontally arranges standalone chip controls.
- `icon`: draws the glyphs this example shows; see Icon for the whole set.
- `legend`: applies the group heading styling to a chips group's legend; see Form.
- `button`: draws the chip, which composes the button look instead of redrawing it, and hides the checkbox or radio it wraps; see Button.

### PGS Options

- `gapElements`: applies element spacing between the form add-on examples.
- `icon-star`: the neutral stand-in glyph, used where the example needs an icon but not a particular one.
- `buttonMini`: sizes that button down to the chip's compact size.

## Output

HTML examples of the checkboxBackground, toggle, chip, and chips form controls using native checkbox and radio inputs.
## Examples

### Checkbox with background

A single checkbox presented as a selectable container, with the checked state highlighted.

```html
<label pgs="checkboxBackground">
    <input type="checkbox" name="notifications" value="enabled">
    <span>
        <strong>Enable notifications</strong><br>
        Receive important account updates.
    </span>
</label>
```

### Radio group with background

Radio inputs sharing the same name and presented as selectable containers, so only one can be checked.

```html
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
```

### Toggle

Checkbox presented as a switch with a rail and movable thumb.

```html
<label pgs="toggle">
    <span>Enable Wi-Fi</span>
    <input type="checkbox" name="darkMode" value="enabled">
</label>
```

### Chips checkbox

Individual checkbox options presented as compact selectable chip buttons.

```html
<div pgs="flexRow" role="group" aria-label="Chip actions">
    <label pgs="button chip" pgs-option="buttonMini">
        <input type="checkbox" name="like" value="basic">
        <i pgs="icon" pgs-option="icon-star"></i>
        Like
    </label>
    <label pgs="button chip" pgs-option="buttonMini">
        <input type="checkbox" name="share" value="basic">
        <i pgs="icon" pgs-option="icon-star"></i>
        Share
    </label>
</div>
```

### Chips group (checkbox)

Multiple checkbox chips grouped into a compact segmented selector.

```html
<fieldset pgs="chips">
    <legend pgs="legend">Chip checkbox</legend>
    <label pgs="button" pgs-option="buttonMini">
        <input type="checkbox" name="plan" value="red" checked>
        Red
    </label>

    <label pgs="button" pgs-option="buttonMini">
        <input type="checkbox" name="plan" value="blue">
        Blue
    </label>

    <label pgs="button" pgs-option="buttonMini">
        <input type="checkbox" name="plan" value="green">
        Green
    </label>
</fieldset>
```

### Chips group (radio)

Multiple radio chips grouped into a compact segmented selector, each paired with an icon.

```html
<fieldset pgs="chips">
    <legend pgs="legend">Chips radio</legend>
    <label pgs="button" pgs-option="buttonMini">
        <input type="radio" name="characters" value="Crow" checked>
        <i pgs="icon" pgs-option="icon-star"></i>
        Crow
    </label>

    <label pgs="button" pgs-option="buttonMini">
        <input type="radio" name="characters" value="Dove">
        <i pgs="icon" pgs-option="icon-star"></i>
        Dove
    </label>

    <label pgs="button" pgs-option="buttonMini">
        <input type="radio" name="characters" value="dragon">
        <i pgs="icon" pgs-option="icon-star"></i>
        dragon
    </label>
</fieldset>
```
