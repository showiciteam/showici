"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { setPerformerVerified, setPlanLimits, setReportStatus, unpublishPerformer, type Result } from "@/lib/actions";

type Action = { label: string; done: string; run: () => Promise<Result> };

function ActionButtons({ actions }: { actions: Action[] }) {
  const router = useRouter();
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function run(a: Action) {
    setBusy(true);
    setError("");
    const res = await a.run();
    setBusy(false);
    if (!res.ok) return setError(res.error);
    setDone(a.done);
    router.refresh();
  }

  if (done) return <span className="text-sm font-bold text-success-ink">{done} ✓</span>;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {actions.map((a, i) => (
        <button key={a.label} type="button" disabled={busy} onClick={() => run(a)} className={`min-h-9 rounded-lg px-3 text-[13px] font-bold disabled:opacity-50 ${i === actions.length - 1 ? "bg-navy text-white" : "border border-line-strong bg-white"}`}>{a.label}</button>
      ))}
      {error && <span className="text-sm text-red-700">{error}</span>}
    </div>
  );
}

export function ReportActions({ id }: { id: string }) {
  return (
    <ActionButtons
      actions={[
        { label: "Dismiss", done: "Dismissed", run: () => setReportStatus(id, "dismissed") },
        { label: "Mark resolved", done: "Resolved", run: () => setReportStatus(id, "resolved") },
      ]}
    />
  );
}

export function VerifyActions({ id }: { id: string }) {
  return (
    <ActionButtons
      actions={[
        { label: "Reject", done: "Unpublished", run: () => unpublishPerformer(id) },
        { label: "Verify", done: "Verified", run: () => setPerformerVerified(id, true) },
      ]}
    />
  );
}

export function LimitsSwitch({ initial = false }: { initial?: boolean }) {
  const [on, setOn] = useState(initial);
  const [error, setError] = useState("");

  async function toggle() {
    const next = !on;
    setOn(next);
    setError("");
    const res = await setPlanLimits(next);
    if (!res.ok) {
      setOn(!next);
      setError(res.error);
    }
  }

  return (
    <section className="card flex flex-wrap items-center gap-4 p-5">
      <span className="flex-[1_1_300px]">
        <strong>Plan limits</strong>
        <br />
        <span className="hint text-sm">Daily contact cap (2/day) and paid filters. Off during the free launch. In Supabase this is the &ldquo;plan_limits_enabled&rdquo; setting.</span>
        {error && <><br /><span className="text-sm text-red-700">{error}</span></>}
      </span>
      <button type="button" role="switch" aria-checked={on} aria-label="Enable plan limits" onClick={toggle} className={`relative h-[30px] w-[52px] rounded-full ${on ? "bg-navy" : "bg-line-strong"}`}>
        <span className={`absolute top-[3px] h-6 w-6 rounded-full bg-white transition-all ${on ? "right-[3px]" : "left-[3px]"}`} />
      </button>
    </section>
  );
}
