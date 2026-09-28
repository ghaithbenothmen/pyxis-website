import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { audiences, getAudience } from "@/data/solutions";
import { AudienceHero } from "@/components/sections/SolutionPage/AudienceHero";
import { AudienceSolutions } from "@/components/sections/SolutionPage/AudienceSolutions";
import { AudienceData } from "@/components/sections/SolutionPage/AudienceData";
import { NextAudience } from "@/components/sections/SolutionPage/NextAudience";
import { Investigation } from "@/components/sections/Investigation/Investigation";
import { SubscriberTrace } from "@/components/sections/SolutionPage/SubscriberTrace";
import { AuthorityPrinciples } from "@/components/sections/SolutionPage/AuthorityPrinciples";
import { Contact } from "@/components/sections/Contact/Contact";

const shareImage = { url: "/opengraph-image.png", width: 1200, height: 630, alt: "Pyxis — Where telecom data becomes intelligence." };

/** One page per audience; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return audiences.map((audience) => ({ audience: audience.id }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[audience]">): Promise<Metadata> {
  const audience = getAudience((await params).audience);
  if (!audience) return {};
  const url = `/solutions/${audience.id}`;
  return {
    // Full titles from the spec, so they bypass the "| Pyxis" template
    title: { absolute: audience.seo.title },
    description: audience.seo.description,
    alternates: { canonical: url },
    // Page-level Open Graph replaces the root one, so the share image is restated
    openGraph: { title: audience.seo.title, description: audience.seo.description, url, images: [shareImage] },
    twitter: { title: audience.seo.title, description: audience.seo.description, images: [shareImage] },
  };
}

export default async function AudiencePage({ params }: PageProps<"/solutions/[audience]">) {
  const audience = getAudience((await params).audience);
  if (!audience) notFound();

  if (audience.id === "governments-regulators") {
    // Spec S09: attribution flow → solutions → built for authorities, then the
    // deep-investigation sequence for readers who want the detail.
    return (
      <main id="main" className="relative">
        <AudienceHero audience={audience} />
        <SubscriberTrace index="01" />
        <AudienceSolutions audience={audience} index="02" />
        <AuthorityPrinciples index="03" />
        <Investigation index="04" />
        <AudienceData audience={audience} index="05" />
        <NextAudience audience={audience} />
        <Contact index="06" />
      </main>
    );
  }

  return (
    <main id="main" className="relative">
      <AudienceHero audience={audience} />
      <AudienceSolutions audience={audience} index="01" />
      <AudienceData audience={audience} index="02" />
      <NextAudience audience={audience} />
      <Contact index="03" />
    </main>
  );
}
