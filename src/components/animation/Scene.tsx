"use client";

import type { ComponentPropsWithoutRef, ElementType } from "react";
import { useGsap } from "@/hooks/useGsap";
import { scenes, type SceneName } from "@/animations";

type SceneProps<T extends ElementType> = {
  name: SceneName;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "ref">;

/**
 * Client boundary for a section's animation. The section markup stays a
 * Server Component and is passed through as children; this wrapper only
 * attaches the matching timeline from `src/animations`.
 */
export function Scene<T extends ElementType = "section">({
  name,
  as,
  ...props
}: SceneProps<T>) {
  const ref = useGsap<HTMLElement>(scenes[name]);
  const Tag: ElementType = as ?? "section";
  return <Tag ref={ref} data-scene={name} {...props} />;
}
