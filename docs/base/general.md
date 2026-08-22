<!-- Automatically generated from reference/html/base/general.html. Edit reference/html/base/general.html and run npm run docs:generate again. -->

# General

Standalone utilities for radius, shadow, cursor, image fitting, hover colour and forced colour scheme.

## PGS

- `border`: draws the shared border, and is what the br* colour utilities recolour.
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

## Related elements

### PGS

- `flexColumn`: stacks the utility groups vertically.
- `flexRow`: arranges the examples in a row.
- `box`: makes each example visible as a surface.
- `brPrimary`: recolours the border with the primary colour; see Colors for the whole br* family.
- `brError`: recolours the border with the error colour.
- `olPrimary`: recolours the outline with the primary colour; see Colors for the whole ol* family.
- `imgCover`: crops the image to fill its box, the counterpart of imgContain.

### PGS Options

- `gapTexts`: spaces the examples inside a group.
- `gapSections`: separates the groups.

## Output

One example per utility, grouped by radius, shadow, interaction, images and colour scheme.

## Example

### Border and outline

The same line drawn two ways: border takes space in the layout, outline sits outside the box and takes none. Pair them with a br* or ol* utility from Colors to recolour them.

```html
<section pgs="flexColumn" pgs-option="gapTexts">
    <div pgs="flexRow" pgs-option="gapTexts">
        <span pgs="box border">border</span>
        <span pgs="box border brPrimary">border + brPrimary</span>
        <span pgs="box border brError">border + brError</span>
        <span pgs="box outline olPrimary">outline + olPrimary</span>
    </div>
</section>
```

### Border radius

Three radius tokens: the standard one, the smaller one used by form controls and the wider one for outer containers.

```html
<section pgs="flexColumn" pgs-option="gapTexts">
    <div pgs="flexRow" pgs-option="gapTexts">
        <span pgs="box border borderRadius">borderRadius</span>
        <span pgs="box border borderRadiusInput">borderRadiusInput</span>
        <span pgs="box border borderRadiusExternal">borderRadiusExternal</span>
    </div>
</section>
```

### Shadow

The shared shadow tokens, one for a surface and one for text.

```html
<section pgs="flexColumn" pgs-option="gapTexts">
    <div pgs="flexRow" pgs-option="gapTexts">
        <span pgs="box boxShadow">boxShadow</span>
        <strong pgs="textShadow">textShadow</strong>
    </div>
</section>
```

### Interaction

Pointer cursor on a non-control surface, the shared hover treatment, and a full reset to build a control from scratch.

```html
<section pgs="flexColumn" pgs-option="gapTexts">
    <div pgs="flexRow" pgs-option="gapTexts">
        <span pgs="box pointer">pointer</span>

        <a pgs="box hover" href="#">
            <strong pgs="hover-text">hover + hover-text</strong>
        </a>

        <button pgs="appearanceNone pointer" type="button">appearanceNone</button>
    </div>
</section>
```

### Image fitting

imgContain keeps the whole image inside the box, imgCover crops it to fill the box.

```html
<section pgs="flexColumn" pgs-option="gapTexts">
    <div pgs="flexRow" pgs-option="gapTexts">
        <img pgs="imgContain borderRadius" src="https://placehold.co/600x300?text=imgContain" alt="Contained image" style="width: 220px; height: 140px;">
        <img pgs="imgCover borderRadius" src="https://placehold.co/600x300?text=imgCover" alt="Cropped image" style="width: 220px; height: 140px;">
    </div>
</section>
```

### Forced colour scheme

Pins a subtree to one colour scheme, ignoring the current page theme.

```html
<section pgs="flexColumn" pgs-option="gapTexts">
    <div pgs="flexRow" pgs-option="gapTexts">
        <div pgs="box lightmode">lightmode</div>
        <div pgs="box darkmode">darkmode</div>
    </div>
</section>
```
