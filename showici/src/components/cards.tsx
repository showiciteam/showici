import Link from "next/link";
import { placeLabel } from "@/lib/regions";
import type { BigEvent, Performer, Show, Story, Venue } from "@/lib/types";
import { youTubeId } from "@/lib/youtube";
import { Button, DateBadge, Placeholder, PlayIcon, Stars, Tag } from "./ui";

/** Best picture for a performer: cover photo, then first photo, then the main YouTube video's thumbnail. */
function performerPicture(p: Performer): string | undefined {
  if (p.cover) return p.cover;
  if (p.photos?.[0]) return p.photos[0];
  const v = p.videos.find((x) => x.featured) ?? p.videos[0];
  const id = youTubeId(v?.url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : undefined;
}

export function ShowCard({ show, venue }: { show: Show; venue?: Venue }) {
  return (
    <Link href={`/shows/${show.id}`} className="card flex flex-col overflow-hidden text-navy no-underline hover:text-navy hover:shadow-md">
      <div className="relative">
        {venue?.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={venue.logo} alt={`${venue.name} logo`} loading="lazy" className="h-[150px] w-full border-b border-line bg-white object-contain p-5" />
        ) : (
          <Placeholder tone={show.tone} className="h-[150px]" />
        )}
        <span className="absolute bottom-3.5 left-3.5"><DateBadge day={show.day} date={show.date} dark /></span>
      </div>
      <div className="flex flex-col gap-1.5 p-[18px]">
        <span className="eyebrow">{show.genre}</span>
        <span className="h-display text-[21px]">{show.title}</span>
        {venue && <span className="text-[15px] text-slate">{venue.name} · {venue.area}</span>}
        <span className="text-sm text-muted">{show.time} · {show.entry}</span>
      </div>
    </Link>
  );
}

export function PerformerCard({ p }: { p: Performer }) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-line bg-parchment p-[22px]">
      <div className="flex items-center gap-3.5">
        {performerPicture(p) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={performerPicture(p)} alt={p.name} loading="lazy" className="h-14 w-14 flex-none rounded-full object-cover" />
        ) : (
          <Placeholder tone={p.tone} label={p.initials} className="h-14 w-14 flex-none rounded-full font-display text-xl text-navy" />
        )}
        <div className="flex flex-col gap-0.5">
          <span className="h-display text-xl">{p.name}</span>
          <span className="text-sm text-muted">{p.base} · travels {p.travelKm} km</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        <Tag>{p.actType}</Tag>
        <Tag>{p.repertoire} · {p.genres.slice(0, 2).join(" / ")}</Tag>
        <Tag>{p.eventTypes[0]}</Tag>
      </div>
      <div className="mt-1 flex gap-2.5">
        <Button href={`/performers/${p.id}`} variant="secondary" className="flex-1 text-sm">Watch samples</Button>
        {p.claimed === false ? null : <Button href={`/messages?to=${p.id}`} className="flex-1 text-sm">Contact</Button>}
      </div>
    </article>
  );
}

export function PerformerRow({ p }: { p: Performer }) {
  return (
    <article className="card flex flex-wrap items-center gap-5 p-5">
      <Link href={`/performers/${p.id}`} aria-label={`${p.name} profile`} className="flex h-[100px] w-[168px] flex-none items-center justify-center overflow-hidden rounded-xl bg-navy">
        {performerPicture(p) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={performerPicture(p)} alt={`${p.name} live`} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <PlayIcon size={34} color="#A485FF" />
        )}
      </Link>
      <div className="flex flex-[1_1_240px] flex-col gap-1.5">
        <span className="flex items-center gap-2">
          <span className="h-display text-[22px]">{p.name}</span>
          {p.verified && <span className="text-xs font-bold text-brass-dark">✓ Verified</span>}
        </span>
        <span className="text-[15px] text-slate">{p.actType} · {p.repertoire} · {p.genres.join(", ")}</span>
        <span className="text-sm text-muted">{p.base} · {p.distanceKm} km away{p.claimed === false ? " · Listed by ShowIci" : <> · travels up to {p.travelKm} km · <Stars rating={p.rating} /> {p.rating}</>}</span>
      </div>
      <div className="flex flex-wrap gap-2.5">
        <Button href={`/performers/${p.id}`} variant="secondary" className="text-sm">View profile</Button>
        {p.claimed === false ? null : <Button href={`/messages?to=${p.id}`} className="text-sm">Send message</Button>}
      </div>
    </article>
  );
}

export function VenueRow({ v }: { v: Venue }) {
  return (
    <article className="card flex flex-wrap items-center gap-[18px] p-4">
      <Link href={`/venues/${v.id}`} aria-label={`${v.name} venue page`} className="flex-none">
        {v.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={v.logo} alt={`${v.name} logo`} loading="lazy" className="h-28 w-[170px] rounded-xl border border-line bg-white object-contain p-3" />
        ) : v.photos?.[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={v.photos[0]} alt={v.name} loading="lazy" className="h-28 w-[170px] rounded-xl object-cover" />
        ) : (
          <Placeholder tone={v.tone} className="h-28 w-[170px] rounded-xl" />
        )}
      </Link>
      <div className="flex flex-[1_1_240px] flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="h-display text-[21px]">{v.name}</span>
          {v.openToNewActs && v.claimed !== false && <span className="rounded-full bg-success px-2 py-1 text-xs font-bold text-success-ink">Open to new acts</span>}
          {v.claimed === false && <span className="rounded-full border border-line-strong px-2 py-1 text-xs font-bold text-slate">Not claimed yet</span>}
        </div>
        <span className="text-slate">{[v.type, placeLabel(v.area, v.city), `${v.distanceKm} km away`, v.capacity].filter(Boolean).join(" · ")}</span>
        <div className="flex flex-wrap gap-1.5">{[...v.genres.slice(0, 2), v.nights].filter(Boolean).map((g) => <Tag key={g}>{g}</Tag>)}</div>
      </div>
      <div className="flex flex-wrap gap-2.5">
        <Button href={`/venues/${v.id}`} variant="secondary" className="text-sm">View venue</Button>
        {v.claimed === false ? (
          <Button href={`/venues/${v.id}/claim`} variant="secondary" className="text-sm">Claim this venue</Button>
        ) : (
          <Button href={`/messages?to=${v.id}`} className="text-sm">Send message</Button>
        )}
      </div>
    </article>
  );
}

export function BigEventCard({ e }: { e: BigEvent }) {
  return (
    <article className="card flex flex-col overflow-hidden">
      <div className="relative">
        {e.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={e.image} alt="" loading="lazy" className="aspect-video w-full bg-navy-soft object-cover" />
        ) : (
          <Placeholder tone={e.tone} className="aspect-video" />
        )}
        <span className="absolute bottom-3 left-3"><DateBadge day={e.day} date={e.date} dark /></span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <span className="eyebrow">{e.category}</span>
        <span className="h-display text-[19px] leading-tight">{e.name}</span>
        <span className="text-sm text-slate">{[e.venue, e.city].filter(Boolean).join(", ")}</span>
        <span className="text-sm text-slate">{[e.month ? `${e.month} ${e.date}` : "", e.time].filter(Boolean).join(" · ")}{e.moreDates ? ` · +${e.moreDates} more date${e.moreDates > 1 ? "s" : ""}` : ""}</span>
        {e.price && <span className="text-sm text-muted">{e.price}</span>}
        <Button href={e.url} external className="mt-auto text-sm">Get tickets ↗</Button>
        <span className="text-center text-[11px] text-muted">On Ticketmaster</span>
      </div>
    </article>
  );
}

export function StoryCard({ s }: { s: Story }) {
  return (
    <Link href={`/spotlight/${s.slug}`} className="card flex flex-col overflow-hidden text-navy no-underline hover:text-navy hover:shadow-md">
      <div className="relative">
        {s.article && s.photo.startsWith("/") ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={s.photo} alt={`${s.article.artist} live`} className="aspect-[16/10] w-full object-cover" />
        ) : (
          <Placeholder tone={s.tone} label={s.photo} className="aspect-[16/10] items-end justify-start p-3.5" />
        )}
        {s.video && <span className="absolute right-3.5 top-3.5 rounded-full bg-navy px-2.5 py-1 text-xs font-bold text-white">▶ Video</span>}
      </div>
      <div className="flex flex-col gap-2 p-5">
        <span className="eyebrow">{s.category} · {s.city}</span>
        <span className="h-display text-[22px] leading-tight">{s.title}</span>
        <span className="leading-relaxed text-slate">{s.dek}</span>
        <span className="mt-1 text-[13px] text-muted">{s.date} · {s.read}</span>
      </div>
    </Link>
  );
}
