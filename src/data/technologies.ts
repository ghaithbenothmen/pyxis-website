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
  { id: "ai", label: "AI", caption: "Machine intelligence" },
  { id: "intelligence", label: "Intelligence", caption: "Actionable output" },
];

export type Technology = {
  name: string;
  /** Colour logo adapted for dark backgrounds (dark parts lightened), revealed on hover. */
  color: string;
  /** White monochrome version (keeps knocked-out details), shown at rest. */
  mono: string;
  /** Width / height of the trimmed logo. */
  aspect: number;
};

const logo = (name: string, file: string, aspect: number): Technology => ({
  name,
  color: `/images/technology/logos/on-dark/${file}.png`,
  mono: `/images/technology/logos/mono/${file}.png`,
  aspect,
});

/** Technologies listed on the existing Pyxis IT website (logos supplied by Pyxis). */
export const engineeringStack: Technology[] = [
  logo("Juniper Networks", "juniper", 3.65),
  logo("Red Hat", "redhat", 3.115),
  logo("OpenStack", "openstack", 5.615),
  logo("FreeRADIUS", "freeradius", 1.72),
  logo("Java", "java", 0.54),
  logo("Python", "python", 3.48),
  logo("C++", "cpp", 0.89),
  logo("DevOps", "devops", 2.145),
];
