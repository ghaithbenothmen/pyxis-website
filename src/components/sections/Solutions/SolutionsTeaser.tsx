import Link from "next/link";
import Image from "next/image";
import { audienceHref, audiences, modulesDisclaimer } from "@/data/solutions";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeUp } from "@/components/animation/FadeUp";
import { Button } from "@/components/ui/Button";
import { Arrow } from "@/components/ui/Arrow";

/** Home page overview of the solutions: one card per audience, then a link to /solutions. */
export function SolutionsTeaser({ index }: { index: string }) {
  return (
    <section id="solutions" aria-labelledby="solutions-title" className="relative py-20 md:py-24">
      <div className="container-page">
        <SectionTitle
          id="solutions-title"
          index={index}
          label="Solutions"
          lines={["Solutions for every team", "that relies on telecom data."]}
          intro={modulesDisclaimer}
        />

        <FadeUp as="ul" stagger={0.12} className="mt-12 grid gap-3 md:mt-16 lg:grid-cols-2 lg:gap-4">
          {audiences.map((audience, i) => (
            <li key={audience.id}>
              <Link
                href={audienceHref(audience)}
                className="group relative isolate flex h-full min-h-[440px] flex-col justify-between overflow-hidden border border-border bg-surface p-6 transition-colors duration-700 ease-out-expo hover:border-accent/50 md:p-9 lg:min-h-[520px]"
              >
                <Image
                  src={audience.image.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  quality={60}
                  className="-z-10 scale-105 object-cover opacity-25 transition-[opacity,transform] duration-[1.4s] ease-out-expo group-hover:scale-100 group-hover:opacity-40"
                />
                <span aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-background via-background/80 to-background/30" />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-1000 ease-out-expo group-hover:scale-x-100"
                />

                <span className="flex items-start justify-between gap-6">
                  <span>
                    <span className="label flex items-center gap-3 text-accent">
                      <span>{String.fromCharCode(65 + i)}</span>
                      <span className="h-px w-8 bg-accent/50" aria-hidden="true" />
                      <span className="text-foreground">{audience.label}</span>
                    </span>
                    <span className="mt-3 block text-sm text-muted">{audience.who}</span>
                  </span>
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-border-strong transition-[border-color,transform] duration-700 ease-out-expo group-hover:-rotate-45 group-hover:border-accent">
                    <Arrow />
                  </span>
                </span>

                <span className="block">
                  <span className="block max-w-lg text-display transition-transform duration-700 ease-out-expo group-hover:translate-x-1.5">
                    {audience.headline}
                  </span>
                  <span className="mt-8 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
                    {audience.solutions.map((solution) => (
                      <span key={solution.id} className="block bg-background/85 px-4 py-3.5 backdrop-blur-sm">
                        <span className="label block text-primary">{solution.code}</span>
                        <span className="mt-2 block text-sm leading-snug tracking-tight">{solution.title}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </FadeUp>

        <FadeUp className="mt-8 flex justify-center md:mt-10">
          <Button href="/solutions" variant="ghost" className="w-full sm:w-auto sm:min-w-60">
            All solutions
          </Button>
        </FadeUp>
      </div>
    </section>
  );
}
