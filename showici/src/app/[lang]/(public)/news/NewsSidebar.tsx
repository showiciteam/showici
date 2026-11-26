"use client";

import { useTr } from "@/lib/i18n";
import { useState } from "react";
import { Notice } from "@/components/form";

export function NewsSidebar() {
  const tr = useTr();
  const [voted, setVoted] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  return (
    <>
      <form
        onSubmit={(e) => { e.preventDefault(); setVoted(true); }}
        className="flex flex-col gap-3 rounded-[18px] bg-ink p-6 text-white"
      >
        <span className="text-xs font-bold tracking-[0.1em] text-accent">{tr("COMING TO YOUR REGION")}</span>
        <span className="font-display text-2xl font-extrabold">{tr("Where in Québec should we focus next?")}</span>
        <span className="text-[15px] text-on-dark">{tr("Vote for your town and we’ll tell you when we start featuring shows there.")}</span>
        <label className="flex flex-col gap-1.5 text-sm font-bold">{tr("Your town")}<input required className="input" placeholder={tr("e.g. Rimouski, Gatineau")} /></label>
        <button type="submit" className="min-h-11 rounded-[10px] bg-accent font-bold text-white">{tr("Vote")}</button>
        {voted && <Notice kind="ok">{tr("Thanks! Your vote is counted.")}</Notice>}
      </form>
      <form onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }} className="card flex flex-col gap-2.5 p-[22px]">
        <strong>{tr("Get the newsletter")}</strong>
        <span className="text-[15px] text-slate">{tr("Shows near you, new interviews and platform news, once a week.")}</span>
        <input type="email" required aria-label={tr("Email")} placeholder={tr("you@example.com")} className="input" />
        <button type="submit" className="min-h-11 rounded-[10px] bg-ink font-bold text-white">{tr("Subscribe")}</button>
        {subscribed && <Notice kind="ok">{tr("You’re subscribed.")}</Notice>}
      </form>
    </>
  );
}
