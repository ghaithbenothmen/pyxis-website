import Image from "next/image";
import type { CSSProperties } from "react";

export type MarqueeLogo = {
  name: string;
  /** Colour logo adapted for dark backgrounds, revealed on hover. */
  color: string;
  /** White monochrome version (keeps knocked-out details), shown at rest. */
  mono: string;
  /** Width / height of the trimmed logo. */
  aspect: number;
};

/**
 * Optical sizing: wide logos get shorter, compact ones taller, so every mark
 * reads at a similar visual weight. Returns a height in rem.
 */
const opticalHeight = (aspect: number, base: number) => (base * Math.pow(aspect, -0.3)).toFixed(2);

/** Paints the monochrome logo as a silhouette in the current text colour. */
const mask = (src: string): CSSProperties => ({
  maskImage: `url(${src})`,
  WebkitMaskImage: `url(${src})`,
  maskSize: "contain",
  WebkitMaskSize: "contain",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskPosition: "center",
});

function Item({ logo, base, decorative }: { logo: MarqueeLogo; base: number; decorative?: boolean }) {
  return (
    <li aria-hidden={decorative || undefined} className="group/logo relative flex h-24 shrink-0 items-center px-7 md:h-28 md:px-9">
      <span
        className="relative block h-[calc(var(--logo-h)*0.8)] transition-transform duration-500 ease-out-expo group-hover/logo:scale-105 md:h-[var(--logo-h)]"
        style={{ aspectRatio: String(logo.aspect), ["--logo-h" as string]: `${opticalHeight(logo.aspect, base)}rem` }}
      >
        {/* At rest: grey silhouette */}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-muted transition-opacity duration-500 group-hover/logo:opacity-0"
          style={mask(logo.mono)}
        />
        {/* On hover: the logo's own colours */}
        <Image
          src={logo.color}
          alt={decorative ? "" : logo.name}
          fill
          unoptimized
          className="object-contain opacity-0 transition-opacity duration-500 group-hover/logo:opacity-100"
        />
      </span>
    </li>
  );
}

type LogoMarqueeProps = {
  logos: MarqueeLogo[];
  label: string;
  /** Base logo height in rem before optical sizing. */
  size?: number;
};

/**
 * Horizontally scrolling band of logos. Grey at rest; hovering a logo reveals
 * its own colours, adapted for the dark background. Pauses on hover and stands
 * still (wrapped) for reduced motion.
 */
export function LogoMarquee({ logos, label, size = 3.4 }: LogoMarqueeProps) {
  return (
    <div
      className="marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      aria-label={label}
      role="region"
    >
      <div className="marquee-track flex w-max">
        <ul className="flex items-center gap-4 pr-4 md:gap-8 md:pr-8">
          {logos.map((logo) => (
            <Item key={logo.name} logo={logo} base={size} />
          ))}
        </ul>
        {/* Identical copy, including trailing padding, for a seamless loop */}
        <ul className="marquee-copy flex items-center gap-4 pr-4 md:gap-8 md:pr-8" aria-hidden="true">
          {logos.map((logo) => (
            <Item key={logo.name} logo={logo} base={size} decorative />
          ))}
        </ul>
      </div>
    </div>
  );
}
