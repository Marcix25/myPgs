<!-- Automatically generated from reference/html/components/breadcrumb.html. Edit reference/html/components/breadcrumb.html and run npm run docs:generate again. -->

# Breadcrumb

Hierarchical navigation that shows the current page path with links, separators, and a semantic indication of the active item.

## PGS

- `breadcrumb`: identifies the main navigation path list.
- `breadcrumb-item`: identifies each level in the path. The separator between items is drawn by the component itself, through ::after, so it never needs its own markup.

## CSS Variables

- `--breadcrumb-color`
- `--breadcrumb-color-current`
- `--breadcrumb-color-hover`
- `--breadcrumb-separator-color`
- `--breadcrumb-separator-gap`
- `--breadcrumb-separator-type`
- `--breadcrumb-size`

## Output

Semantic breadcrumb HTML structure wrapped in a nav element.

## Example

```html
<nav aria-label="Breadcrumb">
    <ul pgs="breadcrumb">
        <li pgs="breadcrumb-item">
            <a href="/">Home</a>
        </li>

        <li pgs="breadcrumb-item">
            <a href="/blog">Blog</a>
        </li>

        <li pgs="breadcrumb-item">
            <span aria-current="page">
                Sample article
            </span>
        </li>
    </ul>
</nav>
```
