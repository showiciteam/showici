import Link from "next/link";
import { Button } from "@/components/ui";
import { getBigEvents } from "@/lib/data";
import { EventsBrowser } from "./EventFilters";

export const metadata = { title: "Big events and tickets · ShowIci" };
// Ticketmaster data is refreshed at most once an hour.
export const revalidate = 3600;

export default async function BigEventsPage() {
  const events = await getBigEvents();

  return (
    <div className="wrap flex flex-col gap-[26px] pb-[72px] pt-10">
      <div className="flex w-fit gap-1.5 rounded-full border border-line bg-parchment p-1">
        <Link href="/shows" className="rounded-full px-[18px] py-2.5 text-sm text-ink-2 no-underline">Local shows</Link>
        <Link href="/events" className="rounded-full bg-navy px-[18px] py-2.5 text-sm font-bold text-white no-underline hover:text-white">Big events and tickets</Link>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="h-display text-[46px]">Big events in Québec</h1>
          <p className="max-w-[680px] text-lg text-slate">Concerts, festivals, comedy tours and sports in your area. Tickets are sold securely on Ticketmaster.</p>
        </div>
        <span className="max-w-[300px] text-right text-[13px] text-muted">ShowIci may earn a commission when you buy tickets through these links. It never changes your price.</span>
      </div>
      <EventsBrowser events={events} />

      <section className="flex flex-wrap items-center justify-between gap-6 rounded-[22px] border border-line bg-parchment p-8">
        <div className="flex max-w-[640px] flex-col gap-1.5">
          <h2 className="h-display text-[26px]">Prefer something smaller and closer?</h2>
          <p className="text-slate">Local bands, comedians and DJs play pubs and bars near you every week, often with free entry.</p>
        </div>
        <Button href="/shows">See local shows</Button>
      </section>
    </div>
  );
}
