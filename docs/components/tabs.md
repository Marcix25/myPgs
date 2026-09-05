<!-- Automatically generated from reference/html/components/tabs.html. Edit reference/html/components/tabs.html and run npm run docs:generate again. -->

# Tabs

A tabbed interface with a wrapping list of controls and one visible panel at a time. Click a tab or use Arrow keys, Home, or End while a tab is focused to select its panel.

## PGS

- `tabs`: identifies the root initialized by the tabs module.
- `tabs-list`: identifies the direct tab list inside tabs.
- `tabs-list-tab`: identifies a control that selects the panel in the same position.
- `tabs-panels`: identifies the wrapper around the tab panels.
- `tabs-panels-content`: identifies a panel paired with the tab at the same position.

## PGS States

- `active`: identifies the selected tab and its visible panel; the first pair is selected when no pair starts active.

## JavaScript API

- `pgs.tabs.init(root)`: initializes tabs inside the specified Document or Element, including the root when it is tabs.
- `pgs.tabs.api(element)`: returns the instance associated with an initialized tabs root.
- `instance.select(index)`: selects the zero-based tab and its matching panel.
- `instance.getCurrent()`: returns the zero-based index of the selected tab.
- `instance.refresh()`: returns the existing instance after initialization is requested again.

## Related elements

### PGS

- `card`: provides the outer surface for this example.
- `card-content`: provides the spacing wrapper around the tab list and panels.
- `flexRow`: lets the tab controls wrap in a row.
- `button`: supplies the base style for each tab control.

### PGS Options

- `buttonMini`: makes each tab control compact.

## Output

A wrapping tab list above a bordered panel, with the active tab joined visually to its content.

## Example

## Examples

### Tabs

A wrapping tab list with a single connected content panel.

```html
<div pgs="tabs card">
    <div pgs="tabs-list card-content flexRow" aria-label="Code formats">
        <button pgs="tabs-list-tab button" pgs-option="buttonMini" type="button">HTML</button>
        <button pgs="tabs-list-tab button" pgs-option="buttonMini" type="button">React</button>
        <button pgs="tabs-list-tab button" pgs-option="buttonMini" type="button">Vue</button>
        <button pgs="tabs-list-tab button" pgs-option="buttonMini" type="button">SVG</button>
        <button pgs="tabs-list-tab button" pgs-option="buttonMini" type="button">XML</button>
    </div>

    <div pgs="tabs-panels card-content">
        <section pgs="tabs-panels-content">
            <h3>HTML</h3>
            <p>Semantic markup ready to copy into a page.</p>
        </section>
        <section pgs="tabs-panels-content">
            <h3>React</h3>
            <p>The same structure written in JSX with pgs attributes.</p>
        </section>
        <section pgs="tabs-panels-content">
            <h3>Vue</h3>
            <p>Component markup ready for a Vue template.</p>
        </section>
        <section pgs="tabs-panels-content">
            <h3>SVG</h3>
            <p>Inline vector markup for scalable graphics.</p>
        </section>
        <section pgs="tabs-panels-content">
            <h3>XML</h3>
            <p>Structured data markup in XML format.</p>
        </section>
    </div>
</div>
```
