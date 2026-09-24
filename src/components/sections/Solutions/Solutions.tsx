import { Scene } from "@/components/animation/Scene";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SolutionPanels } from "./SolutionPanels";

export function Solutions() {
  return (
    <Scene
      name="solutions"
      id="solutions"
      aria-labelledby="solutions-title"
      className="relative py-24 md:py-32"
    >
      <div className="container-page">
        <SectionTitle
          id="solutions-title"
          index="03"
          label="Solutions"
          lines={["From intelligence", "to outcomes."]}
          intro="Three business outcomes built on the same correlated data and the same intelligence layer."
        />
        <div data-solutions="stage" className="mt-16 md:mt-24">
          <SolutionPanels />
        </div>
      </div>
    </Scene>
  );
}
