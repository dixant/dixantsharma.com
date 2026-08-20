import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name.first} ${site.name.last}`,
    short_name: site.name.first,
    description: site.meta.description,
    start_url: "/",
    display: "standalone",
    // The generated site.webmanifest shipped #ffffff for both, which would
    // flash white on launch against a near-black site.
    background_color: "#0c0b09",
    theme_color: "#0c0b09",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
