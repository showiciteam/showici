"use client";

import { useEffect, useState } from "react";
import { sendContactRequest } from "@/lib/actions";
import { useLang } from "@/lib/i18n";

type L = "en" | "fr";
type Field = { key: string; en: string; fr: string; type?: "text" | "url" | "date"; placeholder?: string; required?: boolean };
type Role = { key: string; en: string; fr: string; topics: [string, string][]; fields: Field[] };

/** Who is writing decides the topics and the extra questions. Topic values are saved in English. */
const ROLES: Role[] = [
  {
    key: "venue", en: "I run a venue", fr: "J'ai une salle ou un bar",
    topics: [["Listing my venue", "Inscrire ma salle"], ["Posting shows", "Publier des spectacles"], ["Finding performers", "Trouver des artistes"], ["Account or login", "Compte ou connexion"], ["Plans and pricing", "Forfaits et prix"]],
    fields: [{ key: "venue_name", en: "Venue name", fr: "Nom de la salle", required: true }, { key: "city", en: "City", fr: "Ville", placeholder: "Montréal" }],
  },
  {
    key: "performer", en: "I'm a performer", fr: "Je suis artiste",
    topics: [["My profile", "Mon profil"], ["Getting gigs", "Trouver des contrats"], ["A booking request", "Une demande de réservation"], ["Account or login", "Compte ou connexion"], ["Plans and pricing", "Forfaits et prix"]],
    fields: [{ key: "act_name", en: "Act or stage name", fr: "Nom d'artiste ou de groupe", required: true }, { key: "profile_link", en: "Your ShowIci profile or website", fr: "Votre profil ShowIci ou site web", type: "url", placeholder: "https://" }],
  },
  {
    key: "planner", en: "I'm planning an event", fr: "J'organise un événement",
    topics: [["Help finding an act", "Aide pour trouver un artiste"], ["My event request", "Ma demande d'événement"], ["A performer I contacted", "Un artiste que j'ai contacté"], ["Account or login", "Compte ou connexion"]],
    fields: [{ key: "event_type", en: "Type of event", fr: "Type d'événement", placeholder: "Wedding, birthday, office party…" }, { key: "event_date", en: "Event date", fr: "Date de l'événement", type: "date" }, { key: "city", en: "City", fr: "Ville", placeholder: "Laval" }],
  },
  {
    key: "business", en: "Business or sponsor", fr: "Entreprise ou commanditaire",
    topics: [["Partnership", "Partenariat"], ["Advertising or sponsorship", "Publicité ou commandite"], ["Tickets for a big event", "Billets pour un grand événement"]],
    fields: [{ key: "company", en: "Company", fr: "Entreprise", required: true }, { key: "website", en: "Website", fr: "Site web", type: "url", placeholder: "https://" }],
  },
  {
    key: "press", en: "Media or press", fr: "Médias ou presse",
    topics: [["Interview", "Entrevue"], ["Spotlight Time story idea", "Idée pour Spotlight Time"], ["Press information", "Information de presse"]],
    fields: [{ key: "outlet", en: "Media outlet", fr: "Média", required: true }, { key: "deadline", en: "Deadline", fr: "Date limite", type: "date" }],
  },
  { key: "other", en: "Something else", fr: "Autre chose", topics: [], fields: [] },
];
const COMMON: [string, string][] = [["Report a problem or a user", "Signaler un problème ou un membre"], ["Other", "Autre"]];

const T = {
  title: { en: "Contact ShowIci", fr: "Contacter ShowIci" },
  intro: { en: "Questions, partnerships or a problem to report: tell us who you are and we'll get the right person to answer.", fr: "Questions, partenariats ou problème à signaler : dites-nous qui vous êtes et la bonne personne vous répondra." },
  who: { en: "Who are you?", fr: "Vous êtes…" },
  topic: { en: "What is it about?", fr: "C'est à quel sujet?" },
  name: { en: "Your name", fr: "Votre nom" },
  email: { en: "Email", fr: "Courriel" },
  phone: { en: "Phone (optional)", fr: "Téléphone (facultatif)" },
  link: { en: "Link to the page or profile", fr: "Lien vers la page ou le profil" },
  message: { en: "Message", fr: "Message" },
  send: { en: "Send", fr: "Envoyer" },
  sending: { en: "Sending…", fr: "Envoi…" },
  done: { en: "Thanks! We got your message and usually reply by email within 2 business days.", fr: "Merci! Nous avons reçu votre message et répondons habituellement par courriel en 2 jours ouvrables." },
  close: { en: "Close", fr: "Fermer" },
} satisfies Record<string, Record<L, string>>;

export function ContactButton({ className = "", label = "Contact" }: { className?: string; label?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>{label}</button>
      {open && <ContactDialog onClose={() => setOpen(false)} />}
    </>
  );
}

export function ContactDialog({ onClose }: { onClose: () => void }) {
  const { lang: rawLang } = useLang();
  const lang: L = rawLang === "fr" ? "fr" : "en";
  const [role, setRole] = useState("");
  const [topic, setTopic] = useState("");
  const [details, setDetails] = useState<Record<string, string>>({});
  const [f, setF] = useState({ name: "", email: "", phone: "", message: "", website2: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const r = ROLES.find((x) => x.key === role);
  const topics = r ? [...r.topics, ...COMMON] : [];
  const isReport = topic === COMMON[0][0];

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (f.website2) return setSent(true); // hidden field only bots fill in
    setBusy(true);
    setError("");
    const fields = (r?.fields ?? []).map((x) => x.key).concat(isReport ? ["link"] : []);
    const res = await sendContactRequest({
      role, topic, name: f.name.trim(), email: f.email.trim(), phone: f.phone.trim(), message: f.message.trim(),
      details: Object.fromEntries(fields.filter((k) => details[k]?.trim()).map((k) => [k, details[k].trim()])),
      page: typeof window !== "undefined" ? window.location.pathname : "",
      lang,
    });
    setBusy(false);
    if (!res.ok) return setError(res.error);
    setSent(true);
  }

  const input = "input py-2.5";
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="contact-title" className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-[rgba(8,14,28,0.7)] p-3 sm:items-center sm:p-6" onClick={onClose}>
      <div className="relative my-6 w-full max-w-[560px] rounded-[18px] bg-ivory p-6 text-navy shadow-2xl sm:p-7" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} aria-label={T.close[lang]} className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full text-2xl text-navy hover:bg-parchment">×</button>
        <h2 id="contact-title" className="h-display pr-10 text-[28px]">{T.title[lang]}</h2>

        {sent ? (
          <div className="mt-4 flex flex-col gap-5">
            <p className="rounded-xl bg-success px-4 py-3 font-medium text-success-ink">{T.done[lang]}</p>
            <button type="button" onClick={onClose} className="self-end rounded-[10px] bg-navy px-5 py-3 font-bold text-white">{T.close[lang]}</button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-2 flex flex-col gap-4">
            <p className="text-[15px] text-slate">{T.intro[lang]}</p>

            <fieldset>
              <legend className="mb-2 text-sm font-bold">{T.who[lang]}</legend>
              <div className="flex flex-wrap gap-2">
                {ROLES.map((x) => (
                  <button key={x.key} type="button" aria-pressed={role === x.key} onClick={() => { setRole(x.key); setTopic(""); }}
                    className={`min-h-10 rounded-full border px-3.5 text-sm ${role === x.key ? "border-navy bg-brass-tint font-bold" : "border-line-strong bg-white"}`}>
                    {x[lang]}
                  </button>
                ))}
              </div>
            </fieldset>

            {r && (
              <>
                <label className="label">{T.topic[lang]}
                  <select required value={topic} onChange={(e) => setTopic(e.target.value)} className={input}>
                    <option value="" disabled>—</option>
                    {topics.map(([en, fr]) => <option key={en} value={en}>{lang === "fr" ? fr : en}</option>)}
                  </select>
                </label>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] items-start gap-3">
                  <label className="label">{T.name[lang]}<input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className={input} autoComplete="name" /></label>
                  <label className="label">{T.email[lang]}<input required type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} className={input} autoComplete="email" /></label>
                  {r.fields.map((x) => (
                    <label key={x.key} className="label">{x[lang]}
                      <input type={x.type ?? "text"} required={x.required} value={details[x.key] ?? ""} placeholder={x.placeholder} onChange={(e) => setDetails({ ...details, [x.key]: e.target.value })} className={input} />
                    </label>
                  ))}
                  {isReport && (
                    <label className="label">{T.link[lang]}<input type="url" value={details.link ?? ""} placeholder="https://www.showici.com/…" onChange={(e) => setDetails({ ...details, link: e.target.value })} className={input} /></label>
                  )}
                  <label className="label">{T.phone[lang]}<input type="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} className={input} autoComplete="tel" /></label>
                </div>

                <label className="label">{T.message[lang]}
                  <textarea required rows={4} maxLength={3000} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} className="input" />
                </label>
                {/* Honeypot: hidden from people, bots fill it in. */}
                <input tabIndex={-1} aria-hidden="true" autoComplete="off" value={f.website2} onChange={(e) => setF({ ...f, website2: e.target.value })} className="absolute left-[-9999px] h-0 w-0 opacity-0" name="website2" />

                {error && <p role="alert" className="rounded-xl bg-[#FBE5E2] px-4 py-3 text-sm font-medium text-[#8A1F17]">{error}</p>}
                <button type="submit" disabled={busy} className="self-end rounded-[10px] bg-navy px-6 py-3 font-bold text-white disabled:opacity-60">{busy ? T.sending[lang] : T.send[lang]}</button>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
