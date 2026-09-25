/* ==========================================================
   AVE Businesshygiene – Supabase-Funktion "bewerbung"
   Nimmt das Bewerbungsformular von jobs.html entgegen und speichert es
   in der Tabelle public.bewerbungen, den Lebenslauf im privaten Bucket
   "lebenslaeufe". Öffentlich aufrufbar (verify_jwt = false), deshalb:
   Honeypot, Pflichtfelder und Dateigrößen werden hier geprüft.
   SUPABASE_URL und SUPABASE_SERVICE_ROLE_KEY stellt Supabase selbst bereit.
   Veröffentlichen: über Claude (Supabase-Werkzeug deploy_edge_function).
   ========================================================== */
import { createClient } from "npm:@supabase/supabase-js@2";

const BUCKET = "lebenslaeufe";
const MAX_BYTES = 8 * 1024 * 1024;
const ENDUNGEN = ["pdf", "doc", "docx", "jpg", "jpeg", "png"];

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
};

function antwort(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}

function text(f: FormData, name: string, max = 500): string | null {
  const v = f.get(name);
  if (typeof v !== "string") return null;
  const t = v.trim().slice(0, max);
  return t === "" ? null : t;
}

function liste(f: FormData, name: string): string[] | null {
  const werte = [...f.getAll(name + "[]"), ...f.getAll(name)]
    .filter((v): v is string => typeof v === "string")
    .map((v) => v.trim().slice(0, 100))
    .filter(Boolean);
  return werte.length ? werte : null;
}

function datum(v: string | null): string | null {
  return v && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return antwort(405, { ok: false, fehler: "Nur POST erlaubt" });

  let f: FormData;
  try {
    f = await req.formData();
  } catch {
    return antwort(400, { ok: false, fehler: "Ungültige Formulardaten" });
  }

  // Spam-Falle: Menschen sehen dieses Feld nicht.
  if (text(f, "bot-field")) return antwort(200, { ok: true });

  const vorname = text(f, "vorname", 100);
  const nachname = text(f, "nachname", 100);
  if (!vorname || !nachname || !text(f, "datenschutz")) {
    return antwort(400, { ok: false, fehler: "Pflichtfelder fehlen" });
  }

  const db = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );

  const id = crypto.randomUUID();
  let lebenslauf: string | null = null;
  const datei = f.get("lebenslauf");
  if (datei instanceof File && datei.size > 0) {
    const endung = (datei.name.split(".").pop() || "").toLowerCase();
    if (datei.size > MAX_BYTES || !ENDUNGEN.includes(endung)) {
      return antwort(400, { ok: false, fehler: "Lebenslauf: nur PDF, Word, JPG oder PNG bis 8 MB" });
    }
    const name = datei.name.replace(/[^\w.\-]+/g, "_").slice(-80);
    const pfad = `${new Date().toISOString().slice(0, 10)}/${id}-${name}`;
    const { error } = await db.storage.from(BUCKET).upload(pfad, datei, {
      contentType: datei.type || "application/octet-stream",
    });
    if (error) {
      console.error("Lebenslauf-Upload fehlgeschlagen:", error.message);
      lebenslauf = "FEHLER beim Speichern – Lebenslauf siehe E-Mail/Netlify";
    } else {
      lebenslauf = pfad;
    }
  }

  const { error } = await db.from("bewerbungen").insert({
    id,
    vorname,
    nachname,
    email: text(f, "email", 200),
    telefon: text(f, "telefon", 50),
    stelle: text(f, "stelle", 200),
    starttermin: datum(text(f, "starttermin", 10)),
    wochenstunden: text(f, "wochenstunden", 100),
    arbeitszeiten: liste(f, "arbeitszeiten"),
    erfahrung: text(f, "erfahrung", 100),
    bereiche: liste(f, "bereiche"),
    fuehrerschein: text(f, "fuehrerschein", 100),
    auto: text(f, "auto", 20),
    plz: text(f, "plz", 10),
    motivation: liste(f, "motivation"),
    zuverlaessigkeit: text(f, "zuverlaessigkeit", 100),
    bedeutung: liste(f, "bedeutung"),
    nachricht: text(f, "nachricht", 5000),
    lebenslauf_datei: lebenslauf,
    datenschutz_akzeptiert: true,
  });
  if (error) {
    console.error("Speichern fehlgeschlagen:", error.message);
    return antwort(500, { ok: false, fehler: "Speichern fehlgeschlagen" });
  }
  return antwort(200, { ok: true });
});
