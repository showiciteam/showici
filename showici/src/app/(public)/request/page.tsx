"use client";

import Link from "@/components/LocalLink";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChipGroup, Notice } from "@/components/form";
import { Button } from "@/components/ui";
import { insertRow } from "@/lib/actions";
import { getBrowserSupabase, supabaseEnabled } from "@/lib/supabase/client";
import { FollowCard } from "@/components/Social";
import { useLang } from "@/lib/i18n";
import { label } from "@/lib/labels";

export default function EventRequestPage() {
  const router = useRouter();
  const { lang, tr } = useLang();
  const L = (o: string) => label(lang, o);
  const opt = (en: string, fr: string) => <option value={en}>{tr(en, fr)}</option>;
  const [type, setType] = useState(["Quinceañera"]);
  const [wants, setWants] = useState(["Band", "DJ"]);
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
      event_type: type[0],
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
    if (res.demo) return setStatus({ kind: "ok", msg: tr("Demo mode: your request looks good. Connect Supabase to save it for real.", "Mode démo : votre demande est correcte. Connectez Supabase pour l'enregistrer pour vrai.") });
    router.push("/dashboard/planner");
    router.refresh();
  }

  return (
    <div className="bg-parchment">
      <div className="wrap pb-[72px] pt-9">
        <p className="eyebrow mb-1.5 text-[13px]">{tr("Private event", "Événement privé")}</p>
        <h1 className="h-display text-[44px]">{tr("Find entertainment for your event", "Trouvez des artistes pour votre événement")}</h1>
        <p className="mb-8 mt-2.5 max-w-[720px] text-lg text-slate">{tr("Describe your event once. Performers in your area who play this kind of event can see it and message you.", "Décrivez votre événement une seule fois. Les artistes de votre région qui font ce genre d'événement peuvent le voir et vous écrire.")}</p>

        {signedIn === false && (
          <div className="mb-6 max-w-[720px]">
            <Notice kind="info">
              {tr("You need an account to post a request, so performers can reply to you privately.", "Il faut un compte pour publier une demande, afin que les artistes puissent vous répondre en privé.")}{" "}
              <Link href="/signup" className="font-bold">{tr("Create an account", "Créer un compte")}</Link> {tr("or", "ou")} <Link href="/login?next=%2Frequest" className="font-bold">{tr("log in", "se connecter")}</Link>.
            </Notice>
          </div>
        )}

        <div className="flex flex-wrap items-start gap-7">
          <form onSubmit={submit} className="card flex min-w-0 flex-[999_1_600px] flex-col gap-[22px] p-7">
            <ChipGroup legend={tr("Type of event", "Type d'événement")} labelOf={L} single options={["Quinceañera", "Birthday", "Wedding", "House party", "Anniversary", "Corporate", "Kids' party", "Other"]} value={type} onChange={setType} />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] items-start gap-3.5">
              <label className="label">{tr("Date", "Date")}<input name="date" type="date" required min={new Date().toISOString().slice(0, 10)} className="input" /></label>
              <label className="label">{tr("Start time", "Heure de début")}<input name="time" type="time" defaultValue="19:00" className="input" /></label>
              <label className="label">{tr("Performance length", "Durée de la prestation")}<select name="length" className="input" defaultValue="2 hours">{opt("1 hour", "1 heure")}{opt("2 hours", "2 heures")}{opt("3 hours", "3 heures")}{opt("4 hours +", "4 heures et +")}</select></label>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] items-start gap-3.5">
              <label className="label">{tr("City or postal code", "Ville ou code postal")}<input name="city" required className="input" placeholder={tr("e.g. Laval", "p. ex. Laval")} /><span className="hint">{tr("Your exact address stays private.", "Votre adresse exacte reste privée.")}</span></label>
              <label className="label">{tr("Number of guests", "Nombre d'invités")}<select name="guests" className="input" defaultValue="75 – 150">{opt("Under 25", "Moins de 25")}<option>25 – 75</option><option>75 – 150</option><option>150+</option></select></label>
              <label className="label">{tr("Setting", "Lieu")}<select name="setting" className="input">{opt("Home", "Maison")}{opt("Rented hall", "Salle louée")}{opt("Restaurant", "Restaurant")}{opt("Outdoor", "Extérieur")}</select></label>
            </div>
            <ChipGroup legend={tr("What are you looking for?", "Que recherchez-vous?")} hint={tr("Choose one or more", "Un ou plusieurs choix")} labelOf={L} options={["Band", "DJ", "Mariachi", "Solo singer", "Magician", "Comedian", "Dancers"]} value={wants} onChange={setWants} />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] items-start gap-3.5">
              <label className="label">{tr("Music style", "Style musical")}<input name="style" className="input" placeholder={tr("e.g. Latin, pop", "p. ex. latino, pop")} /></label>
              <label className="label">{tr("Language", "Langue")}<select name="language" className="input">{opt("Any", "Peu importe")}{opt("Français", "Français")}{opt("English", "Anglais")}{opt("Español", "Espagnol")}</select></label>
              <label className="label">{tr("Budget", "Budget")}<select name="budget" className="input" defaultValue="$600 – $1,000">{opt("Under $300", "Moins de 300 $")}<option>$300 – $600</option><option>$600 – $1,000</option><option>$1,000 – $2,000</option><option>$2,000+</option></select><span className="hint">{tr("Helps performers reply with fitting offers", "Aide les artistes à vous faire des offres adaptées")}</span></label>
            </div>
            <label className="label">{tr("Tell performers more", "Dites-en plus aux artistes")}<textarea name="note" rows={4} className="input" placeholder={tr("e.g. Live band for the first hour, then a DJ for dancing. Sound system needed.", "p. ex. Groupe live la première heure, puis un DJ pour danser. Système de son requis.")} /></label>
            <div className="flex items-start gap-2.5 rounded-xl bg-brass-tint px-4 py-3.5 text-sm text-ink-2">
              <span aria-hidden="true">🔒</span>
              <span>{tr("Your request is private. It's never shown on public listings, only to signed-in performers who match it. Payment is agreed directly between you and the performer.", "Votre demande est privée. Elle n'est jamais affichée publiquement, seulement aux artistes connectés qui y correspondent. Le paiement se règle directement entre vous et l'artiste.")}</span>
            </div>
            {status && <Notice kind={status.kind}>{status.msg}</Notice>}
            {status?.kind === "ok" && <FollowCard context="thanks" />}
            <div className="flex flex-wrap justify-end gap-2.5">
              <Button type="submit" disabled={busy || signedIn === false} className="px-7">{busy ? tr("Posting…", "Publication…") : tr("Post my request", "Publier ma demande")}</Button>
            </div>
          </form>

          <aside className="flex max-w-[360px] flex-[1_1_280px] flex-col gap-4">
            <div className="card flex flex-col gap-4 p-[22px]">
              <h2 className="h-display text-xl">{tr("What happens next", "La suite")}</h2>
              {[tr("Performers within reach who play this kind of event get your request.", "Les artistes à proximité qui font ce genre d'événement reçoivent votre demande."), tr("Interested ones message you with videos and a price.", "Ceux qui sont intéressés vous écrivent avec des vidéos et un prix."), tr("You compare, chat and book the one you like.", "Vous comparez, discutez et réservez celui qui vous plaît.")].map((t, i) => (
                <div key={t} className="flex gap-3"><span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-brass-tint font-extrabold text-navy-deep">{i + 1}</span><span className="text-ink-2">{t}</span></div>
              ))}
            </div>
            <div className="card flex flex-col gap-2.5 p-[22px]">
              <strong>{tr("Prefer to browse?", "Vous préférez chercher vous-même?")}</strong>
              <span className="text-[15px] text-slate">{tr("You can also search performers yourself and message them directly.", "Vous pouvez aussi chercher des artistes et leur écrire directement.")}</span>
              <Button href="/performers" variant="secondary">{tr("Browse performers", "Parcourir les artistes")}</Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
