<!-- Automatically generated from reference/html/components/card.html. Edit reference/html/components/card.html and run npm run docs:generate again. -->

# Card and Box

Reusable surfaces for presenting structured card content or grouping simpler content inside a box.

## PGS

- `card`: identifies the main card container. Written on an `<a>` it becomes a clickable surface, and `pgs.hover` marks it with `hover` on a page that carries `bodyHoverAuto`, so it takes the shared hover and focus treatment; see Html and Body.
- `card-img`: identifies the main card image.
- `card-content`: groups the text and actions of a card.
- `box`: identifies a lightweight content container or clickable surface. Written on an `<a>` it is marked with `hover` the same way a clickable card is.

## PGS Options (component brackets)

- `cardHorizontal`: switches intrinsically between a horizontal 40/60 layout and a stacked layout according to the card's available width.
- `cardHorizontalFixed`: the same 40/60 layout as cardHorizontal, with no container query behind it — the card reads side-by-side whatever its own width is, which is what a card already known to be wide enough, or one deliberately narrow but still meant to stay horizontal, wants instead of the responsive switch.
- `cardMini`: reduces the card content padding.
- `cardLegacy`: the card the library drew before the padding moved onto card-content: the card itself is padded and the image is pulled out to the edges with negative margins. It is kept for pages built around that geometry — a new card wants neither the option nor a card-content of its own to place the image.
- `boxMini`: reduces the box padding.

## Related elements

### PGS

- `button`: presents the card action as a standard button.
- `marginTop`: separates the card action from the preceding text.

### Other

- `hover`: the treatment a clickable card or box receives, added by pgs.hover on a page that carries bodyHoverAuto, rather than written by hand; see Hover.
- `hoverNot`: available on a clickable card or box that must stay inert; see Hover.

## CSS Variables

- `--card-background`
- `--card-borderRadius`
- `--card-borderRadius-item`
- `--card-horizontal-borderRadius-item`
- `--card-horizontal-content-grow`
- `--card-horizontal-img-grow`
- `--card-horizontal-img-minHeight`
- `--card-img-base`
- `--card-img-margin-bottom`
- `--card-img-margin-left`
- `--card-img-margin-right`
- `--card-img-margin-top`
- `--card-img-padding`
- `--card-padding`

## Output

Standard, clickable, horizontal, and compact cards followed by standard, compact, and clickable boxes.
## Examples

### Standard card

Descriptive card content suitable for lists, previews, and grids.

```html
<article pgs="card">
    <img pgs="card-img" src="../assets/img/placeholder.jpg" alt="Placeholder image">

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
<article>
    <a href="#" pgs="card">
        <img pgs="card-img" src="../assets/img/placeholder.jpg" alt="Placeholder image">

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
<article pgs="card['cardHorizontal']">
    <img pgs="card-img" src="../assets/img/placeholder.jpg" alt="Placeholder image">

    <div pgs="card-content">
        <h3>Adipiscing elit sed</h3>
        <p>Ut enim ad minim veniam, quis nostrud exercitation.</p>
    </div>
</article>
```

### Fixed horizontal card

cardHorizontalFixed keeps the row layout with no container query behind it, so it stays side-by-side even narrower than cardHorizontal's own breakpoint would allow.

```html
<article pgs="card['cardHorizontalFixed']">
    <img pgs="card-img" src="../assets/img/placeholder.jpg" alt="Placeholder image">

    <div pgs="card-content">
        <h3>Sed do eiusmod</h3>
        <p>Tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
</article>
```

### Compact card

The compact option reduces the content padding.

```html
<article pgs="card['cardMini']">
    <img pgs="card-img" src="../assets/img/placeholder.jpg" alt="Placeholder image">

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
<div pgs="box['boxMini']">
    <h3>Enim ad minim</h3>
    <p>Ut labore et dolore magna aliqua ut enim.</p>
</div>
```
