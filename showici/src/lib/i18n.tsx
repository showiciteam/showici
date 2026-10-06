"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "en" | "fr";

const dict = {
  en: {
    "nav.shows": "Shows",
    "nav.bigEvents": "Big events",
    "nav.performers": "Performers",
    "nav.venues": "Venues",
    "nav.private": "Private events",
    "nav.spotlight": "Spotlight Time",
    "nav.news": "News",
    "nav.login": "Log in",
    "nav.signup": "Sign up free",
    "hero.eyebrow": "Live entertainment · Across Canada · Starting in Montréal",
    "hero.title1": "Book local talent",
    "hero.title2": "for every stage.",
    "hero.sub":
      "Bands, DJs, comedians and magicians, connected with venues and private events in your city. No commission, French and English, verified profiles.",
    "search.lookingFor": "I'm looking for",
    "search.type": "Type of act",
    "search.near": "Near",
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
    "nav.login": "Connexion",
    "nav.signup": "Inscription gratuite",
    "hero.eyebrow": "Divertissement en direct · Partout au Canada · À commencer par Montréal",
    "hero.title1": "Réservez les talents d'ici",
    "hero.title2": "pour toutes les scènes.",
    "hero.sub":
      "Groupes, DJ, humoristes et magiciens, en lien avec les salles et les événements privés de votre ville. Sans commission, en français et en anglais, profils vérifiés.",
    "search.lookingFor": "Je cherche",
    "search.type": "Type de numéro",
    "search.near": "Près de",
    "search.within": "Dans un rayon de",
    "search.go": "Rechercher",
    "footer.about": "À propos",
    "footer.contact": "Contact",
    "footer.terms": "Conditions",
    "footer.privacy": "Confidentialité",
  },
} as const;

export type DictKey = keyof (typeof dict)["en"];

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: DictKey) => string }>({
  lang: "en",
  setLang: () => {},
  t: (k) => dict.en[k],
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("showici-lang");
      if (saved === "fr" || saved === "en") setLangState(saved);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem("showici-lang", l);
    } catch {}
    document.documentElement.lang = l;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: (k) => dict[lang][k] }}>{children}</LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
