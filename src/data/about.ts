/**
 * About Pyxis. Positioning and ORION statements come from the approved company
 * description; offices from the existing Pyxis IT website. Nothing
 * here is invented (no founding year, headcount or awards).
 */

export const aboutLead =
  "Pyxis IT is a telecom technology company specializing in Telecom Data Intelligence.";

export const aboutStatement =
  "Our flagship platform, ORION, transforms complex network data into actionable intelligence for telecom operators — from network analytics and customer experience to fraud detection, regulatory compliance, AI and revenue intelligence.";

/** How ORION is built, as stated in the company description. */
export const principles: string[] = [
  "Vendor-agnostic",
  "Scalable",
  "Fast time-to-value",
  "Built for real-world telecom environments",
];

export type Presence = {
  city: string;
  country: string;
};

export const presence: Presence[] = [
  { city: "Kington", country: "United Kingdom" },
  { city: "Tunis", country: "Tunisia" },
];
