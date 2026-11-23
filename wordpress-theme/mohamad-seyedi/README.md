# Mohammad Hossein Seyedi — WordPress Theme

Lightweight custom theme converted from the current static site. Persian RTL, local Vazirmatn fonts, Telegram lead forms, SEO-ready, no page builder.

## Install
1. Copy this folder to `wp-content/themes/mohamad-seyedi/` in your WordPress install.
2. In WP Admin → Appearance → Themes → Activate.
3. On activation, starter pages and the primary menu are created automatically.
4. Go to Settings → Permalinks → choose **Post name** and save.
5. Set Settings → Reading → Front page = "صفحه اصلی" (already set by activation).

## Before going live
- Replace `G-XXXXXXXXXX` in `assets/theme.js` with your real GA4 measurement ID.
- Replace `REPLACE_WITH_GSC_TOKEN` in `header.php` with your Google Search Console verification token.
- Edit page contents from WP Admin. The contact form uses the `[tg_contact_form]` shortcode and opens Telegram with a prefilled message; no mail plugin is required.

## Files
- `style.css` — theme header + original site stylesheet
- `functions.php` — enqueue, shortcodes, starter pages/menu
- `front-page.php`, `page.php`, `page-services.php`, `page-contact.php`, `single.php`
- `assets/theme.js`, `assets/fonts/`

No Elementor or heavy plugins required.
