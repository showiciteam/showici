"use client";

import { useState } from "react";

export function AdminActions({ labels }: { labels: string[] }) {
  const [done, setDone] = useState<string | null>(null);
  if (done) return <span className="text-sm font-bold text-success-ink">{done} ✓</span>;
  return (
    <div className="flex gap-2">
      {labels.map((l, i) => (
        <button key={l} type="button" onClick={() => setDone(l)} className={`min-h-9 rounded-lg px-3 text-[13px] font-bold ${i === labels.length - 1 ? "bg-navy text-white" : "border border-line-strong bg-white"}`}>{l}</button>
      ))}
    </div>
  );
}

export function LimitsSwitch() {
  const [on, setOn] = useState(false);
  return (
    <section className="card flex flex-wrap items-center gap-4 p-5">
      <span className="flex-[1_1_300px]"><strong>Plan limits</strong><br /><span className="hint text-sm">Daily contact cap (2/day) and paid filters. Off during the free launch. In Supabase this is the &ldquo;plan_limits_enabled&rdquo; setting.</span></span>
      <button type="button" role="switch" aria-checked={on} aria-label="Enable plan limits" onClick={() => setOn(!on)} className={`relative h-[30px] w-[52px] rounded-full ${on ? "bg-navy" : "bg-line-strong"}`}>
        <span className={`absolute top-[3px] h-6 w-6 rounded-full bg-white transition-all ${on ? "right-[3px]" : "left-[3px]"}`} />
      </button>
    </section>
  );
}
