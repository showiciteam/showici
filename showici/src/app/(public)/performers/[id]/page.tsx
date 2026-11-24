import Link from "@/components/LocalLink";
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
import { JsonLd, performerLd } from "@/lib/jsonld";
import { getLang } from "@/lib/lang";
import { tr } from "@/lib/locale";
import { label, labels } from "@/lib/labels";

const REP_LABEL_FR: Record<string, string> = { Repertoire: "Répertoire", "What you play": "Ce que je joue", Content: "Contenu", Audience: "Public", "Show format": "Format du spectacle" };

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = await getPerformer(id);
  if (!p) return {};
  const lang = await getLang();
  const t = tr(lang);
  const description = `${label(lang, p.actType)} · ${labels(lang, p.genres).join(", ")} · ${p.base}. ${p.bio}`.slice(0, 200);
  return { title: `${p.name} · ShowIci`, description, openGraph: { title: t(`${p.name} on ShowIci`, `${p.name} sur ShowIci`), description, ...((p.cover ?? p.photos?.[0]) ? { images: [(p.cover ?? p.photos?.[0]) as string] } : {}) } };
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

  const lang = await getLang();
  const t = tr(lang);
  const facts: [string, string][] = [
    [t("Type", "Type"), `${label(lang, p.actType)}${p.members > 1 ? `, ${p.members} ${actFamily(p.actType).ownSound ? t("members", "membres") : t("performers", "artistes")}` : ""}`],
    [t(family.repertoireLabel, REP_LABEL_FR[family.repertoireLabel] ?? family.repertoireLabel), label(lang, p.repertoire)],
    [t("Languages", "Langues"), labels(lang, p.languages).join(", ")],
    [t("Set length", "Durée des prestations"), p.setLength],
    [t("Typical fee", "Cachet habituel"), label(lang, p.feeRange)],
    [t("Based in", "Basé à"), p.base],
    [t("Travels", "Déplacements"), t(`Up to ${p.travelKm} km`, `Jusqu'à ${p.travelKm} km`)],
  ];

  return (
    <>
      <JsonLd data={performerLd(p, lang)} />
      {header ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={header} alt={t(`${p.name} live`, `${p.name} sur scène`)} className="h-[220px] w-full object-cover sm:h-[300px]" />
      ) : (
        <Placeholder tone={p.tone} label={supabaseEnabled ? "" : t("[Cover photo: live on stage]", "[Photo de couverture : sur scène]")} className="h-[300px]" />
      )}
      <div className="wrap pb-[72px]">
        <div className="-mt-16 flex flex-wrap items-end gap-6">
          {p.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.logo} alt={t(`${p.name} logo`, `Logo de ${p.name}`)} className="h-[148px] w-[148px] flex-none rounded-full border-[6px] border-ivory bg-white object-cover" />
          ) : (
            <Placeholder tone="ph-2" label={p.initials} className="h-[148px] w-[148px] flex-none rounded-full border-[6px] border-ivory text-4xl text-navy" />
          )}
          <div className="flex flex-[1_1_320px] flex-col gap-2 pb-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="h-display text-[44px]">{p.name}</h1>
              {p.verified && <span className="inline-flex items-center gap-1 rounded-full bg-ph-3 px-2.5 py-1 text-[13px] font-bold text-[#1B4F80]">✓ {t("Verified", "Vérifié")}</span>}
              {!p.available && <span className="rounded-full bg-line px-2.5 py-1 text-[13px] font-bold text-muted">{t("Not taking gigs right now", "Ne prend pas de contrats en ce moment")}</span>}
            </div>
            <span className="text-[17px] text-slate">{label(lang, p.actType)} · {labels(lang, p.genres).join(", ")} · {p.base} · {t(`travels up to ${p.travelKm} km`, `se déplace jusqu'à ${p.travelKm} km`)}</span>
            <span className="flex items-center gap-1.5">
              {p.reviewCount > 0 ? <><Stars rating={p.rating} /><strong>{p.rating}</strong><a href="#reviews">{t(`${p.reviewCount} reviews`, `${p.reviewCount} avis`)}</a></> : <span className="hint">{t("No reviews yet", "Aucun avis pour l'instant")}</span>}
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5 pb-1.5">
            {isMe ? (
              <Button href="/register/performer" variant="secondary">{t("Edit my profile", "Modifier mon profil")}</Button>
            ) : (
              <SaveButton kind="performer" id={p.id} initial={saved} signedIn={Boolean(user)} />
            )}
            <ShareMenu title={t(`${p.name} on ShowIci`, `${p.name} sur ShowIci`)} caption={t(`${p.name} on ShowIci: ${p.actType}, ${p.genres.slice(0, 2).join(", ")}. Book local talent.`, `${p.name} sur ShowIci : ${label("fr", p.actType)}, ${labels("fr", p.genres.slice(0, 2)).join(", ")}. Réservez les talents d'ici.`)} />
            {!isMe && <Button href={`/messages?to=${p.id}`} className="px-6">{t("Send message", "Envoyer un message")}</Button>}
          </div>
        </div>

        <div className="mb-8 mt-[22px] flex flex-wrap gap-2">
          {[...labels(lang, p.eventTypes), p.languages.length > 1 ? p.languages.map((l) => l.slice(0, 2).toUpperCase()).join(" + ") : label(lang, p.languages[0] ?? "")].filter(Boolean).map((x) => <Tag key={x}>{x}</Tag>)}
        </div>

        <div className="flex flex-wrap items-start gap-8">
          <div className="flex min-w-0 flex-[999_1_600px] flex-col gap-10">
            {featured && (
              <section className="flex flex-col gap-3.5">
                <h2 className="h-display text-[28px]">{t("Watch us live", "En spectacle")}</h2>
                <VideoPreview url={featured.url} title={featured.title} length={featured.length} big />
                {others.length > 0 && (
                  <div className="mt-1 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-3 gap-y-4">
                    {others.map((v) => <VideoPreview key={v.url ?? v.title} url={v.url} title={v.title} length={v.length} />)}
                  </div>
                )}
              </section>
            )}
            <section className="flex flex-col gap-3">
              <h2 className="h-display text-[28px]">{t("About", "À propos")}</h2>
              <p className="whitespace-pre-line text-[17px] leading-relaxed text-ink-2">{p.bio || t("No bio yet.", "Pas encore de bio.")}</p>
            </section>
            {(photos.length > (p.cover ? 0 : 1) || !supabaseEnabled) && (
              <section className="flex flex-col gap-3.5">
                <h2 className="h-display text-[28px]">{t("Photos", "Photos")}</h2>
                {photos.length > 0 ? (
                  <PhotoGallery photos={photos} alt={p.name} />
                ) : (
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2.5">
                    {(["ph-1", "ph-2", "ph-3", "ph-4", "ph-5", "ph-1"] as const).map((tone, i) => <Placeholder key={i} tone={tone} label="[Photo]" className="aspect-square rounded-xl" />)}
                  </div>
                )}
              </section>
            )}
            {(upcoming.length > 0 || isMe) && <section className="flex flex-col gap-3.5">
              <h2 className="h-display text-[28px]">{t("Upcoming shows", "Spectacles à venir")}</h2>
              {upcoming.length === 0 && <p className="text-slate">{t("No public shows posted right now.", "Aucun spectacle public pour l'instant.")}</p>}
              {upcoming.map((s) => (
                <Link key={s.id} href={`/shows/${s.id}`} className="card flex items-center gap-4 p-3.5 text-navy no-underline">
                  <span className="rounded-[10px] bg-brass-tint px-3 py-2 text-center text-xs font-bold leading-tight text-navy-deep">{s.day}<br /><span className="font-display text-[22px]">{s.date}</span></span>
                  <span className="flex flex-1 flex-col"><strong>{venueById[s.venueId]?.name ?? s.title}</strong><span className="text-sm text-muted">{venueById[s.venueId]?.area} · {s.time}</span></span>
                  <span className="font-bold text-brass-dark">{t("Details →", "Détails →")}</span>
                </Link>
              ))}
            </section>}
            <section id="reviews" className="flex flex-col gap-3.5">
              <h2 className="h-display text-[28px]">{t("Reviews from bookers", "Avis des organisateurs")}</h2>
              {supabaseEnabled ? (
                reviews.length === 0 ? (
                  <p className="text-slate">{t(`No reviews yet. Venues and planners can review ${p.name} after talking on ShowIci.`, `Aucun avis pour l'instant. Les salles et organisateurs peuvent évaluer ${p.name} après avoir échangé sur ShowIci.`)}</p>
                ) : (
                  reviews.map((r) => (
                    <article key={r.id} className="card flex flex-col gap-2 p-5">
                      <div className="flex justify-between"><strong>{r.author}</strong><Stars rating={r.rating} /></div>
                      <span className="hint">{[r.context, r.date].filter(Boolean).join(" · ")}</span>
                      {r.tags.length > 0 && <div className="flex flex-wrap gap-1.5">{r.tags.map((x) => <Tag key={x}>{x}</Tag>)}</div>}
                      {r.body && <p className="leading-relaxed text-ink-2">{r.body}</p>}
                    </article>
                  ))
                )
              ) : (
                [[t("[Pub name]", "[Nom du pub]"), t("Venue · Friday night show", "Salle · Spectacle du vendredi soir")], [t("[Planner first name]", "[Prénom de l'organisateur]"), t("Private event · Quinceañera", "Événement privé · Quinceañera")]].map(([who, ev]) => (
                  <article key={who} className="card flex flex-col gap-2 p-5">
                    <div className="flex justify-between"><strong>{who}</strong><Stars rating={5} /></div>
                    <span className="hint">{ev}</span>
                    <p className="leading-relaxed text-ink-2">{t("[Review text from someone who booked this act.]", "[Avis d'une personne qui a engagé ce numéro.]")}</p>
                  </article>
                ))
              )}
            </section>
          </div>

          <aside className="flex max-w-[380px] flex-[1_1_300px] flex-col gap-4">
            <div className="card flex flex-col gap-3.5 p-[22px]">
              <h3 className="h-display text-xl">{t("Details", "Détails")}</h3>
              {facts.filter(([, v]) => v).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 border-b border-line pb-2.5 text-[15px]"><span className="text-muted">{k}</span><strong className="text-right">{v}</strong></div>
              ))}
            </div>
            {(p.links?.length ?? 0) > 0 && (
              <div className="card flex flex-col gap-3 p-[22px]">
                <h3 className="h-display text-xl">{t("Find them online", "Sur le Web")}</h3>
                <div className="flex flex-wrap gap-2">{p.links!.map((l) => <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line-strong bg-white px-3 py-1 text-[13px] text-ink-2 no-underline">{label(lang, l.label)} ↗</a>)}</div>
              </div>
            )}
            {!isMe && (
              <div className="flex flex-col gap-3 rounded-2xl bg-parchment p-[22px]">
                <strong className="text-[17px]">{t("Planning a show or party?", "Vous organisez un spectacle ou une fête?")}</strong>
                <span className="text-[15px] text-slate">{t(`Message ${p.name} through ShowIci. Contact details stay private, and you agree on payment directly.`, `Écrivez à ${p.name} sur ShowIci. Les coordonnées restent privées, et vous vous entendez directement sur le paiement.`)}</span>
                <Button href={`/messages?to=${p.id}`}>{t("Send message", "Envoyer un message")}</Button>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}
