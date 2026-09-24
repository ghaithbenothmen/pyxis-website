export const site = {
  name: "Pyxis IT",
  title: "Pyxis IT — Telecom Data Intelligence",
  tagline: "Where telecom data becomes intelligence.",
  description:
    "Pyxis IT is a telecom technology company specializing in Telecom Data Intelligence. Its flagship platform, ORION, transforms complex network data into actionable intelligence for telecom operators — network analytics, customer experience, fraud detection, regulatory compliance, AI and revenue intelligence.",
  url: "https://www.pyxis.com.tn",
} as const;

export type NavItem = {
  label: string;
  href: `#${string}`;
};

export const navigation: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Solutions", href: "#solutions" },
  { label: "ORION", href: "#orion" },
  { label: "Intelligence", href: "#intelligence" },
  { label: "Investigation", href: "#investigation" },
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
      { label: "About Pyxis", href: "#about" },
      { label: "Key figures", href: "#proof" },
      { label: "References", href: "#references" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Advanced Analytics", href: "#solution-advanced-analytics" },
      { label: "Customer Experience", href: "#solution-customer-experience" },
      { label: "Compliance & Investigation", href: "#solution-compliance-investigation" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "ORION", href: "#orion" },
      { label: "Machine intelligence", href: "#intelligence" },
      { label: "Deep investigation", href: "#investigation" },
      { label: "Data ecosystem", href: "#technology" },
    ],
  },
];

/** Every chapter of the page, in scroll order, for the scroll rail. */
export const chapters = [
  { id: "top", label: "Intro" },
  { id: "about", label: "About" },
  { id: "proof", label: "Key figures" },
  { id: "solutions", label: "Solutions" },
  { id: "orion", label: "ORION" },
  { id: "intelligence", label: "Intelligence" },
  { id: "investigation", label: "Investigation" },
  { id: "technology", label: "Ecosystem" },
  { id: "references", label: "References" },
  { id: "contact", label: "Contact" },
] as const;

export type Office = {
  country: string;
  lines: string[];
  phone: string;
};

/** Contact details as published on the existing Pyxis IT website. */
export const contact = {
  email: "contact@pyxis.com.tn",
  offices: [
    {
      country: "Tunisia",
      lines: ["Immeuble Etoile du Nord", "Centre Urbain Nord, Tunis"],
      phone: "+216 31 108 033",
    },
    {
      country: "United Kingdom",
      lines: ["Bridge Street, Kington", "Herefordshire HR5 3DJ"],
      phone: "+44 744 144 3050",
    },
  ] satisfies Office[],
} as const;

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
