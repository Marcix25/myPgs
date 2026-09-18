<!-- Automatically generated from reference/html/components/tabs.html. Edit reference/html/components/tabs.html and run npm run docs:generate again. -->

# Tabs

A tabbed interface with a wrapping list of controls and one visible panel at a time. Click a tab or use Arrow keys, Home, or End while a tab is focused to select its panel. Every selection dispatches pgs:tabs:change on the tabs root, with detail { current, tab, panel } — current being the zero-based index — and the event does not bubble, so the listener goes on the root itself.

## PGS

- `tabs`: identifies the root initialized by the tabs module.
- `tabs-list`: identifies the direct tab list inside tabs.
- `tabs-list-tab`: identifies a control that selects the panel in the same position.
- `tabs-panels`: identifies the wrapper around the tab panels.
- `tabs-panels-content`: identifies a panel paired with the tab at the same position.

## PGS Data

- `tabsHistory`: the selected tab is written to the URL, so a reload — or a shared link — lands on the tab the reader left rather than on the first one. Each selection pushes a history entry, so back and forward walk the tabs. The query parameter is named in brackets, as tabsHistory[docs]; written bare it is tab, and two history-backed sets on one page each need a name of their own. A tab is addressed by its own id when the markup gives it one, as ?docs=install, and by its 1-based position otherwise, as ?tab=2.

## PGS States

- `active`: identifies the selected tab and its visible panel; the first pair is selected when no pair starts active, and a tab named in the URL by tabsHistory wins over both.

## JavaScript API

- `pgs.tabs.init(root)`: initializes tabs inside the specified Document or Element, including the root when it is tabs.
- `pgs.tabs.api(element)`: returns the instance associated with an initialized tabs root.
- `instance.select(index)`: selects the zero-based tab and its matching panel.
- `instance.getCurrent()`: returns the zero-based index of the selected tab.
- `instance.refresh()`: returns the existing instance after initialization is requested again.

## Related elements

### PGS

- `flex`: provides the flex layout; direction and spacing are flags in its bracket.
- `card`: provides the outer surface for this example.
- `card-content`: provides the spacing wrapper around the tab list and panels.
- `button`: supplies the base style for each tab control.

### PGS Options (component brackets)

- `row`: lets the tab controls wrap in a row.
- `mini`: makes each tab control compact.

## Output

A wrapping tab list above a bordered panel, with the active tab joined visually to its content.
## Examples

### Tabs

A wrapping tab list with a single connected content panel.

```html
<div pgs="tabs card">
    <div pgs="tabs-list card-content flex['row']" aria-label="Code formats">
        <button pgs="tabs-list-tab button['mini']" type="button">HTML</button>
        <button pgs="tabs-list-tab button['mini']" type="button">React</button>
        <button pgs="tabs-list-tab button['mini']" type="button">Vue</button>
        <button pgs="tabs-list-tab button['mini']" type="button">SVG</button>
        <button pgs="tabs-list-tab button['mini']" type="button">XML</button>
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

### Remembered across a reload

tabsHistory puts the selected tab in the URL, under the name written in brackets. Give each tab an id and the link reads ?format=vue and can be shared; leave the ids out and it is the tab's position, ?format=3. Reloading, or coming back with the browser's own back button, lands on the tab that was open.

```html
<div pgs="tabs card" pgs-data="tabsHistory[format]">
    <div pgs="tabs-list card-content flex['row']" aria-label="Code formats">
        <button id="html" pgs="tabs-list-tab button['mini']" type="button">HTML</button>
        <button id="react" pgs="tabs-list-tab button['mini']" type="button">React</button>
        <button id="vue" pgs="tabs-list-tab button['mini']" type="button">Vue</button>
    </div>

    <div pgs="tabs-panels card-content">
        <section pgs="tabs-panels-content">
            <h3>HTML</h3>
            <p>Reload the page: this tab is the one that comes back.</p>
        </section>
        <section pgs="tabs-panels-content">
            <h3>React</h3>
            <p>The URL carries ?format=react while this panel is open.</p>
        </section>
        <section pgs="tabs-panels-content">
            <h3>Vue</h3>
            <p>Back and forward walk the tabs, one entry per selection.</p>
        </section>
    </div>
</div>
```
