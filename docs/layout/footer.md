<!-- Automatically generated from reference/html/layout/footer.html. Edit reference/html/layout/footer.html and run npm run docs:generate again. -->

# Footer

Complete footer with theme control, brand area, navigation, informational content, and a link to cookie preferences.

## PGS

- `footer`: identifies the main footer container.
- `footer-top`: identifies the upper section containing the brand and content.
- `footer-top-content`: identifies the responsive inner layout of the upper section.
- `footer-brand`: identifies the group dedicated to the brand.
- `footer-brand-motto`: identifies the descriptive text associated with the brand.
- `footer-content`: identifies an informational footer column.
- `footer-legal`: identifies the lower section dedicated to legal information.
- `footer-legal-content`: identifies the content of the legal section.

## Related elements

### PGS

- `button`: presents theme and cookie preference controls as buttons.
- `toggleDarkmode`: connects the control to the global light or dark theme handler.
- `section`: applies the shared section structure to the upper and legal areas.
- `flexRow`: distributes the upper columns responsively.
- `logo`: inserts the brand into the footer.
- `logo-text`: uses the text variant of the logo.
- `cookieConsent-actionOpen`: opens the Cookie Consent preference panel.

### PGS Options

- `column-3`: configures the footer flex layout with three columns.

## Output

Complete footer HTML structure with brand, menu, and legal area.

## Example

```html
<footer pgs="footer" demo="component" demo-title="Footer" demo-description="Brand and navigation columns in the upper section, legal links and cookie preferences in the lower one.">
    <button pgs="button toggleDarkmode" type="button" aria-label="Change theme">
        <i class="fa-solid fa-moon"></i>
    </button>

    <section pgs="footer-top section">
        <div pgs="footer-top-content flexRow" pgs-option="column-3">
            <div pgs="footer-brand">
                <a aria-label="Logo" pgs="logo" href="/">
                    <span pgs="logo-text">MyPGS</span>
                </a>
                <p pgs="footer-brand-motto">Componenti frontend riutilizzabili.</p>
            </div>

            <div pgs="footer-content">
                <h2>Menu</h2>
                <nav aria-label="Menu footer">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/contatti">Contatti</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </section>

    <section pgs="footer-legal section">
        <div pgs="footer-legal-content">
            <button type="button" pgs="button cookieConsent-actionOpen">Cookie preferences</button>
            <p><a href="">Privacy Policy</a></p>
            <p><a href="">Cookie Policy</a></p>
            <p><a href="">Termini e Condizioni</a></p>
            <p>© 2026 MyPgs. No rights reserved.</p>
        </div>
    </section>
</footer>
```
