<!-- Automatically generated from reference/html/base/hover.html. Edit reference/html/base/hover.html and run npm run docs:generate again. -->

# Hover

The shared hover treatment for a surface and the text marked inside it. It is written once here and nowhere else: the component selectors no longer repeat it, so a surface recolours on hover only while it carries this token. With `bodyHoverAuto` on the page's `<body>`, `pgs.hover` adds it on its own to the surfaces that are clickable by definition, and keeps them in sync when the markup changes: every `button`, and `card` or `box` when they are written as a link (`<a>`). Without `bodyHoverAuto` nothing is marked automatically, and the token is written by hand instead — the only way to opt a surface out then is to simply not write it. `hoverNot` is for a page that does run the automatic marking and wants one surface left out of it. The keyboard focus ring is part of the treatment and arrives with the token, so it too depends on the JavaScript being loaded.

## PGS

- `hover`: enables the shared hover treatment on a surface.
- `hover-text`: recolours this text when the surrounding hover element is hovered.

## PGS Options

- `hoverNot`: opts the surface out of the treatment, whatever component it is. `pgs.hover` leaves it unmarked and the surface stops answering the pointer.

## JavaScript API

- `pgs.hover.init(root)`: marks the clickable surfaces inside the given root, and unmarks the ones that stopped being clickable. It does nothing at all without bodyHoverAuto on the page, whether it runs on its own — at load and on every later change — or is called by hand, directly or through pgs.init(root); with bodyHoverAuto the automatic pass already covers the whole document, so a call is only needed for markup outside it, such as a shadow root.

## Related elements

### PGS

- `box`: makes the example visible as a surface.

### Other

- `bodyHoverAuto`: activates the automatic marking this reference otherwise has to write by hand; see Html and Body.

## CSS Variables

- `--hover-background`
- `--hover-behavior`
- `--hover-border`
- `--hover-color`
- `--hover-primaryColor`
- `--hover-st1-background-delay`
- `--hover-st1-transform-origin`
- `--hover-timing`

## Output

A surface and its inner text, both recolouring together on hover.
## Examples

### Hover

Hovering the surface recolours it and the text marked inside it together. The token is written out here to show it, which is what a page without bodyHoverAuto has to do on every clickable surface; the demo's own page carries bodyHoverAuto, so a link box like this one already receives it at load there.

```html
<a pgs="box hover" href="#">
    <strong pgs="hover-text">hover + hover-text</strong>
</a>
```

### Hover not

The opt-out: on a page with bodyHoverAuto, a surface that would otherwise be marked at load stays inert and keeps the look it has at rest.

```html
<a pgs="box" pgs-option="hoverNot" href="#">
    <strong>box + hoverNot</strong>
</a>
```
