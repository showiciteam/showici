/** Public URL of a file in the Supabase "media" bucket. */
export function mediaUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return base ? `${base}/storage/v1/object/public/media/${path}` : "";
}
