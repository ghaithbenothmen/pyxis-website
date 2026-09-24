import { metrics } from "@/data/metrics";
import { Counter } from "@/components/ui/Counter";
import { FadeUp } from "@/components/animation/FadeUp";
import { pad } from "@/lib/utils";

export function Proof() {
  return (
    <section id="proof" aria-labelledby="proof-title" className="relative border-t border-border bg-background-raised py-24 md:py-32">
      <div className="container-page">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <p className="label flex items-center gap-4 text-muted md:col-span-4">
            <span className="text-accent">02</span>
            <span className="h-px w-10 bg-border-strong" aria-hidden="true" />
            <span>Key figures</span>
          </p>
          <h2 id="proof-title" className="text-display max-w-xl md:col-span-8 md:justify-self-end md:text-right">
            Telecom scale, measured.
          </h2>
        </div>

        <FadeUp
          as="ul"
          stagger={0.1}
          className="mt-14 grid grid-cols-2 border-t border-border md:mt-20 lg:grid-cols-4"
        >
          {metrics.map((metric, i) => (
            <li
              key={metric.label}
              className="group relative border-b border-border py-10 odd:border-r odd:pr-4 even:pl-4 lg:border-r lg:border-b-0 lg:px-8 lg:py-14 lg:first:pl-0 lg:last:border-r-0"
            >
              <span className="label block text-subtle">{pad(i + 1)}</span>
              <p className="mt-8 font-display text-[clamp(2.5rem,6vw,5.75rem)] font-medium leading-none tracking-[-0.045em]">
                <Counter
                  value={metric.value}
                  decimals={metric.decimals}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  suffixClassName={metric.suffix.trim().length > 1 ? "ml-[0.12em] text-[0.5em] tracking-[-0.02em] text-muted" : undefined}
                />
              </p>
              <p className="mt-5 text-base font-medium text-foreground">{metric.label}</p>
              <p className="mt-1 text-sm text-muted">{metric.detail}</p>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
              />
            </li>
          ))}
        </FadeUp>
      </div>
    </section>
  );
}
