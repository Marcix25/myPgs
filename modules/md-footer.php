<?php

function PGS_md_footer() {
    $data_footerColumns = get_field("footer_columns", "option");
    $data_footerLegal = get_field("footer_legal", "option");
    $data_footerlinks = get_field("footer_links", "option"); ?>

    <footer pgs="footer">
        <?php PGS_md_toggleDarkMode("button") ?>
        <section pgs="footer-top section">
            <div pgs="footer-top-content flex-<?= $data_footerColumns ?>">
                <?php do_action("PGS_footer_content_action") ?>
            </div>
        </section>
        <section pgs="footer-legal section">
            <div pgs="footer-legal-content">
                <?php do_action("PGS_footer_legalLeft_action") ?>
                <p><a href="<?= $data_footerlinks['privacy_policy'] ?? "" ?>">Privacy Policy</a></p>
                <p><a href="<?= $data_footerlinks['cookie_policy'] ?? "" ?>">Cookie Policy</a></p>
                <p><a href="<?= $data_footerlinks['terms_and_conditions'] ?? "" ?>">Termini e Condizioni</a></p>
                <p>©<?= date("Y") ?> <?= $data_footerLegal ?></p>
                <?php do_action("PGS_footer_legalRight_action") ?>
            </div>
        </section>
    </footer>
<?php }


function PGS_md_footer_motto() {
    echo '<p pgs="footer-brand-motto">' . get_bloginfo('description') . '</p>';
};
