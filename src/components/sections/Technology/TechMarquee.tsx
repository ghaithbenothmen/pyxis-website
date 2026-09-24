import Image from "next/image";
import type { CSSProperties } from "react";
import type { Technology } from "@/data/technologies";

/**
 * Optical sizing: wide logos get shorter, compact ones taller, so every mark
 * reads at a similar visual weight. Returns a height in rem.
 */
const opticalHeight = (aspect: number) => (3.4 * Math.pow(aspect, -0.3)).toFixed(2);

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

function TechItem({ tech, decorative }: { tech: Technology; decorative?: boolean }) {
  return (
    <li
      aria-hidden={decorative || undefined}
      className="group/tech relative flex h-24 shrink-0 items-center px-7 md:h-28 md:px-9"
    >
      <span
        className="relative block h-[calc(var(--logo-h)*0.8)] transition-transform duration-500 ease-out-expo group-hover/tech:scale-105 md:h-[var(--logo-h)]"
        style={{ aspectRatio: String(tech.aspect), ["--logo-h" as string]: `${opticalHeight(tech.aspect)}rem` }}
      >
        {/* At rest: grey silhouette */}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-muted transition-opacity duration-500 group-hover/tech:opacity-0"
          style={mask(tech.mono)}
        />
        {/* On hover: the logo's own colours */}
        <Image
          src={tech.color}
          alt={decorative ? "" : tech.name}
          fill
          unoptimized
          className="object-contain opacity-0 transition-opacity duration-500 group-hover/tech:opacity-100"
        />
      </span>
    </li>
  );
}

/**
 * Horizontally scrolling band of technology logos. Grey at rest; hovering a
 * logo reveals its own colours, adapted for the dark background. Pauses on
 * hover and stands still (wrapped) for reduced motion.
 */
export function TechMarquee({ items }: { items: Technology[] }) {
  return (
    <div
      className="tech-marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      aria-label="Technologies we work with"
      role="region"
    >
      <div className="tech-track flex w-max">
        <ul className="flex items-center gap-4 pr-4 md:gap-8 md:pr-8">
          {items.map((tech) => (
            <TechItem key={tech.name} tech={tech} />
          ))}
        </ul>
        {/* Identical copy, including trailing padding, for a seamless loop */}
        <ul className="tech-copy flex items-center gap-4 pr-4 md:gap-8 md:pr-8" aria-hidden="true">
          {items.map((tech) => (
            <TechItem key={tech.name} tech={tech} decorative />
          ))}
        </ul>
      </div>
    </div>
  );
}
