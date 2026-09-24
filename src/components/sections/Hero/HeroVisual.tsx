import Image from "next/image";
import { assets } from "@/lib/assets";
import { NetworkField } from "@/components/animation/NetworkField";

/** Atmospheric backdrop: imagery, animated network and tonal overlays. */
export function HeroVisual() {
  const { image, video } = assets.hero;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div data-hero="bg" data-intro className="absolute inset-0">
        <div data-hero="bg-inner" className="absolute inset-0 will-change-transform">
          <Image
            src={image.src}
            alt=""
            fill
            preload
            sizes="100vw"
            quality={60}
            className="object-cover object-[50%_70%] opacity-55"
          />
          {video ? (
            <video
              className="absolute inset-0 hidden size-full object-cover opacity-50 md:block"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={video.poster.src}
            >
              <source src={video.src} type="video/mp4" />
            </video>
          ) : null}
        </div>
      </div>

      <div data-hero="network" data-intro className="absolute inset-0">
        <div data-hero="network-inner" className="absolute inset-0 will-change-transform">
          <NetworkField startDelay={1400} />
        </div>
      </div>

      {/* Tonal grading keeps type legible and blends into the next section */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,transparent_0%,var(--background)_75%)] opacity-80" />
      <div className="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[45%] bg-linear-to-t from-background via-background/80 to-transparent" />
    </div>
  );
}
