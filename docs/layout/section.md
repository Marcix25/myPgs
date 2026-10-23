<!-- Automatically generated from reference/html/layout/section.html. Edit reference/html/layout/section.html and run npm run docs:generate again. -->

# Section

Section variants that control width, padding, and specific content treatment while preserving shared vertical spacing. The content column is `--page-width` wide, centered, with `--page-padding` on either side; an element that spans the full width instead can line itself up with that column through `--page-edge`, the distance from its own edge to where the section box starts, one page padding further out than where the text starts, and allowed to fall to zero. The flush one therefore reaches zero as soon as the section box stops fitting, column and padding together, and the element runs edge to edge from there down (Slides uses it for its first and last slide).

## PGS

- `main`: identifies the main page area that stacks the sections, spacing them apart and filling the viewport height.
- `section`: identifies the standard section with centered content, on every side by default, or with the option in its bracket picking one of the variants below instead.
- `section-specificity`: identifies the content, inside a section using sctSpecificity, that is held to the centered page column while the section itself and its other children keep the full width; nested inside another one it drops the page padding.
- `section-edgeLeft`: identifies the text block of a section using sctEdge, at the left of the row: a column held to half the page width and to the page padding on both sides, which starts where the text of a centered section starts. It is the first child of the row, and the rest of the row (an image, a video) takes what it leaves.
- `section-edgeRight`: identifies the text block of a section using sctEdge, at the right of the row, the mirror of section-edgeLeft: it is the last child of the row, after the image, and it ends where the text of a centered section ends.
- `container`: turns any element into an inline-size query container, so the utilities that measure their surroundings have something to measure; see Breakpoints, Flex and Grid.

## PGS Options (component brackets)

- `sctFull`: inside section's own bracket, identifies a section that spans the full available width.
- `sctSpecificity`: inside section's own bracket, identifies a section that applies a specific structure to its child.
- `sctMax`: inside section's own bracket, identifies a section with an extended maximum width.
- `sctNoPadding`: inside section's own bracket, identifies a section without standard padding.
- `sctEdge`: inside section's own bracket, makes the section a full-width row that bleeds off the edge of the screen and lines the text up with the page column on the other side: the text goes in a section-edgeLeft or a section-edgeRight and every other child (an image, a video) takes what the text leaves, never narrower than half of the page. The text block is at most the page width divided by --section-edge-textDivisor and the other children at least the page width divided by --section-edge-mediaDivisor; both are 2 by default and a value below 2 is taken as 2. --section-edge-gap, one page padding by default, is the space between them, which makes the media of a left and of a right section meet at the middle of the screen. Below the page width the text is flush against the edge of the screen.
- `sctRemoveGap`: inside section's own bracket, pulls the section into the shared gap above and below it, negating half of --gap-sections on each side. It combines with any variant above, and written alone it keeps the standard section (width, padding and centering).
- `sctRemoveGapTop`: inside section's own bracket, the same pull on the top edge only.
- `sctRemoveGapBottom`: inside section's own bracket, the same pull on the bottom edge only.
- `cntNone`: inside container's own bracket, cancels it on the same element, so it stops acting as a query container and the nearest marked ancestor is measured instead.

## Related elements

### PGS

- `flex`: provides the flex layout; direction and spacing are flags in its bracket.
- `card-img`: reuses card image treatment in the demonstration sections.
- `img`: scales images to the section width.
- `hide`: hides its element while carrying a breakpoint option in its bracket; see Breakpoints for the whole family.
- `box`: makes the container example visible as a surface.

### PGS Options (component brackets)

- `column`: vertically organizes sections and inner content.
- `gapElements`: applies element spacing inside each section.
- `imgCover`: inside img's own bracket, crops the image to fill its box.
- `hideContainerDownTablet`: inside hide's own bracket, hides its element while the surrounding container is at most 800px wide.

### Other

- `row`: places the text and the image of an edge section side by side.
- `gapSections`: applies section spacing to the outer collection.

## CSS Variables

- `--section-edge-gap`
- `--section-edge-mediaDivisor`
- `--section-edge-textDivisor`
- `--section-marginBase`
- `--section-marginBlock`
- `--section-parentGap`
- `--section-width`

## Output

HTML collection of the available section variants.
## Examples

### Standard section

Default section width and padding with centered content.

```html
<section pgs="section flex['column' 'gapElements']">
    <div pgs="flex['column']">
        <strong>Lorem ipsum dolor</strong>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
</section>
```

### Full-width section

Section that spans the full available width using sctFull.

```html
<section pgs="section['sctFull'] flex['column' 'gapElements']">
    <div pgs="flex['column']">
        <strong>Sit amet consectetur</strong>
        <p>Sed do eiusmod tempor incididunt ut labore et dolore.</p>
    </div>
</section>
```

### Specificity-child section

Section applying a specific structure to its child element using sctSpecificity.

```html
<section pgs="section['sctSpecificity'] flex['column' 'gapElements']">
    <div pgs="flex['column']">
        <img pgs="card-img img['imgCover']" src="../assets/img/placeholder.jpg" alt="Placeholder image">
    </div>
    <div pgs="section-specificity flex['column']">
        <strong>Adipiscing elit sed</strong>
        <p>Ut enim ad minim veniam, quis nostrud exercitation.</p>
    </div>
</section>
```

### Query container

container is what hide's containerDown* and containerUp* options and every container query measure themselves against. Without it the nearest marked ancestor is used instead, and the element reacts to the wrong width.

```html
<section pgs="section flex['column' 'gapElements']">
    <div pgs="container">
        <span pgs="box hide['hideContainerDownTablet']">Hidden while this container is at most 800px wide.</span>
    </div>
</section>
```

### Canceled query container

container['cntNone'] cancels container on the same element, so the utilities inside measure the nearest marked ancestor instead of this one.

```html
<section pgs="section flex['column' 'gapElements']">
    <div pgs="container['cntNone']">
        <span pgs="box hide['hideContainerDownTablet']">Measures the surrounding page instead of this element.</span>
    </div>
</section>
```

### Edge section

A full-width row that bleeds off one edge of the screen and lines the text up with the page column on the other side: with sctEdge. The text goes in a section-edgeLeft or a section-edgeRight and the image, or any other child, takes what the text leaves. Below the page width the text is flush against the edge of the screen.

```html
<section pgs="section['sctEdge']">
    <div pgs="section-edgeLeft">
        <strong>Flush left</strong>
        <p>Text that starts exactly where the centered page column starts, while the image beside it runs on past the column to the right.</p>
    </div>
    <img src="../assets/img/placeholder.jpg" alt="Placeholder image">
</section>
```


```html
<section pgs="section['sctEdge']">
    <img src="../assets/img/placeholder.jpg" alt="Placeholder image">
    <div pgs="section-edgeRight">
        <strong>Flush right</strong>
        <p>The mirror: the text ends where the page column ends, and the image runs on past it to the left.</p>
    </div>
</section>
```

### Max-width section

Section with an extended maximum width using sctMax.

```html
<section pgs="section['sctMax'] flex['column' 'gapElements']" style="background-color: var(--color-primary-soft)">
    <div pgs="flex['column']">
        <strong>Do eiusmod tempor</strong>
        <p>Duis aute irure dolor in reprehenderit in voluptate.</p>
    </div>
</section>
```

### No padding section

Section without the standard padding using sctNoPadding, useful for edge-to-edge images.

```html
<section pgs="section['sctNoPadding'] flex['column' 'gapElements']">
    <div pgs="flex['column']">
        <img pgs="card-img img['imgCover']" src="../assets/img/placeholder.jpg" alt="Placeholder image">
    </div>
</section>
```
