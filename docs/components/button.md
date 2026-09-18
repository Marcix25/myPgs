<!-- Automatically generated from reference/html/components/button.html. Edit reference/html/components/button.html and run npm run docs:generate again. -->

# Button

Button and action-link variants with sizes, emphasis, and icon-text composition defined by the design system.

## PGS

- `button`: identifies the standard button, which can also be used on anchor elements, and on a `<label>` wrapping its own checkbox or radio to make a two-state control. On a page that carries `bodyHoverAuto`, `pgs.hover` marks it with `hover` at load, so the hover and focus treatment is not written here; see Html and Body.

## PGS Options (component brackets)

- `buttonHeader`: sizes the button for use in a header.
- `buttonReverse`: reverses the visual order of the text and icon on the button.
- `buttonStrong`: applies the variant with stronger visual emphasis.
- `buttonIcon`: identifies a compact button composed primarily of an icon.
- `buttonMini`: applies the smallest size variant.
- `buttonBig`: applies the large size variant.
- `buttonTransparent`: drops the background and the border at rest, so only the label shows, and colours the label on hover. Unlike buttonText it leaves the other states alone, so the same button still fills in when it carries buttonStrong or aria-current.
- `buttonText`: removes the default background and outline while preserving the button layout and hover behavior.
- `buttonPrimary`: applies the primary color palette.
- `buttonSecondary`: replaces the primary button accent with the secondary color palette.
- `buttonTertiary`: replaces the primary button accent with the tertiary color palette.
- `buttonQuaternary`: replaces the primary button accent with the quaternary color palette.
- `buttonPaddingEqual`: sets the same padding on every side instead of the wider left/right default.

## Related elements

### PGS

- `flex`: provides the flex layout; direction and spacing are flags in its bracket.
- `form`: wraps the checked example, so the control is shown where a form actually puts it.
- `icon`: draws the glyphs this example shows; see Icon for the whole set.

### PGS Options (component brackets)

- `flexRow`: arranges the button examples in a flexible row.
- `wrap`: lets that row break instead of overflowing.
- `gapTexts`: spaces the two buttons that share the text-only example, and the three two-state buttons.
- `icon-arrowRight`: the glyph that points forward.
- `icon-star`: the neutral stand-in glyph, used where the example needs an icon but not a particular one.

### Other

- `hover`: the treatment every button receives, added by pgs.hover on a page that carries bodyHoverAuto, rather than written by hand; see Hover.
- `hoverNot`: opts a button out of that treatment, so it keeps its look and stops answering the pointer; see Hover.

## CSS Variables

- `--button-background`
- `--button-background-checked`
- `--button-background-current`
- `--button-background-hover`
- `--button-background-strong`
- `--button-border`
- `--button-border-color`
- `--button-border-color-checked`
- `--button-border-color-current`
- `--button-border-color-hover`
- `--button-border-color-strong`
- `--button-border-style`
- `--button-border-width`
- `--button-borderRadius`
- `--button-color`
- `--button-color-checked`
- `--button-color-current`
- `--button-color-hover`
- `--button-color-strong`
- `--button-font-size`
- `--button-height`
- `--button-padding`
- `--button-padding-block`
- `--button-padding-left`
- `--button-padding-left-icon`
- `--button-padding-right`
- `--button-primaryColor`
- `--button-size`

## Output

HTML collection of the main button variants, including the two-state control.
## Examples

### Link button

Anchor element styled as a standard button, combining an icon with text.

```html
<a pgs="button" href="#">
    <i pgs="icon['icon-star']"></i>
    About
</a>
```

### disabled order

button disabled

```html
<button pgs="button" type="button" disabled>
    Disabled
</button>
```

### Reversed order

Places the icon after the text using buttonReverse.

```html
<button pgs="button['buttonReverse']" type="button">
    Next
    <i pgs="icon['icon-arrowRight']" aria-hidden="true"></i>
</button>
```

### Strong emphasis

Applies the higher-emphasis buttonStrong variant.

```html
<button pgs="button['buttonStrong']" type="button">
    Submit
</button>
```

### Icon only

Compact icon-only button using buttonIcon.

```html
<button pgs="button['buttonIcon']" type="button" aria-label="Settings">
    <i pgs="icon['icon-star']" aria-hidden="true"></i>
</button>
```

### Mini size

Smallest button size using buttonMini.

```html
<button pgs="button['buttonMini']" type="button" aria-label="Information">
    Mini
</button>
```

### Large size

Largest button size using buttonBig, combined with an icon.

```html
<button pgs="button['buttonBig']" type="button" aria-label="Large button">
    <i pgs="icon['icon-star']"></i>
    Large
</button>
```

### Transparent

Only the label shows at rest, and it takes the accent colour on hover; buttonStrong and aria-current still fill in.

```html
<button pgs="button['buttonTransparent']" type="button">
    Read more
</button>
```

### Text only

Removes the default background and outline while keeping the button layout using buttonText.

```html
<button pgs="button['buttonText']" type="button">
    Text only
</button>
```

### Equal padding

Sets the same padding on every side using buttonPaddingEqual, instead of the wider left/right default.

```html
<button pgs="button['buttonPaddingEqual']" type="button">
    Equal
</button>
```

### Primary color

Strong button using the primary color palette.

```html
<button pgs="button['buttonPrimary']" type="button">
    Primary
</button>
```

### Secondary color

Strong button using the secondary color palette.

```html
<button pgs="button['buttonSecondary']" type="button">
    Secondary
</button>
```

### Tertiary color

Strong button using the tertiary color palette.

```html
<button pgs="button['buttonTertiary']" type="button">
    Tertiary
</button>
```

### Quaternary color

Strong button using the quaternary color palette.

```html
<button pgs="button['buttonQuaternary']" type="button">
    Quaternary
</button>
```

### Checked

A label marked as a button wrapping its own checkbox or radio: the input carries the semantics and the keyboard behaviour, the button draws the state. Retune the checked look with --button-background-checked, --button-color-checked and --button-border-color-checked.

```html
<label pgs="button">
    <input type="checkbox" name="favorite" value="yes">
    <i pgs="icon['icon-star']"></i>
    Add to favorites
</label>
<label pgs="button">
    <input type="radio" name="plan" value="monthly" checked>
    Monthly
</label>
<label pgs="button">
    <input type="radio" name="plan" value="yearly">
    Yearly
</label>
```
