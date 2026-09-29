import Link from "next/link";
import { contact, legalLinks, navigation, site, telHref } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";
import { Arrow } from "@/components/ui/Arrow";

/** Footer (spec S12): brand, the three navigation groups, contact, legal line. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-background">
      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 md:py-20 lg:grid-cols-12 lg:gap-8">
        <div className="sm:col-span-2 lg:col-span-3">
          <Link href="/#top" aria-label="Pyxis — back to top">
            <Logo className="h-12" />
          </Link>
          <p className="label mt-6 text-subtle">Telecom Data Intelligence</p>
          <p className="mt-3 max-w-xs text-sm text-muted">{site.tagline}</p>
        </div>

        {navigation.map((group) => (
          <nav key={group.label} aria-label={group.label} className="lg:col-span-2">
            <p className="label text-subtle">{group.label}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {group.items.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="sm:col-span-2 lg:col-span-3">
          <p className="label text-subtle">Contact</p>
          <ul className="mt-4 space-y-4 text-sm">
            <li>
              <a href={`mailto:${contact.email}`} className="break-all text-foreground transition-colors hover:text-accent">
                {contact.email}
              </a>
            </li>
            {contact.offices.map((office) => (
              <li key={office.country} className="text-muted">
                <span className="block text-foreground">
                  {office.country} · {office.role}
                </span>
                {office.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                {office.phone ? (
                  <a href={telHref(office.phone)} className="block transition-colors hover:text-foreground">
                    {office.phone}
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-page label flex flex-col justify-between gap-4 border-t border-border py-6 text-subtle md:flex-row md:items-center">
        <p className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span>
            © {year} {site.legalName}. All rights reserved.
          </span>
          {legalLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </p>
        <Link href="#top" className="group inline-flex items-center gap-2 transition-colors hover:text-foreground">
          Back to top
          <Arrow className="-rotate-90 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </footer>
  );
}
