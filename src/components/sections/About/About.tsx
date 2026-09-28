import { aboutStatement, presence } from "@/data/about";
import { FadeUp } from "@/components/animation/FadeUp";
import { FootprintMap } from "./FootprintMap";
import { Principles } from "./Principles";

/**
 * Body of the Company page: the ORION promise, what sets Pyxis apart and the
 * company's global presence. The page hero above carries the H1.
 */
export function About() {
  return (
    <section id="company" aria-label="About Pyxis" className="relative pb-20 md:pb-24">
      <div className="container-page">
        {/* Statement + what sets Pyxis apart */}
        <div className="border-t border-border pt-12">
          <FadeUp className="max-w-4xl">
            <p className="font-display text-[clamp(1.25rem,2vw,1.9rem)] leading-[1.15] tracking-[-0.025em] text-foreground">
              {aboutStatement}
            </p>
          </FadeUp>
          <div className="mt-12 md:mt-16">
            <h2 className="sr-only">What sets Pyxis apart</h2>
            <Principles />
          </div>
        </div>

        {/* Global presence */}
        <div id="presence" className="mt-16 scroll-mt-24 md:mt-24">
          <FadeUp className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="label text-subtle">Global presence</h2>
              <p className="mt-4 max-w-xl font-display text-[clamp(1.25rem,1.9vw,1.75rem)] leading-[1.1] tracking-[-0.03em]">
                Headquartered in the United Kingdom, with an office in Tunis.
              </p>
            </div>
            <ul className="label flex flex-col gap-3 text-muted">
              <li className="flex items-center gap-3">
                <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
                <span className="text-foreground">Headquarters</span>
                {presence[0]?.city}
                <span className="text-foreground">· Office</span>
                {presence[1]?.city}
              </li>
              <li className="flex items-center gap-3">
                <span aria-hidden="true" className="size-2 rounded-full bg-primary" />
                <span className="text-foreground">Project countries</span>
              </li>
            </ul>
          </FadeUp>
          <div className="mt-10 md:mt-14">
            <FootprintMap />
          </div>
        </div>
      </div>
    </section>
  );
}
