<!-- Automatically generated from reference/html/components/accordion.html. Edit reference/html/components/accordion.html and run npm run docs:generate again. -->

# Accordion

Interactive component that expands one panel at a time while synchronizing visibility, ARIA attributes, and keyboard navigation.

## PGS

- `accordion`: identifies each expandable element initialized by the JavaScript module.
- `accordion-button`: identifies the control that opens or closes the associated panel.
- `accordion-content`: identifies the content panel managed through the hidden attribute.

## PGS States

- `open`: indicates the accordion element that is currently open and visible.

## JavaScript API

- `pgs.accordion.init(root)`: initializes unregistered accordions within the specified Document or Element.
- `pgs.accordion.api(element)`: returns the instance associated with an initialized accordion root.
- `instance.open()`: opens the panel and closes any other accordions on the page.
- `instance.close()`: closes the current panel.
- `instance.toggle()`: toggles the panel between its open and closed states.
- `instance.refresh()`: reruns initialization within the accordion container and returns the instance.
- `instance.isOpen()`: returns true when the open state is active.

## Related elements

### PGS

- `flexColumn`: applies text spacing between the list items.

## Output

HTML list of accessible accordion items with an associated button and panel.

## Example

```html
<ul pgs="flexColumn">
    <li pgs="accordion">
        <button pgs="accordion-button" type="button">
            <span>Frequently asked question</span>
        </button>

        <div pgs="accordion-content" hidden>
            <p>Example answer with reusable text content.</p>
        </div>
    </li>

    <li pgs="accordion">
        <button pgs="accordion-button" type="button">
            <span>Second section</span>
        </button>

        <div pgs="accordion-content" hidden>
            <p>Additional accordion panel content.</p>
        </div>
    </li>
</ul>
```
