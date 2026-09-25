import { gsap } from "@/lib/gsap";
import { responsiveScene, select, type SceneAnimation } from "./global";

/**
 * Company principles: cards rise in one after another as they enter the
 * viewport, and each icon draws itself. The icons' own loops run in CSS.
 */
export const principlesAnimation: SceneAnimation = (root) =>
  responsiveScene(({ reduced, compact }) => {
    if (reduced) return;

    const cards = select(root, '[data-principle="card"]');
    const tl = gsap.timeline({
      defaults: { ease: "expo.out" },
      scrollTrigger: { trigger: root, start: "top 80%", toggleActions: "play none none none" },
    });

    tl.from(cards, { opacity: 0, y: compact ? 32 : 56, duration: 1.1, stagger: compact ? 0.1 : 0.14 }, 0);
    cards.forEach((card, i) => {
      const strokes = select<SVGElement>(card, '[data-principle="draw"]');
      tl.fromTo(
        strokes,
        { strokeDasharray: 1, strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 1, stagger: 0.06, ease: "power2.inOut" },
        0.3 + i * (compact ? 0.1 : 0.14),
      );
    });
  });
