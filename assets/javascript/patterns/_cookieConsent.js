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
    const current = (element.getAttribute('pgs') || '').split(/\s+/).filter(Boolean);
    const next = enabled ? [...new Set([...current, token])] : current.filter((item) => item !== token);
    if (next.length > 0) {
        element.setAttribute('pgs', next.join(' '));
    } else {
        element.removeAttribute('pgs');
    }
}

//+ reads the JSON config off the marker element and builds the whole modal + dialog + content from it,
//+ so the consuming site never has to hand-author the banner markup — see @pgs-option "cookieConsent".
function buildCookieConsent(marker) {
    const config = { ...DEFAULTS, ...(safeJsonParse(pgs(marker).option.getValueBrackets('cookieConsent') || '{}') || {}) };

    const root = document.createElement('div');
    pgs(root).add('modal', 'cookieConsent');

    root.innerHTML = `
        <dialog pgs-option="modalTopLevel modalBottom modalRight modalMedium">
            <div pgs="modal-dialog-content">
                <div pgs="flexColumn">
                    <p><i pgs="icon" pgs-option="icon-cookie"></i> ${PGS_formatText(config.titleIntro)} <br></p>
                    <h2>${PGS_formatText(config.titleHeading)}</h2>

                    <p>${PGS_formatText(config.description)}</p>

                    <p>
                        <a href="${PGS_escapeHtml(config.privacyPolicyUrl)}" target="_blank" rel="noopener">Privacy Policy</a> -
                        <a href="${PGS_escapeHtml(config.cookiePolicyUrl)}" target="_blank" rel="noopener">Cookie Policy</a>
                    </p>
                </div>

                <div pgs="_cookieConsent-panel flexColumn" role="group" aria-label="${PGS_escapeHtml(config.panelAriaLabel)}">
                    <div pgs="flexRow nowrap _cookieConsent-panel-featureEssential">
                        <div>
                            <p>
                                <strong>${PGS_formatText(config.essentialTitle)}</strong>
                                <br>
                                <small>${PGS_formatText(config.essentialDescription)}</small>
                            </p>
                        </div>

                        <span pgs="_cookieConsent-panel-badge badge" pgs-option="badgeSuccess">${PGS_formatText(config.essentialBadge)}</span>
                    </div>

                    <div pgs="flexRow _cookieConsent-panel-featureAnalytics">
                        <label pgs="toggle">
                            <p>
                                <strong>${PGS_formatText(config.analyticsTitle)}</strong>
                                <br>
                                <small>${PGS_formatText(config.analyticsDescription)}</small>
                            </p>

                            <input type="checkbox" pgs="_cookieConsent-panel-toggleAnalytics" aria-label="${PGS_escapeHtml(config.analyticsAriaLabel)}">
                        </label>
                    </div>
                    <div pgs="flexRow">
                        <button type="button" pgs="button _cookieConsent-actionReject">
                            <i pgs="icon" pgs-option="icon-sliders"></i> ${PGS_formatText(config.titleReject)}
                        </button>
    
                        <button type="button" pgs="button _cookieConsent-actionAccept" pgs-option="buttonStrong">
                            <i pgs="icon" pgs-option="icon-check"></i> ${PGS_formatText(config.titleAccept)}
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

    root.querySelector('[pgs~="_cookieConsent-panel-featureEssential"]')?.setAttribute('data-cookie-feature', 'essential');
    root.querySelector('[pgs~="_cookieConsent-panel-featureAnalytics"]')?.setAttribute('data-cookie-feature', 'analytics');

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

    const analyticsToggle = root.querySelector('[pgs~="_cookieConsent-panel-toggleAnalytics"]');
    const acceptAllButton = root.querySelector('[pgs~="_cookieConsent-actionAccept"]');
    const rejectButton = root.querySelector('[pgs~="_cookieConsent-actionReject"]');
    const openButtons = document.querySelectorAll('[pgs~="cookieConsent-actionOpen"]');
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
