import type { Solution } from "@/data/solutions";
import { pipeline } from "@/data/technologies";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeUp } from "@/components/animation/FadeUp";
import { pad } from "@/lib/utils";

/** The data sources behind the use case and how ORION processes them. */
export function UseCaseData({ solution, index }: { solution: Solution; index: string }) {
  return (
    <section aria-labelledby="data-title" className="relative border-t border-border bg-background-raised py-20 md:py-24">
      <div className="container-page">
        <SectionTitle
          id="data-title"
          index={index}
          label="Data & platform"
          lines={["From network data", "to intelligence."]}
          intro="ORION ingests and correlates the sources below, then turns them into insights, dashboards, alerts and operational workflows."
        />

        <div className="mt-12 grid gap-16 md:mt-16 lg:grid-cols-12 lg:gap-8">
          <FadeUp className="lg:col-span-4">
            <h3 className="label text-subtle">Data sources</h3>
            <ul className="mt-6 flex flex-wrap gap-2">
              {solution.sources.map((source) => (
                <li
                  key={source}
                  className="label border border-border-strong px-3 py-2 text-foreground normal-case tracking-[0.04em]"
                >
                  {source}
                </li>
              ))}
            </ul>
          </FadeUp>

          <FadeUp className="lg:col-span-7 lg:col-start-6">
            <h3 className="label text-subtle">Powered by ORION</h3>
            <ol className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {pipeline.map((stage, i) => (
                <li
                  key={stage.id}
                  className={
                    stage.id === "orion"
                      ? "bg-surface-strong p-6"
                      : "bg-background-raised p-6"
                  }
                >
                  <span className="label text-primary">{pad(i + 1)}</span>
                  <p className="mt-3 text-xl tracking-tight">{stage.label}</p>
                  <p className="mt-1 text-sm text-muted">{stage.caption}</p>
                </li>
              ))}
            </ol>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
