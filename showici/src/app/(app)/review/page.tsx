"use client";

import { useState } from "react";
import { ChipGroup, Notice } from "@/components/form";
import { insertRow } from "@/lib/actions";

export default function ReviewPage() {
  const [rating, setRating] = useState(5);
  const [tags, setTags] = useState(["On time", "Great crowd energy"]);
  const [done, setDone] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen items-start justify-center bg-parchment px-4 py-12">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget);
          const res = await insertRow("reviews", { rating, tags, body: f.get("body"), would_rebook: f.get("again") === "yes" });
          setDone(res.ok ? (res.demo ? "Demo mode: review looks good. Connect Supabase to save it." : "Thanks! Your review will appear once both sides have reviewed.") : res.error);
        }}
        className="card flex w-full max-w-[600px] flex-col gap-[22px] px-8 py-9"
      >
        <div className="flex items-center gap-3.5">
          <span className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-ph-2 font-extrabold">B</span>
          <span><span className="text-[13px] font-bold text-muted">FRI, OCT 23 · [YOUR PUB]</span><br /><span className="h-display text-[26px]">How was [Band name]?</span></span>
        </div>
        <fieldset>
          <legend className="mb-2.5 text-sm font-bold">Overall rating</legend>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" aria-label={`${n} star${n > 1 ? "s" : ""}`} aria-pressed={n <= rating} onClick={() => setRating(n)} className={`h-[52px] w-[52px] rounded-xl border border-line text-3xl ${n <= rating ? "text-brass-dark" : "text-line-strong"}`}>★</button>
            ))}
          </div>
        </fieldset>
        <ChipGroup legend="What stood out?" options={["On time", "Great crowd energy", "Professional", "Good sound", "Easy to work with", "Played requests"]} value={tags} onChange={setTags} />
        <label className="label">Your review <span className="hint">Shown publicly on their profile</span><textarea name="body" rows={4} className="input" placeholder="Write what other venues and families should know." /></label>
        <fieldset>
          <legend className="mb-2.5 text-sm font-bold">Would you book them again?</legend>
          <div className="flex gap-[18px]">
            <label className="flex items-center gap-2"><input type="radio" name="again" value="yes" defaultChecked className="h-[18px] w-[18px] accent-navy" />Yes</label>
            <label className="flex items-center gap-2"><input type="radio" name="again" value="no" className="h-[18px] w-[18px] accent-navy" />No</label>
          </div>
        </fieldset>
        <p className="hint">Reviews are only possible after a conversation on ShowIci. [Band name] will review you too, and both reviews appear at the same time.</p>
        {done && <Notice kind="ok">{done}</Notice>}
        <button type="submit" className="min-h-12 rounded-[10px] bg-navy text-base font-bold text-white hover:bg-navy-deep">Post review</button>
      </form>
    </div>
  );
}
