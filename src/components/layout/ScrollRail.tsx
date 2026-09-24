"use client";

import { useEffect, useRef, useState } from "react";
import { chapters } from "@/lib/constants";
import { pad } from "@/lib/utils";

/**
 * Fixed chapter indicator on large screens: shows which part of the story is
 * in view and how far along the page the visitor is.
 */
export function ScrollRail() {
  const [index, setIndex] = useState(0);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const i = chapters.findIndex((c) => c.id === entry.target.id);
          if (i >= 0) setIndex(i);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    chapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? window.scrollY / max : 0;
        if (barRef.current) barRef.current.style.transform = `scaleY(${progress})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="label pointer-events-none fixed top-1/2 right-5 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 text-[0.625rem] text-subtle xl:flex"
    >
      <span className="text-accent tabular-nums">{pad(index)}</span>
      <span className="relative h-28 w-px bg-border">
        <span ref={barRef} className="absolute inset-0 origin-top scale-y-0 bg-primary" />
      </span>
      <span className="[writing-mode:vertical-rl]">{chapters[index]?.label}</span>
    </div>
  );
}
