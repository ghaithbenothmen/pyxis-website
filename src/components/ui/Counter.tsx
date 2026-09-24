"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { media } from "@/lib/constants";

type CounterProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  suffixClassName?: string;
};

const format = (n: number, decimals: number) =>
  n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

/**
 * Counts up to `value` when scrolled into view. The final value is rendered
 * on the server so it is correct without JavaScript or with reduced motion.
 */
export function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  suffixClassName,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(media.motion, () => {
        const state = { n: 0 };
        const render = () => {
          el.textContent = format(state.n, decimals);
        };
        render();
        gsap.to(state, {
          n: value,
          duration: 2.2,
          ease: "power3.out",
          onUpdate: render,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
        return () => {
          el.textContent = format(value, decimals);
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <span className={className}>
      {prefix}
      <span ref={ref} className="tabular-nums">
        {format(value, decimals)}
      </span>
      {suffix ? <span className={suffixClassName}>{suffix}</span> : null}
    </span>
  );
}
