/**
 * Central registry of every visual asset used on the site.
 *
 * Brand assets are final. All other imagery is TEMPORARY: it comes from
 * Unsplash and stands in until final Pyxis photography, ORION screenshots and
 * videos are delivered.
 * To swap an asset, drop the file in /public (e.g. /images/hero/hero.jpg)
 * and change the `src` below — components never reference URLs directly.
 */

export type ImageAsset = {
  src: string;
  alt: string;
  /** Marks placeholder imagery so it can be audited before launch. */
  temporary?: boolean;
};

export type VideoAsset = {
  src: string;
  poster: ImageAsset;
};

const unsplash = (id: string, width = 2000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=75`;

const temp = (id: string, alt: string): ImageAsset => ({
  src: unsplash(id),
  alt,
  temporary: true,
});

export const assets = {
  brand: {
    /** Official wordmarks (final assets). Favicon and app icons live in src/app. */
    logo: {
      onDark: { src: "/images/brand/pyxis-logo-on-dark.png", width: 722, height: 345 },
      onLight: { src: "/images/brand/pyxis-logo-on-light.png", width: 318, height: 159 },
    },
    icon: { src: "/images/brand/pyxis-icon.png", width: 244, height: 233 },
  },
  hero: {
    image: temp(
      "photo-1451187580459-43490279c0fa",
      "Night view of Earth from orbit with city lights tracing network connections",
    ),
    /** Background video is optional; the animated network canvas is the fallback. */
    video: null as VideoAsset | null,
  },
  solutions: {
    analytics: temp(
      "photo-1639322537228-f710d846310a",
      "Abstract network of connected nodes",
    ),
    experience: temp(
      "photo-1604869515882-4d10fa4b0492",
      "Bundle of fibre-optic cables carrying light",
    ),
    compliance: temp(
      "photo-1591808216268-ce0b82787efe",
      "Network switch with patched cables",
    ),
  },
  technology: {
    texture: temp(
      "photo-1544197150-b99a580bb7a8",
      "Patch panel with network cables",
    ),
  },
  cta: {
    image: temp(
      "photo-1604869515882-4d10fa4b0492",
      "Fibre-optic light trails",
    ),
  },
} as const;
