"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { ContactButton } from "./ContactDialog";
import { openCookieSettings } from "./Analytics";
import { SOCIAL_HANDLE } from "@/lib/social";
import { SocialLinks } from "./Social";

export function Footer() {
  const { t, lang } = useLang();
  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-wrap items-center justify-between gap-4 border-b border-line py-6">
        <div className="flex flex-col gap-0.5">
          <strong className="text-navy">{lang === "fr" ? "Suivez la scène locale" : "Follow the local scene"}</strong>
          <span className="text-sm text-muted">{lang === "fr" ? `Nouveaux spectacles et artistes chaque semaine sur ${SOCIAL_HANDLE}` : `New shows and artists every week on ${SOCIAL_HANDLE}`}</span>
        </div>
        <SocialLinks />
      </div>
      <div className="wrap flex flex-wrap justify-between gap-4 py-8 text-sm text-muted">
        <span>© ShowIci · Montréal</span>
        <div className="flex flex-wrap gap-5">
          <Link href="/spotlight" className="text-muted">Spotlight Time</Link>
          <Link href="/news" className="text-muted">{t("nav.news")}</Link>
          <Link href="/about" className="text-muted">{t("footer.about")}</Link>
          <ContactButton label={t("footer.contact")} className="text-muted hover:text-navy hover:underline" />
          <Link href="/terms" className="text-muted">{t("footer.terms")}</Link>
          <Link href="/privacy" className="text-muted">{t("footer.privacy")}</Link>
          <button type="button" onClick={openCookieSettings} className="text-muted hover:text-navy hover:underline">{lang === "fr" ? "Témoins" : "Cookie settings"}</button>
        </div>
      </div>
    </footer>
  );
}
