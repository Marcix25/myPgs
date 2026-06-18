<?php

function PGS_md_cookieConsent() {
    if (function_exists('get_field') && !get_field('enable_cookie_consent', 'option')) return;
    $ga_measurement_id = function_exists('PGS_get_ga_measurement_id') ? PGS_get_ga_measurement_id() : '';
    $privacy_url = function_exists('get_privacy_policy_url') ? get_privacy_policy_url() : ''; ?>
    <section id="pgs-cookieConsent" pgs="cookieConsent" role="dialog" aria-modal="true" data-ga-id="<?= esc_attr($ga_measurement_id); ?>" hidden tabindex="-1">

        <p><i class="fa-duotone fa-solid fa-cookie-bite"></i> Cookie e privacy <br></p>

        <h2>La tua privacy prima di tutto</h2>
        
        <p>
            Utilizziamo cookie tecnici per offrire il servizio e, previo consenso, cookie analitici di
            <strong>Google Analytics</strong> per misurare in modo anonimo il traffico e migliorare i contenuti.
            Puoi modificare la scelta in qualsiasi momento.
        </p>

        <p><a href="<?= esc_url($privacy_url); ?>" target="_blank" rel="noopener">Privacy Policy</a> - <a href="/cookie-policy/" target="_blank" rel="noopener">Cookie Policy</a></p>

        <div pgs="cookieConsent-panel flexColumn" role="group" aria-label="Preferenze cookie">
            <div pgs="flexRow nowrap cookieConsent-featureEssential">
                <div>
                    <p>
                        <strong>Cookie tecnici</strong>
                        <br>
                        <small>Sempre attivi per garantire il corretto funzionamento del sito.</small>
                    </p>
                </div>
                <span pgs="cookieConsent-panel-badge">Attivi</span>
            </div>
            <div pgs="flexRow cookieConsent-featureAnalytics">
                <label pgs="toggle">
                    <p>
                        <strong>Analytics</strong>
                        <br>
                        <small>Dati di navigazione raccolti in forma aggregata per statistiche anonime.</small>
                    </p>
                    <input type="checkbox" pgs="cookieConsent-toggleAnalytics" aria-label="Abilita Google Analytics">
                </label>
            </div>
        </div>

        <div pgs="flexRow">
            <button type="button" pgs="button cookieConsent-actionReject"><i class="fa-solid fa-duotone fa-sliders"></i>Solo selezionati</button>
            <button type="button" pgs="buttonStrong cookieConsent-actionAccept"><i class="fa-solid fa-check"></i> Accetta tutto</button>
        </div>
    </section>
<?php
}
