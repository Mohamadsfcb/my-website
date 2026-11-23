# submit-to-indexnow.py
# Ping IndexNow (Bing, Yandex, ...) for every URL in sitemap.xml.
# No account or API key registration needed beyond the key file hosted on the site.
import re
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent
BASE = "https://mohamadsfcb.github.io/my-website/"
KEY = (ROOT / "indexnow-key.txt").read_text(encoding="utf-8").strip()
KEY_LOCATION = BASE + "indexnow-key.txt"

urls = re.findall(r"<loc>([^<]+)</loc>", (ROOT / "sitemap.xml").read_text(encoding="utf-8"))
ok = 0
for u in urls:
    q = urllib.parse.urlencode({"url": u, "key": KEY, "keyLocation": KEY_LOCATION})
    try:
        req = urllib.request.Request("https://api.indexnow.org/indexnow?" + q, method="GET")
        with urllib.request.urlopen(req, timeout=15) as r:
            if r.status in (200, 202):
                ok += 1
    except Exception as e:
        print("skip", u, type(e).__name__)
print("IndexNow accepted:", ok, "/", len(urls))
