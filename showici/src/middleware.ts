import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LANG, LANG_HEADER, switchLang, type Lang } from "@/lib/lang";

// Pages that need a signed-in user. Everything else stays public.
const PROTECTED = ["/dashboard", "/messages", "/admin", "/requests", "/review"];

// Served as-is, outside the [lang] pages: route handlers and files.
const PASS_THROUGH = ["/auth/", "/api/"];
const isFile = (path: string) => /\.[a-z0-9]+$/i.test(path);
// Link-preview images generated per language at /fr/opengraph-image and /en/opengraph-image.
const SHARE_IMAGE = /^\/(fr|en)\/opengraph-image/;

/** "/en/shows" → { lang: "en", path: "/shows" }; "/shows" → { lang: "fr", path: "/shows" }. */
function splitLang(pathname: string): { lang: Lang; path: string } {
  if (pathname === "/en" || pathname.startsWith("/en/")) return { lang: "en", path: pathname.slice(3) || "/" };
  return { lang: DEFAULT_LANG, path: pathname };
}

/**
 * 1. Language: French pages live at the root, English ones under /en. Both are served from app/[lang].
 * 2. Session: refreshes the Supabase auth cookie and sends signed-out visitors from private pages to the login page.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (PASS_THROUGH.some((p) => pathname.startsWith(p)) || isFile(pathname) || SHARE_IMAGE.test(pathname)) return NextResponse.next();

  // Older shared links used ?lang=en / ?lang=fr: send them to the page in that language.
  const asked = request.nextUrl.searchParams.get("lang");
  if (asked === "en" || asked === "fr") {
    const moved = request.nextUrl.clone();
    moved.searchParams.delete("lang");
    moved.pathname = switchLang(pathname, asked);
    return NextResponse.redirect(moved, 308);
  }

  // /fr/... is never a public address: send it to the same page without the prefix.
  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    const clean = request.nextUrl.clone();
    clean.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(clean, 308);
  }

  const { lang, path } = splitLang(pathname);
  const target = request.nextUrl.clone();
  target.pathname = `/${lang}${path === "/" ? "" : path}`;
  // Rebuilt on each call so refreshed session cookies reach the page too.
  const pass = () => {
    const headers = new Headers(request.headers);
    headers.set(LANG_HEADER, lang);
    return NextResponse.rewrite(target, { request: { headers } });
  };

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return pass(); // Demo mode: no accounts.

  // Most visitors have no account: without a sign-in cookie there is no session to refresh, so skip the call to Supabase.
  const signedIn = request.cookies.getAll().some((c) => c.name.startsWith("sb-") && c.name.includes("-auth-token"));
  if (!signedIn) return isProtected(path) ? toLogin(request, lang) : pass();

  let response = pass();
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        list.forEach(({ name, value }) => request.cookies.set(name, value));
        response = pass();
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  // Must run before anything else: it refreshes an expired session.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && isProtected(path)) return toLogin(request, lang);
  return response;
}

const isProtected = (path: string) => PROTECTED.some((p) => path === p || path.startsWith(`${p}/`));

/** Sends a signed-out visitor to the login page, then back to where they were going. */
function toLogin(request: NextRequest, lang: Lang) {
  const login = request.nextUrl.clone();
  login.pathname = lang === "en" ? "/en/login" : "/login";
  login.search = `?next=${encodeURIComponent(request.nextUrl.pathname + request.nextUrl.search)}`;
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
