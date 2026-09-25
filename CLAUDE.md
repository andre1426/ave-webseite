# AVE-Webseite

Neue Firmenwebseite der AVE Businesshygiene GmbH (Gebäudereinigung, Mörfelden-Walldorf).
Statisches HTML/CSS/JS, kein Framework, kein npm, kein Build-Schritt auf dem Server.

## Wer arbeitet hier

- Der Inhaber ist kein Entwickler: immer auf Deutsch, einfach und Schritt für Schritt erklären.
- Er arbeitet teils vom Handy (Claude-App, Cloud-Sitzung). Dort gibt es **keinen Mac**, keinen
  lokalen Browser-Doppelklick und nur das, was in diesem Repository liegt. Alles Nötige muss
  also hier im Repo stehen – nichts auf lokale Ordner (`/Users/...`) verweisen lassen.

## Aufbau

| Pfad | Inhalt |
|---|---|
| `ave-webseite/` | Die fertige Webseite. **Nur dieser Ordner wird veröffentlicht.** |
| `ave-webseite/js/stellen.js` | Offene Stellen – pflegt der Inhaber selbst. Stellentitel stehen nur hier. |
| `werkzeuge/seitenbau/` | Bau-Hilfsskript: setzt Seitenrahmen (Header/Footer/Icons) und Seiteninhalt zusammen |
| `tests/` | Prüfungen (siehe unten) |
| `docs/superpowers/specs/2026-09-24-ave-webseite-design.md` | Spezifikation (Design, Farben, Seiteninhalte) |
| `docs/superpowers/plans/2026-09-24-ave-webseite.md` | Ursprünglicher Umsetzungsplan (abgeschlossen; enthält alte Mac-Pfade – nur historisch) |
| `docs/superpowers/fortschritt.md` | Arbeitsprotokoll mit allen Entscheidungen und bekannten Punkten |
| `logo-original/` | Originallogos + `logo-aufbereiten.swift` (läuft nur auf macOS, am Handy nicht nutzbar) |
| `netlify.toml` | Netlify-Einstellungen (veröffentlicht `ave-webseite/`) |
| `LIESMICH-README.md`, `Steckbrief.md` | Workshop-Unterlagen, für die Webseite nicht nötig |

## Seiten ändern

Die HTML-Seiten in `ave-webseite/` sind eigenständige, fertige Dateien. Sie werden aber aus
`werkzeuge/seitenbau/` erzeugt:

- `frame.html` = gemeinsamer Rahmen (Head, Header, Menü, Footer) für alle Seiten
- `main/<seite>.html` = Inhalt der jeweiligen Seite
- `pages.json` = Titel, Beschreibung, aktiver Menüpunkt je Seite

Regel: **Änderungen in `werkzeuge/seitenbau/` machen und dann neu bauen**, damit Rahmen und
Seiten nicht auseinanderlaufen:

```
cd werkzeuge/seitenbau && python3 build.py            # alle Seiten
cd werkzeuge/seitenbau && python3 build.py kontakt.html  # nur eine Seite
```

Nur Python 3, keine Pakete nötig. Das Skript schreibt direkt nach `ave-webseite/`.
CSS (`ave-webseite/css/style.css`) und JavaScript (`ave-webseite/js/`) werden direkt bearbeitet.

## Prüfen (vor jedem Speichern auf GitHub)

- `python3 tests/check_site.py` → muss „10 Seiten geprüft, 0 Fehler“ melden (nur Python 3).
- `tests/tests.html` (JavaScript-Tests): braucht einen Browser über
  `python3 -m http.server` im Projektordner, dann `/tests/tests.html` öffnen. In einer
  Handy-/Cloud-Sitzung ohne Browser: nur `check_site.py` laufen lassen und das dem Inhaber sagen.
- Auf 320 px, 375 px und 1280 px Breite darf nichts waagerecht überlaufen.

## Veröffentlichung

- GitHub: https://github.com/andre1426/ave-webseite (öffentlich, Branch `main`)
- Netlify ist mit GitHub verbunden: **jeder Push auf `main` geht sofort live.**
- Formulare (Kontakt, Bewerbung) laufen über Netlify Forms; Benachrichtigung per E-Mail an
  info@… ist in Netlify eingerichtet. Formular-Erkennung braucht eine echte Dateiänderung
  (ein leerer Commit reicht nicht).
- Commit-Autor: „AVE Businesshygiene“ mit der GitHub-noreply-Adresse.

### „Speichere auf GitHub“

Wenn der Inhaber das sagt: `python3 tests/check_site.py` laufen lassen, prüfen, dass keine
Geheimnisse (Passwörter, Schlüssel, `.env`) dabei sind, dann alle Änderungen mit einer kurzen,
klaren deutschen Commit-Nachricht committen und auf `main` pushen. Danach sagen, dass die
Seite in ca. 1 Minute live ist.

## Offene Punkte

- `datenschutz.html` enthält noch Platzhalter – Inhalte muss der Inhaber liefern.
- `.superpowers/` ist ein lokaler Arbeitsordner (per `.gitignore` ausgeschlossen) und wird
  nicht gebraucht; alles Wichtige daraus liegt jetzt in `werkzeuge/` und `docs/`.
