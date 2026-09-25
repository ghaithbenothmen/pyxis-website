import type { CSSProperties } from "react";
import { dataSources, pipeline } from "@/data/technologies";

const W = 1200;
const H = 620;
const LIST_X = 40;
const PORT_X = 300;
const LINE_Y = H / 2;
const FIRST_STAGE_X = 520;
const LAST_STAGE_X = 1120;

const rowY = (i: number) => 50 + i * ((H - 100) / (dataSources.length - 1));
const stageX = (i: number) =>
  FIRST_STAGE_X + i * ((LAST_STAGE_X - FIRST_STAGE_X) / (pipeline.length - 1));

const sourcePath = (i: number) => {
  const y = rowY(i);
  return `M ${PORT_X} ${y} C ${PORT_X + 120} ${y}, ${FIRST_STAGE_X - 120} ${LINE_Y}, ${FIRST_STAGE_X - 14} ${LINE_Y}`;
};

const flow = (duration: number, delay: number) =>
  ({ "--flow-duration": `${duration}s`, "--flow-delay": `${delay}s` }) as CSSProperties;

/** Desktop architecture: ten sources converge into a six-stage pipeline. */
export function PipelineDiagram() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`Data architecture: ${dataSources.map((s) => s.label).join(", ")} flow through ${pipeline.map((s) => s.label).join(", then ")}.`}
      className="h-auto w-full overflow-visible"
    >
      {/* Source rows */}
      {dataSources.map((source, i) => (
        <g key={source.label} data-tech="source">
          <text x={LIST_X} y={rowY(i) - 7} dominantBaseline="middle" fill="var(--foreground)" className="font-display" style={{ fontSize: 15 }}>
            {source.label}
          </text>
          <text
            x={LIST_X}
            y={rowY(i) + 11}
            dominantBaseline="middle"
            fill="var(--subtle)"
            className="font-mono"
            style={{ fontSize: 10, letterSpacing: "0.08em" }}
          >
            {source.tech}
          </text>
          <line x1={LIST_X + 206} y1={rowY(i)} x2={PORT_X - 6} y2={rowY(i)} stroke="var(--border)" />
          <rect x={PORT_X - 4} y={rowY(i) - 4} width="8" height="8" fill="var(--background)" stroke="var(--primary)" strokeOpacity="0.6" />
        </g>
      ))}

      {/* Convergence */}
      {dataSources.map((source, i) => (
        <g key={`p-${source.label}`}>
          <path d={sourcePath(i)} pathLength={1} data-tech="path" fill="none" stroke="var(--border-strong)" />
          <path
            d={sourcePath(i)}
            pathLength={1}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="1.6"
            strokeLinecap="round"
            className="flow-pulse"
            style={flow(3 + (i % 4) * 0.6, i * 0.37)}
          />
        </g>
      ))}

      {/* Main line */}
      <line
        data-tech="main"
        x1={FIRST_STAGE_X - 14}
        y1={LINE_Y}
        x2={LAST_STAGE_X}
        y2={LINE_Y}
        pathLength={1}
        stroke="var(--primary)"
        strokeOpacity="0.45"
      />
      {[0, 1.3, 2.6].map((delay) => (
        <line
          key={delay}
          x1={FIRST_STAGE_X - 14}
          y1={LINE_Y}
          x2={LAST_STAGE_X}
          y2={LINE_Y}
          pathLength={1}
          stroke="var(--foreground)"
          strokeWidth="2"
          strokeLinecap="round"
          className="flow-pulse"
          style={flow(3.9, delay)}
        />
      ))}

      {/* Stages */}
      {pipeline.map((stage, i) => {
        const x = stageX(i);
        const isCore = stage.id === "orion";
        const r = isCore ? 30 : stage.id === "ai" ? 20 : 12;
        const above = i % 2 === 1;
        const labelY = above ? LINE_Y - r - 26 : LINE_Y + r + 36;
        const captionY = above ? labelY - 22 : labelY + 18;
        return (
          <g key={stage.id} data-tech="stage">
            {isCore ? (
              <circle cx={x} cy={LINE_Y} r={r + 14} fill="none" stroke="var(--primary)" strokeOpacity="0.2" strokeDasharray="2 6" />
            ) : null}
            <circle
              cx={x}
              cy={LINE_Y}
              r={r}
              fill={isCore ? "var(--primary)" : "var(--background)"}
              stroke="var(--primary)"
              strokeOpacity={isCore ? 1 : 0.7}
            />
            {isCore ? null : <circle cx={x} cy={LINE_Y} r="2.5" fill="var(--primary)" />}
            <line
              x1={x}
              y1={above ? LINE_Y - r - 6 : LINE_Y + r + 6}
              x2={x}
              y2={above ? labelY + 8 : labelY - 18}
              stroke="var(--border-strong)"
            />
            <text
              x={x}
              y={labelY}
              textAnchor="middle"
              fill="var(--foreground)"
              className="font-display"
              style={{ fontSize: isCore ? 20 : 16, fontWeight: isCore ? 600 : 500, letterSpacing: isCore ? "0.08em" : "-0.01em" }}
            >
              {stage.label}
            </text>
            <text
              x={x}
              y={captionY}
              textAnchor="middle"
              fill="var(--muted)"
              className="font-mono"
              style={{ fontSize: 10, letterSpacing: "0.1em" }}
            >
              {stage.caption.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
