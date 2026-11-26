"use client";

import Link from "@/components/Link";
import { useLang } from "@/lib/i18n";
import { dayLabel, label, monthLabel } from "@/lib/labels";
import { placeLabel } from "@/lib/regions";
import type { BigEvent, Performer, Show, Story, Venue } from "@/lib/types";
import { youTubeId } from "@/lib/youtube";
import { Placeholder, PlayIcon } from "./ui";

/** Best picture for a performer: cover photo, then first photo, then the main YouTube video's thumbnail. */
export function performerPicture(p: Performer): string | undefined {
  if (p.cover) return p.cover;
  if (p.photos?.[0]) return p.photos[0];
  const v = p.videos.find((x) => x.featured) ?? p.videos[0];
  const id = youTubeId(v?.url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : undefined;
}

const copy = {
  fr: {
    tickets: "Billets",
    onTicketmaster: "Sur Ticketmaster",
    moreDates: (n: number) => ` · +${n} date${n > 1 ? "s" : ""}`,
    km: (n: number) => `à ${n} km`,
    travels: (n: number) => `se déplace jusqu’à ${n} km`,
    listed: "Ajouté par ShowIci",
    notClaimed: "Non revendiquée",
    open: "Ouverte aux nouveaux artistes",
    verified: "Vérifié",
    claim: "Revendiquer",
    viewProfile: "Voir le profil",
    viewVenue: "Voir la salle",
    message: "Écrire",
    video: "Vidéo",
    photoLater: "Photo ajoutée à la revendication",
  },
  en: {
    tickets: "Tickets",
    onTicketmaster: "On Ticketmaster",
    moreDates: (n: number) => ` · +${n} more date${n > 1 ? "s" : ""}`,
    km: (n: number) => `${n} km away`,
    travels: (n: number) => `travels up to ${n} km`,
    listed: "Listed by ShowIci",
    notClaimed: "Not claimed yet",
    open: "Open to new acts",
    verified: "Verified",
    claim: "Claim",
    viewProfile: "View profile",
    viewVenue: "View venue",
    message: "Message",
    video: "Video",
    photoLater: "Photo added once claimed",
  },
};

function DateStack({ day, date, month }: { day: string; date: string; month?: string }) {
  const { lang } = useLang();
  return (
    <span className="flex w-12 flex-none flex-col items-center font-display font-extrabold leading-tight">
      <span className="text-[11px] text-on-dark">{dayLabel(day, lang)}</span>
      <span className="text-2xl">{date}</span>
      {month && <span className="text-[11px] text-on-dark">{monthLabel(month, lang)}</span>}
    </span>
  );
}

/** Photo tile with the name over a dark fade: artists to discover, big events on the home page. */
export function TileCard({ href, external = false, image, title, meta }: { href: string; external?: boolean; image?: string; title: string; meta: string }) {
  const inner = (
    <>
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
      ) : (
        <span className="absolute inset-0 bg-gradient-to-br from-ink-soft to-ink" />
      )}
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-3.5 pt-12">
        <span className="block font-display text-[17px] font-bold leading-tight">{title}</span>
        <span className="mt-0.5 block text-[13px] text-[#E0E0E5]">{meta}</span>
      </span>
    </>
  );
  const cls = "group relative block aspect-[4/5] overflow-hidden rounded-xl bg-ink text-white no-underline hover:text-white";
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer sponsored" className={cls}>{inner}</a>
  ) : (
    <Link href={href} className={cls}>{inner}</Link>
  );
}

/** One line of the "on stage this week" list (dark background). */
export function ShowRow({ show, venue }: { show: Show; venue?: Venue }) {
  const { lang } = useLang();
  return (
    <Link href={`/shows/${show.id}`} className="flex items-center gap-4 border-t border-white/10 py-3.5 text-white no-underline first:border-t-0 hover:text-white">
      <DateStack day={show.day} date={show.date} />
      <span className="min-w-0 flex-1">
        <span className="block truncate font-display font-bold">{show.title}</span>
        <span className="block truncate text-sm text-on-dark">{venue ? `${venue.name}, ${venue.city}` : ""}</span>
      </span>
      <span className="hidden rounded-full bg-accent px-3 py-1 text-xs font-bold sm:inline">{label(show.genre, lang)}</span>
    </Link>
  );
}

/** A big event in the same list style, linking to its Ticketmaster page. */
export function EventRow({ e }: { e: BigEvent }) {
  const { lang } = useLang();
  return (
    <a href={e.url} target="_blank" rel="noopener noreferrer sponsored" className="flex items-center gap-4 border-t border-white/10 py-3.5 text-white no-underline first:border-t-0 hover:text-white">
      <DateStack day={e.day} date={e.date} month={e.month} />
      {e.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={e.image} alt="" loading="lazy" className="hidden h-[60px] w-24 flex-none rounded-lg object-cover sm:block" />
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate font-display font-bold">{e.name}</span>
        <span className="block truncate text-sm text-on-dark">{[e.venue, e.city].filter(Boolean).join(", ")}</span>
      </span>
      <span className="hidden rounded-full bg-accent px-3 py-1 text-xs font-bold sm:inline">{label(e.category, lang)}</span>
    </a>
  );
}

/** Local show card with a date badge (light background). */
export function ShowCard({ show, venue }: { show: Show; venue?: Venue }) {
  const { lang } = useLang();
  return (
    <Link href={`/shows/${show.id}`} className="card flex flex-col overflow-hidden text-ink no-underline hover:text-ink hover:shadow-md">
      <span className="relative block">
        {venue?.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={venue.logo} alt={`${venue.name} logo`} loading="lazy" className="h-[150px] w-full border-b border-line bg-white object-contain p-5" />
        ) : (
          <Placeholder tone={show.tone} className="h-[150px]" />
        )}
        <span className="absolute left-2.5 top-2.5 rounded-md bg-ink px-2 py-1.5 text-white"><DateStack day={show.day} date={show.date} /></span>
        <span className="absolute bottom-2.5 left-2.5 rounded bg-accent px-2 py-0.5 text-xs font-bold text-white">{label(show.genre, lang)}</span>
      </span>
      <span className="flex flex-col gap-1 p-4">
        <span className="font-display text-[17px] font-extrabold">{show.title}</span>
        {venue && <span className="text-sm text-slate">{venue.name} · {venue.city}</span>}
        <span className="text-sm text-muted">{show.time} · {show.entry}</span>
      </span>
    </Link>
  );
}

/** Big event card with the Ticketmaster button. */
export function BigEventCard({ e }: { e: BigEvent }) {
  const { lang } = useLang();
  const c = copy[lang];
  return (
    <article className="relative flex min-h-[260px] flex-col justify-end overflow-hidden rounded-xl bg-ink text-white">
      {e.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={e.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <Placeholder tone={e.tone} className="absolute inset-0" />
      )}
      <div className="relative bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 pt-16">
        <span className="rounded bg-accent px-2 py-1 text-[11px] font-extrabold uppercase tracking-wide">{label(e.category, lang)}</span>
        <h3 className="mt-2 font-display text-lg font-extrabold leading-tight">{e.name}</h3>
        <p className="mt-1 text-[13px] text-[#E0E0E5]">
          {[e.month ? `${e.date} ${monthLabel(e.month, lang).toLowerCase()}` : "", e.time].filter(Boolean).join(" · ")}
          {e.moreDates ? c.moreDates(e.moreDates) : ""}
        </p>
        <p className="text-[13px] text-[#E0E0E5]">{[e.venue, e.city].filter(Boolean).join(", ")}</p>
        <a href={e.url} target="_blank" rel="noopener noreferrer sponsored" className="mt-3 inline-flex min-h-10 items-center rounded-full bg-accent px-4 font-display text-sm font-bold text-white no-underline hover:bg-accent-dark hover:text-white">
          {c.tickets} ↗
        </a>
        <span className="ml-2 text-[11px] text-on-dark">{c.onTicketmaster}</span>
      </div>
    </article>
  );
}

/** Artist card for the artists list: photo with name, city and tags. */
export function PerformerTile({ p }: { p: Performer }) {
  const { lang } = useLang();
  const picture = performerPicture(p);
  return (
    <Link href={`/performers/${p.id}`} className="group relative block aspect-[4/5] overflow-hidden rounded-xl bg-ink text-white no-underline hover:text-white">
      {picture ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={picture} alt={p.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ink-soft to-ink font-display text-5xl font-extrabold text-accent">{p.initials}</span>
      )}
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-14">
        <span className="flex items-center gap-1.5 font-display text-lg font-extrabold leading-tight">
          {p.name}
          {p.verified && <span className="sr-only">({copy[lang].verified})</span>}
          {p.verified && <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#D7141F" /><path d="m7.5 12 3 3 6-6" stroke="#fff" strokeWidth="2.4" fill="none" /></svg>}
        </span>
        <span className="mt-0.5 block text-[13px] text-[#E0E0E5]">{p.base}</span>
        <span className="mt-2 flex flex-wrap gap-1.5">
          {[p.actType, ...p.genres.slice(0, 1)].map((t) => (
            <span key={t} className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold">{label(t, lang)}</span>
          ))}
        </span>
      </span>
    </Link>
  );
}

/** Older list-style artist row (kept for compact lists). */
export function PerformerRow({ p }: { p: Performer }) {
  const { lang } = useLang();
  const c = copy[lang];
  const picture = performerPicture(p);
  return (
    <article className="card flex flex-wrap items-center gap-5 p-4">
      <Link href={`/performers/${p.id}`} aria-label={p.name} className="flex h-[100px] w-[168px] flex-none items-center justify-center overflow-hidden rounded-xl bg-ink">
        {picture ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={picture} alt="" loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <PlayIcon size={34} color="#E3262F" />
        )}
      </Link>
      <div className="flex flex-[1_1_240px] flex-col gap-1">
        <span className="font-display text-xl font-extrabold">{p.name}</span>
        <span className="text-[15px] text-slate">{[p.actType, p.repertoire, ...p.genres].map((g) => label(g, lang)).join(" · ")}</span>
        <span className="text-sm text-muted">{p.base} · {p.claimed === false ? c.listed : c.travels(p.travelKm)}</span>
      </div>
      <Link href={`/performers/${p.id}`} className="font-display font-bold no-underline">{c.viewProfile} →</Link>
    </article>
  );
}

const VENUE_ICON: Record<string, React.ReactNode> = {
  Pub: <path d="M6 4h10v16H6zM16 8h3v7h-3M8 8v8M11 8v8M14 8v8" />,
  Bar: <path d="M5 4h14l-7 8zM12 12v8M8 20h8" />,
  Restaurant: <path d="M7 3v8a2 2 0 0 0 2 2v8M11 3v8M17 3c-2 2-2 6 0 8v10" />,
  Brewery: <path d="M7 6h9v14H7zM16 9h2.5a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5H16M7 6a3 3 0 0 1 5-2 3 3 0 0 1 4 2" />,
  Café: <path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM17 10h2a2 2 0 0 1 0 4h-2M8 3v2M12 3v2" />,
  Club: <path d="M4 19c0-6 3-11 8-11s8 5 8 11M12 8V3M8 4l2 4M16 4l-2 4" />,
};
const HALL_ICON = <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" />;

/** Venue card for the venues list: photo or type icon, name, place, type and styles. */
export function VenueCard({ v }: { v: Venue }) {
  const { lang } = useLang();
  const c = copy[lang];
  const picture = v.photos?.[0];
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-line bg-white">
      <Link href={`/venues/${v.id}`} aria-label={v.name} className="relative flex h-40 items-center justify-center bg-[radial-gradient(70%_90%_at_50%_0%,rgba(215,20,31,0.45),transparent_70%),linear-gradient(160deg,#26262B,#121214)]">
        {picture ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={picture} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        ) : v.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={v.logo} alt="" loading="lazy" className="h-24 w-40 rounded-lg bg-white object-contain p-2" />
        ) : (
          <>
            <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{VENUE_ICON[v.type] ?? HALL_ICON}</svg>
            {v.claimed === false && <span className="absolute bottom-2.5 left-3 text-[11px] text-on-dark">{c.photoLater}</span>}
          </>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="mt-1 flex-none"><path d="M12 22s-8-7-8-13a8 8 0 0 1 16 0c0 6-8 13-8 13z" fill="#D7141F" /><circle cx="12" cy="9" r="3" fill="#fff" /></svg>
          <div className="min-w-0">
            <Link href={`/venues/${v.id}`} className="font-display text-[17px] font-extrabold text-ink no-underline hover:text-accent">{v.name}</Link>
            <p className="text-[13px] text-muted">{[placeLabel(v.area, v.city), v.distanceKm ? c.km(v.distanceKm) : ""].filter(Boolean).join(" · ")}</p>
          </div>
        </div>
        <p className="text-[13px] text-graphite">{v.claimed === false ? c.notClaimed : v.openToNewActs ? c.open : ""}</p>
        <div className="mt-auto flex flex-wrap gap-1.5">
          <span className="rounded-full border-[1.5px] border-accent px-2.5 py-0.5 text-xs font-bold text-accent">{label(v.type, lang)}</span>
          {v.genres.slice(0, 2).map((g) => (
            <span key={g} className="rounded-full border border-line-strong px-2.5 py-0.5 text-xs font-semibold">{label(g, lang)}</span>
          ))}
        </div>
        {v.claimed === false && (
          <Link href={`/venues/${v.id}/claim`} className="text-[13px] font-bold no-underline">{c.claim} →</Link>
        )}
      </div>
    </article>
  );
}

/** Older list-style venue row (kept for compact lists). */
export function VenueRow({ v }: { v: Venue }) {
  return <VenueCard v={v} />;
}

/** Spotlight story card. */
export function StoryCard({ s }: { s: Story }) {
  const { lang } = useLang();
  const text = s.article?.[lang];
  return (
    <Link href={`/spotlight/${s.slug}`} className="flex flex-col text-ink no-underline hover:text-ink">
      <span className="relative block aspect-[4/3] overflow-hidden rounded-xl bg-ink">
        {s.article && s.photo.startsWith("/") ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={s.photo} alt={s.article.artist} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <Placeholder tone={s.tone} label={s.photo} className="h-full items-end justify-start p-3.5" />
        )}
        <span className="absolute left-3 top-3 rounded bg-accent px-2 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white">{text?.category ?? s.category}</span>
        {s.video && <span className="absolute right-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-xs font-bold text-white">▶ {copy[lang].video}</span>}
      </span>
      <span className="mb-1.5 mt-3.5 block text-[13px] text-muted">{s.city}</span>
      <span className="block font-display text-[19px] font-extrabold leading-tight">{text?.title ?? s.title}</span>
      <span className="mt-1.5 block leading-relaxed text-slate">{text?.dek ?? s.dek}</span>
      <span className="mt-2 block text-[13px] text-muted">{text?.date ?? s.date} · {text?.read ?? s.read}</span>
    </Link>
  );
}
