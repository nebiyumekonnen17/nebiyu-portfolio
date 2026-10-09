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
};

export default nextConfig;
