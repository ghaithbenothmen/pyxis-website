import type { Metadata } from "next";

/** Site-wide share image (src/app/opengraph-image.png). */
const shareImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Pyxis — Where telecom data becomes intelligence.",
};

/**
 * Metadata for a page with its own search title (spec §5.2). Page-level Open
 * Graph replaces the root one, so the share image is restated here.
 */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    // Full titles from the spec, so they bypass the "| Pyxis" template
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, images: [shareImage] },
    twitter: { title, description, images: [shareImage] },
  };
}
