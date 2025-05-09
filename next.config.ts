import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Skip TypeScript errors
  },
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint checks
  }
};

export default nextConfig;
