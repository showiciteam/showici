import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Private or account pages: nothing useful for search engines.
      disallow: ["/admin", "/dashboard", "/messages", "/requests", "/review", "/register", "/auth", "/api", "/login", "/signup"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
