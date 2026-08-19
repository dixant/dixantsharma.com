"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";

/** Shared by the blended bar and the dot overlay so the two stay in register. */
const ROW =
  "mx-auto grid max-w-shell grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-5 sm:px-10";
const CENTER = "flex items-center gap-2 justify-self-center";
const DOT_BOX = "relative flex h-[7px] w-[7px] shrink-0";
const LABEL = "hidden font-mono text-[11px] tracking-[0.12em] sm:inline";

/**
 * Ticking IST clock. Rendered empty on the server and filled after mount —
 * the server's "now" would never match the client's anyway.
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
    <span className="font-mono text-[11px] tabular-nums tracking-[0.12em]">
      {time ? `${time} ${site.timezoneLabel}` : " "}
    </span>
  );
}

export function Nav() {
  return (
    <>
      {/*
        The blend lives on the <header> itself, not on the text inside it:
        `position: fixed` makes this element a stacking context, so a blended
        child could only ever see the header's own transparent backdrop and
        would resolve against black in both themes. Blending here instead lets
        it difference against the page, which is the point — the bar stays
        legible over anything that scrolls under it.
      */}
      <header className="fixed inset-x-0 top-0 z-50 text-white mix-blend-difference">
        <nav className={ROW}>
          <a
            href="#top"
            className="justify-self-start font-mono text-[11px] uppercase tracking-[0.18em]"
          >
            {site.name.first} {site.name.last}
          </a>

          <div className={CENTER}>
            {/* Placeholder holding the dot's slot; the real dot is drawn below. */}
            {site.available && <span className={DOT_BOX} aria-hidden="true" />}
            <span className={LABEL}>{site.availableLabel}</span>
          </div>

          <div className="flex items-center gap-4 justify-self-end">
            <Clock />
            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/*
        The dot rides in its own unblended layer — inside the header, difference
        would turn its green magenta on the light theme. Same grid and spacing,
        so it lands exactly in the slot reserved above.
      */}
      {site.available && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-0 z-[51]"
        >
          <div className={ROW}>
            <span />
            <div className={CENTER}>
              <span className={DOT_BOX}>
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
                  style={{ backgroundColor: "var(--dot)" }}
                />
                <span
                  className="relative inline-flex h-[7px] w-[7px] rounded-full"
                  style={{ backgroundColor: "var(--dot)" }}
                />
              </span>
              {/* Reserves the label's exact width so the dot can't drift. */}
              <span className={`${LABEL} invisible`}>{site.availableLabel}</span>
            </div>
            <span />
          </div>
        </div>
      )}
    </>
  );
}
