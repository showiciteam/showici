/**
 * schema.org structured data (JSON-LD) for search engines: the site, venues, shows and performers.
 * Google uses the Event data for its event listings and the venue data for local results.
 */
import type { Performer, Show, Venue } from "./types";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./site";
import { SOCIAL_URLS } from "./social";

type Ld = Record<string, unknown>;

/** Safe to put inside a <script> tag. */
export const ldJson = (data: Ld | Ld[]) => JSON.stringify(data).replace(/</g, "\\u003c");

const clean = <T extends Ld>(o: T): T => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0))) as T;

const ORG_ID = `${SITE_URL}/#organization`;

export const siteLd = (): Ld[] => [
  { "@context": "https://schema.org", "@type": "Organization", "@id": ORG_ID, name: SITE_NAME, url: SITE_URL, logo: `${SITE_URL}/logo.png`, sameAs: SOCIAL_URLS },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: ["fr-CA", "en-CA"],
    publisher: { "@id": ORG_ID },
  },
];

/** The closest schema.org type for each ShowIci venue type. */
const VENUE_TYPE: Record<string, string> = {
  Bar: "BarOrPub",
  Pub: "BarOrPub",
  Brewery: "Brewery",
  Restaurant: "Restaurant",
  Club: "NightClub",
  "Event hall": "MusicVenue",
};

const venueUrl = (id: string) => `${SITE_URL}/venues/${id}`;
const performerUrl = (id: string) => `${SITE_URL}/performers/${id}`;

function address(v: Venue): Ld {
  return clean({ "@type": "PostalAddress", streetAddress: v.street, addressLocality: v.city, postalCode: v.postalCode, addressRegion: "QC", addressCountry: "CA" });
}

function place(v: Venue): Ld {
  return clean({
    "@type": VENUE_TYPE[v.type] ?? "MusicVenue",
    "@id": `${venueUrl(v.id)}#place`,
    name: v.name,
    url: venueUrl(v.id),
    address: address(v),
    geo: v.lat != null && v.lng != null ? { "@type": "GeoCoordinates", latitude: v.lat, longitude: v.lng } : undefined,
  });
}

export function venueLd(v: Venue): Ld {
  return clean({
    "@context": "https://schema.org",
    ...place(v),
    description: v.description || undefined,
    telephone: v.phone || undefined,
    image: v.photos?.length ? v.photos.slice(0, 5) : v.logo,
    sameAs: (v.links ?? []).map((l) => l.url),
  });
}

/** Solo acts are a Person; bands, duos and troupes are a PerformingGroup. */
function performerNode(p: Performer): Ld {
  return clean({ "@type": p.members > 1 ? "PerformingGroup" : "Person", "@id": `${performerUrl(p.id)}#performer`, name: p.name, url: performerUrl(p.id) });
}

export function performerLd(p: Performer): Ld {
  return clean({
    "@context": "https://schema.org",
    ...performerNode(p),
    description: p.bio || undefined,
    image: p.cover ?? p.photos?.[0] ?? p.logo,
    genre: p.genres,
    knowsLanguage: p.languages,
    homeLocation: p.base ? { "@type": "Place", name: p.base } : undefined,
    sameAs: (p.links ?? []).map((l) => l.url),
  });
}

export function showLd(s: Show, venue?: Venue, performer?: Performer): Ld | null {
  if (!s.startsAt || !venue) return null; // Google needs a real date and place for an Event.
  const start = new Date(s.startsAt);
  const end = s.durationMin ? new Date(start.getTime() + s.durationMin * 60_000) : undefined;
  const free = /free|gratuit/i.test(s.entry);
  return clean({
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    "@id": `${SITE_URL}/shows/${s.id}#event`,
    name: s.title,
    url: `${SITE_URL}/shows/${s.id}`,
    description: s.description || undefined,
    startDate: start.toISOString(),
    endDate: end?.toISOString(),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: place(venue),
    image: performer?.cover ?? performer?.photos?.[0] ?? venue.photos?.[0],
    performer: performer && !s.artistTba ? performerNode(performer) : undefined,
    organizer: clean({ "@type": "Organization", name: venue.name, url: venueUrl(venue.id) }),
    isAccessibleForFree: free || undefined,
    offers: s.ticketUrl
      ? { "@type": "Offer", url: s.ticketUrl, availability: "https://schema.org/InStock" }
      : free
        ? { "@type": "Offer", url: `${SITE_URL}/shows/${s.id}`, price: 0, priceCurrency: "CAD", availability: "https://schema.org/InStock" }
        : undefined,
  });
}

export function JsonLd({ data }: { data: Ld | Ld[] | null }) {
  if (!data) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(data) }} />;
}
