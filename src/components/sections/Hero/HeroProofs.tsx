import type { CSSProperties, ReactNode } from "react";
import { countriesReach } from "@/data/countries";
import { cn, pad } from "@/lib/utils";

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" } as const;

/**
 * Qualitative proof points (spec S03). "20+ countries" is the only figure
 * allowed on the site (D2, D4, D5). Each pictogram keeps one small live detail.
 */
const proofs: { title: string; icon: ReactNode }[] = [
  {
    title: `Operating across ${countriesReach} countries`,
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12 H21 M12 3 C8.5 6.5 8.5 17.5 12 21 M12 3 C15.5 6.5 15.5 17.5 12 21" strokeOpacity="0.5" />
        <circle cx="16.5" cy="7.5" r="1.4" fill="var(--accent)" stroke="none" className="principle-pulse" />
      </svg>
    ),
  },
  {
    title: "Multi-vendor by design",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M12 12 L4 5 M12 12 L20 5 M12 12 L4 19 M12 12 L20 19" strokeOpacity="0.5" />
        <path
          d="M4 5 L12 12 L20 19"
          pathLength={1}
          stroke="var(--accent)"
          strokeWidth="1.8"
          className="flow-pulse"
          style={{ "--flow-duration": "2.4s" } as CSSProperties}
        />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    ),
  },
  {
    title: "On-premise & sovereign deployment",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <rect x="3" y="4" width="13" height="5" />
        <rect x="3" y="11" width="13" height="5" />
        <circle cx="6" cy="6.5" r="0.9" fill="var(--accent)" stroke="none" className="blink" />
        <circle cx="6" cy="13.5" r="0.9" fill="var(--accent)" stroke="none" className="blink" style={{ animationDelay: "0.8s" }} />
        <rect x="14" y="15" width="7" height="6" />
        <path d="M15.5 15 V13.2 A2 2 0 0 1 19.5 13.2 V15" />
      </svg>
    ),
  },
  {
    title: "Built for operators and regulators",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M12 3 L20 6.5 V12 C20 16.8 16.5 19.8 12 21.3 C7.5 19.8 4 16.8 4 12 V6.5 Z" />
        <path d="M8.8 12 L11.2 14.4 L15.6 10" stroke="var(--accent)" strokeWidth="1.8" />
      </svg>
    ),
  },
];

/**
 * The hero's bottom readout: four proof points in the site's technical label
 * style, one row on desktop, 2×2 on phones.
 */
export function HeroProofs() {
  return (
    <ul aria-label="Why Pyxis" className="label grid grid-cols-2 border-t border-border text-muted max-sm:text-[0.62rem] max-sm:tracking-[0.12em] lg:grid-cols-4">
      {proofs.map((proof, i) => (
        <li
          key={proof.title}
          data-hero="meta"
          data-intro
          className={cn(
            "group flex items-start gap-3 py-4 leading-relaxed transition-colors duration-500 hover:text-foreground sm:items-center md:py-5",
            i % 2 === 1 && "border-l border-border pl-4 sm:pl-6",
            i % 2 === 0 && "pr-4 sm:pr-6",
            i >= 2 && "border-t border-border lg:border-t-0",
            i === 2 && "lg:border-l lg:pl-6",
          )}
        >
          <span className="hidden text-accent sm:inline">{pad(i + 1)}</span>
          <span className="block size-4 shrink-0 text-primary transition-colors duration-500 group-hover:text-foreground">
            {proof.icon}
          </span>
          <span>{proof.title}</span>
        </li>
      ))}
    </ul>
  );
}
