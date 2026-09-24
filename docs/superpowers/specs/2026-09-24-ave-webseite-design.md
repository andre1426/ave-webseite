# AVE Businesshygiene – neue Webseite · Design-Spezifikation

**Datum:** 24.09.2026 · **Status:** vom Inhaber freigegeben (Brainstorming) · **Zielordner:** `Eigene-Website/ave-webseite/`

## 1. Ziel und Rahmen

Neue Firmenwebseite für die **AVE Businesshygiene GmbH** (Gebäudereinigung, Rhein-Main/Frankfurt). Die bestehende Seite https://www.ave-businesshygiene.de gibt Inhalte, Struktur und Tonalität vor. Die neue Version ist moderner, schneller und auf dem Handy besser bedienbar. Erst wird sie komplett gebaut, danach wird sie gemeinsam angepasst.

**Ziele (Erfolgskriterien)**
1. Firmenkunden fragen mit wenigen Klicks ein Angebot an (Kontaktformular, Anruf-Knopf).
2. Bewerber bewerben sich auf dem Handy ohne Hürden (mehrstufiges Formular, „Quereinsteiger willkommen“).
3. Bei Google gut auffindbar für „Gebäudereinigung Frankfurt / Rhein-Main“, und die alten URLs bleiben erreichbar.

**Rahmenbedingungen**
- Nur HTML, CSS und JavaScript (ohne Framework, ohne Build-Schritt, ohne Installation). Funktioniert per Doppelklick auf `index.html`.
- Handy zuerst, voll responsive. Alle Texte auf Deutsch.
- Keine externen Ressourcen beim Seitenaufruf: keine Google Fonts, keine Tracker, keine Cookies, daher kein Cookie-Banner.
- Hosting später auf Netlify, verbunden mit GitHub (Workshop Tag 4).
- Bilder sind vorerst Platzhalter. Das Logo stammt von der alten Seite (`logo-original/`, PNG 241×208 px, später gern als SVG).

## 2. Firmendaten (überall einheitlich)

| Feld | Wert |
|---|---|
| Firma | AVE Businesshygiene GmbH |
| AVE | Authentizität · Vertrauen · Engagement |
| Slogan | „Wir reinigen mit Leidenschaft und überzeugen mit Qualität!“ |
| Leitmotiv | „Gebäudereinigung mit Adlerblick“ (Logo: goldener Adler) |
| Gründer | André Pires, Gründung 2023, Meister im Glas- und Gebäudereiniger-Handwerk |
| Adresse | Waldecker Straße 4, 64546 Mörfelden-Walldorf |
| Telefon | 06105 30 39 66 8 (Link: `tel:+4961053039668`) |
| E-Mail | info@ave-businesshygiene.de |
| Öffnungszeiten | Mo–Do 8–18 Uhr · Fr 8–16 Uhr · Sa/So nach Vereinbarung |
| Region | Frankfurt, Flughafen, Rhein-Main |

## 3. Gestaltung (Stil C „Anthrazit Modern“)

Markant, selbstbewusst, technisch: Anthrazit, kräftige Großschrift, goldene Linien, schräge Kanten, eckige Formen (Referenz: Entwurf C vom 24.09.2026).

**Farben (CSS-Variablen in `:root`)**
- `--anthrazit: #1C1F24` für Header, Hero/Seitenkopf, dunkle Flächen, Footer und Symbolhintergründe; `--anthrazit-2: #2A2E35` für Flächen auf dunklem Grund
- `--gold: #C9A35A` für Linien, Knöpfe, Akzente auf dunklem Grund; `--gold-text: #8C6D2E` für goldene Schrift auf hellem Grund (Kontrast 4,8:1 auf Weiß, WCAG AA)
- `--ink: #1D232B` für den Text, `--muted: #5B6570` für Nebentext, `--muted-dark: #B9BEC6` für Nebentext auf Anthrazit, `--line: #E3E5E8` für Rahmen
- `--white: #FFFFFF`, `--grey: #F6F7F8` für abwechselnde Abschnitte und Karten

**Schriften:** Montserrat (600/700/800) für Überschriften, Kicker und Knöpfe; Überschriften (H1–H3) in GROSSBUCHSTABEN. Inter (400/500/600/700) für den Text. Beide liegen selbst gehostet als `woff2` in `fonts/`, mit `font-display: swap` und Systemschriften als Ersatz. Der Download der Schriftdateien wird vor der Umsetzung beim Inhaber angefragt.

**Formensprache**
- Ecken sind eckig (`border-radius: 0`), nur der Anruf-Knopf fürs Handy ist rund.
- **Goldlinie:** 48 × 3 px `--gold` über Abschnittsüberschriften.
- **Schräge Kante:** Hero und Seitenköpfe enden unten schräg (`clip-path: polygon(0 0,100% 0,100% 92%,0 100%)`, auf dem Desktop flacher).
- **Knöpfe:** primär `--gold` mit anthrazitfarbener Schrift, sekundär 2 px Goldrahmen; GROSSBUCHSTABEN, Montserrat 700, leichte Laufweite (`letter-spacing: .06em`).

**Wiederkehrende Bausteine**
- **Header** (sticky, Anthrazit): Logo links. Rechts auf dem Desktop das Menü (Home, Über uns, Dienstleistungen, Qualitätsmanagement, Jobs, Kontakt), die Telefonnummer und der goldene Knopf „Kontakt“. Auf dem Handy ein ☰-Menü, das als Vollbild-Overlay aufklappt (per Tastatur und mit Esc bedienbar, `aria-expanded`). Die aktive Seite ist mit Goldunterstrich markiert.
- **Seitenkopf** (Unterseiten): Anthrazit-Fläche mit schräger Kante, abgedunkeltem Foto-Platzhalter im Hintergrund, Goldlinie, Kicker („Gebäudereinigung · Rhein-Main“), Montserrat-Überschrift (Schlüsselwort in Gold) und Einleitungssatz.
- **Karten:** `--grey`-Hintergrund, 3 px goldene Linie links, Symbol in anthrazitfarbenem Quadrat mit goldenem Linien-Icon (Inline-SVG).
- **CTA-Band:** Anthrazit mit 3 px Goldlinie oben, weiße Großschrift, „Kontaktieren Sie uns jetzt“ und Telefonnummer.
- **Footer:** Anthrazit, Logo, Adresse, Telefon, E-Mail, Öffnungszeiten, Menü, Impressum und Datenschutz, © Jahr.
- **Anruf-Knopf fürs Handy:** fest unten rechts, „📞 Anrufen“, nur unter 768 px sichtbar.
- **Foto-Platzhalter:** `<div class="ph" role="img" aria-label="…">` mit gestreiftem Hintergrund und Beschriftung (z. B. „Foto: Team bei der Arbeit“). Er wird später durch `<img>` ersetzt, bei gleichem Seitenverhältnis.

**Breakpoints:** Basis Handy (ab 320 px), `min-width: 768px` für Tablet (2 Spalten), `min-width: 1100px` für Desktop (3 Spalten, Desktop-Menü). Maximale Inhaltsbreite 1180 px, Seitenrand 16 px auf dem Handy.

## 4. Dateistruktur

```
ave-webseite/
├── index.html                 Home
├── ueber-uns.html
├── dienstleistungen.html
├── qualitaetsmanagement.html
├── jobs.html
├── kontakt.html
├── impressum.html             Platzhalter
├── datenschutz.html           Platzhalter
├── danke.html                 Bestätigung nach dem Absenden eines Formulars
├── 404.html
├── css/style.css              gesamtes Design
├── js/main.js                 Menü, Jahr im Footer, Karte laden, Formularprüfung, Leistung vorauswählen
├── js/stellen.js              ⭐ offene Stellen als Datenliste (vom Inhaber änderbar)
├── js/bewerbung.js            6-Schritte-Bewerbungsformular
├── img/logo.png (+ logo-klein.png), img/favicon.png, img/karte-vorschau.svg
├── fonts/*.woff2
├── _redirects                 alte URLs → neue Seiten (301)
├── robots.txt
└── sitemap.xml
```

Header und Footer stehen als identisches HTML in jeder Seite (bewusste Entscheidung: funktioniert ohne Server und ist optimal für SEO). Änderungen daran werden in allen Dateien gleich nachgezogen.

**Weiterleitungen (`_redirects`)**
```
/ueber-uns/             /ueber-uns.html             301
/dienstleistungen/      /dienstleistungen.html      301
/qualitaetsmanagement/  /qualitaetsmanagement.html  301
/jobs/                  /jobs.html                  301
/kontaktieren-sie-uns/  /kontakt.html               301
/impressum/             /impressum.html             301
/datenschutz/           /datenschutz.html           301
```

## 5. Seiten und Inhalte

Die Texte folgen der alten Seite und werden, wo sie sehr knapp sind, im gleichen Ton ausformuliert. Es werden keine Fakten erfunden: keine Zahlen zu Kunden oder Mitarbeitern, keine Zertifikate, keine Kundenstimmen.

### 5.1 Home (`index.html`)
1. **Hero** (Anthrazit, schräge Kante): Kicker „Gebäudereinigung · Rhein-Main“, H1 „Gebäudereinigung der **Spitzenklasse**“, darunter der Slogan. Knöpfe „Kontaktieren Sie uns jetzt“ (→ kontakt.html) und „Unsere Leistungen“. Foto-Platzhalter „Team bei der Arbeit“.
2. **AVE-Werte:** drei Kacheln: **A**uthentizität, **V**ertrauen, **E**ngagement, jeweils mit 1–2 Sätzen.
3. **Top-Leistungen:** Büro- & Unterhaltsreinigung („Glanzvolle Büros, strahlende Eindrücke“), Glas- & Rahmenreinigung („strahlend saubere Fenster“), Fassadenreinigung („verwandelt Grau in Wow!“). Dazu der Link „Alle 10 Leistungen ansehen“.
4. **Warum AVE:** Meisterbetrieb · umweltfreundliche Reinigungsmittel · digitales QR-Ticketsystem · feste Ansprechpartner und Revierpläne.
5. **Adlerblick-Teaser:** kurzer Text zur Adler-Symbolik und zum Gründer, Link zu Über uns, Foto-Platzhalter.
6. **Jobs-Teaser:** „Quereinsteiger willkommen“, Link zu Jobs.
7. **CTA-Band** und Footer.

### 5.2 Über uns (`ueber-uns.html`)
Seitenkopf „Gebäudereinigung mit **Adlerblick**“. Danach folgen:
- **Die Adler-Symbolik:** Weitblick, scharfe Wahrnehmung, hervorragende Fähigkeiten
- **Zeitleiste des Gründers:** 2001 als Gastarbeiter nach Deutschland → rund 15 Jahre am Flughafen, bis zum Vorarbeiter → Bereichsleiter → Meister im Glas- und Gebäudereiniger-Handwerk → 2023 Gründung der AVE Businesshygiene GmbH
- **Werte** (AVE)
- **Nachhaltigkeit:** ausschließlich umweltfreundliche Reinigungsmittel, nachhaltige Praxis
- **Partnerschaften:** langfristige Kundenbeziehungen; Einsatzfelder Büros, Einkaufszentren, medizinische Einrichtungen
- CTA-Band

### 5.3 Dienstleistungen (`dienstleistungen.html`)
Seitenkopf „Unsere **Leistungen**“, darunter eine Sprungleiste (horizontal scrollbar auf dem Handy). Es folgen 10 Karten, jede mit `id`-Anker, Symbol, Titel, Beschreibung (2–4 Sätze), Foto-Platzhalter und Knopf „Angebot anfragen“ → `kontakt.html?leistung=<slug>`:

| # | Titel | slug |
|---|---|---|
| 1 | Büro- & Unterhaltsreinigung | `buero` |
| 2 | Glas- & Rahmenreinigung | `glas` |
| 3 | Fassadenreinigung | `fassade` |
| 4 | Hausmeisterservice & Grünflächenpflege | `hausmeister` |
| 5 | Sonderreinigung (Polster, Teppich, Jalousien, Bodenbeschichtung) | `sonder` |
| 6 | EDV-Reinigung | `edv` |
| 7 | Kliniken, Arztpraxen & Betreuungseinrichtungen | `klinik` |
| 8 | Bau-, Zwischen- & Endreinigung | `bau` |
| 9 | Reinraum- & Laborreinigung | `reinraum` |
| 10 | Solaranlagenreinigung | `solar` |

Am Ende das CTA-Band.

### 5.4 Qualitätsmanagement (`qualitaetsmanagement.html`)
Seitenkopf „Qualität, die man **sieht**“. Danach folgen:
- **Gemeinsam glänzen:** Kunden, Mitarbeiter und Unternehmen greifen ineinander
- **Ticketsystem per QR-Code:** in drei Schritten (1 QR-Code scannen → 2 Mangel mit Foto melden → 3 schnelle Behebung und Rückmeldung)
- **Revierpläne & Leistungsverzeichnisse:** individuell abgestimmt
- **Schulungen:** kontinuierlich, für gleichbleibend hohe Standards
- **Kundenfeedback & Prozessoptimierung:** regelmäßiges Feedback, Einbindung der Mitarbeiter
- **Umwelt- & Qualitätsmanagement:** Effizienz und ökologische Verantwortung
- CTA-Band

### 5.5 Jobs (`jobs.html`)
- Seitenkopf „Karriere mit **Adlerblick**“, Einleitung „Karriere in der Gebäudereinigung gesucht?“, Knopf „Jetzt bewerben“ (springt zum Formular)
- **Vorteile:** Teilzeit & Vollzeit · Schichten nach Wahl (Früh, Tag, Abend) · **Quereinsteiger willkommen** · Einarbeitung & Schulungen · pünktliche Bezahlung · Meisterbetrieb
- **Offene Stellen:** Die Karten werden aus `js/stellen.js` erzeugt. Erster Eintrag: **Glasreiniger/in**, Einsatzorte Frankfurt · Flughafen · Rhein-Main, Teilzeit/Vollzeit, Schichten nach Absprache. Knopf „Jetzt bewerben“ springt zum Formular und wählt die Stelle vor. Solange JavaScript lädt, steht im HTML ein Hinweis mit Telefonnummer (`<noscript>`-Fallback).
- **Bewerbungsformular** (siehe 6.2)

`stellen.js` bekommt oben eine deutsche Kurzanleitung als Kommentar („So fügen Sie eine Stelle hinzu …“). Format:
```js
const STELLEN = [
  { titel: "Glasreiniger/in", orte: ["Frankfurt", "Flughafen", "Rhein-Main"],
    umfang: "Teilzeit oder Vollzeit", schichten: "nach Absprache",
    text: "Kurzbeschreibung …" }
];
```

### 5.6 Kontakt (`kontakt.html`)
Seitenkopf „Wir sind für Sie **da**“. Auf dem Desktop zweispaltig, auf dem Handy untereinander:
- **Formular** (siehe 6.1)
- **Kontaktdaten:** Adresse, Telefon (`tel:`), E-Mail (`mailto:`), Öffnungszeiten als Tabelle
- **Karte** (siehe 7)

### 5.7 Impressum und Datenschutz
Grundstruktur mit bekannten Firmendaten. Fehlende Pflichtangaben (Geschäftsführer, Registergericht, HRB-Nummer, USt-IdNr., Aufsichtsbehörde/Kammer, vollständiger Datenschutztext inkl. Netlify Forms und Google Maps) sind gut sichtbar als **[BITTE ERGÄNZEN]** markiert. Beide Seiten haben `noindex`.

### 5.8 Danke und 404
- `danke.html`: „Vielen Dank! Wir melden uns schnellstmöglich.“ mit Links zu Home und Telefon. `noindex`.
- `404.html`: „Seite nicht gefunden“ mit Links zu den Hauptseiten.

## 6. Formulare (Netlify Forms)

Allgemein: `<form name="…" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/danke.html">` mit verstecktem `form-name`-Feld und einem Honeypot-Feld. Jedes Feld hat ein sichtbares `<label>`. Pflichtfelder sind markiert. Fehlermeldungen stehen direkt am Feld (`aria-describedby`, `aria-invalid`), und der Fokus springt zum ersten Fehler. Die Prüfung erledigt `main.js`, zusätzlich zu den HTML-Attributen (`required`, `type="email"`, `type="tel"`).

**Lokal (Doppelklick):** Die Prüfung funktioniert vollständig. Beim Absenden ohne Server erscheint der Hinweis: „Das Formular kann erst versendet werden, wenn die Seite online ist.“ Erkannt wird das an `location.protocol === "file:"`.

### 6.1 Kontaktformular (`name="kontakt"`)
Felder: Anrede (Herr/Frau/Divers, Pflicht) · Vorname · Nachname (Pflicht) · Firma (optional) · Telefon · E-Mail (Pflicht, gültig) · Leistung (Auswahl: 10 Leistungen + „Sonstiges“, Pflicht) · Nachricht (Pflicht) · Datenschutz-Häkchen (Pflicht, mit Link). Der URL-Parameter `?leistung=<slug>` wählt die Leistung vor.

### 6.2 Bewerbungsformular (`name="bewerbung"`, `enctype="multipart/form-data"`)
Ein einziges `<form>` mit 6 `<fieldset>`-Schritten. Ohne JavaScript sind alle Schritte sichtbar, mit JavaScript immer nur der aktuelle Schritt. Oben zeigt ein Fortschrittsbalken „Schritt X von 6“. Mit „Zurück“ und „Weiter“ wechselt man die Schritte, „Weiter“ prüft nur den aktuellen Schritt. Nach jedem Wechsel springt der Fokus zur Überschrift des Schritts.

1. **Kontaktdaten:** Vorname*, Nachname*, E-Mail*, Telefon*
2. **Stelle & Verfügbarkeit:** Stelle* (Glasreiniger/in · Initiativbewerbung; die Liste kommt aus `STELLEN` plus „Initiativbewerbung“), frühester Start (Datum), Wochenstunden* (bis 10 h · 10–20 h · 20–30 h · Vollzeit ab 35 h), Arbeitszeiten (mehrfach: früh, vormittags, mittags, nachmittags, abends, Wochenende)
3. **Erfahrung:** Berufserfahrung in der Reinigung* (keine / Quereinsteiger · unter 1 Jahr · 1–2 Jahre · 3–5 Jahre · mehr als 5 Jahre), Tätigkeitsbereiche (mehrfach: Büroreinigung, Unterhaltsreinigung, Glasreinigung, Sonderreinigung, Grundreinigung, Bauendreinigung, sonstiges)
4. **Mobilität:** Führerschein (keiner · B · andere), eigenes Auto (ja/nein), Postleitzahl* (5 Ziffern)
5. **Motivation:** Warum Gebäudereinigung? (mehrfach: sichtbare Ergebnisse · passende Arbeitszeiten · körperliche Arbeit · Teamarbeit · sicherer Arbeitsplatz · sonstiges)
6. **Zuverlässigkeit & Abschluss:** „Wie wichtig ist Ihnen Zuverlässigkeit?“ (Auswahl), „Was bedeutet Zuverlässigkeit für Sie?“ (mehrfach: pünktlich sein · Absprachen einhalten · Bescheid geben bei Ausfall · sorgfältig arbeiten), Lebenslauf (optional, PDF/DOC/DOCX/JPG/PNG, max. 8 MB, wird im Browser geprüft), Nachricht (optional), Datenschutz-Häkchen*

## 7. Karte (Zwei-Klick-Lösung)
Das Vorschaubild ist eine lokale SVG-Grafik (stilisierte Karte mit goldenem Pin und Adresse). Darauf liegen der Knopf „Karte laden“ und der Hinweis: „Beim Laden werden Daten an Google übertragen. Mehr in der Datenschutzerklärung.“ Erst beim Klick wird ein `<iframe>` mit `https://www.google.com/maps?q=Waldecker+Stra%C3%9Fe+4,+64546+M%C3%B6rfelden-Walldorf&output=embed` eingefügt. Daneben steht immer der Link „Route planen“ (öffnet Google Maps in neuem Tab).

## 8. SEO und Technik
- Jede Seite hat eigenes `<title>` und eigene `<meta name="description">`, außerdem `<link rel="canonical">` auf `https://www.ave-businesshygiene.de/<seite>`, Open-Graph-Tags, `lang="de"` und genau eine H1 mit logischer Überschriften-Hierarchie.
- JSON-LD `LocalBusiness` (Typ `ProfessionalService`) auf der Startseite und der Kontaktseite: Name, Adresse, Telefon, E-Mail, Öffnungszeiten, `areaServed` Frankfurt/Rhein-Main, Gründer.
- `sitemap.xml` (alle indexierbaren Seiten), `robots.txt` (mit Sitemap-Verweis).
- Performance: kein Framework, eine CSS-Datei, JS mit `defer`, Schriften vorgeladen (`preload`), Logo mit `width`/`height`, spätere Fotos mit `loading="lazy"`.
- Barrierearmut: „Zum Inhalt springen“-Link, sichtbarer Fokusrahmen, Kontrast mindestens WCAG AA, `prefers-reduced-motion` wird beachtet, Tippflächen mindestens 44 px.
- Keine Cookies, kein Tracking, keine externen Anfragen beim Seitenaufruf.

## 9. Nicht Teil dieses Auftrags
Echte Fotos, finale Rechtstexte, Netlify- und GitHub-Einrichtung (folgt im Workshop), Mehrsprachigkeit, Blog/News, Cookie-Banner (nicht nötig), Analyse-Tools.

## 10. Prüfung vor Übergabe
1. Alle 10 Seiten öffnen, auf Handy-Breite (375 px) und in Desktop-Breite (1280 px): kein waagerechtes Scrollen, nichts überlappt.
2. Menü: ☰ öffnen/schließen (Klick, Esc), alle Links führen zur richtigen Seite, die aktive Seite ist markiert.
3. Link-Prüfung per Skript: alle internen `href`/`src` zeigen auf existierende Dateien.
4. Kontaktformular: leer absenden zeigt Fehler, ungültige E-Mail zeigt Fehler, `?leistung=glas` wählt die Leistung vor.
5. Bewerbungsformular: jeder Schritt blockiert bei fehlenden Pflichtfeldern, Zurück/Weiter funktionieren, der Fortschritt stimmt, eine zu große Datei (> 8 MB) wird abgelehnt, die Stelle aus `stellen.js` erscheint in Karte und Auswahl.
6. Karte: vor dem Klick keine Anfrage an Google (Netzwerk prüfen), nach dem Klick lädt die Karte.
7. Browser-Konsole ohne Fehler auf allen Seiten.
8. HTML-Grundprüfung: eine H1 pro Seite, Titel und Beschreibung vorhanden, JSON-LD gültig.
