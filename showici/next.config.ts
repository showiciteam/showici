import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // showici.com (no www) always goes to www.showici.com with a permanent redirect, so search engines index one address.
  async redirects() {
    return [
      { source: "/:path*", has: [{ type: "host", value: "showici.com" }], destination: "https://www.showici.com/:path*", statusCode: 301 },
    ];
  },
};

export default nextConfig;
