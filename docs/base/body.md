<!-- Automatically generated from reference/html/base/body.html. Edit reference/html/base/body.html and run npm run docs:generate again. -->

# Html and Body

Base HTML document that enables MyPGS: the root rules and the shared custom property scope on the html element, the essential metadata, and the background, image, text and heading variants on the body.

## PGS

- `htmlBase`: applies the fundamental rules and the CSS custom property scope to the html element.
- `body`: identifies the body element; each style bundle below is an option in its own bracket.

## PGS Options (component brackets)

- `bodyBase`: inside body's own bracket, applies the base structure and spacing to the body.
- `bodyImg`: inside body's own bracket, enables shared rules for images contained in the page.
- `bodyText`: inside body's own bracket, enables text typography and spacing.
- `bodyHeading`: inside body's own bracket, enables the typographic heading hierarchy.

## PGS States

- `darkmode`: is applied dynamically to html and body to activate the dark theme.

## Output

Complete HTML skeleton required to initialize the MyPGS library.

## Example

```html
<!DOCTYPE html>
<html lang="en" pgs="htmlBase">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MyPGS</title>

    <!-- Browser colors -->
    <meta name="theme-color" content="">
    <meta name="apple-mobile-web-app-status-bar-style" content="">

    <link rel="stylesheet" href="../dist/css/index.css">
    <script src="../dist/javascript/index.js"></script>
</head>

<body pgs="body['bodyBase' 'bodyImg' 'bodyText' 'bodyHeading']">

</body>

</html>
```
