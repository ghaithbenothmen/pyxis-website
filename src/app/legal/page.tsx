import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { contact, site } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Legal notice",
  description: `Legal information about ${site.legalName}.`,
  alternates: { canonical: "/legal" },
  // Kept out of search results until the full text is published (O6)
  robots: { index: false, follow: true },
};

export default function LegalNotice() {
  const headquarters = contact.offices.find((office) => office.role === "Headquarters");
  const office = contact.offices.find((item) => item.role === "Office");

  return (
    <LegalPage label="Legal notice" title="Legal notice.">
      <dl className="grid gap-6 sm:grid-cols-[10rem_1fr]">
        <dt className="label text-subtle">Company</dt>
        <dd className="text-foreground">{site.legalName}</dd>
        {headquarters ? (
          <>
            <dt className="label text-subtle">Headquarters</dt>
            <dd className="text-foreground">
              {headquarters.lines.join(", ")}, {headquarters.country}
              {headquarters.phone ? <span className="block text-muted">{headquarters.phone}</span> : null}
            </dd>
          </>
        ) : null}
        {office ? (
          <>
            <dt className="label text-subtle">Office</dt>
            <dd className="text-foreground">{office.lines.join(", ")}</dd>
          </>
        ) : null}
      </dl>
      <p>The complete legal notice will be published on this page.</p>
    </LegalPage>
  );
}
