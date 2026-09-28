import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero/Hero";
import { Orion } from "@/components/sections/Orion/Orion";
import { SolutionsTeaser } from "@/components/sections/Solutions/SolutionsTeaser";
import { Presence } from "@/components/sections/Presence/Presence";
import { Contact } from "@/components/sections/Contact/Contact";
import { LegacyHashRedirect } from "@/components/layout/LegacyHashRedirect";

const ScrollRail = dynamic(() =>
  import("@/components/layout/ScrollRail").then((m) => m.ScrollRail),
);

/** Home: a short tour that leads to the Platform, Solutions and Company pages. */
export default function Home() {
  return (
    <>
      <ScrollRail />
      <LegacyHashRedirect />
      <main id="main" className="relative">
        <Hero />
        <Orion variant="teaser" index="01" />
        <SolutionsTeaser index="02" />
        <Presence index="03" />
        <Contact index="04" />
      </main>
    </>
  );
}
