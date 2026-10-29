import Link from "next/link";
import { Hero } from "@/components/Hero";
import { HomeMap } from "@/components/HomeMap";
import { PerformerCard, ShowCard } from "@/components/cards";
import { Section } from "@/components/ui";
import { getBigEvents, getPerformers, getShows, getVenues } from "@/lib/data";
import { FollowBand } from "@/components/Social";
import { SITE_URL } from "@/lib/site";
import { SOCIAL_URLS } from "@/lib/social";

/** Who ShowIci is, for search engines: links the site to its social accounts. */
const orgLd = { "@context": "https://schema.org", "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "ShowIci", url: SITE_URL, logo: `${SITE_URL}/logo.png`, sameAs: SOCIAL_URLS };

const roles = [
  {
    href: "/register/venue",
    title: "I run a venue",
    text: "Post your upcoming shows, then find performers by genre for the next ones.",
    cta: "List your venue →",
    icon: <><path d="M3 21V9l9-5 9 5v12" /><path d="M9 21v-6h6v6" /></>,
  },
  {
    href: "/request",
    title: "I'm planning an event",
    text: "Quinceañera, birthday, wedding or house party: post your date and get local acts.",
    cta: "Post an event request →",
    icon: <><path d="M4 11h16v10H4z" /><path d="M12 11v10" /><path d="M3 7h18v4H3z" /></>,
  },
  {
    href: "/register/performer",
    title: "I'm a performer",
    text: "Show your style, link your videos, set how far you travel and get booked.",
    cta: "Create your profile →",
    icon: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0" /><path d="M12 18v3" /></>,
  },
];

const steps = [
  ["Pick your area", "Set your city and a radius. Everything you see is within reach."],
  ["Find your match", "Filter by type of act, genre, covers or originals, and event type."],
  ["Message on ShowIci", "Talk dates and details through the site. You settle payment directly. No fees, no commission."],
];

export default async function Home() {
  const [shows, performers, venues, bigEvents] = await Promise.all([getShows(), getPerformers(), getVenues(), getBigEvents()]);
  const venueById = Object.fromEntries(venues.map((v) => [v.id, v]));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd).replace(/</g, "\\u003c") }} />
      <Hero />

      <section className="wrap pb-[72px]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
          {roles.map((r) => (
            <Link key={r.href} href={r.href} className="flex flex-col gap-2.5 rounded-[18px] border border-line bg-parchment p-7 text-navy no-underline hover:text-navy hover:shadow-md">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#8A6417" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{r.icon}</svg>
              <span className="h-display text-2xl">{r.title}</span>
              <span className="leading-normal text-slate">{r.text}</span>
              <span className="mt-1.5 font-bold text-navy">{r.cta}</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="border-y border-line bg-parchment">
        <Section title="This week across Québec" action={<Link href="/shows" className="font-bold no-underline">See all shows →</Link>}>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
            {shows.slice(0, 4).map((s) => <ShowCard key={s.id} show={s} venue={venueById[s.venueId]} />)}
          </div>
        </Section>
      </div>

      {bigEvents.length > 0 && (
        <section className="wrap pt-16">
          <div className="flex flex-col gap-5 rounded-[22px] bg-navy p-8 text-white">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold tracking-[0.1em] text-brass">BIG EVENTS · TICKETS</span>
                <h2 className="font-display text-[34px] font-extrabold tracking-tight">Big events coming up</h2>
                <span className="text-[15px] text-on-navy">Concerts, festivals and tours in your area. Tickets sold on Ticketmaster.</span>
              </div>
              <Link href="/events" className="rounded-[10px] bg-brass px-[18px] py-3 font-bold text-navy no-underline hover:text-navy">See all big events</Link>
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
                    <span className="text-xs font-bold text-brass">{e.category.toUpperCase()} · {e.day} {e.month ? `${e.month.toUpperCase()} ` : ""}{e.date}</span>
                    <strong>{e.name}</strong>
                    <span className="text-[13px] text-on-navy">{[e.venue, e.city].filter(Boolean).join(", ")} · Get tickets ↗</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <Section title="Performers available nearby" action={<Link href="/performers" className="font-bold no-underline">Browse all performers →</Link>}>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
          {performers.slice(0, 4).map((p) => <PerformerCard key={p.id} p={p} />)}
        </div>
      </Section>

      <div className="border-y border-line bg-parchment">
        <section className="wrap py-16">
          <h2 className="h-display mb-8 text-[40px]">How it works</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-7">
            {steps.map(([title, text], i) => (
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
