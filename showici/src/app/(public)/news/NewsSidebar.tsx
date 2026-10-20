"use client";

import { useState } from "react";
import { Notice } from "@/components/form";

export function NewsSidebar() {
  const [voted, setVoted] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  return (
    <>
      <form
        onSubmit={(e) => { e.preventDefault(); setVoted(true); }}
        className="flex flex-col gap-3 rounded-[18px] bg-navy p-6 text-white"
      >
        <span className="text-xs font-bold tracking-[0.1em] text-brass">COMING TO YOUR REGION</span>
        <span className="font-display text-2xl font-extrabold">Where in Québec should we focus next?</span>
        <span className="text-[15px] text-on-navy">Vote for your town and we&apos;ll tell you when we start featuring shows there.</span>
        <label className="flex flex-col gap-1.5 text-sm font-bold">Your town<input required className="input" placeholder="e.g. Rimouski, Gatineau" /></label>
        <button type="submit" className="min-h-11 rounded-[10px] bg-brass font-bold text-navy">Vote</button>
        {voted && <Notice kind="ok">Thanks! Your vote is counted.</Notice>}
      </form>
      <form onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }} className="card flex flex-col gap-2.5 p-[22px]">
        <strong>Get the newsletter</strong>
        <span className="text-[15px] text-slate">Shows near you, new interviews and platform news, once a week.</span>
        <input type="email" required aria-label="Email" placeholder="you@example.com" className="input" />
        <button type="submit" className="min-h-11 rounded-[10px] bg-navy font-bold text-white">Subscribe</button>
        {subscribed && <Notice kind="ok">You&apos;re subscribed.</Notice>}
      </form>
    </>
  );
}
