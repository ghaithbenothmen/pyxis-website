import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StructuredData } from "@/components/layout/StructuredData";
import { Hero } from "@/components/sections/Hero/Hero";
import { Proof } from "@/components/sections/Proof/Proof";
import { About } from "@/components/sections/About/About";
import { Orion } from "@/components/sections/Orion/Orion";
import { AI } from "@/components/sections/AI/AI";
import { Solutions } from "@/components/sections/Solutions/Solutions";
import { Investigation } from "@/components/sections/Investigation/Investigation";
import { Technology } from "@/components/sections/Technology/Technology";
import { Clients } from "@/components/sections/Clients/Clients";
import { Contact } from "@/components/sections/Contact/Contact";

const ScrollRail = dynamic(() =>
  import("@/components/layout/ScrollRail").then((m) => m.ScrollRail),
);

export default function Home() {
  return (
    <>
      <div className="page-guides" aria-hidden="true">
        <span />
        <span className="hidden md:block" />
        <span className="hidden md:block" />
        <span />
      </div>
      <StructuredData />
      <Navbar />
      <ScrollRail />
      <main id="main" className="relative">
        <Hero />
        <About />
        <Proof />
        <Solutions />
        <Orion />
        <AI />
        <Investigation />
        <Technology />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
