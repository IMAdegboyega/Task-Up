import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  typescript: {
    ignoreBuildErrors: true, // Skip TypeScript errors
  },
};

module.exports = {
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint checks
  },
};

export default nextConfig;
