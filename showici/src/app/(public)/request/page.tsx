"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChipGroup, Notice } from "@/components/form";
import { Button } from "@/components/ui";
import { insertRow } from "@/lib/actions";
import { getBrowserSupabase, supabaseEnabled } from "@/lib/supabase/client";

export default function EventRequestPage() {
  const router = useRouter();
  const [type, setType] = useState(["Quinceañera"]);
  const [wants, setWants] = useState(["Band", "DJ"]);
  const [status, setStatus] = useState<{ kind: "ok" | "error"; msg: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [signedIn, setSignedIn] = useState<boolean | null>(supabaseEnabled ? null : true);

  useEffect(() => {
    const sb = getBrowserSupabase();
    if (!sb) return;
    sb.auth.getUser().then(({ data }) => setSignedIn(Boolean(data.user)));
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    const res = await insertRow("event_requests", {
      event_type: type[0],
      event_date: f.get("date"),
      start_time: f.get("time"),
      length: f.get("length"),
      city: f.get("city"),
      guests: f.get("guests"),
      setting: f.get("setting"),
      wants,
      style: f.get("style"),
      language: f.get("language"),
      budget: f.get("budget"),
      note: f.get("note"),
    });
    setBusy(false);
    if (!res.ok) return setStatus({ kind: "error", msg: res.error });
    if (res.demo) return setStatus({ kind: "ok", msg: "Demo mode: your request looks good. Connect Supabase to save it for real." });
    router.push("/dashboard/planner");
    router.refresh();
  }

  return (
    <div className="bg-parchment">
      <div className="wrap pb-[72px] pt-9">
        <p className="eyebrow mb-1.5 text-[13px]">Private event</p>
        <h1 className="h-display text-[44px]">Find entertainment for your event</h1>
        <p className="mb-8 mt-2.5 max-w-[720px] text-lg text-slate">Describe your event once. Performers in your area who play this kind of event can see it and message you.</p>

        {signedIn === false && (
          <div className="mb-6 max-w-[720px]">
            <Notice kind="info">
              You need a free account to post a request, so performers can reply to you privately.{" "}
              <Link href="/signup" className="font-bold">Create an account</Link> or <Link href="/login?next=%2Frequest" className="font-bold">log in</Link>.
            </Notice>
          </div>
        )}

        <div className="flex flex-wrap items-start gap-7">
          <form onSubmit={submit} className="card flex min-w-0 flex-[999_1_600px] flex-col gap-[22px] p-7">
            <ChipGroup legend="Type of event" single options={["Quinceañera", "Birthday", "Wedding", "House party", "Anniversary", "Corporate", "Kids' party", "Other"]} value={type} onChange={setType} />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3.5">
              <label className="label">Date<input name="date" type="date" required min={new Date().toISOString().slice(0, 10)} className="input" /></label>
              <label className="label">Start time<input name="time" type="time" defaultValue="19:00" className="input" /></label>
              <label className="label">Performance length<select name="length" className="input" defaultValue="2 hours"><option>1 hour</option><option>2 hours</option><option>3 hours</option><option>4 hours +</option></select></label>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3.5">
              <label className="label">City or postal code <span className="hint">Your exact address stays private.</span><input name="city" required className="input" placeholder="e.g. Laval" /></label>
              <label className="label">Number of guests<select name="guests" className="input" defaultValue="75 – 150"><option>Under 25</option><option>25 – 75</option><option>75 – 150</option><option>150+</option></select></label>
              <label className="label">Setting<select name="setting" className="input"><option>Home</option><option>Rented hall</option><option>Restaurant</option><option>Outdoor</option></select></label>
            </div>
            <ChipGroup legend="What are you looking for?" hint="Choose one or more" options={["Band", "DJ", "Mariachi", "Solo singer", "Magician", "Comedian", "Dancers"]} value={wants} onChange={setWants} />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3.5">
              <label className="label">Music style<input name="style" className="input" placeholder="e.g. Latin, pop" /></label>
              <label className="label">Language<select name="language" className="input"><option>Any</option><option>Français</option><option>English</option><option>Español</option></select></label>
              <label className="label">Budget <span className="hint">Helps performers reply with fitting offers</span><select name="budget" className="input" defaultValue="$600 – $1,000"><option>Under $300</option><option>$300 – $600</option><option>$600 – $1,000</option><option>$1,000 – $2,000</option><option>$2,000+</option></select></label>
            </div>
            <label className="label">Tell performers more<textarea name="note" rows={4} className="input" placeholder="e.g. Live band for the first hour, then a DJ for dancing. Sound system needed." /></label>
            <div className="flex items-start gap-2.5 rounded-xl bg-brass-tint px-4 py-3.5 text-sm text-ink-2">
              <span aria-hidden="true">🔒</span>
              <span>Your request is private. It&apos;s never shown on public listings, only to signed-in performers who match it. Payment is agreed directly between you and the performer.</span>
            </div>
            {status && <Notice kind={status.kind}>{status.msg}</Notice>}
            <div className="flex flex-wrap justify-end gap-2.5">
              <Button type="submit" disabled={busy || signedIn === false} className="px-7">{busy ? "Posting…" : "Post my request"}</Button>
            </div>
          </form>

          <aside className="flex max-w-[360px] flex-[1_1_280px] flex-col gap-4">
            <div className="card flex flex-col gap-4 p-[22px]">
              <h2 className="h-display text-xl">What happens next</h2>
              {["Performers within reach who play this kind of event get your request.", "Interested ones message you with videos and a price.", "You compare, chat and book the one you like."].map((t, i) => (
                <div key={t} className="flex gap-3"><span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-brass-tint font-extrabold text-navy-deep">{i + 1}</span><span className="text-ink-2">{t}</span></div>
              ))}
            </div>
            <div className="card flex flex-col gap-2.5 p-[22px]">
              <strong>Prefer to browse?</strong>
              <span className="text-[15px] text-slate">You can also search performers yourself and message them directly.</span>
              <Button href="/performers" variant="secondary">Browse performers</Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
