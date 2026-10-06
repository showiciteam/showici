"use client";

import { useMemo, useState } from "react";
import { PerformerRow } from "@/components/cards";
import { FreePlanBanner } from "@/components/ui";
import type { Performer } from "@/lib/types";

const ACT_TYPES = ["Band", "Duo", "DJ", "Stand-up comedy", "Magician"];

export function PerformerSearch({ performers, initialType, initialRadius = 50 }: { performers: Performer[]; initialType?: string; initialRadius?: number }) {
  const [types, setTypes] = useState<string[]>(initialType ? [initialType] : []);
  const [radius, setRadius] = useState(initialRadius);
  const [rep, setRep] = useState<"Any" | "Covers" | "Originals" | "Both">("Any");
  const [genre, setGenre] = useState("Any");

  const results = useMemo(
    () =>
      performers.filter(
        (p) =>
          (types.length === 0 || types.includes(p.actType)) &&
          p.distanceKm <= radius &&
          (rep === "Any" || p.repertoire === rep) &&
          (genre === "Any" || p.genres.some((g) => g.toLowerCase().includes(genre.toLowerCase())))
      ),
    [performers, types, radius, rep, genre]
  );

  const toggle = (t: string) => setTypes((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  return (
    <div className="wrap pb-16 pt-8">
      <FreePlanBanner />
      <h1 className="h-display text-[40px]">Find performers</h1>
      <p className="mb-7 mt-1.5 text-slate">Within {radius} km of Montréal, QC · {results.length} shown</p>

      <div className="flex flex-wrap items-start gap-7">
        <aside className="card flex max-w-[320px] flex-[1_1_260px] flex-col gap-[22px] bg-parchment p-[22px]">
          <label className="label">Location<input className="input" defaultValue="Montréal, QC" /></label>
          <label className="label">Radius: {radius} km
            <input type="range" min={5} max={150} step={5} value={radius} onChange={(e) => setRadius(Number(e.target.value))} className="accent-navy" />
          </label>
          <fieldset className="flex flex-col gap-2.5">
            <legend className="mb-2.5 text-sm font-bold">Type of act</legend>
            {ACT_TYPES.map((t) => (
              <label key={t} className="flex items-center gap-2.5 text-ink-2">
                <input type="checkbox" checked={types.includes(t)} onChange={() => toggle(t)} className="h-[18px] w-[18px] accent-navy" />{t}
              </label>
            ))}
          </fieldset>
          <label className="label">Genre
            <select className="input" value={genre} onChange={(e) => setGenre(e.target.value)}>
              <option>Any</option><option>Rock</option><option>Pop</option><option>Latin</option><option>Folk</option><option>Comedy</option>
            </select>
          </label>
          <fieldset className="flex flex-col gap-2.5">
            <legend className="mb-2.5 text-sm font-bold">Repertoire</legend>
            {(["Any", "Covers", "Originals", "Both"] as const).map((r) => (
              <label key={r} className="flex items-center gap-2.5 text-ink-2">
                <input type="radio" name="rep" checked={rep === r} onChange={() => setRep(r)} className="h-[18px] w-[18px] accent-navy" />{r}
              </label>
            ))}
          </fieldset>
          <div className="flex flex-col gap-1.5 border-t border-line pt-4 text-[#6E7383]">
            <span className="text-sm font-bold">🔒 Paid filters</span>
            <span className="text-sm">Availability by date · Event type · Language · Price range</span>
          </div>
        </aside>

        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-3.5">
          {results.map((p) => <PerformerRow key={p.id} p={p} />)}
          {results.length === 0 && <p className="card p-8 text-center text-slate">No performers match these filters yet. Try a bigger radius.</p>}
        </div>
      </div>
    </div>
  );
}
