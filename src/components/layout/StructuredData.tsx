import { contact, site } from "@/lib/constants";
import { assets } from "@/lib/assets";

/** Organization schema (schema.org) so search engines understand who Pyxis is. */
export function StructuredData() {
  const [tunisia, uk] = contact.offices;
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
        streetAddress: tunisia.lines.join(", "),
        addressLocality: "Tunis",
        addressCountry: "TN",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Bridge Street",
        addressLocality: "Kington",
        addressRegion: "Herefordshire",
        postalCode: "HR5 3DJ",
        addressCountry: "GB",
      },
    ],
    contactPoint: contact.offices.map((office) => ({
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: office.phone,
      email: contact.email,
      areaServed: office === uk ? "GB" : "TN",
    })),
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
