import { Scene } from "@/components/animation/Scene";
import { FadeUp } from "@/components/animation/FadeUp";
import { Button } from "@/components/ui/Button";
import { audienceHref, audiences } from "@/data/solutions";
import { SolutionPanels } from "./SolutionPanels";

/** /solutions: six solutions, grouped by the two audiences Pyxis serves (spec S08). */
export function Solutions() {
  return (
    <Scene
      name="solutions"
      aria-label="Solutions by audience"
      className="relative pb-20 md:pb-24"
    >
      <div className="container-page">
        <div className="space-y-16 md:space-y-24">
          {audiences.map((audience, i) => (
            <div key={audience.id} id={audience.id} className="scroll-mt-24">
              <FadeUp className="mb-6 flex flex-col gap-5 border-t border-border pt-6 md:mb-8 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="label flex items-center gap-3 text-accent">
                    <span>{String.fromCharCode(65 + i)}</span>
                    <span className="h-px w-8 bg-accent/50" aria-hidden="true" />
                    <span className="text-foreground">{audience.label}</span>
                  </h2>
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
