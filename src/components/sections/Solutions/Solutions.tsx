import { Scene } from "@/components/animation/Scene";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SolutionPanels } from "./SolutionPanels";

export function Solutions() {
  return (
    <Scene
      name="solutions"
      id="use-cases"
      aria-labelledby="solutions-title"
      className="relative py-24 md:py-32"
    >
      <div className="container-page">
        <SectionTitle
          id="solutions-title"
          index="05"
          label="Use cases"
          lines={["Three use cases.", "One platform."]}
          intro="How operators put ORION to work — each built on the same correlated data and on ORION Intelligence."
        />
        <div data-solutions="stage" className="mt-16 md:mt-24">
          <SolutionPanels />
        </div>
      </div>
    </Scene>
  );
}
