"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { scrollToHash, setLenisInstance } from "@/hooks/useLenis";
import { initGlobalRefresh } from "@/animations/global";

/**
 * Smooth scrolling driven by GSAP's ticker so Lenis and ScrollTrigger share
 * one animation frame. Disabled entirely for reduced motion.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const cleanupRefresh = initGlobalRefresh();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = reduced ? null : new Lenis({ lerp: 0.1 });

    const raf = (time: number) => lenis?.raf(time * 1000);
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      setLenisInstance(lenis);
    }

    // In-page anchors scroll through Lenis and hand focus to the target.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey) return;
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = link?.getAttribute("href");
      if (!hash || hash === "#") return;
      event.preventDefault();
      scrollToHash(lenis, hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      if (lenis) {
        gsap.ticker.remove(raf);
        lenis.destroy();
        setLenisInstance(null);
      }
      cleanupRefresh();
    };
  }, []);

  return children;
}
