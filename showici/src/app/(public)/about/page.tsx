import { about } from "@/lib/about";
import { SITE_URL } from "@/lib/site";
import { AboutView } from "./AboutView";

const TITLE = "What is ShowIci? · Qu'est-ce que ShowIci?";
const DESCRIPTION = "ShowIci connects local artists (musicians, bands, DJs, magicians, stand-up comedians) with venues and event planners across Québec, starting in Montréal. Bilingual, zero commission.";
const IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: "ShowIci · Book local talent for every stage" };

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: { type: "website", siteName: "ShowIci", url: "/about", title: "What is ShowIci?", description: DESCRIPTION, locale: "en_CA", alternateLocale: ["fr_CA"], images: [IMAGE] },
  twitter: { card: "summary_large_image", title: "What is ShowIci?", description: DESCRIPTION, images: [IMAGE] },
};

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
