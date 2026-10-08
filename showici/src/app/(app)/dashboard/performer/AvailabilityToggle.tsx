"use client";

import { useState } from "react";
import { setBlockedDates, setPerformerAvailable } from "@/lib/actions";

/** Availability switch and blocked dates. Saves to Supabase when a performer profile exists; in demo mode it only changes locally. */
export function AvailabilityToggle({ performerId, initial = true, blocked = [] }: { performerId?: string; initial?: boolean; blocked?: string[] }) {
  const [on, setOn] = useState(initial);
  const [dates, setDates] = useState<string[]>(blocked);
  const [newDate, setNewDate] = useState("");
  const [error, setError] = useState("");

  async function toggle() {
    const next = !on;
    setOn(next);
    setError("");
    if (!performerId) return;
    const res = await setPerformerAvailable(performerId, next);
    if (!res.ok) {
      setOn(!next);
      setError(res.error);
    }
  }

  async function saveDates(next: string[]) {
    const prev = dates;
    setDates(next);
    setError("");
    if (!performerId) return;
    const res = await setBlockedDates(performerId, next);
    if (!res.ok) {
      setDates(prev);
      setError(res.error);
    }
  }

  const label = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString("en-CA", { weekday: "short", month: "short", day: "numeric" });

  return (
    <section className="card flex flex-col gap-3.5 p-[22px]">
      <div className="flex items-center justify-between gap-3">
        <span className="flex flex-col gap-0.5"><strong>Available for gigs</strong><span className="hint">{on ? "Shown in searches" : "Hidden from searches"}</span></span>
        <button type="button" role="switch" aria-checked={on} aria-label="Available for gigs" onClick={toggle} className={`relative h-[30px] w-[52px] flex-none rounded-full ${on ? "bg-navy" : "bg-line-strong"}`}>
          <span className={`absolute top-[3px] h-6 w-6 rounded-full bg-white transition-all ${on ? "right-[3px]" : "left-[3px]"}`} />
        </button>
      </div>
      <div className="flex flex-col gap-2 border-t border-line pt-3.5">
        <strong className="text-[15px]">Blocked dates</strong>
        <span className="hint text-sm">Days you can&apos;t play. Bookers see you&apos;re unavailable on those dates.</span>
        <div className="flex gap-2">
          <input type="date" value={newDate} min={new Date().toISOString().slice(0, 10)} onChange={(e) => setNewDate(e.target.value)} className="input min-h-10 flex-1 py-1.5" aria-label="Date to block" />
          <button type="button" disabled={!newDate || dates.includes(newDate)} onClick={() => { saveDates([...dates, newDate].sort()); setNewDate(""); }} className="min-h-10 rounded-[10px] border border-line-strong bg-white px-3.5 text-sm font-bold disabled:opacity-50">Block</button>
        </div>
        {dates.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {dates.map((d) => (
              <span key={d} className="inline-flex items-center gap-1.5 rounded-full bg-parchment px-3 py-1 text-sm">
                {label(d)}
                <button type="button" aria-label={`Unblock ${label(d)}`} onClick={() => saveDates(dates.filter((x) => x !== d))} className="font-bold text-muted">✕</button>
              </span>
            ))}
          </div>
        )}
      </div>
      {error && <span className="text-sm text-red-700">{error}</span>}
    </section>
  );
}
