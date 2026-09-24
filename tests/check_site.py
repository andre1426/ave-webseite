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
        self.manifest = None
        self.touch_icon = None
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
        if tag == "link" and a.get("rel") == "manifest":
            self.manifest = a.get("href")
        if tag == "link" and a.get("rel") == "apple-touch-icon":
            self.touch_icon = a.get("href")
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


def png_size(path):
    """Breite und Höhe einer PNG-Datei aus dem IHDR-Block lesen."""
    head = path.read_bytes()[:24]
    return int.from_bytes(head[16:20], "big"), int.from_bytes(head[20:24], "big")


def check_manifest(errors):
    """Web-App-Manifest: Pflichtfelder für „Zum Home-Bildschirm“ als Vollbild-App."""
    path = ROOT / "manifest.webmanifest"
    if not path.exists():
        errors.append("manifest.webmanifest fehlt")
        return
    try:
        m = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as e:
        errors.append(f"manifest.webmanifest: ungültiges JSON ({e})")
        return
    for key in ("name", "short_name", "start_url", "display", "theme_color", "background_color"):
        if not m.get(key):
            errors.append(f"manifest.webmanifest: Feld {key} fehlt")
    if m.get("display") != "standalone":
        errors.append("manifest.webmanifest: display muss standalone sein")
    sizes = set()
    for icon in m.get("icons", []):
        file = ROOT / icon.get("src", "")
        if not file.exists():
            errors.append(f"manifest.webmanifest: Symbol fehlt: {icon.get('src')}")
            continue
        w, h = png_size(file)
        if f"{w}x{h}" != icon.get("sizes"):
            errors.append(f"manifest.webmanifest: {icon['src']} ist {w}x{h}, angegeben {icon.get('sizes')}")
        sizes.add((icon.get("sizes"), icon.get("purpose", "any")))
    for need in (("192x192", "any"), ("512x512", "any"), ("512x512", "maskable")):
        if need not in sizes:
            errors.append(f"manifest.webmanifest: Symbol {need[0]} ({need[1]}) fehlt")
    touch = ROOT / "img" / "apple-touch-icon.png"
    if not touch.exists() or png_size(touch) != (180, 180):
        errors.append("img/apple-touch-icon.png fehlt oder ist nicht 180x180")


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
        if not p.manifest:
            errors.append(f"{name}: <link rel=\"manifest\"> fehlt")
        if not p.touch_icon:
            errors.append(f"{name}: <link rel=\"apple-touch-icon\"> fehlt")
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

    check_manifest(errors)

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
