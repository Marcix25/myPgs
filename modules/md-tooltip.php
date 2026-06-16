<?php function PGS_md_tooltip($content){ ?>
    <span pgs="dropdown tooltip">
        <button pgs="dropdown-button buttonMini tooltip-button" title="open-tooltip" type="button"><i class="fa-solid fa-info"></i></button>
        <div pgs="dropdown-content tooltip-content">
            <?= $content ?>
        </div>
    </span>
<?php } ?>
