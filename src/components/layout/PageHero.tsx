import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import type { ImageAsset } from "@/lib/assets";
import { Reveal } from "@/components/animation/Reveal";
import { FadeUp } from "@/components/animation/FadeUp";

type PageHeroProps = {
  /** Breadcrumb label for this page. */
  label: string;
  /** H1, one entry per masked line. */
  lines: string[];
  intro?: ReactNode;
  image?: ImageAsset;
  actions?: ReactNode;
};

/** Header shared by the section pages: breadcrumb, H1, intro and optional imagery. */
export function PageHero({ label, lines, intro, image, actions }: PageHeroProps) {
  return (
    <section id="top" aria-labelledby="page-title" className="relative isolate overflow-hidden">
      {image ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <Image src={image.src} alt="" fill preload sizes="100vw" quality={60} className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-linear-to-r from-background via-background/85 to-background/40" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-background to-transparent" />
        </div>
      ) : null}

      <div className="container-page flex min-h-[64svh] flex-col justify-end pt-36 pb-14 md:pb-20">
        <FadeUp as="div">
          <nav aria-label="Breadcrumb">
            <ol className="label flex flex-wrap items-center gap-2 text-subtle">
              <li>
                <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground">{label}</li>
            </ol>
          </nav>
        </FadeUp>

        <h1 id="page-title" className="text-section mt-10 max-w-5xl">
          <Reveal lines={lines} />
        </h1>

        {intro || actions ? (
          <FadeUp delay={0.2} className="mt-8 grid gap-10 md:grid-cols-12 md:items-end">
            {intro ? <div className="max-w-xl text-lead text-muted md:col-span-7">{intro}</div> : null}
            {actions ? (
              <div className="flex flex-col gap-3 sm:flex-row md:col-span-5 md:justify-end">{actions}</div>
            ) : null}
          </FadeUp>
        ) : null}
      </div>
    </section>
  );
}
