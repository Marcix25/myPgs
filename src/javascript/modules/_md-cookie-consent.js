const STORAGE_KEY = 'pgs_cookie_preferences_v1';
const focusableSelectors = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

function ensureFooterCookieButton(root) {
    const footerLegalContent = document.querySelector('[pgs~="footer-legal-content"]');
    if (!footerLegalContent) return;

    const existingButton = footerLegalContent.querySelector('[data-cookie-action="open"]');
    if (existingButton) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'cookie-consent_manage';
    button.setAttribute('pgs', 'button');
    button.setAttribute('data-cookie-action', 'open');
    button.setAttribute('aria-haspopup', 'dialog');
    button.setAttribute('aria-controls', root.id || 'cookie-consent');
    button.innerHTML = '<i class="fa-solid fa-cookie-bite" aria-hidden="true"></i><span>Preferenze cookie</span>';

    footerLegalContent.prepend(button);
}

function safeJsonParse(value) {
    try {
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.warn('PGS cookie consent: impossibile leggere le preferenze', error);
        return null;
    }
}

function readPreferences() {
    try {
        return safeJsonParse(localStorage.getItem(STORAGE_KEY));
    } catch (error) {
        return null;
    }
}

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

function bootstrapGtag() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() {
        window.dataLayer.push(arguments);
    };
}

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

function applyAnalyticsConsent({ allowAnalytics, measurementId }) {
    bootstrapGtag();
    if (allowAnalytics) {
        window.gtag('consent', 'update', { analytics_storage: 'granted' });
        loadGoogleAnalytics(measurementId);
    } else {
        window.gtag('consent', 'update', { analytics_storage: 'denied' });
    }
}

function cookieConsent() {
    const root = document.querySelector('.cookie-consent');
    if (!root) return;

    ensureFooterCookieButton(root);

    const analyticsToggle = root.querySelector('[data-cookie-toggle="analytics"]');
    const acceptAllButton = root.querySelector('[data-cookie-action="accept"]');
    const rejectButton = root.querySelector('[data-cookie-action="reject"]');
    const openButtons = document.querySelectorAll('[data-cookie-action="open"]');
    const measurementId = (root.dataset.gaId || '').trim();
    const prefersGa = measurementId.length > 0;
    let lastFocusedElement = null;

    if (analyticsToggle) {
        analyticsToggle.disabled = !prefersGa;
        if (!prefersGa) {
            analyticsToggle.checked = false;
            root.setAttribute('data-ga-unavailable', 'true');
        }
    }

    bootstrapGtag();
    window.gtag('consent', 'default', { analytics_storage: 'denied' });

    function setBannerVisibility(show) {
        root.hidden = !show;
        root.setAttribute('aria-hidden', String(!show));
        document.body.classList.toggle('cookie-consent-open', show);
        if (show) {
            lastFocusedElement = document.activeElement;
            setTimeout(() => {
                root.focus();
            }, 0);
        } else if (lastFocusedElement instanceof HTMLElement) {
            lastFocusedElement.focus({ preventScroll: true });
        }
    }

    function closeBanner() {
        setBannerVisibility(false);
    }

    function openBanner() {
        setBannerVisibility(true);
    }

    function persistAndApply(allowAnalytics) {
        savePreferences({ analytics: allowAnalytics });
        root.setAttribute('data-state', allowAnalytics ? 'accepted' : 'declined');
        applyAnalyticsConsent({ allowAnalytics: !!allowAnalytics, measurementId });
    }

    acceptAllButton?.addEventListener('click', () => {
        if (analyticsToggle && prefersGa) analyticsToggle.checked = true;
        persistAndApply(!!prefersGa);
        closeBanner();
    });

    rejectButton?.addEventListener('click', () => {
        const allowAnalytics = analyticsToggle ? analyticsToggle.checked && prefersGa : false;
        if (!allowAnalytics && analyticsToggle) analyticsToggle.checked = false;
        persistAndApply(allowAnalytics);
        closeBanner();
    });

    analyticsToggle?.addEventListener('change', (event) => {
        if (!prefersGa && event.target instanceof HTMLInputElement) {
            event.target.checked = false;
        }
    });

    root.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            event.preventDefault();
            closeBanner();
        } else if (event.key === 'Tab') {
            const focusables = root.querySelectorAll(focusableSelectors);
            if (focusables.length === 0) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            }
        }
    });

    openButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            openBanner();
        });
    });

    const savedPrefs = readPreferences();
    if (savedPrefs && typeof savedPrefs.analytics === 'boolean') {
        if (analyticsToggle) analyticsToggle.checked = !!savedPrefs.analytics && prefersGa;
        persistAndApply(savedPrefs.analytics && prefersGa);
        closeBanner();
    } else {
        setBannerVisibility(true);
    }
}

document.addEventListener('DOMContentLoaded', cookieConsent);
