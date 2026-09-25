import { Scene } from "@/components/animation/Scene";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { AiEcosystem } from "./AiEcosystem";

export function AI() {
  return (
    <Scene
      name="ai"
      id="intelligence"
      aria-labelledby="ai-title"
      className="relative pt-8 pb-20 md:pt-12 md:pb-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[60%] bg-[radial-gradient(ellipse_at_50%_0%,rgb(79_143_208_/_0.12),transparent_65%)]"
      />
      <div className="container-page relative">
        <SectionTitle
          id="ai-title"
          index="03"
          label="ORION Intelligence"
          lines={["AI that works", "for your business."]}
          intro="Ready-to-use AI capabilities, built into ORION, that help your teams stop fraud, keep customers and grow revenue."
        />

        <div className="mt-12 md:mt-16">
          <AiEcosystem />
        </div>
      </div>
    </Scene>
  );
}
