import { gsap } from "@/lib/gsap";
import { responsiveScene, select, type SceneAnimation } from "./global";

/**
 * Moment 1 — typography over network atmosphere.
 * Intro: background → metadata → eyebrow → title lines → lead → CTAs → network.
 * Scroll: content lifts away, background drifts, the network expands into Proof.
 */
export const heroAnimation: SceneAnimation = (root) =>
  responsiveScene(({ desktop, reduced }) => {
    if (reduced) return;
    const part = (name: string) => select(root, `[data-hero="${name}"]`);

    gsap
      .timeline({ defaults: { ease: "expo.out", duration: 1.4 } })
      .fromTo(part("bg"), { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 2.6 }, 0)
      .fromTo(part("meta"), { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, 0.2)
      .fromTo(
        part("eyebrow"),
        { opacity: 0, y: 12, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)" },
        0.4,
      )
      .fromTo(part("line"), { yPercent: 115, opacity: 1 }, { yPercent: 0, duration: 1.6, stagger: 0.12 }, 0.6)
      .fromTo(
        part("lead"),
        { opacity: 0, y: 18, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)" },
        0.9,
      )
      .fromTo(part("cta"), { opacity: 0, y: 18 }, { opacity: 1, y: 0, stagger: 0.08 }, 1.2)
      .fromTo(part("network"), { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 2.4 }, 1.4);

    gsap
      .timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
      })
      .to(part("content"), { yPercent: desktop ? -16 : -8, opacity: 0 }, 0)
      .to(part("bg-inner"), { yPercent: desktop ? 14 : 6, scale: 1.08 }, 0)
      .to(part("network-inner"), { scale: desktop ? 1.35 : 1.15, opacity: 0.45 }, 0);
  });
