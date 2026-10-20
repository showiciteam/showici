"use client";

import { ALL_QUEBEC, REGIONS, type Region } from "@/lib/regions";

/** Region picker plus distance slider for the Performers and Venues search pages. */
export function RegionFilter({ region, radius, onRegion, onRadius }: { region: Region; radius: number; onRegion: (r: Region) => void; onRadius: (km: number) => void }) {
  return (
    <>
      <label className="label">Region
        <select className="input" value={region.key} onChange={(e) => onRegion(REGIONS.find((r) => r.key === e.target.value) ?? REGIONS[0])}>
          {REGIONS.map((r) => <option key={r.key} value={r.key}>{r.en}</option>)}
        </select>
      </label>
      {region.key !== ALL_QUEBEC && (
        <label className="label">Within {radius} km
          <input type="range" min={10} max={300} step={10} value={radius} onChange={(e) => onRadius(Number(e.target.value))} className="accent-navy" />
        </label>
      )}
    </>
  );
}

/** "Within 50 km of Greater Montréal" or "Anywhere in Québec". */
export function regionLabel(region: Region, radius: number) {
  return region.key === ALL_QUEBEC ? "Anywhere in Québec" : `Within ${radius} km of ${region.en}`;
}
