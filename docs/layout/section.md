<!-- Automatically generated from reference/html/layout/section.html. Edit reference/html/layout/section.html and run npm run docs:generate again. -->

# Section

Section variants that control width, padding, and specific content treatment while preserving shared vertical spacing.

## PGS

- `section`: identifies the standard section with centered content.
- `sectionFull`: identifies a section that spans the full available width.
- `sectionSpecificity`: identifies a section that applies a specific structure to its child.
- `sectionSpecificity-child`: identifies child content managed by the sectionSpecificity variant.
- `sectionMax`: identifies a section with an extended maximum width.
- `sectionNoPadding`: identifies a section without standard padding.

## Related elements

- `flexColumn`: vertically organizes sections and inner content.
- `gapSections`: applies section spacing to the outer collection.
- `gapElements`: applies element spacing inside each section.
- `card-img`: reuses card image treatment in the demonstration sections.
- `imgCover`: scales images to the section width.

## Output

HTML collection of the available section variants.

## Example

```html
<div pgs="flexColumn gapSections">
    <section pgs="section flexColumn gapElements">
        <div pgs="flexColumn">
            <strong>Standard section</strong>
            <p>Centered content inside a MyPGS section.</p>
        </div>
    </section>

    <section pgs="sectionFull flexColumn gapElements">
        <div pgs="flexColumn">
            <strong>Full-width section</strong>
            <p>Centered content inside a MyPGS section.</p>
        </div>
    </section>

    <section pgs="sectionSpecificity flexColumn gapElements">
        <div pgs="flexColumn">
            <img pgs="card-img imgCover" src="https://placehold.co/800x200?text=Hero" alt="Placeholder image">
        </div>
        <div pgs="sectionSpecificity-child flexColumn">
            <strong>Specificity-child section</strong>
            <p>Centered content inside a MyPGS section.</p>
        </div>
    </section>

    <section pgs="sectionMax flexColumn gapElements" style="background-color: var(--color-primary-soft)">
        <div pgs="flexColumn">
            <strong>Max-width section</strong>
            <p>Centered content inside a MyPGS section.</p>
        </div>
    </section>

    <section pgs="sectionNoPadding flexColumn gapElements">
        <div pgs="flexColumn">
            <img pgs="card-img imgCover" src="https://placehold.co/800x500?text=HI!" alt="Placeholder image">
        </div>
    </section>
</div>
```
