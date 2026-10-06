"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSupabase } from "./supabase/server";

/** Signs out on the server so the session cookie is cleared everywhere, then goes home. */
export async function signOutAction() {
  const sb = await getServerSupabase();
  if (sb) await sb.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
