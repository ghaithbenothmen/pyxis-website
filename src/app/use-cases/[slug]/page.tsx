import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSolution, solutions } from "@/data/solutions";
import { UseCaseHero } from "@/components/sections/UseCase/UseCaseHero";
import { UseCaseCapabilities } from "@/components/sections/UseCase/UseCaseCapabilities";
import { UseCaseData } from "@/components/sections/UseCase/UseCaseData";
import { NextUseCase } from "@/components/sections/UseCase/NextUseCase";
import { Investigation } from "@/components/sections/Investigation/Investigation";
import { Contact } from "@/components/sections/Contact/Contact";

/** Only the documented use cases exist; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.id }));
}

export async function generateMetadata({ params }: PageProps<"/use-cases/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return {};
  return {
    title: solution.title,
    description: solution.description,
    openGraph: { title: `${solution.title} — Pyxis IT`, description: solution.description },
  };
}

export default async function UseCasePage({ params }: PageProps<"/use-cases/[slug]">) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  // Regulatory Compliance & Deep Investigation tells its story through the
  // investigation sequence, which already covers every capability.
  const isInvestigation = solution.id === "compliance-investigation";

  return (
    <main id="main" className="relative">
      <UseCaseHero solution={solution} />
      {isInvestigation ? <Investigation /> : <UseCaseCapabilities solution={solution} />}
      <UseCaseData solution={solution} index={isInvestigation ? "01" : "02"} />
      <NextUseCase solution={solution} />
      <Contact index={isInvestigation ? "02" : "03"} />
    </main>
  );
}
