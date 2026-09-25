export type AiUseCase = {
  id: string;
  title: string;
  description: string;
  domain: "Network" | "Customer" | "Business";
};

export const aiUseCases: AiUseCase[] = [
  {
    id: "fraud",
    title: "Fraud Detection",
    description: "Stop fraud before it costs you revenue.",
    domain: "Network",
  },
  {
    id: "anomaly",
    title: "Network Issue Alerts",
    description: "Spot network issues before your customers notice.",
    domain: "Network",
  },
  {
    id: "churn",
    title: "Churn Prediction",
    description: "Know which customers may leave — and act in time.",
    domain: "Customer",
  },
  {
    id: "insights",
    title: "Clear Business Insights",
    description: "Clear answers for your managers, not raw data.",
    domain: "Business",
  },
  {
    id: "nbo",
    title: "Next Best Offer",
    description: "The right offer, for the right customer, at the right moment.",
    domain: "Customer",
  },
  {
    id: "customer-view",
    title: "Complete Customer View",
    description: "Everything you know about a customer, in one view.",
    domain: "Customer",
  },
  {
    id: "api",
    title: "New Revenue from Data",
    description: "Turn your network data into new revenue through APIs.",
    domain: "Business",
  },
];
