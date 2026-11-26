import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
// Fonts are served from the site itself (no request to Google from visitors).
import "@fontsource-variable/inter";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource/permanent-marker";
import "../globals.css";
import { Analytics } from "@/components/Analytics";
import { GA_HEAD_SCRIPT, GA_ID } from "@/lib/analytics";
import { DemoBanner } from "@/components/DemoBanner";
import { LanguageProvider } from "@/lib/i18n";
import { LANGS, isLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/seo";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

export const generateStaticParams = () => LANGS.map((lang) => ({ lang }));

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    icons: { icon: "/icon.png", apple: "/apple-icon.png" },
    ...pageMetadata({ lang, path: "/", title: SITE_TITLE[lang], description: SITE_DESCRIPTION[lang] }),
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#0B0B0D",
};

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return (
    <html lang={lang === "fr" ? "fr-CA" : "en-CA"}>
      <head>
        {/* Google tag (gtag.js), in consent mode: cookies stay off until the visitor accepts in the banner. */}
        <script dangerouslySetInnerHTML={{ __html: GA_HEAD_SCRIPT }} />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
      </head>
      <body className="min-h-screen antialiased">
        <LanguageProvider lang={lang}>
          <DemoBanner />
          {children}
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
