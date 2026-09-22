<!-- Automatically generated from reference/html/layout/spacing.html. Edit reference/html/layout/spacing.html and run npm run docs:generate again. -->

# Spacing

Margin and padding utilities based on the shared MyPGS spacing scales. One root each — margin, padding — with every direction and scale folded into the option name (mrgLeftTexts, padBlockPage, ...) instead of a separate root per direction, so two of them can combine in the same bracket in any order. The gap utilities live in Responsive instead, because they only take effect on a flex or grid container.

## PGS

- `margin`: applies configurable spacing, on every side by default, or on one direction with the option in its bracket.
- `padding`: applies configurable inner spacing, on every side by default, or on one direction with the option in its bracket.

## PGS Options (component brackets)

- `mrgHalf`: inside margin's own bracket, the double padding token, on every side.
- `mrgTexts`: inside margin's own bracket, the text spacing scale, on every side; also the default with no option at all.
- `mrgElements`: inside margin's own bracket, the element spacing scale, on every side.
- `mrgSections`: inside margin's own bracket, the section spacing scale, on every side.
- `mrgPage`: inside margin's own bracket, the page padding token, on every side.
- `mrgAuto`: inside margin's own bracket, auto on every side, to centre an element or push it away.
- `mrgUnset`: inside margin's own bracket, resets every side to its initial value.
- `mrgNegative`: inside margin's own bracket, negates whatever margin value is combined with it in the same bracket — the default padding on its own, or any direction/scale flag paired with it, since the sign is a single shared property read by every branch.
- `mrgLeft`: inside margin's own bracket, the text spacing scale on the left only, the same default as bare margin.
- `mrgLeftHalf`: inside margin's own bracket, the double padding token on the left only.
- `mrgLeftTexts`: inside margin's own bracket, the text spacing scale on the left only.
- `mrgLeftElements`: inside margin's own bracket, the element spacing scale on the left only.
- `mrgLeftSections`: inside margin's own bracket, the section spacing scale on the left only.
- `mrgLeftPage`: inside margin's own bracket, the page padding token on the left only.
- `mrgLeftAuto`: inside margin's own bracket, auto on the left only.
- `mrgLeftUnset`: inside margin's own bracket, unset on the left only.
- `mrgRight`: inside margin's own bracket, the text spacing scale on the right only, the same default as bare margin.
- `mrgRightHalf`: inside margin's own bracket, the double padding token on the right only.
- `mrgRightTexts`: inside margin's own bracket, the text spacing scale on the right only.
- `mrgRightElements`: inside margin's own bracket, the element spacing scale on the right only.
- `mrgRightSections`: inside margin's own bracket, the section spacing scale on the right only.
- `mrgRightPage`: inside margin's own bracket, the page padding token on the right only.
- `mrgRightAuto`: inside margin's own bracket, auto on the right only.
- `mrgRightUnset`: inside margin's own bracket, unset on the right only.
- `mrgTop`: inside margin's own bracket, the text spacing scale on the top only, the same default as bare margin.
- `mrgTopHalf`: inside margin's own bracket, the double padding token on the top only.
- `mrgTopTexts`: inside margin's own bracket, the text spacing scale on the top only.
- `mrgTopElements`: inside margin's own bracket, the element spacing scale on the top only.
- `mrgTopSections`: inside margin's own bracket, the section spacing scale on the top only.
- `mrgTopPage`: inside margin's own bracket, the page padding token on the top only.
- `mrgTopAuto`: inside margin's own bracket, auto on the top only.
- `mrgTopUnset`: inside margin's own bracket, unset on the top only.
- `mrgBottom`: inside margin's own bracket, the text spacing scale on the bottom only, the same default as bare margin.
- `mrgBottomHalf`: inside margin's own bracket, the double padding token on the bottom only.
- `mrgBottomTexts`: inside margin's own bracket, the text spacing scale on the bottom only.
- `mrgBottomElements`: inside margin's own bracket, the element spacing scale on the bottom only.
- `mrgBottomSections`: inside margin's own bracket, the section spacing scale on the bottom only.
- `mrgBottomPage`: inside margin's own bracket, the page padding token on the bottom only.
- `mrgBottomAuto`: inside margin's own bracket, auto on the bottom only.
- `mrgBottomUnset`: inside margin's own bracket, unset on the bottom only.
- `mrgInline`: inside margin's own bracket, the text spacing scale on the inline axis only, the same default as bare margin.
- `mrgInlineHalf`: inside margin's own bracket, the double padding token on the inline axis only.
- `mrgInlineTexts`: inside margin's own bracket, the text spacing scale on the inline axis only.
- `mrgInlineElements`: inside margin's own bracket, the element spacing scale on the inline axis only.
- `mrgInlineSections`: inside margin's own bracket, the section spacing scale on the inline axis only.
- `mrgInlinePage`: inside margin's own bracket, the page padding token on the inline axis only.
- `mrgInlineAuto`: inside margin's own bracket, auto on the inline axis only.
- `mrgInlineUnset`: inside margin's own bracket, unset on the inline axis only.
- `mrgBlock`: inside margin's own bracket, the text spacing scale on the block axis only, the same default as bare margin.
- `mrgBlockHalf`: inside margin's own bracket, the double padding token on the block axis only.
- `mrgBlockTexts`: inside margin's own bracket, the text spacing scale on the block axis only.
- `mrgBlockElements`: inside margin's own bracket, the element spacing scale on the block axis only.
- `mrgBlockSections`: inside margin's own bracket, the section spacing scale on the block axis only.
- `mrgBlockPage`: inside margin's own bracket, the page padding token on the block axis only.
- `mrgBlockAuto`: inside margin's own bracket, auto on the block axis only.
- `mrgBlockUnset`: inside margin's own bracket, unset on the block axis only.
- `padHalf`: inside padding's own bracket, the double padding token, on every side.
- `padTexts`: inside padding's own bracket, the text spacing scale, on every side; also the default with no option at all.
- `padElements`: inside padding's own bracket, the element spacing scale, on every side.
- `padSections`: inside padding's own bracket, the section spacing scale, on every side.
- `padPage`: inside padding's own bracket, the page padding token, on every side.
- `padUnset`: inside padding's own bracket, resets every side to its initial value.
- `padLeft`: inside padding's own bracket, the text spacing scale on the left only, the same default as bare padding.
- `padLeftHalf`: inside padding's own bracket, the double padding token on the left only.
- `padLeftTexts`: inside padding's own bracket, the text spacing scale on the left only.
- `padLeftElements`: inside padding's own bracket, the element spacing scale on the left only.
- `padLeftSections`: inside padding's own bracket, the section spacing scale on the left only.
- `padLeftPage`: inside padding's own bracket, the page padding token on the left only.
- `padLeftUnset`: inside padding's own bracket, unset on the left only.
- `padRight`: inside padding's own bracket, the text spacing scale on the right only, the same default as bare padding.
- `padRightHalf`: inside padding's own bracket, the double padding token on the right only.
- `padRightTexts`: inside padding's own bracket, the text spacing scale on the right only.
- `padRightElements`: inside padding's own bracket, the element spacing scale on the right only.
- `padRightSections`: inside padding's own bracket, the section spacing scale on the right only.
- `padRightPage`: inside padding's own bracket, the page padding token on the right only.
- `padRightUnset`: inside padding's own bracket, unset on the right only.
- `padTop`: inside padding's own bracket, the text spacing scale on the top only, the same default as bare padding.
- `padTopHalf`: inside padding's own bracket, the double padding token on the top only.
- `padTopTexts`: inside padding's own bracket, the text spacing scale on the top only.
- `padTopElements`: inside padding's own bracket, the element spacing scale on the top only.
- `padTopSections`: inside padding's own bracket, the section spacing scale on the top only.
- `padTopPage`: inside padding's own bracket, the page padding token on the top only.
- `padTopUnset`: inside padding's own bracket, unset on the top only.
- `padBottom`: inside padding's own bracket, the text spacing scale on the bottom only, the same default as bare padding.
- `padBottomHalf`: inside padding's own bracket, the double padding token on the bottom only.
- `padBottomTexts`: inside padding's own bracket, the text spacing scale on the bottom only.
- `padBottomElements`: inside padding's own bracket, the element spacing scale on the bottom only.
- `padBottomSections`: inside padding's own bracket, the section spacing scale on the bottom only.
- `padBottomPage`: inside padding's own bracket, the page padding token on the bottom only.
- `padBottomUnset`: inside padding's own bracket, unset on the bottom only.
- `padInline`: inside padding's own bracket, the text spacing scale on the inline axis only, the same default as bare padding.
- `padInlineHalf`: inside padding's own bracket, the double padding token on the inline axis only.
- `padInlineTexts`: inside padding's own bracket, the text spacing scale on the inline axis only.
- `padInlineElements`: inside padding's own bracket, the element spacing scale on the inline axis only.
- `padInlineSections`: inside padding's own bracket, the section spacing scale on the inline axis only.
- `padInlinePage`: inside padding's own bracket, the page padding token on the inline axis only.
- `padInlineUnset`: inside padding's own bracket, unset on the inline axis only.
- `padBlock`: inside padding's own bracket, the text spacing scale on the block axis only, the same default as bare padding.
- `padBlockHalf`: inside padding's own bracket, the double padding token on the block axis only.
- `padBlockTexts`: inside padding's own bracket, the text spacing scale on the block axis only.
- `padBlockElements`: inside padding's own bracket, the element spacing scale on the block axis only.
- `padBlockSections`: inside padding's own bracket, the section spacing scale on the block axis only.
- `padBlockPage`: inside padding's own bracket, the page padding token on the block axis only.
- `padBlockUnset`: inside padding's own bracket, unset on the block axis only.

## Related elements

### PGS

- `flex`: provides the flex layout; direction and spacing are flags in its bracket.
- `box`: makes the centred example visible, so mrgInlineAuto is actually observable.

### PGS Options (component brackets)

- `column`: arranges the spacing groups vertically.
- `gapTexts`: separates the examples inside a group.

### Other

- `gapSections`: separates the groups.

## Output

Margin and padding usage examples using all available directions and spacing scales.
## Margin

### Directions

Configurable margin utilities on every side and axis, each paired with a spacing scale option.

```html
<strong>Directions</strong>
<p pgs="margin['mrgLeftTexts']">Text spacing on the left.</p>
<p pgs="margin['mrgRightElements']">Element spacing on the right.</p>
<p pgs="margin['mrgBottomSections']">Section spacing below.</p>
<p pgs="margin['mrgTopTexts']">Text spacing above.</p>
<p pgs="margin['mrgInlineElements']">Element spacing on the inline axis.</p>
<p pgs="margin['mrgBlockSections']">Section spacing on the block axis.</p>
<p pgs="margin['mrgElements']">Element spacing on every side.</p>
<p pgs="margin['mrgUnset']">No margin at all.</p>
```

### Scales

Besides the three text, element and section scales, the double padding token, the page padding token and auto are available on the same utilities.

```html
<strong>Scales</strong>
<p pgs="margin['mrgLeftHalf']">Double padding on the left.</p>
<p pgs="margin['mrgLeftPage']">Page padding on the left.</p>
<p pgs="box margin['mrgInlineAuto']">Centred by auto.</p>
```

### Negative

mrgNegative negates whatever else is combined with it in the same bracket — the default padding on its own, or a direction/scale flag paired with it. It is how a child reaches past the padding of the box it sits in.

```html
<p pgs="box margin['mrgNegative' 'mrgInlineElements']">Pulled out to the edges of the padded box.</p>
```

## Padding

### Directions

Configurable padding utilities on every side and axis, each paired with a spacing scale option.

```html
<strong>Directions</strong>
<p pgs="padding['padLeftTexts']">Text spacing on the left.</p>
<p pgs="padding['padRightElements']">Element spacing on the right.</p>
<p pgs="padding['padBottomSections']">Section spacing below.</p>
<p pgs="padding['padTopTexts']">Text spacing above.</p>
<p pgs="padding['padInlineElements']">Element spacing on the inline axis.</p>
<p pgs="padding['padBlockSections']">Section spacing on the block axis.</p>
<p pgs="box padding['padElements']">Element spacing on every side.</p>
<p pgs="box padding['padUnset']">No padding at all.</p>
```

### Scales

Besides the three text, element and section scales and the page padding token, the double padding token is also available on the same utilities.

```html
<strong>Scales</strong>
<p pgs="padding['padInlineHalf']">Double padding on the inline axis.</p>
<p pgs="padding['padInlinePage']">Page padding on the inline axis.</p>
```
