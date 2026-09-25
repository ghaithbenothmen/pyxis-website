import type { Solution } from "@/data/solutions";
import { describeCapabilities } from "@/data/capabilities";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeUp } from "@/components/animation/FadeUp";
import { pad } from "@/lib/utils";

/** The capabilities ORION delivers for this use case. */
export function UseCaseCapabilities({ solution }: { solution: Solution }) {
  const capabilities = describeCapabilities(solution.capabilities);

  return (
    <section aria-labelledby="capabilities-title" className="relative py-20 md:py-24">
      <div className="container-page">
        <SectionTitle
          id="capabilities-title"
          index="01"
          label="What you get"
          lines={["What your", "teams get."]}
          intro="Ready-to-use capabilities, delivered by ORION on top of the data you already have."
        />

        <FadeUp as="ul" stagger={0.08} className="mt-12 grid border-t border-border md:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability, i) => (
            <li
              key={capability.title}
              className="group relative border-b border-border py-10 sm:pr-8"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-1000 ease-out-expo group-hover:scale-x-100"
              />
              <span className="label text-primary">{pad(i + 1)}</span>
              <h3 className="mt-6 text-display transition-transform duration-700 ease-out-expo group-hover:translate-x-1.5">
                {capability.title}
              </h3>
              {capability.description ? (
                <p className="mt-4 max-w-sm text-muted">{capability.description}</p>
              ) : null}
            </li>
          ))}
        </FadeUp>
      </div>
    </section>
  );
}
