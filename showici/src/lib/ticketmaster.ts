import type { BigEvent, Tone } from "./types";

/**
 * Upcoming Ticketmaster events in Québec, from the free Discovery API (developer.ticketmaster.com).
 * Needs TICKETMASTER_API_KEY in the environment. Results are cached for an hour, so the site makes
 * a handful of calls per hour at most, far under the default 5,000 calls/day quota.
 * Once ShowIci's Impact publisher ID is added to the Ticketmaster developer account, the event
 * URLs returned here already carry the affiliate tracking.
 */
const API = "https://app.ticketmaster.com/discovery/v2/events.json";
const PAGE_SIZE = 200; // the API's maximum; it never returns past the 1,000th result (size × page < 1000)
const PAGES = 3; // up to 600 events
const DAYS_AHEAD = 120;
const TONES: Tone[] = ["ph-1", "ph-2", "ph-3", "ph-4", "ph-5"];

/* eslint-disable @typescript-eslint/no-explicit-any */
function category(e: any): string {
  const c = e.classifications?.find((x: any) => x.primary) ?? e.classifications?.[0];
  const segment = c?.segment?.name ?? "";
  const genre = c?.genre?.name ?? "";
  const sub = c?.subGenre?.name ?? "";
  if (/festival/i.test(`${genre} ${sub} ${e.name}`)) return "Festival";
  if (segment === "Music") return "Concert";
  if (segment === "Sports") return "Sports";
  if (/comedy/i.test(`${genre} ${sub}`)) return "Comedy";
  if (/family|children/i.test(`${segment} ${genre} ${sub}`)) return "Family";
  if (segment === "Arts & Theatre") return "Theatre";
  return "Event";
}

/** Listings that aren't shows: building tours, meal or lounge packages, parking, ticket upgrades. */
const NOT_A_SHOW = /visites? guid|guided tour|\brepas\b|restaurant|salon des|lounge|parking|stationnement|surclassement|upgrade|forfait|package|gift card|carte-cadeau/i;
function isShow(e: any) {
  const type = e.classifications?.map((c: any) => `${c.type?.name ?? ""} ${c.subType?.name ?? ""}`).join(" ") ?? "";
  return !NOT_A_SHOW.test(e.name ?? "") && !/upsell|parking|add-on|merchandise/i.test(type);
}

const CITY_FIX: Record<string, string> = { montreal: "Montréal", quebec: "Québec", "quebec city": "Québec", "trois-rivieres": "Trois-Rivières", levis: "Lévis" };
/** "GATINEAU" → "Gatineau", "Montreal" → "Montréal". */
function cityName(raw?: string) {
  if (!raw) return "";
  const fixed = CITY_FIX[raw.trim().toLowerCase()];
  if (fixed) return fixed;
  const small = new Set(["sur", "de", "du", "des", "la", "le", "les", "en", "aux"]);
  return raw.trim().toLowerCase().split(/([\s-])/).map((w, i) => (i > 0 && small.has(w)) || /^[\s-]$/.test(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)).join("");
}

function clock(t?: string) {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  if (!Number.isFinite(h)) return "";
  return `${h % 12 || 12}:${String(m || 0).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`;
}

function bestImage(images: any[] = []): string | undefined {
  const wide = images.filter((i) => i.ratio === "16_9" && !i.fallback).sort((a, b) => a.width - b.width);
  return (wide.find((i) => i.width >= 640) ?? wide[wide.length - 1] ?? images[0])?.url;
}

function toEvent(e: any, i: number): BigEvent | null {
  const localDate: string | undefined = e.dates?.start?.localDate;
  if (!localDate || !e.url || !isShow(e)) return null;
  const d = new Date(`${localDate}T12:00:00`);
  const venue = e._embedded?.venues?.[0];
  const min = e.priceRanges?.[0]?.min;
  return {
    id: e.id,
    category: category(e),
    name: e.name,
    venue: venue?.name ?? "",
    city: cityName(venue?.city?.name),
    lat: venue?.location?.latitude ? Number(venue.location.latitude) : undefined,
    lng: venue?.location?.longitude ? Number(venue.location.longitude) : undefined,
    day: d.toLocaleDateString("en-CA", { weekday: "short" }).replace(".", "").toUpperCase(),
    date: String(d.getDate()),
    month: d.toLocaleDateString("en-CA", { month: "short" }).replace(".", ""),
    startDate: localDate,
    time: e.dates?.start?.timeTBA || e.dates?.start?.noSpecificTime ? "Time TBA" : clock(e.dates?.start?.localTime),
    price: typeof min === "number" && min > 0 ? `From $${Math.round(min)}` : "",
    tone: TONES[i % TONES.length],
    url: e.url,
    image: bestImage(e.images),
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/** Ticketmaster's time format: 2026-10-28T14:00:00Z (no milliseconds). */
const tmTime = (d: Date) => d.toISOString().replace(/\.\d{3}Z$/, "Z");

/** Upcoming events in Québec, soonest first. Shows that run several nights appear once, with a count of extra dates. */
export async function getTicketmasterEvents(apiKey: string): Promise<BigEvent[]> {
  // Rounded down to the hour so every visitor in that hour shares the same cached call.
  const now = new Date(Math.floor(Date.now() / 3600000) * 3600000);
  const until = new Date(now.getTime() + DAYS_AHEAD * 86400000);
  const raw: unknown[] = [];
  for (let page = 0; page < PAGES; page++) {
    const q = new URLSearchParams({
      apikey: apiKey,
      countryCode: "CA",
      stateCode: "QC",
      startDateTime: tmTime(now),
      endDateTime: tmTime(until),
      sort: "date,asc",
      size: String(PAGE_SIZE),
      page: String(page),
      locale: "*",
    });
    const res = await fetch(`${API}?${q}`, { next: { revalidate: 3600, tags: ["ticketmaster"] } });
    if (!res.ok) {
      console.error("Ticketmaster", res.status, (await res.text()).slice(0, 200));
      break;
    }
    const data = await res.json();
    raw.push(...(data._embedded?.events ?? []));
    const totalPages = data.page?.totalPages ?? 0;
    if (page + 1 >= totalPages) break;
  }

  // One card per show: group the same name at the same venue.
  const seen = new Map<string, BigEvent>();
  raw.forEach((e, i) => {
    const ev = toEvent(e, i);
    if (!ev) return;
    const key = `${ev.name.toLowerCase()}|${ev.venue.toLowerCase()}`;
    const first = seen.get(key);
    if (first) first.moreDates = (first.moreDates ?? 0) + 1;
    else seen.set(key, ev);
  });
  return [...seen.values()];
}
