<!-- Automatically generated from reference/html/layout/responsive.html. Edit reference/html/layout/responsive.html and run npm run docs:generate again. -->

# Responsive

Responsive flex and grid layouts with configurable columns, gap, wrapping, and alignment controls.

## PGS

- `grid`: creates a responsive grid layout.
- `flex`: creates a horizontal flex layout by default.
- `flexColumn`: creates a vertical flex layout.
- `flexRow`: creates a horizontal flex layout.

## PGS Options

- `flexColumn`: configures a flex layout to stack items vertically.
- `flexRow`: configures a flex layout to arrange items horizontally.
- `flexColumnReverse`: configures a flex layout to stack items vertically in reverse order.
- `flexRowReverse`: configures a flex layout to arrange items horizontally in reverse order.
- `wrap`: allows flex items to wrap.
- `nowrap`: prevents flex items from wrapping.
- `column-`: configures a flex or grid layout with a selected number of columns; supported values are column-1 through column-8.
- `column-1`: stacks the children in a single column, whatever the layout was doing before.
- `column-2`: configures the flex example with two columns; column values from 1 through 8 are supported.
- `column-4`: configures the grid example with four columns; column values from 1 through 8 are supported.
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
- `gapNone`: removes the gap from a flex or grid container.
- `gapTexts`: separates nearby items in the examples.
- `gapSections`: separates the main example sections.

## Related elements

### PGS

- `box`: makes the demonstration cells visible.
- `flex-flexInitial`: uses the flex initial sizing behavior on a flex child.
- `flex-flexNone`: prevents a flex child from growing or shrinking.
- `flex-flex1`: lets a flex child grow and shrink to fill available space.
- `flex-flexFull`: makes a flex child occupy a full row.
- `flex-flexOrderFirst`: places a flex child before its siblings.
- `flex-flexOrderLast`: places a flex child after its siblings.

## Output

Flex, grid, wrapping, and alignment examples using the current responsive layout API.

## Example

### Flex layout

Three-column flex layout using column-2 with m2e to collapse to two columns per row on mobile.

```html
<section>
    <strong>Flex</strong>
    <div pgs="flex" pgs-option="flexRow column-2 m2e">
        <article pgs="box flex" pgs-option="flexColumn">
            <strong>Column one</strong>
            <p>First flex column.</p>
        </article>
        <article pgs="box flex" pgs-option="flexColumn">
            <strong>Column two</strong>
            <p>Second flex column.</p>
        </article>
        <article pgs="box flex" pgs-option="flexColumn">
            <strong>Column three</strong>
            <p>Third flex column.</p>
        </article>
    </div>
</section>
```

### Grid layout

Four-column grid layout using column-4 with m2e to collapse to two columns per row on mobile.

```html
<section>
    <strong>Grid</strong>
    <div pgs="grid" pgs-option="column-4 m2e">
        <article pgs="box flex" pgs-option="flexColumn">
            <strong>Column one</strong>
            <p>First grid column.</p>
        </article>
        <article pgs="box flex" pgs-option="flexColumn">
            <strong>Column two</strong>
            <p>Second grid column.</p>
        </article>
        <article pgs="box flex" pgs-option="flexColumn">
            <strong>Column three</strong>
            <p>Third grid column.</p>
        </article>
        <article pgs="box flex" pgs-option="flexColumn">
            <strong>Column four</strong>
            <p>Third grid column.</p>
        </article>
    </div>
</section>
```

### Wrap

Flex items wrapping onto multiple rows versus staying on a single non-wrapping row.

```html
<strong>Wrap</strong>
<div pgs="flex" pgs-option="flexRow gapTexts wrap">
    <span pgs="box">Wrapping item</span>
    <span pgs="box">Wrapping item</span>
    <span pgs="box">Wrapping item</span>
</div>
<div pgs="flex" pgs-option="flexRow gapTexts nowrap">
    <span pgs="box">Non-wrapping item</span>
    <span pgs="box">Non-wrapping item</span>
</div>
```

### Direction

Reversing the visual order of flex items on the row axis and on the column axis.

```html
<strong>Direction</strong>
<div pgs="flex" pgs-option="flexRowReverse gapTexts">
    <span pgs="box">First in markup</span>
    <span pgs="box">Second in markup</span>
</div>
<div pgs="flex" pgs-option="flexColumnReverse gapTexts">
    <span pgs="box">First in markup</span>
    <span pgs="box">Second in markup</span>
</div>
```

### Alignment

Aligning and justifying flex items, including overriding a single child's alignment with selfEnd.

```html
<strong>Alignment</strong>
<div pgs="flex" pgs-option="flexRow gapTexts itemCenter justifyBetween contentCenter">
    <span pgs="box">Short item</span>
    <span pgs="box">Taller item<br>with two lines</span>
    <span pgs="box" pgs-option="selfEnd">Self-aligned item</span>
</div>
```

### Flex children

Sizing behavior of individual flex children: initial, none, grow, full width, and reordering.

```html
<strong>Flex children</strong>
<div pgs="flex" pgs-option="flexRow gapTexts wrap">
    <span pgs="box flex-flexInitial">Initial</span>
    <span pgs="box flex-flexNone">None</span>
    <span pgs="box flex-flex1">Grow</span>
    <span pgs="box flex-flexFull">Full width</span>
    <span pgs="box flex-flexOrderLast">Last</span>
    <span pgs="box flex-flexOrderFirst">First</span>
</div>
```
