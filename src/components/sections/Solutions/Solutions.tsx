import { Scene } from "@/components/animation/Scene";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SolutionPanels } from "./SolutionPanels";

export function Solutions() {
  return (
    <Scene
      name="solutions"
      id="use-cases"
      aria-labelledby="solutions-title"
      className="relative py-20 md:py-24"
    >
      <div className="container-page">
        <SectionTitle
          id="solutions-title"
          index="05"
          label="Use cases"
          lines={["Built for your", "business priorities."]}
          intro="Three ways operators put ORION to work: protecting revenue, keeping customers and staying compliant."
        />
        <div data-solutions="stage" className="mt-12 md:mt-16">
          <SolutionPanels />
        </div>
      </div>
    </Scene>
  );
}
