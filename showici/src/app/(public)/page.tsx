import Link from "next/link";
import { Hero } from "@/components/Hero";
import { HomeMap } from "@/components/HomeMap";
import { PerformerCard, ShowCard } from "@/components/cards";
import { Section } from "@/components/ui";
import { getBigEvents, getPerformers, getShows, getVenues } from "@/lib/data";

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
        <Section title="This week near Montréal" action={<Link href="/shows" className="font-bold no-underline">See all shows →</Link>}>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
            {shows.slice(0, 4).map((s) => <ShowCard key={s.id} show={s} venue={venueById[s.venueId]} />)}
          </div>
        </Section>
      </div>

      <section className="wrap pt-16">
        <div className="flex flex-col gap-5 rounded-[22px] bg-navy p-8 text-white">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold tracking-[0.1em] text-brass">BIG EVENTS · TICKETS</span>
              <h2 className="font-display text-[34px] font-extrabold tracking-tight">Big events this month</h2>
              <span className="text-[15px] text-on-navy">Concerts, festivals and tours in your area. Tickets sold on Ticketmaster.</span>
            </div>
            <Link href="/events" className="rounded-[10px] bg-brass px-[18px] py-3 font-bold text-navy no-underline hover:text-navy">See all big events</Link>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3.5">
            {bigEvents.slice(0, 4).map((e) => (
              <a key={e.id} href={e.url} target="_blank" rel="noopener noreferrer sponsored" className="flex flex-col overflow-hidden rounded-[14px] bg-[#1E2D4D] text-white no-underline hover:text-white">
                <div className="aspect-video bg-navy-soft" />
                <div className="flex flex-col gap-1 p-3.5">
                  <span className="text-xs font-bold text-brass">{e.category.toUpperCase()} · {e.day} {e.date}</span>
                  <strong>{e.name}</strong>
                  <span className="text-[13px] text-on-navy">{e.venue} · Get tickets ↗</span>
                </div>
              </a>
            ))}
          </div>
          <span className="text-xs text-[#9AA3B8]">ShowIci may earn a commission on ticket sales. It never changes your price.</span>
        </div>
      </section>

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

      <section className="wrap py-[72px]">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-navy px-10 py-12 text-white">
          <div className="max-w-[620px]">
            <h2 className="mb-2.5 font-display text-[40px] font-extrabold tracking-tight">Free during launch</h2>
            <p className="text-lg leading-normal">Venues, performers and event planners join free while we launch in Greater Montréal. No commission on bookings, ever.</p>
          </div>
          <Link href="/signup" className="rounded-xl bg-white px-6 py-4 text-[17px] font-bold text-navy no-underline hover:text-navy">Create your free profile</Link>
        </div>
      </section>
    </>
  );
}
