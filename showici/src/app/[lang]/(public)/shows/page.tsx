import type { Metadata } from "next";
import { BigEventCard } from "@/components/cards";
import { EmptyState } from "@/components/EmptyState";
import { PageHero, PillLink, RedBand, SectionHead } from "@/components/sections";
import { FollowButtons } from "@/components/Social";
import { getBigEvents, getShows, getVenues } from "@/lib/data";
import { isLang, type Lang } from "@/lib/lang";
import { pageMetadata } from "@/lib/seo";
import { ShowsBrowser } from "./ShowsBrowser";

const copy = {
  fr: {
    seoTitle: "Spectacles près de chez vous au Québec · ShowIci",
    seoDescription: "Musique live, humour, DJ et magie dans les pubs, bars et salles du Québec. Trouvez un spectacle ce soir, cette semaine ou ce week-end, et les billets des grands événements.",
    title: "La scène locale",
    accent: "vous attend.",
    lead: "Découvrez les spectacles, concerts et soirées près de chez vous et soutenez le talent d’ici.",
    local: "Spectacles locaux",
    emptyTitle: "Aucun spectacle publié pour l’instant",
    emptyBody: "Les salles publient leurs spectacles ici dès qu’ils sont confirmés. Vous gérez une salle? Publiez votre premier spectacle.",
    emptyCta: "Inscrire ma salle",
    emptyMore: "Voir les grands événements",
    promoEyebrow: "À ne pas manquer",
    promoTitle: "Les soirées intimes d’ici",
    promoText: "Des salles locales, une ambiance unique et des artistes qui font vibrer la scène québécoise.",
    promoCta: "Découvrir les salles",
    big: "Grands événements et billetterie",
    bigSub: "Billets vendus sur Ticketmaster",
    bigMore: "Voir tous les grands événements",
    bandTitle: "Restez branché sur la scène locale",
    bandText: "Les meilleurs spectacles de la semaine, chaque semaine sur nos réseaux.",
  },
  en: {
    seoTitle: "Live shows near you in Québec · ShowIci",
    seoDescription: "Live music, comedy, DJs and magic at pubs, bars and venues across Québec. Find a show tonight, this week or this weekend, plus tickets for big events.",
    title: "The local scene",
    accent: "is waiting.",
    lead: "Find shows, concerts and nights out near you, and support local talent.",
    local: "Local shows",
    emptyTitle: "No shows posted yet",
    emptyBody: "Venues post their shows here as soon as they’re booked. Run a venue? Post your first show.",
    emptyCta: "List my venue",
    emptyMore: "See big events",
    promoEyebrow: "Don’t miss",
    promoTitle: "Intimate nights, close to home",
    promoText: "Local rooms, a unique atmosphere and the artists who keep Québec’s scene alive.",
    promoCta: "Discover venues",
    big: "Big events and tickets",
    bigSub: "Tickets sold on Ticketmaster",
    bigMore: "See all big events",
    bandTitle: "Stay plugged into the local scene",
    bandText: "The best shows of the week, every week on our social accounts.",
  },
} satisfies Record<Lang, unknown>;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMetadata({ lang, path: "/shows", title: copy[lang].seoTitle, description: copy[lang].seoDescription });
}

export default async function ShowsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "fr";
  const c = copy[lang];
  const [shows, venues, bigEvents] = await Promise.all([getShows(), getVenues(), getBigEvents()]);

  return (
    <>
      <PageHero image="/images/stage-guitar.webp" title={c.title} accent={c.accent} lead={c.lead} />

      <section className="wrap py-14">
        <SectionHead title={c.local} />
        {shows.length > 0 ? (
          <ShowsBrowser shows={shows} venues={venues} />
        ) : (
          <EmptyState title={c.emptyTitle} body={c.emptyBody} cta={{ href: "/signup?role=venue", label: c.emptyCta }} secondary={{ href: "/events", label: c.emptyMore }} />
        )}

        <div
          className="mt-12 flex justify-end overflow-hidden rounded-2xl bg-ink bg-[image:linear-gradient(90deg,rgba(11,11,13,0)_40%,#0B0B0D_62%),url(/images/stage-band.webp)] bg-[length:auto_100%] bg-left bg-no-repeat text-white"
        >
          <div className="max-w-[560px] p-8 sm:p-10">
            <p className="eyebrow text-accent-bright">{c.promoEyebrow}</p>
            <h2 className="h-display mb-2.5 mt-1 text-[30px] sm:text-[36px]">{c.promoTitle}</h2>
            <p className="mb-5 text-on-dark">{c.promoText}</p>
            <PillLink href="/venues" tone="outline">{c.promoCta} →</PillLink>
          </div>
        </div>

        {bigEvents.length > 0 && (
          <div className="mt-14">
            <SectionHead title={c.big} sub={c.bigSub} more={{ href: "/events", label: c.bigMore }} />
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
              {bigEvents.slice(0, 3).map((e) => <BigEventCard key={e.id} e={e} />)}
            </div>
          </div>
        )}
      </section>

      <RedBand title={c.bandTitle} text={c.bandText}>
        <FollowButtons tone="dark" />
      </RedBand>
    </>
  );
}
