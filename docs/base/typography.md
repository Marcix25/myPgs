<!-- Automatically generated from reference/html/base/typography.html. Edit reference/html/base/typography.html and run npm run docs:generate again. -->

# Typography

The six heading levels, and one look for body copy — size (or font-size for text), family, color and line-height together — available as utilities, so any element can look like a title or read like running text without changing what tag it actually is. Each one reads its look from its own set of custom properties (--heading-size-h1, --heading-color-h1, --heading-family-h1, --heading-line-height-h1 and so on through h6; --text-color, --text-family, --text-size, --text-line-height, --text-overflowWrap for text), declared once for the whole page in a :root block; override one there instead of passing a different value at every place that level is used.

## PGS

- `h1`: applies the first heading level's look.
- `h2`: applies the second heading level's look.
- `h3`: applies the third heading level's look.
- `h4`: applies the fourth heading level's look.
- `h5`: applies the fifth heading level's look.
- `h6`: applies the sixth heading level's look.
- `text`: applies the same look bodyText gives a paragraph — color, family, size, line-height and overflow-wrap — to any element.

## Related elements

### PGS

- `flex`: provides the flex layout; direction and spacing are flags in its bracket.

### PGS Options (component brackets)

- `column`: stacks the examples vertically.
- `gapTexts`: spaces the examples.

## Output

Real h1 to h6 tags for comparison, then the same six levels applied to plain paragraphs, so the tag keeps its meaning while the look changes; then text applied to a span.
## Examples

### Heading sizes

Real h1 to h6 tags with no utility at all, shown as code only: compare it against the styled markup below to see what each one is actually adding.

```html
<h1>h1 on a paragraph</h1>
<h2>h2 on a paragraph</h2>
<h3>h3 on a paragraph</h3>
<h4>h4 on a paragraph</h4>
<h5>h5 on a paragraph</h5>
<h6>h6 on a paragraph</h6>
```


The same look as h1 to h6, applied to paragraphs: use them when the right look and the right heading level do not match.

```html
<p pgs="h1">h1 on a paragraph</p>
<p pgs="h2">h2 on a paragraph</p>
<p pgs="h3">h3 on a paragraph</p>
<p pgs="h4">h4 on a paragraph</p>
<p pgs="h5">h5 on a paragraph</p>
<p pgs="h6">h6 on a paragraph</p>
```

### Text

The same look bodyText gives a paragraph, applied to any element with pgs=&quot;text&quot; instead: use it when you need running-text styling on something that is not, and should not become, a &lt;p&gt;.

```html
<span pgs="text">A span reading like a paragraph, with the same color, family, size, line-height and overflow-wrap.</span>
```
