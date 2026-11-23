<?php
/**
 * Template Name: تماس
 */
get_header(); ?>
<main>
    <section class="page-hero"><div class="container"><h1>راههای ارتباطی</h1><p>پروژهات رو برام بنویس تا اولین فرصت جواب بدم.</p></div></section>
    <section class="section"><div class="container contact-page">
        <ul class="info-list">
            <li><span>ایمیل</span>sm1793648@gmail.com</li>
            <li><span>تلفن</span>09965118691</li>
            <li><span>تلگرام</span><a href="<?php echo esc_url( MHS_TELEGRAM ); ?>">@<?php echo esc_html( MHS_TELEGRAM_USER ); ?></a></li>
        </ul>
        <?php echo do_shortcode( '[tg_contact_form]' ); ?>
    </div></section>
</main>
<?php get_footer(); ?>
