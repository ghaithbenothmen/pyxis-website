import { contact, site } from "@/lib/constants";
import { assets } from "@/lib/assets";

/** Organization schema (schema.org) so search engines understand who Pyxis is. */
export function StructuredData() {
  const headquarters = contact.offices.find((office) => office.role === "Headquarters");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: new URL(assets.brand.logo.onLight.src, site.url).toString(),
    description: site.description,
    email: contact.email,
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "Bridge Street",
        addressLocality: "Kington",
        addressRegion: "Herefordshire",
        postalCode: "HR5 3DJ",
        addressCountry: "GB",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Tunis",
        addressCountry: "TN",
      },
    ],
    contactPoint: headquarters?.phone
      ? [{ "@type": "ContactPoint", contactType: "sales", telephone: headquarters.phone, email: contact.email }]
      : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
