/** @type {import('next').NextConfig} */
const nextConfig = {
  // Updated to use the new serverExternalPackages instead of experimental.serverComponentsExternalPackages
  serverExternalPackages: ["mongoose"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
  // Suppress hydration warnings for development
  reactStrictMode: false,
  // Handle environment variables
  env: {
    MONGODB_URL: process.env.MONGODB_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  },
  // Handle TypeScript errors during build
  typescript: {
    ignoreBuildErrors: false,
  },
  // Handle ESLint errors during build
  eslint: {
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;
