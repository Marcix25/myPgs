<!-- Automatically generated from reference/html/base/border.html. Edit reference/html/base/border.html and run npm run docs:generate again. -->

# Border

Border, outline and radius utilities, split out from the general-purpose set since together they cover an entire surface treatment on their own.

## PGS

- `border`: draws the shared border on every side, and is what the br* colour utilities recolour.
- `borderTop`: draws it above only.
- `borderRight`: draws it on the right only.
- `borderBottom`: draws it below only.
- `borderLeft`: draws it on the left only.
- `borderInline`: draws it on both sides of the inline axis.
- `borderBlock`: draws it on both sides of the block axis.
- `outline`: draws the same line outside the box, taking no space in the layout; the ol* colour utilities recolour it.
- `borderRadius`: applies the standard radius token to any surface.
- `borderRadiusInput`: applies the smaller radius used by form controls.
- `borderRadiusExternal`: applies the wider radius used by outer containers.

## PGS Options

- `borderThin`: draws the border at 1px instead of the default 1.5px.
- `borderThick`: draws the border at 3px.
- `borderThicker`: draws the border at 4.5px.
- `outlineThin`: draws the outline at 1px instead of the default 1.5px.
- `outlineThick`: draws the outline at 3px.
- `outlineThicker`: draws the outline at 4.5px.

## Related elements

### PGS

- `flexColumn`: stacks the utility groups vertically.
- `flexRow`: arranges the examples in a row.
- `padding`: applies the shared padding utility to each example.
- `brPrimary`: recolours the border with the primary colour; see Colors for the whole br* family.
- `brError`: recolours the border with the error colour.
- `olPrimary`: recolours the outline with the primary colour; see Colors for the whole ol* family.
- `olError`: recolours the outline with the error colour.

### PGS Options

- `paddingSections`: uses the section spacing scale for the radius example's padding.
- `wrap`: lets the border and outline examples flow onto a second row.
- `gapTexts`: spaces the examples inside a group.
- `gapSections`: separates the groups.

## CSS Variables

- `--border-box`
- `--border-box-transparent`
- `--border-color`
- `--border-complete`
- `--border-radius`
- `--border-radius-external`
- `--border-radius-input`
- `--border-style`
- `--border-width`

## Output

One example per utility, grouped by border, outline and radius.

## Example

## Examples

### Border

A line drawn on the edge of the box, taking its space in the layout. It comes one side at a time as well, named like the margin and padding utilities. Recolour it with a br* utility from Colors, and change its weight with a thickness option.

```html
<span pgs="padding border">border</span>
<span pgs="padding border brPrimary">border + brPrimary</span>
<span pgs="padding border brError">border + brError</span>

<span pgs="padding border" pgs-option="borderThin">borderThin</span>
<span pgs="padding border" pgs-option="borderThick">borderThick</span>
<span pgs="padding border" pgs-option="borderThicker">borderThicker</span>

<span pgs="padding borderTop brPrimary">borderTop</span>
<span pgs="padding borderRight brPrimary">borderRight</span>
<span pgs="padding borderBottom brPrimary">borderBottom</span>
<span pgs="padding borderLeft brPrimary">borderLeft</span>
<span pgs="padding borderInline brPrimary">borderInline</span>
<span pgs="padding borderBlock brPrimary">borderBlock</span>
```

### Outline

The same line drawn outside the padding  so it takes no space and never moves what sits around it. CSS draws it as a single ring, which is why there is no per-side form. It has its own colour utilities, ol*, and its own thickness options: an element carrying both a border and an outline needs one from each family.

```html
<span pgs="padding outline">outline</span>
<span pgs="padding outline olPrimary">outline + olPrimary</span>
<span pgs="padding outline olError">outline + olError</span>

<span pgs="padding outline" pgs-option="outlineThin">outlineThin</span>
<span pgs="padding outline" pgs-option="outlineThick">outlineThick</span>
<span pgs="padding outline" pgs-option="outlineThicker">outlineThicker</span>
```

### Border radius

Three radius tokens: the standard one, the smaller one used by form controls and the wider one for outer containers.

```html
<span pgs="padding border borderRadiusExternal" pgs-option="paddingSections">borderRadiusExternal</span>
<span pgs="padding border borderRadius" pgs-option="paddingSections">borderRadius</span>
<span pgs="padding border borderRadiusInput" pgs-option="paddingSections">borderRadiusInput</span>
```
