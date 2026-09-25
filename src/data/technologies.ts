export type DataSource = {
  /** What the data is, in plain words. */
  label: string;
  /** The technical name, shown small for technical readers. */
  tech: string;
};

/** Telecom and IT data sources ORION connects to. */
export const dataSources: DataSource[] = [
  { label: "Network traffic", tech: "DPI / IPFIX" },
  { label: "Calls & sessions", tech: "CDR / xDR" },
  { label: "Real-time data streams", tech: "Kafka" },
  { label: "Radio network performance", tech: "Radio counters" },
  { label: "IP address & policy logs", tech: "CGNAT / PCRF" },
  { label: "Subscriber logins", tech: "RADIUS" },
  { label: "Billing & charging", tech: "BSS / Charging" },
  { label: "Internet usage", tech: "NetFlow / DNS" },
  { label: "Customer services", tech: "VAS / IVR / KYC" },
  { label: "CRM & operations", tech: "OSS / CRM" },
  { label: "Devices & Wi-Fi", tech: "IoT / Wi-Fi" },
];

export type PipelineStage = {
  id: string;
  label: string;
  caption: string;
};

export const pipeline: PipelineStage[] = [
  { id: "aggregation", label: "Collect", caption: "Every source, one place" },
  { id: "cleansing", label: "Clean", caption: "Reliable, consistent data" },
  { id: "correlation", label: "Connect", caption: "Events linked together" },
  { id: "orion", label: "ORION", caption: "One intelligence layer" },
  { id: "ai", label: "AI", caption: "Learns and predicts" },
  { id: "intelligence", label: "Insight", caption: "Ready for your teams" },
];
