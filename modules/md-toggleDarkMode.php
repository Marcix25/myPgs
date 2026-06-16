<?php
//= TOGGLE DARK MODE 
function PGS_md_toggleDarkMode($typePgsButton= "buttonIcon") { ?>
    <button pgs="<?= $typePgsButton ?> toggleDarkmode" type="button" aria-label="Pulsante darkmode">
        <i class="fa-solid fa-moon"></i>
    </button>
<?php }
