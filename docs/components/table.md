<!-- Automatically generated from reference/html/components/table.html. Edit reference/html/components/table.html and run npm run docs:generate again. -->

# Table

A semantic table with headers and data rows in the design system styles: the header on its own background and a line under each row, with stripes, a row hover and a grid as options. The table takes the width of its container and does not scroll by itself: a table wider than the page needs a wrapper of the page's own with overflow-x: auto.

## PGS

- `table`: on the wrapper of the native table, or on the table itself; the styles reach the table either way. The base is the header on its own background (--table-title-background, --table-title-color) and a line under each row; the text of the rows is --table-row-color.

## PGS Options (component brackets)

- `tableStriped`: the rows on two alternating backgrounds, --table-row-background-even and --table-row-background-odd.
- `tableHover`: the row under the pointer takes --table-row-background-hover and --table-row-color-hover.
- `tableBordered`: a line round every cell and round the table, with rounded corners (--borderRadius-paragraphs). To round them the table keeps its borders separate (border-collapse: separate, with no spacing), each line still one line thick.

## CSS Variables

- `--table-row-background-even`
- `--table-row-background-hover`
- `--table-row-background-odd`
- `--table-row-color`
- `--table-row-color-hover`
- `--table-title-background`
- `--table-title-color`

## Output

The same HTML table four times, wrapped in the dedicated PGS container: plain, then with tableStriped, tableHover and tableBordered.
## Examples

### Table

The header on its own background and a line under each row.

```html
<div pgs="table">
    <table>
        <caption>Items and their status</caption>
        <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
                <th scope="col">Date</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td>First item</td>
                <td>Active</td>
                <td>2026-01-01</td>
            </tr>
            <tr>
                <td>Second item</td>
                <td>Draft</td>
                <td>2026-02-01</td>
            </tr>
        </tbody>
    </table>
</div>
```

### Striped rows (tableStriped)

tableStriped puts the rows on two alternating backgrounds.

```html
<div pgs="table['tableStriped']">
    <table>
        <caption>Items and their status</caption>
        <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
                <th scope="col">Date</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td>First item</td>
                <td>Active</td>
                <td>2026-01-01</td>
            </tr>
            <tr>
                <td>Second item</td>
                <td>Draft</td>
                <td>2026-02-01</td>
            </tr>
        </tbody>
    </table>
</div>
```

### Row hover (tableHover)

tableHover gives the row under the pointer the hover colors.

```html
<div pgs="table['tableHover']">
    <table>
        <caption>Items and their status</caption>
        <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
                <th scope="col">Date</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td>First item</td>
                <td>Active</td>
                <td>2026-01-01</td>
            </tr>
            <tr>
                <td>Second item</td>
                <td>Draft</td>
                <td>2026-02-01</td>
            </tr>
        </tbody>
    </table>
</div>
```

### Bordered (tableBordered)

tableBordered draws a line round every cell and round the table, with rounded corners.

```html
<div pgs="table['tableBordered']">
    <table>
        <caption>Items and their status</caption>
        <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
                <th scope="col">Date</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td>First item</td>
                <td>Active</td>
                <td>2026-01-01</td>
            </tr>
            <tr>
                <td>Second item</td>
                <td>Draft</td>
                <td>2026-02-01</td>
            </tr>
        </tbody>
    </table>
</div>
```
