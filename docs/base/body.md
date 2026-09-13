<!-- Automatically generated from reference/html/base/body.html. Edit reference/html/base/body.html and run npm run docs:generate again. -->

# Html and Body

Base HTML document that enables MyPGS: the root rules and the shared custom property scope on the html element, the essential metadata, and the background, image, text and heading variants on the body.

## PGS

- `htmlBase`: applies the fundamental rules and the CSS custom property scope to the html element.
- `bodyBase`: applies the base structure and spacing to the body.
- `bodyImg`: enables shared rules for images contained in the page. It also sizes every <i> and every icon element from --icon-size, which is what gives an icon font the same box the library's own glyphs get; a page whose icon font wants a size of its own sets --fa-size, read here in preference to --icon-size.
- `bodyText`: enables text typography and spacing.
- `bodyHeading`: enables the typographic heading hierarchy.

## PGS States

- `darkmode`: is applied dynamically to html and body to activate the dark theme.

## Output

Complete HTML skeleton required to initialize the MyPGS library.

## Example

```html
<!DOCTYPE html>
<html lang="it-IT" pgs="htmlBase">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>MyPGS</title>

	<!-- Colori Browsers -->
	<meta name="theme-color" content="">
	<meta name="apple-mobile-web-app-status-bar-color" content="">

	<link rel="stylesheet" href="../dist/css/index.css">
	<script src="../dist/javascript/index.js"></script>
</head>

<body pgs="bodyBase bodyImg bodyText bodyHeading">

</body>

</html>
```
