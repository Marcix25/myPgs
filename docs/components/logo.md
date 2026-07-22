<!-- Automatically generated from templates/html/components/logo.html. Edit templates/html/components/logo.html and run npm run docs:generate again. -->

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

## Output

HTML examples of the theme-aware graphical logo and the text logo.

## Example

```html
<a aria-label="Logo" pgs="logo" pgs-option="logoDarkmode" href="/">
    <img pgs="logo-image" src="https://placehold.co/240x80?text=MyPGS" alt="MyPGS">
</a>

<a aria-label="Text logo" pgs="logo" href="/">
    <span pgs="logo-text">MyPGS</span>
</a>
```
