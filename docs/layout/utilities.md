<!-- Automatically generated from reference/html/layout/utilities.html. Edit reference/html/layout/utilities.html and run npm run docs:generate again. -->

# Utilities

Focused layout, content, interaction, accessibility, and semantic-color utilities. Responsive visibility lives in Breakpoints.

## PGS

- `aspect`: gives an element an aspect ratio picked by the option in its bracket; written bare it does nothing.
- `block`: displays an element as a block.
- `cursorNotAllowed`: shows the unavailable cursor.
- `minWidth0`: allows flex or grid content to shrink below its intrinsic width.
- `overflow`: adds scrolling or clips overflowing content on both axes, or on one axis only with an axis option next to the scrolling behavior in its bracket.
- `pointerEvents`: sets pointer interaction to the value in its bracket; written bare it does nothing.
- `position`: positions an element the way the option in its bracket says; written bare it does nothing.
- `rotate`: rotates an element 180 degrees when written bare; a degree option in its bracket picks a different amount instead.
- `select`: allows or prevents text selection depending on the option in its bracket; written bare it does nothing.
- `textAlign`: aligns text the way the option in its bracket says; written bare it does nothing.
- `truncate`: limits text to one line and adds an ellipsis when it overflows.

## PGS Options (component brackets)

- `aspSquare`: inside aspect's own bracket, gives it a 1:1 aspect ratio.
- `aspVideo`: inside aspect's own bracket, gives it a 16:9 aspect ratio.
- `ovAuto`: inside overflow's own bracket, adds scrolling only when content overflows, on both axes.
- `ovHidden`: inside overflow's own bracket, clips overflowing content on both axes.
- `ovAutoX`: inside overflow's own bracket, adds scrolling only when content overflows, on the horizontal axis only.
- `ovAutoY`: inside overflow's own bracket, adds scrolling only when content overflows, on the vertical axis only.
- `ovHiddenX`: inside overflow's own bracket, clips overflowing content on the horizontal axis only.
- `ovHiddenY`: inside overflow's own bracket, clips overflowing content on the vertical axis only.
- `peNone`: inside pointerEvents's own bracket, ignores pointer interaction.
- `peAuto`: inside pointerEvents's own bracket, restores pointer interaction.
- `posRelative`: inside position's own bracket, creates a positioning context.
- `posAbsolute`: inside position's own bracket, positions an element absolutely.
- `posSticky`: inside position's own bracket, keeps an element sticky when offsets are supplied by the surrounding layout.
- `rot0`: inside rotate's own bracket, resets the rotation back to 0 degrees.
- `rot90`: inside rotate's own bracket, rotates 90 degrees clockwise.
- `rot180`: inside rotate's own bracket, rotates 180 degrees; this is also the default with no bracket at all.
- `rot270`: inside rotate's own bracket, rotates 270 degrees clockwise (90 degrees counter-clockwise).
- `selNone`: inside select's own bracket, prevents text selection.
- `selText`: inside select's own bracket, enables text selection.
- `taLeft`: inside textAlign's own bracket, aligns text to the start of the line.
- `taCenter`: inside textAlign's own bracket, centers text.
- `taRight`: inside textAlign's own bracket, aligns text to the end of the line.
- `taJustify`: inside textAlign's own bracket, stretches text to fill each full line.

## Related elements

### PGS

- `flex`: provides the flex layout; direction and spacing are flags in its bracket.
- `box`: makes demonstration cells visible.
- `background`: applies the semantic info color as the background here.
- `border`: applies the semantic info color as the border color here.
- `textColor`: applies the semantic info color to text here.
- `flexChild`: sizes or orders one item inside a flex (or grid) container, the option in its bracket picking how.
- `focusRing`: shows the shared focus ring when keyboard focus is visible.
- `motionReduce`: removes non-essential animation and transitions when reduced motion is preferred.
- `skipLink`: creates a link that is revealed only when keyboard-focused.
- `visuallyHidden`: hides content visually while keeping it available to assistive technology.
- `visuallyHiddenFocusable`: hides content until it or one of its children receives focus.
- `icon`: draws the glyph rotated by the example; see Icon for the whole set.

### PGS Options (component brackets)

- `bgInfo`: inside background's own bracket, applies the semantic info color.
- `brInfo`: inside border's own bracket, applies the semantic info color.
- `txtInfo`: inside textColor's own bracket, applies the semantic info color.
- `column`: stacks demonstration groups vertically.
- `flex1`: inside flexChild's own bracket, lets a flex item grow and shrink to occupy available space.
- `flexNone`: inside flexChild's own bracket, prevents a flex item from growing or shrinking.
- `flexOrderFirst`: inside flexChild's own bracket, places a flex item before its siblings.
- `flexOrderLast`: inside flexChild's own bracket, places a flex item after its siblings.
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
            <span pgs="box flex['row' 'flexCenter'] aspect['aspSquare']">Centered</span>
        </div>
        <div pgs="flex['row' 'gapTexts']">
            <span pgs="box flex['row'] flexChild['flexNone']">Fixed</span>
            <span pgs="box flex['row'] minWidth0 truncate flexChild['flex1']">Flexible content that is safely truncated when needed.</span>
            <span pgs="box flex['column'] flexChild['flexOrderFirst']">First</span>
            <span pgs="box flex['column'] flexChild['flexOrderLast']">Last</span>
        </div>
        <div pgs="box position['posRelative']">
            Relative parent
            <span pgs="position['posAbsolute']">Absolute child</span>
        </div>
        <aside pgs="box position['posSticky']">Sticky element</aside>
        <div pgs="flex['row' 'gapTexts']">
            <i pgs="icon['icon-chevronDown'] rotate['rot0']" aria-hidden="true"></i>
            <i pgs="icon['icon-chevronDown'] rotate['rot90']" aria-hidden="true"></i>
            <i pgs="icon['icon-chevronDown'] rotate" aria-hidden="true"></i>
            <i pgs="icon['icon-chevronDown'] rotate['rot270']" aria-hidden="true"></i>
        </div>
    </section>

    <section pgs="flex['column' 'gapTexts']">
        <strong>Content and interaction</strong>
        <div pgs="box overflow['ovAuto']">Scrollable content when its container has constrained dimensions.</div>
        <div pgs="box overflow['ovAutoX']">Horizontally scrollable content when required.</div>
        <div pgs="box overflow['ovHidden']">Overflowing content is clipped.</div>
        <div pgs="box aspect['aspVideo']">16:9 media area</div>
        <span pgs="select['selNone']">Selection disabled</span>
        <span pgs="select['selText']">Selection enabled</span>
        <span pgs="pointerEvents['peNone']">Pointer events disabled</span>
        <span pgs="pointerEvents['peAuto']">Pointer events enabled</span>
        <button type="button" pgs="cursorNotAllowed">Unavailable action</button>
        <p pgs="box textAlign['taCenter']">Centered text</p>
        <p pgs="box textAlign['taRight']">Right-aligned text</p>
        <p pgs="box textAlign['taJustify']">Justified text stretches to fill each full line, spacing words out to meet the right edge except on its last line.</p>
    </section>

    <section pgs="flex['column' 'gapTexts']">
        <strong>Accessibility and color</strong>
        <button type="button" pgs="focusRing">Keyboard focus ring</button>
        <span pgs="visuallyHidden">Screen-reader-only description.</span>
        <a pgs="visuallyHiddenFocusable" href="#utility-content">Visible while focused</a>
        <span pgs="motionReduce">Motion is reduced for users who request it.</span>
        <span pgs="background['bgInfo'] border['brInfo']">Info background</span>
        <span pgs="textColor['txtInfo']">Info text</span>
    </section>
</main>
```
