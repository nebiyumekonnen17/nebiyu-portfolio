import type { NextConfig } from "next";

// GitHub Pages hosts this site under /nebiyu-portfolio, while Vercel
// serves it at the root of the custom domain.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (process.env.VERCEL ? "" : "/nebiyu-portfolio");

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
