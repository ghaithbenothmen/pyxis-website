import { assets, type ImageAsset } from "@/lib/assets";

export type Solution = {
  id: string;
  code: string;
  title: string;
  /** Business outcome, shown as the headline. */
  headline: string;
  description: string;
  capabilities: string[];
  sources: string[];
  image: ImageAsset;
};

/** Business outcomes, each mapped to documented capabilities and data sources. */
export const solutions: Solution[] = [
  {
    id: "advanced-analytics",
    code: "UC/01",
    title: "Advanced Analytics",
    headline: "Protect revenue, run a smarter network",
    description:
      "Stop fraud, catch network issues early and give your managers clear answers — from the data your network already produces.",
    capabilities: [
      "Fraud Detection",
      "Anomaly Detection",
      "Actionable Insights",
      "API Monetization",
    ],
    sources: ["DPI / IPFIX", "CDR / xDR", "Radio Counters", "NetFlow / DNS"],
    image: assets.solutions.analytics,
  },
  {
    id: "customer-experience",
    code: "UC/02",
    title: "Customer Experience Management",
    headline: "Keep your customers, grow their value",
    description:
      "Understand every customer, see who may leave before they do, and offer the right service at the right moment.",
    capabilities: [
      "Customer Churn",
      "Next Best Offer",
      "Hyper-Personalized Customer View",
    ],
    sources: ["BSS / Charging", "OSS / CRM", "VAS / IVR / KYC", "IoT / Wi-Fi"],
    image: assets.solutions.experience,
  },
  {
    id: "compliance-investigation",
    code: "UC/03",
    title: "Regulatory Compliance & Deep Investigation",
    headline: "Meet regulatory obligations with confidence",
    description:
      "Answer authorities' requests quickly and reliably, with evidence that links every event to the right subscriber, place and time.",
    capabilities: [
      "Lawful Intercept",
      "CGNAT Mapping",
      "Evidence Pack",
      "LMS Compliance",
    ],
    sources: ["CGNAT / PCRF", "CDR / xDR", "DPI / IPFIX", "Kafka Streams"],
    image: assets.solutions.compliance,
  },
];

export const hrefForUseCase = (solution: Solution) => `/use-cases/${solution.id}`;

export const getSolution = (id: string) => solutions.find((solution) => solution.id === id);

/** The following use case, looping back to the first. */
export const nextSolution = (solution: Solution) =>
  solutions[(solutions.indexOf(solution) + 1) % solutions.length];
