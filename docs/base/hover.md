<!-- Automatically generated from reference/html/base/hover.html. Edit reference/html/base/hover.html and run npm run docs:generate again. -->

# Hover

The shared hover treatment for a surface and the text marked inside it. It is written once here and nowhere else: the component selectors no longer repeat it, so a surface recolours on hover only while it carries this token. On load `pgs.hover` adds it on its own to the surfaces that are clickable by definition, and keeps them in sync when the markup changes: every `button`, and `card` or `box` when they are written as a link (`<a>`). Write it by hand on any other surface, and write `hoverNot` on a surface that must not react at all. The focus ring stays in CSS on button, card and box, so a keyboard user still sees it without the JavaScript.

## PGS

- `hover`: enables the shared hover treatment on a surface.
- `hover-text`: recolours this text when the surrounding hover element is hovered.

## PGS Options

- `hoverNot`: opts the surface out of the treatment, whatever component it is. `pgs.hover` leaves it unmarked and the surface stops answering the pointer.

## Related elements

### PGS

- `box`: makes the example visible as a surface.

## CSS Variables

- `--hover-background`
- `--hover-border`
- `--hover-color`
- `--hover-primaryColor`

## Output

A surface and its inner text, both recolouring together on hover.

## Example

## Examples

### Hover

Hovering the surface recolours it and the text marked inside it together. The token is written out here to show it: a link box already receives it at load.

```html
<a pgs="box hover" href="#">
    <strong pgs="hover-text">hover + hover-text</strong>
</a>
```

### Hover not

The opt-out: a surface that would be marked at load stays inert, and keeps the look it has at rest.

```html
<a pgs="box" pgs-option="hoverNot" href="#">
    <strong>box + hoverNot</strong>
</a>
```
