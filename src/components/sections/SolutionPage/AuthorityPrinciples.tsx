import type { ReactNode } from "react";
import { authorityPrinciples } from "@/data/regulators";
import { Scene } from "@/components/animation/Scene";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { pad } from "@/lib/utils";

/** Strokes drawn in on entry, shared with the company principle cards. */
const draw = { "data-principle": "draw", pathLength: 1 } as const;

const icons: ReactNode[] = [
  // Lawful by design: a document under a seal, with an audit tick
  <svg key="lawful" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <path {...draw} d="M12 6 H30 L37 13 V42 H12 Z" />
    <path {...draw} d="M30 6 V13 H37" strokeOpacity="0.5" />
    <path {...draw} d="M17 20 H31 M17 25 H31 M17 30 H25" strokeOpacity="0.5" />
    <circle {...draw} cx="32" cy="35" r="5.5" stroke="var(--accent)" />
    <path {...draw} d="M29.6 35 L31.4 36.8 L34.6 33.4" stroke="var(--accent)" strokeWidth="1.6" />
  </svg>,
  // Evidence you can defend: a sealed evidence pack with a live integrity check
  <svg key="evidence" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <path {...draw} d="M8 16 L24 8 L40 16 V32 L24 40 L8 32 Z" />
    <path {...draw} d="M8 16 L24 24 L40 16 M24 24 V40" strokeOpacity="0.5" />
    <circle cx="24" cy="24" r="2.2" fill="var(--accent)" stroke="none" className="principle-pulse" />
  </svg>,
  // Sovereign deployment: servers inside a national border
  <svg key="sovereign" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <path {...draw} d="M24 4 L41 11 V24 C41 34 33.5 41 24 44 C14.5 41 7 34 7 24 V11 Z" />
    {[17, 26].map((y) => (
      <rect key={y} {...draw} x="15" y={y} width="18" height="6" />
    ))}
    {[20, 29].map((y, i) => (
      <circle key={y} cx="18.5" cy={y} r="1.1" fill="var(--accent)" stroke="none" className="blink" style={{ animationDelay: `${i * 0.8}s` }} />
    ))}
  </svg>,
];

/**
 * "Built for authorities" (spec S09): why ORION can be trusted with lawful
 * work. Same cards and entrance animation as the company principles.
 */
export function AuthorityPrinciples({ index }: { index: string }) {
  return (
    <section aria-labelledby="authorities-title" className="relative py-20 md:py-24">
      <div className="container-page">
        <SectionTitle
          id="authorities-title"
          index={index}
          label="Built for authorities"
          lines={["Trust, built in", "from the first query."]}
          intro="Every access is mandated, every action is recorded, and every piece of evidence can be defended."
        />

        <Scene name="principles" as="ul" className="mt-12 grid gap-3 md:mt-16 md:grid-cols-3 lg:gap-4">
          {authorityPrinciples.map((principle, i) => (
            <li
              key={principle.title}
              data-principle="card"
              className="group/card relative isolate flex flex-col overflow-hidden border border-border bg-surface/60 p-6 transition-[border-color,transform,background-color] duration-700 ease-out-expo hover:-translate-y-1.5 hover:border-accent/50 hover:bg-surface md:p-7"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out-expo group-hover/card:scale-x-100"
              />
              <span
                aria-hidden="true"
                className="absolute -top-20 -left-20 -z-10 size-56 rounded-full bg-accent/15 opacity-0 blur-3xl transition-opacity duration-700 group-hover/card:opacity-100"
              />
              <span
                aria-hidden="true"
                className="absolute -right-2 -bottom-6 -z-10 font-display text-[7rem] leading-none font-medium tracking-[-0.06em] text-foreground/[0.04] transition-colors duration-700 group-hover/card:text-accent/10"
              >
                {pad(i + 1)}
              </span>

              <div className="flex items-start justify-between">
                <span className="flex size-14 items-center justify-center border border-border-strong bg-background/60 text-primary transition-colors duration-700 group-hover/card:border-accent/60 group-hover/card:text-foreground sm:size-16">
                  <span className="block size-9 sm:size-10">{icons[i]}</span>
                </span>
                <span className="label text-accent">{pad(i + 1)}</span>
              </div>

              <h3 className="mt-6 font-display text-xl leading-tight tracking-[-0.02em] sm:mt-10 md:text-[1.4rem]">
                {principle.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{principle.detail}</p>
              <p className="label mt-auto pt-6 text-subtle transition-colors duration-700 group-hover/card:text-foreground sm:pt-8">
                {principle.tag}
              </p>
            </li>
          ))}
        </Scene>
      </div>
    </section>
  );
}
