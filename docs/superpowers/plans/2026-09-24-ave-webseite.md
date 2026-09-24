# AVE-Webseite · Umsetzungsplan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Die statische, responsive Firmenwebseite der AVE Businesshygiene GmbH (10 Seiten, Stil C „Anthrazit Modern“) im Ordner `Eigene-Website/ave-webseite/` bauen.

**Architecture:** Eine HTML-Datei pro Seite. Header und Footer sind als identisches Markup in jeder Datei enthalten. Alle Seiten nutzen eine gemeinsame `css/style.css` und `js/main.js`. Die Jobs-Seite lädt zusätzlich `js/stellen.js` (Daten) und `js/bewerbung.js` (Stellenkarten und 6-Schritte-Assistent). Die Formulare laufen über Netlify Forms. Die JavaScript-Logik hängt an `window.AVE` und wird in einer Browser-Testseite getestet. Die HTML-Struktur prüft ein Python-Skript.

**Tech Stack:** HTML5, CSS3 (Custom Properties, Grid, `clip-path`), Vanilla-JavaScript (ES5-kompatibel, ohne Build). Tests: Browser-Testseite `tests/tests.html` und `tests/check_site.py` (Python 3 aus macOS, nur Standardbibliothek). Lokaler Server zum Testen: `python3 -m http.server`.

**Spec:** `docs/superpowers/specs/2026-09-24-ave-webseite-design.md`

## Global Constraints

- Zielordner der Webseite: `Eigene-Website/ave-webseite/`. Tests liegen in `Eigene-Website/tests/`, außerhalb des veröffentlichten Ordners.
- Kein Framework, kein npm, kein Build-Schritt. Die Seite muss per Doppelklick auf `index.html` funktionieren (`file://`).
- Beim Seitenaufruf keine externen Anfragen: Schriften lokal in `fonts/`, keine Tracker, keine Cookies. Google Maps lädt erst nach Klick.
- Alle Texte auf Deutsch. Es werden keine Fakten erfunden (keine Kundenzahlen, Zertifikate oder Kundenstimmen).
- Firmendaten exakt: „AVE Businesshygiene GmbH“, „Waldecker Straße 4, 64546 Mörfelden-Walldorf“, Anzeige „06105 30 39 66 8“, Link `tel:+4961053039668`, `info@ave-businesshygiene.de`, Öffnungszeiten „Mo–Do 8–18 Uhr · Fr 8–16 Uhr · Sa/So nach Vereinbarung“.
- Farben: `--anthrazit #1C1F24`, `--anthrazit-2 #2A2E35`, `--gold #C9A35A`, `--gold-text #8C6D2E` (Goldschrift auf Hell), `--ink #1D232B`, `--muted #5B6570`, `--muted-dark #B9BEC6`, `--line #E3E5E8`, `--grey #F6F7F8`, `--error #B42318`.
- Schriften: Montserrat für Überschriften, Kicker und Knöpfe (H1–H3 in GROSSBUCHSTABEN), Inter für Fließtext. Beide als variable `woff2` selbst gehostet.
- Breakpoints: Handy ist die Basis, `768px` Tablet, `1100px` Desktop-Menü. Max. Inhaltsbreite 1180 px, Seitenrand 16 px (ab 768 px: 24 px).
- Eckige Formen (`border-radius: 0`), nur der Anruf-Knopf fürs Handy ist rund.
- Kein Git-Repository vorhanden: Commit-Schritte entfallen. Git und GitHub folgen im Workshop, Schritt 7.
- Downloads (Schriften) erst nach ausdrücklicher Zustimmung des Inhabers, mit Nennung von Dateiname, Quelle und Größe.

## Review Focus

1. **Enter-Taste im Bewerbungsassistenten:** Enter in einem Eingabefeld eines frühen Schritts darf das Formular nicht vorzeitig absenden. Es soll wie „Weiter“ wirken, inklusive Prüfung. Test: Task 8, „Enter prüft und wechselt nur bei gültigem Schritt“.
2. **Doppelklick-Nutzung (`file://`):** Wer lokal ein gültiges Formular absendet, bekommt einen verständlichen Hinweis statt einer kaputten Seite. Test: Task 3, „initForm: Offline-Hinweis“.
3. **Unbekannter oder fehlender `?leistung=`-Parameter:** Kein Fehler, das Feld bleibt auf „Bitte wählen …“. Test: Task 3, „preselectService: unbekannte Leistung / ohne Parameter“.
4. **Leere Stellenliste** (`STELLEN = []`): Freundlicher Hinweis auf Initiativbewerbung. Die Auswahl enthält weiter „Initiativbewerbung“. Test: Task 8, „renderStellen: leere Liste“ und „fillStellenSelect: leere Liste“.
5. **Handy-Menü:** Mit Esc, per Linkklick oder beim Wechsel auf Desktop-Breite schließt das Menü, und die Seite ist wieder scrollbar. Test: Task 3, „initNav“. Die Breitenänderung prüft Task 10 manuell.
   Außerdem: Lebenslauf mit Großbuchstaben-Endung (`.PDF`) wird akzeptiert, über 8 MB abgelehnt. Test: Task 3, `checkFile`.

---

## Dateiübersicht

| Datei | Verantwortung | Task |
|---|---|---|
| `ave-webseite/css/style.css` | gesamtes Design-System | 2 |
| `ave-webseite/js/main.js` | Menü, Jahr, Karte, Formularprüfung, Leistung vorwählen | 3 |
| `ave-webseite/js/stellen.js` | Stellen-Daten (vom Inhaber editierbar) | 8 |
| `ave-webseite/js/bewerbung.js` | Stellenkarten, Stellen-Auswahl, 6-Schritte-Assistent | 8 |
| `ave-webseite/index.html` | Home | 4 |
| `ave-webseite/ueber-uns.html`, `qualitaetsmanagement.html` | Inhaltsseiten | 5 |
| `ave-webseite/dienstleistungen.html` | 10 Leistungen | 6 |
| `ave-webseite/kontakt.html`, `img/karte-vorschau.svg` | Kontakt, Formular, Karte | 7 |
| `ave-webseite/jobs.html` | Jobs und Bewerbung | 8 |
| `ave-webseite/impressum.html`, `datenschutz.html`, `danke.html`, `404.html` | Recht, Bestätigung, Fehlerseite | 9 |
| `ave-webseite/img/logo.png`, `img/favicon.png`, `fonts/*.woff2`, `_redirects`, `robots.txt`, `sitemap.xml` | Assets und Konfiguration | 1 |
| `tests/check_site.py` | statische HTML-Prüfung | 1 |
| `tests/tests.html`, `tests/harness.js`, `tests/tests-main.js`, `tests/tests-bewerbung.js` | JS-Tests im Browser | 1, 3, 8 |

**Testserver** (für alle Tasks gleich, einmal im Hintergrund starten):
```bash
cd "/Users/andrepires/Desktop/Claude Workshops/Tag-4-Kit 2/Eigene-Website" && python3 -m http.server 8766 --bind 127.0.0.1
```
- JS-Tests: `http://127.0.0.1:8766/tests/tests.html` im Browser-Fenster öffnen und den Seitentext lesen. Erwartet: „ALLE OK – n/n bestanden“.
- Seiten: `http://127.0.0.1:8766/ave-webseite/index.html`
- Strukturprüfung: `python3 tests/check_site.py` (aus `Eigene-Website/`)

---

### Task 1: Projektgerüst, Assets und Testwerkzeuge

**Files:**
- Create: `ave-webseite/img/logo.png`, `ave-webseite/img/favicon.png`, `ave-webseite/fonts/montserrat-latin-wght-normal.woff2`, `ave-webseite/fonts/inter-latin-wght-normal.woff2`
- Create: `ave-webseite/_redirects`, `ave-webseite/robots.txt`, `ave-webseite/sitemap.xml`
- Create: `tests/check_site.py`, `tests/tests.html`, `tests/harness.js`

**Interfaces:**
- Produces: `check_site.py` (Exit-Code 0 = OK, 1 = Fehlerliste). `harness.js` stellt global bereit: `test(name, fn)`, `eq(actual, expected, msg)`, `ok(value, msg)`, `html(markup) → fixture`, `fixture`, `report()`.
- Produces: `img/logo.png` (241×208), `img/favicon.png` (128×128), Font-Dateinamen wie oben.

- [ ] **Step 1: Ordner anlegen und Logo kopieren**

```bash
cd "/Users/andrepires/Desktop/Claude Workshops/Tag-4-Kit 2/Eigene-Website"
mkdir -p ave-webseite/css ave-webseite/js ave-webseite/img ave-webseite/fonts tests
cp logo-original/ave-logo-x2-1.png ave-webseite/img/logo.png
sips -p 128 128 --padColor 1C1F24 logo-original/ave-logo-mobile-2-e1701457827881.png --out ave-webseite/img/favicon.png
sips -g pixelWidth -g pixelHeight ave-webseite/img/logo.png ave-webseite/img/favicon.png
```
Erwartet: logo 241×208, favicon 128×128.

- [ ] **Step 2: Schriften herunterladen (vorher den Inhaber fragen)**

Fragen: „Darf ich zwei Schriftdateien herunterladen? `montserrat-latin-wght-normal.woff2` und `inter-latin-wght-normal.woff2`, von cdn.jsdelivr.net (Paket @fontsource-variable, freie Lizenz SIL OFL), je ca. 30–50 KB.“ Erst nach „ja“:
```bash
cd "/Users/andrepires/Desktop/Claude Workshops/Tag-4-Kit 2/Eigene-Website/ave-webseite/fonts"
curl -sfLO https://cdn.jsdelivr.net/npm/@fontsource-variable/montserrat/files/montserrat-latin-wght-normal.woff2
curl -sfLO https://cdn.jsdelivr.net/npm/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2
ls -la && file *.woff2
```
Erwartet: zwei Dateien, `Web Open Font Format (Version 2)`. Bei Nein: Ordner leer lassen. Die CSS-Ersatzschriften greifen dann, und `check_site.py` meldet die fehlenden Fonts nur als Warnung (siehe Step 4).

- [ ] **Step 3: Konfigurationsdateien schreiben**

`ave-webseite/_redirects`:
```
/ueber-uns/             /ueber-uns.html             301!
/dienstleistungen/      /dienstleistungen.html      301!
/qualitaetsmanagement/  /qualitaetsmanagement.html  301!
/jobs/                  /jobs.html                  301!
/kontaktieren-sie-uns/  /kontakt.html               301!
/impressum/             /impressum.html             301!
/datenschutz/           /datenschutz.html           301!
```

`ave-webseite/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://www.ave-businesshygiene.de/sitemap.xml
```

`ave-webseite/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.ave-businesshygiene.de/</loc><priority>1.0</priority></url>
  <url><loc>https://www.ave-businesshygiene.de/ueber-uns.html</loc><priority>0.8</priority></url>
  <url><loc>https://www.ave-businesshygiene.de/dienstleistungen.html</loc><priority>0.9</priority></url>
  <url><loc>https://www.ave-businesshygiene.de/qualitaetsmanagement.html</loc><priority>0.7</priority></url>
  <url><loc>https://www.ave-businesshygiene.de/jobs.html</loc><priority>0.8</priority></url>
  <url><loc>https://www.ave-businesshygiene.de/kontakt.html</loc><priority>0.8</priority></url>
</urlset>
```

- [ ] **Step 4: `tests/check_site.py` schreiben**

```python
#!/usr/bin/env python3
"""Statische Prüfung der AVE-Webseite: Seiten, Links, Titel, H1, Meta, JSON-LD.
Aufruf (aus Eigene-Website/): python3 tests/check_site.py  → Exit 0 = alles OK."""
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "ave-webseite"
PAGES = ["index.html", "ueber-uns.html", "dienstleistungen.html", "qualitaetsmanagement.html",
         "jobs.html", "kontakt.html", "impressum.html", "datenschutz.html", "danke.html", "404.html"]
NOINDEX = {"impressum.html", "datenschutz.html", "danke.html", "404.html"}
BASE = "https://www.ave-businesshygiene.de/"
TEL = "tel:+4961053039668"


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links, self.ids, self.jsonld = [], set(), []
        self.h1 = 0
        self.title = ""
        self.meta = {}
        self.canonical = None
        self.lang = None
        self._in_title = self._in_json = False
        self._buf = ""

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get("id"):
            self.ids.add(a["id"])
        if tag == "html":
            self.lang = a.get("lang")
        if tag == "h1":
            self.h1 += 1
        if tag == "title":
            self._in_title = True
        if tag == "meta" and a.get("name"):
            self.meta[a["name"]] = a.get("content", "")
        if tag == "link" and a.get("rel") == "canonical":
            self.canonical = a.get("href")
        if tag == "script" and a.get("type") == "application/ld+json":
            self._in_json, self._buf = True, ""
        for key in ("href", "src"):
            if a.get(key):
                self.links.append(a[key])

    def handle_endtag(self, tag):
        if tag == "title":
            self._in_title = False
        if tag == "script" and self._in_json:
            self._in_json = False
            self.jsonld.append(self._buf)

    def handle_data(self, data):
        if self._in_title:
            self.title += data
        if self._in_json:
            self._buf += data


def main():
    errors, warnings, parsed = [], [], {}
    only = [p for p in PAGES if (ROOT / p).exists()] if "--partial" in sys.argv else PAGES
    for name in only:
        path = ROOT / name
        if not path.exists():
            errors.append(f"{name}: Datei fehlt")
            continue
        text = path.read_text(encoding="utf-8")
        p = Page()
        p.feed(text)
        parsed[name] = (p, text)

    for name, (p, text) in parsed.items():
        if p.lang != "de":
            errors.append(f"{name}: <html lang=\"de\"> fehlt")
        if p.h1 != 1:
            errors.append(f"{name}: {p.h1} × <h1> (erwartet 1)")
        if not p.title.strip():
            errors.append(f"{name}: <title> leer")
        if not p.meta.get("description"):
            errors.append(f"{name}: meta description fehlt")
        if name in NOINDEX:
            if "noindex" not in p.meta.get("robots", ""):
                errors.append(f"{name}: meta robots noindex fehlt")
        else:
            want = BASE if name == "index.html" else BASE + name
            if p.canonical != want:
                errors.append(f"{name}: canonical {p.canonical!r} (erwartet {want!r})")
        if TEL not in text:
            errors.append(f"{name}: Telefon-Link {TEL} fehlt")
        for block in p.jsonld:
            try:
                json.loads(block)
            except json.JSONDecodeError as e:
                errors.append(f"{name}: JSON-LD ungültig ({e})")
        for link in p.links:
            if re.match(r"^(https?:|mailto:|tel:|data:|javascript:)", link):
                continue
            target, _, frag = link.partition("#")
            target = target.split("?")[0]
            if not target:
                if frag and frag not in p.ids:
                    errors.append(f"{name}: Anker #{frag} fehlt")
                continue
            file = (ROOT / target.lstrip("/")) if target.startswith("/") else (ROOT / name).parent / target
            if not file.exists():
                (warnings if "/fonts/" in str(file) else errors).append(f"{name}: Link-Ziel fehlt: {link}")
            elif frag and file.name in parsed and frag not in parsed[file.name][0].ids:
                errors.append(f"{name}: Anker {link} fehlt im Ziel")

    css = ROOT / "css" / "style.css"
    if css.exists():
        for url in re.findall(r"url\(\"?([^\")]+)\"?\)", css.read_text(encoding="utf-8")):
            if not url.startswith("data:") and not (css.parent / url).exists():
                warnings.append(f"style.css: url() fehlt: {url}")

    for w in warnings:
        print("WARNUNG:", w)
    for e in errors:
        print("FEHLER:", e)
    print(f"{len(parsed)} Seiten geprüft, {len(errors)} Fehler, {len(warnings)} Warnungen")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
```

- [ ] **Step 5: Test-Harness schreiben**

`tests/harness.js`:
```js
/* Mini-Testumgebung für die AVE-Webseite (läuft im Browser). */
var RESULTS = [];
var fixture = document.getElementById("fixture");

function html(markup) { fixture.innerHTML = markup; return fixture; }
function eq(actual, expected, msg) {
  if (actual !== expected) {
    throw new Error((msg ? msg + ": " : "") + "erwartet " + JSON.stringify(expected) + ", erhalten " + JSON.stringify(actual));
  }
}
function ok(value, msg) { if (!value) throw new Error(msg || "erwartet true"); }
function test(name, fn) {
  fixture.innerHTML = "";
  document.body.classList.remove("nav-open");
  try { fn(); RESULTS.push({ name: name, pass: true }); }
  catch (e) { RESULTS.push({ name: name, pass: false, err: e.message }); }
}
function report() {
  var list = document.getElementById("results"), failed = 0;
  RESULTS.forEach(function (r) {
    var li = document.createElement("li");
    li.className = r.pass ? "pass" : "fail";
    li.textContent = (r.pass ? "✔ " : "✘ ") + r.name + (r.pass ? "" : " – " + r.err);
    if (!r.pass) failed++;
    list.appendChild(li);
  });
  var summary = (failed ? "FEHLER: " + failed + " fehlgeschlagen" : "ALLE OK") + " – " + (RESULTS.length - failed) + "/" + RESULTS.length + " bestanden";
  document.getElementById("summary").textContent = summary;
  document.title = summary;
}
```

`tests/tests.html`:
```html
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<title>AVE Tests</title>
<style>body{font-family:system-ui,sans-serif;padding:20px}.pass{color:#137333}.fail{color:#b00020;font-weight:700}</style>
<script>window.AVE_NO_AUTOINIT = true;</script>
<script src="../ave-webseite/js/main.js"></script>
<script src="../ave-webseite/js/stellen.js"></script>
<script src="../ave-webseite/js/bewerbung.js"></script>
</head>
<body>
<h1>AVE Tests</h1>
<p id="summary">läuft …</p>
<ol id="results"></ol>
<div id="fixture" hidden></div>
<script src="harness.js"></script>
<script src="tests-main.js"></script>
<script src="tests-bewerbung.js"></script>
<script>report();</script>
</body>
</html>
```

- [ ] **Step 6: Werkzeuge prüfen**

Run: `python3 tests/check_site.py` (aus `Eigene-Website/`)
Expected: Exit 1, zehnmal „Datei fehlt“ (es gibt noch keine Seiten).
Testserver starten und `http://127.0.0.1:8766/tests/tests.html` öffnen. Expected: „ALLE OK – 0/0 bestanden“ (noch keine Tests; die fehlenden JS-Dateien sind harmlose 404).

---

### Task 2: Design-System (`style.css`) und Seitenrahmen

**Files:**
- Create: `ave-webseite/css/style.css`

**Interfaces:**
- Consumes: `fonts/*.woff2`, `img/logo.png` aus Task 1.
- Produces: **CSS-Klassenvertrag**, der von allen Seiten genutzt wird:
  `.container .dark .accent .kicker .goldline .lead .btn .btn-primary .btn-outline .btn-row .hero .hero-grid .page-head .ph .ph-bg .section .section-grey .section-head(.center) .grid .grid-2 .grid-3 .grid-4 .split .card .icon .card-link .value-letter .checklist .timeline(.year) .steps .chipnav .service .cta-band .site-header .header-inner .brand .main-nav(.is-open) .nav-phone .header-cta .nav-toggle .site-footer .footer-grid .footer-logo .footer-title .footer-nav .footer-bottom .hours .call-fab .form .form-row .field .field-group .choices .choices-inline .choice .consent .req .hp .hint .field-error .form-alert .form-note .wizard(.is-enhanced) .wizard-progress .progress-bar .step(.is-active) .step-title .wizard-nav .job .job-meta .job-empty .map .map-consent .contact-grid .contact-list .prose .todo .narrow .mt .skip-link .visually-hidden`, außerdem `body.nav-open`.
- Produces: **Seitenrahmen** (unten, Step 2). Alle Seiten-Tasks setzen die Platzhalter `{{…}}` ein.
- Produces: **CTA-Band** und **Icon-Bibliothek** (Step 3, Step 4).

- [ ] **Step 1: `css/style.css` schreiben**

```css
/* ==========================================================
   AVE Businesshygiene GmbH – Design-System
   Stil C „Anthrazit Modern“ · Handy zuerst
   ========================================================== */

@font-face {
  font-family: "Montserrat";
  src: url("../fonts/montserrat-latin-wght-normal.woff2") format("woff2");
  font-weight: 100 900; font-style: normal; font-display: swap;
}
@font-face {
  font-family: "Inter";
  src: url("../fonts/inter-latin-wght-normal.woff2") format("woff2");
  font-weight: 100 900; font-style: normal; font-display: swap;
}

:root {
  --anthrazit: #1C1F24;
  --anthrazit-2: #2A2E35;
  --gold: #C9A35A;
  --gold-hover: #D9B873;
  --gold-text: #8C6D2E;
  --gold-tint: #FBF7EE;
  --ink: #1D232B;
  --muted: #5B6570;
  --muted-dark: #B9BEC6;
  --line: #E3E5E8;
  --field: #C5CAD1;
  --white: #FFFFFF;
  --grey: #F6F7F8;
  --error: #B42318;
  --font-head: "Montserrat", "Arial Black", Arial, sans-serif;
  --font-body: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
  --container: 1180px;
  --gutter: 16px;
  --header-h: 68px;
  --slant: 32px;
}
@media (min-width: 768px) { :root { --gutter: 24px; } }

/* ---------- Basis ---------- */
*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }
html { scroll-behavior: smooth; scroll-padding-top: calc(var(--header-h) + 16px); -webkit-text-size-adjust: 100%; }
body { margin: 0; font-family: var(--font-body); font-size: 1rem; line-height: 1.6; color: var(--ink); background: var(--white); }
body.nav-open { overflow: hidden; }
img { max-width: 100%; height: auto; display: block; }
a { color: var(--gold-text); }
a:hover { color: var(--ink); }
:focus-visible { outline: 3px solid var(--gold); outline-offset: 2px; }
h1, h2, h3, h4 { font-family: var(--font-head); line-height: 1.15; margin: 0 0 .6em; }
h1, h2, h3 { text-transform: uppercase; letter-spacing: .01em; }
h1 { font-weight: 800; font-size: clamp(1.9rem, 6vw, 3.4rem); }
h2 { font-weight: 800; font-size: clamp(1.45rem, 4vw, 2.2rem); }
h3 { font-weight: 700; font-size: 1.1rem; }
p { margin: 0 0 1em; }
address { font-style: normal; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { transition: none !important; animation: none !important; }
}

.container { width: 100%; max-width: var(--container); margin: 0 auto; padding: 0 var(--gutter); }
.narrow { max-width: 820px; }
.mt { margin-top: 32px; }
.skip-link { position: absolute; left: -9999px; top: 0; z-index: 200; background: var(--gold); color: var(--anthrazit); padding: 10px 16px; font-weight: 700; }
.skip-link:focus { left: 8px; top: 8px; }
.visually-hidden { position: absolute !important; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

/* ---------- Dunkle Flächen & Akzente ---------- */
.dark { background: var(--anthrazit); color: var(--white); }
.accent { color: var(--gold-text); }
.dark .accent { color: var(--gold); }
.dark a:not(.btn) { color: var(--white); }
.dark a:not(.btn):hover { color: var(--gold); }
.kicker { font-family: var(--font-head); font-size: .75rem; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: var(--gold-text); margin: 0 0 .5em; }
.dark .kicker { color: var(--gold); }
.goldline { display: block; width: 48px; height: 3px; background: var(--gold); margin-bottom: 14px; }
.lead { font-size: 1.1rem; color: var(--muted); max-width: 60ch; }
.dark .lead { color: var(--muted-dark); }

/* ---------- Knöpfe ---------- */
.btn { display: inline-flex; align-items: center; justify-content: center; gap: .5em; min-height: 48px; padding: 12px 22px; font-family: var(--font-head); font-weight: 700; font-size: .85rem; letter-spacing: .06em; text-transform: uppercase; text-decoration: none; text-align: center; border: 2px solid transparent; border-radius: 0; cursor: pointer; transition: background .2s, color .2s, border-color .2s; }
.btn-primary { background: var(--gold); border-color: var(--gold); color: var(--anthrazit); }
.btn-primary:hover { background: var(--gold-hover); border-color: var(--gold-hover); color: var(--anthrazit); }
.btn-outline { background: transparent; border-color: var(--gold); color: var(--ink); }
.dark .btn-outline { color: var(--white); }
.btn-outline:hover, .dark .btn-outline:hover { background: var(--gold); color: var(--anthrazit); }
.btn-row { display: flex; flex-wrap: wrap; gap: 12px; }

/* ---------- Header ---------- */
.site-header { position: sticky; top: 0; z-index: 100; background: var(--anthrazit); border-bottom: 1px solid var(--anthrazit-2); }
.header-inner { display: flex; align-items: center; gap: 16px; min-height: var(--header-h); }
.brand img { height: 52px; width: auto; }
.main-nav ul { list-style: none; margin: 0; padding: 0; }
.main-nav a { color: var(--white); text-decoration: none; font-family: var(--font-head); font-weight: 600; font-size: .82rem; letter-spacing: .05em; text-transform: uppercase; }
.main-nav a:hover, .main-nav a[aria-current="page"] { color: var(--gold); }
.main-nav .nav-phone { color: var(--gold); font-weight: 700; text-transform: none; letter-spacing: .02em; white-space: nowrap; }
.header-cta { display: none; }
.nav-toggle { margin-left: auto; width: 48px; height: 48px; display: inline-flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; background: none; border: 0; cursor: pointer; }
.nav-toggle span { display: block; width: 24px; height: 2px; background: var(--white); transition: transform .2s, opacity .2s; }
.nav-toggle[aria-expanded="true"] span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.nav-toggle[aria-expanded="true"] span:nth-child(2) { opacity: 0; }
.nav-toggle[aria-expanded="true"] span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

@media (max-width: 1099px) {
  .main-nav { display: none; position: fixed; top: var(--header-h); right: 0; bottom: 0; left: 0; background: var(--anthrazit); padding: 16px var(--gutter) 40px; overflow-y: auto; }
  .main-nav.is-open { display: block; }
  .main-nav li { border-bottom: 1px solid var(--anthrazit-2); }
  .main-nav li a { display: block; padding: 16px 0; font-size: 1.05rem; }
  .main-nav .nav-phone { display: inline-block; margin-top: 24px; font-size: 1.15rem; }
}
@media (min-width: 1100px) {
  .nav-toggle { display: none; }
  .main-nav { margin-left: auto; display: flex; align-items: center; gap: 28px; }
  .main-nav ul { display: flex; gap: 22px; }
  .main-nav li a { display: block; padding: 8px 0; }
  .main-nav a[aria-current="page"] { box-shadow: inset 0 -3px 0 var(--gold); }
  .header-cta { display: inline-flex; }
}

/* ---------- Hero & Seitenkopf ---------- */
.hero, .page-head { position: relative; overflow: hidden; clip-path: polygon(0 0, 100% 0, 100% calc(100% - var(--slant)), 0 100%); }
.hero { padding: 48px 0 calc(56px + var(--slant)); }
.page-head { padding: 64px 0 calc(56px + var(--slant)); }
.hero .container, .page-head .container { position: relative; z-index: 1; }
.hero-grid { display: grid; gap: 32px; }
.hero h1 { max-width: 16ch; }
@media (min-width: 900px) {
  .hero { padding-top: 80px; }
  .hero-grid { grid-template-columns: 1.1fr .9fr; align-items: center; gap: 56px; }
  .page-head { padding-top: 96px; }
}

/* ---------- Foto-Platzhalter ---------- */
.ph { display: grid; place-items: center; width: 100%; aspect-ratio: 4 / 3; padding: 16px; text-align: center; font-size: .75rem; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); background: repeating-linear-gradient(45deg, #D9DDE2 0 12px, #E4E7EB 12px 24px); }
.dark .ph { color: var(--muted-dark); background: repeating-linear-gradient(45deg, #2A2E35 0 12px, #33383F 12px 24px); }
.ph-bg { position: absolute; inset: 0; aspect-ratio: auto; place-items: end; padding: 16px 16px calc(16px + var(--slant)); opacity: .6; }

/* ---------- Abschnitte & Raster ---------- */
.section { padding: 64px 0; }
.section-grey { background: var(--grey); }
@media (min-width: 1100px) { .section { padding: 96px 0; } }
.section-head { max-width: 720px; margin-bottom: 36px; }
.section-head.center { margin-left: auto; margin-right: auto; text-align: center; }
.section-head.center .goldline { margin-left: auto; margin-right: auto; }
.section-head.center .lead { margin-left: auto; margin-right: auto; }
.grid { display: grid; gap: 20px; }
@media (min-width: 768px) { .grid-2, .grid-3, .grid-4 { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1100px) { .grid-3 { grid-template-columns: repeat(3, 1fr); } .grid-4 { grid-template-columns: repeat(4, 1fr); } }
.split { display: grid; gap: 32px; align-items: center; }
@media (min-width: 900px) { .split { grid-template-columns: 1fr 1fr; gap: 56px; } .split-reverse > :first-child { order: 2; } }

/* ---------- Karten ---------- */
.card { background: var(--grey); border-left: 3px solid var(--gold); padding: 24px; }
.section-grey .card { background: var(--white); }
.card h3 { margin-bottom: .4em; }
.card p { color: var(--muted); margin: 0; }
.card p + p { margin-top: .8em; }
.icon { display: grid; place-items: center; width: 48px; height: 48px; margin-bottom: 16px; background: var(--anthrazit); color: var(--gold); }
.icon svg { width: 26px; height: 26px; }
.card-link { display: inline-block; margin-top: 14px; font-family: var(--font-head); font-weight: 700; font-size: .8rem; letter-spacing: .06em; text-transform: uppercase; color: var(--gold-text); text-decoration: none; }
.card-link:hover { color: var(--ink); }
.value-letter { display: block; margin-bottom: 8px; font-family: var(--font-head); font-weight: 800; font-size: 3rem; line-height: 1; color: var(--gold-text); }

/* ---------- Listen ---------- */
.checklist { list-style: none; padding: 0; margin: 0 0 1.2em; }
.checklist li { position: relative; padding-left: 30px; margin-bottom: .6em; }
.checklist li::before { content: ""; position: absolute; left: 2px; top: .35em; width: 14px; height: 8px; border-left: 3px solid var(--gold); border-bottom: 3px solid var(--gold); transform: rotate(-45deg); }
.timeline { list-style: none; margin: 0; padding: 0; border-left: 3px solid var(--gold); }
.timeline li { position: relative; padding: 0 0 28px 28px; }
.timeline li:last-child { padding-bottom: 0; }
.timeline li::before { content: ""; position: absolute; left: -10px; top: 4px; width: 17px; height: 17px; background: var(--anthrazit); border: 3px solid var(--gold); }
.timeline .year { display: block; font-family: var(--font-head); font-weight: 800; letter-spacing: .05em; color: var(--gold-text); }
.timeline h3 { margin: .2em 0 .3em; }
.timeline p { color: var(--muted); margin: 0; }
.steps { counter-reset: step; list-style: none; margin: 0; padding: 0; display: grid; gap: 20px; }
@media (min-width: 900px) { .steps { grid-template-columns: repeat(3, 1fr); } }
.steps li { counter-increment: step; background: var(--white); border-top: 3px solid var(--gold); padding: 24px; }
.steps li::before { content: counter(step, decimal-leading-zero); display: block; margin-bottom: 8px; font-family: var(--font-head); font-weight: 800; font-size: 2rem; color: var(--gold-text); }
.steps p { color: var(--muted); margin: 0; }

/* ---------- Dienstleistungen ---------- */
.chipnav { position: sticky; top: var(--header-h); z-index: 50; background: var(--white); border-bottom: 1px solid var(--line); }
.chipnav ul { display: flex; gap: 8px; overflow-x: auto; list-style: none; max-width: var(--container); margin: 0 auto; padding: 12px var(--gutter); scrollbar-width: none; }
.chipnav ul::-webkit-scrollbar { display: none; }
.chipnav a { display: inline-block; white-space: nowrap; padding: 8px 14px; border: 1.5px solid var(--line); font-size: .85rem; font-weight: 600; color: var(--ink); text-decoration: none; }
.chipnav a:hover { border-color: var(--gold); }
.service { display: grid; gap: 24px; padding: 40px 0; border-bottom: 1px solid var(--line); }
.service:last-child { border-bottom: 0; }
.service h2 { font-size: clamp(1.25rem, 3vw, 1.6rem); }
.service .icon { margin-bottom: 12px; }
@media (min-width: 900px) {
  .service { grid-template-columns: 1fr 1.2fr; gap: 48px; align-items: center; }
  .service:nth-child(even) > .ph { order: 2; }
}

/* ---------- CTA-Band ---------- */
.cta-band { border-top: 3px solid var(--gold); padding: 56px 0; }
.cta-band .container { display: flex; flex-direction: column; gap: 20px; }
.cta-band h2 { margin: 0; max-width: 22ch; }
@media (min-width: 900px) { .cta-band .container { flex-direction: row; align-items: center; justify-content: space-between; } }

/* ---------- Footer ---------- */
.site-footer { padding: 56px 0 96px; font-size: .95rem; }
@media (min-width: 768px) { .site-footer { padding-bottom: 32px; } }
.footer-grid { display: grid; gap: 32px; }
@media (min-width: 768px) { .footer-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1100px) { .footer-grid { grid-template-columns: 1.3fr 1fr 1fr 1fr; } }
.footer-logo { height: 90px; width: auto; margin-bottom: 14px; }
.site-footer p, .site-footer address { color: var(--muted-dark); }
.footer-title { font-size: .85rem; letter-spacing: .14em; color: var(--gold); margin-bottom: 12px; }
.footer-nav { list-style: none; padding: 0; margin: 0; }
.footer-nav li { margin-bottom: 6px; }
.site-footer a { text-decoration: none; }
.footer-bottom { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--anthrazit-2); font-size: .85rem; }
.footer-bottom p { margin: 0; }
.hours { display: grid; grid-template-columns: auto 1fr; gap: 4px 16px; margin: 0; }
.hours dt { font-weight: 600; }
.hours dd { margin: 0; }
.site-footer .hours { color: var(--muted-dark); }
.site-footer .hours dt { color: var(--white); }

/* ---------- Anruf-Knopf (Handy) ---------- */
.call-fab { position: fixed; right: 16px; bottom: 16px; z-index: 90; display: inline-flex; align-items: center; gap: 8px; min-height: 52px; padding: 0 20px; border-radius: 999px; background: var(--gold); color: var(--anthrazit); font-family: var(--font-head); font-weight: 700; text-decoration: none; box-shadow: 0 8px 24px rgba(0, 0, 0, .25); }
.call-fab:hover { color: var(--anthrazit); background: var(--gold-hover); }
body.nav-open .call-fab { display: none; }
@media (min-width: 768px) { .call-fab { display: none; } }

/* ---------- Formulare ---------- */
.form { display: grid; gap: 18px; }
.form-row { display: grid; gap: 18px; }
@media (min-width: 640px) { .form-row { grid-template-columns: 1fr 1fr; } }
.field label, .field-group > legend { display: block; margin-bottom: 6px; font-weight: 600; }
.req { color: var(--error); }
.field input:not([type="checkbox"]), .field select, .field textarea { width: 100%; min-height: 48px; padding: 12px 14px; font: inherit; color: var(--ink); background: var(--white); border: 1.5px solid var(--field); border-radius: 0; }
.field textarea { min-height: 140px; resize: vertical; }
.field input:focus, .field select:focus, .field textarea:focus { outline: none; border-color: var(--gold); box-shadow: 0 0 0 3px rgba(201, 163, 90, .35); }
.field [aria-invalid="true"] { border-color: var(--error); }
.field-error { margin: 6px 0 0; font-size: .875rem; font-weight: 500; color: var(--error); }
.hint { margin: 6px 0 0; font-size: .875rem; color: var(--muted); }
.field-group { border: 0; padding: 0; margin: 0; min-width: 0; }
.choices { display: grid; gap: 10px; }
@media (min-width: 640px) { .choices { grid-template-columns: 1fr 1fr; } }
.choices-inline { grid-template-columns: repeat(3, 1fr); }
.choice { display: flex; align-items: center; gap: 10px; min-height: 48px; padding: 10px 14px; background: var(--white); border: 1.5px solid var(--field); font-weight: 500; cursor: pointer; }
.choice input { flex: none; width: 20px; height: 20px; margin: 0; accent-color: var(--gold-text); }
.choice:has(input:checked) { border-color: var(--gold); background: var(--gold-tint); }
.field-group[aria-invalid="true"] .choice { border-color: var(--error); }
.consent { display: flex; align-items: flex-start; gap: 10px; font-weight: 400 !important; font-size: .95rem; }
.consent input { flex: none; width: 22px; height: 22px; margin: 2px 0 0; accent-color: var(--gold-text); }
.hp { position: absolute; left: -9999px; }
.form-alert { padding: 14px 16px; border-left: 4px solid var(--gold); background: var(--gold-tint); font-weight: 500; }
.form-note { font-size: .9rem; color: var(--muted); margin: 0; }

/* ---------- Bewerbungsassistent ---------- */
.wizard-progress { margin-bottom: 8px; }
.wizard-progress p { margin: 0 0 8px; font-family: var(--font-head); font-weight: 700; font-size: .8rem; letter-spacing: .08em; text-transform: uppercase; }
.progress-bar { height: 6px; background: var(--line); }
.progress-bar span { display: block; height: 100%; width: 16.66%; background: var(--gold); transition: width .3s; }
.step { border: 0; padding: 0; margin: 0 0 32px; min-width: 0; display: grid; gap: 18px; }
.step > legend { padding: 0; margin-bottom: 4px; }
.step-title { margin: 0; font-size: 1.25rem; }
.step-title:focus { outline: none; }
.wizard.is-enhanced .step { display: none; margin: 0; }
.wizard.is-enhanced .step.is-active { display: grid; }
.wizard:not(.is-enhanced) .wizard-progress, .wizard:not(.is-enhanced) [data-prev], .wizard:not(.is-enhanced) [data-next] { display: none; }
.wizard-nav { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 8px; }
.wizard-nav [data-next], .wizard-nav [type="submit"] { margin-left: auto; }

/* ---------- Jobs ---------- */
.job { display: grid; gap: 12px; align-content: start; background: var(--white); border-left: 3px solid var(--gold); padding: 24px; }
.job h3 { margin: 0; }
.job p { margin: 0; color: var(--muted); }
.job .btn { justify-self: start; }
.job-meta { display: flex; flex-wrap: wrap; gap: 8px; list-style: none; margin: 0; padding: 0; }
.job-meta li { padding: 4px 10px; background: var(--grey); border: 1px solid var(--line); font-size: .85rem; font-weight: 600; }
.job-empty { background: var(--white); border-left: 3px solid var(--gold); padding: 24px; margin: 0; }

/* ---------- Kontakt & Karte ---------- */
.contact-grid { display: grid; gap: 48px; }
@media (min-width: 1000px) { .contact-grid { grid-template-columns: 1.3fr 1fr; gap: 64px; } }
.contact-list { list-style: none; padding: 0; margin: 0 0 32px; display: grid; gap: 16px; }
.contact-list li { display: flex; gap: 14px; align-items: flex-start; }
.contact-list .icon { flex: none; width: 40px; height: 40px; margin: 0; }
.contact-list .icon svg { width: 20px; height: 20px; }
.contact-list strong { display: block; font-family: var(--font-head); font-size: .8rem; letter-spacing: .08em; text-transform: uppercase; }
.map { position: relative; aspect-ratio: 4 / 3; overflow: hidden; background: var(--anthrazit-2); }
@media (min-width: 900px) { .map { aspect-ratio: 16 / 9; } }
.map img, .map iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; object-fit: cover; }
.map-consent { position: absolute; left: 0; right: 0; bottom: 0; display: grid; gap: 12px; padding: 18px; background: rgba(28, 31, 36, .94); color: var(--white); }
.map-consent p { margin: 0; font-size: .9rem; color: var(--muted-dark); }
.map-consent a { color: var(--white); }

/* ---------- Rechtstexte ---------- */
.prose { max-width: 760px; }
.prose h2 { font-size: 1.2rem; margin-top: 1.8em; }
.prose h2:first-child { margin-top: 0; }
.todo { background: #FFF4D6; border: 1px dashed var(--gold-text); padding: 1px 6px; font-weight: 600; }
```

- [ ] **Step 2: Seitenrahmen festlegen** (Vorlage für alle Seiten, wird in Task 4–9 eingesetzt)

Platzhalter:
- `{{TITLE}}`, `{{DESC}}`: siehe jeweilige Seite
- `{{CANONICAL}}`: `https://www.ave-businesshygiene.de/` + Dateiname, bei index nur `https://www.ave-businesshygiene.de/`
- `{{ROBOTS}}`: bei indexierbaren Seiten leer. Bei noindex-Seiten statt der Canonical-Zeile `<meta name="robots" content="noindex, follow">`
- `{{P}}`: Pfad-Präfix, sonst leer, nur in `404.html` gleich `/`
- `{{AKTIV-…}}`: `aria-current="page"` beim Menülink der aktuellen Seite, sonst leer
- `{{EXTRA-HEAD}}`: seitenspezifisch (JSON-LD, zusätzliche Skripte), sonst leer
- `{{MAIN}}`: Seiteninhalt

```html
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{TITLE}}</title>
<meta name="description" content="{{DESC}}">
<link rel="canonical" href="{{CANONICAL}}">
<meta property="og:type" content="website">
<meta property="og:locale" content="de_DE">
<meta property="og:site_name" content="AVE Businesshygiene GmbH">
<meta property="og:title" content="{{TITLE}}">
<meta property="og:description" content="{{DESC}}">
<meta property="og:image" content="https://www.ave-businesshygiene.de/img/logo.png">
<meta name="theme-color" content="#1C1F24">
<link rel="icon" type="image/png" href="{{P}}img/favicon.png">
<link rel="preload" href="{{P}}fonts/montserrat-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{{P}}fonts/inter-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="{{P}}css/style.css">
<script src="{{P}}js/main.js" defer></script>
{{EXTRA-HEAD}}
</head>
<body>
<a class="skip-link" href="#inhalt">Zum Inhalt springen</a>

<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="{{P}}index.html" aria-label="AVE Businesshygiene – zur Startseite">
      <img src="{{P}}img/logo.png" alt="AVE Businesshygiene GmbH" width="241" height="208">
    </a>
    <nav class="main-nav" id="hauptmenue" aria-label="Hauptmenü">
      <ul>
        <li><a href="{{P}}index.html" {{AKTIV-HOME}}>Home</a></li>
        <li><a href="{{P}}ueber-uns.html" {{AKTIV-UEBER}}>Über uns</a></li>
        <li><a href="{{P}}dienstleistungen.html" {{AKTIV-DIENST}}>Dienstleistungen</a></li>
        <li><a href="{{P}}qualitaetsmanagement.html" {{AKTIV-QM}}>Qualitätsmanagement</a></li>
        <li><a href="{{P}}jobs.html" {{AKTIV-JOBS}}>Jobs</a></li>
        <li><a href="{{P}}kontakt.html" {{AKTIV-KONTAKT}}>Kontakt</a></li>
      </ul>
      <a class="nav-phone" href="tel:+4961053039668">06105 30 39 66 8</a>
    </nav>
    <a class="btn btn-primary header-cta" href="{{P}}kontakt.html">Kontakt</a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="hauptmenue" aria-label="Menü öffnen">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<main id="inhalt">
{{MAIN}}
</main>

<footer class="site-footer dark">
  <div class="container footer-grid">
    <div>
      <img class="footer-logo" src="{{P}}img/logo.png" alt="AVE Businesshygiene GmbH" width="241" height="208" loading="lazy">
      <p>Wir reinigen mit Leidenschaft und überzeugen mit Qualität!</p>
    </div>
    <div>
      <h2 class="footer-title">Kontakt</h2>
      <address>AVE Businesshygiene GmbH<br>Waldecker Straße 4<br>64546 Mörfelden-Walldorf</address>
      <p><a href="tel:+4961053039668">06105 30 39 66 8</a><br><a href="mailto:info@ave-businesshygiene.de">info@ave-businesshygiene.de</a></p>
    </div>
    <div>
      <h2 class="footer-title">Öffnungszeiten</h2>
      <dl class="hours">
        <dt>Mo – Do</dt><dd>8 – 18 Uhr</dd>
        <dt>Fr</dt><dd>8 – 16 Uhr</dd>
        <dt>Sa – So</dt><dd>nach Vereinbarung</dd>
      </dl>
    </div>
    <div>
      <h2 class="footer-title">Seiten</h2>
      <ul class="footer-nav">
        <li><a href="{{P}}ueber-uns.html">Über uns</a></li>
        <li><a href="{{P}}dienstleistungen.html">Dienstleistungen</a></li>
        <li><a href="{{P}}qualitaetsmanagement.html">Qualitätsmanagement</a></li>
        <li><a href="{{P}}jobs.html">Jobs</a></li>
        <li><a href="{{P}}kontakt.html">Kontakt</a></li>
      </ul>
    </div>
  </div>
  <div class="container footer-bottom">
    <p>© <span data-year>2026</span> AVE Businesshygiene GmbH</p>
    <p><a href="{{P}}impressum.html">Impressum</a> · <a href="{{P}}datenschutz.html">Datenschutz</a></p>
  </div>
</footer>

<a class="call-fab" href="tel:+4961053039668" aria-label="Jetzt anrufen: 06105 30 39 66 8">📞 Anrufen</a>
</body>
</html>
```
Unbenutzte `{{AKTIV-…}}` werden durch nichts ersetzt. In der fertigen Datei darf kein `{{` stehen.

- [ ] **Step 3: CTA-Band** (am Ende von Home, Über uns, Dienstleistungen, Qualitätsmanagement)

```html
<section class="cta-band dark">
  <div class="container">
    <h2>Bereit für Sauberkeit auf <span class="accent">höchstem Niveau</span>?</h2>
    <div class="btn-row">
      <a class="btn btn-primary" href="kontakt.html">Kontaktieren Sie uns jetzt</a>
      <a class="btn btn-outline" href="tel:+4961053039668">06105 30 39 66 8</a>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Icon-Bibliothek** (Inline-SVG; `ICON(name)` bedeutet in den folgenden Tasks: den Wrapper mit dem Inhalt einsetzen)

Wrapper: `<span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">INHALT</svg></span>`

| Name | INHALT |
|---|---|
| buero | `<rect x="4" y="3" width="16" height="18"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>` |
| glas | `<rect x="3" y="3" width="18" height="18"/><path d="M12 3v18M3 12h18M6.5 9.5l3-3M15 18l3-3"/>` |
| fassade | `<path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-5h6v5"/>` |
| hausmeister | `<path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3 17.8V21h3.2l6.3-6.3a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>` |
| sonder | `<path d="M12 3l1.8 4.7 4.7 1.8-4.7 1.8L12 16l-1.8-4.7-4.7-1.8 4.7-1.8zM19 15l.8 2.2 2.2.8-2.2.8L19 21l-.8-2.2-2.2-.8 2.2-.8z"/>` |
| edv | `<rect x="3" y="4" width="18" height="12"/><path d="M8 20h8M12 16v4"/>` |
| klinik | `<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>` |
| bau | `<path d="M4 17a8 8 0 0 1 16 0M2 17h20v3H2zM10 9V5h4v4"/>` |
| reinraum | `<path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3M7.5 15h9"/>` |
| solar | `<path d="M4 20l2-9h12l2 9zM5 15.5h14M10 11l-1 9M14 11l1 9M12 2v3M5.6 4.6L7 6M18.4 4.6L17 6"/>` |
| award | `<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/>` |
| leaf | `<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19l7-7"/>` |
| qr | `<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3"/>` |
| users | `<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>` |
| eye | `<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>` |
| search | `<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5"/>` |
| check | `<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>` |
| shield | `<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>` |
| heart | `<path d="M12 20s-7.5-4.5-7.5-10A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7.5 3c0 5.5-7.5 10-7.5 10z"/>` |
| handshake | `<path d="M3 11l4-4 5 2 5-2 4 4-7 7a2 2 0 0 1-3 0z"/><path d="M12 9l-3 3a1.5 1.5 0 0 0 2 2l2-2"/>` |
| clipboard | `<rect x="5" y="4" width="14" height="17"/><path d="M9 4V2h6v2M9 10h6M9 14h6M9 18h3"/>` |
| school | `<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5M22 9v6"/>` |
| chat | `<path d="M4 4h16v12H8l-4 4z"/><path d="M8 9h8M8 12h5"/>` |
| clock | `<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>` |
| calendar | `<rect x="3" y="5" width="18" height="16"/><path d="M3 10h18M8 3v4M16 3v4"/>` |
| pin | `<path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>` |
| phone | `<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2"/>` |
| mail | `<rect x="3" y="5" width="18" height="14"/><path d="M3 6l9 7 9-7"/>` |

- [ ] **Step 5: CSS prüfen**

Run: `python3 -c "import re,sys; s=open('ave-webseite/css/style.css').read(); print('Klammern OK' if s.count('{')==s.count('}') else 'FEHLER Klammern')"`
Expected: `Klammern OK`. Die Darstellung wird ab Task 4 an echten Seiten geprüft.

---

### Task 3: Grundfunktionen `main.js` (TDD)

**Files:**
- Create: `tests/tests-main.js`
- Create: `ave-webseite/js/main.js`

**Interfaces:**
- Consumes: Markup aus dem Seitenrahmen (`.nav-toggle`, `#hauptmenue`, `[data-year]`), Formulare mit `data-validate`, `.field`, `.field-group[data-required]`, `.form-alert`, `select[data-preselect]` mit `option[data-slug]`, `.map[data-map-src]` mit `[data-map-load]`.
- Produces (auf `window.AVE`):
  - `AVE.MSG` (Objekt mit Texten: `required, choice, consent, email, tel, pattern, fileSize, fileType, offline`)
  - `AVE.MAX_FILE_BYTES = 8388608`, `AVE.FILE_EXT = ["pdf","doc","docx","jpg","jpeg","png"]`
  - `AVE.checkFile(file | null) → string` ("" = ok)
  - `AVE.validateField(el) → string`
  - `AVE.validateGroup(fieldset) → string`
  - `AVE.setError(target, msg)`: `msg === ""` entfernt den Fehler
  - `AVE.validateContainer(container) → Element[]` (ungültige Felder oder Gruppen in DOM-Reihenfolge, Fehler werden angezeigt)
  - `AVE.focusFirst(Element[])`
  - `AVE.isOffline() → boolean` (`location.protocol === "file:"`)
  - `AVE.initForm(form)`: Beim Submit prüfen. Hat die Form `form.aveShowTarget(el)`, wird es vor dem Fokussieren aufgerufen.
  - `AVE.preselectService(select, search) → boolean`
  - `AVE.initNav()`, `AVE.initMap()`, `AVE.init()`
  - Automatischer Start, außer `window.AVE_NO_AUTOINIT === true`.

- [ ] **Step 1: Tests schreiben** – `tests/tests-main.js`

```js
/* Tests für js/main.js */

// --- checkFile ---
test("checkFile: keine Datei ist ok", function () { eq(AVE.checkFile(null), ""); });
test("checkFile: PDF in Großbuchstaben ok", function () { eq(AVE.checkFile({ name: "Lebenslauf.PDF", size: 1000 }), ""); });
test("checkFile: genau 8 MB ok", function () { eq(AVE.checkFile({ name: "cv.pdf", size: 8 * 1024 * 1024 }), ""); });
test("checkFile: über 8 MB abgelehnt", function () { eq(AVE.checkFile({ name: "cv.pdf", size: 8 * 1024 * 1024 + 1 }), AVE.MSG.fileSize); });
test("checkFile: falscher Typ abgelehnt", function () { eq(AVE.checkFile({ name: "programm.exe", size: 10 }), AVE.MSG.fileType); });
test("checkFile: ohne Endung abgelehnt", function () { eq(AVE.checkFile({ name: "lebenslauf", size: 10 }), AVE.MSG.fileType); });

// --- validateField ---
function field(markup) { html('<div class="field">' + markup + "</div>"); return fixture.querySelector("input,select,textarea"); }
test("validateField: Pflichtfeld leer", function () { eq(AVE.validateField(field('<input required>')), AVE.MSG.required); });
test("validateField: nur Leerzeichen gilt als leer", function () { var el = field('<input required>'); el.value = "   "; eq(AVE.validateField(el), AVE.MSG.required); });
test("validateField: optionales leeres Feld ok", function () { eq(AVE.validateField(field('<input type="email">')), ""); });
test("validateField: E-Mail ungültig", function () { var el = field('<input type="email" required>'); el.value = "max@firma"; eq(AVE.validateField(el), AVE.MSG.email); });
test("validateField: E-Mail gültig", function () { var el = field('<input type="email" required>'); el.value = "max@firma.de"; eq(AVE.validateField(el), ""); });
test("validateField: Telefon mit Leerzeichen ok", function () { var el = field('<input type="tel" required>'); el.value = "06105 30 39 66 8"; eq(AVE.validateField(el), ""); });
test("validateField: Telefon mit +49 und Klammern ok", function () { var el = field('<input type="tel">'); el.value = "+49 (6105) 30-39668"; eq(AVE.validateField(el), ""); });
test("validateField: Telefon mit Buchstaben", function () { var el = field('<input type="tel">'); el.value = "0610abc5"; eq(AVE.validateField(el), AVE.MSG.tel); });
test("validateField: Telefon zu kurz", function () { var el = field('<input type="tel">'); el.value = "123"; eq(AVE.validateField(el), AVE.MSG.tel); });
test("validateField: PLZ-Muster mit eigener Meldung", function () {
  var el = field('<input pattern="\\d{5}" data-msg="PLZ!" required>');
  el.value = "6454"; eq(AVE.validateField(el), "PLZ!");
  el.value = "64546"; eq(AVE.validateField(el), "");
});
test("validateField: Datenschutz-Häkchen", function () {
  var el = field('<input type="checkbox" required>');
  eq(AVE.validateField(el), AVE.MSG.consent);
  el.checked = true; eq(AVE.validateField(el), "");
});
test("validateField: Auswahl ohne Wert", function () { eq(AVE.validateField(field('<select required><option value="">Bitte wählen</option><option>A</option></select>')), AVE.MSG.required); });

// --- validateGroup ---
test("validateGroup: Pflichtgruppe ohne Auswahl", function () {
  html('<fieldset class="field-group" data-required><input type="radio" name="r" value="a"><input type="radio" name="r" value="b"></fieldset>');
  var g = fixture.querySelector("fieldset");
  eq(AVE.validateGroup(g), AVE.MSG.choice);
  g.querySelector("input").checked = true; eq(AVE.validateGroup(g), "");
});
test("validateGroup: optionale Gruppe ok", function () {
  html('<fieldset class="field-group"><input type="checkbox" name="c"></fieldset>');
  eq(AVE.validateGroup(fixture.querySelector("fieldset")), "");
});

// --- setError ---
test("setError: zeigt und entfernt Fehler, behält Hinweis-ID", function () {
  html('<div class="field"><input id="f1" aria-describedby="f1-hint"><p id="f1-hint">Hinweis</p></div>');
  var el = document.getElementById("f1");
  AVE.setError(el, "Falsch");
  var err = document.getElementById("f1-error");
  ok(err, "Fehlertext fehlt"); eq(err.textContent, "Falsch");
  eq(el.getAttribute("aria-invalid"), "true");
  eq(el.getAttribute("aria-describedby"), "f1-hint f1-error");
  AVE.setError(el, "Noch falsch");
  eq(fixture.querySelectorAll(".field-error").length, 1, "nur ein Fehlertext");
  AVE.setError(el, "");
  ok(!document.getElementById("f1-error"), "Fehlertext nicht entfernt");
  ok(!el.hasAttribute("aria-invalid"), "aria-invalid nicht entfernt");
  eq(el.getAttribute("aria-describedby"), "f1-hint");
});

// --- validateContainer ---
test("validateContainer: ungültige Elemente in DOM-Reihenfolge", function () {
  html('<div class="field"><input id="a" required></div>' +
       '<fieldset class="field-group" id="g" data-required><input type="radio" name="x"></fieldset>' +
       '<div class="field"><input id="b" required></div>');
  var inv = AVE.validateContainer(fixture);
  eq(inv.map(function (e) { return e.id; }).join(","), "a,g,b");
});
test("validateContainer: ignoriert Honeypot, hidden und Checkboxen in Gruppen", function () {
  html('<p class="hp"><input name="bot-field" required></p><input type="hidden" required>' +
       '<fieldset class="field-group"><label class="choice"><input type="checkbox" required></label></fieldset>');
  eq(AVE.validateContainer(fixture).length, 0);
});

// --- preselectService ---
var SEL = '<select data-preselect><option value="">Bitte wählen …</option><option value="Glas- &amp; Rahmenreinigung" data-slug="glas">Glas</option></select>';
test("preselectService: bekannte Leistung", function () {
  html(SEL); var s = fixture.querySelector("select");
  eq(AVE.preselectService(s, "?leistung=glas"), true); eq(s.value, "Glas- & Rahmenreinigung");
});
test("preselectService: unbekannte Leistung", function () {
  html(SEL); var s = fixture.querySelector("select");
  eq(AVE.preselectService(s, "?leistung=xyz"), false); eq(s.value, "");
});
test("preselectService: ohne Parameter", function () {
  html(SEL); var s = fixture.querySelector("select");
  eq(AVE.preselectService(s, ""), false); eq(s.value, "");
});

// --- initForm ---
function submit(form) { var ev = new Event("submit", { cancelable: true }); form.dispatchEvent(ev); return ev.defaultPrevented; }
var FORM = '<form data-validate><div class="field"><input id="n" name="n" required></div><div class="form-alert" hidden></div></form>';
test("initForm: blockiert ungültiges Absenden", function () {
  html(FORM); var f = fixture.querySelector("form"); AVE.initForm(f);
  eq(submit(f), true); eq(document.getElementById("n").getAttribute("aria-invalid"), "true");
  ok(f.hasAttribute("novalidate"), "novalidate fehlt");
});
test("initForm: Offline-Hinweis bei gültigem Formular", function () {
  var orig = AVE.isOffline; AVE.isOffline = function () { return true; };
  try {
    html(FORM); var f = fixture.querySelector("form"); AVE.initForm(f);
    document.getElementById("n").value = "Max";
    eq(submit(f), true);
    var alertBox = f.querySelector(".form-alert");
    eq(alertBox.hidden, false); eq(alertBox.textContent, AVE.MSG.offline);
  } finally { AVE.isOffline = orig; }
});
test("initForm: online und gültig wird nicht blockiert", function () {
  var orig = AVE.isOffline; AVE.isOffline = function () { return false; };
  try {
    html(FORM); var f = fixture.querySelector("form"); AVE.initForm(f);
    document.getElementById("n").value = "Max";
    eq(submit(f), false);
  } finally { AVE.isOffline = orig; }
});
test("initForm: Fehler verschwindet beim Tippen", function () {
  html(FORM); var f = fixture.querySelector("form"); AVE.initForm(f);
  submit(f); var el = document.getElementById("n");
  el.value = "Max"; el.dispatchEvent(new Event("input", { bubbles: true }));
  ok(!el.hasAttribute("aria-invalid"), "Fehler nicht entfernt");
});
test("initForm: ruft aveShowTarget vor dem Fokus auf", function () {
  html(FORM); var f = fixture.querySelector("form"); var shown = null;
  f.aveShowTarget = function (t) { shown = t; };
  AVE.initForm(f); submit(f);
  eq(shown && shown.id, "n");
});

// --- initNav ---
test("initNav: öffnen, Esc schließt, Link schließt", function () {
  html('<button class="nav-toggle" aria-expanded="false"></button><nav id="hauptmenue"><a href="#nav-test">X</a></nav>');
  AVE.initNav();
  var btn = fixture.querySelector(".nav-toggle"), nav = document.getElementById("hauptmenue");
  btn.click();
  ok(nav.classList.contains("is-open"), "nicht geöffnet"); ok(document.body.classList.contains("nav-open"), "body nicht gesperrt");
  eq(btn.getAttribute("aria-expanded"), "true"); eq(btn.getAttribute("aria-label"), "Menü schließen");
  document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  ok(!nav.classList.contains("is-open"), "Esc schließt nicht"); ok(!document.body.classList.contains("nav-open"), "body bleibt gesperrt");
  btn.click(); nav.querySelector("a").click();
  ok(!nav.classList.contains("is-open"), "Link schließt nicht");
  eq(btn.getAttribute("aria-expanded"), "false");
});

// --- initMap ---
test("initMap: lädt iframe erst nach Klick", function () {
  html('<div class="map" data-map-src="about:blank"><div class="map-consent"><button type="button" data-map-load>Karte laden</button></div></div>');
  AVE.initMap();
  eq(fixture.querySelectorAll("iframe").length, 0, "iframe vor Klick");
  fixture.querySelector("[data-map-load]").click();
  var fr = fixture.querySelector("iframe");
  ok(fr, "kein iframe nach Klick"); eq(fr.getAttribute("src"), "about:blank");
  ok(fr.title.indexOf("Google Maps") === 0, "iframe ohne Titel");
});
```

- [ ] **Step 2: Tests laufen lassen, sie müssen fehlschlagen**

`http://127.0.0.1:8766/tests/tests.html` neu laden und den Text lesen.
Expected: „FEHLER: 33 fehlgeschlagen – 0/33 bestanden“ (Meldungen wie „AVE is not defined“).

- [ ] **Step 3: `ave-webseite/js/main.js` schreiben**

```js
/* ==========================================================
   AVE Businesshygiene – Grundfunktionen
   Menü · Jahr · Karte · Formularprüfung · Leistung vorwählen
   ========================================================== */
(function () {
  "use strict";
  var AVE = window.AVE = window.AVE || {};

  var MSG = AVE.MSG = {
    required: "Bitte füllen Sie dieses Feld aus.",
    choice: "Bitte wählen Sie eine Option.",
    consent: "Bitte bestätigen Sie die Datenschutzerklärung.",
    email: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    tel: "Bitte geben Sie eine gültige Telefonnummer ein.",
    pattern: "Bitte überprüfen Sie Ihre Eingabe.",
    fileSize: "Die Datei ist größer als 8 MB. Bitte wählen Sie eine kleinere Datei.",
    fileType: "Bitte laden Sie eine PDF-, Word- oder Bilddatei hoch (PDF, DOC, DOCX, JPG, PNG).",
    offline: "Das Formular kann erst versendet werden, wenn die Webseite online ist. Rufen Sie uns gern an: 06105 30 39 66 8."
  };
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  AVE.MAX_FILE_BYTES = 8 * 1024 * 1024;
  AVE.FILE_EXT = ["pdf", "doc", "docx", "jpg", "jpeg", "png"];

  /* ---------- Prüfregeln ---------- */
  AVE.checkFile = function (file) {
    if (!file) return "";
    var parts = String(file.name || "").split(".");
    var ext = parts.length > 1 ? parts.pop().toLowerCase() : "";
    if (AVE.FILE_EXT.indexOf(ext) === -1) return MSG.fileType;
    if (file.size > AVE.MAX_FILE_BYTES) return MSG.fileSize;
    return "";
  };

  AVE.validateField = function (el) {
    if (el.type === "checkbox") return el.required && !el.checked ? (el.getAttribute("data-msg") || MSG.consent) : "";
    if (el.type === "file") return AVE.checkFile(el.files && el.files[0]);
    var v = String(el.value || "").trim();
    if (!v) return el.required ? (el.getAttribute("data-msg") || MSG.required) : "";
    if (el.type === "email" && !EMAIL_RE.test(v)) return MSG.email;
    if (el.type === "tel" && (/[^\d\s+()\/-]/.test(v) || v.replace(/\D/g, "").length < 6)) return MSG.tel;
    var pattern = el.getAttribute("pattern");
    if (pattern && !new RegExp("^(?:" + pattern + ")$").test(v)) return el.getAttribute("data-msg") || MSG.pattern;
    return "";
  };

  AVE.validateGroup = function (group) {
    if (!group.hasAttribute("data-required")) return "";
    return group.querySelector("input:checked") ? "" : (group.getAttribute("data-msg") || MSG.choice);
  };

  /* ---------- Fehleranzeige ---------- */
  var uid = 0;
  function describedBy(el, id, add) {
    var ids = (el.getAttribute("aria-describedby") || "").split(/\s+/).filter(function (x) { return x && x !== id; });
    if (add) ids.push(id);
    if (ids.length) el.setAttribute("aria-describedby", ids.join(" "));
    else el.removeAttribute("aria-describedby");
  }

  AVE.setError = function (target, msg) {
    if (!target.id) target.id = "ave-feld-" + (++uid);
    var errId = target.id + "-error";
    var err = document.getElementById(errId);
    if (msg) {
      if (!err) {
        err = document.createElement("p");
        err.className = "field-error";
        err.id = errId;
        var box = target.classList.contains("field-group") ? target : (target.closest(".field") || target.parentNode);
        box.appendChild(err);
      }
      err.textContent = msg;
      target.setAttribute("aria-invalid", "true");
      describedBy(target, errId, true);
    } else {
      if (err) err.parentNode.removeChild(err);
      target.removeAttribute("aria-invalid");
      describedBy(target, errId, false);
    }
  };

  AVE.validateContainer = function (container) {
    var invalid = [];
    container.querySelectorAll("input, select, textarea").forEach(function (el) {
      if (el.type === "hidden" || el.type === "radio" || el.disabled || el.closest(".hp")) return;
      if (el.type === "checkbox" && el.closest(".field-group")) return;
      var msg = AVE.validateField(el);
      AVE.setError(el, msg);
      if (msg) invalid.push(el);
    });
    container.querySelectorAll(".field-group").forEach(function (group) {
      var msg = AVE.validateGroup(group);
      AVE.setError(group, msg);
      if (msg) invalid.push(group);
    });
    return invalid.sort(function (a, b) {
      return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    });
  };

  AVE.focusFirst = function (invalid) {
    if (!invalid.length) return;
    var t = invalid[0];
    var el = t.classList.contains("field-group") ? t.querySelector("input") : t;
    if (el) el.focus();
  };

  /* ---------- Formulare ---------- */
  AVE.isOffline = function () { return window.location.protocol === "file:"; };

  AVE.initForm = function (form) {
    form.setAttribute("novalidate", "");

    function recheck(e) {
      var el = e.target;
      var group = el.closest(".field-group");
      if (group && group.hasAttribute("aria-invalid")) AVE.setError(group, AVE.validateGroup(group));
      else if (el.type === "file" || el.getAttribute("aria-invalid") === "true") AVE.setError(el, AVE.validateField(el));
    }
    form.addEventListener("input", recheck);
    form.addEventListener("change", recheck);

    form.addEventListener("submit", function (e) {
      var alertBox = form.querySelector(".form-alert");
      if (alertBox) alertBox.hidden = true;
      var invalid = AVE.validateContainer(form);
      if (invalid.length) {
        e.preventDefault();
        if (typeof form.aveShowTarget === "function") form.aveShowTarget(invalid[0]);
        AVE.focusFirst(invalid);
        return;
      }
      if (AVE.isOffline()) {
        e.preventDefault();
        if (alertBox) { alertBox.textContent = MSG.offline; alertBox.hidden = false; }
      }
    });
  };

  AVE.preselectService = function (select, search) {
    var match = /[?&]leistung=([^&]*)/.exec(search || "");
    if (!match) return false;
    var slug = decodeURIComponent(match[1]);
    for (var i = 0; i < select.options.length; i++) {
      if (select.options[i].getAttribute("data-slug") === slug) {
        select.selectedIndex = i;
        return true;
      }
    }
    return false;
  };

  /* ---------- Menü ---------- */
  AVE.initNav = function () {
    var btn = document.querySelector(".nav-toggle");
    var nav = document.getElementById("hauptmenue");
    if (!btn || !nav) return;
    function setOpen(open) {
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
    }
    btn.addEventListener("click", function () { setOpen(btn.getAttribute("aria-expanded") !== "true"); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); btn.focus(); }
    });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    if (window.matchMedia) {
      var mq = window.matchMedia("(min-width: 1100px)");
      var onChange = function (m) { if (m.matches) setOpen(false); };
      if (mq.addEventListener) mq.addEventListener("change", onChange); else if (mq.addListener) mq.addListener(onChange);
    }
  };

  /* ---------- Karte (lädt erst nach Klick) ---------- */
  AVE.initMap = function () {
    document.querySelectorAll("[data-map-load]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var box = btn.closest(".map");
        var frame = document.createElement("iframe");
        frame.setAttribute("src", box.getAttribute("data-map-src"));
        frame.title = "Google Maps: Standort der AVE Businesshygiene GmbH";
        frame.setAttribute("loading", "lazy");
        frame.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
        frame.setAttribute("allowfullscreen", "");
        box.innerHTML = "";
        box.appendChild(frame);
      });
    });
  };

  /* ---------- Start ---------- */
  AVE.init = function () {
    AVE.initNav();
    AVE.initMap();
    document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
    document.querySelectorAll("form[data-validate]").forEach(AVE.initForm);
    var select = document.querySelector("select[data-preselect]");
    if (select) AVE.preselectService(select, window.location.search);
  };

  if (!window.AVE_NO_AUTOINIT) AVE.init();
})();
```

- [ ] **Step 4: Tests laufen lassen, sie müssen bestehen**

`tests/tests.html` neu laden.
Expected: „ALLE OK – 33/33 bestanden“. Bei Fehlschlägen erst den Code korrigieren, nicht die Tests.

---

### Task 4: Startseite `index.html`

**Files:**
- Create: `ave-webseite/index.html`

**Interfaces:**
- Consumes: Seitenrahmen, CTA-Band, Icons, CSS-Klassen (Task 2), `main.js` (Task 3).
- Produces: Anker-Ziele auf `dienstleistungen.html#buero|#glas|#fassade` (werden in Task 6 angelegt).

- [ ] **Step 1: Rahmenwerte**

- TITLE: `Gebäudereinigung Frankfurt & Rhein-Main | AVE Businesshygiene GmbH` (im HTML `&amp;`)
- DESC: `Gebäudereinigung der Spitzenklasse: Büro-, Glas- und Fassadenreinigung vom Meisterbetrieb aus Mörfelden-Walldorf – für Frankfurt und das Rhein-Main-Gebiet.`
- CANONICAL: `https://www.ave-businesshygiene.de/`, P leer, AKTIV-HOME
- EXTRA-HEAD (JSON-LD, identisch in `kontakt.html`):

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "AVE Businesshygiene GmbH",
  "description": "Gebäudereinigung der Spitzenklasse in Frankfurt und im Rhein-Main-Gebiet.",
  "slogan": "Wir reinigen mit Leidenschaft und überzeugen mit Qualität!",
  "url": "https://www.ave-businesshygiene.de/",
  "logo": "https://www.ave-businesshygiene.de/img/logo.png",
  "image": "https://www.ave-businesshygiene.de/img/logo.png",
  "telephone": "+49 6105 3039668",
  "email": "info@ave-businesshygiene.de",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Waldecker Straße 4",
    "postalCode": "64546",
    "addressLocality": "Mörfelden-Walldorf",
    "addressRegion": "Hessen",
    "addressCountry": "DE"
  },
  "areaServed": ["Frankfurt am Main", "Rhein-Main-Gebiet"],
  "foundingDate": "2023",
  "founder": { "@type": "Person", "name": "André Pires", "jobTitle": "Meister im Glas- und Gebäudereiniger-Handwerk" },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"], "opens": "08:00", "closes": "18:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Friday", "opens": "08:00", "closes": "16:00" }
  ]
}
</script>
```

- [ ] **Step 2: MAIN**

```html
<section class="hero dark">
  <div class="container hero-grid">
    <div>
      <span class="goldline"></span>
      <p class="kicker">Gebäudereinigung · Frankfurt &amp; Rhein-Main</p>
      <h1>Gebäudereinigung der <span class="accent">Spitzenklasse</span></h1>
      <p class="lead">Wir reinigen mit Leidenschaft und überzeugen mit Qualität! Ihr Meisterbetrieb für Büro-, Glas- und Fassadenreinigung aus Mörfelden-Walldorf.</p>
      <div class="btn-row">
        <a class="btn btn-primary" href="kontakt.html">Kontaktieren Sie uns jetzt</a>
        <a class="btn btn-outline" href="dienstleistungen.html">Unsere Leistungen</a>
      </div>
    </div>
    <div class="ph" role="img" aria-label="Platzhalter: Foto Team bei der Arbeit">Foto: Team bei der Arbeit</div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head center">
      <span class="goldline"></span>
      <p class="kicker">Wofür wir stehen</p>
      <h2>Das steckt in <span class="accent">AVE</span></h2>
      <p class="lead">Drei Buchstaben, drei Versprechen – an unsere Kunden und an unser Team.</p>
    </div>
    <div class="grid grid-3">
      <article class="card"><span class="value-letter" aria-hidden="true">A</span><h3>Authentizität</h3><p>Wir sagen, was wir tun, und tun, was wir sagen. Ehrlich, transparent und auf Augenhöhe.</p></article>
      <article class="card"><span class="value-letter" aria-hidden="true">V</span><h3>Vertrauen</h3><p>Sie übergeben uns Ihre Räume – wir gehen verlässlich und diskret damit um. Jeden Tag.</p></article>
      <article class="card"><span class="value-letter" aria-hidden="true">E</span><h3>Engagement</h3><p>Wir reinigen mit Leidenschaft und geben uns erst zufrieden, wenn Sie es sind.</p></article>
    </div>
  </div>
</section>

<section class="section section-grey">
  <div class="container">
    <div class="section-head">
      <span class="goldline"></span>
      <p class="kicker">Unsere Top-Leistungen</p>
      <h2>Sauberkeit mit <span class="accent">Adlerblick</span></h2>
    </div>
    <div class="grid grid-3">
      <article class="card">
        ICON(buero)
        <h3>Büro- &amp; Unterhaltsreinigung</h3>
        <p>Glanzvolle Büros, strahlende Eindrücke: Wir sorgen dafür, dass Staub und Chaos draußen bleiben – vom Schreibtisch bis zum Boden.</p>
        <a class="card-link" href="dienstleistungen.html#buero">Mehr erfahren →</a>
      </article>
      <article class="card">
        ICON(glas)
        <h3>Glas- &amp; Rahmenreinigung</h3>
        <p>Strahlend saubere Fenster und Rahmen für klare Sicht – innen wie außen, streifenfrei vom Meisterbetrieb.</p>
        <a class="card-link" href="dienstleistungen.html#glas">Mehr erfahren →</a>
      </article>
      <article class="card">
        ICON(fassade)
        <h3>Fassadenreinigung</h3>
        <p>Mehr als Fassade: Unsere Reinigung verwandelt Grau in Wow! Und schützt Ihr Gebäude vor Umwelteinflüssen.</p>
        <a class="card-link" href="dienstleistungen.html#fassade">Mehr erfahren →</a>
      </article>
    </div>
    <p class="mt"><a class="btn btn-outline" href="dienstleistungen.html">Alle 10 Leistungen ansehen</a></p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <span class="goldline"></span>
      <p class="kicker">Warum AVE</p>
      <h2>Ihr Vorteil mit <span class="accent">uns</span></h2>
    </div>
    <div class="grid grid-4">
      <article class="card">ICON(award)<h3>Meisterbetrieb</h3><p>Geführt von einem Meister im Glas- und Gebäudereiniger-Handwerk – Fachwissen, das man sieht.</p></article>
      <article class="card">ICON(leaf)<h3>Umweltfreundlich</h3><p>Wir setzen ausschließlich umweltfreundliche Reinigungsmittel ein.</p></article>
      <article class="card">ICON(qr)<h3>QR-Ticketsystem</h3><p>Mängel per QR-Code melden – mit Foto, schnell bearbeitet, sauber dokumentiert.</p><a class="card-link" href="qualitaetsmanagement.html">So funktioniert’s →</a></article>
      <article class="card">ICON(users)<h3>Feste Ansprechpartner</h3><p>Individuelle Revierpläne und ein fester Ansprechpartner für Ihr Objekt.</p></article>
    </div>
  </div>
</section>

<section class="section section-grey">
  <div class="container split">
    <div class="ph" role="img" aria-label="Platzhalter: Foto André Pires, Gründer">Foto: André Pires, Gründer</div>
    <div>
      <span class="goldline"></span>
      <p class="kicker">Über uns</p>
      <h2>Gebäudereinigung mit <span class="accent">Adlerblick</span></h2>
      <p>Der Adler steht für Weitblick, scharfe Wahrnehmung und hervorragende Fähigkeiten – genau das bringen wir in jedes Objekt ein.</p>
      <p>2023 hat André Pires, Meister im Glas- und Gebäudereiniger-Handwerk, die AVE Businesshygiene GmbH gegründet – mit langjähriger Erfahrung vom Flughafen bis zur Meisterprüfung.</p>
      <a class="btn btn-outline" href="ueber-uns.html">Mehr über uns</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container split split-reverse">
    <div class="ph" role="img" aria-label="Platzhalter: Foto Glasreinigung im Einsatz">Foto: Glasreinigung im Einsatz</div>
    <div>
      <span class="goldline"></span>
      <p class="kicker">Karriere</p>
      <h2>Quereinsteiger <span class="accent">willkommen</span></h2>
      <p>Teilzeit oder Vollzeit, Früh-, Tag- oder Abendschicht: Bei uns finden Sie einen Job, der zu Ihrem Leben passt. Wir arbeiten Sie sorgfältig ein.</p>
      <a class="btn btn-primary" href="jobs.html">Zu den Jobs</a>
    </div>
  </div>
</section>

CTA-BAND
```
(`ICON(name)` und `CTA-BAND` durch die Snippets aus Task 2 ersetzen.)

- [ ] **Step 3: Prüfen**

Run: `python3 tests/check_site.py --partial`
Expected: `1 Seiten geprüft`. Fehler nur für Link-Ziele, die erst später entstehen (`ueber-uns.html`, `dienstleistungen.html`, …), keine Fehler zu Titel, H1, Canonical, JSON-LD oder Telefon.
Im Browser `http://127.0.0.1:8766/ave-webseite/index.html` auf Handy-Breite (375 px) und in 1280 px ansehen: kein waagerechtes Scrollen, das Menü öffnet und schließt, der Anruf-Knopf ist nur auf dem Handy sichtbar. `read_console_messages` meldet keine Fehler.

---

### Task 5: `ueber-uns.html` und `qualitaetsmanagement.html`

**Files:**
- Create: `ave-webseite/ueber-uns.html`, `ave-webseite/qualitaetsmanagement.html`

**Interfaces:**
- Consumes: Seitenrahmen, CTA-Band, Icons (Task 2).

- [ ] **Step 1: `ueber-uns.html`**

Rahmen: TITLE `Über uns – Gebäudereinigung mit Adlerblick | AVE Businesshygiene`, DESC `Lernen Sie die AVE Businesshygiene GmbH kennen: Meisterbetrieb, gegründet 2023 von André Pires – mit klaren Werten, Nachhaltigkeit und langfristigen Partnerschaften.`, CANONICAL `…/ueber-uns.html`, AKTIV-UEBER, EXTRA-HEAD leer.

MAIN:
```html
<section class="page-head dark">
  <div class="ph ph-bg" role="img" aria-label="Platzhalter: Foto Team vor einem Gebäude">Foto: Team vor einem Gebäude</div>
  <div class="container">
    <span class="goldline"></span>
    <p class="kicker">Über uns</p>
    <h1>Gebäudereinigung mit <span class="accent">Adlerblick</span></h1>
    <p class="lead">Die AVE Businesshygiene GmbH steht für erstklassige und zuverlässige Reinigungslösungen – mit Leidenschaft, Erfahrung und einem scharfen Blick fürs Detail.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <span class="goldline"></span>
      <p class="kicker">Unser Symbol</p>
      <h2>Warum der <span class="accent">Adler</span>?</h2>
      <p class="lead">Der Adler ist unser Wappentier – und unser Anspruch. Er steht für drei Eigenschaften, die gute Gebäudereinigung ausmachen.</p>
    </div>
    <div class="grid grid-3">
      <article class="card">ICON(eye)<h3>Weitblick</h3><p>Wir denken voraus, planen Reinigungen vorausschauend und erkennen, was Ihr Objekt morgen braucht.</p></article>
      <article class="card">ICON(search)<h3>Scharfe Wahrnehmung</h3><p>Kein Staubkorn entgeht uns. Wir sehen Details, die andere übersehen.</p></article>
      <article class="card">ICON(award)<h3>Hervorragende Fähigkeiten</h3><p>Meisterliches Handwerk, geschultes Personal und die richtige Technik für jede Oberfläche.</p></article>
    </div>
  </div>
</section>

<section class="section section-grey">
  <div class="container split">
    <div class="ph" role="img" aria-label="Platzhalter: Foto André Pires">Foto: André Pires</div>
    <div>
      <span class="goldline"></span>
      <p class="kicker">Unsere Geschichte</p>
      <h2>Vom Flughafen zum <span class="accent">eigenen Betrieb</span></h2>
      <p>Hinter AVE steht der Werdegang von André Pires – ein Weg, der zeigt, was Engagement bewirken kann.</p>
      <ol class="timeline">
        <li><span class="year">2001</span><h3>Ankunft in Deutschland</h3><p>André Pires kommt als Gastarbeiter nach Deutschland – mit Tatkraft und dem Willen, etwas aufzubauen.</p></li>
        <li><span class="year">Rund 15 Jahre</span><h3>Am Flughafen</h3><p>Er arbeitet sich bis zum Vorarbeiter hoch und lernt Gebäudereinigung dort, wo höchste Standards gelten.</p></li>
        <li><span class="year">Bereichsleitung</span><h3>Verantwortung übernehmen</h3><p>Als Bereichsleiter verantwortet er Teams, Objekte und Qualität.</p></li>
        <li><span class="year">Meisterbrief</span><h3>Meister im Handwerk</h3><p>Er wird Meister im Glas- und Gebäudereiniger-Handwerk.</p></li>
        <li><span class="year">2023</span><h3>Gründung der AVE</h3><p>André Pires gründet die AVE Businesshygiene GmbH – mit dem Anspruch, Gebäudereinigung der Spitzenklasse zu liefern.</p></li>
      </ol>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head center">
      <span class="goldline"></span>
      <p class="kicker">Unsere Werte</p>
      <h2>Authentizität · Vertrauen · <span class="accent">Engagement</span></h2>
    </div>
    <div class="grid grid-3">
      <article class="card">ICON(check)<h3>Authentizität</h3><p>Ehrliche Beratung, klare Absprachen, transparente Angebote. Bei uns wissen Sie immer, woran Sie sind.</p></article>
      <article class="card">ICON(shield)<h3>Vertrauen</h3><p>Verlässlichkeit ist die Grundlage jeder Zusammenarbeit. Wir gehen sorgsam mit Ihren Räumen und Werten um.</p></article>
      <article class="card">ICON(heart)<h3>Engagement</h3><p>Wir lieben, was wir tun – und das sieht man. Unser Team gibt jeden Tag sein Bestes für Ihr Objekt.</p></article>
    </div>
  </div>
</section>

<section class="section section-grey">
  <div class="container">
    <div class="section-head">
      <span class="goldline"></span>
      <p class="kicker">Verantwortung</p>
      <h2>Nachhaltig und <span class="accent">partnerschaftlich</span></h2>
    </div>
    <div class="grid grid-2">
      <article class="card">ICON(leaf)<h3>Nachhaltig sauber</h3><p>Wir setzen ausschließlich umweltfreundliche Reinigungsmittel ein und achten auf einen sparsamen Umgang mit Wasser, Energie und Material. Saubere Räume und eine saubere Umwelt gehören für uns zusammen.</p></article>
      <article class="card">ICON(handshake)<h3>Partnerschaft auf Dauer</h3><p>Wir setzen auf langfristige Kundenbeziehungen statt schneller Aufträge. Ob Büro, Einkaufszentrum oder medizinische Einrichtung: Wir lernen Ihr Objekt kennen und entwickeln die Reinigung gemeinsam mit Ihnen weiter.</p></article>
    </div>
  </div>
</section>

CTA-BAND
```

- [ ] **Step 2: `qualitaetsmanagement.html`**

Rahmen: TITLE `Qualitätsmanagement mit QR-Ticketsystem | AVE Businesshygiene`, DESC `So sichern wir Qualität: digitales QR-Ticketsystem, individuelle Revierpläne, regelmäßige Schulungen und Kundenfeedback.`, CANONICAL `…/qualitaetsmanagement.html`, AKTIV-QM.

MAIN:
```html
<section class="page-head dark">
  <div class="ph ph-bg" role="img" aria-label="Platzhalter: Foto Qualitätskontrolle">Foto: Qualitätskontrolle</div>
  <div class="container">
    <span class="goldline"></span>
    <p class="kicker">Qualitätsmanagement</p>
    <h1>Qualität, die man <span class="accent">sieht</span></h1>
    <p class="lead">Saubere Ergebnisse sind kein Zufall. Mit klaren Prozessen, digitalen Werkzeugen und einem geschulten Team sichern wir gleichbleibend hohe Qualität – in jedem Objekt.</p>
  </div>
</section>

<section class="section">
  <div class="container split">
    <div>
      <span class="goldline"></span>
      <p class="kicker">Unsere Philosophie</p>
      <h2>Gemeinsam <span class="accent">glänzen</span></h2>
      <p>Unser Erfolg beruht auf drei Säulen: Authentizität, Vertrauen und Engagement. Wenn Kunden, Mitarbeiter und Unternehmen ineinandergreifen, entsteht, was uns ausmacht: ehrliche, zuverlässige und leidenschaftliche Dienstleistung.</p>
      <p>Zufriedene Kunden, motivierte Mitarbeiter und ein gesundes Unternehmen – das ist für uns die Grundlage für langfristige Partnerschaften und nachhaltiges Wachstum.</p>
    </div>
    <div class="ph" role="img" aria-label="Platzhalter: Foto Team-Besprechung">Foto: Team-Besprechung</div>
  </div>
</section>

<section class="section section-grey">
  <div class="container">
    <div class="section-head">
      <span class="goldline"></span>
      <p class="kicker">Ticketsystem</p>
      <h2>Mängel melden per <span class="accent">QR-Code</span></h2>
      <p class="lead">In jedem betreuten Objekt hängen QR-Codes. Ein Scan genügt – Ihr Anliegen landet direkt bei uns und wird schnell bearbeitet.</p>
    </div>
    <ol class="steps">
      <li><h3>QR-Code scannen</h3><p>Scannen Sie den QR-Code im Objekt mit der Kamera Ihres Smartphones.</p></li>
      <li><h3>Mangel melden</h3><p>Beschreiben Sie kurz, was Ihnen aufgefallen ist, und fügen Sie ein Foto hinzu.</p></li>
      <li><h3>Schnell erledigt</h3><p>Wir erfassen Ihre Meldung digital, beheben den Mangel zügig und dokumentieren die Erledigung.</p></li>
    </ol>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <span class="goldline"></span>
      <p class="kicker">Unsere Werkzeuge</p>
      <h2>Maßgeschneiderte <span class="accent">Reinigungslösungen</span></h2>
    </div>
    <div class="grid grid-3">
      <article class="card">ICON(clipboard)<h3>Revierpläne &amp; Leistungsverzeichnisse</h3><p>Für jedes Objekt erstellen wir individuell abgestimmte Leistungsverzeichnisse und Revierpläne. So weiß jede Reinigungskraft genau, was wann zu tun ist.</p></article>
      <article class="card">ICON(school)<h3>Schulungen</h3><p>Regelmäßige Schulungen halten unser Team auf dem neuesten Stand – bei Reinigungstechnik, Hygiene und Arbeitssicherheit.</p></article>
      <article class="card">ICON(chat)<h3>Kundenfeedback</h3><p>Wir fragen regelmäßig nach Ihrer Zufriedenheit. Ihr Feedback und die Ideen unserer Mitarbeiter fließen direkt in die Verbesserung unserer Abläufe ein.</p></article>
    </div>
  </div>
</section>

<section class="section section-grey">
  <div class="container split split-reverse">
    <div class="ph" role="img" aria-label="Platzhalter: Foto umweltfreundliche Reinigungsmittel">Foto: umweltfreundliche Reinigungsmittel</div>
    <div>
      <span class="goldline"></span>
      <p class="kicker">Nachhaltigkeit</p>
      <h2>Umwelt- und <span class="accent">Qualitätsmanagement</span></h2>
      <p>Effizienz und ökologische Verantwortung gehören für uns zusammen. Unser integriertes Umwelt- und Qualitätsmanagement verbindet wirtschaftliche Abläufe mit umweltfreundlichen Reinigungsmitteln und einem schonenden Umgang mit Ressourcen.</p>
      <ul class="checklist">
        <li>Ausschließlich umweltfreundliche Reinigungsmittel</li>
        <li>Sparsamer Einsatz von Wasser und Energie</li>
        <li>Kontinuierliche Verbesserung durch Feedback</li>
      </ul>
    </div>
  </div>
</section>

CTA-BAND
```

- [ ] **Step 3: Prüfen**

Run: `python3 tests/check_site.py --partial`. Expected: 3 Seiten geprüft. Fehler nur für noch fehlende Link-Ziele.
Beide Seiten auf 375 px und 1280 px ansehen: Die schräge Kante des Seitenkopfs ist sichtbar, die Zeitleiste lesbar, die Karten brechen sauber um.

---

### Task 6: `dienstleistungen.html`

**Files:**
- Create: `ave-webseite/dienstleistungen.html`

**Interfaces:**
- Produces: Anker `#buero #glas #fassade #hausmeister #sonder #edv #klinik #bau #reinraum #solar`. Links `kontakt.html?leistung=<slug>` (von Task 7 per `data-slug` aufgelöst).

- [ ] **Step 1: Rahmen**

TITLE `Dienstleistungen: Büro-, Glas- &amp; Fassadenreinigung | AVE Businesshygiene`, DESC `10 Leistungen aus einer Hand: Unterhaltsreinigung, Glas- und Fassadenreinigung, Hausmeisterservice, Sonder-, EDV-, Klinik-, Bau-, Reinraum- und Solaranlagenreinigung.`, CANONICAL `…/dienstleistungen.html`, AKTIV-DIENST.

- [ ] **Step 2: MAIN**

```html
<section class="page-head dark">
  <div class="ph ph-bg" role="img" aria-label="Platzhalter: Foto Reinigung im Büro">Foto: Reinigung im Büro</div>
  <div class="container">
    <span class="goldline"></span>
    <p class="kicker">Dienstleistungen</p>
    <h1>Unsere <span class="accent">Leistungen</span></h1>
    <p class="lead">Von der täglichen Unterhaltsreinigung bis zur Solaranlage: zehn Leistungen aus einer Hand – geplant, ausgeführt und kontrolliert vom Meisterbetrieb.</p>
  </div>
</section>

<nav class="chipnav" aria-label="Leistungen">
  <ul>
    <li><a href="#buero">Büro &amp; Unterhalt</a></li>
    <li><a href="#glas">Glas &amp; Rahmen</a></li>
    <li><a href="#fassade">Fassade</a></li>
    <li><a href="#hausmeister">Hausmeister &amp; Grün</a></li>
    <li><a href="#sonder">Sonderreinigung</a></li>
    <li><a href="#edv">EDV</a></li>
    <li><a href="#klinik">Kliniken &amp; Praxen</a></li>
    <li><a href="#bau">Bau &amp; Endreinigung</a></li>
    <li><a href="#reinraum">Reinraum &amp; Labor</a></li>
    <li><a href="#solar">Solaranlagen</a></li>
  </ul>
</nav>

<section class="section">
  <div class="container">
    <!-- SERVICE-Blöcke 1–10 -->
  </div>
</section>

CTA-BAND
```

Jeder SERVICE-Block hat genau diese Form (id, Foto-Text, Icon, Titel, Text, slug aus der Tabelle):
```html
<article class="service" id="{id}">
  <div class="ph" role="img" aria-label="Platzhalter: Foto {Foto}">Foto: {Foto}</div>
  <div>
    ICON({icon})
    <h2>{Titel}</h2>
    <p>{Text}</p>
    <a class="btn btn-primary" href="kontakt.html?leistung={id}">Angebot anfragen</a>
  </div>
</article>
```

| id | icon | Foto | Titel (HTML) | Text |
|---|---|---|---|---|
| buero | buero | Büroreinigung | `Büro- &amp; Unterhaltsreinigung` | Glanzvolle Büros, strahlende Eindrücke. Unsere Büro- und Unterhaltsreinigung sorgt dafür, dass Staub und Chaos draußen bleiben – von Schreibtischen und Küchen bis zu Sanitärräumen und Böden. Nach festem Revierplan, zu Ihren Wunschzeiten und mit festem Team. |
| glas | glas | Fensterreinigung | `Glas- &amp; Rahmenreinigung` | Klare Sicht auf ganzer Linie: Wir reinigen Fenster, Rahmen, Glasfassaden und Wintergärten streifenfrei – innen wie außen. Als Meisterbetrieb im Glasreiniger-Handwerk wissen wir, welche Technik jede Glasfläche braucht. |
| fassade | fassade | Fassadenreinigung | `Fassadenreinigung` | Mehr als Fassade: Unsere Reinigung verwandelt Grau in Wow! Wir entfernen hartnäckige Verschmutzungen wie Algen, Ruß und Witterungsspuren schonend und schützen Ihre Fassade so vor weiteren Umwelteinflüssen. |
| hausmeister | hausmeister | Grünflächenpflege | `Hausmeisterservice &amp; Grünflächenpflege` | Rundum gepflegt – drinnen und draußen. Unser Hausmeisterservice kümmert sich um Ihr Gebäude, von kleinen Reparaturen bis zur Kontrolle von Türen und Technik. Draußen übernehmen wir Rasenpflege, Heckenschnitt und die Pflege Ihrer Grünflächen. |
| sonder | sonder | Teppichreinigung | `Sonderreinigung &amp; Spezialverfahren` | Für alles, was besondere Sorgfalt braucht: Polstermöbel, Teppiche, Jalousien und verschiedenste Bodenbeläge. Wir reinigen gründlich, entfernen alte Beschichtungen und tragen neue Schutzbeschichtungen auf. |
| edv | edv | EDV-Reinigung | `EDV-Reinigung` | Saubere Technologie arbeitet nicht nur besser, sondern sieht auch noch besser aus. Wir reinigen Tastaturen, Bildschirme, Telefone und Geräte fachgerecht und hygienisch – schonend für Ihre Technik. |
| klinik | klinik | Arztpraxis | `Kliniken, Arztpraxen &amp; Betreuungseinrichtungen` | Wo Menschen gesund werden, zählt Hygiene doppelt. Wir reinigen Kliniken, Arztpraxen und Betreuungseinrichtungen nach klar definierten Hygieneplänen – gründlich, diskret und mit Rücksicht auf Patienten und Personal. |
| bau | bau | Bauendreinigung | `Bau-, Zwischen- &amp; Endreinigung` | Vom Rohbau zur Schlüsselübergabe: Wir entfernen Baustaub, Farbspritzer und Rückstände, damit Ihr Objekt pünktlich zur Übergabe präsentabel ist – auch als Zwischenreinigung während der Bauphase. |
| reinraum | reinraum | Labor | `Reinraum- &amp; Laborreinigung` | In sensiblen Umgebungen kommt es auf Präzision an. Unser geschultes Personal reinigt Reinräume und Labore nach Ihren Vorgaben und Protokollen – sorgfältig, dokumentiert und mit geeigneten Materialien. |
| solar | solar | Solaranlage | `Solaranlagenreinigung` | Saubere Module, bessere Leistung: Staub, Pollen und Vogelkot mindern den Ertrag Ihrer Photovoltaikanlage. Wir reinigen Ihre Module schonend und helfen so, die Effizienz Ihrer Anlage zu erhalten. |

- [ ] **Step 3: Prüfen**

Run: `python3 tests/check_site.py --partial`. Expected: keine Anker-Fehler mehr für `dienstleistungen.html#buero|#glas|#fassade` aus `index.html`.
Im Browser: Die Sprungleiste lässt sich auf dem Handy waagerecht wischen und bleibt unter dem Header kleben. Ein Klick auf „EDV“ springt zum Abschnitt, und die Überschrift ist nicht vom Header verdeckt.

---

### Task 7: `kontakt.html` mit Formular und Karte

**Files:**
- Create: `ave-webseite/kontakt.html`, `ave-webseite/img/karte-vorschau.svg`

**Interfaces:**
- Consumes: `AVE.initForm` (über `data-validate`), `AVE.preselectService` (über `select[data-preselect]` und `option[data-slug]`), `AVE.initMap` (über `.map[data-map-src]` und `[data-map-load]`), Slugs aus Task 6.

- [ ] **Step 1: `img/karte-vorschau.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <rect width="1200" height="675" fill="#2A2E35"/>
  <g fill="none" stroke="#3A3F47" stroke-width="18" stroke-linecap="round">
    <path d="M-20 140 L1220 90"/><path d="M-20 520 L1220 600"/><path d="M300 -20 L380 700"/>
    <path d="M840 -20 L780 700"/><path d="M-20 300 C300 270 520 350 1220 300"/>
  </g>
  <g fill="none" stroke="#33383F" stroke-width="8">
    <path d="M120 -20 L180 700"/><path d="M1030 -20 L1070 700"/><path d="M-20 650 L1220 30"/>
  </g>
  <g transform="translate(600 170)">
    <path d="M0 70 C-12 48 -52 14 -52 -24 A52 52 0 0 1 52 -24 C52 14 12 48 0 70Z" fill="#C9A35A"/>
    <circle cy="-24" r="18" fill="#1C1F24"/>
  </g>
  <text x="600" y="300" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="32" font-weight="700" text-anchor="middle">AVE Businesshygiene GmbH</text>
  <text x="600" y="342" fill="#B9BEC6" font-family="Arial, sans-serif" font-size="24" text-anchor="middle">Waldecker Straße 4 · 64546 Mörfelden-Walldorf</text>
</svg>
```

- [ ] **Step 2: Rahmen**

TITLE `Kontakt – Angebot anfragen | AVE Businesshygiene GmbH`, DESC `Kontaktieren Sie die AVE Businesshygiene GmbH: Waldecker Straße 4, 64546 Mörfelden-Walldorf · Tel. 06105 30 39 66 8 · info@ave-businesshygiene.de`, CANONICAL `…/kontakt.html`, AKTIV-KONTAKT, EXTRA-HEAD: derselbe JSON-LD-Block wie in Task 4.

- [ ] **Step 3: MAIN**

```html
<section class="page-head dark">
  <div class="ph ph-bg" role="img" aria-label="Platzhalter: Foto Büro und Empfang">Foto: Büro und Empfang</div>
  <div class="container">
    <span class="goldline"></span>
    <p class="kicker">Kontakt</p>
    <h1>Wir sind für Sie <span class="accent">da</span></h1>
    <p class="lead">Sie wünschen ein Angebot oder haben eine Frage? Schreiben Sie uns oder rufen Sie an – wir melden uns schnellstmöglich.</p>
  </div>
</section>

<section class="section">
  <div class="container contact-grid">
    <div>
      <span class="goldline"></span>
      <h2>Anfrage <span class="accent">senden</span></h2>
      <form class="form" name="kontakt" method="POST" action="/danke.html" data-netlify="true" netlify-honeypot="bot-field" data-validate>
        <input type="hidden" name="form-name" value="kontakt">
        <p class="hp"><label>Bitte nicht ausfüllen: <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>

        <fieldset class="field-group" data-required>
          <legend>Anrede <span class="req">*</span></legend>
          <div class="choices choices-inline">
            <label class="choice"><input type="radio" name="anrede" value="Herr"> Herr</label>
            <label class="choice"><input type="radio" name="anrede" value="Frau"> Frau</label>
            <label class="choice"><input type="radio" name="anrede" value="Divers"> Divers</label>
          </div>
        </fieldset>

        <div class="form-row">
          <div class="field"><label for="k-vorname">Vorname</label><input id="k-vorname" name="vorname" autocomplete="given-name"></div>
          <div class="field"><label for="k-nachname">Nachname <span class="req">*</span></label><input id="k-nachname" name="nachname" autocomplete="family-name" required></div>
        </div>
        <div class="field"><label for="k-firma">Firma</label><input id="k-firma" name="firma" autocomplete="organization"></div>
        <div class="form-row">
          <div class="field"><label for="k-telefon">Telefon</label><input id="k-telefon" name="telefon" type="tel" autocomplete="tel"></div>
          <div class="field"><label for="k-email">E-Mail <span class="req">*</span></label><input id="k-email" name="email" type="email" autocomplete="email" required></div>
        </div>
        <div class="field">
          <label for="k-leistung">Gewünschte Leistung <span class="req">*</span></label>
          <select id="k-leistung" name="leistung" required data-preselect>
            <option value="">Bitte wählen …</option>
            <option value="Büro- &amp; Unterhaltsreinigung" data-slug="buero">Büro- &amp; Unterhaltsreinigung</option>
            <option value="Glas- &amp; Rahmenreinigung" data-slug="glas">Glas- &amp; Rahmenreinigung</option>
            <option value="Fassadenreinigung" data-slug="fassade">Fassadenreinigung</option>
            <option value="Hausmeisterservice &amp; Grünflächenpflege" data-slug="hausmeister">Hausmeisterservice &amp; Grünflächenpflege</option>
            <option value="Sonderreinigung &amp; Spezialverfahren" data-slug="sonder">Sonderreinigung &amp; Spezialverfahren</option>
            <option value="EDV-Reinigung" data-slug="edv">EDV-Reinigung</option>
            <option value="Kliniken, Arztpraxen &amp; Betreuungseinrichtungen" data-slug="klinik">Kliniken, Arztpraxen &amp; Betreuungseinrichtungen</option>
            <option value="Bau-, Zwischen- &amp; Endreinigung" data-slug="bau">Bau-, Zwischen- &amp; Endreinigung</option>
            <option value="Reinraum- &amp; Laborreinigung" data-slug="reinraum">Reinraum- &amp; Laborreinigung</option>
            <option value="Solaranlagenreinigung" data-slug="solar">Solaranlagenreinigung</option>
            <option value="Sonstiges" data-slug="sonstiges">Sonstiges</option>
          </select>
        </div>
        <div class="field"><label for="k-nachricht">Ihre Nachricht <span class="req">*</span></label><textarea id="k-nachricht" name="nachricht" required></textarea></div>
        <div class="field">
          <label class="consent"><input id="k-datenschutz" type="checkbox" name="datenschutz" value="akzeptiert" required> <span>Ich habe die <a href="datenschutz.html" target="_blank" rel="noopener">Datenschutzerklärung</a> gelesen und bin mit der Verarbeitung meiner Angaben zur Bearbeitung meiner Anfrage einverstanden. <span class="req">*</span></span></label>
        </div>
        <div class="form-alert" role="alert" hidden></div>
        <div><button type="submit" class="btn btn-primary">Anfrage absenden</button></div>
        <p class="form-note"><span class="req">*</span> Pflichtfelder</p>
      </form>
    </div>

    <aside>
      <span class="goldline"></span>
      <h2>So erreichen Sie <span class="accent">uns</span></h2>
      <ul class="contact-list">
        <li>ICON(pin)<div><strong>Adresse</strong><address>AVE Businesshygiene GmbH<br>Waldecker Straße 4<br>64546 Mörfelden-Walldorf</address></div></li>
        <li>ICON(phone)<div><strong>Telefon</strong><a href="tel:+4961053039668">06105 30 39 66 8</a></div></li>
        <li>ICON(mail)<div><strong>E-Mail</strong><a href="mailto:info@ave-businesshygiene.de">info@ave-businesshygiene.de</a></div></li>
      </ul>
      <h3>Öffnungszeiten</h3>
      <dl class="hours">
        <dt>Mo – Do</dt><dd>8:00 – 18:00 Uhr</dd>
        <dt>Fr</dt><dd>8:00 – 16:00 Uhr</dd>
        <dt>Sa – So</dt><dd>geschlossen – Termine nach Vereinbarung</dd>
      </dl>
    </aside>
  </div>
</section>

<section class="section section-grey">
  <div class="container">
    <div class="section-head">
      <span class="goldline"></span>
      <p class="kicker">Anfahrt</p>
      <h2>So finden Sie <span class="accent">uns</span></h2>
    </div>
    <div class="map" data-map-src="https://www.google.com/maps?q=Waldecker+Stra%C3%9Fe+4,+64546+M%C3%B6rfelden-Walldorf&amp;output=embed">
      <img src="img/karte-vorschau.svg" alt="Kartenvorschau: Waldecker Straße 4, 64546 Mörfelden-Walldorf" width="1200" height="675">
      <div class="map-consent">
        <p>Mit dem Laden der Karte werden Daten an Google übertragen. Mehr dazu in unserer <a href="datenschutz.html#google-maps">Datenschutzerklärung</a>.</p>
        <div><button type="button" class="btn btn-primary" data-map-load>Karte laden</button></div>
      </div>
    </div>
    <p class="mt"><a class="btn btn-outline" href="https://www.google.com/maps/dir/?api=1&amp;destination=Waldecker+Stra%C3%9Fe+4,+64546+M%C3%B6rfelden-Walldorf" target="_blank" rel="noopener">Route planen</a></p>
  </div>
</section>
```

- [ ] **Step 4: Prüfen**

Run: `python3 tests/check_site.py --partial`. Expected: Kein Fehler für `kontakt.html`, außer dem noch fehlenden `datenschutz.html` und dem Anker `#google-maps`.
Im Browser (über den Testserver, also `http:`):
1. `kontakt.html?leistung=glas` öffnen → Auswahl steht auf „Glas- & Rahmenreinigung“.
2. Leer absenden → Fehler bei Anrede, Nachname, E-Mail, Leistung, Nachricht und Datenschutz. Der Fokus liegt auf der ersten Anrede-Option.
3. E-Mail „max@firma“ → Hinweis zur E-Mail.
4. `read_network_requests` mit Filter `google` → keine Anfrage. Dann „Karte laden“ klicken → iframe erscheint, Anfrage an google.com vorhanden.

---

### Task 8: Jobs – `stellen.js`, `bewerbung.js`, `jobs.html` (TDD)

**Files:**
- Create: `tests/tests-bewerbung.js`
- Create: `ave-webseite/js/stellen.js`, `ave-webseite/js/bewerbung.js`, `ave-webseite/jobs.html`

**Interfaces:**
- Consumes: `AVE.validateContainer`, `AVE.focusFirst`, `AVE.initForm` (Task 3). Das Formular wird von `main.js` über `data-validate` initialisiert. `bewerbung.js` setzt `form.aveShowTarget`.
- Produces:
  - `window.STELLEN: Array<{titel: string, orte: string[], umfang: string, schichten: string, text: string}>`
  - `AVE.INITIATIV = "Initiativbewerbung"`
  - `AVE.renderStellen(list, container) → number` (Anzahl Karten)
  - `AVE.fillStellenSelect(select, list)`
  - `AVE.initWizard(form) → { go(i), next() → boolean, current() → number, count: number }`
  - `AVE.initBewerbung()`, automatischer Start, außer `AVE_NO_AUTOINIT`.

- [ ] **Step 1: Tests schreiben** – `tests/tests-bewerbung.js`

```js
/* Tests für js/stellen.js und js/bewerbung.js */

test("STELLEN: Glasreiniger/in vorhanden", function () {
  ok(Array.isArray(window.STELLEN), "STELLEN fehlt");
  eq(STELLEN[0].titel, "Glasreiniger/in");
  eq(STELLEN[0].orte.join(","), "Frankfurt,Flughafen,Rhein-Main");
});

test("renderStellen: eine Karte mit Metadaten und Bewerben-Link", function () {
  html('<div id="liste"></div>'); var box = document.getElementById("liste");
  eq(AVE.renderStellen(STELLEN, box), 1);
  var job = box.querySelector(".job");
  eq(job.querySelector("h3").textContent, "Glasreiniger/in");
  ok(job.querySelector(".job-meta").textContent.indexOf("Frankfurt · Flughafen · Rhein-Main") > -1, "Orte fehlen");
  var a = job.querySelector("a[data-stelle]");
  eq(a.getAttribute("href"), "#bewerbung"); eq(a.getAttribute("data-stelle"), "Glasreiniger/in");
});
test("renderStellen: leere Liste zeigt Hinweis", function () {
  html('<div id="liste"><noscript>x</noscript></div>'); var box = document.getElementById("liste");
  eq(AVE.renderStellen([], box), 0);
  var p = box.querySelector(".job-empty");
  ok(p && p.textContent.indexOf("Initiativbewerbung") > -1, "Hinweis fehlt");
});
test("renderStellen: Text wird nicht als HTML interpretiert", function () {
  html('<div id="liste"></div>'); var box = document.getElementById("liste");
  AVE.renderStellen([{ titel: "<b>X</b>", orte: [], umfang: "", schichten: "", text: "" }], box);
  eq(box.querySelectorAll("b").length, 0);
  eq(box.querySelector("h3").textContent, "<b>X</b>");
});

test("fillStellenSelect: Stellen plus Initiativbewerbung", function () {
  html('<select id="s"><option value="">alt</option></select>'); var s = document.getElementById("s");
  AVE.fillStellenSelect(s, STELLEN);
  var vals = Array.prototype.map.call(s.options, function (o) { return o.value; });
  eq(vals.join("|"), "|Glasreiniger/in|Initiativbewerbung");
});
test("fillStellenSelect: leere Liste", function () {
  html('<select id="s"></select>'); var s = document.getElementById("s");
  AVE.fillStellenSelect(s, []);
  var vals = Array.prototype.map.call(s.options, function (o) { return o.value; });
  eq(vals.join("|"), "|Initiativbewerbung");
});

var WIZ = '<form class="wizard"><div class="wizard-progress"><p data-step-label></p><div class="progress-bar"><span></span></div></div>' +
  '<fieldset class="step"><legend><h3 class="step-title" tabindex="-1">1</h3></legend><div class="field"><input id="w1" required></div></fieldset>' +
  '<fieldset class="step"><legend><h3 class="step-title" tabindex="-1">2</h3></legend><div class="field"><input id="w2"></div></fieldset>' +
  '<fieldset class="step"><legend><h3 class="step-title" tabindex="-1">3</h3></legend><div class="field"><input id="w3" required></div></fieldset>' +
  '<div class="wizard-nav"><button type="button" data-prev>Zurück</button><button type="button" data-next>Weiter</button><button type="submit">Senden</button></div></form>';
function wiz() { html(WIZ); var f = fixture.querySelector("form"); return { form: f, w: AVE.initWizard(f) }; }
function active(f) { return Array.prototype.indexOf.call(f.querySelectorAll(".step"), f.querySelector(".step.is-active")); }

test("initWizard: Startzustand", function () {
  var t = wiz(), f = t.form;
  ok(f.classList.contains("is-enhanced"), "is-enhanced fehlt");
  eq(t.w.count, 3); eq(t.w.current(), 0); eq(active(f), 0);
  eq(f.querySelector("[data-step-label]").textContent, "Schritt 1 von 3");
  eq(Math.round(parseFloat(f.querySelector(".progress-bar span").style.width)), 33);
  eq(f.querySelector("[data-prev]").hidden, true);
  eq(f.querySelector("[data-next]").hidden, false);
  eq(f.querySelector("[type=submit]").hidden, true);
});
test("initWizard: Weiter blockiert bei leerem Pflichtfeld", function () {
  var t = wiz();
  t.form.querySelector("[data-next]").click();
  eq(t.w.current(), 0);
  eq(document.getElementById("w1").getAttribute("aria-invalid"), "true");
});
test("initWizard: Weiter, Zurück und letzter Schritt", function () {
  var t = wiz(), f = t.form;
  document.getElementById("w1").value = "ok";
  f.querySelector("[data-next]").click(); eq(t.w.current(), 1);
  eq(f.querySelector("[data-prev]").hidden, false);
  f.querySelector("[data-prev]").click(); eq(t.w.current(), 0);
  t.w.go(2);
  eq(active(f), 2);
  eq(f.querySelector("[data-next]").hidden, true);
  eq(f.querySelector("[type=submit]").hidden, false);
  eq(f.querySelector("[data-step-label]").textContent, "Schritt 3 von 3");
});
test("initWizard: Enter prüft und wechselt nur bei gültigem Schritt", function () {
  var t = wiz(), input = document.getElementById("w1");
  var ev = new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true });
  input.dispatchEvent(ev);
  eq(ev.defaultPrevented, true, "Enter nicht abgefangen"); eq(t.w.current(), 0);
  input.value = "ok";
  input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }));
  eq(t.w.current(), 1);
});
test("initWizard: Enter im letzten Schritt wird nicht abgefangen", function () {
  var t = wiz(); t.w.go(2);
  var ev = new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true });
  document.getElementById("w3").dispatchEvent(ev);
  eq(ev.defaultPrevented, false);
});
test("initWizard: aveShowTarget springt zum Schritt des Fehlers", function () {
  var t = wiz();
  t.form.aveShowTarget(document.getElementById("w3"));
  eq(t.w.current(), 2);
});
```

- [ ] **Step 2: Tests laufen lassen, sie müssen fehlschlagen**

`tests/tests.html` neu laden. Expected: Die 33 main-Tests bestehen, die 12 neuen schlagen fehl („STELLEN fehlt“, „AVE.renderStellen is not a function“ …): „FEHLER: 12 fehlgeschlagen – 33/45 bestanden“.

- [ ] **Step 3: `ave-webseite/js/stellen.js` schreiben**

```js
/*
  ==========================================================
  OFFENE STELLEN – diese Datei können Sie selbst ändern
  ==========================================================
  So geht's:
  • Jede Stelle steht zwischen { und }. Zwischen zwei Stellen steht ein Komma.
  • Texte immer in "Anführungszeichen" schreiben.
  • Neue Stelle: einen ganzen Block von { bis } kopieren, ein Komma
    dazwischensetzen und die Texte anpassen.
  • Stelle entfernen: den ganzen Block von { bis } löschen (und das Komma davor).
  • Keine offenen Stellen? Dann nur:  var STELLEN = [];
    (Auf der Seite erscheint dann ein Hinweis auf Initiativbewerbungen.)
  Die Stellen erscheinen automatisch auf der Jobs-Seite und im Bewerbungsformular.
*/
var STELLEN = [
  {
    titel: "Glasreiniger/in",
    orte: ["Frankfurt", "Flughafen", "Rhein-Main"],
    umfang: "Teilzeit oder Vollzeit",
    schichten: "nach Absprache",
    text: "Sie sorgen für klare Sicht: Fenster, Rahmen und Glasflächen bei unseren Kunden in Frankfurt, am Flughafen und im Rhein-Main-Gebiet. Quereinsteiger arbeiten wir sorgfältig ein."
  }
];
```

- [ ] **Step 4: `ave-webseite/js/bewerbung.js` schreiben**

```js
/* ==========================================================
   AVE Businesshygiene – Jobs: Stellenkarten & Bewerbungsassistent
   Benötigt: main.js (AVE), stellen.js (STELLEN)
   ========================================================== */
(function () {
  "use strict";
  var AVE = window.AVE = window.AVE || {};
  AVE.INITIATIV = "Initiativbewerbung";

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text) node.textContent = text;
    return node;
  }

  AVE.renderStellen = function (list, container) {
    container.innerHTML = "";
    if (!list || !list.length) {
      container.appendChild(el("p", "job-empty", "Aktuell sind keine Stellen ausgeschrieben. Initiativbewerbungen sind jederzeit willkommen – einfach unten das Formular ausfüllen!"));
      return 0;
    }
    list.forEach(function (s) {
      var job = el("article", "job");
      job.appendChild(el("h3", "", s.titel));
      var meta = el("ul", "job-meta");
      [(s.orte || []).join(" · "), s.umfang, s.schichten ? "Schichten: " + s.schichten : ""].forEach(function (t) {
        if (t) meta.appendChild(el("li", "", t));
      });
      job.appendChild(meta);
      if (s.text) job.appendChild(el("p", "", s.text));
      var link = el("a", "btn btn-primary", "Jetzt bewerben");
      link.setAttribute("href", "#bewerbung");
      link.setAttribute("data-stelle", s.titel);
      job.appendChild(link);
      container.appendChild(job);
    });
    return list.length;
  };

  AVE.fillStellenSelect = function (select, list) {
    var keep = select.value;
    select.innerHTML = "";
    select.add(new Option("Bitte wählen …", ""));
    (list || []).forEach(function (s) { select.add(new Option(s.titel, s.titel)); });
    select.add(new Option(AVE.INITIATIV, AVE.INITIATIV));
    if (keep) select.value = keep;
  };

  AVE.initWizard = function (form) {
    var steps = Array.prototype.slice.call(form.querySelectorAll(".step"));
    var bar = form.querySelector(".progress-bar span");
    var label = form.querySelector("[data-step-label]");
    var prev = form.querySelector("[data-prev]");
    var next = form.querySelector("[data-next]");
    var submit = form.querySelector("[type=submit]");
    var current = 0;

    function show(i, focus) {
      current = Math.max(0, Math.min(i, steps.length - 1));
      steps.forEach(function (s, n) { s.classList.toggle("is-active", n === current); });
      if (bar) bar.style.width = ((current + 1) / steps.length * 100) + "%";
      if (label) label.textContent = "Schritt " + (current + 1) + " von " + steps.length;
      prev.hidden = current === 0;
      next.hidden = current === steps.length - 1;
      submit.hidden = current !== steps.length - 1;
      if (focus) {
        var title = steps[current].querySelector(".step-title");
        if (title) title.focus();
      }
    }

    function goNext() {
      var invalid = AVE.validateContainer(steps[current]);
      if (invalid.length) { AVE.focusFirst(invalid); return false; }
      show(current + 1, true);
      return true;
    }

    form.classList.add("is-enhanced");
    next.addEventListener("click", goNext);
    prev.addEventListener("click", function () { show(current - 1, true); });
    form.addEventListener("keydown", function (e) {
      var t = e.target;
      if (e.key !== "Enter" || current === steps.length - 1) return;
      if (t.tagName === "TEXTAREA" || t.tagName === "BUTTON" || t.tagName === "A") return;
      e.preventDefault();
      goNext();
    });
    form.aveShowTarget = function (target) {
      var i = steps.indexOf(target.closest(".step"));
      if (i > -1 && i !== current) show(i, false);
    };

    show(0, false);
    return {
      go: function (i) { show(i, false); },
      next: goNext,
      current: function () { return current; },
      count: steps.length
    };
  };

  AVE.initBewerbung = function () {
    var list = window.STELLEN || [];
    var box = document.getElementById("stellen-liste");
    if (box) AVE.renderStellen(list, box);
    var form = document.getElementById("bewerbung-form");
    if (!form) return;
    var select = form.querySelector("#b-stelle");
    if (select) AVE.fillStellenSelect(select, list);
    if (box && select) {
      box.addEventListener("click", function (e) {
        var a = e.target.closest("[data-stelle]");
        if (a) select.value = a.getAttribute("data-stelle");
      });
    }
    AVE.wizard = AVE.initWizard(form);
  };

  if (!window.AVE_NO_AUTOINIT) AVE.initBewerbung();
})();
```

- [ ] **Step 5: Tests laufen lassen, sie müssen bestehen**

`tests/tests.html` neu laden. Expected: „ALLE OK – 45/45 bestanden“.

- [ ] **Step 6: `jobs.html` – Rahmen**

TITLE `Jobs in der Gebäudereinigung – Frankfurt &amp; Rhein-Main | AVE Businesshygiene`, DESC `Jetzt bewerben: Glasreiniger/in in Teilzeit oder Vollzeit in Frankfurt, am Flughafen und im Rhein-Main-Gebiet. Quereinsteiger willkommen!`, CANONICAL `…/jobs.html`, AKTIV-JOBS, EXTRA-HEAD:
```html
<script src="js/stellen.js" defer></script>
<script src="js/bewerbung.js" defer></script>
```

- [ ] **Step 7: `jobs.html` – MAIN**

```html
<section class="page-head dark">
  <div class="ph ph-bg" role="img" aria-label="Platzhalter: Foto Team in Arbeitskleidung">Foto: Team in Arbeitskleidung</div>
  <div class="container">
    <span class="goldline"></span>
    <p class="kicker">Jobs</p>
    <h1>Karriere mit <span class="accent">Adlerblick</span></h1>
    <p class="lead">Karriere in der Gebäudereinigung gesucht? Hier sind unsere aktuellen Stellenangebote – Quereinsteiger sind herzlich willkommen!</p>
    <a class="btn btn-primary" href="#bewerbung">Jetzt bewerben</a>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <span class="goldline"></span>
      <p class="kicker">Ihre Vorteile</p>
      <h2>Darum <span class="accent">AVE</span></h2>
    </div>
    <div class="grid grid-3">
      <article class="card">ICON(clock)<h3>Teilzeit &amp; Vollzeit</h3><p>Ob wenige Stunden oder Vollzeit: Wir finden das Modell, das zu Ihnen passt.</p></article>
      <article class="card">ICON(calendar)<h3>Schichten nach Wahl</h3><p>Früh-, Tag- oder Abendschicht – sagen Sie uns, wann Sie arbeiten möchten.</p></article>
      <article class="card">ICON(users)<h3>Quereinsteiger willkommen</h3><p>Keine Erfahrung? Kein Problem. Was zählt, sind Zuverlässigkeit und Motivation.</p></article>
      <article class="card">ICON(school)<h3>Einarbeitung &amp; Schulungen</h3><p>Wir arbeiten Sie sorgfältig ein und schulen Sie regelmäßig weiter.</p></article>
      <article class="card">ICON(check)<h3>Pünktliche Bezahlung</h3><p>Ihr Lohn kommt pünktlich – darauf können Sie sich verlassen.</p></article>
      <article class="card">ICON(award)<h3>Meisterbetrieb</h3><p>Lernen Sie von einem Meister im Glas- und Gebäudereiniger-Handwerk.</p></article>
    </div>
  </div>
</section>

<section class="section section-grey">
  <div class="container">
    <div class="section-head">
      <span class="goldline"></span>
      <p class="kicker">Offene Stellen</p>
      <h2>Aktuelle <span class="accent">Stellenangebote</span></h2>
    </div>
    <div id="stellen-liste" class="grid grid-2">
      <noscript><p class="job-empty">Unsere aktuellen Stellen werden mit JavaScript angezeigt. Rufen Sie uns gern an: <a href="tel:+4961053039668">06105 30 39 66 8</a></p></noscript>
    </div>
  </div>
</section>

<section class="section" id="bewerbung">
  <div class="container narrow">
    <div class="section-head">
      <span class="goldline"></span>
      <p class="kicker">Bewerbung</p>
      <h2>In 6 Schritten <span class="accent">bewerben</span></h2>
      <p class="lead">Dauert nur wenige Minuten. Felder mit <span class="req">*</span> sind Pflichtfelder.</p>
    </div>

    <form id="bewerbung-form" class="form wizard" name="bewerbung" method="POST" action="/danke.html" enctype="multipart/form-data" data-netlify="true" netlify-honeypot="bot-field" data-validate>
      <input type="hidden" name="form-name" value="bewerbung">
      <p class="hp"><label>Bitte nicht ausfüllen: <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>

      <div class="wizard-progress" aria-live="polite">
        <p data-step-label>Schritt 1 von 6</p>
        <div class="progress-bar"><span></span></div>
      </div>

      <fieldset class="step">
        <legend><h3 class="step-title" tabindex="-1">1. Kontaktdaten</h3></legend>
        <div class="form-row">
          <div class="field"><label for="b-vorname">Vorname <span class="req">*</span></label><input id="b-vorname" name="vorname" autocomplete="given-name" required></div>
          <div class="field"><label for="b-nachname">Nachname <span class="req">*</span></label><input id="b-nachname" name="nachname" autocomplete="family-name" required></div>
        </div>
        <div class="form-row">
          <div class="field"><label for="b-email">E-Mail <span class="req">*</span></label><input id="b-email" name="email" type="email" autocomplete="email" required></div>
          <div class="field"><label for="b-telefon">Telefon <span class="req">*</span></label><input id="b-telefon" name="telefon" type="tel" autocomplete="tel" required></div>
        </div>
      </fieldset>

      <fieldset class="step">
        <legend><h3 class="step-title" tabindex="-1">2. Stelle &amp; Verfügbarkeit</h3></legend>
        <div class="field">
          <label for="b-stelle">Stelle <span class="req">*</span></label>
          <select id="b-stelle" name="stelle" required>
            <option value="">Bitte wählen …</option>
            <option value="Glasreiniger/in">Glasreiniger/in</option>
            <option value="Initiativbewerbung">Initiativbewerbung</option>
          </select>
        </div>
        <div class="field"><label for="b-start">Frühester Starttermin</label><input id="b-start" name="starttermin" type="date"></div>
        <fieldset class="field-group" data-required>
          <legend>Wochenstunden <span class="req">*</span></legend>
          <div class="choices">
            <label class="choice"><input type="radio" name="wochenstunden" value="bis 10 Stunden"> bis 10 Stunden</label>
            <label class="choice"><input type="radio" name="wochenstunden" value="10–20 Stunden"> 10–20 Stunden</label>
            <label class="choice"><input type="radio" name="wochenstunden" value="20–30 Stunden"> 20–30 Stunden</label>
            <label class="choice"><input type="radio" name="wochenstunden" value="Vollzeit ab 35 Stunden"> Vollzeit ab 35 Stunden</label>
          </div>
        </fieldset>
        <fieldset class="field-group">
          <legend>Bevorzugte Arbeitszeiten</legend>
          <div class="choices">
            <label class="choice"><input type="checkbox" name="arbeitszeiten[]" value="Früh"> Früh</label>
            <label class="choice"><input type="checkbox" name="arbeitszeiten[]" value="Vormittags"> Vormittags</label>
            <label class="choice"><input type="checkbox" name="arbeitszeiten[]" value="Mittags"> Mittags</label>
            <label class="choice"><input type="checkbox" name="arbeitszeiten[]" value="Nachmittags"> Nachmittags</label>
            <label class="choice"><input type="checkbox" name="arbeitszeiten[]" value="Abends"> Abends</label>
            <label class="choice"><input type="checkbox" name="arbeitszeiten[]" value="Wochenende"> Wochenende</label>
          </div>
        </fieldset>
      </fieldset>

      <fieldset class="step">
        <legend><h3 class="step-title" tabindex="-1">3. Erfahrung</h3></legend>
        <fieldset class="field-group" data-required>
          <legend>Berufserfahrung in der Reinigung <span class="req">*</span></legend>
          <div class="choices">
            <label class="choice"><input type="radio" name="erfahrung" value="Keine / Quereinsteiger"> Keine / Quereinsteiger</label>
            <label class="choice"><input type="radio" name="erfahrung" value="Unter 1 Jahr"> Unter 1 Jahr</label>
            <label class="choice"><input type="radio" name="erfahrung" value="1–2 Jahre"> 1–2 Jahre</label>
            <label class="choice"><input type="radio" name="erfahrung" value="3–5 Jahre"> 3–5 Jahre</label>
            <label class="choice"><input type="radio" name="erfahrung" value="Mehr als 5 Jahre"> Mehr als 5 Jahre</label>
          </div>
        </fieldset>
        <fieldset class="field-group">
          <legend>In welchen Bereichen haben Sie schon gearbeitet?</legend>
          <div class="choices">
            <label class="choice"><input type="checkbox" name="bereiche[]" value="Büroreinigung"> Büroreinigung</label>
            <label class="choice"><input type="checkbox" name="bereiche[]" value="Unterhaltsreinigung"> Unterhaltsreinigung</label>
            <label class="choice"><input type="checkbox" name="bereiche[]" value="Glasreinigung"> Glasreinigung</label>
            <label class="choice"><input type="checkbox" name="bereiche[]" value="Sonderreinigung"> Sonderreinigung</label>
            <label class="choice"><input type="checkbox" name="bereiche[]" value="Grundreinigung"> Grundreinigung</label>
            <label class="choice"><input type="checkbox" name="bereiche[]" value="Bauendreinigung"> Bauendreinigung</label>
            <label class="choice"><input type="checkbox" name="bereiche[]" value="Sonstiges"> Sonstiges</label>
          </div>
        </fieldset>
      </fieldset>

      <fieldset class="step">
        <legend><h3 class="step-title" tabindex="-1">4. Mobilität</h3></legend>
        <fieldset class="field-group">
          <legend>Führerschein</legend>
          <div class="choices choices-inline">
            <label class="choice"><input type="radio" name="fuehrerschein" value="Keinen"> Keinen</label>
            <label class="choice"><input type="radio" name="fuehrerschein" value="Klasse B"> Klasse B</label>
            <label class="choice"><input type="radio" name="fuehrerschein" value="Andere Klasse"> Andere</label>
          </div>
        </fieldset>
        <fieldset class="field-group">
          <legend>Eigenes Auto</legend>
          <div class="choices">
            <label class="choice"><input type="radio" name="auto" value="Ja"> Ja</label>
            <label class="choice"><input type="radio" name="auto" value="Nein"> Nein</label>
          </div>
        </fieldset>
        <div class="field"><label for="b-plz">Ihre Postleitzahl <span class="req">*</span></label><input id="b-plz" name="plz" inputmode="numeric" maxlength="5" pattern="\d{5}" autocomplete="postal-code" data-msg="Bitte geben Sie eine fünfstellige Postleitzahl ein." required></div>
      </fieldset>

      <fieldset class="step">
        <legend><h3 class="step-title" tabindex="-1">5. Motivation</h3></legend>
        <fieldset class="field-group">
          <legend>Warum möchten Sie in der Gebäudereinigung arbeiten?</legend>
          <div class="choices">
            <label class="choice"><input type="checkbox" name="motivation[]" value="Sichtbare Ergebnisse"> Ich sehe gern, was ich geschafft habe</label>
            <label class="choice"><input type="checkbox" name="motivation[]" value="Passende Arbeitszeiten"> Die Arbeitszeiten passen zu meinem Leben</label>
            <label class="choice"><input type="checkbox" name="motivation[]" value="Körperliche Arbeit"> Ich arbeite gern körperlich</label>
            <label class="choice"><input type="checkbox" name="motivation[]" value="Teamarbeit"> Ich arbeite gern im Team</label>
            <label class="choice"><input type="checkbox" name="motivation[]" value="Sicherer Arbeitsplatz"> Ich suche einen sicheren Arbeitsplatz</label>
            <label class="choice"><input type="checkbox" name="motivation[]" value="Sonstiges"> Sonstiges</label>
          </div>
        </fieldset>
      </fieldset>

      <fieldset class="step">
        <legend><h3 class="step-title" tabindex="-1">6. Zuverlässigkeit &amp; Abschluss</h3></legend>
        <fieldset class="field-group" data-required>
          <legend>Wie wichtig ist Ihnen Zuverlässigkeit? <span class="req">*</span></legend>
          <div class="choices choices-inline">
            <label class="choice"><input type="radio" name="zuverlaessigkeit" value="Sehr wichtig"> Sehr wichtig</label>
            <label class="choice"><input type="radio" name="zuverlaessigkeit" value="Wichtig"> Wichtig</label>
            <label class="choice"><input type="radio" name="zuverlaessigkeit" value="Weniger wichtig"> Weniger</label>
          </div>
        </fieldset>
        <fieldset class="field-group">
          <legend>Was bedeutet Zuverlässigkeit für Sie?</legend>
          <div class="choices">
            <label class="choice"><input type="checkbox" name="bedeutung[]" value="Pünktlich sein"> Pünktlich sein</label>
            <label class="choice"><input type="checkbox" name="bedeutung[]" value="Absprachen einhalten"> Absprachen einhalten</label>
            <label class="choice"><input type="checkbox" name="bedeutung[]" value="Bescheid geben bei Ausfall"> Bescheid geben, wenn ich ausfalle</label>
            <label class="choice"><input type="checkbox" name="bedeutung[]" value="Sorgfältig arbeiten"> Sorgfältig arbeiten</label>
          </div>
        </fieldset>
        <div class="field">
          <label for="b-lebenslauf">Lebenslauf</label>
          <input id="b-lebenslauf" name="lebenslauf" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" aria-describedby="b-lebenslauf-hint">
          <p class="hint" id="b-lebenslauf-hint">Optional · PDF, Word, JPG oder PNG · max. 8 MB</p>
        </div>
        <div class="field"><label for="b-nachricht">Möchten Sie uns noch etwas sagen?</label><textarea id="b-nachricht" name="nachricht"></textarea></div>
        <div class="field">
          <label class="consent"><input id="b-datenschutz" type="checkbox" name="datenschutz" value="akzeptiert" required> <span>Ich habe die <a href="datenschutz.html" target="_blank" rel="noopener">Datenschutzerklärung</a> gelesen und bin mit der Verarbeitung meiner Daten zur Bearbeitung meiner Bewerbung einverstanden. <span class="req">*</span></span></label>
        </div>
      </fieldset>

      <div class="form-alert" role="alert" hidden></div>
      <div class="wizard-nav">
        <button type="button" class="btn btn-outline" data-prev>Zurück</button>
        <button type="button" class="btn btn-primary" data-next>Weiter</button>
        <button type="submit" class="btn btn-primary">Bewerbung absenden</button>
      </div>
    </form>
  </div>
</section>
```

- [ ] **Step 8: Prüfen**

Run: `python3 tests/check_site.py --partial` → keine Fehler für `jobs.html`, außer dem noch fehlenden `datenschutz.html`.
Im Browser über den Testserver, auf Handy-Breite:
1. Die Stellenkarte „Glasreiniger/in“ ist sichtbar. „Jetzt bewerben“ springt zum Formular, und in Schritt 2 ist die Stelle vorgewählt.
2. Schritt 1 leer → „Weiter“ zeigt 4 Fehler. Nach dem Ausfüllen: Schritt 2, der Fortschritt zeigt „Schritt 2 von 6“.
3. In Schritt 4 die PLZ „123“ eingeben → Meldung „fünfstellige Postleitzahl“.
4. Mit Enter im Feld „Vorname“ wird nicht abgesendet.
5. `read_console_messages` meldet keine Fehler.

---

### Task 9: Impressum, Datenschutz, Danke, 404

**Files:**
- Create: `ave-webseite/impressum.html`, `ave-webseite/datenschutz.html`, `ave-webseite/danke.html`, `ave-webseite/404.html`

**Interfaces:**
- Produces: Anker `datenschutz.html#google-maps` (von `kontakt.html` genutzt).

Alle vier Seiten: `{{ROBOTS}}` = `<meta name="robots" content="noindex, follow">` statt der Canonical-Zeile. Kein AKTIV. Seitenkopf ohne `ph-bg`.

- [ ] **Step 1: `impressum.html`**

TITLE `Impressum | AVE Businesshygiene GmbH`, DESC `Impressum der AVE Businesshygiene GmbH, Mörfelden-Walldorf.`

```html
<section class="page-head dark">
  <div class="container">
    <span class="goldline"></span>
    <p class="kicker">Rechtliches</p>
    <h1>Impressum</h1>
  </div>
</section>
<section class="section">
  <div class="container prose">
    <p class="form-alert">Platzhalter: Diese Seite muss vor der Veröffentlichung vollständig ausgefüllt und rechtlich geprüft werden.</p>
    <h2>Angaben gemäß § 5 DDG</h2>
    <p>AVE Businesshygiene GmbH<br>Waldecker Straße 4<br>64546 Mörfelden-Walldorf</p>
    <h2>Vertreten durch</h2>
    <p>Geschäftsführer: <span class="todo">[BITTE ERGÄNZEN]</span></p>
    <h2>Kontakt</h2>
    <p>Telefon: <a href="tel:+4961053039668">06105 30 39 66 8</a><br>E-Mail: <a href="mailto:info@ave-businesshygiene.de">info@ave-businesshygiene.de</a></p>
    <h2>Registereintrag</h2>
    <p>Registergericht: <span class="todo">[BITTE ERGÄNZEN]</span><br>Registernummer: HRB <span class="todo">[BITTE ERGÄNZEN]</span></p>
    <h2>Umsatzsteuer-ID</h2>
    <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: <span class="todo">[BITTE ERGÄNZEN]</span></p>
    <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
    <p>Meister im Glas- und Gebäudereiniger-Handwerk (verliehen in Deutschland)<br>Zuständige Kammer: <span class="todo">[BITTE ERGÄNZEN]</span><br>Berufsrechtliche Regelungen: Handwerksordnung (HwO)</p>
    <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
    <p><span class="todo">[BITTE ERGÄNZEN]</span>, Anschrift wie oben</p>
    <h2>Verbraucherstreitbeilegung</h2>
    <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. <span class="todo">[BITTE PRÜFEN]</span></p>
  </div>
</section>
```

- [ ] **Step 2: `datenschutz.html`**

TITLE `Datenschutzerklärung | AVE Businesshygiene GmbH`, DESC `Datenschutzerklärung der AVE Businesshygiene GmbH.`

```html
<section class="page-head dark">
  <div class="container">
    <span class="goldline"></span>
    <p class="kicker">Rechtliches</p>
    <h1>Datenschutz&shy;erklärung</h1>
  </div>
</section>
<section class="section">
  <div class="container prose">
    <p class="form-alert">Platzhalter: Diese Datenschutzerklärung ist eine Gliederung und muss vor der Veröffentlichung vollständig ausgearbeitet und rechtlich geprüft werden.</p>
    <h2>1. Verantwortlicher</h2>
    <p>AVE Businesshygiene GmbH, Waldecker Straße 4, 64546 Mörfelden-Walldorf<br>Telefon: <a href="tel:+4961053039668">06105 30 39 66 8</a> · E-Mail: <a href="mailto:info@ave-businesshygiene.de">info@ave-businesshygiene.de</a><br>Vertreten durch: <span class="todo">[BITTE ERGÄNZEN]</span></p>
    <h2>2. Hosting</h2>
    <p>Diese Webseite wird bei Netlify, Inc. (USA) gehostet. <span class="todo">[BITTE ERGÄNZEN: Auftragsverarbeitungsvertrag, Rechtsgrundlage, Drittlandübermittlung]</span></p>
    <h2>3. Server-Logfiles</h2>
    <p>Beim Aufruf der Seite werden technisch notwendige Daten (z. B. IP-Adresse, Zeitpunkt, aufgerufene Seite) vom Hoster verarbeitet. <span class="todo">[BITTE ERGÄNZEN: Speicherdauer, Rechtsgrundlage]</span></p>
    <h2>4. Kontaktformular</h2>
    <p>Wenn Sie uns über das Kontaktformular schreiben, verarbeiten wir Ihre Angaben zur Bearbeitung Ihrer Anfrage. Die Übermittlung erfolgt über Netlify Forms. <span class="todo">[BITTE ERGÄNZEN: Rechtsgrundlage, Speicherdauer]</span></p>
    <h2>5. Bewerbungen</h2>
    <p>Ihre Angaben im Bewerbungsformular und einen hochgeladenen Lebenslauf verarbeiten wir ausschließlich zur Durchführung des Bewerbungsverfahrens. <span class="todo">[BITTE ERGÄNZEN: Rechtsgrundlage, Löschfrist]</span></p>
    <h2 id="google-maps">6. Google Maps</h2>
    <p>Auf unserer Kontaktseite können Sie eine Karte von Google Maps (Google Ireland Limited) laden. Die Karte wird erst geladen, wenn Sie auf „Karte laden“ klicken. Erst dann werden Daten wie Ihre IP-Adresse an Google übertragen. <span class="todo">[BITTE ERGÄNZEN: Rechtsgrundlage (Einwilligung), Drittlandübermittlung, Link zur Datenschutzerklärung von Google]</span></p>
    <h2>7. Cookies und Schriftarten</h2>
    <p>Diese Webseite setzt keine Cookies und verwendet keine Analyse- oder Tracking-Werkzeuge. Die Schriftarten sind lokal eingebunden. Beim Seitenaufruf wird keine Verbindung zu Servern von Google hergestellt.</p>
    <h2>8. Ihre Rechte</h2>
    <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch sowie das Recht, eine erteilte Einwilligung zu widerrufen. Sie können sich außerdem bei einer Datenschutz-Aufsichtsbehörde beschweren, zum Beispiel beim Hessischen Beauftragten für Datenschutz und Informationsfreiheit. <span class="todo">[BITTE PRÜFEN]</span></p>
  </div>
</section>
```

- [ ] **Step 3: `danke.html`**

TITLE `Vielen Dank | AVE Businesshygiene GmbH`, DESC `Vielen Dank für Ihre Nachricht an die AVE Businesshygiene GmbH.`

```html
<section class="page-head dark">
  <div class="container">
    <span class="goldline"></span>
    <p class="kicker">Vielen Dank</p>
    <h1>Ihre Nachricht ist <span class="accent">angekommen</span></h1>
    <p class="lead">Vielen Dank! Wir melden uns schnellstmöglich bei Ihnen. Bei dringenden Anliegen erreichen Sie uns telefonisch.</p>
    <div class="btn-row">
      <a class="btn btn-primary" href="index.html">Zur Startseite</a>
      <a class="btn btn-outline" href="tel:+4961053039668">06105 30 39 66 8</a>
    </div>
  </div>
</section>
```

- [ ] **Step 4: `404.html`**

Wie oben, aber mit `{{P}}` = `/` (absolute Pfade, weil Netlify die Seite unter beliebigen URLs ausliefert). Auch die Links in MAIN sind absolut. TITLE `Seite nicht gefunden | AVE Businesshygiene GmbH`, DESC `Die gesuchte Seite wurde nicht gefunden.`

```html
<section class="page-head dark">
  <div class="container">
    <span class="goldline"></span>
    <p class="kicker">Fehler 404</p>
    <h1>Seite nicht <span class="accent">gefunden</span></h1>
    <p class="lead">Die gesuchte Seite gibt es leider nicht (mehr). Hier geht es weiter:</p>
    <div class="btn-row">
      <a class="btn btn-primary" href="/index.html">Zur Startseite</a>
      <a class="btn btn-outline" href="/dienstleistungen.html">Dienstleistungen</a>
      <a class="btn btn-outline" href="/kontakt.html">Kontakt</a>
    </div>
  </div>
</section>
```

- [ ] **Step 5: Prüfen**

Run: `python3 tests/check_site.py`
Expected: „10 Seiten geprüft, 0 Fehler“ (Exit 0). Warnungen nur, falls die Schriften in Task 1 nicht geladen werden durften.
Run: `grep -l "{{" ave-webseite/*.html` → keine Ausgabe.

---

### Task 10: Gesamtprüfung und Übergabe

**Files:** keine neuen, nur Korrekturen aus den Funden.

- [ ] **Step 1: Automatische Prüfungen**

```bash
cd "/Users/andrepires/Desktop/Claude Workshops/Tag-4-Kit 2/Eigene-Website"
python3 tests/check_site.py
grep -c "tel:+4961053039668" ave-webseite/*.html
grep -L 'lang="de"' ave-webseite/*.html
```
Expected: 0 Fehler. Jede Seite hat mindestens 3 Telefon-Links. Die letzte Zeile hat keine Ausgabe.
`tests/tests.html` → „ALLE OK – 45/45 bestanden“.

- [ ] **Step 2: Durchklicken auf Handy-Breite** (`resize_window` preset `mobile`)

Für jede der 10 Seiten: Screenshot. Prüfen per JS, dass `document.documentElement.scrollWidth <= window.innerWidth`. Das Menü öffnet und schließt, die Menü-Links funktionieren, der Anruf-Knopf ist sichtbar und verdeckt keine Knöpfe, und `read_console_messages` meldet keine Fehler.

- [ ] **Step 3: Durchklicken in Desktop-Breite** (preset `desktop`, Fenster ≥ 1280 px)

Das Desktop-Menü ist mit aktiver Seite sichtbar, der ☰-Knopf und der Anruf-Knopf sind ausgeblendet. Die Raster zeigen 3 bzw. 4 Spalten. Das Menü auf Handy-Breite öffnen und dann auf Desktop-Breite wechseln: Das Menü schließt sich, und die Seite scrollt wieder.

- [ ] **Step 4: Karte und Netzwerk**

`kontakt.html` neu laden → `read_network_requests` mit Filter `google` ergibt nichts, außerdem keine Anfragen an andere fremde Domains. Nach „Karte laden“ erscheint eine Google-Anfrage.

- [ ] **Step 5: Doppelklick-Test (`file://`)**

`ave-webseite/index.html` direkt als Datei öffnen. Alle Menü-Links funktionieren. Das Kontaktformular gültig ausfüllen und absenden → Hinweis „…erst versendet werden, wenn die Webseite online ist…“.

- [ ] **Step 6: Übergabe**

Seite im Browser-Fenster öffnen (`index.html` über den Testserver). Dem Inhaber in einfachen Worten zusammenfassen: was fertig ist, wo die Stellen geändert werden (`js/stellen.js`), was noch fehlt (echte Fotos, Logo als SVG, Rechtstexte mit **[BITTE ERGÄNZEN]**, Netlify-Einrichtung inklusive E-Mail-Benachrichtigung für Formulare).
