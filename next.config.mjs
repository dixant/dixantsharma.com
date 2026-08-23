/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /*
   * Overridable so a verification build can target a different directory.
   * `next build` into the same .next that `next dev` is serving replaces its
   * chunks mid-flight, and the dev server then 500s with "Cannot find module
   * ./NNN.js" until .next is deleted. `npm run verify` sets this instead.
   */
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // MDX blog posts land here later: add `mdx` to this list and wire up
  // `@next/mdx` when the first post exists.
  pageExtensions: ["ts", "tsx"],

  /*
   * No Content-Security-Policy here on purpose. A useful one would need a
   * nonce for the two inline scripts (the pre-paint theme init and the JSON-LD
   * block), and nonces require middleware, which makes every response dynamic
   * and gives up static prerendering. A CSP with 'unsafe-inline' instead would
   * permit exactly what a CSP exists to stop. The site renders no user input,
   * so the XSS surface it would defend is empty either way.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Nobody can frame the site, so it can't be used for clickjacking.
          { key: "X-Frame-Options", value: "DENY" },
          // Stop browsers guessing a MIME type other than the one sent.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Send the origin cross-site, the full path only to ourselves.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Nothing here needs these, so deny them outright.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
