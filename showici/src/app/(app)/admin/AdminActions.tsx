"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { setFreeDailyContacts, setPerformerVerified, setPlanLimits, setReportStatus, setRequestStatus, setShowStatus, setUserRole, setVenuePublished, unpublishPerformer, type Result } from "@/lib/actions";

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

/** A dropdown that saves as soon as it changes (role, show status, request status…). */
function SaveSelect<T extends string>({ value, options, save, label }: { value: T; options: { value: T; label: string }[]; save: (v: T) => Promise<Result>; label: string }) {
  const router = useRouter();
  const [current, setCurrent] = useState<T>(value);
  const [state, setState] = useState<"idle" | "saving" | "saved" | string>("idle");
  async function change(v: T) {
    const prev = current;
    setCurrent(v);
    setState("saving");
    const res = await save(v);
    if (!res.ok) {
      setCurrent(prev);
      return setState(res.error);
    }
    setState("saved");
    router.refresh();
  }
  return (
    <span className="flex items-center gap-2">
      <select aria-label={label} value={current} onChange={(e) => change(e.target.value as T)} className="input min-h-9 py-1 text-sm">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {state === "saving" && <span className="hint text-xs">Saving…</span>}
      {state === "saved" && <span className="text-xs font-bold text-success-ink">✓</span>}
      {!["idle", "saving", "saved"].includes(state) && <span className="text-xs text-red-700">{state}</span>}
    </span>
  );
}

const ROLES = [
  { value: "planner" as const, label: "Event planner" },
  { value: "performer" as const, label: "Performer" },
  { value: "venue" as const, label: "Venue" },
  { value: "admin" as const, label: "Admin" },
];
export function RoleSelect({ id, role }: { id: string; role: "venue" | "performer" | "planner" | "admin" }) {
  return <SaveSelect label="Role" value={role} options={ROLES} save={(v) => setUserRole(id, v)} />;
}

const SHOW_STATUSES = [
  { value: "live" as const, label: "Live" },
  { value: "draft" as const, label: "Draft (hidden)" },
  { value: "cancelled" as const, label: "Cancelled" },
];
export function ShowStatusSelect({ id, status }: { id: string; status: "draft" | "live" | "cancelled" }) {
  return <SaveSelect label="Show status" value={status} options={SHOW_STATUSES} save={(v) => setShowStatus(id, v)} />;
}

const REQUEST_STATUSES = [
  { value: "open" as const, label: "Open" },
  { value: "booked" as const, label: "Booked" },
  { value: "closed" as const, label: "Closed" },
];
export function RequestStatusSelect({ id, status }: { id: string; status: "open" | "booked" | "closed" }) {
  return <SaveSelect label="Request status" value={status} options={REQUEST_STATUSES} save={(v) => setRequestStatus(id, v)} />;
}

export function ReopenReport({ id }: { id: string }) {
  return <ActionButtons actions={[{ label: "Reopen", done: "Reopened", run: () => setReportStatus(id, "open") }]} />;
}

export function UnpublishVenue({ id }: { id: string }) {
  return <ActionButtons actions={[{ label: "Hide venue", done: "Hidden", run: () => setVenuePublished(id, false) }]} />;
}

export function ContactsCap({ initial }: { initial: number }) {
  const router = useRouter();
  const [n, setN] = useState(initial);
  const [msg, setMsg] = useState("");
  async function save() {
    setMsg("Saving…");
    const res = await setFreeDailyContacts(n);
    setMsg(res.ok ? "Saved ✓" : res.error);
    if (res.ok) router.refresh();
  }
  return (
    <section className="card flex flex-wrap items-center gap-4 p-5">
      <span className="flex-[1_1_300px]">
        <strong>New contacts per day on the free plan</strong>
        <br />
        <span className="hint text-sm">Only applies while plan limits are on. Replying in an existing conversation never counts.</span>
      </span>
      <input type="number" min={0} max={100} value={n} onChange={(e) => setN(Number(e.target.value))} className="input w-24" aria-label="Daily contacts" />
      <button type="button" onClick={save} className="min-h-10 rounded-lg bg-navy px-4 text-sm font-bold text-white">Save</button>
      {msg && <span className="text-sm">{msg}</span>}
    </section>
  );
}
