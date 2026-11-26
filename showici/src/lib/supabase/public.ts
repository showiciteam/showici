import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Signed-out client for public listings (the map, venue and artist directories).
 * It reads no cookies, so its results can be cached and shared by every visitor.
 */
export function getPublicSupabase() {
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
