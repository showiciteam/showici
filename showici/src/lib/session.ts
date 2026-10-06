import { redirect } from "next/navigation";
import { cache } from "react";
import { getServerSupabase } from "./supabase/server";

export type Role = "venue" | "performer" | "planner" | "admin";

export interface SessionUser {
  id: string;
  email: string;
  role: Role;
  name: string;
}

/** Where each kind of account lands after logging in. */
export const homeFor: Record<Role, string> = {
  venue: "/dashboard/venue",
  performer: "/dashboard/performer",
  planner: "/request",
  admin: "/admin",
};

/** The signed-in user with their profile, or null (signed out or demo mode). Cached per request. */
export const getSessionUser = cache(async (): Promise<SessionUser | null> => {
  const sb = await getServerSupabase();
  if (!sb) return null;
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) return null;
  const { data: profile } = await sb.from("profiles").select("role, display_name").eq("id", user.id).maybeSingle();
  const role = (profile?.role ?? user.user_metadata?.role ?? "planner") as Role;
  const name = profile?.display_name || user.user_metadata?.display_name || user.email?.split("@")[0] || "Account";
  return { id: user.id, email: user.email ?? "", role, name };
});

/**
 * For signed-in pages. Returns null in demo mode (no Supabase keys) so pages can show sample data.
 * Signed-out visitors go to /login; people on another role's page go to their own home (admins can see everything).
 */
export async function requireUser(roles?: Role[]): Promise<SessionUser | null> {
  const sb = await getServerSupabase();
  if (!sb) return null;
  const user = await getSessionUser();
  if (!user) redirect("/login");
  if (roles && user.role !== "admin" && !roles.includes(user.role)) redirect(homeFor[user.role]);
  return user;
}
