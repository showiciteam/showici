/**
 * Languages and URLs.
 * French is the main language and lives at the root (showici.com/salles…),
 * English lives under /en (showici.com/en/…). The middleware maps both onto app/[lang].
 */

export const LANGS = ["fr", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "fr";

export const isLang = (value: string | undefined): value is Lang => value === "fr" || value === "en";

/** Public URL of a path in a language: "/shows" → "/shows" (fr) or "/en/shows" (en). Leaves external links alone. */
export function localize(path: string, lang: Lang): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  if (lang === DEFAULT_LANG) return path;
  return path === "/" ? "/en" : `/en${path}`;
}

/** The same page in the other language, used by the FR / EN switch. */
export function switchLang(publicPath: string, to: Lang): string {
  const bare = publicPath === "/en" ? "/" : publicPath.startsWith("/en/") ? publicPath.slice(3) : publicPath;
  return localize(bare, to);
}

/** Picks the text for the current language from a { fr, en } pair. */
export const pick = <T,>(lang: Lang, text: { fr: T; en: T }): T => text[lang];

/** Open Graph locale codes. */
export const OG_LOCALE: Record<Lang, string> = { fr: "fr_CA", en: "en_CA" };

/** Request header set by the middleware so server code outside a page (actions, helpers) knows the visitor's language. */
export const LANG_HEADER = "x-showici-lang";
