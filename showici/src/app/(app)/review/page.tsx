"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChipGroup, Notice } from "@/components/form";
import { submitReview } from "@/lib/actions";
import { getBrowserSupabase, supabaseEnabled } from "@/lib/supabase/client";

type Other = { id: string; name: string; role: string };

export default function ReviewPage() {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [other, setOther] = useState<Other | null>(supabaseEnabled ? null : { id: "", name: "[Band name]", role: "performer" });
  const [loadError, setLoadError] = useState("");
  const [rating, setRating] = useState(5);
  const [tags, setTags] = useState(["On time", "Great crowd energy"]);
  const [done, setDone] = useState<{ kind: "ok" | "error"; msg: string } | null>(null);
  const [busy, setBusy] = useState(false);

  // The review is tied to a ShowIci conversation: /review?c=<conversation id> (the "Leave a review" button in Messages).
  useEffect(() => {
    if (!supabaseEnabled) return;
    const c = new URLSearchParams(window.location.search).get("c");
    if (!c) return setLoadError("Open the conversation in Messages and use “Leave a review after the gig”.");
    setConversationId(c);
    (async () => {
      const sb = getBrowserSupabase();
      if (!sb) return;
      const uid = (await sb.auth.getUser()).data.user?.id;
      const { data } = await sb.from("conversation_members").select("profile_id, profiles(display_name, role)").eq("conversation_id", c).neq("profile_id", uid ?? "");
      const row = data?.[0];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const prof: any = Array.isArray(row?.profiles) ? row?.profiles[0] : row?.profiles;
      if (!row) return setLoadError("We couldn't find that conversation.");
      setOther({ id: row.profile_id, name: prof?.display_name || "this member", role: prof?.role ?? "" });
    })();
  }, []);

  const tagOptions =
    other?.role === "venue"
      ? ["Paid on time", "Good sound setup", "Great crowd", "Clear communication", "Fair treatment", "Would play again"]
      : ["On time", "Great crowd energy", "Professional", "Good sound", "Easy to work with", "Played requests"];

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (supabaseEnabled && (!conversationId || !other)) return;
    setBusy(true);
    const res = await submitReview({
      conversation_id: conversationId ?? "",
      subject_id: other?.id ?? "",
      rating,
      tags,
      body: String(f.get("body") ?? ""),
      would_rebook: f.get("again") === "yes",
    });
    setBusy(false);
    setDone(res.ok ? { kind: "ok", msg: res.demo ? "Demo mode: review looks good. Connect Supabase to save it." : "Thanks! Your review now appears on their profile." } : { kind: "error", msg: res.error });
  }

  if (loadError) {
    return (
      <div className="flex min-h-screen items-start justify-center bg-parchment px-4 py-12">
        <div className="card flex w-full max-w-[600px] flex-col gap-4 px-8 py-9">
          <h1 className="h-display text-[28px]">Leave a review</h1>
          <Notice kind="info">{loadError}</Notice>
          <Link href="/messages" className="font-bold">Go to Messages →</Link>
        </div>
      </div>
    );
  }
  if (!other) return <div className="flex min-h-screen justify-center bg-parchment py-16 text-slate">Loading…</div>;

  return (
    <div className="flex min-h-screen items-start justify-center bg-parchment px-4 py-12">
      <form onSubmit={submit} className="card flex w-full max-w-[600px] flex-col gap-[22px] px-8 py-9">
        <Link href={conversationId ? `/messages?c=${conversationId}` : "/messages"} className="text-sm font-bold no-underline">← Back to the conversation</Link>
        <div className="flex items-center gap-3.5">
          <span className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-ph-2 font-extrabold">{other.name.replace(/[\[\]]/g, "")[0]?.toUpperCase()}</span>
          <span className="h-display text-[26px]">How was {other.name}?</span>
        </div>
        <fieldset>
          <legend className="mb-2.5 text-sm font-bold">Overall rating</legend>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" aria-label={`${n} star${n > 1 ? "s" : ""}`} aria-pressed={n <= rating} onClick={() => setRating(n)} className={`h-[52px] w-[52px] rounded-xl border border-line text-3xl ${n <= rating ? "text-brass-dark" : "text-line-strong"}`}>★</button>
            ))}
          </div>
        </fieldset>
        <ChipGroup legend="What stood out?" options={tagOptions} value={tags} onChange={setTags} />
        <label className="label">Your review <span className="hint">Shown publicly on their profile</span><textarea name="body" rows={4} className="input" placeholder="Write what others should know." /></label>
        <fieldset>
          <legend className="mb-2.5 text-sm font-bold">Would you work with them again?</legend>
          <div className="flex gap-[18px]">
            <label className="flex items-center gap-2"><input type="radio" name="again" value="yes" defaultChecked className="h-[18px] w-[18px] accent-navy" />Yes</label>
            <label className="flex items-center gap-2"><input type="radio" name="again" value="no" className="h-[18px] w-[18px] accent-navy" />No</label>
          </div>
        </fieldset>
        <p className="hint">Reviews are only possible between people who talked on ShowIci, and you can review each conversation once.</p>
        {done && <Notice kind={done.kind}>{done.msg}</Notice>}
        {done?.kind !== "ok" && <button type="submit" disabled={busy} className="min-h-12 rounded-[10px] bg-navy text-base font-bold text-white hover:bg-navy-deep disabled:opacity-60">{busy ? "Posting…" : "Post review"}</button>}
      </form>
    </div>
  );
}
