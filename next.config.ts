import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
      // যদি pexels ব্যবহার করো:
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "i.ibb.co.com" },
    ],
  },
};

export default nextConfig;
