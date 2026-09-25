<!-- Automatically generated from reference/html/layout/grid.html. Edit reference/html/layout/grid.html and run npm run docs:generate again. -->

# Grid

Grid layouts: a responsive column-N grid that drops to fewer columns at each breakpoint, gridChild to make one item span several of them, and gridDense to fill the holes a wide span leaves. The gap and alignment options are shared with Flex.

## PGS

- `grid`: creates a grid layout with the text gap and the full width of its container.
- `gridChild`: the grid counterpart of flexChild, for one item inside a grid['column-N']: its col* options set how many columns the item spans. Separate from flexChild because flex's own sizing (grow, basis) means nothing inside a grid.

## PGS Options (component brackets)

- `column-`: inside grid's own bracket, lays the children out in N equal columns, column-1 through column-8, dropping to fewer columns at each breakpoint.
- `column-1`: inside grid's own bracket, a single column.
- `column-4`: inside grid's own bracket, four columns; values from 1 through 8 are supported.
- `m2e`: inside grid's own bracket, keeps two columns at the mobile breakpoint instead of one, returning to one on watch-sized containers.
- `gridDense`: inside grid's own bracket, lets later items fill the holes a wider one leaves at the end of a row (grid-auto-flow: dense), so the visual order can differ from the source order.
- `colS`: inside gridChild's own bracket, makes the item span 1 column (--gridChild-col-s) of a grid['column-N'], capped by the columns the current breakpoint leaves, so a span never makes the grid add columns of its own; outside a column-N grid it does nothing.
- `colM`: inside gridChild's own bracket, spans 2 columns (--gridChild-col-m).
- `colL`: inside gridChild's own bracket, spans 3 columns (--gridChild-col-l): three of a column-4, and the full row where the breakpoint leaves only two.
- `colXl`: inside gridChild's own bracket, spans 4 columns (--gridChild-col-xl).
- `colXxl`: inside gridChild's own bracket, spans 5 columns (--gridChild-col-xxl).
- `gapTexts`: the text gap between the items; also sets --flex-gap, the gap a column-N row computes its widths with.
- `gapElements`: the element gap between the items, and --flex-gap with it.
- `gapSections`: the section gap between the items, and --flex-gap with it; meant for large page blocks, since it also spaces the rows.
- `gapNone`: removes the gap, and sets --flex-gap to 0.
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

## Related elements

### PGS

- `box`: makes the demonstration cells visible.
- `flex`: lays out the text inside each demonstration cell; see Flex.

### PGS Options (component brackets)

- `column`: inside flex's own bracket, stacks the text of each demonstration cell; see Flex.

## Output

Grid layout, column spans with gridChild, gridDense and alignment.
## Examples

### Grid layout

Four-column grid layout using column-4 with m2e to collapse to two columns per row on mobile.

```html
<strong>Grid</strong>
<div pgs="grid['column-4' 'm2e']">
    <article pgs="box flex['column']">
        <strong>Do eiusmod tempor</strong>
        <p>Duis aute irure dolor in reprehenderit in voluptate.</p>
    </article>
    <article pgs="box flex['column']">
        <strong>Ut labore et</strong>
        <p>Excepteur sint occaecat cupidatat non proident sunt.</p>
    </article>
    <article pgs="box flex['column']">
        <strong>Dolore magna aliqua</strong>
        <p>Sunt in culpa qui officia deserunt mollit anim.</p>
    </article>
    <article pgs="box flex['column']">
        <strong>Enim ad minim</strong>
        <p>Ut labore et dolore magna aliqua ut enim.</p>
    </article>
</div>
```

### Column spans

gridChild's colS to colXxl span 1 to 5 columns, capped by the columns each breakpoint leaves.

```html
<div pgs="grid['column-4']">
    <span pgs="box gridChild['colL']">colL — spans 3 of 4</span>
    <span pgs="box">1</span>
    <span pgs="box gridChild['colM']">colM — spans 2</span>
    <span pgs="box gridChild['colM']">colM — spans 2</span>
</div>
```

### Dense

The same three items twice: without gridDense the last one waits for its own row and leaves a hole after colL; with gridDense it moves up into that hole.

```html
<div pgs="grid['column-4']">
    <span pgs="box gridChild['colL']">colL — spans 3</span>
    <span pgs="box gridChild['colM']">colM — spans 2</span>
    <span pgs="box">1 — stays in source order</span>
</div>

<div pgs="grid['column-4' 'gridDense']">
    <span pgs="box gridChild['colL']">colL — spans 3</span>
    <span pgs="box gridChild['colM']">colM — spans 2</span>
    <span pgs="box">1 — moved up by gridDense</span>
</div>
```

### Alignment

The shared alignment options on a grid: items centred in their row, one of them aligned to the end on its own.

```html
<div pgs="grid['column-4' 'gapElements' 'itemCenter']">
    <span pgs="box">Short item</span>
    <span pgs="box">Taller item<br>with two lines</span>
    <span pgs="box['selfEnd']">Self-aligned item</span>
    <span pgs="box">Short item</span>
</div>
```
