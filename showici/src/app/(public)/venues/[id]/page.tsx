import Link from "@/components/LocalLink";
import { placeLabel } from "@/lib/regions";
import { notFound, permanentRedirect } from "next/navigation";
import { SaveButton } from "@/components/ProfileActions";
import { getReviewsFor, getShows, getVenue } from "@/lib/data";
import { isSaved } from "@/lib/dashboard";
import { getSessionUser } from "@/lib/session";
import { supabaseEnabled } from "@/lib/supabase/client";
import { Button, Placeholder, Stars, Tag } from "@/components/ui";
import { PhotoGallery, VideoPreview } from "@/components/Media";
import { youTubeId } from "@/lib/youtube";
import { ShareMenu } from "@/components/Social";
import { JsonLd, venueLd } from "@/lib/jsonld";
import { venueHref } from "@/lib/seo";
import { getLang } from "@/lib/lang";
import { localePath, tr } from "@/lib/locale";
import { label, labels } from "@/lib/labels";
import { isThinVenue } from "@/lib/seo";


export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const v = await getVenue(id);
  if (!v) return {};
  const t = tr(await getLang());
  const place = placeLabel(v.area, v.city).replace(" · ", ", ");
  const description = `${t(`${v.type} in ${place}`, `${label("fr", v.type)} à ${place}`)}. ${v.description}`.slice(0, 200);
  const thin = isThinVenue(v, (await getShows()).some((s) => s.venueId === v.id));
  return { title: `${v.name} · ShowIci`, description, ...(thin ? { robots: { index: false, follow: true } } : {}), openGraph: { title: t(`${v.name} on ShowIci`, `${v.name} sur ShowIci`), description, ...(v.photos?.[0] ? { images: [v.photos[0]] } : {}) } };
}

export default async function VenueProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const v = await getVenue(id);
  if (!v) notFound();
  const lang = await getLang();
  // Old links use the venue id: send them to the readable address.
  if (v.slug && id !== v.slug) permanentRedirect(localePath(lang, venueHref(v)));
  const t = tr(lang);
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

  return (
    <div className="wrap pb-[72px] pt-6">
      <JsonLd data={venueLd(v, lang)} />
      {photos.length > 0 ? (
        <PhotoGallery photos={photos} alt={v.name} layout="hero" />
      ) : supabaseEnabled ? (
        <Placeholder tone={v.tone} label={v.name} className="h-[220px] rounded-[18px] text-xl text-navy" />
      ) : (
        <div className="grid grid-cols-4 grid-rows-[170px_170px] gap-2.5 overflow-hidden rounded-[18px]">
          <Placeholder tone={v.tone} label={t("[Stage photo]", "[Photo de la scène]")} className="col-span-2 row-span-2" />
          <Placeholder tone="ph-3" label={t("[The room]", "[La salle]")} />
          <Placeholder tone="ph-4" label="[Bar]" />
          <Placeholder tone="ph-5" label={t("[Crowd]", "[Le public]")} />
          <Placeholder tone="ph-1" label={t("+ more photos", "+ plus de photos")} />
        </div>
      )}

      <div className="mb-6 mt-5 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-4 sm:gap-5">
          {v.logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={v.logo} alt={t(`${v.name} logo`, `Logo de ${v.name}`)} className="h-[76px] w-[76px] flex-none rounded-full border border-line bg-white object-cover sm:h-[96px] sm:w-[96px]" />
          )}
        <div className="flex flex-col gap-1.5">
          <h1 className="h-display text-[34px] leading-tight sm:text-[44px]">{v.name}</h1>
          {unclaimed && <span className="w-fit rounded-full border border-line-strong bg-white px-3 py-1 text-[13px] font-bold text-slate">{t("Listed by ShowIci · Not claimed yet", "Ajoutée par ShowIci · Pas encore réclamée")}</span>}
          <span className="text-[17px] text-slate">{[label(lang, v.type), placeLabel(v.area, v.city), v.capacity].filter(Boolean).join(" · ")}</span>
          {unclaimed ? null : v.rating > 0 ? (
            <span className="flex items-center gap-1.5"><Stars rating={v.rating} /><strong>{v.rating}</strong><span className="hint text-sm">{t("from performers", "selon les artistes")}</span></span>
          ) : (
            <span className="hint text-sm">{t("No reviews yet", "Aucun avis pour l'instant")}</span>
          )}
        </div>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {isMe ? <Button href="/register/venue" variant="secondary">{t("Edit my venue", "Modifier ma salle")}</Button> : <SaveButton kind="venue" id={v.id} initial={following} signedIn={Boolean(user)} />}
          <ShareMenu title={t(`${v.name} on ShowIci`, `${v.name} sur ShowIci`)} caption={t(`${v.name} on ShowIci: live entertainment in ${v.city}.`, `${v.name} sur ShowIci : spectacles en direct à ${v.city}.`)} />
          {unclaimed ? <Button href={`${venueHref(v)}/claim`}>{t("Claim this venue", "Réclamer cette salle")}</Button> : !isMe && <Button href={`/messages?to=${v.id}`}>{t("Message about a gig", "Écrire pour un spectacle")}</Button>}
        </div>
      </div>

      {unclaimed && (
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-[18px] border border-[#CDBDFF] bg-brass-tint px-5 py-4">
          <div className="flex max-w-[680px] flex-col gap-1">
            <strong className="text-[17px]">{t("Is this your venue?", "C'est votre salle?")}</strong>
            <span className="text-ink-2">{t(`We listed ${v.name} from public information so local artists can find it. Claim it to add photos, post your shows, fix any details and get messages from artists.`, `Nous avons ajouté ${v.name} à partir d'information publique pour que les artistes d'ici puissent la trouver. Réclamez-la pour ajouter des photos, publier vos spectacles, corriger les détails et recevoir des messages d'artistes.`)}</span>
          </div>
          <Button href={`${venueHref(v)}/claim`}>{t("Claim this venue", "Réclamer cette salle")}</Button>
        </div>
      )}

      <div className="flex flex-wrap items-start gap-8">
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-8">
          <section className="flex flex-col gap-2.5">
            <h2 className="h-display text-[26px]">{t("About the venue", "À propos de la salle")}</h2>
            <p className="whitespace-pre-line text-[17px] leading-relaxed text-ink-2">{v.description || t("No description yet.", "Pas encore de description.")}</p>
          </section>
          {featured && (
            <section className="flex flex-col gap-3">
              <h2 className="h-display text-[26px]">{t("See the room", "Voir la salle")}</h2>
              <VideoPreview url={featured.url} title={featured.title} big />
              {moreVideos.length > 0 && (
                <div className="mt-1 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-3 gap-y-4">
                  {moreVideos.map((x) => <VideoPreview key={x.url} url={x.url} title={x.title} />)}
                </div>
              )}
            </section>
          )}
          {(shows.length > 0 || isMe) && <section className="flex flex-col gap-3">
            <h2 className="h-display text-[26px]">{t("Upcoming shows", "Spectacles à venir")}</h2>
            {shows.length === 0 && <p className="text-slate">{t("No shows posted yet.", "Aucun spectacle publié pour l'instant.")}</p>}
            {shows.map((s) => (
              <Link key={s.id} href={`/shows/${s.id}`} className="card flex items-center gap-4 p-3.5 text-navy no-underline">
                <span className="rounded-[10px] bg-brass-tint px-3 py-2 text-center text-xs font-bold leading-tight text-navy-deep">{s.day}<br /><span className="font-display text-[22px]">{s.date}</span></span>
                <span className="flex flex-1 flex-col"><strong>{s.title}</strong><span className="text-sm text-muted">{[label(lang, s.genre), s.time, s.entry].filter(Boolean).join(" · ")}</span></span>
                <span className="font-bold text-brass-dark">{t("Details →", "Détails →")}</span>
              </Link>
            ))}
          </section>}
          {!unclaimed && <section className="flex flex-col gap-3">
            <h2 className="h-display text-[26px]">{t("What performers say", "Ce qu'en disent les artistes")}</h2>
            {supabaseEnabled ? (
              reviews.length === 0 ? (
                <p className="text-slate">{t("No reviews yet.", "Aucun avis pour l'instant.")}</p>
              ) : (
                reviews.map((r) => (
                  <article key={r.id} className="card flex flex-col gap-2 p-5">
                    <div className="flex justify-between"><strong>{r.author}</strong><Stars rating={r.rating} /></div>
                    <span className="hint">{[r.context, r.date].filter(Boolean).join(" · ")}</span>
                    {r.tags.length > 0 && <div className="flex flex-wrap gap-1.5">{r.tags.map((x) => <Tag key={x}>{x}</Tag>)}</div>}
                    {r.body && <p className="text-ink-2">{r.body}</p>}
                  </article>
                ))
              )
            ) : (
              <article className="card flex flex-col gap-2 p-5"><div className="flex justify-between"><strong>{t("[Band name]", "[Nom du groupe]")}</strong><Stars rating={5} /></div><p className="text-ink-2">{t("[Review from a performer who played here.]", "[Avis d'un artiste qui a joué ici.]")}</p></article>
            )}
          </section>}
        </div>
        <aside className="flex max-w-[380px] flex-[1_1_300px] flex-col gap-4">
          {(v.books.length > 0 || v.genres.length > 0 || v.nights || v.leadTime || v.feeRange || !unclaimed) && <div className="card flex flex-col gap-3.5 p-[22px]">
            <h3 className="h-display text-xl">{t("What they book", "Ce qu'ils engagent")}</h3>
            <div className="flex flex-wrap gap-1.5">{labels(lang, v.books).map((b) => <Tag key={b}>{b}</Tag>)}</div>
            <div className="flex flex-wrap gap-1.5">{labels(lang, v.genres).map((g) => <Tag key={g}>{g}</Tag>)}</div>
            {[[t("Live nights", "Soirs de spectacle"), v.nights], [t("Books", "Réserve"), v.leadTime], [t("Fee range", "Cachet"), label(lang, v.feeRange)], [t("New acts", "Nouveaux numéros"), unclaimed ? "" : v.openToNewActs ? t("Welcome", "Bienvenus") : t("Established acts", "Numéros établis")]].filter(([, val]) => val).map(([k, val]) => (
              <div key={k} className="flex justify-between gap-3 border-t border-line pt-3"><span className="text-muted">{k}</span><strong className="text-right">{val}</strong></div>
            ))}
          </div>}
          {v.equipment.length > 0 && (
            <div className="card flex flex-col gap-2.5 p-[22px]">
              <h3 className="h-display text-xl">{t("Equipment", "Équipement")}</h3>
              {v.equipment.map((e) => <span key={e}>✓ {label(lang, e)}</span>)}
            </div>
          )}
          <div className="card overflow-hidden">
            <div className="relative h-[150px] bg-[#E9EDE6]"><span className="absolute left-1/2 top-1/2 -ml-[9px] -mt-[9px] h-[18px] w-[18px] rounded-full border-[3px] border-white bg-navy" /></div>
            <div className="flex flex-col gap-1.5 p-4">
              <span className="text-slate">{address || (supabaseEnabled ? v.city : t(`[Street address], ${v.city}`, `[Adresse], ${v.city}`))}</span>
              {v.phone && <a href={`tel:${v.phone.replace(/[^\d+]/g, "")}`} className="no-underline">{v.phone}</a>}
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="font-bold no-underline">{t("Get directions →", "Itinéraire →")}</a>
            </div>
          </div>
          {otherLinks.length > 0 && (
            <div className="card flex flex-wrap gap-2 p-[22px]">
              {otherLinks.map((l) => <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line-strong bg-white px-3 py-1 text-[13px] text-ink-2 no-underline">{label(lang, l.label)} ↗</a>)}
            </div>
          )}
          {unclaimed && (
            <p className="text-[13px] leading-relaxed text-muted">
              {t("Details come from public sources", "Les détails proviennent de sources publiques")}{v.sourceRef?.startsWith("osm:") ? <> {t("including", "dont")} <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© {t("OpenStreetMap contributors", "les contributeurs d'OpenStreetMap")}</a></> : null} {t("and the venue's own website, and may be out of date. Something wrong, or want this page removed? Use Contact at the bottom of the page.", "et du site Web de la salle, et peuvent ne pas être à jour. Une erreur, ou vous voulez retirer cette page? Utilisez Contact au bas de la page.")}
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
