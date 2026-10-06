"use client";

import { useMemo, useState } from "react";
import { VenueRow } from "@/components/cards";
import { FreePlanBanner } from "@/components/ui";
import type { Venue } from "@/lib/types";

const TYPES = ["Pub", "Bar", "Restaurant", "Brewery", "Club"];

export function VenueSearch({ venues }: { venues: Venue[] }) {
  const [types, setTypes] = useState<string[]>(["Pub", "Bar"]);
  const [radius, setRadius] = useState(50);
  const [openOnly, setOpenOnly] = useState(false);

  const results = useMemo(
    () => venues.filter((v) => (types.length === 0 || types.includes(v.type)) && v.distanceKm <= radius && (!openOnly || v.openToNewActs)),
    [venues, types, radius, openOnly]
  );
  const toggle = (t: string) => setTypes((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  return (
    <div className="wrap pb-16 pt-8">
      <FreePlanBanner />
      <h1 className="h-display text-[40px]">Find venues</h1>
      <p className="mb-7 mt-1.5 text-slate">Venues within {radius} km of Montréal that book acts like yours · {results.length} shown</p>
      <div className="flex flex-wrap items-start gap-7">
        <aside className="card flex max-w-[320px] flex-[1_1_260px] flex-col gap-[22px] bg-parchment p-[22px]">
          <label className="label">Location<input className="input" defaultValue="Montréal, QC" /></label>
          <label className="label">Radius: {radius} km
            <input type="range" min={5} max={150} step={5} value={radius} onChange={(e) => setRadius(Number(e.target.value))} className="accent-navy" />
          </label>
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
            <span className="text-sm font-bold">🔒 Locked on the free plan</span>
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
