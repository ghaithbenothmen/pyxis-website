import Image from "next/image";
import type { ClientReference } from "@/data/clients";
import { cn } from "@/lib/utils";

type LogoColumnsProps = {
  clients: ClientReference[];
  className?: string;
};

/** Each column scrolls at its own pace; odd columns run the other way. */
const columns = [
  { offset: 0, duration: "46s", reverse: false, className: "" },
  { offset: 3, duration: "58s", reverse: true, className: "" },
  { offset: 5, duration: "52s", reverse: false, className: "hidden md:flex" },
];

const rotate = <T,>(items: T[], by: number) =>
  items.map((_, i) => items[(i + by) % items.length]);

function LogoTile({ client, decorative }: { client: ClientReference; decorative?: boolean }) {
  return (
    <li
      aria-hidden={decorative || undefined}
      className="group/logo relative flex h-32 shrink-0 items-center justify-center border border-border bg-surface/40 transition-colors duration-500 ease-out-expo hover:border-transparent hover:bg-foreground md:h-36"
    >
      <span className="relative flex h-11 w-32 items-center justify-center transition-transform duration-500 ease-out-expo group-hover/logo:scale-110">
        <Image
          src={client.mono}
          alt={decorative ? "" : client.name}
          width={client.width}
          height={client.height}
          unoptimized
          className="absolute max-h-full max-w-full object-contain opacity-70 transition-opacity duration-500 group-hover/logo:opacity-0"
        />
        <Image
          src={client.color}
          alt=""
          width={client.width}
          height={client.height}
          unoptimized
          className="absolute max-h-full max-w-full object-contain opacity-0 transition-opacity duration-500 group-hover/logo:opacity-100"
        />
      </span>
    </li>
  );
}

/**
 * Client logos in vertically scrolling columns. Monochrome at rest; hovering a
 * tile lights it up and reveals the logo's own colours. The whole wall pauses
 * on hover, and stands still for reduced motion.
 */
export function LogoColumns({ clients, className }: LogoColumnsProps) {
  return (
    <div
      className={cn(
        "logo-wall relative grid h-[26rem] grid-cols-2 gap-3 overflow-hidden md:h-[32rem] md:grid-cols-3",
        "[mask-image:linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)]",
        className,
      )}
    >
      {columns.map((column, c) => {
        const ordered = rotate(clients, column.offset);
        return (
          <div
            key={c}
            className={cn("logo-column flex flex-col", column.className)}
            style={{
              animationDuration: column.duration,
              animationDirection: column.reverse ? "reverse" : "normal",
            }}
          >
            <ul className="flex flex-col gap-3 pb-3">
              {ordered.map((client) => (
                <LogoTile key={client.name} client={client} decorative={c > 0} />
              ))}
            </ul>
            {/* Identical second copy (same height, incl. bottom padding) makes the loop seamless */}
            <ul className="logo-column-copy flex flex-col gap-3 pb-3" aria-hidden="true">
              {ordered.map((client) => (
                <LogoTile key={client.name} client={client} decorative />
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
