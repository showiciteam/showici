"use client";

import { useMemo, useState } from "react";
import { VenueCard } from "@/components/cards";
import { RegionFilter, regionLabel } from "@/components/RegionFilter";
import { PageHero, PillLink } from "@/components/sections";
import { useLang } from "@/lib/i18n";
import { label } from "@/lib/labels";
import { ALL_QUEBEC, cityFor, inArea, kmFrom, regionFor } from "@/lib/regions";
import type { Venue } from "@/lib/types";

const TYPES: { key: string; icon: React.ReactNode }[] = [
  { key: "Pub", icon: <path d="M6 4h10v16H6zM16 8h3v7h-3M8 8v8M11 8v8M14 8v8" /> },
  { key: "Bar", icon: <path d="M5 4h14l-7 8zM12 12v8M8 20h8" /> },
  { key: "Restaurant", icon: <path d="M7 3v8a2 2 0 0 0 2 2v8M11 3v8M17 3c-2 2-2 6 0 8v10" /> },
  { key: "Brewery", icon: <path d="M7 6h9v14H7zM16 9h2.5a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5H16M7 6a3 3 0 0 1 5-2 3 3 0 0 1 4 2" /> },
  { key: "Café", icon: <path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM17 10h2a2 2 0 0 1 0 4h-2M8 3v2M12 3v2" /> },
  { key: "Club", icon: <path d="M4 19c0-6 3-11 8-11s8 5 8 11M12 8V3M8 4l2 4M16 4l-2 4" /> },
  { key: "Event hall", icon: <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" /> },
];
const PAGE_SIZE = 24;

const copy = {
  fr: {
    title: "Les salles",
    accent: "d’ici.",
    lead: "Pubs, bars, microbrasseries, restos et salles d’événements qui font vivre le spectacle local au Québec.",
    claim: "Ajouter ou revendiquer une salle",
    open: "Ma salle est ouverte aux artistes",
    search: "Rechercher une salle…",
    type: "Type de lieu",
    allTypes: "Tous les types",
    openOnly: "Ouverte aux nouveaux artistes",
    listTitle: "Salles à découvrir",
    count: (n: number) => `${n} salle${n > 1 ? "s" : ""}`,
    none: "Aucune salle ne correspond à ces filtres pour l’instant.",
    more: "Voir plus de salles",
  },
  en: {
    title: "Local",
    accent: "venues.",
    lead: "Pubs, bars, breweries, restaurants and halls that keep live entertainment going across Québec.",
    claim: "Add or claim a venue",
    open: "My venue is open to artists",
    search: "Search for a venue…",
    type: "Venue type",
    allTypes: "All types",
    openOnly: "Open to new acts",
    listTitle: "Venues to discover",
    count: (n: number) => `${n} venue${n > 1 ? "s" : ""}`,
    none: "No venues match these filters yet.",
    more: "Show more venues",
  },
};

export function VenueSearch({ venues, initialRadius, initialRegion, initialArea }: { venues: Venue[]; initialRadius?: number; initialRegion?: string; initialArea?: string }) {
  const { lang } = useLang();
  const c = copy[lang];
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [region, setRegion] = useState(() => regionFor(initialRegion));
  const [city, setCity] = useState(() => cityFor(regionFor(initialRegion), initialArea));
  const [radius, setRadius] = useState(initialRadius ?? regionFor(initialRegion).radiusKm);
  const [openOnly, setOpenOnly] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return venues
      .filter((v) => inArea(region, city, radius, v))
      .map((v) => (region.key === ALL_QUEBEC ? v : { ...v, distanceKm: kmFrom(city ?? region, v) }))
      .filter((v) => (!q || `${v.name} ${v.city} ${v.area}`.toLowerCase().includes(q)) && (!type || v.type === type) && (!openOnly || v.openToNewActs))
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }, [venues, query, type, region, city, radius, openOnly]);

  return (
    <>
      <PageHero image="/images/stage-band.webp" title={c.title} accent={c.accent} lead={c.lead} bottomSpace="pb-8">
        <div className="mt-6 flex flex-wrap gap-3">
          <PillLink href="/signup?role=venue">{c.claim} →</PillLink>
          <PillLink href="/signup?role=venue" tone="outline">{c.open}</PillLink>
        </div>
        <form role="search" onSubmit={(e) => e.preventDefault()} className="mt-8 flex flex-wrap items-center gap-2.5 rounded-3xl bg-white p-2.5 text-ink shadow-[0_14px_34px_rgba(0,0,0,0.4)]">
          <label className="flex min-h-12 flex-[2_1_240px] items-center gap-2.5 rounded-xl border border-line px-4">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <span className="sr-only">{c.search}</span>
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={c.search} className="w-full min-w-0 border-0 bg-transparent py-3 outline-none" />
          </label>
          <RegionFilter region={region} city={city} radius={radius} onRegion={(r) => { setRegion(r); setCity(null); setRadius(r.radiusKm); }} onCity={setCity} onRadius={setRadius} />
          <label className="flex min-h-12 flex-[1_1_240px] cursor-pointer items-center gap-2.5 rounded-xl border border-line px-4 font-display text-sm font-bold">
            <input type="checkbox" checked={openOnly} onChange={(e) => setOpenOnly(e.target.checked)} className="h-[18px] w-[18px] accent-accent" />
            {c.openOnly}
          </label>
        </form>
        <div role="group" aria-label={c.type} className="mt-7 grid grid-cols-4 gap-y-4 sm:grid-cols-8">
          {[{ key: "", icon: <path d="M5 12h.01M12 12h.01M19 12h.01" /> }, ...TYPES].map((t, i) => (
            <button
              key={t.key || "all"}
              type="button"
              aria-pressed={type === t.key}
              onClick={() => setType(t.key)}
              className={`flex flex-col items-center gap-2 px-1 py-2 text-center font-display text-[13px] font-bold sm:text-sm ${i ? "sm:border-l sm:border-white/15" : ""} ${type === t.key ? "text-accent-bright" : "text-white"}`}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{t.icon}</svg>
              {t.key ? label(t.key, lang) : c.allTypes}
            </button>
          ))}
        </div>
      </PageHero>

      <section className="wrap py-14">
        <div className="mb-6 flex flex-wrap items-baseline gap-4">
          <h2 className="h-display text-[28px] sm:text-[34px]">{c.listTitle}</h2>
          <span className="text-[15px] text-muted">{regionLabel(region, radius, city, lang)} · {c.count(results.length)}</span>
        </div>
        {results.length === 0 && <p className="rounded-2xl border border-line bg-sand p-8 text-center text-slate">{c.none}</p>}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
          {results.slice(0, visible).map((v) => <VenueCard key={v.id} v={v} />)}
        </div>
        {results.length > visible && (
          <div className="mt-8 text-center">
            <button type="button" onClick={() => setVisible((n) => n + PAGE_SIZE)} className="min-h-11 rounded-full border-[1.5px] border-ink px-6 font-display font-bold hover:bg-sand">
              {c.more}
            </button>
          </div>
        )}
      </section>
    </>
  );
}
