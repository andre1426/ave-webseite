# SDD ledger — plan: docs/superpowers/plans/2026-09-24-ave-webseite.md
Setup: Ruling: kein Git-Repo, kein Worktree — Plan-Constraint „Commit-Schritte entfallen“, Git folgt im Workshop Schritt 7; Arbeit nur in neuen Dateien unter Eigene-Website/ — Kosten falls falsch: keine Commit-Historie pro Task
Pre-flight:
- T2→T4..9: Seitenrahmen/CTA/Icons/Klassen — T2 produziert, Seiten konsumieren gleiche Namen — OK
- T3→T7: data-preselect/data-slug/data-map-src/data-map-load — übereinstimmend — OK
- T3→T8: validateContainer/focusFirst/aveShowTarget — übereinstimmend — OK
- T6→T4/T7: Anker buero/glas/fassade + Slugs — übereinstimmend — OK
- T9→T7: #google-maps — OK
Task 1: complete (kein Git; tests: python3 tests/check_site.py → 10× Datei fehlt wie erwartet; tests.html → ALLE OK 0/0)
Task 2: Ruling: Seitenrahmen/Icons/CTA werden per Hilfsskript (scratchpad/build/build.py) in die Seiten eingesetzt statt von Hand kopiert — garantiert identische Header/Footer, Ergebnis sind trotzdem eigenständige statische Dateien wie in der Spec — Kosten falls falsch: keine (Skript wird nicht ausgeliefert; spätere Header-Änderungen gehen auch von Hand)
Task 2: complete (tests: CSS-Klammerprüfung → Klammern OK; Darstellung wird ab Task 4 geprüft)
Task 3: complete (tests: tests/tests.html RED 0/33 → GREEN ALLE OK 33/33)
Task 4: PAUSIERT auf Wunsch des Inhabers (24.09.2026). Stand: index.html gebaut; CSS-Fix H1 (clamp 1.6rem/7.4vw + hyphens) eingetragen, aber bei 320 px noch nicht erneut geprüft (Screenshot zeigte evtl. altes CSS aus dem Cache). Weiter: 320-px-Prüfung wiederholen, dann Task 4 Desktop-Prüfung, dann Tasks 5–10.
Hinweis: Bau-Hilfsskript liegt nur im Scratchpad (scratchpad/build/) — bei neuer Sitzung ggf. neu anlegen oder Seiten direkt schreiben.
Bau-Hilfsskript gesichert nach .superpowers/sdd/2026-09-24-ave-webseite/build/ (OUT-Pfad im Skript ist absolut)
Nachtrag: Web-App-Manifest + App-Symbole eingebaut (Frame-Vorlage erweitert; check_site.py prüft Manifest) — RED 3 Fehler → GREEN; index.html neu gebaut. Alle weiteren Seiten bekommen es automatisch über die Vorlage.
Nachtrag: Gründerfoto (img/andre-pires-gruender.jpg, 800px) statt Platzhalter auf index.html; .photo-Klasse (4:5, cover). H1-Fix: hyphens manual, clamp(1.5rem,7.2vw,3.4rem), .hero h1 max-width entfernt — geprüft 320 px + 375 px ohne Überlauf/Trennung.
Ruling: Seit Nutzer Git/GitHub eingerichtet hat — pro Task lokaler Commit, Push nur auf „Speichere auf GitHub“ — Push veröffentlicht live über Netlify — Kosten falls falsch: Nutzer sieht Fortschritt erst nach seinem Befehl online
Task 4: complete (commit 581e896; tests: check_site --partial → nur fehlende Link-Ziele; 320/375/1280 px ohne Überlauf; Konsole ohne Fehler)
Task 5: Ruling: Gründerfoto auch im Über-uns-Abschnitt „Unsere Geschichte“ statt Platzhalter „Foto: André Pires“ — Nutzer wollte das Bild „bei Gründer“, dieser Platz zeigt ebenfalls den Gründer — Kosten falls falsch: eine Zeile zurück auf Platzhalter
Task 5: complete (commit fd2781b; tests: check_site --partial → nur fehlende Link-Ziele; 375 + 1280 px ohne Überlauf; Konsole ohne Fehler)
Task 6: Ruling: .service scroll-margin-top 64px ergänzt — Sprungleiste verdeckte Abschnittsanfang um 49px (gemessen 84<133 → 148>133) — Kosten falls falsch: etwas mehr Abstand beim Springen
Task 6: complete (commit 7332aac; tests: check_site --partial ohne Anker-Fehler; Sprünge buero/edv/solar/klinik geprüft 375+1280 px)
Task 7: complete (commit 8f51902; tests: check_site --partial nur fehlende Ziele; ?leistung=glas vorgewählt; 6 Pflichtfehler, Fokus Anrede; E-Mail-Fehler; 0 externe Anfragen vor Klick, iframe google nach Klick)
Task 8: Ruling: 320-px-Überlauf gefunden (Iframe-Messung: lange Großbuchstaben-Wörter in Grid-Karten, 3er-Auswahl) — Fix: h2/h3 hyphens:auto, min-width:0 für Grid-Kinder, choices-inline auto-fit minmax(96px) — Kosten falls falsch: gelegentliche Silbentrennung in Unterüberschriften auf kleinen Handys
Task 8: complete (commit 303490f; tests: tests.html RED 33/45 → GREEN 45/45; Wizard-Durchlauf 1→6, Enter blockiert, PLZ-Fehler, Stelle vorgewählt; 320+375 px alle 6 Seiten sw==iw)
Task 9: complete (commit 8fe96cb; tests: check_site → 10 Seiten, 0 Fehler, 0 Warnungen; keine {{-Reste)
Task 10: complete (check_site 10/0/0; tests.html 45/45; Iframe-Messung 320/375/1280 alle Seiten ohne Überlauf, 0 kaputte Bilder; Menü schließt bei Wechsel auf Desktop; Konsole ohne Fehler; 404 lokal ungestylt wegen absoluter Pfade — online prüfen; file://-Klicktest nicht möglich im Browser-Pane, Offline-Logik per Unit-Test abgedeckt)
Final review: Subagent (opus) — 2 Important, 7 Minor
Final: fixed I-1 _redirects 301! → 301 (Spec) — check_redirects RED 7 Fehler → GREEN; online keine Schleife beobachtet, Risiko bei Pretty URLs
Final: fixed M-3 (hochgestuft auf Important, WCAG 1.4.11 in Spec) Feldrahmen #868E98 3.31:1, Fokusring/Fokusrahmen gold-text — check_contrast RED 3 → GREEN
Final: fixed M-6 (hochgestuft auf Important, Spec verlangt 44 px) Chipnav min-height 44px — Iframe-Messung 40 → 44
Final: Ruling: I-2 Platzhalter in Impressum/Datenschutz bleiben — Inhalte kann nur der Inhaber liefern; Hinweis an Inhaber: vor Live-Gang mit echter Domain/Formularnutzung ausfüllen — Kosten falls falsch: Abmahnrisiko, falls so beworben
Final: minor (deferred): M-1 decodeURIComponent bei ?leistung=% wirft Fehler (unsichtbar)
Final: minor (deferred): M-2 Doppelklick „Weiter“ in Schritt 5 trifft „Absenden“, Schritt 6 zeigt sofort Fehler
Final: minor (deferred): M-4 Fokus geht nach „Karte laden“ verloren
Final: minor (deferred): M-5 „Glasreiniger/in“ fest in jobs.html Meta-Beschreibung und Fallback-Option
Final: minor (deferred): M-7 Honeypot-Feld ohne aria-hidden
Final: Ruling: Workspace .superpowers/ bleibt bestehen statt gelöscht — enthält das Bau-Hilfsskript für künftige Seitenänderungen; ist per .gitignore nicht im Repo — Kosten falls falsch: ein paar KB lokal
Final: suite check_site 10/0/0 + tests.html 45/45 nach Fix-Pass; commit 45c6d23
Debug 24.09.: Kontaktformular POST → 404. Ursache: Formular-Erkennung erst nach letztem Datei-Upload eingeschaltet; Netlify übernimmt bei unveränderten Dateien den alten Upload („All files already uploaded…“) und scannt nicht neu → leerer Commit wirkungslos. Fix: echte Änderung an kontakt/jobs.html (Honeypot aria-hidden, = deferred minor M-7) → 2 Formulare erkannt, Test-POST (Honeypot/Spam) → 200 Danke-Seite.
24.09.: E-Mail-Benachrichtigung (info@…, alle Formulare) eingerichtet; erste Nutzer-Testanfrage von Netlify-Spamfilter aussortiert (Kauderwelsch-Text) → keine Mail; realistischer Test → Mail angekommen. Formulare End-to-End bestätigt.
Nachbesserung M-1/M-2/M-4/M-5 umgesetzt (M-7 bereits zuvor): Tests RED 46/49 + check_site 1 Fehler → GREEN 49/49 + 0 Fehler; Jobs-Seite End-to-End geprüft (Auswahl aus stellen.js, Doppelklick ohne Fehler). Commit f18f188, noch nicht gepusht.
Impressum ausgefüllt (Daten aus altem Impressum, im Quelltext verifiziert; Kammer + V.i.S.d.P. vom Inhaber bestätigt); EU-OS-Plattform-Link bewusst weggelassen (Plattform eingestellt). check_impressum RED 6 → GREEN. Commit a1f8aca
Logo aus 2000px-JPG freigestellt (Swift/CoreGraphics, logo-original/logo-aufbereiten.swift): logo.png weiße Schrift 280px, logo-hell.png schwarze Schrift (og:image), Icons nur Adler. Teamfotos team.jpg (Hero) + team-mitarbeiterinnen.jpg (Karriere-Teaser) 900px. check_site 0 Fehler; 375/1280 px ohne Überlauf, keine kaputten Bilder. Commit 3465b95, nicht gepusht.

## 2026-09-25 – Bewerbungen in Supabase

- Tabelle `public.bewerbungen` + privater Bucket `lebenslaeufe` im Supabase-Projekt „Angebot und
  Kalkulation“ (eu-central-1) angelegt. RLS an, keine Regeln → nur der Secret Key hat Zugriff.
- Erst per Netlify-Funktion gebaut, dann auf Wunsch des Inhabers „alles über Supabase“ umgestellt:
  Supabase-Funktion `bewerbung` (Quelltext `supabase/functions/bewerbung/index.ts`), die
  `bewerbung.js` beim Absenden aufruft; danach geht das Formular normal an Netlify Forms (E-Mail).
  Vorteil: kein geheimer Schlüssel muss irgendwo eingetragen werden.
- Getestet per curl: Bewerbung mit PDF gespeichert, Honeypot-Spam ignoriert, fehlende Pflichtfelder → 400.
  Getestet im Browser (lokal): echtes Formular → Eintrag in Supabase, danach normaler Versand.
  JS-Tests 49/49. Testeinträge „TEST Probe“ und „TEST2 Browser“ können gelöscht werden.
- Offen: Datenschutzerklärung um Supabase ergänzen; Löschfrist für Bewerbungen festlegen.
