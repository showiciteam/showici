import Link from "next/link";
import type { BigEvent, Performer, Show, Story, Venue } from "@/lib/types";
import { Button, DateBadge, Placeholder, PlayIcon, Stars, Tag } from "./ui";

export function ShowCard({ show, venue }: { show: Show; venue?: Venue }) {
  return (
    <Link href={`/shows/${show.id}`} className="card flex flex-col overflow-hidden text-navy no-underline hover:text-navy hover:shadow-md">
      <div className="relative">
        <Placeholder tone={show.tone} className="h-[150px]" />
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
        <Placeholder tone={p.tone} label={p.initials} className="h-14 w-14 flex-none rounded-full font-display text-xl text-navy" />
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
        <Button href={`/messages?to=${p.id}`} className="flex-1 text-sm">Contact</Button>
      </div>
    </article>
  );
}

export function PerformerRow({ p }: { p: Performer }) {
  return (
    <article className="card flex flex-wrap items-center gap-5 p-5">
      <Link href={`/performers/${p.id}`} aria-label={`${p.name} videos`} className="flex h-[100px] w-[168px] flex-none items-center justify-center rounded-xl bg-navy">
        <PlayIcon size={34} color="#D9A441" />
      </Link>
      <div className="flex flex-[1_1_240px] flex-col gap-1.5">
        <span className="flex items-center gap-2">
          <span className="h-display text-[22px]">{p.name}</span>
          {p.verified && <span className="text-xs font-bold text-brass-dark">✓ Verified</span>}
        </span>
        <span className="text-[15px] text-slate">{p.actType} · {p.repertoire} · {p.genres.join(", ")}</span>
        <span className="text-sm text-muted">{p.base} · {p.distanceKm} km away · travels up to {p.travelKm} km · <Stars rating={p.rating} /> {p.rating}</span>
      </div>
      <div className="flex flex-wrap gap-2.5">
        <Button href={`/performers/${p.id}`} variant="secondary" className="text-sm">View profile</Button>
        <Button href={`/messages?to=${p.id}`} className="text-sm">Send message</Button>
      </div>
    </article>
  );
}

export function VenueRow({ v }: { v: Venue }) {
  return (
    <article className="card flex flex-wrap items-center gap-[18px] p-4">
      <Placeholder tone={v.tone} className="h-28 w-[170px] flex-none rounded-xl" />
      <div className="flex flex-[1_1_240px] flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="h-display text-[21px]">{v.name}</span>
          {v.openToNewActs && <span className="rounded-full bg-success px-2 py-1 text-xs font-bold text-success-ink">Open to new acts</span>}
        </div>
        <span className="text-slate">{v.type} · {v.area} · {v.distanceKm} km away · {v.capacity}</span>
        <div className="flex flex-wrap gap-1.5">{[...v.genres.slice(0, 2), v.nights].map((g) => <Tag key={g}>{g}</Tag>)}</div>
      </div>
      <div className="flex flex-wrap gap-2.5">
        <Button href={`/venues/${v.id}`} variant="secondary" className="text-sm">View venue</Button>
        <Button href={`/messages?to=${v.id}`} className="text-sm">Send message</Button>
      </div>
    </article>
  );
}

export function BigEventCard({ e }: { e: BigEvent }) {
  return (
    <article className="card flex flex-col overflow-hidden">
      <div className="relative">
        <Placeholder tone={e.tone} className="aspect-video" />
        <span className="absolute bottom-3 left-3"><DateBadge day={e.day} date={e.date} dark /></span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <span className="eyebrow">{e.category}</span>
        <span className="h-display text-[19px] leading-tight">{e.name}</span>
        <span className="text-sm text-slate">{e.venue} · {e.time}</span>
        <span className="text-sm text-muted">{e.price}</span>
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
        <Placeholder tone={s.tone} label={s.photo} className="aspect-[16/10] items-end justify-start p-3.5" />
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
