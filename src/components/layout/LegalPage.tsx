import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/animation/Reveal";
import { FadeUp } from "@/components/animation/FadeUp";
import { contact } from "@/lib/constants";

/**
 * Shared layout for the legal pages. Their full text is supplied by Pyxis
 * (open point O6); until then each page states only verified facts and says
 * where to ask, rather than showing placeholder copy (spec T4).
 */
export function LegalPage({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return (
    <main id="main" className="relative">
      <section className="container-page pt-36 pb-20 md:pt-44 md:pb-28">
        <FadeUp className="label flex items-center gap-4 text-muted">
          <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
          <span className="h-px w-10 bg-border-strong" aria-hidden="true" />
          <span>{label}</span>
        </FadeUp>
        <h1 className="text-section mt-8 max-w-4xl">
          <Reveal lines={[title]} />
        </h1>
        <FadeUp delay={0.15} className="mt-12 max-w-2xl space-y-6 border-t border-border pt-10 text-muted md:mt-16">
          {children}
          <p>
            Questions:{" "}
            <a href={`mailto:${contact.email}`} className="text-foreground underline decoration-border-strong underline-offset-4 transition-colors hover:text-accent">
              {contact.email}
            </a>
          </p>
        </FadeUp>
      </section>
    </main>
  );
}
