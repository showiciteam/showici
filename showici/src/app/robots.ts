import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const PRIVATE = ["/admin", "/dashboard", "/messages", "/requests", "/review", "/register", "/login", "/signup", "/reset-password"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Private or account pages: nothing useful for search engines.
      // Same list in French (/…) and English (/en/…).
      disallow: [...PRIVATE, ...PRIVATE.map((p) => `/en${p}`), "/auth", "/api"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
