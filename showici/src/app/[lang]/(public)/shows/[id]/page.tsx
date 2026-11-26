import { fill } from "@/lib/tr";
import Link from "@/components/Link";
import { notFound } from "next/navigation";
import { getPerformer, getShow, getShows, getVenue } from "@/lib/data";
import type { CSSProperties } from "react";
import { Button, Placeholder, Stars, VideoBox } from "@/components/ui";
import { ShareMenu } from "@/components/Social";
import type { Metadata } from "next";
import { isLang } from "@/lib/lang";
import { translator } from "@/lib/tr";
import { absoluteUrl, jsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string; id: string }> }): Promise<Metadata> {
  const { lang, id } = await params;
  if (!isLang(lang)) return {};
  const show = await getShow(id);
  if (!show) return {};
  const venue = await getVenue(show.venueId);
  const tr = translator(lang);
  const description = [tr(show.longDate), tr(show.time), venue?.name, tr(show.entry)].filter(Boolean).join(" · ");
  const image = show.performerId ? (await getPerformer(show.performerId))?.photos?.[0] : venue?.photos?.[0];
  return pageMetadata({ lang, path: `/shows/${id}`, title: `${show.title} · ShowIci`, description, image });
}

export default async function ShowDetail({ params }: { params: Promise<{ lang: string; id: string }> }) {
  const { lang } = await params;
  const tr = translator(isLang(lang) ? lang : "fr");
  const { id } = await params;
  const show = await getShow(id);
  if (!show) notFound();
  const [venue, performer, all] = await Promise.all([getVenue(show.venueId), show.performerId ? getPerformer(show.performerId) : undefined, getShows()]);
  const more = all.filter((s) => s.venueId === show.venueId && s.id !== show.id);
  const featured = performer?.videos.find((v) => v.featured) ?? performer?.videos[0];
  const cover = performer?.photos?.[0] ?? venue?.photos?.[0];
  const address = venue ? [venue.street, venue.city].filter(Boolean).join(", ") : "";
  const mapsUrl = venue ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venue.name}, ${address}`)}` : "#";

  const eventLd = {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: show.title,
    url: absoluteUrl(`/shows/${show.id}`),
    ...(show.startsAt && { startDate: show.startsAt }),
    ...(show.description && { description: show.description }),
    ...(cover && { image: absoluteUrl(cover) }),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    ...(venue && {
      location: {
        "@type": "Place",
        name: venue.name,
        address: { "@type": "PostalAddress", streetAddress: venue.street, addressLocality: venue.city, addressRegion: "QC", addressCountry: "CA" },
      },
    }),
    ...(performer && !show.artistTba && { performer: { "@type": "PerformingGroup", name: performer.name, url: absoluteUrl(`/performers/${performer.id}`) } }),
    ...(show.ticketUrl && { offers: { "@type": "Offer", url: show.ticketUrl, availability: "https://schema.org/InStock" } }),
  };
  const heroStyle = cover ? ({ "--hero-image": `url(${cover})` } as CSSProperties) : undefined;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(eventLd) }} />
      <section className={cover ? "hero-photo text-white" : "bg-ink text-white"} style={heroStyle}>
        <div className="wrap pb-12 pt-7 sm:pb-16">
          <Link href="/shows" className="text-sm font-bold text-on-dark no-underline hover:text-white">{tr("← All shows")}</Link>
          <div className="mt-8 flex flex-wrap items-end gap-6">
            <span className="flex-none rounded-2xl bg-accent px-4 py-3 text-center text-[13px] font-bold uppercase leading-tight text-white">
              {tr(show.day)}<br /><span className="font-display text-[34px]">{show.date}</span>
            </span>
            <div className="min-w-0 flex-[1_1_420px]">
              <span className="text-[13px] font-bold uppercase tracking-[0.14em] text-accent-bright">{tr(show.genre)} · {tr("Live")}</span>
              <h1 className="mt-1 font-display text-[clamp(36px,6vw,60px)] font-extrabold leading-[1.05] tracking-[-0.02em]">{show.title}</h1>
              <p className="mt-2 text-on-dark">{[tr(show.longDate), venue?.name].filter(Boolean).join(" · ")}</p>
            </div>
          </div>
        </div>
      </section>

    <div className="wrap pb-[72px] pt-10">
      <div className="flex flex-wrap items-start gap-8">
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-7">
          {show.description && (
            <section className="flex flex-col gap-3">
              <h2 className="h-display text-2xl">{tr("About this show")}</h2>
              <p className="whitespace-pre-line text-[17px] leading-relaxed text-graphite">{show.description}</p>
            </section>
          )}
          {featured && (
            <section className="flex flex-col gap-3">
              <h2 className="h-display text-2xl">{tr("Get a taste")}</h2>
              <VideoBox url={featured.url} title={featured.title} big />
            </section>
          )}
          {performer && (
            <section className="flex flex-col gap-3">
              <h2 className="h-display text-2xl">{tr("The performer")}</h2>
              <Link href={`/performers/${performer.id}`} className="card flex items-center gap-3.5 p-4 text-ink no-underline hover:text-ink">
                <Placeholder tone={performer.tone} label={performer.initials} className="h-14 w-14 flex-none rounded-full text-ink" />
                <span className="flex flex-1 flex-col gap-0.5">
                  <strong className="text-[17px]">{performer.name}</strong>
                  <span className="text-sm text-muted">{tr(performer.actType)} · {performer.genres.map(tr).join(", ")}{performer.reviewCount > 0 && <> · <Stars rating={performer.rating} /> {performer.rating}</>}</span>
                </span>
                <span className="font-bold text-accent-dark">{tr("View profile →")}</span>
              </Link>
            </section>
          )}
        </div>

        <aside className="flex max-w-[380px] flex-[1_1_300px] flex-col gap-4">
          <div className="card flex flex-col gap-4 border-t-4 border-t-accent p-[22px]">
            <div className="flex items-center gap-3.5">
              <span className="flex flex-col gap-1"><strong className="text-lg">{tr(show.longDate)}</strong><span className="text-slate">{show.doors ? `${tr("Doors")} ${tr(show.doors)} · ` : ""}{tr("Show")} {tr(show.time)}</span></span>
            </div>
            <div className="flex justify-between border-t border-line pt-3.5"><span className="text-muted">{tr("Entry")}</span><strong>{tr(show.entry)}</strong></div>
            {show.ticketUrl && <Button href={show.ticketUrl} external variant="accent">{tr("Get tickets ↗")}</Button>}
            {show.startsAt && <Button href={`/shows/${show.id}/calendar`} external>{tr("Add to calendar")}</Button>}
            <ShareMenu title={show.title} label={tr("Share this show")} caption={[show.title, tr(show.longDate), venue?.name].filter(Boolean).join(" · ")} />
          </div>
          {venue && (
            <div className="card overflow-hidden">
              <div className="flex flex-col gap-1.5 p-[18px]">
                <span className="text-[13px] font-bold uppercase tracking-[0.12em] text-accent">{tr("Venue")}</span>
                <Link href={`/venues/${venue.id}`} className="text-lg font-bold text-ink no-underline">{venue.name}</Link>
                <span className="text-slate">{address || venue.city}</span>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="font-bold no-underline">{tr("Get directions →")}</a>
              </div>
            </div>
          )}
          {more.length > 0 && (
            <div className="card flex flex-col gap-2.5 p-[18px]">
              <strong>{fill(tr("More at {name}"), { name: venue?.name ?? "" })}</strong>
              {more.map((m) => (
                <Link key={m.id} href={`/shows/${m.id}`} className="flex justify-between text-ink no-underline"><span>{m.title}</span><span className="text-sm text-muted">{tr(m.day)} {m.date}</span></Link>
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
    </>
  );
}
