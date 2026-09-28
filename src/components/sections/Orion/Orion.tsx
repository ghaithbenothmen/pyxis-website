import Link from "next/link";
import { Scene } from "@/components/animation/Scene";
import { Button } from "@/components/ui/Button";
import { orionStages } from "@/data/orion";
import { pad } from "@/lib/utils";
import { OrionDiagram } from "./OrionDiagram";

type OrionProps = {
  /**
   * `page` opens /platform: the title is the page's H1 and the seven stages
   * narrate the diagram. `teaser` sits on the home page with a link to it.
   */
  variant: "page" | "teaser";
  index?: string;
};

export function Orion({ variant, index }: OrionProps) {
  const page = variant === "page";
  const Heading = page ? "h1" : "h2";

  return (
    <Scene
      name="orion"
      id="orion"
      aria-labelledby="orion-title"
      className="group/orion relative"
    >
      <div
        className={
          page
            ? "relative flex min-h-svh items-center overflow-hidden pt-28 pb-20 lg:pt-32 lg:pb-24"
            : "relative flex min-h-svh items-center overflow-hidden py-20 lg:py-24"
        }
      >
        {/* Backdrop grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:64px_64px] opacity-40 [mask-image:radial-gradient(ellipse_at_65%_50%,black_10%,transparent_70%)]"
        />

        <div className="container-page relative grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-4">
            {page ? (
              <nav aria-label="Breadcrumb">
                <ol className="label flex items-center gap-2 text-subtle">
                  <li>
                    <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="text-foreground">Platform</li>
                </ol>
              </nav>
            ) : (
              <p className="label flex items-center gap-4 text-muted">
                <span className="text-accent">{index}</span>
                <span className="h-px w-10 bg-border-strong" aria-hidden="true" />
                <span>Platform</span>
              </p>
            )}
            <Heading id="orion-title" className="mt-8">
              <span className="block font-display text-[clamp(3rem,5.5vw,5.5rem)] font-medium leading-[0.85] tracking-[-0.05em]">
                ORION
              </span>
              {page ? (
                <span className="mt-5 block max-w-sm text-display text-foreground/90">
                  The intelligence layer for telecom data.
                </span>
              ) : null}
            </Heading>
            <p className="mt-6 max-w-sm text-lead text-muted">
              Our flagship platform turns the data your network already produces into
              decisions your teams can act on.
            </p>

            {page ? (
              <ol className="mt-8 hidden border-l border-border lg:block">
                {orionStages.map((stage, i) => (
                  <li
                    key={stage.title}
                    data-orion-step={i}
                    className="relative py-2 pl-6 transition-opacity duration-500 group-data-[playing]/orion:opacity-30 group-data-[playing]/orion:data-[active]:opacity-100"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute top-0 -left-px h-full w-px origin-top scale-y-0 bg-primary transition-transform duration-500 group-data-[playing]/orion:[[data-active]>&]:scale-y-100"
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
            ) : (
              <div className="mt-10">
                <Button href="/platform" className="w-full sm:w-auto sm:min-w-60">
                  Discover the platform
                </Button>
              </div>
            )}
          </div>

          <div data-orion="stage" className="relative lg:col-span-8">
            <OrionDiagram layout="wide" className="hidden max-h-[70svh] sm:block" />
            <OrionDiagram layout="tall" className="mx-auto max-w-sm sm:hidden" />
          </div>
        </div>
      </div>
    </Scene>
  );
}
