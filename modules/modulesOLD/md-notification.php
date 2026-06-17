<?php
function PGS_md_notification($args = []) {
    $args = wp_parse_args($args, [
        'title' => null,
        'message' => null,
        'element' => 'notification',
        'type' => 'info',
        'icon' => null,
        'duration' => '-1',
        'link' => null,
    ]);

    $notification = wp_json_encode($args); ?>
    
    <div pgs="hidden" class="notificationInput" data-notification="<?= esc_attr($notification) ?>"></div>
<?php } ?>
