import type { Metadata } from "next";
import { isLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";
import { terms } from "@/lib/legal";

const SEO = {
  fr: { title: "Conditions d’utilisation · ShowIci", description: "Les règles d’utilisation de ShowIci, la plateforme québécoise qui réunit salles, organisateurs d’événements et artistes." },
  en: { title: "Terms of use · ShowIci", description: "The rules for using ShowIci, the Québec platform connecting venues, event planners and artists." },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMetadata({ lang, path: "/terms", ...SEO[lang] });
}

export default function Terms() {
  return <LegalPage doc={terms} other={{ href: "/privacy", en: "Privacy policy", fr: "Politique de confidentialité" }} />;
}
