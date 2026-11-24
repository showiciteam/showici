"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { claimVenue } from "@/lib/actions";
import { FollowCard } from "@/components/Social";
import { useLang } from "@/lib/i18n";

const ROLES: [string, string][] = [["Owner", "Propriétaire"], ["Manager", "Gérant·e"], ["Booker / programmer", "Programmateur·trice"], ["Staff member", "Membre du personnel"]];

export function ClaimForm({ venueId, venueName, userName, userEmail, siteDomain }: { venueId: string; venueName: string; userName: string; userEmail: string; siteDomain: string }) {
  const { lang, tr } = useLang();
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
        <p className="rounded-xl bg-success px-4 py-3 font-medium text-success-ink">{tr(`${venueName} is now yours on ShowIci.`, `${venueName} est maintenant à vous sur ShowIci.`)}</p>
        <p className="text-slate">{tr("Add photos and check your details, then post your first show.", "Ajoutez des photos et vérifiez vos informations, puis publiez votre premier spectacle.")}</p>
        <div className="flex flex-wrap gap-3">
          <Button href="/register/venue">{tr("Complete my venue page", "Compléter ma page de salle")}</Button>
          <Button href="/dashboard/venue" variant="secondary">{tr("Go to my dashboard", "Aller à mon tableau de bord")}</Button>
        </div>
        <FollowCard context="thanks" />
      </div>
    );
  }
  if (result === "pending") {
    return (
      <div className="card mt-8 flex flex-col gap-3 p-6">
        <p className="rounded-xl bg-success px-4 py-3 font-medium text-success-ink">{tr("Thanks! Your claim was sent.", "Merci! Votre demande a été envoyée.")}</p>
        <p className="text-slate">{tr(`We'll confirm with ${venueName} and email you at ${userEmail} as soon as it's approved, normally within 2 business days.`, `Nous allons confirmer avec ${venueName} et vous écrire à ${userEmail} dès que la demande est approuvée, normalement en moins de 2 jours ouvrables.`)}</p>
        <FollowCard context="thanks" />
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card mt-8 flex flex-col gap-4 p-6">
      <p className="text-[15px] text-slate">
        {tr("Signed in as", "Connecté en tant que")} <strong className="text-navy">{userEmail}</strong>.{" "}
        {matches ? tr("Your email matches the venue's website, so this will be confirmed right away.", "Votre courriel correspond au site Web de la salle : la demande sera confirmée immédiatement.") : siteDomain ? tr(`Tip: claims from an @${siteDomain} email are confirmed instantly.`, `Astuce : les demandes faites avec un courriel @${siteDomain} sont confirmées immédiatement.`) : null}
      </p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] items-start gap-3">
        <label className="label">{tr("Your name", "Votre nom")}<input name="name" required defaultValue={userName} className="input" autoComplete="name" /></label>
        <label className="label">{tr("Your role at the venue", "Votre rôle à la salle")}
          <select name="role" required defaultValue="" className="input">
            <option value="" disabled>—</option>
            {ROLES.map(([en, fr]) => <option key={en} value={en}>{lang === "fr" ? fr : en}</option>)}
          </select>
        </label>
        <label className="label">{tr("Phone where we can reach you", "Téléphone pour vous joindre")}<input name="phone" type="tel" required={!matches} className="input" autoComplete="tel" /><span className="hint">{tr("Only used to confirm your claim.", "Utilisé seulement pour confirmer votre demande.")}</span></label>
      </div>
      <label className="label">{tr("Anything that helps us confirm (optional)", "Tout ce qui peut nous aider à confirmer (facultatif)")}
        <textarea name="message" rows={3} maxLength={2000} className="input" placeholder={tr("e.g. best time to call the bar, or a link to a page that shows you work there", "p. ex. le meilleur moment pour appeler le bar, ou un lien qui montre que vous y travaillez")} />
      </label>
      <label className="flex items-start gap-2.5 text-[15px] text-ink-2">
        <input type="checkbox" required className="mt-1 h-[18px] w-[18px] accent-navy" />
        {tr(`I confirm I manage ${venueName} or am allowed to act for it.`, `Je confirme que je gère ${venueName} ou que je suis autorisé·e à agir en son nom.`)}
      </label>
      {error && <p role="alert" className="rounded-xl bg-[#FBE5E2] px-4 py-3 text-sm font-medium text-[#8A1F17]">{error}</p>}
      <Button type="submit" disabled={busy} className="self-start">{busy ? tr("Sending…", "Envoi…") : tr("Claim this venue", "Réclamer cette salle")}</Button>
    </form>
  );
}
