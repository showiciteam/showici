import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The share image reads the logo from public/, which isn't bundled with server code by default.
  outputFileTracingIncludes: {
    "/[lang]/opengraph-image": ["./public/logo-light.png"],
  },
};

export default nextConfig;
