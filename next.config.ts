/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // ✅ Required for server functions to work on Amplify

  experimental: {
    // appDir is enabled by default in Next.js 13+ when using the /app directory
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
