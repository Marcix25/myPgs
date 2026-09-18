<!-- Automatically generated from reference/html/layout/spacing.html. Edit reference/html/layout/spacing.html and run npm run docs:generate again. -->

# Spacing

Margin and padding utilities based on the shared MyPGS spacing scales. The gap utilities live in Responsive instead, because they only take effect on a flex or grid container.

## PGS

- `margin`: applies configurable spacing on every side of an element.
- `marginLeft`: applies configurable spacing to the left of an element.
- `marginRight`: applies configurable spacing to the right of an element.
- `marginBottom`: applies configurable spacing below an element.
- `marginTop`: applies configurable spacing above an element.
- `marginInline`: applies configurable spacing on the inline axis.
- `marginBlock`: applies configurable spacing on the block axis.
- `padding`: applies configurable inner spacing on every side of an element.
- `paddingLeft`: applies configurable inner spacing to the left of an element.
- `paddingRight`: applies configurable inner spacing to the right of an element.
- `paddingBottom`: applies configurable inner spacing below an element.
- `paddingTop`: applies configurable inner spacing above an element.
- `paddingInline`: applies configurable inner spacing on the inline axis.
- `paddingBlock`: applies configurable inner spacing on the block axis.

## PGS Options (component brackets)

- `texts`: uses the text spacing scale and is the default for margin and padding utilities.
- `elements`: uses the element spacing scale for margin and padding utilities.
- `sections`: uses the section spacing scale for margin and padding utilities.
- `margin2`: uses the double padding token for margin utilities.
- `padding2`: uses the double padding token for padding utilities.
- `page`: uses the page padding token for margin and padding utilities.
- `auto`: sets the margin to auto, to centre an element or push it away.
- `unset`: resets the margin or padding to its initial value, to drop the spacing on one element without dropping the utility.
- `negative`: flips the chosen scale, so the utility pulls the element out by the same amount it would have pushed it in. It works on every margin utility and reads the scale option written next to it, which is how a full-bleed child escapes the padding of its container.

## Related elements

### PGS

- `flex`: provides the flex layout; direction and spacing are flags in its bracket.
- `box`: makes the centred example visible, so auto is actually observable.

### PGS Options (component brackets)

- `column`: arranges the spacing groups vertically.
- `gapTexts`: separates the examples inside a group.

### Other

- `gapSections`: separates the groups.

## Output

Margin and padding usage examples using all available directions and spacing scales.
## Examples

### Margin

Configurable margin utilities on every side and axis, each paired with a spacing scale option.

```html
<strong>Margin</strong>
<p pgs="marginLeft['texts']">Text spacing on the left.</p>
<p pgs="marginRight['elements']">Element spacing on the right.</p>
<p pgs="marginBottom['sections']">Section spacing below.</p>
<p pgs="marginTop['texts']">Text spacing above.</p>
<p pgs="marginInline['elements']">Element spacing on the inline axis.</p>
<p pgs="marginBlock['sections']">Section spacing on the block axis.</p>
<p pgs="margin['elements']">Element spacing on every side.</p>
<p pgs="margin['unset']">No margin at all.</p>
```

### Scales

Besides the three text, element and section scales, the padding tokens and auto are available on the same utilities.

```html
<strong>Scales</strong>
<p pgs="marginLeft['margin2']">Double padding on the left.</p>
<p pgs="marginLeft['page']">Page padding on the left.</p>
<p pgs="paddingInline['padding2']">Double padding on the inline axis.</p>
<p pgs="paddingInline['page']">Page padding on the inline axis.</p>
<p pgs="box marginInline['auto']">Centred by auto.</p>
```

### Negative

negative turns the chosen scale around: the same utility that pushes an element in pulls it out, which is how a child reaches past the padding of the box it sits in.

```html
<p pgs="box marginInline['elements' 'negative']">Pulled out to the edges of the padded box.</p>
```

### Padding

Configurable padding utilities on every side and axis, each paired with a spacing scale option.

```html
<strong>Padding</strong>
<p pgs="paddingLeft['texts']">Text spacing on the left.</p>
<p pgs="paddingRight['elements']">Element spacing on the right.</p>
<p pgs="paddingBottom['sections']">Section spacing below.</p>
<p pgs="paddingTop['texts']">Text spacing above.</p>
<p pgs="paddingInline['elements']">Element spacing on the inline axis.</p>
<p pgs="paddingBlock['sections']">Section spacing on the block axis.</p>
<p pgs="box padding['elements']">Element spacing on every side.</p>
<p pgs="box padding['unset']">No padding at all.</p>
```
