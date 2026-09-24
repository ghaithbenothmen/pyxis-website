import Image from "next/image";
import { Scene } from "@/components/animation/Scene";
import { footprintMap } from "@/data/footprint";
import { countries, project } from "@/data/countries";
import { cn } from "@/lib/utils";

const { width: W, height: H } = footprintMap;

type Point = { x: number; y: number };

const points = countries.map((country) => ({ ...country, ...project(country) }));
const hub = points.find((p) => p.office?.role === "Headquarters") ?? points[0];

/** Nearest first, so links spread outwards from the headquarters as they draw in. */
const destinations = points
  .filter((p) => p !== hub)
  .sort((a, b) => Math.hypot(a.x - hub.x, a.y - hub.y) - Math.hypot(b.x - hub.x, b.y - hub.y));

/** Curved link from the headquarters, bowing upwards like a flight path. */
function arc(to: Point, from: Point = hub) {
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
  return `M ${from.x.toFixed(1)} ${from.y.toFixed(1)} Q ${(mx + nx * bend).toFixed(1)} ${(my + ny * bend).toFixed(1)} ${to.x.toFixed(1)} ${to.y.toFixed(1)}`;
}

const pct = (p: Point) => ({ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` });

/**
 * Dotted world map (generated from the Pyxis footprint image) with animated
 * links from the UK headquarters to every country Pyxis operates in. Each
 * point reveals its country name on hover or focus.
 */
export function FootprintMap() {
  return (
    <Scene name="footprint" as="div" className="relative w-full" style={{ aspectRatio: `${W} / ${H}` }}>
      <Image
        src={footprintMap.src}
        alt=""
        fill
        unoptimized
        data-footprint="dots"
        className="object-contain"
      />

      <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true" className="absolute inset-0 size-full overflow-visible" fill="none">
        {destinations.map((point, i) => (
          <g key={point.name}>
            <path
              d={arc(point)}
              pathLength={1}
              data-footprint="link"
              stroke={point.office ? "var(--accent)" : "var(--primary)"}
              strokeOpacity={point.office ? 1 : 0.35}
              strokeWidth={point.office ? 1.4 : 1}
            />
            <path
              d={arc(point)}
              pathLength={1}
              stroke="var(--primary)"
              strokeWidth="1.8"
              strokeLinecap="round"
              data-footprint="pulse"
              className="flow-pulse"
              style={{ ["--flow-duration" as string]: `${3.2 + (i % 5) * 0.5}s`, ["--flow-delay" as string]: `${i * 0.3}s` }}
            />
          </g>
        ))}

        {points
          .filter((p) => p.office)
          .map((office) => (
            <circle
              key={office.name}
              data-footprint="ring"
              cx={office.x}
              cy={office.y}
              r="7"
              stroke="var(--accent)"
              strokeWidth="1"
            />
          ))}
      </svg>

      {/* Country points: name on hover or focus */}
      <ul>
        {points.map((point) => (
          <li key={point.name} className="absolute" style={pct(point)}>
            <button
              type="button"
              aria-label={point.office ? `${point.name} — ${point.office.role}, ${point.office.city}` : point.name}
              className="group/pin absolute top-0 left-0 flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
            >
              <span
                data-footprint="node"
                className={cn(
                  "block rounded-full transition-transform duration-300 ease-out-expo group-hover/pin:scale-150 group-focus-visible/pin:scale-150",
                  point.office
                    ? "size-2.5 bg-accent ring-2 ring-background"
                    : "size-1.5 bg-primary shadow-[0_0_0_3px_rgb(168_200_234_/_0.15)] md:size-2",
                )}
              />
              <span
                role="tooltip"
                className="label pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 translate-y-1 border border-border-strong bg-background/90 px-2 py-1 text-[0.625rem] whitespace-nowrap text-foreground opacity-0 backdrop-blur-sm transition-[opacity,transform] duration-300 ease-out-expo group-hover/pin:translate-y-0 group-hover/pin:opacity-100 group-focus-visible/pin:translate-y-0 group-focus-visible/pin:opacity-100"
              >
                {point.name}
                {point.office ? <span className="text-accent"> · {point.office.role}</span> : null}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* Office labels, always visible on larger screens */}
      {points
        .filter((p) => p.office)
        .map((office) => (
          <span
            key={`label-${office.name}`}
            data-footprint="label"
            aria-hidden="true"
            className="label pointer-events-none absolute hidden -translate-y-1/2 items-center gap-2 pl-4 whitespace-nowrap text-[0.65rem] text-foreground md:flex"
            style={pct(office)}
          >
            <span className="h-px w-3 bg-accent" />
            {office.office?.city}
          </span>
        ))}
    </Scene>
  );
}
