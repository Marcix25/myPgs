export default function Footer() {
    return (
        <footer pgs="footer">
            <button pgs="button toggleDarkmode" type="button" aria-label="Change theme">
                <i className="fa-solid fa-moon"></i>
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
    );
}
