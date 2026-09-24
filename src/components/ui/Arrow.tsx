import { cn } from "@/lib/utils";

type ArrowProps = {
  direction?: "right" | "down" | "up-right";
  className?: string;
};

const rotation = {
  right: "",
  down: "rotate-90",
  "up-right": "-rotate-45",
} as const;

export function Arrow({ direction = "right", className }: ArrowProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn("size-4 shrink-0", rotation[direction], className)}
    >
      <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}
