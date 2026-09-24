import { gsap } from "@/lib/gsap";
import { pad } from "@/lib/utils";
import { responsiveScene, select, type SceneAnimation } from "./global";

/**
 * Moment 2 — Data → ORION → Intelligence.
 * Desktop: a pinned, scroll-scrubbed sequence in seven stages.
 * Tablet/mobile: the same story, scrubbed by scroll without pinning.
 */
export const orionAnimation: SceneAnimation = (root) =>
  responsiveScene(({ desktop, reduced }) => {
    if (reduced) return;

    const part = (name: string) => select(root, `[data-orion="${name}"]`);
    const steps = select(root, "[data-orion-step]");
    const counter = part("counter")[0];
    const svgOrigin = (el: Element) => {
      const svg = el.closest("svg");
      const box = svg?.viewBox.baseVal;
      return box ? `${box.width / 2} ${box.height / 2}` : "0 0";
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
      if (counter) counter.textContent = `${pad(index + 1)} / ${pad(steps.length)}`;
    };

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut", duration: 1 },
      onUpdate() {
        setStep(Math.min(steps.length - 1, Math.floor(this.time())));
      },
      scrollTrigger: desktop
        ? {
            trigger: part("pin")[0],
            start: "top top",
            end: "+=360%",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            onToggle: (self) => root.toggleAttribute("data-pinned", self.isActive || self.progress > 0),
          }
        : { trigger: part("stage")[0], start: "top 80%", end: "bottom 65%", scrub: 0.6 },
    });

    // Resting state before the sequence begins
    gsap.set(part("glow"), { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" });
    gsap.set(part("out-line"), { strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.set(part("output"), { opacity: 0, y: 20 });
    gsap.set(part("in-pulse"), { opacity: 0 });

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
    processes.forEach((label, i) => {
      tl.fromTo(label, { opacity: 0 }, { opacity: 1, duration: 0.15 }, 4 + i * 0.33);
      if (i < processes.length - 1) tl.to(label, { opacity: 0, duration: 0.15 }, 4 + (i + 1) * 0.33 - 0.05);
    });

    // Stage 6 — outputs appear
    tl.to(part("out-line"), { strokeDashoffset: 0, stagger: 0.1 }, 5);
    tl.to(part("output"), { opacity: 1, y: 0, stagger: 0.12, ease: "expo.out" }, 5.35);

    // Stage 7 — hand over to machine intelligence
    if (desktop) {
      tl.to(part("stage"), { scale: 0.94, opacity: 0.4, y: -40 }, 6);
      tl.to(part("progress"), { scaleX: 1, ease: "none", duration: tl.duration() }, 0);
    }

    return () => root.removeAttribute("data-pinned");
  });
