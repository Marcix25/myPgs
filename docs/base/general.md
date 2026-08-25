<!-- Automatically generated from reference/html/base/general.html. Edit reference/html/base/general.html and run npm run docs:generate again. -->

# General

Standalone utilities for radius, shadow, cursor, image fitting, hover colour and forced colour scheme.

## PGS

- `border`: draws the shared border on every side, and is what the br* colour utilities recolour.
- `borderTop`: draws it above only.
- `borderRight`: draws it on the right only.
- `borderBottom`: draws it below only.
- `borderLeft`: draws it on the left only.
- `borderInline`: draws it on both sides of the inline axis.
- `borderBlock`: draws it on both sides of the block axis.
- `outline`: draws the same line outside the box, taking no space in the layout; the ol* colour utilities recolour it.
- `borderRadius`: applies the standard radius token to any surface.
- `borderRadiusInput`: applies the smaller radius used by form controls.
- `borderRadiusExternal`: applies the wider radius used by outer containers.
- `boxShadow`: applies the shared box shadow token.
- `textShadow`: applies the shared text shadow token.
- `pointer`: shows the pointer cursor on an element that is clickable but is not a control.
- `appearanceNone`: strips every inherited style and the native appearance, to build a control from scratch.
- `imgContain`: fits the whole image inside its box without cropping it.
- `hover`: enables the shared hover treatment on a surface and on the text marked inside it.
- `hover-text`: recolours this text when the surrounding hover element is hovered.
- `lightmode`: forces the light colour scheme on a subtree, whatever the page theme is.
- `darkmode`: forces the dark colour scheme on a subtree, whatever the page theme is.

## PGS Options

- `borderThin`: draws the border at 1px instead of the default 1.5px.
- `borderThick`: draws the border at 3px.
- `borderThicker`: draws the border at 4.5px.
- `outlineThin`: draws the outline at 1px instead of the default 1.5px.
- `outlineThick`: draws the outline at 3px.
- `outlineThicker`: draws the outline at 4.5px.

## Related elements

### PGS

- `flexColumn`: stacks the utility groups vertically.
- `flexRow`: arranges the examples in a row.
- `box`: makes each example visible as a surface.
- `bgWhiteFixed`: holds the same light background whatever the page theme is, so the two forced schemes read against one ground.
- `brPrimary`: recolours the border with the primary colour; see Colors for the whole br* family.
- `brError`: recolours the border with the error colour.
- `olPrimary`: recolours the outline with the primary colour; see Colors for the whole ol* family.
- `olError`: recolours the outline with the error colour.
- `imgCover`: crops the image to fill its box, the counterpart of imgContain.

### PGS Options

- `wrap`: lets the border and outline examples flow onto a second row.
- `gapTexts`: spaces the examples inside a group.
- `gapSections`: separates the groups.

## Output

One example per utility, grouped by radius, shadow, interaction, images and colour scheme.

## Example

### Border

A line drawn on the edge of the box, taking its space in the layout. It comes one side at a time as well, named like the margin and padding utilities. Recolour it with a br* utility from Colors, and change its weight with a thickness option.

```html
<div pgs="flexRow" pgs-option="gapTexts wrap">
    <span pgs="box border">border</span>
    <span pgs="box border brPrimary">border + brPrimary</span>
    <span pgs="box border brError">border + brError</span>
</div>

<div pgs="flexRow" pgs-option="gapTexts wrap">
    <span pgs="box border" pgs-option="borderThin">borderThin</span>
    <span pgs="box border" pgs-option="borderThick">borderThick</span>
    <span pgs="box border" pgs-option="borderThicker">borderThicker</span>
</div>

<div pgs="flexRow" pgs-option="gapTexts wrap">
    <span pgs="box borderTop brPrimary">borderTop</span>
    <span pgs="box borderRight brPrimary">borderRight</span>
    <span pgs="box borderBottom brPrimary">borderBottom</span>
    <span pgs="box borderLeft brPrimary">borderLeft</span>
    <span pgs="box borderInline brPrimary">borderInline</span>
    <span pgs="box borderBlock brPrimary">borderBlock</span>
</div>
```

### Outline

The same line drawn outside the box, so it takes no space and never moves what sits around it. CSS draws it as a single ring, which is why there is no per-side form. It has its own colour utilities, ol*, and its own thickness options: an element carrying both a border and an outline needs one from each family.

```html
<div pgs="flexRow" pgs-option="gapTexts wrap">
    <span pgs="box outline">outline</span>
    <span pgs="box outline olPrimary">outline + olPrimary</span>
    <span pgs="box outline olError">outline + olError</span>
</div>

<div pgs="flexRow" pgs-option="gapTexts wrap">
    <span pgs="box outline" pgs-option="outlineThin">outlineThin</span>
    <span pgs="box outline" pgs-option="outlineThick">outlineThick</span>
    <span pgs="box outline" pgs-option="outlineThicker">outlineThicker</span>
</div>
```

### Border radius

Three radius tokens: the standard one, the smaller one used by form controls and the wider one for outer containers.

```html
<div pgs="flexRow" pgs-option="gapTexts">
    <span pgs="box border borderRadius">borderRadius</span>
    <span pgs="box border borderRadiusInput">borderRadiusInput</span>
    <span pgs="box border borderRadiusExternal">borderRadiusExternal</span>
</div>
```

### Shadow

The shared shadow tokens, one for a surface and one for text.

```html
<div pgs="flexRow" pgs-option="gapTexts">
    <span pgs="box boxShadow">boxShadow</span>
    <strong pgs="textShadow">textShadow</strong>
</div>
```

### Interaction

Pointer cursor on a non-control surface, the shared hover treatment, and a full reset to build a control from scratch.

```html
<div pgs="flexRow" pgs-option="gapTexts">
    <span pgs="box pointer">pointer</span>

    <a pgs="box hover" href="#">
        <strong pgs="hover-text">hover + hover-text</strong>
    </a>

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
