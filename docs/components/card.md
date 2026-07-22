<!-- Automatically generated from templates/html/components/card.html. Edit templates/html/components/card.html and run npm run docs:generate again. -->

# Card

Reusable container for grouping an image, title, text, and actions in responsive previews or collections.

## PGS

- `card`: identifies the main card container.
- `card-img`: identifies the main card image.

## Related elements

- `flex-2`: arranges the cards in a responsive two-item layout.
- `flexColumn`: organizes the card or link content vertically.
- `imgCover`: scales the image to fill the available area.
- `flexColumnTexts`: applies vertical spacing to text content.
- `button`: presents the final link as a standard button.

## Output

Two card HTML structures, one with a separate action and one that is fully clickable.

## Example

```html
<div pgs="flex-2">

    <article pgs="card flexColumn">
        <img pgs="card-img imgCover" src="https://placehold.co/800x500" alt="Placeholder image">
        
        <div pgs="flexColumnTexts">
            <h3>Reusable card</h3>
            <p>Descriptive card content suitable for lists, previews, and grids.</p>
            <a pgs="button" href="#">Read more</a>
        </div>
    </article>
    
    <article pgs="card">
        <a pgs="flexColumn" href="">
            <img pgs="card-img imgCover" src="https://placehold.co/800x500" alt="Placeholder image">
            
            <div pgs="flexColumnTexts">
                <h3>Reusable card</h3>
                <p>Descriptive card content suitable for lists, previews, and grids.</p>
            </div>
        </a>
    </article>
</div>
```
