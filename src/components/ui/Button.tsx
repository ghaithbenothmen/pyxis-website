import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { Arrow } from "./Arrow";

type ButtonProps = ComponentPropsWithoutRef<"a"> & {
  variant?: "primary" | "ghost";
  arrow?: "right" | "down" | "up-right";
  size?: "md" | "sm";
};

const variants = {
  primary:
    "bg-foreground text-background hover:bg-accent border-transparent",
  ghost:
    "border-border-strong text-foreground hover:border-foreground/60 bg-background/20 backdrop-blur-sm",
} as const;

const sizes = {
  md: "h-12 gap-6 px-5 sm:h-14 sm:px-6",
  sm: "h-10 gap-4 px-4",
} as const;

/** Link styled as a button. Arrow slides out and back in on hover. */
export function Button({
  variant = "primary",
  arrow = "right",
  size = "md",
  className,
  children,
  href = "",
  ...props
}: ButtonProps) {
  const Tag = href.startsWith("/") || href.startsWith("#") ? Link : "a";
  return (
    <Tag
      href={href}
      className={cn(
        "group/button inline-flex items-center justify-between border text-sm font-medium tracking-tight transition-colors duration-500 ease-out-expo",
        sizes[size],
        variants[variant],
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      <span className="relative flex size-4 overflow-hidden" aria-hidden="true">
        <Arrow
          direction={arrow}
          className="transition-transform duration-500 ease-out-expo group-hover/button:translate-x-full"
        />
        <Arrow
          direction={arrow}
          className="absolute inset-0 -translate-x-full transition-transform duration-500 ease-out-expo group-hover/button:translate-x-0"
        />
      </span>
    </Tag>
  );
}
