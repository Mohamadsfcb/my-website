(function () {
    'use strict';
    var TELEGRAM = (window.MHS && window.MHS.telegram) || 'https://t.me/mohamadhossineseyedi';
    var USER = (window.MHS && window.MHS.user) || 'mohamadhossineseyedi';

    function trackLead(context) {
        try {
            var all = JSON.parse(localStorage.getItem('lead_clicks') || '{}');
            all[context || 'site'] = (all[context || 'site'] || 0) + 1;
            localStorage.setItem('lead_clicks', JSON.stringify(all));
        } catch (e) {}
    }

    function hrefFor(context, extra) {
        var ref = '';
        try { if (document.referrer) { ref = new URL(document.referrer).hostname; } } catch (e) {}
        var msg = 'گیرنده: محمد حسین صیدی (@' + USER + ')\n\n' + 'از صفحه: ' + location.pathname +
            '\nمنبع: ' + (ref || 'مستقیم / گوگل') + (extra ? '\n' + extra : '') +
            '\n\nلطفاً کوتاه بنویسید: چه سایتی میخواهید و هدف پروژه چیست؟';
        return TELEGRAM + '?text=' + encodeURIComponent(msg);
    }

    function upgrade(a, context) {
        if (a.dataset.tgReady) return;
        a.dataset.tgReady = '1';
        var ctx = context || a.getAttribute('data-telegram') || 'telegram-link';
        a.setAttribute('data-telegram', ctx);
        a.href = hrefFor(ctx);
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.addEventListener('click', function () { trackLead(ctx); });
    }

    function upgradeAll() {
        document.querySelectorAll('a[data-telegram]').forEach(function (a) { upgrade(a); });
        document.querySelectorAll('a[href="' + TELEGRAM + '"]').forEach(function (a) { upgrade(a, 'telegram-link'); });
    }
    upgradeAll();

    var form = document.getElementById('wp-contact-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var f = new FormData(form);
            var msg = 'درخواست پروژه از ' + f.get('name') + '\n\n' +
                'نام: ' + f.get('name') + '\nراه تماس: ' + f.get('contact') +
                '\nنوع پروژه: ' + f.get('service') + '\n\n' + f.get('message');
            trackLead('wp-contact-form');
            var a = document.createElement('a');
            a.href = hrefFor('wp-contact-form', msg);
            a.target = '_blank'; a.rel = 'noopener noreferrer';
            document.body.appendChild(a); a.click(); document.body.removeChild(a);
            var note = document.getElementById('wp-contact-note');
            if (note) {
                note.textContent = 'پیامت آماده شد و در چت تلگرام باز شد؛ حتماً بفرست.';
                note.hidden = false;
            }
        });
    }

    var rot = document.querySelector('.rotator');
    if (rot && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        var words = rot.getAttribute('data-words').split('|'), w = 0, i = 0, del = false;
        (function tick() {
            rot.textContent = words[w].slice(0, i);
            if (!del) {
                if (i < words[w].length) { i++; setTimeout(tick, 110); }
                else { del = true; setTimeout(tick, 1500); }
            } else {
                if (i > 0) { i--; setTimeout(tick, 55); }
                else { del = false; w = (w + 1) % words.length; setTimeout(tick, 300); }
            }
        })();
    }

    var items = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.classList.add('reveal-ready');
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
        }, { threshold: 0.12 });
        items.forEach(function (el) { io.observe(el); });
        setTimeout(function () { items.forEach(function (el) { el.classList.add('in'); }); }, 2500);
    } else {
        items.forEach(function (el) { el.classList.add('in'); });
    }

    document.querySelectorAll('.faq-q').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var item = btn.closest('.faq-item');
            var wasOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item.open').forEach(function (o) {
                o.classList.remove('open');
                var b = o.querySelector('.faq-q'); if (b) b.setAttribute('aria-expanded', 'false');
            });
            if (!wasOpen) { item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
        });
    });
})();
