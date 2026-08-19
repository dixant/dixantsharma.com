"use client";

import { useRef, useState } from "react";
import { site } from "@/content/site";
import { Reveal } from "./Reveal";

const ROW =
  "group grid grid-cols-1 gap-4 border-b transition-[opacity,padding] duration-500 ease-reveal sm:grid-cols-[1fr_13rem] sm:gap-12";

/**
 * Experience, not a gallery. Each row leads with the product and carries a
 * sentence on what was owned and at what scale. A title and a stack list
 * alone read as junior no matter how it's set.
 *
 * Hovering a row dims its siblings to 32%, gives it extra vertical room, and
 * swaps its title to serif italic.
 */
export function WorkList() {
  const [hovered, setHovered] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  /**
   * The label is `fixed`, not `absolute`: an absolutely positioned box this far
   * right would expand the page's scrollable overflow and give the whole
   * document a horizontal scrollbar whenever the cursor neared the right edge.
   */
  const movePreview = (event: React.MouseEvent) => {
    const preview = previewRef.current;
    if (!preview) return;
    const gap = 18;
    const maxX = window.innerWidth - preview.offsetWidth - 8;
    const x = Math.min(event.clientX + gap, maxX);
    preview.style.transform = `translate3d(${x}px, ${event.clientY + gap}px, 0)`;
  };

  return (
    <div className="relative" onMouseMove={movePreview}>
      <ul ref={listRef} onMouseLeave={() => setHovered(null)}>
        {site.work.projects.map((project, index) => {
          const isHovered = hovered === index;
          const isDimmed = hovered !== null && !isHovered;

          const rowStyle = {
            borderColor: "var(--line)",
            opacity: isDimmed ? 0.32 : 1,
            paddingTop: isHovered ? "2.75rem" : "2rem",
            paddingBottom: isHovered ? "2.75rem" : "2rem",
          };

          const inner = (
            <>
              <div className="max-w-2xl">
                <h3
                  className="text-2xl leading-tight tracking-[-0.02em] transition-all duration-500 ease-reveal sm:text-4xl"
                  style={
                    isHovered
                      ? {
                          fontFamily: "var(--font-serif)",
                          fontStyle: "italic",
                          color: "var(--accent)",
                        }
                      : undefined
                  }
                >
                  {project.title}
                  {project.href && (
                    <span
                      aria-hidden="true"
                      className="ml-3 inline-block align-middle text-dim transition-transform duration-500 ease-snap group-hover:translate-x-1 group-focus-visible:translate-x-1"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.25}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M7 17 17 7M9 7h8v8" />
                      </svg>
                    </span>
                  )}
                </h3>

                <p className="mt-4 text-[15px] leading-[1.7] text-dim sm:text-base">
                  {project.summary}
                </p>

                <p className="mt-4 font-mono text-[11px] tracking-[0.12em] text-dim">
                  {project.stack.join(" / ")}
                </p>
              </div>

              {/* Role and tenure: the columns a reader scans to place your seniority. */}
              <div className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-dim sm:text-right">
                <span className="block text-ink">{project.org}</span>
                <span className="block">{project.role}</span>
                <span className="mt-1 block">{project.period}</span>
              </div>
            </>
          );

          return (
            <Reveal as="li" key={project.title} delay={index * 60}>
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  onMouseEnter={() => setHovered(index)}
                  onFocus={() => setHovered(index)}
                  onBlur={() => setHovered(null)}
                  className={ROW}
                  style={rowStyle}
                >
                  {inner}
                </a>
              ) : (
                // Enterprise work with no public URL: highlights, but isn't a link.
                <div
                  onMouseEnter={() => setHovered(index)}
                  className={ROW}
                  style={rowStyle}
                >
                  {inner}
                </div>
              )}
            </Reveal>
          );
        })}
      </ul>

      {/* Cursor-following preview label. Hidden on touch, where there's no hover. */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 hidden will-change-transform [@media(pointer:fine)]:block"
      >
        <span
          className="inline-block whitespace-nowrap px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-opacity duration-300 ease-reveal"
          style={{
            backgroundColor: "var(--ink)",
            color: "var(--bg)",
            opacity: hovered === null ? 0 : 1,
          }}
        >
          {hovered === null ? "" : site.work.projects[hovered].preview}
        </span>
      </div>
    </div>
  );
}
