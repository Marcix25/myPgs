<!-- Automatically generated from reference/html/components/summary.html. Edit reference/html/components/summary.html and run npm run docs:generate again. -->

# Summary

Long content collapsed to a few lines, with a button that expands it. The module measures the content against the collapsed height, --summary-lines lines of text (3 by default), and only shows the button when there is something hidden: content that already fits keeps the button out of the page and out of the accessibility tree, so nothing offers to expand what is fully visible. The summary-button is required: a summary without one is skipped, with a warning in the console. The two labels of that button come from the summaryShowMore and summaryShowLess data keys, then from the options passed to init, then from the English defaults.

## PGS

- `summary`: identifies the root the module initializes, and the element the instance is stored against.
- `summary-content`: the collapsed content, cut to --summary-lines lines while it is closed.
- `summary-button`: the control that expands and collapses the content. Required, as a direct child of the summary, so you place it yourself: markup without it is skipped with a warning in the console.

## PGS Data

- `summaryShowMore`: defines the collapsed button text through `summaryShowMore[...]`.
- `summaryShowLess`: defines the expanded button text through `summaryShowLess[...]`.

## PGS States

- `overflow`: written by the module while the content is taller than its collapsed height, which is also what decides whether the button is shown at all.
- `open`: written while the content is expanded.

## JavaScript API

- `pgs.summary.init(root, options)`: initializes the summaries within the specified Document or Element, including the element itself when it is a summary; missing `pgs-data` texts use `options.message.showMore` and `options.message.showLess`, then the English library defaults. Throws a TypeError when options is not an object, or when options.message is not an object of strings with only the keys showMore and showLess.
- `pgs.summary.api(element)`: returns the instance associated with the specified initialized element.
- `instance.open()`: expands the content.
- `instance.close()`: collapses the content.
- `instance.toggle()`: expands the content, or collapses it when it is already expanded.
- `instance.refresh()`: destroys the instance and initializes this summary again, which measures the content from scratch, then returns the new instance. It keeps the summary open or closed as it was.
- `instance.destroy()`: releases the click listener and the resize observer of this summary and forgets its instance. The markup and its state stay as they are.
- `instance.isOpen()`: returns true while the content is expanded.

## CSS Variables

- `--summary-fade-background`
- `--summary-fade-size`
- `--summary-lines`

## Output

Complete HTML markup and usage example for Summary.

## Example

```html
<div pgs="summary" pgs-data="summaryShowMore[Show more] summaryShowLess[Show less]">
    <div pgs="summary-content">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam eligendi incidunt veritatis reprehenderit saepe, doloribus dolore sapiente quod animi tempora provident omnis placeat enim temporibus! Quae nam quas voluptatem quos in exercitationem minima modi optio, voluptates praesentium voluptas incidunt neque animi voluptatibus? Magni voluptatem blanditiis vitae fuga nihil assumenda ab, quaerat asperiores. Quaerat magni, unde blanditiis facere autem praesentium impedit porro laudantium ut cupiditate sed culpa beatae tempora voluptatum quasi molestias molestiae aliquid nesciunt illum non distinctio corporis. Aliquid aperiam dolore alias unde, reiciendis fuga id numquam temporibus facere eius quasi, consectetur perspiciatis sint distinctio culpa nulla animi obcaecati beatae, harum delectus hic! Et, maiores. Et, veritatis saepe cumque vel, in pariatur distinctio aspernatur quasi dolores officia odit possimus adipisci ad assumenda architecto voluptates impedit autem, facilis est magnam. Voluptatibus veritatis vel cupiditate nesciunt molestiae corrupti quibusdam. Eos deserunt mollitia laborum ea quidem reprehenderit illo optio. Repudiandae harum ad explicabo illo, itaque repellendus porro quidem, magnam assumenda debitis quae saepe magni aperiam sint natus reprehenderit vel recusandae amet! Ratione sint consectetur voluptatum itaque exercitationem error modi voluptas, in veritatis perspiciatis ea, qui veniam id dolorem fuga! Modi, reprehenderit vitae eius similique dolor neque delectus in assumenda blanditiis provident! Consequatur, magnam!</p>
    </div>

    <button pgs="summary-button" type="button">
        Show more
    </button>
</div>
```
