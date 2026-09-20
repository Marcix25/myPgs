<!-- Automatically generated from reference/html/layout/utilities.html. Edit reference/html/layout/utilities.html and run npm run docs:generate again. -->

# Utilities

Focused layout, content, interaction, accessibility, and semantic-color utilities. Responsive visibility lives in Breakpoints.

## PGS

- `aspectSquare`: gives an element a 1:1 aspect ratio; aspect['square'] does the same, both forms stay valid.
- `aspectVideo`: gives an element a 16:9 aspect ratio; aspect['video'] does the same, both forms stay valid.
- `block`: displays an element as a block.
- `cursorNotAllowed`: shows the unavailable cursor.
- `minWidth0`: allows flex or grid content to shrink below its intrinsic width.
- `overflow`: adds scrolling or clips overflowing content on both axes, or on one axis only with an axis option next to the scrolling behavior in its bracket.
- `pointerEventsAuto`: restores pointer interaction; pointerEvents['auto'] does the same, both forms stay valid.
- `pointerEventsNone`: ignores pointer interaction; pointerEvents['none'] does the same, both forms stay valid.
- `positionAbsolute`: positions an element absolutely; position['absolute'] does the same, both forms stay valid.
- `positionRelative`: creates a positioning context; position['relative'] does the same, both forms stay valid.
- `positionSticky`: keeps an element sticky when offsets are supplied by the surrounding layout; position['sticky'] does the same, both forms stay valid.
- `rotate`: rotates an element 180 degrees when written bare; a degree option in its bracket picks a different amount instead.
- `selectNone`: prevents text selection; select['none'] does the same, both forms stay valid.
- `selectText`: enables text selection; select['text'] does the same, both forms stay valid.
- `truncate`: limits text to one line and adds an ellipsis when it overflows.

## PGS Options (component brackets)

- `auto`: inside overflow's own bracket, adds scrolling only when content overflows.
- `hidden`: inside overflow's own bracket, clips overflowing content.
- `x`: inside overflow's own bracket, next to auto or hidden, applies it to the horizontal axis only instead of both.
- `y`: inside overflow's own bracket, next to auto or hidden, applies it to the vertical axis only instead of both.
- `0`: inside rotate's own bracket, resets the rotation back to 0 degrees.
- `90`: inside rotate's own bracket, rotates 90 degrees clockwise.
- `180`: inside rotate's own bracket, rotates 180 degrees; this is also the default with no bracket at all.
- `270`: inside rotate's own bracket, rotates 270 degrees clockwise (90 degrees counter-clockwise).

## Related elements

### PGS

- `flex`: provides the flex layout; direction and spacing are flags in its bracket.
- `box`: makes demonstration cells visible.
- `bgInfo`: applies the semantic info color as the background.
- `brInfo`: applies the semantic info color as the border color.
- `txtInfo`: applies the semantic info color to text.
- `flex-flex1`: lets a flex item grow and shrink to occupy available space.
- `flex-flexNone`: prevents a flex item from growing or shrinking.
- `flex-flexOrderFirst`: places a flex item before its siblings.
- `flex-flexOrderLast`: places a flex item after its siblings.
- `focusRing`: shows the shared focus ring when keyboard focus is visible.
- `motionReduce`: removes non-essential animation and transitions when reduced motion is preferred.
- `skipLink`: creates a link that is revealed only when keyboard-focused.
- `visuallyHidden`: hides content visually while keeping it available to assistive technology.
- `visuallyHiddenFocusable`: hides content until it or one of its children receives focus.
- `icon`: draws the glyph rotated by the example; see Icon for the whole set.

### PGS Options (component brackets)

- `column`: stacks demonstration groups vertically.
- `row`: arranges demonstration items in a row.
- `gapSections`: separates the demonstration sections.
- `gapTexts`: separates items within each demonstration group.
- `wrap`: allows the layout examples to wrap onto multiple rows.
- `flexCenter`: centers items on both axes in a flex container.
- `inlineFlex`: displays a flex container inline.
- `icon-chevronDown`: the glyph rotated in the example, standing in for any icon that needs to point another way.

### Other

- `container`: establishes an inline-size container; see Breakpoints for hide's containerDown* and containerUp* options measured against it.

## Output

Examples of the standalone MyPGS utility API.

## Example

```html
<a pgs="skipLink" href="#utility-content">Skip to utility examples</a>

<main id="utility-content" pgs="flex['column' 'gapSections']">
    <section pgs="flex['column' 'gapTexts']">
        <strong>Layout</strong>
        <div pgs="flex['row' 'gapTexts' 'wrap']">
            <span pgs="box block">Block</span>
            <span pgs="box flex['row' 'inlineFlex']">Inline flex</span>
            <span pgs="box flex['row' 'flexCenter'] aspectSquare">Centered</span>
        </div>
        <div pgs="flex['row' 'gapTexts']">
            <span pgs="box flex['row'] flex-flexNone">Fixed</span>
            <span pgs="box flex['row'] minWidth0 truncate flex-flex1">Flexible content that is safely truncated when needed.</span>
            <span pgs="box flex['column'] flex-flexOrderFirst">First</span>
            <span pgs="box flex['column'] flex-flexOrderLast">Last</span>
        </div>
        <div pgs="box positionRelative">
            Relative parent
            <span pgs="positionAbsolute">Absolute child</span>
        </div>
        <aside pgs="box positionSticky">Sticky element</aside>
        <div pgs="flex['row' 'gapTexts']">
            <i pgs="icon['icon-chevronDown'] rotate['0']" aria-hidden="true"></i>
            <i pgs="icon['icon-chevronDown'] rotate['90']" aria-hidden="true"></i>
            <i pgs="icon['icon-chevronDown'] rotate" aria-hidden="true"></i>
            <i pgs="icon['icon-chevronDown'] rotate['270']" aria-hidden="true"></i>
        </div>
    </section>

    <section pgs="flex['column' 'gapTexts']">
        <strong>Content and interaction</strong>
        <div pgs="box overflow['auto']">Scrollable content when its container has constrained dimensions.</div>
        <div pgs="box overflow['auto' 'x']">Horizontally scrollable content when required.</div>
        <div pgs="box overflow['hidden']">Overflowing content is clipped.</div>
        <div pgs="box aspectVideo">16:9 media area</div>
        <span pgs="selectNone">Selection disabled</span>
        <span pgs="selectText">Selection enabled</span>
        <span pgs="pointerEventsNone">Pointer events disabled</span>
        <span pgs="pointerEventsAuto">Pointer events enabled</span>
        <button type="button" pgs="cursorNotAllowed">Unavailable action</button>
    </section>

    <section pgs="flex['column' 'gapTexts']">
        <strong>Accessibility and color</strong>
        <button type="button" pgs="focusRing">Keyboard focus ring</button>
        <span pgs="visuallyHidden">Screen-reader-only description.</span>
        <a pgs="visuallyHiddenFocusable" href="#utility-content">Visible while focused</a>
        <span pgs="motionReduce">Motion is reduced for users who request it.</span>
        <span pgs="bgInfo brInfo">Info background</span>
        <span pgs="txtInfo">Info text</span>
    </section>
</main>
```
