export type Metric = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix: string;
  label: string;
  detail: string;
};

/** Documented figures from the Pyxis source material only. */
export const metrics: Metric[] = [
  {
    value: 100,
    suffix: " TB/h",
    label: "Data throughput",
    detail: "Telecom data processed per hour",
  },
  {
    value: 6.9,
    decimals: 1,
    suffix: "%",
    label: "MAPE",
    detail: "Mean absolute percentage error",
  },
  {
    value: 9,
    suffix: "+",
    label: "Deployments",
    detail: "Platform deployments",
  },
  {
    value: 8,
    suffix: "+",
    label: "Use cases",
    detail: "Machine-intelligence use cases",
  },
];
