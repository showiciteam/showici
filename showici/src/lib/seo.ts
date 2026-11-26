import type { Metadata } from "next";
import { LANGS, OG_LOCALE, localize, type Lang } from "./lang";
import { SITE_NAME, SITE_URL } from "./site";

type PageSeo = {
  lang: Lang;
  /** Path without the language prefix, e.g. "/venues". */
  path: string;
  title: string;
  description: string;
  /** Absolute or site-relative image for link previews. Defaults to the ShowIci share image. */
  image?: string;
  /** Keep the page out of search results (account pages, forms). */
  noindex?: boolean;
};

/**
 * Title, description, canonical URL and the French/English alternates for one page.
 * Every public page builds its metadata with this, so search engines see both languages.
 */
export function pageMetadata({ lang, path, title, description, image, noindex }: PageSeo): Metadata {
  const url = localize(path, lang);
  // Pages without their own picture use the ShowIci share image in their language (app/[lang]/opengraph-image.tsx).
  const preview = image ?? `/${lang}/opengraph-image`;
  const languages = Object.fromEntries(LANGS.map((l) => [`${l}-CA`, localize(path, l)]));
  return {
    title,
    description,
    alternates: { canonical: url, languages: { ...languages, "x-default": localize(path, "fr") } },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url,
      locale: OG_LOCALE[lang],
      alternateLocale: LANGS.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
      images: [preview],
    },
    twitter: { card: "summary_large_image", title, description, images: [preview] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Schema.org data as a <script> body. Escapes "<" so text can never close the tag. */
export const jsonLd = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");

export const absoluteUrl = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path}`);
