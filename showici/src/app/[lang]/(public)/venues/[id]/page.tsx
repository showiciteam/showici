import Link from "@/components/Link";
import { placeLabel } from "@/lib/regions";
import { notFound } from "next/navigation";
import { SaveButton } from "@/components/ProfileActions";
import { getReviewsFor, getShows, getVenue } from "@/lib/data";
import { isSaved } from "@/lib/dashboard";
import { getSessionUser } from "@/lib/session";
import { supabaseEnabled } from "@/lib/supabase/client";
import { Button, Placeholder, Stars, Tag } from "@/components/ui";
import { PhotoGallery, VideoPreview } from "@/components/Media";
import { youTubeId } from "@/lib/youtube";
import { ShareMenu } from "@/components/Social";
import type { Metadata } from "next";
import { label, whenLabel } from "@/lib/labels";
import { isLang, localize, type Lang } from "@/lib/lang";
import { absoluteUrl, jsonLd, pageMetadata } from "@/lib/seo";
import type { Venue } from "@/lib/types";

type Params = Promise<{ lang: string; id: string }>;

const copy = {
  fr: {
    on: "sur ShowIci", in: "à", listed: "Ajoutée par ShowIci · Non revendiquée", fromPerformers: "selon les artistes", noReviews: "Aucun avis pour l’instant",
    edit: "Modifier ma salle", claim: "Revendiquer cette salle", message: "Écrire pour un spectacle",
    yours: "C’est votre salle?",
    claimText: (n: string) => `Nous avons ajouté ${n} à partir d’informations publiques pour que les artistes d’ici puissent la trouver. Revendiquez-la pour ajouter des photos, publier vos spectacles, corriger les détails et recevoir des messages d’artistes.`,
    about: "À propos de la salle", noDescription: "Pas encore de description.", room: "Voir la salle", upcoming: "Prochains spectacles", noShows: "Aucun spectacle publié pour l’instant.",
    reviews: "Ce qu’en disent les artistes", books: "Ce qu’ils programment",
    facts: { nights: "Soirs de spectacle", lead: "Délai de réservation", fee: "Cachet", newActs: "Nouveaux artistes", welcome: "Bienvenus", established: "Artistes établis" },
    equipment: "Équipement", directions: "Itinéraire",
    sources: (osm: React.ReactNode) => <>Ces informations viennent de sources publiques{osm} et du site de la salle, et peuvent ne plus être à jour. Une erreur, ou vous voulez retirer cette page? Écrivez-nous avec le lien Contact au bas de la page.</>,
    osm: " dont les contributeurs d’OpenStreetMap",
    caption: (n: string, city: string) => `${n} sur ShowIci : spectacles et artistes d’ici à ${city}.`,
  },
  en: {
    on: "on ShowIci", in: "in", listed: "Listed by ShowIci · Not claimed yet", fromPerformers: "from performers", noReviews: "No reviews yet",
    edit: "Edit my venue", claim: "Claim this venue", message: "Message about a gig",
    yours: "Is this your venue?",
    claimText: (n: string) => `We listed ${n} from public information so local artists can find it. Claim it to add photos, post your shows, fix any details and get messages from artists.`,
    about: "About the venue", noDescription: "No description yet.", room: "See the room", upcoming: "Upcoming shows", noShows: "No shows posted yet.",
    reviews: "What performers say", books: "What they book",
    facts: { nights: "Live nights", lead: "Books", fee: "Fee range", newActs: "New acts", welcome: "Welcome", established: "Established acts" },
    equipment: "Equipment", directions: "Get directions",
    sources: (osm: React.ReactNode) => <>Details come from public sources{osm} and the venue’s own website, and may be out of date. Something wrong, or want this page removed? Use Contact at the bottom of the page.</>,
    osm: " including OpenStreetMap contributors",
    caption: (n: string, city: string) => `${n} on ShowIci: live entertainment in ${city}.`,
  },
};

function describe(v: Venue, lang: Lang) {
  return `${label(v.type, lang)} ${copy[lang].in} ${placeLabel(v.area, v.city).replace(" · ", ", ")}. ${v.description}`.slice(0, 200);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, id } = await params;
  const v = await getVenue(id);
  if (!v || !isLang(lang)) return {};
  return pageMetadata({ lang, path: `/venues/${v.id}`, title: `${v.name} · ${copy[lang].on}`, description: describe(v, lang), image: v.photos?.[0] });
}

export default async function VenueProfile({ params }: { params: Params }) {
  const { lang: raw, id } = await params;
  const lang: Lang = isLang(raw) ? raw : "fr";
  const c = copy[lang];
  const v = await getVenue(id);
  if (!v) notFound();
  const user = await getSessionUser();
  const [allShows, reviews, following] = await Promise.all([getShows(), getReviewsFor(v.ownerId), isSaved(user?.id, "venue", v.id)]);
  const shows = allShows.filter((s) => s.venueId === v.id);
  const photos = v.photos ?? [];
  const isMe = Boolean(user && v.ownerId && user.id === v.ownerId);
  const unclaimed = v.claimed === false;
  const address = [v.street, v.city].filter(Boolean).join(", ");
  // Videos added on the form; venues saved before that may only have one YouTube link.
  const legacy = v.links?.find((l) => youTubeId(l.url));
  const videos = v.videos?.length ? v.videos : legacy ? [{ title: "", featured: true, url: legacy.url }] : [];
  const featured = videos.find((x) => x.featured) ?? videos[0];
  const moreVideos = videos.filter((x) => x !== featured);
  const otherLinks = (v.links ?? []).filter((l) => !youTubeId(l.url));
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${v.name}, ${address}`)}`;

  // Search engines: the venue as a place that hosts live music.
  const venueLd = {
    "@context": "https://schema.org",
    "@type": v.type === "Restaurant" ? "Restaurant" : v.type === "Brewery" ? "Brewery" : v.type === "Event hall" ? "EventVenue" : "BarOrPub",
    name: v.name,
    description: describe(v, lang),
    url: absoluteUrl(localize(`/venues/${v.id}`, lang)),
    image: photos[0] ? absoluteUrl(photos[0]) : undefined,
    address: { "@type": "PostalAddress", streetAddress: v.street, addressLocality: v.city, addressRegion: "QC", addressCountry: "CA" },
    geo: v.lat != null && v.lng != null ? { "@type": "GeoCoordinates", latitude: v.lat, longitude: v.lng } : undefined,
    telephone: v.phone,
    sameAs: otherLinks.map((l) => l.url),
  };

  return (
    <div className="wrap pb-[72px] pt-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(venueLd) }} />
      {photos.length > 0 ? (
        <PhotoGallery photos={photos} alt={v.name} layout="hero" />
      ) : supabaseEnabled ? (
        <div className="flex h-[200px] items-end rounded-2xl bg-[radial-gradient(60%_120%_at_75%_0%,rgba(215,20,31,0.55),transparent_70%),#0B0B0D] p-6 font-display text-xl font-extrabold text-white sm:h-[240px]">{label(v.type, lang)}</div>
      ) : (
        <div className="grid grid-cols-4 grid-rows-[170px_170px] gap-2.5 overflow-hidden rounded-[18px]">
          <Placeholder tone={v.tone} label="[Stage photo]" className="col-span-2 row-span-2" />
          <Placeholder tone="ph-3" label="[The room]" />
          <Placeholder tone="ph-4" label="[Bar]" />
          <Placeholder tone="ph-5" label="[Crowd]" />
          <Placeholder tone="ph-1" label="+ more photos" />
        </div>
      )}

      <div className="mb-6 mt-5 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-4 sm:gap-5">
          {v.logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={v.logo} alt={`${v.name} logo`} className="h-[76px] w-[76px] flex-none rounded-full border border-line bg-white object-cover sm:h-[96px] sm:w-[96px]" />
          )}
        <div className="flex flex-col gap-1.5">
          <h1 className="h-display text-[34px] leading-tight sm:text-[44px]">{v.name}</h1>
          {unclaimed && <span className="w-fit rounded-full border border-line-strong bg-white px-3 py-1 text-[13px] font-bold text-slate">{c.listed}</span>}
          <span className="text-[17px] text-slate">{[label(v.type, lang), placeLabel(v.area, v.city), v.capacity].filter(Boolean).join(" · ")}</span>
          {unclaimed ? null : v.rating > 0 ? (
            <span className="flex items-center gap-1.5"><Stars rating={v.rating} /><strong>{v.rating}</strong><span className="hint text-sm">{c.fromPerformers}</span></span>
          ) : (
            <span className="hint text-sm">{c.noReviews}</span>
          )}
        </div>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {isMe ? <Button href="/register/venue" variant="secondary">{c.edit}</Button> : <SaveButton kind="venue" id={v.id} initial={following} signedIn={Boolean(user)} />}
          <ShareMenu title={`${v.name} · ShowIci`} caption={c.caption(v.name, v.city)} />
          {unclaimed ? <Button href={`/venues/${v.id}/claim`} variant="accent">{c.claim}</Button> : !isMe && <Button href={`/messages?to=${v.id}`} variant="accent">{c.message}</Button>}
        </div>
      </div>

      {unclaimed && (
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-[18px] border border-accent-line bg-accent-tint px-5 py-4">
          <div className="flex max-w-[680px] flex-col gap-1">
            <strong className="text-[17px]">{c.yours}</strong>
            <span className="text-graphite">{c.claimText(v.name)}</span>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-start gap-8">
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-8">
          <section className="flex flex-col gap-2.5">
            <h2 className="h-display text-[26px]">{c.about}</h2>
            <p className="whitespace-pre-line text-[17px] leading-relaxed text-graphite">{v.description || c.noDescription}</p>
          </section>
          {featured && (
            <section className="flex flex-col gap-3">
              <h2 className="h-display text-[26px]">{c.room}</h2>
              <VideoPreview url={featured.url} title={featured.title} big />
              {moreVideos.length > 0 && (
                <div className="mt-1 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-3 gap-y-4">
                  {moreVideos.map((x) => <VideoPreview key={x.url} url={x.url} title={x.title} />)}
                </div>
              )}
            </section>
          )}
          <section className="flex flex-col gap-3">
            <h2 className="h-display text-[26px]">{c.upcoming}</h2>
            {shows.length === 0 && <p className="text-slate">{c.noShows}</p>}
            {shows.map((s) => (
              <Link key={s.id} href={`/shows/${s.id}`} className="card flex items-center gap-4 p-3.5 text-ink no-underline">
                <span className="rounded-[10px] bg-accent-tint px-3 py-2 text-center text-xs font-bold leading-tight text-ink-deep">{s.day}<br /><span className="font-display text-[22px]">{s.date}</span></span>
                <span className="flex flex-1 flex-col"><strong>{s.title}</strong><span className="text-sm text-muted">{[label(s.genre, lang), whenLabel(s.time, lang), label(s.entry, lang)].filter(Boolean).join(" · ")}</span></span>
                <span className="font-bold text-accent-dark">→</span>
              </Link>
            ))}
          </section>
          {!unclaimed && <section className="flex flex-col gap-3">
            <h2 className="h-display text-[26px]">{c.reviews}</h2>
            {supabaseEnabled ? (
              reviews.length === 0 ? (
                <p className="text-slate">{c.noReviews}</p>
              ) : (
                reviews.map((r) => (
                  <article key={r.id} className="card flex flex-col gap-2 p-5">
                    <div className="flex justify-between"><strong>{r.author}</strong><Stars rating={r.rating} /></div>
                    <span className="hint">{[r.context, r.date].filter(Boolean).join(" · ")}</span>
                    {r.tags.length > 0 && <div className="flex flex-wrap gap-1.5">{r.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>}
                    {r.body && <p className="text-graphite">{r.body}</p>}
                  </article>
                ))
              )
            ) : (
              <article className="card flex flex-col gap-2 p-5"><div className="flex justify-between"><strong>[Band name]</strong><Stars rating={5} /></div><p className="text-graphite">[Review from a performer who played here.]</p></article>
            )}
          </section>}
        </div>
        <aside className="flex max-w-[380px] flex-[1_1_300px] flex-col gap-4">
          {(v.books.length > 0 || v.genres.length > 0 || v.nights || v.leadTime || v.feeRange || !unclaimed) && <div className="card flex flex-col gap-3.5 p-[22px]">
            <h3 className="h-display text-xl">{c.books}</h3>
            <div className="flex flex-wrap gap-1.5">{v.books.map((b) => <Tag key={b}>{label(b, lang)}</Tag>)}</div>
            <div className="flex flex-wrap gap-1.5">{v.genres.map((g) => <Tag key={g}>{label(g, lang)}</Tag>)}</div>
            {[[c.facts.nights, v.nights], [c.facts.lead, v.leadTime], [c.facts.fee, v.feeRange], [c.facts.newActs, unclaimed ? "" : v.openToNewActs ? c.facts.welcome : c.facts.established]].filter(([, val]) => val).map(([k, val]) => (
              <div key={k} className="flex justify-between gap-3 border-t border-line pt-3"><span className="text-muted">{k}</span><strong className="text-right">{val}</strong></div>
            ))}
          </div>}
          {v.equipment.length > 0 && (
            <div className="card flex flex-col gap-2.5 p-[22px]">
              <h3 className="h-display text-xl">{c.equipment}</h3>
              {v.equipment.map((e) => <span key={e}>✓ {e}</span>)}
            </div>
          )}
          <div className="card overflow-hidden">
            <div className="relative h-[150px] bg-[#E9EDE6]"><span className="absolute left-1/2 top-1/2 -ml-[9px] -mt-[9px] h-[18px] w-[18px] rounded-full border-[3px] border-white bg-accent" /></div>
            <div className="flex flex-col gap-1.5 p-4">
              <span className="text-slate">{address || (supabaseEnabled ? v.city : `[Street address], ${v.city}`)}</span>
              {v.phone && <a href={`tel:${v.phone.replace(/[^\d+]/g, "")}`} className="no-underline">{v.phone}</a>}
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="font-bold no-underline">{c.directions} →</a>
            </div>
          </div>
          {otherLinks.length > 0 && (
            <div className="card flex flex-wrap gap-2 p-[22px]">
              {otherLinks.map((l) => <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line-strong bg-white px-3 py-1 text-[13px] text-graphite no-underline">{l.label} ↗</a>)}
            </div>
          )}
          {unclaimed && (
            <p className="text-[13px] leading-relaxed text-muted">
              {c.sources(v.sourceRef?.startsWith("osm:") ? <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">{c.osm}</a> : null)}
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
