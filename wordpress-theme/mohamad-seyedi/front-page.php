<?php get_header(); ?>
<main>
    <section class="hero">
        <span class="blob blob-1" aria-hidden="true"></span><span class="blob blob-2" aria-hidden="true"></span>
        <div class="container hero-grid">
            <div class="hero-content">
                <h1 class="inbound">سلام، محمد حسین صیدی هستم.
                    <span class="inbound-sub">طراح سایتهای <span class="rotator" data-words="شخصی|شرکتی|فروشگاهی">شخصی</span></span></h1>
                <p class="hero-text">طراح سایتم. ۳ ساله دارم با وردپرس، المنتور، HTML و CSS کار می کنم. از یه سایت ساده و رزومهای بگیر تا سایت شرکتی و فروشگاهی، همهشو برات میسازم.</p>
                <div class="hero-actions">
                    <a href="<?php echo esc_url( MHS_TELEGRAM ); ?>" data-telegram="hero" class="services-cta">مشاوره رایگان بگیر</a>
                    <a href="<?php echo esc_url( mhs_page_url( 'services' ) ); ?>" class="ghost-cta">خدمات رو ببین</a>
                </div>
            </div>
            <div class="hero-visual" aria-hidden="true">
                <div class="browser"><div class="browser-bar"><span></span><span></span><span></span></div>
                    <div class="browser-body"><div class="wf-nav"></div><div class="wf-row"><div class="wf-text">
                        <i class="wf-line wf-line-lg"></i><i class="wf-line wf-line-lg short"></i><i class="wf-line"></i><i class="wf-line short"></i><i class="wf-btn"></i>
                    </div><div class="wf-image"><b></b></div></div></div>
                </div>
                <span class="chip chip-a">Figma</span><span class="chip chip-b">WordPress</span><span class="chip chip-c">Elementor</span>
                <span class="toast">طراحی تمام شد ✓</span>
            </div>
        </div>
    </section>

        <div class="marquee" aria-hidden="true">
            <div class="marquee-track">
                <span>HTML</span><span>CSS</span><span>WordPress</span><span>Elementor</span><span>Figma</span><span>UI</span><span>UX</span><span>JavaScript</span>
                <span>HTML</span><span>CSS</span><span>WordPress</span><span>Elementor</span><span>Figma</span><span>UI</span><span>UX</span><span>JavaScript</span>
            </div>
        </div>

    <section class="section alt"><div class="container">
        <h2 class="section-title">چرا من؟</h2>
        <div class="card-grid grid-3">
            <div class="card reveal"><strong>۳ سال تجربه</strong><p>تجربه ساخت سایت با وردپرس، المنتور و کد نویسی.</p></div>
            <div class="card reveal"><strong>طرح قبل از اجرا</strong><p>اول طرح رو میبینی و تأیید می کنی، بعد ساخت شروع میشه.</p></div>
            <div class="card reveal"><strong>پشتیبانی بعد از تحویل</strong><p>اگر مشکلی پیش آمد یا تغییری خواستی، کنارت هستم.</p></div>
        </div>
    </div></section>

    <section class="section"><div class="container">
        <h2 class="section-title">چه سایتی میخوای؟</h2>
        <div class="card-grid grid-4">
            <?php foreach ( array( 'personal' => 'سایت شخصی', 'company' => 'سایت شرکتی', 'shop' => 'سایت فروشگاهی', 'support' => 'پشتیبانی سایت' ) as $slug => $label ) : ?>
                <a class="card reveal" href="<?php echo esc_url( mhs_page_url( $slug ) ); ?>"><strong><?php echo esc_html( $label ); ?></strong><p>جزئیات و شروع پروژه</p></a>
            <?php endforeach; ?>
        </div>
    </div></section>

    <section class="section alt"><div class="container">
        <div class="cta-band reveal">
            <div><h2>پروژهای تو ذهنت داری؟</h2><p>بهم بگو چیه، خودمون میشینیم بهترین راهش رو پیدا می کنیم.</p></div>
            <a href="<?php echo esc_url( MHS_TELEGRAM ); ?>" data-telegram="front-bottom" class="services-cta">پیام بده</a>
        </div>
    </div></section>
</main>
<?php get_footer(); ?>
