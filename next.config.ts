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
      },
      {
        hostname: "ez77o93rik.ufs.sh"
      },
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  }
};

export default nextConfig;