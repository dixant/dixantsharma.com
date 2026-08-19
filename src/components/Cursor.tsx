"use client";

import { useEffect, useRef } from "react";

const BASE_SIZE = 28;
const GROWN_SIZE = 60;
/** Lower = more lag. This is the whole feel of the thing. */
const SMOOTHING = 0.18;

/**
 * A thin outline ring that trails the pointer. `mix-blend-mode: difference`
 * makes it invert against whatever it's over, so it reads on both themes and
 * over any surface. Grows over interactive elements.
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    const ring = ringRef.current;
    if (!ring) return;

    document.documentElement.classList.add("has-custom-cursor");
    ring.style.opacity = "0";

    // Start centered so the first frame doesn't fly in from the corner.
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;
    let size = BASE_SIZE;
    let targetSize = BASE_SIZE;
    let frame = 0;
    let seen = false;

    const isInteractive = (target: EventTarget | null) =>
      target instanceof Element &&
      Boolean(
        target.closest(
          'a, button, [role="button"], input, textarea, select, [data-cursor="grow"]',
        ),
      );

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      targetSize = isInteractive(event.target) ? GROWN_SIZE : BASE_SIZE;
      if (!seen) {
        seen = true;
        ringX = pointerX;
        ringY = pointerY;
        ring.style.opacity = "1";
      }
    };

    const onPointerLeave = () => {
      ring.style.opacity = "0";
    };

    const onPointerEnter = () => {
      if (seen) ring.style.opacity = "1";
    };

    const tick = () => {
      ringX += (pointerX - ringX) * SMOOTHING;
      ringY += (pointerY - ringY) * SMOOTHING;
      size += (targetSize - size) * SMOOTHING;
      ring.style.transform = `translate3d(${ringX - size / 2}px, ${ringY - size / 2}px, 0)`;
      ring.style.width = `${size}px`;
      ring.style.height = `${size}px`;
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("pointerenter", onPointerEnter);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("pointerenter", onPointerEnter);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden rounded-full border border-white opacity-0 mix-blend-difference transition-opacity duration-300 [@media(pointer:fine)]:block"
      style={{ width: BASE_SIZE, height: BASE_SIZE }}
    />
  );
}
