<?php function PGS_md_tooltip($content){ ?>
    <span  class="tooltip" pgs="dropdown">
        <button class="tooltip_button"  pgs="dropdown-button buttonMini"  title="open-tooltip" type="button"><i class="fa-solid fa-info"></i></button>
        <div class="tooltip_content"  pgs="dropdown-content">
            <?= $content ?>
        </div>
    </span>
<?php } ?>