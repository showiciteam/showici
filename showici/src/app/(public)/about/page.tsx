import { about } from "@/lib/about";
import { SITE_URL } from "@/lib/site";
import { AboutView } from "./AboutView";
import { SOCIAL_URLS } from "@/lib/social";
import { getLang } from "@/lib/lang";
import { localePath, type Lang } from "@/lib/locale";

const IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: "ShowIci" };

// Canonical and hreflang come from the root layout (English at /about, French at /fr/about).
export async function generateMetadata() {
  const fr = (await getLang()) === "fr";
  const title = fr ? "Qu'est-ce que ShowIci?" : "What is ShowIci?";
  const description = fr
    ? "ShowIci relie les artistes d'ici (musiciens, groupes, DJ, magiciens, humoristes) aux salles et organisateurs d'événements partout au Québec, à commencer par Montréal. Bilingue, sans commission."
    : "ShowIci connects local artists (musicians, bands, DJs, magicians, stand-up comedians) with venues and event planners across Québec, starting in Montréal. Bilingual, zero commission.";
  return {
    title,
    description,
    openGraph: { type: "website", siteName: "ShowIci", url: localePath(fr ? "fr" : "en", "/about"), title, description, locale: fr ? "fr_CA" : "en_CA", alternateLocale: [fr ? "en_CA" : "fr_CA"], images: [IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [IMAGE] },
  };
}

/** Structured data so search engines and AI tools understand who ShowIci is and can show the FAQ. */
function jsonLd(lang: Lang) {
  const a = about[lang];
  const url = `${SITE_URL}${localePath(lang, "/about")}`;
  const org = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "ShowIci",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: a.lede,
    areaServed: { "@type": "AdministrativeArea", name: "Québec, Canada" },
    address: { "@type": "PostalAddress", addressLocality: "Montréal", addressRegion: "QC", addressCountry: "CA" },
    knowsLanguage: ["fr", "en"],
    sameAs: SOCIAL_URLS,
  };
  const page = { "@type": "AboutPage", "@id": url, url, name: a.title, inLanguage: lang === "fr" ? "fr-CA" : "en-CA", about: { "@id": org["@id"] } };
  const faq = {
    "@type": "FAQPage",
    mainEntity: a.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
  return { "@context": "https://schema.org", "@graph": [org, page, faq] };
}

export default async function AboutPage() {
  const lang = await getLang();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(lang)).replace(/</g, "\\u003c") }} />
      <AboutView />
    </>
  );
}
