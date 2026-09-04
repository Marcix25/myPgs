<!-- Automatically generated from reference/html/layout/section.html. Edit reference/html/layout/section.html and run npm run docs:generate again. -->

# Section

Section variants that control width, padding, and specific content treatment while preserving shared vertical spacing.

## PGS

- `main`: identifies the main page area that stacks the sections, spacing them apart and filling the viewport height.
- `section`: identifies the standard section with centered content.
- `sectionFull`: identifies a section that spans the full available width.
- `sectionSpecificity`: identifies a section that applies a specific structure to its child.
- `sectionSpecificity-child`: identifies child content managed by the sectionSpecificity variant.
- `sectionMax`: identifies a section with an extended maximum width.
- `sectionNoPadding`: identifies a section without standard padding.
- `container`: turns any element into an inline-size query container, so the utilities that measure their surroundings have something to measure; see Breakpoints and Responsive.

## Related elements

### PGS

- `flexColumn`: vertically organizes sections and inner content.
- `card-img`: reuses card image treatment in the demonstration sections.
- `imgCover`: scales images to the section width.
- `hideContainerDownTablet`: hides its element while the surrounding container is at most 800px wide; see Breakpoints for the whole family.
- `box`: makes the container example visible as a surface.

### PGS Options

- `gapElements`: applies element spacing inside each section.

### Other

- `gapSections`: applies section spacing to the outer collection.

## Output

HTML collection of the available section variants.

## Example

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
        <img pgs="card-img imgCover" src="https://placehold.co/800x200?text=Hero" alt="Placeholder image">
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
        <img pgs="card-img imgCover" src="https://placehold.co/800x500?text=HI!" alt="Placeholder image">
    </div>
</section>
```
