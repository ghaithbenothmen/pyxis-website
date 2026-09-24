import Image from "next/image";
import { Scene } from "@/components/animation/Scene";
import {
  footprintHub,
  footprintMap,
  footprintOffices,
  footprintProjects,
  type MapPoint,
} from "@/data/footprint";
import { presence } from "@/data/about";

const { width: W, height: H } = footprintMap;

/** Curved link from the hub, bowing upwards like a flight path. */
function arc(to: MapPoint, from: MapPoint = footprintHub) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy);
  let nx = -dy / length;
  let ny = dx / length;
  if (ny > 0) {
    nx = -nx;
    ny = -ny;
  }
  const bend = length * 0.22;
  return `M ${from.x} ${from.y} Q ${(mx + nx * bend).toFixed(1)} ${(my + ny * bend).toFixed(1)} ${to.x} ${to.y}`;
}

const pct = (p: MapPoint) => ({ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` });

const offices = [footprintHub, ...footprintOffices];

/** Nearest first, so links spread outwards from Tunis when they draw in. */
const projects = [...footprintProjects].sort(
  (a, b) =>
    Math.hypot(a.x - footprintHub.x, a.y - footprintHub.y) -
    Math.hypot(b.x - footprintHub.x, b.y - footprintHub.y),
);

/**
 * Dotted world map (generated from the Pyxis footprint image) with animated
 * links from the Tunis headquarters to the UK office and project countries.
 */
export function FootprintMap() {
  return (
    <Scene name="footprint" as="div" className="relative w-full" style={{ aspectRatio: `${W} / ${H}` }}>
      <Image
        src={footprintMap.src}
        alt="World map of the Pyxis footprint: offices in Tunisia and the United Kingdom, and project countries across Europe, Africa, the Middle East, the Americas and Southeast Asia."
        fill
        unoptimized
        data-footprint="dots"
        className="object-contain"
      />

      <svg
        viewBox={`0 0 ${W} ${H}`}
        aria-hidden="true"
        className="absolute inset-0 size-full overflow-visible"
        fill="none"
      >
        {projects.map((point, i) => (
          <g key={`${point.x}-${point.y}`}>
            <path
              d={arc(point)}
              pathLength={1}
              data-footprint="link"
              stroke="var(--primary)"
              strokeOpacity="0.35"
              strokeWidth="1"
            />
            <path
              d={arc(point)}
              pathLength={1}
              stroke="var(--primary)"
              strokeWidth="1.8"
              strokeLinecap="round"
              data-footprint="pulse"
              className="flow-pulse"
              style={{ ["--flow-duration" as string]: `${3.2 + (i % 5) * 0.5}s`, ["--flow-delay" as string]: `${i * 0.35}s` }}
            />
            <circle data-footprint="node" cx={point.x} cy={point.y} r="3.2" fill="var(--primary)" />
          </g>
        ))}

        {footprintOffices.map((office) => (
          <path
            key={`office-${office.x}`}
            d={arc(office)}
            pathLength={1}
            data-footprint="link"
            stroke="var(--accent)"
            strokeWidth="1.4"
          />
        ))}

        {offices.map((office) => (
          <g key={`hq-${office.x}`}>
            <circle
              data-footprint="ring"
              cx={office.x}
              cy={office.y}
              r="7"
              stroke="var(--accent)"
              strokeWidth="1"
            />
            <circle cx={office.x} cy={office.y} r="4.5" fill="var(--accent)" />
            <circle cx={office.x} cy={office.y} r="1.6" fill="var(--background)" />
          </g>
        ))}
      </svg>

      {/* Office labels (HTML, so they stay readable at any map size) */}
      {offices.map((office, i) => (
        <span
          key={`label-${office.x}`}
          data-footprint="label"
          className="label pointer-events-none absolute hidden -translate-y-1/2 items-center gap-2 pl-4 whitespace-nowrap text-[0.65rem] text-foreground md:flex"
          style={pct(office)}
        >
          <span className="h-px w-3 bg-accent" aria-hidden="true" />
          {presence[i]?.city}
        </span>
      ))}
    </Scene>
  );
}
