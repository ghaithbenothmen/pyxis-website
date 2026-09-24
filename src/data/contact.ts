import { solutions } from "./solutions";

/** Enquiry topics offered in the contact form. */
export const contactTopics: string[] = [
  ...solutions.map((solution) => solution.title),
  "ORION platform",
  "Other",
];
