import Image from "next/image";
import { modulesDisclaimer, type Audience } from "@/data/solutions";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeUp } from "@/components/animation/FadeUp";

/**
 * The audience's solutions, one editorial row each: number and title, then
 * the hook, the illustrative scenarios and the data behind it. Each row is an
 * anchor target for links from the home page, ORION and the footer.
 */
export function AudienceSolutions({ audience, index }: { audience: Audience; index: string }) {
  return (
    <section aria-labelledby="audience-solutions-title" className="relative py-20 md:py-24">
      <div className="container-page">
        <SectionTitle
          id="audience-solutions-title"
          index={index}
          label="Solutions"
          lines={["What ORION", "delivers for you."]}
          intro={modulesDisclaimer}
        />

        <ol className="mt-12 border-t border-border md:mt-16">
          {audience.solutions.map((solution) => (
            <li key={solution.id} id={solution.id} className="scroll-mt-24">
              <FadeUp className="group relative grid gap-8 border-b border-border py-12 md:py-14 lg:grid-cols-12 lg:gap-8">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-1000 ease-out-expo group-hover:scale-x-100"
                />

                <div className="lg:col-span-5">
                  <span className="label text-primary">{solution.code}</span>
                  <h3 className="mt-5 text-display transition-transform duration-700 ease-out-expo group-hover:translate-x-1.5">
                    {solution.title}
                  </h3>
                  <div className="relative mt-8 hidden aspect-[16/9] max-w-md overflow-hidden border border-border lg:block">
                    <Image
                      src={solution.image.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 28vw, 0px"
                      quality={60}
                      className="object-cover opacity-50 transition-[opacity,transform] duration-[1.4s] ease-out-expo group-hover:scale-105 group-hover:opacity-70"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
                  </div>
                </div>

                <div className="lg:col-span-6 lg:col-start-7">
                  <p className="text-lead text-foreground/90">{solution.hook}</p>

                  <p className="label mt-10 mb-4 text-subtle">Scenarios</p>
                  <ul className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
                    {solution.scenarios.map((scenario) => (
                      <li key={scenario} className="flex items-center gap-3 bg-background px-4 py-3.5 text-sm tracking-tight sm:odd:last:col-span-2">
                        <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />
                        {scenario}
                      </li>
                    ))}
                  </ul>

                  <p className="label mt-6 text-[0.65rem] normal-case tracking-[0.08em] text-subtle">
                    Built on · {solution.tech}
                  </p>
                </div>
              </FadeUp>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
