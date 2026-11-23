<!-- Automatically generated from reference/html/base/svg.html. Edit reference/html/base/svg.html and run npm run docs:generate again. -->

# SVG colors

Recolors external SVG and Lottie files when the theme changes, swapping each declared color pair between its light and dark value. One token enables both passes, since they read the same --svg-color-N pairs: any object type="image/svg+xml" and any lottie-player on the page recolor together. Alongside it, and needing no token at all, every <object type="image/svg+xml"> on the page has its preserveAspectRatio kept in step with the object-fit it is given in CSS — slice for cover, meet for anything else — and re-read whenever the element is resized, so an external SVG crops and scales the way an <img> in the same box would. Both passes need the file to be same-origin, since they reach inside its document.

## PGS

- `svgChangeColor`: enables the whole recoloring pass, for every matching object and lottie-player on the page — a Lottie player needs no marker of its own, since there is nothing left to opt out of it independently.

## PGS States

- `darkmode`: read on the html element to decide which side of every color pair to apply.
- `objectLoaded`: written on the body once the first pass has run: until then an external SVG and a Lottie player are held back (transparent), so they do not show with their own colors before they are recolored.

## JavaScript API

- `pgs.svg.init(root)`: keeps the preserveAspectRatio of every object type="image/svg+xml" within root (root included) in step with its object-fit, then runs the recoloring pass, which always covers the whole document.
- `pgs.svg.eventChangeColor`: the name of the event that triggers the recoloring pass, "pgs:svg:changeColor"; darkmode dispatches it on the html element every time it applies the theme, and it bubbles to the document, where the pass listens.
- `pgs.svg.applyColorsSVG(isDarkMode)`: recolors every object type="image/svg+xml" on the page now, to the dark side of each pair when isDarkMode is true and to the light side when false; without the argument it reads the darkmode state of the html element.
- `pgs.svg.applyColorsLottie(isDarkMode)`: the same pass for every lottie-player on the page.

## Related elements

### PGS

- `flex`: provides the flex layout; direction and spacing are flags in its bracket.

### PGS Options (component brackets)

- `column`: stacks the example and its notes vertically.
- `gapParagraphs`: spaces the example content.

## CSS Variables

- `--svg-color-1`
- `--svg-color-2`

## Output

An external SVG marked for recoloring, with the color pairs it reads from the document.

## JavaScript Usage

```js
/* Re-run it after adding an object to the page. */
pgs.svg.init(document);

/* Dispatched by darkmode on the html element every time it applies the theme;
   it bubbles, so a listener on the document hears it. detail: { element, isDarkMode } */
document.addEventListener(pgs.svg.eventChangeColor, event => console.log(event.detail.isDarkMode));

/* Recolor now to a given side, without changing the theme. */
pgs.svg.applyColorsSVG(true);
pgs.svg.applyColorsLottie(true);
```

## Examples

### Theme-aware SVG

Colors are declared on the document as pairs, light value first and dark value second, and every --svg-color-N from 0 to 19 is read. The file must be same-origin, because the pass rewrites the fill and stroke attributes inside its document. The same svgChangeColor token also recolors every lottie-player on the page, from these same pairs.


```html
/* The pairs live on the document, so a single declaration serves every file.
   Each value must match the attribute exactly as written in the file: #000 is
   not the same string as #000000. Avoid mirrored pairs such as
   "#000 & #fff" together with "#fff & #000": every pair is applied in turn to
   the same attribute, so the second would undo the first. */
:root {
    --svg-color-0: #000 & #f5f5f5;
    --svg-color-1: #ffffff & #101010;
    --svg-color-2: #ffb13b & #ffc966;
}
```
