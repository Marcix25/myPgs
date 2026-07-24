<!-- Automatically generated from reference/html/components/dropdown.html. Edit reference/html/components/dropdown.html and run npm run docs:generate again. -->

# Dropdown

Popup component that connects a control to content positioned relative to its trigger and handles opening, closing, outside clicks, and Escape.

## PGS

- `dropdown`: identifies the container initialized by the dropdown module.
- `dropdown-button`: identifies the control that opens or closes the content.
- `dropdown-content`: identifies the panel positioned relative to the control.

## PGS Options

- `position`: configures the root as position[side alignment]; side accepts top, right, bottom, or left, while compatible alignment values are top, right, bottom, left, or center. The default is bottom center.
- `buttonReverse`: reverses text and icon on the example buttons and belongs to the button component.

## PGS States

- `open`: indicates that the dropdown is open and its content is visible.

## JavaScript API

- `pgs.dropdown.init(root)`: initializes unregistered dropdowns within the specified Document or Element.
- `pgs.dropdown.api(element)`: returns the instance associated with an initialized dropdown root.
- `instance.open()`: opens the dropdown and closes any other open dropdowns.
- `instance.close()`: closes the current dropdown.
- `instance.toggle()`: toggles between the open and closed states.
- `instance.refresh()`: reinitializes the context and recalculates content positioning.
- `instance.isOpen()`: returns true when the dropdown is open.

## Related elements

- `flexRow`: arranges the placement examples on the same flexible row.
- `button`: applies standard styling to dropdown controls.

## Output

Series of HTML dropdowns demonstrating the supported placement directions.

## Example

```html
<div pgs="flexRow">

    <span pgs="dropdown">
        <button pgs="dropdown-button button" pgs-option="buttonReverse" type="button">
            Bottom center
            <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
        </button>

        <div pgs="dropdown-content">
            bottom center content
        </div>
    </span>

    <span pgs="dropdown" pgs-option="position[top left]">
        <button pgs="dropdown-button button" pgs-option="buttonReverse" type="button">
            Top left
            <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
        </button>

        <div pgs="dropdown-content">
            top left content
        </div>
    </span>

    <span pgs="dropdown" pgs-option="position[top center]">
        <button pgs="dropdown-button button" pgs-option="buttonReverse" type="button">
            Top center
            <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
        </button>

        <div pgs="dropdown-content">
            top center content
        </div>
    </span>

    <span pgs="dropdown" pgs-option="position[top right]">
        <button pgs="dropdown-button button" pgs-option="buttonReverse" type="button">
            Top right
            <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
        </button>

        <div pgs="dropdown-content">
            top right content
        </div>
    </span>

    <span pgs="dropdown" pgs-option="position[bottom left]">
        <button pgs="dropdown-button button" pgs-option="buttonReverse" type="button">
            Bottom left
            <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
        </button>

        <div pgs="dropdown-content">
            bottom left content
        </div>
    </span>

    <span pgs="dropdown" pgs-option="position[bottom right]">
        <button pgs="dropdown-button button" pgs-option="buttonReverse" type="button">
            Bottom right
            <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
        </button>

        <div pgs="dropdown-content">
            bottom right content
        </div>
    </span>

    <span pgs="dropdown" pgs-option="position[left center]">
        <button pgs="dropdown-button button" pgs-option="buttonReverse" type="button">
            Left center
            <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
        </button>

        <div pgs="dropdown-content">
            left center content
        </div>
    </span>

    <span pgs="dropdown" pgs-option="position[right center]">
        <button pgs="dropdown-button button" pgs-option="buttonReverse" type="button">
            Right center
            <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
        </button>

        <div pgs="dropdown-content">
            right center content
        </div>
    </span>

</div>
```
