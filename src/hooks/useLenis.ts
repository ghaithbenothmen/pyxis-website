"use client";

import { useSyncExternalStore } from "react";
import type Lenis from "lenis";

// Tiny external store holding the single Lenis instance created by
// <LenisProvider>. Components subscribe instead of prop-drilling.
let instance: Lenis | null = null;
const listeners = new Set<() => void>();

export function setLenisInstance(next: Lenis | null) {
  instance = next;
  listeners.forEach((listener) => listener());
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/** The active Lenis instance, or `null` when smooth scrolling is disabled. */
export function useLenis(): Lenis | null {
  return useSyncExternalStore(
    subscribe,
    () => instance,
    () => null,
  );
}

/** Scrolls to an in-page anchor through Lenis when available. */
export function scrollToHash(lenis: Lenis | null, hash: string) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return;

  if (lenis) {
    lenis.scrollTo(target, { duration: 1.4, force: true });
  } else {
    target.scrollIntoView({ behavior: "auto" });
  }
  // Move focus for keyboard and screen-reader users.
  target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  history.replaceState(null, "", hash);
}
