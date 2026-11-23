<?php get_header(); ?>
<main>
    <section class="page-hero"><div class="container">
        <h1><?php the_title(); ?></h1>
        <p><a href="<?php echo esc_url( MHS_TELEGRAM ); ?>" data-telegram="page-hero" class="services-cta">مشاوره رایگان بگیر</a></p>
    </div></section>
    <?php while ( have_posts() ) : the_post(); ?>
    <section class="section"><div class="container entry-content"><?php the_content(); ?></div></section>
    <?php endwhile; ?>
    <section class="section alt"><div class="container">
        <div class="cta-band reveal"><div><h2>آمادهای شروع کنیم؟</h2><p>بهم بگو دقیقاً چه سایتی میخوای.</p></div>
        <a href="<?php echo esc_url( MHS_TELEGRAM ); ?>" data-telegram="page-bottom" class="services-cta">پیام بده</a></div>
    </div></section>
</main>
<?php get_footer(); ?>
