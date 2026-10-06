import { supabaseEnabled } from "@/lib/supabase/client";

/** Shown on every page while the Supabase keys are missing, so nobody mistakes the demo for the live site. */
export function DemoBanner() {
  if (supabaseEnabled) return null;
  return (
    <div role="status" className="bg-brass px-4 py-2 text-center text-sm font-bold text-navy">
      Demo mode · Mode démo: Supabase isn&apos;t connected, so sign-ups and changes are not saved.
    </div>
  );
}
