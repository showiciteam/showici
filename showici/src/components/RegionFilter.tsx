"use client";

import { useLang } from "@/lib/i18n";
import type { Lang } from "@/lib/lang";
import { ALL_QUEBEC, GROUP_LABEL, REGIONS, citiesIn, hasCityList, type City, type Group, type Region } from "@/lib/regions";

const copy = {
  fr: { region: "Région", city: "Ville", all: (r: string) => `Tout le secteur : ${r}`, within: "Rayon" },
  en: { region: "Region", city: "City", all: (r: string) => `All of ${r}`, within: "Within" },
};

const selectClass = "min-h-12 w-full min-w-0 cursor-pointer rounded-xl border-0 bg-white px-3 font-medium text-ink";

/**
 * Region, city and distance pickers for the artists and venues searches.
 * Regions around Montréal list their cities; other regions use a distance from their centre.
 */
export function RegionFilter({ region, city, radius, onRegion, onCity, onRadius }: {
  region: Region; city: City | null; radius: number;
  onRegion: (r: Region) => void; onCity: (c: City | null) => void; onRadius: (km: number) => void;
}) {
  const { lang } = useLang();
  const c = copy[lang];
  const cities = citiesIn(region);
  const groups = region.key === "montreal"
    ? (Object.keys(GROUP_LABEL) as Group[]).map((g) => ({ label: GROUP_LABEL[g][lang], items: cities.filter((x) => x.group === g) }))
    : [{ label: "", items: cities }];

  return (
    <>
      <label className="flex-[1_1_200px]">
        <span className="sr-only">{c.region}</span>
        <select className={selectClass} value={region.key} onChange={(e) => onRegion(REGIONS.find((r) => r.key === e.target.value) ?? REGIONS[0])}>
          {REGIONS.map((r) => <option key={r.key} value={r.key}>{r[lang]}</option>)}
        </select>
      </label>
      {cities.length > 0 && (
        <label className="flex-[1_1_180px]">
          <span className="sr-only">{c.city}</span>
          <select className={selectClass} value={city?.key ?? ""} onChange={(e) => onCity(cities.find((x) => x.key === e.target.value) ?? null)}>
            <option value="">{c.all(region[lang])}</option>
            {groups.map((g) =>
              g.label ? (
                <optgroup key={g.label} label={g.label}>
                  {g.items.map((x) => <option key={x.key} value={x.key}>{x.name}</option>)}
                </optgroup>
              ) : (
                g.items.map((x) => <option key={x.key} value={x.key}>{x.name}</option>)
              ),
            )}
          </select>
        </label>
      )}
      {region.key !== ALL_QUEBEC && !hasCityList(region) && (
        <label className="flex-[0_1_130px]">
          <span className="sr-only">{c.within}</span>
          <select className={selectClass} value={radius} onChange={(e) => onRadius(Number(e.target.value))}>
            {[25, 50, 100, 200, 300].map((km) => <option key={km} value={km}>{km} km</option>)}
          </select>
        </label>
      )}
    </>
  );
}

/** "Laval · Grand Montréal", "Grand Montréal", "Rayon de 50 km : Québec" or "Partout au Québec". */
export function regionLabel(region: Region, radius: number, city: City | null | undefined, lang: Lang) {
  const name = region[lang];
  if (city) return `${city.name} · ${name}`;
  if (region.key === ALL_QUEBEC) return lang === "fr" ? "Partout au Québec" : "Anywhere in Québec";
  if (hasCityList(region)) return name;
  return lang === "fr" ? `Dans un rayon de ${radius} km : ${name}` : `Within ${radius} km of ${name}`;
}
