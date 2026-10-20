"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { ContactButton } from "./ContactDialog";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-wrap justify-between gap-4 py-8 text-sm text-muted">
        <span>© ShowIci · Montréal</span>
        <div className="flex flex-wrap gap-5">
          <Link href="/spotlight" className="text-muted">Spotlight Time</Link>
          <Link href="/news" className="text-muted">{t("nav.news")}</Link>
          <Link href="/pricing" className="text-muted">Pricing</Link>
          <a href="#" className="text-muted">{t("footer.about")}</a>
          <ContactButton label={t("footer.contact")} className="text-muted hover:text-navy hover:underline" />
          <Link href="/terms" className="text-muted">{t("footer.terms")}</Link>
          <Link href="/privacy" className="text-muted">{t("footer.privacy")}</Link>
        </div>
      </div>
    </footer>
  );
}
