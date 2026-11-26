"use client";

import { useEffect, useState } from "react";
import Link from "@/components/Link";
import { Notice } from "@/components/form";
import { PillLink } from "@/components/sections";
import { FollowCard } from "@/components/Social";
import { insertRow } from "@/lib/actions";
import { useLang } from "@/lib/i18n";
import { label } from "@/lib/labels";
import { useRouter } from "@/lib/navigation";
import { getBrowserSupabase, supabaseEnabled } from "@/lib/supabase/client";

/* Values are saved in English (what performers filter on); labels follow the page language. */
const EVENT_TYPES: { value: string; icon: string }[] = [
  { value: "Quinceañera", icon: "M4 18h16l1-10-5 4-4-7-4 7-5-4z" },
  { value: "Birthday", icon: "M4 21h16v-8H4zM4 16h16M8 13V9M12 13V9M16 13V9M8 6v1M12 6v1M16 6v1" },
  { value: "Wedding", icon: "M9 9a5 5 0 1 0 0 10A5 5 0 0 0 9 9zM15 9a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM10 4l2 3 2-3" },
  { value: "House party", icon: "M3 11l9-8 9 8M5 10v10h14V10M10 20v-5h4v5" },
  { value: "Anniversary", icon: "M12 20s-8-5-8-11a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 6-8 11-8 11z" },
  { value: "Corporate", icon: "M3 8h18v12H3zM8 8V5h8v3M3 13h18" },
  { value: "Kids' party", icon: "M8 3a4 5 0 1 0 0 10A4 5 0 0 0 8 3zM16 5a4 5 0 1 0 0 10 4 5 0 0 0 0-10zM8 13l-1 8M16 15l1 6" },
  { value: "Other", icon: "M5 12h.01M12 12h.01M19 12h.01" },
];
const ACTS: { value: string; fr: string; en: string; icon: string }[] = [
  { value: "Band", fr: "Groupe", en: "Band", icon: "M14 4l6 6M17 7l-8 8a3 3 0 1 1-4-4l8-8M7 17l-3 3" },
  { value: "DJ", fr: "DJ", en: "DJ", icon: "M4 15v-3a8 8 0 0 1 16 0v3M4 15h3v5H4zM17 15h3v5h-3z" },
  { value: "Mariachi", fr: "Mariachi", en: "Mariachi", icon: "M3 15c3-2 15-2 18 0M7 15c0-5 2-9 5-9s5 4 5 9M12 6V4" },
  { value: "Solo singer", fr: "Chanteur solo", en: "Solo singer", icon: "M15 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM12 9l-8 9 2 2 9-8" },
  { value: "Magician", fr: "Magicien", en: "Magician", icon: "M7 10h10v10H7zM5 10h14M10 4l2-2 2 2" },
  { value: "Comedian", fr: "Humoriste", en: "Comedian", icon: "M5 4h14v7a7 7 0 0 1-14 0zM9 9h.01M15 9h.01M9 13c2 2 4 2 6 0" },
  { value: "Dancers", fr: "Danseurs", en: "Dancers", icon: "M13 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM9 21l3-7 3 3v4M7 10l4-2 4 3 3-1" },
];
const LENGTHS = [["1 hour", "1 heure"], ["2 hours", "2 heures"], ["3 hours", "3 heures"], ["4 hours +", "4 heures +"]];
const GUESTS = [["Under 25", "Moins de 25"], ["25 – 75", "25 – 75"], ["75 – 150", "75 – 150"], ["150+", "150 +"]];
const SETTINGS = [["Home", "Maison"], ["Rented hall", "Salle louée"], ["Restaurant", "Restaurant"], ["Outdoor", "Extérieur"]];
const LANGUAGES = [["Any", "Peu importe"], ["Français", "Français"], ["English", "English"], ["Español", "Español"]];
const BUDGETS = [["Under $300", "Moins de 300 $"], ["$300 – $600", "300 $ – 600 $"], ["$600 – $1,000", "600 $ – 1 000 $"], ["$1,000 – $2,000", "1 000 $ – 2 000 $"], ["$2,000+", "2 000 $ +"]];

const copy = {
  fr: {
    title: "Décrivez votre événement",
    intro: "Dites-nous ce que vous organisez et le type de talent que vous cherchez. Les artistes de votre région qui font ce genre d’événement verront votre demande et pourront vous écrire.",
    needAccount: "Un compte est nécessaire pour publier une demande, afin que les artistes puissent vous répondre en privé.",
    create: "Créer un compte", or: "ou", login: "se connecter",
    eventType: "Type d’événement", date: "Date de l’événement", time: "Heure de début", length: "Durée de la prestation",
    city: "Ville ou code postal", cityHint: "Ex. : Laval ou H2X 1Y4", cityNote: "Votre adresse exacte reste privée.",
    guests: "Nombre d’invités", setting: "Type de lieu", acts: "Type(s) d’artiste(s) recherché(s)", actsHint: "un ou plusieurs",
    style: "Style de musique", styleHint: "Ex. : latin, pop", language: "Langue de prestation", budget: "Budget", optional: "(optionnel)",
    note: "Détails supplémentaires", noteHint: "Ex. : groupe live pour la première heure, puis un DJ pour danser. Système de son requis.",
    privacyTitle: "Confidentialité et fonctionnement",
    privacy: ["Votre adresse exacte reste privée.", "Votre demande n’apparaît jamais publiquement : seuls les artistes inscrits qui correspondent à vos critères la voient.", "Le paiement est convenu directement entre vous et l’artiste choisi."],
    posting: "Publication…", post: "Publier ma demande",
    demo: "Mode démo : votre demande est valide. Connectez Supabase pour l’enregistrer pour vrai.",
    nextTitle: "Et ensuite?",
    steps: [
      ["Votre demande est envoyée aux artistes correspondants", "Les artistes de votre région qui font ce genre d’événement la reçoivent."],
      ["Les artistes intéressés vous écrivent", "Ils vous envoient leurs vidéos et un prix, directement sur ShowIci."],
      ["Comparez et choisissez", "Comparez, échangez avec eux et réservez celui qui vous plaît."],
    ],
    browse: "Parcourir les artistes", browseText: "Vous préférez chercher vous-même? Trouvez des artistes et écrivez-leur directement.",
  },
  en: {
    title: "Describe your event",
    intro: "Tell us what you’re planning and the kind of talent you’re looking for. Artists in your area who play this kind of event will see your request and can message you.",
    needAccount: "You need an account to post a request, so artists can reply to you privately.",
    create: "Create an account", or: "or", login: "log in",
    eventType: "Type of event", date: "Event date", time: "Start time", length: "Performance length",
    city: "City or postal code", cityHint: "e.g. Laval or H2X 1Y4", cityNote: "Your exact address stays private.",
    guests: "Number of guests", setting: "Setting", acts: "What are you looking for?", actsHint: "one or more",
    style: "Music style", styleHint: "e.g. Latin, pop", language: "Performance language", budget: "Budget", optional: "(optional)",
    note: "Tell artists more", noteHint: "e.g. Live band for the first hour, then a DJ for dancing. Sound system needed.",
    privacyTitle: "Privacy and how it works",
    privacy: ["Your exact address stays private.", "Your request is never shown publicly, only to signed-in artists who match it.", "Payment is agreed directly between you and the artist you choose."],
    posting: "Posting…", post: "Post my request",
    demo: "Demo mode: your request looks good. Connect Supabase to save it for real.",
    nextTitle: "What happens next?",
    steps: [
      ["Your request goes to matching artists", "Artists in your area who play this kind of event receive it."],
      ["Interested artists message you", "They send you their videos and a price, right on ShowIci."],
      ["Compare and choose", "Compare, chat and book the one you like."],
    ],
    browse: "Browse artists", browseText: "Prefer to look yourself? Find artists and message them directly.",
  },
};

const tile = (on: boolean) =>
  `relative flex min-h-[84px] flex-col items-center justify-center gap-2 rounded-xl px-1.5 py-2.5 text-center text-[13px] font-semibold text-ink sm:text-sm ${
    on ? "border-2 border-accent bg-accent-tint" : "border border-line-strong bg-white hover:border-ink"
  }`;

function Check() {
  return (
    <span aria-hidden="true" className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="m5 12 5 5 9-10" /></svg>
    </span>
  );
}

function Icon({ d, size = 26 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export function RequestForm() {
  const router = useRouter();
  const { lang } = useLang();
  const c = copy[lang];
  const fr = lang === "fr";
  const [type, setType] = useState("Wedding");
  const [wants, setWants] = useState<string[]>(["Band"]);
  const [status, setStatus] = useState<{ kind: "ok" | "error"; msg: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [signedIn, setSignedIn] = useState<boolean | null>(supabaseEnabled ? null : true);

  useEffect(() => {
    const sb = getBrowserSupabase();
    if (!sb) return;
    sb.auth.getUser().then(({ data }) => setSignedIn(Boolean(data.user)));
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    const res = await insertRow("event_requests", {
      event_type: type,
      event_date: f.get("date"),
      start_time: f.get("time"),
      length: f.get("length"),
      city: f.get("city"),
      guests: f.get("guests"),
      setting: f.get("setting"),
      wants,
      style: f.get("style"),
      language: f.get("language"),
      budget: f.get("budget"),
      note: f.get("note"),
    });
    setBusy(false);
    if (!res.ok) return setStatus({ kind: "error", msg: res.error });
    if (res.demo) return setStatus({ kind: "ok", msg: c.demo });
    router.push("/dashboard/planner");
    router.refresh();
  }

  const toggleAct = (v: string) => setWants((cur) => (cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]));
  const options = (list: string[][]) => list.map(([en, frLabel]) => <option key={en} value={en}>{fr ? frLabel : en}</option>);
  const req = <span className="text-accent"> *</span>;

  return (
    <div className="flex flex-wrap overflow-hidden rounded-2xl bg-[#FAF8F5] shadow-[0_20px_44px_rgba(0,0,0,0.35)]">
      <form onSubmit={submit} className="flex min-w-0 flex-[999_1_620px] flex-col gap-6 p-6 text-ink sm:p-9">
        <div>
          <h2 className="h-display text-[28px] sm:text-[32px]">{c.title}</h2>
          <p className="mt-2 max-w-[640px] text-[15px] leading-relaxed text-slate">{c.intro}</p>
        </div>

        {signedIn === false && (
          <Notice kind="info">
            {c.needAccount} <Link href="/signup?role=planner" className="font-bold">{c.create}</Link> {c.or} <Link href="/login?next=%2Frequest" className="font-bold">{c.login}</Link>.
          </Notice>
        )}

        <fieldset>
          <legend className="mb-2.5 text-sm font-bold">{c.eventType}{req}</legend>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {EVENT_TYPES.map((t) => (
              <button key={t.value} type="button" aria-pressed={type === t.value} onClick={() => setType(t.value)} className={tile(type === t.value)}>
                <Icon d={t.icon} />
                {label(t.value, lang)}
                {type === t.value && <Check />}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-3">
          <label className="label"><span>{c.date}{req}</span><input name="date" type="date" required min={new Date().toISOString().slice(0, 10)} className="input" /></label>
          <label className="label"><span>{c.time}{req}</span><input name="time" type="time" defaultValue="19:00" className="input" /></label>
          <label className="label"><span>{c.length}{req}</span><select name="length" className="input" defaultValue="2 hours">{options(LENGTHS)}</select></label>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="label"><span>{c.city}{req}</span><input name="city" required className="input" placeholder={c.cityHint} /><span className="hint">{c.cityNote}</span></label>
          <label className="label"><span>{c.guests}{req}</span><select name="guests" className="input" defaultValue="75 – 150">{options(GUESTS)}</select></label>
          <label className="label"><span>{c.setting}{req}</span><select name="setting" className="input">{options(SETTINGS)}</select></label>
        </div>

        <fieldset>
          <legend className="mb-2.5 text-sm font-bold">{c.acts}{req} <span className="font-normal text-muted">— {c.actsHint}</span></legend>
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-7">
            {ACTS.map((a) => (
              <button key={a.value} type="button" aria-pressed={wants.includes(a.value)} onClick={() => toggleAct(a.value)} className={tile(wants.includes(a.value))}>
                <Icon d={a.icon} size={24} />
                {a[lang]}
                {wants.includes(a.value) && <Check />}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-3">
          <label className="label">{c.style}<input name="style" className="input" placeholder={c.styleHint} /></label>
          <label className="label">{c.language}<select name="language" className="input">{options(LANGUAGES)}</select></label>
          <label className="label">
            <span>{c.budget} <span className="font-normal text-muted">{c.optional}</span></span>
            <select name="budget" className="input" defaultValue="$600 – $1,000">{options(BUDGETS)}</select>
          </label>
        </div>
        <label className="label">{c.note}<textarea name="note" rows={3} maxLength={1000} className="input" placeholder={c.noteHint} /></label>

        <div className="flex gap-3.5 rounded-xl bg-[#EFECE7] px-4 py-4">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="flex-none"><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7.5v.5" /></svg>
          <div>
            <p className="font-display text-sm font-bold">{c.privacyTitle}</p>
            <ul className="mt-1.5 list-disc pl-5 text-[13px] leading-relaxed text-graphite">
              {c.privacy.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
        </div>

        {status && <Notice kind={status.kind}>{status.msg}</Notice>}
        {status?.kind === "ok" && <FollowCard context="thanks" />}
        <div>
          <button type="submit" disabled={busy || signedIn === false} className="inline-flex min-h-[54px] items-center gap-3 rounded-full bg-accent px-9 font-display text-[17px] font-extrabold text-white hover:bg-accent-dark disabled:opacity-50">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round" aria-hidden="true"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" /></svg>
            {busy ? c.posting : c.post}
          </button>
        </div>
      </form>

      <aside className="min-w-0 flex-[1_1_320px] p-3.5 sm:pl-0">
        <div className="flex h-full flex-col overflow-hidden rounded-xl bg-ink text-white">
          <div className="h-48 bg-[image:linear-gradient(0deg,#0B0B0D_0%,rgba(11,11,13,0)_45%),url(/images/stage-dance.webp)] bg-cover bg-center" role="presentation" />
          <div className="flex flex-1 flex-col px-6 pb-7">
            <h2 className="h-display mb-6 text-[30px]">{c.nextTitle}</h2>
            <ol className="flex flex-col gap-6">
              {c.steps.map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-accent font-display text-lg font-extrabold">{i + 1}</span>
                  <span>
                    <strong className="block font-display leading-snug">{t}</strong>
                    <span className="mt-1 block text-sm leading-relaxed text-on-dark">{d}</span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-auto border-t border-white/15 pt-6">
              <PillLink href="/performers" tone="outline">{c.browse} →</PillLink>
              <p className="mt-3 text-sm text-on-dark">{c.browseText}</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
