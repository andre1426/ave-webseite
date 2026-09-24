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

// --- Nachbesserungen aus der Prüfung ---
test("preselectService: beschädigter Parameter wirft keinen Fehler", function () {
  html(SEL); var s = fixture.querySelector("select");
  eq(AVE.preselectService(s, "?leistung=%"), false); eq(s.value, "");
});
test("initMap: Fokus liegt nach dem Laden auf der Karte", function () {
  var box = document.createElement("div");
  box.innerHTML = '<div class="map" data-map-src="about:blank"><div class="map-consent"><button type="button" data-map-load>Karte laden</button></div></div>';
  document.body.appendChild(box);
  try {
    AVE.initMap();
    var btn = box.querySelector("[data-map-load]");
    btn.focus(); btn.click();
    eq(document.activeElement, box.querySelector("iframe"), "Fokus nicht auf der Karte");
  } finally { box.remove(); }
});
