<?php

//# IMPORT FN
function PGS_fn_importBlocs() {
    //= import file
    PGS_fn_parentPhp('blocs/bl-', ["section", "layouts", "accordion", "genericElements", "cards", "modals", "partners", "slides", "steps", "timeline", "icons", "gallery", "multiImg"]);
    PGS_fn_parentPhp('blocs/shortcode/sc-', ["general"]);
}

PGS_fn_importBlocs();

//= blocks
class PGS_md_Blocs {
    protected array $blocks;

    //- construct
    public function __construct() {

        $this->blocks = [
            //== Layout
            'layout_simple'     => fn($e) => (new PGS_bl_layouts())->simple($e),
            'layout_hero'       => fn($e) => (new PGS_bl_layouts())->hero($e),
            'layout_leftright'  => fn($e) => (new PGS_bl_layouts())->leftRight($e),
            'layout_columns'    => fn($e) => (new PGS_bl_layouts())->column($e),
            'layout_timeline'   => fn($e) => (new PGS_bl_timeline())->layout($e),
            'layout_modals'     => fn($e) => (new PGS_bl_modals())->layout($e),
            'layout_slides'     => fn($e) => (new PGS_bl_slides())->layout($e),
            'layout_steps'      => fn($e) => (new PGS_bl_steps($e)),

            //== elements
            'title'             => fn($e) => (new PGS_bl_genericElements())->title($e),
            'text'              => fn($e) => (new PGS_bl_genericElements())->text($e),
            'title_text'        => fn($e) => (new PGS_bl_genericElements())->titleText($e),
            'img'               => fn($e) => (new PGS_bl_genericElements())->img($e),
            'lottie'            => fn($e) => (new PGS_bl_genericElements())->lottie($e),
            'do_action'         => fn($e) => (new PGS_bl_genericElements())->doAction($e),
            'code'              => fn($e) => (new PGS_bl_genericElements())->code($e),
            'button'            => fn($e) => (new PGS_bl_genericElements())->button($e),
            'gallery'           => fn($e) => (new PGS_bl_gallery())->carosello($e),
            'multi_img'         => fn($e) => (new PGS_bl_multiImg())->render($e),
            'modal'             => fn($e) => (new PGS_bl_modals())->single($e),
            'slides'            => fn($e) => (new PGS_bl_slides())->render($e),
            'card'              => fn($e) => (new PGS_bl_card($e)),
            'accordion'         => fn($e) => (new PGS_bl_accordions($e)),
            'partners'          => fn($e) => (new PGS_bl_partners($e)),
            'icons'             => fn($e) => (new PGS_bl_icons($e)),
        ];
    }

    //+ section
    public function section(): void {
        $fields = get_field("section");
        if (!is_array($fields) || empty($fields)) return;
        
        foreach ($fields as $field) {
            new PGS_bl_section($field);
        }
    }

    //+ layout
    public function layout($field): void {
        $blocs = $this->blocks;
        if (!is_array($field) && empty($field)) return;

        foreach ($field["layouts"] as $E) {
            $layout = $E["acf_fc_layout"];
            if (!isset($blocs[$layout])) echo "non trovato:";
            else $blocs[$layout]($E);
        }
    }

    //+ elements
    public function elements($field): void {
        $blocs = $this->blocks;
        if (!is_array($field) && empty($field)) return;
        
        foreach ($field as $E) {
            $layout = $E["acf_fc_layout"];
            if (!isset($blocs[$layout])) echo "non trovato:";
            else $blocs[$layout]($E);
        }
    }

    //++ serve per le "thumbnail" in admin area wp
    static function get_blocks(): array {
        $obj = new PGS_md_Blocs();
        return $obj->blocks;
    }
}

//= WRAPPER 
//== Content
function PGS_md_blocs_section() {
    $obj = new PGS_md_Blocs();
    return $obj->section();
}

//== Layout
function PGS_md_blocs_layout($field = []) {
    $obj = new PGS_md_Blocs();
    return $obj->layout($field);
}

//== Elements
function PGS_md_blocs_elements($field = []) {
    $obj = new PGS_md_Blocs();
    return $obj->elements($field);
}


//= PER ESTENDERE PGS_md_Blocs
/// Per aggiungere altri elementi ai miei blocchi
class PGS_md_Blocs_extend extends PGS_md_Blocs {

    public function __construct($e) {
        parent::__construct();
        $this->blocks = array_merge($this->blocks, $e);
    }

    public function print_blocks(): array {
        return $this->blocks;
    }
}
