<!-- Automatically generated from reference/html/layout/responsive.html. Edit reference/html/layout/responsive.html and run npm run docs:generate again. -->

# Responsive

Responsive flex and grid layouts with configurable columns, gap, wrapping, and alignment controls.

## PGS

- `grid`: creates a responsive grid layout.
- `flexColumn`: stacks text inside each demonstration cell.
- `flexRow`: creates a responsive flex layout.
- `box`: makes the demonstration cells visible.

## PGS Options

- `wrap`: allows flex items to wrap.
- `nowrap`: prevents flex items from wrapping.
- `column-2`: configures the flex example with two columns; column values from 2 through 8 are supported.
- `column-4`: configures the grid example with four columns; column values from 2 through 8 are supported.
- `m2e`: keeps two elements per row at the mobile breakpoint, returning to one column on watch-sized containers.
- `itemStart`: sets align-items to start on the flex or grid container.
- `itemCenter`: sets align-items to center on the flex or grid container.
- `itemEnd`: sets align-items to end on the flex or grid container.
- `itemStretch`: sets align-items to stretch on the flex or grid container.
- `itemBaseline`: sets align-items to baseline on the flex or grid container.
- `justifyStart`: sets justify-content to start on the flex or grid container.
- `justifyCenter`: sets justify-content to center on the flex or grid container.
- `justifyEnd`: sets justify-content to end on the flex or grid container.
- `justifyBetween`: sets justify-content to space-between on the flex or grid container.
- `justifyAround`: sets justify-content to space-around on the flex or grid container.
- `justifyEvenly`: sets justify-content to space-evenly on the flex or grid container.
- `contentStart`: sets align-content to start on the flex or grid container.
- `contentCenter`: sets align-content to center on the flex or grid container.
- `contentEnd`: sets align-content to end on the flex or grid container.
- `contentBetween`: sets align-content to space-between on the flex or grid container.
- `contentAround`: sets align-content to space-around on the flex or grid container.
- `contentEvenly`: sets align-content to space-evenly on the flex or grid container.
- `selfStart`: sets align-self to start on a single flex or grid child, overriding the container alignment.
- `selfCenter`: sets align-self to center on a single flex or grid child, overriding the container alignment.
- `selfEnd`: sets align-self to end on a single flex or grid child, overriding the container alignment.
- `selfStretch`: sets align-self to stretch on a single flex or grid child, overriding the container alignment.
- `selfBaseline`: sets align-self to baseline on a single flex or grid child, overriding the container alignment.
- `gapTexts`: separates nearby items in the examples.
- `gapSections`: separates the main example sections.

## Output

Flex, grid, wrapping, and alignment examples using the current responsive layout API.

## Example

```html
<div pgs="flexColumn" pgs-option="gapSections">
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

    <section pgs="flexColumn" pgs-option="gapTexts">
        <strong>Wrap</strong>
        <div pgs="flexRow" pgs-option="gapTexts wrap">
            <span pgs="box">Wrapping item</span>
            <span pgs="box">Wrapping item</span>
            <span pgs="box">Wrapping item</span>
        </div>
        <div pgs="flexRow" pgs-option="gapTexts nowrap">
            <span pgs="box">Non-wrapping item</span>
            <span pgs="box">Non-wrapping item</span>
        </div>
    </section>

    <section pgs="flexColumn" pgs-option="gapTexts">
        <strong>Alignment</strong>
        <div pgs="flexRow" pgs-option="gapTexts itemCenter justifyBetween contentCenter">
            <span pgs="box">Short item</span>
            <span pgs="box">Taller item<br>with two lines</span>
            <span pgs="box" pgs-option="selfEnd">Self-aligned item</span>
        </div>
    </section>
</div>
```
