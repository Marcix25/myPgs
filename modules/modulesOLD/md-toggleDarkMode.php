<?php
//= TOGGLE DARK MODE 
function PGS_md_toggleDarkMode($typePgsButton= "buttonIcon") { ?>
    <button pgs="<?= $typePgsButton ?>" type="button" aria-label="Pulsante darkmode" class="toggleDarkMode">
        <i class="fa-solid fa-moon"></i>
    </button>
<?php }