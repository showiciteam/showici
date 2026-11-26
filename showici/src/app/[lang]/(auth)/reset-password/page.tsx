"use client";

import { useState } from "react";
import { useRouter } from "@/lib/navigation";
import Link from "@/components/Link";
import { useLang } from "@/lib/i18n";
import { Notice } from "@/components/form";
import { updatePassword } from "@/lib/actions";

const copy = {
  fr: {
    short: "Utilisez au moins 8 caractères.", mismatch: "Les deux mots de passe ne correspondent pas.", expired: "Ce lien a expiré. Demandez-en un nouveau depuis la page de connexion.",
    title: "Choisissez un nouveau mot de passe", password: "Nouveau mot de passe", confirm: "Confirmez le mot de passe",
    done: "Mot de passe mis à jour. Retour à ShowIci…", saving: "Enregistrement…", save: "Enregistrer", back: "Retour à la connexion",
  },
  en: {
    short: "Use at least 8 characters.", mismatch: "The two passwords don’t match.", expired: "This reset link has expired. Ask for a new one from the login page.",
    title: "Choose a new password", password: "New password", confirm: "Confirm new password",
    done: "Password updated. Taking you to ShowIci…", saving: "Saving…", save: "Save new password", back: "Back to log in",
  },
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const { lang } = useLang();
  const c = copy[lang];
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const pw = String(f.get("password"));
    if (pw.length < 8) return setError(c.short);
    if (pw !== String(f.get("confirm"))) return setError(c.mismatch);
    setBusy(true);
    const res = await updatePassword(pw);
    setBusy(false);
    if (!res.ok) return setError(/session/i.test(res.error) ? c.expired : res.error);
    setError("");
    setDone(true);
    setTimeout(() => {
      router.push("/");
      router.refresh();
    }, 1500);
  }

  return (
    <div className="flex flex-col items-center gap-7 bg-sand px-4 pb-20 pt-14">
      <form onSubmit={save} className="card flex w-full max-w-[460px] flex-col gap-[18px] px-[30px] py-[34px]">
        <h1 className="h-display text-[30px]">{c.title}</h1>
        <label className="label">{c.password}<input name="password" type="password" required minLength={8} className="input" autoComplete="new-password" /></label>
        <label className="label">{c.confirm}<input name="confirm" type="password" required minLength={8} className="input" autoComplete="new-password" /></label>
        {error && <Notice kind="error">{error}</Notice>}
        {done && <Notice kind="ok">{c.done}</Notice>}
        <button type="submit" disabled={busy || done} className="min-h-[50px] rounded-full bg-accent font-display text-base font-bold text-white hover:bg-accent-dark">{busy ? c.saving : c.save}</button>
        <p className="text-center text-muted"><Link href="/login" className="font-bold">{c.back}</Link></p>
      </form>
    </div>
  );
}
