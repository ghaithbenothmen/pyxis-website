import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // "Use cases" became "Solutions" (spec D8): keep old links working
  async redirects() {
    // The three former use-case pages now live on the two audience pages (spec S08)
    const moved = {
      "advanced-analytics": "service-providers",
      "customer-experience": "service-providers",
      "compliance-investigation": "governments-regulators",
    };
    return Object.entries(moved).flatMap(([from, to]) =>
      ["use-cases", "solutions"].map((prefix) => ({
        source: `/${prefix}/${from}`,
        destination: `/solutions/${to}`,
        permanent: true,
      })),
    );
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75],
    // Temporary imagery is served from Unsplash until the final Pyxis assets
    // land in /public/images. Remove this pattern once they are replaced.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
