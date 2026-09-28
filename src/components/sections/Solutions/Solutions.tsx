import { Scene } from "@/components/animation/Scene";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeUp } from "@/components/animation/FadeUp";
import { Button } from "@/components/ui/Button";
import { audienceHref, audiences, modulesDisclaimer } from "@/data/solutions";
import { SolutionPanels } from "./SolutionPanels";

/** Six solutions, grouped by the two audiences Pyxis serves (spec S08). */
export function Solutions() {
  return (
    <Scene
      name="solutions"
      id="solutions"
      aria-labelledby="solutions-title"
      className="relative py-20 md:py-24"
    >
      <div className="container-page">
        <SectionTitle
          id="solutions-title"
          index="05"
          label="Solutions"
          lines={["Solutions for every team", "that relies on telecom data."]}
          intro={modulesDisclaimer}
        />

        <div className="mt-14 space-y-16 md:mt-20 md:space-y-24">
          {audiences.map((audience, i) => (
            <div key={audience.id} id={audience.id} className="scroll-mt-24">
              <FadeUp className="mb-6 flex flex-col gap-5 border-t border-border pt-6 md:mb-8 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="label flex items-center gap-3 text-accent">
                    <span>{String.fromCharCode(65 + i)}</span>
                    <span className="h-px w-8 bg-accent/50" aria-hidden="true" />
                    <span className="text-foreground">{audience.label}</span>
                  </p>
                  <p className="mt-3 text-muted">{audience.who}</p>
                </div>
                <Button
                  href={audienceHref(audience)}
                  variant={i === 1 ? "primary" : "ghost"}
                  size="sm"
                  className="w-full sm:w-auto sm:min-w-72"
                >
                  {audience.cta.group}
                </Button>
              </FadeUp>
              <div data-solutions="stage">
                <SolutionPanels audience={audience} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Scene>
  );
}
