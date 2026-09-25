import { countries, countriesReach } from "@/data/countries";
import { FadeUp } from "@/components/animation/FadeUp";
import { Reveal } from "@/components/animation/Reveal";

/**
 * Where Pyxis works, without naming any client: a headline and a scrolling
 * band of the countries where operators run ORION.
 */
export function Presence() {
  const names = countries.map((country) => country.name);

  return (
    <section id="presence" aria-labelledby="presence-title" className="relative py-20 md:py-24">
      <div className="container-page">
        <FadeUp className="label mb-8 flex items-center gap-4 text-muted md:mb-10">
          <span className="text-accent">02</span>
          <span className="h-px w-10 bg-border-strong" aria-hidden="true" />
          <span>Where we work</span>
        </FadeUp>
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <h2 id="presence-title" className="text-section md:col-span-8">
            <Reveal lines={["Trusted by operators", `in ${countriesReach} countries.`]} />
          </h2>
          <FadeUp delay={0.1} as="p" className="max-w-md text-lead text-muted md:col-span-4">
            Telecom operators across Europe, Africa, the Middle East, Latin America and Asia
            rely on ORION, from South Africa and Nigeria to Iraq, Mexico and Indonesia.
          </FadeUp>
        </div>
      </div>

      <FadeUp delay={0.15} className="mt-14 border-y border-border md:mt-16">
        <div
          role="region"
          aria-label="Countries where Pyxis works"
          className="marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        >
          <div className="marquee-track flex w-max">
            {[false, true].map((copy) => (
              <ul
                key={String(copy)}
                aria-hidden={copy || undefined}
                className={copy ? "marquee-copy flex items-center" : "flex items-center"}
              >
                {names.map((name) => (
                  <li
                    key={name}
                    className="flex h-20 shrink-0 items-center gap-8 pl-8 font-display text-[clamp(1.25rem,2vw,1.75rem)] tracking-[-0.02em] text-muted transition-colors duration-500 hover:text-foreground md:h-24 md:gap-10 md:pl-10"
                  >
                    {name}
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-accent/70" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
