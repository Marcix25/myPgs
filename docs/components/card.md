<!-- Automatically generated from reference/html/components/card.html. Edit reference/html/components/card.html and run npm run docs:generate again. -->

# Card and Box

Reusable surfaces for presenting structured card content or grouping simpler content inside a box.

## PGS

- `card`: identifies the main card container.
- `card-img`: identifies the main card image.
- `card-content`: groups the text and actions of a card.
- `box`: identifies a lightweight content container or clickable surface.

## PGS Options

- `cardHorizontal`: switches intrinsically between a horizontal 40/60 layout and a stacked layout according to the card's available width.
- `cardMini`: reduces the card content padding.
- `boxMini`: reduces the box padding.

## Related elements

### PGS

- `button`: presents the card action as a standard button.
- `marginTop`: separates the card action from the preceding text.

## Output

Standard, clickable, horizontal, and compact cards followed by standard, compact, and clickable boxes.

## Example

### Standard card

Descriptive card content suitable for lists, previews, and grids.

```html
<article pgs="card">
    <img pgs="card-img" src="https://placehold.net/600x400.png" alt="Placeholder image">

    <div pgs="card-content">
        <h3>Lorem ipsum dolor</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <a pgs="button marginTop" href="#">Read more</a>
    </div>
</article>
```

### Clickable card

The complete card surface behaves as a link.

```html
<article pgs="card">
    <a href="#">
        <img pgs="card-img" src="https://placehold.net/600x400.png" alt="Placeholder image">

        <div pgs="card-content">
            <h3>Sit amet consectetur</h3>
            <p>Sed do eiusmod tempor incididunt ut labore et dolore.</p>
        </div>
    </a>
</article>
```

### Horizontal card

This card switches intrinsically between horizontal and stacked layouts.

```html
<article pgs="card" pgs-option="cardHorizontal">
    <img pgs="card-img" src="https://placehold.net/600x400.png" alt="Placeholder image">

    <div pgs="card-content">
        <h3>Adipiscing elit sed</h3>
        <p>Ut enim ad minim veniam, quis nostrud exercitation.</p>
    </div>
</article>
```

### Compact card

The compact option reduces the content padding.

```html
<article pgs="card" pgs-option="cardMini">
    <img pgs="card-img" src="https://placehold.net/600x400.png" alt="Placeholder image">

    <div pgs="card-content">
        <h3>Do eiusmod tempor</h3>
        <p>Duis aute irure dolor in reprehenderit in voluptate.</p>
    </div>
</article>
```

### Standard box

Lightweight content grouped inside a neutral surface.

```html
<div pgs="box">
    <h3>Ut labore et</h3>
    <p>Excepteur sint occaecat cupidatat non proident sunt.</p>
</div>
```

### Clickable box

The complete box surface behaves as a link.

```html
<a pgs="box" href="#">
    <h3>Dolore magna aliqua</h3>
    <p>Sunt in culpa qui officia deserunt mollit anim.</p>
</a>
```

### Compact box

The compact option reduces the internal spacing.

```html
<div pgs="box" pgs-option="boxMini">
    <h3>Enim ad minim</h3>
    <p>Ut labore et dolore magna aliqua ut enim.</p>
</div>
```
