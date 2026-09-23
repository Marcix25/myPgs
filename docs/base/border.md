<!-- Automatically generated from reference/html/base/border.html. Edit reference/html/base/border.html and run npm run docs:generate again. -->

# Border

Border, outline and radius utilities, split out from the general-purpose set since together they cover an entire surface treatment on their own.

## PGS

- `border`: draws the shared border, on every side by default, or on one direction with the option in its bracket; what the br* colour utilities recolour.
- `outline`: draws the same line outside the box, taking no space in the layout; the ol* colour utilities recolour it.
- `borderRadius`: applies the standard radius token to any surface, or one of its own two other scales.

## PGS Options (component brackets)

- `brdThin`: inside border's own bracket, draws it at 1px instead of the default 1.5px, on every side.
- `brdThick`: inside border's own bracket, draws it at 3px, on every side.
- `brdThicker`: inside border's own bracket, draws it at 4.5px, on every side.
- `brdTop`: inside border's own bracket, draws it above only, at the default thickness.
- `brdTopThin`: inside border's own bracket, draws it above only, at 1px.
- `brdTopThick`: inside border's own bracket, draws it above only, at 3px.
- `brdTopThicker`: inside border's own bracket, draws it above only, at 4.5px.
- `brdRight`: inside border's own bracket, draws it on the right only, at the default thickness.
- `brdRightThin`: inside border's own bracket, draws it on the right only, at 1px.
- `brdRightThick`: inside border's own bracket, draws it on the right only, at 3px.
- `brdRightThicker`: inside border's own bracket, draws it on the right only, at 4.5px.
- `brdBottom`: inside border's own bracket, draws it below only, at the default thickness.
- `brdBottomThin`: inside border's own bracket, draws it below only, at 1px.
- `brdBottomThick`: inside border's own bracket, draws it below only, at 3px.
- `brdBottomThicker`: inside border's own bracket, draws it below only, at 4.5px.
- `brdLeft`: inside border's own bracket, draws it on the left only, at the default thickness.
- `brdLeftThin`: inside border's own bracket, draws it on the left only, at 1px.
- `brdLeftThick`: inside border's own bracket, draws it on the left only, at 3px.
- `brdLeftThicker`: inside border's own bracket, draws it on the left only, at 4.5px.
- `brdInline`: inside border's own bracket, draws it on both sides of the inline axis, at the default thickness.
- `brdInlineThin`: inside border's own bracket, draws it on both sides of the inline axis, at 1px.
- `brdInlineThick`: inside border's own bracket, draws it on both sides of the inline axis, at 3px.
- `brdInlineThicker`: inside border's own bracket, draws it on both sides of the inline axis, at 4.5px.
- `brdBlock`: inside border's own bracket, draws it on both sides of the block axis, at the default thickness.
- `brdBlockThin`: inside border's own bracket, draws it on both sides of the block axis, at 1px.
- `brdBlockThick`: inside border's own bracket, draws it on both sides of the block axis, at 3px.
- `brdBlockThicker`: inside border's own bracket, draws it on both sides of the block axis, at 4.5px.
- `otlThin`: inside outline's own bracket, draws it at 1px instead of the default 1.5px.
- `otlThick`: inside outline's own bracket, draws it at 3px.
- `otlThicker`: inside outline's own bracket, draws it at 4.5px.
- `brPrimary`: inside border's own bracket, recolours it with the primary colour.
- `brSecondary`: inside border's own bracket, recolours it with the secondary colour.
- `brTertiary`: inside border's own bracket, recolours it with the tertiary colour.
- `brQuaternary`: inside border's own bracket, recolours it with the quaternary colour.
- `brWhite`: inside border's own bracket, recolours it white.
- `brBlack`: inside border's own bracket, recolours it black.
- `brBox`: inside border's own bracket, recolours it with the box surface colour.
- `brBoxDark`: inside border's own bracket, recolours it with the dark box surface colour.
- `brLink`: inside border's own bracket, recolours it with the link colour.
- `brInfo`: inside border's own bracket, recolours it with the info colour.
- `brError`: inside border's own bracket, recolours it with the error colour.
- `brWarning`: inside border's own bracket, recolours it with the warning colour.
- `brSuccess`: inside border's own bracket, recolours it with the success colour.
- `brGray`: inside border's own bracket, recolours it gray.
- `olPrimary`: inside outline's own bracket, recolours it with the primary colour.
- `olSecondary`: inside outline's own bracket, recolours it with the secondary colour.
- `olTertiary`: inside outline's own bracket, recolours it with the tertiary colour.
- `olQuaternary`: inside outline's own bracket, recolours it with the quaternary colour.
- `olWhite`: inside outline's own bracket, recolours it white.
- `olBlack`: inside outline's own bracket, recolours it black.
- `olBox`: inside outline's own bracket, recolours it with the box surface colour.
- `olBoxDark`: inside outline's own bracket, recolours it with the dark box surface colour.
- `olLink`: inside outline's own bracket, recolours it with the link colour.
- `olInfo`: inside outline's own bracket, recolours it with the info colour.
- `olError`: inside outline's own bracket, recolours it with the error colour.
- `olWarning`: inside outline's own bracket, recolours it with the warning colour.
- `olSuccess`: inside outline's own bracket, recolours it with the success colour.
- `olGray`: inside outline's own bracket, recolours it gray.
- `input`: inside borderRadius's own bracket, uses the smaller radius used by form controls instead of the standard one.
- `external`: inside borderRadius's own bracket, uses the wider radius used by outer containers instead of the standard one.

## Related elements

### PGS

- `flex`: provides the flex layout; direction and spacing are flags in its bracket.
- `padding`: applies the shared padding utility to each example.

### PGS Options (component brackets)

- `column`: stacks the utility groups vertically.
- `row`: arranges the examples in a row.
- `padSections`: inside padding's own bracket, uses the section spacing scale for the radius example's padding.
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

A line drawn on the edge of the box, taking its space in the layout. It comes one side at a time as well, named like the margin and padding utilities. Recolour it with a br* utility from Colors, and change its weight with a thickness option.

```html
<span pgs="padding border">border</span>
<span pgs="padding border['brPrimary']">border['brPrimary']</span>
<span pgs="padding border['brError']">border['brError']</span>

<span pgs="padding border['brdThin']">thin</span>
<span pgs="padding border['brdThick']">thick</span>
<span pgs="padding border['brdThicker']">thicker</span>

<span pgs="padding border['brdTop' 'brPrimary']">borderTop</span>
<span pgs="padding border['brdRight' 'brPrimary']">borderRight</span>
<span pgs="padding border['brdBottom' 'brPrimary']">borderBottom</span>
<span pgs="padding border['brdLeft' 'brPrimary']">borderLeft</span>
<span pgs="padding border['brdInline' 'brPrimary']">borderInline</span>
<span pgs="padding border['brdBlock' 'brPrimary']">borderBlock</span>
```

### Outline

The same line drawn outside the padding  so it takes no space and never moves what sits around it. CSS draws it as a single ring, which is why there is no per-side form. It has its own colour utilities, ol*, and its own thickness options: an element carrying both a border and an outline needs one from each family.

```html
<span pgs="padding outline">outline</span>
<span pgs="padding outline['olPrimary']">outline['olPrimary']</span>
<span pgs="padding outline['olError']">outline['olError']</span>

<span pgs="padding outline['otlThin']">thin</span>
<span pgs="padding outline['otlThick']">thick</span>
<span pgs="padding outline['otlThicker']">thicker</span>
```

### Border radius

Three radius tokens: the standard one, the smaller one used by form controls and the wider one for outer containers.

```html
<span pgs="padding['padSections'] border borderRadius['external']">borderRadius['external']</span>
<span pgs="padding['padSections'] border borderRadius">borderRadius</span>
<span pgs="padding['padSections'] border borderRadius['input']">borderRadius['input']</span>
```
