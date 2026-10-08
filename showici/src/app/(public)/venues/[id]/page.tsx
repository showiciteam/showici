import Link from "next/link";
import { notFound } from "next/navigation";
import { SaveButton, ShareButton } from "@/components/ProfileActions";
import { getReviewsFor, getShows, getVenue } from "@/lib/data";
import { isSaved } from "@/lib/dashboard";
import { getSessionUser } from "@/lib/session";
import { supabaseEnabled } from "@/lib/supabase/client";
import { Button, Placeholder, Stars, Tag } from "@/components/ui";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const v = await getVenue(id);
  if (!v) return {};
  const description = `${v.type} in ${[v.area, v.city].filter(Boolean).join(", ")}. ${v.description}`.slice(0, 200);
  return { title: `${v.name} · ShowIci`, description, openGraph: { title: `${v.name} on ShowIci`, description, ...(v.photos?.[0] ? { images: [v.photos[0]] } : {}) } };
}

export default async function VenueProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const v = await getVenue(id);
  if (!v) notFound();
  const user = await getSessionUser();
  const [allShows, reviews, following] = await Promise.all([getShows(), getReviewsFor(v.ownerId), isSaved(user?.id, "venue", v.id)]);
  const shows = allShows.filter((s) => s.venueId === v.id);
  const photos = v.photos ?? [];
  const isMe = Boolean(user && v.ownerId && user.id === v.ownerId);
  const address = [v.street, v.city].filter(Boolean).join(", ");
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${v.name}, ${address}`)}`;

  return (
    <div className="wrap pb-[72px] pt-6">
      {photos.length > 0 ? (
        <div className="grid grid-cols-4 grid-rows-[170px_170px] gap-2.5 overflow-hidden rounded-[18px]">
          {photos.slice(0, 5).map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt="" className={`h-full w-full object-cover ${i === 0 ? "col-span-2 row-span-2" : ""}`} />
          ))}
        </div>
      ) : supabaseEnabled ? (
        <Placeholder tone={v.tone} label={v.name} className="h-[220px] rounded-[18px] text-xl text-navy" />
      ) : (
        <div className="grid grid-cols-4 grid-rows-[170px_170px] gap-2.5 overflow-hidden rounded-[18px]">
          <Placeholder tone={v.tone} label="[Stage photo]" className="col-span-2 row-span-2" />
          <Placeholder tone="ph-3" label="[The room]" />
          <Placeholder tone="ph-4" label="[Bar]" />
          <Placeholder tone="ph-5" label="[Crowd]" />
          <Placeholder tone="ph-1" label="+ more photos" />
        </div>
      )}

      <div className="mb-7 mt-[26px] flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-col gap-2">
          <h1 className="h-display text-[44px]">{v.name}</h1>
          <span className="text-[17px] text-slate">{[v.type, [v.area, v.city].filter(Boolean).join(", "), v.capacity].filter(Boolean).join(" · ")}</span>
          {v.rating > 0 ? (
            <span className="flex items-center gap-1.5"><Stars rating={v.rating} /><strong>{v.rating}</strong><span className="hint text-sm">from performers</span></span>
          ) : (
            <span className="hint text-sm">No reviews yet</span>
          )}
        </div>
        <div className="flex flex-wrap gap-2.5">
          {isMe ? <Button href="/register/venue" variant="secondary">Edit my venue</Button> : <SaveButton kind="venue" id={v.id} initial={following} signedIn={Boolean(user)} />}
          <ShareButton title={`${v.name} on ShowIci`} />
          {!isMe && <Button href={`/messages?to=${v.id}`}>Message about a gig</Button>}
        </div>
      </div>

      <div className="flex flex-wrap items-start gap-8">
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-9">
          <section className="flex flex-col gap-2.5">
            <h2 className="h-display text-[26px]">About the venue</h2>
            <p className="whitespace-pre-line text-[17px] leading-relaxed text-ink-2">{v.description || "No description yet."}</p>
          </section>
          <section className="flex flex-col gap-3">
            <h2 className="h-display text-[26px]">Upcoming shows</h2>
            {shows.length === 0 && <p className="text-slate">No shows posted yet.</p>}
            {shows.map((s) => (
              <Link key={s.id} href={`/shows/${s.id}`} className="card flex items-center gap-4 p-3.5 text-navy no-underline">
                <span className="rounded-[10px] bg-brass-tint px-3 py-2 text-center text-xs font-bold leading-tight text-navy-deep">{s.day}<br /><span className="font-display text-[22px]">{s.date}</span></span>
                <span className="flex flex-1 flex-col"><strong>{s.title}</strong><span className="text-sm text-muted">{[s.genre, s.time, s.entry].filter(Boolean).join(" · ")}</span></span>
                <span className="font-bold text-brass-dark">Details →</span>
              </Link>
            ))}
          </section>
          <section className="flex flex-col gap-3">
            <h2 className="h-display text-[26px]">What performers say</h2>
            {supabaseEnabled ? (
              reviews.length === 0 ? (
                <p className="text-slate">No reviews yet.</p>
              ) : (
                reviews.map((r) => (
                  <article key={r.id} className="card flex flex-col gap-2 p-5">
                    <div className="flex justify-between"><strong>{r.author}</strong><Stars rating={r.rating} /></div>
                    <span className="hint">{[r.context, r.date].filter(Boolean).join(" · ")}</span>
                    {r.tags.length > 0 && <div className="flex flex-wrap gap-1.5">{r.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>}
                    {r.body && <p className="text-ink-2">{r.body}</p>}
                  </article>
                ))
              )
            ) : (
              <article className="card flex flex-col gap-2 p-5"><div className="flex justify-between"><strong>[Band name]</strong><Stars rating={5} /></div><p className="text-ink-2">[Review from a performer who played here.]</p></article>
            )}
          </section>
        </div>
        <aside className="flex max-w-[380px] flex-[1_1_300px] flex-col gap-4">
          <div className="card flex flex-col gap-3.5 p-[22px]">
            <h3 className="h-display text-xl">What they book</h3>
            <div className="flex flex-wrap gap-1.5">{v.books.map((b) => <Tag key={b}>{b}</Tag>)}</div>
            <div className="flex flex-wrap gap-1.5">{v.genres.map((g) => <Tag key={g}>{g}</Tag>)}</div>
            {[["Live nights", v.nights], ["Books", v.leadTime], ["Fee range", v.feeRange], ["New acts", v.openToNewActs ? "Welcome" : "Established acts"]].filter(([, val]) => val).map(([k, val]) => (
              <div key={k} className="flex justify-between gap-3 border-t border-line pt-3"><span className="text-muted">{k}</span><strong className="text-right">{val}</strong></div>
            ))}
          </div>
          {v.equipment.length > 0 && (
            <div className="card flex flex-col gap-2.5 p-[22px]">
              <h3 className="h-display text-xl">Equipment</h3>
              {v.equipment.map((e) => <span key={e}>✓ {e}</span>)}
            </div>
          )}
          <div className="card overflow-hidden">
            <div className="relative h-[150px] bg-[#E9EDE6]"><span className="absolute left-1/2 top-1/2 -ml-[9px] -mt-[9px] h-[18px] w-[18px] rounded-full border-[3px] border-white bg-navy" /></div>
            <div className="flex flex-col gap-1.5 p-4">
              <span className="text-slate">{address || (supabaseEnabled ? v.city : `[Street address], ${v.city}`)}</span>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="font-bold no-underline">Get directions →</a>
            </div>
          </div>
          {(v.links?.length ?? 0) > 0 && (
            <div className="card flex flex-wrap gap-2 p-[22px]">
              {v.links!.map((l) => <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line-strong bg-white px-3 py-1 text-[13px] text-ink-2 no-underline">{l.label} ↗</a>)}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
