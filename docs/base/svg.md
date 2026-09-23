<!-- Automatically generated from reference/html/base/svg.html. Edit reference/html/base/svg.html and run npm run docs:generate again. -->

# SVG colors

Recolours external SVG and Lottie files when the theme changes, swapping each declared colour pair between its light and dark value. Alongside it, and needing no token at all, every <object type="image/svg+xml"> on the page has its preserveAspectRatio kept in step with the object-fit it is given in CSS — slice for cover, meet for anything else — and re-read whenever the element is resized, so an external SVG crops and scales the way an <img> in the same box would. Both passes need the file to be same-origin, since they reach inside its document.

## PGS

- `svgChangeColor`: marks the file to recolour; its presence in the page also enables the whole recolouring pass.
- `lottieChangeColor`: the same marker for a Lottie player, recoloured from the same --svg-color-N pairs — one shared palette for both.

## PGS States

- `darkmode`: read on the document to decide which side of every colour pair to apply.

## JavaScript API

- `pgs.svg.init(root)`: initializes matching elements within the specified root.

## Related elements

### PGS

- `flex`: provides the flex layout; direction and spacing are flags in its bracket.

### PGS Options (component brackets)

- `column`: stacks the example and its notes vertically.
- `gapTexts`: spaces the example content.

## CSS Variables

- `--svg-color-1`
- `--svg-color-2`

## Output

An external SVG marked for recolouring, with the colour pairs it reads from the document.
## Examples

### Theme-aware SVG

Colours are declared on the document as pairs, light value first and dark value second, and every --svg-color-N from 0 to 19 is read. The file must be same-origin, because the pass rewrites the fill and stroke attributes inside its document. A Lottie player reads the same pairs, marked with lottieChangeColor instead of svgChangeColor.


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
