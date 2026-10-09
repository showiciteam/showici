"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LangToggle } from "@/components/Header";
import { Notice } from "@/components/form";
import { signUp } from "@/lib/actions";

type Role = "venue" | "planner" | "performer";
const roles: { id: Role; label: string; hint: string }[] = [
  { id: "venue", label: "A venue", hint: "Pub, bar, club" },
  { id: "planner", label: "Planning an event", hint: "Party, wedding…" },
  { id: "performer", label: "A performer", hint: "Band, DJ, comedy…" },
];
const next: Record<Role, string> = { venue: "/register/venue", planner: "/request", performer: "/register/performer" };
const cta: Record<Role, string> = { venue: "Create venue account", planner: "Create account", performer: "Create performer profile" };

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("venue");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    setError("");
    const email = String(f.get("email"));
    const res = await signUp(email, String(f.get("password")), role, String(f.get("name")), next[role]);
    setBusy(false);
    if (!res.ok) return setError(res.error);
    // Email confirmation is on: the link in the email logs them in and continues to the next step.
    if (res.needsConfirm) return setConfirmEmail(email);
    router.push(next[role]);
    router.refresh();
  }

  if (confirmEmail) {
    return (
      <div className="flex min-h-screen flex-col items-center gap-7 bg-parchment px-4 pb-16 pt-10">
        <Logo variant="color" height={64} />
        <div className="card flex w-full max-w-[580px] flex-col gap-4 px-8 py-9">
          <h1 className="h-display text-[32px]">Check your inbox</h1>
          <p className="text-slate">
            We sent a confirmation link to <strong>{confirmEmail}</strong>. Click it to activate your account and continue setting up your profile.
          </p>
          <p className="hint text-sm">Nothing there after a few minutes? Check your spam folder.</p>
          <Link href="/login" className="font-bold">Back to log in</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center gap-7 bg-parchment px-4 pb-16 pt-10">
      <Logo variant="color" height={64} />
      <form onSubmit={submit} className="card flex w-full max-w-[580px] flex-col gap-[22px] px-8 py-9">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="h-display mb-1.5 text-[32px]">Create your free account</h1>
            <p className="text-slate">Free during launch. No commission on bookings.</p>
          </div>
          <div className="rounded-full bg-navy p-1"><LangToggle /></div>
        </div>

        <fieldset>
          <legend className="mb-2.5 text-sm font-bold">I am…</legend>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-2.5">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                aria-pressed={role === r.id}
                onClick={() => setRole(r.id)}
                className={`flex min-h-[72px] flex-col items-start gap-1 rounded-[14px] border-2 p-3.5 text-left ${role === r.id ? "border-navy bg-brass-tint" : "border-line-strong bg-white"}`}
              >
                <span className="font-bold">{r.label}</span>
                <span className="text-[13px] text-muted">{r.hint}</span>
              </button>
            ))}
          </div>
        </fieldset>

        {role === "venue" && (
          <div className="flex flex-col gap-3.5">
            <label className="label">Venue name<input name="venueName" className="input" placeholder="e.g. [Your pub]" /></label>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
              <label className="label">Address<input className="input" placeholder="Street, city" /></label>
              <label className="label">Capacity<select className="input"><option>Under 50</option><option>50–150</option><option>150–300</option><option>300+</option></select></label>
            </div>
          </div>
        )}
        {role === "planner" && (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
            <label className="label">Type of event<select className="input"><option>Quinceañera</option><option>Birthday</option><option>Wedding</option><option>Private party</option><option>Corporate</option><option>Other</option></select></label>
            <label className="label">City<input className="input" placeholder="e.g. Laval" /></label>
          </div>
        )}
        {role === "performer" && (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
            <label className="label">Act or stage name<input className="input" placeholder="e.g. [Band name]" /></label>
            <label className="label">Type of act<select className="input"><option>Band · covers</option><option>Band · originals</option><option>Solo musician</option><option>DJ</option><option>Stand-up comedy</option><option>Magician</option><option>Other</option></select></label>
          </div>
        )}

        <div className="h-px bg-line" />
        <label className="label">Your name<input name="name" required className="input" autoComplete="name" /></label>
        <label className="label">Email<input name="email" type="email" required className="input" placeholder="you@example.com" autoComplete="email" /></label>
        <label className="label">Password<input name="password" type="password" required minLength={8} className="input" placeholder="At least 8 characters" autoComplete="new-password" /></label>
        <label className="flex items-start gap-2.5 text-sm leading-snug text-slate">
          <input type="checkbox" required className="mt-0.5 h-[18px] w-[18px] flex-none accent-navy" />
          <span>I agree to the <a href="#">Terms</a> and <a href="#">Privacy policy</a>. Contact details stay private: people reach me through ShowIci messages.</span>
        </label>
        {error && <Notice kind="error">{error}</Notice>}
        <button type="submit" disabled={busy} className="min-h-[52px] rounded-xl bg-navy text-[17px] font-bold text-white hover:bg-navy-deep disabled:opacity-60">{busy ? "Creating…" : cta[role]}</button>
        <p className="text-center text-[15px] text-muted">Already have an account? <Link href="/login" className="font-bold">Log in</Link></p>
      </form>
    </div>
  );
}
