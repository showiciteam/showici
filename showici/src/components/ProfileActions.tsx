"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toggleSaved } from "@/lib/actions";
import { Button } from "./ui";

/** ♡ Save (performers) or Follow (venues). Sends signed-out visitors to log in. */
export function SaveButton({ kind, id, initial, signedIn }: { kind: "performer" | "venue"; id: string; initial: boolean; signedIn: boolean }) {
  const router = useRouter();
  const [saved, setSaved] = useState(initial);
  const [busy, setBusy] = useState(false);
  const labels = kind === "performer" ? ["♡ Save", "♥ Saved"] : ["Follow", "✓ Following"];

  async function click() {
    if (!signedIn) return router.push(`/login?next=${encodeURIComponent(window.location.pathname)}`);
    setBusy(true);
    const next = !saved;
    setSaved(next);
    const res = await toggleSaved(kind, id, next);
    setBusy(false);
    if (!res.ok) setSaved(!next);
  }

  return <Button variant="secondary" onClick={click} disabled={busy}>{saved ? labels[1] : labels[0]}</Button>;
}

/** Uses the phone's share sheet when available, otherwise copies the link. */
export function ShareButton({ title, label = "Share" }: { title: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // cancelled: fall through to copy
      }
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return <Button variant="secondary" onClick={share}>{copied ? "Link copied ✓" : label}</Button>;
}
