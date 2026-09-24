import { Scene } from "@/components/animation/Scene";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { aiUseCases } from "@/data/ai-use-cases";
import { pad } from "@/lib/utils";
import { AiEcosystem } from "./AiEcosystem";

export function AI() {
  return (
    <Scene
      name="ai"
      id="intelligence"
      aria-labelledby="ai-title"
      className="relative py-24 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[60%] bg-[radial-gradient(ellipse_at_50%_0%,rgb(79_143_208_/_0.12),transparent_65%)]"
      />
      <div className="container-page relative">
        <SectionTitle
          id="ai-title"
          index="05"
          label="Machine intelligence"
          lines={["Intelligence that", "learns the network."]}
          intro="Machine intelligence applied to correlated telecom data — from network behaviour to every customer interaction."
        />

        <div className="mt-20 hidden md:mt-24 md:block">
          <AiEcosystem />
        </div>

        {/* Mobile: a linear trace through the same use cases */}
        <ol data-ai="list" className="relative mt-16 border-l border-border md:hidden">
          {aiUseCases.map((useCase, i) => (
            <li key={useCase.id} data-ai="item" className="relative pb-8 pl-6 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute top-1.5 -left-[5px] size-2.5 rounded-full border border-primary bg-background"
              />
              <span className="label text-primary">
                {pad(i + 1)} · {useCase.domain}
              </span>
              <h3 className="mt-2 text-xl tracking-tight">{useCase.title}</h3>
              <p className="mt-1 text-sm text-muted">{useCase.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </Scene>
  );
}
