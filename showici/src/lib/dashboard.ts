// Live data for signed-in pages (dashboards, inbox, admin). Only called when Supabase is configured.
import { timeAgo, toneFor } from "./data";
import { getServerSupabase } from "./supabase/server";
import type { Message, Thread } from "./types";

const TZ = "America/Toronto"; // Montréal time

/* eslint-disable @typescript-eslint/no-explicit-any */
const one = <T,>(v: T | T[] | null | undefined): T | undefined => (Array.isArray(v) ? v[0] : v ?? undefined);

export function dayParts(iso: string) {
  const d = new Date(iso);
  return {
    key: d.toLocaleDateString("en-CA", { timeZone: TZ }), // YYYY-MM-DD
    day: d.toLocaleDateString("en-CA", { weekday: "short", timeZone: TZ }).replace(".", "").toUpperCase(),
    date: d.toLocaleDateString("en-CA", { day: "numeric", timeZone: TZ }),
    time: d.toLocaleTimeString("en-CA", { hour: "numeric", minute: "2-digit", timeZone: TZ }),
  };
}

export function initialsOf(name: string) {
  return name.replace(/[^A-Za-zÀ-ÿ ]/g, "").split(" ").filter(Boolean).map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "?";
}

const roleLabel: Record<string, string> = { venue: "Venue", performer: "Performer", planner: "Event planner", admin: "ShowIci team" };

/** How many new contacts the user has left today. null = unlimited (plan limits are off during launch). */
export async function getContactAllowance(userId: string): Promise<number | null> {
  const sb = await getServerSupabase();
  if (!sb) return null;
  const [{ data: settings }, { data: profile }, used] = await Promise.all([
    sb.from("app_settings").select("key, value"),
    sb.from("profiles").select("plan").eq("id", userId).maybeSingle(),
    sb.rpc("contacts_today"),
  ]);
  const get = (k: string) => settings?.find((s: any) => s.key === k)?.value;
  if (get("plan_limits_enabled") !== true || profile?.plan !== "free") return null;
  const cap = Number(get("free_daily_contacts") ?? 2);
  return Math.max(0, cap - Number(used.data ?? 0));
}

export async function getPlanLimitsEnabled(): Promise<boolean> {
  const sb = await getServerSupabase();
  if (!sb) return false;
  const { data } = await sb.from("app_settings").select("value").eq("key", "plan_limits_enabled").maybeSingle();
  return data?.value === true;
}

export async function getProfileName(profileId: string) {
  const sb = await getServerSupabase();
  if (!sb) return null;
  const { data } = await sb.from("profiles").select("display_name, role").eq("id", profileId).maybeSingle();
  return data ? { name: data.display_name || "ShowIci member", role: roleLabel[data.role] ?? "" } : null;
}

// ───────────── Inbox ─────────────

export interface Inbox {
  threads: Thread[];
  activeId: string | null;
  messages: Message[];
  startedAt: string | null;
}

export async function getInbox(userId: string, wantedId?: string): Promise<Inbox> {
  const empty: Inbox = { threads: [], activeId: null, messages: [], startedAt: null };
  const sb = await getServerSupabase();
  if (!sb) return empty;

  const { data: mine } = await sb.from("conversation_members").select("conversation_id").eq("profile_id", userId);
  const ids = (mine ?? []).map((m: any) => m.conversation_id as string);
  if (!ids.length) return empty;

  const [{ data: members }, { data: msgs }] = await Promise.all([
    sb.from("conversation_members").select("conversation_id, profile_id, profiles(display_name, role)").in("conversation_id", ids).neq("profile_id", userId),
    sb.from("messages").select("id, conversation_id, sender_id, body, kind, created_at").in("conversation_id", ids).order("created_at", { ascending: false }).limit(1000),
  ]);

  const threads: (Thread & { at: string })[] = ids.map((id) => {
    const other = (members ?? []).find((m: any) => m.conversation_id === id);
    const prof = one<any>(other?.profiles);
    const last = (msgs ?? []).find((m: any) => m.conversation_id === id);
    const name = prof?.display_name || "ShowIci member";
    return {
      id,
      name,
      initials: initialsOf(name),
      when: last ? timeAgo(last.created_at) : "",
      last: last ? (last.sender_id === userId ? `You: ${last.body}` : last.body) : "",
      tone: toneFor(id),
      otherId: other?.profile_id,
      subtitle: roleLabel[prof?.role] ?? "",
      at: last?.created_at ?? "",
    };
  });
  threads.sort((a, b) => b.at.localeCompare(a.at));

  const activeId = wantedId && ids.includes(wantedId) ? wantedId : threads[0]?.id ?? null;
  const convMsgs = (msgs ?? []).filter((m: any) => m.conversation_id === activeId).reverse();
  return {
    threads: threads.map(({ at: _at, ...t }) => t),
    activeId,
    messages: convMsgs.map((m: any) => ({ id: m.id, fromMe: m.sender_id === userId, text: m.body, kind: m.kind })),
    startedAt: convMsgs[0]?.created_at ?? null,
  };
}

export async function countConversations(userId: string) {
  const sb = await getServerSupabase();
  if (!sb) return 0;
  const { count } = await sb.from("conversation_members").select("conversation_id", { count: "exact", head: true }).eq("profile_id", userId);
  return count ?? 0;
}

// ───────────── Performer dashboard ─────────────

export async function getMyPerformer(userId: string) {
  const sb = await getServerSupabase();
  if (!sb) return null;
  const { data: p } = await sb
    .from("performers")
    .select("id, name, bio, genres, available, published, verified, travel_km, performer_videos(id), performer_photos(id)")
    .eq("owner", userId)
    .order("created_at")
    .limit(1)
    .maybeSingle();
  if (!p) return null;

  const checks: [boolean, string][] = [
    [Boolean(p.bio && p.bio.length > 40), "Write a short bio (a few sentences)."],
    [(p.genres ?? []).length > 0, "Add at least one genre."],
    [(p.performer_photos ?? []).length > 0, "Add a photo."],
    [(p.performer_videos ?? []).length > 0, "Add a YouTube video."],
    [(p.performer_videos ?? []).length > 1, "Add one more YouTube video."],
    [!!p.published, "Publish your profile so venues can find you."],
  ];
  const done = checks.filter(([ok]) => ok).length;

  const { data: gigs } = await sb
    .from("shows")
    .select("id, starts_at, title, venues(name, area, city)")
    .eq("performer_id", p.id)
    .gte("starts_at", new Date().toISOString())
    .order("starts_at")
    .limit(5);

  return {
    id: p.id as string,
    name: p.name as string,
    available: p.available as boolean,
    published: p.published as boolean,
    travelKm: (p.travel_km as number) ?? 50,
    strength: Math.round((done / checks.length) * 100),
    tip: checks.find(([ok]) => !ok)?.[1] ?? "Your profile is complete.",
    gigs: (gigs ?? []).map((g: any) => {
      const v = one<any>(g.venues);
      const d = dayParts(g.starts_at);
      return { id: g.id as string, day: d.day, date: d.date, title: v?.name ?? g.title ?? "Show", sub: [v?.area || v?.city, d.time].filter(Boolean).join(" · ") };
    }),
  };
}

// ───────────── Venue dashboard ─────────────

export async function getMyVenue(userId: string) {
  const sb = await getServerSupabase();
  if (!sb) return null;
  const { data: v } = await sb.from("venues").select("id, name, published").eq("owner", userId).order("created_at").limit(1).maybeSingle();
  if (!v) return null;
  const { data: shows } = await sb
    .from("shows")
    .select("id, title, performer_name, entry, status, starts_at")
    .eq("venue_id", v.id)
    .gte("starts_at", new Date(Date.now() - 7 * 864e5).toISOString())
    .order("starts_at")
    .limit(50);
  return {
    id: v.id as string,
    name: v.name as string,
    published: v.published as boolean,
    shows: (shows ?? []).map((s: any) => {
      const d = dayParts(s.starts_at);
      return { id: s.id as string, key: d.key, day: d.day, date: d.date, title: (s.title || s.performer_name || "Untitled show") as string, entry: (s.entry ?? "") as string, status: s.status as "draft" | "live" | "cancelled" };
    }),
  };
}

/** Thursday, Friday and Saturday nights for the next three weeks, Montréal time. */
export function nextNights(weeks = 3) {
  const out: { key: string; label: string }[] = [];
  for (let i = 0; i < weeks * 7; i++) {
    const d = new Date(Date.now() + i * 864e5);
    const wd = d.toLocaleDateString("en-CA", { weekday: "short", timeZone: TZ }).replace(".", "");
    if (!["Thu", "Fri", "Sat"].includes(wd)) continue;
    out.push({ key: d.toLocaleDateString("en-CA", { timeZone: TZ }), label: `${wd} ${d.toLocaleDateString("en-CA", { day: "numeric", timeZone: TZ })}` });
  }
  return out;
}

// ───────────── Admin ─────────────

export interface AdminStats {
  venues: number;
  performers: number;
  planners: number;
  messages_week: number;
  shows: number;
}

export async function getAdminData() {
  const sb = await getServerSupabase();
  if (!sb) return null;
  const [stats, reports, pending, limits] = await Promise.all([
    sb.rpc("admin_stats"),
    sb
      .from("reports")
      .select("id, kind, reason, created_at, reporter:profiles!reports_reporter_id_fkey(display_name), subject:profiles!reports_subject_id_fkey(display_name)")
      .eq("status", "open")
      .order("created_at", { ascending: false })
      .limit(20),
    sb.from("performers").select("id, name, act_type, base_city, published, created_at").eq("verified", false).order("created_at").limit(20),
    getPlanLimitsEnabled(),
  ]);
  return {
    // Null when supabase/migrations/002_live_data.sql hasn't been run yet.
    stats: stats.error ? null : (stats.data as AdminStats),
    setupError: stats.error?.message ?? reports.error?.message ?? null,
    reports: (reports.data ?? []).map((r: any) => ({
      id: r.id as string,
      kind: String(r.kind).replace("_", "-"),
      who: one<any>(r.subject)?.display_name ?? "Unknown",
      by: one<any>(r.reporter)?.display_name ?? "Unknown",
      when: timeAgo(r.created_at),
      why: (r.reason ?? "") as string,
    })),
    pending: (pending.data ?? []).map((p: any) => ({
      id: p.id as string,
      name: p.name as string,
      detail: [p.act_type, p.base_city, p.published ? "published" : "draft"].filter(Boolean).join(" · "),
    })),
    limitsOn: limits,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */
