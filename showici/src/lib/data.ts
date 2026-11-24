// Data access. Reads from Supabase when it is configured. The sample data in mock.ts is only used in demo mode (no Supabase env vars).
import * as mock from "./mock";
import { getServerSupabase } from "./supabase/server";
import { mediaUrl } from "./media";
import type { BigEvent, EventRequest, Performer, Review, Show, Tone, Venue } from "./types";
import { getTicketmasterEvents } from "./ticketmaster";
import { getLang } from "./lang";
import type { Lang } from "./locale";

const TONES: Tone[] = ["ph-1", "ph-2", "ph-3", "ph-4", "ph-5"];
export const toneFor = (id: string) => TONES[[...id].reduce((a, c) => a + c.charCodeAt(0), 0) % TONES.length];

// Greater Montréal bounding box used to place demo-mode pins on the map.
const BOUNDS = { north: 45.75, south: 45.35, west: -74.05, east: -73.35 };
export function mapPosition(lat?: number | null, lng?: number | null) {
  if (lat == null || lng == null) return { x: "50%", y: "50%" };
  const x = ((lng - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * 100;
  const y = ((BOUNDS.north - lat) / (BOUNDS.north - BOUNDS.south)) * 100;
  const clamp = (n: number) => Math.min(95, Math.max(5, n));
  return { x: `${clamp(x).toFixed(1)}%`, y: `${clamp(y).toFixed(1)}%` };
}

/** "3 h ago", "yesterday", "4 days ago"… */
export function timeAgo(iso: string, lang: Lang = "en") {
  const fr = lang === "fr";
  const mins = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (mins < 1) return fr ? "à l'instant" : "just now";
  if (mins < 60) return fr ? `il y a ${mins} min` : `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return fr ? `il y a ${hours} h` : `${hours} h ago`;
  const days = Math.round(hours / 24);
  return days === 1 ? (fr ? "hier" : "yesterday") : fr ? `il y a ${days} jours` : `${days} days ago`;
}

/**
 * Descriptions written by ShowIci are stored as "English\n\nFrench". Returns the part for the page language;
 * text written by an owner in one language is shown as is.
 */
const UNCONFIRMED = /\s*Live shows not confirmed\.\s*\/\s*Spectacles à confirmer\.\s*$/;
export function pickBilingual(text: string, lang: Lang, bilingual: boolean) {
  if (!bilingual || !text.includes("\n\n")) return text;
  // Some listings end with a two-language note that live shows aren't confirmed: keep it, in the page language.
  const unconfirmed = UNCONFIRMED.test(text);
  const [en, ...rest] = text.replace(UNCONFIRMED, "").split("\n\n");
  const fr = rest.join("\n\n").trim();
  const body = lang === "fr" && fr ? fr : en.trim();
  return unconfirmed ? `${body} ${lang === "fr" ? "Spectacles à confirmer." : "Live shows not confirmed."}` : body;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const photoUrls = (rows: any[] | undefined) =>
  (rows ?? []).slice().sort((a: any, b: any) => (a.position ?? 0) - (b.position ?? 0)).map((p: any) => mediaUrl(p.storage_path)).filter(Boolean);

const linkList = (pairs: [string, string | null | undefined][]) =>
  pairs.filter(([, url]) => url && /^https?:\/\//.test(url)).map(([label, url]) => ({ label, url: url as string }));

function toPerformer(r: any): Performer {
  const videos = (r.performer_videos ?? []).sort((a: any, b: any) => (a.position ?? 0) - (b.position ?? 0));
  return {
    id: r.id,
    name: r.name,
    initials: String(r.name).replace(/[^A-Za-zÀ-ÿ ]/g, "").split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase() || "?",
    actType: r.act_type,
    genres: r.genres ?? [],
    repertoire: r.repertoire ?? "Covers",
    base: r.base_city ?? "",
    travelKm: r.travel_km ?? 50,
    distanceKm: Math.round(r.distance_km ?? 0),
    eventTypes: r.event_types ?? [],
    languages: r.languages ?? [],
    members: r.members ?? 1,
    setLength: r.set_length ?? "",
    feeRange: r.fee_range ?? "On request",
    rating: Number(r.rating ?? 0),
    reviewCount: r.review_count ?? 0,
    verified: !!r.verified,
    available: r.available ?? true,
    bio: r.bio ?? "",
    videos: videos.map((v: any) => ({ title: v.title, length: v.length ?? "", featured: v.featured, url: v.youtube_url })),
    tone: toneFor(r.id),
    map: mapPosition(r.lat, r.lng),
    lat: r.lat ?? undefined,
    lng: r.lng ?? undefined,
    ownerId: r.owner,
    photos: photoUrls(r.performer_photos),
    cover: r.cover_path ? mediaUrl(r.cover_path) : undefined,
    logo: r.logo_path ? mediaUrl(r.logo_path) : undefined,
    links: linkList([["Instagram", r.instagram], ["Facebook", r.facebook], ["TikTok", r.tiktok], ["Music", r.music_url], ["Website", r.website]]),
  };
}

function toVenue(r: any, lang: Lang = "en"): Venue {
  // Listings ShowIci added (not yet claimed) carry an English and a French description.
  const bilingual = !r.owner && /^(showici|osm):/.test(r.source_ref ?? "");
  return {
    id: r.id,
    name: r.name,
    type: r.type,
    area: r.area ?? "",
    city: r.city ?? "",
    distanceKm: Math.round(r.distance_km ?? 0),
    capacity: r.capacity ?? "",
    books: r.books ?? [],
    genres: r.genres ?? [],
    nights: r.nights ?? "",
    leadTime: r.lead_time ?? "",
    feeRange: r.fee_range ?? "",
    equipment: r.equipment ?? [],
    openToNewActs: !!r.open_to_new_acts,
    rating: Number(r.rating ?? 0),
    description: pickBilingual(r.description ?? "", lang, bilingual),
    slug: r.slug ?? undefined,
    tone: toneFor(r.id),
    map: mapPosition(r.lat, r.lng),
    lat: r.lat ?? undefined,
    lng: r.lng ?? undefined,
    ownerId: r.owner ?? undefined,
    claimed: Boolean(r.owner),
    phone: r.phone ?? "",
    sourceRef: r.source_ref ?? undefined,
    street: r.street ?? "",
    postalCode: r.postal_code ?? undefined,
    photos: photoUrls(r.venue_photos),
    logo: r.logo_path ? mediaUrl(r.logo_path) : undefined,
    videos: (r.venue_videos ?? []).slice().sort((a: any, b: any) => (a.position ?? 0) - (b.position ?? 0)).map((v: any) => ({ title: v.title ?? "", featured: !!v.featured, url: v.youtube_url })),
    links: linkList([["Website", r.website], ["Instagram", r.instagram], ["Facebook", r.facebook], ["YouTube", r.youtube_url]]),
  };
}

function toEventRequest(r: any): EventRequest {
  const date = r.event_date
    ? new Date(`${r.event_date}T12:00:00`).toLocaleDateString("en-CA", { weekday: "short", month: "short", day: "numeric" })
    : "Date TBD";
  return {
    id: r.id,
    type: r.event_type,
    date,
    city: r.city ?? "",
    guests: r.guests ? (/guest/i.test(r.guests) ? r.guests : `${r.guests} guests`) : "Guests TBD",
    wants: (r.wants ?? []).join(", ") || "Any act",
    budget: r.budget || "Budget TBD",
    language: r.language || "Any language",
    note: r.note ?? "",
    postedAgo: timeAgo(r.created_at),
    replies: "",
    tone: toneFor(r.id),
    plannerId: r.planner_id,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export interface NearOpts {
  lat?: number;
  lng?: number;
  radiusKm?: number;
}
const MONTREAL = { lat: 45.5019, lng: -73.5674 };
/** Default reach: all of Québec (and nearby border towns). Distances are still measured from Montréal. */
const QUEBEC_WIDE_KM = 2000;

export async function getPerformers(opts: NearOpts = {}): Promise<Performer[]> {
  const sb = await getServerSupabase();
  if (!sb) return mock.performers;
  const { data, error } = await sb.rpc("performers_nearby", {
    p_lat: opts.lat ?? MONTREAL.lat,
    p_lng: opts.lng ?? MONTREAL.lng,
    p_radius_km: opts.radiusKm ?? QUEBEC_WIDE_KM,
  });
  if (error) console.error("getPerformers", error.message);
  return (data ?? []).map(toPerformer);
}

export async function getPerformer(id: string): Promise<Performer | undefined> {
  const sb = await getServerSupabase();
  if (!sb) return mock.performers.find((p) => p.id === id) ?? mock.performers[0];
  const { data } = await sb.from("performers_view").select("*, performer_videos(*), performer_photos(*)").eq("id", id).maybeSingle();
  return data ? toPerformer(data) : undefined;
}

export async function getVenues(opts: NearOpts = {}): Promise<Venue[]> {
  const sb = await getServerSupabase();
  if (!sb) return mock.venues;
  const { data, error } = await sb.rpc("venues_nearby", {
    p_lat: opts.lat ?? MONTREAL.lat,
    p_lng: opts.lng ?? MONTREAL.lng,
    p_radius_km: opts.radiusKm ?? QUEBEC_WIDE_KM,
  });
  if (error) console.error("getVenues", error.message);
  const lang = await getLang();
  return (data ?? []).map((r: unknown) => toVenue(r, lang));
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** A venue by its readable address (e.g. "bar-de-courcelle-montreal") or, for old links, its id. */
export async function getVenue(idOrSlug: string): Promise<Venue | undefined> {
  const sb = await getServerSupabase();
  if (!sb) return mock.venues.find((v) => v.id === idOrSlug) ?? mock.venues[0];
  const { data } = await sb
    .from("venues_view")
    .select("*, venue_photos(*), venue_videos(*)")
    .eq(UUID.test(idOrSlug) ? "id" : "slug", idOrSlug)
    .maybeSingle();
  return data ? toVenue(data, await getLang()) : undefined;
}

const SHOW_TZ = "America/Toronto"; // show times are displayed in Eastern time (Montréal, Québec City)

/* eslint-disable @typescript-eslint/no-explicit-any */
/** Entry labels picked on the post-a-show form, in French. Anything else the venue typed is shown as is. */
const ENTRY_FR: Record<string, string> = { "Free entry": "Entrée libre", Free: "Gratuit", "Cover charge": "Droit d'entrée", "Tickets": "Billets", "Pay what you can": "Contribution volontaire" };
export const entryLabel = (entry: string, lang: Lang) => (lang === "fr" ? ENTRY_FR[entry] ?? entry : entry);

function toShow(r: any, lang: Lang = "en"): Show {
  const d = new Date(r.starts_at);
  const loc = lang === "fr" ? "fr-CA" : "en-CA";
  // A ShowIci act only appears once they accept the booking; until then the show says "Artist TBA".
  const tba = Boolean(r.performer_id) && (r.performer_status ?? "accepted") !== "accepted";
  const ownTitle = r.title && r.title !== r.performer_name ? r.title : "";
  const long = d.toLocaleDateString(loc, { weekday: "long", month: "long", day: "numeric", timeZone: SHOW_TZ });
  const clock = (x: Date) => x.toLocaleTimeString(loc, { hour: "numeric", minute: "2-digit", timeZone: SHOW_TZ });
  return {
    id: r.id,
    performerId: tba ? "" : r.performer_id ?? "",
    venueId: r.venue_id,
    title: tba ? ownTitle || (lang === "fr" ? "Artiste à confirmer" : "Artist TBA") : r.title || r.performer_name,
    artistTba: tba,
    genre: r.genre ?? "",
    dayLabel: long.charAt(0).toUpperCase() + long.slice(1),
    day: d.toLocaleDateString(loc, { weekday: "short", timeZone: SHOW_TZ }).replace(".", "").toUpperCase(),
    date: d.toLocaleDateString(loc, { day: "numeric", timeZone: SHOW_TZ }),
    longDate: long,
    doors: r.doors_at ? clock(new Date(r.doors_at)) : "",
    time: clock(d),
    entry: entryLabel(r.entry ?? "Free entry", lang),
    tone: toneFor(r.id),
    ticketUrl: r.ticket_url ?? undefined,
    description: (lang === "fr" ? r.description_fr || r.description_en : r.description_en || r.description_fr) || "",
    startsAt: r.starts_at,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function getShows(): Promise<Show[]> {
  const sb = await getServerSupabase();
  if (!sb) return mock.shows;
  const { data, error } = await sb
    .from("shows")
    .select("*")
    .eq("status", "live")
    .gte("starts_at", new Date().toISOString())
    .order("starts_at")
    .limit(50);
  if (error) console.error("getShows", error.message);
  const lang = await getLang();
  return (data ?? []).map((r: unknown) => toShow(r, lang));
}

export async function getShow(id: string): Promise<Show | undefined> {
  const sb = await getServerSupabase();
  if (!sb) return mock.shows.find((s) => s.id === id) ?? mock.shows[0];
  const { data } = await sb.from("shows").select("*").eq("id", id).eq("status", "live").maybeSingle();
  return data ? toShow(data, await getLang()) : undefined;
}

/** Open private-event requests, soonest first. Only signed-in performers (and the planner) can read them. */
export async function getEventRequests(): Promise<EventRequest[]> {
  const sb = await getServerSupabase();
  if (!sb) return mock.eventRequests;
  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await sb
    .from("event_requests")
    .select("*")
    .eq("status", "open")
    .gte("event_date", today)
    .order("event_date")
    .limit(50);
  if (error || !data) return [];
  return data.map(toEventRequest);
}

export async function getEventRequest(id: string): Promise<EventRequest | undefined> {
  const sb = await getServerSupabase();
  if (!sb) return mock.eventRequests.find((r) => r.id === id);
  const { data } = await sb.from("event_requests").select("*").eq("id", id).maybeSingle();
  return data ? toEventRequest(data) : undefined;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/** Reviews written about a profile (performer or venue owner), newest first. */
export async function getReviewsFor(profileId?: string): Promise<Review[]> {
  const sb = await getServerSupabase();
  if (!sb || !profileId) return [];
  const { data } = await sb
    .from("reviews")
    .select("id, rating, tags, body, created_at, reviewer:profiles!reviews_reviewer_id_fkey(display_name, role)")
    .eq("subject_id", profileId)
    .order("created_at", { ascending: false })
    .limit(20);
  const lang = await getLang();
  const fr = lang === "fr";
  const roleLabel: Record<string, string> = fr
    ? { venue: "Salle", performer: "Artiste", planner: "Événement privé", admin: "ShowIci" }
    : { venue: "Venue", performer: "Performer", planner: "Private event", admin: "ShowIci" };
  return (data ?? []).map((r: any) => {
    const who = Array.isArray(r.reviewer) ? r.reviewer[0] : r.reviewer;
    return {
      id: r.id,
      author: who?.display_name || (fr ? "Membre ShowIci" : "ShowIci member"),
      context: roleLabel[who?.role] ?? "",
      rating: r.rating,
      body: r.body ?? "",
      tags: r.tags ?? [],
      date: new Date(r.created_at).toLocaleDateString(fr ? "fr-CA" : "en-CA", { month: "short", year: "numeric" }),
    };
  });
}

/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Big events (concerts, comedy, theatre, festivals; no sports) sold on Ticketmaster in Québec.
 * Without a TICKETMASTER_API_KEY the site shows the sample cards from mock.ts.
 */
export async function getBigEvents(): Promise<BigEvent[]> {
  const key = process.env.TICKETMASTER_API_KEY;
  const lang = await getLang();
  if (!key) return mock.bigEvents;
  try {
    return (await getTicketmasterEvents(key)).map((e) => localizeEvent(e, lang));
  } catch (e) {
    console.error("getBigEvents", e);
    return [];
  }
}
/** Ticketmaster cards in French: day, month, time and price. The category stays English (it is the filter key). */
function localizeEvent(e: BigEvent, lang: Lang): BigEvent {
  if (lang !== "fr" || !e.startDate) return e;
  const d = new Date(`${e.startDate}T12:00:00`);
  const time = e.localTime ? e.localTime.slice(0, 5).replace(/^0/, "").replace(":", " h ") : "";
  return {
    ...e,
    day: d.toLocaleDateString("fr-CA", { weekday: "short" }).replace(".", "").toUpperCase(),
    month: d.toLocaleDateString("fr-CA", { month: "short" }).replace(".", ""),
    time: e.localTime ? time : e.time === "Time TBA" ? "Heure à confirmer" : e.time,
    price: e.priceMin ? `À partir de ${e.priceMin} $` : "",
  };
}

export const getStories = async () => mock.stories;
export const getNews = async () => mock.news;
export const getThreads = async () => mock.threads; // Sample threads for demo mode. Live inboxes use getInbox() in dashboard.ts.
