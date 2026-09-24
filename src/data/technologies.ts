/** Telecom and IT data sources ingested into the Pyxis pipeline. */
export const dataSources: string[] = [
  "DPI / IPFIX",
  "CDR / xDR",
  "Kafka Streams",
  "Radio Counters",
  "CGNAT / PCRF",
  "RADIUS",
  "BSS / Charging",
  "NetFlow / DNS",
  "VAS / IVR / KYC",
  "OSS / CRM",
  "IoT / Wi-Fi",
];

export type PipelineStage = {
  id: string;
  label: string;
  caption: string;
};

export const pipeline: PipelineStage[] = [
  { id: "aggregation", label: "Aggregation", caption: "Collect streams" },
  { id: "cleansing", label: "Cleansing", caption: "Normalise, validate" },
  { id: "correlation", label: "Correlation", caption: "Link every event" },
  { id: "orion", label: "ORION", caption: "Intelligence layer" },
  { id: "ai", label: "AI", caption: "ORION Intelligence" },
  { id: "intelligence", label: "Intelligence", caption: "Actionable output" },
];
