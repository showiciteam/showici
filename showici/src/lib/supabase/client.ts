import { createBrowserClient } from "@supabase/ssr";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True once the Supabase keys are set in .env.local (or on the host). */
export const supabaseEnabled = Boolean(url && key);

/** Browser client. Returns null in demo mode (no keys yet). */
export function getBrowserSupabase() {
  if (!supabaseEnabled) return null;
  return createBrowserClient(url!, key!);
}
