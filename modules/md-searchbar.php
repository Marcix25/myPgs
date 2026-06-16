<?php 

function PGS_md_searchBar($placeholder = "Cerca") { ?>
    <form pgs="buttonNohover searchbar" autocomplete="off" action="<?php echo home_url(); ?>" method="get">
        <button type="submit" title="Cerca"><i class="fa-solid fa-search"></i></button>
        <input type="search" name="s" placeholder="<?= $placeholder ?>" value="<?php echo get_search_query(); ?>">
    </form>
<?php }

//== mobile search
function PGS_md_searchBarMobile($placeholder = "Cerca", $ModalContainerId = "header") {
    $modalContainerOption = strpos($ModalContainerId, "[") !== false
        ? $ModalContainerId
        : "containerPgs[{$ModalContainerId}]";
    ?>
    <div pgs="modal searchbar-modal" pgs-option="<?= $modalContainerOption ?>">

        <button type="button" pgs="modal-button buttonIcon" title="Cerca"><i class="fa-solid fa-search"></i></button>
        <dialog>
            <div pgs="flexRow searchbar-mobile">
                <?php PGS_md_searchBar($placeholder) ?>
                <button type="button" pgs="modal-close buttonIcon" title="Chiudi"><i class="fa-solid fa-close"></i></button>
            </div>
        </dialog>
    </div>
<?php }
