<!-- Automatically generated from reference/html/components/table.html. Edit reference/html/components/table.html and run npm run docs:generate again. -->

# Table

Responsive container for a semantic table with headers and data rows consistent with the design system styles.

## PGS

- `table`: identifies the wrapper that manages presentation and scrolling for the native table.

## CSS Variables

- `--table-row-background-even`
- `--table-row-background-odd`
- `--table-row-color`
- `--table-row-hover-background`
- `--table-row-hover-color`
- `--table-title-background`
- `--table-title-color`

## Output

Complete HTML table wrapped in the dedicated PGS container.

## Example

```html
<div pgs="table">
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Stato</th>
                <th>Data</th>
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
