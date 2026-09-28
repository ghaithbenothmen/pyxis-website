import { assets, type ImageAsset } from "@/lib/assets";

/**
 * Solutions (spec S08): six solutions for two audiences. Titles, hooks and
 * scenarios follow the approved copy, with acronyms moved to `tech` so the
 * interface stays readable for non-specialists.
 */

export type Solution = {
  id: string;
  /** Running number across both audiences (01–06). */
  code: string;
  title: string;
  /** One-sentence hook: what the solution does for the client. */
  hook: string;
  /** Illustrative scenarios (see `modulesDisclaimer`). */
  scenarios: string[];
  /** Data behind it, for technical readers. */
  tech: string;
  image: ImageAsset;
};

export type AudienceId = "service-providers" | "governments-regulators";

export type Audience = {
  id: AudienceId;
  label: string;
  /** Who this audience is, in one line. */
  who: string;
  /** Page headline. */
  headline: string;
  description: string;
  /** Search title and description (spec §5.2). */
  seo: { title: string; description: string };
  cta: { label: string; group: string };
  /** Data sources ORION connects to for this audience. */
  sources: string[];
  image: ImageAsset;
  solutions: Solution[];
};

/** Mandatory above the solutions (S08-R3): scenarios are illustrative. */
export const modulesDisclaimer =
  "Each solution is delivered through dedicated ORION modules. The scenarios below illustrate what they enable.";

export const audiences: Audience[] = [
  {
    id: "service-providers",
    label: "For Service Providers",
    who: "Telecom operators and service providers",
    headline: "Protect revenue, keep customers, run a smarter network.",
    description:
      "Three ORION solutions for telecom operators, built on the data your network already produces.",
    seo: {
      title: "Telecom Analytics for Service Providers | Pyxis ORION",
      description: "Network, subscriber, fraud, revenue and customer intelligence built on correlated telecom data.",
    },
    cta: { label: "Request a demo", group: "Explore Service Provider solutions" },
    sources: ["DPI / IPFIX", "CDR / xDR", "RADIUS", "NetFlow / DNS", "BSS / Charging", "OSS / CRM", "VAS / IVR / KYC", "IoT / Wi-Fi"],
    image: assets.solutions.analytics,
    solutions: [
      {
        id: "network-subscriber-intelligence",
        code: "01",
        title: "Network & Subscriber Intelligence",
        hook: "See every subscriber’s real experience by bringing network, usage and login data into one timeline.",
        scenarios: ["Subscriber-level experience analysis", "Traffic & application analytics", "Wi-Fi offload intelligence"],
        tech: "DPI · xDR · RADIUS",
        image: assets.solutions.analytics,
      },
      {
        id: "fraud-revenue-intelligence",
        code: "02",
        title: "Fraud & Revenue Intelligence",
        hook: "Detect revenue leakage hidden in network behaviour before it reaches the P&L.",
        scenarios: ["Tethering detection & monetisation", "Zero-rated abuse", "Anomaly detection"],
        tech: "DPI · CDR/xDR · BSS/Charging",
        image: assets.solutions.fraud,
      },
      {
        id: "customer-experience-management",
        code: "03",
        title: "Customer Experience Management",
        hook: "Build a personalised view of every customer to anticipate churn and trigger the next best offer.",
        scenarios: ["Churn prediction", "Next best offer", "Subscriber 360° view"],
        tech: "BSS/Charging · OSS/CRM · VAS/IVR/KYC",
        image: assets.solutions.experience,
      },
    ],
  },
  {
    id: "governments-regulators",
    label: "For Governments & Regulators",
    who: "Regulators, authorities and government agencies",
    headline: "From a public IP address to a subscriber — with evidence that stands up.",
    description:
      "ORION links IP addresses, sessions and network records so authorities and operators can move from an IP address and a time to the right subscriber, then rebuild the full activity timeline.",
    seo: {
      title: "Log Management & Deep Investigation for Regulators | Pyxis",
      description:
        "Correlate IP, MSISDN and geolocation for lawful, auditable user traceability and investigations. Sovereign, on-premise deployment.",
    },
    cta: { label: "Request a confidential briefing", group: "Explore Governments & Regulators solutions" },
    sources: ["CGNAT / PCRF", "RADIUS", "DPI / IPFIX", "CDR / xDR", "Kafka streams"],
    image: assets.solutions.compliance,
    solutions: [
      {
        id: "log-management-system",
        code: "04",
        title: "Log Management System (LMS)",
        hook: "Link IP addresses, mobile numbers and location to ensure full user traceability for operators and authorities.",
        scenarios: ["IP ↔ MSISDN correlation", "CGNAT session mapping", "Geolocation traceability", "Long-term log retention"],
        tech: "CGNAT · RADIUS · CDR/xDR",
        image: assets.solutions.lms,
      },
      {
        id: "deep-investigation",
        code: "05",
        title: "Deep Investigation",
        hook: "Rebuild subscriber activity from linked network events, with precise timestamp correlation, and deliver evidence packs for lawful investigations.",
        scenarios: ["IP + timestamp → subscriber resolution", "Session timelines", "Evidence packs"],
        tech: "CGNAT · DPI · CDR/xDR",
        image: assets.solutions.compliance,
      },
      {
        id: "lawful-interception-compliance",
        code: "06",
        title: "Lawful Interception & Compliance",
        hook: "Support lawful interception and regulatory obligations with auditable, standards-aligned processes.",
        scenarios: ["Lawful interception", "Regulatory reporting", "Audit trail"],
        tech: "Mandate-based · Auditable",
        image: assets.solutions.lawful,
      },
    ],
  },
];

export const audienceHref = (audience: Audience) => `/solutions/${audience.id}`;

export const solutionHref = (audience: Audience, solution: Solution) =>
  `${audienceHref(audience)}#${solution.id}`;

export const getAudience = (id: string) => audiences.find((audience) => audience.id === id);

/** The other audience, for the "next" link at the bottom of a page. */
export const otherAudience = (audience: Audience) =>
  audiences.find((candidate) => candidate.id !== audience.id) ?? audience;
