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

## Related elements

### PGS

- `flexColumn`: vertically organizes sections and inner content.
- `gapElements`: applies element spacing inside each section.
- `card-img`: reuses card image treatment in the demonstration sections.
- `imgCover`: scales images to the section width.

### Other

- `gapSections`: applies section spacing to the outer collection.

## Output

HTML collection of the available section variants.

## Example

### Standard section

Default section width and padding with centered content.

```html
<section pgs="section flexColumn gapElements">
    <div pgs="flexColumn">
        <strong>Standard section</strong>
        <p>Centered content inside a MyPGS section.</p>
    </div>
</section>
```

### Full-width section

Section that spans the full available width using sectionFull.

```html
<section pgs="sectionFull flexColumn gapElements">
    <div pgs="flexColumn">
        <strong>Full-width section</strong>
        <p>Centered content inside a MyPGS section.</p>
    </div>
</section>
```

### Specificity-child section

Section applying a specific structure to its child element using sectionSpecificity.

```html
<section pgs="sectionSpecificity flexColumn gapElements">
    <div pgs="flexColumn">
        <img pgs="card-img imgCover" src="https://placehold.co/800x200?text=Hero" alt="Placeholder image">
    </div>
    <div pgs="sectionSpecificity-child flexColumn">
        <strong>Specificity-child section</strong>
        <p>Centered content inside a MyPGS section.</p>
    </div>
</section>
```

### Max-width section

Section with an extended maximum width using sectionMax.

```html
<section pgs="sectionMax flexColumn gapElements" style="background-color: var(--color-primary-soft)">
    <div pgs="flexColumn">
        <strong>Max-width section</strong>
        <p>Centered content inside a MyPGS section.</p>
    </div>
</section>
```

### No padding section

Section without the standard padding using sectionNoPadding, useful for edge-to-edge images.

```html
<section pgs="sectionNoPadding flexColumn gapElements">
    <div pgs="flexColumn">
        <img pgs="card-img imgCover" src="https://placehold.co/800x500?text=HI!" alt="Placeholder image">
    </div>
</section>
```
