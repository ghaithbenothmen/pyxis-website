/**
 * Services and positioning, condensed from the existing Pyxis IT pages
 * (About us, Service Integration, Outsourcing, Digital Innovation).
 */

export const expertiseStatement =
  "End-to-end IT & telecom services, from audit to operations.";

export const expertiseParagraph =
  "Pyxis IT delivers tailored technology solutions and addresses all aspects of IT and service infrastructures — audit, evaluation, design, planning, procurement, integration and support — to provide practical solutions to our clients' business needs.";

export type Service = {
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    title: "Audit & IT Strategy",
    description:
      "Network audit and assessments, evaluation, design and planning of IT and service infrastructures.",
  },
  {
    title: "Network Design & Integration",
    description:
      "Design, develop and integrate the systems and applications that run your business — to consult, implement and manage.",
  },
  {
    title: "Outsourcing",
    description:
      "We take responsibility for operations delivery, drawing on IT governance best practices, while you keep control of IT strategy.",
  },
  {
    title: "Digital Innovation",
    description:
      "Mobility and analytics services, with complete cover of the IT building blocks: workstations, middleware, networks and datacenters.",
  },
];
