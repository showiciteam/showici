"use client";

import Link from "next/link";
import { useState } from "react";
import type { Performer, Venue } from "@/lib/types";

type Filter = "all" | "venues" | "artists";

export function HomeMap({ venues, performers }: { venues: Venue[]; performers: Performer[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Venue | null>(venues[0] ?? null);
  const showV = filter !== "artists";
  const showA = filter !== "venues";

  return (
    <section id="map" className="wrap pt-[72px]">
      <div className="mb-[22px] flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <span className="eyebrow">The ShowIci map</span>
          <h2 className="h-display text-[40px]">Who&apos;s on ShowIci near you</h2>
          <p className="max-w-[620px] text-[17px] text-slate">Every registered venue and performer, on one map. Tap a pin to see their profile.</p>
        </div>
        <div role="group" aria-label="Show on map" className="flex gap-1.5 rounded-full border border-line bg-parchment p-1">
          {([["all", "All"], ["venues", "Venues"], ["artists", "Performers"]] as const).map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={filter === id}
              onClick={() => setFilter(id)}
              className={`min-h-11 rounded-full px-4 text-sm ${filter === id ? "bg-navy font-bold text-white" : "text-ink-2"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-stretch gap-5">
        {/* Illustrated map. Swap for Mapbox or Google Maps once real coordinates are in Supabase. */}
        <div className="relative h-[560px] min-w-0 flex-[999_1_640px] overflow-hidden rounded-[20px] border border-line bg-[#E9EDE6]">
          <div className="absolute left-[-10%] top-[6%] h-[30%] w-[70%] -rotate-[18deg] rounded-[40%] bg-[#CFDCE6]" />
          <div className="absolute bottom-0 right-[-15%] h-[26%] w-[75%] -rotate-[22deg] rounded-[40%] bg-[#CFDCE6]" />
          <div className="absolute left-[22%] top-[30%] h-[42%] w-1/2 -rotate-[24deg] rounded-[46%_54%_40%_60%] border border-[#DDD7C6] bg-[#F1EFE6]" />
          <span className="absolute left-[40%] top-[46%] text-xs font-bold tracking-[0.1em] text-[#8E949F]">MONTRÉAL</span>
          <span className="absolute left-[12%] top-[16%] text-[11px] font-bold tracking-[0.1em] text-[#8E949F]">LAVAL</span>
          <span className="absolute bottom-[14%] right-[12%] text-[11px] font-bold tracking-[0.1em] text-[#8E949F]">LONGUEUIL</span>

          {showV &&
            venues.map((v) => (
              <button
                key={v.id}
                type="button"
                aria-label={`${v.name}, ${v.area}`}
                onClick={() => setSelected(v)}
                style={{ left: v.map.x, top: v.map.y }}
                className="absolute -ml-[17px] -mt-[17px] flex h-[34px] w-[34px] items-center justify-center rounded-[10px] border-2 border-white bg-navy shadow-md"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D9A441" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21V9l9-5 9 5v12" /><path d="M9 21v-6h6v6" /></svg>
              </button>
            ))}
          {showA &&
            performers.map((p) => (
              <Link
                key={p.id}
                href={`/performers/${p.id}`}
                aria-label={p.name}
                style={{ left: p.map.x, top: p.map.y }}
                className="absolute -ml-[15px] -mt-[15px] flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-white bg-brass shadow-md"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#14213D" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0" /><path d="M12 18v3" /></svg>
              </Link>
            ))}

          {showV && selected && (
            <div className="absolute right-20 top-4 w-60 overflow-hidden rounded-[14px] bg-white shadow-xl">
              <div className="h-20 bg-ph-2" />
              <div className="flex flex-col gap-1 p-3.5">
                <strong className="text-[15px]">{selected.name}</strong>
                <span className="text-[13px] text-muted">{selected.type} · {selected.area} · {selected.capacity}</span>
                <span className="text-[13px] text-ink-2">Live nights: {selected.nights}</span>
                <Link href={`/venues/${selected.id}`} className="mt-1 text-sm font-bold no-underline">View venue →</Link>
              </div>
            </div>
          )}

          <div className="absolute bottom-4 left-4 flex gap-4 rounded-xl bg-white px-3.5 py-2.5 text-[13px] shadow">
            <span className="flex items-center gap-1.5"><span className="h-3.5 w-3.5 rounded bg-navy" />Venues</span>
            <span className="flex items-center gap-1.5"><span className="h-3.5 w-3.5 rounded-full bg-brass" />Performers</span>
          </div>
        </div>

        <aside className="flex max-w-[360px] flex-[1_1_280px] flex-col gap-3.5">
          <label className="label">
            City
            <select className="input">
              <option>Greater Montréal</option>
              <option disabled>Toronto (coming soon)</option>
              <option disabled>Ottawa (coming soon)</option>
              <option disabled>Vancouver (coming soon)</option>
            </select>
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="card p-4"><span className="text-[13px] text-muted">Venues</span><div className="h-display text-[32px]">{venues.length}</div></div>
            <div className="card p-4"><span className="text-[13px] text-muted">Performers</span><div className="h-display text-[32px]">{performers.length}</div></div>
          </div>
          <div className="card flex flex-col gap-2.5 p-4">
            <strong className="text-[15px]">Newest on the map</strong>
            {performers.slice(0, 2).map((p) => (
              <Link key={p.id} href={`/performers/${p.id}`} className="flex items-center gap-2.5 text-navy no-underline">
                <span className="h-8 w-8 flex-none rounded-full bg-brass" />
                <span><strong className="text-sm">{p.name}</strong><br /><span className="text-[13px] text-muted">Performer · {p.base}</span></span>
              </Link>
            ))}
            {venues.slice(1, 2).map((v) => (
              <Link key={v.id} href={`/venues/${v.id}`} className="flex items-center gap-2.5 text-navy no-underline">
                <span className="h-8 w-8 flex-none rounded-lg bg-navy" />
                <span><strong className="text-sm">{v.name}</strong><br /><span className="text-[13px] text-muted">Venue · {v.area}</span></span>
              </Link>
            ))}
          </div>
          <Link href="/signup" className="rounded-xl bg-navy py-3.5 text-center font-bold text-white no-underline hover:text-white">Put yourself on the map</Link>
        </aside>
      </div>
    </section>
  );
}
