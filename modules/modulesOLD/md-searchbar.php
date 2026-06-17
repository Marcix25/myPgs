<?php 

function PGS_md_searchBar($placeholder = "Cerca") { ?>
    <form pgs="buttonNohover" class="searchBar" autocomplete="off" action="<?php echo home_url(); ?>" method="get">
        <button type="submit" title="Cerca"><i class="fa-solid fa-search"></i></button>
        <input type="search" name="s" placeholder="<?= $placeholder ?>" value="<?php echo get_search_query(); ?>">
    </form>
<?php }

//== mobile search
function PGS_md_searchBarMobile($placeholder = "Cerca", $ModalContainerId = "myHeader") { ?>
    <div class="search-modal" pgs="modal" pgs-option="containerID[<?=  $ModalContainerId; ?>]">

        <button type="button" pgs="modal-button buttonIcon"><i class="fa-solid fa-search"></i></button>
        <dialog>
            <div class="searchBar-mobile" pgs="flexRow">
                <?php PGS_md_searchBar($placeholder) ?>
                <button type="button" pgs="modal-close buttonIcon"><i class="fa-solid fa-close"></i></button>
            </div>
        </dialog>
    </div>
<?php }