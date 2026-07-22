<!-- Automatically generated from templates/html/components/breadcumbs.html. Edit templates/html/components/breadcumbs.html and run npm run docs:generate again. -->

# Breadcrumb

Hierarchical navigation that shows the current page path with links, separators, and a semantic indication of the active item.

## PGS

- `breadcrumb`: identifies the main navigation path list.
- `breadcrumb-item`: identifies each level in the path.
- `breadcrumb-item-separator`: identifies the decorative separator hidden from assistive technologies.

## Output

Semantic breadcrumb HTML structure wrapped in a nav element.

## Example

```html
<nav aria-label="Breadcrumb">
    <ul pgs="breadcrumb">
        <li pgs="breadcrumb-item">
            <a href="/">Home</a>
            <span pgs="breadcrumb-item-separator" aria-hidden="true">
                >
            </span>
        </li>

        <li pgs="breadcrumb-item">
            <a href="/blog">Blog</a>
            <span pgs="breadcrumb-item-separator" aria-hidden="true">
                >
            </span>
        </li>

        <li pgs="breadcrumb-item">
            <span aria-current="page">
                Sample article
            </span>
        </li>
    </ul>
</nav>
```
