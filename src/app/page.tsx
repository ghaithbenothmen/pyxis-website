import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero/Hero";
import { About } from "@/components/sections/About/About";
import { Orion } from "@/components/sections/Orion/Orion";
import { AI } from "@/components/sections/AI/AI";
import { Solutions } from "@/components/sections/Solutions/Solutions";
import { Technology } from "@/components/sections/Technology/Technology";
import { Presence } from "@/components/sections/Presence/Presence";
import { Contact } from "@/components/sections/Contact/Contact";

const ScrollRail = dynamic(() =>
  import("@/components/layout/ScrollRail").then((m) => m.ScrollRail),
);

export default function Home() {
  return (
    <>
      <ScrollRail />
      <main id="main" className="relative">
        <Hero />
        <About />
        <Presence />
        {/* ORION chapter: the platform and its AI layer, ORION Intelligence */}
        <div id="orion">
          <Orion />
          <AI />
        </div>
        <Technology />
        <Solutions />
        <Contact />
      </main>
    </>
  );
}
