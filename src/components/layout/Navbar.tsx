"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import { contact, navigation, type NavGroup, type NavItem } from "@/lib/constants";
import { useLenis } from "@/hooks/useLenis";
import { cn, pad } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Arrow } from "@/components/ui/Arrow";

/** Page part of a nav link (`/platform#intelligence` → `/platform`), or null for `#contact`. */
const pathOf = (href: string) => href.split("#")[0] || null;

/** Focusable elements of the mobile menu that are currently reachable. */
const focusablesIn = (root: HTMLElement) =>
  Array.from(root.querySelectorAll<HTMLElement>("a, button")).filter((el) => !el.closest("[inert]"));

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 10 6"
      aria-hidden="true"
      className={cn("size-2.5 transition-transform duration-500 ease-out-expo", open && "rotate-180")}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
    >
      <path d="M1 1 L5 5 L9 1" />
    </svg>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  /** Desktop drop-down currently shown. */
  const [dropdown, setDropdown] = useState<number | null>(null);
  /** Mobile accordion group currently expanded. */
  const [expanded, setExpanded] = useState<number | null>(null);
  const lenis = useLenis();
  const pathname = usePathname();

  // A link is current on its own page; a group is current on any of its pages
  const isActive = (item: NavItem) => item.href === pathname;
  const groupActive = (group: NavGroup) =>
    group.items.some((item) => {
      const path = pathOf(item.href);
      return path !== null && (pathname === path || pathname.startsWith(`${path}/`));
    });

  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  const closeMobile = () => {
    setOpen(false);
    setExpanded(null);
  };

  // Hover opens a drop-down; leaving closes it after a short grace period
  const openDropdown = (index: number) => {
    window.clearTimeout(closeTimer.current);
    setDropdown(index);
  };
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setDropdown(null), 160);
  };

  // Compact, darkened bar once the hero starts moving away
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Desktop drop-downs: Escape or a click elsewhere closes them
  useEffect(() => {
    if (dropdown === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      navRef.current?.querySelector<HTMLElement>(`[data-dropdown-toggle="${dropdown}"]`)?.focus();
      setDropdown(null);
    };
    const onPointer = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setDropdown(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [dropdown]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

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
        const menu = menuRef.current;
        if (menu) focusablesIn(menu)[0]?.focus({ preventScroll: true });
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
        setExpanded(null);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !menuRef.current) return;
      // Keep focus inside the dialog, including the toggle button
      const focusables = [toggleRef.current, ...focusablesIn(menuRef.current)].filter(
        (el): el is HTMLElement => Boolean(el),
      );
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
            "container-page relative z-10 flex items-center justify-between gap-4 transition-[height] duration-700 ease-out-expo",
            scrolled ? "h-16" : "h-20 md:h-24",
          )}
        >
          <Link href="/#top" aria-label="Pyxis — home" onClick={closeMobile}>
            <Logo eager />
          </Link>

          <nav ref={navRef} aria-label="Primary" className="hidden items-center gap-8 md:flex lg:gap-10">
            <ul className="flex items-center gap-6 lg:gap-9">
              {navigation.map((group, i) => {
                const shown = dropdown === i;
                return (
                  <li
                    key={group.label}
                    className="relative"
                    onMouseEnter={() => openDropdown(i)}
                    onMouseLeave={scheduleClose}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDropdown(null);
                    }}
                  >
                    <button
                      type="button"
                      data-dropdown-toggle={i}
                      aria-expanded={shown}
                      aria-controls={`nav-panel-${i}`}
                      data-current={groupActive(group) || undefined}
                      onClick={() => setDropdown(shown ? null : i)}
                      className="group relative flex items-center gap-2 py-2 text-sm text-muted transition-colors duration-300 hover:text-foreground aria-expanded:text-foreground data-[current]:text-foreground"
                    >
                      {group.label}
                      <Chevron open={shown} />
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-px origin-right scale-x-0 bg-primary transition-transform duration-500 ease-out-expo group-hover:origin-left group-hover:scale-x-100 group-data-[current]:scale-x-100"
                      />
                    </button>

                    <div
                      id={`nav-panel-${i}`}
                      className={cn(
                        "absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-[opacity,translate,visibility] duration-500 ease-out-expo",
                        shown ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
                      )}
                    >
                      <ul className="w-max min-w-52 border border-border-strong bg-background/95 p-1 shadow-[0_24px_60px_-20px_rgb(0_0_0_/_0.6)] backdrop-blur-xl">
                        {group.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              aria-current={isActive(item) ? "page" : undefined}
                              onClick={() => setDropdown(null)}
                              className="group/item flex items-center justify-between gap-6 px-3.5 py-2.5 text-sm tracking-tight whitespace-nowrap text-foreground/85 transition-colors duration-300 hover:bg-surface hover:text-foreground focus-visible:bg-surface aria-[current]:bg-surface/60 aria-[current]:text-foreground"
                            >
                              <span>{item.label}</span>
                              <Arrow className="size-3.5 -translate-x-1 text-accent opacity-0 transition-[opacity,translate] duration-500 ease-out-expo group-hover/item:translate-x-0 group-hover/item:opacity-100 group-focus-visible/item:translate-x-0 group-focus-visible/item:opacity-100" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
            <Button href="#contact" variant="accent" size="sm" className="min-w-44">
              Request a demo
            </Button>
          </nav>

          <div className="flex items-center gap-4 md:hidden">
            {/* Demo stays one tap away on phones too (spec S01-R3) */}
            <Link
              href="#contact"
              onClick={closeMobile}
              className="label flex h-9 items-center bg-accent px-3 text-background transition-colors duration-500 hover:bg-foreground max-[359px]:hidden"
            >
              Demo
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="label flex h-10 items-center gap-3 text-foreground"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => (open ? closeMobile() : setOpen(true))}
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
        className="invisible fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-background px-[var(--gutter)] pt-28 pb-10 md:hidden"
      >
        <nav aria-label="Mobile">
          <ol className="border-t border-border">
            {navigation.map((group, i) => {
              const isOpen = expanded === i;
              return (
                <li key={group.label} className="border-b border-border">
                  <div className="overflow-hidden">
                    <button
                      type="button"
                      data-menu-item
                      aria-expanded={isOpen}
                      aria-controls={`menu-group-${i}`}
                      onClick={() => setExpanded(isOpen ? null : i)}
                      className="flex w-full items-baseline gap-4 py-4 text-left font-display text-[clamp(1.6rem,7vw,2.25rem)] leading-[1.1] tracking-[-0.03em]"
                    >
                      <span className="label text-accent">{pad(i + 1)}</span>
                      {group.label}
                      <span aria-hidden="true" className="relative ml-auto size-3.5 self-center">
                        <span className="absolute top-1/2 left-0 h-px w-full bg-current" />
                        <span
                          className={cn(
                            "absolute top-0 left-1/2 h-full w-px bg-current transition-transform duration-500 ease-out-expo",
                            isOpen && "scale-y-0",
                          )}
                        />
                      </span>
                    </button>
                  </div>
                  <div
                    id={`menu-group-${i}`}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-500 ease-out-expo",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <ul className="overflow-hidden" inert={!isOpen}>
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={closeMobile}
                            aria-current={isActive(item) ? "page" : undefined}
                            className="flex items-center justify-between gap-4 py-2.5 pl-10 text-lg tracking-tight text-muted transition-colors hover:text-foreground aria-[current]:text-foreground last:mb-3"
                          >
                            {item.label}
                            <Arrow className="text-subtle" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ol>
        </nav>
        <div data-menu-meta className="mt-10 space-y-6 border-t border-border pt-6">
          <Button href="#contact" variant="accent" onClick={closeMobile} className="w-full">
            Request a demo
          </Button>
          <div className="label space-y-2 text-muted">
            <a href={`mailto:${contact.email}`} className="block text-foreground normal-case tracking-normal text-base">
              {contact.email}
            </a>
            <p>Where telecom data becomes intelligence.</p>
          </div>
        </div>
      </div>
    </>
  );
}
