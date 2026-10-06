"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";

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
          <a href="#" className="text-muted">{t("footer.contact")}</a>
          <a href="#" className="text-muted">{t("footer.terms")}</a>
          <a href="#" className="text-muted">{t("footer.privacy")}</a>
        </div>
      </div>
    </footer>
  );
}
