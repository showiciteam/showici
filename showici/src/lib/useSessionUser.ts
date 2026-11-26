"use client";

import { useEffect, useState } from "react";
import { getBrowserSupabase } from "@/lib/supabase/client";

export type HeaderUser = { name: string; home: string };

const HOME: Record<string, string> = {
  venue: "/dashboard/venue",
  performer: "/dashboard/performer",
  planner: "/dashboard/planner",
  admin: "/admin",
};

/**
 * The signed-in visitor for the site header, looked up in the browser.
 * Public pages stay the same for everyone, so they can be served from cache.
 */
export function useSessionUser(): HeaderUser | null {
  const [user, setUser] = useState<HeaderUser | null>(null);

  useEffect(() => {
    const sb = getBrowserSupabase();
    if (!sb) return;
    let active = true;

    const load = async () => {
      const { data } = await sb.auth.getSession();
      const account = data.session?.user;
      if (!account) return active && setUser(null);
      const { data: profile } = await sb.from("profiles").select("role, display_name").eq("id", account.id).maybeSingle();
      const role = profile?.role ?? account.user_metadata?.role ?? "planner";
      const name = profile?.display_name || account.user_metadata?.display_name || account.email?.split("@")[0] || "Account";
      if (active) setUser({ name, home: HOME[role] ?? HOME.planner });
    };

    load();
    const { data: listener } = sb.auth.onAuthStateChange(() => load());
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return user;
}
