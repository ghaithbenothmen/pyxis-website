import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/animation/Magnetic";
import { orionSources } from "@/data/orion";

const titleLines = ["Where telecom data", "becomes intelligence."];

export function HeroContent() {
  return (
    <div
      data-hero="content"
      className="container-page relative flex min-h-svh flex-col justify-between pt-24 pb-8 sm:pt-28 sm:pb-10"
    >
      {/* Technical metadata row */}
      <div className="label hidden justify-between gap-6 text-subtle md:flex">
        <span data-hero="meta" data-intro>
          Pyxis IT / Telecom data intelligence
        </span>
        <span data-hero="meta" data-intro className="flex items-center gap-2">
          <span className="blink size-1.5 rounded-full bg-primary" />
          Signal · live
        </span>
        <span data-hero="meta" data-intro>
          36.84° N — 10.19° E
        </span>
      </div>

      <div className="py-16 md:py-20">
        <p data-hero="eyebrow" data-intro className="label mb-8 flex items-center gap-3 text-primary">
          <span className="h-px w-8 bg-primary/60" aria-hidden="true" />
          Network intelligence · Analytics · AI
        </p>

        <h1 className="text-hero max-w-[14ch] font-display lg:max-w-none">
          {titleLines.map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
              <span data-hero="line" data-intro className="block">
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:items-end">
          <p data-hero="lead" data-intro className="max-w-md text-lead text-muted md:col-span-6 lg:col-span-5">
            AI-powered intelligence for networks, customers and investigations.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row md:col-span-6 md:justify-end lg:col-span-7">
            <div data-hero="cta" data-intro>
              <Magnetic className="block sm:inline-block">
                <Button href="#orion" className="w-full sm:w-auto sm:min-w-52">
                  Explore ORION
                </Button>
              </Magnetic>
            </div>
            <div data-hero="cta" data-intro>
              <Button href="#contact" variant="ghost" className="w-full sm:w-auto sm:min-w-56">
                Talk to an expert
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom readouts */}
      <div className="label flex items-end justify-between gap-6 border-t border-border pt-5 text-subtle">
        <span data-hero="meta" data-intro className="flex items-center gap-3">
          <span className="relative block h-8 w-px overflow-hidden bg-border-strong">
            <span className="absolute inset-x-0 top-0 h-1/2 bg-primary motion-safe:animate-[scan-y_2s_var(--ease-in-out)_infinite]" />
          </span>
          Scroll to follow the signal
        </span>
        <span data-hero="meta" data-intro className="hidden text-right sm:block">
          Sources — {orionSources.join(" · ")}
        </span>
      </div>
    </div>
  );
}
