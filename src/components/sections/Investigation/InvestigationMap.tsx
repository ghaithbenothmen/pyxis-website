import { traceEvents } from "@/data/investigation";

const WIDTH = 1000;
const HEIGHT = 700;
const HEX_R = 92;

/** Deterministic pseudo-random sequence so server and client render alike. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

type Point = { x: number; y: number };

const hexCenters: Point[] = (() => {
  const w = Math.sqrt(3) * HEX_R;
  const h = 1.5 * HEX_R;
  const points: Point[] = [];
  for (let row = -1; row * h < HEIGHT + HEX_R; row++) {
    for (let col = -1; col * w < WIDTH + w; col++) {
      points.push({ x: col * w + (row % 2 ? w / 2 : 0), y: row * h });
    }
  }
  return points;
})();

const hexPath = ({ x, y }: Point, r = HEX_R) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30);
    return `${i ? "L" : "M"} ${(x + r * Math.cos(a)).toFixed(1)} ${(y + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ") + " Z";

const nearest = (p: Point) =>
  hexCenters.reduce((best, c) =>
    Math.hypot(c.x - p.x, c.y - p.y) < Math.hypot(best.x - p.x, best.y - p.y) ? c : best,
  );

const eventCells = traceEvents.map(nearest);
const towers = hexCenters.filter(
  (c) => c.x > 40 && c.x < WIDTH - 40 && c.y > 40 && c.y < HEIGHT - 40,
);

const rand = seeded(7);
const noise = Array.from({ length: 140 }, () => ({
  x: rand() * WIDTH,
  y: rand() * HEIGHT,
  r: rand() < 0.1 ? 1.6 : 0.9,
}));
const fingerprints = traceEvents.map((_, k) => {
  const r = seeded(31 + k * 17);
  return Array.from({ length: 14 }, () => 4 + r() * 26);
});

const centroid = {
  x: traceEvents.reduce((s, e) => s + e.x, 0) / traceEvents.length,
  y: traceEvents.reduce((s, e) => s + e.y, 0) / traceEvents.length,
};
const perimeterR =
  Math.max(...traceEvents.map((e) => Math.hypot(e.x - centroid.x, e.y - centroid.y))) + 40;

const toMicros = (time: string) => {
  const [, , sec] = time.split(":");
  return Math.round(Number(sec) * 1_000_000);
};

const contours = [
  "M -20 560 C 180 500, 260 620, 460 590 S 780 470, 1020 540",
  "M -20 610 C 200 560, 300 680, 520 650 S 820 540, 1020 600",
  "M -20 120 C 140 170, 320 60, 520 110 S 860 200, 1020 130",
  "M -20 70 C 160 110, 340 10, 540 60 S 860 140, 1020 80",
];

/**
 * Stylised, non-geographic network map for the investigation sequence:
 * hexagonal cell coverage, BTS towers, background traffic, three events and
 * the correlation that ties them together. All values are illustrative.
 */
export function InvestigationMap() {
  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Illustration: three network events, placed within their cell coverage, are correlated by timestamp into a single geo-perimeter."
      className="size-full"
    >
      <defs>
        <pattern id="inv-dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.8" fill="rgb(255 255 255 / 0.07)" />
        </pattern>
        <radialGradient id="inv-target">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width={WIDTH} height={HEIGHT} fill="url(#inv-dots)" />

      <g fill="none" stroke="rgb(255 255 255 / 0.05)">
        {contours.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>

      {/* Cell coverage */}
      <g data-inv="grid" fill="none" stroke="rgb(255 255 255 / 0.06)">
        {hexCenters.map((c) => (
          <path key={`${c.x}-${c.y}`} d={hexPath(c)} />
        ))}
      </g>

      {/* Background traffic */}
      <g fill="rgb(168 200 234 / 0.35)">
        {noise.map((p, i) => (
          <circle key={i} cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r={p.r} />
        ))}
      </g>

      {/* Highlighted cells for the events */}
      {eventCells.map((c, i) => (
        <path
          key={`cell-${i}`}
          data-inv="cell"
          d={hexPath(c, HEX_R - 3)}
          fill="rgb(206 92 38 / 0.09)"
          stroke="var(--accent)"
          strokeOpacity="0.55"
        />
      ))}

      {/* BTS towers */}
      <g data-inv="towers">
        {towers.map((c) => {
          const isEventCell = eventCells.some((e) => e.x === c.x && e.y === c.y);
          return (
            <g key={`t-${c.x}-${c.y}`} data-inv={isEventCell ? "tower-hot" : undefined}>
              <path
                d={`M ${c.x} ${c.y - 7} L ${c.x + 5} ${c.y + 5} L ${c.x - 5} ${c.y + 5} Z`}
                fill="none"
                stroke={isEventCell ? "var(--accent)" : "rgb(255 255 255 / 0.22)"}
              />
              <circle cx={c.x} cy={c.y - 7} r="1.5" fill={isEventCell ? "var(--accent)" : "rgb(255 255 255 / 0.3)"} />
            </g>
          );
        })}
      </g>

      {/* Geo-perimeter */}
      <circle
        data-inv="perimeter"
        cx={centroid.x}
        cy={centroid.y}
        r={perimeterR}
        pathLength={1}
        fill="none"
        stroke="var(--accent)"
        strokeOpacity="0.7"
        strokeDasharray="0.006 0.006"
      />
      <text
        data-inv="perimeter-label"
        className="font-mono max-md:hidden"
        x={centroid.x}
        y={centroid.y - perimeterR - 12}
        textAnchor="middle"
        fill="var(--accent)"
        style={{ fontSize: 11, letterSpacing: "0.14em" }}
      >
        GEO-PERIMETER · BTS / CELL-ID
      </text>

      {/* Correlation */}
      {traceEvents.map((event, i) => {
        const next = traceEvents[(i + 1) % traceEvents.length];
        const mx = (event.x + next.x) / 2;
        const my = (event.y + next.y) / 2;
        const dt = Math.abs(toMicros(next.time) - toMicros(event.time));
        return (
          <g key={`link-${event.id}`}>
            <line
              data-inv="link"
              x1={event.x}
              y1={event.y}
              x2={next.x}
              y2={next.y}
              pathLength={1}
              stroke="var(--accent)"
              strokeWidth="1.25"
            />
            <g data-inv="link-label" className="max-md:hidden">
              <rect x={mx - 44} y={my - 11} width="88" height="22" fill="var(--background)" stroke="rgb(206 92 38 / 0.45)" />
              <text
                x={mx}
                y={my + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="var(--accent)"
                className="font-mono"
                style={{ fontSize: 10, letterSpacing: "0.08em" }}
              >
                Δt {dt} µs
              </text>
            </g>
          </g>
        );
      })}

      {/* Triangulated area */}
      <g data-inv="target">
        <circle cx={centroid.x} cy={centroid.y} r="60" fill="url(#inv-target)" />
        <circle data-inv="target-ring" cx={centroid.x} cy={centroid.y} r="16" fill="none" stroke="var(--accent)" />
        <path
          d={`M ${centroid.x - 26} ${centroid.y} H ${centroid.x - 8} M ${centroid.x + 8} ${centroid.y} H ${centroid.x + 26} M ${centroid.x} ${centroid.y - 26} V ${centroid.y - 8} M ${centroid.x} ${centroid.y + 8} V ${centroid.y + 26}`}
          stroke="var(--accent)"
        />
      </g>

      {/* Events */}
      {traceEvents.map((event, i) => {
        const lx = event.labelSide === "left" ? event.x - 196 : event.x + 22;
        const ly = event.y - 56;
        return (
          <g key={event.id} data-inv="event">
            <circle data-inv="event-ping" cx={event.x} cy={event.y} r="18" fill="none" stroke="var(--accent)" strokeOpacity="0.6" />
            <circle cx={event.x} cy={event.y} r="5" fill="var(--accent)" />
            <circle cx={event.x} cy={event.y} r="9" fill="none" stroke="var(--accent)" />

            <g data-inv="event-label" className="max-md:hidden">
              <rect x={lx} y={ly} width="174" height="42" fill="rgb(2 11 22 / 0.85)" stroke="rgb(255 255 255 / 0.14)" />
              <text x={lx + 10} y={ly + 16} fill="var(--foreground)" className="font-mono" style={{ fontSize: 11, letterSpacing: "0.1em" }}>
                EVENT {String(i + 1).padStart(2, "0")} · {event.cell}
              </text>
              <text data-inv="timestamp" x={lx + 10} y={ly + 32} fill="var(--accent)" className="font-mono" style={{ fontSize: 11, letterSpacing: "0.06em" }}>
                {event.time}
              </text>
            </g>

            <g data-inv="fingerprint" className="max-md:hidden">
              {fingerprints[i].map((h, k) => (
                <rect
                  key={k}
                  data-inv="bar"
                  x={lx + k * 12.4}
                  y={ly + 76 - h}
                  width="7"
                  height={h}
                  fill="var(--primary)"
                  fillOpacity="0.55"
                />
              ))}
              <text x={lx} y={ly + 90} fill="var(--subtle)" className="font-mono" style={{ fontSize: 9, letterSpacing: "0.14em" }}>
                PACKET VOLUME FINGERPRINT
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
}
