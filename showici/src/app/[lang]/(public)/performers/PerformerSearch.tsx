"use client";

import { useMemo, useState } from "react";
import Link from "@/components/Link";
import { PerformerTile, performerPicture } from "@/components/cards";
import { RegionFilter, regionLabel } from "@/components/RegionFilter";
import { PageHero, PillLink, RedBand } from "@/components/sections";
import { useLang } from "@/lib/i18n";
import { label } from "@/lib/labels";
import { ALL_QUEBEC, cityFor, inArea, kmFrom, regionFor } from "@/lib/regions";
import type { Performer } from "@/lib/types";

const ACT_TYPES = ["Band", "Solo musician", "Duo", "DJ", "Stand-up comedy", "Magician", "Dancer", "Mariachi"];
const GENRES = ["Rock", "Pop", "Latin", "Folk", "Jazz", "Electronic", "Country", "Hip-hop", "Comedy"];
const PAGE_SIZE = 24;

const copy = {
  fr: {
    title: "Découvrez",
    accent: "nos artistes.",
    lead: "Groupes, DJ, humoristes, magiciens et plus, partout au Québec.",
    search: "Rechercher un artiste, un groupe…",
    type: "Type d’artiste",
    allTypes: "Tous les types",
    repertoire: "Répertoire",
    anyRepertoire: "Tout répertoire",
    genres: "Genres :",
    featured: "Artiste à l’honneur",
    profile: "Voir son profil",
    interview: "Lire l’entrevue",
    listTitle: "Nos artistes",
    count: (n: number) => `${n} artiste${n > 1 ? "s" : ""}`,
    none: "Aucun artiste ne correspond à ces filtres pour l’instant. Essayez une autre région ou un autre type.",
    more: "Voir plus d’artistes",
    ctaCard: "Votre profil pourrait être ici",
    ctaCardText: "Créez votre profil et recevez des demandes des salles et des organisateurs.",
    ctaCardLink: "Créer mon profil",
    bandTitle: "Vous êtes un artiste?",
    bandText: "Faites rayonner votre talent sur ShowIci.",
    bandCta: "Créer mon profil d’artiste",
  },
  en: {
    title: "Discover",
    accent: "our artists.",
    lead: "Bands, DJs, comedians, magicians and more, all across Québec.",
    search: "Search for an artist or band…",
    type: "Type of act",
    allTypes: "All types",
    repertoire: "Repertoire",
    anyRepertoire: "Any repertoire",
    genres: "Styles:",
    featured: "Featured artist",
    profile: "View profile",
    interview: "Read the interview",
    listTitle: "Our artists",
    count: (n: number) => `${n} artist${n > 1 ? "s" : ""}`,
    none: "No artists match these filters yet. Try another region or type.",
    more: "Show more artists",
    ctaCard: "Your profile could be here",
    ctaCardText: "Create your profile and get requests from venues and event planners.",
    ctaCardLink: "Create my profile",
    bandTitle: "Are you an artist?",
    bandText: "Let your talent shine on ShowIci.",
    bandCta: "Create my artist profile",
  },
};

const field = "min-h-12 w-full min-w-0 cursor-pointer rounded-xl border-0 bg-white px-3 font-medium text-ink";

export function PerformerSearch({ performers, featured, initialType, initialRadius, initialRegion, initialArea }: {
  performers: Performer[];
  /** Artist highlighted above the list, with their Spotlight interview if there is one. */
  featured?: { performer: Performer; storySlug?: string; blurb?: string };
  initialType?: string; initialRadius?: number; initialRegion?: string; initialArea?: string;
}) {
  const { lang } = useLang();
  const c = copy[lang];
  const [query, setQuery] = useState("");
  const [type, setType] = useState(initialType ?? "");
  const [region, setRegion] = useState(() => regionFor(initialRegion));
  const [city, setCity] = useState(() => cityFor(regionFor(initialRegion), initialArea));
  const [radius, setRadius] = useState(initialRadius ?? regionFor(initialRegion).radiusKm);
  const [rep, setRep] = useState<"" | "Covers" | "Originals" | "Both">("");
  const [genre, setGenre] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return performers
      .filter((p) => inArea(region, city, radius, { ...p, city: p.base }))
      .map((p) => (region.key === ALL_QUEBEC ? p : { ...p, distanceKm: kmFrom(city ?? region, p) }))
      .filter(
        (p) =>
          (!q || p.name.toLowerCase().includes(q)) &&
          (!type || p.actType === type) &&
          (!rep || p.repertoire === rep) &&
          (!genre || p.genres.some((g) => g.toLowerCase().includes(genre.toLowerCase()))),
      )
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }, [performers, query, type, region, city, radius, rep, genre]);

  const f = featured?.performer;
  const featuredPicture = f ? performerPicture(f) : undefined;

  return (
    <>
      <PageHero image="/images/stage-comedy.webp" title={c.title} accent={c.accent} lead={c.lead} bottomSpace="pb-10">
        <form role="search" onSubmit={(e) => e.preventDefault()} className="mt-8 flex flex-wrap gap-2.5">
          <label className="flex min-h-12 flex-[2_1_260px] items-center gap-2.5 rounded-xl bg-white px-4 text-ink">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <span className="sr-only">{c.search}</span>
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={c.search} className="w-full min-w-0 border-0 bg-transparent py-3 text-ink outline-none" />
          </label>
          <RegionFilter region={region} city={city} radius={radius} onRegion={(r) => { setRegion(r); setCity(null); setRadius(r.radiusKm); }} onCity={setCity} onRadius={setRadius} />
          <label className="flex-[1_1_170px]">
            <span className="sr-only">{c.type}</span>
            <select className={field} value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">{c.allTypes}</option>
              {ACT_TYPES.map((t) => <option key={t} value={t}>{label(t, lang)}</option>)}
            </select>
          </label>
          <label className="flex-[1_1_170px]">
            <span className="sr-only">{c.repertoire}</span>
            <select className={field} value={rep} onChange={(e) => setRep(e.target.value as typeof rep)}>
              <option value="">{c.anyRepertoire}</option>
              {(["Covers", "Originals", "Both"] as const).map((r) => <option key={r} value={r}>{label(r, lang)}</option>)}
            </select>
          </label>
        </form>
        <div role="group" aria-label={c.genres} className="mt-4 flex flex-wrap items-center gap-2">
          <span className="mr-1 font-display text-sm font-bold">{c.genres}</span>
          {GENRES.map((g) => (
            <button
              key={g}
              type="button"
              aria-pressed={genre === g}
              onClick={() => setGenre(genre === g ? "" : g)}
              className={`min-h-9 rounded-full border px-4 text-sm ${genre === g ? "border-accent bg-accent font-bold text-white" : "border-white/50 text-white hover:border-white"}`}
            >
              {label(g, lang)}
            </button>
          ))}
        </div>

        {f && (
          <article className="mt-10 flex flex-wrap overflow-hidden rounded-2xl border border-white/15 bg-ink-soft">
            <div className="relative min-h-[260px] flex-[1_1_480px] bg-ink">
              {featuredPicture && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={featuredPicture} alt={f.name} className="absolute inset-0 h-full w-full object-cover" />
              )}
            </div>
            <div className="flex flex-[1_1_380px] flex-col justify-center bg-[radial-gradient(80%_100%_at_100%_50%,rgba(215,20,31,0.35),transparent_70%)] p-7 sm:p-10">
              <span className="w-fit rounded bg-accent px-2.5 py-1 text-xs font-extrabold uppercase tracking-wide">{c.featured}</span>
              <h2 className="h-display mb-3 mt-3 text-[38px] sm:text-[46px]">{f.name}</h2>
              <p className="mb-4 flex flex-wrap gap-x-5 gap-y-1 text-[15px] text-[#E4E4E8]">
                <span>{f.base}</span>
                <span>{f.genres.slice(0, 3).map((g) => label(g, lang)).join(" · ")}</span>
                <span>{label(f.actType, lang)}</span>
              </p>
              {featured?.blurb && <p className="mb-6 leading-relaxed text-on-dark">{featured.blurb}</p>}
              <div className="flex flex-wrap gap-3">
                <PillLink href={`/performers/${f.id}`}>{c.profile} →</PillLink>
                {featured?.storySlug && <PillLink href={`/spotlight/${featured.storySlug}`} tone="outline">{c.interview}</PillLink>}
              </div>
            </div>
          </article>
        )}
      </PageHero>

      <section className="wrap py-14">
        <div className="mb-6 flex flex-wrap items-baseline gap-4">
          <h2 className="h-display text-[28px] sm:text-[34px]">{c.listTitle}</h2>
          <span className="text-[15px] text-muted">{regionLabel(region, radius, city, lang)} · {c.count(results.length)}</span>
        </div>
        {results.length === 0 && <p className="mb-6 rounded-2xl border border-line bg-sand p-8 text-center text-slate">{c.none}</p>}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {results.slice(0, visible).map((p) => <PerformerTile key={p.id} p={p} />)}
          <Link href="/signup?role=performer" className="flex aspect-[4/5] flex-col justify-center gap-3 rounded-xl bg-accent p-5 text-white no-underline hover:bg-accent-dark hover:text-white sm:p-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" aria-hidden="true"><circle cx="10" cy="8" r="4" /><path d="M3 21a7 7 0 0 1 14 0M19 8v6M16 11h6" /></svg>
            <span className="font-display text-lg font-extrabold leading-tight sm:text-[22px]">{c.ctaCard}</span>
            <span className="hidden text-sm text-[#FFE3E4] sm:block">{c.ctaCardText}</span>
            <span className="font-display text-sm font-bold">{c.ctaCardLink} →</span>
          </Link>
        </div>
        {results.length > visible && (
          <div className="mt-8 text-center">
            <button type="button" onClick={() => setVisible((n) => n + PAGE_SIZE)} className="min-h-11 rounded-full border-[1.5px] border-ink px-6 font-display font-bold hover:bg-sand">
              {c.more}
            </button>
          </div>
        )}
      </section>

      <RedBand title={c.bandTitle} text={c.bandText}>
        <PillLink href="/signup?role=performer">{c.bandCta} →</PillLink>
      </RedBand>
    </>
  );
}
