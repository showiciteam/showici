import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { GA_HEAD_SCRIPT, GA_ID } from "@/lib/analytics";
import { DemoBanner } from "@/components/DemoBanner";
import { LanguageProvider } from "@/lib/i18n";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Québec", "Quebec", "Montréal", "Montreal", "live music", "musique live", "bands", "DJ", "comedians", "humoristes", "magicians",
    "book a band", "réserver un groupe", "pubs", "bars", "venues", "salles", "weddings", "mariages", "quinceañera",
    "private events", "événements privés",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    // Pages load in English first (the FR / EN switch changes them in the browser).
    locale: "en_CA",
    alternateLocale: ["fr_CA"],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#14213D",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Impact.com site verification (uses "value", not "content", as Impact asks). */}
        <meta name="impact-site-verification" {...{ value: "3ca1d817-7c26-4038-b783-cb800530ba3d" }} />
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
        <LanguageProvider>
          {children}
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
