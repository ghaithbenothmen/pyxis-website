"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Entry veil: a dark layer that lifts as the page mounts so the hero sequence
 * starts from black. Only rendered visible when JavaScript runs (`.js`), and
 * skipped for reduced motion. Ready to host route transitions later.
 */
export function PageTransition() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.to(el, {
        opacity: 0,
        duration: reduced ? 0 : 0.8,
        ease: "power2.out",
        onComplete: () => gsap.set(el, { display: "none" }),
      });
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] hidden bg-background [.js_&]:block"
    />
  );
}
