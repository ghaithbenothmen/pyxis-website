import Image from "next/image";
import { assets } from "@/lib/assets";
import { contact, telHref } from "@/lib/constants";
import { NetworkField } from "@/components/animation/NetworkField";
import { Reveal } from "@/components/animation/Reveal";
import { FadeUp } from "@/components/animation/FadeUp";
import { ContactForm } from "./ContactForm";

/** Contact block shared by every page; `index` follows each page's numbering. */
export function Contact({ index = "06" }: { index?: string }) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden border-t border-border"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src={assets.cta.image.src}
          alt=""
          fill
          sizes="100vw"
          quality={60}
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 opacity-70">
          <NetworkField density={0.7} />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_0%,var(--background)_70%)]" />
      </div>

      <div className="container-page pt-20 pb-20 md:pt-28 md:pb-24">
        <p className="label flex items-center gap-4 text-muted">
          <span className="text-accent">{index}</span>
          <span className="h-px w-10 bg-border-strong" aria-hidden="true" />
          <span>Contact</span>
        </p>
        <h2 id="contact-title" className="mt-10 text-hero font-display">
          <Reveal lines={["Let's talk about", "your business goals."]} />
        </h2>

        <div className="mt-12 grid gap-16 border-t border-border pt-12 md:mt-16 lg:grid-cols-12 lg:gap-8">
          {/* Direct contact */}
          <FadeUp as="div" stagger={0.1} className="flex flex-col gap-10 lg:col-span-4">
            <p className="max-w-sm text-lead text-muted">
              Fraud, churn, compliance — tell us your challenge and we’ll show you how
              ORION can help.
            </p>
            <div>
              <p className="label text-subtle">Email</p>
              <a
                href={`mailto:${contact.email}`}
                className="mt-3 inline-block text-lg tracking-tight transition-colors hover:text-accent"
              >
                {contact.email}
              </a>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
              {contact.offices.map((office) => (
                <address key={office.country} className="not-italic">
                  <p className="label text-subtle">
                    {office.country} · {office.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {office.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                  {office.phone ? (
                    <a
                      href={telHref(office.phone)}
                      className="mt-2 inline-block text-sm transition-colors hover:text-accent"
                    >
                      {office.phone}
                    </a>
                  ) : null}
                </address>
              ))}
            </div>
          </FadeUp>

          {/* Enquiry form */}
          <FadeUp delay={0.15} className="border border-border bg-background/70 p-6 backdrop-blur-sm md:p-10 lg:col-span-7 lg:col-start-6">
            <p className="label mb-8 text-subtle">Request a demo</p>
            <ContactForm />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
