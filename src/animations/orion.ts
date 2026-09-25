import { gsap } from "@/lib/gsap";
import { responsiveScene, select, type SceneAnimation } from "./global";

/**
 * Moment 2 — Data → ORION → Intelligence.
 * Plays once, at a calm pace, when the diagram enters the viewport; then it
 * stays live like the Data ecosystem: data keeps flowing in and out, and the
 * processing labels (Aggregate · Cleanse · Correlate) keep cycling in the core.
 */
export const orionAnimation: SceneAnimation = (root) =>
  responsiveScene(({ reduced }) => {
    if (reduced) return;

    const part = (name: string) => select(root, `[data-orion="${name}"]`);
    const steps = select(root, "[data-orion-step]");
    // Rings spin around their own centre (the ORION core), which is not the
    // middle of the viewBox in every layout.
    const svgOrigin = (el: Element) => {
      const circle = el.querySelector("circle");
      return circle ? `${circle.getAttribute("cx")} ${circle.getAttribute("cy")}` : "0 0";
    };

    // Ambient rotation, independent of scroll.
    part("ring-ambient").forEach((ring) => {
      gsap.to(ring, { rotation: 360, svgOrigin: svgOrigin(ring), duration: 60, ease: "none", repeat: -1 });
    });

    let activeStep = -1;
    const setStep = (index: number) => {
      if (index === activeStep) return;
      activeStep = index;
      steps.forEach((step, i) => step.toggleAttribute("data-active", i === index));
    };

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut", duration: 1 },
      onUpdate() {
        setStep(Math.min(steps.length - 1, Math.floor(this.time())));
      },
      scrollTrigger: { trigger: part("stage")[0], start: "top 70%", toggleActions: "play none none none" },
      // While the sequence plays, the stage list follows along; once done, all stages show.
      onStart: () => root.setAttribute("data-playing", ""),
      onComplete: () => root.removeAttribute("data-playing"),
    });

    // Resting state before the sequence begins
    gsap.set(part("glow"), { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" });
    gsap.set(part("out-line"), { strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.set(part("output"), { opacity: 0, y: 20 });
    gsap.set(part("in-pulse"), { opacity: 0 });
    gsap.set(part("flow"), { opacity: 0 });

    // Stage 1 — sources appear
    tl.fromTo(part("source"), { opacity: 0, y: -24 }, { opacity: 1, y: 0, stagger: 0.12, ease: "expo.out" }, 0);
    tl.fromTo(part("core"), { opacity: 0.18 }, { opacity: 0.35 }, 0);

    // Stage 2 — lines connect
    tl.fromTo(
      part("in-line"),
      { strokeDasharray: 1, strokeDashoffset: 1 },
      { strokeDashoffset: 0, stagger: 0.08 },
      1,
    );

    // Stage 3 — data particles travel toward ORION
    const waves = [0, 1].map((k) => select(root, `[data-orion="in-pulse"][data-wave="${k}"]`));
    waves.forEach((pulses, k) => {
      const at = 2 + k * 0.3;
      tl.set(pulses, { opacity: 1 }, at);
      tl.fromTo(pulses, { strokeDashoffset: 0.08 }, { strokeDashoffset: -1, ease: "none", duration: 0.75, stagger: 0.05 }, at);
      tl.set(pulses, { opacity: 0 }, at + 0.95);
    });

    // Stage 4 — ORION illuminates
    tl.to(part("core"), { opacity: 1 }, 3);
    tl.to(part("glow"), { opacity: 1, scale: 1 }, 3);

    // Stage 5 — the engine processes
    part("ring-scrub").forEach((ring) => {
      tl.to(ring, { rotation: 240, svgOrigin: svgOrigin(ring), ease: "none" }, 4);
    });
    const processes = part("process");
    gsap.set(processes, { opacity: 0 });
    // The processing labels start their slow loop here and keep cycling after
    tl.call(() => labelLoop.play(0), undefined, 4);

    // Stage 6 — outputs appear
    tl.to(part("out-line"), { strokeDashoffset: 0, stagger: 0.1 }, 5);
    tl.to(part("output"), { opacity: 1, y: 0, stagger: 0.12, ease: "expo.out" }, 5.35);

    // Stage 7 — the pipeline stays live: continuous flow in and out (CSS loop)
    tl.to(part("flow"), { opacity: 1, duration: 0.8, ease: "power1.out" }, 6);
    tl.timeScale(1.15);

    // Processing labels loop in the core — built now (so it is cleaned up with
    // the scene), started from the "Process" stage of the sequence.
    const HOLD = 2; // seconds each processing label stays readable
    const labelLoop = gsap.timeline({ paused: true, repeat: -1 });
    labelLoop.set(processes, { opacity: 0 }, 0);
    // The wide and tall diagrams each hold a set of labels; index within each
    // diagram so both cycle in step (Aggregate → Cleanse → Correlate).
    processes.forEach((label) => {
      const siblings = label.closest("svg")?.querySelectorAll('[data-orion="process"]') ?? [];
      const i = Array.from(siblings).indexOf(label);
      labelLoop
        .fromTo(label, { opacity: 0, y: 4 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, i * HOLD)
        .to(label, { opacity: 0, duration: 0.35, ease: "power2.in" }, (i + 1) * HOLD - 0.35);
    });

    return () => root.removeAttribute("data-playing");
  });
