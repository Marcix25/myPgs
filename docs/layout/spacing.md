<!-- Automatically generated from reference/html/layout/spacing.html. Edit reference/html/layout/spacing.html and run npm run docs:generate again. -->

# Spacing

Margin and padding utilities based on the same spacing scale gap uses: texts (smallest, also the default), elements (base size), group (double), sections (viewport-based, biggest). A shared base root for each property (margin, padding) covers all four sides at once, with the direction folded into a short prefix (mgTexts, pdPage, ...) instead of a separate root token per direction. Each direction also has its own root component (marginBlock, paddingTop, ...), using the same short direction-prefixed flags (mgblTexts, pdtPage, ...) — a physical side always wins over its logical shorthand when both are written, because CSS resolves that by which one comes later in the cascade, not by specificity. The gap utilities live in Flex and Grid instead, because they only take effect on a flex or grid container.

## PGS

- `margin`: applies configurable spacing on every side.
- `marginBlock`: applies configurable spacing on the block axis only.
- `marginInline`: applies configurable spacing on the inline axis only.
- `marginTop`: applies configurable spacing on the top only.
- `marginRight`: applies configurable spacing on the right only.
- `marginBottom`: applies configurable spacing on the bottom only.
- `marginLeft`: applies configurable spacing on the left only.
- `padding`: applies configurable inner spacing on every side.
- `paddingBlock`: applies configurable inner spacing on the block axis only.
- `paddingInline`: applies configurable inner spacing on the inline axis only.
- `paddingTop`: applies configurable inner spacing on the top only.
- `paddingRight`: applies configurable inner spacing on the right only.
- `paddingBottom`: applies configurable inner spacing on the bottom only.
- `paddingLeft`: applies configurable inner spacing on the left only.

## PGS Options (component brackets)

- `mg`: inside margin's own bracket, an explicit way to write the same default a bare margin with no bracket already gets.
- `mgTexts`: inside margin's own bracket, the text spacing scale, on every side; also the default with no option at all.
- `mgElements`: inside margin's own bracket, the element spacing scale, on every side.
- `mgGroups`: inside margin's own bracket, the double scale, on every side.
- `mgSections`: inside margin's own bracket, the section spacing scale, on every side.
- `mgPage`: inside margin's own bracket, the page padding token, on every side.
- `mgAuto`: inside margin's own bracket, auto on every side, to centre an element or push it away.
- `mgUnset`: inside margin's own bracket, resets every side to its initial value.
- `mgNegative`: inside margin's own bracket, negates the base (all four sides) value it's combined with, or the default padding on its own — every direction below has its own Negative instead, independent of this one.
- `mgbl`: inside marginBlock's own bracket, an explicit way to write the same default a bare marginBlock with no bracket already gets.
- `mgblTexts`: inside marginBlock's own bracket, the text spacing scale, on the block axis only; also the default with no option at all.
- `mgblElements`: inside marginBlock's own bracket, the element spacing scale, on the block axis only.
- `mgblGroups`: inside marginBlock's own bracket, the double scale, on the block axis only.
- `mgblSections`: inside marginBlock's own bracket, the section spacing scale, on the block axis only.
- `mgblPage`: inside marginBlock's own bracket, the page padding token, on the block axis only.
- `mgblAuto`: inside marginBlock's own bracket, auto on the block axis only, to centre an element or push it away.
- `mgblUnset`: inside marginBlock's own bracket, resets the block axis to its initial value.
- `mgblNegative`: inside marginBlock's own bracket, negates whatever value is combined with it in the same bracket, independently of the base mgNegative sign.
- `mgi`: inside marginInline's own bracket, an explicit way to write the same default a bare marginInline with no bracket already gets.
- `mgiTexts`: inside marginInline's own bracket, the text spacing scale, on the inline axis only; also the default with no option at all.
- `mgiElements`: inside marginInline's own bracket, the element spacing scale, on the inline axis only.
- `mgiGroups`: inside marginInline's own bracket, the double scale, on the inline axis only.
- `mgiSections`: inside marginInline's own bracket, the section spacing scale, on the inline axis only.
- `mgiPage`: inside marginInline's own bracket, the page padding token, on the inline axis only.
- `mgiAuto`: inside marginInline's own bracket, auto on the inline axis only, to centre an element or push it away.
- `mgiUnset`: inside marginInline's own bracket, resets the inline axis to its initial value.
- `mgiNegative`: inside marginInline's own bracket, negates whatever value is combined with it in the same bracket, independently of the base mgNegative sign.
- `mgt`: inside marginTop's own bracket, an explicit way to write the same default a bare marginTop with no bracket already gets.
- `mgtTexts`: inside marginTop's own bracket, the text spacing scale, on the top only; also the default with no option at all.
- `mgtElements`: inside marginTop's own bracket, the element spacing scale, on the top only.
- `mgtGroups`: inside marginTop's own bracket, the double scale, on the top only.
- `mgtSections`: inside marginTop's own bracket, the section spacing scale, on the top only.
- `mgtPage`: inside marginTop's own bracket, the page padding token, on the top only.
- `mgtAuto`: inside marginTop's own bracket, auto on the top only, to centre an element or push it away.
- `mgtUnset`: inside marginTop's own bracket, resets the top to its initial value.
- `mgtNegative`: inside marginTop's own bracket, negates whatever value is combined with it in the same bracket, independently of the base mgNegative sign.
- `mgr`: inside marginRight's own bracket, an explicit way to write the same default a bare marginRight with no bracket already gets.
- `mgrTexts`: inside marginRight's own bracket, the text spacing scale, on the right only; also the default with no option at all.
- `mgrElements`: inside marginRight's own bracket, the element spacing scale, on the right only.
- `mgrGroups`: inside marginRight's own bracket, the double scale, on the right only.
- `mgrSections`: inside marginRight's own bracket, the section spacing scale, on the right only.
- `mgrPage`: inside marginRight's own bracket, the page padding token, on the right only.
- `mgrAuto`: inside marginRight's own bracket, auto on the right only, to centre an element or push it away.
- `mgrUnset`: inside marginRight's own bracket, resets the right to its initial value.
- `mgrNegative`: inside marginRight's own bracket, negates whatever value is combined with it in the same bracket, independently of the base mgNegative sign.
- `mgb`: inside marginBottom's own bracket, an explicit way to write the same default a bare marginBottom with no bracket already gets.
- `mgbTexts`: inside marginBottom's own bracket, the text spacing scale, on the bottom only; also the default with no option at all.
- `mgbElements`: inside marginBottom's own bracket, the element spacing scale, on the bottom only.
- `mgbGroups`: inside marginBottom's own bracket, the double scale, on the bottom only.
- `mgbSections`: inside marginBottom's own bracket, the section spacing scale, on the bottom only.
- `mgbPage`: inside marginBottom's own bracket, the page padding token, on the bottom only.
- `mgbAuto`: inside marginBottom's own bracket, auto on the bottom only, to centre an element or push it away.
- `mgbUnset`: inside marginBottom's own bracket, resets the bottom to its initial value.
- `mgbNegative`: inside marginBottom's own bracket, negates whatever value is combined with it in the same bracket, independently of the base mgNegative sign.
- `mgl`: inside marginLeft's own bracket, an explicit way to write the same default a bare marginLeft with no bracket already gets.
- `mglTexts`: inside marginLeft's own bracket, the text spacing scale, on the left only; also the default with no option at all.
- `mglElements`: inside marginLeft's own bracket, the element spacing scale, on the left only.
- `mglGroups`: inside marginLeft's own bracket, the double scale, on the left only.
- `mglSections`: inside marginLeft's own bracket, the section spacing scale, on the left only.
- `mglPage`: inside marginLeft's own bracket, the page padding token, on the left only.
- `mglAuto`: inside marginLeft's own bracket, auto on the left only, to centre an element or push it away.
- `mglUnset`: inside marginLeft's own bracket, resets the left to its initial value.
- `mglNegative`: inside marginLeft's own bracket, negates whatever value is combined with it in the same bracket, independently of the base mgNegative sign.
- `pd`: inside padding's own bracket, an explicit way to write the same default a bare padding with no bracket already gets.
- `pdTexts`: inside padding's own bracket, the text spacing scale, on every side; also the default with no option at all.
- `pdElements`: inside padding's own bracket, the element spacing scale, on every side.
- `pdGroups`: inside padding's own bracket, the double scale, on every side.
- `pdSections`: inside padding's own bracket, the section spacing scale, on every side.
- `pdPage`: inside padding's own bracket, the page padding token, on every side.
- `pdUnset`: inside padding's own bracket, resets every side to its initial value.
- `pdbl`: inside paddingBlock's own bracket, an explicit way to write the same default a bare paddingBlock with no bracket already gets.
- `pdblTexts`: inside paddingBlock's own bracket, the text spacing scale, on the block axis only; also the default with no option at all.
- `pdblElements`: inside paddingBlock's own bracket, the element spacing scale, on the block axis only.
- `pdblGroups`: inside paddingBlock's own bracket, the double scale, on the block axis only.
- `pdblSections`: inside paddingBlock's own bracket, the section spacing scale, on the block axis only.
- `pdblPage`: inside paddingBlock's own bracket, the page padding token, on the block axis only.
- `pdblUnset`: inside paddingBlock's own bracket, resets the block axis to its initial value.
- `pdi`: inside paddingInline's own bracket, an explicit way to write the same default a bare paddingInline with no bracket already gets.
- `pdiTexts`: inside paddingInline's own bracket, the text spacing scale, on the inline axis only; also the default with no option at all.
- `pdiElements`: inside paddingInline's own bracket, the element spacing scale, on the inline axis only.
- `pdiGroups`: inside paddingInline's own bracket, the double scale, on the inline axis only.
- `pdiSections`: inside paddingInline's own bracket, the section spacing scale, on the inline axis only.
- `pdiPage`: inside paddingInline's own bracket, the page padding token, on the inline axis only.
- `pdiUnset`: inside paddingInline's own bracket, resets the inline axis to its initial value.
- `pdt`: inside paddingTop's own bracket, an explicit way to write the same default a bare paddingTop with no bracket already gets.
- `pdtTexts`: inside paddingTop's own bracket, the text spacing scale, on the top only; also the default with no option at all.
- `pdtElements`: inside paddingTop's own bracket, the element spacing scale, on the top only.
- `pdtGroups`: inside paddingTop's own bracket, the double scale, on the top only.
- `pdtSections`: inside paddingTop's own bracket, the section spacing scale, on the top only.
- `pdtPage`: inside paddingTop's own bracket, the page padding token, on the top only.
- `pdtUnset`: inside paddingTop's own bracket, resets the top to its initial value.
- `pdr`: inside paddingRight's own bracket, an explicit way to write the same default a bare paddingRight with no bracket already gets.
- `pdrTexts`: inside paddingRight's own bracket, the text spacing scale, on the right only; also the default with no option at all.
- `pdrElements`: inside paddingRight's own bracket, the element spacing scale, on the right only.
- `pdrGroups`: inside paddingRight's own bracket, the double scale, on the right only.
- `pdrSections`: inside paddingRight's own bracket, the section spacing scale, on the right only.
- `pdrPage`: inside paddingRight's own bracket, the page padding token, on the right only.
- `pdrUnset`: inside paddingRight's own bracket, resets the right to its initial value.
- `pdb`: inside paddingBottom's own bracket, an explicit way to write the same default a bare paddingBottom with no bracket already gets.
- `pdbTexts`: inside paddingBottom's own bracket, the text spacing scale, on the bottom only; also the default with no option at all.
- `pdbElements`: inside paddingBottom's own bracket, the element spacing scale, on the bottom only.
- `pdbGroups`: inside paddingBottom's own bracket, the double scale, on the bottom only.
- `pdbSections`: inside paddingBottom's own bracket, the section spacing scale, on the bottom only.
- `pdbPage`: inside paddingBottom's own bracket, the page padding token, on the bottom only.
- `pdbUnset`: inside paddingBottom's own bracket, resets the bottom to its initial value.
- `pdl`: inside paddingLeft's own bracket, an explicit way to write the same default a bare paddingLeft with no bracket already gets.
- `pdlTexts`: inside paddingLeft's own bracket, the text spacing scale, on the left only; also the default with no option at all.
- `pdlElements`: inside paddingLeft's own bracket, the element spacing scale, on the left only.
- `pdlGroups`: inside paddingLeft's own bracket, the double scale, on the left only.
- `pdlSections`: inside paddingLeft's own bracket, the section spacing scale, on the left only.
- `pdlPage`: inside paddingLeft's own bracket, the page padding token, on the left only.
- `pdlUnset`: inside paddingLeft's own bracket, resets the left to its initial value.

## Related elements

### PGS

- `flex`: provides the flex layout; direction and spacing are flags in its bracket.
- `box`: makes the centred example visible, so mgiAuto is actually observable.

### PGS Options (component brackets)

- `column`: arranges the spacing groups vertically.
- `gapTexts`: separates the examples inside a group.

### Other

- `gapSections`: separates the groups.

## Output

Margin and padding usage examples using all available directions and spacing scales.
## Margin

### Directions

Each direction is its own root component, paired with a spacing scale option in its own bracket.

```html
<strong>Directions</strong>
<p pgs="marginLeft['mglTexts']">Text spacing on the left.</p>
<p pgs="marginRight['mgrElements']">Element spacing on the right.</p>
<p pgs="marginBottom['mgbSections']">Section spacing below.</p>
<p pgs="marginTop['mgtTexts']">Text spacing above.</p>
<p pgs="marginInline['mgiElements']">Element spacing on the inline axis.</p>
<p pgs="marginBlock['mgblSections']">Section spacing on the block axis.</p>
<p pgs="margin['mgElements']">Element spacing on every side.</p>
<p pgs="margin['mgUnset']">No margin at all.</p>
```

### Scales

Besides the text, element and section scales, the double (group) scale, the page padding token and auto are available on the same utilities.

```html
<strong>Scales</strong>
<p pgs="marginLeft['mglGroups']">Double spacing on the left.</p>
<p pgs="marginLeft['mglPage']">Page padding on the left.</p>
<p pgs="box marginInline['mgiAuto']">Centred by auto.</p>
```

### Negative

mgNegative negates whatever else is combined with it in the same bracket — the default padding on its own, or a scale flag paired with it. Each direction's own root has its own Negative flag (mgiNegative, mgtNegative, ...), independent of the base one. It is how a child reaches past the padding of the box it sits in.

```html
<p pgs="box marginInline['mgiNegative' 'mgiElements']">Pulled out to the edges of the padded box.</p>
```

## Padding

### Directions

Each direction is its own root component, paired with a spacing scale option in its own bracket.

```html
<strong>Directions</strong>
<p pgs="paddingLeft['pdlTexts']">Text spacing on the left.</p>
<p pgs="paddingRight['pdrElements']">Element spacing on the right.</p>
<p pgs="paddingBottom['pdbSections']">Section spacing below.</p>
<p pgs="paddingTop['pdtTexts']">Text spacing above.</p>
<p pgs="paddingInline['pdiElements']">Element spacing on the inline axis.</p>
<p pgs="paddingBlock['pdblSections']">Section spacing on the block axis.</p>
<p pgs="box padding['pdElements']">Element spacing on every side.</p>
<p pgs="box padding['pdUnset']">No padding at all.</p>
```

### Scales

Besides the text, element and section scales, the double (group) scale and the page padding token are also available on the same utilities.

```html
<strong>Scales</strong>
<p pgs="paddingInline['pdiGroups']">Double padding on the inline axis.</p>
<p pgs="paddingInline['pdiPage']">Page padding on the inline axis.</p>
```
