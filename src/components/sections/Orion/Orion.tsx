import { Scene } from "@/components/animation/Scene";
import { orionStages } from "@/data/orion";
import { principles } from "@/data/about";
import { pad } from "@/lib/utils";
import { OrionDiagram } from "./OrionDiagram";

export function Orion() {
  return (
    <Scene
      name="orion"
      id="orion"
      aria-labelledby="orion-title"
      className="group/orion relative"
    >
      <div
        data-orion="pin"
        className="relative flex min-h-svh items-center overflow-hidden py-24 lg:h-svh lg:py-0"
      >
        {/* Backdrop grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:64px_64px] opacity-40 [mask-image:radial-gradient(ellipse_at_65%_50%,black_10%,transparent_70%)]"
        />

        <div className="container-page relative grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-8 lg:pt-16">
          <div className="lg:col-span-4">
            <p className="label flex items-center gap-4 text-muted">
              <span className="text-accent">04</span>
              <span className="h-px w-10 bg-border-strong" aria-hidden="true" />
              <span>Platform</span>
            </p>
            <h2
              id="orion-title"
              className="mt-8 font-display text-[clamp(4rem,8vw,7.5rem)] font-medium leading-[0.85] tracking-[-0.05em]"
            >
              ORION
            </h2>
            <p className="mt-6 max-w-sm text-lead text-muted">
              Our flagship platform transforms complex network data into actionable
              intelligence for telecom operators.
            </p>
            <ul className="label mt-6 flex flex-wrap gap-2 text-foreground">
              {principles.slice(0, 3).map((principle) => (
                <li key={principle} className="border border-border-strong px-2.5 py-1.5">
                  {principle}
                </li>
              ))}
            </ul>

            <ol className="mt-8 hidden border-l border-border lg:block">
              {orionStages.map((stage, i) => (
                <li
                  key={stage.title}
                  data-orion-step={i}
                  className="relative py-2 pl-6 transition-opacity duration-500 group-data-[pinned]/orion:opacity-30 group-data-[pinned]/orion:data-[active]:opacity-100"
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-0 -left-px h-full w-px origin-top scale-y-0 bg-primary transition-transform duration-500 group-data-[pinned]/orion:[[data-active]>&]:scale-y-100"
                  />
                  <span className="label flex gap-3">
                    <span className="text-primary">{pad(i + 1)}</span>
                    <span>{stage.title}</span>
                  </span>
                  <span className="mt-1 block max-w-xs text-sm text-muted">
                    {stage.caption}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div data-orion="stage" className="relative lg:col-span-8">
            <OrionDiagram layout="wide" className="hidden max-h-[82svh] sm:block" />
            <OrionDiagram layout="tall" className="mx-auto max-w-sm sm:hidden" />

            <div
              aria-hidden="true"
              className="label mt-6 hidden items-center justify-between gap-6 text-subtle lg:flex"
            >
              <span>ORION / live pipeline</span>
              <span className="relative h-px flex-1 bg-border">
                <span data-orion="progress" className="absolute inset-0 origin-left scale-x-0 bg-primary" />
              </span>
              <span data-orion="counter" className="tabular-nums">
                01 / {pad(orionStages.length)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Scene>
  );
}
