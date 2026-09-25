import { Scene } from "@/components/animation/Scene";
import { FadeUp } from "@/components/animation/FadeUp";
import {
  investigationCapabilities,
  investigationSteps,
  traceEvents,
} from "@/data/investigation";
import { pad } from "@/lib/utils";
import { InvestigationMap } from "./InvestigationMap";

const evidence = ["Subscriber identified", "Timeline rebuilt", "Location confirmed", "Evidence file ready"];

export function Investigation() {
  return (
    <Scene
      name="investigation"
      id="investigation"
      aria-labelledby="investigation-title"
      className="group/inv relative"
    >
      <div className="relative overflow-hidden">
        <div className="container-page relative grid gap-12 py-20 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-24">
          <div className="relative z-10 lg:col-span-4">
            <p className="label flex items-center gap-4 text-muted">
              <span className="text-accent">03</span>
              <span className="h-px w-10 bg-border-strong" aria-hidden="true" />
              <span>In depth · Compliance & investigation</span>
            </p>
            <h2 id="investigation-title" className="mt-8 text-section">
              Every event
              <br />
              leaves a trace.
            </h2>
            <p className="mt-6 max-w-sm text-muted">
              Answer authorities’ requests quickly and reliably: ORION links each network
              event to the right subscriber, place and time, and packages the evidence.
            </p>

            <ol className="mt-10 space-y-0 border-l border-border">
              {investigationSteps.map((step, i) => (
                <li
                  key={step.id}
                  data-inv-step={i}
                  className="relative flex items-center gap-3 py-1.5 pl-5 transition-[opacity,color] duration-500 group-data-[playing]/inv:opacity-30 group-data-[playing]/inv:data-[active]:opacity-100 group-data-[playing]/inv:data-[done]:opacity-70"
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-1/2 -left-[3.5px] size-1.5 -translate-y-1/2 rounded-full bg-border-strong transition-colors duration-500 group-data-[playing]/inv:[[data-active]>&]:bg-accent group-data-[playing]/inv:[[data-done]>&]:bg-accent/60"
                  />
                  <span className="label text-subtle">{pad(i + 1)}</span>
                  <span className="text-sm tracking-tight">{step.label}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative lg:col-span-8 lg:h-[min(72svh,620px)]">
            <div data-inv="map" className="relative aspect-[10/7] w-full overflow-hidden border border-border bg-background-raised lg:aspect-auto lg:h-full">
              <InvestigationMap />

              {/* HUD corners */}
              <div aria-hidden="true" className="label pointer-events-none absolute inset-x-0 top-0 flex justify-between p-3 text-[0.625rem] text-subtle md:p-4">
                <span>Case view</span>
                <span className="hidden sm:inline">
                  {traceEvents.length} linked events
                </span>
              </div>
            </div>

            {/* Event readout for small screens, where map labels are hidden */}
            <ul className="label mt-3 divide-y divide-border border border-border text-[0.65rem] md:hidden">
              {traceEvents.map((event, i) => (
                <li key={event.id} className="flex justify-between gap-3 px-3 py-2.5">
                  <span className="text-foreground">
                    Event {pad(i + 1)} · {event.cell}
                  </span>
                  <span className="text-accent tabular-nums">{event.time}</span>
                </li>
              ))}
            </ul>

            <div
              data-inv="evidence"
              className="mt-3 border border-accent/40 bg-background/90 p-4 backdrop-blur-sm md:absolute md:bottom-3 md:left-3 md:mt-0 md:w-60 lg:bottom-5 lg:left-5 lg:w-64"
            >
              <p className="label flex items-center justify-between text-accent">
                <span>Case file</span>
                <span className="blink">●</span>
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {evidence.map((item) => (
                  <li key={item} data-inv="evidence-item" className="flex items-center justify-between gap-4 border-t border-border pt-2">
                    <span>{item}</span>
                    <span className="label text-accent" aria-hidden="true">OK</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Capabilities */}
      <div className="container-page pb-20 md:pb-24 lg:pt-20">
        <FadeUp as="ul" stagger={0.06} className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {investigationCapabilities.map((capability, i) => (
            <li
              key={capability.title}
              className="group border-b border-border py-8 sm:pr-6 lg:[&:nth-child(-n+4)]:border-b lg:[&:nth-last-child(-n+4)]:border-b-0"
            >
              <span className="label text-accent/80">{pad(i + 1)}</span>
              <h3 className="mt-4 text-lg leading-snug tracking-tight transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
                {capability.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{capability.description}</p>
              <p className="label mt-4 text-[0.6rem] normal-case tracking-[0.08em] text-subtle">{capability.tech}</p>
            </li>
          ))}
        </FadeUp>
      </div>
    </Scene>
  );
}
