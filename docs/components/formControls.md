<!-- Automatically generated from reference/html/components/formControls.html. Edit reference/html/components/formControls.html and run npm run docs:generate again. -->

# Form Controls

The secondary controls of a form: a range slider, a file input, a color input and a select, each one with its own token, anywhere on the page. A text-like input, a textarea, a checkbox and a radio are in Form.

## PGS

- `select`: applies the look of an input to a native select. In a field it keeps its token and the field reshapes it (the padding of the field and room above for the label; the field adds the background and the radius around it, and no border), and its first option takes the part of the placeholder, <option value="" selected disabled>Choose a country</option> (the value must be empty, so the browser still counts a required select as empty; disabled keeps it from being chosen again). A select with the multiple attribute is a list that is always open: the options are spaced, the ones that are chosen take the current color, the hovered one the hover color and a disabled one a lighter one (Safari draws the list itself and ignores the colors of the options).
- `range`: styles a native range slider, a rounded track and a thumb that grows on hover, anywhere on the page. The track is --range-background (the clickable background), the part the thumb has already passed is filled with --range-background-progress (the two-state background) and the thumb is --range-background-thumb (the two-state color), with the clickable border and the hover background; --_range-progress, which pgs.range keeps up to date on the slider, tells where the thumb is; a disabled slider is dimmed.
- `file`: styles a native file input, anywhere on the page: the box has the look of an input (--input-padding, --input-border, --input-borderRadius, --input-background) and its button the look of a button, in the clickable colors with the hover ones under the pointer.
- `inputColor`: styles a native color input, anywhere on the page: a box of --inputColor-width (10rem) by --inputColor-height (5rem) holding the swatch, with the border and the radius of an input.

## JavaScript API

- `pgs.range.init(root)`: reads every input of type range inside the Document or Element, or the element itself, and keeps its --_range-progress up to date while it moves; runs on page load and again via pgs.helper.init(root) for content added later.
- `pgs.range.api(input)`: the instance of one slider, with element, update() to read the value again after a script wrote it (a script raises no event), destroy() and refresh().

## Related elements

### PGS

- `flex`: provides the flex layout; direction and spacing are flags in its bracket.
- `form`: identifies the form that holds the examples, laid out in a column; it styles none of the controls; see Form.
- `label`: the box sitting on top of each control (label['labelTab'] makes it a tab), written on a span inside the label that wraps it; see Form.

### PGS Options (component brackets)

- `column`: vertically arranges each example with its heading and control.
- `gapElements`: applies element spacing between the examples.

## Output

HTML examples of the range, file, inputColor and select controls using native inputs.
## Examples

### Range

A slider with a rounded track, filled up to the thumb.

```html
<label>
    <span pgs="label">Range</span>
    <input pgs="range" type="range" name="volume" min="0" max="100" value="40">
</label>
```

### File

A native file input, with its button.

```html
<label>
    <span pgs="label">File</span>
    <input pgs="file" type="file" name="attachment">
</label>
```

### Color

A native color input, a box that holds the swatch.

```html
<label>
    <span pgs="label">Color</span>
    <input pgs="inputColor" type="color" name="accent" value="#3aa561">
</label>
```

### Select

A native select with the look of an input; its first option is the placeholder.

```html
<label>
    <span pgs="label">Country</span>
    <select pgs="select" name="country" required>
        <option value="" selected disabled>Choose a country</option>
        <option value="it">Italy</option>
        <option value="fr">France</option>
    </select>
</label>
```

### Select, several options

A select with the multiple attribute is a list that is always open.

```html
<label>
    <span pgs="label">Languages</span>
    <select pgs="select" name="languages" multiple size="4">
        <option value="it" selected>Italian</option>
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="de" disabled>German, not available</option>
    </select>
</label>
```
