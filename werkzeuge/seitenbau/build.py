#!/usr/bin/env python3
"""Setzt Seitenrahmen + Inhalt (main/<seite>.html) zu fertigen HTML-Dateien zusammen.
Hilfsskript nur für den Bau – die Ergebnisdateien sind eigenständig."""
import json
import re
import sys
from pathlib import Path

HERE = Path(__file__).parent
OUT = Path(__file__).resolve().parent.parent.parent / "ave-webseite"
BASE = "https://www.ave-businesshygiene.de/"

ICONS = {
    "buero": '<rect x="4" y="3" width="16" height="18"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>',
    "glas": '<rect x="3" y="3" width="18" height="18"/><path d="M12 3v18M3 12h18M6.5 9.5l3-3M15 18l3-3"/>',
    "fassade": '<path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-5h6v5"/>',
    "hausmeister": '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3 17.8V21h3.2l6.3-6.3a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
    "sonder": '<path d="M12 3l1.8 4.7 4.7 1.8-4.7 1.8L12 16l-1.8-4.7-4.7-1.8 4.7-1.8zM19 15l.8 2.2 2.2.8-2.2.8L19 21l-.8-2.2-2.2-.8 2.2-.8z"/>',
    "edv": '<rect x="3" y="4" width="18" height="12"/><path d="M8 20h8M12 16v4"/>',
    "klinik": '<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',
    "bau": '<path d="M4 17a8 8 0 0 1 16 0M2 17h20v3H2zM10 9V5h4v4"/>',
    "reinraum": '<path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3M7.5 15h9"/>',
    "solar": '<path d="M4 20l2-9h12l2 9zM5 15.5h14M10 11l-1 9M14 11l1 9M12 2v3M5.6 4.6L7 6M18.4 4.6L17 6"/>',
    "award": '<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/>',
    "leaf": '<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19l7-7"/>',
    "qr": '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3"/>',
    "users": '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>',
    "eye": '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    "search": '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5"/>',
    "check": '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
    "shield": '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    "heart": '<path d="M12 20s-7.5-4.5-7.5-10A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7.5 3c0 5.5-7.5 10-7.5 10z"/>',
    "handshake": '<path d="M3 11l4-4 5 2 5-2 4 4-7 7a2 2 0 0 1-3 0z"/><path d="M12 9l-3 3a1.5 1.5 0 0 0 2 2l2-2"/>',
    "clipboard": '<rect x="5" y="4" width="14" height="17"/><path d="M9 4V2h6v2M9 10h6M9 14h6M9 18h3"/>',
    "school": '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5M22 9v6"/>',
    "chat": '<path d="M4 4h16v12H8l-4 4z"/><path d="M8 9h8M8 12h5"/>',
    "clock": '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    "calendar": '<rect x="3" y="5" width="18" height="16"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    "pin": '<path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    "phone": '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2"/>',
    "mail": '<rect x="3" y="5" width="18" height="14"/><path d="M3 6l9 7 9-7"/>',
}
SVG = ('<span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" '
       'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{}</svg></span>')
CTA = """<section class="cta-band dark">
  <div class="container">
    <h2>Bereit für Sauberkeit auf <span class="accent">höchstem Niveau</span>?</h2>
    <div class="btn-row">
      <a class="btn btn-primary" href="kontakt.html">Kontaktieren Sie uns jetzt</a>
      <a class="btn btn-outline" href="tel:+4961053039668">06105 30 39 66 8</a>
    </div>
  </div>
</section>"""
AKTIV = ["HOME", "UEBER", "DIENST", "QM", "JOBS", "KONTAKT"]


def build(name, cfg, frame):
    main = (HERE / "main" / name).read_text(encoding="utf-8").strip()
    main = re.sub(r"ICON\((\w+)\)", lambda m: SVG.format(ICONS[m.group(1)]), main)
    main = main.replace("CTA-BAND", CTA)
    robots = ('<meta name="robots" content="noindex, follow">' if cfg.get("noindex")
              else '<link rel="canonical" href="{}">'.format(BASE if name == "index.html" else BASE + name))
    extra = ""
    for part in cfg.get("extra", []):
        extra += (HERE / part).read_text(encoding="utf-8").strip() + "\n"
    out = frame.replace("{{MAIN}}", main)
    out = out.replace("{{TITLE}}", cfg["title"]).replace("{{DESC}}", cfg["desc"])
    out = out.replace("{{ROBOTS}}", robots).replace("{{EXTRA-HEAD}}\n", extra)
    out = out.replace("{{P}}", cfg.get("p", ""))
    for key in AKTIV:
        out = out.replace("{{AKTIV-%s}}" % key, ' aria-current="page"' if cfg.get("aktiv") == key else "")
    if "{{" in out or "ICON(" in out:
        sys.exit(f"{name}: unersetzter Platzhalter")
    (OUT / name).write_text(out, encoding="utf-8")
    print("gebaut:", name)


if __name__ == "__main__":
    frame = (HERE / "frame.html").read_text(encoding="utf-8")
    pages = json.loads((HERE / "pages.json").read_text(encoding="utf-8"))
    for name in (sys.argv[1:] or pages):
        build(name, pages[name], frame)
