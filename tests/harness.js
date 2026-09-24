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
