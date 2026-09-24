import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { NetworkField } from "@/components/animation/NetworkField";

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60">
        <NetworkField density={0.6} />
      </div>
      <div className="container-page flex flex-1 flex-col justify-between py-10">
        <Link href="/" aria-label="Pyxis IT — home">
          <Logo eager />
        </Link>

        <div className="py-20">
          <p className="label text-accent">Error 404 · Signal lost</p>
          <h1 className="text-section mt-8 max-w-4xl">This page is not on the network.</h1>
          <p className="mt-6 max-w-md text-lead text-muted">
            The link may be outdated, or the page may have moved.
          </p>
          <Link
            href="/"
            className="mt-12 inline-flex h-14 items-center bg-foreground px-6 text-sm font-medium text-background transition-colors duration-500 hover:bg-accent"
          >
            Back to home
          </Link>
        </div>

        <p className="label text-subtle">Pyxis IT — Telecom Data Intelligence</p>
      </div>
    </main>
  );
}
