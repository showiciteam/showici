"use client";

import { useEffect, useState } from "react";
import Link from "@/components/Link";
import { Notice } from "@/components/form";
import { PageHero } from "@/components/sections";
import { FollowCard } from "@/components/Social";
import { signUp } from "@/lib/actions";
import { useLang } from "@/lib/i18n";
import { useRouter } from "@/lib/navigation";

type Role = "performer" | "venue" | "planner";
const ROLES: Role[] = ["performer", "venue", "planner"];
const next: Record<Role, string> = { venue: "/register/venue", planner: "/request", performer: "/register/performer" };

const ICON: Record<Role, React.ReactNode> = {
  performer: <path d="M9 2a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM4 21v-5a5 5 0 0 1 10 0M13 15l7-7M12 17a2.5 2.5 0 1 0 0 .1" />,
  venue: <path d="M3 9h18l-2-5H5zM4 9v11h16V9M9 20v-6h6v6M8 9v2M12 9v2M16 9v2" />,
  planner: <path d="M3 5h18v16H3zM3 10h18M8 3v4M16 3v4M12 12l1.2 2.4 2.6.4-1.9 1.8.5 2.6-2.4-1.3-2.4 1.3.5-2.6-1.9-1.8 2.6-.4z" />,
};

const copy = {
  fr: {
    title: "Rejoignez",
    accent: "la scène d’ici.",
    lead: "Créez votre compte et faites partie d’une communauté qui fait rayonner le talent local au Québec.",
    pick: "Je suis…",
    roles: {
      performer: { title: "Je suis un artiste", sub: "Groupe, DJ, humoriste, magicien ou tout autre talent de scène.", word: "d’artiste", cta: "Créer mon profil d’artiste", intro: "Présentez votre projet, faites-vous découvrir et recevez des demandes des salles et des organisateurs d’événements." },
      venue: { title: "Je suis une salle", sub: "Pub, bar, club, microbrasserie ou salle d’événements.", word: "salle", cta: "Créer mon compte salle", intro: "Ajoutez votre lieu, publiez vos spectacles et trouvez des artistes d’ici pour vos soirées." },
      planner: { title: "J’organise un événement privé", sub: "Mariage, anniversaire, événement corporatif ou fête.", word: "organisateur", cta: "Créer mon compte", intro: "Publiez votre demande et recevez des propositions d’artistes pour votre événement." },
    },
    create: "Créez votre compte",
    venueName: "Nom de la salle", venueNameHint: "Ex. : Le Vieux Dublin", address: "Adresse", addressHint: "Rue, ville", capacity: "Capacité",
    capacities: ["Moins de 50", "50 – 150", "150 – 300", "300 +"],
    actName: "Nom d’artiste ou de groupe", actNameHint: "Ex. : [Nom du groupe]", actType: "Type de prestation",
    actTypes: ["Groupe · reprises", "Groupe · compositions", "Musicien solo", "DJ", "Humour", "Magicien", "Autre"],
    eventType: "Type d’événement", eventTypes: ["Quinceañera", "Anniversaire", "Mariage", "Fête privée", "Corporatif", "Autre"], city: "Ville", cityHint: "Ex. : Laval",
    name: "Votre nom", email: "Courriel", emailHint: "vous@exemple.com", password: "Mot de passe", passwordHint: "Au moins 8 caractères",
    agree: <>J’accepte les <a href="/terms" target="_blank" rel="noopener">Conditions</a> et la <a href="/privacy" target="_blank" rel="noopener">Politique de confidentialité</a>. Mes coordonnées restent privées : on me joint par la messagerie ShowIci.</>,
    creating: "Création…",
    haveAccount: "Vous avez déjà un compte?",
    login: "Se connecter",
    whyTitle: "Pourquoi s’inscrire sur",
    why: [
      ["Plus de visibilité", "Faites découvrir votre talent ou votre salle partout au Québec."],
      ["Des occasions concrètes", "Recevez des demandes qui correspondent à votre style et à votre région."],
      ["Une communauté locale", "Un réseau d’artistes, de salles et de passionnés de la scène d’ici."],
      ["Simple et privé", "Les échanges passent par la messagerie ShowIci. Vos coordonnées restent privées."],
    ],
    inbox: "Vérifiez votre boîte de réception",
    inboxText: (email: string) => <>Nous avons envoyé un lien de confirmation à <strong>{email}</strong>. Cliquez dessus pour activer votre compte et continuer.</>,
    spam: "Rien après quelques minutes? Vérifiez vos courriels indésirables.",
    backLogin: "Retour à la connexion",
  },
  en: {
    title: "Join",
    accent: "the local scene.",
    lead: "Create your account and be part of a community that lights up local talent across Québec.",
    pick: "I am…",
    roles: {
      performer: { title: "I’m an artist", sub: "Band, DJ, comedian, magician or any other stage act.", word: "artist", cta: "Create my artist profile", intro: "Show your project, get discovered and receive requests from venues and event planners." },
      venue: { title: "I run a venue", sub: "Pub, bar, club, brewery or event hall.", word: "venue", cta: "Create venue account", intro: "Add your venue, post your shows and find local artists for your nights." },
      planner: { title: "I’m planning a private event", sub: "Wedding, birthday, office party or celebration.", word: "planner", cta: "Create account", intro: "Post your request and get offers from artists for your event." },
    },
    create: "Create your account",
    venueName: "Venue name", venueNameHint: "e.g. Le Vieux Dublin", address: "Address", addressHint: "Street, city", capacity: "Capacity",
    capacities: ["Under 50", "50–150", "150–300", "300+"],
    actName: "Act or stage name", actNameHint: "e.g. [Band name]", actType: "Type of act",
    actTypes: ["Band · covers", "Band · originals", "Solo musician", "DJ", "Stand-up comedy", "Magician", "Other"],
    eventType: "Type of event", eventTypes: ["Quinceañera", "Birthday", "Wedding", "Private party", "Corporate", "Other"], city: "City", cityHint: "e.g. Laval",
    name: "Your name", email: "Email", emailHint: "you@example.com", password: "Password", passwordHint: "At least 8 characters",
    agree: <>I agree to the <a href="/en/terms" target="_blank" rel="noopener">Terms</a> and <a href="/en/privacy" target="_blank" rel="noopener">Privacy policy</a>. Contact details stay private: people reach me through ShowIci messages.</>,
    creating: "Creating…",
    haveAccount: "Already have an account?",
    login: "Log in",
    whyTitle: "Why join",
    why: [
      ["More visibility", "Get your act or venue seen across Québec."],
      ["Real opportunities", "Get requests that match your style and your region."],
      ["A local community", "A network of artists, venues and people who love the local scene."],
      ["Simple and private", "Conversations happen in ShowIci messages. Your contact details stay private."],
    ],
    inbox: "Check your inbox",
    inboxText: (email: string) => <>We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account and continue.</>,
    spam: "Nothing after a few minutes? Check your spam folder.",
    backLogin: "Back to log in",
  },
};

export default function SignupPage() {
  const router = useRouter();
  const { lang } = useLang();
  const c = copy[lang];
  const [role, setRole] = useState<Role>("performer");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState("");
  // ?role=venue&next=/venues/…/claim: preselect the account type and come back to that page after sign-up.
  const [nextOverride, setNextOverride] = useState<string | null>(null);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const r = q.get("role");
    if (r === "venue" || r === "planner" || r === "performer") setRole(r);
    const n = q.get("next");
    if (n && n.startsWith("/") && !n.startsWith("//")) setNextOverride(n);
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    setError("");
    const email = String(f.get("email"));
    const goTo = nextOverride ?? next[role];
    const res = await signUp(email, String(f.get("password")), role, String(f.get("name")), goTo);
    setBusy(false);
    if (!res.ok) return setError(res.error);
    // Email confirmation is on: the link in the email logs them in and continues to the next step.
    if (res.needsConfirm) return setConfirmEmail(email);
    router.push(goTo);
    router.refresh();
  }

  const r = c.roles[role];

  return (
    <>
      <PageHero image="/images/stage-singer.webp" title={c.title} accent={c.accent} lead={c.lead} bottomSpace="pb-12">
        <div role="radiogroup" aria-label={c.pick} className="mt-9 grid gap-4 md:grid-cols-3">
          {ROLES.map((id) => (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={role === id}
              onClick={() => setRole(id)}
              className={`relative flex flex-col items-center gap-2.5 rounded-2xl bg-ink-soft px-6 py-6 text-center text-white ${role === id ? "border-2 border-accent shadow-[0_0_0_4px_rgba(215,20,31,0.25)]" : "border border-white/20 hover:border-white/50"}`}
            >
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICON[id]}</svg>
              <span className="font-display text-xl font-extrabold">{c.roles[id].title}</span>
              <span className="text-sm leading-snug text-on-dark">{c.roles[id].sub}</span>
              {role === id && (
                <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-accent" aria-hidden="true">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="m5 12 5 5 9-10" /></svg>
                </span>
              )}
            </button>
          ))}
        </div>
      </PageHero>

      <section className="bg-sand">
        <div className="wrap flex flex-wrap gap-10 py-12">
          {confirmEmail ? (
            <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-4">
              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <h1 className="h-display text-[32px]">{c.inbox}</h1>
                <p className="mt-3 text-slate">{c.inboxText(confirmEmail)}</p>
                <p className="hint mt-2">{c.spam}</p>
                <Link href="/login" className="mt-4 inline-block font-bold">{c.backLogin}</Link>
              </div>
              <FollowCard context="thanks" />
            </div>
          ) : (
            <form onSubmit={submit} className="flex min-w-0 flex-[999_1_560px] flex-col gap-5 rounded-2xl bg-white p-6 shadow-sm sm:p-9">
              <div>
                <h2 className="h-display text-[28px] sm:text-[34px]">{c.create} <span className="text-accent">{r.word}</span></h2>
                <p className="mt-2 text-slate">{r.intro}</p>
              </div>

              {role === "venue" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="label">{c.venueName}<input name="venueName" className="input" placeholder={c.venueNameHint} /></label>
                  <label className="label">{c.capacity}<select className="input">{c.capacities.map((x) => <option key={x}>{x}</option>)}</select></label>
                  <label className="label sm:col-span-2">{c.address}<input className="input" placeholder={c.addressHint} /></label>
                </div>
              )}
              {role === "planner" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="label">{c.eventType}<select className="input">{c.eventTypes.map((x) => <option key={x}>{x}</option>)}</select></label>
                  <label className="label">{c.city}<input className="input" placeholder={c.cityHint} /></label>
                </div>
              )}
              {role === "performer" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="label">{c.actName}<input className="input" placeholder={c.actNameHint} /></label>
                  <label className="label">{c.actType}<select className="input">{c.actTypes.map((x) => <option key={x}>{x}</option>)}</select></label>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="label">{c.name}<input name="name" required className="input" autoComplete="name" /></label>
                <label className="label">{c.email}<input name="email" type="email" required className="input" placeholder={c.emailHint} autoComplete="email" /></label>
                <label className="label sm:col-span-2">{c.password}<input name="password" type="password" required minLength={8} className="input" placeholder={c.passwordHint} autoComplete="new-password" /></label>
              </div>
              <label className="flex items-start gap-2.5 text-sm leading-snug text-slate">
                <input type="checkbox" required className="mt-0.5 h-[18px] w-[18px] flex-none accent-accent" />
                <span>{c.agree}</span>
              </label>
              {error && <Notice kind="error">{error}</Notice>}
              <button type="submit" disabled={busy} className="mx-auto min-h-[54px] w-full max-w-[420px] rounded-full bg-accent font-display text-[17px] font-bold text-white hover:bg-accent-dark disabled:opacity-60">
                {busy ? c.creating : r.cta}
              </button>
              <p className="text-center text-[15px] text-muted">{c.haveAccount} <Link href="/login" className="font-bold">{c.login}</Link></p>
            </form>
          )}

          <aside className="flex-[1_1_300px] md:border-l md:border-line-strong md:pl-10">
            <h2 className="h-display mb-6 text-[28px] leading-tight">{c.whyTitle} <span className="text-accent">ShowIci</span>?</h2>
            <ul className="flex flex-col gap-5">
              {c.why.map(([t, d]) => (
                <li key={t} className="flex gap-3.5">
                  <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true" className="mt-0.5 flex-none"><circle cx="12" cy="12" r="10" fill="#D7141F" /><path d="m7.5 12 3 3 6-6" stroke="#fff" strokeWidth="2.4" fill="none" /></svg>
                  <span>
                    <strong className="block font-display text-[17px]">{t}</strong>
                    <span className="text-sm text-slate">{d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
