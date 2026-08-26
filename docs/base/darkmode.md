<!-- Automatically generated from reference/html/base/darkmode.html. Edit reference/html/base/darkmode.html and run npm run docs:generate again. -->

# Darkmode

Global light and dark theme switch. The choice is persisted in localStorage under screenIsDarkMode and re-applied to the html element as soon as the bundle is parsed, before the page paints, so a reload never flashes the wrong theme. Every control marked toggleDarkmode flips the theme and stays in sync with the others, and its inner icon is swapped between the built-in icon-moon and icon-sun glyphs automatically, so the control is never blank even with no icon set loaded; the fa-moon and fa-sun classes are still set alongside, for pages that style them. Each switch dispatches pgs:svg:changeColor on the document with detail { isDarkMode }, which is what recolours the SVG and Lottie files; see SVG colors.

## PGS

- `toggleDarkmode`: turns a control into a theme switch; every one of them on the page reflects the same state.

## PGS States

- `darkmode`: applied to the html and body elements while the dark theme is active, and read by the whole colour layer.

## JavaScript API

- `pgs.darkmode.init(root)`: initializes the switches within the specified root, and re-applies the stored theme.

## Related elements

### PGS

- `button`: presents the switch as a button.
- `flexColumn`: stacks the example and its notes vertically.
- `icon`: marks the element the switch draws its glyph on; the library sets icon-moon or icon-sun on it, so it needs no option of your own.

### PGS Options

- `buttonIcon`: presents the switch as an icon-only button.
- `gapTexts`: spaces the example content.

### Other

- `lightmode`: pins a subtree to the light scheme, ignoring this switch; see General.
- `darkmode`: pins a subtree to the dark scheme, ignoring this switch; see General.

## Output

A theme switch, with the event and the storage key it drives.

## JavaScript Usage

```js
/* Re-run it after adding a switch to the page. */
pgs.darkmode.init(document);

/* Dispatched on the document at every switch, and at the initial pass on load. */
document.addEventListener("pgs:svg:changeColor", event => console.log(event.detail.isDarkMode));

/* The persisted choice, should you need to read it yourself. */
localStorage.getItem("screenIsDarkMode");
```


## Example

```html
<div pgs="flexColumn" pgs-option="gapTexts" demo="component" demo-title="Theme switch" demo-description="The icon is swapped by the library, so author it as fa-moon and leave it alone. Several switches can coexist: they all read and write the same stored value.">

    <button pgs="button toggleDarkmode" pgs-option="buttonIcon" type="button" aria-label="Change theme">
        <i pgs="icon"></i>
    </button>

    
</div>
```
