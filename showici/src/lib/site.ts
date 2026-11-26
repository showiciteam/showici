import type { Lang } from "./lang";

/** Public address of the site, used for link previews, the sitemap and robots.txt. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.showici.com").replace(/\/$/, "");

export const SITE_NAME = "ShowIci";

export const SITE_TITLE: Record<Lang, string> = {
  fr: "ShowIci · Artistes, salles et spectacles d’ici au Québec",
  en: "ShowIci · Local artists, venues and shows in Québec",
};

export const SITE_DESCRIPTION: Record<Lang, string> = {
  fr: "ShowIci réunit les salles, les organisateurs d’événements et les artistes d’ici : groupes, DJ, humoristes, magiciens. En français et en anglais, sans commission, partout au Québec à commencer par Montréal.",
  en: "ShowIci connects venues, event planners and local artists: bands, DJs, comedians, magicians. In French and English, no commission, across Québec starting in Montréal.",
};
