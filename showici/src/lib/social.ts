/**
 * ShowIci's social media accounts. Add or change an account here and every
 * "Follow us" block, the footer and the search-engine data update together.
 */
export const SOCIAL_HANDLE = "@showici_ca";

export type SocialKey = "instagram" | "facebook";

export const SOCIAL: { key: SocialKey; label: string; url: string }[] = [
  { key: "instagram", label: "Instagram", url: "https://www.instagram.com/showici_ca/" },
  { key: "facebook", label: "Facebook", url: "https://www.facebook.com/profile.php?id=61595495447629" },
];

/** Profile URLs for structured data (schema.org "sameAs"). */
export const SOCIAL_URLS = SOCIAL.map((s) => s.url);
