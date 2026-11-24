"use client";

import { useState } from "react";
import { Notice } from "@/components/form";
import { useLang } from "@/lib/i18n";

export function NewsSidebar() {
  const { tr } = useLang();
  const [voted, setVoted] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  return (
    <>
      <form
        onSubmit={(e) => { e.preventDefault(); setVoted(true); }}
        className="flex flex-col gap-3 rounded-[18px] bg-navy p-6 text-white"
      >
        <span className="text-xs font-bold tracking-[0.1em] text-brass">{tr("COMING TO YOUR REGION", "BIENTÔT DANS VOTRE RÉGION")}</span>
        <span className="font-display text-2xl font-extrabold">{tr("Where in Québec should we focus next?", "Sur quelle région du Québec devrions-nous miser ensuite?")}</span>
        <span className="text-[15px] text-on-navy">{tr("Vote for your town and we'll tell you when we start featuring shows there.", "Votez pour votre ville et nous vous avertirons quand nous commencerons à y présenter des spectacles.")}</span>
        <label className="flex flex-col gap-1.5 text-sm font-bold">{tr("Your town", "Votre ville")}<input required className="input" placeholder={tr("e.g. Rimouski, Gatineau", "p. ex. Rimouski, Gatineau")} /></label>
        <button type="submit" className="min-h-11 rounded-[10px] bg-brass font-bold text-navy">{tr("Vote", "Voter")}</button>
        {voted && <Notice kind="ok">{tr("Thanks! Your vote is counted.", "Merci! Votre vote est compté.")}</Notice>}
      </form>
      <form onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }} className="card flex flex-col gap-2.5 p-[22px]">
        <strong>{tr("Get the newsletter", "Recevoir l'infolettre")}</strong>
        <span className="text-[15px] text-slate">{tr("Shows near you, new interviews and platform news, once a week.", "Spectacles près de chez vous, nouvelles entrevues et nouveautés, une fois par semaine.")}</span>
        <input type="email" required aria-label={tr("Email", "Courriel")} placeholder={tr("you@example.com", "vous@exemple.com")} className="input" />
        <button type="submit" className="min-h-11 rounded-[10px] bg-navy font-bold text-white">{tr("Subscribe", "S'abonner")}</button>
        {subscribed && <Notice kind="ok">{tr("You're subscribed.", "Vous êtes abonné.")}</Notice>}
      </form>
    </>
  );
}
