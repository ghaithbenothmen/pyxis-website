import { clients } from "@/data/clients";
import { metrics } from "@/data/metrics";
import { FadeUp } from "@/components/animation/FadeUp";
import { Reveal } from "@/components/animation/Reveal";
import { Counter } from "@/components/ui/Counter";
import { Arrow } from "@/components/ui/Arrow";
import { LogoColumns } from "./LogoColumns";

const deployments = metrics.find((m) => m.label === "Deployments");

/** Client references: positioning and deployment count beside a moving logo wall. */
export function Clients() {
  return (
    <section id="references" aria-labelledby="clients-title" className="relative py-24 md:py-32">
      <div className="container-page grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-5">
          <FadeUp className="label mb-10 flex items-center gap-4 text-muted md:mb-14">
            <span className="text-accent">08</span>
            <span className="h-px w-10 bg-border-strong" aria-hidden="true" />
            <span>References</span>
          </FadeUp>
          <h2 id="clients-title" className="text-section">
            <Reveal lines={["Trusted by", "telecom operators."]} />
          </h2>

          <FadeUp delay={0.2} className="mt-12 flex items-end gap-6 border-t border-border pt-8">
            {deployments ? (
              <p className="font-display text-[clamp(4rem,8vw,7rem)] font-medium leading-[0.8] tracking-[-0.06em]">
                <Counter value={deployments.value} suffix={deployments.suffix} />
              </p>
            ) : null}
            <p className="max-w-[16rem] pb-1 text-muted">
              Platform deployments with operators and telecom groups.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <a
              href="#contact"
              className="group mt-10 inline-flex items-center gap-3 border-b border-border-strong pb-1 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              Talk to an expert
              <Arrow className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
            </a>
          </FadeUp>
        </div>

        <FadeUp delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <LogoColumns clients={clients} />
        </FadeUp>
      </div>
    </section>
  );
}
