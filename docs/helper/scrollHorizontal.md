<!-- Automatically generated from reference/html/helper/scrollHorizontal.html. Edit reference/html/helper/scrollHorizontal.html and run npm run docs:generate again. -->

# Scroll horizontal

Two variants that turn vertical wheel motion into horizontal scrolling over a container that can still scroll in that direction. scrollHorizontal converts any input device — mouse wheel, trackpad, Magic Mouse. scrollHorizontalWithMouse converts only a plain mouse wheel and leaves a trackpad's own two-finger swipe alone, since it already scrolls horizontally on its own; Slides uses this one internally for slidesScrollMouse.

## JavaScript API

- `pgs.scrollHorizontal(element, speed)`: attaches the wheel listener to element, scaling each wheel step by speed, and returns a function that removes the listener.
- `pgs.scrollHorizontalWithMouse(element, speed)`: same as pgs.scrollHorizontal, but ignores input identified as a trackpad.

## Related elements

### PGS

- `flexRow`: lays the demo items out in a row.
- `overflowXAuto`: adds the horizontal scrolling these examples turn the wheel into.
- `card`: uses the related card component or utility in this example.
- `card-img`: uses the related card-img component or utility in this example.
- `card-content`: groups the textual content of each card.
- `imgCover`: uses the related imgCover component or utility in this example.

### PGS Options

- `gapTexts`: spaces them apart.
- `nowrap`: keeps each row on one line so it actually overflows instead of wrapping.

## Output

Two horizontally-scrolling rows: one where any vertical wheel motion scrolls sideways whatever the input device, one where only a mouse wheel does and a trackpad scrolls it natively.

## Example

## Examples

### Any input device

pgs.scrollHorizontal converts a mouse wheel, a trackpad, or a Magic Mouse alike.

### Mouse only

pgs.scrollHorizontalWithMouse ignores a trackpad or Magic Mouse; only a plain mouse wheel scrolls this row.
