import type { CSSProperties, ReactNode } from "react";
import { principles } from "@/data/about";
import { Scene } from "@/components/animation/Scene";
import { pad } from "@/lib/utils";

/** Strokes drawn in on entry (pathLength 1 so one dash covers the path). */
const draw = { "data-principle": "draw", pathLength: 1 } as const;

/** One icon per principle, each with a small part that keeps moving. */
const icons: ReactNode[] = [
  // Works with your existing network: any vendor plugs into one hub
  <svg key="network" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <path {...draw} d="M24 24 L8 10 M24 24 L40 10 M24 24 L8 38 M24 24 L40 38" strokeOpacity="0.5" />
    <path
      d="M8 10 L24 24 L40 38"
      pathLength={1}
      stroke="var(--accent)"
      strokeWidth="2"
      className="flow-pulse"
      style={{ "--flow-duration": "2.6s" } as CSSProperties}
    />
    {[[8, 10], [40, 10], [8, 38], [40, 38]].map(([cx, cy]) => (
      <rect key={`${cx}-${cy}`} {...draw} x={cx - 3.5} y={cy - 3.5} width="7" height="7" />
    ))}
    <circle {...draw} cx="24" cy="24" r="6" />
    <circle cx="24" cy="24" r="2" fill="var(--accent)" stroke="none" className="principle-pulse" />
  </svg>,
  // Grows with you: bars that keep rising
  <svg key="grow" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <path {...draw} d="M6 42 H42" strokeOpacity="0.5" />
    {[
      { x: 10, h: 10 },
      { x: 20, h: 17 },
      { x: 30, h: 24 },
      { x: 40, h: 32 },
    ].map(({ x, h }, i) => (
      <rect
        key={x}
        x={x - 3}
        y={42 - h}
        width="6"
        height={h}
        fill={i === 3 ? "var(--accent)" : "currentColor"}
        fillOpacity={i === 3 ? 0.9 : 0.18 + i * 0.12}
        stroke="none"
        className="principle-bar"
        style={{ animationDelay: `${i * 0.18}s` }}
      />
    ))}
    <path {...draw} d="M8 26 L20 20 L30 14 L40 6 M34 6 H40 V12" />
  </svg>,
  // Deploy without replacing anything: on-premise servers, protected
  <svg key="sovereign" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    {[8, 20].map((y) => (
      <rect key={y} {...draw} x="6" y={y} width="26" height="9" />
    ))}
    {[12.5, 24.5].map((y, i) => (
      <circle key={y} cx="11" cy={y} r="1.3" fill="var(--accent)" stroke="none" className="blink" style={{ animationDelay: `${i * 0.8}s` }} />
    ))}
    <path {...draw} d="M16 12.5 H27 M16 24.5 H27" strokeOpacity="0.5" />
    <path {...draw} d="M36 22 L43 25 V31 C43 36 40 39.5 36 41 C32 39.5 29 36 29 31 V25 Z" />
    <path {...draw} d="M33 31 L35.3 33.3 L39.5 29" stroke="var(--accent)" strokeWidth="1.8" />
    <path {...draw} d="M6 38 H24" strokeOpacity="0.5" />
  </svg>,
  // Proven in the field: a live cell site broadcasting
  <svg key="field" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <path {...draw} d="M24 20 L16 44 M24 20 L32 44 M19 35 H29 M17.5 40 H30.5" />
    <circle {...draw} cx="24" cy="17" r="3" />
    {[0, 1, 2].map((i) => (
      <g key={i} className="principle-wave" style={{ animationDelay: `${i * 0.5}s` }}>
        <path d={`M${15 - i * 5} ${10 - i * 3} A ${12 + i * 7} ${12 + i * 7} 0 0 0 ${15 - i * 5} ${24 + i * 3}`} stroke="var(--accent)" />
        <path d={`M${33 + i * 5} ${10 - i * 3} A ${12 + i * 7} ${12 + i * 7} 0 0 1 ${33 + i * 5} ${24 + i * 3}`} stroke="var(--accent)" />
      </g>
    ))}
  </svg>,
];

/**
 * The four company principles as cards: they rise in one after another while
 * their icons draw themselves, then each icon stays subtly alive.
 */
export function Principles() {
  return (
    <Scene name="principles" as="ul" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
      {principles.map((principle, i) => (
        <li
          key={principle.title}
          data-principle="card"
          className="group/card relative isolate flex flex-col overflow-hidden border border-border bg-surface/60 p-6 transition-[border-color,transform,background-color] duration-700 ease-out-expo hover:-translate-y-1.5 hover:border-accent/50 hover:bg-surface md:p-7"
        >
          {/* Accent line that sweeps in on hover */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out-expo group-hover/card:scale-x-100"
          />
          {/* Warm glow behind the icon on hover */}
          <span
            aria-hidden="true"
            className="absolute -top-20 -left-20 -z-10 size-56 rounded-full bg-accent/15 opacity-0 blur-3xl transition-opacity duration-700 group-hover/card:opacity-100"
          />
          {/* Oversized index in the background */}
          <span
            aria-hidden="true"
            className="absolute -right-2 -bottom-6 -z-10 font-display text-[7rem] leading-none font-medium tracking-[-0.06em] text-foreground/[0.04] transition-colors duration-700 group-hover/card:text-accent/10"
          >
            {pad(i + 1)}
          </span>

          <div className="flex items-start justify-between">
            <span className="flex size-14 items-center justify-center border sm:size-16 border-border-strong bg-background/60 text-primary transition-colors duration-700 group-hover/card:border-accent/60 group-hover/card:text-foreground">
              <span className="block size-9 sm:size-10">{icons[i]}</span>
            </span>
            <span className="label text-accent">{pad(i + 1)}</span>
          </div>

          <h3 className="mt-6 font-display sm:mt-10 text-xl leading-tight tracking-[-0.02em] md:text-[1.4rem]">
            {principle.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{principle.detail}</p>
          <p className="label mt-auto pt-6 text-subtle sm:pt-8 transition-colors duration-700 group-hover/card:text-foreground">
            {principle.tag}
          </p>
        </li>
      ))}
    </Scene>
  );
}
