<!-- Automatically generated from reference/html/layout/size.html. Edit reference/html/layout/size.html and run npm run docs:generate again. -->

# Size

Width and height utilities, each driven by its own custom property: --width-size for width, --widthMax-size for widthMax, and so on, so combining two of them on the same element (a floor and a ceiling, say) never fights over a shared one. The width side wraps every value in min() against the container, because an element that is too wide breaks the page with a horizontal scrollbar; the height side does not, because an element that is too tall just scrolls, which is what a page does anyway. The scales differ for the same reason: widths come off the page, heights off the viewport, the only measure a block can be tall against without a parent that already has a height. Set a utility's own -size property inline for an arbitrary value, or pick one of the scales.

## PGS

- `width`: sets the element width to --width-size, or to the container when that is narrower.
- `widthMax`: caps the element at --widthMax-size while it keeps its own natural width below it.
- `widthMin`: keeps the element at least --widthMin-size wide, unless the container itself is narrower.
- `height`: sets the element height to --height-size.
- `heightMax`: caps the element at --heightMax-size, and needs an overflow utility next to it or the content spills out.
- `heightMin`: keeps the element at least --heightMin-size tall, and lets it grow past that with its content.

## PGS Options (component brackets)

- `widthPage`: inside width's own bracket, uses the page width and is the default for every width utility.
- `widthPageHalf`: inside width's own bracket, uses half the page width, for two columns that line up with the page content.
- `widthPageThird`: inside width's own bracket, uses a third of the page width.
- `widthText`: inside width's own bracket, uses a 65 character measure, the width a line of text stays readable at, independent of the page width.
- `widthFull`: inside width's own bracket, uses the whole container width.
- `widthFillAvailable`: inside width's own bracket, uses -webkit-fill-available, the space actually left after margins and padding on iOS Safari, where percentages and viewport units miscompute against the address bar. Unsupported outside Chromium/Safari, where the invalid value is dropped and the element falls back to whichever other option, or its own -size property, it also carries.
- `widthMaxPage`: inside widthMax's own bracket, the same page width scale as widthPage, capping instead of setting.
- `widthMaxPageHalf`: inside widthMax's own bracket, the same half-page scale as widthPageHalf.
- `widthMaxPageThird`: inside widthMax's own bracket, the same third-page scale as widthPageThird.
- `widthMaxText`: inside widthMax's own bracket, the same 65 character measure as widthText.
- `widthMaxFull`: inside widthMax's own bracket, the same whole container width as widthFull.
- `widthMaxFillAvailable`: inside widthMax's own bracket, the same -webkit-fill-available as widthFillAvailable.
- `widthMinPage`: inside widthMin's own bracket, the same page width scale as widthPage, flooring instead of setting.
- `widthMinPageHalf`: inside widthMin's own bracket, the same half-page scale as widthPageHalf.
- `widthMinPageThird`: inside widthMin's own bracket, the same third-page scale as widthPageThird.
- `widthMinText`: inside widthMin's own bracket, the same 65 character measure as widthText.
- `widthMinFull`: inside widthMin's own bracket, the same whole container width as widthFull.
- `widthMinFillAvailable`: inside widthMin's own bracket, the same -webkit-fill-available as widthFillAvailable.
- `heightFull`: inside height's own bracket, uses the whole parent height, which only resolves when the parent has a definite height of its own.
- `heightScreen`: inside height's own bracket, uses the small viewport height, the screen with the browser toolbars expanded, and is the default for every height utility. The element never grows past the screen as the toolbars retract.
- `heightScreenLive`: inside height's own bracket, uses the dynamic viewport height, which follows the visible area as the toolbars come and go, at the cost of resizing during the scroll.
- `heightScreenLarge`: inside height's own bracket, uses the large viewport height, the screen with the toolbars retracted, for something meant to run under them.
- `heightScreenHalf`: inside height's own bracket, uses half the small viewport height.
- `heightUnderHeader`: inside height's own bracket, uses what is left of the screen below the header, for a hero that fills the first view.
- `heightUnderMain`: inside height's own bracket, the same idea for an element that is the first child of main instead, subtracting --main-padding-top rather than just the header height, since main already carries the extra room --page-top adds.
- `heightAuto`: inside height's own bracket, drops the height constraint on one element without dropping the utility.
- `heightMaxFull`: inside heightMax's own bracket, the same whole parent height as heightFull.
- `heightMaxScreen`: inside heightMax's own bracket, the same small viewport height as heightScreen, and the default for heightMax.
- `heightMaxScreenLive`: inside heightMax's own bracket, the same dynamic viewport height as heightScreenLive.
- `heightMaxScreenLarge`: inside heightMax's own bracket, the same large viewport height as heightScreenLarge.
- `heightMaxScreenHalf`: inside heightMax's own bracket, the same half viewport height as heightScreenHalf.
- `heightMaxUnderHeader`: inside heightMax's own bracket, the same header-relative height as heightUnderHeader.
- `heightMaxUnderMain`: inside heightMax's own bracket, the same main-relative height as heightUnderMain.
- `heightMaxAuto`: inside heightMax's own bracket, drops the ceiling on one element without dropping the utility.
- `heightMinFull`: inside heightMin's own bracket, the same whole parent height as heightFull.
- `heightMinScreen`: inside heightMin's own bracket, the same small viewport height as heightScreen, and the default for heightMin.
- `heightMinScreenLive`: inside heightMin's own bracket, the same dynamic viewport height as heightScreenLive.
- `heightMinScreenLarge`: inside heightMin's own bracket, the same large viewport height as heightScreenLarge.
- `heightMinScreenHalf`: inside heightMin's own bracket, the same half viewport height as heightScreenHalf.
- `heightMinUnderHeader`: inside heightMin's own bracket, the same header-relative height as heightUnderHeader.
- `heightMinUnderMain`: inside heightMin's own bracket, the same main-relative height as heightUnderMain.
- `heightMinAuto`: inside heightMin's own bracket, drops the floor on one element without dropping the utility.

## Related elements

### PGS

- `flex`: provides the flex layout; direction and spacing are flags in its bracket.
- `main`: sets --main-padding-top, which underMain subtracts from the viewport height.
- `box`: makes the measured elements visible.
- `overflow`: scrolls the content a heightMax element cannot show.
- `margin`: provides the spacing utility used here.

### PGS Options (component brackets)

- `column`: arranges the groups vertically.
- `row`: places the column and viewport examples side by side.
- `ovAuto`: inside overflow's own bracket, adds scrolling only when content overflows.
- `mrgInlineAuto`: inside margin's own bracket, pairs with auto to centre a constrained element.
- `gapTexts`: separates the examples inside a group.
- `gapElements`: separates the side by side examples.
- `flexCenter`: centres the label inside each measured block.

### Other

- `gapSections`: separates the groups.

## Output

Width and height examples using the shared scales and arbitrary inline values.
## Width

### Width scales

The width scales come off the page, so a constrained element lines up with the page content. The option chooses the value, the pgs token chooses the property it lands on.

```html
<strong>Width scales</strong>
<p pgs="box width['widthPage']">Page width.</p>
<p pgs="box width['widthPageHalf']">Half the page width.</p>
<p pgs="box width['widthPageThird']">A third of the page width.</p>
<p pgs="box width['widthText']">A 65 character measure, the width a line of text stays readable at.</p>
<p pgs="box width['widthFull']">The whole container width.</p>
<p pgs="box width['widthFillAvailable']">-webkit-fill-available, Chromium/Safari only.</p>
```

### Arbitrary width

Without an option the value comes from the utility's own -size property (--width-size, --widthMin-size, --widthMax-size), which can be set inline, from a theme or from any enclosing rule. Every value stays capped at the container.

```html
<strong>Arbitrary width</strong>
<p pgs="box width" style="--width-size: 600px">Six hundred pixels, capped at the container.</p>
<p pgs="box widthMin" style="--widthMin-size: 400px">At least four hundred pixels.</p>
<p pgs="box widthMax margin['mrgInlineAuto']" style="--widthMax-size: 500px">Capped at five hundred pixels and centred.</p>
```

### Two columns

Half the page width on each side of a row, so the text keeps the page rhythm while the row bleeds past the edge.

```html
<p pgs="box widthMax['widthMaxPageHalf']">Text held at half the page width, so it stays aligned with the page content.</p>
<p pgs="box widthMax['widthMaxPageHalf']">The second column takes the same ceiling.</p>
```

## Height

### Viewport scales

Each scale is a different reading of what the screen is: svh with the browser toolbars expanded, lvh with them retracted, dvh following them as they move.

```html
<div pgs="box heightMin['heightMinScreenHalf'] flex['column' 'flexCenter']">Half the screen.</div>
<div pgs="box heightMin['heightMinUnderHeader'] flex['column' 'flexCenter']">What is left below the header.</div>
```

### First element inside main

underMain excludes main's own top padding (--main-padding-top) instead of just the header height, for an element that is the first child of main and still wants to fill the rest of the screen. A plain div carrying the main token here, so the page keeps its own single real &lt;main&gt;.

```html
<div pgs="main">
    <div pgs="box heightMin['heightMinUnderMain'] flex['column' 'flexCenter']">First element inside main.</div>
</div>
```

### Floor and ceiling

heightMin is the usual one for a section, because the element still grows with its content. heightMax needs an overflow utility next to it.

```html
<strong>Floor and ceiling</strong>
<div pgs="box heightMin" style="--heightMin-size: 120px">At least a hundred and twenty pixels tall, and taller if the content asks for it.</div>
<div pgs="box heightMax overflow['ovAuto']" style="--heightMax-size: 80px">Capped at eighty pixels, with the rest of the content reachable by scrolling. A ceiling without an overflow utility would simply let this text spill out of the box, because the element stops growing but the content does not.</div>
<div pgs="box height" style="--height-size: 60px">Exactly sixty pixels.</div>
```

### Dropping the constraint

auto removes the limit on a single element while the utility stays in place, so a rule that sets --heightMin-size higher up is not fought with a second one.

```html
<strong>Dropping the constraint</strong>
<div pgs="box heightMin['heightMinAuto']">No floor at all.</div>
```
