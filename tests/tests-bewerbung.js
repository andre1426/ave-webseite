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
