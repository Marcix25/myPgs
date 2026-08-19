<!-- Automatically generated from reference/html/components/slides.html. Edit reference/html/components/slides.html and run npm run docs:generate again. -->

# Slides

Slides markup, configuration, behavior, and usage example.

## PGS

- `slides`: identifies the slides element used by Slides.
- `slides-container`: identifies the slides-container element used by Slides.
- `slides-container-slide`: identifies each direct slide item.
- `slides-prec`: identifies the slides-prec element used by Slides.
- `slides-next`: identifies the slides-next element used by Slides.
- `slides-dots`: identifies the slides-dots element used by Slides.

## PGS Options

- `singleScroll`: identifies the singleScroll element used by Slides.
- `shadowDesktop`: identifies the shadowDesktop element used by Slides.
- `notScrollAnimation`: identifies the notScrollAnimation element used by Slides.
- `notScrollWithMouse`: identifies the notScrollWithMouse element used by Slides.
- `buttonIcon`: styles the previous and next actions generated at runtime.

## JavaScript API

- `pgs.slides.init(root)`: initializes matching elements within the specified root.
- `pgs.slides.api(element)`: returns the instance associated with the specified initialized element.
- `instance.previous()`: moves to the previous item.
- `instance.next()`: moves to the next item.
- `instance.goTo(index)`: provides the documented operation through the component public API.
- `instance.getCurrentIndexes()`: provides the documented operation through the component public API.
- `instance.getCurrentElements()`: provides the documented operation through the component public API.
- `instance.getTotal()`: returns the total number of items.
- `instance.isAtStart()`: provides the documented operation through the component public API.
- `instance.isAtEnd()`: provides the documented operation through the component public API.
- `instance.refresh()`: refreshes the component and returns its updated instance.

## Related elements

- `card`: uses the related card component or utility in this example.
- `card-img`: uses the related card-img component or utility in this example.
- `card-content`: groups the textual content of each slide card.
- `imgCover`: uses the related imgCover component or utility in this example.

## Output

Complete HTML markup and usage example for Slides.

## Example

```html
<div pgs="slides" pgs-option="singleScroll shadowDesktop">
    <ul pgs="slides-container">
        <li pgs="slides-container-slide">
            <article pgs="card">
                <img pgs="card-img imgCover" src="https://placehold.net/600x400.png" alt="Slide 1">
                <div pgs="card-content">
                    <h3>Slide uno</h3>
                    <p>First slide content.</p>
                </div>
            </article>
        </li>

        <li pgs="slides-container-slide">
            <article pgs="card">
                <img pgs="card-img imgCover" src="https://placehold.net/600x400.png" alt="Slide 2">
                <div pgs="card-content">
                    <h3>Slide due</h3>
                    <p>Second slide content.</p>
                </div>
            </article>
        </li>

        <li pgs="slides-container-slide">
            <article pgs="card">
                <img pgs="card-img imgCover" src="https://placehold.net/600x400.png" alt="Slide 3">
                <div pgs="card-content">
                    <h3>Slide tre</h3>
                    <p>Third slide content.</p>
                </div>
            </article>
        </li>
    </ul>
</div>
```
