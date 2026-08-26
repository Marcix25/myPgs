<!-- Automatically generated from reference/html/components/button.html. Edit reference/html/components/button.html and run npm run docs:generate again. -->

# Button

Button and action-link variants with sizes, emphasis, and icon-text composition defined by the design system.

## PGS

- `button`: identifies the standard button, which can also be used on anchor elements.

## PGS Options

- `buttonReverse`: reverses the visual order of the text and icon on the button.
- `buttonStrong`: applies the variant with stronger visual emphasis.
- `buttonIcon`: identifies a compact button composed primarily of an icon.
- `buttonMini`: applies the smallest size variant.
- `buttonBig`: applies the large size variant.
- `buttonText`: drops the background and the border at rest, so only the label shows, and colours the label on hover. Unlike buttonTransparent it leaves the other states alone, so the same button still fills in when it carries buttonStrong or aria-current.
- `buttonTransparent`: removes the default background and outline while preserving the button layout and hover behavior.
- `buttonSecondary`: replaces the primary button accent with the secondary color palette.
- `buttonTertiary`: replaces the primary button accent with the tertiary color palette.
- `buttonQuaternary`: replaces the primary button accent with the quaternary color palette.

## Related elements

### PGS

- `flexRow`: arranges the button examples in a flexible row.
- `icon`: draws the glyphs this example shows; see Icon for the whole set.

### PGS Options

- `gapTexts`: spaces the two buttons that share the text-only example.
- `icon-arrowRight`: the glyph that points forward.
- `icon-star`: the neutral stand-in glyph, used where the example needs an icon but not a particular one.

## Output

HTML collection of the main button variants.

## Example

### Link button

Anchor element styled as a standard button, combining an icon with text.

```html
<a pgs="button" href="#">
    <i pgs="icon" pgs-option="icon-star"></i>
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
<button pgs="button" type="button" pgs-option="buttonReverse">
    Next
    <i pgs="icon" pgs-option="icon-arrowRight" aria-hidden="true"></i>
</button>
```

### Strong emphasis

Applies the higher-emphasis buttonStrong variant.

```html
<button pgs="button" pgs-option="buttonStrong" type="button">
    Submit
</button>
```

### Icon only

Compact icon-only button using buttonIcon.

```html
<button pgs="button" pgs-option="buttonIcon" type="button" aria-label="Settings">
    <i pgs="icon" pgs-option="icon-star" aria-hidden="true"></i>
</button>
```

### Mini size

Smallest button size using buttonMini.

```html
<button pgs="button" pgs-option="buttonMini" type="button" aria-label="Information">
    <i pgs="icon" pgs-option="icon-star" aria-hidden="true"></i>
</button>
```

### Large size

Largest button size using buttonBig, combined with an icon.

```html
<button pgs="button" pgs-option="buttonBig" type="button" aria-label="Large button">
    <i pgs="icon" pgs-option="icon-star"></i>
    Large
</button>
```

### Text only

Only the label shows at rest, and it takes the accent colour on hover. The second one carries buttonStrong as well: unlike buttonTransparent, buttonText leaves the other states alone, so an emphasised button still fills in.

```html
<button pgs="button" pgs-option="buttonText" type="button">
    Read more
</button>

<button pgs="button" pgs-option="buttonText buttonStrong" type="button">
    Still filled
</button>
```

### Transparent

Removes the default background and outline while keeping the button layout using buttonTransparent.

```html
<button pgs="button" pgs-option="buttonTransparent" type="button">
    Transparent
</button>
```

### Secondary color

Strong button using the secondary color palette.

```html
<button pgs="button" pgs-option="buttonStrong buttonSecondary" type="button">
    Secondary
</button>
```

### Tertiary color

Strong button using the tertiary color palette.

```html
<button pgs="button" pgs-option="buttonStrong buttonTertiary" type="button">
    Tertiary
</button>
```

### Quaternary color

Strong button using the quaternary color palette.

```html
<button pgs="button" pgs-option="buttonStrong buttonQuaternary" type="button">
    Quaternary
</button>
```
