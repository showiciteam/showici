// Data access. Reads from Supabase when it is configured. The sample data in mock.ts is only used in demo mode (no Supabase env vars).
import * as mock from "./mock";
import { getServerSupabase } from "./supabase/server";
import { mediaUrl } from "./media";
import type { EventRequest, Performer, Review, Show, Tone, Venue } from "./types";

const TONES: Tone[] = ["ph-1", "ph-2", "ph-3", "ph-4", "ph-5"];
export const toneFor = (id: string) => TONES[[...id].reduce((a, c) => a + c.charCodeAt(0), 0) % TONES.length];

// Greater Montréal bounding box used to place pins on the illustrated map.
const BOUNDS = { north: 45.75, south: 45.35, west: -74.05, east: -73.35 };
export function mapPosition(lat?: number | null, lng?: number | null) {
  if (lat == null || lng == null) return { x: "50%", y: "50%" };
  const x = ((lng - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * 100;
  const y = ((BOUNDS.north - lat) / (BOUNDS.north - BOUNDS.south)) * 100;
  const clamp = (n: number) => Math.min(95, Math.max(5, n));
  return { x: `${clamp(x).toFixed(1)}%`, y: `${clamp(y).toFixed(1)}%` };
}

/** "3 h ago", "yesterday", "4 days ago"… */
export function timeAgo(iso: string) {
  const mins = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} h ago`;
  const days = Math.round(hours / 24);
  return days === 1 ? "yesterday" : `${days} days ago`;
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
    ownerId: r.owner,
    photos: photoUrls(r.performer_photos),
    links: linkList([["Instagram", r.instagram], ["Facebook", r.facebook], ["TikTok", r.tiktok], ["Music", r.music_url], ["Website", r.website]]),
  };
}

function toVenue(r: any): Venue {
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
    description: r.description ?? "",
    tone: toneFor(r.id),
    map: mapPosition(r.lat, r.lng),
    ownerId: r.owner,
    street: r.street ?? "",
    photos: photoUrls(r.venue_photos),
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

export async function getPerformers(opts: NearOpts = {}): Promise<Performer[]> {
  const sb = await getServerSupabase();
  if (!sb) return mock.performers;
  const { data, error } = await sb.rpc("performers_nearby", {
    p_lat: opts.lat ?? MONTREAL.lat,
    p_lng: opts.lng ?? MONTREAL.lng,
    p_radius_km: opts.radiusKm ?? 50,
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
    p_radius_km: opts.radiusKm ?? 50,
  });
  if (error) console.error("getVenues", error.message);
  return (data ?? []).map(toVenue);
}

export async function getVenue(id: string): Promise<Venue | undefined> {
  const sb = await getServerSupabase();
  if (!sb) return mock.venues.find((v) => v.id === id) ?? mock.venues[0];
  const { data } = await sb.from("venues_view").select("*, venue_photos(*)").eq("id", id).maybeSingle();
  return data ? toVenue(data) : undefined;
}

const SHOW_TZ = "America/Toronto"; // show times are always displayed in Montréal time

/* eslint-disable @typescript-eslint/no-explicit-any */
function toShow(r: any): Show {
  const d = new Date(r.starts_at);
  const long = d.toLocaleDateString("en-CA", { weekday: "long", month: "long", day: "numeric", timeZone: SHOW_TZ });
  const clock = (x: Date) => x.toLocaleTimeString("en-CA", { hour: "numeric", minute: "2-digit", timeZone: SHOW_TZ });
  return {
    id: r.id,
    performerId: r.performer_id ?? "",
    venueId: r.venue_id,
    title: r.title || r.performer_name,
    genre: r.genre ?? "",
    dayLabel: long,
    day: d.toLocaleDateString("en-CA", { weekday: "short", timeZone: SHOW_TZ }).replace(".", "").toUpperCase(),
    date: d.toLocaleDateString("en-CA", { day: "numeric", timeZone: SHOW_TZ }),
    longDate: long,
    doors: r.doors_at ? clock(new Date(r.doors_at)) : "",
    time: clock(d),
    entry: r.entry ?? "Free entry",
    tone: toneFor(r.id),
    ticketUrl: r.ticket_url ?? undefined,
    description: r.description_en || r.description_fr || "",
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
  return (data ?? []).map(toShow);
}

export async function getShow(id: string): Promise<Show | undefined> {
  const sb = await getServerSupabase();
  if (!sb) return mock.shows.find((s) => s.id === id) ?? mock.shows[0];
  const { data } = await sb.from("shows").select("*").eq("id", id).eq("status", "live").maybeSingle();
  return data ? toShow(data) : undefined;
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
  const roleLabel: Record<string, string> = { venue: "Venue", performer: "Performer", planner: "Private event", admin: "ShowIci" };
  return (data ?? []).map((r: any) => {
    const who = Array.isArray(r.reviewer) ? r.reviewer[0] : r.reviewer;
    return {
      id: r.id,
      author: who?.display_name || "ShowIci member",
      context: roleLabel[who?.role] ?? "",
      rating: r.rating,
      body: r.body ?? "",
      tags: r.tags ?? [],
      date: new Date(r.created_at).toLocaleDateString("en-CA", { month: "short", year: "numeric" }),
    };
  });
}

/* eslint-enable @typescript-eslint/no-explicit-any */

export const getBigEvents = async () => mock.bigEvents; // Replace with the Ticketmaster Discovery API (see /api/big-events).
export const getStories = async () => mock.stories;
export const getNews = async () => mock.news;
export const getThreads = async () => mock.threads; // Sample threads for demo mode. Live inboxes use getInbox() in dashboard.ts.
