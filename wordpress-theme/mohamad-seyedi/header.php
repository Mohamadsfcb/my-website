<!DOCTYPE html>
<html <?php language_attributes(); ?> dir="rtl">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#0F1330">
    <link rel="preload" href="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/fonts/Vazirmatn-Regular.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/fonts/Vazirmatn-Bold.woff2" as="font" type="font/woff2" crossorigin>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<header class="site-header"><div class="container header-container">
    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="logo">محمد حسین صیدی</a>
    <nav class="main-nav" aria-label="منوی اصلی">
        <?php
        wp_nav_menu( array(
            'theme_location' => 'primary',
            'container'      => false,
            'menu_class'     => 'nav-list',
            'fallback_cb'    => function () {
                echo '<ul class="nav-list">';
                foreach ( array( 'home' => 'خانه', 'services' => 'خدمات', 'about' => 'درباره من', 'portfolio' => 'نمونه کارها', 'blog' => 'وبلاگ', 'contact' => 'تماس' ) as $slug => $label ) {
                    echo '<li><a href="' . esc_url( mhs_page_url( $slug ) ) . '">' . esc_html( $label ) . '</a></li>';
                }
                echo '</ul>';
            },
        ) );
        ?>
    </nav>
    <a href="<?php echo esc_url( MHS_TELEGRAM ); ?>" data-telegram="header" class="header-cta">مشاوره رایگان</a>
</div></header>
