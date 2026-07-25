import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  basePath: "/nebiyu-portfolio",
  assetPrefix: "/nebiyu-portfolio/",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
