import type { MarqueeLogo } from "@/components/ui/LogoMarquee";

const logo = (name: string, file: string, aspect: number): MarqueeLogo => ({
  name,
  color: `/images/references/on-dark/${file}`,
  mono: `/images/references/mono/${file}`,
  aspect,
});

/**
 * Client references. Originals live in /assets/references; the `mono/` and
 * `on-dark/` variants in /public/images/references are generated from them.
 */
export const clients: MarqueeLogo[] = [
  logo("Orange", "orange.png", 0.979),
  logo("Vodafone", "vodafone.png", 1.122),
  logo("Ooredoo", "ooredoo.png", 1),
  logo("e& (etisalat and)", "itisalet.png", 1.1),
  logo("Virgin Mobile", "virqin.png", 1.956),
  logo("Topnet", "topnet.png", 4.5),
  logo("Sodetel", "sodetel.png", 2.303),
  logo("Beyond One", "beyond.png", 3.667),
];
