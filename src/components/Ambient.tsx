/**
 * Two very soft radial washes: warm orange in one corner, cool blue in the
 * other, both ~5% opacity. Meant to be felt, not seen.
 *
 * The opaque base layer underneath is load-bearing: a background set on `body`
 * propagates to the canvas, which lives outside every stacking context, so the
 * cursor ring's `mix-blend-mode: difference` would have nothing to blend
 * against and would always resolve against black. Painting the page colour
 * into a real element gives that blend a backdrop.
 */
export function Ambient() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "var(--bg)",
          transition: "background-color 400ms var(--ease-reveal)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60rem 45rem at 8% 6%, var(--warm), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55rem 45rem at 95% 88%, var(--cool), transparent 70%)",
        }}
      />
    </div>
  );
}
