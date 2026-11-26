import type { Metadata } from "next";
import { isLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/seo";
import { about } from "@/lib/about";
import { SITE_URL } from "@/lib/site";
import { AboutView } from "./AboutView";
import { SOCIAL_URLS } from "@/lib/social";

const SEO = {
  fr: { title: "Qu’est-ce que ShowIci? · À propos", description: "ShowIci réunit les artistes d’ici (musiciens, groupes, DJ, magiciens, humoristes) et les salles et organisateurs d’événements partout au Québec, à commencer par Montréal. Bilingue, sans commission." },
  en: { title: "What is ShowIci? · About", description: "ShowIci connects local artists (musicians, bands, DJs, magicians, comedians) with venues and event planners across Québec, starting in Montréal. Bilingual, no commission." },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMetadata({ lang, path: "/about", ...SEO[lang] });
}

/** Structured data so search engines and AI tools understand who ShowIci is and can show the FAQ. */
function jsonLd() {
  const org = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "ShowIci",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: about.en.lede,
    areaServed: { "@type": "AdministrativeArea", name: "Québec, Canada" },
    address: { "@type": "PostalAddress", addressLocality: "Montréal", addressRegion: "QC", addressCountry: "CA" },
    knowsLanguage: ["fr", "en"],
    sameAs: SOCIAL_URLS,
  };
  const page = { "@type": "AboutPage", "@id": `${SITE_URL}/about`, url: `${SITE_URL}/about`, name: "What is ShowIci?", inLanguage: "en-CA", about: { "@id": org["@id"] } };
  const faq = {
    "@type": "FAQPage",
    mainEntity: about.en.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
  return { "@context": "https://schema.org", "@graph": [org, page, faq] };
}

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <AboutView />
    </>
  );
}
