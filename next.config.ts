import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {}, 
    mdxRs: true,
  },
  serverExternalPackages: ["mongoose"],
  images: {
    domains: ['banner2.cleanpng.com'],
  },
};

export default nextConfig;
