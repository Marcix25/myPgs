<!-- Automatically generated from reference/html/components/summary.html. Edit reference/html/components/summary.html and run npm run docs:generate again. -->

# Summary

Long content collapsed to a few lines, with a button that expands it. The module measures the content against the collapsed height set by --summary-content-max-height and only shows the button when there is something hidden: content that already fits keeps the button out of the page and out of the accessibility tree, so nothing offers to expand what is fully visible. A button written in the markup is used as is; without one the module generates it, and its two labels come from the showMore and showLess options, then from the options passed to init, then from the English defaults.

## PGS

- `summary`: identifies the root the module initializes, and the element the instance is stored against.
- `summary-content`: the collapsed content, cut to --summary-content-max-height while it is closed.
- `summary-button`: the control that expands and collapses the content. Write it to place it yourself; leave it out and the module generates one.

## PGS Data

- `showMore`: defines the collapsed button text through `showMore[...]`.
- `showLess`: defines the expanded button text through `showLess[...]`.

## PGS States

- `overflow`: written by the module while the content is taller than its collapsed height, which is also what decides whether the button is shown at all.
- `open`: written while the content is expanded.

## JavaScript API

- `pgs.summary.init(root, options)`: initializes matching elements; missing `pgs-data` texts use `options.message.showMore` and `options.message.showLess`, then the English library defaults.
- `pgs.summary.api(element)`: returns the instance associated with the specified initialized element.
- `instance.open()`: expands the content.
- `instance.close()`: collapses the content.
- `instance.toggle()`: expands the content, or collapses it when it is already expanded.
- `instance.refresh()`: measures the content again and returns the instance, after the text or the width has changed.
- `instance.isOpen()`: returns true while the content is expanded.

## CSS Variables

- `--summary-content-max-height`
- `--summary-fade-background`
- `--summary-fade-size`

## Output

Complete HTML markup and usage example for Summary.

## Example

```html
<div pgs="summary" pgs-data="showMore[Show more] showLess[Show less]">
    <div pgs="summary-content">
        <p>
            This demonstration text is long enough to span multiple lines and show the summary component behavior. Content can include text, links, and other inline elements without requiring additional markup.
        </p>
        <p>
            When content exceeds three lines, a button is shown to expand or collapse the visible area.
        </p>
        <p>
            This demonstration text is long enough to span multiple lines and show the summary component behavior. Content can include text, links, and other inline elements without requiring additional markup.
        </p>
        <p>
            When content exceeds three lines, a button is shown to expand or collapse the visible area.
        </p>
    </div>

    <button pgs="summary-button" type="button">
        Show more
    </button>
</div>
```
