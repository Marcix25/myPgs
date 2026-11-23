<!-- Automatically generated from reference/html/layout/footer.html. Edit reference/html/layout/footer.html and run npm run docs:generate again. -->

# Footer

Complete footer with theme control, brand area, navigation, informational content, and legal links. The text and the links take the color of the footer (--footer-color, black by default), not the one of the page, and the footer sets its own color-scheme (--footer-colorScheme, inherited by default, so a dark footer on a light page can say light-dark() is dark): the links are bold and underlined, the underline the link color at half strength, and turn --footer-color-hover (--color-link) on hover or keyboard focus; a link drawn as a button or a logo keeps its own look. The footer lays out nothing in its upper section: the row of columns, a column, the list of a menu are flex in the markup, with no token of the footer of their own. Every value is a --footer-* variable: --footer-background takes a color or an image (it covers the footer), --footer-paddingBlock is the room above and below the upper section, --footer-title-fontSize the size of its h2 (an h3 there is the size of the text), --footer-borderColor the line over the legal section and --footer-legal-fontSize the size of its text and buttons. The footer is the reference of a child placed with position absolute (a control across its top edge), whose z-index stays inside it, and leaves room at its bottom for the bar of navSmart, which floats over the bottom of the page.

## PGS

- `footer`: identifies the main footer container.
- `footer-top`: the upper section, with the brand and the columns: --footer-paddingBlock above and below, its h2 at --footer-title-fontSize and its h3 at the size of the text.
- `footer-legal`: the lower section, the legal one: its text, links and buttons at --footer-legal-fontSize, the links not bold.
- `footer-legal-content`: identifies the content of the legal section: one centered row of small links, text and buttons at --footer-legal-fontSize, the links not bold, wrapping on a narrow screen, with a line above it. A logo sits in the row with the rest and takes a row of its own once the section is narrower than a tablet.

## Related elements

### PGS

- `flex`: provides the flex layout; direction and spacing are flags in its bracket.
- `button`: presents the theme control as a button.
- `darkmodeToggle`: connects the control to the global light or dark theme handler.
- `darkmodeToggle-light`: inside the control, the icon of the light theme, shown while the page is light; see Darkmode.
- `darkmodeToggle-dark`: inside the control, the icon of the dark theme, shown while the page is dark; see Darkmode.
- `section`: applies the shared section structure to the upper and legal areas.
- `logo`: inserts the brand into the footer.
- `logo-text`: uses the text variant of the logo.
- `icon`: draws the glyphs this example shows; see Icon for the whole set.

### PGS Options (component brackets)

- `column`: stacks the brand and the links of a menu.
- `gapDetails`: spaces the links of a menu.
- `tglLabeled`: labels that control with the theme the click leads to; see Darkmode.
- `row`: lays the columns of the upper section in a row (a flag of flex).
- `column-3`: three columns in that row, fewer on a narrow screen (a flag of flex).
- `logoFooter`: the big logo of the brand column; belongs to the logo component.
- `btnIconOnly`: shapes the theme control of the legal section as an icon-only button; see Button.
- `icon-moon`: the glyph of the theme control; belongs to the icon component.
- `icon-sun`: the glyph of the dark theme on the theme control; belongs to the icon component.

## CSS Variables

- `--footer-background`
- `--footer-borderColor`
- `--footer-color`
- `--footer-color-hover`
- `--footer-colorScheme`
- `--footer-legal-fontSize`
- `--footer-paddingBlock`
- `--footer-title-fontSize`

## Output

Complete footer HTML structure with brand, menu, and legal area.
## Examples

### Footer

Brand and navigation columns in the upper section, legal links in the lower one.

```html
<footer pgs="footer">

    <section pgs="footer-top section">
        <div pgs="flex['row' 'column-3']">
            <div pgs="flex['column']">
                <a aria-label="Logo" pgs="logo['logoFooter']" href="/">
                    <span pgs="logo-text">MyPGS</span>
                </a>
                <button pgs="button darkmodeToggle['tglLabeled']" type="button" aria-label="Change theme">
                    <i pgs="darkmodeToggle-light icon['icon-moon']" aria-hidden="true"></i>
                    <i pgs="darkmodeToggle-dark icon['icon-sun']" aria-hidden="true"></i>
                </button>
            </div>

            <div>
                <h2>Menu</h2>
                <nav aria-label="Footer menu">
                    <ul pgs="flex['column' 'gapDetails']">
                        <li><a href="/">Home</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </section>

    <section pgs="footer-legal section">
        <div pgs="footer-legal-content">
            <a href="">Privacy Policy</a>
            <a href="">Cookie Policy</a>
            <a href="">Terms and Conditions</a>
            <p>© 2026 MyPGS. No rights reserved.</p>
        </div>
    </section>
</footer>
```

### Legal with logo and theme control

A logo in footer-legal-content sits in the row with the links, and on a narrow section takes a row of its own. A button, here the theme control, takes the small size of the legal text.

```html
<footer pgs="footer">
    <section pgs="footer-legal section">
        <div pgs="footer-legal-content">
            <a aria-label="Logo" pgs="logo" href="/">
                <span pgs="logo-text">MyPGS</span>
            </a>
            <a href="">Privacy Policy</a>
            <a href="">Cookie Policy</a>
            <p>© 2026 MyPGS. No rights reserved.</p>
            <button pgs="button['btnIconOnly'] darkmodeToggle" type="button" aria-label="Change theme">
                <i pgs="darkmodeToggle-light icon['icon-moon']" aria-hidden="true"></i>
                <i pgs="darkmodeToggle-dark icon['icon-sun']" aria-hidden="true"></i>
            </button>
        </div>
    </section>
</footer>
```
