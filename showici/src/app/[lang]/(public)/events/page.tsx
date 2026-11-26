import type { Metadata } from "next";
import { PageHero, PillLink } from "@/components/sections";
import { getBigEvents } from "@/lib/data";
import { isLang, type Lang } from "@/lib/lang";
import { pageMetadata } from "@/lib/seo";
import { EventsBrowser } from "./EventFilters";

// Ticketmaster data is refreshed at most once an hour.
export const revalidate = 3600;

const copy = {
  fr: {
    seoTitle: "Grands événements et billets au Québec · ShowIci",
    seoDescription: "Concerts, festivals, humour et théâtre au Québec. Trouvez les grands événements près de chez vous; les billets sont vendus sur Ticketmaster.",
    title: "Grands événements",
    accent: "et billetterie.",
    lead: "Concerts, festivals, tournées d’humour et théâtre près de chez vous. Les billets sont vendus en toute sécurité sur Ticketmaster.",
    smallTitle: "Envie de quelque chose de plus intime?",
    smallText: "Des groupes, humoristes et DJ d’ici jouent chaque semaine dans les pubs et les bars près de chez vous.",
    smallCta: "Voir les spectacles locaux",
  },
  en: {
    seoTitle: "Big events and tickets in Québec · ShowIci",
    seoDescription: "Concerts, festivals, comedy and theatre across Québec. Find the big events near you; tickets are sold on Ticketmaster.",
    title: "Big events",
    accent: "and tickets.",
    lead: "Concerts, festivals, comedy tours and theatre near you. Tickets are sold securely on Ticketmaster.",
    smallTitle: "Prefer something smaller and closer?",
    smallText: "Local bands, comedians and DJs play pubs and bars near you every week.",
    smallCta: "See local shows",
  },
} satisfies Record<Lang, unknown>;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMetadata({ lang, path: "/events", title: copy[lang].seoTitle, description: copy[lang].seoDescription });
}

export default async function BigEventsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "fr";
  const c = copy[lang];
  const events = await getBigEvents();

  return (
    <>
      <PageHero image="/images/stage-singer.webp" title={c.title} accent={c.accent} lead={c.lead} />
      <div className="wrap flex flex-col gap-7 py-14">
        <EventsBrowser events={events} />
        <section className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-line bg-sand p-8">
          <div className="flex max-w-[640px] flex-col gap-1.5">
            <h2 className="h-display text-[26px]">{c.smallTitle}</h2>
            <p className="text-slate">{c.smallText}</p>
          </div>
          <PillLink href="/shows">{c.smallCta} →</PillLink>
        </section>
      </div>
    </>
  );
}
