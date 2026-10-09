<!-- Automatically generated from reference/html/layout/navSmart.html. Edit reference/html/layout/navSmart.html and run npm run docs:generate again. -->

# NavSmart

A floating navigation bar pinned to the bottom of the screen, made of frosted pills: the way a phone's tab bar looks. Every navSmart-element is one pill, and the pills sit side by side, so a group of links and a lone button (a profile, a search) read as separate shapes. The pill takes the frosted surface of the box component (the same look as boxNavSmart), so it needs no other token, and every item inside it is a plain button of the button component with btnForNavSmart: a link of a nav list, or a button written straight in the element. An item shows its icon above its label. The item the page is on, marked with aria-current="page", or the one whose panel is open, kept in step by modal-button through aria-expanded, is highlighted as a smaller pill inside the bigger one. The bar spans the width only to center its pills: the empty space on either side lets the clicks through to the page.

## PGS

- `navSmart`: identifies the bar, pinned to the bottom of the viewport and centered; it is a header element, so write it on header.
- `navSmart-element`: identifies one pill: it lays its items out side by side. Write it as many times as the bar needs pills; each one draws its own frosted surface.

## PGS States

- `installedApp`: set by pgs.navSmart on a bar when the site runs as an installed app (added to the Home Screen), where the bar keeps --navSmart-edgePWA from the edges of the screen instead of the page padding, to stay clear of the phone's home indicator. Safari on iOS reports it through navigator.standalone, not through the display-mode media query.

## JavaScript API

- `pgs.navSmart.init(root)`: measures the bars inside the specified root, or the root itself when it is one; runs automatically on page load and again via pgs.init(root) for a bar added later. The bar pinned to the screen publishes --_navSmart-height, the whole distance from the bottom edge of the screen to the top of the bar (the pills plus the gap the bar keeps from the edge, and the safe area on a phone), and --_navSmart-heightScroll, kept equal to it (the header publishes the same pair). Both are 0 while the bar is hidden, for instance by a media query. A navSmart written as an example inside a page flows with it, takes no room at the bottom and never owns them. Padding the end of a page by either one keeps its last lines from sitting under the bar.

## Related elements

### PGS

- `button`: the component every item is: btnForNavSmart is its override for this bar, the way btnForHeader is for the header.
- `modal`: wraps a pill's button and the dialog it opens. The dialog is moved out of the pill when the modal initializes, because a pill blurs what is behind it and that would make it the box a fixed dialog is sized against.
- `modal-button`: the control of a pill that opens the dialog; it is highlighted while the dialog is open.
- `modal-dialog-content`: the panel drawn inside the dialog.
- `modal-dialog-content-header`: the fixed heading area of that panel.
- `modal-dialog-content-scroll`: the part of the panel that scrolls.
- `icon`: draws the glyph above each label; see Icon for the whole set.

### PGS Options (component brackets)

- `btnIconOnly`: next to btnForNavSmart, an item with only an icon becomes a square as wide as the pill is tall; see Button.
- `btnForNavSmart`: sizes a button or a link as an item of the bar: icon above the label, no background, pill-shaped, with the current look for the page you are on or the panel that is open; belongs to the button component.
- `dialogBottom`: opens the dialog against the bottom edge of the viewport, where the bar is.
- `icon-home`: the glyph of the first link.
- `icon-gear`: the glyph of the second link.
- `icon-circleInfo`: the glyph of the third link.
- `icon-user`: the glyph of the button that opens the dialog.
- `icon-magnifyingGlass`: the glyph of the icon-only item.

### Other

- `box`: the component whose surface every pill takes.
- `boxNavSmart`: the option of box that gives the same frosted pill to any other floating surface; navSmart-element takes it without being written.

## CSS Variables

- `--navSmart-edge`
- `--navSmart-edgePWA`
- `--navSmart-gap`
- `--navSmart-iconSize`
- `--navSmart-itemHeight`
- `--navSmart-itemMinWidth`

## Output

A bar with one pill of three links, the current one highlighted, and a second pill holding a button that opens a dialog from the bottom.
## Examples

### Tab bar

A pill of links and a pill with one button, side by side. aria-current=&quot;page&quot; marks the link of the page you are on, and the button is highlighted while its dialog is open.

```html
<header pgs="navSmart">
    <div pgs="navSmart-element">
        <nav aria-label="Main menu">
            <ul>
                <li><a pgs="button['btnForNavSmart']" href="/" aria-current="page"><i pgs="icon['icon-home']"></i> Home</a></li>
                <li><a pgs="button['btnForNavSmart']" href="/services"><i pgs="icon['icon-gear']"></i> Services</a></li>
                <li><a pgs="button['btnForNavSmart']" href="/about"><i pgs="icon['icon-circleInfo']"></i> About</a></li>
            </ul>
        </nav>
    </div>

    <div pgs="navSmart-element">
        <div pgs="modal['dialogBottom']">
            <button pgs="button['btnForNavSmart'] modal-button" type="button" aria-label="Open profile">
                <i pgs="icon['icon-user']" aria-hidden="true"></i>
                Profile
            </button>

            <dialog>
                <div pgs="modal-dialog-content">
                    <div pgs="modal-dialog-content-header">
                        <h3>Profile</h3>
                    </div>

                    <div pgs="modal-dialog-content-scroll">
                        <p>Anything fits here: the dialog is a normal modal, opened from the bottom where the bar is.</p>
                    </div>
                </div>
            </dialog>
        </div>
    </div>
</header>
```

### Icon only

An item with no label takes no minimum width: add btnIconOnly next to btnForNavSmart and it becomes a square as wide as the pill is tall. Give it an aria-label, since the text is what named it.

```html
<header pgs="navSmart">
    <div pgs="navSmart-element">
        <nav aria-label="Main menu">
            <ul>
                <li><a pgs="button['btnForNavSmart']" href="/" aria-current="page"><i pgs="icon['icon-home']"></i> Home</a></li>
                <li><a pgs="button['btnForNavSmart']" href="/services"><i pgs="icon['icon-gear']"></i> Services</a></li>
                <li><a pgs="button['btnForNavSmart']" href="/about"><i pgs="icon['icon-circleInfo']"></i> About</a></li>
            </ul>
        </nav>
    </div>

    <div pgs="navSmart-element">
        <button pgs="button['btnForNavSmart' 'btnIconOnly']" type="button" aria-label="Search">
            <i pgs="icon['icon-magnifyingGlass']" aria-hidden="true"></i>
        </button>
    </div>
</header>
```
