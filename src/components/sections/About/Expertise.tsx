import { expertiseParagraph, expertiseStatement, services } from "@/data/expertise";
import { FadeUp } from "@/components/animation/FadeUp";
import { pad } from "@/lib/utils";

/**
 * What Pyxis delivers beyond ORION: an introduction on the left and the
 * services on the right. Deliberately distinct from the Solutions section.
 */
export function Expertise() {
  return (
    <div className="mt-24 grid gap-12 md:mt-32 lg:grid-cols-12 lg:gap-8">
      <FadeUp className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
        <h3 className="label text-subtle">Our expertise</h3>
        <p className="mt-4 font-display text-[clamp(1.5rem,2.4vw,2.25rem)] leading-[1.1] tracking-[-0.03em]">
          {expertiseStatement}
        </p>
        <p className="mt-6 max-w-md text-muted">{expertiseParagraph}</p>
      </FadeUp>

      <FadeUp as="ol" stagger={0.08} className="border-b border-border lg:col-span-6 lg:col-start-7">
        {services.map((service, i) => (
          <li
            key={service.title}
            className="group relative grid grid-cols-[3rem_1fr] gap-x-4 gap-y-2 border-t border-border py-7 md:gap-x-6 md:py-8"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-1000 ease-out-expo group-hover:scale-x-100"
            />
            <span className="label pt-1.5 text-primary">{pad(i + 1)}</span>
            <h4 className="text-xl tracking-tight transition-transform duration-700 ease-out-expo group-hover:translate-x-1.5 md:text-2xl">
              {service.title}
            </h4>
            <p className="col-start-2 max-w-lg text-sm text-muted">{service.description}</p>
          </li>
        ))}
      </FadeUp>
    </div>
  );
}
