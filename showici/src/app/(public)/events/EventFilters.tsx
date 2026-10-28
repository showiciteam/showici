"use client";

import { useMemo, useState } from "react";
import { BigEventCard } from "@/components/cards";
import { Chip } from "@/components/ui";
import { ALL_QUEBEC, REGIONS, distanceKm } from "@/lib/regions";
import type { BigEvent } from "@/lib/types";

const CATEGORIES = ["All", "Concert", "Festival", "Comedy", "Theatre", "Family", "Sports"];
const LABEL: Record<string, string> = { Concert: "Concerts", Festival: "Festivals" };
const WHEN = [
  { key: "all", label: "Any date" },
  { key: "weekend", label: "This weekend" },
  { key: "30", label: "Next 30 days" },
  { key: "90", label: "Next 3 months" },
];

const ymd = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** [from, to] local dates (YYYY-MM-DD) for a "when" choice. */
function range(when: string): [string, string] | null {
  const today = new Date();
  if (when === "weekend") {
    const day = today.getDay(); // 0 Sun … 6 Sat
    const fri = new Date(today);
    fri.setDate(today.getDate() + (day === 0 ? -2 : 5 - day));
    const sun = new Date(fri);
    sun.setDate(fri.getDate() + 2);
    return [ymd(day === 0 || day === 6 ? today : fri), ymd(sun)];
  }
  if (when === "30" || when === "90") {
    const end = new Date(today);
    end.setDate(today.getDate() + Number(when));
    return [ymd(today), ymd(end)];
  }
  return null;
}

/** Big events list with working filters: type of event, date range and region. */
export function EventsBrowser({ events }: { events: BigEvent[] }) {
  const [cat, setCat] = useState("All");
  const [when, setWhen] = useState("all");
  const [region, setRegion] = useState(ALL_QUEBEC);

  const shown = useMemo(() => {
    const r = REGIONS.find((x) => x.key === region);
    const span = range(when);
    return events.filter((e) => {
      if (cat !== "All" && e.category !== cat) return false;
      if (span && e.startDate && (e.startDate < span[0] || e.startDate > span[1])) return false;
      if (r && r.key !== ALL_QUEBEC && e.lat != null && e.lng != null && distanceKm(r, { lat: e.lat, lng: e.lng }) > r.radiusKm) return false;
      return true;
    });
  }, [events, cat, when, region]);

  const [featured, ...rest] = shown;

  return (
    <>
      <div className="flex flex-wrap items-center gap-2.5">
        {CATEGORIES.map((c) => (
          <Chip key={c} on={cat === c} onClick={() => setCat(c)}>{LABEL[c] ?? c}</Chip>
        ))}
        <span className="flex-1" />
        <label className="flex items-center gap-2 text-sm font-bold">When
          <select className="input w-auto py-2.5" value={when} onChange={(e) => setWhen(e.target.value)}>
            {WHEN.map((w) => <option key={w.key} value={w.key}>{w.label}</option>)}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm font-bold">Where
          <select className="input w-auto py-2.5" value={region} onChange={(e) => setRegion(e.target.value)}>
            {REGIONS.map((r) => <option key={r.key} value={r.key}>{r.en}</option>)}
          </select>
        </label>
      </div>

      {shown.length === 0 && (
        <p className="rounded-[18px] border border-line bg-parchment p-8 text-center text-slate">
          {events.length === 0 ? "Big events are on their way. Check back soon." : "No events match these filters. Try another date or region."}
        </p>
      )}

      {featured && (
        <a href={featured.url} target="_blank" rel="noopener noreferrer sponsored" className="flex flex-wrap overflow-hidden rounded-[22px] bg-navy text-white no-underline hover:text-white">
          {featured.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={featured.image} alt="" className="min-h-80 flex-[1_1_520px] bg-navy-soft object-cover" />
          ) : (
            <div className="flex min-h-80 flex-[1_1_520px] items-center justify-center bg-navy-soft font-bold text-on-navy">[Event image from Ticketmaster]</div>
          )}
          <div className="flex flex-[1_1_360px] flex-col justify-center gap-3 p-8">
            <span className="eyebrow text-brass">{featured.category} · Next up</span>
            <span className="font-display text-[34px] font-extrabold leading-tight">{featured.name}</span>
            <span className="text-on-navy">{[featured.venue, featured.city].filter(Boolean).join(", ")}</span>
            <span className="text-on-navy">{featured.day} {featured.month} {featured.date} · {featured.time}{featured.moreDates ? ` · +${featured.moreDates} more dates` : ""}</span>
            {featured.price && <span className="text-on-navy">{featured.price}</span>}
            <span className="mt-2 w-fit rounded-[10px] bg-brass px-[18px] py-3 font-bold text-navy">Get tickets ↗</span>
            <span className="text-xs text-[#9AA3B8]">Tickets sold on Ticketmaster</span>
          </div>
        </a>
      )}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[18px]">
        {rest.map((e) => <BigEventCard key={e.id} e={e} />)}
      </div>
    </>
  );
}
