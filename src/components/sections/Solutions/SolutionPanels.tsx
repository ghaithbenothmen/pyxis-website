"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { solutionHref, type Audience } from "@/data/solutions";
import { cn } from "@/lib/utils";
import { Arrow } from "@/components/ui/Arrow";

/**
 * One audience's solutions as horizontal panels. On desktop the active panel
 * expands to reveal its hook and scenarios; on smaller screens every panel is
 * stacked and open. Titles and "See more" open the solution on its page.
 */
export function SolutionPanels({ audience }: { audience: Audience }) {
  const [active, setActive] = useState(0);

  return (
    <ul className="flex flex-col gap-3 lg:h-[min(62svh,560px)] lg:min-h-[460px] lg:flex-row">
      {audience.solutions.map((solution, i) => {
        const open = i === active;
        const href = solutionHref(audience, solution);
        return (
          <li
            key={solution.id}
            data-solutions="panel"
            onMouseEnter={() => setActive(i)}
            onFocusCapture={() => setActive(i)}
            className={cn(
              "group/panel relative isolate min-h-[340px] overflow-hidden border border-border bg-surface transition-[flex-grow,border-color] duration-[900ms] ease-out-expo lg:min-h-0",
              open ? "lg:flex-[2.4] lg:border-border-strong" : "lg:flex-1",
            )}
          >
            <Image
              src={solution.image.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              quality={60}
              className={cn(
                "-z-10 object-cover transition-[opacity,transform] duration-[1.4s] ease-out-expo",
                open ? "scale-100 opacity-40" : "scale-110 opacity-20",
              )}
            />
            <div className="absolute inset-0 -z-10 bg-linear-to-t from-background via-background/80 to-background/25" />

            <div className="flex h-full flex-col justify-between p-6 md:p-8 lg:p-9">
              <p className="label text-primary">{solution.code}</p>

              <div>
                <h3
                  className={cn(
                    "max-w-xl text-display transition-[font-size] duration-700 ease-out-expo",
                    !open && "lg:text-[clamp(1.2rem,1.6vw,1.55rem)]",
                  )}
                >
                  <Link href={href} className="text-left transition-colors hover:text-primary">
                    {solution.title}
                  </Link>
                </h3>

                <div
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-[900ms] ease-out-expo",
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[1fr] opacity-100 lg:grid-rows-[0fr] lg:opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="mt-4 max-w-lg text-muted">{solution.hook}</p>

                    <div className="mt-7 border-t border-border pt-5">
                      <p className="label mb-3 text-subtle">Scenarios</p>
                      <ul className="flex flex-wrap gap-1.5">
                        {solution.scenarios.map((scenario) => (
                          <li
                            key={scenario}
                            className="border border-border-strong bg-background/50 px-2.5 py-1 text-[0.8rem] leading-snug tracking-tight text-foreground/90"
                          >
                            {scenario}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={href}
                      className="group/cta mt-7 inline-flex items-center gap-3 border-b border-border-strong pb-1 text-sm transition-colors hover:border-accent hover:text-accent"
                    >
                      See more<span className="sr-only"> about {solution.title}</span>
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
