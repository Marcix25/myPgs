<?php


//= SET MENU
function PGS_md_menu($name, $type = "Horizontal",  $args = []) {
    echo '<nav pgs="menu' . ucfirst($type) . '">';
    wp_nav_menu([
        'theme_location'    => 'primary',
        'menu_class'        => 'primary-menu',
        'theme_location'    => $name,
        'menu_class'        => $name . '-menu',
        'container'         => false,
        'fallback_cb'       => false,
        ...$args
    ]);
    echo '</nav>';
}

//== menu callback
function PGS_md_menu_primary($type = "Horizontal") {
    PGS_md_menu('primary', $type);
}

//== menu callback
function PGS_md_menu_footer() {
    PGS_md_menu('footer', 'Footer');
}

//== menu callback
function PGS_md_menu_social() {
    PGS_md_menu('social', 'Footer');
}

//== LI "Esci"
// function PGS_md_menuLiLogout($position) {
//     add_filter('wp_nav_menu_items', function ($items, $args) use ($position) {
//         if ($args->theme_location === $position) $items .= '<li class="esci"><a href="' . esc_url(wp_logout_url(home_url() . "/accedi")) . '"><i class="fa-solid fa-door-closed"></i> Esci</a></li>';
//         return $items;
//     }, 10, 2);
// }

function PGS_md_menuLiLogout($position) {
    add_filter('wp_nav_menu_items', function ($items, $args) use ($position) {
        if (!empty($args->theme_location) && $args->theme_location === $position) {
            $items .= '<li class="esci"><a href="' . esc_url(wp_logout_url(home_url('/accedi'))) . '"><i class="fa-solid fa-door-closed"></i> Esci</a></li>';
        }
        return $items;
    }, 10, 2);
}

