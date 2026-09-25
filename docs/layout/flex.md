<!-- Automatically generated from reference/html/layout/flex.html. Edit reference/html/layout/flex.html and run npm run docs:generate again. -->

# Flex

Flex layouts: direction, wrapping, centering, a responsive column-N row that drops to fewer columns at each breakpoint, and flexChild to size or order one item inside it. The gap and alignment options are shared with Grid.

## PGS

- `flex`: creates a horizontal, wrapping flex layout by default.
- `flexChild`: sizes or orders one item inside a flex container, the option in its bracket picking how; a separate component from flex itself, so it stands on its own without needing a flex/flex[...] ancestor. A grid item uses gridChild instead.

## PGS Options (component brackets)

- `inlineFlex`: uses inline-flex for the flex container.
- `flexPlaceCenter`: centers items on both axes of a flex container, with gapTexts as its default gap.
- `flexCenter`: centers items on both axes of a flex container, with no gap of its own.
- `column`: configures a flex layout to stack items vertically.
- `row`: configures a flex layout to arrange items horizontally.
- `columnReverse`: configures a flex layout to stack items vertically in reverse order.
- `rowReverse`: configures a flex layout to arrange items horizontally in reverse order.
- `wrap`: allows flex items to wrap.
- `nowrap`: prevents flex items from wrapping.
- `column-`: inside flex's own bracket, lays the children out on a responsive row of N equal columns, column-1 through column-8, dropping to fewer columns at each breakpoint.
- `column-1`: inside flex's own bracket, stacks the children in a single column.
- `column-2`: inside flex's own bracket, two columns per row; values from 1 through 8 are supported.
- `column-4`: inside flex's own bracket, four columns per row.
- `m2e`: inside flex's own bracket, keeps two items per row at the mobile breakpoint instead of one, returning to one on watch-sized containers.
- `flexInitial`: inside flexChild's own bracket, uses the flex initial sizing behavior on a flex child.
- `flexNone`: inside flexChild's own bracket, prevents a flex child from growing or shrinking.
- `flex1`: inside flexChild's own bracket, lets a flex child grow and shrink to fill available space.
- `flexFull`: inside flexChild's own bracket, makes a flex child occupy a full row.
- `flexValue`: inside flexChild's own bracket, sets a flex child's basis to --flex-flexValue, set inline for an arbitrary value.
- `flexS`: inside flexChild's own bracket, grows the item by a weight of 1 (--flexChild-size-s) on a zero basis, so sizes next to each other split the row in exact proportion.
- `flexM`: inside flexChild's own bracket, grows the item by a weight of 2 (--flexChild-size-m).
- `flexL`: inside flexChild's own bracket, grows the item by a weight of 3 (--flexChild-size-l).
- `flexXl`: inside flexChild's own bracket, grows the item by a weight of 4 (--flexChild-size-xl).
- `flexXxl`: inside flexChild's own bracket, grows the item by a weight of 5 (--flexChild-size-xxl).
- `colS`: inside flexChild's own bracket, makes the item take 1 column (--flexChild-col-s) of a flex['column-N'] row, capped by the columns the current breakpoint leaves; outside a column-N row it does nothing. A grid item uses gridChild's own col* instead.
- `colM`: inside flexChild's own bracket, takes 2 columns (--flexChild-col-m) of a column-N row.
- `colL`: inside flexChild's own bracket, takes 3 columns (--flexChild-col-l): three of a column-4, and a full row where the breakpoint leaves only two.
- `colXl`: inside flexChild's own bracket, takes 4 columns (--flexChild-col-xl) of a column-N row.
- `colXxl`: inside flexChild's own bracket, takes 5 columns (--flexChild-col-xxl) of a column-N row.
- `flexOrderFirst`: inside flexChild's own bracket, places a flex child before its siblings.
- `flexOrderLast`: inside flexChild's own bracket, places a flex child after its siblings.
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

### Other

- `grid`: the two-dimensional layout, with gridChild for its items; see Grid.
- `gridChild`: the grid counterpart of flexChild; see Grid.

## CSS Variables

- `--flex-flexValue`
- `--flex-gap`

## Output

Flex layout, wrapping, direction, alignment, flex children, proportional sizes and column spans.
## Examples

### Flex layout

Three-column flex layout using column-2 with m2e to collapse to two columns per row on mobile.

```html
<strong>Flex</strong>
<div pgs="flex['row' 'column-2' 'm2e']">
    <article pgs="box flex['column']">
        <strong>Lorem ipsum dolor</strong>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </article>
    <article pgs="box flex['column']">
        <strong>Sit amet consectetur</strong>
        <p>Sed do eiusmod tempor incididunt ut labore et dolore.</p>
    </article>
    <article pgs="box flex['column']">
        <strong>Adipiscing elit sed</strong>
        <p>Ut enim ad minim veniam, quis nostrud exercitation.</p>
    </article>
</div>
```

### Wrap

Flex items wrapping onto multiple rows versus staying on a single non-wrapping row.

```html
<strong>Wrap</strong>
<div pgs="flex['row' 'gapTexts' 'wrap']">
    <span pgs="box">Wrapping item</span>
    <span pgs="box">Wrapping item</span>
    <span pgs="box">Wrapping item</span>
</div>
<div pgs="flex['row' 'gapTexts' 'nowrap']">
    <span pgs="box">Non-wrapping item</span>
    <span pgs="box">Non-wrapping item</span>
</div>
```

### Direction

Reversing the visual order of flex items on the row axis and on the column axis.

```html
<strong>Direction</strong>
<div pgs="flex['rowReverse' 'gapTexts']">
    <span pgs="box">First in markup</span>
    <span pgs="box">Second in markup</span>
</div>
<div pgs="flex['columnReverse' 'gapTexts']">
    <span pgs="box">First in markup</span>
    <span pgs="box">Second in markup</span>
</div>
```

### Alignment

Aligning and justifying flex items, including overriding a single child's alignment with selfEnd.

```html
<strong>Alignment</strong>
<div pgs="flex['row' 'gapTexts' 'itemCenter' 'justifyBetween' 'contentCenter']">
    <span pgs="box">Short item</span>
    <span pgs="box">Taller item<br>with two lines</span>
    <span pgs="box['selfEnd']">Self-aligned item</span>
</div>
```

### Flex children

Sizing behavior of individual flex children: initial, none, grow, full width, and reordering.

```html
<strong>Flex children</strong>
<div pgs="flex['row' 'gapTexts' 'wrap']">
    <span pgs="box flexChild['flexInitial']">Initial</span>
    <span pgs="box flexChild['flexNone']">None</span>
    <span pgs="box flexChild['flex1']">Grow</span>
    <span pgs="box flexChild['flexFull']">Full width</span>
    <span pgs="box flexChild['flexValue']" style="--flex-flexValue: 220px;">220px</span>
    <span pgs="box flexChild['flexOrderLast']">Last</span>
    <span pgs="box flexChild['flexOrderFirst']">First</span>
</div>
```

### Flex child sizes

flexS to flexXxl grow in proportion 1:2:3:4:5 on a zero basis, so each row splits by weight whatever the content.

```html
<div pgs="flex['row' 'gapTexts']">
    <span pgs="box flexChild['flexS']">S</span>
    <span pgs="box flexChild['flexM']">M</span>
    <span pgs="box flexChild['flexL']">L</span>
    <span pgs="box flexChild['flexXl']">XL</span>
    <span pgs="box flexChild['flexXxl']">XXL</span>
</div>
<div pgs="flex['row' 'gapTexts']">
    <span pgs="box flexChild['flexS']">S — 1/4</span>
    <span pgs="box flexChild['flexL']">L — 3/4</span>
</div>
```

### Column spans

colS to colXxl take 1 to 5 columns of a column-N row, capped by the columns each breakpoint leaves.

```html
<div pgs="flex['column-4']">
    <span pgs="box flexChild['colS']">colS — 1 of 4</span>
    <span pgs="box flexChild['colL']">colL — 3 of 4</span>
    <span pgs="box flexChild['colM']">colM — 2 of 4</span>
    <span pgs="box flexChild['colM']">colM — 2 of 4</span>
</div>
```
