export type InvestigationStep = {
  id: string;
  label: string;
};

/** The investigative workflow, from a single event to intelligence. */
export const investigationSteps: InvestigationStep[] = [
  { id: "event", label: "Network event" },
  { id: "timestamp", label: "Timestamp" },
  { id: "fingerprint", label: "Packet fingerprint" },
  { id: "cell", label: "Cell / BTS context" },
  { id: "perimeter", label: "Geo-perimeter" },
  { id: "correlation", label: "Multi-event correlation" },
  { id: "intelligence", label: "Investigative intelligence" },
];

export type Capability = {
  title: string;
  description: string;
};

export const investigationCapabilities: Capability[] = [
  {
    title: "Packet Volume Fingerprinting",
    description: "Recognise activity by its traffic signature.",
  },
  {
    title: "Microsecond Timestamp Correlation",
    description: "Line up events from every source to the exact moment.",
  },
  {
    title: "BTS / Cell-ID Geo-Perimeter",
    description: "Know which area an activity came from.",
  },
  {
    title: "Multi-Event Triangulation",
    description: "Combine several events to pinpoint where and when.",
  },
  {
    title: "Lawful Intercept",
    description: "Respond to legal interception requests, within the law.",
  },
  {
    title: "CGNAT Mapping",
    description: "Find the real subscriber behind a shared IP address.",
  },
  {
    title: "Evidence Pack",
    description: "Deliver ready-to-use evidence files to the authorities.",
  },
  {
    title: "LMS Compliance",
    description: "Stay compliant with lawful-monitoring regulations.",
  },
];

export type TraceEvent = {
  id: string;
  x: number;
  y: number;
  /** Illustrative values for the visualisation only. */
  time: string;
  cell: string;
  labelSide: "left" | "right";
};

export const traceEvents: TraceEvent[] = [
  { id: "E01", x: 310, y: 300, time: "14:02:11.482913", cell: "CELL 4127", labelSide: "left" },
  { id: "E02", x: 700, y: 210, time: "14:02:11.483127", cell: "CELL 4131", labelSide: "right" },
  { id: "E03", x: 560, y: 500, time: "14:02:11.483406", cell: "CELL 4129", labelSide: "right" },
];
