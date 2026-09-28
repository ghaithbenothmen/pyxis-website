import { gsap } from "@/lib/gsap";
import { responsiveScene, select, type SceneAnimation } from "./global";

/** Each audience's panels open one after another like shutters as they arrive. */
export const solutionsAnimation: SceneAnimation = (root) =>
  responsiveScene(({ desktop, reduced }) => {
    if (reduced) return;

    if (desktop) {
      select(root, '[data-solutions="stage"]').forEach((stage) => {
        gsap.fromTo(
          select(stage, '[data-solutions="panel"]'),
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.6,
            stagger: 0.18,
            ease: "expo.inOut",
            scrollTrigger: { trigger: stage, start: "top 78%", once: true },
            clearProps: "clipPath",
          },
        );
      });
      return;
    }

    select(root, '[data-solutions="panel"]').forEach((panel) => {
      gsap.from(panel, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        scrollTrigger: { trigger: panel, start: "top 85%", once: true },
      });
    });
  });
