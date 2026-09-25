<!-- Automatically generated from reference/html/components/dropdown.html. Edit reference/html/components/dropdown.html and run npm run docs:generate again. -->

# Dropdown

Popup component that connects a control to content positioned relative to its trigger and handles opening, closing, outside clicks, and Escape.

## PGS

- `dropdown`: identifies the container initialized by the dropdown module.
- `dropdown-button`: identifies the control that opens or closes the content.
- `dropdown-content`: identifies the panel positioned relative to the control.

## PGS Options (component brackets)

- `drpNotArrow`: removes the small arrow every dropdown draws on its content by default. The arrow points back at the trigger on whichever side the content was placed, and follows it even when the viewport pushes the content off-centre.
- `drpHover`: opens the dropdown when the pointer enters its trigger and closes it after the pointer leaves; click and keyboard activation remain available.

## PGS Data

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

- `button`: applies standard styling to dropdown controls.
- `icon`: draws the glyphs this example shows; see Icon for the whole set.

### PGS Options (component brackets)

- `btnReverse`: reverses text and icon on the example buttons and belongs to the button component.
- `icon-chevronDown`: the glyph that says this button opens something.

### Other

- `flex`: provides the flex layout; direction and spacing are flags in its bracket.
- `row`: arranges the placement examples on the same flexible row.

## CSS Variables

- `--dropdown-arrow-size`
- `--dropdown-background`
- `--dropdown-border`
- `--dropdown-borderRadius`
- `--dropdown-color`
- `--dropdown-display`
- `--dropdown-inline-size`
- `--dropdown-max-inline-size`
- `--dropdown-padding`

## Output

Series of HTML dropdowns demonstrating the supported placement directions.
## Examples

### Bottom center

Default dropdown placement, opened below and centered on its trigger.

```html
<span pgs="dropdown">
    <button pgs="dropdown-button button['btnReverse']" type="button">
        Bottom center
        <i pgs="icon['icon-chevronDown']" aria-hidden="true"></i>
    </button>

    <div pgs="dropdown-content">
        bottom center content
    </div>
</span>
```

### Hover

Opens when the pointer enters the trigger and closes after it leaves.

```html
<span pgs="dropdown['drpHover']">
    <button pgs="dropdown-button button['btnReverse']" type="button">
        Hover
        <i pgs="icon['icon-chevronDown']" aria-hidden="true"></i>
    </button>

    <div pgs="dropdown-content">
        hover content
    </div>
</span>
```

### Without arrow

drpNotArrow removes the arrow that points the content back at its trigger.

```html
<span pgs="dropdown['drpNotArrow']">
    <button pgs="dropdown-button button['btnReverse']" type="button">
        Without arrow
        <i pgs="icon['icon-chevronDown']" aria-hidden="true"></i>
    </button>

    <div pgs="dropdown-content">
        content without arrow
    </div>
</span>
```

### Top left

Dropdown content positioned above the trigger, aligned to the left.

```html
<span pgs="dropdown" pgs-data="dropdownPosition[top left]">
    <button pgs="dropdown-button button['btnReverse']" type="button">
        Top left
        <i pgs="icon['icon-chevronDown']" aria-hidden="true"></i>
    </button>

    <div pgs="dropdown-content">
        top left content
    </div>
</span>
```

### Top center

Dropdown content positioned above the trigger, centered.

```html
<span pgs="dropdown" pgs-data="dropdownPosition[top center]">
    <button pgs="dropdown-button button['btnReverse']" type="button">
        Top center
        <i pgs="icon['icon-chevronDown']" aria-hidden="true"></i>
    </button>

    <div pgs="dropdown-content">
        top center content
    </div>
</span>
```

### Top right

Dropdown content positioned above the trigger, aligned to the right.

```html
<span pgs="dropdown" pgs-data="dropdownPosition[top right]">
    <button pgs="dropdown-button button['btnReverse']" type="button">
        Top right
        <i pgs="icon['icon-chevronDown']" aria-hidden="true"></i>
    </button>

    <div pgs="dropdown-content">
        top right content
    </div>
</span>
```

### Bottom left

Dropdown content positioned below the trigger, aligned to the left.

```html
<span pgs="dropdown" pgs-data="dropdownPosition[bottom left]">
    <button pgs="dropdown-button button['btnReverse']" type="button">
        Bottom left
        <i pgs="icon['icon-chevronDown']" aria-hidden="true"></i>
    </button>

    <div pgs="dropdown-content">
        bottom left content
    </div>
</span>
```

### Bottom right

Dropdown content positioned below the trigger, aligned to the right.

```html
<span pgs="dropdown" pgs-data="dropdownPosition[bottom right]">
    <button pgs="dropdown-button button['btnReverse']" type="button">
        Bottom right
        <i pgs="icon['icon-chevronDown']" aria-hidden="true"></i>
    </button>

    <div pgs="dropdown-content">
        bottom right content
    </div>
</span>
```

### Left center

Dropdown content positioned to the left of the trigger, vertically centered.

```html
<span pgs="dropdown" pgs-data="dropdownPosition[left center]">
    <button pgs="dropdown-button button['btnReverse']" type="button">
        Left center
        <i pgs="icon['icon-chevronDown']" aria-hidden="true"></i>
    </button>

    <div pgs="dropdown-content">
        left center content
    </div>
</span>
```

### Right center

Dropdown content positioned to the right of the trigger, vertically centered.

```html
<span pgs="dropdown" pgs-data="dropdownPosition[right center]">
    <button pgs="dropdown-button button['btnReverse']" type="button">
        Right center
        <i pgs="icon['icon-chevronDown']" aria-hidden="true"></i>
    </button>

    <div pgs="dropdown-content">
        right center content
    </div>
</span>
```
