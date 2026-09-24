import { aiUseCases } from "./ai-use-cases";
import { investigationCapabilities } from "./investigation";

export type CapabilityDetail = {
  title: string;
  description?: string;
};

/** Descriptions already written for ORION Intelligence and Deep investigation. */
const descriptions = new Map<string, string>([
  ...aiUseCases.map((item) => [item.title, item.description] as const),
  ...investigationCapabilities.map((item) => [item.title, item.description] as const),
]);

export const describeCapabilities = (titles: string[]): CapabilityDetail[] =>
  titles.map((title) => ({ title, description: descriptions.get(title) }));
