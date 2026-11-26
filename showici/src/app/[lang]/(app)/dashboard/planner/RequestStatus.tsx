"use client";

import { useTr } from "@/lib/i18n";
import { useRouter } from "@/lib/navigation";
import { useState } from "react";
import { setRequestStatus } from "@/lib/actions";

/** Lets the planner mark their request booked, close it, or reopen it. */
export function RequestStatus({ id, status }: { id: string; status: "open" | "booked" | "closed" }) {
  const tr = useTr();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function set(next: "open" | "booked" | "closed") {
    setBusy(true);
    setError("");
    const res = await setRequestStatus(id, next);
    setBusy(false);
    if (!res.ok) return setError(res.error);
    router.refresh();
  }
  const btn = "min-h-9 rounded-lg px-3 text-[13px] font-bold disabled:opacity-50";
  return (
    <div className="flex flex-wrap items-center gap-2">
      {status === "open" ? (
        <>
          <button type="button" disabled={busy} onClick={() => set("booked")} className={`${btn} bg-ink text-white`}>{tr("I booked someone")}</button>
          <button type="button" disabled={busy} onClick={() => set("closed")} className={`${btn} border border-line-strong bg-white`}>{tr("Close request")}</button>
        </>
      ) : (
        <button type="button" disabled={busy} onClick={() => set("open")} className={`${btn} border border-line-strong bg-white`}>{tr("Reopen")}</button>
      )}
      {error && <span className="text-sm text-red-700">{error}</span>}
    </div>
  );
}
