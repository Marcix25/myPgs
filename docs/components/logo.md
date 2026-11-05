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

## PGS States

- `darkmode`: global document state that activates the darkmode variant.

## CSS Variables

- `--logo-filter`
- `--logo-height`

## Output

HTML examples of the graphical logo, the same logo inverted in dark mode, the text logo and the always-inverted logo.
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
