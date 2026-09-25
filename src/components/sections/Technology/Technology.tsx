import { Scene } from "@/components/animation/Scene";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { dataSources, pipeline } from "@/data/technologies";
import { pad } from "@/lib/utils";
import { PipelineDiagram } from "./PipelineDiagram";

export function Technology() {
  return (
    <Scene
      name="technology"
      id="technology"
      aria-labelledby="technology-title"
      className="relative border-t border-border bg-background-raised py-20 md:py-24"
    >
      <div className="container-page">
        <SectionTitle
          id="technology-title"
          index="04"
          label="Data ecosystem"
          lines={["Works with the systems", "you already have."]}
          intro="ORION connects to your network, billing, CRM and customer systems — no need to replace what you have. For your technical teams, the full data flow is below."
        />

        {/* Desktop / tablet architecture */}
        <div data-tech="diagram" className="mt-14 hidden md:mt-20 md:block">
          <PipelineDiagram />
        </div>

        {/* Mobile architecture */}
        <div className="mt-16 md:hidden">
          <p className="label text-subtle">Connects to</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {dataSources.map((source) => (
              <li key={source.label} data-tech="chip" className="border border-border px-2.5 py-1.5">
                <span className="block text-sm leading-tight tracking-tight text-foreground">{source.label}</span>
                <span className="label mt-0.5 block text-[0.6rem] normal-case text-subtle">{source.tech}</span>
              </li>
            ))}
          </ul>

          <ol className="relative mt-10 ml-2 border-l border-border">
            <span
              aria-hidden="true"
              className="absolute -left-px top-0 h-16 w-px bg-linear-to-b from-transparent via-primary to-transparent motion-safe:animate-[scan-y_3s_linear_infinite]"
            />
            {pipeline.map((stage, i) => (
              <li key={stage.id} data-tech="step" className="relative pb-7 pl-7 last:pb-0">
                <span
                  aria-hidden="true"
                  className={
                    stage.id === "orion"
                      ? "absolute top-1 -left-[7px] size-3.5 rounded-full bg-primary"
                      : "absolute top-1.5 -left-[5px] size-2.5 rounded-full border border-primary bg-background-raised"
                  }
                />
                <span className="label text-subtle">{pad(i + 1)}</span>
                <p className="mt-1 text-lg tracking-tight">{stage.label}</p>
                <p className="text-sm text-muted">{stage.caption}</p>
              </li>
            ))}
          </ol>
        </div>

      </div>
    </Scene>
  );
}
