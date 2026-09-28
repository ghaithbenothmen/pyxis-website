import { Scene } from "@/components/animation/Scene";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { attributionIntro, attributionTitle, traceSteps } from "@/data/regulators";
import { cn, pad } from "@/lib/utils";

/**
 * How ORION resolves an IP address to a subscriber (spec S09-R3): four steps
 * linked by live connectors. Plays once on entry, then the active step keeps
 * cycling so the flow reads as a process. Values are illustrative.
 */
export function SubscriberTrace({ index }: { index: string }) {
  return (
    <Scene
      name="trace"
      id="attribution"
      aria-labelledby="attribution-title"
      className="relative border-y border-border bg-background-raised py-20 md:py-24"
    >
      <div className="container-page">
        <SectionTitle
          id="attribution-title"
          index={index}
          label="Subscriber attribution"
          lines={attributionTitle}
          intro={attributionIntro}
        />

        <ol data-trace="stage" className="mt-14 grid gap-8 md:mt-20 lg:grid-cols-4 lg:gap-6">
          {traceSteps.map((step, i) => {
            const last = i === traceSteps.length - 1;
            return (
              <li
                key={step.id}
                data-trace="step"
                className={cn(
                  "group/step relative flex flex-col border bg-background p-5 transition-[border-color,background-color] duration-700 ease-out-expo md:p-6",
                  "border-border data-[active]:border-accent/60 data-[active]:bg-surface",
                  last && "border-accent/40",
                )}
              >
                {/* Connector to the next step: right on desktop, below on phones */}
                {!last ? (
                  <span
                    aria-hidden="true"
                    data-trace="link"
                    className="absolute top-full left-8 h-8 w-px overflow-hidden bg-border-strong lg:top-1/2 lg:left-full lg:h-px lg:w-6"
                  >
                    <span className="absolute inset-x-0 top-0 h-1/2 bg-accent motion-safe:animate-[scan-y_1.4s_linear_infinite] lg:inset-x-auto lg:inset-y-0 lg:left-0 lg:h-full lg:w-1/2 lg:motion-safe:animate-[scan-x_1.4s_linear_infinite]" />
                  </span>
                ) : null}

                <div className="flex items-center justify-between">
                  <span className="label text-accent">{pad(i + 1)}</span>
                  <span
                    aria-hidden="true"
                    className="size-2 rounded-full bg-border-strong transition-colors duration-500 group-data-[active]/step:bg-accent group-data-[active]/step:shadow-[0_0_0_4px_rgb(206_92_38_/_0.2)]"
                  />
                </div>

                <h3 className="mt-8 font-display text-xl leading-tight tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.tech}</p>

                <div className="mt-auto pt-8">
                  <div className="border border-border bg-background-raised px-3 py-2.5 font-mono text-[0.72rem] leading-relaxed tracking-wide text-subtle transition-colors duration-500 group-data-[active]/step:text-foreground">
                    {step.sample.map((line) => (
                      <p key={line} className="truncate">
                        <span className="text-accent/70" aria-hidden="true">› </span>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <p className="label mt-6 text-[0.65rem] text-subtle">Illustrative example — values shown are not real data.</p>
      </div>
    </Scene>
  );
}
