/**
 * Fixed film-grain overlay. Fractal noise as an inline data URI so it costs no
 * request. Blend mode flips per theme (screen on dark, multiply on light).
 */
const NOISE = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="160" height="160" filter="url(#n)"/></svg>`;

export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60]"
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(NOISE)}")`,
        backgroundSize: "160px 160px",
        opacity: "var(--grain-opacity)",
        mixBlendMode: "var(--grain-blend)" as React.CSSProperties["mixBlendMode"],
      }}
    />
  );
}
