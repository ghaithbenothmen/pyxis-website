"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { media } from "@/lib/constants";

type RevealProps = {
  lines: string[];
  delay?: number;
  className?: string;
};

/**
 * Masked line-by-line reveal for headings. Render inside the heading element
 * so the semantic tag stays on the server.
 */
export function Reveal({ lines, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const inner = el.querySelectorAll("[data-line]");
      const mm = gsap.matchMedia();
      mm.add(media.motion, () => {
        gsap.fromTo(
          inner,
          { yPercent: 110, opacity: 1 },
          {
            yPercent: 0,
            duration: 1.3,
            delay,
            stagger: 0.09,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {lines.map((line) => (
        <span key={line} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <span data-line="" data-intro="" className="block">
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}
