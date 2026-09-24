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
    description: "Characterise sessions by the shape of their packet volumes.",
  },
  {
    title: "Microsecond Timestamp Correlation",
    description: "Align events across sources with microsecond precision.",
  },
  {
    title: "BTS / Cell-ID Geo-Perimeter",
    description: "Place activity within the coverage of specific cells.",
  },
  {
    title: "Multi-Event Triangulation",
    description: "Combine several events to narrow down where and when.",
  },
  {
    title: "Lawful Intercept",
    description: "Support interception within the applicable legal framework.",
  },
  {
    title: "CGNAT Mapping",
    description: "Resolve shared public addresses back to the subscriber.",
  },
  {
    title: "Evidence Pack",
    description: "Assemble correlated findings into a structured evidence pack.",
  },
  {
    title: "LMS Compliance",
    description: "Meet lawful-monitoring compliance requirements.",
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
