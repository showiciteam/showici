import type { Metadata, Viewport } from "next";
import "./globals.css";
import { DemoBanner } from "@/components/DemoBanner";
import { LanguageProvider } from "@/lib/i18n";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Montréal", "Montreal", "live music", "musique live", "bands", "DJ", "comedians", "humoristes", "magicians",
    "book a band", "réserver un groupe", "pubs", "bars", "venues", "salles", "weddings", "mariages", "quinceañera",
    "private events", "événements privés",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "fr_CA",
    alternateLocale: ["en_CA"],
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700;9..144,800&family=DM+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <DemoBanner />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
