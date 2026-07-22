<!-- Automatically generated from templates/html/layout/body.html. Edit templates/html/layout/body.html and run npm run docs:generate again. -->

# Body

Base HTML document that enables MyPGS, configures essential metadata, and applies shared background, text, and heading variants to the body.

## PGS

- `htmlBase`: applies the fundamental rules to the html element.
- `initP`: enables layout, component, and pattern styles scoped to the MyPGS namespace.
- `bodyBase`: applies the base structure and spacing to the body.
- `bodyImg`: enables shared rules for images contained in the page.
- `bodyText`: enables text typography and spacing.
- `bodyHeading`: enables the typographic heading hierarchy.

## PGS States

- `darkmode`: is applied dynamically to html and body to activate the dark theme.

## Output

Complete HTML skeleton required to initialize the MyPGS library.

## Example

```html
<!DOCTYPE html>
<html lang="it-IT" pgs="htmlBase initP">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<!-- Colori Browsers -->
	<meta name="theme-color" content="">
	<meta name="apple-mobile-web-app-status-bar-color" content="">

</head>

<body pgs="bodyBase bodyImg bodyText bodyHeading" >
```
