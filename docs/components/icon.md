<!-- Automatically generated from reference/html/components/icon.html. Edit reference/html/components/icon.html and run npm run docs:generate again. -->

# Icon

The glyphs the library draws itself, as inline SVG rather than a font. The token marks the element as an icon and the option chooses which one. Only the glyphs a component of the library draws on its own are carried inside the stylesheet (the arrows of the accordion, menu and slides, the close buttons, the marks on alerts, toasts and notifications, the search and dark-mode glyphs, the hamburger): they come in with the library, by structure, so a page that never loaded a font or anything else still gets its controls instead of an empty box. The rest of the set lives in the separate myIcons pack, whose stylesheet is loaded next to this one and writes the same option, so `icon['icon-star']` is written the same whichever of the two holds it; the pack holds the carried glyphs too. The same token is yours to write, so an icon you place by hand costs no dependency either. Written on its own, with no option, it draws nothing and only marks the element as an icon: that is how any icon set you bring gets the same box and placement the library gives an <i>, so a span, an svg or a custom element is sized and positioned like one. It is not iconBoxed: that one is the circular surface a glyph can sit inside, this one is the drawing.

## PGS

- `icon`: draws a glyph on the element, taking its size from the font size and its color from the text color, so it follows whatever surrounds it. Set --icon-size on it, or on anything above it, to size a glyph away from the text around it, and --icon-color to paint it away from the text color; both are read with a fallback, so an icon that is given neither keeps following its surroundings.

## PGS Options (component brackets)

- `iconBoxed`: turns the element into the circular surface a glyph sits inside. It is the container and says nothing about what it holds, so a built-in glyph and an icon from any other set sit in it alike.
- `iconMedium`: sets --icon-size to 1.25em, a preset for a glyph that needs to stand out a little more than the size it inherits from the surrounding text.
- `iconLarge`: sets --icon-size to 1.5em, the next preset up from iconMedium, for a glyph that has to stand out clearly from the text around it.
- `icon-chevronDown`: chevron pointing down, for anything that expands in place.
- `icon-check`: tick, for a confirmed or checked state.
- `icon-close`: cross, for dismissing a surface.
- `icon-magnifyingGlass`: magnifying glass, for a search affordance.
- `icon-moon`: crescent moon, the dark half of a theme switch.
- `icon-sun`: sun, the light half of a theme switch.
- `icon-circle`: plain disc, for a step that is only a position in a sequence.
- `icon-circleXmark`: cross inside a disc, the error mark.
- `icon-circleCheck`: tick inside a disc, the success mark.
- `icon-circleInfo`: letter i inside a disc, the information mark.
- `icon-triangleExclamation`: exclamation mark inside a triangle, the warning mark.
- `icon-hamburger`: three horizontal bars, the classic static hamburger menu glyph.
- `icon-hamburgerTwo`: two horizontal bars, a lighter static hamburger menu glyph.

## Related elements

### PGS

- `flex`: provides the flex layout; direction and spacing are flags in its bracket.
- `textColor`: provides the text-color utility used here, to show that a glyph follows the text color.

### PGS Options (component brackets)

- `column`: stacks the groups of examples.
- `row`: lays each group out in a row.
- `gapTexts`: spaces the icons inside a group.
- `wrap`: lets the full set flow onto more rows.
- `txtPrimary`: inside textColor's own bracket, recolors one example.
- `txtError`: inside textColor's own bracket, recolors another the same way.

## CSS Variables

- `--icon-after`
- `--icon-after-color`
- `--icon-before`
- `--icon-before-color`
- `--icon-color`
- `--icon-glyph-check`
- `--icon-glyph-chevronDown`
- `--icon-glyph-circle`
- `--icon-glyph-circleXmark`
- `--icon-glyph-close`
- `--icon-size`

## Output

One example per glyph, the sizing and color behavior, and the surface a glyph sits inside.
## Examples

### The set

The glyphs the library carries because its own components draw them. The token marks the element, the option names the glyph. The rest of the set is in the myIcons pack, written the same way.

```html
<i pgs="icon['icon-chevronDown']"></i>
<i pgs="icon['icon-check']"></i>
<i pgs="icon['icon-close']"></i>
<i pgs="icon['icon-magnifyingGlass']"></i>
<i pgs="icon['icon-moon']"></i>
<i pgs="icon['icon-sun']"></i>
<i pgs="icon['icon-circle']"></i>
<i pgs="icon['icon-circleXmark']"></i>
<i pgs="icon['icon-circleCheck']"></i>
<i pgs="icon['icon-circleInfo']"></i>
<i pgs="icon['icon-triangleExclamation']"></i>
<i pgs="icon['icon-hamburger']"></i>
<i pgs="icon['icon-hamburgerTwo']"></i>
```

### Size and color

A glyph is drawn at the font size of its element and painted in the text color, so it needs no settings of its own: size it and color it the way you would the text around it. iconMedium and iconLarge are presets for a bigger glyph.

```html
<p><i pgs="icon['icon-circleInfo']"></i> Inside a paragraph, matching the text.</p>

<i pgs="icon['iconLarge' 'icon-circleCheck']"></i>
<i pgs="icon['iconMedium' 'icon-circleCheck']"></i>
<i pgs="icon['icon-circleCheck']"></i>

<i pgs="icon['icon-triangleExclamation'] textColor['txtPrimary']"></i>
<i pgs="icon['icon-triangleExclamation'] textColor['txtError']"></i>
<i pgs="icon['icon-triangleExclamation']"></i>
```

### Inside a surface

A glyph placed in iconBoxed, the circular surface that holds one icon.

```html
<i pgs="icon['iconBoxed' 'icon-check']"></i>
<i pgs="icon['iconBoxed' 'icon-close']"></i>
```
