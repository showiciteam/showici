"use client";

import { createContext, useContext } from "react";
import { DEFAULT_LANG, localize, type Lang } from "./lang";

export type { Lang } from "./lang";

/** Words shared by the header, footer and other site-wide pieces. Page copy lives next to each page. */
const dict = {
  fr: {
    "nav.shows": "Spectacles",
    "nav.localShows": "Spectacles locaux",
    "nav.bigEvents": "Grands événements",
    "nav.performers": "Artistes",
    "nav.venues": "Venues",
    "nav.private": "Événements privés",
    "nav.spotlight": "ShowIci Spotlight",
    "nav.news": "Nouvelles",
    "nav.contact": "Contact",
    "nav.login": "Se connecter",
    "nav.signup": "Inscription",
    "nav.logout": "Déconnexion",
    "nav.menu": "Menu",
    "nav.home": "Accueil ShowIci",
    "nav.main": "Navigation principale",
    "footer.tagline": "Ensemble, faisons rayonner la scène locale.",
    "footer.follow": "Suivez la scène locale",
    "footer.followSub": "Nouveaux spectacles et artistes chaque semaine",
    "footer.about": "À propos",
    "footer.contact": "Contact",
    "footer.terms": "Conditions",
    "footer.privacy": "Confidentialité",
    "footer.cookies": "Témoins",
    "footer.nav": "Pied de page",
  },
  en: {
    "nav.shows": "Shows",
    "nav.localShows": "Local shows",
    "nav.bigEvents": "Big events",
    "nav.performers": "Artists",
    "nav.venues": "Venues",
    "nav.private": "Private events",
    "nav.spotlight": "ShowIci Spotlight",
    "nav.news": "News",
    "nav.contact": "Contact",
    "nav.login": "Log in",
    "nav.signup": "Sign up",
    "nav.logout": "Log out",
    "nav.menu": "Menu",
    "nav.home": "ShowIci home",
    "nav.main": "Main navigation",
    "footer.tagline": "Together, let's light up the local scene.",
    "footer.follow": "Follow the local scene",
    "footer.followSub": "New shows and artists every week",
    "footer.about": "About",
    "footer.contact": "Contact",
    "footer.terms": "Terms",
    "footer.privacy": "Privacy",
    "footer.cookies": "Cookie settings",
    "footer.nav": "Footer",
  },
} as const;

export type DictKey = keyof (typeof dict)["fr"];

type LangValue = { lang: Lang; t: (key: DictKey) => string; href: (path: string) => string };

const LangContext = createContext<LangValue>({
  lang: DEFAULT_LANG,
  t: (key) => dict[DEFAULT_LANG][key],
  href: (path) => path,
});

/** Gives every client component the page language, set from the URL by app/[lang]/layout.tsx. */
export function LanguageProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const value: LangValue = { lang, t: (key) => dict[lang][key], href: (path) => localize(path, lang) };
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
