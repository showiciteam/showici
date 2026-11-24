/** Public address of the site, used for link previews, the sitemap and robots.txt. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.showici.com").replace(/\/$/, "");

export const SITE_NAME = "ShowIci";
export const SITE_TITLE = "ShowIci · Book local talent for every stage";
export const SITE_DESCRIPTION =
  "ShowIci connects Québec venues and event planners with local bands, DJs, comedians and magicians. No commission. In French and English.";

export const SITE_TITLE_FR = "ShowIci · Réservez les talents d'ici pour toutes les scènes";
export const SITE_DESCRIPTION_FR =
  "ShowIci relie les salles et organisateurs d'événements du Québec aux groupes, DJ, humoristes et magiciens d'ici. Sans commission. En français et en anglais.";
