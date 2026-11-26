"use client";

import Link from "@/components/Link";
import { useLang } from "@/lib/i18n";

const copy = {
  fr: { title: "Rien sur scène ici.", body: "Cette page n’existe pas, ou le spectacle est terminé.", back: "Retour à ShowIci" },
  en: { title: "Nothing on stage here.", body: "This page doesn’t exist, or the show has ended.", back: "Back to ShowIci" },
};

export default function NotFound() {
  const { lang } = useLang();
  const c = copy[lang];
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ink p-8 text-center text-white">
      <h1 className="h-display text-5xl">{c.title}</h1>
      <p className="text-on-dark">{c.body}</p>
      <Link href="/" className="rounded-full bg-accent px-6 py-3 font-bold text-white no-underline hover:bg-accent-dark hover:text-white">{c.back}</Link>
    </div>
  );
}
