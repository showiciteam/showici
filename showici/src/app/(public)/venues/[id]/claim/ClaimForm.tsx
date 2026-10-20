"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { claimVenue } from "@/lib/actions";

const ROLES = ["Owner", "Manager", "Booker / programmer", "Staff member"];

export function ClaimForm({ venueId, venueName, userName, userEmail, siteDomain }: { venueId: string; venueName: string; userName: string; userEmail: string; siteDomain: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<"approved" | "pending" | null>(null);
  const matches = siteDomain && userEmail.toLowerCase().endsWith(`@${siteDomain.toLowerCase()}`);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    setError("");
    const res = await claimVenue(venueId, String(f.get("name")), String(f.get("role")), String(f.get("phone") ?? ""), String(f.get("message") ?? ""));
    setBusy(false);
    if (!res.ok) return setError(res.error);
    setResult(res.status);
  }

  if (result === "approved") {
    return (
      <div className="card mt-8 flex flex-col gap-4 p-6">
        <p className="rounded-xl bg-success px-4 py-3 font-medium text-success-ink">{venueName} is now yours on ShowIci.</p>
        <p className="text-slate">Add photos and check your details, then post your first show.</p>
        <div className="flex flex-wrap gap-3">
          <Button href="/register/venue">Complete my venue page</Button>
          <Button href="/dashboard/venue" variant="secondary">Go to my dashboard</Button>
        </div>
      </div>
    );
  }
  if (result === "pending") {
    return (
      <div className="card mt-8 flex flex-col gap-3 p-6">
        <p className="rounded-xl bg-success px-4 py-3 font-medium text-success-ink">Thanks! Your claim was sent.</p>
        <p className="text-slate">We&apos;ll confirm with {venueName} and email you at {userEmail} as soon as it&apos;s approved, normally within 2 business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card mt-8 flex flex-col gap-4 p-6">
      <p className="text-[15px] text-slate">
        Signed in as <strong className="text-navy">{userEmail}</strong>.{" "}
        {matches ? "Your email matches the venue's website, so this will be confirmed right away." : siteDomain ? `Tip: claims from an @${siteDomain} email are confirmed instantly.` : null}
      </p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] items-start gap-3">
        <label className="label">Your name<input name="name" required defaultValue={userName} className="input" autoComplete="name" /></label>
        <label className="label">Your role at the venue
          <select name="role" required defaultValue="" className="input">
            <option value="" disabled>—</option>
            {ROLES.map((r) => <option key={r}>{r}</option>)}
          </select>
        </label>
        <label className="label">Phone where we can reach you<input name="phone" type="tel" required={!matches} className="input" autoComplete="tel" /><span className="hint">Only used to confirm your claim.</span></label>
      </div>
      <label className="label">Anything that helps us confirm (optional)
        <textarea name="message" rows={3} maxLength={2000} className="input" placeholder="e.g. best time to call the bar, or a link to a page that shows you work there" />
      </label>
      <label className="flex items-start gap-2.5 text-[15px] text-ink-2">
        <input type="checkbox" required className="mt-1 h-[18px] w-[18px] accent-navy" />
        I confirm I manage {venueName} or am allowed to act for it.
      </label>
      {error && <p role="alert" className="rounded-xl bg-[#FBE5E2] px-4 py-3 text-sm font-medium text-[#8A1F17]">{error}</p>}
      <Button type="submit" disabled={busy} className="self-start">{busy ? "Sending…" : "Claim this venue"}</Button>
    </form>
  );
}
