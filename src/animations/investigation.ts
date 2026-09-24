import { gsap } from "@/lib/gsap";
import { responsiveScene, select, type SceneAnimation } from "./global";

/**
 * Moment 3 — Events → Correlation → Investigation.
 * Plays once, one workflow step per stage, when the map enters the viewport.
 */
export const investigationAnimation: SceneAnimation = (root) =>
  responsiveScene(({ reduced }) => {
    if (reduced) return;

    const part = (name: string) => select<SVGElement | HTMLElement>(root, `[data-inv="${name}"]`);
    const steps = select(root, "[data-inv-step]");
    const events = part("event");
    const within = (el: Element, name: string) => select(el as HTMLElement, `[data-inv="${name}"]`);

    // Ambient ping around each event marker
    part("event-ping").forEach((ping, i) => {
      gsap.fromTo(
        ping,
        { scale: 0.6, opacity: 0.7, transformOrigin: "50% 50%" },
        { scale: 2.4, opacity: 0, duration: 2.4, ease: "power1.out", repeat: -1, delay: i * 0.5 },
      );
    });

    // Resting state
    gsap.set(events, { opacity: 0 });
    gsap.set(part("event-label"), { opacity: 0, x: -10 });
    gsap.set(part("bar"), { scaleY: 0, transformOrigin: "50% 100%" });
    gsap.set(part("fingerprint"), { opacity: 0 });
    gsap.set(part("cell"), { opacity: 0 });
    gsap.set(part("perimeter"), { scale: 0.2, opacity: 0, transformOrigin: "50% 50%" });
    gsap.set(part("perimeter-label"), { opacity: 0 });
    gsap.set(part("link"), { strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.set(part("link-label"), { opacity: 0 });
    gsap.set(part("target"), { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" });
    gsap.set(part("evidence"), { opacity: 0, y: 24 });
    gsap.set(part("evidence-item"), { opacity: 0, x: 12 });

    let current = -1;
    const setStep = (index: number) => {
      if (index === current) return;
      current = index;
      steps.forEach((step, i) => {
        step.toggleAttribute("data-active", i === index);
        step.toggleAttribute("data-done", i < index);
      });
    };

    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 0.8 },
      onUpdate() {
        setStep(Math.min(steps.length - 1, Math.floor(this.time())));
      },
      scrollTrigger: { trigger: part("map")[0], start: "top 70%", toggleActions: "play none none none" },
      // While the sequence plays, the stage list follows along; once done, all stages show.
      onStart: () => root.setAttribute("data-playing", ""),
      onComplete: () => root.removeAttribute("data-playing"),
    });

    const showEvent = (i: number, at: number) => {
      const event = events[i];
      if (!event) return;
      tl.fromTo(event, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "none" }, at);
      tl.to(within(event, "event-label"), { opacity: 1, x: 0 }, at + 0.3);
    };

    // 01 Network event · 02 Timestamp · 03 Packet fingerprint
    showEvent(0, 0.1);
    showEvent(1, 1.2);
    tl.to(part("fingerprint"), { opacity: 1, duration: 0.3 }, 2);
    tl.to(part("bar"), { scaleY: 1, stagger: { each: 0.015, from: "start" } }, 2);
    showEvent(2, 2.4);

    // 04 Cell / BTS context
    tl.to(part("cell"), { opacity: 1, stagger: 0.15 }, 3);
    tl.fromTo(part("tower-hot"), { scale: 1, transformOrigin: "50% 50%" }, { scale: 1.8, yoyo: true, repeat: 1, duration: 0.4 }, 3.1);

    // 05 Geo-perimeter
    tl.to(part("perimeter"), { scale: 1, opacity: 1, duration: 1, ease: "expo.out" }, 4);
    tl.to(part("perimeter-label"), { opacity: 1 }, 4.5);

    // 06 Multi-event correlation
    tl.to(part("link"), { strokeDashoffset: 0, stagger: 0.2, ease: "power2.inOut" }, 5);
    tl.to(part("link-label"), { opacity: 1, stagger: 0.2 }, 5.4);

    // 07 Investigative intelligence
    tl.to(part("target"), { opacity: 1, scale: 1, ease: "expo.out" }, 6);
    tl.to(part("evidence"), { opacity: 1, y: 0 }, 6.1);
    tl.to(part("evidence-item"), { opacity: 1, x: 0, stagger: 0.12 }, 6.3);
    tl.to({}, { duration: 0.4 }, 6.8);
    tl.timeScale(2.2);

    return () => root.removeAttribute("data-playing");
  });
