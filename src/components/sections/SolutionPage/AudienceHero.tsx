import Link from "next/link";
import Image from "next/image";
import type { Audience } from "@/data/solutions";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animation/Reveal";
import { FadeUp } from "@/components/animation/FadeUp";

/** Audience page header: breadcrumb, audience, headline, description and imagery. */
export function AudienceHero({ audience }: { audience: Audience }) {
  return (
    <section id="top" aria-labelledby="solution-title" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src={audience.image.src}
          alt=""
          fill
          preload
          sizes="100vw"
          quality={60}
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/85 to-background/40" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-background to-transparent" />
      </div>

      <div className="container-page flex min-h-[80svh] flex-col justify-end pt-36 pb-16 md:pb-24">
        <FadeUp as="div">
          <nav aria-label="Breadcrumb">
            <ol className="label flex flex-wrap items-center gap-2 text-subtle">
              <li>
                <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/solutions" className="transition-colors hover:text-foreground">Solutions</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground">{audience.label}</li>
            </ol>
          </nav>
          <p className="label mt-10 flex items-center gap-4 text-muted">
            <span className="text-accent">{audience.solutions.length} solutions</span>
            <span className="h-px w-10 bg-border-strong" aria-hidden="true" />
            <span>{audience.who}</span>
          </p>
        </FadeUp>

        <h1 id="solution-title" className="text-section mt-8 max-w-5xl">
          <Reveal lines={[audience.headline]} />
        </h1>

        <FadeUp delay={0.2} className="mt-8 grid gap-10 md:grid-cols-12 md:items-end">
          <p className="max-w-xl text-lead text-muted md:col-span-7">{audience.description}</p>
          <div className="flex flex-col gap-3 sm:flex-row md:col-span-5 md:justify-end">
            <Button href="#contact" className="w-full sm:w-auto sm:min-w-52">
              {audience.cta.label}
            </Button>
            <Button href="/solutions" variant="ghost" className="w-full sm:w-auto sm:min-w-48">
              All solutions
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
