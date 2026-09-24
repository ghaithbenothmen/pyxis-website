"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { media } from "@/lib/constants";

type FadeUpProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Stagger direct children instead of animating the wrapper as a whole. */
  stagger?: number;
  as?: "div" | "p" | "ul" | "ol";
};

/** Fades and lifts content into place when it enters the viewport. */
export function FadeUp({
  children,
  className,
  delay = 0,
  stagger,
  as: Tag = "div",
}: FadeUpProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(media.motion, () => {
        const targets = stagger ? Array.from(el.children) : el;
        gsap.set(el, { opacity: 1 });
        gsap.from(targets, {
          y: 36,
          opacity: 0,
          duration: 1.2,
          delay,
          stagger,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag
      ref={ref as never}
      className={className}
      data-intro=""
    >
      {children}
    </Tag>
  );
}
