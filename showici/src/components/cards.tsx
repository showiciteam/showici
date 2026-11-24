"use client";

import Link from "@/components/LocalLink";
import { placeLabel } from "@/lib/regions";
import type { BigEvent, Performer, Show, Story, Venue } from "@/lib/types";
import { Button, DateBadge, Placeholder, PlayIcon, Stars, Tag } from "./ui";
import { useLang } from "@/lib/i18n";
import { label, labels } from "@/lib/labels";
import { venueHref } from "@/lib/seo";

export function ShowCard({ show, venue }: { show: Show; venue?: Venue }) {
  const { lang } = useLang();
  return (
    <Link href={`/shows/${show.id}`} className="card flex flex-col overflow-hidden text-navy no-underline hover:text-navy hover:shadow-md">
      <div className="relative">
        <Placeholder tone={show.tone} className="h-[150px]" />
        <span className="absolute bottom-3.5 left-3.5"><DateBadge day={show.day} date={show.date} dark /></span>
      </div>
      <div className="flex flex-col gap-1.5 p-[18px]">
        <span className="eyebrow">{label(lang, show.genre)}</span>
        <span className="h-display text-[21px]">{show.title}</span>
        {venue && <span className="text-[15px] text-slate">{venue.name} · {venue.area}</span>}
        <span className="text-sm text-muted">{show.time} · {show.entry}</span>
      </div>
    </Link>
  );
}

export function PerformerCard({ p }: { p: Performer }) {
  const { lang, tr } = useLang();
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-line bg-parchment p-[22px]">
      <div className="flex items-center gap-3.5">
        <Placeholder tone={p.tone} label={p.initials} className="h-14 w-14 flex-none rounded-full font-display text-xl text-navy" />
        <div className="flex flex-col gap-0.5">
          <span className="h-display text-xl">{p.name}</span>
          <span className="text-sm text-muted">{p.base} · {tr(`travels ${p.travelKm} km`, `se déplace jusqu'à ${p.travelKm} km`)}</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        <Tag>{label(lang, p.actType)}</Tag>
        <Tag>{label(lang, p.repertoire)} · {labels(lang, p.genres.slice(0, 2)).join(" / ")}</Tag>
        {p.eventTypes[0] && <Tag>{label(lang, p.eventTypes[0])}</Tag>}
      </div>
      <div className="mt-1 flex gap-2.5">
        <Button href={`/performers/${p.id}`} variant="secondary" className="flex-1 text-sm">{tr("Watch samples", "Voir les extraits")}</Button>
        <Button href={`/messages?to=${p.id}`} className="flex-1 text-sm">{tr("Contact", "Contacter")}</Button>
      </div>
    </article>
  );
}

export function PerformerRow({ p }: { p: Performer }) {
  const { lang, tr } = useLang();
  return (
    <article className="card flex flex-wrap items-center gap-5 p-5">
      <Link href={`/performers/${p.id}`} aria-label={tr(`${p.name} videos`, `Vidéos de ${p.name}`)} className="flex h-[100px] w-[168px] flex-none items-center justify-center rounded-xl bg-navy">
        <PlayIcon size={34} color="#A485FF" />
      </Link>
      <div className="flex flex-[1_1_240px] flex-col gap-1.5">
        <span className="flex items-center gap-2">
          <span className="h-display text-[22px]">{p.name}</span>
          {p.verified && <span className="text-xs font-bold text-brass-dark">✓ {tr("Verified", "Vérifié")}</span>}
        </span>
        <span className="text-[15px] text-slate">{label(lang, p.actType)} · {label(lang, p.repertoire)} · {labels(lang, p.genres).join(", ")}</span>
        <span className="text-sm text-muted">{p.base} · {tr(`${p.distanceKm} km away`, `à ${p.distanceKm} km`)} · {tr(`travels up to ${p.travelKm} km`, `se déplace jusqu'à ${p.travelKm} km`)} · <Stars rating={p.rating} /> {p.rating}</span>
      </div>
      <div className="flex flex-wrap gap-2.5">
        <Button href={`/performers/${p.id}`} variant="secondary" className="text-sm">{tr("View profile", "Voir le profil")}</Button>
        <Button href={`/messages?to=${p.id}`} className="text-sm">{tr("Send message", "Envoyer un message")}</Button>
      </div>
    </article>
  );
}

export function VenueRow({ v }: { v: Venue }) {
  const { lang, tr } = useLang();
  return (
    <article className="card flex flex-wrap items-center gap-[18px] p-4">
      <Placeholder tone={v.tone} className="h-28 w-[170px] flex-none rounded-xl" />
      <div className="flex flex-[1_1_240px] flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="h-display text-[21px]">{v.name}</span>
          {v.openToNewActs && v.claimed !== false && <span className="rounded-full bg-success px-2 py-1 text-xs font-bold text-success-ink">{tr("Open to new acts", "Ouverte aux nouveaux numéros")}</span>}
          {v.claimed === false && <span className="rounded-full border border-line-strong px-2 py-1 text-xs font-bold text-slate">{tr("Not claimed yet", "Pas encore réclamée")}</span>}
        </div>
        <span className="text-slate">{[label(lang, v.type), placeLabel(v.area, v.city), tr(`${v.distanceKm} km away`, `à ${v.distanceKm} km`), v.capacity].filter(Boolean).join(" · ")}</span>
        <div className="flex flex-wrap gap-1.5">{[...labels(lang, v.genres.slice(0, 2)), v.nights].filter(Boolean).map((g) => <Tag key={g}>{g}</Tag>)}</div>
      </div>
      <div className="flex flex-wrap gap-2.5">
        <Button href={venueHref(v)} variant="secondary" className="text-sm">{tr("View venue", "Voir la salle")}</Button>
        {v.claimed === false ? (
          <Button href={`${venueHref(v)}/claim`} variant="secondary" className="text-sm">{tr("Claim this venue", "Réclamer cette salle")}</Button>
        ) : (
          <Button href={`/messages?to=${v.id}`} className="text-sm">{tr("Send message", "Envoyer un message")}</Button>
        )}
      </div>
    </article>
  );
}

export function BigEventCard({ e }: { e: BigEvent }) {
  const { lang, tr } = useLang();
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
        <span className="eyebrow">{label(lang, e.category)}</span>
        <span className="h-display text-[19px] leading-tight">{e.name}</span>
        <span className="text-sm text-slate">{[e.venue, e.city].filter(Boolean).join(", ")}</span>
        <span className="text-sm text-slate">{[e.month ? `${e.month} ${e.date}` : "", e.time].filter(Boolean).join(" · ")}{e.moreDates ? tr(` · +${e.moreDates} more date${e.moreDates > 1 ? "s" : ""}`, ` · +${e.moreDates} autre${e.moreDates > 1 ? "s dates" : " date"}`) : ""}</span>
        {e.price && <span className="text-sm text-muted">{e.price}</span>}
        <Button href={e.url} external className="mt-auto text-sm">{tr("Get tickets ↗", "Billets ↗")}</Button>
        <span className="text-center text-[11px] text-muted">{tr("Ticketmaster or partner site", "Ticketmaster ou site partenaire")}</span>
      </div>
    </article>
  );
}

export function StoryCard({ s }: { s: Story }) {
  const { tr } = useLang();
  return (
    <Link href={`/spotlight/${s.slug}`} className="card flex flex-col overflow-hidden text-navy no-underline hover:text-navy hover:shadow-md">
      <div className="relative">
        <Placeholder tone={s.tone} label={s.photo} className="aspect-[16/10] items-end justify-start p-3.5" />
        {s.video && <span className="absolute right-3.5 top-3.5 rounded-full bg-navy px-2.5 py-1 text-xs font-bold text-white">▶ {tr("Video", "Vidéo")}</span>}
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
