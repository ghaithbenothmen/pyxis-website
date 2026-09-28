import { Orion } from "@/components/sections/Orion/Orion";
import { AI } from "@/components/sections/AI/AI";
import { Technology } from "@/components/sections/Technology/Technology";
import { Contact } from "@/components/sections/Contact/Contact";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "ORION — The Intelligence Layer for Telecom Data | Pyxis",
  description:
    "Ingest, correlate and contextualise DPI, CDR/xDR, RADIUS, CGNAT and BSS/OSS data into subscriber-level intelligence.",
  path: "/platform",
});

/** ORION in full: the platform, its AI layer and the data it connects to. */
export default function PlatformPage() {
  return (
    <main id="main" className="relative">
      <Orion variant="page" />
      <AI index="01" />
      <Technology index="02" />
      <Contact index="03" />
    </main>
  );
}
