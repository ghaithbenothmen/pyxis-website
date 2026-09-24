import { assets, type ImageAsset } from "@/lib/assets";

export type Solution = {
  id: string;
  code: string;
  title: string;
  description: string;
  capabilities: string[];
  sources: string[];
  image: ImageAsset;
};

/** Business outcomes, each mapped to documented capabilities and data sources. */
export const solutions: Solution[] = [
  {
    id: "advanced-analytics",
    code: "SOL/01",
    title: "Advanced Analytics",
    description:
      "Correlate network and subscriber data at scale to detect fraud and anomalies, manage traffic and surface actionable insights.",
    capabilities: [
      "Fraud Detection",
      "Anomaly Detection",
      "Traffic Management",
      "Actionable Insights",
      "API Monetization",
    ],
    sources: ["DPI / IPFIX", "CDR / xDR", "Radio Counters", "NetFlow / DNS"],
    image: assets.solutions.analytics,
  },
  {
    id: "customer-experience",
    code: "SOL/02",
    title: "Customer Experience Management",
    description:
      "Build a hyper-personalised view of every customer to anticipate churn and deliver the next best offer.",
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
    code: "SOL/03",
    title: "Regulatory Compliance & Deep Investigation",
    description:
      "Correlate network events down to the microsecond and assemble evidence for lawful, compliant investigations.",
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
