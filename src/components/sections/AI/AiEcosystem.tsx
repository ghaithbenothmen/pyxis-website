"use client";

import { useEffect, useRef, useState } from "react";
import { aiUseCases } from "@/data/ai-use-cases";
import { cn, pad } from "@/lib/utils";

const RADIUS_X = 36;
const RADIUS_Y = 41;
const CYCLE_MS = 3800;
const VB_W = 160;
const VB_H = 110;
/** Roughly one CSS pixel at the stage's full width. */
const STROKE = 0.16;

const nodes = aiUseCases.map((useCase, i) => {
  const angle = ((-90 + (360 / aiUseCases.length) * i) * Math.PI) / 180;
  const x = 50 + RADIUS_X * Math.cos(angle);
  const y = 50 + RADIUS_Y * Math.sin(angle);
  return { ...useCase, x, y };
});

type Placement = "left" | "right" | "top" | "bottom";

const nodePlacement = ({ x, y }: { x: number; y: number }): Placement =>
  x < 45 ? "left" : x > 55 ? "right" : y < 50 ? "top" : "bottom";

/** Keeps the 14px marker centred on its point with the label outside the ring. */
const layout: Record<Placement, { className: string; transform: string }> = {
  right: { className: "", transform: "translate(-7px, -50%)" },
  left: { className: "flex-row-reverse text-right", transform: "translate(calc(-100% + 7px), -50%)" },
  top: { className: "flex-col-reverse gap-2 text-center", transform: "translate(-50%, calc(-100% + 7px))" },
  bottom: { className: "flex-col gap-2 text-center", transform: "translate(-50%, -7px)" },
};

/**
 * Hub-and-spoke map of the machine-intelligence use cases. Cycles through
 * them while in view until the visitor takes over with pointer, keyboard or
 * touch. Desktop shows the radial map; phones get a stacked version of the
 * same architecture (AI hub above, use cases below).
 */
export function AiEcosystem() {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !autoplay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: number | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      window.clearInterval(timer);
      if (entry.isIntersecting) {
        timer = window.setInterval(
          () => setActive((i) => (i + 1) % nodes.length),
          CYCLE_MS,
        );
      }
    }, { threshold: 0.4 });
    observer.observe(root);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [autoplay]);

  const select = (index: number) => {
    setAutoplay(false);
    setActive(index);
  };

  const current = nodes[active];

  return (
    <div ref={rootRef}>
      <MobileEcosystem active={active} onSelect={select} />
      <div className="relative mx-auto hidden aspect-[16/11] w-full max-w-3xl md:block">
        {/* Spokes and outer ring — viewBox matches the 16:11 stage so strokes scale evenly */}
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          aria-hidden="true"
          className="absolute inset-0 size-full overflow-visible"
        >
          <ellipse
            data-ai="ring"
            cx={VB_W / 2}
            cy={VB_H / 2}
            rx={(RADIUS_X / 100) * VB_W}
            ry={(RADIUS_Y / 100) * VB_H}
            pathLength={1}
            fill="none"
            stroke="var(--border-strong)"
            strokeWidth={STROKE}
            strokeDasharray="0.002 0.006"
          />
          {nodes.map((node, i) => (
            <g key={node.id}>
              <line
                data-ai="spoke"
                x1={VB_W / 2}
                y1={VB_H / 2}
                x2={(node.x / 100) * VB_W}
                y2={(node.y / 100) * VB_H}
                pathLength={1}
                stroke={i === active ? "var(--primary)" : "var(--border-strong)"}
                strokeWidth={STROKE}
                className="transition-[stroke] duration-500"
              />
              {i === active ? (
                <line
                  key={`pulse-${active}`}
                  x1={VB_W / 2}
                  y1={VB_H / 2}
                  x2={(node.x / 100) * VB_W}
                  y2={(node.y / 100) * VB_H}
                  pathLength={1}
                  stroke="var(--primary)"
                  strokeWidth={STROKE * 2.4}
                  strokeLinecap="round"
                  className="flow-pulse"
                  style={{ ["--flow-duration" as string]: "1.6s" }}
                />
              ) : null}
            </g>
          ))}
        </svg>

        {/* Hub */}
        <div
          data-ai="hub"
          className="absolute top-1/2 left-1/2 flex aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-border-strong bg-background p-[5%] text-center"
        >
          <span aria-hidden="true" className="absolute inset-[-6%] rounded-full border border-primary/20" />
          <span className="label text-primary">
            AI · {pad(active + 1)} / {pad(nodes.length)}
          </span>
          <p
            key={current.id}
            aria-live="polite"
            className="mt-3 font-display text-[clamp(0.95rem,1.4vw,1.25rem)] leading-tight tracking-tight motion-safe:animate-[fade-in_0.6s_var(--ease-out-expo)]"
          >
            {current.title}
          </p>
          <p className="mt-2 max-w-[24ch] text-xs leading-snug text-muted">
            {current.description}
          </p>
          <span className="label mt-3 text-[0.65rem] text-subtle">{current.domain}</span>
        </div>

        {/* Nodes */}
        <ul>
          {nodes.map((node, i) => (
            <li
              key={node.id}
              data-ai="node"
              className="absolute"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <button
                type="button"
                onClick={() => select(i)}
                onMouseEnter={() => select(i)}
                onFocus={() => select(i)}
                aria-pressed={i === active}
                className={cn(
                  "group/node absolute top-0 left-0 flex w-max max-w-[10rem] items-center gap-2.5 lg:max-w-[12rem]",
                  layout[nodePlacement(node)].className,
                )}
                style={{ transform: layout[nodePlacement(node)].transform }}
              >
                <span
                  className={cn(
                    "relative flex size-3.5 shrink-0 items-center justify-center rounded-full border transition-colors duration-500",
                    i === active ? "border-primary bg-primary/20" : "border-border-strong bg-background group-hover/node:border-foreground",
                  )}
                >
                  <span className={cn("size-1 rounded-full", i === active ? "bg-primary" : "bg-muted")} />
                  {i === active ? (
                    <span className="absolute inset-[-6px] rounded-full border border-primary/40 motion-safe:animate-ping" />
                  ) : null}
                </span>
                <span
                  className={cn(
                    "text-[0.8rem] tracking-tight transition-colors duration-500 lg:text-sm",
                    i === active ? "text-foreground" : "text-muted group-hover/node:text-foreground group-focus-visible/node:text-foreground",
                  )}
                >
                  {node.title}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Phone layout: the AI hub with the active use case, wired to a grid of use cases. */
function MobileEcosystem({ active, onSelect }: { active: number; onSelect: (index: number) => void }) {
  const current = nodes[active];
  return (
    <div className="md:hidden">
      <div className="relative mx-auto flex aspect-square w-[72%] max-w-[17rem] flex-col items-center justify-center rounded-full border border-border-strong bg-background p-7 text-center">
        <span aria-hidden="true" className="absolute inset-[-5%] rounded-full border border-primary/20" />
        <span className="label text-primary">
          AI · {pad(active + 1)} / {pad(nodes.length)}
        </span>
        <p
          key={current.id}
          aria-live="polite"
          className="mt-3 font-display text-lg leading-tight tracking-tight motion-safe:animate-[fade-in_0.6s_var(--ease-out-expo)]"
        >
          {current.title}
        </p>
        <p className="mt-2 text-xs leading-snug text-muted">{current.description}</p>
        <span className="label mt-3 text-[0.65rem] text-subtle">{current.domain}</span>
      </div>

      {/* Trunk from the hub down to the use cases */}
      <div aria-hidden="true" className="relative mx-auto h-10 w-px bg-border-strong">
        <span className="absolute inset-x-0 top-0 h-1/2 bg-primary motion-safe:animate-[scan-y_1.6s_linear_infinite]" />
      </div>

      <ul className="grid grid-cols-2 gap-2 border-t border-border-strong pt-4">
        {nodes.map((node, i) => (
          <li key={node.id} data-ai="item" className="odd:last:col-span-2">
            <button
              type="button"
              onClick={() => onSelect(i)}
              aria-pressed={i === active}
              className={cn(
                "flex h-full w-full items-center gap-2.5 border px-3 py-3 text-left text-sm leading-tight tracking-tight transition-colors duration-500",
                i === active
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted",
              )}
            >
              <span
                aria-hidden="true"
                className={cn("size-1.5 shrink-0 rounded-full", i === active ? "bg-primary" : "bg-subtle")}
              />
              {node.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
