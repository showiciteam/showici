import Link from "next/link";
import { notFound } from "next/navigation";
import { getShows, getVenue } from "@/lib/data";
import { Button, Placeholder, Stars, Tag } from "@/components/ui";

export default async function VenueProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const v = await getVenue(id);
  if (!v) notFound();
  const shows = (await getShows()).filter((s) => s.venueId === v.id);

  return (
    <div className="wrap pb-[72px] pt-6">
      <div className="grid grid-cols-4 grid-rows-[170px_170px] gap-2.5 overflow-hidden rounded-[18px]">
        <Placeholder tone={v.tone} label="[Stage photo]" className="col-span-2 row-span-2" />
        <Placeholder tone="ph-3" label="[The room]" />
        <Placeholder tone="ph-4" label="[Bar]" />
        <Placeholder tone="ph-5" label="[Crowd]" />
        <Placeholder tone="ph-1" label="+ more photos" />
      </div>

      <div className="mb-7 mt-[26px] flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-col gap-2">
          <h1 className="h-display text-[44px]">{v.name}</h1>
          <span className="text-[17px] text-slate">{v.type} · {v.area}, {v.city} · {v.capacity}</span>
          <span className="flex items-center gap-1.5"><Stars rating={v.rating} /><strong>{v.rating}</strong><span className="hint text-sm">from performers</span></span>
        </div>
        <div className="flex flex-wrap gap-2.5"><Button variant="secondary">Follow</Button><Button href={`/messages?to=${v.id}`}>Message about a gig</Button></div>
      </div>

      <div className="flex flex-wrap items-start gap-8">
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-9">
          <section className="flex flex-col gap-2.5">
            <h2 className="h-display text-[26px]">About the venue</h2>
            <p className="text-[17px] leading-relaxed text-ink-2">{v.description}</p>
          </section>
          <section className="flex flex-col gap-3">
            <h2 className="h-display text-[26px]">Upcoming shows</h2>
            {shows.length === 0 && <p className="text-slate">No shows posted yet.</p>}
            {shows.map((s) => (
              <Link key={s.id} href={`/shows/${s.id}`} className="card flex items-center gap-4 p-3.5 text-navy no-underline">
                <span className="rounded-[10px] bg-brass-tint px-3 py-2 text-center text-xs font-bold leading-tight text-navy-deep">{s.day}<br /><span className="font-display text-[22px]">{s.date}</span></span>
                <span className="flex flex-1 flex-col"><strong>{s.title}</strong><span className="text-sm text-muted">{s.genre} · {s.time} · {s.entry}</span></span>
                <span className="font-bold text-brass-dark">Details →</span>
              </Link>
            ))}
          </section>
          <section className="flex flex-col gap-3">
            <h2 className="h-display text-[26px]">What performers say</h2>
            <article className="card flex flex-col gap-2 p-5"><div className="flex justify-between"><strong>[Band name]</strong><Stars rating={5} /></div><p className="text-ink-2">[Review from a performer who played here.]</p></article>
          </section>
        </div>
        <aside className="flex max-w-[380px] flex-[1_1_300px] flex-col gap-4">
          <div className="card flex flex-col gap-3.5 p-[22px]">
            <h3 className="h-display text-xl">What they book</h3>
            <div className="flex flex-wrap gap-1.5">{v.books.map((b) => <Tag key={b}>{b}</Tag>)}</div>
            <div className="flex flex-wrap gap-1.5">{v.genres.map((g) => <Tag key={g}>{g}</Tag>)}</div>
            {[["Live nights", v.nights], ["Books", v.leadTime], ["Fee range", v.feeRange]].map(([k, val]) => (
              <div key={k} className="flex justify-between border-t border-line pt-3"><span className="text-muted">{k}</span><strong>{val}</strong></div>
            ))}
          </div>
          <div className="card flex flex-col gap-2.5 p-[22px]">
            <h3 className="h-display text-xl">Equipment</h3>
            {v.equipment.map((e) => <span key={e}>✓ {e}</span>)}
          </div>
          <div className="card overflow-hidden">
            <div className="relative h-[150px] bg-[#E9EDE6]"><span className="absolute left-1/2 top-1/2 -ml-[9px] -mt-[9px] h-[18px] w-[18px] rounded-full border-[3px] border-white bg-navy" /></div>
            <div className="p-4 text-slate">[Street address], {v.city}</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
