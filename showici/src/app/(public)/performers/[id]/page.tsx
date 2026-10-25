import Link from "next/link";
import { notFound } from "next/navigation";
import { SaveButton } from "@/components/ProfileActions";
import { getPerformer, getReviewsFor, getShows, getVenues } from "@/lib/data";
import { isSaved } from "@/lib/dashboard";
import { getSessionUser } from "@/lib/session";
import { supabaseEnabled } from "@/lib/supabase/client";
import { Button, Placeholder, Stars, Tag } from "@/components/ui";
import { PhotoGallery, VideoPreview } from "@/components/Media";
import { actFamily } from "@/lib/acts";
import { ShareMenu } from "@/components/Social";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = await getPerformer(id);
  if (!p) return {};
  const description = `${p.actType} · ${p.genres.join(", ")} · ${p.base}. ${p.bio}`.slice(0, 200);
  return { title: `${p.name} · ShowIci`, description, openGraph: { title: `${p.name} on ShowIci`, description, ...((p.cover ?? p.photos?.[0]) ? { images: [(p.cover ?? p.photos?.[0]) as string] } : {}) } };
}

export default async function PerformerProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = await getPerformer(id);
  if (!p) notFound();
  const user = await getSessionUser();
  const [shows, venues, reviews, saved] = await Promise.all([getShows(), getVenues(), getReviewsFor(p.ownerId), isSaved(user?.id, "performer", p.id)]);
  const upcoming = shows.filter((s) => s.performerId === p.id);
  const venueById = Object.fromEntries(venues.map((v) => [v.id, v]));
  const featured = p.videos.find((v) => v.featured) ?? p.videos[0];
  const others = p.videos.filter((v) => v !== featured);
  const photos = p.photos ?? [];
  const isMe = Boolean(user && p.ownerId && user.id === p.ownerId);
  const header = p.cover ?? photos[0];
  const family = actFamily(p.actType);

  const facts: [string, string][] = [
    ["Type", `${p.actType}${p.members > 1 ? `, ${p.members} ${actFamily(p.actType).ownSound ? "members" : "performers"}` : ""}`],
    [family.repertoireLabel, p.repertoire],
    ["Languages", p.languages.join(", ")],
    ["Set length", p.setLength],
    ["Typical fee", p.feeRange],
    ["Based in", p.base],
    ["Travels", `Up to ${p.travelKm} km`],
  ];

  return (
    <>
      {header ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={header} alt={`${p.name} live`} className="h-[220px] w-full object-cover sm:h-[300px]" />
      ) : (
        <Placeholder tone={p.tone} label={supabaseEnabled ? "" : "[Cover photo: live on stage]"} className="h-[300px]" />
      )}
      <div className="wrap pb-[72px]">
        <div className="-mt-16 flex flex-wrap items-end gap-6">
          {p.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.logo} alt={`${p.name} logo`} className="h-[148px] w-[148px] flex-none rounded-full border-[6px] border-ivory bg-white object-cover" />
          ) : (
            <Placeholder tone="ph-2" label={p.initials} className="h-[148px] w-[148px] flex-none rounded-full border-[6px] border-ivory text-4xl text-navy" />
          )}
          <div className="flex flex-[1_1_320px] flex-col gap-2 pb-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="h-display text-[44px]">{p.name}</h1>
              {p.verified && <span className="inline-flex items-center gap-1 rounded-full bg-ph-3 px-2.5 py-1 text-[13px] font-bold text-[#1B4F80]">✓ Verified</span>}
              {!p.available && <span className="rounded-full bg-line px-2.5 py-1 text-[13px] font-bold text-muted">Not taking gigs right now</span>}
            </div>
            <span className="text-[17px] text-slate">{p.actType} · {p.genres.join(", ")} · {p.base} · travels up to {p.travelKm} km</span>
            <span className="flex items-center gap-1.5">
              {p.reviewCount > 0 ? <><Stars rating={p.rating} /><strong>{p.rating}</strong><a href="#reviews">{p.reviewCount} reviews</a></> : <span className="hint">No reviews yet</span>}
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5 pb-1.5">
            {isMe ? (
              <Button href="/register/performer" variant="secondary">Edit my profile</Button>
            ) : (
              <SaveButton kind="performer" id={p.id} initial={saved} signedIn={Boolean(user)} />
            )}
            <ShareMenu title={`${p.name} on ShowIci`} caption={`${p.name} on ShowIci: ${p.actType}, ${p.genres.slice(0, 2).join(", ")}. Book local talent.`} />
            {!isMe && <Button href={`/messages?to=${p.id}`} className="px-6">Send message</Button>}
          </div>
        </div>

        <div className="mb-8 mt-[22px] flex flex-wrap gap-2">
          {[...p.eventTypes, p.languages.length > 1 ? p.languages.map((l) => l.slice(0, 2).toUpperCase()).join(" + ") : p.languages[0]].filter(Boolean).map((t) => <Tag key={t}>{t}</Tag>)}
        </div>

        <div className="flex flex-wrap items-start gap-8">
          <div className="flex min-w-0 flex-[999_1_600px] flex-col gap-10">
            {featured && (
              <section className="flex flex-col gap-3.5">
                <h2 className="h-display text-[28px]">Watch us live</h2>
                <VideoPreview url={featured.url} title={featured.title} length={featured.length} big />
                {others.length > 0 && (
                  <div className="mt-1 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-3 gap-y-4">
                    {others.map((v) => <VideoPreview key={v.url ?? v.title} url={v.url} title={v.title} length={v.length} />)}
                  </div>
                )}
              </section>
            )}
            <section className="flex flex-col gap-3">
              <h2 className="h-display text-[28px]">About</h2>
              <p className="whitespace-pre-line text-[17px] leading-relaxed text-ink-2">{p.bio || "No bio yet."}</p>
            </section>
            {(photos.length > (p.cover ? 0 : 1) || !supabaseEnabled) && (
              <section className="flex flex-col gap-3.5">
                <h2 className="h-display text-[28px]">Photos</h2>
                {photos.length > 0 ? (
                  <PhotoGallery photos={photos} alt={p.name} />
                ) : (
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2.5">
                    {(["ph-1", "ph-2", "ph-3", "ph-4", "ph-5", "ph-1"] as const).map((t, i) => <Placeholder key={i} tone={t} label="[Photo]" className="aspect-square rounded-xl" />)}
                  </div>
                )}
              </section>
            )}
            <section className="flex flex-col gap-3.5">
              <h2 className="h-display text-[28px]">Upcoming shows</h2>
              {upcoming.length === 0 && <p className="text-slate">No public shows posted right now.</p>}
              {upcoming.map((s) => (
                <Link key={s.id} href={`/shows/${s.id}`} className="card flex items-center gap-4 p-3.5 text-navy no-underline">
                  <span className="rounded-[10px] bg-brass-tint px-3 py-2 text-center text-xs font-bold leading-tight text-navy-deep">{s.day}<br /><span className="font-display text-[22px]">{s.date}</span></span>
                  <span className="flex flex-1 flex-col"><strong>{venueById[s.venueId]?.name ?? s.title}</strong><span className="text-sm text-muted">{venueById[s.venueId]?.area} · {s.time}</span></span>
                  <span className="font-bold text-brass-dark">Details →</span>
                </Link>
              ))}
            </section>
            <section id="reviews" className="flex flex-col gap-3.5">
              <h2 className="h-display text-[28px]">Reviews from bookers</h2>
              {supabaseEnabled ? (
                reviews.length === 0 ? (
                  <p className="text-slate">No reviews yet. Venues and planners can review {p.name} after talking on ShowIci.</p>
                ) : (
                  reviews.map((r) => (
                    <article key={r.id} className="card flex flex-col gap-2 p-5">
                      <div className="flex justify-between"><strong>{r.author}</strong><Stars rating={r.rating} /></div>
                      <span className="hint">{[r.context, r.date].filter(Boolean).join(" · ")}</span>
                      {r.tags.length > 0 && <div className="flex flex-wrap gap-1.5">{r.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>}
                      {r.body && <p className="leading-relaxed text-ink-2">{r.body}</p>}
                    </article>
                  ))
                )
              ) : (
                [["[Pub name]", "Venue · Friday night show"], ["[Planner first name]", "Private event · Quinceañera"]].map(([who, ev]) => (
                  <article key={who} className="card flex flex-col gap-2 p-5">
                    <div className="flex justify-between"><strong>{who}</strong><Stars rating={5} /></div>
                    <span className="hint">{ev}</span>
                    <p className="leading-relaxed text-ink-2">[Review text from someone who booked this act.]</p>
                  </article>
                ))
              )}
            </section>
          </div>

          <aside className="flex max-w-[380px] flex-[1_1_300px] flex-col gap-4">
            <div className="card flex flex-col gap-3.5 p-[22px]">
              <h3 className="h-display text-xl">Details</h3>
              {facts.filter(([, v]) => v).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 border-b border-line pb-2.5 text-[15px]"><span className="text-muted">{k}</span><strong className="text-right">{v}</strong></div>
              ))}
            </div>
            {(p.links?.length ?? 0) > 0 && (
              <div className="card flex flex-col gap-3 p-[22px]">
                <h3 className="h-display text-xl">Find them online</h3>
                <div className="flex flex-wrap gap-2">{p.links!.map((l) => <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line-strong bg-white px-3 py-1 text-[13px] text-ink-2 no-underline">{l.label} ↗</a>)}</div>
              </div>
            )}
            {!isMe && (
              <div className="flex flex-col gap-3 rounded-2xl bg-parchment p-[22px]">
                <strong className="text-[17px]">Planning a show or party?</strong>
                <span className="text-[15px] text-slate">Message {p.name} through ShowIci. Contact details stay private, and you agree on payment directly.</span>
                <Button href={`/messages?to=${p.id}`}>Send message</Button>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}
