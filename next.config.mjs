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
};

export default nextConfig;
