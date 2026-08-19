import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name.first} ${site.name.last}`,
    short_name: site.name.first,
    description: site.meta.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0c0b09",
    theme_color: "#0c0b09",
  };
}
