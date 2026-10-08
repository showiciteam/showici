import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600; // rebuild the sitemap at most once an hour

const PUBLIC_PAGES: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }[] = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/shows", priority: 0.9, changeFrequency: "daily" },
  { path: "/performers", priority: 0.9, changeFrequency: "daily" },
  { path: "/venues", priority: 0.9, changeFrequency: "daily" },
  { path: "/events", priority: 0.7, changeFrequency: "daily" },
  { path: "/request", priority: 0.7, changeFrequency: "monthly" },
  { path: "/spotlight", priority: 0.6, changeFrequency: "weekly" },
  { path: "/news", priority: 0.5, changeFrequency: "weekly" },
  { path: "/pricing", priority: 0.5, changeFrequency: "monthly" },
];

/** Published performer, venue and show pages, read with the public key (no session needed). */
async function dynamicPages(): Promise<MetadataRoute.Sitemap> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  try {
    const sb = createClient(url, key, { auth: { persistSession: false } });
    const [performers, venues, shows] = await Promise.all([
      sb.from("performers_view").select("id, created_at").limit(5000),
      sb.from("venues_view").select("id, created_at").limit(5000),
      sb.from("shows").select("id, created_at").eq("status", "live").gte("starts_at", new Date().toISOString()).limit(5000),
    ]);
    const rows = (prefix: string, data: { id: string; created_at: string }[] | null, priority: number) =>
      (data ?? []).map((r) => ({ url: `${SITE_URL}${prefix}/${r.id}`, lastModified: new Date(r.created_at), changeFrequency: "weekly" as const, priority }));
    return [...rows("/performers", performers.data, 0.8), ...rows("/venues", venues.data, 0.8), ...rows("/shows", shows.data, 0.7)];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const fixed = PUBLIC_PAGES.map((p) => ({ url: `${SITE_URL}${p.path === "/" ? "" : p.path}`, lastModified: now, changeFrequency: p.changeFrequency, priority: p.priority }));
  return [...fixed, ...(await dynamicPages())];
}
