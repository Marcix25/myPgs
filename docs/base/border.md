<!-- Automatically generated from reference/html/base/border.html. Edit reference/html/base/border.html and run npm run docs:generate again. -->

# Border

Border, outline and radius utilities, split out from the general-purpose set since together they cover an entire surface treatment on their own. Border's width has a shared base root (all four sides) plus one root per direction (borderTop, borderBlock, ...), each using a short direction-prefixed thickness flag (brdtThin, brdblThick, ...); colour is shared across all of them through a single br* set of flags.

## PGS

- `border`: draws the shared border, on every side by default; what the br* colour utilities recolour.
- `borderBlock`: draws the shared border on both sides of the block axis only.
- `borderInline`: draws the shared border on both sides of the inline axis only.
- `borderTop`: draws the shared border above only.
- `borderRight`: draws the shared border on the right only.
- `borderBottom`: draws the shared border below only.
- `borderLeft`: draws the shared border on the left only.
- `outline`: draws the same line outside the box, taking no space in the layout; the ol* colour utilities recolour it.
- `borderRadius`: applies the standard radius token to any surface, or one of its own two other scales.

## PGS Options (component brackets)

- `brdThin`: inside border's own bracket, draws it at 1px instead of the default 1.5px, on every side.
- `brdThick`: inside border's own bracket, draws it at 3px, on every side.
- `brdThicker`: inside border's own bracket, draws it at 4.5px, on every side.
- `brdblThin`: inside borderBlock's own bracket, draws it on both sides of the block axis, at 1px.
- `brdblThick`: inside borderBlock's own bracket, draws it on both sides of the block axis, at 3px.
- `brdblThicker`: inside borderBlock's own bracket, draws it on both sides of the block axis, at 4.5px.
- `brdiThin`: inside borderInline's own bracket, draws it on both sides of the inline axis, at 1px.
- `brdiThick`: inside borderInline's own bracket, draws it on both sides of the inline axis, at 3px.
- `brdiThicker`: inside borderInline's own bracket, draws it on both sides of the inline axis, at 4.5px.
- `brdtThin`: inside borderTop's own bracket, draws it above only, at 1px.
- `brdtThick`: inside borderTop's own bracket, draws it above only, at 3px.
- `brdtThicker`: inside borderTop's own bracket, draws it above only, at 4.5px.
- `brdrThin`: inside borderRight's own bracket, draws it on the right only, at 1px.
- `brdrThick`: inside borderRight's own bracket, draws it on the right only, at 3px.
- `brdrThicker`: inside borderRight's own bracket, draws it on the right only, at 4.5px.
- `brdbThin`: inside borderBottom's own bracket, draws it below only, at 1px.
- `brdbThick`: inside borderBottom's own bracket, draws it below only, at 3px.
- `brdbThicker`: inside borderBottom's own bracket, draws it below only, at 4.5px.
- `brdlThin`: inside borderLeft's own bracket, draws it on the left only, at 1px.
- `brdlThick`: inside borderLeft's own bracket, draws it on the left only, at 3px.
- `brdlThicker`: inside borderLeft's own bracket, draws it on the left only, at 4.5px.
- `otlThin`: inside outline's own bracket, draws it at 1px instead of the default 1.5px.
- `otlThick`: inside outline's own bracket, draws it at 3px.
- `otlThicker`: inside outline's own bracket, draws it at 4.5px.
- `brPrimary`: recolours the border with the primary colour, whichever border-family bracket carries it.
- `brSecondary`: recolours the border with the secondary colour, whichever border-family bracket carries it.
- `brTertiary`: recolours the border with the tertiary colour, whichever border-family bracket carries it.
- `brQuaternary`: recolours the border with the quaternary colour, whichever border-family bracket carries it.
- `brWhite`: recolours the border white, whichever border-family bracket carries it.
- `brBlack`: recolours the border black, whichever border-family bracket carries it.
- `brBox`: recolours the border with the box surface colour, whichever border-family bracket carries it.
- `brBoxDark`: recolours the border with the dark box surface colour, whichever border-family bracket carries it.
- `brLink`: recolours the border with the link colour, whichever border-family bracket carries it.
- `brInfo`: recolours the border with the info colour, whichever border-family bracket carries it.
- `brError`: recolours the border with the error colour, whichever border-family bracket carries it.
- `brWarning`: recolours the border with the warning colour, whichever border-family bracket carries it.
- `brSuccess`: recolours the border with the success colour, whichever border-family bracket carries it.
- `brGray`: recolours the border gray, whichever border-family bracket carries it.
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

## Related elements

### PGS

- `flex`: provides the flex layout; direction and spacing are flags in its bracket.
- `padding`: applies the shared padding utility to each example.

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

A line drawn on the edge of the box, taking its space in the layout. Each direction is its own root component, named like the margin and padding utilities. Recolour it with a br* utility from Colors — it applies no matter which border-family bracket carries it — and change its weight with a thickness option.

```html
<span pgs="padding border">border</span>
<span pgs="padding border['brPrimary']">border['brPrimary']</span>
<span pgs="padding border['brError']">border['brError']</span>

<span pgs="padding border['brdThin']">thin</span>
<span pgs="padding border['brdThick']">thick</span>
<span pgs="padding border['brdThicker']">thicker</span>

<span pgs="padding borderTop['brdtThin'] border['brPrimary']">borderTop</span>
<span pgs="padding borderRight['brdrThin'] border['brPrimary']">borderRight</span>
<span pgs="padding borderBottom['brdbThin'] border['brPrimary']">borderBottom</span>
<span pgs="padding borderLeft['brdlThin'] border['brPrimary']">borderLeft</span>
<span pgs="padding borderInline['brdiThin'] border['brPrimary']">borderInline</span>
<span pgs="padding borderBlock['brdblThin'] border['brPrimary']">borderBlock</span>
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
