<!-- Automatically generated from templates/html/components/summary.html. Edit templates/html/components/summary.html and run npm run docs:generate again. -->

# Summary

Summary markup, configuration, behavior, and usage example.

## PGS

- `summary`: identifies the summary element used by Summary.
- `summary-content`: identifies the summary-content element used by Summary.
- `summary-button`: identifies the summary-button element used by Summary.

## PGS States

- `overflow`: identifies the overflow element used by Summary.
- `open`: identifies the open element used by Summary.

## JavaScript API

- `pgs.summary.init(root)`: initializes matching elements within the specified root.
- `pgs.summary.api(element)`: returns the instance associated with the specified initialized element.
- `instance.open()`: opens the component.
- `instance.close()`: closes the component.
- `instance.toggle()`: toggles the component state.
- `instance.refresh()`: refreshes the component and returns its updated instance.
- `instance.isOpen()`: returns true when the component is open.

## Output

Complete HTML markup and usage example for Summary.

## Example

```html
<div pgs="summary">
    <div pgs="summary-content">
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
