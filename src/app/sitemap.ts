import type { MetadataRoute } from "next";
import { site } from "@/lib/constants";
import { audienceHref, audiences } from "@/data/solutions";

/** Indexable pages only: the legal pages stay out until their text is published. */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, site.url).toString();
  return [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    ...audiences.map((audience) => ({
      url: url(audienceHref(audience)),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
