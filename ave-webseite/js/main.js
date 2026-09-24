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
