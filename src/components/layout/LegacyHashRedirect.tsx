"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Home-page anchors that moved to their own pages. Hashes never reach the
 * server, so old links (/#company, /#intelligence…) are forwarded here.
 */
const moved: Record<string, string> = {
  "#about": "/company",
  "#company": "/company",
  "#intelligence": "/platform#intelligence",
  "#technology": "/platform#technology",
  "#use-cases": "/solutions",
};

export function LegacyHashRedirect() {
  const router = useRouter();
  useEffect(() => {
    const target = moved[window.location.hash];
    if (target) router.replace(target);
  }, [router]);
  return null;
}
