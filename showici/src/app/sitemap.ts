import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import { stories } from "@/lib/mock";
import { LANGS, localize } from "@/lib/lang";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600; // rebuild the sitemap at most once an hour

type Freq = "daily" | "weekly" | "monthly";

const PUBLIC_PAGES: { path: string; priority: number; changeFrequency: Freq }[] = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/shows", priority: 0.9, changeFrequency: "daily" },
  { path: "/performers", priority: 0.9, changeFrequency: "daily" },
  { path: "/venues", priority: 0.9, changeFrequency: "daily" },
  { path: "/events", priority: 0.7, changeFrequency: "daily" },
  { path: "/request", priority: 0.7, changeFrequency: "monthly" },
  { path: "/spotlight", priority: 0.6, changeFrequency: "weekly" },
  { path: "/news", priority: 0.5, changeFrequency: "weekly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/terms", priority: 0.2, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "monthly" },
];

/** One sitemap entry per page, in French, with its English version listed as an alternate. */
function entry(path: string, lastModified: Date, changeFrequency: Freq, priority: number): MetadataRoute.Sitemap[number] {
  const languages = Object.fromEntries(LANGS.map((l) => [`${l}-CA`, `${SITE_URL}${localize(path, l)}`]));
  return { url: `${SITE_URL}${path === "/" ? "" : path}`, lastModified, changeFrequency, priority, alternates: { languages } };
}

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
      (data ?? []).map((r) => entry(`${prefix}/${r.id}`, new Date(r.created_at), "weekly", priority));
    return [...rows("/performers", performers.data, 0.8), ...rows("/venues", venues.data, 0.8), ...rows("/shows", shows.data, 0.7)];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const fixed = PUBLIC_PAGES.map((p) => entry(p.path, now, p.changeFrequency, p.priority));
  const articles = stories.filter((s) => s.article && !s.draft).map((s) => entry(`/spotlight/${s.slug}`, now, "monthly", 0.7));
  return [...fixed, ...articles, ...(await dynamicPages())];
}
