import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { site } from "@/content/site";
import { ThemeProvider, themeInitScript } from "@/components/ThemeProvider";
import { Cursor } from "@/components/Cursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Grain } from "@/components/Grain";
import { Ambient } from "@/components/Ambient";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.meta.title,
    template: `%s | ${site.name.first} ${site.name.last}`,
  },
  description: site.meta.description,
  applicationName: `${site.name.first} ${site.name.last}`,
  authors: [{ name: `${site.name.first} ${site.name.last}`, url: site.url }],
  creator: `${site.name.first} ${site.name.last}`,
  keywords: [
    "Dixant Sharma",
    "senior frontend engineer",
    "frontend engineer India",
    "React",
    "Vue",
    "TypeScript",
    "design systems",
    "micro-frontends",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: `${site.name.first} ${site.name.last}`,
    title: site.meta.title,
    description: site.meta.description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: site.meta.title,
    description: site.meta.description,
    creator: "@dixant_sharma",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0c0b09" },
    { media: "(prefers-color-scheme: light)", color: "#f4f3ef" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}
    >
      <head>
        {/* Runs before paint so the stored theme never flashes. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <SmoothScroll />
          <Ambient />
          <Grain />
          <Cursor />
          {/*
            `relative` with no z-index. Paint order already puts this above
            <Ambient /> because both are positioned and this comes later in
            tree order, and <Cursor /> stays a sibling so its blend can still
            see the page.
          */}
          <div className="relative">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
