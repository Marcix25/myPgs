<?php
/**
 * PLUS Breadcrumbs
 * Uso: echo plus_breadcrumbs(); oppure shortcode [plus_breadcrumbs]
 */
function PGS_md_breadcamps($args = []) {
    if (is_front_page()) return '';

    $defaults = [
        'separator' => '›',
        'home_label' => 'Home',
    ];
    $args = array_merge($defaults, $args);

    $items = [];
    $items[] = [
        'label' => $args['home_label'],
        'url'   => home_url('/'),
        'current' => false,
    ];

    // PAGINE (gerarchiche): Home > Parent > Child
    if (is_page()) {
        $post = get_post();
        if ($post) {
            $ancestors = array_reverse(get_post_ancestors($post->ID));
            foreach ($ancestors as $ancestor_id) {
                $items[] = [
                    'label' => get_the_title($ancestor_id),
                    'url'   => get_permalink($ancestor_id),
                    'current' => false,
                ];
            }
            $items[] = [
                'label' => get_the_title($post->ID),
                'url'   => '',
                'current' => true,
            ];
        }
    }

    // SINGOLI POST (blog): Home > Blog > Titolo
    elseif (is_single() && get_post_type() === 'post') {
        $blog_page_id = get_option('page_for_posts');
        if ($blog_page_id) {
            $items[] = [
                'label' => get_the_title($blog_page_id),
                'url'   => get_permalink($blog_page_id),
                'current' => false,
            ];
        }
        $items[] = [
            'label' => get_the_title(),
            'url'   => '',
            'current' => true,
        ];
    }

    // ARCHIVI CPT: Home > Archivio CPT
    elseif (is_post_type_archive()) {
        $pt = get_queried_object();
        if ($pt && !empty($pt->labels->name)) {
            $items[] = [
                'label' => $pt->labels->name,
                'url'   => '',
                'current' => true,
            ];
        }
    }

    // CATEGORIE/TAG: Home > Nome termine
    elseif (is_category() || is_tag() || is_tax()) {
        $term = get_queried_object();
        if ($term && !is_wp_error($term)) {
            $items[] = [
                'label' => single_term_title('', false),
                'url'   => '',
                'current' => true,
            ];
        }
    }

    // fallback generico
    else {
        $items[] = [
            'label' => wp_get_document_title(),
            'url'   => '',
            'current' => true,
        ];
    }

    ob_start();
    // Render
    ?>
    <nav class="breadcrumb" aria-label="Breadcrumb">
        <ul class="breadcrumbs_list">
            <?php foreach ($items as $i => $it): ?>
                <li class="breadcrumbs_list-item">
                    <?php if (!empty($it['current'])): ?>
                        <span class="breadcrumbs_list-item-current" aria-current="page">
                            <?= esc_html($it['label']) ?>
                        </span>
                    <?php else: ?>
                        <a class="breadcrumbs_list-item-link" href="<?= esc_url($it['url']) ?>">
                            <?= esc_html($it['label']) ?>
                        </a>
                    <?php endif; ?>

                    <?php if ($i < count($items) - 1): ?>
                        <span class="breadcrumbs_list-sep" aria-hidden="true">
                            <?= esc_html($args['separator']) ?>
                        </span>
                    <?php endif; ?>
                </li>
            <?php endforeach; ?>
        </ul>
    </nav>
    <?php

    return ob_get_clean();
}
?>