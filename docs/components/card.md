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
        <h3>Standard card</h3>
        <p>Descriptive card content suitable for lists, previews, and grids.</p>
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
            <h3>Clickable card</h3>
            <p>The complete card surface behaves as a link.</p>
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
        <h3>Horizontal card</h3>
        <p>This card switches intrinsically between horizontal and stacked layouts.</p>
    </div>
</article>
```

### Compact card

The compact option reduces the content padding.

```html
<article pgs="card" pgs-option="cardMini">
    <img pgs="card-img" src="https://placehold.net/600x400.png" alt="Placeholder image">

    <div pgs="card-content">
        <h3>Compact card</h3>
        <p>The compact option reduces the content padding.</p>
    </div>
</article>
```

### Standard box

Lightweight content grouped inside a neutral surface.

```html
<div pgs="box">
    <h3>Standard box</h3>
    <p>Lightweight content grouped inside a neutral surface.</p>
</div>
```

### Clickable box

The complete box surface behaves as a link.

```html
<a pgs="box" href="#">
    <h3>Clickable box</h3>
    <p>The complete box surface behaves as a link.</p>
</a>
```

### Compact box

The compact option reduces the internal spacing.

```html
<div pgs="box" pgs-option="boxMini">
    <h3>Compact box</h3>
    <p>The compact option reduces the internal spacing.</p>
</div>
```
