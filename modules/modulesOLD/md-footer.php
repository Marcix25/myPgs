<?php

function PGS_md_footer() {
    $data_footerColumns = get_field("footer_columns", "option");
    $data_footerLegal = get_field("footer_legal", "option");
    $data_footerlinks = get_field("footer_links", "option");
    $data_enableCookieConsent = get_field("enable_cookie_consent", "option"); ?>

    <div id="footer">
        <?php PGS_md_toggleDarkMode("button") ?>
        <section id="footer_top" pgs="section">
            <div id="footer_top-content" pgs="flex-<?= $data_footerColumns ?>">
                <?php do_action("PGS_footer_content_action") ?>
            </div>
        </section>
        <section id="footer_legal" pgs="section">
            <div id="footer_legal-content">
                <?php do_action("PGS_footer_legalLeft_action") ?>
                <?php if ($data_enableCookieConsent ?? false) : ?> <button type="button" class="cookieConsent_manage" pgs="button cookieConsent-actionOpen" aria-haspopup="dialog" aria-controls="pgs-cookieConsent"> <i class="fa-solid fa-cookie-bite" aria-hidden="true"></i> <span>Preferenze cookie</span></button> <?php endif ?>
                <p><a href="<?= $data_footerlinks['privacy_policy'] ?? "" ?>">Privacy Policy</a></p>
                <p><a href="<?= $data_footerlinks['cookie_policy'] ?? "" ?>">Cookie Policy</a></p>
                <p><a href="<?= $data_footerlinks['terms_and_conditions'] ?? "" ?>">Termini e Condizioni</a></p>
                <p>©<?= date("Y") ?> <?= $data_footerLegal ?></p>
                <?php do_action("PGS_footer_legalRight_action") ?>
            </div>
        </section>
    </div>
<?php }


function PGS_md_footer_motto() {
    echo '<p id="footer__intestation-motto">' . get_bloginfo('description') . '</p>';
};
