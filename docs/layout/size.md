<!-- Automatically generated from reference/html/layout/size.html. Edit reference/html/layout/size.html and run npm run docs:generate again. -->

# Size

Width and height utilities driven by a single custom property each. The width side wraps every value in min() against the container, because an element that is too wide breaks the page with a horizontal scrollbar; the height side does not, because an element that is too tall just scrolls, which is what a page does anyway. The scales differ for the same reason: widths come off the page, heights off the viewport, the only measure a block can be tall against without a parent that already has a height. Set --size-width or --size-height inline for an arbitrary value, or pick one of the scales.

## PGS

- `width`: sets the element width to --size-width, or to the container when that is narrower.
- `widthMax`: caps the element at --size-width while it keeps its own natural width below it.
- `widthMin`: keeps the element at least --size-width wide, unless the container itself is narrower.
- `height`: sets the element height to --size-height.
- `heightMax`: caps the element at --size-height, and needs an overflow utility next to it or the content spills out.
- `heightMin`: keeps the element at least --size-height tall, and lets it grow past that with its content.

## PGS Options

- `widthPage`: uses the page width and is the default for every width utility.
- `widthPageHalf`: uses half the page width, for two columns that line up with the page content.
- `widthPageThird`: uses a third of the page width.
- `widthText`: uses a 65 character measure, the width a line of text stays readable at, independent of the page width.
- `widthFull`: uses the whole container width.
- `heightScreen`: uses the small viewport height, the screen with the browser toolbars expanded, and is the default for every height utility. The element never grows past the screen as the toolbars retract.
- `heightScreenLive`: uses the dynamic viewport height, which follows the visible area as the toolbars come and go, at the cost of resizing during the scroll.
- `heightScreenLarge`: uses the large viewport height, the screen with the toolbars retracted, for something meant to run under them.
- `heightScreenHalf`: uses half the small viewport height.
- `heightUnderHeader`: uses what is left of the screen below the header, for a hero that fills the first view.
- `heightFull`: uses the whole parent height, and only resolves when the parent has a definite height of its own.
- `heightAuto`: drops the height constraint on one element without dropping the utility.

## Related elements

### PGS

- `flexColumn`: arranges the groups vertically.
- `flexRow`: places the column and viewport examples side by side.
- `box`: makes the measured elements visible.
- `overflowAuto`: scrolls the content a heightMax element cannot show.
- `marginInline`: pairs with marginAuto to centre a constrained element.

### PGS Options

- `gapTexts`: separates the examples inside a group.
- `gapElements`: separates the side by side examples.
- `marginAuto`: centres an element once its width is constrained.
- `flexCenter`: centres the label inside each measured block.

### Other

- `gapSections`: separates the groups.

## CSS Variables

- `--size-height`
- `--size-width`

## Output

Width and height examples using the shared scales and arbitrary inline values.

## Example

## Width

### Width scales

The width scales come off the page, so a constrained element lines up with the page content. The option chooses the value, the pgs token chooses the property it lands on.

```html
<strong>Width scales</strong>
<p pgs="box width" pgs-option="widthPage">Page width.</p>
<p pgs="box width" pgs-option="widthPageHalf">Half the page width.</p>
<p pgs="box width" pgs-option="widthPageThird">A third of the page width.</p>
<p pgs="box width" pgs-option="widthText">A 65 character measure, the width a line of text stays readable at.</p>
<p pgs="box width" pgs-option="widthFull">The whole container width.</p>
```

### Arbitrary width

Without an option the value comes from --size-width, which can be set inline, from a theme or from any enclosing rule. Every value stays capped at the container.

```html
<strong>Arbitrary width</strong>
<p pgs="box width" style="--size-width: 600px">Six hundred pixels, capped at the container.</p>
<p pgs="box widthMin" style="--size-width: 400px">At least four hundred pixels.</p>
<p pgs="box widthMax marginInline" pgs-option="marginAuto" style="--size-width: 500px">Capped at five hundred pixels and centred.</p>
```

### Two columns

Half the page width on each side of a row, so the text keeps the page rhythm while the row bleeds past the edge.

```html
<p pgs="box widthMax" pgs-option="widthPageHalf">Text held at half the page width, so it stays aligned with the page content.</p>
<p pgs="box widthMax" pgs-option="widthPageHalf">The second column takes the same ceiling.</p>
```

## Height

### Viewport scales

Each scale is a different reading of what the screen is: svh with the browser toolbars expanded, lvh with them retracted, dvh following them as they move.

```html
<div pgs="box heightMin flexColumn" pgs-option="heightScreenHalf flexCenter">Half the screen.</div>
<div pgs="box heightMin flexColumn" pgs-option="heightUnderHeader flexCenter">What is left below the header.</div>
```

### Floor and ceiling

heightMin is the usual one for a section, because the element still grows with its content. heightMax needs an overflow utility next to it.

```html
<strong>Floor and ceiling</strong>
<div pgs="box heightMin" style="--size-height: 120px">At least a hundred and twenty pixels tall, and taller if the content asks for it.</div>
<div pgs="box heightMax overflowAuto" style="--size-height: 80px">Capped at eighty pixels, with the rest of the content reachable by scrolling. A ceiling without an overflow utility would simply let this text spill out of the box, because the element stops growing but the content does not.</div>
<div pgs="box height" style="--size-height: 60px">Exactly sixty pixels.</div>
```

### Dropping the constraint

heightAuto removes the limit on a single element while the utility stays in place, so a rule that sets --size-height higher up is not fought with a second one.

```html
<strong>Dropping the constraint</strong>
<div pgs="box heightMin" pgs-option="heightAuto">No floor at all.</div>
```
