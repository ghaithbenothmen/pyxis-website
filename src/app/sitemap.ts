import type { MetadataRoute } from "next";
import { site } from "@/lib/constants";
import { audienceHref, audiences } from "@/data/solutions";

// Generated once at build time (static export)
export const dynamic = "force-static";

/** Indexable pages only: the legal pages stay out until their text is published. */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, site.url).toString();
  return [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    ...["/platform", "/solutions", "/company"].map((path) => ({
      url: url(path),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...audiences.map((audience) => ({
      url: url(audienceHref(audience)),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
