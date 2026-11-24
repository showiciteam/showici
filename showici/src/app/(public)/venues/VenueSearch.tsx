"use client";

import { useMemo, useState } from "react";
import { VenueRow } from "@/components/cards";
import type { Venue } from "@/lib/types";
import { RegionFilter, regionLabel } from "@/components/RegionFilter";
import { ALL_QUEBEC, cityFor, inArea, kmFrom, regionFor } from "@/lib/regions";
import { useLang } from "@/lib/i18n";
import { label } from "@/lib/labels";

const TYPES = ["Pub", "Bar", "Restaurant", "Brewery", "Café", "Club", "Event hall"];

export function VenueSearch({ venues, initialRadius, initialRegion, initialArea }: { venues: Venue[]; initialRadius?: number; initialRegion?: string; initialArea?: string }) {
  const { lang, tr } = useLang();
  const [types, setTypes] = useState<string[]>([]); // none ticked = every type
  const [region, setRegion] = useState(() => regionFor(initialRegion));
  const [city, setCity] = useState(() => cityFor(regionFor(initialRegion), initialArea));
  const [radius, setRadius] = useState(initialRadius ?? regionFor(initialRegion).radiusKm);
  const [openOnly, setOpenOnly] = useState(false);

  const results = useMemo(
    () =>
      venues
        .filter((v) => inArea(region, city, radius, v))
        .map((v) => (region.key === ALL_QUEBEC ? v : { ...v, distanceKm: kmFrom(city ?? region, v) }))
        .filter((v) => (types.length === 0 || types.includes(v.type)) && (!openOnly || v.openToNewActs))
        .sort((a, b) => a.distanceKm - b.distanceKm),
    [venues, types, region, city, radius, openOnly]
  );
  const toggle = (t: string) => setTypes((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  return (
    <div className="wrap pb-16 pt-8">
      <h1 className="h-display text-[40px]">{tr("Find venues", "Trouver des salles")}</h1>
      <p className="mb-7 mt-1.5 text-slate">{tr("Venues that book acts like yours", "Des salles qui engagent des numéros comme le vôtre")} · {regionLabel(region, radius, city, lang)} · {tr(`${results.length} shown`, `${results.length} affichées`)}</p>
      <div className="flex flex-wrap items-start gap-7">
        <aside className="card flex max-w-[320px] flex-[1_1_260px] flex-col gap-[22px] bg-parchment p-[22px]">
          <RegionFilter region={region} city={city} radius={radius} onRegion={(r) => { setRegion(r); setCity(null); setRadius(r.radiusKm); }} onCity={setCity} onRadius={setRadius} />
          <fieldset className="flex flex-col gap-2.5">
            <legend className="mb-2.5 text-sm font-bold">{tr("Venue type", "Type de salle")}</legend>
            {TYPES.map((t) => (
              <label key={t} className="flex items-center gap-2.5 text-ink-2">
                <input type="checkbox" checked={types.includes(t)} onChange={() => toggle(t)} className="h-[18px] w-[18px] accent-navy" />{label(lang, t)}
              </label>
            ))}
          </fieldset>
          <label className="flex items-center gap-2.5 text-ink-2">
            <input type="checkbox" checked={openOnly} onChange={(e) => setOpenOnly(e.target.checked)} className="h-[18px] w-[18px] accent-navy" />{tr("Open to new acts", "Ouverte aux nouveaux numéros")}
          </label>
          <div className="flex flex-col gap-1.5 border-t border-line pt-4 text-[#6E7383]">
            <span className="text-sm font-bold">{tr("More filters coming soon", "D'autres filtres bientôt")}</span>
            <span className="text-sm">{tr("Has PA system · Nights they book · Fee range", "Système de son · Soirs de spectacle · Cachet")}</span>
          </div>
        </aside>
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-3.5">
          {results.map((v) => <VenueRow key={v.id} v={v} />)}
          {results.length === 0 && <p className="card p-8 text-center text-slate">{tr("No venues match these filters yet.", "Aucune salle ne correspond à ces filtres pour l'instant.")}</p>}
        </div>
      </div>
    </div>
  );
}
