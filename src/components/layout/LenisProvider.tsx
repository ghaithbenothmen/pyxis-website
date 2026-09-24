"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { scrollToHash, setLenisInstance } from "@/hooks/useLenis";
import { initGlobalRefresh } from "@/animations/global";

/**
 * Smooth scrolling driven by GSAP's ticker so Lenis and ScrollTrigger share
 * one animation frame. Disabled entirely for reduced motion. Also owns scroll
 * position across client-side page changes.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const firstRender = useRef(true);

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
    lenisRef.current = lenis;

    // In-page anchors scroll through Lenis and hand focus to the target. Runs in
    // the capture phase so it wins over <Link> for same-page hashes.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey) return;
      const href = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]")?.getAttribute("href");
      if (!href) return;
      const hash = href.startsWith("#") ? href : href.startsWith("/#") && location.pathname === "/" ? href.slice(1) : null;
      if (!hash || hash === "#" || !document.querySelector(hash)) return;
      event.preventDefault();
      scrollToHash(lenis, hash);
    };
    document.addEventListener("click", onClick, true);

    let arrival: number | undefined;
    if (location.hash && document.querySelector(location.hash)) {
      const hash = location.hash;
      const go = () => {
        arrival = window.setTimeout(() => {
          ScrollTrigger.refresh();
          scrollToHash(lenis, hash);
        }, 350);
      };
      if (document.readyState === "complete") go();
      else window.addEventListener("load", go, { once: true });
    }

    return () => {
      document.removeEventListener("click", onClick, true);
      window.clearTimeout(arrival);
      if (lenis) {
        gsap.ticker.remove(raf);
        lenis.destroy();
        setLenisInstance(null);
      }
      lenisRef.current = null;
      cleanupRefresh();
    };
  }, []);

  // After a client-side page change: start at the top (or at the linked
  // section once the new page's pinned sections have been measured).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const lenis = lenisRef.current;
    const hash = location.hash;
    if (!hash) lenis?.scrollTo(0, { immediate: true, force: true });
    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh();
      if (hash && document.querySelector(hash)) scrollToHash(lenis, hash);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return children;
}
