"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";

/** Distance scrolled before the bar materialises, in pixels. */
const SOLID_AT = 24;

/**
 * Ticking IST clock. Rendered empty on the server and filled after mount,
 * because the server's "now" would never match the client's anyway.
 */
function Clock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: site.timezone,
      }).format(new Date());

    setTime(format());
    const id = window.setInterval(() => setTime(format()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-[11px] tabular-nums tracking-[0.12em] text-dim">
      {time ? `${time} ${site.timezoneLabel}` : " "}
    </span>
  );
}

/**
 * Transparent over the hero, then a translucent blurred bar once the page
 * scrolls, so content passing underneath never collides with the nav text.
 *
 * This replaced a `mix-blend-difference` bar. The blend kept the text legible
 * in the abstract but did nothing about collision. The hero name and the nav
 * simply drew on top of each other. A background can't be differenced without
 * inverting into a visible band, so the two approaches are mutually exclusive.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SOLID_AT);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ease-reveal"
      style={{
        backgroundColor: scrolled ? "var(--bg-nav)" : "transparent",
        borderColor: scrolled ? "var(--line)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <nav className="mx-auto flex max-w-shell items-center justify-between gap-4 px-6 py-5 sm:px-10">
        <a href="#top" aria-label={`${site.name.first} ${site.name.last}, back to top`}>
          <Logo first={site.name.first} last={site.name.last} />
        </a>

        <div className="flex items-center gap-4 text-ink">
          <Clock />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
