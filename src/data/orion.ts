/** Data sources shown converging into ORION. */
export const orionSources: string[] = ["CDR", "DPI", "xDR", "NetFlow"];

/** What ORION delivers. */
export const orionOutputs: string[] = [
  "Analytics",
  "Customer Experience",
  "Investigation",
];

/** Processing steps cycled inside the core. */
export const orionProcesses: string[] = ["Aggregate", "Cleanse", "Correlate"];

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
