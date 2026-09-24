import Image from "next/image";
import { assets } from "@/lib/assets";
import { cn } from "@/lib/utils";

type LogoProps = {
  /** Background the logo sits on; the site is dark by default. */
  tone?: "dark" | "light";
  /** Load immediately (use for the navbar logo above the fold). */
  eager?: boolean;
  className?: string;
};

/** Official Pyxis wordmark. Size it with a height class, e.g. `h-9`. */
export function Logo({ tone = "dark", eager = false, className }: LogoProps) {
  const logo = tone === "dark" ? assets.brand.logo.onDark : assets.brand.logo.onLight;
  return (
    <Image
      src={logo.src}
      alt="Pyxis IT"
      width={logo.width}
      height={logo.height}
      sizes="160px"
      loading={eager ? "eager" : "lazy"}
      className={cn("h-9 w-auto", className)}
    />
  );
}
