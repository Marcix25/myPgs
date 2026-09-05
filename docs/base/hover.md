<!-- Automatically generated from reference/html/base/hover.html. Edit reference/html/base/hover.html and run npm run docs:generate again. -->

# Hover

The shared hover treatment for a surface and the text marked inside it, split out from the general-purpose set. Used as the base of every clickable surface (card, box, dropdown trigger) that recolours on hover.

## PGS

- `hover`: enables the shared hover treatment on a surface.
- `hover-text`: recolours this text when the surrounding hover element is hovered.

## Related elements

### PGS

- `box`: makes the example visible as a surface.

## CSS Variables

- `--hover-background`
- `--hover-border`
- `--hover-color`
- `--hover-primaryColor`
- `--hover-shadow-color`

## Output

A surface and its inner text, both recolouring together on hover.

## Example

## Examples

### Hover

Hovering the surface recolours it and the text marked inside it together.

```html
<a pgs="box hover" href="#">
    <strong pgs="hover-text">hover + hover-text</strong>
</a>
```
