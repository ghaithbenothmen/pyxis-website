import type { SceneAnimation } from "./global";
import { heroAnimation } from "./hero";
import { orionAnimation } from "./orion";
import { aiAnimation } from "./ai";
import { solutionsAnimation } from "./solutions";
import { investigationAnimation } from "./investigation";
import { technologyAnimation } from "./technology";
import { footprintAnimation } from "./footprint";

/** Registry of section timelines, looked up by <Scene name="…">. */
export const scenes = {
  hero: heroAnimation,
  orion: orionAnimation,
  ai: aiAnimation,
  solutions: solutionsAnimation,
  investigation: investigationAnimation,
  technology: technologyAnimation,
  footprint: footprintAnimation,
} satisfies Record<string, SceneAnimation>;

export type SceneName = keyof typeof scenes;
