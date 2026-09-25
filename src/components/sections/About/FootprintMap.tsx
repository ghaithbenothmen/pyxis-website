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

type Side = "right" | "left" | "top" | "bottom";

/**
 * Where each always-visible name sits around its point, chosen by hand so
 * the dense clusters (North Africa, Middle East, West Africa) stay legible.
 */
const sides: Record<string, Side> = {
  "United Kingdom": "left",
  Morocco: "left",
  Tunisia: "top",
  Algeria: "bottom",
  Mauritania: "left",
  Lebanon: "top",
  Jordan: "left",
  Egypt: "left",
  Kuwait: "bottom",
  "Côte d'Ivoire": "left",
  Nigeria: "top",
  Cameroon: "bottom",
  "South Africa": "left",
  Mexico: "left",
  Chile: "left",
};

const sideClass: Record<Side, string> = {
  right: "left-full top-1/2 -translate-y-1/2",
  left: "right-full top-1/2 -translate-y-1/2",
  top: "bottom-full left-1/2 -translate-x-1/2",
  bottom: "top-full left-1/2 -translate-x-1/2",
};

const pct = (p: Point) => ({ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` });

/**
 * Dotted world map (generated from the Pyxis footprint image) with animated
 * links from the UK headquarters to every country Pyxis operates in. Country
 * names are always shown and scale with the map, so the hand-placed layout
 * holds at every width; below that width the map scrolls sideways instead.
 */
export function FootprintMap() {
  return (
    <Scene name="footprint" as="div">
    <div
      data-footprint="scroller"
      className="-mx-[var(--gutter)] overflow-x-auto overscroll-x-contain px-[var(--gutter)] [scrollbar-width:none] lg:mx-0 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
    >
    <div className="@container relative w-full min-w-[920px] lg:min-w-0" style={{ aspectRatio: `${W} / ${H}` }}>
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

      {/* Country points with their names */}
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
                data-footprint="label"
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute block rounded-[2px] bg-background/85 px-[0.5em] py-[0.4em] text-[clamp(8.5px,0.86cqw,12px)] leading-none tracking-wide whitespace-nowrap backdrop-blur-[2px] transition-colors duration-300",
                  sideClass[sides[point.name] ?? "right"],
                  point.office
                    ? "font-medium text-foreground"
                    : "text-muted group-hover/pin:text-foreground group-focus-visible/pin:text-foreground",
                )}
              >
                {point.name}
                {point.office ? <span className="text-accent"> · {point.office.city}</span> : null}
              </span>
            </button>
          </li>
        ))}
      </ul>

    </div>
    </div>

      <p className="label mt-4 flex items-center gap-2 text-subtle lg:hidden" aria-hidden="true">
        <span>←</span> Swipe to explore the map <span>→</span>
      </p>
    </Scene>
  );
}
