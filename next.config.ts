import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to /out, ready to
  // upload to OVH web hosting (Apache). Redirects, clean URLs, HTTPS and
  // caching live in public/.htaccess, which is copied into /out.
  output: "export",
  images: {
    // No image server on static hosting: images are served as they are
    // (already resized and compressed in /public/images).
    unoptimized: true,
  },
};

export default nextConfig;
