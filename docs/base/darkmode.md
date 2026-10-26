<!-- Automatically generated from reference/html/base/darkmode.html. Edit reference/html/base/darkmode.html and run npm run docs:generate again. -->

# Darkmode

Global light and dark theme switch. The choice is persisted in localStorage under screenIsDarkMode and re-applied to the html element as soon as the bundle is parsed, before the page paints, so a reload never flashes the wrong theme. Every control marked toggleDarkmode flips the theme and stays in sync with the others. The library draws no icon on it: the control holds one icon per theme, a toggleDarkmode-light and a toggleDarkmode-dark, from any icon set, and the stylesheet shows the one of the current theme and hides the other. Each switch dispatches pgs:svg:changeColor on the document with detail { isDarkMode }, which is what recolors the SVG and Lottie files; see SVG colors.

## PGS

- `toggleDarkmode`: turns a control into a theme switch; every one of them on the page reflects the same state.
- `toggleDarkmode-light`: write it yourself inside a switch: the icon for the light theme, from any icon set (an icon, an svg, an image, text). It is shown while the page is light and hidden while it is dark.
- `toggleDarkmode-dark`: the icon for the dark theme, shown while the page is dark and hidden while it is light. Write both: the stylesheet hides the one that does not match the theme from the html element before the first paint, so a reload never shows two, and a switch with neither draws nothing.

## PGS Options (component brackets)

- `tglLabeled`: writes the theme the click leads to next to the glyph, "Dark mode" while the page is light and "Light mode" while it is dark. It reads the theme from the html element rather than the glyph on the button, so it keeps working whatever icon set drew it; retitle or translate it with --darkmode-label-toDark and --darkmode-label-toLight, whose values are CSS strings, quotes included.

## PGS States

- `darkmode`: applied to the html and body elements while the dark theme is active, and read by the whole color layer.

## JavaScript API

- `pgs.darkmode.init(root)`: initializes the switches within the specified root that are not bound yet. Switches that are already bound, and the theme itself, are left untouched.

## Related elements

### PGS

- `flex`: provides the flex layout; direction and spacing are flags in its bracket.
- `button`: presents the switch as a button.
- `icon`: draws the glyph of each theme's icon here, when it comes from the built-in set; an icon from another set is written with its own markup.

### PGS Options (component brackets)

- `btnIconOnly`: presents the switch as an icon-only button.
- `column`: stacks the example and its notes vertically.
- `gapTexts`: spaces the example content.
- `icon-sun`: the glyph of the dark theme in the examples.
- `icon-moon`: the glyph of the light theme in the examples.

### Other

- `lightmode`: pins a subtree to the light scheme, ignoring this switch; see General.
- `darkmode`: pins a subtree to the dark scheme, ignoring this switch; see General.

## CSS Variables

- `--darkmode-label-toDark`
- `--darkmode-label-toLight`

## Output

A theme switch, with the event and the storage key it drives.

## JavaScript Usage

```js
/* Re-run it after adding a switch to the page. */
pgs.darkmode.init(document);

/* Dispatched on the html element (it bubbles to the document) at every switch, and at the initial pass on load; event.detail is { element, isDarkMode }. */
document.addEventListener("pgs:svg:changeColor", event => console.log(event.detail.isDarkMode));

/* The persisted choice, should you need to read it yourself. */
localStorage.getItem("screenIsDarkMode");
```

## Examples

### Theme switch

A switch holds one icon per theme, toggleDarkmode-light and toggleDarkmode-dark: the stylesheet shows the one of the current theme and hides the other, so the icon is yours, from any set. Here the moon is the light theme's and the sun the dark theme's, so each one shows the theme the click leads to. Several switches can coexist: they all read and write the same stored value.

```html
<button pgs="button['btnIconOnly'] toggleDarkmode" type="button" aria-label="Change theme">
    <i pgs="toggleDarkmode-light icon['icon-moon']" aria-hidden="true"></i>
    <i pgs="toggleDarkmode-dark icon['icon-sun']" aria-hidden="true"></i>
</button>
```

### Labeled switch

tglLabeled adds the written label, so the control says where the click leads instead of relying on the glyph alone. Override --darkmode-label-toDark and --darkmode-label-toLight to write it in another language: both take a CSS string, quotes included.

```html
<button pgs="button toggleDarkmode['tglLabeled']" type="button" aria-label="Change theme">
    <i pgs="toggleDarkmode-light icon['icon-moon']" aria-hidden="true"></i>
    <i pgs="toggleDarkmode-dark icon['icon-sun']" aria-hidden="true"></i>
</button>
```
