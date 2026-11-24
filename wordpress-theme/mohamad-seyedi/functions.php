<?php
if ( ! defined( 'ABSPATH' ) ) { exit; }

define( 'MHS_TELEGRAM', 'https://t.me/mohamadhossineseyedi' );
define( 'MHS_TELEGRAM_USER', 'mohamadhossineseyedi' );

add_action( 'after_setup_theme', function () {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption' ) );
    add_theme_support( 'automatic-feed-links' );
    load_theme_textdomain( 'mohamad-seyedi', get_template_directory() . '/languages' );
    register_nav_menus( array( 'primary' => __( 'منوی اصلی', 'mohamad-seyedi' ) ) );
} );

add_action( 'wp_enqueue_scripts', function () {
    wp_enqueue_style( 'mhs-style', get_stylesheet_uri(), array(), '1.0' );
    wp_enqueue_script( 'mhs-theme', get_template_directory_uri() . '/assets/theme.js', array(), '1.0', true );
    wp_localize_script( 'mhs-theme', 'MHS', array(
        'telegram' => MHS_TELEGRAM,
        'user'     => MHS_TELEGRAM_USER,
    ) );
} );

/* Page URL helper */
function mhs_page_url( $slug ) {
    $p = get_page_by_path( $slug );
    return $p ? get_permalink( $p ) : home_url( '/' . $slug . '/' );
}

/* ---------- Shortcodes ---------- */
function mhs_lead_cta_shortcode( $atts ) {
    $a = shortcode_atts( array( 'label' => 'مشاوره رایگان بگیر', 'class' => 'services-cta', 'context' => 'shortcode' ), $atts );
    return '<a href="' . esc_url( MHS_TELEGRAM ) . '" data-telegram="' . esc_attr( $a['context'] ) . '" class="' . esc_attr( $a['class'] ) . '">' . esc_html( $a['label'] ) . '</a>';
}
add_shortcode( 'lead_cta', 'mhs_lead_cta_shortcode' );

function mhs_contact_form_shortcode() {
    ob_start(); ?>
    <form id="wp-contact-form" class="form">
        <p id="wp-contact-note" class="form-note" role="status" hidden></p>
        <label>اسمت<input type="text" name="name" required></label>
        <label>ایمیل یا شمارهات<input type="text" name="contact" required></label>
        <label>نوع پروژه
            <select name="service">
                <option>سایت شخصی</option>
                <option>سایت شرکتی</option>
                <option>سایت فروشگاهی</option>
                <option>پشتیبانی سایت</option>
                <option>چیز دیگر</option>
            </select>
        </label>
        <label>توضیح کوتاه پروژه<textarea name="message" rows="5" required></textarea></label>
        <button type="submit" class="services-cta">ارسال پیام</button>
    </form>
    <?php return ob_get_clean();
}
add_shortcode( 'tg_contact_form', 'mhs_contact_form_shortcode' );

/* ---------- Create starter pages + menu on activation ---------- */
add_action( 'after_switch_theme', function () {
    $pages = array(
        'home'       => array( 'صفحه اصلی', '', '', 'front-page.php' ),
        'services'   => array( 'خدمات', 'طراحی سایت شخصی، شرکتی، فروشگاهی و پشتیبانی. بهم بگو چه سایتی میخوای تا باهم بسازیمش.', 'page-services.php', '' ),
        'personal'   => array( 'طراحی سایت شخصی', 'سایت شخصی و رزومه اونلاین، واکنشگرا و سئوشده.', '', '' ),
        'company'    => array( 'طراحی سایت شرکتی', 'سایتی حرفه ای و قابل ویرایش برای معرفی کسب و کار.', '', '' ),
        'shop'       => array( 'طراحی سایت فروشگاهی', 'فروشگاه اینترنتی با صفحه محصول، سبد خرید و درگاه پرداخت.', '', '' ),
        'support'    => array( 'پشتیبانی سایت', 'رفع مشکل، بهبود سرعت و تغییرات کوچک سایت.', '', '' ),
        'portfolio'  => array( 'نمونه کارها', 'نمونه کارهای طراحی سایت.', '', '' ),
        'about'      => array( 'درباره من', 'محمد حسین صیدی، طراح سایت.', '', '' ),
        'experience' => array( 'تجربیات', 'تجربیات و سوابق کار.', '', '' ),
        'contact'    => array( 'تماس', 'برای شروع پروژه با من تماس بگیر.', 'page-contact.php', '' ),
        'blog'       => array( 'وبلاگ', 'مطلبهای طراحی سایت و سئو.', '', '' ),
    );

    $ids = array();
    foreach ( $pages as $slug => $data ) {
        $existing = get_page_by_path( $slug );
        if ( $existing ) { $ids[$slug] = $existing->ID; continue; }
        $args = array(
            'post_type'    => 'page',
            'post_status'  => 'publish',
            'post_title'   => $data[0],
            'post_name'    => $slug,
            'post_content' => $data[1],
        );
        if ( $data[2] ) { $args['page_template'] = $data[2]; }
        $ids[$slug] = wp_insert_post( $args );
    }

    update_option( 'show_on_front', 'page' );
    if ( ! empty( $ids['home'] ) ) { update_option( 'page_on_front', $ids['home'] ); }
    if ( ! empty( $ids['blog'] ) ) { update_option( 'page_for_posts', $ids['blog'] ); }

    $menu_name = 'منوی اصلی';
    $menu = wp_get_nav_menu_object( $menu_name );
    if ( ! $menu ) { $menu_id = wp_create_nav_menu( $menu_name ); }
    else { $menu_id = $menu->term_id; }

    $labels = array(
        'home' => 'خانه', 'services' => 'خدمات', 'about' => 'درباره من',
        'portfolio' => 'نمونه کارها', 'experience' => 'تجربیات',
        'blog' => 'وبلاگ', 'contact' => 'تماس',
    );
    foreach ( $labels as $slug => $label ) {
        if ( empty( $ids[$slug] ) ) { continue; }
        $exists = false;
        foreach ( wp_get_nav_menu_items( $menu_id ) as $item ) {
            if ( (int) $item->object_id === (int) $ids[$slug] ) { $exists = true; break; }
        }
        if ( ! $exists ) {
            wp_update_nav_menu_item( $menu_id, 0, array(
                'menu-item-title'  => $label,
                'menu-item-object-id' => $ids[$slug],
                'menu-item-object' => 'page',
                'menu-item-type'   => 'post_type',
                'menu-item-status' => 'publish',
            ) );
        }
    }
    $locations = get_theme_mod( 'nav_menu_locations' );
    $locations['primary'] = $menu_id;
    set_theme_mod( 'nav_menu_locations', $locations );
} );
