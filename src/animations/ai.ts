import { gsap } from "@/lib/gsap";
import { responsiveScene, select, type SceneAnimation } from "./global";

/**
 * The ecosystem assembles itself: hub first, then spokes reach outward and
 * each use case lights up in turn. On mobile the list reveals item by item.
 */
export const aiAnimation: SceneAnimation = (root) =>
  responsiveScene(({ reduced }) => {
    if (reduced) return;
    const part = (name: string) => select(root, `[data-ai="${name}"]`);

    const hub = part("hub")[0];
    if (hub) {
      gsap
        .timeline({
          defaults: { ease: "expo.out" },
          scrollTrigger: { trigger: hub.parentElement, start: "top 70%", toggleActions: "play none none none" },
        })
        .from(hub, { scale: 0.7, opacity: 0, duration: 1.4 }, 0)
        .fromTo(part("spoke"), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.2, stagger: 0.06, ease: "power2.inOut" }, 0.3)
        .from(part("ring"), { opacity: 0, duration: 1.6 }, 0.6)
        .from(part("node"), { opacity: 0, y: 12, duration: 1, stagger: 0.06 }, 0.8);
    }

    part("item").forEach((item) => {
      gsap.from(item, {
        opacity: 0,
        x: -16,
        duration: 1,
        scrollTrigger: { trigger: item, start: "top 88%", once: true },
      });
    });
  });
