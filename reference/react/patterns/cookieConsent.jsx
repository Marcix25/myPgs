export default function CookieConsent({
    enabled = true,
    gaMeasurementId = "",
    privacyUrl = "",
    cookiePolicyUrl = "/cookie-policy/",
}) {
    if (!enabled) return null;

    return (
        <div id="cookieConsent" pgs="cookieConsent" role="dialog" aria-modal="true" data-ga-id={gaMeasurementId} hidden tabIndex="-1">
            <p><i className="fa-duotone fa-solid fa-cookie-bite"></i> Cookies and privacy <br /></p>
            <h2>Your privacy comes first</h2>

            <p>
                We use essential cookies to provide the service and, with your consent, analytics cookies from
                <strong>Google Analytics</strong> to measure traffic anonymously and improve our content.
                You can change your choice at any time.
            </p>

            <p>
                <a href={privacyUrl} target="_blank" rel="noopener noreferrer">Privacy Policy</a> -
                <a href={cookiePolicyUrl} target="_blank" rel="noopener noreferrer">Cookie Policy</a>
            </p>

            <div pgs="cookieConsent-panel flexColumn" role="group" aria-label="Cookie preferences">
                <div pgs="flexRow nowrap cookieConsent-featureEssential">
                    <div>
                        <p>
                            <strong>Cookie tecnici</strong>
                            <br />
                            <small>Always active to ensure the website works correctly.</small>
                        </p>
                    </div>

                    <span pgs="cookieConsent-panel-badge">Active</span>
                </div>

                <div pgs="flexRow cookieConsent-featureAnalytics">
                    <label pgs="toggle">
                        <p>
                            <strong>Analytics</strong>
                            <br />
                            <small>Browsing data collected in aggregate form for anonymous statistics.</small>
                        </p>

                        <input type="checkbox" pgs="cookieConsent-toggleAnalytics" aria-label="Abilita Google Analytics" />
                    </label>
                </div>
            </div>

            <div pgs="flexRow">
                <button type="button" pgs="button cookieConsent-actionReject">
                    <i className="fa-solid fa-duotone fa-sliders"></i>Selected only
                </button>

                <button type="button" pgs="button cookieConsent-actionAccept" pgs-option="buttonStrong">
                    <i className="fa-solid fa-check"></i> Accept all
                </button>
            </div>
        </div>
    );
}
