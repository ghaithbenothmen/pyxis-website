import { aboutLead, aboutStatement, presence, principles, values } from "@/data/about";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeUp } from "@/components/animation/FadeUp";
import { SignalLine } from "@/components/animation/SignalLine";
import { pad } from "@/lib/utils";
import { Expertise } from "./Expertise";
import { FootprintMap } from "./FootprintMap";

/**
 * Who Pyxis is: positioning, the ORION promise, areas of expertise, values
 * and presence — in the order a corporate "About" reads.
 */
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative pb-24 md:pb-32">
      <div className="container-page">
        <SignalLine className="mx-auto mb-14 md:mb-20 md:ml-0" />

        <SectionTitle
          id="about-title"
          index="01"
          label="About Pyxis"
          lines={["Telecom Data", "Intelligence."]}
          intro={aboutLead}
        />

        {/* Statement + how ORION is built */}
        <div className="mt-20 grid gap-12 border-t border-border pt-12 md:mt-28 lg:grid-cols-12 lg:gap-8">
          <FadeUp className="lg:col-span-7">
            <p className="font-display text-[clamp(1.5rem,2.6vw,2.5rem)] leading-[1.15] tracking-[-0.025em] text-foreground">
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

        <Expertise />

        {/* Values */}
        <FadeUp
          as="ul"
          stagger={0.1}
          className="mt-24 grid border-t border-border md:mt-32 md:grid-cols-3"
        >
          {values.map((value, i) => (
            <li
              key={value.theme}
              className="border-b border-border py-10 md:border-b-0 md:py-12 md:pr-10 md:not-first:border-l md:not-first:pl-10"
            >
              <p className="label flex gap-3 text-subtle">
                <span className="text-accent">{pad(i + 1)}</span>
                {value.theme}
              </p>
              <blockquote className="mt-6 font-display text-[clamp(1.5rem,2.4vw,2.25rem)] leading-[1.1] tracking-[-0.03em]">
                {value.statement}
              </blockquote>
            </li>
          ))}
        </FadeUp>

        {/* Global presence */}
        <div className="mt-24 md:mt-32">
          <FadeUp className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <h3 className="label text-subtle">Global presence</h3>
              <p className="mt-4 max-w-xl font-display text-[clamp(1.5rem,2.4vw,2.25rem)] leading-[1.1] tracking-[-0.03em]">
                Headquartered in Tunis, with an office in the United Kingdom.
              </p>
            </div>
            <ul className="label flex flex-col gap-3 text-muted">
              <li className="flex items-center gap-3">
                <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
                <span className="text-foreground">Offices</span>
                {presence.map((place) => place.city).join(" · ")}
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
