"use client";

import { useMemo, useState } from "react";
import { BigEventCard } from "@/components/cards";
import { useLang } from "@/lib/i18n";
import { label, monthLabel } from "@/lib/labels";
import { ALL_QUEBEC, REGIONS, distanceKm } from "@/lib/regions";
import type { BigEvent } from "@/lib/types";

const CATEGORIES = ["All", "Concert", "Festival", "Comedy", "Theatre", "Family"];
const WHEN = ["all", "weekend", "30", "90"] as const;

const copy = {
  fr: {
    cats: { All: "Tous", Concert: "Concerts", Festival: "Festivals", Comedy: "Humour", Theatre: "Théâtre", Family: "Famille" } as Record<string, string>,
    when: { all: "Toutes les dates", weekend: "Ce week-end", "30": "30 prochains jours", "90": "3 prochains mois" },
    whenLabel: "Quand", where: "Où", type: "Type d’événement",
    soon: "Les grands événements arrivent bientôt. Revenez nous voir.",
    none: "Aucun événement pour ces filtres. Essayez une autre date ou région.",
    next: "Prochainement", more: (n: number) => ` · +${n} dates`, tickets: "Billets", sold: "Billets vendus sur Ticketmaster",
  },
  en: {
    cats: { All: "All", Concert: "Concerts", Festival: "Festivals", Comedy: "Comedy", Theatre: "Theatre", Family: "Family" } as Record<string, string>,
    when: { all: "Any date", weekend: "This weekend", "30": "Next 30 days", "90": "Next 3 months" },
    whenLabel: "When", where: "Where", type: "Type of event",
    soon: "Big events are on their way. Check back soon.",
    none: "No events match these filters. Try another date or region.",
    next: "Next up", more: (n: number) => ` · +${n} more dates`, tickets: "Get tickets", sold: "Tickets sold on Ticketmaster",
  },
};

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
  const { lang } = useLang();
  const c = copy[lang];
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
        <div role="group" aria-label={c.type} className="flex flex-wrap gap-2">
          {CATEGORIES.map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={cat === k}
              onClick={() => setCat(k)}
              className={`min-h-11 rounded-full border-[1.5px] px-4 font-display text-sm font-bold ${cat === k ? "border-accent bg-accent text-white" : "border-ink text-ink hover:bg-sand"}`}
            >
              {c.cats[k]}
            </button>
          ))}
        </div>
        <span className="flex-1" />
        <label className="flex items-center gap-2 text-sm font-bold">{c.whenLabel}
          <select className="input w-auto py-2.5" value={when} onChange={(e) => setWhen(e.target.value)}>
            {WHEN.map((w) => <option key={w} value={w}>{c.when[w]}</option>)}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm font-bold">{c.where}
          <select className="input w-auto py-2.5" value={region} onChange={(e) => setRegion(e.target.value)}>
            {REGIONS.map((r) => <option key={r.key} value={r.key}>{r[lang]}</option>)}
          </select>
        </label>
      </div>

      {shown.length === 0 && (
        <p className="rounded-2xl border border-line bg-sand p-8 text-center text-slate">{events.length === 0 ? c.soon : c.none}</p>
      )}

      {featured && (
        <a href={featured.url} target="_blank" rel="noopener noreferrer sponsored" className="flex flex-wrap overflow-hidden rounded-2xl bg-ink text-white no-underline hover:text-white">
          {featured.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={featured.image} alt="" className="min-h-72 flex-[1_1_520px] bg-ink-soft object-cover" />
          ) : (
            <div className="min-h-72 flex-[1_1_520px] bg-ink-soft" />
          )}
          <div className="flex flex-[1_1_360px] flex-col justify-center gap-3 p-8">
            <span className="eyebrow text-accent-bright">{label(featured.category, lang)} · {c.next}</span>
            <span className="font-display text-[30px] font-extrabold leading-tight sm:text-[34px]">{featured.name}</span>
            <span className="text-on-dark">{[featured.venue, featured.city].filter(Boolean).join(", ")}</span>
            <span className="text-on-dark">{[featured.month ? `${featured.date} ${monthLabel(featured.month, lang).toLowerCase()}` : "", featured.time].filter(Boolean).join(" · ")}{featured.moreDates ? c.more(featured.moreDates) : ""}</span>
            {featured.price && <span className="text-on-dark">{featured.price}</span>}
            <span className="mt-2 w-fit rounded-full bg-accent px-5 py-3 font-display font-bold text-white">{c.tickets} ↗</span>
            <span className="text-xs text-on-dark">{c.sold}</span>
          </div>
        </a>
      )}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
        {rest.map((e) => <BigEventCard key={e.id} e={e} />)}
      </div>
    </>
  );
}
