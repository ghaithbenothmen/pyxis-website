import { gsap, ScrollTrigger } from "@/lib/gsap";
import { media } from "@/lib/constants";

/**
 * A scene animation receives the root element of its section. Anything it
 * creates is collected by the surrounding gsap.context() and reverted on
 * unmount; it may also return its own cleanup.
 */
export type SceneAnimation = (root: HTMLElement) => void | (() => void);

/** Scoped query helper — never matches elements outside the scene. */
export function select<T extends Element = HTMLElement>(
  root: HTMLElement,
  selector: string,
): T[] {
  return Array.from(root.querySelectorAll<T>(selector));
}

/** Conditions shared by every scene's gsap.matchMedia(). */
export const sceneConditions = {
  desktop: `${media.desktop} and ${media.motion}`,
  compact: `(max-width: 1023px) and ${media.motion}`,
  reduced: media.reduced,
} as const;

export type SceneConditions = Record<keyof typeof sceneConditions, boolean>;

/**
 * Registers responsive variants of a scene and returns the cleanup.
 * `desktop` gets the full cinematic version, `compact` a lighter one for
 * tablet/mobile, and `reduced` a static, fully visible state.
 */
export function responsiveScene(
  build: (conditions: SceneConditions) => void | (() => void),
) {
  const mm = gsap.matchMedia();
  mm.add(sceneConditions, (context) => {
    return build(context.conditions as SceneConditions);
  });
  return () => mm.revert();
}

/** Recalculates trigger positions once fonts and images have settled. */
export function initGlobalRefresh() {
  const refresh = () => ScrollTrigger.refresh();
  document.fonts?.ready.then(refresh).catch(() => undefined);
  window.addEventListener("load", refresh, { once: true });
  return () => window.removeEventListener("load", refresh);
}
