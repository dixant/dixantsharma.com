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

export type Testimonial = {
  /**
   * The recommendation as written, one entry per paragraph. If it ever needs
   * shortening, cut a contiguous run; never stitch sentences together from
   * different parts of it.
   */
  quote: string[];
  name: string;
  title: string;
  /** How they know the work, which is what gives the quote its weight. */
  relation: string;
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
    title: "CargoWise Neo",
    org: "WiseTech Global",
    role: "Software Engineer",
    period: "2024-26",
    summary:
      "Full-stack features for the customer portal on a platform used by 17,000+ organisations across 174 countries. Built the multi-step customs and booking flows, contributed on the backend in C#, and pushed fixes upstream into Supply, CargoWise's shared Vue component library, so every project on the platform got them rather than Neo alone.",
    stack: ["Vue", "TypeScript", "C#", "Storybook"],
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
    role: "Software Engineer, then Senior",
    period: "2020-22",
    summary:
      "Core frontend engineer building a real-time tracking platform from nothing in a team of twelve, covering air, ocean, rail, dray, parcel, LTL and TL, with milestone timelines, live GPS, exceptions and watchlists. Integrated three independently deployed micro-frontends into one portal shell using Module Federation. Won the company's Medallion Award as star performer of the quarter and was promoted to Senior in 2021.",
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
  /** Shown beside the About prose. Deliberately not a country. */
  availability: "Remote, worldwide",
  timezone: "Asia/Kolkata",
  timezoneLabel: "IST",

  available: true,
  availableLabel: "Available for work",

  meta: {
    title: "Dixant Sharma, Senior Frontend Engineer",
    description:
      "Dixant Sharma is a senior frontend engineer with 9+ years building enterprise SaaS: React, Vue, TypeScript, design systems and micro-frontends. Working remotely, worldwide.",
  },

  hero: {
    greeting: "Senior frontend engineer, working remotely worldwide",
    bio: "Nine years building enterprise SaaS that people use all day: supply chain platforms running in 174 countries, and the component libraries underneath them.",
    /**
     * Facts, not categories. "Design systems" is a label every frontend CV
     * carries; these three numbers are only true of this one.
     */
    meta: ["9 years", "17,000+ organisations", "174 countries"],
  },

  about: {
    heading: { plain: "A short", italic: "introduction" } satisfies Heading,
    label: "About",
    body: [
      "I've spent the better part of a decade building products people actually use, from a startup I co-founded in Jaipur to enterprise logistics platforms running across the global supply chain. Six of those years were at Blume Global and, after the acquisition, WiseTech Global, on products where a wrong number costs someone a shipment.",
      "Most of my work sits in component libraries, design systems and micro-frontends: the shared layer everyone builds on. I'd rather fix something in the library than work around it in one app.",
      "Most of what I know came from building things I had never built before. A rich text editor in React, a migration off Google Maps onto Leaflet, a milestone view that tracked how a shipment changed over time. I learn by doing, and I have never stepped back from a problem I didn't know how to solve yet.",
    ],
    /** Phrases italicized inline for accent. Must appear verbatim in `body`. */
    accents: [
      "a wrong number costs someone a shipment",
      "the shared layer everyone builds on",
      "I have never stepped back from a problem I didn't know how to solve yet",
    ],
  },

  showcase: {
    label: "Open source",
    heading: { plain: "Something I", italic: "made" } satisfies Heading,
    title: "Tatva UI",
    blurb:
      "A React and TypeScript design system with 29 accessible components. Two install modes: an npm package, or a CLI that copies the component source into your project so you own it outright. Styled with CSS Modules, so there is no runtime styling cost and no Tailwind required.",
    stats: [
      { value: "29", label: "Components" },
      { value: "~23 KB", label: "Gzipped" },
      { value: "0", label: "Runtime cost" },
      { value: "MIT", label: "Licence" },
    ],
    /** Captured from the project's own Storybook. */
    shots: [
      {
        src: "/tatva/dashboard.png",
        alt: "Tatva UI dashboard block: stat cards, tabs, search and a members table",
        width: 1312,
        height: 723,
      },
      {
        src: "/tatva/pricing.png",
        alt: "Tatva UI pricing block with three plan cards",
        width: 1440,
        height: 631,
      },
      {
        src: "/tatva/login.png",
        alt: "Tatva UI login block with email and password fields",
        width: 514,
        height: 593,
      },
    ],
    links: [
      { label: "Live docs", href: "https://dixant.github.io/tatva-ui/" },
      { label: "Storybook", href: "https://dixant.github.io/tatva-ui/storybook/" },
      { label: "GitHub", href: "https://github.com/dixant/tatva-ui" },
      { label: "npm", href: "https://www.npmjs.com/package/@dixant/tatva-ui" },
    ],
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

  testimonials: {
    heading: { plain: "What people I've worked with", italic: "say" } satisfies Heading,
    label: "Recommendations",
    items: [
      {
        quote: [
          "I had the pleasure of working with Dixant Sharma on my software engineering team, where he consistently demonstrated strong technical skills and a great attitude. Dixant primarily focused on front-end development using Vue.js and TypeScript, delivering high-quality, user-friendly solutions and contributing across multiple projects.",
          "In addition to his front-end expertise, he was also able to contribute on the backend with C#, showing versatility and a willingness to take on new challenges. He was dependable, collaborative, and always approached problems thoughtfully.",
          "I appreciated having Dixant on the team and would gladly recommend him to any organization looking for a skilled and well-rounded software engineer.",
        ],
        name: "David Silva",
        title: "Software Engineer Team Leader, WiseTech Global",
        relation: "Managed Dixant directly",
      },
    ] satisfies Testimonial[],
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
