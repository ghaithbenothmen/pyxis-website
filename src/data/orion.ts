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
  { title: "Ingest", caption: "Telecom data sources come online — CDR, DPI, xDR, NetFlow." },
  { title: "Connect", caption: "Every source is linked into a single pipeline." },
  { title: "Stream", caption: "Raw data flows toward ORION." },
  { title: "Illuminate", caption: "ORION, the central intelligence layer, activates." },
  { title: "Process", caption: "Data is aggregated, cleansed and correlated." },
  { title: "Deliver", caption: "Insights, dashboards, alerts and operational workflows." },
  { title: "Learn", caption: "ORION Intelligence turns it into decisions." },
];
