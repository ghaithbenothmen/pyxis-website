/**
 * About Pyxis. Positioning and ORION statements come from the approved company
 * description; offices from the existing Pyxis IT website. Nothing
 * here is invented (no founding year, headcount or awards).
 */

export const aboutLead =
  "Pyxis IT is a telecom technology company specializing in Telecom Data Intelligence.";

export const aboutStatement =
  "Every operator sits on a huge amount of network data. With ORION, our platform, you put it to work: stop fraud, keep your customers, run a better network and answer regulators with confidence.";

export type Principle = {
  title: string;
  detail: string;
  /** Short tag shown next to the ORION title. */
  tag: string;
};

/** How ORION is built (company description), phrased as client benefits. */
export const principles: Principle[] = [
  { title: "Works with your existing network", detail: "Vendor-agnostic — no need to replace your equipment.", tag: "Vendor-agnostic" },
  { title: "Grows with you", detail: "Scalable, from one use case to many.", tag: "Scalable" },
  { title: "Deploy without replacing anything", detail: "On-premise or in your sovereign cloud.", tag: "On-premise & sovereign" },
  { title: "Proven in the field", detail: "Built for real-world telecom operations.", tag: "Field-proven" },
];

export type Presence = {
  city: string;
  country: string;
};

export const presence: Presence[] = [
  { city: "Kington", country: "United Kingdom" },
  { city: "Tunis", country: "Tunisia" },
];
