import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // allow ALL https images
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },

      // optional: allow ALL http images too (only if you really need it)
      {
        protocol: "http",
        hostname: "**",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
