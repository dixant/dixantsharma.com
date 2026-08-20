"use client";

import { useEffect, useRef } from "react";

/** Cursor influence falls off to zero past this radius, in pixels. */
const RADIUS = 170;
/** How far a letter can be pulled, in pixels. */
const PULL = 26;
const SMOOTHING = 0.14;

type Letter = {
  el: HTMLSpanElement;
  /** Letter center in page coordinates. Recomputed on resize. */
  cx: number;
  cy: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
};

/**
 * Every letter reacts independently to cursor proximity, translating toward
 * it. The signature moment of the page.
 */
export function MagneticName({
  first,
  last,
  className = "",
}: {
  first: string;
  last: string;
  className?: string;
}) {
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    const nodes = Array.from(
      wrap.querySelectorAll<HTMLSpanElement>("[data-letter]"),
    );

    const letters: Letter[] = nodes.map((el) => ({
      el,
      cx: 0,
      cy: 0,
      x: 0,
      y: 0,
      tx: 0,
      ty: 0,
    }));

    // Measure with transforms cleared, or we'd bake the current offset in.
    const measure = () => {
      for (const letter of letters) {
        letter.el.style.transform = "";
      }
      for (const letter of letters) {
        const rect = letter.el.getBoundingClientRect();
        letter.cx = rect.left + rect.width / 2 + window.scrollX;
        letter.cy = rect.top + rect.height / 2 + window.scrollY;
      }
    };

    measure();

    let pointerX = -9999;
    let pointerY = -9999;
    let frame = 0;

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX + window.scrollX;
      pointerY = event.clientY + window.scrollY;
    };

    const onPointerLeave = () => {
      pointerX = -9999;
      pointerY = -9999;
    };

    const tick = () => {
      for (const letter of letters) {
        const dx = pointerX - letter.cx;
        const dy = pointerY - letter.cy;
        const distance = Math.hypot(dx, dy);

        if (distance < RADIUS) {
          // Linear falloff, strongest at the cursor.
          const strength = (1 - distance / RADIUS) * PULL;
          const norm = distance || 1;
          letter.tx = (dx / norm) * strength;
          letter.ty = (dy / norm) * strength;
        } else {
          letter.tx = 0;
          letter.ty = 0;
        }

        letter.x += (letter.tx - letter.x) * SMOOTHING;
        letter.y += (letter.ty - letter.y) * SMOOTHING;

        letter.el.style.transform =
          Math.abs(letter.x) < 0.01 && Math.abs(letter.y) < 0.01
            ? ""
            : `translate3d(${letter.x.toFixed(2)}px, ${letter.y.toFixed(2)}px, 0)`;
      }
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", measure);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", measure);
    };
  }, [first, last]);

  /**
   * Two nested spans on purpose. The outer one runs the load-in animation, the
   * inner one is what the magnetism loop writes transforms to; sharing a single
   * element would mean the two fight over `transform`.
   */
  const split = (word: string, serif: boolean, offset: number) =>
    Array.from(word).map((char, index) => (
      <span
        key={`${word}-${index}`}
        className="letter-enter"
        style={
          // 220ms lead so the greeting lands first.
          { "--letter-delay": `${220 + (offset + index) * 40}ms` } as React.CSSProperties
        }
      >
        <span
          data-letter
          className={`inline-block will-change-transform ${
            serif ? "font-serif italic" : ""
          }`}
          style={serif ? { color: "var(--accent)" } : undefined}
        >
          {char}
        </span>
      </span>
    ));

  return (
    <span ref={wrapRef} className={className}>
      {/*
        No screen-reader duplicate of the name here. One used to sit alongside
        the split letters, but crawlers index both and the <h1> came out as
        "Dixant SharmaDixantSharma". The heading carries an aria-label instead,
        and the gap below is a real space so the letters still concatenate into
        "Dixant Sharma" for anything reading the text.
      */}
      {split(first, false, 0)}
      <span className="inline-block w-[0.25em]">{" "}</span>
      {split(last, true, first.length)}
    </span>
  );
}
