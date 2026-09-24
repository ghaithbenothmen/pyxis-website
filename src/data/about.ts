/**
 * About Pyxis. Positioning and ORION statements come from the approved company
 * description; values and offices from the existing Pyxis IT website. Nothing
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

export type Value = {
  statement: string;
  theme: string;
};

export const values: Value[] = [
  { statement: "Skills are common. Talent is rare.", theme: "Talent" },
  { statement: "Commitment is an act, not a word.", theme: "Commitment" },
  { statement: "Quality is not an act, it is a habit.", theme: "Quality" },
];

export type Presence = {
  city: string;
  country: string;
};

export const presence: Presence[] = [
  { city: "Tunis", country: "Tunisia" },
  { city: "Kington", country: "United Kingdom" },
];
