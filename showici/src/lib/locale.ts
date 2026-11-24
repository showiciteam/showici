/**
 * Language in the URL: English pages live at /…, French pages at /fr/….
 * The middleware strips the /fr prefix, rewrites to the same page and passes the language in a header,
 * so every page file serves both languages. Shared by the middleware, server and client code.
 */
export type Lang = "en" | "fr";

export const LANG_HEADER = "x-showici-lang";
export const PATH_HEADER = "x-showici-path";
export const LANG_COOKIE = "showici-lang";

/** Sections that are never indexed: their language follows the visitor's last choice (cookie), not the URL. */
const PRIVATE = ["/admin", "/dashboard", "/messages", "/requests", "/review", "/register", "/login", "/signup", "/reset-password", "/auth", "/api"];
export const isPrivatePath = (p: string) => PRIVATE.some((x) => p === x || p.startsWith(`${x}/`));

/** "/fr/venues/x" → { lang: "fr", path: "/venues/x" }. */
export function splitLang(pathname: string): { lang: Lang; path: string } {
  if (pathname === "/fr" || pathname.startsWith("/fr/")) return { lang: "fr", path: pathname.slice(3) || "/" };
  return { lang: "en", path: pathname };
}

/** Internal link for a language: localePath("fr", "/venues") → "/fr/venues". External, hash and private links are left alone. */
export function localePath(lang: Lang, href: string) {
  if (lang !== "fr" || !href.startsWith("/") || href.startsWith("//")) return href;
  const bare = splitLang(href.split(/[?#]/)[0]).path;
  if (isPrivatePath(bare) || href === "/fr" || href.startsWith("/fr/") || href.startsWith("/fr?")) return href;
  return href === "/" ? "/fr" : href.startsWith("/?") || href.startsWith("/#") ? `/fr${href.slice(1)}` : `/fr${href}`;
}

/** Same page in the other language (for the FR / EN switch and hreflang). */
export function switchLang(pathname: string, to: Lang) {
  const { path } = splitLang(pathname);
  return to === "fr" ? localePath("fr", path) : path;
}

/** Pick the string for a language: tr(lang)("Shows", "Spectacles"). */
export const tr = (lang: Lang) => (en: string, fr: string) => (lang === "fr" ? fr : en);
