"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import { contact, navigation } from "@/lib/constants";
import { useLenis } from "@/hooks/useLenis";
import { cn, pad } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

const primaryLinks = navigation.filter((item) => item.href !== "#contact");

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Active section, remembered per page so it resets on navigation
  const [section, setSection] = useState<{ path: string; href: string } | null>(null);
  const lenis = useLenis();
  const pathname = usePathname();
  const active = section?.path === pathname ? section.href : null;

  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  // Compact, darkened bar once the hero starts moving away
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view (re-bound on every page)
  useEffect(() => {
    const targets = navigation
      .map((item) => item.href.replace(/^\//, ""))
      .filter((hash) => hash.startsWith("#"))
      .map((hash) => document.querySelector<HTMLElement>(hash))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setSection({ path: pathname, href: `/#${entry.target.id}` });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [pathname]);

  // Fullscreen menu timeline, built once
  useGSAP(
    () => {
      const menu = menuRef.current;
      if (!menu) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      timeline.current = gsap
        .timeline({ paused: true, defaults: { ease: "expo.out" } })
        .set(menu, { visibility: "visible" })
        .fromTo(
          menu,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: reduced ? 0 : 0.9, ease: "expo.inOut" },
        )
        .fromTo(
          menu.querySelectorAll("[data-menu-item]"),
          { yPercent: reduced ? 0 : 110 },
          { yPercent: 0, duration: reduced ? 0 : 1, stagger: 0.06 },
          reduced ? 0 : 0.35,
        )
        .fromTo(
          menu.querySelectorAll("[data-menu-meta]"),
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          reduced ? 0 : 0.6,
        );
    },
    { scope: menuRef },
  );

  // Play/reverse, lock scroll, manage focus
  useEffect(() => {
    const tl = timeline.current;
    if (!tl) return;
    if (open) {
      tl.timeScale(1).play();
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      // Focus once the timeline has made the menu visible (next GSAP tick)
      const focusTimer = window.setTimeout(() => {
        menuRef.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
      }, 60);
      return () => window.clearTimeout(focusTimer);
    } else {
      tl.timeScale(1.6).reverse();
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !menuRef.current) return;
      // Keep focus inside the dialog, including the toggle button
      const focusables = [
        toggleRef.current,
        ...Array.from(menuRef.current.querySelectorAll<HTMLElement>("a")),
      ].filter((el): el is HTMLElement => Boolean(el));
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-700 ease-out-expo",
          scrolled && !open
            ? "border-b border-border bg-background/70 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <div
          className={cn(
            "container-page relative z-10 flex items-center justify-between transition-[height] duration-700 ease-out-expo",
            scrolled ? "h-16" : "h-20 md:h-24",
          )}
        >
          <Link href="/#top" aria-label="Pyxis IT — home" onClick={() => setOpen(false)}>
            <Logo eager />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex lg:gap-10">
            <ul className="flex items-center gap-6 lg:gap-9">
              {primaryLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active === item.href ? "true" : undefined}
                    className="group relative py-2 text-sm text-muted transition-colors duration-300 hover:text-foreground aria-[current]:text-foreground"
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-px origin-right scale-x-0 bg-primary transition-transform duration-500 ease-out-expo group-hover:origin-left group-hover:scale-x-100 group-aria-[current]:scale-x-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <Button href="#contact" size="sm" className="min-w-36">
              Contact us
            </Button>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="label flex h-10 items-center gap-3 text-foreground md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span aria-hidden="true" className="relative block h-2.5 w-6">
              <span
                className={cn(
                  "absolute left-0 h-px w-full bg-current transition-transform duration-500 ease-out-expo",
                  open ? "top-1/2 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-px w-full bg-current transition-transform duration-500 ease-out-expo",
                  open ? "top-1/2 -rotate-45" : "bottom-0",
                )}
              />
            </span>
          </button>
        </div>
      </header>

      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        inert={!open}
        className="invisible fixed inset-0 z-40 flex flex-col justify-between bg-background px-[var(--gutter)] pt-28 pb-10 md:hidden"
      >
        <nav aria-label="Mobile">
          <ol className="space-y-1">
            {navigation.map((item, i) => (
              <li key={item.href} className="overflow-hidden">
                <Link
                  href={item.href}
                  data-menu-item
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-1 font-display text-[clamp(2.5rem,12vw,4rem)] leading-[1.05] tracking-[-0.04em]"
                >
                  <span className="label text-accent">{pad(i + 1)}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <div data-menu-meta className="label space-y-2 border-t border-border pt-6 text-muted">
          <a href={`mailto:${contact.email}`} className="block text-foreground normal-case tracking-normal text-base">
            {contact.email}
          </a>
          <p>Where telecom data becomes intelligence.</p>
        </div>
      </div>
    </>
  );
}
