import { Scene } from "@/components/animation/Scene";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeUp } from "@/components/animation/FadeUp";
import { dataSources, engineeringStack, pipeline } from "@/data/technologies";
import { TechMarquee } from "./TechMarquee";
import { pad } from "@/lib/utils";
import { PipelineDiagram } from "./PipelineDiagram";

export function Technology() {
  return (
    <Scene
      name="technology"
      id="technology"
      aria-labelledby="technology-title"
      className="relative border-t border-border bg-background-raised py-24 md:py-32"
    >
      <div className="container-page">
        <SectionTitle
          id="technology-title"
          index="07"
          label="Data ecosystem"
          lines={["Every source.", "One pipeline."]}
          intro="Network, charging, customer and device data are aggregated, cleansed and correlated before ORION and AI turn them into intelligence."
        />

        {/* Desktop / tablet architecture */}
        <div data-tech="diagram" className="mt-20 hidden md:mt-28 md:block">
          <PipelineDiagram />
        </div>

        {/* Mobile architecture */}
        <div className="mt-16 md:hidden">
          <p className="label text-subtle">Data sources</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {dataSources.map((source) => (
              <li
                key={source}
                data-tech="chip"
                className="label border border-border px-2.5 py-1.5 text-foreground normal-case tracking-[0.04em]"
              >
                {source}
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

        <FadeUp className="mt-20 border-t border-border pt-8 md:mt-28">
          <p className="label text-subtle">Technologies we work with</p>
        </FadeUp>
      </div>
      <FadeUp className="mt-8 md:mt-10">
        <TechMarquee items={engineeringStack} />
      </FadeUp>
    </Scene>
  );
}
