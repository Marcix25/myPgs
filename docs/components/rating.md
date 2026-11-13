<!-- Automatically generated from reference/html/components/rating.html. Edit reference/html/components/rating.html and run npm run docs:generate again. -->

# Rating

A score drawn as a row of stars. Read only, it is one element: --rating-value sets the score, any fraction included, --rating-max the number of stars (5 by default), and role="img" with an aria-label gives assistive technology the score as text. With ratingInput it becomes the control that sets the score: a fieldset with one radio per star, which keeps the keyboard, the form value and required, and fills the stars up to the checked one, previewing under the pointer the score it would set. --rating-size, --rating-gap, --rating-color, --rating-color-empty and --rating-color-hover restyle both.

## PGS

- `rating`: identifies the row of stars.
- `rating-star`: identifies, inside ratingInput, the label that draws one star around its radio.

## PGS Options (component brackets)

- `ratingInput`: turns the row into a fieldset of radios, one per star, that sets the score.

## Related elements

### PGS

- `flex`: stacks the read-only examples; direction and spacing are flags in its bracket.
- `legend`: names the rating control.
- `visuallyHidden`: names each star for assistive technology.

### PGS Options (component brackets)

- `column`: inside flex's own bracket, stacks them.
- `gapDetails`: inside flex's own bracket, spaces them.

## CSS Variables

- `--rating-color`
- `--rating-color-empty`
- `--rating-color-hover`
- `--rating-gap`
- `--rating-max`
- `--rating-size`
- `--rating-value`

## Output

A read-only score, and the fieldset that sets one.
## Examples

### Score

Read only: the score is --rating-value, a fraction fills part of a star.

```html
<span pgs="rating" style="--rating-value: 4.5" role="img" aria-label="Rated 4.5 out of 5"></span>
<span pgs="rating" style="--rating-value: 3" role="img" aria-label="Rated 3 out of 5"></span>
<span pgs="rating" style="--rating-value: 1.3; --rating-size: 2em" role="img" aria-label="Rated 1.3 out of 5"></span>
```

### Input

ratingInput: one radio per star, all with the same name. The checked star and the ones before it are full.

```html
<fieldset pgs="rating['ratingInput']">
    <legend pgs="legend">Your rating</legend>
    <label pgs="rating-star"><input type="radio" name="rating" value="1" required><span pgs="visuallyHidden">1 out of 5</span></label>
    <label pgs="rating-star"><input type="radio" name="rating" value="2"><span pgs="visuallyHidden">2 out of 5</span></label>
    <label pgs="rating-star"><input type="radio" name="rating" value="3"><span pgs="visuallyHidden">3 out of 5</span></label>
    <label pgs="rating-star"><input type="radio" name="rating" value="4"><span pgs="visuallyHidden">4 out of 5</span></label>
    <label pgs="rating-star"><input type="radio" name="rating" value="5"><span pgs="visuallyHidden">5 out of 5</span></label>
</fieldset>
```
