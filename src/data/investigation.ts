export type InvestigationStep = {
  id: string;
  label: string;
};

/** The investigative workflow, from a single event to intelligence. */
export const investigationSteps: InvestigationStep[] = [
  { id: "event", label: "Network event" },
  { id: "timestamp", label: "Exact time" },
  { id: "fingerprint", label: "Type of activity" },
  { id: "cell", label: "Network location" },
  { id: "perimeter", label: "Area covered" },
  { id: "correlation", label: "Linked events" },
  { id: "intelligence", label: "Evidence ready" },
];

export type Capability = {
  title: string;
  description: string;
  /** Technical name, shown small for specialists. */
  tech: string;
};

export const investigationCapabilities: Capability[] = [
  {
    title: "Recognise the type of activity",
    description: "Tell what a session is from the shape of its traffic.",
    tech: "Packet volume fingerprinting",
  },
  {
    title: "Rebuild the exact timeline",
    description: "Line up events from every source to the exact moment.",
    tech: "Precise timestamp correlation",
  },
  {
    title: "Know where it happened",
    description: "Place each activity in the network area it came from.",
    tech: "Cell-ID geo-perimeter",
  },
  {
    title: "Pinpoint where and when",
    description: "Combine several events to narrow down place and time.",
    tech: "Multi-event triangulation",
  },
  {
    title: "Lawful interception",
    description: "Respond to legal interception requests, within the law.",
    tech: "Lawful Intercept (LI)",
  },
  {
    title: "Find the subscriber behind an IP",
    description: "Identify the real subscriber behind a shared internet address.",
    tech: "CGNAT mapping",
  },
  {
    title: "Ready-to-use evidence",
    description: "Deliver structured, auditable evidence files to the authorities.",
    tech: "Evidence pack",
  },
  {
    title: "Log retention & traceability",
    description: "Keep and search network logs as regulations require.",
    tech: "Log Management System (LMS)",
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
