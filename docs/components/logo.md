<!-- Automatically generated from reference/html/components/logo.html. Edit reference/html/components/logo.html and run npm run docs:generate again. -->

# Logo

Component for displaying a graphical or text logo, with image variants that support dark mode.

## PGS

- `logo`: identifies the brand link container.
- `logo-image`: identifies the graphical logo image.
- `logo-text`: identifies the text-based brand variant.

## PGS Options

- `logoDarkmode`: inverts the logo image when the global darkmode state is active.
- `logoDarkmodeFixed`: keeps the image inversion enabled regardless of the current theme.

## PGS States

- `darkmode`: global document state that activates the logoDarkmode variant.

## CSS Variables

- `--logo-finter`
- `--logo-height`

## Output

HTML examples of the theme-aware graphical logo and the text logo.

## Example

```html
<a aria-label="Logo" pgs="logo" pgs-option="logoDarkmode" href="/" demo="component" demo-title="Graphical logo" demo-description="Image-based brand logo that inverts automatically when dark mode is active.">
    <img pgs="logo-image" src="https://placehold.co/240x80?text=MyPGS" alt="MyPGS">
</a>

<a aria-label="Text logo" pgs="logo" href="/" demo="component" demo-title="Text logo" demo-description="Text-based brand variant, used when no logo image is available.">
    <span pgs="logo-text">MyPGS</span>
</a>

<a aria-label="Logo" pgs="logo" pgs-option="logoDarkmodeFixed" href="/" demo="component" demo-title="Always-inverted logo" demo-description="Image-based brand logo that stays inverted using logoDarkmodeFixed, regardless of the current theme.">
    <img pgs="logo-image" src="https://placehold.co/240x80?text=MyPGS" alt="MyPGS">
</a>
```
