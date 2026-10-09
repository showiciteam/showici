"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Notice } from "@/components/form";
import { updatePassword } from "@/lib/actions";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const pw = String(f.get("password"));
    if (pw.length < 8) return setError("Use at least 8 characters.");
    if (pw !== String(f.get("confirm"))) return setError("The two passwords don't match.");
    setBusy(true);
    const res = await updatePassword(pw);
    setBusy(false);
    if (!res.ok) return setError(/session/i.test(res.error) ? "This reset link has expired. Ask for a new one from the login page." : res.error);
    setError("");
    setDone(true);
    setTimeout(() => {
      router.push("/");
      router.refresh();
    }, 1500);
  }

  return (
    <div className="flex min-h-screen flex-col items-center gap-7 bg-parchment px-4 pb-16 pt-10">
      <Logo variant="color" height={64} />
      <form onSubmit={save} className="card flex w-full max-w-[460px] flex-col gap-[18px] px-[30px] py-[34px]">
        <h1 className="h-display text-[30px]">Choose a new password</h1>
        <label className="label">New password<input name="password" type="password" required minLength={8} className="input" autoComplete="new-password" /></label>
        <label className="label">Confirm new password<input name="confirm" type="password" required minLength={8} className="input" autoComplete="new-password" /></label>
        {error && <Notice kind="error">{error}</Notice>}
        {done && <Notice kind="ok">Password updated. Taking you to ShowIci…</Notice>}
        <button type="submit" disabled={busy || done} className="min-h-[50px] rounded-xl bg-navy text-base font-bold text-white hover:bg-navy-deep">{busy ? "Saving…" : "Save new password"}</button>
        <p className="text-center text-muted"><Link href="/login" className="font-bold">Back to log in</Link></p>
      </form>
    </div>
  );
}
