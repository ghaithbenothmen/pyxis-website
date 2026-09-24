import { contact, footerColumns, site } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";
import { Arrow } from "@/components/ui/Arrow";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-background">
      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 md:py-20 lg:grid-cols-12 lg:gap-8">
        <div className="sm:col-span-2 lg:col-span-4">
          <a href="#top" aria-label="Pyxis IT — back to top">
            <Logo className="h-12" />
          </a>
          <p className="mt-6 max-w-xs text-sm text-muted">{site.tagline}</p>
        </div>

        {footerColumns.map((column) => (
          <nav key={column.title} aria-label={column.title} className="lg:col-span-2">
            <p className="label text-subtle">{column.title}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {column.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-muted transition-colors hover:text-foreground">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="lg:col-span-2">
          <p className="label text-subtle">Contact</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={`mailto:${contact.email}`} className="break-all text-muted transition-colors hover:text-foreground">
                {contact.email}
              </a>
            </li>
            {contact.offices.map((office) => (
              <li key={office.country} className="text-muted">
                <span className="block text-foreground">{office.country}</span>
                <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-foreground">
                  {office.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-page label flex flex-col justify-between gap-4 border-t border-border py-6 text-subtle sm:flex-row sm:items-center">
        <span>
          © {year} {site.name}. All rights reserved.
        </span>
        <a href="#top" className="group inline-flex items-center gap-2 transition-colors hover:text-foreground">
          Back to top
          <Arrow className="-rotate-90 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  );
}
