<?php 
//= LOGO 
function PGS_md_logo($darkmodeLogo = false, $darkmodeLogoFixed = false) {
    $logo = get_theme_mod('custom_logo');
    $logo_header = get_theme_mod('logo_header');
    
    $darkmode = $darkmodeLogo ? "darkmodeLogo" : "";
    $darkmodeFixed = $darkmodeLogoFixed ? "darkmodeLogoFixed" : "";
    $urlHome = esc_url(home_url());

    echo "<a aria-label=\"logo\" class=\"logo {$darkmode} {$darkmodeFixed} \" href=\"{$urlHome} \">";

    if (function_exists('the_custom_logo') && has_custom_logo()) {
        //== logo classic
        echo '<img class="logo-img" src="' . esc_url(wp_get_attachment_image_url($logo)) . '" alt="' . get_bloginfo('name') . '">';
    } else {
        //== no logo
        echo '<span class="senza-logo">' . get_bloginfo('name') . '</span>';
    }
    echo '</a>';
}

function PGS_md_logoHorizontal($darkmodeLogo = false, $darkmodeLogoFixed = false) {
    $logo = get_theme_mod('custom_logo');
    $logo_header = get_theme_mod('logo_header');
    
    $darkmode = $darkmodeLogo ? "darkmodeLogo" : "";
    $darkmodeFixed = $darkmodeLogoFixed ? "darkmodeLogoFixed" : "";
    $urlHome = esc_url(home_url());

    echo "<a aria-label=\"logo\" class=\"logo {$darkmode} {$darkmodeFixed} \" href=\"{$urlHome} \">";
    if ($logo_header) {
        //== logo orizzontale
        echo '<img class="logo-img" src="' . esc_url($logo_header) . '" alt="' . get_bloginfo('name') . '">';
    } elseif (function_exists('the_custom_logo') && has_custom_logo()) {
        //== logo classic
        echo '<img class="logo-img" src="' . esc_url(wp_get_attachment_image_url($logo)) . '" alt="' . get_bloginfo('name') . '">';
    } else {
        //== no logo
        echo '<span class="senza-logo">' . get_bloginfo('name') . '</span>';
    }
    echo '</a>';
}
