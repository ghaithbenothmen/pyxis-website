import { clients } from "@/data/clients";
import { FadeUp } from "@/components/animation/FadeUp";
import { Reveal } from "@/components/animation/Reveal";
import { LogoMarquee } from "@/components/ui/LogoMarquee";

/** Client references: headline above a scrolling logo band. */
export function Clients() {
  return (
    <section id="references" aria-labelledby="clients-title" className="relative py-20 md:py-24">
      <div className="container-page">
        <FadeUp className="label mb-8 flex items-center gap-4 text-muted md:mb-10">
          <span className="text-accent">02</span>
          <span className="h-px w-10 bg-border-strong" aria-hidden="true" />
          <span>References</span>
        </FadeUp>
        <h2 id="clients-title" className="text-section">
          <Reveal lines={["Trusted by", "telecom operators."]} />
        </h2>
      </div>

      <FadeUp delay={0.1} className="mt-16 border-y border-border md:mt-20">
        <LogoMarquee logos={clients} label="Client references" size={3} />
      </FadeUp>
    </section>
  );
}
