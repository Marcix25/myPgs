<!-- Automatically generated from reference/html/components/buttonGroup.html. Edit reference/html/components/buttonGroup.html and run npm run docs:generate again. -->

# Button group

A set of buttons on a background of its own, with padding, rounded corners and a hairline between them: a toolbar, a segmented choice, the separate buttons of darkmodeButtons, the list of a menu. It is only a look, with no JavaScript: the meaning comes from the markup, so give the group role="group" and an aria-label, and mark the chosen button with aria-pressed="true": it takes the checked colors of a two-state button (--button-*-twoState). Switching aria-pressed is up to your script; darkmodeButtons does it for the theme. The two lines that touch a button that is pressed, current, hovered or focused with the keyboard fade out, so its background is not cut by a hairline. On the ul of a menu its items are the li, each holding its link: write btgVertical on the list of a vertical menu, whose items the menu already stacks, so the lines are horizontal, and btgFill to make the list as wide as the menu. Tune it with --buttonGroup-background (--color-box), --buttonGroup-padding (--padding-details, also how far the lines stop from the edges), --buttonGroup-gap (--gap-details, with the line in its middle), --buttonGroup-borderRadius (the radius of a button plus the padding) and --buttonGroup-timing (400ms ease-out, how long a line takes to fade).

## PGS

- `buttonGroup`: the group. Its children are the items: buttons, or elements that hold one as a direct child. A row by default, as wide as its buttons and never wider than its container; keep it on one row. A child with aria-pressed="true" takes the checked colors of a two-state button.

## PGS Options (component brackets)

- `btgVertical`: stacks the buttons in a column, all as wide as the widest, with horizontal lines between them.
- `btgFill`: the group takes the whole width of its container and the buttons share it in equal parts.

## Related elements

### PGS

- `button`: draws each button of the group.
- `menu`: the navigation whose ul can be a button group; see Menu.
- `darkmodeButtons`: the separate buttons of the theme, which the group can hold; see Darkmode.
- `darkmodeButtons-system`: the button that follows the theme of the operating system; see Darkmode.
- `darkmodeButtons-light`: the button of the light theme; see Darkmode.
- `darkmodeButtons-dark`: the button of the dark theme; see Darkmode.
- `icon`: draws the glyphs this example shows; see Icon for the whole set.

### PGS Options (component brackets)

- `btnTransparent`: lets the background of the group show through the buttons that are not chosen; see Button.
- `btnIconOnly`: shapes a button as an icon-only square; see Button.
- `btnCurrent`: gives a menu link the current look while it carries aria-current="page"; see Button.
- `icon-alignLeft`: a toolbar glyph, from the myIcons pack the demo loads.
- `icon-alignCenter`: a toolbar glyph, from the myIcons pack the demo loads.
- `icon-alignRight`: a toolbar glyph, from the myIcons pack the demo loads.
- `icon-list`: a view glyph, from the myIcons pack the demo loads.
- `icon-grid`: a view glyph, from the myIcons pack the demo loads.
- `icon-monitor`: the glyph of the system theme, from the myIcons pack the demo loads.
- `icon-sun`: the glyph of the light theme.
- `icon-moon`: the glyph of the dark theme.

### Other

- `menuHorizontal`: lays the menu out as a row; see Menu.

## CSS Variables

- `--buttonGroup-background`
- `--buttonGroup-borderRadius`
- `--buttonGroup-gap`
- `--buttonGroup-padding`
- `--buttonGroup-timing`

## Output

HTML examples of button groups.
## Examples

### Base

A row of buttons on the background of the group. btnTransparent lets that background show through; the button marked aria-pressed=&quot;true&quot; is the chosen one: it takes the checked colors, and the lines next to it fade out. Switching aria-pressed on click is up to your script.

```html
<div pgs="buttonGroup" role="group" aria-label="Period">
    <button pgs="button['btnTransparent']" type="button" aria-pressed="false">Day</button>
    <button pgs="button['btnTransparent']" type="button" aria-pressed="true">Week</button>
    <button pgs="button['btnTransparent']" type="button" aria-pressed="false">Month</button>
    <button pgs="button['btnTransparent']" type="button" aria-pressed="false">Year</button>
</div>
```

### Icon-only toolbar

Icon-only buttons make a toolbar. Each one needs its own aria-label.

```html
<div pgs="buttonGroup" role="group" aria-label="Text alignment">
    <button pgs="button['btnIconOnly' 'btnTransparent']" type="button" aria-label="Align left"><i pgs="icon['icon-alignLeft']" aria-hidden="true"></i></button>
    <button pgs="button['btnIconOnly' 'btnTransparent']" type="button" aria-label="Align center"><i pgs="icon['icon-alignCenter']" aria-hidden="true"></i></button>
    <button pgs="button['btnIconOnly' 'btnTransparent']" type="button" aria-label="Align right"><i pgs="icon['icon-alignRight']" aria-hidden="true"></i></button>
</div>
```

### Vertical (btgVertical)

btgVertical stacks the buttons in a column, all as wide as the widest, with horizontal lines between them.

```html
<div pgs="buttonGroup['btgVertical']" role="group" aria-label="View">
    <button pgs="button['btnTransparent']" type="button"><i pgs="icon['icon-list']" aria-hidden="true"></i>List</button>
    <button pgs="button['btnTransparent']" type="button"><i pgs="icon['icon-grid']" aria-hidden="true"></i>Grid</button>
</div>
```

### Full width (btgFill)

btgFill makes the group as wide as its container, and the buttons share that width in equal parts.

```html
<div pgs="buttonGroup['btgFill']" role="group" aria-label="View">
    <button pgs="button['btnTransparent']" type="button"><i pgs="icon['icon-list']" aria-hidden="true"></i>List</button>
    <button pgs="button['btnTransparent']" type="button"><i pgs="icon['icon-grid']" aria-hidden="true"></i>Grid</button>
</div>
```

### The list of a menu

buttonGroup on the ul of a menu: the items are the li, each with its link. The menu is vertical by default and stacks them; btgVertical draws the horizontal lines, btgFill makes the list as wide as the menu.

```html
<nav pgs="menu" aria-label="Account">
    <ul pgs="buttonGroup['btgVertical' 'btgFill']">
        <li><a pgs="button['btnTransparent' 'btnCurrent']" href="#" aria-current="page"><i pgs="icon['icon-list']" aria-hidden="true"></i><span>Orders</span></a></li>
        <li><a pgs="button['btnTransparent' 'btnCurrent']" href="#"><i pgs="icon['icon-grid']" aria-hidden="true"></i><span>Downloads</span></a></li>
        <li><a pgs="button['btnTransparent' 'btnCurrent']" href="#"><i pgs="icon['icon-monitor']" aria-hidden="true"></i><span>Account details</span></a></li>
    </ul>
</nav>
```

### Theme buttons

The separate buttons of darkmodeButtons in a group: the script marks the button of the current theme aria-pressed=&quot;true&quot;, and the group fades the lines next to it.

```html
<div pgs="darkmodeButtons buttonGroup" role="group" aria-label="Theme">
    <button pgs="button['btnTransparent'] darkmodeButtons-system" type="button"><i pgs="icon['icon-monitor']" aria-hidden="true"></i>System</button>
    <button pgs="button['btnTransparent'] darkmodeButtons-light" type="button"><i pgs="icon['icon-sun']" aria-hidden="true"></i>Light</button>
    <button pgs="button['btnTransparent'] darkmodeButtons-dark" type="button"><i pgs="icon['icon-moon']" aria-hidden="true"></i>Dark</button>
</div>
```
