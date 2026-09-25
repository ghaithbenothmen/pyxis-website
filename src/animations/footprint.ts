import { gsap } from "@/lib/gsap";
import { responsiveScene, select, type SceneAnimation } from "./global";

/**
 * Global presence: the dotted map fades in, then links draw outwards from
 * Tunis to the UK office and each project country; offices keep pulsing.
 */
export const footprintAnimation: SceneAnimation = (root) =>
  responsiveScene(({ reduced }) => {
    // Small screens: the map is wider than the viewport; start on Europe / Africa
    const scroller = root.querySelector<HTMLElement>('[data-footprint="scroller"]');
    if (scroller && scroller.scrollWidth > scroller.clientWidth) {
      scroller.scrollLeft = scroller.scrollWidth * 0.52 - scroller.clientWidth / 2;
    }

    if (reduced) return;
    const part = (name: string) => select<SVGElement | HTMLElement>(root, `[data-footprint="${name}"]`);

    part("ring").forEach((ring, i) => {
      gsap.fromTo(
        ring,
        { scale: 0.7, opacity: 0.9, transformOrigin: "50% 50%" },
        { scale: 3, opacity: 0, duration: 2.6, ease: "power1.out", repeat: -1, delay: i * 1.1 },
      );
    });

    gsap.set(part("link"), { strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.set(part("node"), { scale: 0, transformOrigin: "50% 50%" });
    gsap.set(part("pulse"), { opacity: 0 });

    gsap
      .timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: root, start: "top 75%", toggleActions: "play none none none" },
      })
      .from(part("dots"), { opacity: 0, duration: 1.4, ease: "power2.out" }, 0)
      .to(part("link"), { strokeDashoffset: 0, duration: 1.2, stagger: 0.09, ease: "power2.inOut" }, 0.5)
      .to(part("node"), { scale: 1, duration: 0.5, stagger: 0.09, ease: "back.out(3)" }, 1.4)
      .from(part("label"), { opacity: 0, duration: 0.6, stagger: 0.06 }, 1.5)
      .to(part("pulse"), { opacity: 1, duration: 0.8, stagger: 0.05 }, 2.2);
  });
