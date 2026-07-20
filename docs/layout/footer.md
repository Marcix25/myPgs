<!-- File generato automaticamente da templates/html/layout/footer.html. Modificare templates/html/layout/footer.html e rieseguire npm run docs:generate. -->

# Footer

Piè di pagina completo con controllo tema, area di brand, navigazione, contenuti informativi e collegamento alle preferenze cookie.

## PGS

- `footer`: identifica il contenitore principale del piè di pagina.
- `footer-top`: identifica la sezione superiore con brand e contenuti.
- `footer-top-content`: identifica il layout interno responsive della sezione superiore.
- `footer-brand`: identifica il gruppo dedicato al marchio.
- `footer-brand-motto`: identifica il testo descrittivo associato al marchio.
- `footer-content`: identifica una colonna informativa del footer.
- `footer-legal`: identifica la sezione inferiore dedicata alle informazioni legali.
- `footer-legal-content`: identifica il contenuto della sezione legale.

## Elementi correlati

- `button`: presenta i controlli del tema e delle preferenze cookie come pulsanti.
- `toggleDarkmode`: collega il controllo al gestore globale del tema chiaro o scuro.
- `section`: applica alle aree superiore e legale la struttura condivisa delle sezioni.
- `flex-3`: distribuisce in modo responsive le colonne della parte superiore.
- `logo`: inserisce il marchio nel footer.
- `logo-text`: usa la variante testuale del logo.
- `cookieConsent-actionOpen`: apre il pannello delle preferenze del pattern Cookie Consent.

## Output

Struttura HTML completa del footer con brand, menu e area legale.

## Esempio

```html
<footer pgs="footer">
    <button pgs="button toggleDarkmode" type="button" aria-label="Cambia tema">
        <i class="fa-solid fa-moon"></i>
    </button>

    <section pgs="footer-top section">
        <div pgs="footer-top-content flex-3">
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
            <button type="button" pgs="button cookieConsent-actionOpen">Preferenze cookie</button>
            <p><a href="">Privacy Policy</a></p>
            <p><a href="">Cookie Policy</a></p>
            <p><a href="">Termini e Condizioni</a></p>
            <p>© 2026 MyPgs. Nessun diritto riservato.</p>
        </div>
    </section>
</footer>
```
