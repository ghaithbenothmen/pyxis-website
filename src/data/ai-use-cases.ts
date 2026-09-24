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
    description: "Identify fraudulent patterns hidden in network and subscriber activity.",
    domain: "Network",
  },
  {
    id: "anomaly",
    title: "Anomaly Detection",
    description: "Flag deviations from normal network behaviour as they emerge.",
    domain: "Network",
  },
  {
    id: "churn",
    title: "Customer Churn",
    description: "Recognise the signals that precede a customer leaving.",
    domain: "Customer",
  },
  {
    id: "insights",
    title: "Actionable Insights",
    description: "Convert correlated telecom data into decisions teams can act on.",
    domain: "Business",
  },
  {
    id: "nbo",
    title: "Next Best Offer",
    description: "Match each customer with the most relevant offer at the right moment.",
    domain: "Customer",
  },
  {
    id: "customer-view",
    title: "Hyper-Personalized Customer View",
    description: "Unify every data point into a single, detailed view of each customer.",
    domain: "Customer",
  },
  {
    id: "api",
    title: "API Monetization",
    description: "Expose network intelligence through APIs as a new source of value.",
    domain: "Business",
  },
];
