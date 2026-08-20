<!-- Automatically generated from reference/html/components/button.html. Edit reference/html/components/button.html and run npm run docs:generate again. -->

# Button

Button and action-link variants with sizes, emphasis, and icon-text composition defined by the design system.

## PGS

- `button`: identifies the standard button, which can also be used on anchor elements.
- `icon`: displays a standalone icon inside a circular surface.

## PGS Options

- `buttonReverse`: reverses the visual order of the text and icon on the button.
- `buttonStrong`: applies the variant with stronger visual emphasis.
- `buttonIcon`: identifies a compact button composed primarily of an icon.
- `buttonMini`: applies the smallest size variant.
- `buttonBig`: applies the large size variant.
- `buttonTransparent`: removes the default background and outline while preserving the button layout and hover behavior.
- `buttonSecondary`: replaces the primary button accent with the secondary color palette.
- `buttonTertiary`: replaces the primary button accent with the tertiary color palette.
- `buttonQuaternary`: replaces the primary button accent with the quaternary color palette.

## Related elements

### PGS

- `flexRow`: arranges the button examples in a flexible row.

## Output

HTML collection of the main button variants and the standalone icon surface.

## Example

```html
<div pgs="flexRow">
    <a pgs="button" href="#">
        <i class="fa-duotone fa-solid fa-store"></i>
        About
    </a>

    <button pgs="button" type="button" pgs-option="buttonReverse" disabled>
        Next
        <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
    </button>

    <button pgs="button" pgs-option="buttonStrong" type="button">
        <i class="fa-solid fa-check" aria-hidden="true"></i>
        Submit
    </button>

    <button pgs="button" pgs-option="buttonIcon" type="button" aria-label="Settings">
        <i class="fa-solid fa-gear" aria-hidden="true"></i>
    </button>

    <button pgs="button" pgs-option="buttonMini" type="button" aria-label="Information">
        <i class="fa-solid fa-info" aria-hidden="true"></i>
    </button>

    <button pgs="button" pgs-option="buttonBig" type="button" aria-label="Large button">
        <i class="fa-duotone fa-solid fa-fire"></i>
        Large
    </button>

    <button pgs="button" pgs-option="buttonTransparent" type="button">
        <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
        Transparent
    </button>

    <button pgs="button" pgs-option="buttonStrong buttonSecondary" type="button">
        Secondary
    </button>

    <button pgs="button" pgs-option="buttonStrong buttonTertiary" type="button">
        Tertiary
    </button>

    <button pgs="button" pgs-option="buttonStrong buttonQuaternary" type="button">
        Quaternary
    </button>

    <span pgs="icon" aria-hidden="true">
        <i class="fa-solid fa-star"></i>
    </span>
</div>
```
