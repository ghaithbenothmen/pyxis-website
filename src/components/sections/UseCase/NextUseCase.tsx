import Link from "next/link";
import Image from "next/image";
import { nextSolution, hrefForUseCase, type Solution } from "@/data/solutions";
import { Arrow } from "@/components/ui/Arrow";

/** Large link to the following use case, as on editorial corporate sites. */
export function NextUseCase({ solution }: { solution: Solution }) {
  const next = nextSolution(solution);

  return (
    <section aria-label="Next use case" className="relative border-t border-border">
      <Link href={hrefForUseCase(next)} className="group relative isolate block overflow-hidden">
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 ease-out-expo group-hover:opacity-100 group-focus-visible:opacity-100">
          <Image
            src={next.image.src}
            alt=""
            fill
            sizes="100vw"
            quality={60}
            className="scale-110 object-cover opacity-30 transition-transform duration-[1.6s] ease-out-expo group-hover:scale-100"
          />
          <span className="absolute inset-0 bg-linear-to-r from-background via-background/70 to-background/30" />
        </span>
        <span className="container-page flex flex-col gap-6 py-20 md:flex-row md:items-end md:justify-between md:py-28">
          <span>
            <span className="label flex items-center gap-4 text-muted">
              <span className="text-accent">{next.code}</span>
              <span className="h-px w-10 bg-border-strong" aria-hidden="true" />
              <span>Next use case</span>
            </span>
            <span className="mt-6 block font-display text-section font-medium transition-transform duration-700 ease-out-expo group-hover:translate-x-3">
              {next.title}
            </span>
          </span>
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-border-strong transition-[border-color,transform] duration-700 ease-out-expo group-hover:-rotate-45 group-hover:border-primary md:size-16">
            <Arrow />
          </span>
        </span>
      </Link>
    </section>
  );
}
