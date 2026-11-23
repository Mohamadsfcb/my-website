<?php
/**
 * Template Name: خدمات
 */
get_header(); ?>
<main>
    <section class="page-hero"><div class="container"><h1>خدمات</h1><p>هر سایتی که لازم داری، از طرح تا راه اندازی.</p>
        <p><a href="<?php echo esc_url( MHS_TELEGRAM ); ?>" data-telegram="services-hero" class="services-cta">مشاوره رایگان بگیر</a></p>
    </div></section>
    <section class="section"><div class="container service-blocks">
        <?php foreach ( array(
            'personal' => array( 'طراحی سایت شخصی', 'سایت معرفی و رزومه، واکنشگرا و سئوشده.' ),
            'company'  => array( 'طراحی سایت شرکتی', 'سایتی مرتب و قابل اعتماد برای کسب و کار.' ),
            'shop'     => array( 'طراحی سایت فروشگاهی', 'صفحه محصول، سبد خرید و آموزش مدیریت.' ),
            'support'  => array( 'پشتیبانی سایت', 'رفع مشکل، بهبود سرعت و تغییرات کوچک.' ),
        ) as $slug => $data ) : ?>
            <article class="service-block reveal">
                <h2><?php echo esc_html( $data[0] ); ?></h2>
                <p><?php echo esc_html( $data[1] ); ?></p>
                <p class="more"><a href="<?php echo esc_url( mhs_page_url( $slug ) ); ?>">جزئیات و شروع پروژه</a></p>
            </article>
        <?php endforeach; ?>
    </div></section>
</main>
<?php get_footer(); ?>
