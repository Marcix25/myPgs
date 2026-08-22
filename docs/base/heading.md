<!-- Automatically generated from reference/html/base/heading.html. Edit reference/html/base/heading.html and run npm run docs:generate again. -->

# Heading

Heading sizes available as utilities, to give any element the look of a title without changing the document outline.

## PGS

- `h1`: applies the first heading level size.
- `h2`: applies the second heading level size.
- `h3`: applies the third heading level size.
- `h4`: applies the fourth heading level size.
- `h5`: applies the fifth heading level size.

## Related elements

### PGS

- `flexColumn`: stacks the examples vertically.

### PGS Options

- `gapTexts`: spaces the examples.

## Output

The five heading sizes applied to plain paragraphs, so the tag keeps its meaning while the size changes.

## Example

```html
<div pgs="flexColumn" pgs-option="gapTexts" demo="component" demo-title="Heading sizes" demo-description="The same sizes as h1 to h5, applied to paragraphs: use them when the right size and the right heading level do not match.">
    <p pgs="h1">h1 on a paragraph</p>
    <p pgs="h2">h2 on a paragraph</p>
    <p pgs="h3">h3 on a paragraph</p>
    <p pgs="h4">h4 on a paragraph</p>
    <p pgs="h5">h5 on a paragraph</p>
</div>
```
