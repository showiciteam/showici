import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { GA_HEAD_SCRIPT, GA_ID } from "@/lib/analytics";
import { DemoBanner } from "@/components/DemoBanner";
import { LanguageProvider } from "@/lib/i18n";
import { SITE_DESCRIPTION, SITE_DESCRIPTION_FR, SITE_NAME, SITE_TITLE, SITE_TITLE_FR, SITE_URL } from "@/lib/site";
import { getBarePath, getLang } from "@/lib/lang";
import { localePath } from "@/lib/locale";

/**
 * Site-wide defaults. Each page is served in English at /… and in French at /fr/…: the canonical tag
 * points to the page's own language and hreflang links the two versions.
 */
export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const path = await getBarePath();
  const fr = lang === "fr";
  const title = fr ? SITE_TITLE_FR : SITE_TITLE;
  const description = fr ? SITE_DESCRIPTION_FR : SITE_DESCRIPTION;
  const abs = (l: "en" | "fr") => `${SITE_URL}${localePath(l, path) === "/" ? "" : localePath(l, path)}`;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    applicationName: SITE_NAME,
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: abs(lang),
      locale: fr ? "fr_CA" : "en_CA",
      alternateLocale: [fr ? "en_CA" : "fr_CA"],
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
    alternates: {
      canonical: abs(lang),
      languages: { "en-CA": abs("en"), "fr-CA": abs("fr"), "x-default": abs("en") },
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#14213D",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await getLang();
  return (
    <html lang={lang === "fr" ? "fr-CA" : "en-CA"}>
      <head>
        {/* Google tag (gtag.js), in consent mode: cookies stay off until the visitor accepts in the banner. */}
        <script dangerouslySetInnerHTML={{ __html: GA_HEAD_SCRIPT }} />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,500;0,600;0,700;0,800;1,800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <DemoBanner />
        <LanguageProvider lang={lang}>
          {children}
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
