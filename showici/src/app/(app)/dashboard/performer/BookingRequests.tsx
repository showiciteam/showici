"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Notice } from "@/components/form";
import { Button, DateBadge } from "@/components/ui";
import { respondBooking } from "@/lib/actions";
import type { BookingRequest } from "@/lib/dashboard";

/** Shows venues added this act to. Nothing goes public with the act's name until they accept. */
export function BookingRequests({ requests }: { requests: BookingRequest[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [answered, setAnswered] = useState<Partial<Record<string, "accepted" | "declined">>>({});
  if (!requests.length) return null;

  async function answer(id: string, accept: boolean) {
    setBusy(id);
    setError("");
    const res = await respondBooking(id, accept);
    setBusy(null);
    if (!res.ok) return setError(res.error);
    setAnswered((a) => ({ ...a, [id]: accept ? "accepted" : "declined" }));
    router.refresh();
  }

  const pending = requests.filter((r) => (answered[r.id] ?? r.status) === "pending").length;
  return (
    <section id="bookings" className={`card flex flex-col gap-3.5 p-[22px] ${pending ? "border-2 border-brass" : ""}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="h-display text-[22px]">Booking requests{pending ? ` (${pending})` : ""}</h2>
        <span className="hint text-sm">Your name only appears on a show after you accept. Until then it&apos;s listed as &ldquo;Artist TBA&rdquo;.</span>
      </div>
      {error && <Notice kind="error">{error}</Notice>}
      {requests.map((r) => {
        const status = answered[r.id] ?? r.status;
        return (
          <div key={r.id} className="flex flex-wrap items-center gap-3.5 border-t border-line pt-3.5">
            <DateBadge day={r.day} date={r.date} />
            <span className="flex flex-[1_1_220px] flex-col gap-0.5">
              <strong><Link href={`/venues/${r.venueId}`} className="text-navy">{r.venueName}</Link>{r.title ? ` · ${r.title}` : ""}</strong>
              <span className="text-sm text-muted">{[r.area, r.time, r.showStatus === "draft" ? "not published yet" : ""].filter(Boolean).join(" · ")}</span>
            </span>
            {status === "pending" ? (
              <span className="flex gap-2">
                <Button variant="secondary" disabled={busy === r.id} onClick={() => answer(r.id, false)} className="text-sm">Decline</Button>
                <Button disabled={busy === r.id} onClick={() => answer(r.id, true)} className="text-sm">{busy === r.id ? "Saving…" : "Accept"}</Button>
              </span>
            ) : (
              <span className={`rounded-full px-2.5 py-0.5 text-[13px] font-bold ${status === "accepted" ? "bg-success text-success-ink" : "bg-line text-muted"}`}>{status === "accepted" ? "Accepted" : "Declined"}</span>
            )}
          </div>
        );
      })}
    </section>
  );
}
