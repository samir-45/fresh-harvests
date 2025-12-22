import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },

      // ibb (keep both; but ideally use only i.ibb.co)
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
        pathname: "/**",
      },

      // your backend (if product images come from here)
      {
        protocol: "http",
        hostname: "23.239.111.164",
        port: "5001",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
