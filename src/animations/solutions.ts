import { gsap } from "@/lib/gsap";
import { responsiveScene, select, type SceneAnimation } from "./global";

/** Panels open one after another like shutters as the section arrives. */
export const solutionsAnimation: SceneAnimation = (root) =>
  responsiveScene(({ desktop, reduced }) => {
    if (reduced) return;
    const panels = select(root, '[data-solutions="panel"]');

    if (desktop) {
      gsap.fromTo(
        panels,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.6,
          stagger: 0.18,
          ease: "expo.inOut",
          scrollTrigger: { trigger: select(root, '[data-solutions="stage"]')[0], start: "top 75%", once: true },
          clearProps: "clipPath",
        },
      );
      return;
    }

    panels.forEach((panel) => {
      gsap.from(panel, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        scrollTrigger: { trigger: panel, start: "top 85%", once: true },
      });
    });
  });
