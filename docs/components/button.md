<!-- Automatically generated from reference/html/components/button.html. Edit reference/html/components/button.html and run npm run docs:generate again. -->

# Button

Button and action-link variants with sizes, emphasis, and icon-text composition defined by the design system.

## PGS

- `button`: identifies the standard button, which can also be used on anchor elements, and on a `<label>` wrapping its own checkbox or radio to make a two-state control. On a page that carries `bodyHoverAuto`, `pgs.hover` marks it with `hover` at load, so the hover and focus treatment is not written here; see Html and Body.

## PGS Options (component brackets)

- `btnForHeader`: sizes the button for use in a header.
- `btnReverse`: reverses the visual order of the text and icon on the button.
- `btnStrong`: applies the variant with stronger visual emphasis.
- `btnIconOnly`: identifies a compact button composed primarily of an icon.
- `btnMini`: applies the smallest size variant.
- `btnVertical`: stacks the content vertically, the icon above the label, with the same padding on every side.
- `btnTwoState`: for a label marked as a button that wraps its own checkbox or radio: hides the input, which still carries the semantics and the keyboard, and draws the checked state with --button-background-checked, --button-color-checked, --button-border-color-checked and --button-shadow-checked. Without it the input stays visible and nothing changes when it is checked.
- `btnCurrent`: gives the button the current look — the color, background, border and shadow of --button-*-current — while it carries aria-current="page" or aria-selected="true". Without it those attributes change nothing, so a button that is never marked current does not pay for the rule.
- `btnForNavSmart`: sizes the button as an item of the floating navSmart bar: icon above the label, no background, pill-shaped, and the current look for the page you are on (aria-current) or the panel that is open (aria-expanded). Next to btnIconOnly it drops the label's minimum width and becomes a square as wide as the bar is tall.
- `btnTransparent`: drops the background and the border at rest, so only the label shows, and colors the label on hover. Unlike btnText it leaves the other states alone, so the same button still fills in when it carries btnStrong or aria-current.
- `btnText`: removes the default background and outline while preserving the button layout and hover behavior.
- `btnPrimary`: applies the primary color palette.
- `btnSecondary`: replaces the primary button accent with the secondary color palette.
- `btnTertiary`: replaces the primary button accent with the tertiary color palette.
- `btnQuaternary`: replaces the primary button accent with the quaternary color palette.
- `btnPaddingEqual`: sets the same padding on every side instead of the wider left/right default.

## Related elements

### PGS

- `flex`: provides the flex layout; direction and spacing are flags in its bracket.
- `form`: wraps the checked example, so the control is shown where a form actually puts it.
- `icon`: draws the glyphs this example shows; see Icon for the whole set.

### PGS Options (component brackets)

- `row`: arranges the button examples in a flexible row.
- `wrap`: lets that row break instead of overflowing.
- `gapTexts`: spaces the two buttons that share the text-only example, and the three two-state buttons.
- `icon-arrowRight`: the glyph that points forward.
- `icon-star`: the neutral stand-in glyph, used where the example needs an icon but not a particular one.

### Other

- `hover`: the treatment every button receives, added by pgs.hover on a page that carries bodyHoverAuto, rather than written by hand; see Hover.
- `bodyHoverAuto`: inside body's own bracket, gates whether pgs.hover marks a button automatically; see Html and Body.
- `hoverNot`: opts a button out of that treatment, so it keeps its look and stops answering the pointer; see Hover.

## CSS Variables

- `--button-background`
- `--button-background-checked`
- `--button-background-current`
- `--button-background-hover`
- `--button-border-color`
- `--button-border-color-checked`
- `--button-border-color-current`
- `--button-border-color-hover`
- `--button-border-style`
- `--button-border-width`
- `--button-borderRadius`
- `--button-color`
- `--button-color-checked`
- `--button-color-current`
- `--button-color-hover`
- `--button-fontSize`
- `--button-gap`
- `--button-height`
- `--button-padding`
- `--button-padding-block`
- `--button-padding-left`
- `--button-padding-left-icon`
- `--button-padding-right`
- `--button-primaryColor`
- `--button-shadow`
- `--button-shadow-checked`
- `--button-shadow-current`
- `--button-shadow-hover`
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

### Disabled

A disabled button is dimmed, shows the not-allowed cursor and does not react to hover.

```html
<button pgs="button" type="button" disabled>
    Disabled
</button>
```

### Reversed order

Places the icon after the text using btnReverse.

```html
<button pgs="button['btnReverse']" type="button">
    Next
    <i pgs="icon['icon-arrowRight']" aria-hidden="true"></i>
</button>
```

### Strong emphasis

Applies the higher-emphasis strong variant.

```html
<button pgs="button['btnStrong']" type="button">
    Submit
</button>
```

### Icon only

Compact icon-only button using btnIconOnly.

```html
<button pgs="button['btnIconOnly']" type="button" aria-label="Settings">
    <i pgs="icon['icon-star']" aria-hidden="true"></i>
</button>
```

### Mini size

Smallest button size using btnMini.

```html
<button pgs="button['btnMini']" type="button">
    Mini
</button>
```

### Vertical

Stacks the icon above the label using btnVertical, with the same padding on every side.

```html
<button pgs="button['btnVertical']" type="button">
    <i pgs="icon['icon-star']"></i>
    Vertical
</button>
```

### Transparent

Only the label shows at rest, and it takes the accent color on hover; strong and aria-current still fill in.

```html
<button pgs="button['btnTransparent']" type="button">
    Read more
</button>
```

### Current

btnCurrent turns on the look of the button the page is on: aria-current=&quot;page&quot; (a link) or aria-selected=&quot;true&quot; (a tab). It is the flag that reads those attributes, so write it on every button that can be marked current.

```html
<a pgs="button['btnTransparent' 'btnCurrent']" href="/" aria-current="page">Current page</a>
<a pgs="button['btnTransparent' 'btnCurrent']" href="/other">Another page</a>
```

### Text only

Removes the default background and outline while keeping the button layout using text.

```html
<button pgs="button['btnText']" type="button">
    Text only
</button>
```

### Equal padding

Sets the same padding on every side using btnPaddingEqual, instead of the wider left/right default.

```html
<button pgs="button['btnPaddingEqual']" type="button">
    Equal
</button>
```

### Primary color

Strong button using the primary color palette.

```html
<button pgs="button['btnPrimary']" type="button">
    Primary
</button>
```

### Secondary color

Strong button using the secondary color palette.

```html
<button pgs="button['btnSecondary']" type="button">
    Secondary
</button>
```

### Tertiary color

Strong button using the tertiary color palette.

```html
<button pgs="button['btnTertiary']" type="button">
    Tertiary
</button>
```

### Quaternary color

Strong button using the quaternary color palette.

```html
<button pgs="button['btnQuaternary']" type="button">
    Quaternary
</button>
```

### Checked

A label marked as a button wrapping its own checkbox or radio: the input carries the semantics and the keyboard behavior, the button draws the state. Retune the checked look with --button-background-checked, --button-color-checked and --button-border-color-checked.

```html
<label pgs="button['btnTwoState']">
    <input type="checkbox" name="favorite" value="yes">
    <i pgs="icon['icon-star']"></i>
    Add to favorites
</label>
<label pgs="button['btnTwoState']">
    <input type="radio" name="plan" value="monthly" checked>
    Monthly
</label>
<label pgs="button['btnTwoState']">
    <input type="radio" name="plan" value="yearly">
    Yearly
</label>
```
