"use client";

import Link from "@/components/Link";
import { useLang } from "@/lib/i18n";
import { SOCIAL_HANDLE } from "@/lib/social";
import { ContactButton } from "./ContactDialog";
import { openCookieSettings } from "./Analytics";
import { Logo } from "./Logo";
import { SocialLinks } from "./Social";

export function Footer() {
  const { t } = useLang();
  const linkClass = "text-on-dark no-underline hover:text-white";
  return (
    <footer className="border-t-[3px] border-accent bg-ink-deep text-white">
      <div className="wrap flex flex-wrap items-center gap-x-10 gap-y-6 py-8">
        <Logo height={50} />
        <nav aria-label={t("footer.nav")} className="flex w-full flex-wrap gap-x-6 gap-y-3 text-sm lg:w-auto lg:flex-1 lg:justify-center">
          <Link href="/shows" className={linkClass}>{t("nav.shows")}</Link>
          <Link href="/performers" className={linkClass}>{t("nav.performers")}</Link>
          <Link href="/venues" className={linkClass}>{t("nav.venues")}</Link>
          <Link href="/request" className={linkClass}>{t("nav.private")}</Link>
          <Link href="/spotlight" className={linkClass}>{t("nav.spotlight")}</Link>
          <Link href="/news" className={linkClass}>{t("nav.news")}</Link>
          <Link href="/about" className={linkClass}>{t("footer.about")}</Link>
          <ContactButton label={t("footer.contact")} className={`${linkClass} hover:underline`} />
        </nav>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-on-dark">{t("footer.follow")} · {SOCIAL_HANDLE}</span>
          <SocialLinks tone="dark" />
        </div>
      </div>
      <div className="border-t border-ink-line">
        <div className="wrap flex flex-wrap items-center justify-between gap-4 py-6 text-[13px] text-on-dark">
          <span>© {new Date().getFullYear()} ShowIci · Montréal</span>
          <p className="font-display text-base italic text-white">{t("footer.tagline")}</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/terms" className={linkClass}>{t("footer.terms")}</Link>
            <Link href="/privacy" className={linkClass}>{t("footer.privacy")}</Link>
            <button type="button" onClick={openCookieSettings} className="text-on-dark hover:text-white hover:underline">{t("footer.cookies")}</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
