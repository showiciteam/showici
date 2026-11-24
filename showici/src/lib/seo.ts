import type { Venue } from "./types";

/**
 * ShowIci listings that aren't claimed and have no upcoming show stay out of search results when they're
 * too thin to be useful (no street address or barely any description). They become indexable on their own
 * once they're filled in, claimed or get a show.
 */
export function isThinVenue(v: Pick<Venue, "claimed" | "street" | "description">, hasShows: boolean) {
  if (v.claimed !== false || hasShows) return false;
  return !v.street || (v.description ?? "").replace(/Live shows not confirmed\.|Spectacles à confirmer\./g, "").trim().length < 60;
}

/** Venue page address: the readable slug when there is one, the id otherwise (demo data, old rows). */
export const venueHref = (v: { id: string; slug?: string }) => `/venues/${v.slug ?? v.id}`;
