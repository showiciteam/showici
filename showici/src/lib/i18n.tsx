"use client";

import { createContext, useContext } from "react";
import { LANG_COOKIE, isPrivatePath, localePath, splitLang, switchLang, tr, type Lang } from "./locale";

export type { Lang };

const dict = {
  en: {
    "nav.shows": "Shows",
    "nav.bigEvents": "Big events",
    "nav.performers": "Performers",
    "nav.venues": "Venues",
    "nav.private": "Private events",
    "nav.spotlight": "Spotlight Time",
    "nav.news": "News",
    "nav.contact": "Contact",
    "nav.login": "Log in",
    "nav.signup": "Sign up",
    "hero.eyebrow": "Live entertainment · Across Québec · Starting in Montréal",
    "hero.title1": "Book local talent",
    "hero.title2": "for every stage.",
    "hero.sub":
      "Bands, DJs, comedians and magicians for venues and private events. No commission.",
    "hero.banner": "Bands, DJs, comedians and magicians. No commission.",
    "search.lookingFor": "I'm looking for",
    "search.type": "Type of act",
    "search.near": "Region",
    "search.within": "Within",
    "search.go": "Search",
    "footer.about": "About",
    "footer.contact": "Contact",
    "footer.terms": "Terms",
    "footer.privacy": "Privacy",
  },
  fr: {
    "nav.shows": "Spectacles",
    "nav.bigEvents": "Grands événements",
    "nav.performers": "Artistes",
    "nav.venues": "Salles",
    "nav.private": "Événements privés",
    "nav.spotlight": "Spotlight Time",
    "nav.news": "Nouvelles",
    "nav.contact": "Contact",
    "nav.login": "Connexion",
    "nav.signup": "Inscription",
    "hero.eyebrow": "Divertissement en direct · Partout au Québec · À commencer par Montréal",
    "hero.title1": "Réservez les talents d'ici",
    "hero.title2": "pour toutes les scènes.",
    "hero.sub":
      "Groupes, DJ, humoristes et magiciens pour les salles et les événements privés. Sans commission.",
    "hero.banner": "Groupes, DJ, humoristes et magiciens. Sans commission.",
    "search.lookingFor": "Je cherche",
    "search.type": "Type de numéro",
    "search.near": "Région",
    "search.within": "Dans un rayon de",
    "search.go": "Rechercher",
    "footer.about": "À propos",
    "footer.contact": "Contact",
    "footer.terms": "Conditions",
    "footer.privacy": "Confidentialité",
  },
} as const;

export type DictKey = keyof (typeof dict)["en"];

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: DictKey) => string; tr: (en: string, fr: string) => string; href: (path: string) => string };

const LangContext = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  t: (k) => dict.en[k],
  tr: tr("en"),
  href: (p) => p,
});

/**
 * The page language comes from the URL (/fr/… is French), read by the middleware and passed down from
 * the root layout. Switching language goes to the same page in the other language and remembers the choice.
 */
export function LanguageProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const setLang = (l: Lang) => {
    if (l === lang) return;
    document.cookie = `${LANG_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
    const { path } = splitLang(window.location.pathname);
    // Private pages keep their address; public pages move to their /fr (or English) version.
    const next = isPrivatePath(path) ? path : switchLang(window.location.pathname, l);
    window.location.assign(next + window.location.search + window.location.hash);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: (k) => dict[lang][k], tr: tr(lang), href: (p) => localePath(lang, p) }}>{children}</LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
