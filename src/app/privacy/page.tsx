import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${site.legalName} handles personal data.`,
  alternates: { canonical: "/privacy" },
  // Kept out of search results until the full text is published (O6)
  robots: { index: false, follow: true },
};

export default function PrivacyPolicy() {
  return (
    <LegalPage label="Privacy policy" title="Privacy policy.">
      <p>
        Our privacy policy is being finalised and will be published on this page. It will describe
        which personal data {site.legalName} collects through this website, why, and how you can
        exercise your rights.
      </p>
    </LegalPage>
  );
}
