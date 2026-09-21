<!-- Automatically generated from reference/html/base/general.html. Edit reference/html/base/general.html and run npm run docs:generate again. -->

# General

Standalone utilities for shadow, cursor, image fitting, list styling and forced colour scheme. Border, outline and radius utilities moved to their own reference, Border; the hover treatment moved to Hover.

## PGS

- `boxShadow`: applies the shared box shadow token.
- `textShadow`: applies the shared text shadow token.
- `pointer`: shows the pointer cursor on an element that is clickable but is not a control.
- `appearanceNone`: strips every inherited style and the native appearance, to build a control from scratch.
- `img`: fits or crops an image depending on the option in its bracket; written bare it does nothing.
- `list`: styles a plain ul or ol with the shared marker and spacing.
- `lightmode`: forces the light colour scheme on a subtree, whatever the page theme is.
- `darkmode`: forces the dark colour scheme on a subtree, whatever the page theme is.

## PGS Options (component brackets)

- `contain`: inside img's own bracket, fits the whole image inside its box without cropping it.
- `cover`: inside img's own bracket, crops the image to fill its box, the counterpart of contain.

## Related elements

### PGS

- `flex`: provides the flex layout; direction and spacing are flags in its bracket.
- `box`: makes each example visible as a surface.
- `bgWhiteFixed`: holds the same light background whatever the page theme is, so the two forced schemes read against one ground.
- `borderRadius`: rounds the image fitting examples; see Border for the whole family.

### PGS Options (component brackets)

- `column`: stacks the utility groups vertically.
- `row`: arranges the examples in a row.
- `gapTexts`: spaces the examples inside a group.

### Other

- `gapSections`: separates the groups.

## Output

One example per utility, grouped by shadow, interaction, images, lists and colour scheme.
## Examples

### Shadow

The shared shadow tokens, one for a surface and one for text.

```html
<span pgs="box boxShadow">boxShadow</span>
<strong pgs="textShadow">textShadow</strong>
```

### Interaction

Pointer cursor on a non-control surface, and a full reset to build a control from scratch.

```html
<span pgs="box pointer">pointer</span>
<button pgs="appearanceNone pointer" type="button">appearanceNone</button>
```

### Image fitting

img['contain'] keeps the whole image inside the box, img['cover'] crops it to fill the box.

```html
<img pgs="img['contain'] borderRadius" src="../assets/img/placeholder.jpg" alt="Contained image" style="width: 220px; height: 140px;">
<img pgs="img['cover'] borderRadius" src="../assets/img/placeholder.jpg" alt="Cropped image" style="width: 220px; height: 140px;">
```

### List

Shared marker and spacing for a plain list, without any component behaviour.

```html
<ul pgs="list">
    <li>Plain list item</li>
    <li>Second item</li>
    <li>Third item</li>
</ul>
```

### Forced colour scheme

Pins a subtree to one colour scheme, ignoring the current page theme.

```html
<div pgs="flex['row' 'gapTexts'] bgWhiteFixed">
    <div pgs="box lightmode">
        <p>lightmode</p>
    </div>
    <div pgs="box darkmode">
        <p>darkmode</p>
    </div>
</div>
```
