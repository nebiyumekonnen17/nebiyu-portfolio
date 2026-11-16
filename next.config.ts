import type { NextConfig } from "next";

// The custom domain is served at root on Vercel. GitHub Pages now redirects to it.
// NEXT_PUBLIC_BASE_PATH remains available for intentional path-prefix deployments.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: process.env.VERCEL ? undefined : "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      { source: "/links/manage/:path*", headers: [
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
        { key: "Referrer-Policy", value: "same-origin" },
        { key: "X-Content-Type-Options", value: "nosniff" },
      ] },
      { source: "/api/link-hub/:path*", headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Cache-Control", value: "no-store" },
      ] },
    ];
  },

};

export default nextConfig;
