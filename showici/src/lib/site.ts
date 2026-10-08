/** Public address of the site, used for link previews, the sitemap and robots.txt. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.showici.com").replace(/\/$/, "");

export const SITE_NAME = "ShowIci";
export const SITE_TITLE = "ShowIci · Book local talent for every stage";
export const SITE_DESCRIPTION =
  "ShowIci connects venues, event planners and local performers (bands, DJs, comedians, magicians). Free, no commission, in French and English. Starting in Montréal.";
