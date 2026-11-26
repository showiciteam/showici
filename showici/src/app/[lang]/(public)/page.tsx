import type { Metadata } from "next";
import { HomeSearch } from "@/components/HomeSearch";
import { HomeMap } from "@/components/HomeMap";
import { EventRow, ShowRow, TileCard } from "@/components/cards";
import { ComingSoon, PageHero, PillLink, RedBand, SectionHead } from "@/components/sections";
import { FollowButtons } from "@/components/Social";
import Link from "@/components/Link";
import { getBigEvents, getPerformers, getShows, getStories, getVenues, venueListing } from "@/lib/data";
import { label } from "@/lib/labels";
import { isLang, type Lang } from "@/lib/lang";
import { jsonLd, pageMetadata } from "@/lib/seo";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site";
import { SOCIAL_URLS } from "@/lib/social";

/** Served from cache and rebuilt in the background every minute, so new listings show up without a deploy. */
export const revalidate = 60;

const copy = {
  fr: {
    title: "La scène d’ici.",
    accent: "À découvrir.",
    lead: "Trouvez des artistes locaux et des spectacles près de chez vous, partout au Québec.",
    artist: { title: "Je suis un artiste", text: "Faites-vous découvrir et trouvez des occasions de jouer.", cta: "Créer mon profil" },
    venue: { title: "Je suis une salle", text: "Découvrez des artistes pour vos soirées et vos événements.", cta: "Trouver du talent" },
    discover: "Artistes à découvrir",
    discoverSub: "Cette semaine sur scène, partout au Québec",
    allArtists: "Voir tous les artistes",
    thisWeek: "À l’affiche cette semaine",
    allShows: "Voir tous les spectacles",
    spotlight: "ShowIci Spotlight",
    read: "Lire l’entrevue",
    bandTitle: "Explorez la scène québécoise",
    bandText: "Des artistes, des salles et une communauté passionnée, partout au Québec.",
    soon: "Information à venir",
  },
  en: {
    title: "The local scene.",
    accent: "Go discover it.",
    lead: "Find local artists and live shows near you, everywhere in Québec.",
    artist: { title: "I’m an artist", text: "Get discovered and find places to play.", cta: "Create my profile" },
    venue: { title: "I run a venue", text: "Discover artists for your nights and events.", cta: "Find talent" },
    discover: "Artists to discover",
    discoverSub: "On stage this week across Québec",
    allArtists: "See all artists",
    thisWeek: "On stage this week",
    allShows: "See all shows",
    spotlight: "ShowIci Spotlight",
    read: "Read the interview",
    bandTitle: "Explore Québec’s live scene",
    bandText: "Artists, venues and a passionate community, all across Québec.",
    soon: "Information coming soon",
  },
} satisfies Record<Lang, unknown>;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMetadata({ lang, path: "/", title: SITE_TITLE[lang], description: SITE_DESCRIPTION[lang] });
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "fr";
  const c = copy[lang];
  const [shows, performers, venues, bigEvents, stories] = await Promise.all([getShows(), getPerformers(), getVenues(), getBigEvents(), getStories()]);
  const venueById = Object.fromEntries(venues.map((v) => [v.id, v]));
  const featured = stories.find((s) => s.article && !s.draft);

  // Until enough artists have joined, the "discover" row shows the acts playing big events this week.
  const discoverArtists = performers.length >= 4;
  const thisWeek = shows.length > 0 ? "shows" : bigEvents.length > 0 ? "events" : "none";

  const siteLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "ShowIci", url: SITE_URL, logo: `${SITE_URL}/logo.png`, sameAs: SOCIAL_URLS, areaServed: "Québec, Canada" },
      { "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: "ShowIci", url: SITE_URL, inLanguage: ["fr-CA", "en-CA"], publisher: { "@id": `${SITE_URL}/#organization` } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(siteLd) }} />

      <PageHero image="/images/stage-singer.webp" title={c.title} accent={c.accent} lead={c.lead} hand bottomSpace="pb-32">
        <HomeSearch />
      </PageHero>

      <section className="wrap relative z-10 -mt-20 grid gap-5 md:grid-cols-2">
        {[
          { ...c.artist, href: "/signup?role=performer", icon: <><circle cx="9" cy="5" r="2.5" /><path d="M4 21v-5a5 5 0 0 1 10 0" /><path d="m13 15 7-7" /><circle cx="12" cy="17" r="2.5" /></> },
          { ...c.venue, href: "/performers", icon: <><path d="M3 9h18l-2-5H5z" /><path d="M4 9v11h16V9" /><path d="M9 20v-6h6v6" /></> },
        ].map((r) => (
          <div key={r.title} className="flex items-center gap-6 rounded-2xl border border-white/10 bg-ink-soft p-6 text-white shadow-[0_16px_34px_rgba(0,0,0,0.25)] sm:p-7">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="hidden flex-none sm:block">{r.icon}</svg>
            <div>
              <h2 className="h-display text-[22px]">{r.title}</h2>
              <p className="mb-4 mt-1 text-[15px] text-on-dark">{r.text}</p>
              <PillLink href={r.href} tone="outline">{r.cta} →</PillLink>
            </div>
          </div>
        ))}
      </section>

      <section className="wrap py-14">
        <SectionHead title={c.discover} sub={c.discoverSub} more={{ href: discoverArtists ? "/performers" : "/events", label: c.allArtists }} />
        {!discoverArtists && bigEvents.length === 0 ? (
          <ComingSoon text={c.soon} />
        ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
          {discoverArtists
            ? performers.slice(0, 5).map((p) => (
                <TileCard key={p.id} href={`/performers/${p.id}`} image={p.cover ?? p.photos?.[0]} title={p.name} meta={`${label(p.actType, lang)} · ${p.base}`} />
              ))
            : bigEvents.slice(0, 5).map((e) => (
                <TileCard key={e.id} href={e.url} external image={e.image} title={e.name} meta={[label(e.category, lang), e.venue].filter(Boolean).join(" · ")} />
              ))}
        </div>
        )}
      </section>

      <HomeMap venues={venues.map(venueListing)} performers={performers} />

      <section className="bg-ink text-white">
        <div className="wrap flex flex-wrap gap-5 py-14">
          <div className="min-w-0 flex-[1_1_520px] rounded-2xl border border-white/10 bg-ink-soft p-6">
            <SectionHead title={c.thisWeek} more={{ href: "/shows", label: c.allShows }} dark />
            <div className="flex flex-col">
              {thisWeek === "shows" && shows.slice(0, 3).map((s) => <ShowRow key={s.id} show={s} venue={venueById[s.venueId]} />)}
              {thisWeek === "events" && bigEvents.slice(0, 3).map((e) => <EventRow key={e.id} e={e} />)}
              {thisWeek === "none" && <ComingSoon text={c.soon} dark />}
            </div>
          </div>
          {featured?.article && (
            <div className="flex min-w-0 flex-[1_1_400px] flex-col rounded-2xl border border-white/10 bg-ink-soft p-6">
              <h2 className="h-display mb-4 text-2xl">{c.spotlight}</h2>
              <Link href={`/spotlight/${featured.slug}`} className="group relative flex min-h-[280px] flex-1 items-end overflow-hidden rounded-xl text-white no-underline hover:text-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={featured.photo} alt={featured.article.artist} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                <span className="relative w-full bg-gradient-to-t from-black/90 to-transparent p-6 pt-16">
                  <span className="eyebrow text-accent-bright">{featured.article[lang].category} · {featured.city}</span>
                  <span className="h-display mt-1 block text-[24px] leading-tight">{featured.article[lang].title}</span>
                  <span className="mt-3 inline-block border-b-2 border-accent pb-1 font-display font-bold">{c.read} →</span>
                </span>
              </Link>
            </div>
          )}
        </div>
      </section>

      <RedBand
        title={c.bandTitle}
        text={c.bandText}
        icon={<svg width="56" height="68" viewBox="0 0 24 29"><path d="M12 28s-10-9-10-16a10 10 0 0 1 20 0c0 7-10 16-10 16z" fill="#D7141F" stroke="#fff" strokeWidth="1.4" /><circle cx="12" cy="12" r="4" fill="#0B0B0D" /></svg>}
      >
        <FollowButtons tone="dark" />
      </RedBand>
    </>
  );
}
