<!-- Automatically generated from templates/html/components/button.html. Edit templates/html/components/button.html and run npm run docs:generate again. -->

# Button

Button and action-link variants with sizes, emphasis, and icon-text composition defined by the design system.

## PGS

- `button`: identifies the standard button, which can also be used on anchor elements.
- `buttonStrong`: applies the variant with stronger visual emphasis.
- `buttonIcon`: identifies a compact button composed primarily of an icon.
- `buttonMini`: applies the smallest size variant.
- `buttonBig`: applies the large size variant.

## PGS Options

- `buttonReverse`: reverses the visual order of the text and icon on the button.

## Related elements

- `flexRow`: arranges the button examples in a flexible row.

## Output

HTML collection of the main button variants.

## Example

```html
<div pgs="flexRow">
    <a pgs="button" href="#">
        <i class="fa-duotone fa-solid fa-store"></i>
        About
    </a>

    <button pgs="button" type="button" pgs-option="buttonReverse">
        Next
        <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
    </button>

    <button pgs="buttonStrong" type="button">
        <i class="fa-solid fa-check" aria-hidden="true"></i>
        Submit
    </button>

    <button pgs="buttonIcon" type="button" aria-label="Settings">
        <i class="fa-solid fa-gear" aria-hidden="true"></i>
    </button>

    <button pgs="buttonMini" type="button" aria-label="Information">
        <i class="fa-solid fa-info" aria-hidden="true"></i>
    </button>

    <button pgs="buttonBig" type="button" aria-label="Large button">
        <i class="fa-solid fa-rocket" aria-hidden="true"></i>
        Large button
    </button>
</div>
```
