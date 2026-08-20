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
    // The one row with a public URL. Everything below it is employer software.
    title: "Tatva UI",
    org: "Open source",
    role: "Author",
    period: "2026",
    summary:
      "29 accessible React components in 23 KB. Install it as a package, or copy the source in and own it.",
    stack: ["React", "TypeScript", "CSS Modules", "Storybook"],
    href: "https://dixant.github.io/tatva-ui/",
    preview: "Live docs",
  },
  {
    title: "CargoWise Neo",
    org: "WiseTech Global",
    role: "Software Engineer",
    period: "2024-26",
    summary:
      "Customer portal for a platform used by 17,000+ organisations across 174 countries. Owned changes to the shared Vue component library, so every project got them.",
    stack: ["Vue", "TypeScript", "C#", "Storybook"],
    preview: "Fortune 500 scale",
  },
  {
    title: "Visibility & Alerts",
    org: "Blume Global",
    role: "Software Engineer",
    period: "2022-23",
    summary:
      "Sole frontend developer on two products. Built a white-label tracking micro-app with per-organisation branding.",
    stack: ["React", "Server-Sent Events", "Bit.dev"],
    preview: "Sole frontend dev",
  },
  {
    title: "Blume Visibility",
    org: "Blume Global",
    role: "Software Engineer, then Senior",
    period: "2020-22",
    summary:
      "Built a real-time tracking platform from nothing in a team of twelve, across seven shipment modes. Promoted to Senior after the company's star performer award.",
    stack: ["React", "Redux", "Leaflet", "Module Federation"],
    preview: "Built from nothing",
  },
  {
    title: "Hyundai BlueLink",
    org: "Infogain",
    role: "Software Engineer",
    period: "2019-20",
    summary:
      "Telematics in the My Hyundai and My Genesis portals: vehicle health, remote commands, service scheduling.",
    stack: ["React", "PWA"],
    preview: "Connected vehicles",
  },
  {
    title: "VEGLELE",
    org: "Co-founded",
    role: "Co-Founder & Developer",
    period: "2015-17",
    summary:
      "Hour-delivery of fresh produce, years before Blinkit. Built and shipped the Android app while finishing a master's.",
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
  /**
   * Opens in a new tab so visitors preview it in the browser's PDF viewer and
   * download from there if they want it. Works the same for a path on this
   * domain or an external URL. Empty hides the button entirely.
   */
  resumeUrl: "/resume.pdf",
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
    bio: "Nine years building enterprise SaaS that people use all day: supply chain software for global logistics, and the component libraries underneath it.",
    /**
     * Only facts that belong to him. Platform-scale figures like "17,000+
     * organisations" live in the CargoWise row instead, where the sentence
     * around them makes clear they describe the platform and not this work.
     */
    meta: ["9 years", "Enterprise SaaS", "React, Vue, TypeScript"],
  },

  about: {
    heading: { plain: "A short", italic: "introduction" } satisfies Heading,
    label: "About",
    body: [
      "Nine years building products people actually use, from a startup I co-founded in Jaipur to logistics platforms running across the global supply chain. Six of them on software where a wrong number costs someone a shipment.",
      "My work sits in component libraries and design systems: the shared layer everyone builds on. Most of what I know came from building things I had never built before, and I have never stepped back from a problem I didn't know how to solve yet.",
    ],
    /** Phrases italicized inline for accent. Must appear verbatim in `body`. */
    accents: [
      "a wrong number costs someone a shipment",
      "the shared layer everyone builds on",
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
      ", wiring state through ",
      { tech: "Redux" },
      " and ",
      { tech: "Vuex" },
      ". Components live in ",
      { tech: "Storybook" },
      ", build with ",
      { tech: "Vite" },
      ", and are tested with ",
      { tech: "Vitest" },
      " and ",
      { tech: "Jest" },
      ". ",
      { tech: "Module Federation" },
      " for independently deployed apps, ",
      { tech: "Leaflet" },
      " for maps, ",
      { tech: "React Native" },
      " for mobile. On the backend it is usually ",
      { tech: "Node" },
      " and ",
      { tech: "REST" },
      ", and ",
      { tech: "C#" },
      " when the work calls for it.",
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
