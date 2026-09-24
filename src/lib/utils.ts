type ClassValue = string | false | null | undefined;

/** Joins class names, skipping falsy values. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Zero-pads an index for editorial numbering: 0 → "01". */
export function pad(index: number, length = 2): string {
  return String(index).padStart(length, "0");
}
