"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Performer, Venue } from "@/lib/types";
import { ALL_QUEBEC, GROUP_LABEL, REGIONS, citiesIn, cityFor, inArea, regionFor, type City, type Group, type Region } from "@/lib/regions";

type Filter = "all" | "venues" | "artists";
type Pick = { kind: "venue"; item: Venue } | { kind: "performer"; item: Performer };

// Leaflet is loaded from cdnjs on demand, so the map adds nothing to the page bundle.
const LEAFLET = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4";
// Rough outline of Québec, used for the "All of Québec" view.
const QUEBEC_BOX: [[number, number], [number, number]] = [[44.99, -79.76], [58.5, -57.1]];
// Same box the old illustrated map used: turns demo-mode x/y percentages back into coordinates.
const BOUNDS = { north: 45.75, south: 45.35, west: -74.05, east: -73.35 };

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window { L?: any }
}

let leafletPromise: Promise<any> | null = null;
function loadLeaflet(): Promise<any> {
  if (typeof window === "undefined") return Promise.reject();
  if (window.L) return Promise.resolve(window.L);
  if (leafletPromise) return leafletPromise;
  leafletPromise = new Promise((resolve, reject) => {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = `${LEAFLET}/leaflet.min.css`;
    document.head.appendChild(css);
    const js = document.createElement("script");
    js.src = `${LEAFLET}/leaflet.min.js`;
    js.async = true;
    js.onload = () => resolve(window.L);
    js.onerror = reject;
    document.head.appendChild(js);
  });
  return leafletPromise;
}

function coords(x: { lat?: number; lng?: number; map: { x: string; y: string } }): [number, number] {
  if (x.lat != null && x.lng != null) return [x.lat, x.lng];
  const px = parseFloat(x.map.x) / 100;
  const py = parseFloat(x.map.y) / 100;
  return [BOUNDS.north - py * (BOUNDS.north - BOUNDS.south), BOUNDS.west + px * (BOUNDS.east - BOUNDS.west)];
}

/** Performers share their city's centre point, so spread them 1.5–3 km apart to keep pins tappable (never an exact address). */
function spread(id: string, [lat, lng]: [number, number]): [number, number] {
  const h = [...id].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const angle = (h % 360) * (Math.PI / 180);
  const r = 0.014 + ((h >> 9) % 100) / 7000;
  return [lat + Math.sin(angle) * r, lng + Math.cos(angle) * r * 1.4];
}

const VENUE_ICON = `<span style="display:flex;width:34px;height:34px;align-items:center;justify-content:center;border-radius:10px;border:2px solid #fff;background:#14213D;box-shadow:0 2px 6px rgba(0,0,0,.3)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A485FF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21V9l9-5 9 5v12"/><path d="M9 21v-6h6v6"/></svg></span>`;
const PERFORMER_ICON = `<span style="display:flex;width:30px;height:30px;align-items:center;justify-content:center;border-radius:999px;border:2px solid #fff;background:#A485FF;box-shadow:0 2px 6px rgba(0,0,0,.3)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#14213D" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/></svg></span>`;

export function HomeMap({ venues, performers }: { venues: Venue[]; performers: Performer[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Pick | null>(null);
  const [region, setRegion] = useState<Region>(REGIONS[0]); // Greater Montréal is the landing view
  const [city, setCity] = useState<City | null>(null); // optional drill-down, e.g. Greater Montréal → Laval
  const [failed, setFailed] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const layers = useRef<{ venues?: any; performers?: any }>({});

  const venuePts = useMemo(() => venues.map((v) => ({ v, at: coords(v) })), [venues]);
  const perfPts = useMemo(() => performers.map((p) => ({ p, at: spread(p.id, coords(p)) })), [performers]);
  const inRegion = (cityName: string, at: [number, number], km: number) => inArea(region, city, region.radiusKm, { city: cityName, lat: at[0], lng: at[1], distanceKm: km });
  const venueCount = venuePts.filter((x) => inRegion(x.v.city, x.at, x.v.distanceKm)).length;
  const perfCount = perfPts.filter((x) => inRegion(x.p.base, x.at, x.p.distanceKm)).length;
  const cities = citiesIn(region);

  // Build the map once.
  useEffect(() => {
    let cancelled = false;
    loadLeaflet()
      .then((L) => {
        if (cancelled || !box.current || mapRef.current) return;
        const start = regionFor("montreal");
        const map = L.map(box.current, { center: [start.lat, start.lng], zoom: start.zoom, scrollWheelZoom: false, zoomControl: true, attributionControl: true });
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 18,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
        // Scroll-zoom only after the visitor clicks the map, so the page still scrolls normally.
        map.on("click", () => map.scrollWheelZoom.enable());
        map.on("mouseout", () => map.scrollWheelZoom.disable());

        const venueIcon = L.divIcon({ html: VENUE_ICON, className: "", iconSize: [34, 34], iconAnchor: [17, 17] });
        const perfIcon = L.divIcon({ html: PERFORMER_ICON, className: "", iconSize: [30, 30], iconAnchor: [15, 15] });
        layers.current.venues = L.layerGroup(
          venuePts.map(({ v, at }) => L.marker(at, { icon: venueIcon, title: v.name, keyboard: true }).on("click", () => setSelected({ kind: "venue", item: v }))),
        ).addTo(map);
        layers.current.performers = L.layerGroup(
          perfPts.map(({ p, at }) => L.marker(at, { icon: perfIcon, title: p.name, keyboard: true }).on("click", () => setSelected({ kind: "performer", item: p }))),
        ).addTo(map);

        mapRef.current = map;
      })
      .catch(() => setFailed(true));
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [venuePts, perfPts]);

  // Region picker moves the map.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (city) map.flyTo([city.lat, city.lng], city.zoom ?? 12, { duration: 0.8 });
    else if (region.key === ALL_QUEBEC) map.fitBounds(QUEBEC_BOX);
    else map.flyTo([region.lat, region.lng], region.zoom, { duration: 0.8 });
  }, [region, city]);

  // Venues / Performers filter.
  useEffect(() => {
    const map = mapRef.current;
    const { venues: vl, performers: pl } = layers.current;
    if (!map || !vl || !pl) return;
    if (filter === "artists") map.removeLayer(vl); else vl.addTo(map);
    if (filter === "venues") map.removeLayer(pl); else pl.addTo(map);
    if (selected && ((filter === "artists" && selected.kind === "venue") || (filter === "venues" && selected.kind === "performer"))) setSelected(null);
  }, [filter, selected]);

  return (
    <section id="map" className="wrap pt-[72px]">
      <style>{`.showici-map .leaflet-tile-pane{filter:grayscale(.75) sepia(.12) saturate(1.1) brightness(1.04) contrast(.92)}.showici-map .leaflet-container{font:inherit;background:#E9EDE6}.showici-map .leaflet-control-attribution{font-size:10px}`}</style>
      <div className="mb-[22px] flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <span className="eyebrow">The ShowIci map</span>
          <h2 className="h-display text-[40px]">Who&apos;s on ShowIci near you</h2>
          <p className="max-w-[620px] text-[17px] text-slate">Every registered venue and performer across Québec, on one map. Pick a region or tap a pin to see a profile.</p>
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
        <div className="showici-map relative h-[420px] min-w-0 flex-[999_1_640px] overflow-hidden rounded-[20px] border border-line bg-[#E9EDE6] sm:h-[560px]">
          <div ref={box} className="absolute inset-0 z-0" aria-label="Map of venues and performers" role="region" />
          {failed && <p className="absolute inset-0 flex items-center justify-center p-6 text-center text-slate">The map couldn&apos;t load. Check your connection and refresh.</p>}

          {selected && (
            <div className="absolute right-3 top-3 z-[500] w-[240px] overflow-hidden rounded-[14px] bg-white shadow-xl">
              <button type="button" aria-label="Close" onClick={() => setSelected(null)} className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-navy shadow">×</button>
              {selected.kind === "venue" ? (
                <>
                  {selected.item.photos?.[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={selected.item.photos[0]} alt="" className="h-24 w-full object-cover" />
                  ) : <div className="h-20 bg-ph-2" />}
                  <div className="flex flex-col gap-1 p-3.5">
                    <strong className="text-[15px]">{selected.item.name}</strong>
                    <span className="text-[13px] text-muted">{[selected.item.type, selected.item.area || selected.item.city, selected.item.capacity].filter(Boolean).join(" · ")}</span>
                    {selected.item.nights && <span className="text-[13px] text-ink-2">Live nights: {selected.item.nights}</span>}
                    <Link href={`/venues/${selected.item.id}`} className="mt-1 text-sm font-bold no-underline">View venue →</Link>
                  </div>
                </>
              ) : (
                <>
                  {(selected.item.cover ?? selected.item.photos?.[0]) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={selected.item.cover ?? selected.item.photos?.[0]} alt="" className="h-24 w-full object-cover" />
                  ) : <div className="h-20 bg-brass-tint" />}
                  <div className="flex flex-col gap-1 p-3.5">
                    <strong className="text-[15px]">{selected.item.name}</strong>
                    <span className="text-[13px] text-muted">{[selected.item.actType, selected.item.genres.slice(0, 2).join(", "), selected.item.base].filter(Boolean).join(" · ")}</span>
                    <span className="text-[13px] text-ink-2">Travels up to {selected.item.travelKm} km</span>
                    <Link href={`/performers/${selected.item.id}`} className="mt-1 text-sm font-bold no-underline">View profile →</Link>
                  </div>
                </>
              )}
            </div>
          )}

          <div className="pointer-events-none absolute bottom-6 left-3 z-[500] flex gap-4 rounded-xl bg-white px-3.5 py-2.5 text-[13px] shadow">
            <span className="flex items-center gap-1.5"><span className="h-3.5 w-3.5 rounded bg-navy" />Venues</span>
            <span className="flex items-center gap-1.5"><span className="h-3.5 w-3.5 rounded-full bg-brass" />Performers</span>
          </div>
        </div>

        <aside className="flex max-w-[360px] flex-[1_1_280px] flex-col gap-3.5">
          <label className="label">
            Region
            <select className="input" value={region.key} onChange={(e) => { setRegion(regionFor(e.target.value)); setCity(null); }}>
              {REGIONS.map((r) => <option key={r.key} value={r.key}>{r.en}</option>)}
            </select>
          </label>
          {cities.length > 0 && (
            <label className="label">
              City
              <select className="input" value={city?.key ?? ""} onChange={(e) => setCity(cityFor(region, e.target.value))}>
                <option value="">All of {region.en}</option>
                {region.key === "montreal"
                  ? (Object.keys(GROUP_LABEL) as Group[]).map((g) => (
                      <optgroup key={g} label={GROUP_LABEL[g].en}>
                        {cities.filter((x) => x.group === g).map((x) => <option key={x.key} value={x.key}>{x.name}</option>)}
                      </optgroup>
                    ))
                  : cities.map((x) => <option key={x.key} value={x.key}>{x.name}</option>)}
              </select>
            </label>
          )}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="card p-4"><span className="text-[13px] text-muted">Venues</span><div className="h-display text-[32px]">{venueCount}</div></div>
            <div className="card p-4"><span className="text-[13px] text-muted">Performers</span><div className="h-display text-[32px]">{perfCount}</div></div>
          </div>
          <div className="card flex flex-col gap-2.5 p-4">
            <strong className="text-[15px]">Newest on the map</strong>
            {performers.slice(0, 2).map((p) => (
              <Link key={p.id} href={`/performers/${p.id}`} className="flex items-center gap-2.5 text-navy no-underline">
                {p.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.logo} alt="" className="h-8 w-8 flex-none rounded-full object-cover" />
                ) : <span className="h-8 w-8 flex-none rounded-full bg-brass" />}
                <span><strong className="text-sm">{p.name}</strong><br /><span className="text-[13px] text-muted">Performer · {p.base}</span></span>
              </Link>
            ))}
            {venues.slice(0, 1).map((v) => (
              <Link key={v.id} href={`/venues/${v.id}`} className="flex items-center gap-2.5 text-navy no-underline">
                <span className="h-8 w-8 flex-none rounded-lg bg-navy" />
                <span><strong className="text-sm">{v.name}</strong><br /><span className="text-[13px] text-muted">Venue · {v.area || v.city}</span></span>
              </Link>
            ))}
          </div>
          <Link href="/signup" className="rounded-xl bg-navy py-3.5 text-center font-bold text-white no-underline hover:text-white">Put yourself on the map</Link>
        </aside>
      </div>
    </section>
  );
}
