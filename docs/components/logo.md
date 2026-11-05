<!-- Automatically generated from reference/html/components/logo.html. Edit reference/html/components/logo.html and run npm run docs:generate again. -->

# Logo

Component for displaying a graphical or text logo, with image variants that support dark mode.

## PGS

- `logo`: identifies the brand link container.
- `logo-image`: identifies the graphical logo image.
- `logo-text`: identifies the text-based brand variant.

## PGS Options (component brackets)

- `logoDarkmode`: inverts the logo image when the global darkmode state is active.
- `logoDarkmodeFixed`: keeps the image inversion enabled regardless of the current theme.
- `logoFooter`: the big logo of a footer's brand column: --logo-height becomes 200px with the image in a square box, and --logo-textSize 4rem.

## PGS States

- `darkmode`: global document state that activates the darkmode variant.

## CSS Variables

- `--logo-filter`
- `--logo-height`
- `--logo-textSize`

## Output

HTML examples of the graphical logo, the same logo inverted in dark mode, the text logo, the always-inverted logo and the big footer logo.
## Examples

### Graphical logo

Image-based brand logo, shown as it is in both themes.

```html
<a aria-label="Logo" pgs="logo" href="/">
    <img pgs="logo-image" src="../assets/img/logo.svg" alt="MyPGS">
</a>
```

### Dark mode logo

The same logo with logoDarkmode: it inverts automatically when dark mode is active.

```html
<a aria-label="Logo" pgs="logo['logoDarkmode']" href="/">
    <img pgs="logo-image" src="../assets/img/logo.svg" alt="MyPGS">
</a>
```

### Text logo

Text-based brand variant, used when no logo image is available.

```html
<a aria-label="Text logo" pgs="logo" href="/">
    <span pgs="logo-text">MyPGS</span>
</a>
```

### Always-inverted logo

Image-based brand logo that stays inverted using logoDarkmodeFixed, regardless of the current theme.

```html
<a aria-label="Logo" pgs="logo['logoDarkmodeFixed']" href="/">
    <img pgs="logo-image" src="../assets/img/logo.svg" alt="MyPGS">
</a>
```

### Footer logo (logoFooter)

logoFooter makes the logo big, for the brand column of a footer: the image 200px tall in a square box, the text at 4rem.

```html
<a aria-label="Logo" pgs="logo['logoFooter']" href="/">
    <img pgs="logo-image" src="../assets/img/logo.svg" alt="MyPGS">
</a>
```
