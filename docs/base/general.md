<!-- Automatically generated from reference/html/base/general.html. Edit reference/html/base/general.html and run npm run docs:generate again. -->

# General

Standalone utilities for shadow, cursor, image fitting and forced colour scheme. Border, outline and radius utilities moved to their own reference, Border; the hover treatment moved to Hover.

## PGS

- `boxShadow`: applies the shared box shadow token.
- `textShadow`: applies the shared text shadow token.
- `pointer`: shows the pointer cursor on an element that is clickable but is not a control.
- `appearanceNone`: strips every inherited style and the native appearance, to build a control from scratch.
- `imgContain`: fits the whole image inside its box without cropping it.
- `lightmode`: forces the light colour scheme on a subtree, whatever the page theme is.
- `darkmode`: forces the dark colour scheme on a subtree, whatever the page theme is.

## Related elements

### PGS

- `flexColumn`: stacks the utility groups vertically.
- `flexRow`: arranges the examples in a row.
- `box`: makes each example visible as a surface.
- `bgWhiteFixed`: holds the same light background whatever the page theme is, so the two forced schemes read against one ground.
- `imgCover`: crops the image to fill its box, the counterpart of imgContain.
- `borderRadius`: rounds the image fitting examples; see Border for the whole family.

### PGS Options

- `gapTexts`: spaces the examples inside a group.
- `gapSections`: separates the groups.

## Output

One example per utility, grouped by shadow, interaction, images and colour scheme.

## Example

### Shadow

The shared shadow tokens, one for a surface and one for text.

```html
<div pgs="flexRow" pgs-option="gapTexts">
    <span pgs="box boxShadow">boxShadow</span>
    <strong pgs="textShadow">textShadow</strong>
</div>
```

### Interaction

Pointer cursor on a non-control surface, and a full reset to build a control from scratch.

```html
<div pgs="flexRow" pgs-option="gapTexts">
    <span pgs="box pointer">pointer</span>
    <button pgs="appearanceNone pointer" type="button">appearanceNone</button>
</div>
```

### Image fitting

imgContain keeps the whole image inside the box, imgCover crops it to fill the box.

```html
<div pgs="flexRow" pgs-option="gapTexts">
    <img pgs="imgContain borderRadius" src="https://placehold.co/600x300?text=imgContain" alt="Contained image" style="width: 220px; height: 140px;">
    <img pgs="imgCover borderRadius" src="https://placehold.co/600x300?text=imgCover" alt="Cropped image" style="width: 220px; height: 140px;">
</div>
```

### Forced colour scheme

Pins a subtree to one colour scheme, ignoring the current page theme.

```html
<div pgs="flexRow bgWhiteFixed" pgs-option="gapTexts">
    <div pgs="box lightmode">
        <p>lightmode</p>
    </div>
    <div pgs="box darkmode">
        <p>darkmode</p>
    </div>
</div>
```
