import Link from "@/components/Link";
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
import type { Metadata } from "next";
import { label } from "@/lib/labels";
import { isLang, localize, type Lang } from "@/lib/lang";
import { absoluteUrl, jsonLd, pageMetadata } from "@/lib/seo";
import type { Performer } from "@/lib/types";

type Params = Promise<{ lang: string; id: string }>;

const copy = {
  fr: {
    on: "sur ShowIci", verified: "Vérifié", notTaking: "Ne prend pas de contrats pour l’instant", travels: (n: number) => `se déplace jusqu’à ${n} km`,
    listed: "Ajouté par ShowIci · Non revendiqué", reviews: (n: number) => `${n} avis`, noReviews: "Aucun avis pour l’instant",
    edit: "Modifier mon profil", claimIt: "C’est vous? Revendiquez ce profil", message: "Écrire un message",
    areYou: (n: string) => `Vous êtes ${n}?`,
    claimText: "Nous avons créé cette page à partir de notre entrevue et de vos pages publiques pour que les salles et les organisateurs puissent vous trouver. Revendiquez-la pour modifier votre profil, ajouter des photos et des vidéos, et recevoir des demandes.",
    claim: "Revendiquer ce profil", watch: "En spectacle", about: "À propos", noBio: "Pas encore de bio.", photos: "Photos", upcoming: "Prochains spectacles",
    noShows: "Aucun spectacle public pour l’instant.", details: "Détails", reviewsTitle: "Avis des salles et organisateurs",
    noReviewsYet: (n: string) => `Aucun avis pour l’instant. Les salles et les organisateurs peuvent laisser un avis sur ${n} après avoir échangé sur ShowIci.`,
    facts: { type: "Type", members: "membres", performers: "artistes", languages: "Langues", set: "Durée du spectacle", fee: "Cachet habituel", base: "Basé à", travel: "Déplacements", upTo: (n: number) => `Jusqu’à ${n} km` },
    online: "Sur le web", book: (n: string) => `Réserver ${n}?`,
    notHere: (n: string) => `${n} n’est pas encore sur ShowIci : les messages ne peuvent pas l’atteindre ici. Contactez l’artiste par ses liens officiels ci-dessus.`,
    sources: "Ces informations viennent de notre entrevue et des pages publiques de l’artiste, et peuvent ne plus être à jour. Une erreur, ou vous voulez retirer cette page? Écrivez-nous avec le lien Contact au bas de la page.",
    planning: "Vous organisez un spectacle ou une fête?", planningText: (n: string) => `Écrivez à ${n} sur ShowIci. Vos coordonnées restent privées et vous convenez du paiement directement.`,
    caption: (n: string, t: string) => `${n} sur ShowIci : ${t}. Les artistes d’ici.`,
  },
  en: {
    on: "on ShowIci", verified: "Verified", notTaking: "Not taking gigs right now", travels: (n: number) => `travels up to ${n} km`,
    listed: "Listed by ShowIci · Not claimed yet", reviews: (n: number) => `${n} reviews`, noReviews: "No reviews yet",
    edit: "Edit my profile", claimIt: "Is this you? Claim it", message: "Send message",
    areYou: (n: string) => `Are you ${n}?`,
    claimText: "We created this page from our interview and your public pages so venues and event planners can find you. Claim it to edit your profile, add photos and videos, and get booking messages.",
    claim: "Claim this profile", watch: "Watch us live", about: "About", noBio: "No bio yet.", photos: "Photos", upcoming: "Upcoming shows",
    noShows: "No public shows posted right now.", details: "Details", reviewsTitle: "Reviews from bookers",
    noReviewsYet: (n: string) => `No reviews yet. Venues and planners can review ${n} after talking on ShowIci.`,
    facts: { type: "Type", members: "members", performers: "performers", languages: "Languages", set: "Set length", fee: "Typical fee", base: "Based in", travel: "Travels", upTo: (n: number) => `Up to ${n} km` },
    online: "Find them online", book: (n: string) => `Want to book ${n}?`,
    notHere: (n: string) => `${n} isn’t on ShowIci yet, so messages can’t reach them here. Contact them through their official links above.`,
    sources: "Details come from our interview and the artist’s public pages, and may be out of date. Something wrong, or want this page removed? Use Contact at the bottom of the page.",
    planning: "Planning a show or party?", planningText: (n: string) => `Message ${n} through ShowIci. Contact details stay private, and you agree on payment directly.`,
    caption: (n: string, t: string) => `${n} on ShowIci: ${t}. Book local talent.`,
  },
};

function describe(p: Performer, lang: Lang) {
  const kind = [label(p.actType, lang), ...p.genres.slice(0, 3).map((g) => label(g, lang))].join(" · ");
  return `${kind} · ${p.base}. ${p.bio}`.slice(0, 200);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, id } = await params;
  const p = await getPerformer(id);
  if (!p || !isLang(lang)) return {};
  return pageMetadata({ lang, path: `/performers/${p.id}`, title: `${p.name} · ${copy[lang].on}`, description: describe(p, lang), image: p.cover ?? p.photos?.[0] });
}

export default async function PerformerProfile({ params }: { params: Params }) {
  const { lang: raw, id } = await params;
  const lang: Lang = isLang(raw) ? raw : "fr";
  const c = copy[lang];
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
  const unclaimed = p.claimed === false;
  const header = p.cover ?? photos[0];
  const family = actFamily(p.actType);

  const facts: [string, string][] = [
    [c.facts.type, `${label(p.actType, lang)}${p.members > 1 ? `, ${p.members} ${family.ownSound ? c.facts.members : c.facts.performers}` : ""}`],
    [lang === "fr" ? "Répertoire" : family.repertoireLabel, label(p.repertoire, lang)],
    [c.facts.languages, p.languages.join(", ")],
    [c.facts.set, p.setLength],
    [c.facts.fee, p.feeRange],
    [c.facts.base, p.base],
    [c.facts.travel, unclaimed ? "" : c.facts.upTo(p.travelKm)],
  ];

  // Search engines: who this artist is, where they are and where to see them.
  const profileLd = {
    "@context": "https://schema.org",
    "@type": family.ownSound ? "MusicGroup" : "PerformingGroup",
    name: p.name,
    description: describe(p, lang),
    url: absoluteUrl(localize(`/performers/${p.id}`, lang)),
    image: header ? absoluteUrl(header) : undefined,
    genre: p.genres.length ? p.genres : undefined,
    foundingLocation: { "@type": "Place", name: `${p.base}, Québec` },
    sameAs: p.links?.map((l) => l.url),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(profileLd) }} />
      {header ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={header} alt={p.name} className="h-[220px] w-full bg-ink object-cover sm:h-[320px]" />
      ) : (
        <div className="h-[220px] bg-[radial-gradient(60%_120%_at_70%_0%,rgba(215,20,31,0.55),transparent_70%),#0B0B0D] sm:h-[300px]" />
      )}
      <div className="wrap pb-[72px]">
        <div className="flex flex-wrap items-end gap-6">
          {p.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.logo} alt={`${p.name} logo`} className="-mt-16 h-[148px] w-[148px] flex-none rounded-full border-[6px] border-paper bg-white object-cover" />
          ) : (
            photos[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photos[0]} alt="" className="-mt-16 h-[148px] w-[148px] flex-none rounded-full border-[6px] border-paper object-cover" />
            ) : (
              <span className="-mt-16 flex h-[148px] w-[148px] flex-none items-center justify-center rounded-full border-[6px] border-paper bg-ink font-display text-4xl font-extrabold text-accent">{p.initials}</span>
            )
          )}
          <div className="flex flex-[1_1_320px] flex-col gap-2 pb-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="h-display text-[38px] sm:text-[46px]">{p.name}</h1>
              {p.verified && <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[13px] font-bold text-white">✓ {c.verified}</span>}
              {!p.available && <span className="rounded-full bg-line px-2.5 py-1 text-[13px] font-bold text-muted">{c.notTaking}</span>}
            </div>
            <span className="text-[17px] text-slate">{label(p.actType, lang)} · {p.genres.map((g) => label(g, lang)).join(", ")} · {p.base}{unclaimed ? "" : ` · ${c.travels(p.travelKm)}`}</span>
            {unclaimed && <span className="w-fit rounded-full border border-line-strong bg-white px-3 py-1 text-[13px] font-bold text-slate">{c.listed}</span>}
            <span className="flex items-center gap-1.5">
              {unclaimed ? null : p.reviewCount > 0 ? <><Stars rating={p.rating} /><strong>{p.rating}</strong><a href="#reviews">{c.reviews(p.reviewCount)}</a></> : <span className="hint">{c.noReviews}</span>}
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5 pb-1.5">
            {isMe ? (
              <Button href="/register/performer" variant="secondary">{c.edit}</Button>
            ) : (
              <SaveButton kind="performer" id={p.id} initial={saved} signedIn={Boolean(user)} />
            )}
            <ShareMenu title={`${p.name} · ShowIci`} caption={c.caption(p.name, [label(p.actType, lang), ...p.genres.slice(0, 2).map((g) => label(g, lang))].join(", "))} />
            {unclaimed ? <Button href={`/performers/${p.id}/claim`} variant="accent" className="px-6">{c.claimIt}</Button> : !isMe && <Button href={`/messages?to=${p.id}`} variant="accent" className="px-6">{c.message}</Button>}
          </div>
        </div>

        {unclaimed && (
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[18px] border border-accent-line bg-accent-tint px-5 py-4">
            <div className="flex max-w-[680px] flex-col gap-1">
              <strong className="text-[17px]">{c.areYou(p.name)}</strong>
              <span className="text-graphite">{c.claimText}</span>
            </div>
            <Button href={`/performers/${p.id}/claim`} variant="accent">{c.claim}</Button>
          </div>
        )}

        <div className="mb-8 mt-[22px] flex flex-wrap gap-2">
          {[...p.eventTypes, p.languages.length > 1 ? p.languages.map((l) => l.slice(0, 2).toUpperCase()).join(" + ") : p.languages[0]].filter(Boolean).map((t) => <Tag key={t}>{label(t, lang)}</Tag>)}
        </div>

        <div className="flex flex-wrap items-start gap-8">
          <div className="flex min-w-0 flex-[999_1_600px] flex-col gap-10">
            {featured && (
              <section className="flex flex-col gap-3.5">
                <h2 className="h-display text-[28px]">{c.watch}</h2>
                <VideoPreview url={featured.url} title={featured.title} length={featured.length} big />
                {others.length > 0 && (
                  <div className="mt-1 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-3 gap-y-4">
                    {others.map((v) => <VideoPreview key={v.url ?? v.title} url={v.url} title={v.title} length={v.length} />)}
                  </div>
                )}
              </section>
            )}
            <section className="flex flex-col gap-3">
              <h2 className="h-display text-[28px]">{c.about}</h2>
              <p className="whitespace-pre-line text-[17px] leading-relaxed text-graphite">{p.bio || c.noBio}</p>
            </section>
            {(photos.length > (p.cover ? 0 : 1) || !supabaseEnabled) && (
              <section className="flex flex-col gap-3.5">
                <h2 className="h-display text-[28px]">{c.photos}</h2>
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
              <h2 className="h-display text-[28px]">{c.upcoming}</h2>
              {upcoming.length === 0 && <p className="text-slate">{c.noShows}</p>}
              {upcoming.map((s) => (
                <Link key={s.id} href={`/shows/${s.id}`} className="card flex items-center gap-4 p-3.5 text-ink no-underline">
                  <span className="rounded-[10px] bg-accent-tint px-3 py-2 text-center text-xs font-bold leading-tight text-ink-deep">{s.day}<br /><span className="font-display text-[22px]">{s.date}</span></span>
                  <span className="flex flex-1 flex-col"><strong>{venueById[s.venueId]?.name ?? s.title}</strong><span className="text-sm text-muted">{venueById[s.venueId]?.area} · {s.time}</span></span>
                  <span className="font-bold text-accent-dark">→</span>
                </Link>
              ))}
            </section>
            {!unclaimed && <section id="reviews" className="flex flex-col gap-3.5">
              <h2 className="h-display text-[28px]">{c.reviewsTitle}</h2>
              {supabaseEnabled ? (
                reviews.length === 0 ? (
                  <p className="text-slate">{c.noReviewsYet(p.name)}</p>
                ) : (
                  reviews.map((r) => (
                    <article key={r.id} className="card flex flex-col gap-2 p-5">
                      <div className="flex justify-between"><strong>{r.author}</strong><Stars rating={r.rating} /></div>
                      <span className="hint">{[r.context, r.date].filter(Boolean).join(" · ")}</span>
                      {r.tags.length > 0 && <div className="flex flex-wrap gap-1.5">{r.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>}
                      {r.body && <p className="leading-relaxed text-graphite">{r.body}</p>}
                    </article>
                  ))
                )
              ) : (
                [["[Pub name]", "Venue · Friday night show"], ["[Planner first name]", "Private event · Quinceañera"]].map(([who, ev]) => (
                  <article key={who} className="card flex flex-col gap-2 p-5">
                    <div className="flex justify-between"><strong>{who}</strong><Stars rating={5} /></div>
                    <span className="hint">{ev}</span>
                    <p className="leading-relaxed text-graphite">[Review text from someone who booked this act.]</p>
                  </article>
                ))
              )}
            </section>}
          </div>

          <aside className="flex max-w-[380px] flex-[1_1_300px] flex-col gap-4">
            <div className="card flex flex-col gap-3.5 p-[22px]">
              <h3 className="h-display text-xl">{c.details}</h3>
              {facts.filter(([, v]) => v).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 border-b border-line pb-2.5 text-[15px]"><span className="text-muted">{k}</span><strong className="text-right">{v}</strong></div>
              ))}
            </div>
            {(p.links?.length ?? 0) > 0 && (
              <div className="card flex flex-col gap-3 p-[22px]">
                <h3 className="h-display text-xl">{c.online}</h3>
                <div className="flex flex-wrap gap-2">{p.links!.map((l) => <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line-strong bg-white px-3 py-1 text-[13px] text-graphite no-underline">{l.label} ↗</a>)}</div>
              </div>
            )}
            {unclaimed && (
              <div className="flex flex-col gap-3 rounded-2xl bg-sand p-[22px]">
                <strong className="text-[17px]">{c.book(p.name)}</strong>
                <span className="text-[15px] text-slate">{c.notHere(p.name)}</span>
                <p className="text-[13px] leading-relaxed text-muted">{c.sources}</p>
              </div>
            )}
            {!isMe && !unclaimed && (
              <div className="flex flex-col gap-3 rounded-2xl bg-sand p-[22px]">
                <strong className="text-[17px]">{c.planning}</strong>
                <span className="text-[15px] text-slate">{c.planningText(p.name)}</span>
                <Button href={`/messages?to=${p.id}`} variant="accent">{c.message}</Button>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}
