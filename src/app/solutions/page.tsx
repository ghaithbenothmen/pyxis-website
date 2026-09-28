import { PageHero } from "@/components/layout/PageHero";
import { Solutions } from "@/components/sections/Solutions/Solutions";
import { Contact } from "@/components/sections/Contact/Contact";
import { modulesDisclaimer } from "@/data/solutions";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Telecom Data Solutions for Operators & Regulators | Pyxis",
  description:
    "Six ORION solutions for telecom operators, regulators and government agencies: network, fraud, customer experience, log management, deep investigation and lawful interception.",
  path: "/solutions",
});

/** All six solutions, grouped by audience (spec S08). */
export default function SolutionsPage() {
  return (
    <main id="main" className="relative">
      <PageHero
        label="Solutions"
        lines={["Solutions for every team", "that relies on telecom data."]}
        intro={modulesDisclaimer}
      />
      <Solutions />
      <Contact />
    </main>
  );
}
