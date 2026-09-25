import type { CSSProperties } from "react";
import { orionOutputs, orionProcesses, orionSources } from "@/data/orion";
import { cn, pad } from "@/lib/utils";

type Layout = {
  width: number;
  height: number;
  core: { x: number; y: number; r: number };
  source: { y: number; w: number; h: number; xs: number[] };
  /** Outputs sit in a row at `y`, or stacked when `ys` is given. */
  output: { y: number; w: number; h: number; xs: number[]; ys?: number[] };
  font: number;
};

const layouts = {
  wide: {
    width: 800,
    height: 640,
    core: { x: 400, y: 320, r: 70 },
    source: { y: 70, w: 124, h: 48, xs: [115, 305, 495, 685] },
    output: { y: 570, w: 196, h: 52, xs: [150, 400, 650] },
    font: 14,
  },
  // Mobile: larger type, outputs stacked full width so every label reads clearly
  tall: {
    width: 320,
    height: 672,
    core: { x: 160, y: 290, r: 60 },
    source: { y: 48, w: 70, h: 42, xs: [40, 120, 200, 280] },
    output: { y: 520, w: 264, h: 44, xs: [160, 160, 160], ys: [520, 578, 636] },
    font: 13,
  },
} satisfies Record<string, Layout>;

export type OrionLayout = keyof typeof layouts;

/** Timing for the continuous data flow, same technique as the Data ecosystem. */
const flow = (duration: number, delay: number) =>
  ({ "--flow-duration": `${duration}s`, "--flow-delay": `${delay}s` }) as CSSProperties;


export function OrionDiagram({
  layout,
  className,
}: {
  layout: OrionLayout;
  className?: string;
}) {
  const L: Layout = layouts[layout];
  const { core, source, output } = L;
  const narrow = layout === "tall";
  const inTop = core.y - core.r - 34;
  const outBottom = core.y + core.r + 34;

  const inPath = (x: number) =>
    `M ${x} ${source.y + source.h / 2} C ${x} ${source.y + 140}, ${core.x} ${inTop - 90}, ${core.x} ${inTop}`;
  const outPoint = (i: number) => ({ x: output.xs[i], y: output.ys?.[i] ?? output.y });
  const outPath = (i: number) => {
    const { x, y } = outPoint(i);
    const top = y - output.h / 2;
    // Stacked outputs hang straight below the core; a row fans out in curves
    return x === core.x
      ? `M ${core.x} ${outBottom} L ${x} ${top}`
      : `M ${core.x} ${outBottom} C ${core.x} ${outBottom + 80}, ${x} ${y - 110}, ${x} ${top}`;
  };

  return (
    <svg
      viewBox={`0 0 ${L.width} ${L.height}`}
      data-variant={layout}
      role="img"
      aria-label={`ORION architecture: ${orionSources.join(", ")} flow into ORION, which delivers ${orionOutputs.join(", ")}.`}
      className={cn("h-auto w-full overflow-visible", className)}
      style={{ fontSize: L.font }}
    >
      <defs>
        <radialGradient id={`orion-glow-${layout}`}>
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.45" />
          <stop offset="45%" stopColor="var(--primary-strong)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="var(--primary-strong)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Input connections */}
      {source.xs.map((x) => (
        <g key={`in-${x}`}>
          <path d={inPath(x)} pathLength={1} data-orion="in-line" fill="none" stroke="var(--border-strong)" strokeWidth="1" />
          {[0, 1].map((k) => (
            <path
              key={k}
              d={inPath(x)}
              pathLength={1}
              data-orion="in-pulse"
              data-wave={k}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="0.08 1"
              strokeDashoffset="0.08"
              opacity="0"
            />
          ))}
          {/* Continuous flow once the sequence has played */}
          <path
            d={inPath(x)}
            pathLength={1}
            data-orion="flow"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="1.6"
            strokeLinecap="round"
            className="flow-pulse"
            style={flow(3.2 + (x % 3) * 0.4, (x % 7) * 0.3)}
          />
        </g>
      ))}

      {/* Output connections */}
      {output.xs.map((_, i) => (
        <g key={`out-${i}`}>
          <path
            d={outPath(i)}
            pathLength={1}
            data-orion="out-line"
            fill="none"
            stroke="var(--primary)"
            strokeOpacity="0.6"
            strokeWidth="1"
          />
          <path
            d={outPath(i)}
            pathLength={1}
            data-orion="flow"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="1.6"
            strokeLinecap="round"
            className="flow-pulse"
            style={flow(3, 1.2 + i * 0.5)}
          />
        </g>
      ))}

      {/* Sources */}
      {orionSources.map((label, i) => {
        const x = source.xs[i];
        return (
          <g key={label} data-orion="source">
            <rect
              x={x - source.w / 2}
              y={source.y - source.h / 2}
              width={source.w}
              height={source.h}
              fill="var(--surface)"
              stroke="var(--border-strong)"
            />
            <text
              x={x}
              y={source.y - (narrow ? 0 : 4)}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--foreground)"
              className="font-display"
            >
              {label}
            </text>
            {!narrow ? (
              <text
                x={x}
                y={source.y + 13}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="var(--subtle)"
                className="font-mono"
                style={{ fontSize: 9, letterSpacing: "0.12em" }}
              >
                SRC/{pad(i + 1)}
              </text>
            ) : null}
          </g>
        );
      })}

      {/* Core */}
      <g data-orion="core">
        <circle cx={core.x} cy={core.y} r={core.r * 2.6} fill={`url(#orion-glow-${layout})`} data-orion="glow" />
        <g data-orion="ring-ambient">
          <circle
            cx={core.x}
            cy={core.y}
            r={core.r * 1.72}
            fill="none"
            stroke="var(--primary)"
            strokeOpacity="0.25"
            strokeDasharray="2 10"
          />
        </g>
        <g data-orion="ring-scrub">
          <circle
            cx={core.x}
            cy={core.y}
            r={core.r * 1.36}
            fill="none"
            stroke="var(--primary)"
            strokeOpacity="0.5"
            strokeDasharray="40 14 4 14"
          />
        </g>
        <circle cx={core.x} cy={core.y} r={core.r} fill="var(--background)" stroke="var(--primary)" strokeOpacity="0.8" />
        <circle cx={core.x} cy={core.y} r={core.r - 8} fill="none" stroke="var(--border-strong)" />
        <text
          x={core.x}
          y={core.y - 6}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--foreground)"
          className="font-display"
          style={{ fontSize: L.font * 1.7, letterSpacing: "0.12em", fontWeight: 600 }}
        >
          ORION
        </text>
        {orionProcesses.map((label, i) => (
          <text
            key={label}
            data-orion="process"
            x={core.x}
            y={core.y + 18}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--primary)"
            className="font-mono"
            style={{ fontSize: narrow ? 11 : 9, letterSpacing: "0.16em" }}
            opacity={i === orionProcesses.length - 1 ? 1 : 0}
          >
            {label.toUpperCase()}
          </text>
        ))}
      </g>

      {/* Outputs */}
      {orionOutputs.map((label, i) => {
        const { x, y } = outPoint(i);
        return (
          <g key={label} data-orion="output">
            <rect
              x={x - output.w / 2}
              y={y - output.h / 2}
              width={output.w}
              height={output.h}
              fill="var(--surface-strong)"
              stroke="var(--primary)"
              strokeOpacity="0.5"
            />
            <text
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--foreground)"
              className="font-display"
              style={{ fontSize: narrow ? L.font * 1.15 : undefined }}
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
