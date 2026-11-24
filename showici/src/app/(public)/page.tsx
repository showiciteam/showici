import Link from "@/components/LocalLink";
import { Hero } from "@/components/Hero";
import { HomeMap } from "@/components/HomeMap";
import { PerformerCard, ShowCard } from "@/components/cards";
import { Section } from "@/components/ui";
import { getBigEvents, getPerformers, getShows, getVenues } from "@/lib/data";
import { FollowBand } from "@/components/Social";
import { JsonLd, siteLd } from "@/lib/jsonld";
import { getT } from "@/lib/lang";
import { label } from "@/lib/labels";


type Tr = (en: string, fr: string) => string;

const roles = (t: Tr) => [
  {
    href: "/register/venue",
    title: t("I run a venue", "Je gère une salle"),
    text: t("Post your upcoming shows, then find performers by genre for the next ones.", "Publiez vos spectacles à venir, puis trouvez des artistes par style pour les prochains."),
    cta: t("List your venue →", "Inscrire votre salle →"),
    icon: <><path d="M3 21V9l9-5 9 5v12" /><path d="M9 21v-6h6v6" /></>,
  },
  {
    href: "/request",
    title: t("I'm planning an event", "J'organise un événement"),
    text: t("Quinceañera, birthday, wedding or house party: post your date and get local acts.", "Quinceañera, anniversaire, mariage ou fête à la maison : publiez votre date et recevez des propositions d'artistes d'ici."),
    cta: t("Post an event request →", "Publier une demande →"),
    icon: <><path d="M4 11h16v10H4z" /><path d="M12 11v10" /><path d="M3 7h18v4H3z" /></>,
  },
  {
    href: "/register/performer",
    title: t("I'm a performer", "Je suis artiste"),
    text: t("Show your style, link your videos, set how far you travel and get booked.", "Montrez votre style, ajoutez vos vidéos, indiquez jusqu'où vous vous déplacez et faites-vous engager."),
    cta: t("Create your profile →", "Créer votre profil →"),
    icon: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0" /><path d="M12 18v3" /></>,
  },
];

const steps = (t: Tr) => [
  [t("Pick your area", "Choisissez votre secteur"), t("Set your city and a radius. Everything you see is within reach.", "Indiquez votre ville et un rayon. Tout ce que vous voyez est à votre portée.")],
  [t("Find your match", "Trouvez le bon numéro"), t("Filter by type of act, genre, covers or originals, and event type.", "Filtrez par type de numéro, style, reprises ou compositions, et type d'événement.")],
  [t("Message on ShowIci", "Écrivez-vous sur ShowIci"), t("Talk dates and details through the site. You settle payment directly. No fees, no commission.", "Discutez des dates et des détails sur le site. Le paiement se règle directement entre vous. Aucuns frais, aucune commission.")],
];

export default async function Home() {
  const [shows, performers, venues, bigEvents] = await Promise.all([getShows(), getPerformers(), getVenues(), getBigEvents()]);
  const venueById = Object.fromEntries(venues.map((v) => [v.id, v]));
  const t = await getT();
  const fr = t("en", "fr") === "fr";

  return (
    <>
      <JsonLd data={siteLd()} />
      <Hero />

      <section className="wrap pb-[72px]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
          {roles(t).map((r) => (
            <Link key={r.href} href={r.href} className="flex flex-col gap-2.5 rounded-[18px] border border-line bg-parchment p-7 text-navy no-underline hover:text-navy hover:shadow-md">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#6D3CE8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{r.icon}</svg>
              <span className="h-display text-2xl">{r.title}</span>
              <span className="leading-normal text-slate">{r.text}</span>
              <span className="mt-1.5 font-bold text-navy">{r.cta}</span>
            </Link>
          ))}
        </div>
      </section>

      {shows.length > 0 && <div className="border-y border-line bg-parchment">
        <Section title={t("This week across Québec", "Cette semaine au Québec")} action={<Link href="/shows" className="font-bold no-underline">{t("See all shows →", "Tous les spectacles →")}</Link>}>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
            {shows.slice(0, 4).map((s) => <ShowCard key={s.id} show={s} venue={venueById[s.venueId]} />)}
          </div>
        </Section>
      </div>}

      {bigEvents.length > 0 && (
        <section className="wrap pt-16">
          <div className="flex flex-col gap-5 rounded-[22px] bg-navy p-8 text-white">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold tracking-[0.1em] text-brass">{t("BIG EVENTS · TICKETS", "GRANDS ÉVÉNEMENTS · BILLETS")}</span>
                <h2 className="font-display text-[34px] font-extrabold tracking-tight">{t("Big events coming up", "Grands événements à venir")}</h2>
                <span className="text-[15px] text-on-navy">{t("Concerts, festivals and tours in your area. Tickets from Ticketmaster and its partner sites.", "Concerts, festivals et tournées près de chez vous. Billets sur Ticketmaster et ses sites partenaires.")}</span>
              </div>
              <Link href="/events" className="rounded-[10px] bg-brass px-[18px] py-3 font-bold text-navy no-underline hover:text-navy">{t("See all big events", "Tous les grands événements")}</Link>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3.5">
              {bigEvents.slice(0, 4).map((e) => (
                <a key={e.id} href={e.url} target="_blank" rel="noopener noreferrer sponsored" className="flex flex-col overflow-hidden rounded-[14px] bg-[#1E2D4D] text-white no-underline hover:text-white">
                  {e.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={e.image} alt="" loading="lazy" className="aspect-video w-full bg-navy-soft object-cover" />
                  ) : (
                    <div className="aspect-video bg-navy-soft" />
                  )}
                  <div className="flex flex-col gap-1 p-3.5">
                    <span className="text-xs font-bold text-brass">{label(fr ? "fr" : "en", e.category).toUpperCase()} · {e.day} {e.month ? `${e.month.toUpperCase()} ` : ""}{e.date}</span>
                    <strong>{e.name}</strong>
                    <span className="text-[13px] text-on-navy">{[e.venue, e.city].filter(Boolean).join(", ")} · {t("Get tickets ↗", "Billets ↗")}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {performers.length > 0 && <Section title={t("Performers available nearby", "Artistes disponibles près de chez vous")} action={<Link href="/performers" className="font-bold no-underline">{t("Browse all performers →", "Tous les artistes →")}</Link>}>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
          {performers.slice(0, 4).map((p) => <PerformerCard key={p.id} p={p} />)}
        </div>
      </Section>}

      <div className="border-y border-line bg-parchment">
        <section className="wrap py-16">
          <h2 className="h-display mb-8 text-[40px]">{t("How it works", "Comment ça marche")}</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-7">
            {steps(t).map(([title, text], i) => (
              <div key={title} className="flex flex-col gap-2.5">
                <span className="h-display text-5xl">{i + 1}</span>
                <span className="text-xl font-bold">{title}</span>
                <span className="leading-relaxed text-slate">{text}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <HomeMap venues={venues} performers={performers} />
      {/* "Free during launch" banner removed for now; it was a navy box linking to /signup. */}
      <FollowBand />
      <div className="pb-[72px]" />
    </>
  );
}
