<?php

function SEF_md_seo($viewLog = false) {
    $seo = get_field('pgs_seo');
    if ($viewLog) PGS_fn_consoleLog($seo);
    if (get_field('attiva_pgs_seo') && $seo) {
        PGS_fn_seo([
            'title'          => $seo['title']          ?? '',
            'description'    => $seo['description']    ?? '',
            'keywords'       => $seo['keywords']       ?? '',
            'author'         => $seo['author']         ?? '',
            'canonical'      => $seo['canonical']      ?? '',
            'index'          => $seo['index']          ?? true,
            'follow'         => $seo['follow']         ?? true,
            'og_title'       => $seo['og_title']       ?? '',
            'og_description' => $seo['og_description'] ?? '',
            'og_image'       => $seo['og_image']       ?? '',
            'og_type'        => $seo['og_type']        ?? 'website',
            'og_url'         => $seo['og_url']         ?? '',
            'twitter_card'   => $seo['twitter_card']   ?? 'summary_large_image',
            'twitter_site'   => $seo['twitter_site']   ?? '',
        ]);
    }
}
