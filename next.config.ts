import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns : [
      {
        hostname: "lh3.googleusercontent.com"
      },
      {
        hostname: "random.imagecdn.app"
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  }
};

export default nextConfig;