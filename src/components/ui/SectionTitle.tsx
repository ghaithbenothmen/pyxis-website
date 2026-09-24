import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/animation/Reveal";
import { FadeUp } from "@/components/animation/FadeUp";

type SectionTitleProps = {
  index: string;
  label: string;
  /** Each entry renders as a masked line that reveals in sequence. */
  lines: string[];
  intro?: ReactNode;
  id?: string;
  className?: string;
  align?: "split" | "stack";
};

/**
 * Editorial section header: a technical index row, a large masked title and
 * an optional intro paragraph.
 */
export function SectionTitle({
  index,
  label,
  lines,
  intro,
  id,
  className,
  align = "split",
}: SectionTitleProps) {
  return (
    <header className={cn("relative", className)}>
      <FadeUp className="label mb-10 flex items-center gap-4 text-muted md:mb-14">
        <span className="text-accent">{index}</span>
        <span className="h-px w-10 bg-border-strong" aria-hidden="true" />
        <span>{label}</span>
      </FadeUp>

      <div
        className={cn(
          "grid gap-8",
          align === "split" && "lg:grid-cols-12 lg:items-end",
        )}
      >
        <h2
          id={id}
          className={cn(
            "text-section",
            align === "split" ? "lg:col-span-8" : "max-w-5xl",
          )}
        >
          <Reveal lines={lines} />
        </h2>
        {intro ? (
          <FadeUp
            delay={0.2}
            className={cn(
              "max-w-md text-lead text-muted",
              align === "split" && "lg:col-span-4 lg:justify-self-end",
            )}
          >
            {intro}
          </FadeUp>
        ) : null}
      </div>
    </header>
  );
}
