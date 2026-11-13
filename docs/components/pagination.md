<!-- Automatically generated from reference/html/components/pagination.html. Edit reference/html/components/pagination.html and run npm run docs:generate again. -->

# Pagination

Links to the pages of a list split in several pages, such as an archive, a shop or search results. Each page is a button you write, the one the reader is on carries aria-current="page" and btnCurrent; the component lays them in a row that wraps and draws the ellipsis between distant pages. --pagination-justify aligns the row (flex-start by default, center or flex-end), --pagination-gap spaces it.

## PGS

- `pagination`: identifies the list of pages, laid out as a row that wraps.
- `pagination-item`: identifies each entry of the list, a page, the previous and next links or an ellipsis.
- `pagination-ellipsis`: marks the pages left out between two numbers; it is text, not a control.

## Related elements

### PGS

- `button`: draws every page and the previous and next links.
- `icon`: draws the arrows of the previous and next links.
- `rotate`: turns the chevron towards the previous or the next page.
- `visuallyHidden`: names the previous and next links for assistive technology.

### PGS Options (component brackets)

- `btnMini`: inside button's own bracket, keeps the pages compact.
- `btnCurrent`: inside button's own bracket, gives the current page its look while it carries aria-current="page".
- `btnIconOnly`: inside button's own bracket, makes the previous and next links square.
- `icon-chevronDown`: the chevron the arrows are made of.
- `rot90`: inside rotate's own bracket, points the chevron to the left.
- `rot270`: inside rotate's own bracket, points the chevron to the right.

## CSS Variables

- `--pagination-ellipsis-color`
- `--pagination-gap`
- `--pagination-justify`

## Output

A navigation landmark with the list of pages.
## Examples

### Pages

Previous and next links around the numbers, the current page marked with aria-current, and an ellipsis for the pages in between. The current page is a span: it is where the reader already is.

```html
<nav aria-label="Pagination">
    <ul pgs="pagination">
        <li pgs="pagination-item">
            <a pgs="button['btnMini' 'btnIconOnly']" href="?page=1" rel="prev">
                <i pgs="icon['icon-chevronDown'] rotate['rot90']"></i>
                <span pgs="visuallyHidden">Previous page</span>
            </a>
        </li>

        <li pgs="pagination-item">
            <a pgs="button['btnMini' 'btnCurrent']" href="?page=1">1</a>
        </li>

        <li pgs="pagination-item">
            <span pgs="button['btnMini' 'btnCurrent']" aria-current="page">2</span>
        </li>

        <li pgs="pagination-item">
            <a pgs="button['btnMini' 'btnCurrent']" href="?page=3">3</a>
        </li>

        <li pgs="pagination-item">
            <span pgs="pagination-ellipsis">&hellip;</span>
        </li>

        <li pgs="pagination-item">
            <a pgs="button['btnMini' 'btnCurrent']" href="?page=12">12</a>
        </li>

        <li pgs="pagination-item">
            <a pgs="button['btnMini' 'btnIconOnly']" href="?page=3" rel="next">
                <i pgs="icon['icon-chevronDown'] rotate['rot270']"></i>
                <span pgs="visuallyHidden">Next page</span>
            </a>
        </li>
    </ul>
</nav>
```
