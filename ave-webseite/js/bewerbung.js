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
    var lastChange = 0;
    var GUARD_MS = 400; // Doppelklick auf „Weiter“ soll nicht sofort absenden

    function show(i, focus) {
      current = Math.max(0, Math.min(i, steps.length - 1));
      lastChange = AVE.now();
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
    form.addEventListener("submit", function (e) {
      if (AVE.now() - lastChange < GUARD_MS) { e.preventDefault(); e.stopImmediatePropagation(); }
    }, true);
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

  /* Bewerbung zuerst in Supabase speichern, danach normal an Netlify senden
     (Netlify schickt weiterhin die E-Mail). Klappt Supabase nicht, geht die
     Bewerbung trotzdem an Netlify – es geht also nichts verloren. */
  AVE.SUPABASE_BEWERBUNG = "https://dgnknnxwdecbchajaeiq.supabase.co/functions/v1/bewerbung";
  AVE.SUPABASE_TIMEOUT_MS = 20000;

  AVE.initSupabase = function (form) {
    var sending = false;
    form.addEventListener("submit", function (e) {
      if (e.defaultPrevented || sending || !window.fetch || !window.FormData) return;
      if (AVE.validateContainer(form).length || AVE.isOffline()) return; // main.js meldet den Fehler
      e.preventDefault();
      sending = true;
      var btn = form.querySelector("[type=submit]");
      if (btn) { btn.disabled = true; btn.textContent = "Wird gesendet …"; }
      var ctrl = window.AbortController ? new AbortController() : null;
      var finished = false;
      var done = function () {
        if (finished) return;
        finished = true;
        clearTimeout(timer);
        HTMLFormElement.prototype.submit.call(form);
      };
      var timer = setTimeout(function () { if (ctrl) ctrl.abort(); done(); }, AVE.SUPABASE_TIMEOUT_MS);
      window.fetch(AVE.SUPABASE_BEWERBUNG, { method: "POST", body: new FormData(form), signal: ctrl ? ctrl.signal : undefined })
        .then(done, done);
    });
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
    AVE.initSupabase(form);
  };

  if (!window.AVE_NO_AUTOINIT) AVE.initBewerbung();
})();
