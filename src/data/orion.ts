export type OrionSource = {
  label: string;
  /** Technical name, shown small under the label. */
  tech: string;
};

/** Data sources shown converging into ORION. */
export const orionSources: OrionSource[] = [
  { label: "Calls & sessions", tech: "CDR" },
  { label: "Network traffic", tech: "DPI" },
  { label: "Usage records", tech: "xDR" },
  { label: "Internet flows", tech: "NetFlow" },
];

/** What ORION delivers. */
export const orionOutputs: string[] = [
  "Revenue & network",
  "Customer experience",
  "Compliance",
];

/** Processing steps cycled inside the core. */
export const orionProcesses: string[] = ["Collect", "Clean", "Connect"];

export type OrionStage = {
  title: string;
  caption: string;
};

/** Narration for each stage of the pinned ORION sequence. */
export const orionStages: OrionStage[] = [
  { title: "Connect your data", caption: "Plug in the data your network already produces." },
  { title: "Unify it", caption: "Every source brought together in one place." },
  { title: "Stream it continuously", caption: "Up-to-date information, not monthly reports." },
  { title: "One platform for all teams", caption: "Network, marketing and compliance share one view." },
  { title: "Clean & link it automatically", caption: "Reliable, correlated data without manual work." },
  { title: "Dashboards, alerts, workflows", caption: "Your teams see what matters, when it matters." },
  { title: "Decide & act", caption: "ORION Intelligence turns insight into action." },
];
