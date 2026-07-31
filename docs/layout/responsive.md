<!-- Automatically generated from reference/html/layout/responsive.html. Edit reference/html/layout/responsive.html and run npm run docs:generate again. -->

# Responsive

Responsive flex and grid layouts with configurable columns and wrapping controls.

## PGS

- `grid`: creates a responsive grid layout.
- `flexColumn`: stacks text inside each demonstration cell.
- `flexRow`: creates a responsive flex layout.
- `wrap`: allows flex items to wrap.
- `nowrap`: prevents flex items from wrapping.
- `box`: makes the demonstration cells visible.

## PGS Options

- `column-2`: configures the flex example with two columns; column values from 1 through 8 are supported.
- `column-4`: configures the grid example with four columns; column values from 1 through 8 are supported.
- `m2e`: keeps two elements per row at the mobile breakpoint, returning to one column on watch-sized containers.

## Related elements

- `gapTexts`: separates nearby items in the examples.
- `gapSections`: separates the main example sections.

## Output

Flex, grid, and wrapping examples using the current responsive layout API.

## Example

```html
<div pgs="flexColumn gapSections">
    <section>
        <strong>Flex</strong>
        <div pgs="flexRow" pgs-option="column-2 m2e">
            <article pgs="box flexColumn">
                <strong>Column one</strong>
                <p>First flex column.</p>
            </article>
            <article pgs="box flexColumn">
                <strong>Column two</strong>
                <p>Second flex column.</p>
            </article>
            <article pgs="box flexColumn">
                <strong>Column three</strong>
                <p>Third flex column.</p>
            </article>
        </div>
    </section>

    <section>
        <strong>Grid</strong>
        <div pgs="grid" pgs-option="column-4 m2e">
            <article pgs="box flexColumn">
                <strong>Column one</strong>
                <p>First grid column.</p>
            </article>
            <article pgs="box flexColumn">
                <strong>Column two</strong>
                <p>Second grid column.</p>
            </article>
            <article pgs="box flexColumn">
                <strong>Column three</strong>
                <p>Third grid column.</p>
            </article>
            <article pgs="box flexColumn">
                <strong>Column four</strong>
                <p>Third grid column.</p>
            </article>
        </div>
    </section>

    <section pgs="flexColumn gapTexts">
        <strong>Wrap</strong>
        <div pgs="flexRow gapTexts wrap">
            <span pgs="box">Wrapping item</span>
            <span pgs="box">Wrapping item</span>
            <span pgs="box">Wrapping item</span>
        </div>
        <div pgs="flexRow gapTexts nowrap">
            <span pgs="box">Non-wrapping item</span>
            <span pgs="box">Non-wrapping item</span>
        </div>
    </section>
</div>
```
