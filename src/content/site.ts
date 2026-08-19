/**
 * Every editable word on the site lives here.
 *
 * Components read from this object and never hardcode copy. To update the
 * site, edit this file and nothing else.
 */

export type Heading = {
  /** Leading words, set in Inter. */
  plain: string;
  /** The one word set in Instrument Serif italic. The site's signature move. */
  italic: string;
};

export type Project = {
  /** The product, not the employer. */
  title: string;
  /** Employer, or "Open source". */
  org: string;
  role: string;
  period: string;
  /**
   * One sentence on what you owned and at what scale. This is the part that
   * reads as senior. Without it, a row is just a list of tools.
   */
  summary: string;
  /** Shown in mono under the summary. Keep to 2 to 4 items. */
  stack: string[];
  /**
   * Omit for work with no public URL. The row still highlights on hover and
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
    // demonstrates the design-systems work the rest of the list only asserts.
    title: "Tatva UI",
    org: "Open source",
    role: "Author",
    period: "2026",
    summary:
      "A React and TypeScript design system. 29 accessible components with two install modes: an npm package, or a CLI that copies component source into your project. Styled with CSS Modules, so there's no runtime cost and no Tailwind required.",
    stack: ["React", "TypeScript", "CSS Modules"],
    href: "https://dixant.github.io/tatva-ui/",
    preview: "Live docs",
  },
  {
    title: "CargoWise Neo",
    org: "WiseTech Global",
    role: "Software Engineer",
    period: "2024-26",
    summary:
      "Full-stack features for the customer portal on a platform used by 17,000+ organisations across 174 countries. Built the multi-step customs and booking flows, and pushed fixes upstream into Supply, CargoWise's shared Vue component library, so every project on the platform got them rather than Neo alone.",
    stack: ["Vue", "TypeScript", "Storybook"],
    preview: "Fortune 500 scale",
  },
  {
    title: "Visibility & Alerts",
    org: "Blume Global",
    role: "Software Engineer",
    period: "2022-23",
    summary:
      "Sole frontend developer across two products. Built a white-label tracking micro-app giving each organisation its own branded public tracking pages, the Share Dashboard permission model, and app-wide dark and light theming across grids, widgets and icons.",
    stack: ["React", "Server-Sent Events", "Bit.dev"],
    preview: "Sole frontend dev",
  },
  {
    title: "Blume Visibility",
    org: "Blume Global",
    role: "Senior Software Engineer",
    period: "2020-22",
    summary:
      "Core frontend engineer building a real-time tracking platform from nothing in a team of twelve, covering air, ocean, rail, dray, parcel, LTL and TL, with milestone timelines, live GPS, exceptions and watchlists. Integrated three independently deployed micro-frontends into one portal shell using Module Federation.",
    stack: ["React", "Redux", "Leaflet", "Module Federation"],
    preview: "Built from nothing",
  },
  {
    title: "Hyundai BlueLink",
    org: "Infogain",
    role: "Software Engineer",
    period: "2019-20",
    summary:
      "Telematics and connected-services integration in the My Hyundai and My Genesis portals, covering vehicle health, remote commands and service scheduling, plus a progressive web app for remote climate, battery and headlight control.",
    stack: ["React", "PWA"],
    preview: "Connected vehicles",
  },
  {
    title: "VEGLELE",
    org: "Co-founded",
    role: "Co-Founder & Developer",
    period: "2015-17",
    summary:
      "Farm-to-consumer produce delivered in under an hour, at below-market prices, built and shipped years before Blinkit or Zepto existed. Wrote the Android app end to end and ran business development and investor meetings while finishing a master's degree.",
    stack: ["Android", "Java"],
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
    title: "Dixant Sharma, Senior Frontend Engineer",
    description:
      "Dixant Sharma is a senior frontend engineer based in India with 9+ years building enterprise SaaS: React, Vue, TypeScript, design systems and micro-frontends.",
  },

  hero: {
    greeting: "Senior frontend engineer, based in India",
    bio: "Nine years building enterprise SaaS that people use all day: supply chain platforms running in 174 countries, and the component libraries underneath them.",
    tags: ["Frontend architecture", "Design systems", "Enterprise SaaS"],
    year: "2026",
  },

  about: {
    heading: { plain: "A short", italic: "introduction" } satisfies Heading,
    label: "About",
    body: [
      "I'm a senior frontend engineer with 9+ years in enterprise SaaS, most of it spent on supply chain software at Blume Global and, after the acquisition, WiseTech Global. Six continuous years on products where a wrong number costs someone a shipment.",
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
     * Rendered as one prose paragraph. `tech` entries get an underline that
     * strengthens on hover; plain strings are connective tissue.
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
        body: "A Philosophy of Software Design, by John Ousterhout.",
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
