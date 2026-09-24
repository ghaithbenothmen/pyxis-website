import { gsap } from "@/lib/gsap";
import { responsiveScene, select, type SceneAnimation } from "./global";

/** Sources list in, connections draw toward the pipeline, stages light up in order. */
export const technologyAnimation: SceneAnimation = (root) =>
  responsiveScene(({ reduced }) => {
    if (reduced) return;
    const part = (name: string) => select(root, `[data-tech="${name}"]`);

    const diagram = part("diagram")[0];
    if (diagram) {
      gsap
        .timeline({
          defaults: { ease: "expo.out", duration: 1.2 },
          scrollTrigger: { trigger: diagram, start: "top 70%", toggleActions: "play none none none" },
        })
        .from(part("source"), { opacity: 0, x: -20, stagger: 0.05 }, 0)
        .fromTo(part("path"), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.4, stagger: 0.04, ease: "power2.inOut" }, 0.3)
        .fromTo(part("main"), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, 1)
        .from(part("stage"), { opacity: 0, y: 12, stagger: 0.14 }, 1.1);
    }

    const chips = part("chip");
    if (chips.length) {
      gsap.from(chips, {
        opacity: 0,
        y: 10,
        stagger: 0.04,
        duration: 0.8,
        scrollTrigger: { trigger: chips[0].parentElement, start: "top 85%", once: true },
      });
    }
    part("step").forEach((step) => {
      gsap.from(step, {
        opacity: 0,
        x: -12,
        duration: 1,
        scrollTrigger: { trigger: step, start: "top 90%", once: true },
      });
    });
  });
