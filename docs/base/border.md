<!-- Automatically generated from reference/html/base/border.html. Edit reference/html/base/border.html and run npm run docs:generate again. -->

# Border

Border, outline and radius utilities, split out from the general-purpose set since together they cover an entire surface treatment on their own. Border's width has a shared base root (all four sides) plus one root per direction (borderTop, borderBlock, ...), each using a short direction-prefixed thickness flag (bdTpThin, bdBlThick, ...); colour is a separate component, borderColor, independent of which of those draws the width.

## PGS

- `border`: draws the shared border, on every side by default.
- `borderBlock`: draws the shared border on both sides of the block axis only.
- `borderInline`: draws the shared border on both sides of the inline axis only.
- `borderTop`: draws the shared border above only.
- `borderRight`: draws the shared border on the right only.
- `borderBottom`: draws the shared border below only.
- `borderLeft`: draws the shared border on the left only.
- `borderColor`: recolours the border, whichever of the roots above draws its width.
- `outline`: draws the same line outside the box, taking no space in the layout; the ol* colour utilities recolour it.
- `borderRadius`: applies the standard radius token to any surface, or one of its own two other scales.

## PGS Options (component brackets)

- `bd`: inside border's own bracket, an explicit way to write the same default a bare border with no bracket already gets.
- `bdThin`: inside border's own bracket, draws it at 1px instead of the default 1.5px, on every side.
- `bdThick`: inside border's own bracket, draws it at 3px, on every side.
- `bdThicker`: inside border's own bracket, draws it at 4.5px, on every side.
- `bdUnset`: inside border's own bracket, takes the border off an element that has one of its own, on every side.
- `bdBl`: inside borderBlock's own bracket, an explicit way to write the same default a bare borderBlock with no bracket already gets.
- `bdBlThin`: inside borderBlock's own bracket, draws it on both sides of the block axis, at 1px.
- `bdBlThick`: inside borderBlock's own bracket, draws it on both sides of the block axis, at 3px.
- `bdBlThicker`: inside borderBlock's own bracket, draws it on both sides of the block axis, at 4.5px.
- `bdBlUnset`: inside borderBlock's own bracket, takes the border off an element that has one of its own, on both sides of the block axis.
- `bdIn`: inside borderInline's own bracket, an explicit way to write the same default a bare borderInline with no bracket already gets.
- `bdInThin`: inside borderInline's own bracket, draws it on both sides of the inline axis, at 1px.
- `bdInThick`: inside borderInline's own bracket, draws it on both sides of the inline axis, at 3px.
- `bdInThicker`: inside borderInline's own bracket, draws it on both sides of the inline axis, at 4.5px.
- `bdInUnset`: inside borderInline's own bracket, takes the border off an element that has one of its own, on both sides of the inline axis.
- `bdTp`: inside borderTop's own bracket, an explicit way to write the same default a bare borderTop with no bracket already gets.
- `bdTpThin`: inside borderTop's own bracket, draws it above only, at 1px.
- `bdTpThick`: inside borderTop's own bracket, draws it above only, at 3px.
- `bdTpThicker`: inside borderTop's own bracket, draws it above only, at 4.5px.
- `bdTpUnset`: inside borderTop's own bracket, takes the border off an element that has one of its own, above only.
- `bdRt`: inside borderRight's own bracket, an explicit way to write the same default a bare borderRight with no bracket already gets.
- `bdRtThin`: inside borderRight's own bracket, draws it on the right only, at 1px.
- `bdRtThick`: inside borderRight's own bracket, draws it on the right only, at 3px.
- `bdRtThicker`: inside borderRight's own bracket, draws it on the right only, at 4.5px.
- `bdRtUnset`: inside borderRight's own bracket, takes the border off an element that has one of its own, on the right only.
- `bdBt`: inside borderBottom's own bracket, an explicit way to write the same default a bare borderBottom with no bracket already gets.
- `bdBtThin`: inside borderBottom's own bracket, draws it below only, at 1px.
- `bdBtThick`: inside borderBottom's own bracket, draws it below only, at 3px.
- `bdBtThicker`: inside borderBottom's own bracket, draws it below only, at 4.5px.
- `bdBtUnset`: inside borderBottom's own bracket, takes the border off an element that has one of its own, below only.
- `bdLt`: inside borderLeft's own bracket, an explicit way to write the same default a bare borderLeft with no bracket already gets.
- `bdLtThin`: inside borderLeft's own bracket, draws it on the left only, at 1px.
- `bdLtThick`: inside borderLeft's own bracket, draws it on the left only, at 3px.
- `bdLtThicker`: inside borderLeft's own bracket, draws it on the left only, at 4.5px.
- `bdLtUnset`: inside borderLeft's own bracket, takes the border off an element that has one of its own, on the left only.
- `otlThin`: inside outline's own bracket, draws it at 1px instead of the default 1.5px.
- `otlThick`: inside outline's own bracket, draws it at 3px.
- `otlThicker`: inside outline's own bracket, draws it at 4.5px.
- `otlUnset`: inside outline's own bracket, takes the outline off an element that has one of its own.
- `bdTransparent`: inside borderColor's own bracket, makes the border fully transparent.
- `bdPrimary`: inside borderColor's own bracket, recolours the border with the primary colour.
- `bdSecondary`: inside borderColor's own bracket, recolours the border with the secondary colour.
- `bdTertiary`: inside borderColor's own bracket, recolours the border with the tertiary colour.
- `bdQuaternary`: inside borderColor's own bracket, recolours the border with the quaternary colour.
- `bdWhite`: inside borderColor's own bracket, recolours the border white.
- `bdBlack`: inside borderColor's own bracket, recolours the border black.
- `bdBox`: inside borderColor's own bracket, recolours the border with the box surface colour.
- `bdBoxDark`: inside borderColor's own bracket, recolours the border with the dark box surface colour.
- `bdLink`: inside borderColor's own bracket, recolours the border with the link colour.
- `bdInfo`: inside borderColor's own bracket, recolours the border with the info colour.
- `bdError`: inside borderColor's own bracket, recolours the border with the error colour.
- `bdWarning`: inside borderColor's own bracket, recolours the border with the warning colour.
- `bdSuccess`: inside borderColor's own bracket, recolours the border with the success colour.
- `bdGray`: inside borderColor's own bracket, recolours the border gray.
- `otlPrimary`: inside outline's own bracket, recolours it with the primary colour.
- `otlSecondary`: inside outline's own bracket, recolours it with the secondary colour.
- `otlTertiary`: inside outline's own bracket, recolours it with the tertiary colour.
- `otlQuaternary`: inside outline's own bracket, recolours it with the quaternary colour.
- `otlWhite`: inside outline's own bracket, recolours it white.
- `otlBlack`: inside outline's own bracket, recolours it black.
- `otlBox`: inside outline's own bracket, recolours it with the box surface colour.
- `otlBoxDark`: inside outline's own bracket, recolours it with the dark box surface colour.
- `otlLink`: inside outline's own bracket, recolours it with the link colour.
- `otlInfo`: inside outline's own bracket, recolours it with the info colour.
- `otlError`: inside outline's own bracket, recolours it with the error colour.
- `otlWarning`: inside outline's own bracket, recolours it with the warning colour.
- `otlSuccess`: inside outline's own bracket, recolours it with the success colour.
- `otlGray`: inside outline's own bracket, recolours it gray.
- `radInput`: inside borderRadius's own bracket, uses the smaller radius used by form controls instead of the standard one.
- `radExternal`: inside borderRadius's own bracket, uses the wider radius used by outer containers instead of the standard one.
- `radUnset`: inside borderRadius's own bracket, squares the corners off an element that has a radius of its own.

## Related elements

### PGS

- `flex`: provides the flex layout; direction and spacing are flags in its bracket.
- `padding`: applies the shared padding utility to each example.
- `box`: gives the transparent-border example a visible surface to sit on, so the missing border actually reads as missing.

### PGS Options (component brackets)

- `column`: stacks the utility groups vertically.
- `row`: arranges the examples in a row.
- `pdSections`: inside padding's own bracket, uses the section spacing scale for the radius example's padding.
- `wrap`: lets the border and outline examples flow onto a second row.
- `gapTexts`: spaces the examples inside a group.

### Other

- `gapSections`: separates the groups.

## CSS Variables

- `--border-color`
- `--border-complete`
- `--border-radius`
- `--border-radius-external`
- `--border-radius-input`
- `--border-style`
- `--border-width`

## Output

One example per utility, grouped by border, outline and radius.
## Examples

### Border

A line drawn on the edge of the box, taking its space in the layout. Each direction is its own root component, named like the margin and padding utilities. Recolour it with borderColor, its own dedicated component — it works alongside border or any of its directions, whichever draws the width — and change its weight with a thickness option.

```html
<span pgs="padding border">border</span>
<span pgs="padding border borderColor['bdPrimary']">borderColor['bdPrimary']</span>
<span pgs="padding border borderColor['bdError']">borderColor['bdError']</span>
<span pgs="padding box border borderColor['bdTransparent']">borderColor['bdTransparent']</span>

<span pgs="padding border['bdThin']">thin</span>
<span pgs="padding border['bdThick']">thick</span>
<span pgs="padding border['bdThicker']">thicker</span>

<span pgs="padding borderTop['bdTpThin'] borderColor['bdPrimary']">borderTop</span>
<span pgs="padding borderRight['bdRtThin'] borderColor['bdPrimary']">borderRight</span>
<span pgs="padding borderBottom['bdBtThin'] borderColor['bdPrimary']">borderBottom</span>
<span pgs="padding borderLeft['bdLtThin'] borderColor['bdPrimary']">borderLeft</span>
<span pgs="padding borderInline['bdInThin'] borderColor['bdPrimary']">borderInline</span>
<span pgs="padding borderBlock['bdBlThin'] borderColor['bdPrimary']">borderBlock</span>
```

### Outline

The same line drawn outside the padding  so it takes no space and never moves what sits around it. CSS draws it as a single ring, which is why there is no per-side form. It has its own colour utilities, ol*, and its own thickness options: an element carrying both a border and an outline needs one from each family.

```html
<span pgs="padding outline">outline</span>
<span pgs="padding outline['otlPrimary']">outline['otlPrimary']</span>
<span pgs="padding outline['otlError']">outline['otlError']</span>

<span pgs="padding outline['otlThin']">thin</span>
<span pgs="padding outline['otlThick']">thick</span>
<span pgs="padding outline['otlThicker']">thicker</span>
```

### Border radius

Three radius tokens: the standard one, the smaller one used by form controls and the wider one for outer containers.

```html
<span pgs="padding['pdSections'] border borderRadius['radExternal']">borderRadius['radExternal']</span>
<span pgs="padding['pdSections'] border borderRadius">borderRadius</span>
<span pgs="padding['pdSections'] border borderRadius['radInput']">borderRadius['radInput']</span>
```
