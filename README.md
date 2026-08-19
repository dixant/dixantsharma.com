# dixantsharma.com

Personal site of **Dixant Sharma**, senior frontend engineer, based in India.

Minimal, monochrome, interactive. One design, two themes: only the colour
tokens swap.

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Fonts | Inter, JetBrains Mono, Instrument Serif, self-hosted via `next/font` |
| Hosting | Vercel |
| DNS | Cloudflare (DNS-only records) |

## Running locally

```bash
npm install && npm run dev
```

The site runs at http://localhost:3000.

| script | does |
|---|---|
| `npm run dev` | dev server |
| `npm run build` | production build |
| `npm start` | serve the production build |
| `npm run typecheck` | `tsc --noEmit` |

## Editing content

**All copy lives in [`src/content/site.ts`](src/content/site.ts)**: name,
bio, projects, stack prose, now-list, socials. Edit that file; the components
read from it and hardcode nothing.

A few conventions in there:

- **`Heading`** is `{ plain, italic }`. The `italic` word renders in Instrument
  Serif italic, the site's signature move. Keep it to one word.
- **`Project.summary` is the point of the work section.** One sentence on what
  you owned and at what scale. A title plus a stack list reads as junior no
  matter how it's set; the summary is what makes it read as nine years.
- **`Project.href` is optional.** Omit it for work with no public URL; the row
  still highlights on hover but isn't a link.
- **`about.accents`** are phrases italicised inline. They must appear
  *verbatim* in `about.body` or they're silently ignored.
- **`stack.prose`** is an array: plain strings are connective text, `{ tech }`
  entries get an underline that strengthens on hover.

## Design notes

Two easings, used everywhere and nowhere else:

```
cubic-bezier(.2, .9, .3, 1.4)   hover snaps   ->  ease-snap
cubic-bezier(.2, .7, .2, 1)     reveals       ->  ease-reveal
```

Colour tokens live in [`src/app/globals.css`](src/app/globals.css) as CSS
variables under `:root` and `:root[data-theme="light"]`. Dark is the default;
the theme is written to `<html data-theme>` by an inline script in
[`layout.tsx`](src/app/layout.tsx) before first paint, so it never flashes, and
persists to `localStorage`.

### Three things that look odd but aren't

1. **`<Ambient />` paints an opaque background layer.** A background set only on
   `body` propagates to the canvas, which sits outside every stacking context,
   so the cursor ring's `mix-blend-mode: difference` would have nothing to blend
   against and would always resolve against black.
2. **Tech names in the stack paragraph don't swap to serif on hover**, unlike
   headings and work titles. They sit inline mid-sentence, and changing the font
   family changes the word's width, which reflows every word after it, so
   neighbouring words visibly collide. Only non-layout properties (colour,
   underline weight) are safe inline. See `.tech` in `globals.css`.
3. **No `scroll-behavior: smooth` in CSS.** Lenis drives scrolling; the two
   fight if both are on.

The nav was originally a `mix-blend-difference` bar. That kept its text legible
in the abstract but did nothing about *collision*. The hero name and the nav
drew straight on top of each other. It's now a translucent blurred bar that
fades in past 24px of scroll. A background and a difference blend are mutually
exclusive: the background gets differenced too, and inverts into a visible band.

### Motion

Wheel scrolling is eased with [Lenis](https://github.com/darkroomengineering/lenis),
which animates the real scroll position, so IntersectionObserver reveals,
`position: fixed` and anchor links all keep working. It's disabled under
reduced-motion, and native touch scrolling is left alone.

Everything respects `prefers-reduced-motion`. Touch devices get the standard
cursor, no magnetic letters, and static hover states.

## Deploying

Already done once; here for reference.

```bash
git add . && git commit -m "..." && git push
```

Vercel builds on push to `main`.

<details>
<summary>First-time setup</summary>

1. Push to GitHub:
   ```bash
   git init && git add . && git commit -m "initial scaffold"
   git branch -M main
   git remote add origin git@github.com:dixant/dixantsharma.com.git
   git push -u origin main
   ```
2. On Vercel: **Add new project**, import the repo, deploy. No env vars
   needed.
3. In Vercel, go to **Settings > Domains** and add `dixantsharma.com` and
   `www.dixantsharma.com`.
4. In Cloudflare DNS, both records **DNS-only (grey cloud, not orange)**.
   Vercel terminates TLS itself and an orange cloud breaks certificate issuance:

   | type | name | value |
   |---|---|---|
   | A | `@` | `76.76.21.21` |
   | CNAME | `www` | `cname.vercel-dns.com` |

5. Wait ~5 minutes for the certificate.

</details>

### Mail

The contact section points straight at a Gmail address, so there's nothing to
configure. If you ever switch it to an address on the domain, that one needs
**Cloudflare Email Routing** enabled (Email > Email Routing) or mail sent there
goes nowhere.

## Structure

```
src/
  app/
    layout.tsx           metadata, fonts, theme init script
    page.tsx             composes the sections
    globals.css          tokens + base styles
    icon.tsx             dynamic favicon
    opengraph-image.tsx  dynamic OG image
    sitemap.ts / robots.ts / manifest.ts
    fonts/               Instrument Serif TTFs (OG image only)
  components/
  content/site.ts        all editable copy lives here
```

`src/app/fonts/` holds two Instrument Serif TTFs read at build time by the OG
image and favicon. `next/font` can't be used inside `ImageResponse`, which is
why they're checked in separately from the webfonts.

## Licence

[MIT](LICENSE) for the code. Content and design are not licensed for reuse.
