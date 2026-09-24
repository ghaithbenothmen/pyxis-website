"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import type { SceneAnimation } from "@/animations/global";

/**
 * Runs a scene animation scoped to the returned ref.
 * Everything created inside is collected by gsap.context() and reverted on
 * unmount; any cleanup returned by the animation runs as well.
 */
export function useGsap<T extends HTMLElement = HTMLElement>(
  animation: SceneAnimation,
) {
  const scope = useRef<T>(null);

  useGSAP(
    () => {
      if (!scope.current) return;
      return animation(scope.current) ?? undefined;
    },
    { scope },
  );

  return scope;
}
