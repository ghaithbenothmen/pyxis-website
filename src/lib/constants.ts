export const site = {
  name: "Pyxis",
  /** Registered company name, used only in the copyright line (spec D7; exact form pending, O5). */
  legalName: "Pyxis",
  /** Home page title and description (spec §5.2). */
  title: "Pyxis | Telecom Data Intelligence — ORION Platform",
  tagline: "Where telecom data becomes intelligence.",
  description:
    "ORION unifies network, subscriber and business data into one correlated intelligence layer for telecom operators and regulators.",
  url: "https://www.pyxisit.net",
} as const;

export type NavItem = {
  label: string;
  /** A page (`/platform`), a section of a page (`/platform#intelligence`) or `#contact`. */
  href: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

/** Main navigation (spec S01), shared by the header drop-downs and the footer columns. */
export const navigation: NavGroup[] = [
  {
    label: "Platform",
    items: [
      { label: "ORION", href: "/platform" },
      { label: "ORION Intelligence", href: "/platform#intelligence" },
      { label: "Data ecosystem", href: "/platform#technology" },
    ],
  },
  {
    label: "Solutions",
    items: [
      { label: "All solutions", href: "/solutions" },
      { label: "For Service Providers", href: "/solutions/service-providers" },
      { label: "For Governments & Regulators", href: "/solutions/governments-regulators" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About", href: "/company" },
      { label: "Global presence", href: "/company#presence" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

/** Legal pages linked from the footer (spec S12-R4). */
export const legalLinks: NavItem[] = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Legal notice", href: "/legal" },
];

/** Every chapter of the page, in scroll order, for the scroll rail. */
export const chapters = [
  { id: "top", label: "Intro" },
  { id: "orion", label: "ORION" },
  { id: "solutions", label: "Solutions" },
  { id: "presence", label: "Presence" },
  { id: "contact", label: "Contact" },
] as const;

export type Office = {
  country: string;
  role: "Headquarters" | "Office";
  lines: string[];
  phone?: string;
};

/** Headquarters in the United Kingdom; an office in Tunis. */
export const contact: { email: string; offices: Office[] } = {
  email: "contact@pyxisit.net",
  offices: [
    {
      country: "United Kingdom",
      role: "Headquarters",
      lines: ["Bridge Street, Kington", "Herefordshire HR5 3DJ"],
      phone: "+44 744 144 3050",
    },
    {
      country: "Tunisia",
      role: "Office",
      lines: ["Tunis, Tunisia"],
    },
  ],
};

/** Strips spaces for tel: links. */
export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

/** Shared motion timing, in seconds. Keeps GSAP and CSS rhythm consistent. */
export const motion = {
  ease: "expo.out",
  easeInOut: "power3.inOut",
  duration: 1.1,
  stagger: 0.08,
} as const;

/** Breakpoint media queries shared by gsap.matchMedia and hooks. */
export const media = {
  desktop: "(min-width: 1024px)",
  tablet: "(min-width: 768px) and (max-width: 1023px)",
  mobile: "(max-width: 767px)",
  motion: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
} as const;
