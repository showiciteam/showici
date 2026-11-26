"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { useRouter } from "@/lib/navigation";
import { ALL_QUEBEC, REGIONS } from "@/lib/regions";

const copy = {
  fr: { what: "Je cherche", performers: "Des artistes", venues: "Des salles", shows: "Des spectacles", region: "Région", radius: "Rayon", go: "Rechercher" },
  en: { what: "Looking for", performers: "Artists", venues: "Venues", shows: "Shows", region: "Region", radius: "Within", go: "Search" },
};

/** One-row search on the home hero: what, where and how far. Sends the visitor to the matching list page. */
export function HomeSearch() {
  const { lang } = useLang();
  const c = copy[lang];
  const router = useRouter();
  const [what, setWhat] = useState("/performers");
  const [region, setRegion] = useState("montreal");
  const [radius, setRadius] = useState("50");

  const field = "flex min-h-[54px] items-center gap-2.5 px-4 text-[15px] text-ink";
  const select = "w-full min-w-0 cursor-pointer border-0 bg-transparent py-3 font-medium text-ink outline-none";

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const q = new URLSearchParams({ region, ...(region === ALL_QUEBEC ? {} : { radius }) });
        router.push(`${what}?${q}`);
      }}
      className="mt-7 flex max-w-[820px] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_12px_30px_rgba(0,0,0,0.4)] sm:flex-row sm:rounded-full"
    >
      <label className={`${field} sm:flex-[1_1_200px]`}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
        <span className="sr-only">{c.what}</span>
        <select className={select} value={what} onChange={(e) => setWhat(e.target.value)}>
          <option value="/performers">{c.performers}</option>
          <option value="/venues">{c.venues}</option>
          <option value="/shows">{c.shows}</option>
        </select>
      </label>
      <label className={`${field} sm:flex-[1_1_220px] border-t border-line sm:border-l sm:border-t-0`}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
        <span className="sr-only">{c.region}</span>
        <select className={select} value={region} onChange={(e) => setRegion(e.target.value)}>
          {REGIONS.map((r) => <option key={r.key} value={r.key}>{r[lang]}</option>)}
        </select>
      </label>
      <label className={`${field} sm:flex-[0_0_120px] border-t border-line sm:border-l sm:border-t-0`}>
        <span className="sr-only">{c.radius}</span>
        <select className={select} value={radius} disabled={region === ALL_QUEBEC} onChange={(e) => setRadius(e.target.value)}>
          {["10", "25", "50", "100", "200"].map((km) => <option key={km} value={km}>{km} km</option>)}
        </select>
      </label>
      <button type="submit" className="min-h-[54px] bg-accent px-8 font-display text-base font-bold text-white hover:bg-accent-dark">
        {c.go}
      </button>
    </form>
  );
}
