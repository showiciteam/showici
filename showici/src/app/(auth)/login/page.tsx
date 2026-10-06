"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Notice } from "@/components/form";
import { resetPassword, signIn } from "@/lib/actions";

const home: Record<string, string> = { venue: "/dashboard/venue", performer: "/dashboard/performer", planner: "/request", admin: "/admin" };

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("error") === "link") setError("That link has expired or was already used. Log in, or ask for a new link below.");
  }, []);

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
    <div className="flex min-h-screen flex-col items-center gap-7 bg-parchment px-4 pb-16 pt-10">
      <div className="rounded-full bg-navy px-5 py-2.5"><Logo /></div>
      <div className="flex w-full flex-wrap justify-center gap-6">
        <form onSubmit={login} className="card flex max-w-[460px] flex-[1_1_340px] flex-col gap-[18px] px-[30px] py-[34px]">
          <h1 className="h-display text-[30px]">Welcome back</h1>
          <label className="label">Email<input name="email" type="email" required className="input" placeholder="you@example.com" autoComplete="email" /></label>
          <label className="label">Password<input name="password" type="password" required className="input" autoComplete="current-password" /></label>
          <div className="flex flex-wrap items-center justify-between gap-2.5 text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="h-[18px] w-[18px] accent-navy" />Keep me logged in</label>
            <a href="#reset" className="font-bold">Forgot password?</a>
          </div>
          {error && <Notice kind="error">{error}</Notice>}
          <button type="submit" disabled={busy} className="min-h-[50px] rounded-xl bg-navy text-base font-bold text-white hover:bg-navy-deep">{busy ? "Logging in…" : "Log in"}</button>
          <p className="text-center text-muted">New to ShowIci? <Link href="/signup" className="font-bold">Create a free account</Link></p>
        </form>
        <form id="reset" onSubmit={reset} className="card flex max-w-[460px] flex-[1_1_340px] flex-col gap-[18px] self-start px-[30px] py-[34px]">
          <h2 className="h-display text-[30px]">Reset your password</h2>
          <p className="text-slate">Enter your email and we&apos;ll send you a link to choose a new password.</p>
          <label className="label">Email<input name="email" type="email" required className="input" placeholder="you@example.com" /></label>
          <button type="submit" className="min-h-[50px] rounded-xl bg-navy text-base font-bold text-white">Send reset link</button>
          {resetSent && <Notice kind="ok">Check your inbox: if an account exists for this email, a reset link is on its way.</Notice>}
        </form>
      </div>
    </div>
  );
}
