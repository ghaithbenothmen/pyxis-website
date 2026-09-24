import { Scene } from "@/components/animation/Scene";
import { HeroVisual } from "./HeroVisual";
import { HeroContent } from "./HeroContent";

export function Hero() {
  return (
    <Scene
      name="hero"
      id="top"
      aria-label="Introduction"
      className="relative isolate overflow-hidden"
    >
      <HeroVisual />
      <HeroContent />
    </Scene>
  );
}
