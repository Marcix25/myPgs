import { PGS_onDocumentReady } from "../helper/_onDocumentReady.js";
import { PGS_escapeHtml, PGS_formatText } from "../helper/_text.js";

const STORAGE_KEY = 'pgs_cookie_preferences_v1';
const INITIALIZED_COOKIE_CONSENTS = new WeakSet();

const DEFAULTS = {
    titleIntro: "Cookies and privacy",
    titleHeading: "Your privacy comes first",
    description: "We use essential cookies to provide the service and, with your consent, analytics cookies from **Google Analytics** to measure traffic anonymously and improve our content.\nYou can change your choice at any time.",
    privacyPolicyUrl: "/privacy-policy/",
    cookiePolicyUrl: "/cookie-policy/",
    panelAriaLabel: "Cookie preferences",
    essentialTitle: "Essential cookies",
    essentialDescription: "Always active to ensure the website works correctly.",
    essentialBadge: "Active",
    analyticsTitle: "Analytics",
    analyticsDescription: "Browsing data collected in aggregate form for anonymous statistics.",
    analyticsAriaLabel: "Enable Google Analytics",
    titleReject: "Selected only",
    titleAccept: "Accept all",
    gaId: ""
};

//+
function safeJsonParse(value) {
    try {
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.warn('PGS cookie consent: impossibile leggere le preferenze', error);
        return null;
    }
}

//+
function readPreferences() {
    try {
        return safeJsonParse(localStorage.getItem(STORAGE_KEY));
    } catch (error) {
        return null;
    }
}

//+
function savePreferences(prefs) {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ ...prefs, updatedAt: new Date().toISOString() })
        );
    } catch (error) {
        console.warn('PGS cookie consent: impossibile salvare le preferenze', error);
    }
}

//+
function bootstrapGtag() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() {
        window.dataLayer.push(arguments);
    };
}

//+
function loadGoogleAnalytics(measurementId) {
    if (!measurementId || window.__PGS_gaLoaded) return;
    window.__PGS_gaLoaded = true;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
        anonymize_ip: true,
        allow_google_signals: false,
    });
}

//+
function applyAnalyticsConsent({ allowAnalytics, measurementId }) {
    bootstrapGtag();
    if (allowAnalytics) {
        window.gtag('consent', 'update', { analytics_storage: 'granted' });
        loadGoogleAnalytics(measurementId);
    } else {
        window.gtag('consent', 'update', { analytics_storage: 'denied' });
    }
}

//+
function setPgsFlag(element, token, enabled) {
    if (!(element instanceof HTMLElement) || !token) return;
    pgs(element).toggle(token, enabled);
    if (!pgs(element).value) element.removeAttribute('pgs');
}

//+ reads the JSON config off the marker element and builds the whole modal + dialog + content from it,
//+ so the consuming site never has to hand-author the banner markup — see @pgs-data "cookieConsent".
function buildCookieConsent(marker) {
    const config = { ...DEFAULTS, ...(safeJsonParse(pgs(marker).data.getValueBrackets('cookieConsent') || '{}') || {}) };

    const root = document.createElement('div');
    pgs(root).add("modal['dialogTopLevel' 'dialogBottom' 'dialogRight' 'dialogMedium']", 'cookieConsent');

    root.innerHTML = `
        <dialog>
            <div pgs="modal-dialog-content">
                <div pgs="_cookieConsent-header flex['column']">
                    <p pgs="flex['row' 'itemCenter']"><i pgs="icon['icon-cookie']"></i> ${PGS_formatText(config.titleIntro)}</p>
                    <h2>${PGS_formatText(config.titleHeading)}</h2>
                    <p>${PGS_formatText(config.description)}</p>
                    <p>
                        <a href="${PGS_escapeHtml(config.privacyPolicyUrl)}" target="_blank" rel="noopener">Privacy Policy</a> -
                        <a href="${PGS_escapeHtml(config.cookiePolicyUrl)}" target="_blank" rel="noopener">Cookie Policy</a>
                    </p>
                </div>

                <div pgs="_cookieConsent-panel flex['column']" role="group" aria-label="${PGS_escapeHtml(config.panelAriaLabel)}">
                    <div pgs="flex['row' 'nowrap'] _cookieConsent-panel-featureEssential">
                        <div>
                            <p>
                                <strong>${PGS_formatText(config.essentialTitle)}</strong>
                                <br>
                                <small>${PGS_formatText(config.essentialDescription)}</small>
                            </p>
                        </div>

                        <span pgs="_cookieConsent-panel-badge badge['badgeSuccess']">${PGS_formatText(config.essentialBadge)}</span>
                    </div>

                    <div pgs="flex['row'] _cookieConsent-panel-featureAnalytics">
                        <label pgs="toggle">
                            <p>
                                <strong>${PGS_formatText(config.analyticsTitle)}</strong>
                                <br>
                                <small>${PGS_formatText(config.analyticsDescription)}</small>
                            </p>

                            <input type="checkbox" pgs="_cookieConsent-panel-toggleAnalytics" aria-label="${PGS_escapeHtml(config.analyticsAriaLabel)}">
                        </label>
                    </div>
                    <div pgs="flex['row']">
                        <button type="button" pgs="button _cookieConsent-actionReject">
                            ${PGS_formatText(config.titleReject)}
                        </button>
    
                        <button type="button" pgs="button['btnStrong'] _cookieConsent-actionAccept">
                            <i pgs="icon['icon-check']"></i> ${PGS_formatText(config.titleAccept)}
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    `;

    root.id = marker.id || 'cookieConsent';
    root.dataset.gaId = config.gaId;
    document.body.appendChild(root);
    marker.remove();

    return root;
}

//+
function assignCookieRuntimeAttributes({ root, analyticsToggle, acceptAllButton, rejectButton, openButtons }) {
    root.dataset.cookieComponent = 'consent';
    analyticsToggle?.setAttribute('data-cookie-toggle', 'analytics');
    acceptAllButton?.setAttribute('data-cookie-action', 'accept');
    rejectButton?.setAttribute('data-cookie-action', 'reject');

    pgs(root).querySelector('_cookieConsent-panel-featureEssential')?.setAttribute('data-cookie-feature', 'essential');
    pgs(root).querySelector('_cookieConsent-panel-featureAnalytics')?.setAttribute('data-cookie-feature', 'analytics');

    openButtons.forEach((button) => {
        button.setAttribute('data-cookie-action', 'open');
    });
}

//= CookieConsent
//+ open/close, backdrop, focus trap, ESC-to-close, and focus restore are all handled by the native <dialog>
//+ through pgs.modal; this pattern only owns the JSON-driven markup generation and the consent business logic.
function initCookieConsent(selectRoot = document) {
    const marker = selectRoot instanceof Element && pgs(selectRoot).contains('cookieConsent')
        ? selectRoot
        : pgs(selectRoot).querySelector('cookieConsent');
    if (!marker || INITIALIZED_COOKIE_CONSENTS.has(marker)) return;
    INITIALIZED_COOKIE_CONSENTS.add(marker);

    const root = buildCookieConsent(marker);

    //+ initializes the modal here too (idempotent) so this doesn't depend on pgs.registerModules() order.
    globalThis.pgs?.modal?.init(root);
    const modal = globalThis.pgs?.modal?.api(root);
    if (!modal) return;

    const analyticsToggle = pgs(root).querySelector('_cookieConsent-panel-toggleAnalytics');
    const acceptAllButton = pgs(root).querySelector('_cookieConsent-actionAccept');
    const rejectButton = pgs(root).querySelector('_cookieConsent-actionReject');
    const openButtons = pgs(document).querySelectorAll('cookieConsent-actionOpen');
    const measurementId = (root.dataset.gaId || '').trim();
    const prefersGa = measurementId.length > 0;

    assignCookieRuntimeAttributes({ root, analyticsToggle, acceptAllButton, rejectButton, openButtons });

    if (analyticsToggle) {
        analyticsToggle.disabled = !prefersGa;
        if (!prefersGa) {
            analyticsToggle.checked = false;
            setPgsFlag(root, 'cookieConsent-gaUnavailable', true);
        } else {
            setPgsFlag(root, 'cookieConsent-gaUnavailable', false);
        }
    }

    bootstrapGtag();
    window.gtag('consent', 'default', { analytics_storage: 'denied' });

    function persistAndApply(allowAnalytics) {
        savePreferences({ analytics: allowAnalytics });
        setPgsFlag(root, 'cookieConsent-accepted', !!allowAnalytics);
        setPgsFlag(root, 'cookieConsent-declined', !allowAnalytics);
        applyAnalyticsConsent({ allowAnalytics: !!allowAnalytics, measurementId });
    }

    acceptAllButton?.addEventListener('click', () => {
        if (analyticsToggle && prefersGa) analyticsToggle.checked = true;
        persistAndApply(!!prefersGa);
        modal.close();
    });

    rejectButton?.addEventListener('click', () => {
        const allowAnalytics = analyticsToggle ? analyticsToggle.checked && prefersGa : false;
        if (!allowAnalytics && analyticsToggle) analyticsToggle.checked = false;
        persistAndApply(allowAnalytics);
        modal.close();
    });

    analyticsToggle?.addEventListener('change', (event) => {
        if (!prefersGa && event.target instanceof HTMLInputElement) {
            event.target.checked = false;
        }
    });

    openButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            modal.open();
        });
    });

    const savedPrefs = readPreferences();
    if (savedPrefs && typeof savedPrefs.analytics === 'boolean') {
        if (analyticsToggle) analyticsToggle.checked = !!savedPrefs.analytics && prefersGa;
        persistAndApply(savedPrefs.analytics && prefersGa);
    } else {
        modal.open();
    }
}

PGS_onDocumentReady(initCookieConsent);

export const PGS_cookieConsent = {
    init: initCookieConsent
};
