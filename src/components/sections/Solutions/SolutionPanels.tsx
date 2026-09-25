"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { solutions, hrefForUseCase } from "@/data/solutions";
import { cn } from "@/lib/utils";
import { Arrow } from "@/components/ui/Arrow";

/**
 * Three horizontal panels. On desktop the active panel expands to reveal its
 * capabilities; on smaller screens every panel is stacked and open. Titles and
 * "See more" open each use case's own page.
 */
export function SolutionPanels() {
  const [active, setActive] = useState(0);

  return (
    <ul className="flex flex-col gap-3 lg:h-[min(70svh,640px)] lg:min-h-[500px] lg:flex-row">
      {solutions.map((solution, i) => {
        const open = i === active;
        return (
          <li
            key={solution.id}
            id={`use-case-${solution.id}`}
            data-solutions="panel"
            onMouseEnter={() => setActive(i)}
            onFocusCapture={() => setActive(i)}
            className={cn(
              "group/panel relative isolate min-h-[520px] overflow-hidden border border-border bg-surface transition-[flex-grow,border-color] duration-[900ms] ease-out-expo lg:min-h-0",
              open ? "lg:flex-[2.6] lg:border-border-strong" : "lg:flex-1",
            )}
          >
            <Image
              src={solution.image.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              quality={60}
              className={cn(
                "-z-10 object-cover transition-[opacity,transform] duration-[1.4s] ease-out-expo",
                open ? "scale-100 opacity-45" : "scale-110 opacity-20",
              )}
            />
            <div className="absolute inset-0 -z-10 bg-linear-to-t from-background via-background/75 to-background/20" />

            <div className="flex h-full flex-col justify-between p-6 md:p-8 lg:p-10">
              <div className="label flex items-center justify-between text-muted">
                <span>
                  <span className="text-primary">{solution.code}</span>
                  <span className={cn("ml-3 hidden transition-opacity duration-500 sm:inline", !open && "lg:opacity-0")}>
                    {solution.title}
                  </span>
                </span>
              </div>

              <div>
                <h3
                  className={cn(
                    "max-w-xl text-display transition-[font-size] duration-700 ease-out-expo",
                    !open && "lg:text-[clamp(1.25rem,1.8vw,1.75rem)]",
                  )}
                >
                  <Link href={hrefForUseCase(solution)} className="text-left transition-colors hover:text-primary">
                    {solution.headline}
                  </Link>
                </h3>

                <div
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-[900ms] ease-out-expo",
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[1fr] opacity-100 lg:grid-rows-[0fr] lg:opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="mt-5 max-w-lg text-muted">{solution.description}</p>

                    <div className="mt-8 border-t border-border pt-6">
                      <div>
                        <p className="label mb-3 text-subtle">What you get</p>
                        <ul className="grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
                          {solution.capabilities.map((capability) => (
                            <li key={capability} className="flex items-center gap-2">
                              <span className="size-1 bg-primary" aria-hidden="true" />
                              {capability}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Link
                      href={hrefForUseCase(solution)}
                      aria-label={`See more about ${solution.title}`}
                      className="group/cta mt-8 inline-flex items-center gap-3 border-b border-border-strong pb-1 text-sm transition-colors hover:border-accent hover:text-accent"
                    >
                      See more
                      <Arrow className="transition-transform duration-500 ease-out-expo group-hover/cta:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
