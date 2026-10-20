"use client";

import { useMemo, useState } from "react";
import { VenueRow } from "@/components/cards";
import type { Venue } from "@/lib/types";
import { RegionFilter, regionLabel } from "@/components/RegionFilter";
import { ALL_QUEBEC, kmFrom, regionFor } from "@/lib/regions";

const TYPES = ["Pub", "Bar", "Restaurant", "Brewery", "Café", "Club", "Event hall"];

export function VenueSearch({ venues, initialRadius, initialRegion }: { venues: Venue[]; initialRadius?: number; initialRegion?: string }) {
  const [types, setTypes] = useState<string[]>([]); // none ticked = every type
  const [region, setRegion] = useState(() => regionFor(initialRegion));
  const [radius, setRadius] = useState(initialRadius ?? regionFor(initialRegion).radiusKm);
  const [openOnly, setOpenOnly] = useState(false);

  const results = useMemo(
    () =>
      venues
        .map((v) => (region.key === ALL_QUEBEC ? v : { ...v, distanceKm: kmFrom(region, v) }))
        .filter((v) => (types.length === 0 || types.includes(v.type)) && (region.key === ALL_QUEBEC || v.distanceKm <= radius) && (!openOnly || v.openToNewActs))
        .sort((a, b) => a.distanceKm - b.distanceKm),
    [venues, types, region, radius, openOnly]
  );
  const toggle = (t: string) => setTypes((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  return (
    <div className="wrap pb-16 pt-8">
      <h1 className="h-display text-[40px]">Find venues</h1>
      <p className="mb-7 mt-1.5 text-slate">Venues that book acts like yours · {regionLabel(region, radius)} · {results.length} shown</p>
      <div className="flex flex-wrap items-start gap-7">
        <aside className="card flex max-w-[320px] flex-[1_1_260px] flex-col gap-[22px] bg-parchment p-[22px]">
          <RegionFilter region={region} radius={radius} onRegion={(r) => { setRegion(r); setRadius(r.radiusKm); }} onRadius={setRadius} />
          <fieldset className="flex flex-col gap-2.5">
            <legend className="mb-2.5 text-sm font-bold">Venue type</legend>
            {TYPES.map((t) => (
              <label key={t} className="flex items-center gap-2.5 text-ink-2">
                <input type="checkbox" checked={types.includes(t)} onChange={() => toggle(t)} className="h-[18px] w-[18px] accent-navy" />{t}
              </label>
            ))}
          </fieldset>
          <label className="flex items-center gap-2.5 text-ink-2">
            <input type="checkbox" checked={openOnly} onChange={(e) => setOpenOnly(e.target.checked)} className="h-[18px] w-[18px] accent-navy" />Open to new acts
          </label>
          <div className="flex flex-col gap-1.5 border-t border-line pt-4 text-[#6E7383]">
            <span className="text-sm font-bold">More filters coming soon</span>
            <span className="text-sm">Has PA system · Nights they book · Fee range</span>
          </div>
        </aside>
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-3.5">
          {results.map((v) => <VenueRow key={v.id} v={v} />)}
          {results.length === 0 && <p className="card p-8 text-center text-slate">No venues match these filters yet.</p>}
        </div>
      </div>
    </div>
  );
}
