"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type NetworkFieldProps = {
  className?: string;
  /** Multiplies the automatically computed node count. */
  density?: number;
  /** Delay before data pulses begin travelling, in ms. */
  startDelay?: number;
  /** RGB triplet matching --primary, e.g. "168,200,234". */
  color?: string;
  /** RGB triplet for hub nodes, matching --accent (brand orange). */
  accent?: string;
};

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  depth: number;
  hub: boolean;
};

type Pulse = {
  from: number;
  to: number;
  t: number;
  speed: number;
};

const LINK_DISTANCE = 170;
const MAX_PULSES = 16;

/**
 * Ambient telecom network drawn on a single canvas: drifting nodes, proximity
 * links and data pulses travelling between them. One element regardless of
 * node count; pauses off-screen, when the tab is hidden, and renders a single
 * static frame for reduced motion.
 */
export function NetworkField({
  className,
  density = 1,
  startDelay = 0,
  color = "168,200,234",
  accent = "206,92,38",
}: NetworkFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    const pulses: Pulse[] = [];
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let frame = 0;
    let visible = true;
    let running = false;
    const startAt = performance.now() + startDelay;

    const seed = () => {
      const area = width * height;
      const count = Math.round(Math.min(120, Math.max(28, area / 15000)) * density);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        depth: 0.35 + Math.random() * 0.65,
        hub: Math.random() < 0.08,
      }));
      pulses.length = 0;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (!running) draw(performance.now());
    };

    const position = (node: Node) => ({
      x: node.x + pointer.x * node.depth * 18,
      y: node.y + pointer.y * node.depth * 18,
    });

    const spawnPulse = () => {
      const from = Math.floor(Math.random() * nodes.length);
      const a = nodes[from];
      let best = -1;
      let bestDistance = Infinity;
      for (let i = 0; i < nodes.length; i++) {
        if (i === from) continue;
        const d = Math.hypot(nodes[i].x - a.x, nodes[i].y - a.y);
        if (d < LINK_DISTANCE && d > 40 && d < bestDistance * (0.6 + Math.random())) {
          best = i;
          bestDistance = d;
        }
      }
      if (best >= 0) {
        pulses.push({ from, to: best, t: 0, speed: 0.006 + Math.random() * 0.01 });
      }
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;

      const points = nodes.map(position);

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d > LINK_DISTANCE) continue;
          const alpha = (1 - d / LINK_DISTANCE) * 0.16 * Math.min(nodes[i].depth, nodes[j].depth);
          ctx.strokeStyle = `rgba(${color},${alpha})`;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const p = points[i];
        ctx.fillStyle = node.hub ? `rgba(${accent},0.95)` : `rgba(${color},${0.25 + node.depth * 0.35})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, node.hub ? 1.8 : 0.6 + node.depth * 0.8, 0, Math.PI * 2);
        ctx.fill();
        if (node.hub) {
          ctx.strokeStyle = `rgba(${accent},0.3)`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 7 + Math.sin(now / 900 + i) * 2, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      if (now < startAt) return;
      if (pulses.length < MAX_PULSES && Math.random() < 0.12) spawnPulse();

      for (let k = pulses.length - 1; k >= 0; k--) {
        const pulse = pulses[k];
        pulse.t += pulse.speed;
        if (pulse.t >= 1) {
          pulses.splice(k, 1);
          continue;
        }
        const a = points[pulse.from];
        const b = points[pulse.to];
        const x = a.x + (b.x - a.x) * pulse.t;
        const y = a.y + (b.y - a.y) * pulse.t;
        const tail = Math.max(0, pulse.t - 0.18);
        const gradient = ctx.createLinearGradient(
          a.x + (b.x - a.x) * tail,
          a.y + (b.y - a.y) * tail,
          x,
          y,
        );
        gradient.addColorStop(0, `rgba(${color},0)`);
        gradient.addColorStop(1, `rgba(${color},0.8)`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(a.x + (b.x - a.x) * tail, a.y + (b.y - a.y) * tail);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = `rgba(255,255,255,0.9)`;
        ctx.beginPath();
        ctx.arc(x, y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;
      }
    };

    const loop = (now: number) => {
      draw(now);
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduced || !visible || document.hidden) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const onPointer = (event: PointerEvent) => {
      pointer.tx = event.clientX / window.innerWidth - 0.5;
      pointer.ty = event.clientY / window.innerHeight - 0.5;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    intersection.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);
    if (!reduced) window.addEventListener("pointermove", onPointer, { passive: true });

    resize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [accent, color, density, startDelay]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("block size-full", className)}
    />
  );
}
