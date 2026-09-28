import { gsap } from "@/lib/gsap";
import { responsiveScene, select, type SceneAnimation } from "./global";

/**
 * Subscriber attribution: the four steps arrive one after another with their
 * connectors drawing in between, then the highlight keeps walking the chain
 * (IP → correlation → subscriber → timeline) in a slow loop.
 */
export const traceAnimation: SceneAnimation = (root) =>
  responsiveScene(({ desktop, reduced }) => {
    const steps = select(root, '[data-trace="step"]');
    const setActive = (index: number) =>
      steps.forEach((step, i) => step.toggleAttribute("data-active", i === index));

    if (reduced) {
      setActive(steps.length - 1);
      return () => setActive(-1);
    }

    const links = select(root, '[data-trace="link"]');
    const HOLD = 1.8;
    const loop = gsap.timeline({ paused: true, repeat: -1 });
    steps.forEach((_, i) => loop.call(() => setActive(i), undefined, i * HOLD));
    loop.to({}, { duration: HOLD }, (steps.length - 1) * HOLD);

    gsap.set(links, desktop ? { scaleX: 0, transformOrigin: "0% 50%" } : { scaleY: 0, transformOrigin: "50% 0%" });

    const tl = gsap.timeline({
      defaults: { ease: "expo.out" },
      scrollTrigger: { trigger: select(root, '[data-trace="stage"]')[0], start: "top 75%", toggleActions: "play none none none" },
    });
    steps.forEach((step, i) => {
      const at = i * 0.45;
      tl.from(step, { opacity: 0, y: 28, duration: 0.9 }, at);
      tl.call(() => setActive(i), undefined, at + 0.2);
      if (links[i]) tl.to(links[i], { scaleX: 1, scaleY: 1, duration: 0.5, ease: "power2.inOut" }, at + 0.35);
    });
    tl.call(() => loop.play(0), undefined, steps.length * 0.45 + 0.9);

    return () => setActive(-1);
  });
