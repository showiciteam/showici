"use client";

import { useMemo, useState } from "react";
import { ShowCard } from "@/components/cards";
import { useLang } from "@/lib/i18n";
import type { Show, Venue } from "@/lib/types";

type When = "all" | "tonight" | "week" | "weekend";

const copy = {
  fr: { all: "Toutes les dates", tonight: "Ce soir", week: "Cette semaine", weekend: "Ce week-end", none: "Aucun spectacle pour ces dates. Essayez une autre période." },
  en: { all: "Any date", tonight: "Tonight", week: "This week", weekend: "This weekend", none: "No shows on these dates. Try another period." },
};

/** Start and end (exclusive) of each period, in the visitor's local time. */
function period(when: When): [Date, Date] | null {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const days = (n: number) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + n);
  if (when === "tonight") return [start, days(1)];
  if (when === "week") return [start, days(7)];
  if (when === "weekend") {
    const toFriday = (5 - start.getDay() + 7) % 7;
    const friday = start.getDay() === 6 || start.getDay() === 0 ? start : days(toFriday);
    const monday = new Date(friday.getFullYear(), friday.getMonth(), friday.getDate() + ((8 - friday.getDay()) % 7 || 7));
    return [friday, monday];
  }
  return null;
}

/** Local shows with working date chips. Shows without a start time stay visible under "any date" only. */
export function ShowsBrowser({ shows, venues }: { shows: Show[]; venues: Venue[] }) {
  const { lang } = useLang();
  const c = copy[lang];
  const [when, setWhen] = useState<When>("all");
  const venueById = useMemo(() => Object.fromEntries(venues.map((v) => [v.id, v])), [venues]);

  const shown = useMemo(() => {
    const span = period(when);
    if (!span) return shows;
    return shows.filter((s) => s.startsAt && new Date(s.startsAt) >= span[0] && new Date(s.startsAt) < span[1]);
  }, [shows, when]);

  return (
    <>
      <div role="group" aria-label={c.all} className="mb-6 flex flex-wrap gap-2.5">
        {(["all", "tonight", "week", "weekend"] as const).map((w) => (
          <button
            key={w}
            type="button"
            aria-pressed={when === w}
            onClick={() => setWhen(w)}
            className={`min-h-11 rounded-full border-[1.5px] px-5 font-display text-sm font-bold ${when === w ? "border-accent bg-accent text-white" : "border-ink text-ink hover:bg-sand"}`}
          >
            {c[w]}
          </button>
        ))}
      </div>
      {shown.length === 0 ? (
        <p className="rounded-2xl border border-line bg-sand p-8 text-center text-slate">{c.none}</p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4">
          {shown.map((s) => <ShowCard key={s.id} show={s} venue={venueById[s.venueId]} />)}
        </div>
      )}
    </>
  );
}
