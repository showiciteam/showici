"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { CONSENT_KEY as KEY } from "@/lib/analytics";

/**
 * Cookie banner for Google Analytics (GA4). The Google tag itself is in the root layout
 * (GA_HEAD_SCRIPT) and loads for every visitor in Google's consent mode: until the visitor
 * clicks "Accept", analytics cookies stay off and Google only gets cookieless pings.
 * The choice is kept in this browser; "Cookie settings" in the footer reopens the banner.
 */
const OPEN_EVENT = "showici:cookie-settings";

/** Reopens the consent banner (used by the footer link). */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

function readChoice(): string | null {
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

const T = {
  en: {
    text: "We use Google Analytics cookies to see how ShowIci is used and make it better. They're only turned on if you accept.",
    more: "Privacy policy",
    accept: "Accept",
    decline: "Decline",
  },
  fr: {
    text: "Nous utilisons des témoins (cookies) Google Analytics pour comprendre l'utilisation de ShowIci et l'améliorer. Ils ne sont activés que si vous acceptez.",
    more: "Politique de confidentialité",
    accept: "Accepter",
    decline: "Refuser",
  },
};

export function Analytics() {
  const { lang } = useLang();
  const [choice, setChoice] = useState<string | null>(null);
  const [ready, setReady] = useState(false); // avoid flashing the banner before the saved choice is read
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = readChoice();
    setChoice(saved);
    setOpen(!saved);
    setReady(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  function decide(value: "granted" | "denied") {
    try {
      window.localStorage.setItem(KEY, value);
    } catch {}
    const w = window as unknown as { gtag?: (...a: unknown[]) => void };
    w.gtag?.("consent", "update", { analytics_storage: value });
    if (value === "denied" && choice === "granted") {
      // Turned off after being on: remove the Google Analytics cookies already set.
      document.cookie.split(";").map((c) => c.split("=")[0].trim()).filter((n) => n === "_ga" || n.startsWith("_ga_")).forEach((n) => {
        const host = window.location.hostname.replace(/^www\./, "");
        document.cookie = `${n}=; Max-Age=0; path=/`;
        document.cookie = `${n}=; Max-Age=0; path=/; domain=.${host}`;
      });
    }
    setChoice(value);
    setOpen(false);
  }

  const t = T[lang];
  return (
    <>
      {ready && open && (
        <div role="dialog" aria-live="polite" aria-label={lang === "fr" ? "Témoins" : "Cookies"} className="fixed inset-x-3 bottom-3 z-[300] mx-auto flex max-w-[760px] flex-wrap items-center gap-4 rounded-[16px] border border-line bg-white p-4 shadow-2xl sm:inset-x-6 sm:bottom-6 sm:p-5">
          <p className="min-w-0 flex-[1_1_320px] text-[15px] text-ink-2">
            {t.text} <Link href="/privacy" className="font-bold">{t.more}</Link>
          </p>
          <div className="flex flex-none gap-2.5">
            <button type="button" onClick={() => decide("denied")} className="min-h-11 rounded-[10px] border border-line-strong bg-white px-[18px] py-2.5 text-[15px] font-bold text-navy hover:bg-parchment">{t.decline}</button>
            <button type="button" onClick={() => decide("granted")} className="min-h-11 rounded-[10px] bg-navy px-[18px] py-2.5 text-[15px] font-bold text-white hover:bg-navy-deep">{t.accept}</button>
          </div>
        </div>
      )}
    </>
  );
}
