<!-- Automatically generated from reference/html/components/button.html. Edit reference/html/components/button.html and run npm run docs:generate again. -->

# Button

Button and action-link variants with sizes, emphasis, and icon-text composition defined by the design system.

## PGS

- `button`: identifies the standard button, which can also be used on anchor elements, and on a `<label>` wrapping its own checkbox or radio to make a two-state control. A button with aria-current="page" or aria-selected="true" takes the current look (--button-*-current) with no option: the attribute that marks it for assistive technology draws it too.

## PGS Options (component brackets)

- `btnForHeader`: for a button in a header: a long label breaks instead of overflowing. It keeps the border of the button: add btnTransparent or btnText for a button with none.
- `btnReverse`: for a button whose icon is written after the label: moves the short padding to the right side, next to the icon. It does not reorder anything, so the icon has to be written last in the markup.
- `btnIconBoth`: for an icon on each side of the label, a glyph before it and a chevron after it for example: the short padding on both sides, instead of on the side of the one icon.
- `btnStrong`: applies the variant with stronger visual emphasis.
- `btnIconOnly`: identifies a compact button composed primarily of an icon.
- `btnMini`: applies the smallest size variant.
- `btnVertical`: stacks the content vertically, the icon above the label, with the same padding on every side.
- `btnTwoState`: for a label marked as a button that wraps its own checkbox or radio: hides the input, which still carries the semantics and the keyboard, and draws the checked state with --button-background-twoState, --button-color-twoState, --button-borderColor-twoState and --button-shadow-twoState. Without it the input stays visible and nothing changes when it is checked.
- `btnForNavSmart`: sizes the button as an item of the floating navSmart bar: icon above the label, no background, pill-shaped, and the current look for the page you are on (aria-current) or the panel that is open (aria-expanded). Next to btnIconOnly it drops the label's minimum width and becomes a square as wide as the bar is tall.
- `btnTransparent`: drops the background and the border at rest, so only the label shows; on hover it fills like any other button. Unlike btnText it leaves the other states alone, so the same button still fills in when it carries btnStrong or aria-current.
- `btnText`: text only: no border, no radius, no shadow and a transparent background in every state, so it never fills in on hover, aria-current or checked. Only the label color changes: --clickable-onlyText-color at rest, --hover-onlyText-color on hover, --current-onlyText-color when it is current (aria-current="page" or aria-selected="true") and --twoState-onlyText-color when checked (with btnTwoState). It has no padding on the sides (--button-paddingInline: 0px), so the button is exactly as wide as the label.
- `btnNotHover`: the button does not answer the pointer, so it keeps its look on hover; a button that is a container for something else, such as a search form or a step dot, takes it.
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

- `row`: lays the three two-state buttons of the checked example side by side.
- `wrap`: lets that row break instead of overflowing.
- `gapParagraphs`: spaces the three two-state buttons of the checked example.
- `icon-arrowRight`: the glyph that points forward, from the myIcons pack the demo loads: it is not one of the glyphs mypgs carries.
- `icon-chevronDown`: the glyph after the label of the button with an icon on each side.
- `icon-star`: the neutral stand-in glyph, used where the example needs an icon but not a particular one.

## CSS Variables

- `--button-background`
- `--button-background-current`
- `--button-background-hover`
- `--button-background-twoState`
- `--button-borderColor`
- `--button-borderColor-current`
- `--button-borderColor-hover`
- `--button-borderColor-twoState`
- `--button-borderRadius`
- `--button-borderStyle`
- `--button-borderWidth`
- `--button-color`
- `--button-color-current`
- `--button-color-hover`
- `--button-color-twoState`
- `--button-fontSize`
- `--button-gap`
- `--button-height`
- `--button-paddingBlock`
- `--button-paddingInline`
- `--button-paddingInline-short`
- `--button-shadow`
- `--button-shadow-current`
- `--button-shadow-hover`
- `--button-shadow-twoState`
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

The icon is written after the label, and btnReverse moves the short padding to that side.

```html
<button pgs="button['btnReverse']" type="button">
    Next
    <i pgs="icon['icon-arrowRight']" aria-hidden="true"></i>
</button>
```

### Icon on each side

A glyph before the label and a chevron after it, with the short padding on both sides using btnIconBoth.

```html
<button pgs="button['btnIconBoth']" type="button">
    <i pgs="icon['icon-star']" aria-hidden="true"></i>
    Change customer
    <i pgs="icon['icon-chevronDown']" aria-hidden="true"></i>
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

Only the label shows at rest and it fills like any other button on hover; strong and aria-current still fill in.

```html
<button pgs="button['btnTransparent']" type="button">
    Read more
</button>
```

### Current

A button takes the look of the current one, the --button-*-current color, background, border and shadow, as soon as it carries aria-current=&quot;page&quot; (a link) or aria-selected=&quot;true&quot; (a tab). No option: the attribute that tells assistive technology it is the current one draws it too.

```html
<a pgs="button" href="/" aria-current="page">Current page</a>
<a pgs="button" href="/other">Another page</a>
```

### Text only

Only the label, with no background, border or side padding in any state: its color follows --clickable-onlyText-color at rest and --hover-onlyText-color on hover.

```html
<button pgs="button['btnText']" type="button">
    Text only
</button>
```

### Without hover

btnNotHover keeps the button still while the pointer is over it.

```html
<button pgs="button['btnNotHover']" type="button">
    No hover
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

A label marked as a button wrapping its own checkbox or radio: the input carries the semantics and the keyboard behavior, the button draws the state. Retune the checked look with --button-background-twoState, --button-color-twoState and --button-borderColor-twoState (or, for every button at once, --twoState-background, --twoState-color and --twoState-borderColor).

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
