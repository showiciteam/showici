"use client";

import { useRouter } from "@/lib/navigation";
import { useEffect, useState } from "react";
import Link from "@/components/Link";
import { useLang } from "@/lib/i18n";
import { Notice } from "@/components/form";
import { resetPassword, signIn } from "@/lib/actions";

const copy = {
  fr: {
    expired: "Ce lien a expiré ou a déjà été utilisé. Connectez-vous, ou demandez un nouveau lien.",
    welcome: "Bon retour", email: "Courriel", emailHint: "vous@exemple.com", password: "Mot de passe", keep: "Rester connecté",
    forgot: "Mot de passe oublié?", login: "Se connecter", loggingIn: "Connexion…", newHere: "Nouveau sur ShowIci?", create: "Créer un compte",
    resetTitle: "Réinitialiser le mot de passe", resetText: "Entrez votre courriel et nous vous enverrons un lien pour choisir un nouveau mot de passe.",
    send: "Envoyer le lien", sent: "Vérifiez votre boîte de réception : si un compte existe pour ce courriel, un lien est en route.",
  },
  en: {
    expired: "That link has expired or was already used. Log in, or ask for a new link.",
    welcome: "Welcome back", email: "Email", emailHint: "you@example.com", password: "Password", keep: "Keep me logged in",
    forgot: "Forgot password?", login: "Log in", loggingIn: "Logging in…", newHere: "New to ShowIci?", create: "Create an account",
    resetTitle: "Reset your password", resetText: "Enter your email and we’ll send you a link to choose a new password.",
    send: "Send reset link", sent: "Check your inbox: if an account exists for this email, a reset link is on its way.",
  },
};

const home: Record<string, string> = { venue: "/dashboard/venue", performer: "/dashboard/performer", planner: "/dashboard/planner", admin: "/admin" };

export default function LoginPage() {
  const router = useRouter();
  const { lang } = useLang();
  const c = copy[lang];
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (q.get("error") === "link") {
      setError(copy[lang].expired);
      setShowReset(true);
    }
    if (window.location.hash === "#reset") setShowReset(true);
  }, [lang]);

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    const res = await signIn(String(f.get("email")), String(f.get("password")));
    setBusy(false);
    if (!res.ok) return setError(res.error);
    // Go back to the page that asked for a login, if any (only same-site paths).
    const next = new URLSearchParams(window.location.search).get("next");
    const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : null;
    router.push(safeNext ?? home[res.role ?? "performer"] ?? "/");
    router.refresh();
  }

  async function reset(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await resetPassword(String(new FormData(e.currentTarget).get("email")));
    setResetSent(true);
  }

  return (
    <div className="flex flex-col items-center gap-7 bg-sand px-4 pb-20 pt-14">
      <div className="flex w-full flex-wrap justify-center gap-6">
        <form onSubmit={login} className="card flex max-w-[460px] flex-[1_1_340px] flex-col gap-[18px] px-[30px] py-[34px]">
          <h1 className="h-display text-[30px]">{c.welcome}</h1>
          <label className="label">{c.email}<input name="email" type="email" required className="input" placeholder={c.emailHint} autoComplete="email" /></label>
          <label className="label">{c.password}<input name="password" type="password" required className="input" autoComplete="current-password" /></label>
          <div className="flex flex-wrap items-center justify-between gap-2.5 text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="h-[18px] w-[18px] accent-accent" />{c.keep}</label>
            <button type="button" onClick={() => setShowReset((v) => !v)} className="font-bold text-accent-dark underline">{c.forgot}</button>
          </div>
          {error && <Notice kind="error">{error}</Notice>}
          <button type="submit" disabled={busy} className="min-h-[50px] rounded-full bg-accent font-display text-base font-bold text-white hover:bg-accent-dark">{busy ? c.loggingIn : c.login}</button>
          <p className="text-center text-muted">{c.newHere} <Link href="/signup" className="font-bold">{c.create}</Link></p>
        </form>
        {showReset && (
        <form id="reset" onSubmit={reset} className="card flex max-w-[460px] flex-[1_1_340px] flex-col gap-[18px] self-start px-[30px] py-[34px]">
          <h2 className="h-display text-[30px]">{c.resetTitle}</h2>
          <p className="text-slate">{c.resetText}</p>
          <label className="label">{c.email}<input name="email" type="email" required className="input" placeholder={c.emailHint} /></label>
          <button type="submit" className="min-h-[50px] rounded-full bg-ink font-display text-base font-bold text-white">{c.send}</button>
          {resetSent && <Notice kind="ok">{c.sent}</Notice>}
        </form>
        )}
      </div>
    </div>
  );
}
