import Link from "next/link";
import { notFound } from "next/navigation";
import { getPerformer, getShow, getShows, getVenue } from "@/lib/data";
import { Button, Placeholder, Stars, VideoBox } from "@/components/ui";

export default async function ShowDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const show = await getShow(id);
  if (!show) notFound();
  const [venue, performer, all] = await Promise.all([getVenue(show.venueId), getPerformer(show.performerId), getShows()]);
  const more = all.filter((s) => s.venueId === show.venueId && s.id !== show.id);
  const featured = performer?.videos.find((v) => v.featured) ?? performer?.videos[0];

  return (
    <div className="wrap pb-[72px] pt-7">
      <Link href="/shows" className="font-bold no-underline">← All shows</Link>
      <div className="mt-[18px] flex flex-wrap items-start gap-8">
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-7">
          <Placeholder tone={show.tone} label="[Show poster or performer photo]" className="aspect-[16/8] rounded-[18px]" />
          <div className="flex flex-col gap-2.5">
            <span className="eyebrow">{show.genre} · Live</span>
            <h1 className="h-display text-[48px] leading-tight">{show.title}</h1>
            <p className="text-[17px] leading-relaxed text-ink-2">[Show description written by the venue: what to expect, specials, anything guests should know.]</p>
          </div>
          {featured && (
            <section className="flex flex-col gap-3">
              <h2 className="h-display text-2xl">Get a taste</h2>
              <VideoBox url={featured.url} title={featured.title} big />
            </section>
          )}
          {performer && (
            <section className="flex flex-col gap-3">
              <h2 className="h-display text-2xl">The performer</h2>
              <Link href={`/performers/${performer.id}`} className="card flex items-center gap-3.5 p-4 text-navy no-underline hover:text-navy">
                <Placeholder tone={performer.tone} label={performer.initials} className="h-14 w-14 flex-none rounded-full text-navy" />
                <span className="flex flex-1 flex-col gap-0.5">
                  <strong className="text-[17px]">{performer.name}</strong>
                  <span className="text-sm text-muted">{performer.actType} · {performer.genres.join(", ")} · <Stars rating={performer.rating} /> {performer.rating}</span>
                </span>
                <span className="font-bold text-brass-dark">View profile →</span>
              </Link>
            </section>
          )}
        </div>

        <aside className="flex max-w-[380px] flex-[1_1_300px] flex-col gap-4">
          <div className="card flex flex-col gap-4 p-[22px]">
            <div className="flex items-center gap-3.5">
              <span className="rounded-xl bg-brass-tint px-3.5 py-2.5 text-center text-[13px] font-bold leading-tight text-navy-deep">{show.day}<br /><span className="font-display text-[26px]">{show.date}</span></span>
              <span className="flex flex-col gap-1"><strong className="text-lg">{show.longDate}</strong><span className="text-slate">Doors {show.doors} · Show {show.time}</span></span>
            </div>
            <div className="flex justify-between border-t border-line pt-3.5"><span className="text-muted">Entry</span><strong>{show.entry}</strong></div>
            {show.ticketUrl && <Button href={show.ticketUrl} external variant="brass">Get tickets ↗</Button>}
            <Button>Add to calendar</Button>
            <Button variant="secondary">Share this show</Button>
          </div>
          {venue && (
            <div className="card overflow-hidden">
              <div className="relative h-40 bg-[#E9EDE6]"><span className="absolute left-1/2 top-1/2 -ml-[9px] -mt-[9px] h-[18px] w-[18px] rounded-full border-[3px] border-white bg-navy" /></div>
              <div className="flex flex-col gap-1.5 p-[18px]">
                <Link href={`/venues/${venue.id}`} className="text-lg font-bold text-navy no-underline">{venue.name}</Link>
                <span className="text-slate">[Street address], {venue.city}</span>
                <a href="#" className="font-bold no-underline">Get directions →</a>
              </div>
            </div>
          )}
          {more.length > 0 && (
            <div className="card flex flex-col gap-2.5 p-[18px]">
              <strong>More at {venue?.name}</strong>
              {more.map((m) => (
                <Link key={m.id} href={`/shows/${m.id}`} className="flex justify-between text-navy no-underline"><span>{m.title}</span><span className="text-sm text-muted">{m.day} {m.date}</span></Link>
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
