<!-- Automatically generated from reference/html/layout/spacing.html. Edit reference/html/layout/spacing.html and run npm run docs:generate again. -->

# Spacing

Gap, margin, and padding utilities based on the shared MyPGS spacing scales.

## PGS

- `marginLeft`: applies configurable spacing to the left of an element.
- `marginRight`: applies configurable spacing to the right of an element.
- `marginBottom`: applies configurable spacing below an element.
- `marginTop`: applies configurable spacing above an element.
- `marginInline`: applies configurable spacing on the inline axis.
- `marginBlock`: applies configurable spacing on the block axis.
- `paddingLeft`: applies configurable inner spacing to the left of an element.
- `paddingRight`: applies configurable inner spacing to the right of an element.
- `paddingBottom`: applies configurable inner spacing below an element.
- `paddingTop`: applies configurable inner spacing above an element.
- `paddingInline`: applies configurable inner spacing on the inline axis.
- `paddingBlock`: applies configurable inner spacing on the block axis.

## PGS Options

- `marginTexts`: uses the text spacing scale and is the default for margin utilities.
- `marginElements`: uses the element spacing scale for margin utilities.
- `marginSections`: uses the section spacing scale for margin utilities.
- `margin2`: uses the double padding token for margin utilities.
- `marginPage`: uses the page padding token for margin utilities.
- `marginAuto`: sets the margin to auto, to centre an element or push it away.
- `paddingTexts`: uses the text spacing scale and is the default for padding utilities.
- `paddingElements`: uses the element spacing scale for padding utilities.
- `paddingSections`: uses the section spacing scale for padding utilities.
- `padding2`: uses the double padding token for padding utilities.
- `paddingPage`: uses the page padding token for padding utilities.

## Related elements

### PGS

- `flexColumn`: arranges the spacing groups vertically.
- `flexRow`: arranges the gap examples horizontally.
- `wrap`: allows the gap examples to wrap.
- `nowrap`: prevents the section gap example from wrapping.
- `box`: makes the gap examples visible.
- `gapTexts`: applies the text spacing token between child elements.
- `gapElements`: applies the element spacing token between child elements.
- `gapSections`: applies the section spacing token between child elements.

## Output

Gap, margin, and padding usage examples using all available directions and spacing scales.

## Example

### Gap

Text, element, and section gap tokens applied between flex children.

```html
<section pgs="flexColumn gapTexts">
    <strong>Gap</strong>
    <div pgs="flexRow gapTexts wrap">
        <span pgs="box">Text gap</span>
        <span pgs="box">Text gap</span>
    </div>
    <div pgs="flexRow gapElements wrap">
        <span pgs="box">Element gap</span>
        <span pgs="box">Element gap</span>
    </div>
    <div pgs="flexRow gapSections nowrap">
        <span pgs="box">Section gap</span>
        <span pgs="box">Section gap</span>
    </div>
</section>
```

### Margin

Configurable margin utilities on every side and axis, each paired with a spacing scale option.

```html
<section pgs="flexColumn gapTexts">
    <strong>Margin</strong>
    <p pgs="marginLeft" pgs-option="marginTexts">Text spacing on the left.</p>
    <p pgs="marginRight" pgs-option="marginElements">Element spacing on the right.</p>
    <p pgs="marginBottom" pgs-option="marginSections">Section spacing below.</p>
    <p pgs="marginTop" pgs-option="marginTexts">Text spacing above.</p>
    <p pgs="marginInline" pgs-option="marginElements">Element spacing on the inline axis.</p>
    <p pgs="marginBlock" pgs-option="marginSections">Section spacing on the block axis.</p>
</section>
```

### Scales

Besides the three text, element and section scales, the padding tokens and marginAuto are available on the same utilities.

```html
<section pgs="flexColumn gapTexts">
    <strong>Scales</strong>
    <p pgs="marginLeft" pgs-option="margin2">Double padding on the left.</p>
    <p pgs="marginLeft" pgs-option="marginPage">Page padding on the left.</p>
    <p pgs="paddingInline" pgs-option="padding2">Double padding on the inline axis.</p>
    <p pgs="paddingInline" pgs-option="paddingPage">Page padding on the inline axis.</p>
    <p pgs="box marginInline" pgs-option="marginAuto">Centred by marginAuto.</p>
</section>
```

### Padding

Configurable padding utilities on every side and axis, each paired with a spacing scale option.

```html
<section pgs="flexColumn gapTexts">
    <strong>Padding</strong>
    <p pgs="paddingLeft" pgs-option="paddingTexts">Text spacing on the left.</p>
    <p pgs="paddingRight" pgs-option="paddingElements">Element spacing on the right.</p>
    <p pgs="paddingBottom" pgs-option="paddingSections">Section spacing below.</p>
    <p pgs="paddingTop" pgs-option="paddingTexts">Text spacing above.</p>
    <p pgs="paddingInline" pgs-option="paddingElements">Element spacing on the inline axis.</p>
    <p pgs="paddingBlock" pgs-option="paddingSections">Section spacing on the block axis.</p>
</section>
```
