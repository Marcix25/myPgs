<!-- Automatically generated from reference/html/layout/section.html. Edit reference/html/layout/section.html and run npm run docs:generate again. -->

# Section

Section variants that control width, padding, and specific content treatment while preserving shared vertical spacing. The content column is `--page-width` wide, centred, with `--page-padding` on either side; an element that spans the full width instead can line itself up with that column through `--page-edge`, the distance from its own edge to where the text starts, or through `--page-edgeFlush`, the distance to where the section box starts instead, one page padding further out, and allowed to fall to zero. The flush one therefore reaches zero as soon as the section box stops fitting, column and padding together, and the element runs edge to edge from there down (Slides uses it for its first and last slide).

## PGS

- `main`: identifies the main page area that stacks the sections, spacing them apart and filling the viewport height.
- `section`: identifies the standard section with centered content.
- `sectionFull`: identifies a section that spans the full available width.
- `sectionSpecificity`: identifies a section that applies a specific structure to its child.
- `sectionSpecificity-child`: identifies child content managed by the sectionSpecificity variant.
- `sectionMax`: identifies a section with an extended maximum width.
- `sectionNoPadding`: identifies a section without standard padding.
- `sectionEdgeLeft`: identifies a full-width section whose content starts where the text of a centred section starts on the left and runs on past it to the right, keeping only the page padding there. The left offset is --page-edge, which never falls below --page-padding, so the content keeps its breathing room once the column no longer fits.
- `sectionEdgeRight`: the mirror of sectionEdgeLeft: the content ends where the page column ends on the right and runs on past it to the left.
- `sectionEdgeFlushLeft`: lines the content up with the outer edge of a centred section on the left, one page padding further out than sectionEdgeLeft, through --page-edgeFlush, which is allowed to fall to zero: once the section box no longer fits, the content runs flush to the left edge of the screen. The right side carries no padding at all, so the row bleeds off that edge instead of stopping short of it, which is what a carousel or a full-width image wants.
- `sectionEdgeFlushRight`: the mirror of sectionEdgeFlushLeft, lined up on the right and bleeding off the left edge.
- `container`: turns any element into an inline-size query container, so the utilities that measure their surroundings have something to measure; see Breakpoints and Responsive.
- `containerNone`: cancels container on the same element, so it stops acting as a query container and the nearest marked ancestor is measured instead.

## Related elements

### PGS

- `flexColumn`: vertically organizes sections and inner content.
- `flexRow`: places the text and the image of an edge section side by side.
- `card-img`: reuses card image treatment in the demonstration sections.
- `imgCover`: scales images to the section width.
- `hideContainerDownTablet`: hides its element while the surrounding container is at most 800px wide; see Breakpoints for the whole family.
- `box`: makes the container example visible as a surface.

### PGS Options

- `gapElements`: applies element spacing inside each section.

### Other

- `gapSections`: applies section spacing to the outer collection.

## CSS Variables

- `--section-width`

## Output

HTML collection of the available section variants.
## Examples

### Standard section

Default section width and padding with centered content.

```html
<section pgs="section flexColumn" pgs-option="gapElements">
    <div pgs="flexColumn">
        <strong>Lorem ipsum dolor</strong>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
</section>
```

### Full-width section

Section that spans the full available width using sectionFull.

```html
<section pgs="sectionFull flexColumn" pgs-option="gapElements">
    <div pgs="flexColumn">
        <strong>Sit amet consectetur</strong>
        <p>Sed do eiusmod tempor incididunt ut labore et dolore.</p>
    </div>
</section>
```

### Specificity-child section

Section applying a specific structure to its child element using sectionSpecificity.

```html
<section pgs="sectionSpecificity flexColumn" pgs-option="gapElements">
    <div pgs="flexColumn">
        <img pgs="card-img imgCover" src="../assets/placeholder.jpg" alt="Placeholder image">
    </div>
    <div pgs="sectionSpecificity-child flexColumn">
        <strong>Adipiscing elit sed</strong>
        <p>Ut enim ad minim veniam, quis nostrud exercitation.</p>
    </div>
</section>
```

### Query container

container is what the hideContainer* utilities and every container query measure themselves against. Without it the nearest marked ancestor is used instead, and the element reacts to the wrong width.

```html
<section pgs="section flexColumn" pgs-option="gapElements">
    <div pgs="container">
        <span pgs="box hideContainerDownTablet">Hidden while this container is at most 800px wide.</span>
    </div>
</section>
```

### Cancelled query container

containerNone on the same element cancels container, so the utilities inside measure the nearest marked ancestor instead of this one.

```html
<section pgs="section flexColumn" pgs-option="gapElements">
    <div pgs="container containerNone">
        <span pgs="box hideContainerDownTablet">Measures the surrounding page instead of this element.</span>
    </div>
</section>
```

### Edge section

A full-width row aligned with the page column on one side only, so the image runs past the column on the other. The aligned side keeps at least the page padding, so it still breathes on a narrow screen.

```html
<section pgs="sectionEdgeLeft">
    <div pgs="flexRow" pgs-option="gapElements">
        <p>Text that starts exactly where the centred page column starts, while the image beside it runs on past the column to the right.</p>
        <img pgs="card-img imgCover" src="../assets/placeholder.jpg" alt="Placeholder image">
    </div>
</section>
```


```html
<section pgs="sectionEdgeRight">
    <div pgs="flexRow" pgs-option="gapElements">
        <img pgs="card-img imgCover" src="../assets/placeholder.jpg" alt="Placeholder image">
        <p>The mirror: the text ends where the page column ends, and the image runs on past it to the left.</p>
    </div>
</section>
```

### Flush edge section

Measured with --page-edgeFlush instead: the offset lands on the outer edge of a centred section rather than on its text, and is allowed to fall to zero, so as soon as the section box no longer fits the content touches the edge of the screen. The opposite side carries no padding either, so the row bleeds right off it. Slides uses this for its first and last slide.

```html
<section pgs="sectionEdgeFlushLeft">
    <div pgs="flexRow" pgs-option="gapElements">
        <p>Below the page width this text is flush against the left edge of the screen, with no padding left to hold it off.</p>
        <img pgs="card-img imgCover" src="../assets/placeholder.jpg" alt="Placeholder image">
    </div>
</section>
```


```html
<section pgs="sectionEdgeFlushRight">
    <div pgs="flexRow" pgs-option="gapElements">
        <img pgs="card-img imgCover" src="../assets/placeholder.jpg" alt="Placeholder image">
        <p>The mirror, flush against the right edge of the screen.</p>
    </div>
</section>
```

### Max-width section

Section with an extended maximum width using sectionMax.

```html
<section pgs="sectionMax flexColumn" pgs-option="gapElements" style="background-color: var(--color-primary-soft)">
    <div pgs="flexColumn">
        <strong>Do eiusmod tempor</strong>
        <p>Duis aute irure dolor in reprehenderit in voluptate.</p>
    </div>
</section>
```

### No padding section

Section without the standard padding using sectionNoPadding, useful for edge-to-edge images.

```html
<section pgs="sectionNoPadding flexColumn" pgs-option="gapElements">
    <div pgs="flexColumn">
        <img pgs="card-img imgCover" src="../assets/placeholder.jpg" alt="Placeholder image">
    </div>
</section>
```
