import { PageHero } from "@/components/layout/PageHero";
import { About } from "@/components/sections/About/About";
import { Contact } from "@/components/sections/Contact/Contact";
import { aboutLead } from "@/data/about";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Company — Telecom Data Intelligence | Pyxis",
  description:
    "Pyxis builds intelligence software for telecom operators and regulators. Headquartered in the United Kingdom, with an office in Tunis, operating across 20+ countries.",
  path: "/company",
});

/** Who Pyxis is: positioning, principles and global presence. */
export default function CompanyPage() {
  return (
    <main id="main" className="relative">
      <PageHero label="Company" lines={["Telecom Data", "Intelligence."]} intro={aboutLead} />
      <About />
      <Contact />
    </main>
  );
}
