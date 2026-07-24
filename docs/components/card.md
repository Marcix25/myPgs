<!-- Automatically generated from reference/html/components/card.html. Edit reference/html/components/card.html and run npm run docs:generate again. -->

# Card

Reusable container for grouping an image, title, text, and actions in responsive previews or collections.

## PGS

- `card`: identifies the main card container.
- `card-img`: identifies the main card image.

## PGS Options

- `column-2`: configures the related flex layout with two columns.

## Related elements

- `flexRow`: arranges the cards in a responsive layout.
- `flexColumn`: organizes the card or link content vertically.
- `imgCover`: scales the image to fill the available area.
- `button`: presents the final link as a standard button.

## Output

Two card HTML structures, one with a separate action and one that is fully clickable.

## Example

```html
<div pgs="flexRow" pgs-option="column-2">

    <article pgs="card flexColumn">
        <img pgs="card-img imgCover" src="https://placehold.co/800x500" alt="Placeholder image">
        
        <div pgs="flexColumn">
            <h3>Reusable card</h3>
            <p>Descriptive card content suitable for lists, previews, and grids.</p>
            <a pgs="button" href="#">Read more</a>
        </div>
    </article>
    
    <article pgs="card">
        <a pgs="flexColumn" href="">
            <img pgs="card-img imgCover" src="https://placehold.co/800x500" alt="Placeholder image">
            
            <div pgs="flexColumn">
                <h3>Reusable card</h3>
                <p>Descriptive card content suitable for lists, previews, and grids.</p>
            </div>
        </a>
    </article>
</div>
```
