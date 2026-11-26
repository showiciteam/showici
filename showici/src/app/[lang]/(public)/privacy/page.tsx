import type { Metadata } from "next";
import { isLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";
import { privacy } from "@/lib/legal";

const SEO = {
  fr: { title: "Politique de confidentialité · ShowIci", description: "Les renseignements personnels que ShowIci recueille, pourquoi, et comment exercer vos droits selon la Loi 25 du Québec." },
  en: { title: "Privacy policy · ShowIci", description: "What personal information ShowIci collects, why, and how to exercise your rights under Québec’s Law 25." },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMetadata({ lang, path: "/privacy", ...SEO[lang] });
}

export default function Privacy() {
  return <LegalPage doc={privacy} other={{ href: "/terms", en: "Terms of use", fr: "Conditions d'utilisation" }} />;
}
