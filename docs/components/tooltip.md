<!-- Automatically generated from reference/html/components/tooltip.html. Edit reference/html/components/tooltip.html and run npm run docs:generate again. -->

# Tooltip

Tooltip markup, configuration, behavior, and usage example.

## PGS

- `tooltip`: identifies the tooltip element used by Tooltip.
- `tooltip-button`: identifies the tooltip-button element used by Tooltip.
- `tooltip-content`: identifies the tooltip-content element used by Tooltip.

## PGS Options

- `position`: identifies the position element used by Tooltip.
- `buttonMini`: applies the smallest button variant to the tooltip trigger.

## PGS States

- `open`: identifies the open element used by Tooltip.

## JavaScript API

- `pgs.dropdown.init(root)`: initializes matching elements within the specified root.
- `pgs.dropdown.api(element)`: returns the instance associated with the specified initialized element.
- `instance.open()`: opens the component.
- `instance.close()`: closes the component.
- `instance.toggle()`: toggles the component state.
- `instance.refresh()`: refreshes the component and returns its updated instance.
- `instance.isOpen()`: returns true when the component is open.

## Related elements

- `button`: provides the base styling for the tooltip trigger.
- `dropdown`: uses the related dropdown component or utility in this example.
- `dropdown-button`: uses the related dropdown-button component or utility in this example.
- `dropdown-content`: uses the related dropdown-content component or utility in this example.

## Output

Complete HTML markup and usage example for Tooltip.

## Example

```html
<span pgs="dropdown tooltip">
    <button pgs="dropdown-button button tooltip-button" pgs-option="buttonMini" title="open-tooltip" type="button">
        <i class="fa-solid fa-info"></i>
    </button>
    <div pgs="dropdown-content tooltip-content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto hic, id consectetur facilis et, iste animi minima quidem praesentium omnis quod. Quidem provident ad cum aut reprehenderit laboriosam eum placeat.
    </div>
</span>
```
