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
  const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/auth/callback?next=/reset-password` });
  return error ? { ok: false, error: error.message } : { ok: true };
}

/** Sets a new password for the signed-in user (after following a reset link). */
export async function updatePassword(password: string): Promise<Result> {
  const sb = getBrowserSupabase();
  if (!sb) return { ok: true, demo: true };
  const { error } = await sb.auth.updateUser({ password });
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
  contact_name: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  music_url: string;
  website: string;
  videos: { youtube_url: string; title: string; featured: boolean }[];
  photos: File[];
  /** Storage paths of photos already saved that the user removed. */
  removedPhotos?: string[];
  phone: string;
  publish: boolean;
}

/** Saves the private phone number (never shown publicly). */
async function savePhone(phone: string) {
  const sb = getBrowserSupabase();
  const uid = await currentUserId();
  if (!sb || !uid) return;
  await sb.from("private_contacts").upsert({ profile_id: uid, phone: phone || null });
}

/** Creates the performer profile, or updates it when `existingId` is given (no duplicates). */
export async function savePerformer(input: PerformerInput, existingId?: string): Promise<Result> {
  const sb = getBrowserSupabase();
  const uid = await currentUserId();
  if (!sb) return { ok: true, demo: true };
  if (!uid) return { ok: false, error: "Please create an account or log in first." };
  const { videos, photos, removedPhotos = [], phone, publish, ...fields } = input;
  const row = { ...fields, published: publish, location: pointFor(fields.base_city) };

  let id = existingId;
  if (id) {
    const { error } = await sb.from("performers").update(row).eq("id", id);
    if (error) return { ok: false, error: error.message };
    await sb.from("performer_videos").delete().eq("performer_id", id);
  } else {
    const { data, error } = await sb.from("performers").insert({ ...row, owner: uid }).select("id").single();
    if (error) return { ok: false, error: error.message };
    id = data.id as string;
  }
  if (videos.length) await sb.from("performer_videos").insert(videos.map((v, i) => ({ ...v, performer_id: id, position: i })));
  if (removedPhotos.length) {
    await sb.from("performer_photos").delete().eq("performer_id", id).in("storage_path", removedPhotos);
    await sb.storage.from("media").remove(removedPhotos);
  }
  const paths = await uploadPhotos(photos);
  if (paths.length) {
    const { count } = await sb.from("performer_photos").select("id", { count: "exact", head: true }).eq("performer_id", id);
    const start = count ?? 0;
    await sb.from("performer_photos").insert(paths.map((p, i) => ({ performer_id: id, storage_path: p, is_cover: start + i === 0, position: start + i })));
  }
  await savePhone(phone);
  return { ok: true, id };
}

export interface VenueInput {
  name: string;
  type: string;
  street: string;
  city: string;
  postal_code: string;
  description: string;
  capacity: string;
  stage: string;
  setting: string;
  equipment: string[];
  books: string[];
  genres: string[];
  nights: string;
  fee_range: string;
  lead_time: string;
  open_to_new_acts: boolean;
  website: string;
  instagram: string;
  facebook: string;
  youtube_url: string;
  contact_name: string;
  contact_role: string;
  phone: string;
  photos: File[];
  removedPhotos?: string[];
  publish: boolean;
}

/** Creates the venue, or updates it when `existingId` is given. */
export async function saveVenue(input: VenueInput, existingId?: string): Promise<Result> {
  const sb = getBrowserSupabase();
  const uid = await currentUserId();
  if (!sb) return { ok: true, demo: true };
  if (!uid) return { ok: false, error: "Please create an account or log in first." };
  const { photos, removedPhotos = [], phone, publish, ...fields } = input;
  const row = { ...fields, published: publish, location: pointFor(fields.city) };

  let id = existingId;
  if (id) {
    const { error } = await sb.from("venues").update(row).eq("id", id);
    if (error) return { ok: false, error: error.message };
  } else {
    const { data, error } = await sb.from("venues").insert({ ...row, owner: uid }).select("id").single();
    if (error) return { ok: false, error: error.message };
    id = data.id as string;
  }
  if (removedPhotos.length) {
    await sb.from("venue_photos").delete().eq("venue_id", id).in("storage_path", removedPhotos);
    await sb.storage.from("media").remove(removedPhotos);
  }
  const paths = await uploadPhotos(photos);
  if (paths.length) {
    const { count } = await sb.from("venue_photos").select("id", { count: "exact", head: true }).eq("venue_id", id);
    const start = count ?? 0;
    await sb.from("venue_photos").insert(paths.map((p, i) => ({ venue_id: id, storage_path: p, is_cover: start + i === 0, position: start + i })));
  }
  await savePhone(phone);
  return { ok: true, id };
}

export interface ShowInput {
  venue_id: string;
  performer_id: string | null;
  performer_name: string;
  title: string;
  genre: string;
  starts_at: string;
  doors_at: string | null;
  entry: string;
  ticket_url: string | null;
  description_fr: string;
  description_en: string;
  status: "draft" | "live" | "cancelled";
}

/** Posts a show, or updates it when `existingId` is given. */
export async function saveShow(input: ShowInput, existingId?: string): Promise<Result> {
  const sb = getBrowserSupabase();
  if (!sb) return { ok: true, demo: true };
  if (existingId) {
    const { error } = await sb.from("shows").update(input).eq("id", existingId);
    return error ? { ok: false, error: error.message } : { ok: true, id: existingId };
  }
  const { data, error } = await sb.from("shows").insert(input).select("id").single();
  return error ? { ok: false, error: error.message } : { ok: true, id: data.id };
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

export async function startConversation(recipientProfileId: string, firstMessage: string, eventRequestId?: string): Promise<Result> {
  const sb = getBrowserSupabase();
  if (!sb) return { ok: true, demo: true };
  const { data, error } = await sb.rpc("start_conversation", { p_recipient: recipientProfileId, p_first_message: firstMessage, p_event_request: eventRequestId ?? null });
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
async function updateById(table: "performers" | "reports" | "shows" | "event_requests" | "profiles" | "venues", id: string, values: Record<string, unknown>): Promise<Result> {
  const sb = getBrowserSupabase();
  if (!sb) return { ok: true, demo: true };
  const { error } = await sb.from(table).update(values).eq("id", id);
  return error ? { ok: false, error: error.message } : { ok: true };
}

export const setPerformerAvailable = (performerId: string, available: boolean) => updateById("performers", performerId, { available });
export const setPerformerVerified = (performerId: string, verified: boolean) => updateById("performers", performerId, { verified });
export const unpublishPerformer = (performerId: string) => updateById("performers", performerId, { published: false });
export const setReportStatus = (reportId: string, status: "open" | "dismissed" | "resolved") => updateById("reports", reportId, { status });

export const setShowStatus = (showId: string, status: "draft" | "live" | "cancelled") => updateById("shows", showId, { status });
export const setRequestStatus = (requestId: string, status: "open" | "booked" | "closed") => updateById("event_requests", requestId, { status });
export const setBlockedDates = (performerId: string, dates: string[]) => updateById("performers", performerId, { blocked_dates: dates });
/** Admin only (enforced by the database). */
export const setUserRole = (profileId: string, role: "venue" | "performer" | "planner" | "admin") => updateById("profiles", profileId, { role });
export const setVenuePublished = (venueId: string, published: boolean) => updateById("venues", venueId, { published });

/** Save a performer or follow a venue. Returns the new saved state. */
export async function toggleSaved(kind: "performer" | "venue", targetId: string, save: boolean): Promise<Result> {
  const sb = getBrowserSupabase();
  const uid = await currentUserId();
  if (!sb) return { ok: true, demo: true };
  if (!uid) return { ok: false, error: "Log in to save." };
  const { error } = save
    ? await sb.from("saved").upsert({ profile_id: uid, kind, target_id: targetId })
    : await sb.from("saved").delete().eq("profile_id", uid).eq("kind", kind).eq("target_id", targetId);
  return error ? { ok: false, error: error.message } : { ok: true };
}

export async function submitReview(input: { conversation_id: string; subject_id: string; rating: number; tags: string[]; body: string; would_rebook: boolean }): Promise<Result> {
  const sb = getBrowserSupabase();
  const uid = await currentUserId();
  if (!sb) return { ok: true, demo: true };
  if (!uid) return { ok: false, error: "Please log in." };
  const { error } = await sb.from("reviews").insert({ ...input, reviewer_id: uid });
  if (error?.code === "23505") return { ok: false, error: "You already reviewed this booking." };
  return error ? { ok: false, error: error.message } : { ok: true };
}

export async function reportConversation(input: { subject_id: string | null; conversation_id: string | null; kind: "message" | "profile" | "no_show" | "other"; reason: string }): Promise<Result> {
  const sb = getBrowserSupabase();
  const uid = await currentUserId();
  if (!sb) return { ok: true, demo: true };
  if (!uid) return { ok: false, error: "Please log in." };
  const { error } = await sb.from("reports").insert({ ...input, reporter_id: uid });
  return error ? { ok: false, error: error.message } : { ok: true };
}

/** Admin only: free-plan daily contact cap. */
export async function setFreeDailyContacts(n: number): Promise<Result> {
  const sb = getBrowserSupabase();
  if (!sb) return { ok: true, demo: true };
  const { error } = await sb.from("app_settings").update({ value: n }).eq("key", "free_daily_contacts");
  return error ? { ok: false, error: error.message } : { ok: true };
}

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
