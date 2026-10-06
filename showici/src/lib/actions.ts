"use client";
// Client-side writes. In demo mode (no Supabase keys) they resolve successfully without saving anything.
import { getBrowserSupabase } from "./supabase/client";
import { pointFor } from "./geo";

export type Result = { ok: true; demo?: boolean; id?: string; needsConfirm?: boolean } | { ok: false; error: string };

async function currentUserId() {
  const sb = getBrowserSupabase();
  if (!sb) return null;
  const { data } = await sb.auth.getUser();
  return data.user?.id ?? null;
}

/** Creates the account. `nextPath` is where the email confirmation link should land. */
export async function signUp(email: string, password: string, role: "venue" | "performer" | "planner", displayName: string, nextPath = "/"): Promise<Result> {
  const sb = getBrowserSupabase();
  if (!sb) return { ok: true, demo: true };
  const { data, error } = await sb.auth.signUp({
    email,
    password,
    options: {
      data: { role, display_name: displayName },
      emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`,
    },
  });
  if (error) return { ok: false, error: error.message };
  // When email confirmation is on, Supabase returns no session until the link is clicked.
  return { ok: true, needsConfirm: !data.session };
}

export async function signIn(email: string, password: string): Promise<Result & { role?: string }> {
  const sb = getBrowserSupabase();
  if (!sb) return { ok: true, demo: true };
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, error: error.message };
  const { data: profile } = await sb.from("profiles").select("role").eq("id", data.user.id).single();
  return { ok: true, role: profile?.role };
}

export async function resetPassword(email: string): Promise<Result> {
  const sb = getBrowserSupabase();
  if (!sb) return { ok: true, demo: true };
  const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/auth/callback?next=/login` });
  return error ? { ok: false, error: error.message } : { ok: true };
}

/** Uploads photos to the "media" bucket under the user's folder and returns their storage paths. */
export async function uploadPhotos(files: File[]): Promise<string[]> {
  const sb = getBrowserSupabase();
  const uid = await currentUserId();
  if (!sb || !uid) return [];
  const paths: string[] = [];
  for (const f of files) {
    const path = `${uid}/${crypto.randomUUID()}-${f.name.replace(/[^\w.-]/g, "_")}`;
    const { error } = await sb.storage.from("media").upload(path, f);
    if (!error) paths.push(path);
  }
  return paths;
}

export interface PerformerInput {
  name: string;
  act_type: string;
  members: number;
  languages: string[];
  genres: string[];
  repertoire: string;
  bio: string;
  set_length: string;
  fee_range: string;
  own_sound: boolean;
  base_city: string;
  travel_km: number;
  event_types: string[];
  available_days: string[];
  available: boolean;
  videos: { youtube_url: string; title: string; featured: boolean }[];
  photos: File[];
  publish: boolean;
}

export async function savePerformer(input: PerformerInput): Promise<Result> {
  const sb = getBrowserSupabase();
  const uid = await currentUserId();
  if (!sb) return { ok: true, demo: true };
  if (!uid) return { ok: false, error: "Please create an account or log in first." };
  const { videos, photos, publish, ...fields } = input;
  const { data, error } = await sb
    .from("performers")
    .insert({ ...fields, owner: uid, published: publish, location: pointFor(fields.base_city) })
    .select("id")
    .single();
  if (error) return { ok: false, error: error.message };
  if (videos.length) await sb.from("performer_videos").insert(videos.map((v, i) => ({ ...v, performer_id: data.id, position: i })));
  const paths = await uploadPhotos(photos);
  if (paths.length) await sb.from("performer_photos").insert(paths.map((p, i) => ({ performer_id: data.id, storage_path: p, is_cover: i === 0, position: i })));
  return { ok: true, id: data.id };
}

export async function insertRow(table: "venues" | "event_requests" | "shows" | "reviews", row: Record<string, unknown>): Promise<Result> {
  const sb = getBrowserSupabase();
  const uid = await currentUserId();
  if (!sb) return { ok: true, demo: true };
  if (!uid) return { ok: false, error: "Please create an account or log in first." };
  const ownerField = table === "venues" ? { owner: uid } : table === "event_requests" ? { planner_id: uid } : table === "reviews" ? { reviewer_id: uid } : {};
  if ((table === "venues" || table === "event_requests") && typeof row.city === "string") row = { ...row, location: pointFor(row.city) };
  const { data, error } = await sb.from(table).insert({ ...row, ...ownerField }).select("id").single();
  return error ? { ok: false, error: error.message } : { ok: true, id: data.id };
}

export async function startConversation(recipientProfileId: string, firstMessage: string): Promise<Result> {
  const sb = getBrowserSupabase();
  if (!sb) return { ok: true, demo: true };
  const { data, error } = await sb.rpc("start_conversation", { p_recipient: recipientProfileId, p_first_message: firstMessage });
  return error ? { ok: false, error: error.message } : { ok: true, id: data as string };
}

/** Sends a message and returns the saved message's id (the database masks phone numbers and emails). */
export async function sendMessage(conversationId: string, body: string, kind: "text" | "proposal" = "text"): Promise<Result> {
  const sb = getBrowserSupabase();
  const uid = await currentUserId();
  if (!sb) return { ok: true, demo: true };
  if (!uid) return { ok: false, error: "Please log in." };
  const { data, error } = await sb.from("messages").insert({ conversation_id: conversationId, sender_id: uid, body, kind }).select("id").single();
  return error ? { ok: false, error: error.message } : { ok: true, id: data.id };
}

/** Updates one row by id. Row-level security decides who may change what. */
async function updateById(table: "performers" | "reports", id: string, values: Record<string, unknown>): Promise<Result> {
  const sb = getBrowserSupabase();
  if (!sb) return { ok: true, demo: true };
  const { error } = await sb.from(table).update(values).eq("id", id);
  return error ? { ok: false, error: error.message } : { ok: true };
}

export const setPerformerAvailable = (performerId: string, available: boolean) => updateById("performers", performerId, { available });
export const setPerformerVerified = (performerId: string, verified: boolean) => updateById("performers", performerId, { verified });
export const unpublishPerformer = (performerId: string) => updateById("performers", performerId, { published: false });
export const setReportStatus = (reportId: string, status: "dismissed" | "resolved") => updateById("reports", reportId, { status });

/** Admin only: turns the free-plan contact cap on or off. */
export async function setPlanLimits(enabled: boolean): Promise<Result> {
  const sb = getBrowserSupabase();
  if (!sb) return { ok: true, demo: true };
  const { error } = await sb.from("app_settings").update({ value: enabled }).eq("key", "plan_limits_enabled");
  return error ? { ok: false, error: error.message } : { ok: true };
}

/** Same masking the database applies, so the sender sees it immediately. */
export function maskContactInfo(text: string) {
  return text
    .replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, "[email hidden]")
    .replace(/(\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g, "[phone hidden]");
}
