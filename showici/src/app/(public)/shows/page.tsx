import Link from "next/link";
import { ShowsFilters } from "./ShowsFilters";
import { getShows, getVenues } from "@/lib/data";
import { Placeholder } from "@/components/ui";

export const metadata = { title: "Shows near you · ShowIci" };

export default async function ShowsPage() {
  const [shows, venues] = await Promise.all([getShows(), getVenues()]);
  const venueById = Object.fromEntries(venues.map((v) => [v.id, v]));
  const days = [...new Set(shows.map((s) => s.dayLabel))];

  return (
    <div className="wrap pb-16 pt-8">
      <div className="mb-5 flex w-fit gap-1.5 rounded-full border border-line bg-parchment p-1">
        <Link href="/shows" className="rounded-full bg-navy px-[18px] py-2.5 text-sm font-bold text-white no-underline hover:text-white">Local shows</Link>
        <Link href="/events" className="rounded-full px-[18px] py-2.5 text-sm text-ink-2 no-underline">Big events and tickets</Link>
      </div>
      <h1 className="h-display text-[44px]">Shows near Montréal</h1>
      <p className="mb-[22px] mt-2 text-[17px] text-slate">Live music, comedy and more at local pubs and bars. Spectacles locaux, près de chez vous.</p>
      <ShowsFilters />

      <div className="flex flex-wrap items-start gap-6">
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-[22px]">
          {days.map((d) => (
            <section key={d} className="flex flex-col gap-3">
              <h2 className="h-display text-[22px]">{d}</h2>
              {shows.filter((s) => s.dayLabel === d).map((s) => {
                const v = venueById[s.venueId];
                return (
                  <Link key={s.id} href={`/shows/${s.id}`} className="flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-white p-3 text-navy no-underline hover:text-navy hover:shadow-md">
                    <Placeholder tone={s.tone} className="h-[100px] w-[150px] flex-none rounded-xl" />
                    <div className="flex flex-[1_1_220px] flex-col gap-1">
                      <span className="eyebrow">{s.genre}</span>
                      <span className="h-display text-xl">{s.title}</span>
                      <span className="text-slate">{v?.name} · {v?.area}</span>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 pr-2">
                      <strong>{s.time}</strong>
                      <span className="text-sm text-muted">{s.entry}</span>
                    </div>
                  </Link>
                );
              })}
            </section>
          ))}
        </div>
        <aside className="relative h-[640px] max-w-[460px] flex-[1_1_340px] overflow-hidden rounded-[18px] border border-line bg-[#E9EDE6]" aria-label="Map of shows">
          <div className="absolute inset-x-0 top-[40%] h-3 bg-white" />
          <div className="absolute inset-y-0 left-[46%] w-3 bg-white" />
          <div className="absolute inset-y-0 right-0 w-[28%] bg-ph-3" />
          {shows.map((s, i) => {
            const v = venueById[s.venueId];
            return (
              <Link key={s.id} href={`/shows/${s.id}`} style={{ left: v?.map.x, top: v?.map.y }} className="absolute rounded-full border-2 border-white bg-navy px-2.5 py-1.5 text-[13px] font-bold text-white no-underline hover:text-white">
                {i + 1}
              </Link>
            );
          })}
        </aside>
      </div>
    </div>
  );
}
