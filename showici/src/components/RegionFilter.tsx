"use client";

import { ALL_QUEBEC, GROUP_LABEL, REGIONS, citiesIn, hasCityList, type City, type Group, type Region } from "@/lib/regions";

/**
 * Region picker for the Performers and Venues search pages.
 * Regions around Montréal open a collapsible list of their cities (Greater Montréal → Laval, Longueuil, Mascouche…);
 * other regions use a distance slider from their centre.
 */
export function RegionFilter({ region, city, radius, onRegion, onCity, onRadius }: {
  region: Region; city: City | null; radius: number;
  onRegion: (r: Region) => void; onCity: (c: City | null) => void; onRadius: (km: number) => void;
}) {
  const cities = citiesIn(region);
  const groups = region.key === "montreal"
    ? (Object.keys(GROUP_LABEL) as Group[]).map((g) => ({ label: GROUP_LABEL[g].en, items: cities.filter((x) => x.group === g) }))
    : [{ label: "", items: cities }];
  const chip = (active: boolean) =>
    `rounded-full border px-3 py-1.5 text-sm font-semibold ${active ? "border-navy bg-navy text-white" : "border-line-strong bg-white text-ink-2 hover:border-navy"}`;

  return (
    <>
      <label className="label">Region
        <select className="input" value={region.key} onChange={(e) => onRegion(REGIONS.find((r) => r.key === e.target.value) ?? REGIONS[0])}>
          {REGIONS.map((r) => <option key={r.key} value={r.key}>{r.en}</option>)}
        </select>
      </label>
      {cities.length > 0 && (
        <details className="group rounded-xl border border-line bg-white p-3" open={Boolean(city)}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-bold">
            <span>{city ? `City: ${city.name}` : `All of ${region.en}`}</span>
            <span className="text-slate transition group-open:rotate-90" aria-hidden>›</span>
          </summary>
          <div className="mt-3 flex flex-col gap-3">
            <button type="button" className={`${chip(!city)} self-start`} onClick={() => onCity(null)}>All of {region.en}</button>
            {groups.map((g) => (
              <div key={g.label || "all"} className="flex flex-col gap-1.5">
                {g.label && <span className="text-xs font-bold uppercase tracking-wide text-muted">{g.label}</span>}
                <div className="flex flex-wrap gap-1.5">
                  {g.items.map((x) => (
                    <button key={x.key} type="button" className={chip(city?.key === x.key)} aria-pressed={city?.key === x.key} onClick={() => onCity(city?.key === x.key ? null : x)}>{x.name}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </details>
      )}
      {region.key !== ALL_QUEBEC && !hasCityList(region) && (
        <label className="label">Within {radius} km
          <input type="range" min={10} max={300} step={10} value={radius} onChange={(e) => onRadius(Number(e.target.value))} className="accent-navy" />
        </label>
      )}
    </>
  );
}

/** "Laval", "Greater Montréal", "Within 50 km of Québec City" or "Anywhere in Québec". */
export function regionLabel(region: Region, radius: number, city?: City | null) {
  if (city) return `${city.name} · ${region.en}`;
  if (region.key === ALL_QUEBEC) return "Anywhere in Québec";
  return hasCityList(region) ? region.en : `Within ${radius} km of ${region.en}`;
}
