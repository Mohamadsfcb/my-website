(function () {
    // ایمیل خودت را اینجا بنویس تا فرم تماس به آن ارسال شود
    var TELEGRAM_USER = 'mohamadhossineseyedi';
    var TELEGRAM_URL = 'https://t.me/mohamadhossineseyedi';


    function trackLead(context) {
        try {
            var k = 'lead_clicks';
            var all = JSON.parse(localStorage.getItem(k) || '{}');
            all[context || 'site'] = (all[context || 'site'] || 0) + 1;
            localStorage.setItem(k, JSON.stringify(all));
        } catch (e) {}
    }

    function telegramHref(context, extra) {
        var page = location.pathname.split('/').pop() || 'index.html';
        var ref = '';
        try { if (document.referrer) { ref = new URL(document.referrer).hostname; } } catch (e) {}
        var msg = 'گیرنده: محمد حسین صیدی (@' + TELEGRAM_USER + ')\n\n' +
            'از صفحه: ' + page + '\nمنبع: ' + (ref || 'مستقیم / گوگل') +
            (extra ? '\n' + extra : '') +
            '\n\nلطفاً کوتاه بنویسید: چه سایتی میخواهید و هدف پروژه چیست؟';
        return TELEGRAM_URL + '?text=' + encodeURIComponent(msg);
    }

    function upgradeOne(a, context) {
        if (a.dataset.tgReady) return;
        a.dataset.tgReady = '1';
        var ctx = context || a.getAttribute('data-telegram') || 'telegram-link';
        a.setAttribute('data-telegram', ctx);
        a.href = telegramHref(ctx);
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.addEventListener('click', function () { trackLead(ctx); });
    }

    function upgradeTelegramLinks() {
        document.querySelectorAll('a[data-telegram]').forEach(function (a) { upgradeOne(a); });
        document.querySelectorAll('a[href="' + TELEGRAM_URL + '"]').forEach(function (a) { upgradeOne(a, 'telegram-link'); });
    }

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.documentElement.classList.add('js');

    /* ---------- هدر و فوتر مشترک همه صفحه‌ها ---------- */
    var icon = function (d) {
        return '<span class="menu-icon"><svg viewBox="0 0 24 24" aria-hidden="true">' + d + '</svg></span>';
    };

    var headerHTML =
    '<header class="site-header"><div class="container header-container">' +
    '<a href="index.html" class="logo">محمد حسین صیدی</a>' +
    '<nav class="main-nav" aria-label="منوی اصلی"><ul class="nav-list">' +
    '<li><a href="index.html">خانه</a></li>' +
    '<li class="nav-item"><details class="nav-dropdown"><summary>خدمات</summary><div class="mega-menu">' +
    '<div class="mega-menu-header"><h2>خدمات طراحی سایت</h2><p>راهکارهایی برای حضور در فضای دیجیتال</p></div>' +
    '<div class="mega-menu-grid">' +
    '<a href="service-company.html" class="mega-menu-item">' + icon('<path d="M4 20V6l8-3 8 3v14M9 20v-5h6v5M8 9h2M14 9h2M8 12h2M14 12h2"/>') + '<span><strong>طراحی سایت شرکتی</strong><small>معرفی کسب و کار شما</small></span></a>' +
    '<a href="service-shop.html" class="mega-menu-item">' + icon('<circle cx="9" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/><path d="M3 4h2l2.5 11h10L20 8H6.5"/>') + '<span><strong>طراحی سایت فروشگاهی</strong><small>راه‌اندازی فروشگاه اینترنتی</small></span></a>' +
    '<a href="service-personal.html" class="mega-menu-item">' + icon('<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>') + '<span><strong>طراحی سایت شخصی</strong><small>ساخت وب‌سایت معرفی و رزومه</small></span></a>' +
    '<a href="service-support.html" class="mega-menu-item">' + icon('<path d="M4 16a8 8 0 1 1 16 0"/><path d="M12 16l4-5"/>') + '<span><strong>پشتیبانی سایت</strong><small>بهبود سرعت سایت</small></span></a>' +
    '</div><div class="mega-menu-footer"><a href="services.html">مشاهده تمام خدمات</a></div></div></details></li>' +
    '<li><a href="about.html">درباره من</a></li>' +
    '<li><a href="portfolio.html">نمونه کارها</a></li>' +
    '<li><a href="experience.html">تجربیات</a></li>' +
    '<li><a href="blog.html">وبلاگ</a></li>' +
    '<li><a href="contact.html">تماس</a></li>' +
    '<li><a href="ticket.html">ارسال تیکت</a></li>' +
    '</ul></nav>' +
    '<a href="' + TELEGRAM_URL + '" data-telegram="header" class="header-cta">مشاوره رایگان</a>' +
    '</div></header>';

    var footerHTML =
    '<footer class="site-footer"><div class="container footer-grid">' +
    '<div><strong class="footer-logo">محمد حسین صیدی</strong><p>طراح سایت. طراحی سایت شخصی، شرکتی و فروشگاهی.</p></div>' +
    '<ul class="footer-links">' +
    '<li><a href="index.html">خانه</a></li><li><a href="about.html">درباره من</a></li>' +
    '<li><a href="services.html">خدمات</a></li><li><a href="portfolio.html">نمونه کارها</a></li>' +
    '<li><a href="service-support.html">پشتیبانی</a></li><li><a href="ticket.html">ارسال تیکت</a></li>' +
    '<li><a href="experience.html">تجربیات</a></li><li><a href="blog.html">وبلاگ</a></li>' +
    '<li><a href="contact.html">تماس</a></li></ul>' +
    '</div><div class="container"><p class="copyright">© محمد حسین صیدی، طراح سایت</p></div></footer>';

    function mount(id, html) {
        var el = document.getElementById(id);
        if (el) el.innerHTML = html;
    }
    mount('site-header', headerHTML);
    mount('site-footer', footerHTML);
    upgradeTelegramLinks();

    /* لینک صفحه فعلی */
    var current = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-list > li > a').forEach(function (a) {
        if (a.getAttribute('href') === current) a.classList.add('active');
    });

    /* بستن منوی خدمات */
    var dropdown = document.querySelector('.nav-dropdown');
    if (dropdown) {
        document.addEventListener('click', function (e) {
            if (!dropdown.contains(e.target)) dropdown.removeAttribute('open');
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') dropdown.removeAttribute('open');
        });
        dropdown.querySelectorAll('.mega-menu a').forEach(function (l) {
            l.addEventListener('click', function () { dropdown.removeAttribute('open'); });
        });
    }

    /* ---------- کلمه‌های متحرک تایپی در صفحه اصلی ---------- */
    var rot = document.querySelector('.rotator');
    if (rot && !reduce) {
        var words = rot.getAttribute('data-words').split('|');
        var w = 0, i = 0, del = false;
        (function tick() {
            var word = words[w];
            rot.textContent = word.slice(0, i);
            if (!del) {
                if (i < word.length) { i++; setTimeout(tick, 110); }
                else { del = true; setTimeout(tick, 1500); }
            } else {
                if (i > 0) { i--; setTimeout(tick, 55); }
                else { del = false; w = (w + 1) % words.length; setTimeout(tick, 300); }
            }
        })();
    }

    /* ---------- چرخش سه‌بعدی پنجره مرورگر با حرکت ماوس ---------- */
    var vis = document.querySelector('.hero-visual');
    if (vis && !reduce && window.matchMedia('(hover: hover)').matches) {
        var hero = document.querySelector('.hero');
        hero.addEventListener('mousemove', function (e) {
            var r = hero.getBoundingClientRect();
            var x = (e.clientX - r.left) / r.width - 0.5;
            var y = (e.clientY - r.top) / r.height - 0.5;
            vis.style.setProperty('--ry', (-x * 12).toFixed(2) + 'deg');
            vis.style.setProperty('--rx', (y * 10).toFixed(2) + 'deg');
        });
        hero.addEventListener('mouseleave', function () {
            vis.style.setProperty('--ry', '0deg');
            vis.style.setProperty('--rx', '0deg');
        });
    }

    /* ---------- ظاهر شدن بخش‌ها هنگام اسکرول ---------- */
    var items = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && !reduce) {
        // فقط وقتی مشاهدهگر آماده است مخفی کردن را aktive می کنیم
        document.documentElement.classList.add('reveal-ready');
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
            });
        }, { threshold: 0.12 });
        items.forEach(function (el) { io.observe(el); });
        // اگر به هر دلیلی مشاهدهگر اجرا نشد، محتوا نباید پنهان بماند
        setTimeout(function () {
            items.forEach(function (el) { el.classList.add('in'); });
        }, 2500);
    } else {
        items.forEach(function (el) { el.classList.add('in'); });
    }

    /* ---------- ارسال پیام: تلگرام (روش اصلی) + ایمیل (جایگزین) ---------- */
    function showNote(id, text, linkHref, linkLabel) {
        var note = document.getElementById(id);
        if (!note) return;
        note.textContent = '';
        note.appendChild(document.createTextNode(text + ' '));
        if (linkHref) {
            var a = document.createElement('a');
            a.href = linkHref;
            a.textContent = linkLabel || 'باز کردن چت تلگرام';
            note.appendChild(a);
        }
        note.hidden = false;
    }

    function openTelegram(text, context) {
        trackLead(context || 'form');
        var full = 'گیرنده: محمد حسین صیدی (@' + TELEGRAM_USER + ')\n\n' + text;
        var url = TELEGRAM_URL + '?text=' + encodeURIComponent(full);
        /* لینک موقت با target=_blank: فقط تب جدید باز میشه، تب سایت ثابت میماند */
        var link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    /* ---------- فرم تماس ---------- */
    var form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var f = new FormData(form);
            var subject = 'درخواست پروژه از ' + f.get('name');
            var body = 'نام: ' + f.get('name') + '\nراه تماس: ' + f.get('contact') +
                       '\nنوع پروژه: ' + f.get('service') + '\n\n' + f.get('message');
            openTelegram(subject + '\n\n' + body, 'contact-form');
            showNote('contact-note', 'پیامت آماده شد و مستقیم در چت تلگرام محمد حسین باز شد؛ حتماً بفرست. اگر باز نشد،', TELEGRAM_URL);
        });
    }

    /* ---------- فرم پشتیبانی (در صورتی که در صفحهای استفاده شد) ---------- */
    var sform = document.getElementById('support-form');
    if (sform) {
        sform.addEventListener('submit', function (e) {
            e.preventDefault();
            var f = new FormData(sform);
            var subject = 'درخواست پشتیبانی: ' + f.get('site');
            var body = 'نام: ' + f.get('name') + '\nراه تماس: ' + f.get('contact') +
                       '\nآدرس سایت: ' + f.get('site') + '\nنوع مشکل: ' + f.get('issue') +
                       '\n\n' + f.get('message');
            openTelegram(subject + '\n\n' + body, 'support-form');
            showNote('support-note', 'پیامت آماده شد و مستقیم در چت تلگرام محمد حسین باز شد؛ حتماً بفرست. اگر باز نشد،', TELEGRAM_URL);
        });
    }

    /* ---------- تیکت پشتیبانی: پیش نویس محلی + ارسال واقعی از طریق تلگرام ---------- */
    var tform = document.getElementById('ticket-form');
    var tlist = document.getElementById('ticket-list');
    if (tform && tlist) {
        var TICKET_KEY = 'support_tickets';

        var loadTickets = function () {
            try { return JSON.parse(localStorage.getItem(TICKET_KEY)) || []; }
            catch (err) { return []; }
        };
        var saveTickets = function (arr) {
            try { localStorage.setItem(TICKET_KEY, JSON.stringify(arr)); }
            catch (err) { /* اگه مرورگر اجازه نداد، فقط ذخیره نمی‌شود */ }
        };
        var makeEl = function (tag, cls, text) {
            var el = document.createElement(tag);
            if (cls) el.className = cls;
            if (text) el.textContent = text;
            return el;
        };

        var renderTickets = function () {
            var all = loadTickets();
            tlist.textContent = '';
            if (!all.length) {
                tlist.appendChild(makeEl('li', 'ticket-empty', 'هنوز پیش نویسی نساختی.'));
                return;
            }
            all.forEach(function (t, idx) {
                var li = makeEl('li', 'ticket');
                li.appendChild(makeEl('span', 'ticket-code', t.code));
                li.appendChild(makeEl('strong', '', t.subject));
                var date = new Date(t.time).toLocaleDateString('fa-IR');
                li.appendChild(makeEl('small', '', date + ' · اولویت ' + t.priority));
                var del = makeEl('button', 'ticket-del', 'حذف از این مرورگر');
                del.type = 'button';
                del.addEventListener('click', function () {
                    var cur = loadTickets();
                    cur.splice(idx, 1);
                    saveTickets(cur);
                    renderTickets();
                });
                li.appendChild(del);
                tlist.appendChild(li);
            });
        };
        renderTickets();

        tform.addEventListener('submit', function (e) {
            e.preventDefault();
            var f = new FormData(tform);
            var code = 'P-' + Date.now().toString(36).toUpperCase().slice(-6);
            var body = 'کد پیش نویس: ' + code + '\nنام: ' + f.get('name') +
                '\nراه تماس: ' + f.get('contact') + '\nآدرس سایت: ' + f.get('site') +
                '\nاولویت: ' + f.get('priority') + '\n\n' + f.get('message');
            var subject = 'درخواست پشتیبانی ' + code + ': ' + f.get('subject');

            var all = loadTickets();
            all.unshift({
                code: code,
                subject: String(f.get('subject')),
                priority: String(f.get('priority')),
                time: Date.now()
            });
            saveTickets(all);
            renderTickets();
            tform.reset();

            openTelegram(subject + '\n\n' + body, 'ticket-form');
            showNote('ticket-note',
                'پیش نویس ساخته شد (کد ' + code + '). این کد فقط تو این مرورگر ذخیره شده؛ پیام مستقیم در چت تلگرام محمد حسین باز شد، حتماً ارسالش کن تا برسم. اگر باز نشد،',
                TELEGRAM_URL);
        });
    }

    /* ---------- پرسش‌های رایج به‌صورت کشو: با باز شدن یکی، بقیه بسته می‌شوند ---------- */
    document.querySelectorAll('.faq-q').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var item = btn.closest('.faq-item');
            var wasOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item.open').forEach(function (o) {
                o.classList.remove('open');
                o.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
            });
            if (!wasOpen) {
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });
})();
