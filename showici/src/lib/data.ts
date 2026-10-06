// Data access. Reads from Supabase when it is configured, otherwise falls back to the sample data in mock.ts.
import * as mock from "./mock";
import { getServerSupabase } from "./supabase/server";
import type { Performer, Show, Tone, Venue } from "./types";

const TONES: Tone[] = ["ph-1", "ph-2", "ph-3", "ph-4", "ph-5"];
const toneFor = (id: string) => TONES[[...id].reduce((a, c) => a + c.charCodeAt(0), 0) % TONES.length];

// Greater Montréal bounding box used to place pins on the illustrated map.
const BOUNDS = { north: 45.75, south: 45.35, west: -74.05, east: -73.35 };
export function mapPosition(lat?: number | null, lng?: number | null) {
  if (lat == null || lng == null) return { x: "50%", y: "50%" };
  const x = ((lng - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * 100;
  const y = ((BOUNDS.north - lat) / (BOUNDS.north - BOUNDS.south)) * 100;
  const clamp = (n: number) => Math.min(95, Math.max(5, n));
  return { x: `${clamp(x).toFixed(1)}%`, y: `${clamp(y).toFixed(1)}%` };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
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
  if (error || !data?.length) return mock.performers;
  return data.map(toPerformer);
}

export async function getPerformer(id: string): Promise<Performer | undefined> {
  const sb = await getServerSupabase();
  if (!sb) return mock.performers.find((p) => p.id === id) ?? mock.performers[0];
  const { data } = await sb.from("performers_view").select("*, performer_videos(*)").eq("id", id).maybeSingle();
  return data ? toPerformer(data) : mock.performers.find((p) => p.id === id);
}

export async function getVenues(opts: NearOpts = {}): Promise<Venue[]> {
  const sb = await getServerSupabase();
  if (!sb) return mock.venues;
  const { data, error } = await sb.rpc("venues_nearby", {
    p_lat: opts.lat ?? MONTREAL.lat,
    p_lng: opts.lng ?? MONTREAL.lng,
    p_radius_km: opts.radiusKm ?? 50,
  });
  if (error || !data?.length) return mock.venues;
  return data.map(toVenue);
}

export async function getVenue(id: string): Promise<Venue | undefined> {
  const sb = await getServerSupabase();
  if (!sb) return mock.venues.find((v) => v.id === id) ?? mock.venues[0];
  const { data } = await sb.from("venues_view").select("*").eq("id", id).maybeSingle();
  return data ? toVenue(data) : mock.venues.find((v) => v.id === id);
}

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
  if (error || !data?.length) return mock.shows;
  return data.map((r) => {
    const d = new Date(r.starts_at);
    return {
      id: r.id,
      performerId: r.performer_id ?? "",
      venueId: r.venue_id,
      title: r.title || r.performer_name,
      genre: r.genre ?? "",
      dayLabel: d.toLocaleDateString("en-CA", { weekday: "long", month: "long", day: "numeric" }),
      day: d.toLocaleDateString("en-CA", { weekday: "short" }).toUpperCase(),
      date: String(d.getDate()),
      longDate: d.toLocaleDateString("en-CA", { weekday: "long", month: "long", day: "numeric" }),
      doors: r.doors_at ? new Date(r.doors_at).toLocaleTimeString("en-CA", { hour: "numeric", minute: "2-digit" }) : "",
      time: d.toLocaleTimeString("en-CA", { hour: "numeric", minute: "2-digit" }),
      entry: r.entry ?? "Free entry",
      tone: toneFor(r.id),
      ticketUrl: r.ticket_url ?? undefined,
    } satisfies Show;
  });
}

export async function getShow(id: string): Promise<Show | undefined> {
  const all = await getShows();
  return all.find((s) => s.id === id) ?? all[0];
}

export const getBigEvents = async () => mock.bigEvents; // Replace with the Ticketmaster Discovery API (see /api/big-events).
export const getEventRequests = async () => mock.eventRequests;
export const getStories = async () => mock.stories;
export const getNews = async () => mock.news;
export const getThreads = async () => mock.threads;
