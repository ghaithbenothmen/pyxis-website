export const site = {
  name: "Pyxis IT",
  title: "Pyxis IT — Telecom Data Intelligence",
  tagline: "Where telecom data becomes intelligence.",
  description:
    "Pyxis IT is a telecom technology company specializing in Telecom Data Intelligence. Its flagship platform, ORION, transforms complex network data into actionable intelligence for telecom operators — network analytics, customer experience, fraud detection, regulatory compliance, AI and revenue intelligence.",
  url: "https://www.pyxisit.net",
} as const;

export type NavItem = {
  label: string;
  /** `/#section` for home-page sections, `#contact` for the form on every page, or a route. */
  href: string;
};

export const navigation: NavItem[] = [
  { label: "Company", href: "/#about" },
  { label: "ORION", href: "/#orion" },
  { label: "Use cases", href: "/#use-cases" },
  { label: "Contact", href: "#contact" },
];

export type FooterColumn = {
  title: string;
  links: NavItem[];
};

export const footerColumns: FooterColumn[] = [
  {
    title: "Company",
    links: [
      { label: "About Pyxis", href: "/#about" },
      { label: "Where we work", href: "/#presence" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Use cases",
    links: [
      { label: "Advanced Analytics", href: "/use-cases/advanced-analytics" },
      { label: "Customer Experience", href: "/use-cases/customer-experience" },
      { label: "Compliance & Investigation", href: "/use-cases/compliance-investigation" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "ORION", href: "/#orion" },
      { label: "ORION Intelligence", href: "/#intelligence" },
      { label: "Data ecosystem", href: "/#technology" },
      { label: "Deep investigation", href: "/use-cases/compliance-investigation#investigation" },
    ],
  },
];

/** Every chapter of the page, in scroll order, for the scroll rail. */
export const chapters = [
  { id: "top", label: "Intro" },
  { id: "about", label: "Company" },
  { id: "presence", label: "Presence" },
  { id: "orion", label: "ORION" },
  { id: "technology", label: "Ecosystem" },
  { id: "use-cases", label: "Use cases" },
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
