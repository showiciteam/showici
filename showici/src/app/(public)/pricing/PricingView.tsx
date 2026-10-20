"use client";

import { Button } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import { ContactButton } from "@/components/ContactDialog";

type L = "en" | "fr";
type Plan = { who: string; sub: string; features: string[]; cta: string };
type Faq = [string, string];
type Copy = {
  badge: string; title: string; lede: string; free: string; month: string; plans: Plan[];
  note: string; faqTitle: string; groups: { h: string; items: Faq[] }[]; moreQ: string; moreA: string; contact: string;
};

/** Everything is free during launch. Text lives here so it can be edited without touching the layout. */
const COPY: Record<L, Copy> = {
  en: {
    badge: "Launch offer across Québec",
    title: "Everything is free. Zero commission.",
    lede: "Every feature, for every venue, performer and event planner, at no cost while we launch. You keep 100% of what you agree on.",
    free: "Free",
    month: "/ month",
    plans: [
      { who: "Performers", sub: "Bands, DJs, comedians, magicians and more", cta: "Create my profile", features: ["Full profile with photos, videos, cover and logo", "Unlimited contacts with venues and planners", "See every event request", "Booking requests you accept or decline", "Get found on the map and in search"] },
      { who: "Venues", sub: "Pubs, bars, restaurants and halls", cta: "List my venue", features: ["Venue page with photos and details", "Post unlimited upcoming shows", "Unlimited contacts with performers", "Every search filter", "Shows listed on the public calendar"] },
      { who: "Event planners", sub: "Weddings, birthdays, office parties", cta: "Post an event request", features: ["Post event requests", "Browse and message performers", "Unlimited contacts", "Your exact address stays private", "No fees, now or later"] },
    ],
    note: "No credit card. No trial that runs out. If we ever add paid options, we'll announce them at least 30 days ahead, and you'll never be charged unless you choose a paid plan.",
    faqTitle: "Questions",
    groups: [
      { h: "Pricing", items: [
        ["Is ShowIci really free?", "Yes. During our launch in Québec, every feature is free for everyone: no subscription, no credit card and no limit on how many people you can contact."],
        ["Will it stay free?", "Event planners will always use ShowIci for free. We may add optional paid plans for venues and performers later. If we do, we'll post the prices and what's included at least 30 days in advance, and you'll never be charged unless you choose a paid plan yourself."],
        ["Does ShowIci take a commission on bookings?", "No. You agree on the fee and payment directly with each other. ShowIci only connects you, and we never take a cut."],
        ["Do I need a credit card to sign up?", "No. You only need an email address."],
      ] },
      { h: "Bookings and payment", items: [
        ["How do I pay a performer?", "Directly, the way you both agree: e-transfer, cash, cheque or invoice. Fees, deposits and cancellations are between you and the performer. Put the important details in writing."],
        ["How does a booking request work?", "A venue or planner sends a request for a date. The performer accepts or declines it from their dashboard, and you both get a message so you can finalize the details."],
        ["What counts as a contact?", "Starting a new conversation with someone. During the launch, contacts are unlimited, and replying in an existing conversation is always free."],
        ["Why are phone numbers hidden in messages?", "To protect everyone's privacy until both sides are ready. Phone numbers and email addresses typed into messages are hidden automatically, so keep the conversation in ShowIci until you've agreed to work together."],
      ] },
      { h: "Accounts", items: [
        ["Who can join?", "Venues, performers and event planners anywhere in Québec, aged 18 or older. We're starting in Greater Montréal, and you can search Québec City, Gatineau, Sherbrooke and every other region too."],
        ["What kinds of acts are on ShowIci?", "Bands, DJs, solo musicians, mariachis, comedians, magicians, dancers and other live acts, for venues and private events."],
        ["I'm planning a quinceañera. Do I pay?", "No. Posting event requests and messaging performers is free for event planners."],
        ["Is ShowIci available in French?", "Yes. Use the FR / EN switch at the top of any page."],
        ["How do I close my account?", "Write to us with the Contact link and we'll close it. Your profile and listings are deleted or anonymized within 30 days, as described in our privacy policy."],
      ] },
    ],
    moreQ: "Still have a question?",
    moreA: "We usually reply by email within 2 business days.",
    contact: "Contact us",
  },
  fr: {
    badge: "Offre de lancement partout au Québec",
    title: "Tout est gratuit. Aucune commission.",
    lede: "Toutes les fonctions, pour toutes les salles, tous les artistes et tous les organisateurs, sans frais pendant notre lancement. Vous gardez 100 % de ce que vous convenez.",
    free: "Gratuit",
    month: "/ mois",
    plans: [
      { who: "Artistes", sub: "Groupes, DJ, humoristes, magiciens et plus", cta: "Créer mon profil", features: ["Profil complet avec photos, vidéos, bannière et logo", "Contacts illimités avec les salles et organisateurs", "Accès à toutes les demandes d'événements", "Demandes de réservation à accepter ou refuser", "Visible sur la carte et dans la recherche"] },
      { who: "Salles", sub: "Pubs, bars, restaurants et salles", cta: "Inscrire ma salle", features: ["Page de salle avec photos et détails", "Spectacles à venir illimités", "Contacts illimités avec les artistes", "Tous les filtres de recherche", "Spectacles affichés au calendrier public"] },
      { who: "Organisateurs", sub: "Mariages, anniversaires, fêtes de bureau", cta: "Publier une demande", features: ["Demandes d'événements", "Recherche et messages aux artistes", "Contacts illimités", "Votre adresse exacte reste privée", "Aucuns frais, maintenant ou plus tard"] },
    ],
    note: "Aucune carte de crédit. Aucun essai qui expire. Si nous ajoutons un jour des options payantes, nous les annoncerons au moins 30 jours à l'avance, et vous ne serez jamais facturé sans avoir choisi un forfait payant.",
    faqTitle: "Questions",
    groups: [
      { h: "Prix", items: [
        ["ShowIci est-il vraiment gratuit?", "Oui. Pendant notre lancement au Québec, toutes les fonctions sont gratuites pour tout le monde : aucun abonnement, aucune carte de crédit et aucune limite de contacts."],
        ["Est-ce que ça restera gratuit?", "Les organisateurs d'événements utiliseront toujours ShowIci gratuitement. Nous pourrions ajouter plus tard des forfaits payants facultatifs pour les salles et les artistes. Le cas échéant, nous publierons les prix et leur contenu au moins 30 jours à l'avance, et vous ne serez jamais facturé sans avoir choisi vous-même un forfait payant."],
        ["ShowIci prend-il une commission sur les réservations?", "Non. Vous convenez du cachet et du paiement directement entre vous. ShowIci ne fait que vous mettre en contact et ne prend jamais de pourcentage."],
        ["Faut-il une carte de crédit pour s'inscrire?", "Non. Une adresse courriel suffit."],
      ] },
      { h: "Réservations et paiement", items: [
        ["Comment payer un artiste?", "Directement, comme vous l'aurez convenu : virement Interac, comptant, chèque ou facture. Le cachet, le dépôt et les annulations se règlent entre vous et l'artiste. Mettez les détails importants par écrit."],
        ["Comment fonctionne une demande de réservation?", "Une salle ou un organisateur envoie une demande pour une date. L'artiste l'accepte ou la refuse dans son tableau de bord, et vous recevez tous deux un message pour finaliser les détails."],
        ["Qu'est-ce qu'un contact?", "Le fait d'entamer une nouvelle conversation avec quelqu'un. Pendant le lancement, les contacts sont illimités, et répondre dans une conversation existante est toujours gratuit."],
        ["Pourquoi les numéros de téléphone sont-ils masqués?", "Pour protéger la vie privée de chacun jusqu'à ce que les deux parties soient prêtes. Les numéros et courriels écrits dans les messages sont masqués automatiquement : gardez la conversation dans ShowIci jusqu'à ce que vous soyez d'accord pour travailler ensemble."],
      ] },
      { h: "Comptes", items: [
        ["Qui peut s'inscrire?", "Les salles, artistes et organisateurs d'événements de partout au Québec, âgés de 18 ans ou plus. Nous commençons par le Grand Montréal, et vous pouvez aussi chercher à Québec, Gatineau, Sherbrooke et dans toutes les autres régions."],
        ["Quels types d'artistes trouve-t-on sur ShowIci?", "Groupes, DJ, musiciens solo, mariachis, humoristes, magiciens, danseurs et autres numéros sur scène, pour les salles et les événements privés."],
        ["J'organise une quinceañera. Est-ce que je paie?", "Non. Publier des demandes et écrire aux artistes est gratuit pour les organisateurs."],
        ["ShowIci est-il offert en anglais?", "Oui. Utilisez le bouton FR / EN en haut de chaque page."],
        ["Comment fermer mon compte?", "Écrivez-nous par le lien Contact et nous le fermerons. Votre profil et vos fiches sont supprimés ou anonymisés dans les 30 jours, comme le prévoit notre politique de confidentialité."],
      ] },
    ],
    moreQ: "Une autre question?",
    moreA: "Nous répondons habituellement par courriel en 2 jours ouvrables.",
    contact: "Nous écrire",
  },
};

const CARD = ["border-2 border-navy", "border-2 border-brass", "border border-line"];
const HREF = ["/signup", "/signup", "/request"];

export function PricingView() {
  const { lang: raw } = useLang();
  const t = COPY[raw === "fr" ? "fr" : "en"];
  return (
    <div className="wrap pb-[72px] pt-12">
      <div className="mx-auto mb-9 flex max-w-[720px] flex-col items-center gap-3 text-center">
        <span className="rounded-full bg-brass-tint px-3.5 py-1.5 text-sm font-bold text-navy-deep">{t.badge}</span>
        <h1 className="h-display text-[40px] sm:text-[48px]">{t.title}</h1>
        <p className="text-lg text-slate">{t.lede}</p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[18px]">
        {t.plans.map((p, i) => (
          <div key={p.who} className={`relative flex flex-col gap-4 rounded-[20px] bg-white p-7 ${CARD[i]}`}>
            <span className="h-display text-2xl">{p.who}</span>
            <span><span className="h-display text-[44px]">$0</span><span className="hint text-[15px]"> {t.month} · {t.free}</span></span>
            <span className="hint text-[15px]">{p.sub}</span>
            {p.features.map((f) => <div key={f} className="text-ink-2">✓ {f}</div>)}
            <Button href={HREF[i]} variant={i === 0 ? "primary" : "secondary"} className="mt-auto">{p.cta}</Button>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-[720px] text-center text-[15px] text-slate">{t.note}</p>

      <section className="mx-auto mt-14 flex max-w-[820px] flex-col gap-3">
        <h2 className="h-display mb-1.5 text-[30px]">{t.faqTitle}</h2>
        {t.groups.map((g, gi) => (
          <div key={g.h} className="flex flex-col gap-3">
            <h3 className="mt-4 text-sm font-bold uppercase tracking-[0.08em] text-brass-dark">{g.h}</h3>
            {g.items.map(([q, a], i) => (
              <details key={q} open={gi === 0 && i === 0} className="rounded-[14px] border border-line bg-white px-5 py-[18px]">
                <summary className="cursor-pointer font-bold">{q}</summary>
                <p className="mt-2.5 text-slate">{a}</p>
              </details>
            ))}
          </div>
        ))}
        <div className="card mt-6 flex flex-wrap items-center justify-between gap-4 bg-parchment p-6">
          <div><strong className="text-lg">{t.moreQ}</strong><p className="text-slate">{t.moreA}</p></div>
          <ContactButton label={t.contact} className="min-h-11 rounded-[10px] bg-navy px-[18px] py-3 text-[15px] font-bold text-white" />
        </div>
      </section>
    </div>
  );
}
