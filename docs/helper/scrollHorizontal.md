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

```html
<div pgs="flexRow overflowXAuto" pgs-option="gapTexts nowrap" id="pgsScrollDemo" demo="component" demo-code="none" demo-title="Any input device" demo-description="pgs.scrollHorizontal converts a mouse wheel, a trackpad, or a Magic Mouse alike.">
    <article pgs="card" style="flex-shrink: 0; min-width: 180px;">
        <img pgs="card-img imgCover" src="https://placehold.net/600x400.png" alt="Slide 1">
        <div pgs="card-content">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
    </article>

    <article pgs="card" style="flex-shrink: 0; min-width: 180px;">
        <img pgs="card-img imgCover" src="https://placehold.net/600x400.png" alt="Slide 2">
        <div pgs="card-content">
            <p>Sed do eiusmod tempor incididunt ut labore et dolore.</p>
        </div>
    </article>

    <article pgs="card" style="flex-shrink: 0; min-width: 180px;">
        <img pgs="card-img imgCover" src="https://placehold.net/600x400.png" alt="Slide 3">
        <div pgs="card-content">
            <p>Ut enim ad minim veniam, quis nostrud exercitation.</p>
        </div>
    </article>

    <article pgs="card" style="flex-shrink: 0; min-width: 180px;">
        <img pgs="card-img imgCover" src="https://placehold.net/600x400.png" alt="Slide 4">
        <div pgs="card-content">
            <p>Duis aute irure dolor in reprehenderit in voluptate.</p>
        </div>
    </article>
</div>

<div pgs="flexRow overflowXAuto" pgs-option="gapTexts nowrap" id="pgsScrollWithMouseDemo" demo="component" demo-code="none" demo-title="Mouse only" demo-description="pgs.scrollHorizontalWithMouse ignores a trackpad or Magic Mouse; only a plain mouse wheel scrolls this row.">
    <img pgs="imgCover" src="https://placehold.net/600x400.png" alt="Slide 1" style="flex-shrink: 0; border-radius: var(--border-radius);">
    <img pgs="imgCover" src="https://placehold.net/600x400.png" alt="Slide 2" style="flex-shrink: 0; border-radius: var(--border-radius);">
    <img pgs="imgCover" src="https://placehold.net/600x400.png" alt="Slide 3" style="flex-shrink: 0; border-radius: var(--border-radius);">
    <img pgs="imgCover" src="https://placehold.net/600x400.png" alt="Slide 4" style="flex-shrink: 0; border-radius: var(--border-radius);">
    <img pgs="imgCover" src="https://placehold.net/600x400.png" alt="Slide 5" style="flex-shrink: 0; border-radius: var(--border-radius);">
</div>

<script type="module">
    import { pgs } from "mypgs";

    pgs.scrollHorizontal(document.getElementById("pgsScrollDemo"), 5);
    pgs.scrollHorizontalWithMouse(document.getElementById("pgsScrollWithMouseDemo"), 5);
</script>
```
