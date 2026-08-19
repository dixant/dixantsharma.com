/**
 * Every editable word on the site lives here.
 *
 * Components read from this object and never hardcode copy — to update the
 * site, edit this file and nothing else.
 */

export type Heading = {
  /** Leading words, set in Inter. */
  plain: string;
  /** The one word set in Instrument Serif italic. The site's signature move. */
  italic: string;
};

export type Project = {
  title: string;
  /** Shown in mono beside the title. Keep to 2–4 items. */
  stack: string[];
  /** Short right-hand qualifier: the org, or the years. */
  meta: string;
  year: string;
  /**
   * Omit for work with no public URL — the row still highlights on hover and
   * stays keyboard-focusable, it just isn't a link.
   */
  href?: string;
  /** Text of the label that follows the cursor on hover. */
  preview: string;
};

export type NowItem = {
  /** Mono label in the left column, e.g. TODAY. */
  label: string;
  body: string;
};

export type Social = {
  label: string;
  href: string;
};

/**
 * Declared out here rather than inline: the `as const` on `site` would narrow
 * these literals and drop the optional `href` from the inferred type entirely.
 */
const projects: Project[] = [
  {
    // Deliberately first: the one row visitors can actually click, and it
    // demonstrates the design-systems work the enterprise rows only assert.
    title: "Tatva UI",
    stack: ["React", "TypeScript", "CSS Modules"],
    meta: "Open source",
    year: "2026",
    href: "https://dixant.github.io/tatva-ui/",
    preview: "29 components, live",
  },
  {
    title: "CargoWise Neo",
    stack: ["Vue", "TypeScript", "Storybook"],
    meta: "WiseTech Global",
    year: "2024–26",
    preview: "Customer portal",
  },
  {
    title: "Blume Visibility",
    stack: ["React", "Redux", "Leaflet"],
    meta: "Blume Global",
    year: "2020–22",
    preview: "Built from scratch",
  },
  {
    title: "White-label Tracking",
    stack: ["React", "Module Federation"],
    meta: "Blume Global",
    year: "2022–23",
    preview: "Micro-app",
  },
  {
    title: "Hyundai BlueLink",
    stack: ["React", "PWA"],
    meta: "Infogain",
    year: "2019–20",
    preview: "Connected vehicles",
  },
  {
    title: "VEGLELE",
    stack: ["Android", "Java"],
    meta: "Co-founder",
    year: "2015–17",
    preview: "Quick commerce, early",
  },
];

export const site = {
  name: {
    first: "Dixant",
    /** Rendered in Instrument Serif italic. */
    last: "Sharma",
  },
  domain: "dixantsharma.com",
  url: "https://dixantsharma.com",
  email: "dixantsharma095@gmail.com",
  location: "India",
  timezone: "Asia/Kolkata",
  timezoneLabel: "IST",

  available: true,
  availableLabel: "Available for work",

  meta: {
    title: "Dixant Sharma — Senior Frontend Engineer",
    description:
      "Dixant Sharma is a senior frontend engineer based in India with 9+ years building enterprise SaaS — React, Vue, TypeScript, design systems and micro-frontends.",
  },

  hero: {
    greeting: "— Senior frontend engineer, based in India",
    bio: "Nine years building enterprise SaaS that people use all day — supply chain platforms running in 174 countries, and the component libraries underneath them.",
    tags: ["Frontend architecture", "Design systems", "Enterprise SaaS"],
    year: "2026",
  },

  about: {
    heading: { plain: "A short", italic: "introduction" } satisfies Heading,
    label: "About",
    body: [
      "I'm a senior frontend engineer with 9+ years in enterprise SaaS, most of it spent on supply chain software at Blume Global and — after the acquisition — WiseTech Global. Six continuous years on products where a wrong number costs someone a shipment.",
      "Most of my work sits in component libraries, design systems and micro-frontends: the shared layer everyone builds on. I'd rather fix something in the library than work around it in one app.",
    ],
    /** Phrases italicized inline for accent. Must appear verbatim in `body`. */
    accents: ["a wrong number costs someone a shipment", "the shared layer everyone builds on"],
  },

  work: {
    heading: { plain: "Things I've", italic: "built" } satisfies Heading,
    label: "Selected work",
    projects,
  },

  stack: {
    heading: { plain: "What I", italic: "work with" } satisfies Heading,
    label: "Stack",
    /**
     * Rendered as one prose paragraph. `tech` entries get an underline and
     * italicize on hover; plain strings are connective tissue.
     */
    prose: [
      "I spend most days in ",
      { tech: "TypeScript" },
      ", building with ",
      { tech: "React" },
      " and ",
      { tech: "Vue" },
      ", wiring state with ",
      { tech: "Redux" },
      " and ",
      { tech: "Vuex" },
      ". I document components in ",
      { tech: "Storybook" },
      ", test them with ",
      { tech: "Vitest" },
      ", and build with ",
      { tech: "Vite" },
      ". I've stitched independently deployed apps together using ",
      { tech: "Module Federation" },
      ", drawn a lot of maps with ",
      { tech: "Leaflet" },
      ", and shipped mobile with ",
      { tech: "React Native" },
      ". On the backend it's usually ",
      { tech: "Node" },
      " and ",
      { tech: "REST" },
      ".",
    ] as const,
  },

  now: {
    heading: { plain: "Where things", italic: "stand" } satisfies Heading,
    label: "Now",
    items: [
      {
        label: "TODAY",
        body: "Just wrapped six years across Blume Global and WiseTech Global.",
      },
      {
        label: "THIS WEEK",
        body: "Building this site, and going deep on AI-assisted engineering workflows.",
      },
      {
        label: "READING",
        body: "A Philosophy of Software Design — John Ousterhout.",
      },
      {
        label: "STATUS",
        body: "Open to senior frontend roles, remote or hybrid. Say hello.",
      },
    ] satisfies NowItem[],
  },

  contact: {
    heading: { plain: "Let's make something", italic: "good." } satisfies Heading,
    label: "Contact",
    blurb: "Have something you're building? I read every message.",
  },

  socials: [
    { label: "GitHub", href: "https://github.com/dixant" },
    { label: "LinkedIn", href: "https://linkedin.com/in/dixant-sharma" },
    { label: "X", href: "https://x.com/dixant_sharma" },
  ] satisfies Social[],
} as const;

export type Site = typeof site;
