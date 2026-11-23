<?php get_header(); ?>
<main>
    <?php while ( have_posts() ) : the_post(); ?>
    <section class="page-hero"><div class="container"><h1><?php the_title(); ?></h1><p><?php echo esc_html( get_the_date() ); ?></p></div></section>
    <article class="section"><div class="container entry-content"><?php the_content(); ?></div></article>
    <?php endwhile; ?>
</main>
<?php get_footer(); ?>
