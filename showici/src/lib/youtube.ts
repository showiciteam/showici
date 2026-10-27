/** YouTube helpers. Plain module (no "use client") so server pages can call them too. */

/** Pulls the video id out of any common YouTube link (watch, youtu.be, shorts, embed). */
export function youTubeId(url?: string | null): string | null {
  if (!url) return null;
  try {
    const u = new URL(url.trim());
    const host = u.hostname.replace(/^www\.|^m\./, "");
    if (host === "youtu.be") return u.pathname.slice(1).split("/")[0] || null;
    if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
      if (u.searchParams.get("v")) return u.searchParams.get("v");
      const m = u.pathname.match(/^\/(?:shorts|embed|live)\/([\w-]{6,})/);
      if (m) return m[1];
    }
  } catch {
    // not a URL
  }
  return null;
}
