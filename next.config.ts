import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "haquerealestateapp.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "**.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
