/**
 * Governments & Regulators page (spec S09). Copy is the approved text; the
 * "Standards-aligned" card is left out until Pyxis confirms which standards
 * ORION supports (open point O2, fallback S09-R6).
 */

export const attributionTitle = ["From an IP address", "to the right subscriber."];

export const attributionIntro =
  "CGNAT, NAT and IPv6 have made subscriber attribution one of the hardest problems in modern investigations. ORION correlates CGNAT, RADIUS, DPI and CDR records so that authorities and operators can move from an IP address and a timestamp to the right subscriber session — then reconstruct the full activity timeline.";

export type TraceStep = {
  id: string;
  /** What the step does, in plain words. */
  title: string;
  /** The records involved, for specialists. */
  tech: string;
  /** Illustrative readout shown in the step (not real data). */
  sample: string[];
};

/** Public IP + timestamp → CGNAT / RADIUS correlation → MSISDN → subscriber timeline. */
export const traceSteps: TraceStep[] = [
  {
    id: "request",
    title: "Public IP + timestamp",
    tech: "Request from the authority",
    sample: ["203.0.113.24 : 50412", "14:02:11 UTC"],
  },
  {
    id: "correlation",
    title: "CGNAT & RADIUS correlation",
    tech: "Shared address resolved to one session",
    sample: ["NAT session matched", "Login record linked"],
  },
  {
    id: "subscriber",
    title: "Subscriber identified",
    tech: "MSISDN",
    sample: ["+••• ••• ••• 417", "Lawful access only"],
  },
  {
    id: "timeline",
    title: "Activity timeline",
    tech: "Sessions · locations · evidence",
    sample: ["Sessions rebuilt", "Evidence pack ready"],
  },
];

export type AuthorityPrinciple = {
  title: string;
  detail: string;
  tag: string;
};

export const authorityPrinciples: AuthorityPrinciple[] = [
  {
    title: "Lawful by design",
    detail: "Mandate-based access, role separation and a complete audit trail on every query.",
    tag: "Auditable",
  },
  {
    title: "Evidence you can defend",
    detail: "Timestamped, integrity-protected and exportable evidence packs.",
    tag: "Evidence packs",
  },
  {
    title: "Sovereign deployment",
    detail: "Runs entirely on-premise, within national infrastructure. Data never leaves the country.",
    tag: "On-premise",
  },
];
