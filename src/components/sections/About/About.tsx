import { aboutLead, aboutStatement, presence, principles } from "@/data/about";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeUp } from "@/components/animation/FadeUp";
import { SignalLine } from "@/components/animation/SignalLine";
import { pad } from "@/lib/utils";
import { FootprintMap } from "./FootprintMap";

/**
 * Who Pyxis is: positioning, the ORION promise and how it is built, and the
 * company's global presence.
 */
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative pb-20 md:pb-24">
      <div className="container-page">
        <SignalLine className="mx-auto mb-10 md:mb-14 md:ml-0" />

        <SectionTitle
          id="about-title"
          index="01"
          label="About Pyxis"
          lines={["Telecom Data", "Intelligence."]}
          intro={aboutLead}
        />

        {/* Statement + how ORION is built */}
        <div className="mt-14 grid gap-12 border-t border-border pt-12 md:mt-20 lg:grid-cols-12 lg:gap-8">
          <FadeUp className="lg:col-span-7">
            <p className="font-display text-[clamp(1.25rem,2vw,1.9rem)] leading-[1.15] tracking-[-0.025em] text-foreground">
              {aboutStatement}
            </p>
          </FadeUp>
          <FadeUp as="ul" stagger={0.08} className="lg:col-span-4 lg:col-start-9">
            {principles.map((principle, i) => (
              <li
                key={principle}
                className="flex items-baseline gap-4 border-b border-border py-4 first:pt-0 last:border-b-0"
              >
                <span className="label text-accent">{pad(i + 1)}</span>
                <span className="text-lg tracking-tight">{principle}</span>
              </li>
            ))}
          </FadeUp>
        </div>

        {/* Global presence */}
        <div className="mt-16 md:mt-24">
          <FadeUp className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <h3 className="label text-subtle">Global presence</h3>
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
              <li className="text-subtle">Hover a point to see the country</li>
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
