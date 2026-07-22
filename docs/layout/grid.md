<!-- Automatically generated from templates/html/layout/grid.html. Edit templates/html/layout/grid.html and run npm run docs:generate again. -->

# Grid

Responsive grid examples that distribute two to six columns while preserving design-system gaps and sizing.

## PGS

- `grid-2`: creates a responsive grid with up to two columns.
- `grid-3`: creates a responsive grid with up to three columns.
- `grid-4`: creates a responsive grid with up to four columns.
- `grid-6`: creates a responsive grid with up to six columns.

## Related elements

- `container`: defines the container context for the introduction.
- `flexColumnTexts`: organizes and spaces introductory and card text.
- `card`: makes the demonstration grid cells visible.

## Output

HTML collection of responsive grids with two, three, four, and six columns.

## Example

```html
<div pgs="container flexColumnTexts">
    <strong>Standard section</strong>
    <p>Centered content inside a MyPGS section.</p>
</div>


<div pgs="grid-2">
    <article pgs="card flexColumnTexts">
        <strong>Column one</strong>
        <p>First column content.</p>
    </article>

    <article pgs="card flexColumnTexts">
        <strong>Column two</strong>
        <p>Second column content.</p>
    </article>
</div>


<div pgs="grid-3">
    <article pgs="card flexColumnTexts">
        <strong>Column one</strong>
        <p>First column content.</p>
    </article>

    <article pgs="card flexColumnTexts">
        <strong>Column two</strong>
        <p>Second column content.</p>
    </article>

    <article pgs="card flexColumnTexts">
        <strong>Column three</strong>
        <p>Third column content.</p>
    </article>
</div>


<div pgs="grid-4">
    <article pgs="card flexColumnTexts">
        <strong>Column one</strong>
        <p>First column content.</p>
    </article>

    <article pgs="card flexColumnTexts">
        <strong>Column two</strong>
        <p>Second column content.</p>
    </article>

    <article pgs="card flexColumnTexts">
        <strong>Column three</strong>
        <p>Third column content.</p>
    </article>
    <article pgs="card flexColumnTexts">
        <strong>Column four</strong>
        <p>Fourth column content.</p>
    </article>
</div>

<div pgs="grid-6">
    <article pgs="card flexColumnTexts">
        <strong>Column one</strong>
        <p>First column content.</p>
    </article>

    <article pgs="card flexColumnTexts">
        <strong>Column two</strong>
        <p>Second column content.</p>
    </article>

    <article pgs="card flexColumnTexts">
        <strong>Column three</strong>
        <p>Third column content.</p>
    </article>

    <article pgs="card flexColumnTexts">
        <strong>Column four</strong>
        <p>Fourth column content.</p>
    </article>

    <article pgs="card flexColumnTexts">
        <strong>Column five</strong>
        <p>Fifth column content.</p>
    </article>

    <article pgs="card flexColumnTexts">
        <strong>Column six</strong>
        <p>Sixth column content.</p>
    </article>
</div
```
