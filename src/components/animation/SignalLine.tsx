"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { media } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Vertical signal trace that draws as the visitor scrolls. Used between
 * sections so the page reads as one continuous line of data.
 */
export function SignalLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(media.motion, () => {
        const line = el.querySelector("[data-line]");
        const dot = el.querySelector("[data-dot]");
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 45%", scrub: true },
          })
          .fromTo(line, { scaleY: 0 }, { scaleY: 1 }, 0)
          .fromTo(dot, { top: "0%" }, { top: "100%" }, 0);
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} aria-hidden="true" className={cn("relative h-32 w-px md:h-44", className)}>
      <div className="absolute inset-0 bg-border" />
      <div data-line className="absolute inset-0 origin-top bg-linear-to-b from-primary/0 via-primary/70 to-primary" />
      <div data-dot className="absolute left-1/2 top-full size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
    </div>
  );
}
