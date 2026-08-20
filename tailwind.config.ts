import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        ink: "var(--ink)",
        dim: "var(--dim)",
        accent: "var(--accent)",
        line: "var(--line)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      transitionTimingFunction: {
        snap: "cubic-bezier(.2, .9, .3, 1.4)",
        reveal: "cubic-bezier(.2, .7, .2, 1)",
      },
      maxWidth: {
        shell: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
