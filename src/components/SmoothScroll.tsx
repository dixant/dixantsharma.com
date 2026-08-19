"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Eased wheel scrolling. Lenis animates the real scroll position rather than
 * transforming a container, so IntersectionObserver reveals, `position: fixed`
 * and anchor links all keep working normally.
 *
 * Deliberately not active for reduced-motion or touch: hijacking momentum
 * scrolling on a phone makes it worse, not better.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      // Matches the reveal easing: an exponential settle, no bounce.
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      // Native touch scrolling is already good; leave it alone.
      syncTouch: false,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };
    frame = window.requestAnimationFrame(raf);

    // In-page anchors must go through Lenis, or the jump fights the animation.
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: 0 });
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      window.cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
