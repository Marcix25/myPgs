<!-- Automatically generated from reference/html/components/dropdown.html. Edit reference/html/components/dropdown.html and run npm run docs:generate again. -->

# Dropdown

Popup component that connects a control to content positioned relative to its trigger and handles opening, closing, outside clicks, and Escape.

## PGS

- `dropdown`: identifies the container initialized by the dropdown module.
- `dropdown-button`: identifies the control that opens or closes the content.
- `dropdown-content`: identifies the panel positioned relative to the control.

## PGS Options

- `dropdownHover`: opens the dropdown when the pointer enters its trigger and closes it after the pointer leaves; click and keyboard activation remain available.
- `dropdownPosition`: configures the root as dropdownPosition[side alignment]; side accepts top, right, bottom, or left, while compatible alignment values are top, right, bottom, left, or center. The default is bottom center.

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

### PGS

- `flexRow`: arranges the placement examples on the same flexible row.
- `button`: applies standard styling to dropdown controls.
- `icon`: draws the glyphs this example shows; see Icon for the whole set.

### PGS Options

- `buttonReverse`: reverses text and icon on the example buttons and belongs to the button component.
- `icon-chevronDown`: the glyph that says this button opens something.

## CSS Variables

- `--dropdown-background`
- `--dropdown-border`
- `--dropdown-borderRadius`
- `--dropdown-color`
- `--dropdown-display`
- `--dropdown-inline-size`
- `--dropdown-left`
- `--dropdown-max-inline-size`
- `--dropdown-padding`
- `--dropdown-top`

## Output

Series of HTML dropdowns demonstrating the supported placement directions.

## Example

### Bottom center

Default dropdown placement, opened below and centered on its trigger.

```html
<span pgs="dropdown">
    <button pgs="dropdown-button button" pgs-option="buttonReverse" type="button">
        Bottom center
        <i pgs="icon" pgs-option="icon-chevronDown" aria-hidden="true"></i>
    </button>

    <div pgs="dropdown-content">
        bottom center content
    </div>
</span>
```

### Hover

Opens when the pointer enters the trigger and closes after it leaves.

```html
<span pgs="dropdown" pgs-option="dropdownHover">
    <button pgs="dropdown-button button" pgs-option="buttonReverse" type="button">
        Hover
        <i pgs="icon" pgs-option="icon-chevronDown" aria-hidden="true"></i>
    </button>

    <div pgs="dropdown-content">
        hover content
    </div>
</span>
```

### Top left

Dropdown content positioned above the trigger, aligned to the left.

```html
<span pgs="dropdown" pgs-option="dropdownPosition[top left]">
    <button pgs="dropdown-button button" pgs-option="buttonReverse" type="button">
        Top left
        <i pgs="icon" pgs-option="icon-chevronDown" aria-hidden="true"></i>
    </button>

    <div pgs="dropdown-content">
        top left content
    </div>
</span>
```

### Top center

Dropdown content positioned above the trigger, centered.

```html
<span pgs="dropdown" pgs-option="dropdownPosition[top center]">
    <button pgs="dropdown-button button" pgs-option="buttonReverse" type="button">
        Top center
        <i pgs="icon" pgs-option="icon-chevronDown" aria-hidden="true"></i>
    </button>

    <div pgs="dropdown-content">
        top center content
    </div>
</span>
```

### Top right

Dropdown content positioned above the trigger, aligned to the right.

```html
<span pgs="dropdown" pgs-option="dropdownPosition[top right]">
    <button pgs="dropdown-button button" pgs-option="buttonReverse" type="button">
        Top right
        <i pgs="icon" pgs-option="icon-chevronDown" aria-hidden="true"></i>
    </button>

    <div pgs="dropdown-content">
        top right content
    </div>
</span>
```

### Bottom left

Dropdown content positioned below the trigger, aligned to the left.

```html
<span pgs="dropdown" pgs-option="dropdownPosition[bottom left]">
    <button pgs="dropdown-button button" pgs-option="buttonReverse" type="button">
        Bottom left
        <i pgs="icon" pgs-option="icon-chevronDown" aria-hidden="true"></i>
    </button>

    <div pgs="dropdown-content">
        bottom left content
    </div>
</span>
```

### Bottom right

Dropdown content positioned below the trigger, aligned to the right.

```html
<span pgs="dropdown" pgs-option="dropdownPosition[bottom right]">
    <button pgs="dropdown-button button" pgs-option="buttonReverse" type="button">
        Bottom right
        <i pgs="icon" pgs-option="icon-chevronDown" aria-hidden="true"></i>
    </button>

    <div pgs="dropdown-content">
        bottom right content
    </div>
</span>
```

### Left center

Dropdown content positioned to the left of the trigger, vertically centered.

```html
<span pgs="dropdown" pgs-option="dropdownPosition[left center]">
    <button pgs="dropdown-button button" pgs-option="buttonReverse" type="button">
        Left center
        <i pgs="icon" pgs-option="icon-chevronDown" aria-hidden="true"></i>
    </button>

    <div pgs="dropdown-content">
        left center content
    </div>
</span>
```

### Right center

Dropdown content positioned to the right of the trigger, vertically centered.

```html
<span pgs="dropdown" pgs-option="dropdownPosition[right center]">
    <button pgs="dropdown-button button" pgs-option="buttonReverse" type="button">
        Right center
        <i pgs="icon" pgs-option="icon-chevronDown" aria-hidden="true"></i>
    </button>

    <div pgs="dropdown-content">
        right center content
    </div>
</span>
```
