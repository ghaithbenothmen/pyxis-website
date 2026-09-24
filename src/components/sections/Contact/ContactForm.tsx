"use client";

import { useId, useState, type FormEvent } from "react";
import { contact } from "@/lib/constants";
import { Arrow } from "@/components/ui/Arrow";
import { cn } from "@/lib/utils";

const field =
  "peer w-full border-0 border-b border-border-strong bg-transparent px-0 pt-2 pb-3 text-base text-foreground outline-none transition-colors placeholder:text-subtle focus:border-primary focus-visible:outline-none";

/**
 * Enquiry form. There is no backend yet, so submitting composes an email to
 * Pyxis in the visitor's mail client.
 */
export function ContactForm() {
  const id = useId();
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();
    const subject = `Enquiry from ${get("company")}`;
    const body = [
      get("message"),
      "",
      "—",
      `${get("name")}`,
      `${get("company")}`,
      `${get("email")}`,
    ].join("\n");
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const label = "label mb-1 block text-subtle peer-focus:text-primary";

  return (
    <form onSubmit={onSubmit} className="grid gap-8 sm:grid-cols-2" aria-describedby={`${id}-note`}>
      <div className="flex flex-col-reverse">
        <input id={`${id}-name`} name="name" required autoComplete="name" className={field} placeholder="Full name" />
        <label htmlFor={`${id}-name`} className={label}>Name</label>
      </div>
      <div className="flex flex-col-reverse">
        <input id={`${id}-company`} name="company" required autoComplete="organization" className={field} placeholder="Operator or organisation" />
        <label htmlFor={`${id}-company`} className={label}>Company</label>
      </div>
      <div className="flex flex-col-reverse sm:col-span-2">
        <input id={`${id}-email`} name="email" type="email" required autoComplete="email" className={field} placeholder="name@company.com" />
        <label htmlFor={`${id}-email`} className={label}>Work email</label>
      </div>
      <div className="flex flex-col-reverse sm:col-span-2">
        <textarea
          id={`${id}-message`}
          name="message"
          required
          rows={4}
          className={cn(field, "resize-y")}
          placeholder="Your network, data sources and what you would like to achieve"
        />
        <label htmlFor={`${id}-message`} className={label}>Message</label>
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p id={`${id}-note`} className="max-w-sm text-xs text-subtle" aria-live="polite">
          {sent
            ? `Your email application should now be open with the message ready. If not, write to ${contact.email}.`
            : "Sending opens your email application with your message ready to send."}
        </p>
        <button
          type="submit"
          className="group/button inline-flex h-12 min-w-48 items-center justify-between gap-6 bg-foreground px-5 text-sm font-medium tracking-tight text-background transition-colors duration-500 ease-out-expo hover:bg-accent sm:h-14 sm:px-6"
        >
          Send message
          <span className="relative flex size-4 overflow-hidden" aria-hidden="true">
            <Arrow className="transition-transform duration-500 ease-out-expo group-hover/button:translate-x-full" />
            <Arrow className="absolute inset-0 -translate-x-full transition-transform duration-500 ease-out-expo group-hover/button:translate-x-0" />
          </span>
        </button>
      </div>
    </form>
  );
}
